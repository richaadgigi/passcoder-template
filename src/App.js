import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { config } from "./config";
import useCookie from "./hooks/useCookie";
import Layout from "./pages/Layout";
import Access from "./pages/Access";
import Dashboard from "./pages/Dashboard";
import APIHistory from "./pages/APIHistory";
import Wallet from "./pages/Wallet";
import Teams from "./pages/Teams";
import Settings from "./pages/Settings";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ResetToken from "./pages/auth/ResetToken";
import VerifyEmail from "./pages/auth/VerifyEmail";

export default function App(){
  const {cookie} = useCookie(config.token, "");
  
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/:stripped' element={<Layout />}>
          <Route path="dashboard" element={
            !cookie || cookie === '[object Object]' ?
              (<Navigate replace to={"/signup"} />) :
              (<Dashboard />)
          } />
          <Route path="api-history" element={
            !cookie || cookie === '[object Object]' ?
              (<Navigate replace to={"/signup"} />) :
              (<APIHistory />)
          } />
          <Route path="wallet" element={
            !cookie || cookie === '[object Object]' ?
              (<Navigate replace to={"/signup"} />) :
              (<Wallet />)
          } />
          <Route path="teams" element={
            !cookie || cookie === '[object Object]' ?
              (<Navigate replace to={"/signup"} />) :
              (<Teams />)
          } />
          <Route path="settings" element={
            !cookie || cookie === '[object Object]' ?
              (<Navigate replace to={"/signup"} />) :
              (<Settings />)
          } />
          <Route path="*" element={<Navigate replace to={"dashboard"} />} />
        </Route>
        <Route path='/' element={<Access />}>
          <Route index element={<SignUp />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="access/:stripped" element={<SignIn />} />
          <Route path="reset-master-token" element={<ResetToken />} />
          <Route path="verify/email" element={<VerifyEmail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}