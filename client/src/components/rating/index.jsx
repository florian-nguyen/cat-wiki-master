import React from "react";
import styled from "styled-components";

const RatingContainer = styled.div`
	width: 100%;
	height: 1rem;

	display: flex;
	gap: 4%;
	justify-content: space-between;
	align-items: center;
`;

const Item = styled.div`
	width: 60%;
	height: 0.5rem;
	border-radius: 8px;
    box-shadow: 0 1.5px 3px rgba(0,0,0,0.2);
`;

const Rating = ({ rating }) => {
	const value = parseInt(rating);
	const maxValue = 5;

	return (
		<RatingContainer>
			{Array.from({ length: value }).map(() => (
				<Item style={{ backgroundColor: "#544439" }} />
			))}
			{Array.from({ length: maxValue - value }).map(() => (
				<Item style={{ backgroundColor: "#e0e0e0" }} />
			))}
		</RatingContainer>
	);
};

export default Rating;
