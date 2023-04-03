import axios from 'axios';
import { config } from '../config';

const getAccessDetails = async function (stripped) {
	try {
		const response = await axios.get(
			`${config.baseAPIurl}/platform/access/details`,
			{
				stripped: stripped
			}
		);
		return { err: false, data: response.data };
	} catch (error) {
		return { err: true, error };
	}
};

const getPlatform = async function (token) {
	try {
		const response = await axios.get(
			`${config.baseAPIurl}/platform`,
			{
				headers: {
					'passcoder-access-token': token
				}
			}
		);
		return { err: false, data: response.data };
	} catch (error) {
		return { err: true, error };
	}
};

const getPlatformMetrics = async function (token) {
	try {
		const response = await axios.get(
			`${config.baseAPIurl}/platform/metrics`,
			{
				headers: {
					'passcoder-access-token': token
				}
			}
		);
		return { err: false, data: response.data };
	} catch (error) {
		return { err: true, error };
	}
};

const getPlatformBalance = async function (token) {
	try {
		const response = await axios.get(
			`${config.baseAPIurl}/platform/balance`,
			{
				headers: {
					'passcoder-access-token': token
				}
			}
		);
		return { err: false, data: response.data };
	} catch (error) {
		return { err: true, error };
	}
};

export { getAccessDetails, getPlatform, getPlatformBalance, getPlatformMetrics };