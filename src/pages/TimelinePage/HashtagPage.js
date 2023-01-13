import NavBar from "../../components/Navbar/NavBar";
import Sidebar from "./Sidebar";
import { BodyContent, TimelineContainer } from "../../assets/style/TimelineStyle.js";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../providers/UserData";
import { BASE_URL } from "../../constants/urls";
import axios from "axios";
import { useParams } from "react-router-dom";
import { handlePosts } from "./Posts";
import { PostsContainer } from "../../assets/style/PostsStyle.js";
import TimelineUpdates from "./TimelineUpdates";

export default function HashtagPage() {
	const [update, setUpdate] = useState(0);
	const [items, setItems] = useState([]);
	const { hashtag } = useParams();
	const { userData } = useContext(UserContext);
	const [finished, setFinished] = useState(false);

	useEffect(() => {
		const config = { headers: { Authorization: `Bearer ${userData.token}` } };
		const req = axios.get(`${BASE_URL}/hashtag/${hashtag}`, config);
		req.then((res) => {
			setFinished(true);
			setItems(res.data);
		});
		req.catch((error) => {
			console.log(error);
		});
	}, [update, userData.token, hashtag]);

	return (
		<>
			<NavBar />
			<BodyContent>
				<TimelineContainer>
					<h1># {hashtag}</h1>
					<TimelineUpdates update={update} setUpdate={setUpdate}/>
					<PostsContainer>{handlePosts(items, update, setUpdate, finished)}</PostsContainer>
				</TimelineContainer>
				<Sidebar />
			</BodyContent>
		</>
	);
}
