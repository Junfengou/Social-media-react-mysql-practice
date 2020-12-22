import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Navbar() {
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		setLoggedIn(localStorage.getItem("loggedIn"));
	}, [localStorage.getItem("loggedIn")]);

	return (
		<Wrapper>
			<Link to="/">Home</Link>
			{/* <Link to="/login">Login</Link>
			<Link to="/register">Register</Link> */}

			{loggedIn ? (
				<>
					<Link to="/profile">Profile</Link>
					<Link to="/upload">upload</Link>
				</>
			) : (
				<>
					<Link to="/login">Login</Link>
					<Link to="/register">Register</Link>
				</>
			)}
		</Wrapper>
	);
}

const Wrapper = styled.div`
	width: 100%;
	height: 80px;
	/* height: 30vh; */
	background-color: var(--lightBlue);
	margin-top: 0;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	color: white;

	a {
		font-size: 20px;
		margin: 10px;
		font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
			"Lucida Sans", Arial, sans-serif;
		text-decoration: none;
		color: white;
	}
	a:hover {
		cursor: pointer;
	}
`;

export default Navbar;
