import React, { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import styled from "styled-components";
import Axios from "axios";
import { FiThumbsUp } from "react-icons/fi";

function Home() {
	const [uploads, setUploads] = useState([]);

	const likePost = (id, key) => {
		var tempLikes = uploads;
		tempLikes[key].likes = tempLikes[key].likes + 1;

		Axios.post("http://localhost:5000/upload/like", {
			userLiking: localStorage.getItem("username"),
			postId: id,
		}).then((res) => {
			console.log(res);
			setUploads(tempLikes);
			console.log(tempLikes);
		});
	};

	//check if the user first visit the site is logged in
	useEffect(() => {
		if (!localStorage.getItem("loggedIn")) {
			localStorage.setItem("loggedIn", false);
		}
	}, []);

	//
	useEffect(() => {
		Axios.get("http://localhost:5000/upload").then((res) => {
			setUploads(res.data);
		});
	}, []);
	return (
		<Wrapper>
			{uploads.map((val, key) => {
				return (
					<div className="post">
						<div className="image">
							<Image cloudName="junworks" publicId={val.image} />
						</div>
						<div className="content">
							<div className="title">
								<h2>
									{val.title} / by @ {val.author}
								</h2>
							</div>
							<div className="description">
								<h4>{val.description}</h4>
							</div>
							<div className="engagement">
								<FiThumbsUp
									className="thumb"
									onClick={() => {
										likePost(val.id, key);
										//console.log(likes);
									}}
								/>
								{val.likes}
							</div>
						</div>
					</div>
				);
			})}
		</Wrapper>
	);
}

const Wrapper = styled.div`
	/* border: solid red; */
	width: 100%;
	height: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	.post {
		width: 600px;
		height: 500px;
		border: solid black;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin-top: 2rem;

		.image {
			height: 70%;
			width: 100%;
			img {
				width: 100%;
				object-fit: contain;
			}
		}

		.content {
			height: 30%;
			width: 100%;
			display: flex;
			flex-direction: column;
			.title {
				height: 30%;
				width: 100%;
				text-align: center;
			}

			.description {
				height: 50%;
				width: 100%;
				text-align: center;
				/* border: solid blue; */
			}
			.engagement {
				height: 20%;
				/* border: solid red; */
				display: flex;
				justify-content: center;
				/* display: grid; */ /* place-items: center; */
				.thumb {
					font-size: 1.2rem;
				}
				.thumb:hover {
					color: grey;
					cursor: pointer;
				}
			}
		}
	}
`;

export default Home;
