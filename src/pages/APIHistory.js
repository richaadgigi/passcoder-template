import { useEffect, useState } from "react";
// import Filter from '../icons/Filter';
import Star from '../icons/Star';
import Navbar from '../components/Navbar';
import Screen from '../components/Screen';
import Content from '../components/Content';
import Arrowright from '../icons/Arrowright';
import Arrowleft from '../icons/Arrowleft';
import { getApiHistory } from "../api/history";
import useCookie from "../hooks/useCookie";
import { config } from "../config";
import Loading from "../icons/Loading";
import Close from "../icons/Close";

export default function APIHistory(){
    const [cookie] = useCookie(config.token, "");
    const [allHistory, setAllHistory] = useState(null);
    const [errorAllHistory, setErrorAllHistory] = useState(null);
    const [loadingAllHistory, setLoadingAllHistory] = useState(false);

    const [size, setSize] = useState(20);
    const [page, setPage] = useState(1);

    const handleSize = (e) => { e.preventDefault(); setSize(e.target.value); setPage(1); getAllHistory(page, e.target.value); };

    async function previousHistory() {
        if (page !== 1) setPage(page - 1);
        if (page !== 1) getAllHistory(page - 1, size);
    };

    async function nextHistory() {
        if (page < allHistory.data.pages) setPage(page + 1);
        if (page < allHistory.data.pages) getAllHistory(page + 1, size);
    };

    async function getAllHistory(_page, _size) {
        setLoadingAllHistory(true);
        const response = await getApiHistory(cookie, (_page || page), (_size || size));
        setAllHistory(response.data);
        if (response.error) setErrorAllHistory(response.error.response.data.message);
        setLoadingAllHistory(false);
    };

    useEffect(() => {
        if (allHistory === null) {
            getAllHistory();
        }
    }, [allHistory]);
    return(
        <>
        <Screen aside="false" navbar="false">
            <Content>
                    <Navbar placeholder="Search something..." makeHidden={true} />
                    <section className=''>
                        <div className='xui-d-flex xui-flex-ai-center xui-flex-jc-space-between xui-py-1 psc-section-header'>
                            <div className="xui-mb-1">
                                <h1 className='xui-font-sz-110 xui-font-w-normal'>All API calls</h1>
                                <p className="xui-opacity-5 xui-font-sz-90 xui-mt-half">View your API usage history</p>
                            </div>
                            <div className='xui-d-inline-flex'>
                            </div>
                        </div>
                        {
                            loadingAllHistory ?
                                <center className='xui-font-sz-110 xui-py-3'><Loading width="12" height="12" /></center> :
                                (
                                    allHistory && allHistory.success ?
                                        <div className='xui-table-responsive'>
                                            <table className='xui-table xui-font-sz-90'>
                                                <thead>
                                                    <tr className='xui-text-left xui-opacity-6'>
                                                        <th className='xui-min-w-250'>User</th>
                                                        <th className='xui-min-w-150'>Stars</th>
                                                        <th className='xui-min-w-150'>Model</th>
                                                        <th className='xui-min-w-150'>Type</th>
                                                        <th className='xui-min-w-100'>Amount</th>
                                                        <th className='xui-min-w-100'>Status</th>
                                                        <th className='xui-min-w-300'>Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {allHistory.data.rows.sort((a, b) => new Date(a.updatedAt.date + " " + a.updatedAt.time).getTime() < new Date(b.updatedAt.date + " " + b.updatedAt.time).getTime() ? 1 : -1).map((data, i) => (
                                                        <tr className='' key={i}>
                                                            <td className='xui-opacity-5'>
                                                                <div className='xui-d-inline-flex xui-flex-ai-center'>
                                                                    <p>{data.user_data ? data.user_data.firstname : "Null"} {data.user_data ? data.user_data.lastname : "Null"} ({data.user_data ? data.user_data.pid : ""})</p>
                                                                </div>
                                                            </td>
                                                            <td className='xui-opacity-5'>
                                                                {
                                                                    data.user_data ?
                                                                        (
                                                                            <span>

                                                                                {
                                                                                    data.user_data.star === 0 ?
                                                                                        <div className=''>
                                                                                            <p>No star</p>
                                                                                        </div>
                                                                                        : ""
                                                                                }
                                                                                {
                                                                                    data.user_data.star === 1 ?
                                                                                        <div className=''>
                                                                                            <Star width="18" height="18" />
                                                                                        </div>
                                                                                        : ""
                                                                                }
                                                                                {
                                                                                    data.user_data.star === 2 ?
                                                                                        <div className=''>
                                                                                            <Star width="18" height="18" />
                                                                                            <Star width="18" height="18" />
                                                                                        </div>
                                                                                        : ""
                                                                                }
                                                                                {
                                                                                    data.user_data.star === 3 ?
                                                                                        <div className=''>
                                                                                            <Star width="18" height="18" />
                                                                                            <Star width="18" height="18" />
                                                                                            <Star width="18" height="18" />
                                                                                        </div>
                                                                                        : ""
                                                                                }
                                                                                {
                                                                                    data.user_data.star === 4 ?
                                                                                        <div className=''>
                                                                                            <Star width="18" height="18" />
                                                                                            <Star width="18" height="18" />
                                                                                            <Star width="18" height="18" />
                                                                                            <Star width="18" height="18" />
                                                                                        </div>
                                                                                        : ""
                                                                                }
                                                                                {
                                                                                    data.user_data.star === 5 ?
                                                                                        <div className=''>
                                                                                            <Star width="18" height="18" />
                                                                                            <Star width="18" height="18" />
                                                                                            <Star width="18" height="18" />
                                                                                            <Star width="18" height="18" />
                                                                                            <Star width="18" height="18" />
                                                                                        </div>
                                                                                        : ""
                                                                                }
                                                                            </span>
                                                                        ) :
                                                                        <div className=''>
                                                                            <p>No star</p>
                                                                        </div>
                                                                }
                                                            </td>
                                                            <td className='xui-opacity-5'>{data.model}</td>
                                                            <td className='xui-opacity-5 xui-font-w-bold'>
                                                                <span>{data.type}</span>
                                                            </td>
                                                            <td className='xui-opacity-5 xui-font-w-bold'>
                                                                <span>{data.amount === 0 ? "Free" : "NGN " + data.amount}</span>
                                                            </td>
                                                            <td className=''>
                                                                {
                                                                    data.status === "Authenticated" || data.status === "Completed" ?
                                                                        <span className='xui-badge xui-badge-success xui-font-sz-80 xui-bdr-rad-half'>{data.status}</span> : ""
                                                                }
                                                                {
                                                                    data.status === "Pending" || data.status === "Ineligible" ?
                                                                        <span className='xui-badge xui-badge-warning xui-font-sz-80 xui-bdr-rad-half'>{data.status}</span> : ""
                                                                }
                                                                {
                                                                    data.status === "Unauthenticated" || data.status === "Timeout" ?
                                                                        <span className='xui-badge xui-badge-danger xui-font-sz-80 xui-bdr-rad-half'>{data.status}</span> : ""
                                                                }
                                                            </td>
                                                            <td className='xui-opacity-5'>
                                                                <span>{data.updatedAt.date} at {data.updatedAt.time}</span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div> :
                                        <div className="xui-d-grid xui-lg-grid-col-1 xui-grid-gap-2 xui-mt-2">
                                            <div className="xui-bdr-w-1 xui-bdr-s-solid xui-bdr-fade xui-py-2 xui-px-1">
                                                <center className="xui-text-red">
                                                    <Close width="100" height="100" />
                                                    <h3 className="xui-font-sz-120 xui-font-w-normal xui-mt-half">{errorAllHistory}</h3>
                                                </center>
                                            </div>
                                        </div>
                                )
                        }
                        {
                            loadingAllHistory ?
                                <Loading width="12" height="12" /> :
                                (
                                    allHistory && allHistory.success ?
                                        <div className='xui-d-flex xui-flex-jc-flex-end xui-py-1 xui-font-sz-85 xui-opacity-5 xui-mt-1'>
                                            <div className='xui-d-inline-flex xui-flex-ai-center'>
                                                <span>Rows per page:</span>
                                                <select value={size} onChange={handleSize} className='psc-select-rows-per-page xui-ml-half'>
                                                    <option value={20}>20</option>
                                                    <option value={50}>50</option>
                                                    <option value={100}>100</option>
                                                </select>
                                            </div>
                                            <div className='xui-mx-1 xui-lg-mx-2'>
                                                <span><span className='xui-font-w-bold'>{page}</span> of {allHistory ? allHistory.data.pages : "..."}</span>
                                            </div>
                                            <div className='xui-d-inline-flex xui-flex-ai-center xui-mx-1'>
                                                <div className='xui-mr-half xui-cursor-pointer' title="Previous" onClick={previousHistory}>
                                                    <Arrowleft width="18" height="18" />
                                                </div>
                                                <div className='xui-ml-half xui-cursor-pointer' title="Next" onClick={nextHistory}>
                                                    <Arrowright width="18" height="18" />
                                                </div>
                                            </div>
                                        </div> :
                                        ""
                                )
                        }
                    </section>
            </Content>
        </Screen>
        {/* <section className='xui-modal' xui-modal="viewMore">
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
        </section> */}
        </>
    );
}