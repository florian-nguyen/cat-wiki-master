import React from "react";
import logo from "../../resources/CatwikiLogoWhite.svg";

import styled from "styled-components";

const StyledFooter = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	background-color: black;
	border-radius: 42px 42px 0 0;
	margin-top: 2rem;
`;

const LogoContainer = styled.a`
	display: flex;
	flex-direction: column;
	width: 120px;
	padding-left: 5%;
`;

const Copyright = styled.div`
	color: white;
	font-size: 0.8rem;
	padding: 0 1rem;

	& a {
		color: white;
		text-decoration: none;
		font-weight: 700;
	}
`;

const Footer = () => {
	return (
		<footer>
			<StyledFooter>
				<LogoContainer href="/" title="Go back to homepage">
					<img src={logo} alt="logo cat wiki" className="filter-white" />
				</LogoContainer>
				<Copyright>
					&copy; Coded by{" "}
					<a href="https://github.com/florian-nguyen">Florian NGUYEN</a> -
					Challenge by devChallenges.io 2021
				</Copyright>
			</StyledFooter>
		</footer>
	);
};

export default Footer;
