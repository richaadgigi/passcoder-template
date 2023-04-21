import { useState } from "react";
import Check from "../../icons/Check";
import Copy from "../../icons/Copy";
import Reset from "../../icons/Reset";
import Loading from "../../icons/Loading";
import { useResetLiveApiKey, useResetTestApiKey, useResetMasterToken } from "../../hooks/useSettings";
import { useGetPlatform } from "../../hooks/usePlatform";
import Close from "../../icons/Close";

export default function ApiKeys(){
    const [canCallPlatformDetails, setCanCallPlatformDetails] = useState(false);
    const [liveApiKey, setLiveApiKey] = useState("");
    const [testApiKey, setTestApiKey] = useState("");
    const [masterToken, setMasterToken] = useState("");
    const [copiedLiveApiKey, setCopiedLiveApiKey] = useState(false);
    const [copiedTestApiKey, setCopiedTestApiKey] = useState(false);
    const [copiedMasterToken, setCopiedMasterToken] = useState(false);

    const {
        errorResetLiveApiKey, handleResetLiveApiKey, loadingResetLiveApiKey, removeResetLiveApiKeyModal, 
        setRemoveResetLiveApiKeyModal, successResetLiveApiKey
    } = useResetLiveApiKey();

    const {
        errorResetTestApiKey, handleResetTestApiKey, loadingResetTestApiKey, removeResetTestApiKeyModal,
        setRemoveResetTestApiKeyModal, successResetTestApiKey
    } = useResetTestApiKey();

    const {
        errorResetMasterToken, handleResetMasterToken, loadingResetMasterToken, removeResetMasterTokenModal,
        setRemoveResetMasterTokenModal, successResetMasterToken, handleStripped
    } = useResetMasterToken();

    const { getPlatformDetails, platformDetails } = useGetPlatform();

    const callGetPlatformDetails = getPlatformDetails;

    if (successResetLiveApiKey || successResetTestApiKey || successResetMasterToken) callGetPlatformDetails();

    if (canCallPlatformDetails) {
        setTimeout(function () {
            callGetPlatformDetails();
            setCanCallPlatformDetails(false);
        }, 2000)
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
    };

    const copyLiveApiKey = (liveApiKey) => { 
        copyText(liveApiKey); 
        setCopiedLiveApiKey(true); 
        setTimeout(function() {
            setCopiedLiveApiKey(false);
        }, 2000)
    };

    const copyTestApiKey = (testApiKey) => {
        copyText(testApiKey);
        setCopiedTestApiKey(true);
        setTimeout(function () {
            setCopiedTestApiKey(false);
        }, 2000)
    };

    const copyMasterToken = (masterToken) => {
        copyText(masterToken);
        setCopiedMasterToken(true);
        setTimeout(function () {
            setCopiedMasterToken(false);
        }, 2000)
    };

    if (removeResetLiveApiKeyModal) {
        const modalResponse = document.querySelector("#resetLiveApiKey");
        modalResponse.setAttribute("display", false);
        getPlatformDetails();
        setRemoveResetLiveApiKeyModal(null);
    }
    if (removeResetTestApiKeyModal) {
        const modalResponse = document.querySelector("#resetTestApiKey");
        modalResponse.setAttribute("display", false);
        getPlatformDetails();
        setRemoveResetTestApiKeyModal(null);
    }
    if (removeResetMasterTokenModal) {
        const modalResponse = document.querySelector("#resetMasterToken");
        modalResponse.setAttribute("display", false);
        getPlatformDetails();
        setRemoveResetMasterTokenModal(null);
    }

    return(
        <>
            <form className="xui-form xui-mt-1">
                <div className="xui-form-box xui-w-fluid-100">
                    <label>Live API Key</label>
                    <div className="xui-d-flex xui-flex-ai-center">
                        <input style={{ width: "calc(100% - 100px)" }} id="liveApiKey" readOnly type={"text"} placeholder={platformDetails ? platformDetails.data.live_api_key : ""} value={liveApiKey} />
                        <div className="xui-w-100 xui-d-flex">
                            <div onClick={() => { if (platformDetails) setLiveApiKey(platformDetails.data.live_api_key); copyLiveApiKey(platformDetails.data.live_api_key); }} className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-bg-light-blue xui-ml-half xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer psc-text">
                                {
                                    copiedLiveApiKey ? 
                                    <Check width="16" height="16" /> :
                                    <Copy width="16" height="16" />
                                }
                            </div>
                            <div className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-bg-light-blue xui-ml-half xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer psc-text" xui-modal-open="resetLiveApiKey">
                                <Reset width="16" height="16" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xui-form-box xui-w-fluid-100">
                    <label>Test API Key</label>
                    <div className="xui-d-flex xui-flex-ai-center">
                        <input style={{ width: "calc(100% - 100px)" }} readOnly type={"text"} placeholder={platformDetails ? platformDetails.data.test_api_key : ""} value={testApiKey} />
                        <div className="xui-w-100 xui-d-flex">
                                <div onClick={() => { if (platformDetails) setTestApiKey(platformDetails.data.test_api_key); copyTestApiKey(platformDetails.data.test_api_key); }} className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-bg-light-blue xui-ml-half xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer psc-text">
                                {
                                    copiedTestApiKey ?
                                        <Check width="16" height="16" /> :
                                        <Copy width="16" height="16" />
                                }
                            </div>
                            <div className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-bg-light-blue xui-ml-half xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer psc-text" xui-modal-open="resetTestApiKey">
                                <Reset width="16" height="16" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xui-form-box xui-w-fluid-100">
                    <label>Token</label>
                    <div className="xui-d-flex xui-flex-ai-center">
                            <input style={{ width: "calc(100% - 100px)" }} readOnly type={"text"} placeholder={platformDetails ? platformDetails.data.token : ""} value={masterToken} />
                        <div className="xui-w-100 xui-d-flex">
                            <div onClick={() => { if (platformDetails) setMasterToken(platformDetails.data.token); copyMasterToken(platformDetails.data.token); }} className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-bg-light-blue xui-ml-half xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer psc-text">
                                {
                                    copiedMasterToken ?
                                        <Check width="16" height="16" /> :
                                        <Copy width="16" height="16" />
                                }
                            </div>
                            <div onClick={() => handleStripped(platformDetails.data.stripped) } className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-bg-light-blue xui-ml-half xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer psc-text" xui-modal-open="resetMasterToken">
                                <Reset width="16" height="16" />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <section className='xui-modal' xui-modal="resetLiveApiKey" id="resetLiveApiKey">
                <div className='xui-modal-content xui-max-h-500 xui-overflow-auto xui-pos-relative'>
                    <center>
                        <h1 className="5 xui-font-sz-120 xui-mb-2">Reset Live API Key</h1>
                        <p className="xui-opacity-5 xui-font-sz-100 xui-mt-half xui-mb-2">Are you sure you want to cotinue with this action?</p>
                    </center>
                    <p className="xui-font-sz-100 xui-my-1 xui-mt-2 xui-text-center xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorResetLiveApiKey}</span></p>
                    <p className="xui-font-sz-100 xui-my-1 xui-mt-2 xui-text-center xui-text-green"><span className="xui-font-w-bold psc-text-red">{successResetLiveApiKey}</span></p>
                    <div className="xui-d-flex xui-flex-ai-center xui-flex-jc-space-evenly xui-mt-2">
                        <div className="xui-d-inline-flex xui-flex-ai-center">
                            <button onClick={handleResetLiveApiKey} className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-green xui-bdr-rad-half xui-font-sz-85">
                                <span className="xui-mr-half">Yes</span>
                                {
                                    loadingResetLiveApiKey ?
                                        <Loading width="12" height="12" />
                                        : <Check width="20" height="20" />
                                }
                            </button>
                        </div>
                        <div className="xui-d-inline-flex xui-flex-ai-center">
                            <button className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-red xui-bdr-rad-half xui-font-sz-85" xui-modal-close={loadingResetLiveApiKey ? "" : "resetLiveApiKey"}>
                                <span className="xui-mr-half">No</span>
                                <Close width="20" height="20" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className='xui-modal' xui-modal="resetTestApiKey" id="resetTestApiKey">
                <div className='xui-modal-content xui-max-h-500 xui-overflow-auto xui-pos-relative'>
                    <center>
                        <h1 className="5 xui-font-sz-120 xui-mb-2">Reset Test API Key</h1>
                        <p className="xui-opacity-5 xui-font-sz-100 xui-mt-half xui-mb-2">Are you sure you want to cotinue with this action?</p>
                    </center>
                    <p className="xui-font-sz-100 xui-my-1 xui-mt-2 xui-text-center xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorResetTestApiKey}</span></p>
                    <p className="xui-font-sz-100 xui-my-1 xui-mt-2 xui-text-center xui-text-green"><span className="xui-font-w-bold psc-text-red">{successResetTestApiKey}</span></p>
                    <div className="xui-d-flex xui-flex-ai-center xui-flex-jc-space-evenly xui-mt-2">
                        <div className="xui-d-inline-flex xui-flex-ai-center">
                            <button onClick={handleResetTestApiKey} className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-green xui-bdr-rad-half xui-font-sz-85">
                                <span className="xui-mr-half">Yes</span>
                                {
                                    loadingResetTestApiKey ?
                                        <Loading width="12" height="12" />
                                        : <Check width="20" height="20" />
                                }
                            </button>
                        </div>
                        <div className="xui-d-inline-flex xui-flex-ai-center">
                            <button className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-red xui-bdr-rad-half xui-font-sz-85" xui-modal-close={loadingResetTestApiKey ? "" : "resetTestApiKey"}>
                                <span className="xui-mr-half">No</span>
                                <Close width="20" height="20" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
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