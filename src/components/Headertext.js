import { useLocation } from "react-router-dom";

export default function Headertext(){
    const loc = useLocation();
    const { pathname } = useLocation();
    const _stripped = pathname.replace("/", "");
    const stripped = _stripped.split("/")[0];

    if (loc.pathname === `/${stripped}/dashboard`){
        return "Dashboard";
    } else if (loc.pathname === `/${stripped}/offers`){
        return "Offers";
    } else if (loc.pathname === `/${stripped}/loyalties`) {
        return "Loyalties";
    } else if (loc.pathname === `/${stripped}/announcements`) {
        return "Announcements";
    } else if (loc.pathname === `/${stripped}/transactions`){
        return "Transactions";
    } else if (loc.pathname === `/${stripped}/teams`) {
        return "Teams";
    } else if (loc.pathname === `/${stripped}/settings`){
        return "Settings";
    } else {
        return "Page not found";
    }
}