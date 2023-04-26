import { useState, useEffect } from "react";
import Check from "../../icons/Check";
import Copy from "../../icons/Copy";
import Reset from "../../icons/Reset";
import Loading from "../../icons/Loading";
import { useResetMasterToken } from "../../hooks/useSettings";
import { useGetPartner } from "../../hooks/usePartner";
import Close from "../../icons/Close";

export default function MasterToken(){
    const [canCallPartnerDetails, setCanCallPartnerDetails] = useState(false);
    const [masterToken, setMasterToken] = useState("");
    const [copiedMasterToken, setCopiedMasterToken] = useState(false);

    const {
        errorResetMasterToken, handleResetMasterToken, loadingResetMasterToken, removeResetMasterTokenModal,
        setRemoveResetMasterTokenModal, successResetMasterToken, handleStripped
    } = useResetMasterToken();

    const { getPartnerDetails, partnerDetails } = useGetPartner();

    const callGetPartnerDetails = getPartnerDetails;

    if (successResetMasterToken) callGetPartnerDetails();

    if (canCallPartnerDetails) {
        setTimeout(function () {
            callGetPartnerDetails();
            setCanCallPartnerDetails(false);
        }, 2000)
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
    };

    const copyMasterToken = (masterToken) => {
        copyText(masterToken);
        setCopiedMasterToken(true);
        setTimeout(function () {
            setCopiedMasterToken(false);
        }, 2000)
    };

    if (removeResetMasterTokenModal) {
        const modalResponse = document.querySelector("#resetMasterToken");
        modalResponse.setAttribute("display", false);
        callGetPartnerDetails(); 
        setRemoveResetMasterTokenModal(null);
    }

    useEffect(() => {
        if (partnerDetails !== null) {
            setMasterToken(partnerDetails.data.token);
        }
    }, [partnerDetails]);

    return(
        <>
            <form className="xui-form xui-mt-1">
                <div className="xui-form-box xui-w-fluid-100">
                    <label>Token</label>
                    <div className="xui-d-flex xui-flex-ai-center">
                            <input style={{ width: "calc(100% - 100px)" }} readOnly type={"text"} placeholder={partnerDetails ? partnerDetails.data.token : ""} value={masterToken} />
                        <div className="xui-w-100 xui-d-flex">
                            <div onClick={() => { if (partnerDetails) setMasterToken(partnerDetails.data.token); copyMasterToken(partnerDetails.data.token); }} className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-bg-light-blue xui-ml-half xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer psc-text">
                                {
                                    copiedMasterToken ?
                                        <Check width="16" height="16" /> :
                                        <Copy width="16" height="16" />
                                }
                            </div>
                            <div onClick={() => handleStripped(partnerDetails.data.stripped) } className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-bg-light-blue xui-ml-half xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer psc-text" xui-modal-open="resetMasterToken">
                                <Reset width="16" height="16" />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <section className='xui-modal' xui-modal="resetMasterToken" id="resetMasterToken">
                <div className='xui-modal-content xui-max-h-500 xui-overflow-auto xui-pos-relative'>
                    <center>
                        <h1 className="5 xui-font-sz-120 xui-mb-2">Reset Master Token</h1>
                        <p className="xui-opacity-5 xui-font-sz-100 xui-mt-half xui-mb-2">Are you sure you want to cotinue with this action?</p>
                        <p className="xui-opacity-5 xui-font-sz-90 xui-text-red xui-mt-half">We will log you out and you'll have to use your new token sent to your mail to log in ...</p>
                    </center>
                    <p className="xui-font-sz-100 xui-my-1 xui-mt-2 xui-text-center xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorResetMasterToken}</span></p>
                    <p className="xui-font-sz-100 xui-my-1 xui-mt-2 xui-text-center xui-text-green"><span className="xui-font-w-bold psc-text-red">{successResetMasterToken}</span></p>
                    <div className="xui-d-flex xui-flex-ai-center xui-flex-jc-space-evenly xui-mt-2">
                        <div className="xui-d-inline-flex xui-flex-ai-center">
                            <button onClick={handleResetMasterToken} className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-green xui-bdr-rad-half xui-font-sz-85">
                                <span className="xui-mr-half">Yes</span>
                                {
                                    loadingResetMasterToken ?
                                        <Loading width="12" height="12" />
                                        : <Check width="20" height="20" />
                                }
                            </button>
                        </div>
                        <div className="xui-d-inline-flex xui-flex-ai-center">
                            <button className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-red xui-bdr-rad-half xui-font-sz-85" xui-modal-close={loadingResetMasterToken ? "" : "resetMasterToken"}>
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