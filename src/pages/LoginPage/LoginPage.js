import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../providers/UserData";
import api from "../../services/api";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import styled from "styled-components";

export default function LoginPage() {
	const { userData, setUserData } = useContext(UserContext);
	const [loginForm, setLoginForm] = useState({ email: "", password: "" });
	const [disabled, setDisabled] = useState(false);
	const navigate = useNavigate();
	const loader = <ThreeDots type="Puff" color="#FFFFFF" height={23} width={46} timeout={2000} />;

	useEffect(() => {
		if (userData) {
			navigate("/timeline");
		} else {
			setUserData(undefined);
		}
	}, []);

	function login(e) {
		e.preventDefault();

		setDisabled(true);

		api
			.login(loginForm)
			.then((res) => {
				localStorage.setItem("userData", JSON.stringify(res.data));
				setUserData(res.data);
				navigate("/timeline");
			})
			.catch((err) => {
				toast.error("Erro ao fazer login, confira os dados e tente novamente!", {
					position: "top-center",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
				});
				setDisabled(false);
			});
	}

	function changeFormData(e) {
		const { name, value } = e.target;
		setLoginForm({ ...loginForm, [name]: value });
	}

	function goToSignUp() {
		navigate("/sign-up");
	}

	return (
		<LoginPageScreen>
			<LoginPageTitle>
				<TitleContainer>
					<h1>linkr</h1>
					<p>save, share and discover the best links on the web</p>
				</TitleContainer>
			</LoginPageTitle>
			<LoginPageContainer>
				<FormContainer>
					<Form onSubmit={login}>
						<input required disabled={disabled} name="email" value={loginForm.email} type="email" placeholder="E-mail" onChange={changeFormData} />

						<input required disabled={disabled} name="password" value={loginForm.password} type="password" placeholder="Password" onChange={changeFormData} />

						<ButtonItem disabled={disabled} type="submit">
							{disabled ? loader : "Log In"}
						</ButtonItem>
					</Form>
					<button disabled={disabled} onClick={goToSignUp}>
						First time? Create an account!
					</button>
				</FormContainer>
			</LoginPageContainer>
		</LoginPageScreen>
	);
}

const LoginPageScreen = styled.div`
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #151515;
	@media (max-width: 1170px) {
		width: 100vw;
		flex-direction: column;
	}
`;

const LoginPageTitle = styled.div`
	height: 100vh;
	width: 100%;
	min-width: 626px;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding: 144px;
	@media (max-width: 1170px) {
		height: auto;
		justify-content: center;
		padding: 0px;
	}
`;

const TitleContainer = styled.div`
	width: 442px;
	h1 {
		font-family: "Passion One";
		font-weight: 700;
		font-size: 106px;
		line-height: 117px;
		letter-spacing: 0.05em;
		color: #ffffff;
	}
	p {
		font-family: "Oswald";
		font-weight: 700;
		font-size: 43px;
		line-height: 64px;
		color: #ffffff;
	}
	@media (max-width: 1170px) {
		width: 237px;
		padding: 30px 0px;
		h1 {
			font-size: 76px;
			line-height: 84px;
			text-align: center;
		}
		p {
			font-size: 23px;
			line-height: 34px;
			text-align: center;
		}
	}
`;

const LoginPageContainer = styled.div`
	min-width: 535px;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #333333;
	@media (max-width: 1170px) {
		height: auto;
		flex-grow: 1;
		align-items: flex-start;
	}
`;

const FormContainer = styled.div`
	width: 429px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 20px;
	> button {
		border: none;
		background-color: transparent;
		font-size: 20px;
		line-height: 24px;
		color: #ffffff;
		text-decoration: underline;
		cursor: pointer;
	}
	@media (max-width: 1170px) {
		width: 330px;
		margin-top: 40px;
		gap: 15px;
		> button {
			font-size: 17px;
			line-height: 20px;
		}
	}
`;

const Form = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 15px;
	input {
		background-color: #ffffff;
		padding: 12px 17px;
		outline: none;
		border: none;
		border-radius: 6px;
		font-family: "Oswald";
		font-weight: 700;
		font-size: 27px;
		line-height: 40px;
	}
	@media (max-width: 1170px) {
		gap: 10px;
		input {
			font-size: 22px;
			line-height: 33px;
		}
	}
`;

const ButtonItem = styled.button`
	width: 100%;
	height: 64px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	font-family: "Oswald";
	font-weight: 700;
	font-size: 27px;
	padding: 10px;
	line-height: 40px;
	border: none;
	border-radius: 6px;
	color: #ffffff;
	background-color: #1877f2;
	cursor: pointer;
	@media (max-width: 1170px) {
		height: 55px;
		font-size: 22px;
		line-height: 33px;
	}
`;
