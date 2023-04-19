import { useEffect, useState } from "react";
import Close from "../../icons/Close";
import GalleryAdd from "../../assets/images/gallery-add.png";
import Check from "../../icons/Check";
import Loading from "../../icons/Loading";
import { config } from "../../config";
import { getPlatform } from "../../api/platform";
import useCookie from "../../hooks/useCookie";
import { useUpdateDescription, useUpdateEmail, useUpdateName } from "../../hooks/useSettings";

export default function AccountProfile(){
    const [cookie, removeCookie] = useCookie(config.token, "");
    
    const {
        businessName, errorUpdateName, handleBusinessName, handleUpdateName, loadingUpdateName, setBusinessName, successUpdateName
    } = useUpdateName();

    const {
        businessEmail, errorUpdateEmail, handleBusinessEmail, handleUpdateEmail, loadingUpdateEmail, setBusinessEmail, successUpdateEmail, 
        removeUpdateEmailModal, setRemoveUpdateEmailModal
    } = useUpdateEmail();

    const {
        businessDescription, errorUpdateDescription, handleBusinessDescription, handleUpdateDescription, loadingUpdateDescription, 
        setBusinessDescription, successUpdateDescription
    } = useUpdateDescription();

    const [platformDetails, setPlatformDetails] = useState(null);

    async function getPlatformDetails() {
        const response = await getPlatform(cookie);
        setPlatformDetails(response.data);
        setBusinessName(response.data.name);
        setBusinessEmail(response.data.email);
        setBusinessDescription(response.data.description);
    }

    useEffect(() => {
        if (platformDetails === null) {
            getPlatformDetails();
        }
    }, [platformDetails]);

    if (removeUpdateEmailModal) {
        const modalResponse = document.querySelector("#confirmEmailUpdate");
        modalResponse.setAttribute("display", false);
        getPlatformDetails();
        setRemoveUpdateEmailModal(null);
    }
    return(
            <div className="xui-d-grid xui-grid-col-1 xui-lg-grid-col-2 xui-md-grid-col-1 xui-grid-gap-1">
                <form className="xui-form">
                    <div className="xui-form-box">
                        <center>
                            <label for="imageFile">
                                <span className="xui-d-inline-block">Your Profile Picture</span>
                                <div className="xui-opacity-6 xui-w-150 xui-h-150 xui-bdr-s-dashed xui-bdr-w-1 xui-bdr-black xui-bdr-rad-1 xui-mt-1 xui-d-flex xui-flex-dir-column xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer">
                                    <img className="xui-img-40" src={GalleryAdd} alt="" />
                                    <span className="xui-font-sz-80 xui-text-center xui-mt-1 xui-mx-auto xui-w-fluid-80">Upload your photo</span>
                                </div>
                            </label>
                            <input type={"file"} id="imageFile" style={{display:"none"}} />
                            <div className="xui-mt-1">
                                <button className="xui-btn psc-btn-blue xui-font-sz-80">Save Changes</button>
                            </div>
                        </center>
                    </div>
                </form>
                <div className="xui-form-box" style={{ marginTop: "-5px" }}>
                    <form className="xui-form">
                        <div className="xui-form-box xui-w-fluid-100 xui-lg-w-fluid-100">
                            <label>Business Name</label>
                            <div className="xui-d-flex xui-flex-ai-center">
                            <input style={{ width: "calc(100% - 50px)" }} type={"text"} value={platformDetails ? platformDetails.data.name : businessName} onChange={handleBusinessName} required />
                                <div onClick={handleUpdateName} className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-bg-light-blue xui-ml-half xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer psc-text">
                                    {
                                        loadingUpdateName ?
                                            <Loading width="16" height="16" />
                                            : <Check width="16" height="16" />
                                    }
                                </div>
                            </div>
                            <p className="xui-font-sz-80 xui-my-1 xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorUpdateName}</span></p>
                            <p className="xui-font-sz-80 xui-my-1 xui-text-green"><span className="xui-font-w-bold psc-text-red">{successUpdateName}</span></p>
                        </div>
                    </form>
                    <form className="xui-form">
                        <div className="xui-form-box xui-w-fluid-100 xui-lg-w-fluid-100">
                            <label>Business Email</label>
                            <div className="xui-d-flex xui-flex-ai-center">
                                <input style={{width: "calc(100% - 50px)"}} type={"email"} value={platformDetails ? platformDetails.data.email : businessEmail} onChange={handleBusinessEmail} required />
                                <div onClick={handleUpdateEmail} className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-bg-light-blue xui-ml-half xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer psc-text">
                                    {
                                        loadingUpdateEmail ?
                                            <Loading width="16" height="16" />
                                            : <Check width="16" height="16" />
                                    }
                                </div>
                            </div>
                            <p className="xui-font-sz-80 xui-my-1 xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorUpdateEmail}</span></p>
                            <p className="xui-font-sz-80 xui-my-1 xui-text-green"><span className="xui-font-w-bold psc-text-red">{successUpdateEmail}</span></p>
                        </div>
                    </form>
                    <form className="xui-form">
                        <div className="xui-form-box xui-w-fluid-100 xui-lg-w-fluid-100">
                            <label>Business Description</label>
                            <div className="xui-d-flex xui-flex-ai-flex-end">
                            <textarea style={{ width: "calc(100% - 50px)" }} type={"text"} value={platformDetails ? platformDetails.data.description : businessDescription} onChange={handleBusinessDescription} required></textarea>
                                <div onClick={handleUpdateDescription} className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-bg-light-blue xui-ml-half xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer psc-text">
                                    {
                                        loadingUpdateDescription ?
                                            <Loading width="16" height="16" />
                                            : <Check width="16" height="16" />
                                    }
                                </div>
                            </div>
                            <p className="xui-font-sz-80 xui-my-1 xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorUpdateDescription}</span></p>
                            <p className="xui-font-sz-80 xui-my-1 xui-text-green"><span className="xui-font-w-bold psc-text-red">{successUpdateDescription}</span></p>
                        </div>
                    </form>
                </div>
            </div>
    );
}