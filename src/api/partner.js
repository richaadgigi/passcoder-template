import axios from 'axios';
import { config } from '../config';

const getAccessDetails = async function (stripped) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/partner/access/details`,
			{
				stripped
			}
		);
		return { err: false, data: response.data };
	} catch (error) {
		return { err: true, error };
	}
};

const getPartner = async function (token) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/partner`,
			{

			},
			{
				headers: {
					'passcoder-access-token': token
				}
			}
		);
		return { err: false, data: response.data };
	} catch (error) {
		return { err: true, error, response_code: error.response.status };
	}
};

const getPartnerMetrics = async function (token) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/partner/metrics`,
			{

			},
			{
				headers: {
					'passcoder-access-token': token
				}
			}
		);
		return { err: false, data: response.data };
	} catch (error) {
		return { err: true, error, response_code: error.response.status };
	}
};

const getCompanyBankAccount = async function () {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/partner/company/bank/account`,
		);
		return { err: false, data: response.data };
	} catch (error) {
		return { err: true, error };
	}
};

const premiumUpgrade = async function (token, payload) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/partner/premium/upgrade`,
			{
				...payload
			},
			{
				headers: {
					'passcoder-access-key': config.internalKey,
					'passcoder-access-token': token
				}
			}
		);
		return { err: false, data: response.data };
	} catch (error) {
		return { err: true, error };
	}
};

export { getAccessDetails, getPartner, getPartnerMetrics, getCompanyBankAccount, premiumUpgrade };