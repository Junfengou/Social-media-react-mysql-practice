import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Axios from "axios";

function Register() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const register = () => {
		// console.log(username);
		Axios.post("http://localhost:5000/user/register", {
			username: username,
			password: password,
		}).then((response) => {
			console.log(response);
		});
	};

	return (
		<Wrapper>
			<div className="registerForm">
				<h2>Registeration</h2>
				<input
					type="text"
					placeholder="username"
					onChange={(e) => {
						setUsername(e.target.value);
					}}
				/>
				<input
					type="password"
					placeholder="password"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				<button onClick={register}>Register</button>
			</div>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	width: 100%;
	height: 750px;

	.registerForm {
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

export default Register;
