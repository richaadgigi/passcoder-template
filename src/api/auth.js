import axios from 'axios';
import { config } from '../config';

const businessSignup = async function (payload) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/auth/platform/signup`,
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
			`${config.baseAPIurl}/auth/platform/resend/verification/email`,
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
			`${config.baseAPIurl}/auth/platform/access/${stripped}`,
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
			`${config.baseAPIurl}/auth/platform/access/${stripped}/verify`,
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
			`${config.baseAPIurl}/auth/platform/access/token/${stripped}`,
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
			`${config.baseAPIurl}/auth/platform/reset/token`,
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
			`${config.baseAPIurl}/platform/verify/email`,
			{ ...payload }
		);
		return { err: false, data: response.data };
	} catch (error) {
		return { err: true, error };
	}
};

export { businessSignup, loginViaEmail, loginViaToken, resendVerificationEmail, resetMasterToken, verifyEmailOtp, verifyEmail };