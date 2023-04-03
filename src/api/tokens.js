import axios from 'axios';
import { config } from '../config';

const getPlatformTokens = async function (token) {
	try {
		const response = await axios.get(
			`${config.baseAPIurl}/platform/tokens`,
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

const getPlatformToken = async function (token, unique_token) {
	try {
		const response = await axios.get(
			`${config.baseAPIurl}/platform/token`,
			{
				token: unique_token
			},
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

const addPlatformToken = async function (token, payload) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/platform/token/add`,
			{
				...payload
			},
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

const updateTokenDetails = async function (token, payload) {
	try {
		const response = await axios.put(
			`${config.baseAPIurl}/platform/token/update/details`,
			{
				...payload
			},
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

const updateToken = async function (token, payload) {
	try {
		const response = await axios.put(
			`${config.baseAPIurl}/platform/token/update/token`,
			{
				...payload
			},
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

const deleteToken = async function (token, payload) {
	try {
		const response = await axios.delete(
			`${config.baseAPIurl}/platform/token`,
			{
				...payload
			},
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

export { getPlatformToken, addPlatformToken, deleteToken, getPlatformTokens, updateToken, updateTokenDetails };
