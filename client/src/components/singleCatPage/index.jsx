import React, { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../../api";

import styled from "styled-components";
import { motion } from "framer-motion";

import CatSummary from "../catSummary";
import DecoratedImage from "../decoratedImage";
import CatPortfolio from "../catPortfolio";

const SingleCatPageContainer = styled(motion.div)`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const TopSectionContainer = styled.div`
	width: 100%;

	display: flex;
	justify-content: space-between;

	@media (max-width: 720px) {
		flex-direction: column;
		gap: 2rem;
	}
`;

const BottomSectionContainer = styled.div`
	width: 100%;
	height: 100%;
`;

const BigCatPictureContainer = styled.div`
	min-width: 250px;
	width: 250px;
	height: 250px;
`;

const SingleCatPage = ({ data, name }) => {
	const [photos, setPhotos] = useState([]);

	const incrementSearchCount = async () => {

		const preparedUrl = `${baseUrl}/favourites`;
		await axios
			.post(preparedUrl, {
				breedName: data.name,
				imageUrl: data.image.url
			}).then(response => {
				const receivedData = response.data;
				console.log(receivedData);
			})
			.catch((error) => console.log(error));
	};

	const getOtherPhotos = async () => {
		const breedId = data.id;
		const preparedUrl = `${baseUrl}/images/${breedId}`;
		
		await axios
			.get(preparedUrl).then(response => {
				const receivedData = response.data;
				setPhotos(receivedData);
			})
			.catch((error) => console.log(error));
	};

useEffect(() => {
	getOtherPhotos();
	incrementSearchCount();
}, []);

	return (
		<SingleCatPageContainer
			initial={{ opacity: 0, height: "50%" }}
			animate={{ opacity: 1, height: "50%" }}
			exit={{ opacity: 0, height: "0" }}
		>
			<TopSectionContainer>
				<BigCatPictureContainer>
					<DecoratedImage url={data.image.url} />
				</BigCatPictureContainer>

				<CatSummary data={data} />
			</TopSectionContainer>

			<BottomSectionContainer>
				<CatPortfolio data={photos}/>
			</BottomSectionContainer>
		</SingleCatPageContainer>
	);
};

export default SingleCatPage;
