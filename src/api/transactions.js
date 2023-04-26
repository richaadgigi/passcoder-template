import axios from 'axios';
import { config } from '../config';

const getPartnerTransactions = async function (token, page, size) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/partner/transactions`,
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

const getPartnerTransactionsViaType = async function (token, page, size, payload) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/partner/transactions/via/type`,
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

const getPartnerTransactionsViaStatus = async function (token, page, size, payload) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/partner/transactions/via/transaction/status`,
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

const getPartnerTransaction = async function (token, payload) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/partner/transaction`,
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

const addPartnerDeposit = async function (token, payload) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/partner/transaction/payment/deposit`,
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

const cancelPartnerDeposit = async function (token, payload) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/partner/transaction/cancel/deposit`,
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

const completePartnerDeposit = async function (token, payload) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/partner/transaction/complete/deposit`,
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

const deletePartnerTransaction = async function (token, payload) {
	try {
		const response = await axios.delete(
			`${config.baseAPIurl}/partner/transaction`,
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
	addPartnerDeposit, cancelPartnerDeposit, completePartnerDeposit, deletePartnerTransaction, getPartnerTransaction, 
	getPartnerTransactions, getPartnerTransactionsViaStatus, getPartnerTransactionsViaType
};