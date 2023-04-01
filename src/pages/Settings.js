import Navbar from "../components/Navbar";
import Content from "../components/Content";
import Screen from '../components/Screen';
import { useState } from "react";
import AccountProfile from "./settings-tabs/AccountProfile";
import CompanyProfile from "./settings-tabs/CompanyProfile";
import ApiPricing from "./settings-tabs/ApiPricing";
import ApiKeys from "./settings-tabs/ApiKeys";

export default function Settings(){
    const [tab, setTab] = useState("accountProfile");
    return(
        <>
        <Screen aside="false" navbar="false">
            <Content>
                <Navbar placeholder="Search something..." />
                <section className="xui-bdr-w-1 xui-bdr-fade xui-bdr-s-solid xui-pt-half xui-pb-1 xui-px-1 xui-font-sz-85 psc-tabs-holder">
                    <div onClick={() => setTab("accountProfile")} className={"xui-cursor-pointer xui-py-1 xui-px-half es-tab-card " + (tab === "accountProfile" ? "active" : "")}>
                        <span>Account Profile</span>
                    </div>
                    <div onClick={() => setTab("companyProfile")} className={"xui-cursor-pointer xui-py-1 xui-px-half es-tab-card " + (tab === "companyProfile" ? "active" : "")}>
                        <span>Company Profile</span>
                    </div>
                    <div onClick={() => setTab("apiPricing")} className={"xui-cursor-pointer xui-py-1 xui-px-half es-tab-card " + (tab === "apiPricing" ? "active" : "")}>
                        <span>API Pricing</span>
                    </div>
                    <div onClick={() => setTab("apiKeys")} className={"xui-cursor-pointer xui-py-1 xui-px-half es-tab-card " + (tab === "apiKeys" ? "active" : "")}>
                        <span>API Keys</span>
                    </div>
                </section>
                <section className="xui-py-2">
                    {tab === "accountProfile" && <AccountProfile />}
                    {tab === "companyProfile" && <CompanyProfile />}
                    {tab === "apiPricing" && <ApiPricing />}
                    {tab === "apiKeys" && <ApiKeys />}
                </section>
            </Content>
        </Screen>
        </>
    );
}