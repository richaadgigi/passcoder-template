import { useState } from "react";
import useCookie from "../hooks/useCookie";
import { config } from "../config";
import { addPlatformDeposit, cancelPlatformDeposit, completePlatformDeposit, deletePlatformTransaction } from "../api/transactions";

const useAddDeposit = () => {

	const {cookie} = useCookie(config.token, "");

	const general_min_amount = 1000;
	const credit_card_max_amount = 20000;
	const transfer_max_amount = 100000;

	const [loading, setLoading] = useState(false);
	const [removeFundingModal, setRemoveFundingModal] = useState(null);
	const [fundingAmount, setFundingAmount] = useState(null);
	const [fundingPaymentMethod, setFundingPaymentMethod] = useState("Credit/Debit Card");
	const [minFundingAmount, setMinFundingAmount] = useState(general_min_amount);
	const [maxFundingAmount, setMaxFundingAmount] = useState(credit_card_max_amount);

	const [errorAddDeposit, setErrorAddDeposit] = useState(null);
	const [successAddDeposit, setSuccessAddDeposit] = useState(null);

	const handleFundingAmount = (e) => { e.preventDefault(); setFundingAmount(e.target.value); };
	const handleFundingPaymentMethod = (e) => { e.preventDefault(); setFundingPaymentMethod(fundingPaymentMethod === "Credit/Debit Card" ? "Transfer" : "Credit/Debit Card"); if (fundingPaymentMethod === "Credit/Debit Card") setMaxFundingAmount(transfer_max_amount); if (fundingPaymentMethod !== "Credit/Debit Card") setMaxFundingAmount(credit_card_max_amount) };

	const handleSubmit = (e) => {
		e.preventDefault();
		
		if (!loading) {
			if (fundingAmount < minFundingAmount) {
				setErrorAddDeposit(null);
				setSuccessAddDeposit(null);
				setErrorAddDeposit(`Minimum amount is NGN ${minFundingAmount.toLocaleString()}`);
				setTimeout(function () {
					setErrorAddDeposit(null);
				}, 2500)
			} else if (fundingAmount > maxFundingAmount) {
				setErrorAddDeposit(`Maximum amount is NGN ${maxFundingAmount.toLocaleString()}`);
				setTimeout(function () {
					setErrorAddDeposit(null);
				}, 2500)
			} else if (!fundingPaymentMethod) {
				setErrorAddDeposit("Payment Method is Required");
				setTimeout(function () {
					setErrorAddDeposit(null);
				}, 2500)
			} else {
				setLoading(true);
	
				const addDepositRes = addPlatformDeposit(cookie, {
					amount: parseInt(fundingAmount),
					payment_method: fundingPaymentMethod
				})
	
				addDepositRes.then(res => {
					setLoading(false);
					if (res.err) {
						if (!res.error.response.data.success) {
							const error = `${res.error.response.data.message}`;
							setErrorAddDeposit(error);
							setTimeout(function () {
								setErrorAddDeposit(null);
							}, 2000)
						} else {
							const error = `${res.error.code} - ${res.error.message}`;
							setErrorAddDeposit(error);
							setTimeout(function () {
								setErrorAddDeposit(null);
							}, 2000)
						}
					} else {
						setErrorAddDeposit(null);
						setSuccessAddDeposit(`Transaction added successfully!`);
	
						setTimeout(function () {
							if (fundingPaymentMethod === "Transfer") {
								setSuccessAddDeposit(null);
								setRemoveFundingModal(true);
								setFundingAmount(0);
							} else {
								setSuccessAddDeposit(null);
								setRemoveFundingModal(true);
								setFundingAmount(0);
								// Do paystack stuffs here
								console.log({
									amount: fundingAmount,
									payment_method: fundingPaymentMethod
								});
							}
						}, 2500)
					}
				}).catch(err => {
					setLoading(false);
				})
	
			}
		}
	};

	return {
		cookie, loading, removeFundingModal, fundingAmount, fundingPaymentMethod, errorAddDeposit, successAddDeposit, 
		handleFundingAmount, handleFundingPaymentMethod, handleSubmit, setRemoveFundingModal
	};
};

const useCancelDeposit = () => {

	const {cookie} = useCookie(config.token, "");

	const [loadingCancelDeposit, setLoadingCancelDeposit] = useState(false);
	const [removeCancelDepositModal, setRemoveCancelDepositModal] = useState(null);
	const [cancelDepositUniqueId, setCancelDepositUniqueId] = useState(null);

	const [errorCancelDeposit, setErrorCancelDeposit] = useState(null);
	const [successCancelDeposit, setSuccessCancelDeposit] = useState(null);

	const handleCancelDeposit = () => {

		if (!loadingCancelDeposit) {
			if (!cancelDepositUniqueId) {
				setErrorCancelDeposit(null);
				setSuccessCancelDeposit(null);
				setErrorCancelDeposit("Unique ID is required");
				setTimeout(function () {
					setErrorCancelDeposit(null);
				}, 2500)
			} else {
				setLoadingCancelDeposit(true);
	
				const cancelDepositRes = cancelPlatformDeposit(cookie, {
					unique_id: cancelDepositUniqueId
				})
	
				cancelDepositRes.then(res => {
					setLoadingCancelDeposit(false);
					if (res.err) {
						if (!res.error.response.data.success) {
							const error = `${res.error.response.data.message}`;
							setErrorCancelDeposit(error);
							setTimeout(function () {
								setErrorCancelDeposit(null);
							}, 2000)
						} else {
							const error = `${res.error.code} - ${res.error.message}`;
							setErrorCancelDeposit(error);
							setTimeout(function () {
								setErrorCancelDeposit(null);
							}, 2000)
						}
					} else {
						setErrorCancelDeposit(null);
						setSuccessCancelDeposit(`Transaction cancelled successfully!`);
	
						setTimeout(function () {
							setSuccessCancelDeposit(null);
							setRemoveCancelDepositModal(true);
							setCancelDepositUniqueId(null);
						}, 2500)
					}
				}).catch(err => {
					setLoadingCancelDeposit(false);
				})
	
			}
		}
	};

	return {
		cookie, loadingCancelDeposit, removeCancelDepositModal, cancelDepositUniqueId, errorCancelDeposit, successCancelDeposit,
		handleCancelDeposit, setRemoveCancelDepositModal, setCancelDepositUniqueId
	};
};

export { useAddDeposit, useCancelDeposit };