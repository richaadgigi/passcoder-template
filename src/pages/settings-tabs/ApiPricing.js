import { useEffect, useState } from "react";
import { getApiPricing } from "../../api/settings";
import useCookie from "../../hooks/useCookie";
import { config } from "../../config";
import Loading from "../../icons/Loading";
import Close from "../../icons/Close";

export default function ApiPricing(){
    const [cookie] = useCookie(config.token, "");
    const [apiPricing, setApiPricing] = useState(null);
    const [errorApiPricing, setErrorApiPricing] = useState(null);
    const [loadingApiPricing, setLoadingApiPricing] = useState(false);

    async function _getApiPricing() {
        setLoadingApiPricing(true);
        const response = await getApiPricing(cookie);
        setApiPricing(response.data);
        if (response.error) setErrorApiPricing(response.error.response.data.message);
        setLoadingApiPricing(false);
    };

    useEffect(() => {
        if (apiPricing === null) {
            _getApiPricing();
        }
    }, [apiPricing]);
    return(
        <>
            {
                loadingApiPricing ?
                    <center className='xui-font-sz-110 xui-py-3'><Loading width="12" height="12" /></center> :
                    (
                        apiPricing && apiPricing.success ?
                        <div className='xui-table-responsive'>
                            <table className='xui-table xui-font-sz-90'>
                                <thead>
                                    <tr className='xui-text-left xui-opacity-6'>
                                        <th className='xui-w-30'>S/N</th>
                                        <th className='xui-min-w-200'>Criteria</th>
                                        <th className='xui-min-w-100'>Price</th>
                                        <th className='xui-min-w-200'>Details</th>
                                        <th className='xui-min-w-150'>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {apiPricing.data.map((data, i) => (
                                        <tr className='' key={i}>
                                            <td className='xui-opacity-5'>
                                                <span>{i + 1}</span>
                                            </td>
                                            <td className='xui-opacity-5'>
                                                <span>{data.criteria}</span>
                                            </td>
                                            <td className='xui-opacity-5 xui-font-w-bold'>
                                                <span>{data.amount === 0 ? "Free" : "NGN " + data.amount}</span>
                                            </td>
                                            <td className='xui-opacity-5'>
                                                <span>{data.details ? data.details : "No details"}</span>
                                            </td>
                                            <td className=''>
                                                {
                                                    data.status === "Active" ?
                                                    <span className='xui-badge xui-badge-success xui-font-sz-80 xui-bdr-rad-half'>{data.status}</span> : 
                                                    <span className='xui-badge xui-badge-danger xui-font-sz-80 xui-bdr-rad-half'>{data.status}</span>
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
                                    <h3 className="xui-font-sz-120 xui-font-w-normal xui-mt-half">{errorApiPricing}</h3>
                                </center>
                            </div>
                        </div>
                    )
            }
        </>
    );
}