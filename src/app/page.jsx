"use client";
import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import getApiConfig from "@/config";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const GhlLink = () => {
	const searchParams = useSearchParams();

	const [loading, setLoading] = useState(true);
	const [linkingSuccess, setLinkingSuccess] = useState(false);
	const { convoAiMetricsApiUrl } = getApiConfig();

	useEffect(() => {
		const fetchData = async (code) => {
			try {
				const token = localStorage.getItem("token");
				const headers = { Authorization: `Bearer ${token}` };
				const res = await axios.post(
					`${convoAiMetricsApiUrl}/ghl-link?code=${code}`,
					{},
					{ headers }
				);
				if (res.status === 200) {
					console.log("success!");
					setLinkingSuccess(true);
				}
			} catch (error) {
				console.error("Error during authentication:", error);
			} finally {
				setLoading(false);
			}
		};

		const code = searchParams.get("code");
		if (code) {
			fetchData(code);
		}
	}, []);

	const handleRetry = async () => {
		setLoading(true);
		try {
			const token = localStorage.getItem("token");
			const headers = { Authorization: `Bearer ${token}` };
			const res = await axios.post(
				`${convoAiMetricsApiUrl}/ghl-link`,
				{},
				{ headers }
			);
			if (res.status === 200) {
				console.log("success!");
				setLinkingSuccess(true);
			}
		} catch (error) {
			console.error("Error during authentication:", error);
		} finally {
			setLoading(false);
		}
	};

	let content;
	if (loading) {
		content = (
			<>
				<CircularProgress />
				<Typography variant="h5" style={{ marginTop: 32 }}>
					Linking your account to GHL
				</Typography>
			</>
		);
	} else if (linkingSuccess) {
		content = (
			<>
				<CheckCircleIcon color="success" sx={{ fontSize: 72 }} />
				<Typography variant="h5" marginTop={1}>
					Account linked successfully!
				</Typography>
				<Typography
					variant="caption"
					fontSize="16px"
					color={"gray"}
					marginTop={1}>
					You may close this window
				</Typography>
			</>
		);
	} else {
		content = (
			<>
				<Button
					onClick={handleRetry}
					type="button"
					variant="contained"
					size="large"
					disableElevation>
					Try Again
				</Button>
				<Typography variant="h5" style={{ marginTop: 32 }}>
					Linking failed
				</Typography>
			</>
		);
	}

	return (
		<Box
			display={"flex"}
			flexDirection={"column"}
			justifyContent={"center"}
			alignItems={"center"}
			padding={0}
			fontFamily={"inherit"}
			height={"100%"}>
			{content}
		</Box>
	);
};

export default GhlLink;
