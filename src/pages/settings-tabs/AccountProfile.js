import GalleryAdd from "../../assets/images/gallery-add.png";
import Check from "../../icons/Check";

export default function AccountProfile(){
    return(
        <form className="xui-form xui-mt--1">
            <div className="xui-form-box">
                <label for="imageFile">
                    <span className="xui-d-inline-block">Your Profile Picture</span>
                    <div className="xui-opacity-6 xui-w-150 xui-h-150 xui-bdr-s-dashed xui-bdr-w-1 xui-bdr-black xui-bdr-rad-1 xui-mt-1 xui-d-flex xui-flex-dir-column xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer">
                        <img className="xui-img-40" src={GalleryAdd} alt="" />
                        <span className="xui-font-sz-80 xui-text-center xui-mt-1 xui-mx-auto xui-w-fluid-80">Upload your photo</span>
                    </div>
                </label>
                <input type={"file"} id="imageFile" style={{display:"none"}} />
                <div className="xui-mt-1 xui-d-flex">
                    <button className="xui-btn psc-btn-blue xui-font-sz-80">Save Changes</button>
                </div>
            </div>
            <div className="xui-mt-3 xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60">
                <label>Business name</label>
                <div className="xui-d-flex xui-flex-ai-center">
                    <input style={{width: "calc(100% - 100px)"}} type={"text"} />
                    <div className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-bg-light-blue xui-ml-half xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer psc-text">
                        <Check width="16" height="16" />
                    </div>
                </div>
            </div>
            <div className="xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60">
                <label>Email Address</label>
                <div className="xui-d-flex xui-flex-ai-center">
                    <input style={{width: "calc(100% - 100px)"}} type={"text"} />
                    <div className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-bg-light-blue xui-ml-half xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer psc-text">
                        <Check width="16" height="16" />
                    </div>
                </div>
            </div>
            <div className="xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60">
                <label>Description</label>
                <div className="xui-d-flex xui-flex-ai-flex-end">
                    <textarea style={{width: "calc(100% - 100px)"}} type={"text"}></textarea>
                    <div className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-bg-light-blue xui-ml-half xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer psc-text">
                        <Check width="16" height="16" />
                    </div>
                </div>
            </div>
        </form>
    );
}