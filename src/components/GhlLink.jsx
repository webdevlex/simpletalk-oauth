"use client";

import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import axios from "axios";

const GhlLink = () => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.get("/auth")
			.then((response) => {
				if (response.status === 200) {
				}
			})
			.catch((error) => {
				console.error("Error during authentication:", error);
				setLoading(false);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const handleRetry = () => {
		setLoading(true);
		axios
			.get("/auth")
			.then((response) => {
				if (response.status === 200) {
				}
			})
			.catch((error) => {
				console.error("Error during authentication:", error);
				setLoading(false);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<Box
			display={"flex"}
			flexDirection={"column"}
			justifyContent={"center"}
			alignItems={"center"}
			height={"100vh"}>
			{loading ? (
				<>
					<CircularProgress />
					<Typography variant="h5" style={{ marginTop: 32 }}>
						Linking your account to GHL
					</Typography>
				</>
			) : (
				<>
					<Button
						onClick={handleRetry}
						variant="contained"
						size="large"
						disableElevation>
						Try Again
					</Button>
					<Typography variant="h5" style={{ marginTop: 32 }}>
						Linking failed
					</Typography>
				</>
			)}
		</Box>
	);
};

export default GhlLink;
