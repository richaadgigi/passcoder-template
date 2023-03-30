export default function ApiPricing(){
    return(
        <>
        <div className='xui-table-responsive'>
        <table className='xui-table xui-font-sz-90'>
            <tr className='xui-text-left xui-opacity-6'>
                <th className='xui-w-30'>S/N</th>
                <th className='xui-min-w-150'>Criteria</th>
                <th className='xui-min-w-100'>Price</th>
                <th className='xui-min-w-200'>Details</th>
                <th className='xui-min-w-150'>Status</th>
            </tr>
            <tr className=''>
                <td className='xui-opacity-5'>
                    <span>1</span>
                </td>
                <td className='xui-opacity-5'>
                    <span>Unknown Criteria</span>
                </td>
                <td className='xui-opacity-5 xui-font-w-bold'>
                <span>NGN 75</span>
                </td>
                <td className='xui-opacity-5'>
                    <span>Detail goes here</span>
                </td>
                <td className=''>
                <span className='xui-badge xui-badge-success xui-font-sz-80 xui-bdr-rad-half'>Active</span>
                </td>
            </tr>
            <tr className=''>
                <td className='xui-opacity-5'>
                    <span>2</span>
                </td>
                <td className='xui-opacity-5'>
                    <span>Unknown Criteria</span>
                </td>
                <td className='xui-opacity-5 xui-font-w-bold'>
                <span>NGN 75</span>
                </td>
                <td className='xui-opacity-5'>
                    <span>Detail goes here</span>
                </td>
                <td className=''>
                <span className='xui-badge xui-badge-danger xui-font-sz-80 xui-bdr-rad-half'>Inactive</span>
                </td>
            </tr>
            <tr className=''>
                <td className='xui-opacity-5'>
                    <span>3</span>
                </td>
                <td className='xui-opacity-5'>
                    <span>Unknown Criteria</span>
                </td>
                <td className='xui-opacity-5 xui-font-w-bold'>
                <span>NGN 75</span>
                </td>
                <td className='xui-opacity-5'>
                    <span>Detail goes here</span>
                </td>
                <td className=''>
                <span className='xui-badge xui-badge-success xui-font-sz-80 xui-bdr-rad-half'>Active</span>
                </td>
            </tr>
            <tr className=''>
                <td className='xui-opacity-5'>
                    <span>4</span>
                </td>
                <td className='xui-opacity-5'>
                    <span>Unknown Criteria</span>
                </td>
                <td className='xui-opacity-5 xui-font-w-bold'>
                <span>NGN 75</span>
                </td>
                <td className='xui-opacity-5'>
                    <span>Detail goes here</span>
                </td>
                <td className=''>
                <span className='xui-badge xui-badge-danger xui-font-sz-80 xui-bdr-rad-half'>Inactive</span>
                </td>
            </tr>
        </table>
        </div>
        </>
    );
}