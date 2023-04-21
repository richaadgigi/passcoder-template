import { useState, useEffect } from "react";
import useCookie from "../hooks/useCookie";
import { config } from "../config";
import { getPlatform, getPlatformMetrics } from "../api/platform";

const useGetPlatform = () => {
	const [cookie] = useCookie(config.token, "");

	const [platformDetails, setPlatformDetails] = useState(null);

	async function getPlatformDetails() {
		const response = await getPlatform(cookie);
		setPlatformDetails(response.data);
	}

	useEffect(() => {
		if (platformDetails === null) {
			getPlatformDetails();
		}
	}, [platformDetails]);

	return { platformDetails, setPlatformDetails, getPlatformDetails }
};

const useGetPlatformMetrics = () => {
	const [cookie] = useCookie(config.token, "");

	const [platformMetrics, setPlatformMetricsDetails] = useState(null);

	async function getPlatformMetricsDetails() {
		const response = await getPlatformMetrics(cookie);
		setPlatformMetricsDetails(response.data);
	}

	useEffect(() => {
		if (platformMetrics === null) {
			getPlatformMetricsDetails();
		}
	}, [platformMetrics]);

	return { platformMetrics, setPlatformMetricsDetails, getPlatformMetricsDetails }
};

export { useGetPlatform, useGetPlatformMetrics };