import axios from 'axios';
import { config } from '../config';

const getPlatformTransactions = async function (token, page, size) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/platform/transactions`,
			{
				page,
				size
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

const getPlatformTransactionsViaType = async function (token, page, size, payload) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/platform/transactions/via/type`,
			{
				page,
				size,
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
		return { err: true, error, response_code: error.response.status };
	}
};

const getPlatformTransactionsViaStatus = async function (token, page, size, payload) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/platform/transactions/via/transaction/status`,
			{
				page,
				size,
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
		return { err: true, error, response_code: error.response.status };
	}
};

const getPlatformTransaction = async function (token, payload) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/platform/transaction`,
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
		return { err: true, error, response_code: error.response.status };
	}
};

const addPlatformDeposit = async function (token, payload) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/platform/transaction/payment/deposit`,
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

const cancelPlatformDeposit = async function (token, payload) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/platform/transaction/cancel/deposit`,
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

const completePlatformDeposit = async function (token, payload) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/platform/transaction/complete/deposit`,
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

const deletePlatformTransaction = async function (token, payload) {
	try {
		const response = await axios.delete(
			`${config.baseAPIurl}/platform/transaction`,
			{
				data: {
					token,
					...payload
				}
			},
			// {
			// 	headers: {
			// 		'passcoder-access-token': token
			// 	}
			// }
		);
		return { err: false, data: response.data };
	} catch (error) {
		return { err: true, error };
	}
};

export { 
	addPlatformDeposit, cancelPlatformDeposit, completePlatformDeposit, deletePlatformTransaction, getPlatformTransaction, 
	getPlatformTransactions, getPlatformTransactionsViaStatus, getPlatformTransactionsViaType
};