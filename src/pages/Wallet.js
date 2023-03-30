import Navbar from "../components/Navbar";
import Content from "../components/Content";
import Arrowright from '../icons/Arrowright';
import Arrowleft from '../icons/Arrowleft';
import Close from "../icons/Close";

export default function Wallet(){
    return(
        <>
        <Navbar placeholder="Search something..." />
        <Content>
            <section className="xui-d-flex xui-flex-jc-flex-start xui-lg-flex-jc-flex-end">
                <div>
                    <p className="xui-opacity-5 xui-font-sz-80">Current Balance for API Billings</p>
                    <span className="xui-d-inline-block xui-font-sz-120 xui-mt-half">NGN 0.00</span>
                    <div className="xui-d-flex xui-mt-1 xui-font-sz-80 xui-lg-d-none">
                        <button className="xui-font-sz-80 xui-btn psc-btn-blue" xui-modal-open="fundWallet">Fund Wallet</button>
                    </div>
                </div>
                <div className="xui-ml-2 xui-d-none xui-lg-d-block">
                    <button className="xui-font-sz-80 xui-btn psc-btn-blue" xui-modal-open="fundWallet">Fund Wallet</button>
                </div>
            </section>
            {/* <section className="xui-d-grid xui-lg-grid-col-3 xui-grid-gap-2 xui-mt-2">
                <div className="xui-bdr-w-1 xui-bdr-s-solid xui-bdr-fade xui-py-2 xui-px-1">
                    <span className="xui-font-sz-75 xui-opacity-5">Account Name</span>
                    <h3 className="xui-font-sz-100 xui-font-w-normal xui-mt-half">IDENTITYPASS / PASSCODER IDPASS</h3>
                    <div className="xui-d-grid xui-grid-col-2 xui-grid-gap-2 xui-mt-2">
                        <div>
                            <span className="xui-font-sz-75 xui-opacity-5">Bank Name</span>
                            <h3 className="xui-font-sz-90 xui-font-w-normal xui-mt-half">Wema Bank</h3>
                        </div>
                        <div>
                            <span className="xui-font-sz-75 xui-opacity-5">Account Number</span>
                            <h3 className="xui-font-sz-90 xui-font-w-normal xui-mt-half">8203847283</h3>
                        </div>
                    </div>
                    <div className="xui-mt-2">
                        <h4 className="xui-font-sz-85 xui-mb-1 xui-font-w-normal xui-opacity-8">Steps to top up your wallet</h4>
                        <p className="xui-font-sz-80 xui-opacity-5 xui-my-half">Copy the account number</p>
                        <p className="xui-font-sz-80 xui-opacity-5 xui-my-half">Transfer amount to top up</p>
                    </div>
                </div>
                <div className="xui-bdr-w-1 xui-bdr-s-solid xui-bdr-fade xui-py-2 xui-px-1">
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
                </div>
            </section> */}
            <section className='xui-mt-2'>
            <div className='xui-d-flex xui-flex-ai-center xui-flex-jc-space-between xui-py-1 psc-section-header'>
                <div className="xui-mb-1">
                    <h1 className='xui-font-sz-110 xui-font-w-normal'>Recent Wallet Transactions</h1>
                    <p className="xui-opacity-5 xui-font-sz-90 xui-mt-half">View your payment history and view past usage statements</p>
                </div>
                <div className='xui-d-inline-flex'>
                    {/* <div className='xui-d-inline-flex xui-flex-ai-center'>
                        <h3 className='xui-font-w-normal xui-font-sz-80 xui-mr-half'>01 - 28 February, 2023</h3>
                        <Filter width="16" height="16" />
                    </div>
                    <div className='xui-d-inline-flex xui-flex-ai-center xui-ml-1-half'>
                        <h3 className='xui-font-w-normal xui-font-sz-80 xui-mr-half'>Filter by type</h3>
                        <Filter width="16" height="16" />
                    </div> */}
                </div>
            </div>
            <div className='xui-table-responsive'>
                <table className='xui-table xui-font-sz-90'>
                <tr className='xui-text-left xui-opacity-6'>
                    <th className='xui-min-w-150'>Reference</th>
                    <th className='xui-min-w-150'>Type</th>
                    <th className='xui-min-w-100'>Amount</th>
                    <th className='xui-min-w-150'>Status</th>
                    <th className='xui-min-w-200'>Date</th>
                </tr>
                <tr className=''>
                    <td className='xui-opacity-5'>
                        <span>#PSCDRC36273920</span>
                    </td>
                    <td className='xui-opacity-5'>
                        <span>API Call</span>
                    </td>
                    <td className='xui-opacity-5 xui-font-w-bold'>
                    <span>NGN 75</span>
                    </td>
                    <td className=''>
                    <span className='xui-badge xui-badge-success xui-font-sz-80 xui-bdr-rad-half'>Successful</span>
                    </td>
                    <td className='xui-opacity-5'>
                    <span>01/01/2023 at 9:35pm</span>
                    </td>
                </tr>
                <tr className=''>
                    <td className='xui-opacity-5'>
                        <span>#PSCDRC36273920</span>
                    </td>
                    <td className='xui-opacity-5'>
                        <span>Deposit</span>
                    </td>
                    <td className='xui-opacity-5 xui-font-w-bold'>
                    <span>NGN 75</span>
                    </td>
                    <td className=''>
                    <span className='xui-badge xui-badge-danger xui-font-sz-80 xui-bdr-rad-half'>Failed</span>
                    </td>
                    <td className='xui-opacity-5'>
                    <span>01/01/2023 at 9:35pm</span>
                    </td>
                </tr>
                <tr className=''>
                    <td className='xui-opacity-5'>
                        <span>#PSCDRC36273920</span>
                    </td>
                    <td className='xui-opacity-5'>
                        <span>Deposit</span>
                    </td>
                    <td className='xui-opacity-5 xui-font-w-bold'>
                    <span>NGN 75</span>
                    </td>
                    <td className=''>
                    <span className='xui-badge xui-badge-warning xui-font-sz-80 xui-bdr-rad-half'>In progress</span>
                    </td>
                    <td className='xui-opacity-5'>
                    <span>01/01/2023 at 9:35pm</span>
                    </td>
                </tr>
                <tr className=''>
                    <td className='xui-opacity-5'>
                        <span>#PSCDRC36273920</span>
                    </td>
                    <td className='xui-opacity-5'>
                        <span>Deposit</span>
                    </td>
                    <td className='xui-opacity-5 xui-font-w-bold'>
                    <span>NGN 75</span>
                    </td>
                    <td className=''>
                    <span className='xui-badge xui-badge-danger xui-font-sz-80 xui-bdr-rad-half'>Failed</span>
                    </td>
                    <td className='xui-opacity-5'>
                    <span>01/01/2023 at 9:35pm</span>
                    </td>
                </tr>
                <tr className=''>
                    <td className='xui-opacity-5'>
                        <span>#PSCDRC36273920</span>
                    </td>
                    <td className='xui-opacity-5'>
                        <span>Deposit</span>
                    </td>
                    <td className='xui-opacity-5 xui-font-w-bold'>
                    <span>NGN 75</span>
                    </td>
                    <td className=''>
                    <span className='xui-badge xui-badge-success xui-font-sz-80 xui-bdr-rad-half'>Authenticated</span>
                    </td>
                    <td className='xui-opacity-5'>
                    <span>01/01/2023 at 9:35pm</span>
                    </td>
                </tr>
                <tr className=''>
                    <td className='xui-opacity-5'>
                        <span>#PSCDRC36273920</span>
                    </td>
                    <td className='xui-opacity-5'>
                        <span>Deposit</span>
                    </td>
                    <td className='xui-opacity-5 xui-font-w-bold'>
                    <span>NGN 75</span>
                    </td>
                    <td className=''>
                    <span className='xui-badge xui-badge-success xui-font-sz-80 xui-bdr-rad-half'>Authenticated</span>
                    </td>
                    <td className='xui-opacity-5'>
                    <span>01/01/2023 at 9:35pm</span>
                    </td>
                </tr>
                <tr className=''>
                    <td className='xui-opacity-5'>
                        <span>#PSCDRC36273920</span>
                    </td>
                    <td className='xui-opacity-5'>
                        <span>Deposit</span>
                    </td>
                    <td className='xui-opacity-5 xui-font-w-bold'>
                    <span>NGN 75</span>
                    </td>
                    <td className=''>
                    <span className='xui-badge xui-badge-success xui-font-sz-80 xui-bdr-rad-half'>Authenticated</span>
                    </td>
                    <td className='xui-opacity-5'>
                    <span>01/01/2023 at 9:35pm</span>
                    </td>
                </tr>
                <tr className=''>
                    <td className='xui-opacity-5'>
                        <span>#PSCDRC36273920</span>
                    </td>
                    <td className='xui-opacity-5'>
                        <span>Deposit</span>
                    </td>
                    <td className='xui-opacity-5 xui-font-w-bold'>
                    <span>NGN 75</span>
                    </td>
                    <td className=''>
                    <span className='xui-badge xui-badge-success xui-font-sz-80 xui-bdr-rad-half'>Authenticated</span>
                    </td>
                    <td className='xui-opacity-5'>
                    <span>01/01/2023 at 9:35pm</span>
                    </td>
                </tr>
                <tr className=''>
                    <td className='xui-opacity-5'>
                        <span>#PSCDRC36273920</span>
                    </td>
                    <td className='xui-opacity-5'>
                        <span>Deposit</span>
                    </td>
                    <td className='xui-opacity-5 xui-font-w-bold'>
                    <span>NGN 75</span>
                    </td>
                    <td className=''>
                    <span className='xui-badge xui-badge-success xui-font-sz-80 xui-bdr-rad-half'>Authenticated</span>
                    </td>
                    <td className='xui-opacity-5'>
                    <span>01/01/2023 at 9:35pm</span>
                    </td>
                </tr>
                <tr className=''>
                    <td className='xui-opacity-5'>
                        <span>#PSCDRC36273920</span>
                    </td>
                    <td className='xui-opacity-5'>
                        <span>Deposit</span>
                    </td>
                    <td className='xui-opacity-5 xui-font-w-bold'>
                    <span>NGN 75</span>
                    </td>
                    <td className=''>
                    <span className='xui-badge xui-badge-success xui-font-sz-80 xui-bdr-rad-half'>Authenticated</span>
                    </td>
                    <td className='xui-opacity-5'>
                    <span>01/01/2023 at 9:35pm</span>
                    </td>
                </tr>
                </table>
            </div>
            <div className='xui-d-flex xui-flex-jc-flex-end xui-py-1 xui-font-sz-85 xui-opacity-5 xui-mt-1'>
                <div className='xui-d-inline-flex xui-flex-ai-center'>
                    <span>Rows per page:</span>
                    <select className='psc-select-rows-per-page xui-ml-half'>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                </div>
                <div className='xui-mx-1 xui-lg-mx-2'>
                    <span><span className='xui-font-w-bold'>11 - 20</span> of 194</span>
                </div>
                <div className='xui-d-inline-flex xui-flex-ai-center xui-mx-1'>
                    <div className='xui-mr-half xui-cursor-pointer'>
                        <Arrowleft width="18" height="18" />
                    </div>
                    <div className='xui-ml-half xui-cursor-pointer'>
                        <Arrowright width="18" height="18" />
                    </div>
                </div>
            </div>
            </section>
        </Content>
        <section className='xui-modal' xui-modal="fundWallet">
            <div className='xui-modal-content xui-max-h-500 xui-overflow-auto xui-pos-relative'>
                <div className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-d-flex xui-flex-ai-center xui-flex-jc-center psc-bg xui-text-white psc-modal-close" xui-modal-close="fundWallet">
                    <Close width="24" height="24" />
                </div>
                <h1>Fund Wallet</h1>
                <form className="xui-form">
                    <div className="xui-form-box">
                        <label>Enter ammount <span className="xui-font-w-bold">(NGN)</span></label>
                        <input type={"text"} />
                    </div>
                    <div className="xui-form-box">
                        <button className="xui-btn xui-font-sz-85 psc-btn-blue">Continue to paystack</button>
                    </div>
                </form>
            </div>
        </section>
        </>
    );
}