import GalleryAdd from "../../assets/images/gallery-add.png";

export default function MerchantProfile(){
    return(
        <form className="xui-form xui-mt--1">
            <div className="xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60">
                <label>Company Name</label>
                <input type={"text"} />
            </div>
            <div className="xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60">
                <label>Company Email</label>
                <input type={"text"} />
            </div>
            <div className="xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60">
                <label>Company RC Number</label>
                <input type={"text"} />
            </div>
            <div className="xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60">
                <label>Company Address</label>
                <input type={"text"} />
            </div>
            <div className="xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60">
                <label>Website URL</label>
                <input type={"text"} />
            </div>
            <div className="xui-d-flex">
                <button className="xui-btn psc-btn-blue xui-font-sz-80">Save Changes</button>
            </div>
            <div className="xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60 xui-mt-3">
                <label>Registration Document</label>
                <div className="xui-opacity-6 xui-w-fluid-100 xui-h-250 xui-bdr-s-dashed xui-bdr-w-1 xui-bdr-black xui-bdr-rad-1 xui-mt-1 xui-d-flex xui-flex-dir-column xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer">
                    <img className="xui-img-40" src={GalleryAdd} alt="" />
                    <span className="xui-font-sz-80 xui-text-center xui-mt-1 xui-mx-auto xui-w-fluid-80">Upload your photo</span>
                </div>
                <p className="xui-text-center xui-font-sz-80 xui-opacity-5 xui-mt-half">Click to change picture</p>
                <div className="xui-mt-1 xui-d-flex">
                    <button className="xui-btn psc-btn-blue xui-font-sz-80">Save Changes</button>
                </div>
            </div>
            <div className="xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60 xui-mt-3">
                <label>Registration Certificate</label>
                <div className="xui-opacity-6 xui-w-fluid-100 xui-h-250 xui-bdr-s-dashed xui-bdr-w-1 xui-bdr-black xui-bdr-rad-1 xui-mt-1 xui-d-flex xui-flex-dir-column xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer">
                    <img className="xui-img-40" src={GalleryAdd} alt="" />
                    <span className="xui-font-sz-80 xui-text-center xui-mt-1 xui-mx-auto xui-w-fluid-80">Upload your photo</span>
                </div>
                <p className="xui-text-center xui-font-sz-80 xui-opacity-5 xui-mt-half">Click to change picture</p>
                <div className="xui-mt-1 xui-d-flex">
                    <button className="xui-btn psc-btn-blue xui-font-sz-80">Save Changes</button>
                </div>
            </div>
        </form>
    );
}