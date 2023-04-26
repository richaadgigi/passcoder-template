import axios from 'axios';
import { config } from '../config';

const createOtp = async function (token) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/partner/otp/create`,
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

const verifyOtp = async function (token, payload) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/partner/otp/verify`,
			{ ...payload },
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

export { createOtp, verifyOtp };
