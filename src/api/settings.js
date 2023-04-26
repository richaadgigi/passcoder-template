import axios from 'axios';
import { config } from '../config';

const getPremiumPackages = async function () {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/partner/premium/packages`,
			{

			},
		);
		return { err: false, data: response.data };
	} catch (error) {
		return { err: true, error };
	}
};

const getPartnerProfilePhotoProof = async function (payload) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/proofs/partner/profile/photo`,
			{ ...payload }
		);
		return { err: false, data: response.data };
	} catch (error) {
		return { err: true, error };
	}
};

const getPartnerProfileCoverProof = async function (payload) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/proofs/partner/cover/photo`,
			{ ...payload }
		);
		return { err: false, data: response.data };
	} catch (error) {
		return { err: true, error };
	}
};

const getPartnerComplianceDocumentsProof = async function (payload) {
	try {
		const response = await axios.post(
			`${config.baseAPIurl}/proofs/partner/compliance/documents`,
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
			`${config.baseAPIurl}/partner/profile/photo`,
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

const updateProfileCover = async function (token, payload) {
	try {
		const response = await axios.put(
			`${config.baseAPIurl}/partner/profile/cover`,
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
			`${config.baseAPIurl}/partner/name`,
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
			`${config.baseAPIurl}/partner/email`,
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

const updatePointThreshold = async function (token, payload) {
	try {
		const response = await axios.put(
			`${config.baseAPIurl}/partner/point/threshold`,
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
			`${config.baseAPIurl}/partner/description`,
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
			`${config.baseAPIurl}/partner/update/token`,
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
			`${config.baseAPIurl}/partner/compliance/details`,
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
			`${config.baseAPIurl}/partner/compliance/certificate`,
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
			`${config.baseAPIurl}/partner/compliance/document`,
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
			`${config.baseAPIurl}/partner/compliance/documents`,
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
	getPremiumPackages, updateComplianceCertificate, updateComplianceDetails, updateComplianceDocument, updateComplianceDocuments, 
	updateDescription, updateEmail, updateMasterToken, updateName, updateProfilePhoto, updateProfileCover, updatePointThreshold, 
	getPartnerProfilePhotoProof, getPartnerComplianceDocumentsProof, getPartnerProfileCoverProof, 
};