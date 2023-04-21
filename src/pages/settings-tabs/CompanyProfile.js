import { useState } from "react";
import GalleryAdd from "../../assets/images/gallery-add.png";
import Loading from "../../icons/Loading";
import { useUpdateComplianceDetails, useUploadPlatformComplianceCertificate, useUploadPlatformComplianceDocument } from "../../hooks/useSettings";
import { useGetPlatform } from "../../hooks/usePlatform";

export default function MerchantProfile(){
    const [canCallPlatformDetails, setCanCallPlatformDetails] = useState(false);

    const {
        companyAddress, companyEmail, companyName, companyRcNumber, companyType, companyWebsiteUrl, errorUpdateComplianceDetails,
        handleCompanyAddress, handleCompanyEmail, handleCompanyName, handleCompanyRcNumber, handleCompanyType, handleCompanyWebsiteUrl, 
        handleUpdateComplianceDetails, loadingUpdateComplianceDetails, successUpdateComplianceDetails, 
        setCompanyAddress, setCompanyEmail, setCompanyName, setCompanyRcNumber, setCompanyType, setCompanyWebsiteUrl
    } = useUpdateComplianceDetails();

    const { getPlatformDetails, platformDetails } = useGetPlatform();

    const {
        errorComplianceDocument, handleUploadComplianceDocument, loadingComplianceDocument, setPlatformUniqueId: DocumentSetPlatformUniqueId, setSelectedComplianceDocument, successComplianceDocument,
        uploadingComplianceDocumentPercentage, selectedComplianceDocument
    } = useUploadPlatformComplianceDocument();

    const {
        errorComplianceCertificate, handleUploadComplianceCertificate, loadingComplianceCertificate, setPlatformUniqueId: CertificateSetPlatformUniqueId, setSelectedComplianceCertificate, successComplianceCertificate,
        uploadingComplianceCertificatePercentage, selectedComplianceCertificate
    } = useUploadPlatformComplianceCertificate();

    const callGetPlatformDetails = getPlatformDetails;

    if (successUpdateComplianceDetails || successComplianceDocument || successComplianceCertificate) callGetPlatformDetails();

    if (canCallPlatformDetails) {
        setTimeout(function () {
            callGetPlatformDetails();
            setCanCallPlatformDetails(false);
        }, 2000)
    }

    const handleSelectComplianceDocument = (e) =>{
        const el = e.target.files[0];
        setSelectedComplianceDocument("");
        setSelectedComplianceDocument(el);
    }

    const handleSelectComplianceCertificate = (e) => {
        const el = e.target.files[0];
        setSelectedComplianceCertificate("");
        setSelectedComplianceCertificate(el);
    }

    const getFileExtension = (filename) => {
        let lastDot = filename.lastIndexOf('.');
        let ext = filename.substring(lastDot + 1);
        return ext;
    }

    const getFileNameAlone = (filename) => {
        let _filename = filename.split("/");
        return _filename[_filename.length - 1];
    }

    return(
        <>
            <form className="xui-form" onSubmit={handleUpdateComplianceDetails}>
                <div className="xui-d-grid xui-grid-col-1 xui-lg-grid-col-2 xui-md-grid-col-1 xui-grid-gap-1">
                    <div className="xui-w-fluid-100">
                        <label>Company Name</label>
                        <input type={"text"} disabled={platformDetails ? platformDetails.data.verified : false} placeholder={platformDetails ? platformDetails.data.company_name : ""} readOnly={platformDetails ? false : true} value={companyName} onClick={() => { if (platformDetails) setCompanyName(platformDetails.data.company_name) }} onChange={handleCompanyName} required />
                    </div>
                    <div className="xui-w-fluid-100">
                        <label>Company Email</label>
                        <input type={"email"} disabled={platformDetails ? platformDetails.data.verified : false} placeholder={platformDetails ? platformDetails.data.company_email : ""} readOnly={platformDetails ? false : true} value={companyEmail} onClick={() => { if (platformDetails) setCompanyEmail(platformDetails.data.company_email) }} onChange={handleCompanyEmail} required />
                    </div>
                </div>
                <div className="xui-d-grid xui-grid-col-1 xui-lg-grid-col-2 xui-md-grid-col-1 xui-grid-gap-1 xui-mt-2">
                    <div className="xui-w-fluid-100">
                        <label>Company RC Number</label>
                        <input type={"text"} disabled={platformDetails ? platformDetails.data.verified : false} placeholder={platformDetails ? platformDetails.data.company_rc_number : ""} readOnly={platformDetails ? false : true} value={companyRcNumber} onClick={() => { if (platformDetails) setCompanyRcNumber(platformDetails.data.company_rc_number) }} onChange={handleCompanyRcNumber} required />
                    </div>
                    <div className="xui-w-fluid-100">
                        <label>Company Type</label>
                        <select disabled={platformDetails ? platformDetails.data.verified : false} onChange={handleCompanyType} value={companyType} required>
                            <option selected disabled>Select Company Type</option>
                            <option selected={platformDetails ? (platformDetails.data.company_type === "BN" ? true : false) : false} value={"BN"}>BN</option>
                            <option selected={platformDetails ? (platformDetails.data.company_type === "RC" ? true : false) : false} value={"RC"}>RC</option>
                            <option selected={platformDetails ? (platformDetails.data.company_type === "IT" ? true : false) : false} value={"IT"}>IT</option>
                            <option selected={platformDetails ? (platformDetails.data.company_type === "LL" ? true : false) : false} value={"LL"}>LL</option>
                            <option selected={platformDetails ? (platformDetails.data.company_type === "LLP" ? true : false) : false} value={"LLP"}>LLP</option>
                        </select>
                    </div>
                </div>
                <div className="xui-d-grid xui-grid-col-1 xui-lg-grid-col-2 xui-md-grid-col-1 xui-grid-gap-1 xui-mt-2 xui-mb-2">
                    <div className="xui-w-fluid-100">
                        <label>Company Address</label>
                        <input type={"text"} disabled={platformDetails ? platformDetails.data.verified : false} placeholder={platformDetails ? platformDetails.data.company_address : ""} readOnly={platformDetails ? false : true} value={companyAddress} onClick={() => { if (platformDetails) setCompanyAddress(platformDetails.data.company_address) }} onChange={handleCompanyAddress} required />
                    </div>
                    <div className="xui-w-fluid-100">
                        <label>Website URL</label>
                        <input type={"text"} disabled={platformDetails ? platformDetails.data.verified : false} placeholder={platformDetails ? platformDetails.data.website_url : ""} readOnly={platformDetails ? false : true} value={companyWebsiteUrl} onClick={() => { if (platformDetails) setCompanyWebsiteUrl(platformDetails.data.website_url) }} onChange={handleCompanyWebsiteUrl} required />
                    </div>
                </div>
                <div className="xui-d-flex">
                    {
                        platformDetails ? 
                        (
                            platformDetails.data.verified ? 
                            <button disabled className="xui-btn psc-btn-blue xui-font-sz-80">
                                Verified
                            </button> :
                            <button className="xui-btn psc-btn-blue xui-font-sz-80">
                                {
                                    loadingUpdateComplianceDetails ?
                                        <Loading width="16" height="16" />
                                        : "Save Changes"
                                }
                            </button>
                        ) :
                        <button disabled className="xui-btn psc-btn-blue xui-font-sz-80">
                            Loading ...
                        </button>
                    }
                </div>
                <p className="xui-font-sz-80 xui-my-1 xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorUpdateComplianceDetails}</span></p>
                <p className="xui-font-sz-80 xui-my-1 xui-text-green"><span className="xui-font-w-bold psc-text-red">{successUpdateComplianceDetails}</span></p>
            </form>
            <div className="xui-d-grid xui-grid-col-1 xui-lg-grid-col-2 xui-md-grid-col-1 xui-grid-gap-2 xui-mt-2 xui-mb-2">
                <form className="xui-form" onSubmit={handleUploadComplianceDocument}>
                    <div className="xui-form-box xui-w-fluid-100 xui-mt-3">
                        <label>Registration Document</label>
                        <label htmlFor="registrationDocument">
                            <div className="xui-opacity-6 xui-w-fluid-100 xui-h-250 xui-bdr-s-dashed xui-bdr-w-1 xui-bdr-black xui-bdr-rad-1 xui-mt-1 xui-d-flex xui-flex-dir-column xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer">
                                {
                                    selectedComplianceDocument ?
                                        <span className="xui-font-sz-120 xui-text-center xui-mt-1 xui-mx-auto xui-w-fluid-80" style={{ wordBreak: "break-word" }}>{selectedComplianceDocument.name}</span> :
                                        <>
                                            {
                                                platformDetails ?
                                                    (
                                                        platformDetails.data.registration_document === null ?
                                                            <img className="xui-img-50" src={GalleryAdd} alt="" /> :
                                                            (
                                                                getFileExtension(platformDetails.data.registration_document) === "pdf" || getFileExtension(platformDetails.data.registration_document) === "PDF" ?
                                                                    <span className="xui-font-sz-120 xui-text-center xui-mt-1 xui-mx-auto xui-w-fluid-80" style={{ wordBreak: "break-word" }}>{getFileNameAlone(platformDetails.data.registration_document)}</span> :
                                                                    <img className="xui-img-300" src={platformDetails.data.registration_document} alt="Registration Document" />
                                                            )
                                                    ) :
                                                    <img className="xui-img-50" src={GalleryAdd} alt="" />
                                            }
                                            <span className="xui-font-sz-90 xui-text-center xui-mt-1 xui-mx-auto xui-w-fluid-80">Click to select file</span>
                                        </>
                                }
                            </div>
                        </label>
                        <input onClick={() => { if (platformDetails) DocumentSetPlatformUniqueId(platformDetails.data.platform_unique_id) }} onChange={handleSelectComplianceDocument} type={"file"} id="registrationDocument" style={{ display: "none" }} required />
                        <div className="xui-mt-1">
                            {
                                uploadingComplianceDocumentPercentage > 0 ?
                                    <>
                                        <label htmlFor="uploader">Uploading</label>
                                        <progress className="xui-h-30" value={uploadingComplianceDocumentPercentage} id="uploader" max="100">{uploadingComplianceDocumentPercentage + "%"}</progress><br /><br></br>
                                    </> :
                                    ""
                            }
                            {
                                loadingComplianceDocument ?
                                    <button disabled className="xui-btn psc-btn-blue xui-font-sz-80">
                                        <Loading width="16" height="16" />
                                    </button> : 
                                        platformDetails ? 
                                        (
                                            <>
                                                {
                                                    platformDetails.data.verified ? 
                                                    <button disabled className="xui-btn psc-btn-blue xui-font-sz-80">
                                                        Verified
                                                    </button> : 
                                                    <button type="submit" className="xui-btn psc-btn-blue xui-font-sz-80">
                                                        Save Changes
                                                    </button>
                                                }
                                            </>
                                        ) :
                                        <button disabled className="xui-btn psc-btn-blue xui-font-sz-80">
                                            Loading ...
                                        </button>
                            }
                        </div>
                        <p className="xui-font-sz-80 xui-my-1 xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorComplianceDocument}</span></p>
                        <p className="xui-font-sz-80 xui-my-1 xui-text-green"><span className="xui-font-w-bold psc-text-red">{successComplianceDocument}</span></p>
                    </div>
                </form>
                <form className="xui-form" onSubmit={handleUploadComplianceCertificate}>
                    <div className="xui-form-box xui-w-fluid-100 xui-mt-3">
                        <label>Registration Certificate</label>
                        <label htmlFor="registrationCertificate">
                            <div className="xui-opacity-6 xui-w-fluid-100 xui-h-250 xui-bdr-s-dashed xui-bdr-w-1 xui-bdr-black xui-bdr-rad-1 xui-mt-1 xui-d-flex xui-flex-dir-column xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer">
                                {
                                    selectedComplianceCertificate ?
                                        <span className="xui-font-sz-120 xui-text-center xui-mt-1 xui-mx-auto xui-w-fluid-80" style={{ wordBreak: "break-word" }}>{selectedComplianceCertificate.name}</span> :
                                        <>
                                            {
                                                platformDetails ?
                                                (
                                                    platformDetails.data.registration_certificate === null ?
                                                    <img className="xui-img-50" src={GalleryAdd} alt="" /> :
                                                    (
                                                        getFileExtension(platformDetails.data.registration_certificate) === "pdf" || getFileExtension(platformDetails.data.registration_certificate) === "PDF" ? 
                                                        <span className="xui-font-sz-120 xui-text-center xui-mt-1 xui-mx-auto xui-w-fluid-80" style={{ wordBreak: "break-word" }}>{getFileNameAlone(platformDetails.data.registration_certificate)}</span> :
                                                        <img className="xui-img-300" src={platformDetails.data.registration_certificate} alt="Registration Document" />
                                                    )
                                                ) :
                                                <img className="xui-img-50" src={GalleryAdd} alt="" />
                                            }
                                            <span className="xui-font-sz-90 xui-text-center xui-mt-1 xui-mx-auto xui-w-fluid-80">Click to select file</span>
                                        </>
                                }
                            </div>
                        </label>
                        <input onClick={() => { if (platformDetails) CertificateSetPlatformUniqueId(platformDetails.data.platform_unique_id) }} onChange={handleSelectComplianceCertificate} type={"file"} id="registrationCertificate" style={{ display: "none" }} required />
                        <div className="xui-mt-1">
                            {
                                uploadingComplianceCertificatePercentage > 0 ?
                                    <>
                                        <label htmlFor="uploader">Uploading</label>
                                        <progress className="xui-h-30" value={uploadingComplianceCertificatePercentage} id="uploader" max="100">{uploadingComplianceCertificatePercentage + "%"}</progress><br /><br></br>
                                    </> :
                                    ""
                            }
                            {
                                loadingComplianceCertificate ?
                                    <button disabled className="xui-btn psc-btn-blue xui-font-sz-80">
                                        <Loading width="16" height="16" />
                                    </button> : 
                                    platformDetails ?
                                        (
                                            <>
                                                {
                                                    platformDetails.data.verified ?
                                                        <button disabled className="xui-btn psc-btn-blue xui-font-sz-80">
                                                            Verified
                                                        </button> :
                                                        <button type="submit" className="xui-btn psc-btn-blue xui-font-sz-80">
                                                            Save Changes
                                                        </button>
                                                }
                                            </>
                                        ) :
                                        <button disabled className="xui-btn psc-btn-blue xui-font-sz-80">
                                            Loading ...
                                        </button>
                            }
                        </div>
                        <p className="xui-font-sz-80 xui-my-1 xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorComplianceCertificate}</span></p>
                        <p className="xui-font-sz-80 xui-my-1 xui-text-green"><span className="xui-font-w-bold psc-text-red">{successComplianceCertificate}</span></p>
                    </div>
                </form>
            </div>
        </>
    );
}