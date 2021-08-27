import React from "react";

import logo from "../../resources/CatwikiLogo.svg";

import styled from "styled-components";

const StyledHeader = styled.div`
	margin: 0;
	padding: 1rem;
`;

const LogoContainer = styled.a`
	display: flex;
	flex-direction: column;
	width: 120px;
`;

const Header = () => {
	return (
		<header>
			<StyledHeader>
				<LogoContainer href="/" title="Go back to homepage">
					<img src={logo} alt="logo cat wiki" />
				</LogoContainer>
			</StyledHeader>
		</header>
	);
};

export default Header;
