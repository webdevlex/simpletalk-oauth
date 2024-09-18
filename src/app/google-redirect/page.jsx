"use client";
import React, { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { CircularProgress, Typography, Box } from "@mui/material";

const Index = () => {
	const searchParams = useSearchParams();
	const router = useRouter();

	useEffect(() => {
		const token = searchParams.get("token");
		if (token) {
			localStorage.setItem("token", token);

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
		}
	}, [searchParams]);

	return (
		<Box
			display={"flex"}
			flexDirection={"column"}
			justifyContent={"center"}
			alignItems={"center"}
			padding={0}
			fontFamily={"inherit"}
			height={"100%"}>
			<CircularProgress />
			<Typography variant="h5" sx={{ marginTop: "32px" }}>
				Redirecting
			</Typography>
		</Box>
	);
};

const IndexWrapper = () => {
	return (
		<Suspense fallback={<CircularProgress />}>
			<Index />
		</Suspense>
	);
};

export default IndexWrapper;
