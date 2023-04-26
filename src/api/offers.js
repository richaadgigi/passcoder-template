import axios from 'axios';
import { config } from '../config';

const getPartnerOffers = async function (token, page, size) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/partner/offers`,
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

const getPartnerOffer = async function (token, unique_id) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/partner/offer`,
			{
				unique_id
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

const addPartnerOffer = async function (token, payload) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/partner/offer/add`,
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

const updateOfferDetails = async function (token, payload) {
	try {
		const response = await axios.put(
			`${config.baseAPIurl}/partner/offer/update/details`,
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

const updateOfferLimit = async function (token, payload) {
	try {
		const response = await axios.put(
			`${config.baseAPIurl}/partner/offer/update/limit`,
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

const updateOfferCriteria = async function (token, payload) {
	try {
		const response = await axios.put(
			`${config.baseAPIurl}/partner/offer/update/criteria`,
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

const deleteOffer = async function (token, payload) {
	try {
		const response = await axios.delete(
			`${config.baseAPIurl}/partner/offer`,
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

export { getPartnerOffer, addPartnerOffer, deleteOffer, getPartnerOffers, updateOfferLimit, updateOfferCriteria, updateOfferDetails };
