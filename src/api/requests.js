import axios from 'axios';
import { config } from '../config';

const getPartnerRequests = async function (token, page, size) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/partner/requests`,
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

const getPartnerRequestsViaOffer = async function (token, page, size, offer_unique_id) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/partner/requests/via/offer`,
			{
				page,
				size,
				offer_unique_id
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

const offerAuthenticateUser = async function (token, payload) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/partner/user/offer/authentication`,
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

export { getPartnerRequests, getPartnerRequestsViaOffer, offerAuthenticateUser };