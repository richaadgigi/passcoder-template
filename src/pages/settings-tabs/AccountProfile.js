import { useState, useEffect } from "react";
import Close from "../../icons/Close";
import GalleryAdd from "../../assets/images/gallery-add.png";
import Check from "../../icons/Check";
import Loading from "../../icons/Loading";
import { useUpdateDescription, useUpdateEmail, useUpdateName, useUploadPartnerProfilePhoto, useUpdatePointThreshold, useUploadPartnerProfileCover } from "../../hooks/useSettings";
import { useGetPartner } from "../../hooks/usePartner";
import { config } from "../../config";

export default function AccountProfile(){
    const changeLGA = config.changeLGA;

    const [canCallPartnerDetails, setCanCallPartnerDetails] = useState(false);
    const [callUseEffect, setCallUseEffect] = useState(true);

    const {
        partnerName, errorUpdateName, handlePartnerName, handleUpdateName, loadingUpdateName, setPartnerName, successUpdateName, 
        removeUpdateNameModal, setRemoveUpdateNameModal, cities, handlePartnerCity, handlePartnerCountry, handlePartnerState, 
        partnerCity, partnerCountry, partnerState, setPartnerCity, setPartnerCountry, setPartnerState, setCities
    } = useUpdateName();

    const {
        partnerEmail, errorUpdateEmail, handlePartnerEmail, handleUpdateEmail, loadingUpdateEmail, setPartnerEmail, successUpdateEmail, 
        removeUpdateEmailModal, setRemoveUpdateEmailModal, handleStripped
    } = useUpdateEmail();

    const {
        partnerDescription, errorUpdateDescription, handlePartnerDescription, handleUpdateDescription, loadingUpdateDescription, 
        setPartnerDescription, successUpdateDescription
    } = useUpdateDescription();

    const {
        errorUpdatePointThreshold, handlePointThreshold, handleUpdatePointThreshold, loadingUpdatePointThreshold, pointThreshold, setPointThreshold, 
        successUpdatePointThreshold
    } = useUpdatePointThreshold();

    const {
        getPartnerDetails, partnerDetails
    } = useGetPartner();

    const {
        errorProfilePhoto, handleUploadProfilePhoto, loadingProfilePhoto, setPartnerUniqueId: PhotoSetPartnerUniqueId, setSelectedProfilePhoto, successProfilePhoto, 
        uploadingProfilePhotoPercentage, selectedProfilePhoto
    } = useUploadPartnerProfilePhoto();

    const {
        errorProfileCover, handleUploadProfileCover, loadingProfileCover, setPartnerUniqueId: CoverSetPartnerUniqueId, setSelectedProfileCover, successProfileCover,
        uploadingProfileCoverPercentage, selectedProfileCover
    } = useUploadPartnerProfileCover();

    const callGetPartnerDetails = getPartnerDetails;

    if (successUpdateName || successUpdateEmail || successUpdatePointThreshold || successUpdateDescription || successProfilePhoto) callGetPartnerDetails();

    if (canCallPartnerDetails) { 
        setTimeout(function () {
            callGetPartnerDetails(); 
            setCanCallPartnerDetails(false);
        }, 2000)
    }

    if (removeUpdateEmailModal) {
        const modalResponse = document.querySelector("#confirmEmailUpdate");
        modalResponse.setAttribute("display", false);
        callGetPartnerDetails(); 
        setRemoveUpdateEmailModal(null);
    }
    if (removeUpdateNameModal) {
        const modalResponse = document.querySelector("#confirmNameUpdate");
        modalResponse.setAttribute("display", false);
        callGetPartnerDetails(); 
        setRemoveUpdateNameModal(null);
    }

    const handleSelectProfilePhoto = (e) => {
        const el = e.target.files[0];
        setSelectedProfilePhoto("");
        setSelectedProfilePhoto(el);
    }
    const handleSelectProfileCover = (e) => {
        const el = e.target.files[0];
        setSelectedProfileCover("");
        setSelectedProfileCover(el);
    }

    useEffect(() => {
        if (callUseEffect) {
            if (partnerDetails !== null) {
                setPartnerName(partnerDetails.data.name);
                setPartnerEmail(partnerDetails.data.email);
                setPointThreshold(partnerDetails.data.point_threshold);
                setPartnerDescription(partnerDetails.data.description);
                setPartnerCountry(partnerDetails.data.country);
                setPartnerState(partnerDetails.data.state);
                setCities(changeLGA(partnerDetails.data.state));
                setPartnerCity(partnerDetails.data.city);
                setCallUseEffect(false);
            }
        }
    }, [partnerDetails, callUseEffect]);
    
    return(
        <>
            <div className="xui-d-grid xui-grid-col-1 xui-lg-grid-col-2 xui-md-grid-col-1 xui-grid-gap-1">
                <center>
                    <form className="xui-form" onSubmit={handleUploadProfilePhoto}>
                        <div className="xui-form-box">
                            <center>
                                <span className="xui-d-inline-block">Your Profile Picture</span>
                                <label htmlFor="profilePhoto">
                                    <div className="xui-w-250 xui-h-250 xui-bdr-s-dashed xui-bdr-w-1 xui-bdr-black xui-bdr-rad-1 xui-mt-1 xui-d-flex xui-flex-dir-column xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer">
                                        {
                                            selectedProfilePhoto ?
                                                <span className="xui-font-sz-120 xui-text-center xui-mt-1 xui-mx-auto xui-w-fluid-80" style={{ wordBreak: "break-word" }}>{selectedProfilePhoto.name}</span> :
                                                <>
                                                    {
                                                        partnerDetails ?
                                                            <img className="xui-img-100" src={partnerDetails.data.photo} alt="" /> :
                                                            <img className="xui-img-40" src={GalleryAdd} alt="" />
                                                    }
                                                    <span className="xui-font-sz-90 xui-text-center xui-mt-1 xui-mx-auto xui-w-fluid-80">Click to select file</span>
                                                </>
                                        }
                                    </div>
                                </label>
                                <input onClick={() => { if (partnerDetails) PhotoSetPartnerUniqueId(partnerDetails.data.partner_unique_id) }} onChange={handleSelectProfilePhoto} type={"file"} id="profilePhoto" style={{ display: "none" }} required />
                                <div className="xui-mt-1">
                                    {
                                        uploadingProfilePhotoPercentage > 0 ?
                                            <>
                                                <label htmlFor="uploader">Uploading</label>
                                                <progress className="xui-h-30" value={uploadingProfilePhotoPercentage} id="uploader" max="100">{uploadingProfilePhotoPercentage + "%"}</progress><br /><br></br>
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
                </center>
                <center>
                    <form className="xui-form" onSubmit={handleUploadProfileCover}>
                        <div className="xui-form-box">
                            <center>
                                <span className="xui-d-inline-block">Your Cover Picture</span>
                                <label htmlFor="profileCover">
                                    <div className="xui-w-250 xui-h-250 xui-bdr-s-dashed xui-bdr-w-1 xui-bdr-black xui-bdr-rad-1 xui-mt-1 xui-d-flex xui-flex-dir-column xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer">
                                        {
                                            selectedProfileCover ?
                                                <span className="xui-font-sz-120 xui-text-center xui-mt-1 xui-mx-auto xui-w-fluid-80" style={{ wordBreak: "break-word" }}>{selectedProfileCover.name}</span> :
                                                <>
                                                    {
                                                        partnerDetails ?
                                                            <img className="xui-img-100" src={partnerDetails.data.cover} alt="" /> :
                                                            <img className="xui-img-40" src={GalleryAdd} alt="" />
                                                    }
                                                    <span className="xui-font-sz-90 xui-text-center xui-mt-1 xui-mx-auto xui-w-fluid-80">Click to select file</span>
                                                </>
                                        }
                                    </div>
                                </label>
                                <input onClick={() => { if (partnerDetails) CoverSetPartnerUniqueId(partnerDetails.data.partner_unique_id) }} onChange={handleSelectProfileCover} type={"file"} id="profileCover" style={{ display: "none" }} required />
                                <div className="xui-mt-1">
                                    {
                                        uploadingProfileCoverPercentage > 0 ?
                                            <>
                                                <label htmlFor="uploader">Uploading</label>
                                                <progress className="xui-h-30" value={uploadingProfileCoverPercentage} id="uploader" max="100">{uploadingProfileCoverPercentage + "%"}</progress><br /><br></br>
                                            </> :
                                            ""
                                    }
                                    {
                                        loadingProfileCover ?
                                            <button disabled className="xui-btn psc-btn-blue xui-font-sz-80">
                                                <Loading width="16" height="16" />
                                            </button> :
                                            <button type="submit" className="xui-btn psc-btn-blue xui-font-sz-80">
                                                Save Changes
                                            </button>
                                    }
                                </div>
                                <p className="xui-font-sz-80 xui-my-1 xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorProfileCover}</span></p>
                                <p className="xui-font-sz-80 xui-my-1 xui-text-green"><span className="xui-font-w-bold psc-text-red">{successProfileCover}</span></p>
                            </center>
                        </div>
                    </form>
                </center>
            </div>
            <div className="xui-form-box xui-w-fluid-100 xui-mt-2">
                <form className="xui-form" onSubmit={(e) => e.preventDefault()}>
                    <label>Partner Name</label>
                    <div className="xui-d-flex xui-flex-ai-center">
                        <input type={"text"} placeholder={partnerDetails ? partnerDetails.data.name : ""} readOnly={partnerDetails ? false : true} value={partnerName} onClick={() => { if (partnerDetails) setPartnerName(partnerDetails.data.name) }} onChange={handlePartnerName} required />
                    </div>
                    <div className="xui-d-grid xui-grid-col-1 xui-lg-grid-col-3 xui-md-grid-col-3 xui-grid-gap-1">
                        <div className="xui-mt-1">
                            <label>Country</label>
                            <select disabled={partnerDetails ? false : true} onChange={handlePartnerCountry} value={partnerCountry} required>
                                <option selected disabled>Select Country</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Nigeria" ? true : false) : false} value={"Nigeria"}>Nigeria</option>
                            </select>
                        </div>
                        <div className="xui-mt-1">
                            <label>State</label>
                            <select disabled={partnerDetails ? false : true} onChange={handlePartnerState} value={partnerState} required>
                                <option selected disabled>Select State</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Abia" ? true : false) : false} value={"Abia"}>Abia</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Adamawa" ? true : false) : false} value={"Adamawa"}>Adamawa</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Akwa Ibom" ? true : false) : false} value={"Akwa Ibom"}>Akwa Ibom</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Anambra" ? true : false) : false} value={"Anambra"}>Anambra</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Bauchi" ? true : false) : false} value={"Bauchi"}>Bauchi</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Bayelsa" ? true : false) : false} value={"Bayelsa"}>Bayelsa</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Benue" ? true : false) : false} value={"Benue"}>Benue</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Borno" ? true : false) : false} value={"Borno"}>Borno</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Cross River" ? true : false) : false} value={"Cross River"}>Cross River</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Delta" ? true : false) : false} value={"Delta"}>Delta</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Ebonyi" ? true : false) : false} value={"Ebonyi"}>Ebonyi</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Edo" ? true : false) : false} value={"Edo"}>Edo</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Ekiti" ? true : false) : false} value={"Ekiti"}>Ekiti</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Enugu" ? true : false) : false} value={"Enugu"}>Enugu</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Abuja" ? true : false) : false} value={"Abuja"}>Federal Capital Territory</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Gombe" ? true : false) : false} value={"Gombe"}>Gombe</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Imo" ? true : false) : false} value={"Imo"}>Imo</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Jigawa" ? true : false) : false} value={"Jigawa"}>Jigawa</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Kaduna" ? true : false) : false} value={"Kaduna"}>Kaduna</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Kano" ? true : false) : false} value={"Kano"}>Kano</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Katsina" ? true : false) : false} value={"Katsina"}>Katsina</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Kebbi" ? true : false) : false} value={"Kebbi"}>Kebbi</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Kogi" ? true : false) : false} value={"Kogi"}>Kogi</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Kwara" ? true : false) : false} value={"Kwara"}>Kwara</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Lagos" ? true : false) : false} value={"Lagos"}>Lagos</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Nasarawa" ? true : false) : false} value={"Nasarawa"}>Nasarawa</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Niger" ? true : false) : false} value={"Niger"}>Niger</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Ogun" ? true : false) : false} value={"Ogun"}>Ogun</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Ondo" ? true : false) : false} value={"Ondo"}>Ondo</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Osun" ? true : false) : false} value={"Osun"}>Osun</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Oyo" ? true : false) : false} value={"Oyo"}>Oyo</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Plateau" ? true : false) : false} value={"Plateau"}>Plateau</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Rivers" ? true : false) : false} value={"Rivers"}>Rivers</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Sokoto" ? true : false) : false} value={"Sokoto"}>Sokoto</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Taraba" ? true : false) : false} value={"Taraba"}>Taraba</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Yobe" ? true : false) : false} value={"Yobe"}>Yobe</option>
                                <option selected={partnerDetails ? (partnerDetails.data.country === "Zamfara" ? true : false) : false} value={"Zamfara"}>Zamfara</option>
                            </select>
                        </div>
                        <div className="xui-mt-1">
                            <label>City</label>
                            <select disabled={partnerDetails ? false : true} onChange={handlePartnerCity} value={partnerCity} required>
                                <option selected disabled>Select City</option>
                                {
                                    cities.map((item, index) => {
                                        return (
                                            <option selected={partnerDetails ? (partnerDetails.data.country === item ? true : false) : false} key={index} value={item}>{item}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <button className="xui-btn xui-mt-2 psc-btn-blue xui-font-sz-80" xui-modal-open="confirmNameUpdate">
                        Save Changes
                    </button>
                    <p className="xui-font-sz-100 xui-my-1 xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorUpdateName}</span></p>
                    <p className="xui-font-sz-100 xui-my-1 xui-text-green"><span className="xui-font-w-bold psc-text-red">{successUpdateName}</span></p>
                </form>
            </div>
            <div className="xui-d-grid xui-grid-col-1 xui-lg-grid-col-2 xui-md-grid-col-1 xui-grid-gap-1">
                <div className="xui-mt-2">
                    <form className="xui-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="xui-w-fluid-100 xui-lg-w-fluid-100">
                            <label>Partner Email</label>
                            <div className="xui-d-flex xui-flex-ai-center">
                            <input style={{ width: "calc(100% - 50px)" }} type={"email"} placeholder={partnerDetails ? partnerDetails.data.email : ""} readOnly={partnerDetails ? false : true} value={partnerEmail} onClick={() => { if (partnerDetails) setPartnerEmail(partnerDetails.data.email) }} onChange={handlePartnerEmail} required />
                                <div onClick={() => handleStripped(partnerDetails ? partnerDetails.data.stripped : "")} className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-bg-light-blue xui-ml-half xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer psc-text" xui-modal-open="confirmEmailUpdate">
                                    <Check width="16" height="16" />
                                </div>
                            </div>
                            <p className="xui-font-sz-80 xui-my-1 xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorUpdateEmail}</span></p>
                            <p className="xui-font-sz-80 xui-my-1 xui-text-green"><span className="xui-font-w-bold psc-text-red">{successUpdateEmail}</span></p>
                        </div>
                    </form>
                </div>
                <div className="xui-mt-2">
                    <form className="xui-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="xui-w-fluid-100 xui-lg-w-fluid-100">
                            <label>Point Threshold</label>
                            <div className="xui-d-flex xui-flex-ai-center">
                                <input style={{ width: "calc(100% - 50px)" }} type={"number"} placeholder={partnerDetails ? partnerDetails.data.point_threshold : ""} readOnly={partnerDetails ? false : true} value={pointThreshold} onClick={() => { if (partnerDetails) setPointThreshold(partnerDetails.data.point_threshold) }} onChange={handlePointThreshold} required />
                                <div onClick={handleUpdatePointThreshold} className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-bg-light-blue xui-ml-half xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer psc-text">
                                    {
                                        loadingUpdatePointThreshold ?
                                            <Loading width="16" height="16" />
                                            : <Check width="16" height="16" />
                                    }
                                </div>
                            </div>
                            <p className="xui-font-sz-80 xui-my-1 xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorUpdatePointThreshold}</span></p>
                            <p className="xui-font-sz-80 xui-my-1 xui-text-green"><span className="xui-font-w-bold psc-text-red">{successUpdatePointThreshold}</span></p>
                        </div>
                    </form>
                </div>
            </div>
            <div className="xui-mt-2 xui-w-fluid-100 xui-lg-w-fluid-100">
                <form className="xui-form">
                    <label>Partner Description</label>
                    <div className="xui-d-flex xui-flex-ai-flex-end">
                        <textarea style={{ width: "calc(100% - 50px)" }} type={"text"} placeholder={partnerDetails ? partnerDetails.data.description : ""} readOnly={partnerDetails ? false : true} value={partnerDescription} onClick={() => { if (partnerDetails) setPartnerDescription(partnerDetails.data.description) }} onChange={handlePartnerDescription} required></textarea>
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
                </form>
            </div>
            <section className='xui-modal' xui-modal="confirmNameUpdate" id="confirmNameUpdate">
                <div className='xui-modal-content xui-max-h-500 xui-overflow-auto xui-pos-relative'>
                    <center>
                        <h1 className="5 xui-font-sz-120 xui-mb-2">Update Partner Name</h1>
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
                        <h1 className="5 xui-font-sz-120 xui-mb-2">Update Partner Email</h1>
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