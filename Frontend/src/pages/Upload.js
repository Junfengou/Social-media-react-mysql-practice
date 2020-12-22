import React, { useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import { useHistory } from "react-router-dom";
// import Axios from "axios";

function Upload() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState([]); //allowing the user to select more than just one file to upload
	// console.log(process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

	let history = useHistory();

	const upload = () => {
		const formData = new FormData();
		formData.append("file", image[0]);
		formData.append("upload_preset", "socialmedia"); //make sure that the upload preset on cloudinary is [unsigned]
		Axios.post(
			`https://api.cloudinary.com/v1_1/junworks/image/upload`,
			formData
		).then((response) => {
			const fileName = response.data.public_id;

			Axios.post("http://localhost:5000/upload", {
				title: title,
				description: description,
				image: fileName,
				author: localStorage.getItem("username"),
			}).then(() => {
				history.push("/");
			});
		});
		console.log(`${title} has been successfully uploaded`);
	};
	return (
		<Wrapper>
			<div className="uploadForm">
				<h2>Create post</h2>
				<input
					type="text"
					placeholder="Title"
					onChange={(e) => {
						setTitle(e.target.value);
					}}
				/>
				<input
					type="text"
					placeholder="Description"
					onChange={(e) => {
						setDescription(e.target.value);
					}}
				/>
				<input
					type="file"
					onChange={(e) => {
						setImage(e.target.files);
					}}
				/>
				<button onClick={upload}>Upload</button>
			</div>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	width: 100%;
	height: 750px;

	.uploadForm {
		width: 100%;
		height: 750px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		input,
		button {
			margin: 10px;
			width: 400px;
			height: 40px;
			font-size: 20px;
			text-align: center;
		}

		button:hover {
			cursor: pointer;
		}
	}
`;

export default Upload;

{
	/**
const fileName = response.data.public_id;

			Axios.post("http://localhost:5000/upload", {
				title: title,
				description: description,
				image: fileName,
			});
*/
}
