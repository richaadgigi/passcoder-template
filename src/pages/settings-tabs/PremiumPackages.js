import { useEffect, useState } from "react";
import { getPremiumPackages } from "../../api/settings";
import useCookie from "../../hooks/useCookie";
import { config } from "../../config";
import Loading from "../../icons/Loading";
import Close from "../../icons/Close";

export default function PremiumPackages(){
    const {cookie} = useCookie(config.token, "");
    const [premiumPackages, setPremiumPackages] = useState(null);
    const [errorPremiumPackages, setErrorPremiumPackages] = useState(null);
    const [loadingPremiumPackages, setLoadingPremiumPackages] = useState(false);

    async function _getPremiumPackages() {
        setLoadingPremiumPackages(true);
        const response = await getPremiumPackages(cookie);
        setPremiumPackages(response.data);
        if (response.error) setErrorPremiumPackages(response.error.response.data.message);
        setLoadingPremiumPackages(false);
    };

    useEffect(() => {
        if (premiumPackages === null) {
            _getPremiumPackages();
        }
    }, [premiumPackages]);
    return(
        <>
            {
                loadingPremiumPackages ?
                    <center className='xui-font-sz-110 xui-py-3'><Loading width="12" height="12" /></center> :
                    (
                        premiumPackages && premiumPackages.success ?
                        <div className='xui-table-responsive'>
                            <table className='xui-table xui-font-sz-90'>
                                <thead>
                                    <tr className='xui-text-left xui-opacity-6'>
                                        <th className='xui-w-30'>S/N</th>
                                        <th className='xui-min-w-150'>Package</th>
                                        <th className='xui-min-w-100'>Price</th>
                                        <th className='xui-min-w-100'>Offers</th>
                                        <th className='xui-min-w-100'>Announcements</th>
                                        <th className='xui-min-w-150'>Issue Points</th>
                                        <th className='xui-min-w-100'>Excel Export</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {premiumPackages.data.map((data, i) => (
                                        <tr className='' key={i}>
                                            <td className='xui-opacity-5'>
                                                <span>{i + 1}</span>
                                            </td>
                                            <td className='xui-opacity-5'>
                                                <span>{data.name}</span>
                                            </td>
                                            <td className='xui-opacity-5 xui-font-w-bold'>
                                                <span>{data.price === 0 ? "Free" : "NGN " + data.price.toLocaleString()}</span>
                                            </td>
                                            <td className='xui-opacity-5'>
                                                <span>{data.offers === true ? "Unlimited" : data.offers.toLocaleString()}</span>
                                            </td>
                                            <td className='xui-opacity-5'>
                                                <span>{data.announcements === true ? "Unlimited" : data.announcements.toLocaleString()}</span>
                                            </td>
                                            <td className='xui-opacity-5'>
                                                <span>{data.customer_issued_points === true ? "Unlimited" : data.customer_issued_points.toLocaleString()}</span>
                                            </td>
                                            <td className=''>
                                                {
                                                    data.export_to_excel ?
                                                    <span className='xui-badge xui-badge-success xui-font-sz-80 xui-bdr-rad-half'>{"Yes"}</span> : 
                                                    <span className='xui-badge xui-badge-danger xui-font-sz-80 xui-bdr-rad-half'>{"No"}</span>
                                                }
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
                                    <h3 className="xui-font-sz-120 xui-font-w-normal xui-mt-half">{errorPremiumPackages}</h3>
                                </center>
                            </div>
                        </div>
                    )
            }
        </>
    );
}