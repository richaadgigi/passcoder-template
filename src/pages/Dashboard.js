import { useEffect, useState } from "react";
import Screen from '../components/Screen';
import Content from '../components/Content';
import Navbar from '../components/Navbar';
import Arrowright from '../icons/Arrowright';
import Arrowleft from '../icons/Arrowleft';
import Star from '../icons/Star';
import { useGetPlatform, useGetPlatformMetrics } from "../hooks/usePlatform";
import { getApiHistory } from "../api/history";
import useCookie from "../hooks/useCookie";
import { config } from "../config";
import Loading from "../icons/Loading";
import Close from "../icons/Close";
import Copy from "../icons/Copy";
import Check from "../icons/Check";

export default function Dashboard(){
    const { cookie } = useCookie(config.token, "");
    const [copiedAccessUrl, setCopiedAccessURL] = useState(false);
    const [recentHistory, setRecentHistory] = useState(null);
    const [errorRecentHistory, setErrorRecentHistory] = useState(null);
    const [loadingRecentHistory, setLoadingRecentHistory] = useState(false);

    const { platformDetails } = useGetPlatform();
    const { platformMetrics } = useGetPlatformMetrics();

    const [size, setSize] = useState(20);
    const [page, setPage] = useState(1);

    // const handleSize = (e) => { e.preventDefault(); setSize(e.target.value); setPage(1); getRecentHistory(page, e.target.value); };

    // async function previousHistory() {
    //     if (page !== 1) setPage(page - 1);
    //     if (page !== 1) getRecentHistory(page - 1, size);
    // };

    // async function nextHistory() {
    //     if (page < recentHistory.data.pages) setPage(page + 1); 
    //     if (page < recentHistory.data.pages) getRecentHistory(page + 1, size);
    // };

    async function getRecentHistory(_page, _size) {
        setLoadingRecentHistory(true);
        const response = await getApiHistory(cookie, (_page || page), (_size || size));
        setRecentHistory(response.data);
        if (response.error) setErrorRecentHistory(response.error.response.data.message);
        setLoadingRecentHistory(false);
    };

    useEffect(() => {
        if (recentHistory === null) {
            getRecentHistory();
        }
    }, [recentHistory]);

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
    };

    const copyAccessURL = (AccessURL) => {
        copyText(AccessURL);
        setCopiedAccessURL(true);
        setTimeout(function () {
            setCopiedAccessURL(false);
        }, 2000)
    };
    return(
        <>
            <Screen aside="false" navbar="false">
                <Content>
                    <Navbar placeholder="Search something..." makeHidden={true} />
                    <section className='xui-mb-3'>
                    <div className='xui-d-grid xui-grid-col-1 xui-lg-grid-col-2 xui-grid-gap-1 xui-lg-grid-gap-2'>
                        <div className='xui-bg-pos-center xui-bg-sz-cover xui-bdr-rad-half xui-overflow-hidden' style={{backgroundImage: "url('https://res.cloudinary.com/xnyder/image/upload/v1679054785/passcoder-for-business/17-athletics_y2m7nj.png')"}}>
                        <div className='xui-py-1 xui-px-2 xui-overlay xui-h-fluid-100'>
                            <h3 className='xui-font-sz-180 xui-font-w-normal'>{platformMetrics ? platformMetrics.data.total_platform_users : <Loading width="12" height="12" />}</h3>
                            <span className='xui-font-sz-90'>Your Users</span>
                        </div>
                        </div>
                        <div className='xui-bg-pos-center xui-bg-sz-cover xui-bdr-rad-half xui-overflow-hidden' style={{backgroundImage: "url('https://res.cloudinary.com/xnyder/image/upload/v1679054785/passcoder-for-business/17-athletics_y2m7nj.png')"}}>
                        <div className='xui-py-1 xui-px-2 xui-overlay xui-h-fluid-100'>
                            <h3 className='xui-font-sz-180 xui-font-w-normal'>{platformMetrics ? platformMetrics.data.total_general_users : <Loading width="12" height="12" />}</h3>
                            <span className='xui-font-sz-90'>Passcoder Total Users</span>
                        </div>
                        </div>
                    </div>
                    <div className='xui-mt-1-half xui-text-center'>
                        <p className='xui-font-sz-90'>
                            <span className='xui-opacity-5'>Profile URL: </span>
                            <a href={platformDetails ? platformDetails.data.access_url : ""} className='xui-cursor-pointer psc-text'>{platformDetails ? platformDetails.data.access_url : "..."}</a> 
                            {
                                platformDetails ? 
                                <span className="xui-cursor-pointer xui-ml-1" onClick={() => { if (platformDetails) copyAccessURL(platformDetails.data.access_url); }}>
                                    {copiedAccessUrl ? <Check width="16" height="16" /> : <Copy width="16" height="16" />}
                                </span> : 
                                ""
                            }
                        </p> 
                    </div>
                    </section>
                    <section className=''>
                        <div className='xui-d-flex xui-flex-ai-center xui-flex-jc-space-between xui-py-1 psc-section-header'>
                            <h1 className='xui-font-sz-110 xui-font-w-normal'>Recent Activities</h1>
                            <div className='xui-d-inline-flex'>
                            </div>
                        </div>
                        {
                            loadingRecentHistory ? 
                            <center className='xui-font-sz-110 xui-py-3'><Loading width="12" height="12" /></center> : 
                            (
                                recentHistory && recentHistory.success ?
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
                                            {recentHistory.data.rows.sort((a, b) => new Date(a.updatedAt.date + " " + a.updatedAt.time).getTime() < new Date(b.updatedAt.date + " " + b.updatedAt.time).getTime() ? 1 : -1).map((data, i) => (
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
                                            <h3 className="xui-font-sz-120 xui-font-w-normal xui-mt-half">{errorRecentHistory}</h3>
                                        </center>
                                    </div>
                                </div>
                            )
                        }
                        {/* {
                            loadingRecentHistory ?
                            <Loading width="12" height="12" /> : 
                            (
                                recentHistory && recentHistory.success ?
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
                                    <span><span className='xui-font-w-bold'>{page}</span> of {recentHistory ? recentHistory.data.pages : "..."}</span>
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
                        } */}
                    </section>
                </Content>
            </Screen>
        </>
    );
}