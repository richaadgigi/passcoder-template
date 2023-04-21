import axios from 'axios';
import { config } from '../config';

const getApiPricing = async function () {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/platform/api/pricing`,
			{

			},
		);
		return { err: false, data: response.data };
	} catch (error) {
		return { err: true, error };
	}
};

const getPlatformProfilePhotoProof = async function (payload) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/proofs/platform/profile/photo`,
			{ ...payload }
		);
		return { err: false, data: response.data };
	} catch (error) {
		return { err: true, error };
	}
};

const getPlatformComplianceDocumentsProof = async function (payload) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/proofs/platform/compliance/documents`,
			{ ...payload }
		);
		return { err: false, data: response.data };
	} catch (error) {
		return { err: true, error };
	}
};

const updateProfilePhoto = async function (token, payload) {
	try {
		const response = await axios.put(
			`${config.baseAPIurl}/platform/profile/photo`,
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

const updateName = async function (token, payload) {
	try {
		const response = await axios.put(
			`${config.baseAPIurl}/platform/name`,
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

const updateEmail = async function (token, payload) {
	try {
		const response = await axios.put(
			`${config.baseAPIurl}/platform/email`,
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

const updateDescription = async function (token, payload) {
	try {
		const response = await axios.put(
			`${config.baseAPIurl}/platform/description`,
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

const updateMasterToken = async function (token) {
	try {
		const response = await axios.put(
			`${config.baseAPIurl}/platform/update/token`,
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
		return { err: true, error };
	}
};

const updateLiveApiKey = async function (token) {
	try {
		const response = await axios.put(
			`${config.baseAPIurl}/platform/update/live/api/key`,
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
		return { err: true, error };
	}
};

const updateTestApiKey = async function (token) {
	try {
		const response = await axios.put(
			`${config.baseAPIurl}/platform/update/test/api/key`,
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
		return { err: true, error };
	}
};

const updateComplianceDetails = async function (token, payload) {
	try {
		const response = await axios.put(
			`${config.baseAPIurl}/platform/compliance/details`,
			{
				...payload
			},
			{
				headers: {
					'passcoder-access-token': token
				}
			}
		);
		return { err: false, data: response.data, response_code: response.status };
	} catch (error) {
		return { err: true, error };
	}
};

const updateComplianceCertificate = async function (token, payload) {
	try {
		const response = await axios.put(
			`${config.baseAPIurl}/platform/compliance/certificate`,
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

const updateComplianceDocument = async function (token, payload) {
	try {
		const response = await axios.put(
			`${config.baseAPIurl}/platform/compliance/document`,
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

const updateComplianceDocuments = async function (token, payload) {
	try {
		const response = await axios.put(
			`${config.baseAPIurl}/platform/compliance/documents`,
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
	getApiPricing, updateComplianceCertificate, updateComplianceDetails, updateComplianceDocument, updateComplianceDocuments, 
	updateDescription, updateEmail, updateLiveApiKey, updateMasterToken, updateName, updateProfilePhoto, updateTestApiKey, 
	getPlatformProfilePhotoProof, getPlatformComplianceDocumentsProof
};