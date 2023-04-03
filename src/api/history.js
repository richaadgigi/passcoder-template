import axios from 'axios';
import { config } from '../config';

const getApiHistory = async function (token) {
	try {
		const response = await axios.get(
			`${config.baseAPIurl}/platform/requests`,
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