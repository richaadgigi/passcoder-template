import Copy from "../../icons/Copy";
import Reset from "../../icons/Reset";

export default function ApiKeys(){
    return(
        <>
        <form className="xui-form xui-mt-1">
            <div className="xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60">
                <label>Live API Key</label>
                <div className="xui-d-flex xui-flex-ai-center">
                    <input style={{width: "calc(100% - 100px)"}} type={"text"} />
                    <div className="xui-w-100 xui-d-flex">
                        <div className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-bg-light-blue xui-ml-half xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer psc-text">
                            <Copy width="16" height="16" />
                        </div>
                        <div className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-bg-light-blue xui-ml-half xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer psc-text" xui-modal-open="resetLiveToken">
                            <Reset width="16" height="16" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60">
                <label>Test API Key</label>
                <div className="xui-d-flex xui-flex-ai-center">
                    <input style={{width: "calc(100% - 100px)"}} type={"text"} />
                    <div className="xui-w-100 xui-d-flex">
                        <div className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-bg-light-blue xui-ml-half xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer psc-text">
                            <Copy width="16" height="16" />
                        </div>
                        <div className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-bg-light-blue xui-ml-half xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer psc-text" xui-modal-open="resetLiveToken">
                            <Reset width="16" height="16" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60">
                <label>Token</label>
                <div className="xui-d-flex xui-flex-ai-center">
                    <input style={{width: "calc(100% - 100px)"}} type={"text"} />
                    <div className="xui-w-100 xui-d-flex">
                        <div className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-bg-light-blue xui-ml-half xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer psc-text">
                            <Copy width="16" height="16" />
                        </div>
                        <div className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-bg-light-blue xui-ml-half xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer psc-text" xui-modal-open="resetLiveToken">
                            <Reset width="16" height="16" />
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <section className='xui-modal' xui-modal="resetLiveToken">
            <div className='xui-modal-content xui-max-h-500 xui-overflow-auto'>
                <div className="xui-text-center">
                    <span className="xui-opacity-6">Are you sure want to reset this?</span>
                    <div className="xui-mt-2 xui-font-sz-80">
                        <button className="xui-btn psc-btn-blue xui-m-half">Yes, proceed</button>
                        <button className="xui-btn xui-bg-light-blue psc-text xui-m-half" xui-modal-close="resetLiveToken">No, close this</button>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}