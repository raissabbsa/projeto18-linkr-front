import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BASE_URL } from "../../constants/urls";
import { UserContext } from "../../providers/UserData";

function Hashtags(prop) {
	return (
		<Link to={`/hashtag/${prop.hashtag}`} style={{ textDecoration: "inherit" }}>
			<h2># {prop.hashtag}</h2>
		</Link>
	);
}

export default function Sidebar({ update }) {
	const [hashtags, setHashtags] = useState([]);
	const { userData } = useContext(UserContext);
	const config = { headers: { Authorization: `Bearer ${userData.token}` } };

	useEffect(() => {
		const promise = axios.get(`${BASE_URL}/trending`, config);
		promise
			.then((res) => {
				const trending = res.data;
				setHashtags(trending);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [update, userData.token]);

	return (
		<TrendingContainer display={ (hashtags.length === 0) ? 'none' : 'flex' }>
			<h1>trending</h1>
			<div></div>
			{hashtags.map((value, i) => (
				<Hashtags hashtag={value} key={i} />
			))}
		</TrendingContainer>
	);
}

const TrendingContainer = styled.div`
	background-color: #171717;
	display: ${(props) => props.display};
	flex-direction: column;
	align-items: flex-start;
	min-width: 301px;
	margin-left: 25px;
	margin-top: 232px;
	border-radius: 16px;
	padding-top: 9px;
	padding-bottom: 30px;
	h1 {
		font-family: "Oswald";
		font-size: 27px;
		font-weight: 700;
		color: #ffffff;
		padding-left: 16px;
		padding-right: 16px;
		line-height: 40px;
	}
	div {
		min-width: 100%;
		border-bottom: 1px solid #484848;
		margin-bottom: 22px;
		margin-top: 12px;
	}
	h2 {
		font-size: 19px;
		font-weight: 700;
		color: #ffffff;
		padding-left: 16px;
		padding-right: 16px;
		padding-bottom: 10px;
		line-height: 40px;
		font-family: "Lato";
		line-height: 23px;
		letter-spacing: 0.05em;
	}
	@media (max-width: 1024px) {
		display: none;
	}
`;
