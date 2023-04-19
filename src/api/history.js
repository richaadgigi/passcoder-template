import axios from 'axios';
import { config } from '../config';

const getApiHistory = async function (token, page, size) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/platform/requests`,
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
		return { err: true, error };
	}
};

export { getApiHistory };