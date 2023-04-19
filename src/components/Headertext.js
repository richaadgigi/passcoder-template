import { useLocation } from "react-router-dom";

export default function Headertext(){
    const loc = useLocation();
    const { pathname } = useLocation();
    const _stripped = pathname.replace("/", "");
    const stripped = _stripped.split("/")[0];

    if (loc.pathname === `/${stripped}/dashboard`){
        return "Dashboard";
    } else if (loc.pathname === `/${stripped}/api-history`){
        return "API History";
    } else if (loc.pathname === `/${stripped}/wallet`){
        return "Wallet Account";
    } else if (loc.pathname === `/${stripped}/teams`) {
        return "Teams";
    } else if (loc.pathname === `/${stripped}/settings`){
        return "Settings";
    } else {
        return "Page not found";
    }
}