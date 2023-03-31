import { Link } from "react-router-dom";
import Wallet from "../icons/Wallet";
import Arrowright from "../icons/Arrowright";

export default function OTPVerification(){
    const inputs = document.querySelectorAll(".otp-field input");

    inputs.forEach((input, index) => {
        input.dataset.index = index;
        input.addEventListener("keyup", handleOtp);
        input.addEventListener("paste", handleOnPasteOtp);
    });

    function handleOtp(e) {
        /**
         * <input type="text" 👉 maxlength="1" />
         * 👉 NOTE: On mobile devices `maxlength` property isn't supported,
         * So we to write our own logic to make it work. 🙂
         */
        const input = e.target;
        let value = input.value;
        let isValidInput = value.match(/[0-9a-z]/gi);
        input.value = "";
        input.value = isValidInput ? value[0] : "";

        let fieldIndex = input.dataset.index;
        if (fieldIndex < inputs.length - 1 && isValidInput) {
            input.nextElementSibling.focus();
        }

        if (e.key === "Backspace" && fieldIndex > 0) {
            input.previousElementSibling.focus();
        }

        if (fieldIndex === inputs.length - 1 && isValidInput) {
            submit();
        }
    }

    function handleOnPasteOtp(e) {
        const data = e.clipboardData.getData("text");
        const value = data.split("");
        if (value.length === inputs.length) {
            inputs.forEach((input, index) => (input.value = value[index]));
            submit();
        }
    }

    function submit() {
        console.log("Submitting...");
        // 👇 Entered OTP
        let otp = "";
        inputs.forEach((input) => {
            otp += input.value;
            input.disabled = true;
            input.classList.add("disabled");
        });
        console.log(otp);
        // 👉 Call API below
    }
    return(
        <>
        <div className="xui-max-w-500 xui-w-fluid-100 xui-mt-2 xui-md-mt-none">
            <div className="xui-bg-white xui-bdr-rad-half xui-w-fluid-100 xui-p-1-half xui-pb-3 xui-text-black">
                <h2 className="xui-font-sz-125 xui-w-fluid-80 xui-mx-auto xui-text-center">OTP Verfication</h2>
                <p className="xui-opacity-5 xui-font-sz-90 xui-mt-half xui-text-center xui-w-fluid-70 xui-mx-auto xui-line-height-1-half">A one time password has been sent to your email, kindly fill it in below.</p>
                <div class="otp-field xui-d-flex xui-flex-jc-center xui-my-2">
                    <input type="text" maxlength="1" />
                    <input type="text" maxlength="1" />
                    <input type="text" maxlength="1" />
                    <input type="text" maxlength="1" />
                    <input type="text" maxlength="1" />
                    <input type="text" maxlength="1" />
                </div>
                <p className="xui-font-sz-80 xui-my-2 xui-text-center"><span className="xui-opacity-7">Didn't get it?</span> <span className="xui-font-w-bold psc-text xui-text-dc-none">Resend OTP</span></p>
                <div className="xui-mt-5 xui-d-flex xui-flex-jc-flex-end">
                    <button className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85">
                        <span className="xui-mr-half">Sign in</span>
                        <Arrowright width="12" height="12" />
                    </button>
                </div>
                <div className="psc-broken-line-text xui-opacity-4">
                    <span className="xui-font-sz-80 xui-font-w-700">or</span>
                </div>
                <Link to="/sign-in" className="xui-btn-block xui-btn-black xui-font-sz-90 xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-mt-1-half xui-bdr-rad-5">
                    <Wallet width="16" height="16" />
                    <span className="xui-font-sz-90 xui-ml-2">Sign in via token</span>
                </Link>
            </div>
        </div>
        </>
    )
}