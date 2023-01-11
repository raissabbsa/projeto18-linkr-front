import NavBar from "../../components/Navbar/NavBar";
import Sidebar from "./Sidebar";
import { BodyContent, TimelineContainer } from "../../assets/style/TimelineStyle.js";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../providers/UserData";
import { BASE_URL } from "../../constants/urls";
import axios from "axios";
import { useParams } from "react-router-dom";
import { handlePosts } from "./Posts";
import { PostsContainer, Loader } from "../../assets/style/PostsStyle.js";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import api from "../../services/api";

export default function UserPage() {
	const [update, setUpdate] = useState(0);
	const [items, setItems] = useState([]);
	const [following, setFollowing] = useState(false);
	const { id } = useParams();
	const { userData } = useContext(UserContext);
	const [finished, setFinished] = useState(false);
	const [disabled, setDisabled] = useState(false);

	useEffect(() => {
		const config = { headers: { Authorization: `Bearer ${userData.token}` } };
		const req = axios.get(`${BASE_URL}/user/${id}`, config);
		req.then((res) => {
			setFinished(true);
			setItems(res.data);
		});
		req.catch((error) => {
			console.log(error);
		});
		const req2 = axios.get(`${BASE_URL}/user/${id}/status`, config);
		req2.then((res) => {
			if (res.data.length > 0) {
				setFollowing(true);
			}
		});
		req2.catch((error) => {
			console.log(error);
		});
	}, [update, userData.token, id]);

	function follow() {
		setDisabled(true);

		api
			.follow(id, userData.token)
			.then((res) => {
				setFollowing(true);
				setDisabled(false);
				setUpdate(update + 1);
			})
			.catch((error) => {
				alert("Error, try again");
				setDisabled(false);
			});
	}

	function unfollow() {
		setDisabled(true);

		api
			.unfollow(id, userData.token)
			.then((res) => {
				setFollowing(false);
				setDisabled(false);
				setUpdate(update + 1);
			})
			.catch((error) => {
				alert("Error, try again");
				setDisabled(false);
			});
	}

	if (finished && items.length === 0) {
		return (
			<PostsContainer>
				<p>There are no posts yet</p>;
			</PostsContainer>
		);
	} else if (finished && items.length > 0) {
		return (
			<>
				<NavBar />
				<BodyContent>
					<TimelineContainer>
						<TitlePageContent following={following}>
							<div>
								<img src={items[0].picture_user} alt="img" />
								<h1>{items[0].username}'s posts</h1>
							</div>
							{userData.id === Number(id) ? (
								""
							) : following ? (
								<button disabled={disabled} onClick={unfollow}>
									Unfollow
								</button>
							) : (
								<button disabled={disabled} onClick={follow}>
									Follow
								</button>
							)}
						</TitlePageContent>
						<PostsContainer>{handlePosts(items, update, setUpdate, finished)}</PostsContainer>
					</TimelineContainer>
					<Sidebar />
				</BodyContent>
			</>
		);
	} else {
		return (
			<Loader>
				<p>Loading </p>
				<ThreeDots type="Puff" color="#FFFFFF" height={20} width={40} timeout={2000} />
			</Loader>
		);
	}
}

const TitlePageContent = styled.div`
	width: 100%;
	padding: 0px 20px;
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	margin-bottom: 43px;
	h1 {
		font-size: 43px;
		font-weight: 700;
		font-family: "Oswald";
		color: #ffffff;
	}
	img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		object-fit: cover;
	}
	div {
		display: flex;
		align-items: center;
		gap: 30px;
	}
	button {
		width: 112px;
		padding: 8px 0px;
		background: ${(props) => (props.following ? "#1877F2" : "#FFFFFF")};
		color: ${(props) => (props.following ? "#FFFFFF" : "#1877F2")};
		font-weight: 700;
		font-size: 14px;
		line-height: 17px;
		border-radius: 5px;
		border: none;
		cursor: pointer;
	}
`;
