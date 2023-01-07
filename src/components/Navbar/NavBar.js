import styled from "styled-components";
import { DebounceInput } from "react-debounce-input";
import { BiSearchAlt2 } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../providers/UserData";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../services/api";
import UserSearched from "./UserSearched";

export default function NavBar() {
	const { userData, setUserData, userOptions, setUserOptions } = useContext(UserContext);
	const [search, setSearch] = useState("");
	const [showResults, setShowResults] = useState(false);
	const [results, setResults] = useState([]);
	const navigate = useNavigate();

	function handleLogout() {
		localStorage.removeItem("userData");
		setUserData(undefined);
		setUserOptions(false);
		navigate("/");
	}

	async function handleSearch() {
		try {
			const response = await api.searchUsers(search);
			// setResults(response.data);
		} catch (err) {
			console.log(err);
			setResults([]);
		}
	}

	function searchExist() {
		if (search.length > 3) {
			setShowResults(true);
		}
	}

	useEffect(() => {
		if (search !== "") {
			setShowResults(true);
			handleSearch();
		} else {
			setShowResults(false);
		}
	}, [search]);

	return (
		<NavContainer>
			<StyledLink to="/timeline">linkr</StyledLink>
			<SearchBarContainer>
				<SearchContainer>
					<DebounceInput
						onClick={searchExist}
						placeholder="Search for people"
						minLength={3}
						debounceTimeout={300}
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<BiSearchAlt2 onClick={handleSearch} />
				</SearchContainer>
				<ResultsContainer showResults={showResults}>
					{results.map((user) => (
						<UserSearched user={user} key={user.id} />
					))}
				</ResultsContainer>
				<CloseResultContainer showResults={showResults} onClick={() => setShowResults(false)} />
			</SearchBarContainer>
			<UserOptionsContainer userOptions={userOptions}>
				<FaChevronDown onClick={() => setUserOptions(!userOptions)} />
				<img src={userData.picture_url} alt="Usuário" onClick={() => setUserOptions(!userOptions)} />
				<LogoutContainer userOptions={userOptions}>
					<span>Olá {userData.username}!</span>
					<button onClick={handleLogout}>LogOut</button>
				</LogoutContainer>
			</UserOptionsContainer>
			<CloseMenuContainer userOptions={userOptions} onClick={() => setUserOptions(false)} />
		</NavContainer>
	);
}

const NavContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 3;
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

const SearchBarContainer = styled.div`
	z-index: 2;
	position: relative;
	width: 563px;
`;

const SearchContainer = styled.div`
	width: 100%;
	height: 45px;
	z-index: 2;
	background-color: #ffffff;
	border-radius: 8px;
	padding: 0px 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 10px;
	input {
		flex-grow: 1;
		border: none;
		outline: none;
		height: 100%;
		font-weight: 400;
		font-size: 19px;
		line-height: 23px;
		::placeholder {
			color: #c6c6c6;
		}
	}
	svg {
		font-size: 28px;
		color: #c6c6c6;
	}
`;

const ResultsContainer = styled.div`
	display: ${({ showResults }) => (showResults ? "flex" : "none")};
	flex-direction: column;
	gap: 15px;
	z-index: -1;
	position: absolute;
	top: 0px;
	width: 100%;
	min-height: 100px;
	padding: 60px 15px 15px 15px;
	background: #e7e7e7;
	border-radius: 8px;
`;

const CloseResultContainer = styled.div`
	position: fixed;
	z-index: -2;
	right: 0px;
	top: 0px;
	background-color: none;
	width: 100%;
	height: 100%;
	display: ${(props) => (props.showResults ? "" : "none")};
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

const CloseMenuContainer = styled.div`
	position: fixed;
	z-index: -1;
	right: 0px;
	top: 80px;
	background-color: none;
	width: 100%;
	height: 100%;
	display: ${(props) => (props.userOptions ? "" : "none")};
`;

const LogoutContainer = styled.div`
	position: fixed;
	z-index: 0;
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
