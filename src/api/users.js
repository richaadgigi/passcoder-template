import axios from 'axios';
import { config } from '../config';

const getAppUsers = async function (token) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/platform/app/users`,
			{

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

export { getAppUsers };