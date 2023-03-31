import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Access from "./pages/Access";
import Dashboard from "./pages/Dashboard";
import APIHistory from "./pages/APIHistory";
import Wallet from "./pages/Wallet";
import Settings from "./pages/Settings";
import NoPage from "./pages/NoPage";
import SignIn from "./pages/SignIn";
import OTPVerification from "./pages/OTPVerification";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import TokenSuccess from "./pages/TokenSuccess";

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="api-history" element={<APIHistory />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route path='/' element={<Access />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="otp-verification" element={<OTPVerification />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="token-success" element={<TokenSuccess />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}