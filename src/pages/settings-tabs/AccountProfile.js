import { useState } from "react";
import Close from "../../icons/Close";
import GalleryAdd from "../../assets/images/gallery-add.png";
import Check from "../../icons/Check";
import Loading from "../../icons/Loading";
import { useUpdateDescription, useUpdateEmail, useUpdateName, useUploadPlatformProfilePhoto } from "../../hooks/useSettings";
import { useGetPlatform } from "../../hooks/usePlatform";

export default function AccountProfile(){
    const [canCallPlatformDetails, setCanCallPlatformDetails] = useState(false);

    const {
        businessName, errorUpdateName, handleBusinessName, handleUpdateName, loadingUpdateName, setBusinessName, successUpdateName, 
        removeUpdateNameModal, setRemoveUpdateNameModal
    } = useUpdateName();

    const {
        businessEmail, errorUpdateEmail, handleBusinessEmail, handleUpdateEmail, loadingUpdateEmail, setBusinessEmail, successUpdateEmail, 
        removeUpdateEmailModal, setRemoveUpdateEmailModal, handleStripped
    } = useUpdateEmail();

    const {
        businessDescription, errorUpdateDescription, handleBusinessDescription, handleUpdateDescription, loadingUpdateDescription, 
        setBusinessDescription, successUpdateDescription
    } = useUpdateDescription();

    const {
        getPlatformDetails, platformDetails
    } = useGetPlatform();

    const {
        errorProfilePhoto, handleUploadProfilePhoto, loadingProfilePhoto, setPlatformUniqueId, setSelectedProfilePhoto, successProfilePhoto, 
        uploadingProfilePhotoPercentage, selectedProfilePhoto
    } = useUploadPlatformProfilePhoto();

    const callGetPlatformDetails = getPlatformDetails;

    if (successUpdateName || successUpdateEmail || successUpdateDescription || successProfilePhoto) callGetPlatformDetails();

    if (canCallPlatformDetails) { 
        setTimeout(function () {
            callGetPlatformDetails(); 
            setCanCallPlatformDetails(false);
        }, 2000)
    }

    if (removeUpdateEmailModal) {
        const modalResponse = document.querySelector("#confirmEmailUpdate");
        modalResponse.setAttribute("display", false);
        getPlatformDetails();
        setRemoveUpdateEmailModal(null);
    }
    if (removeUpdateNameModal) {
        const modalResponse = document.querySelector("#confirmNameUpdate");
        modalResponse.setAttribute("display", false);
        getPlatformDetails();
        setRemoveUpdateNameModal(null);
    }

    const handleSelectProfilePhoto = (e) => {
        const el = e.target.files[0];
        setSelectedProfilePhoto("");
        setSelectedProfilePhoto(el);
    }
    return(
        <>
            <div className="xui-d-grid xui-grid-col-1 xui-lg-grid-col-2 xui-md-grid-col-1 xui-grid-gap-1">
                <form className="xui-form" onSubmit={handleUploadProfilePhoto}>
                    <div className="xui-form-box">
                        <center>
                            <span className="xui-d-inline-block">Your Profile Picture</span>
                            <label htmlFor="imageFile">
                                <div className="xui-opacity-6 xui-w-250 xui-h-250 xui-bdr-s-dashed xui-bdr-w-1 xui-bdr-black xui-bdr-rad-1 xui-mt-1 xui-d-flex xui-flex-dir-column xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer">
                                    {
                                        selectedProfilePhoto ?
                                            <span className="xui-font-sz-120 xui-text-center xui-mt-1 xui-mx-auto xui-w-fluid-80" style={{ wordBreak: "break-word" }}>{selectedProfilePhoto.name}</span> :
                                            <>
                                                <img className="xui-img-40" src={platformDetails ? platformDetails.data.photo : GalleryAdd} alt="" />
                                                <span className="xui-font-sz-90 xui-text-center xui-mt-1 xui-mx-auto xui-w-fluid-80">Click to select file</span>
                                            </>
                                    }
                                </div>
                            </label>
                            <input onClick={() => { if (platformDetails) setPlatformUniqueId(platformDetails.data.platform_unique_id) }} onChange={handleSelectProfilePhoto} type={"file"} id="imageFile" style={{display:"none"}} required />
                            <div className="xui-mt-1">
                                {
                                    uploadingProfilePhotoPercentage > 0 ? 
                                    <>
                                        <label htmlFor="uploader">Uploading</label>
                                        <progress className="xui-h-30" value={uploadingProfilePhotoPercentage} id="uploader" max="100">{uploadingProfilePhotoPercentage + "%"}</progress><br/><br></br>
                                    </> :
                                    ""
                                }
                                {
                                    loadingProfilePhoto ? 
                                    <button disabled className="xui-btn psc-btn-blue xui-font-sz-80">
                                        <Loading width="16" height="16" />
                                    </button> :
                                    <button type="submit" className="xui-btn psc-btn-blue xui-font-sz-80">
                                        Save Changes
                                    </button>
                                }
                            </div>
                            <p className="xui-font-sz-80 xui-my-1 xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorProfilePhoto}</span></p>
                            <p className="xui-font-sz-80 xui-my-1 xui-text-green"><span className="xui-font-w-bold psc-text-red">{successProfilePhoto}</span></p>
                        </center>
                    </div>
                </form>
                <div className="xui-form-box" style={{ marginTop: "-5px" }}>
                    <form className="xui-form">
                        <div className="xui-form-box xui-w-fluid-100 xui-lg-w-fluid-100">
                            <label>Business Name</label>
                            <div className="xui-d-flex xui-flex-ai-center">
                            <input style={{ width: "calc(100% - 50px)" }} type={"text"} placeholder={platformDetails ? platformDetails.data.name : ""} readOnly={platformDetails ? false : true} value={businessName} onClick={() => { if (platformDetails) setBusinessName(platformDetails.data.name) }} onChange={handleBusinessName} required />
                                <div className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-bg-light-blue xui-ml-half xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer psc-text" xui-modal-open="confirmNameUpdate">
                                    <Check width="16" height="16" />
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
                            <input style={{ width: "calc(100% - 50px)" }} type={"email"} placeholder={platformDetails ? platformDetails.data.email : ""} readOnly={platformDetails ? false : true} value={businessEmail} onClick={() => { if (platformDetails) setBusinessEmail(platformDetails.data.email) }} onChange={handleBusinessEmail} required />
                                <div onClick={() => handleStripped(platformDetails ? platformDetails.data.stripped : "")} className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-bg-light-blue xui-ml-half xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer psc-text" xui-modal-open="confirmEmailUpdate">
                                    <Check width="16" height="16" />
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
                            <textarea style={{ width: "calc(100% - 50px)" }} type={"text"} placeholder={platformDetails ? platformDetails.data.description : ""} readOnly={platformDetails ? false : true} value={businessDescription} onClick={() => { if (platformDetails) setBusinessDescription(platformDetails.data.description) }} onChange={handleBusinessDescription} required></textarea>
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
            <section className='xui-modal' xui-modal="confirmNameUpdate" id="confirmNameUpdate">
                <div className='xui-modal-content xui-max-h-500 xui-overflow-auto xui-pos-relative'>
                    <center>
                        <h1 className="5 xui-font-sz-120 xui-mb-2">Update Business Name</h1>
                        <p className="xui-opacity-5 xui-font-sz-100 xui-mt-half xui-mb-2">Are you sure you want to cotinue with this action?</p>
                        <p className="xui-opacity-5 xui-font-sz-90 xui-text-red xui-mt-half">We will log you out and you'll have to use your new private access url to log in ...</p>
                    </center>
                    <p className="xui-font-sz-100 xui-my-1 xui-mt-2 xui-text-center xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorUpdateName}</span></p>
                    <p className="xui-font-sz-100 xui-my-1 xui-mt-2 xui-text-center xui-text-green"><span className="xui-font-w-bold psc-text-red">{successUpdateName}</span></p>
                    <div className="xui-d-flex xui-flex-ai-center xui-flex-jc-space-evenly xui-mt-2">
                        <div className="xui-d-inline-flex xui-flex-ai-center">
                            <button onClick={handleUpdateName} className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-green xui-bdr-rad-half xui-font-sz-85">
                                <span className="xui-mr-half">Yes</span>
                                {
                                    loadingUpdateName ?
                                        <Loading width="12" height="12" />
                                        : <Check width="20" height="20" />
                                }
                            </button>
                        </div>
                        <div className="xui-d-inline-flex xui-flex-ai-center">
                            <button className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-red xui-bdr-rad-half xui-font-sz-85" xui-modal-close={loadingUpdateName ? "" : "confirmNameUpdate"}>
                                <span className="xui-mr-half">No</span>
                                <Close width="20" height="20" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className='xui-modal' xui-modal="confirmEmailUpdate" id="confirmEmailUpdate">
                <div className='xui-modal-content xui-max-h-500 xui-overflow-auto xui-pos-relative'>
                    <center>
                        <h1 className="5 xui-font-sz-120 xui-mb-2">Update Business Email</h1>
                        <p className="xui-opacity-5 xui-font-sz-100 xui-mt-half xui-mb-2">Are you sure you want to cotinue with this action?</p>
                        <p className="xui-opacity-5 xui-font-sz-90 xui-text-red xui-mt-half">We will log you out and you'll have to verify your new email to log in ...</p>
                    </center>
                    <p className="xui-font-sz-100 xui-my-1 xui-mt-2 xui-text-center xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorUpdateEmail}</span></p>
                    <p className="xui-font-sz-100 xui-my-1 xui-mt-2 xui-text-center xui-text-green"><span className="xui-font-w-bold psc-text-red">{successUpdateEmail}</span></p>
                    <div className="xui-d-flex xui-flex-ai-center xui-flex-jc-space-evenly xui-mt-2">
                        <div className="xui-d-inline-flex xui-flex-ai-center">
                            <button onClick={handleUpdateEmail} className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-green xui-bdr-rad-half xui-font-sz-85">
                                <span className="xui-mr-half">Yes</span>
                                {
                                    loadingUpdateEmail ?
                                        <Loading width="12" height="12" />
                                        : <Check width="20" height="20" />
                                }
                            </button>
                        </div>
                        <div className="xui-d-inline-flex xui-flex-ai-center">
                            <button className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-red xui-bdr-rad-half xui-font-sz-85" xui-modal-close={loadingUpdateEmail ? "" : "confirmEmailUpdate"}>
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