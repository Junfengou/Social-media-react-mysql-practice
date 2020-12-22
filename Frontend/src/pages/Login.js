import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import styled from "styled-components";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");

	let history = useHistory();

	const login = () => {
		Axios.post("http://localhost:5000/user/login", {
			username: username,
			password: password,
		}).then((response) => {
			// console.log(response);
			//loggedIn is set to true when the user is logged in, you can find it in the backend
			if (response.data.loggedIn) {
				localStorage.setItem("loggedIn", true);
				localStorage.setItem("username", response.data.username);
				history.push("/");
			} else {
				setErrorMsg(response.data.message);
			}
		});
	};

	return (
		<Wrapper>
			<div className="loginForm">
				<h2>Login</h2>
				<input
					type="text"
					placeholder="username"
					onChange={(e) => {
						setUsername(e.target.value);
					}}
				/>
				<input
					type="text"
					placeholder="password"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				<button onClick={login}>Login</button>
				{errorMsg}
			</div>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	width: 100%;
	height: 750px;

	.loginForm {
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

export default Login;
