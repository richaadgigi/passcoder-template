import { useState } from "react";
import useCookie from "../hooks/useCookie";
import { config } from "../config";
import { addPartnerDeposit, cancelPartnerDeposit, completePartnerDeposit, deletePartnerTransaction } from "../api/transactions";
import { premiumUpgrade } from "../api/partner";

const useAddDeposit = () => {

	const {cookie} = useCookie(config.token, "");

	const general_min_amount = 1000;
	const credit_card_max_amount = 20000;
	const transfer_max_amount = 100000;

	const [loading, setLoading] = useState(false);
	const [removeFundingModal, setRemoveFundingModal] = useState(null);
	const [fundingAmount, setFundingAmount] = useState(null);
	const [fundingPaymentMethod, setFundingPaymentMethod] = useState("Transfer");
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
			} else if (fundingPaymentMethod === "Transfer") {
				setErrorAddDeposit("Unable to process transaction, follow Transfer funding instruction");
				setTimeout(function () {
					setErrorAddDeposit(null);
				}, 4500)
			} else {
				setLoading(true);
	
				const addDepositRes = addPartnerDeposit(cookie, {
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
	
				const cancelDepositRes = cancelPartnerDeposit(cookie, {
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

const usePremiumUpgrade = () => {

	const { cookie } = useCookie(config.token, "");

	const [loadingPremiumPackage, setLoadingPremiumPackage] = useState(false);
	const [removePremiumUpgradeModal, setRemovePremiumUpgradeModal] = useState(null);
	const [showPremiumUpgradeSuccessModal, setShowPremiumUpgradeSuccessModal] = useState(null);
	const [premiumPackage, setPremiumPackage] = useState("");
	const [months, setMonths] = useState(1);
	const [paymentMethod, setPaymentMethod] = useState("Credit/Debit Card");

	const [errorPremiumUpgrade, setErrorPremiumUpgrade] = useState(null);
	const [successPremiumUpgrade, setSuccessPremiumUpgrade] = useState(null);

	const handlePremiumPackage = (e) => { e.preventDefault(); setPremiumPackage(e.target.value); };
	const handleMonths = (e) => { e.preventDefault(); setMonths(e.target.value); };
	const handlePaymentMethod = (e) => { e.preventDefault(); setPaymentMethod(paymentMethod === "Credit/Debit Card" ? "Transfer" : "Credit/Debit Card"); };

	const handlePremiumUpgradeSubmit = (e) => {
		e.preventDefault();

		if (!loadingPremiumPackage) {
			if (!premiumPackage) {
				setErrorPremiumUpgrade(null);
				setSuccessPremiumUpgrade(null);
				setErrorPremiumUpgrade("Package is required");
				setTimeout(function () {
					setErrorPremiumUpgrade(null);
				}, 2500)
			} else if (months < 1) {
				setErrorPremiumUpgrade(`Minimum of 1 month`);
				setTimeout(function () {
					setErrorPremiumUpgrade(null);
				}, 2500)
			} else if (months > 12) {
				setErrorPremiumUpgrade(`Minimum of 12 months`);
				setTimeout(function () {
					setErrorPremiumUpgrade(null);
				}, 2500)
			} else if (!paymentMethod) {
				setErrorPremiumUpgrade("Payment Method is Required");
				setTimeout(function () {
					setErrorPremiumUpgrade(null);
				}, 2500)
			} else {
				setLoadingPremiumPackage(true);

				const premiumUpgradeRes = premiumUpgrade(cookie, {
					package: premiumPackage,
					months: parseInt(months),
					payment_method: paymentMethod
				})

				premiumUpgradeRes.then(res => {
					setLoadingPremiumPackage(false);
					if (res.err) {
						if (!res.error.response.data.success) {
							const error = `${res.error.response.data.message}`;
							setErrorPremiumUpgrade(error);
							setTimeout(function () {
								setErrorPremiumUpgrade(null);
							}, 2000)
						} else {
							const error = `${res.error.code} - ${res.error.message}`;
							setErrorPremiumUpgrade(error);
							setTimeout(function () {
								setErrorPremiumUpgrade(null);
							}, 2000)
						}
					} else {
						setErrorPremiumUpgrade(null);
						setSuccessPremiumUpgrade(`Upgraded to premium successfully!`);

						setTimeout(function () {
							setSuccessPremiumUpgrade(null);
							setRemovePremiumUpgradeModal(true);
							// setShowPremiumUpgradeSuccessModal(true);
							setMonths(1);
						}, 2500)
					}
				}).catch(err => {
					setLoadingPremiumPackage(false);
				})

			}
		}
	};

	return {
		cookie, loadingPremiumPackage, premiumPackage, months, paymentMethod, errorPremiumUpgrade, successPremiumUpgrade,
		handlePremiumPackage, handleMonths, handlePaymentMethod, handlePremiumUpgradeSubmit, setRemovePremiumUpgradeModal, 
		showPremiumUpgradeSuccessModal, removePremiumUpgradeModal, setShowPremiumUpgradeSuccessModal
	};
};

export { useAddDeposit, useCancelDeposit, usePremiumUpgrade };