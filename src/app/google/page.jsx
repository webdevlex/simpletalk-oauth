"use client";
import React, { useState, useEffect, Suspense } from "react";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import getApiConfig from "@/config";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const GhlLink = () => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const [loading, setLoading] = useState(true);
	const [linkingSuccess, setLinkingSuccess] = useState(false);
	const { convoAiMetricsApiUrl } = getApiConfig();

	useEffect(() => {
		completeGoogleSignIn();
	}, []);

	const completeGoogleSignIn = async () => {
		const code = searchParams.get("code");
		if (code) {
			setLoading(true);
			try {
				await getRefreshToken(code);
				setLinkingSuccess(true);
			} catch (error) {
				console.error("Failed to link google calendar");
				throw error;
			} finally {
				setLoading(false);
			}
		}
	};

	const getRefreshToken = async (code) => {
		try {
			const url = `${convoAiMetricsApiUrl}/google/auth_tokens`;
			const body = {
				code: code,
				redirect_url: "https://ghl.aicall.site/google",
			};
			const headers = {
				headers: {
					Authorization: localStorage.getItem("token"),
					"Content-Type": "application/json",
				},
			};

			await axios.post(url, body, headers);
		} catch (error) {
			throw error;
		}
	};

	const handleRetry = async () => {
		const url = "https://accounts.google.com/o/oauth2/v2/auth";
		const params = {
			client_id:
				"1015715291135-et3iks8v7kqj20475s5e7rcjn5q6emrg.apps.googleusercontent.com",
			redirect_uri: "https://ghl.aicall.site/google",
			response_type: "code",
			prompt: "consent",
			access_type: "offline",
			scope:
				"https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/calendar.app.created https://www.googleapis.com/auth/calendar.calendarlist.readonly https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.calendarlist",
		};

		const queryString = new URLSearchParams(params).toString();
		const authUrl = `${url}?${queryString}`;
		router.push(authUrl);
	};

	let content;
	if (loading) {
		content = (
			<>
				<CircularProgress />
				<Typography variant="h5" style={{ marginTop: 32 }}>
					Linking your Google calendar
				</Typography>
			</>
		);
	} else if (linkingSuccess) {
		content = (
			<>
				<CheckCircleIcon color="success" sx={{ fontSize: 72 }} />
				<Typography variant="h5" marginTop={1}>
					Google calendar successfully linked!
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
					Failed to link Google calendar
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

const GhlLinkWrapper = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<GhlLink />
		</Suspense>
	);
};

export default GhlLinkWrapper;
