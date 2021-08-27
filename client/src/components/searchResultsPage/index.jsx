import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";

import DecoratedImage from "../decoratedImage";

const SearchResultsPageContainer = styled(motion.div)``;

const NoResultsContainer = styled.div``;

const CardsContainer = styled.div`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
    gap: 2rem;
`;

const Title = styled.h1`

`;

const CatCardContainer = styled.div`
	display: flex;
	height: 180px;
	width: 300px;
	box-shadow: 1px 2px 5px 2px rgba(0, 0, 0, 0.2);
	background-color: #54443930;
	padding: 2rem;
	padding-bottom: 0;
	border-radius: 8px;

    cursor: pointer;
`;

const LeftSection = styled.div`
    position: relative;
	height: 100%;
	width: 100%;
`;

const RightSection = styled.div`
	height: 100%;
	width: 100%;
    text-align: right;
    font-weight: 600;

`;

const SearchResultsPage = ({ data, search }) => {

	const history = useHistory();

	return (
		<SearchResultsPageContainer
			initial={{ opacity: 0, height: "50%" }}
			animate={{ opacity: 1, height: "50%" }}
			exit={{ opacity: 0, height: "0" }}
		>
			<Title>Results for: {search}</Title>
			{data && data.length === 0 && (
				<NoResultsContainer>
					<Title>
						Sorry, we didn't find any cat breed matching your search... Please
						try again.
					</Title>
				</NoResultsContainer>
			)}

			{data && data.length !== 0 && (
				<CardsContainer>
					{data.map((breed) => (
						<CatCardContainer
							onClick={(e) => { history.push(`/breed/${breed.name}`); }} >
							<LeftSection>
								<DecoratedImage url={breed.image && breed.image.url} />
							</LeftSection>
							<RightSection>{breed.name}</RightSection>
						</CatCardContainer>
					))}
				</CardsContainer>
			)}
		</SearchResultsPageContainer>
	);
};

export default SearchResultsPage;
