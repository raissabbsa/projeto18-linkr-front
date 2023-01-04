import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import api from "../../services/api";

export default function RegistrationPage() {
	const [registerForm, setResgisterForm] = useState({ email: "", password: "", username: "", picture_url: "" });
	const [disabled, setDisabled] = useState(false);
	const navigate = useNavigate();
	const loader = <ThreeDots type="Puff" color="#FFFFFF" height={23} width={46} timeout={2000} />;

	function register(e) {
		e.preventDefault();

		setDisabled(true);

		api
			.register(registerForm)
			.then((res) => {
				toast.success(`Cadastro criado com sucesso!`, {
					position: "top-center",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
					progress: undefined,
					theme: "dark",
				});
				navigate("/");
			})
			.catch((err) => {
				if (err.response.status === 409) {
					toast.error("Email ou usuário já cadastrado!", {
						position: "top-center",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "dark",
					});
				} else {
					toast.error("Erro ao cadastrar, tente novamente!", {
						position: "top-center",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "dark",
					});
				}
				setDisabled(false);
			});
	}

	function changeFormData(e) {
		const { name, value } = e.target;
		setResgisterForm({ ...registerForm, [name]: value });
	}

	function goToSignUp() {
		navigate("/");
	}

	return (
		<RegistrationPageScreen>
			<RegistrationPageTitle>
				<TitleContainer>
					<h1>Linkr</h1>
					<p>save, share and discover the best links on the web</p>
				</TitleContainer>
			</RegistrationPageTitle>
			<RegistrationPageContainer>
				<FormContainer>
					<Form onSubmit={register}>
						<input required disabled={disabled} name="email" value={registerForm.email} type="email" placeholder="E-mail" onChange={changeFormData} />

						<input required disabled={disabled} name="password" value={registerForm.password} type="password" placeholder="Password" onChange={changeFormData} />

						<input required disabled={disabled} name="username" value={registerForm.username} type="text" placeholder="Username" onChange={changeFormData} />

						<input required disabled={disabled} name="picture_url" value={registerForm.picture_url} type="url" placeholder="Picture URL" onChange={changeFormData} />

						<ButtonItem disabled={disabled} type="submit">
							{disabled ? loader : "Sign Up"}
						</ButtonItem>
					</Form>
					<button disabled={disabled} onClick={goToSignUp}>
						First time? Create an account!
					</button>
				</FormContainer>
			</RegistrationPageContainer>
		</RegistrationPageScreen>
	);
}

const RegistrationPageScreen = styled.div`
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #151515;
`;

const RegistrationPageTitle = styled.div`
	height: 100vh;
	width: 100%;
	min-width: 626px;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding: 144px;
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
`;

const RegistrationPageContainer = styled.div`
	min-width: 535px;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #333333;
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
`;

const ButtonItem = styled.button`
	width: 100%;
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
`;
