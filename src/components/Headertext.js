import { useLocation } from "react-router-dom";

export default function Headertext(){
    const loc = useLocation();
    if(loc.pathname === '/'){
        return "Dashboard";
    }
    else if(loc.pathname === '/api-history'){
        return "API History";
    }
    else if(loc.pathname === '/wallet'){
        return "Wallet Account";
    }
    else if(loc.pathname === '/settings'){
        return "Settings";
    }
    else {
        return "Page not found";
    }
}