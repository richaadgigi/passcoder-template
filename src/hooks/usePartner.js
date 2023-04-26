import { useState, useEffect } from "react";
import useCookie from "./useCookie";
import { config } from "../config";
import { getPartner, getPartnerMetrics } from "../api/partner";

const useGetPartner = () => {
	const {cookie, forceLogout} = useCookie(config.token, "");

	const [partnerDetails, setPartnerDetails] = useState(null);

	async function getPartnerDetails() {
		const response = await getPartner(cookie);
		setPartnerDetails(response.data);
		if (response.response_code === 403) forceLogout();
	}

	useEffect(() => {
		if (partnerDetails === null) {
			getPartnerDetails();
		}
	}, [partnerDetails]);

	return { partnerDetails, setPartnerDetails, getPartnerDetails }
};

const useGetPartnerMetrics = () => {
	const {cookie} = useCookie(config.token, "");

	const [partnerMetrics, setPartnerMetricsDetails] = useState(null);

	async function getPartnerMetricsDetails() {
		const response = await getPartnerMetrics(cookie);
		setPartnerMetricsDetails(response.data);
	}

	useEffect(() => {
		if (partnerMetrics === null) {
			getPartnerMetricsDetails();
		}
	}, [partnerMetrics]);

	return { partnerMetrics, setPartnerMetricsDetails, getPartnerMetricsDetails }
};

export { useGetPartner, useGetPartnerMetrics };