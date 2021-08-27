import React from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";

import DecoratedImage from "../decoratedImage";

const Container = styled.div`
	display: flex;
	height: 100%;
	flex-direction: column;
	gap: 1rem;
	padding: 1rem 4rem;
`;

const Header = styled.div`
	padding-bottom: 0.75rem;

	font-weight: 500;
	font-size: 1rem;
	color: #291507;
`;

const Separator = styled.div`
	width: 50px;
	height: 4px;
	margin-top: 0.75rem;
	background-color: #4d270c;
	border-radius: 2px;
`;

const Headline = styled.div`
	color: #291507;
	font-size: 2rem;
	font-weight: 600;
`;

const Portfolio = styled.div`
	position: relative;
	display: flex;
	flex-wrap: wrap;
	gap: 2rem;
	justify-content: space-evenly;

	width: 100%;

	margin-bottom: 2rem;
`;

const PortfolioItem = styled.div`
	border-radius: 24px;
	box-shadow: 1px 3px 5px 2px rgba(0, 0, 0, 0.2);

	width: 180px;
	height: 180px;

	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;

	cursor: pointer;
	opacity: 1;
	transition: all 0.3s ease-in-out;

	&:hover {
		opacity: 0.8;
	}
`;

const Title = styled.p`
	width: 100%;
	text-align: center;
	margin-top: 0.5rem;
	font-weight: 600;
	color: #291507;
`;

const HomeBreedPortfolio = ({ data }) => {
	const history = useHistory();

	const redirectToCatPage = async (name) => {
		history.push("/breed/" + name.toLowerCase());
	};

	return (
		<Container>
			<Header>
				Most Searched Breeds
				<Separator />
			</Header>

			<Headline>66+ Breeds For you to discover</Headline>

			<Portfolio>
				{data.slice(0, 4).map((item, index) => {
					console.log(item)
					if (index === 0) {
						return (
							<PortfolioItem
								key={index}
								onClick={() => redirectToCatPage(item.name)}>
								<DecoratedImage url={item.image_url} />
								<Title>{item.name}</Title>
							</PortfolioItem>
						);
					} else {
						return (
							<PortfolioItem
								key={index}
								onClick={() => redirectToCatPage(item.name)}>
								<DecoratedImage url={item.image_url} disabled />
								<Title>{item.name}</Title>
							</PortfolioItem>
						);
					}
				})}
			</Portfolio>
		</Container>
	);
};

export default HomeBreedPortfolio;
