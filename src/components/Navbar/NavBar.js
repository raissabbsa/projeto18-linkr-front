import styled, { keyframes } from "styled-components";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../providers/UserData";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NavBar() {
	const { userData, setUserData, userOptions, setUserOptions } = useContext(UserContext);
	const navigate = useNavigate();

	function handleLogout() {
		localStorage.removeItem("userData");
		setUserData(undefined);
		setUserOptions(false);
		navigate("/");
	}

	return (
		<NavContainer>
			<StyledLink to="/timeline">linkr</StyledLink>
			<UserOptionsContainer userOptions={userOptions}>
				<FaChevronDown onClick={() => setUserOptions(!userOptions)} />
				<img src={userData.picture_url} alt="Usuário" />
				<LogoutContainer userOptions={userOptions}>
					<span>Olá {userData.username}!</span>
					<button onClick={handleLogout}>LogOut</button>
				</LogoutContainer>
			</UserOptionsContainer>
		</NavContainer>
	);
}

const NavContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 2;
	width: 100%;
	height: 80px;
	background: #151515;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 20px;
	img {
		height: 53px;
		width: 53px;
		object-fit: cover;
		border-radius: 50%;
	}
`;

const StyledLink = styled(Link)`
	font-family: "Passion One";
	font-weight: 700;
	font-size: 49px;
	line-height: 54px;
	letter-spacing: 0.05em;
	color: #ffffff;
	text-decoration: none;
`;

const UserOptionsContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 15px;
	color: #ffffff;
	svg {
		font-size: 28px;
		transition: transform 0.5s;
		transform: ${(props) => (props.userOptions ? "rotate(180deg)" : "rotate(0deg)")};
	}
`;

const LogoutContainer = styled.div`
	position: fixed;
	z-index: -1;
	right: 0px;
	top: ${(props) => (props.userOptions ? "70px" : "-130px")};
	width: 150px;
	height: 130px;
	transition: top 0.5s;
	padding: 20px 10px;
	border-end-start-radius: 25px;
	background-color: #151515;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 25px;
	span {
		font-weight: 600;
		font-size: 20px;
		line-height: 20px;
		letter-spacing: 0.05em;
		text-align: center;
		color: #ffffff;
	}
	button {
		font-weight: 700;
		font-size: 22px;
		line-height: 20px;
		letter-spacing: 0.05em;
		background: none;
		border: none;
		cursor: pointer;
		color: #ffffff;
	}
`;
