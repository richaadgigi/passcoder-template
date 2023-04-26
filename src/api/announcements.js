import axios from 'axios';
import { config } from '../config';

const getPartnerAnnouncements = async function (token, page, size) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/partner/announcements`,
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

const getPartnerAnnouncement = async function (token, unique_id) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/partner/announcement`,
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

const addPartnerAnnouncement = async function (token, payload) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/partner/announcement/add`,
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

export { getPartnerAnnouncement, addPartnerAnnouncement, getPartnerAnnouncements };
