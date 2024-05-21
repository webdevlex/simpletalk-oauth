"use client";
import React, { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { CircularProgress, Typography, Box } from "@mui/material";

const Index = () => {
	const searchParams = useSearchParams();

	useEffect(() => {
		const token = searchParams.get("token");
		if (token) {
			localStorage.setItem("token", token);
			// Redirect to another website
			window.location.href =
				"https://marketplace.gohighlevel.com/oauth/chooselocation?response_type=code&redirect_uri=https://ghl.aicall.site&client_id=6646b83e3d03052997975239-lwa12jpm&scope=calendars.readonly calendars.write calendars/events.readonly calendars/events.write calendars/groups.readonly calendars/groups.write calendars/resources.readonly calendars/resources.write contacts.readonly contacts.write users.write users.readonly businesses.readonly businesses.write locations/customValues.readonly locations/customValues.write locations/customFields.readonly locations/customFields.write locations/tasks.readonly locations/tasks.write locations/tags.readonly locations/tags.write locations/templates.readonly"; // Replace with your desired website URL
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
