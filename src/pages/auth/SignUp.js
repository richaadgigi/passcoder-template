import { usePartnerSignUp } from '../../hooks/useAuth';
import Loading from "../../icons/Loading";
import SuccessTick from "../../assets/images/success-tick.png";
import Arrowright from "../../icons/Arrowright";

export default function SignUp(){
	const {
		city, country, description, email, errorPartnerSignup, errorVerificationEmail, handleCity, handleCountry, handleDescription, 
		handleEmail, handleName, handleState, handleSubmit, handleTermsAndConditions, handleVerificationEmailResend, loading, cities, 
		loadingResend, name, showVerificationEmail, state, successPartnerSignup, successVerificationEmail, terms_and_conditions
	} = usePartnerSignUp();

    return(
        <>
			<div className="xui-max-w-800 xui-w-fluid-100 xui-mt-2 xui-md-mt-none">
				{
					!showVerificationEmail ? 
					<div className="xui-bg-white xui-bdr-rad-half xui-w-fluid-100 xui-p-1-half xui-pb-3 xui-text-black">
						<h2 className="xui-font-sz-125 xui-w-fluid-80">Sign up for Passcoder Partner</h2>
						<p className="xui-font-sz-80 xui-my-1"><span className="xui-opacity-7">Already have an account?</span> <span className="xui-font-w-bold psc-text xui-text-dc-none">Use your private access url</span></p>
						<form className="xui-form" layout="2" onSubmit={handleSubmit}>
							<div className="xui-d-grid xui-grid-col-1 xui-lg-grid-col-2 xui-md-grid-col-2 xui-grid-gap-1">
								<div className="xui-form-box xui-mt-1">
									<input className="xui-font-sz-90" type="text" value={name} onChange={handleName} required placeholder="Partner Name"></input>
								</div>
								<div className="xui-form-box xui-mt-1">
									<input className="xui-font-sz-90" type="email" value={email} onChange={handleEmail} required placeholder="Email"></input>
								</div>
							</div>
							<div className="xui-d-grid xui-grid-col-1 xui-lg-grid-col-3 xui-md-grid-col-3 xui-grid-gap-1">
								<div className="xui-form-box xui-mt-1">
									<select onChange={handleCountry} value={country} required>
										<option selected disabled>Select Country</option>
										<option value={"Nigeria"}>Nigeria</option>
									</select>
								</div>
								<div className="xui-form-box xui-mt-1">
									<select onChange={handleState} value={state} required>
										<option selected disabled>Select State</option>
										<option value={"Abia"}>Abia</option>
										<option value={"Adamawa"}>Adamawa</option>
										<option value={"Akwa Ibom"}>Akwa Ibom</option>
										<option value={"Anambra"}>Anambra</option>
										<option value={"Bauchi"}>Bauchi</option>
										<option value={"Bayelsa"}>Bayelsa</option>
										<option value={"Benue"}>Benue</option>
										<option value={"Borno"}>Borno</option>
										<option value={"Cross River"}>Cross River</option>
										<option value={"Delta"}>Delta</option>
										<option value={"Ebonyi"}>Ebonyi</option>
										<option value={"Edo"}>Edo</option>
										<option value={"Ekiti"}>Ekiti</option>
										<option value={"Enugu"}>Enugu</option>
										<option value={"Abuja"}>Federal Capital Territory</option>
										<option value={"Gombe"}>Gombe</option>
										<option value={"Imo"}>Imo</option>
										<option value={"Jigawa"}>Jigawa</option>
										<option value={"Kaduna"}>Kaduna</option>
										<option value={"Kano"}>Kano</option>
										<option value={"Katsina"}>Katsina</option>
										<option value={"Kebbi"}>Kebbi</option>
										<option value={"Kogi"}>Kogi</option>
										<option value={"Kwara"}>Kwara</option>
										<option value={"Lagos"}>Lagos</option>
										<option value={"Nasarawa"}>Nasarawa</option>
										<option value={"Niger"}>Niger</option>
										<option value={"Ogun"}>Ogun</option>
										<option value={"Ondo"}>Ondo</option>
										<option value={"Osun"}>Osun</option>
										<option value={"Oyo"}>Oyo</option>
										<option value={"Plateau"}>Plateau</option>
										<option value={"Rivers"}>Rivers</option>
										<option value={"Sokoto"}>Sokoto</option>
										<option value={"Taraba"}>Taraba</option>
										<option value={"Yobe"}>Yobe</option>
										<option value={"Zamfara"}>Zamfara</option>
									</select>
								</div>
								<div className="xui-form-box xui-mt-1">
									<select onChange={handleCity} value={city} required>
										<option selected disabled>Select City</option>
										{
											cities.map((item, index) => {
												return (
													<option key={index} value={item}>{item}</option>
												)
											})
										}
									</select>
								</div>
							</div>
							<div className="xui-form-box xui-mt-1">
								<textarea className="xui-font-sz-90" value={description} onChange={handleDescription} required cols={20} rows={20} placeholder="Description"></textarea>
							</div>
							<p className="xui-font-sz-80 xui-my-1 xui-text-center">
								<div className="xui-d-inline-flex xui-flex-ai-center">
									<input type="checkbox" onChange={handleTermsAndConditions} checked={terms_and_conditions} id="terms_and_conditions" />
									<label for="terms_and_conditions" className="xui-ml-half" style={{ marginBottom: '0' }}>By signing up you agree to our <a href="https://passcoder.io/terms">terms and conditions</a> </label>
								</div>
							</p>
							<div className="xui-form-box xui-d-flex xui-flex-jc-flex-end">
								<button className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85">
									<span className="xui-mr-half">Get access</span>
									{
										loading ?
											<Loading width="12" height="12" />
											: <Arrowright width="12" height="12" />
									}
								</button>
							</div>
						</form>
						<p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorPartnerSignup}</span></p>
						<p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-green"><span className="xui-font-w-bold psc-text-red">{successPartnerSignup}</span></p>
					</div> : 
					<div className="xui-bg-white xui-bdr-rad-half xui-w-fluid-100 xui-p-1-half xui-pb-3 xui-text-black">
						<div className="xui-my-3">
							<img src={SuccessTick} className="xui-img-100 xui-mx-auto" alt="success-tick" />
							<h2 className="xui-font-sz-125 xui-w-fluid-80 xui-mx-auto xui-text-center xui-mt-1-half">Verification email sent</h2>
							<p className="xui-font-sz-90 xui-w-fluid-80 xui-mx-auto xui-text-center xui-mt-1-half">We have sent an email with a verification link to {email}.</p>
						</div>
						<p className="xui-font-sz-90 xui-my-3 xui-text-center xui-opacity-7"><span className="xui-opacity-7">Didn't receive the email? Check spam or promotion folder.</span></p>

						<div className="xui-mt-3 xui-d-flex xui-flex-jc-flex-end">
								<button className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85" onClick={handleVerificationEmailResend}>
								<span className="xui-mr-half">{loadingResend ? "Resending" : "Resend Link"}</span>
								{
									loadingResend ?
										<Loading width="12" height="12" />
										: <Arrowright width="12" height="12" />
								}
							</button>
						</div>
						<p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorVerificationEmail}</span></p>
						<p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-green"><span className="xui-font-w-bold psc-text-red">{successVerificationEmail}</span></p>
					</div>
				}
			</div>
        </>
    )
}