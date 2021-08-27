import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { BsArrowRight } from "react-icons/bs";
import { motion } from "framer-motion";

import bgImgLg from "../../resources/HeroImagelg.png";

import SearchBar from "../searchBar";
import HomeBreedPortfolio from "../homeBreedPortfolio";

import image1 from "../../resources/image1.png";
import image2 from "../../resources/image2.png";
import image3 from "../../resources/image3.png";
import baseUrl from "../../api";
import { useHistory } from "react-router-dom";

const StyledHomepage = styled(motion.div)`
	position: relative;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: stretch;
	flex: 1;
`;

const TopSection = styled.div`
	display: flex;
	flex-direction: column;
	flex: 2;
	width: 100%;
`;

const BottomSection = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
	flex-wrap: wrap;
`;
const TopSectionHeader = styled.div`
	height: 250px;
	background-image: url(${bgImgLg});
	background-position: center;
	background-size: cover;

	color: white;
	z-index: 1;

	& p  {
		margin-top: 0.5rem;
		margin-bottom: 1.5rem;
		font-size: 0.8rem;
		font-weight: 500;
		line-height: 1.2rem;
	}
`;

const HomeBreedPortfolioContainer = styled.div`
	background-color: #e3e1dc;
	border-radius: 0 0 20px 20px;

	z-index: 0;
`;

const SearchBarContainer = styled.div`
	width: 48%;
	padding: 2rem 4rem;
`;

const LeftSection = styled.div`
	display: flex;
	flex-direction: column;
	width: 48%;
	min-width: 350px;

	margin-top: 100px;

	& h1 {
		color: #291507;
		margin: 0;
	}

	& p  {
		color: #291507;
		font-weight: 500;
		line-height: 1.4rem;
	}

	& button {
		outline: none;
		border: none;
		text-transform: uppercase;
		font-weight: 700;

		color: rgba(41, 21, 7, 0.6);
		background-color: transparent;
		margin: 2rem auto 0 0;

		display: flex;
		gap: 1rem;
		align-items: center;

		cursor: pointer;
		transition: all 0.3s ease-in-out;
		border-radius: 5px;
		padding: 1rem;

		&:hover {
			border: rgba(41, 21, 7, 0.6);
			color: white;
			background-color: rgba(41, 21, 7, 0.6);
		}
	}
`;
const RightSection = styled.div`
	display: flex;
	width: 45%;
	min-width: 350px;
`;

const Separator = styled.div`
	height: 4px;
	width: 50px;
	background-color: #4d270c;
	border-radius: 2px;
	margin-bottom: 1rem;
`;

const ImageGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 1rem;
	flex-direction: column;
	width: 100%;
	padding-top: 2rem;

	& > img {
		width: 100%;
		/* height: 100%; */
	}

	& #image1 {
		grid-column: 1;
		grid-row: 2 / span 2;
	}

	& #image2 {
		grid-column: 1;
		grid-row: 1;
	}

	& #image3 {
		grid-column: 2;
		grid-row: 1 / span 2;
	}
`;

const HomePage = ({ data }) => {
	const [favourites, setFavourites] = useState([]);
	const history = useHistory();

	const handleClickOnReadMore = async () => {
		history.push("/favourites");
	};

	const getAllFavourites = async () => {
		const preparedUrl = encodeURI(`${baseUrl}/favourites`);
		await axios
			.get(preparedUrl)
			.then((response) => {
				setFavourites(response.data);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		// Refresh when breed data has been fetched in parent component

		getAllFavourites();
	}, [data]);

	return (
		<StyledHomepage
			initial={{ opacity: 0, height: "50%" }}
			animate={{ opacity: 1, height: "50%" }}
			exit={{ opacity: 0, height: "0" }}
		>
			<TopSection>
				<TopSectionHeader>
					<SearchBarContainer>
						{data && <SearchBar data={data} />}
					</SearchBarContainer>
				</TopSectionHeader>

				<HomeBreedPortfolioContainer>
					{<HomeBreedPortfolio data={favourites} />}
				</HomeBreedPortfolioContainer>
			</TopSection>

			<BottomSection>
				<LeftSection>
					<Separator />
					<h1>Why should you have a cat?</h1>
					<p>
						Having a cat around you can actually trigger the release of calming
						chemicals in your body which lower your stress and anxiety leves
					</p>

					<button onClick={handleClickOnReadMore}>
						Read more
						<BsArrowRight />
					</button>
				</LeftSection>

				<RightSection>
					<ImageGrid>
						<img id="image1" src={image1} alt="" />
						<img id="image2" src={image2} alt="" />
						<img id="image3" src={image3} alt="" />
					</ImageGrid>
				</RightSection>
			</BottomSection>
		</StyledHomepage>
	);
};

export default HomePage;
