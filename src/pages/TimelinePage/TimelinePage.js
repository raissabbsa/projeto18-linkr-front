import NavBar from "../../components/Navbar/NavBar";
import Publishing from "./Publishing";
import Sidebar from "./Sidebar";
import Posts from "./Posts";
import { BodyContent, TimelineContainer } from "../../assets/style/TimelineStyle.js";
import { useState } from "react";
import TimelineUpdates from "./TimelineUpdates";

export default function TimelinePage() {
	const [update, setUpdate] = useState(0);
	return (
		<>
			<NavBar />
			<BodyContent>
				<TimelineContainer>
					<h1>timeline</h1>
					<Publishing setUpdate={setUpdate} update={update} />
					<TimelineUpdates update={update} setUpdate={setUpdate}/>
					{/* tenho que dar um jeito de pegar os posts, mas por enquanto vou pegar do
					    banco mesmo */}
					<Posts update={update} setUpdate={setUpdate} />
				</TimelineContainer>
				<Sidebar update={update} setUpdate={setUpdate}/>
			</BodyContent>
		</>
	);
}
