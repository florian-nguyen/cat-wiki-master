import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import axios from "axios";
import baseUrl from "../../api";
import DecoratedImage from "../decoratedImage";

const TopTenPageContainer = styled(motion.div)`
	color: #291507;
`;

const Title = styled.h1`
	margin-top: 0;
	font-size: 1.8rem;
	padding-bottom: 2rem;
`;

const CardContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 3rem;
	width: 100%;
	height: 100%;
`;

const Card = styled.div`
	display: flex;
	justify-content: center;
	gap: 2rem;
	width: 100%;
`;

const CardLeftSection = styled.div`
	height: 200px;
	width: 200px;

	cursor: pointer;
`;

const CardRightSection = styled.div`
	width: 70%;
`;

const CardText = styled.p`
	max-width: 100%;
	text-align: justify;
`;

const TopTenPage = ({ data }) => {

	const [favourites, setFavourites] = useState([]);
	const history = useHistory();

	const getAllFavourites = async () => {
		const preparedUrl = encodeURI(`${baseUrl}/favourites`);
		await axios
			.get(preparedUrl)
			.then((response) => {
				setFavourites(response.data);
				console.log(response.data);
			})
			.catch((error) => console.log(error));
	};

	const redirectToCatPage = async (name) => {
		history.push("/breed/" + name.toLowerCase());
	};

	useEffect(() => {
		getAllFavourites();
	}, []);

	return (
		<TopTenPageContainer
			initial={{ opacity: 0, height: "50%" }}
			animate={{ opacity: 1, height: "50%" }}
			exit={{ opacity: 0, height: "0" }}
		>
			<Title>Top 10 most searched breeds</Title>

			<CardContainer>
				{favourites &&
					favourites.map((favourite, index) => {
						console.log(favourite);
						return (
							<Card>
								<CardLeftSection
									onClick={() => redirectToCatPage(favourite.name)}
								>
									<DecoratedImage disabled url={favourite.image_url} />
								</CardLeftSection>

								<CardRightSection>
									<Title>{1 + index + ". " + favourite.name}</Title>
									<CardText>
										{data &&
											data.find((breed) => breed.name === favourite.name)
												.description}
									</CardText>
								</CardRightSection>
							</Card>
						);
					})}
			</CardContainer>
		</TopTenPageContainer>
	);
};

export default TopTenPage;
