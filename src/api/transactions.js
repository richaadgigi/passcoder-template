import axios from 'axios';
import { config } from '../config';

const getPlatformTransactions = async function (token) {
	try {
		const response = await axios.get(
			`${config.baseAPIurl}/platform/transactions`,
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

const getPlatformTransactionsViaType = async function (token, payload) {
	try {
		const response = await axios.get(
			`${config.baseAPIurl}/platform/transactions/via/type`,
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

const getPlatformTransactionsViaStatus = async function (token, payload) {
	try {
		const response = await axios.get(
			`${config.baseAPIurl}/platform/transactions/via/transaction/status`,
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

const getPlatformTransaction = async function (token, payload) {
	try {
		const response = await axios.get(
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
		return { err: true, error };
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

export { 
	addPlatformDeposit, cancelPlatformDeposit, completePlatformDeposit, deletePlatformTransaction, getPlatformTransaction, 
	getPlatformTransactions, getPlatformTransactionsViaStatus, getPlatformTransactionsViaType
};