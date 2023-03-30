// import Filter from '../icons/Filter';
import Star from '../icons/Star';
import Content from '../components/Content';
import Navbar from '../components/Navbar';

export default function Dashboard(){
    return(
        <>
        <Navbar placeholder="Search something..." />
        <Content>
            <section className='xui-mb-3'>
            <div className='xui-d-grid xui-grid-col-1 xui-lg-grid-col-2 xui-grid-gap-1 xui-lg-grid-gap-2'>
                <div className='xui-bg-pos-center xui-bg-sz-cover xui-bdr-rad-half xui-overflow-hidden' style={{backgroundImage: "url('https://res.cloudinary.com/xnyder/image/upload/v1679054785/passcoder-for-business/17-athletics_y2m7nj.png')"}}>
                <div className='xui-py-1 xui-px-2 xui-overlay xui-h-fluid-100'>
                    <h3 className='xui-font-sz-180 xui-font-w-normal'>517</h3>
                    <span className='xui-font-sz-90'>Your users</span>
                </div>
                </div>
                <div className='xui-bg-pos-center xui-bg-sz-cover xui-bdr-rad-half xui-overflow-hidden' style={{backgroundImage: "url('https://res.cloudinary.com/xnyder/image/upload/v1679054785/passcoder-for-business/17-athletics_y2m7nj.png')"}}>
                <div className='xui-py-1 xui-px-2 xui-overlay xui-h-fluid-100'>
                    <h3 className='xui-font-sz-180 xui-font-w-normal'>30,937</h3>
                    <span className='xui-font-sz-90'>Passcoder Total Users</span>
                </div>
                </div>
            </div>
            <div className='xui-mt-1-half xui-text-center'>
                <p className='xui-font-sz-80'><span className='xui-opacity-5'>Profile URL: </span><span className='xui-opacity-5 xui-font-w-bold'>business.passcoder.io/business-name</span> - <span className='xui-cursor-pointer psc-text'>Click to copy</span></p>
            </div>
            </section>
            <section className=''>
            <div className='xui-d-flex xui-flex-ai-center xui-flex-jc-space-between xui-py-1 psc-section-header'>
                <h1 className='xui-font-sz-110 xui-font-w-normal'>Recent Activities</h1>
                <div className='xui-d-inline-flex'>
                    {/* <div className='xui-d-inline-flex xui-flex-ai-center'>
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
                </tr>
                </table>
            </div>
            </section>
        </Content>
        </>
    );
}