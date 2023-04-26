import { useEffect, useState } from "react";
import SuccessTick from "../assets/images/success-tick.png";
import Navbar from "../components/Navbar";
import Content from "../components/Content";
import Screen from '../components/Screen';
import Arrowright from '../icons/Arrowright';
import Arrowleft from '../icons/Arrowleft';
import Close from "../icons/Close";
import Check from "../icons/Check";
import Filter from "../icons/Filter";
import useCookie from "../hooks/useCookie";
import { config } from "../config";
import { getPartnerTransactions, getPartnerTransaction, getPartnerTransactionsViaStatus, getPartnerTransactionsViaType } from "../api/transactions";
import { getCompanyBankAccount } from "../api/partner";
import Loading from "../icons/Loading";
import { useAddDeposit, useCancelDeposit, usePremiumUpgrade } from "../hooks/useTransactions";
import Cancel from "../icons/Cancel";
import Copy from "../icons/Copy";
import { useGetPartner } from "../hooks/usePartner";

export default function Transactions(){
    const { cookie, forceLogout } = useCookie(config.token, "");
    const [copiedAccountNumber, setCopiedAccountNumber] = useState(false);

    const { partnerDetails } = useGetPartner();

    const { 
        errorPremiumUpgrade, handleMonths, handlePaymentMethod, handlePremiumPackage, handlePremiumUpgradeSubmit, 
        loadingPremiumPackage, months, paymentMethod, premiumPackage, successPremiumUpgrade, removePremiumUpgradeModal, 
        setRemovePremiumUpgradeModal, setShowPremiumUpgradeSuccessModal, showPremiumUpgradeSuccessModal
    } = usePremiumUpgrade();

    const {
        errorAddDeposit, fundingAmount, fundingPaymentMethod, handleFundingAmount, handleFundingPaymentMethod, 
        handleSubmit, loading, removeFundingModal, successAddDeposit, setRemoveFundingModal
    } = useAddDeposit();

    const {
        errorCancelDeposit, handleCancelDeposit, setCancelDepositUniqueId, loadingCancelDeposit, 
        removeCancelDepositModal, setRemoveCancelDepositModal, successCancelDeposit
    } = useCancelDeposit();

    const [filterType, setFilterType] = useState(null);
    const [companyBankDetails, setCompanyBankDetails] = useState(null);
    const [allTransactions, setAllTransactions] = useState(null);
    const [errorTransactions, setErrorTransactions] = useState(null);
    const [loadingAllTransactions, setLoadingAllTransactions] = useState(false);

    const [size, setSize] = useState(20);
    const [page, setPage] = useState(1);

    const handleSize = (e) => { e.preventDefault(); setSize(e.target.value); setPage(1); if (!filterType) getAllTransactions(page, e.target.value); if (filterType) getAllTypeTransactions(filterType, page, e.target.value); };
    const handleFilterType = (e) => { e.preventDefault(); setFilterType(e.target.value === "Select to Reset" ? null : e.target.value); setPage(1); if (e.target.value !== null && e.target.value !== "Select to Reset") getAllTypeTransactions(e.target.value, page, size); if (e.target.value === null || e.target.value === "Select to Reset") getAllTransactions(page, size); };

    async function previousTransactions() {
        if (page !== 1) setPage(page - 1);
        if (page !== 1) getAllTransactions(page - 1, size);
    };

    async function nextTransactions() {
        if (page < allTransactions.data.pages) setPage(page + 1);
        if (page < allTransactions.data.pages) getAllTransactions(page + 1, size);
    };

    async function getCompanyBankAccountAlt() {
        const response = await getCompanyBankAccount();
        setCompanyBankDetails(response.data);
    };
    async function getAllTransactions(_page, _size) {
        setLoadingAllTransactions(true);
        const response = await getPartnerTransactions(cookie, (_page || page), (_size || size));
        setAllTransactions(response.data);
        if (response.error) setErrorTransactions(response.error.response.data.message);
        setLoadingAllTransactions(false);
    };
    async function getAllTypeTransactions(type, _page, _size) {
        setLoadingAllTransactions(true);
        const response = await getPartnerTransactionsViaType(cookie, (_page || page), (_size || size), ({ type: type }));
        setAllTransactions(response.data);
        if (response.error) setErrorTransactions(response.error.response.data.message);
        setLoadingAllTransactions(false);
    };

    useEffect(() => {
        if (companyBankDetails === null) {
            getCompanyBankAccountAlt();
        }
        if (allTransactions === null) {
            getAllTransactions();
        }
    }, [allTransactions, companyBankDetails]);

    if (removePremiumUpgradeModal) {
        const modalResponse = document.querySelector("#upgradePlan");
        modalResponse.setAttribute("display", false);
        getAllTransactions();
        setRemovePremiumUpgradeModal(null);
    }
    if (showPremiumUpgradeSuccessModal) {
        const modalResponse = document.querySelector("#upgradePlanSuccess");
        modalResponse.setAttribute("display", true);
        getAllTransactions();
        setShowPremiumUpgradeSuccessModal(null);
    }
    if (removeCancelDepositModal) {
        const modalResponse = document.querySelector("#confirmCancellation");
        modalResponse.setAttribute("display", false);
        getAllTransactions();
        setRemoveCancelDepositModal(null);
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
    };

    const copyAccountNumber = (accountNumber) => {
        copyText(accountNumber);
        setCopiedAccountNumber(true);
        setTimeout(function () {
            setCopiedAccountNumber(false);
        }, 2000)
    };
    return(
        <>
            <Screen aside="false" navbar="false">
                <Content>
                    <Navbar placeholder="Search something..." makeHidden={true} />
                    <section className="xui-d-flex xui-flex-jc-flex-start xui-lg-flex-jc-flex-end">
                        <div>
                            <p className="xui-opacity-5 xui-font-sz-80">Current Premium Plan</p>
                            {
                                !partnerDetails ? <Loading width="12" height="12" /> : 
                                (
                                    !partnerDetails.success ? "Error" :
                                    <>
                                        <span className="xui-d-inline-block xui-font-sz-120 xui-mt-half">{partnerDetails.data.premium.type}</span><br></br>
                                        <span className="xui-d-inline-block xui-font-sz-90 xui-mt-half">{"Expiring - " + partnerDetails.data.premium.expiring.fulldate}</span><br></br>
                                        <span className="xui-d-inline-block xui-font-sz-80 xui-mt-half">{"Offers left - " + partnerDetails.data.premium.offers.toLocaleString()}</span><br></br>
                                        <span className="xui-d-inline-block xui-font-sz-80 xui-mt-half">{"Announcements left - " + partnerDetails.data.premium.announcements.toLocaleString()}</span>
                                    </>
                                )
                            }
                            <div className="xui-d-flex xui-mt-1 xui-font-sz-80 xui-lg-d-none">
                                <button className="xui-font-sz-80 xui-btn psc-btn-blue" xui-modal-open="upgradePlan">Upgrade</button>
                            </div>
                        </div>
                        <div className="xui-ml-2 xui-d-none xui-lg-d-block">
                            <button className="xui-font-sz-80 xui-btn psc-btn-blue" xui-modal-open="upgradePlan">Upgrade</button>
                        </div>
                    </section>
                    <section className="xui-d-grid xui-lg-grid-col-1 xui-grid-gap-2 xui-mt-2">
                        {
                            !companyBankDetails ?
                                <center className='xui-font-sz-110 xui-py-3'><Loading width="12" height="12" /></center> :
                                (
                                    companyBankDetails && companyBankDetails.success ? 
                                    <div className="xui-bdr-w-1 xui-bdr-s-solid xui-bdr-fade xui-py-2 xui-px-1">
                                        <span className="xui-font-sz-75 xui-opacity-5">Account Name</span>
                                        <h3 className="xui-font-sz-100 xui-font-w-normal xui-mt-half">{companyBankDetails.data.acc_name}</h3>
                                        <div className="xui-d-grid xui-grid-col-2 xui-grid-gap-2 xui-mt-2">
                                            <div>
                                                <span className="xui-font-sz-75 xui-opacity-5">Bank Name</span>
                                                <h3 className="xui-font-sz-90 xui-font-w-normal xui-mt-half">{companyBankDetails.data.acc_bank}</h3>
                                            </div>
                                            <div>
                                                <span className="xui-font-sz-75 xui-opacity-5">Account Number</span>
                                                <h3 className="xui-font-sz-90 xui-font-w-normal xui-mt-half">
                                                    {companyBankDetails.data.acc_number}
                                                    {
                                                        companyBankDetails ?
                                                            <span className="xui-cursor-pointer xui-ml-1" onClick={() => { if (companyBankDetails) copyAccountNumber(companyBankDetails.data.acc_number); }}>
                                                                {copiedAccountNumber ? <Check width="16" height="16" /> : <Copy width="16" height="16" />}
                                                            </span> :
                                                            ""
                                                    }
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="xui-mt-2">
                                            <h4 className="xui-font-sz-85 xui-mb-1 xui-font-w-normal xui-opacity-8">Steps to upgrade to premium via transfer</h4>
                                            <ol className="xui-font-sz-80 xui-opacity-5 xui-my-half">
                                                <li>See the packages below, choose the one you want to upgrade to, determine the number of months you want this to be active (12 months max).</li><br></br>
                                                <li>Copy the account number & Transfer the amount times the number of months you want (i.e. package price x month = total amount).</li><br></br>
                                                <li>Send an email to <a href="mailto:support@passcoder.io">support@passcoder.io</a> with your receipt of payment, package selected and await confirmation.</li>
                                            </ol>
                                        </div>
                                    </div> :
                                    <div className="xui-d-grid xui-lg-grid-col-1 xui-grid-gap-2 xui-mt-2">
                                        <div className="xui-bdr-w-1 xui-bdr-s-solid xui-bdr-fade xui-py-2 xui-px-1">
                                            <center className="xui-text-red">
                                                <Close width="100" height="100" />
                                                <h3 className="xui-font-sz-120 xui-font-w-normal xui-mt-half">{companyBankDetails ? companyBankDetails.message : "..."}</h3>
                                            </center>
                                        </div>
                                    </div>
                                )
                        }
                        {/* <div className="xui-bdr-w-1 xui-bdr-s-solid xui-bdr-fade xui-py-2 xui-px-1">
                            <h3 className="xui-font-sz-100 xui-font-w-normal xui-mt-half">Low Wallet Threshold</h3>
                            <span className="xui-font-sz-75 xui-opacity-5">Get alerts when your balance is below this amount</span>
                            <hr className="xui-opacity-4 xui-my-1" />
                            <span className="xui-d-inline-block xui-font-sz-150 xui-mt-half">NGN 0.00</span>
                            <div className="xui-mt-2 xui-d-flex xui-flex-ai-center">
                                <div className="xui-toggle-switch">
                                    <input type="checkbox" />
                                    <div className="slider"></div>
                                </div>
                                <span className="xui-d-inline-block xui-ml-1 xui-font-sz-90 xui-opacity-7">Auto-wallet Funding</span>
                            </div>
                            <button className="xui-btn psc-btn-blue xui-font-sz-80 xui-mt-2">Set Threshold Amount</button>
                        </div>
                        <div className="xui-bdr-w-1 xui-bdr-s-solid xui-bdr-fade xui-py-2 xui-px-1">
                            <h3 className="xui-font-sz-100 xui-font-w-normal xui-mt-half">Billing Account</h3>
                            <span className="xui-font-sz-75 xui-opacity-5">Set up account for direct debit for when wallet is low</span>
                            <hr className="xui-opacity-4 xui-my-1" />
                            <h2 className="xui-font-w-normal xui-font-sz-125 xui-text-center xui-mx-auto xui-w-fluid-90 xui-my-2">You have not added any card yet</h2>
                            <button className="xui-btn psc-btn-blue xui-font-sz-80 xui-mt-2">Add backup payment method</button>
                        </div> */}
                    </section>
                    <section className='xui-mt-2'>
                        <div className='xui-d-flex xui-flex-ai-center xui-flex-jc-space-between xui-py-1 psc-section-header'>
                            <div className="xui-mb-1">
                                <h1 className='xui-font-sz-110 xui-font-w-normal'>All Transactions</h1>
                                <p className="xui-opacity-5 xui-font-sz-90 xui-mt-half">View your transaction history</p>
                            </div>
                            {/* <div className="xui-mb-1">
                                <div className='xui-d-inline-flex'>
                                    <div className='xui-d-inline-flex xui-flex-ai-center xui-ml-1-half'>
                                        <Filter width="16" height="16" />
                                        <select value={filterType} onChange={handleFilterType} className='psc-select-rows-per-page xui-font-w-normal xui-font-sz-80 xui-ml-half'>
                                            {
                                                !filterType ?
                                                <option selected disabled>Filter By Type</option> :
                                                <option value={null}>Select to Reset</option>
                                            }
                                            <option value={"Deposit"}>Deposit</option>
                                            <option value={"API Call"}>API Call</option>
                                            <option value={"Subscription"}>Subscription</option>
                                        </select>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        {
                            loadingAllTransactions ?
                                <center className='xui-font-sz-110 xui-py-3'><Loading width="12" height="12" /></center> :
                                (
                                    allTransactions && allTransactions.success ?
                                    <div className='xui-table-responsive'>
                                        <table className='xui-table xui-font-sz-90'>
                                            <thead>
                                                <tr className='xui-text-left xui-opacity-6'>
                                                    <th className='xui-min-w-150'>Reference</th>
                                                    <th className='xui-min-w-100'>Type</th>
                                                    <th className='xui-min-w-200'>Payment Method</th>
                                                    <th className='xui-min-w-150'>Amount</th>
                                                    <th className='xui-min-w-150'>Status</th>
                                                    <th className='xui-min-w-300'>Date</th>
                                                    <th className='xui-min-w-100'>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {allTransactions.data.rows.map((data, i) => (
                                                    <tr className='' key={i}>
                                                        <td className='xui-opacity-5'>
                                                            <span>#{data.unique_id}</span>
                                                        </td>
                                                        <td className='xui-opacity-5'>
                                                            <span>{data.type}</span>
                                                        </td>
                                                        <td className='xui-opacity-5'>
                                                            <span>{data.payment_method ? data.payment_method : "Not found"}</span>
                                                        </td>
                                                        <td className='xui-opacity-5 xui-font-w-bold'>
                                                            <span>{data.amount === 0 ? "Free" : "NGN " + data.amount.toLocaleString()}</span>
                                                        </td>
                                                        <td className=''>
                                                            {
                                                                data.transaction_status === "Completed" ?
                                                                    <span className='xui-badge xui-badge-success xui-font-sz-80 xui-bdr-rad-half'>{data.transaction_status}</span> : ""
                                                            }
                                                            {
                                                                data.transaction_status === "Processing" ?
                                                                    <span className='xui-badge xui-badge-warning xui-font-sz-80 xui-bdr-rad-half'>{data.transaction_status}</span> : ""
                                                            }
                                                            {
                                                                data.transaction_status === "Cancelled" ?
                                                                    <span className='xui-badge xui-badge-danger xui-font-sz-80 xui-bdr-rad-half'>{data.transaction_status}</span> : ""
                                                            }
                                                        </td>
                                                        <td className='xui-opacity-5'>
                                                            <span>{data.updatedAt.date} at {data.updatedAt.time}</span>
                                                        </td>
                                                        <td className=''>
                                                            {
                                                                data.transaction_status === "Processing" ?
                                                                <button title="Cancel Transaction" onClick={() => { setCancelDepositUniqueId(data.unique_id); }} className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-red xui-bdr-rad-half xui-font-sz-50" xui-modal-open="confirmCancellation">
                                                                    <Cancel width="20" height="20" />
                                                                </button> : 
                                                                ""
                                                            }
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div> :
                                    <div className="xui-d-grid xui-lg-grid-col-1 xui-grid-gap-2 xui-mt-2">
                                        <div className="xui-bdr-w-1 xui-bdr-s-solid xui-bdr-fade xui-py-2 xui-px-1">
                                            <center className="xui-text-red">
                                                <Close width="100" height="100" />
                                                <h3 className="xui-font-sz-120 xui-font-w-normal xui-mt-half">{errorTransactions}</h3>
                                            </center>
                                        </div>
                                    </div>
                                )
                        }
                        {
                            loadingAllTransactions ?
                                <Loading width="12" height="12" /> :
                                (
                                    allTransactions && allTransactions.success ?
                                        <div className='xui-d-flex xui-flex-jc-flex-end xui-py-1 xui-font-sz-85 xui-opacity-5 xui-mt-1'>
                                            <div className='xui-d-inline-flex xui-flex-ai-center'>
                                                <span>Rows per page:</span>
                                                <select value={size} onChange={handleSize} className='psc-select-rows-per-page xui-ml-half'>
                                                    <option value={20}>20</option>
                                                    <option value={50}>50</option>
                                                    <option value={100}>100</option>
                                                </select>
                                            </div>
                                            <div className='xui-mx-1 xui-lg-mx-2'>
                                            <span><span className='xui-font-w-bold'>{page}</span> of {allTransactions ? allTransactions.data.pages : "..."}</span>
                                            </div>
                                            <div className='xui-d-inline-flex xui-flex-ai-center xui-mx-1'>
                                                <div className='xui-mr-half xui-cursor-pointer' title="Previous" onClick={previousTransactions}>
                                                    <Arrowleft width="18" height="18" />
                                                </div>
                                                <div className='xui-ml-half xui-cursor-pointer' title="Next" onClick={nextTransactions}>
                                                    <Arrowright width="18" height="18" />
                                                </div>
                                            </div>
                                        </div> :
                                        ""
                                )
                        }
                    </section>
                </Content>
            </Screen>
            <section className='xui-modal' xui-modal="upgradePlan" id="upgradePlan">
                <div className='xui-modal-content xui-max-h-500 xui-overflow-auto xui-pos-relative'>
                    <div className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-d-flex xui-flex-ai-center xui-flex-jc-center psc-bg xui-text-white psc-modal-close" xui-modal-close="upgradePlan">
                        <Close width="24" height="24" />
                    </div>
                    <h1>Fund Wallet</h1>
                    <form className="xui-form" onSubmit={handleSubmit}>
                        <div className="xui-form-box">
                            <label>Enter amount <span className="xui-font-w-bold">(NGN)</span></label>
                            <input required onChange={handleFundingAmount} value={fundingAmount} type={"number"} />
                        </div>
                        <div className="xui-d-flex xui-flex-ai-center xui-flex-jc-space-evenly">
                            <div className="xui-d-inline-flex xui-flex-ai-center">
                                <input required type="radio" onChange={handleFundingPaymentMethod} checked={fundingPaymentMethod === "Credit/Debit Card"} id="credit_card" />
                                <label for="credit_card" className="xui-ml-half" style={{ marginBottom: '0' }}>Card</label>
                            </div>
                            <div className="xui-d-inline-flex xui-flex-ai-center">
                                <input required type="radio" onChange={handleFundingPaymentMethod} checked={fundingPaymentMethod === "Transfer"} id="transfer" />
                                <label for="transfer" className="xui-ml-half" style={{ marginBottom: '0' }}>Transfer</label>
                            </div>
                        </div>
                        <div className="xui-form-box xui-d-flex xui-flex-jc-flex-end">
                            <button className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85">
                                <span className="xui-mr-half">Top Up</span>
                                {
                                    loading ?
                                        <Loading width="12" height="12" />
                                        : <Arrowright width="12" height="12" />
                                }
                            </button>
                        </div>
                    </form>
                    <p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorAddDeposit}</span></p>
                    <p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-green"><span className="xui-font-w-bold psc-text-red">{successAddDeposit}</span></p>
                </div>
            </section>
            <section className='xui-modal' xui-modal="upgradePlanSuccess" id="upgradePlanSuccess">
                <div className='xui-modal-content xui-max-h-500 xui-overflow-auto xui-pos-relative'>
                    <center>
                        <h1>Premium Upgrade Successful</h1>
                        <img className="xui-img-40 xui-my-2" src={SuccessTick} alt="" />
                    </center>
                    <center>
                        <div className="xui-d-inline-flex xui-flex-ai-center xui-mt-2">
                            <button className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85" xui-modal-close="upgradePlanSuccess">
                                <span className="xui-mr-half">Continue</span>
                                <Close width="20" height="20" />
                            </button>
                        </div>
                    </center>
                </div>
            </section>
            <section className='xui-modal' xui-modal="confirmCancellation" id="confirmCancellation">
                <div className='xui-modal-content xui-max-h-500 xui-overflow-auto xui-pos-relative'>
                    <center>
                        <h1>Cancel Transaction</h1>
                        <p className="xui-opacity-5 xui-font-sz-90 xui-mt-half">Are you sure you want to cotinue with this action?</p>
                    </center>
                    <p className="xui-font-sz-80 xui-my-1 xui-mt-1 xui-text-center xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorCancelDeposit}</span></p>
                    <p className="xui-font-sz-80 xui-my-1 xui-mt-1 xui-text-center xui-text-green"><span className="xui-font-w-bold psc-text-red">{successCancelDeposit}</span></p>
                    <div className="xui-d-flex xui-flex-ai-center xui-flex-jc-space-evenly xui-mt-2">
                        <div className="xui-d-inline-flex xui-flex-ai-center">
                            <button onClick={handleCancelDeposit} className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-green xui-bdr-rad-half xui-font-sz-85">
                                <span className="xui-mr-half">Yes</span>
                                {
                                    loadingCancelDeposit ?
                                        <Loading width="12" height="12" />
                                        : <Check width="20" height="20" />
                                }
                            </button>
                        </div>
                        <div className="xui-d-inline-flex xui-flex-ai-center">
                            <button className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-red xui-bdr-rad-half xui-font-sz-85" xui-modal-close={loadingCancelDeposit ? "" : "confirmCancellation"}>
                                <span className="xui-mr-half">No</span>
                                <Close width="20" height="20" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}