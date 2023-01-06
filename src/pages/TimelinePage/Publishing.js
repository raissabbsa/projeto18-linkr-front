import axios from "axios";
import { useContext, useState } from "react";
import styled from "styled-components";
import { BASE_URL } from "../../constants/urls";
import { UserContext } from "../../providers/UserData";

export default function Publishing({ setUpdate, update }) {
	const [form, setForm] = useState({ link: "", description: "" });
	const [loading, setLoading] = useState(false);
	const { userData } = useContext(UserContext);

	function fillForm(e) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}
	function publish(e) {
		e.preventDefault();
		setLoading(true);

		let hashtags = verifyHashtag(form.description);

		const config = { headers: { Authorization: `Bearer ${userData.token}` } };
		const promise = axios.post(`${BASE_URL}/posts`, form, config);
		promise.then((res) => {
			setForm({ link: "", description: "" });
			setLoading(false);
			setUpdate(update + 1);

			//atualizar lista de posts
		});
		promise.catch((err) => {
			console.log(err);
			alert("Houve um erro ao publicar seu link");
			setLoading(false);
		});

		if (hashtags.length > 0) {
			publishHashtags(hashtags);
			console.log(hashtags);
		}
	}

	//let hashtags = ["gelatto", "italy", "vegan"];
	//publishHashtags(hashtags);
	function publishHashtags(array) {
		const promise = axios.post(`${BASE_URL}/trending`, array);
		promise
			.then((res) => {
				console.log("okay");
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function verifyHashtag(text) {
		let array = text.split(" ");
		let hashtags = [];
		array.map((item) => {
			if (item[0] === "#") {
				hashtags.push(item.substr(1));
			}
			return "";
		});
		return hashtags;
	}
	return (
		<PublishContainer>
			<img src={userData.picture_url} alt="img" />
			<ShareCotainer>
				<h1>What are you going to share today?</h1>
				<Form onSubmit={publish}>
					<input placeholder="http:// ..." name="link" value={form.link} type="url" onChange={fillForm} disabled={loading ? "disabled" : ""} required />
					<input placeholder="Awesome article about #javascript" name="description" value={form.description} type="text" onChange={fillForm} disabled={loading ? "disabled" : ""} />
					<button type="submit" disabled={loading ? "disabled" : ""}>
						{loading ? "Publishing ..." : "Publish"}
					</button>
				</Form>
			</ShareCotainer>
		</PublishContainer>
	);
}
const PublishContainer = styled.div`
	height: 209px;
	background-color: #ffffff;
	border: none;
	border-radius: 10px;
	width: 611px;
	padding: 20px;
	display: flex;
	gap: 20px;
	margin-bottom: 29px;
	img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		object-fit: cover;
	}
`;

const ShareCotainer = styled.div`
	display: flex;
	flex-direction: column;
  gap: 10px;
	& > h1 {
		font-weight: 300;
		font-size: 20px;
		line-height: 24px;
		color: #707070;
	}
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	input {
		width: 500px;
		height: 40px;
		border: none;
		border-radius: 5px;
		background-color: #efefef;
		margin-bottom: 5px;
		padding: 10px;
		font-size: 14px;
	}
	input:nth-child(2) {
		height: 60px;
	}
	button {
    align-self: flex-end;
		width: 100px;
		height: 35px;
		background-color: #1977f2;
		border: none;
		border-radius: 5px;
		color: #ffffff;
		font-weight: 600;
		padding: 5px;
		cursor: pointer;
	}
`;
