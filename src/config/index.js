const dotenv = require("dotenv");

dotenv.config();

const { INTERNAL_KEY } = process.env;

const EMAIL_REGEX = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
const baseAPIurl = "https://us-central1-id-app-f1f1e.cloudfunctions.net/ng_app_internal";
const internalKey = INTERNAL_KEY;

export const config = {
	token: "encrypted_token",
	EMAIL_REGEX,
	baseAPIurl,
	internalKey
};