import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import styled from "styled-components";

const CatPortfolioContainer = styled.div``;

const Title = styled.h1`
	font-size: 1.8rem;
	margin: 1rem 0;
`;

const ImagesContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: 2rem;
	width: 100%;
	margin-bottom: 2rem;

	@media (max-width: 720px) {
		justify-content: space-evenly;
	}
`;

const CatImage = styled(motion.div)`
	border-radius: 24px;
	box-shadow: 1px 3px 5px 2px rgba(0, 0, 0, 0.2);

	height: 180px;
	width: 180px;

	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
`;

const CatPortfolio = ({ data }) => {
	return (
		<CatPortfolioContainer>
			<Title>Other photos</Title>

			<AnimatePresence>
				<ImagesContainer>
					{data &&
						data.map((photo) => {
							return (
								<CatImage
									style={{ backgroundImage: `url(${photo.url})` }}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{duration: 2}}
									exit={{ opacity: 0, height: "0" }}
								/>
							);
						})}
				</ImagesContainer>
			</AnimatePresence>
		</CatPortfolioContainer>
	);
};

export default CatPortfolio;
