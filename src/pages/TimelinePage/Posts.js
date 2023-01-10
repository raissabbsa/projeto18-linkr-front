import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { BASE_URL } from "../../constants/urls";
import { UserContext } from "../../providers/UserData";
import SinglePost from "./SinglePost";
import { PostsContainer, Loader } from "../../assets/style/PostsStyle.js";

export function handlePosts(posts, update, setUpdate, finished) {
	if (finished && posts.length > 0) {
		return (
			<>
				{posts.map((post, index) => (
					<span key={index}>
						<SinglePost post={post} update={update} setUpdate={setUpdate} />
					</span>
				))}
			</>
		);
	} else if (finished && posts.length === 0) {
		return <p>There are no posts yet</p>;
	} else {
		return (
			<Loader>
				<p>Loading </p>
				<ThreeDots type="Puff" color="#FFFFFF" height={20} width={40} timeout={2000} />
			</Loader>
		);
	}
}

export default function Posts({ update, setUpdate }) {
	const [posts, setPosts] = useState([]);
	const [finished, setFinished] = useState(false);
	const { userData } = useContext(UserContext);

	useEffect(() => {
		const config = { headers: { Authorization: `Bearer ${userData.token}` } };
		const promise = axios.get(`${BASE_URL}/posts`, config);
		promise.then((res) => {
			setFinished(true);
			setPosts(res.data);
		});
		promise.catch((err) => {
			alert("An error occured while trying to fetch the posts, please refresh the page");
			console.log(err);
		});
	}, [update, userData.token]);

	return <PostsContainer>{handlePosts(posts, update, setUpdate, finished)}</PostsContainer>;
}
