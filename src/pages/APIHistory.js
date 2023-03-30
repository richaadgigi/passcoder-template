// import Filter from '../icons/Filter';
import Star from '../icons/Star';
import Navbar from '../components/Navbar';
import Content from '../components/Content';
import Arrowright from '../icons/Arrowright';
import Arrowleft from '../icons/Arrowleft';

export default function APIHistory(){
    return(
        <>
        <Navbar placeholder="Search something..." />
        <Content>
            <section className=''>
            <div className='xui-d-flex xui-flex-ai-center xui-flex-jc-space-between xui-py-1 psc-section-header'>
                <h1 className='xui-font-sz-110 xui-font-w-normal'>Recent Activities</h1>
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
                    <th className='xui-min-w-300'>User</th>
                    <th className='xui-min-w-150'>Type</th>
                    <th className='xui-min-w-100'>Model</th>
                    <th className='xui-min-w-100'>Amount</th>
                    <th className='xui-min-w-200'>Status</th>
                    <th className='xui-min-w-250'>Date</th>
                    <th className='xui-min-w-150'>Actions</th>
                </tr>
                <tr className=''>
                    <td className='xui-opacity-5'>
                    <div className='xui-d-inline-flex xui-flex-ai-center'>
                        <p>Skittles ***56</p>
                        <div className='xui-ml-1'>
                        <Star width="18" height="18" />
                        <Star width="18" height="18" />
                        <Star width="18" height="18" />
                        <Star width="18" height="18" />
                        <Star width="18" height="18" />
                        </div>
                    </div>
                    </td>
                    <td className='xui-opacity-5'>Extended Bio</td>
                    <td className='xui-opacity-5 xui-font-w-bold'>
                    <span>NIN</span>
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
                    <td className=''>
                        <span xui-modal-open="viewMore" className='xui-cursor-pointer xui-font-sz-90 psc-text'>View more</span>
                    </td>
                </tr>
                <tr className=''>
                    <td className='xui-opacity-5'>
                    <div className='xui-d-inline-flex xui-flex-ai-center'>
                        <p>Hugh ***76</p>
                        <div className='xui-ml-1'>
                        <Star width="18" height="18" />
                        <Star width="18" height="18" />
                        <Star width="18" height="18" />
                        <Star width="18" height="18" />
                        <Star width="18" height="18" />
                        </div>
                    </div>
                    </td>
                    <td className='xui-opacity-5'>Government ID</td>
                    <td className='xui-opacity-5 xui-font-w-bold'>
                    <span>CAC</span>
                    </td>
                    <td className='xui-opacity-5 xui-font-w-bold'>
                    <span>NGN 35</span>
                    </td>
                    <td className=''>
                    <span className='xui-badge xui-badge-warning xui-font-sz-80 xui-bdr-rad-half'>Pending</span>
                    </td>
                    <td className='xui-opacity-5'>
                    <span>01/01/2023 at 9:35pm</span>
                    </td>
                    <td className=''>
                        <span xui-modal-open="viewMore" className='xui-cursor-pointer xui-font-sz-90 psc-text'>View more</span>
                    </td>
                </tr>
                <tr className=''>
                    <td className='xui-opacity-5'>
                    <div className='xui-d-inline-flex xui-flex-ai-center'>
                        <p>Skittles ***56</p>
                        <div className='xui-ml-1'>
                        <Star width="18" height="18" />
                        <Star width="18" height="18" />
                        <Star width="18" height="18" />
                        <Star width="18" height="18" />
                        <Star width="18" height="18" />
                        </div>
                    </div>
                    </td>
                    <td className='xui-opacity-5'>Extended Bio</td>
                    <td className='xui-opacity-5 xui-font-w-bold'>
                    <span>NIN</span>
                    </td>
                    <td className='xui-opacity-5 xui-font-w-bold'>
                    <span>NGN 75</span>
                    </td>
                    <td className=''>
                    <span className='xui-badge xui-badge-danger xui-font-sz-80 xui-bdr-rad-half'>Cancelled</span>
                    </td>
                    <td className='xui-opacity-5'>
                    <span>01/01/2023 at 9:35pm</span>
                    </td>
                    <td className=''>
                        <span xui-modal-open="viewMore" className='xui-cursor-pointer xui-font-sz-90 psc-text'>View more</span>
                    </td>
                </tr>
                <tr className=''>
                    <td className='xui-opacity-5'>
                    <div className='xui-d-inline-flex xui-flex-ai-center'>
                        <p>Skittles ***56</p>
                        <div className='xui-ml-1'>
                        <Star width="18" height="18" />
                        <Star width="18" height="18" />
                        <Star width="18" height="18" />
                        <Star width="18" height="18" />
                        <Star width="18" height="18" />
                        </div>
                    </div>
                    </td>
                    <td className='xui-opacity-5'>Extended Bio</td>
                    <td className='xui-opacity-5 xui-font-w-bold'>
                    <span>NIN</span>
                    </td>
                    <td className='xui-opacity-5 xui-font-w-bold'>
                    <span>NGN 75</span>
                    </td>
                    <td className=''>
                    <span className='xui-badge xui-badge-info xui-font-sz-80 xui-bdr-rad-half'>Pending</span>
                    </td>
                    <td className='xui-opacity-5'>
                    <span>01/01/2023 at 9:35pm</span>
                    </td>
                    <td className=''>
                        <span xui-modal-open="viewMore" className='xui-cursor-pointer xui-font-sz-90 psc-text'>View more</span>
                    </td>
                </tr>
                <tr className=''>
                    <td className='xui-opacity-5'>
                    <div className='xui-d-inline-flex xui-flex-ai-center'>
                        <p>Skittles ***56</p>
                        <div className='xui-ml-1'>
                        <Star width="18" height="18" />
                        <Star width="18" height="18" />
                        <Star width="18" height="18" />
                        <Star width="18" height="18" />
                        <Star width="18" height="18" />
                        </div>
                    </div>
                    </td>
                    <td className='xui-opacity-5'>Extended Bio</td>
                    <td className='xui-opacity-5 xui-font-w-bold'>
                    <span>NIN</span>
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
                    <td className=''>
                        <span xui-modal-open="viewMore" className='xui-cursor-pointer xui-font-sz-90 psc-text'>View more</span>
                    </td>
                </tr>
                <tr className=''>
                    <td className='xui-opacity-5'>
                    <div className='xui-d-inline-flex xui-flex-ai-center'>
                        <p>Hugh ***76</p>
                        <div className='xui-ml-1'>
                        <Star width="18" height="18" />
                        <Star width="18" height="18" />
                        <Star width="18" height="18" />
                        <Star width="18" height="18" />
                        <Star width="18" height="18" />
                        </div>
                    </div>
                    </td>
                    <td className='xui-opacity-5'>Government ID</td>
                    <td className='xui-opacity-5 xui-font-w-bold'>
                    <span>CAC</span>
                    </td>
                    <td className='xui-opacity-5 xui-font-w-bold'>
                    <span>NGN 35</span>
                    </td>
                    <td className=''>
                    <span className='xui-badge xui-badge-warning xui-font-sz-80 xui-bdr-rad-half'>Pending</span>
                    </td>
                    <td className='xui-opacity-5'>
                    <span>01/01/2023 at 9:35pm</span>
                    </td>
                    <td className=''>
                        <span xui-modal-open="viewMore" className='xui-cursor-pointer xui-font-sz-90 psc-text'>View more</span>
                    </td>
                </tr>
                <tr className=''>
                    <td className='xui-opacity-5'>
                    <div className='xui-d-inline-flex xui-flex-ai-center'>
                        <p>Skittles ***56</p>
                        <div className='xui-ml-1'>
                        <Star width="18" height="18" />
                        <Star width="18" height="18" />
                        <Star width="18" height="18" />
                        <Star width="18" height="18" />
                        <Star width="18" height="18" />
                        </div>
                    </div>
                    </td>
                    <td className='xui-opacity-5'>Extended Bio</td>
                    <td className='xui-opacity-5 xui-font-w-bold'>
                    <span>NIN</span>
                    </td>
                    <td className='xui-opacity-5 xui-font-w-bold'>
                    <span>NGN 75</span>
                    </td>
                    <td className=''>
                    <span className='xui-badge xui-badge-danger xui-font-sz-80 xui-bdr-rad-half'>Cancelled</span>
                    </td>
                    <td className='xui-opacity-5'>
                    <span>01/01/2023 at 9:35pm</span>
                    </td>
                    <td className=''>
                        <span xui-modal-open="viewMore" className='xui-cursor-pointer xui-font-sz-90 psc-text'>View more</span>
                    </td>
                </tr>
                <tr className=''>
                    <td className='xui-opacity-5'>
                    <div className='xui-d-inline-flex xui-flex-ai-center'>
                        <p>Skittles ***56</p>
                        <div className='xui-ml-1'>
                        <Star width="18" height="18" />
                        <Star width="18" height="18" />
                        <Star width="18" height="18" />
                        <Star width="18" height="18" />
                        <Star width="18" height="18" />
                        </div>
                    </div>
                    </td>
                    <td className='xui-opacity-5'>Extended Bio</td>
                    <td className='xui-opacity-5 xui-font-w-bold'>
                    <span>NIN</span>
                    </td>
                    <td className='xui-opacity-5 xui-font-w-bold'>
                    <span>NGN 75</span>
                    </td>
                    <td className=''>
                    <span className='xui-badge xui-badge-info xui-font-sz-80 xui-bdr-rad-half'>Pending</span>
                    </td>
                    <td className='xui-opacity-5'>
                    <span>01/01/2023 at 9:35pm</span>
                    </td>
                    <td className=''>
                        <span xui-modal-open="viewMore" className='xui-cursor-pointer xui-font-sz-90 psc-text'>View more</span>
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
        <section className='xui-modal' xui-modal="viewMore">
            <div className='xui-modal-content xui-max-h-500 xui-overflow-auto'>
                <div className='xui-d-flex xui-flex-dir-column xui-lg-flex-dir-row'>
                    <div className='xui-w-200 xui-h-200 xui-bg-sz-cover xui-bg-pos-center' style={{backgroundImage:"url('https://images.unsplash.com/photo-1531475925016-6d33cb7c8344?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG5pZ2VyaWElMjBwb3J0cmFpdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60')"}}></div>
                    <div className='xui-pl-none xui-lg-pl-1 xui-mt-2 xui-lg-mt-none xui-text-uppercase xui-font-sz-90' style={{width: "calc(100% - 200px)"}}>
                        <p className='xui-mb-1-half'><span className='xui-opacity-6'>Firstname:</span> <span className='xui-font-w-bold'>Richard</span></p>
                        <p className='xui-mb-1-half'><span className='xui-opacity-6'>Middlename:</span> <span className='xui-font-w-bold'>Oyeinbrakemi</span></p>
                        <p className='xui-mb-1-half'><span className='xui-opacity-6'>Lastname:</span> <span className='xui-font-w-bold'>Gigi</span></p>
                        <p className='xui-mb-1-half'><span className='xui-opacity-6'>Gender:</span> <span className='xui-font-w-bold'>Male</span></p>
                        <p className='xui-mb-1-half'><span className='xui-opacity-6'>Date of birth:</span> <span className='xui-font-w-bold'>24th of July, 2001</span></p>
                    </div>
                </div>
                <hr className='xui-my-1' />
                <div className='xui-p-1 xui-bdr-w-1 xui-bdr-s-solid xui-bdr-fade xui-d-flex xui-flex-ai-center'>
                    <div>
                        <p className='xui-font-w-bold xui-font-sz-80 xui-opacity-5'>NIN Slip &nbsp; 452838218</p>
                        <span className='xui-font-sz-70 xui-opacity-5 xui-d-inline-block xui-mt-half'>Issued: 2007</span>
                    </div>
                </div>
                <img className='xui-img-300 xui-mt-1' src='https://infomediang.com/wp-content/uploads/2021/01/Old-National-Identity-Card-nin-number.jpg' alt='' />
            </div>
        </section>
        </>
    );
}