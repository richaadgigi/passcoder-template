import axios from 'axios';
import { config } from '../config';

const partnerSignup = async function (payload) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/auth/partner/signup`,
			{ ...payload }
		);
		return { err: false, data: response.data };
	} catch (error) {
		return { err: true, error };
	}
};

const resendVerificationEmail = async function (payload) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/auth/partner/resend/verification/email`,
			{ ...payload }
		);
		return { err: false, data: response.data };
	} catch (error) {
		return { err: true, error };
	}
};

const loginViaEmail = async function (stripped, payload) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/auth/partner/access/${stripped}`,
			{ ...payload }
		);
		return { err: false, data: response.data };
	} catch (error) {
		return { err: true, error };
	}
};

const verifyEmailOtp = async function (stripped, payload) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/auth/partner/access/${stripped}/verify`,
			{ ...payload }
		);
		return { err: false, data: response.data };
	} catch (error) {
		return { err: true, error };
	}
};

const loginViaToken = async function (stripped, payload) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/auth/partner/access/token/${stripped}`,
			{ ...payload }
		);
		return { err: false, data: response.data };
	} catch (error) {
		return { err: true, error };
	}
};

const resetMasterToken = async function (payload) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/auth/partner/reset/token`,
			{ ...payload }
		);
		return { err: false, data: response.data };
	} catch (error) {
		return { err: true, error };
	}
};

const verifyEmail = async function (payload) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/partner/verify/email`,
			{ ...payload }
		);
		return { err: false, data: response.data };
	} catch (error) {
		return { err: true, error };
	}
};

export { partnerSignup, loginViaEmail, loginViaToken, resendVerificationEmail, resetMasterToken, verifyEmailOtp, verifyEmail };