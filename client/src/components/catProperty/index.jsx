import React from "react";
import styled from "styled-components";

import { capitalize } from "../../utils";
import Rating from "../rating";

const PropertyContainer = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 1rem;
	margin: 1rem 0;
`;

const PropertyName = styled.h2`
	min-width: 180px;
	font-size: 1.1rem;
	margin: 0;
`;

const TextProperty = styled.p`
	font-size: 0.9rem;
	margin: 0;
`;

const CatProperty = ({ type, text, rating }) => {

    const capitalizeTitle = (s) => {
        const words = s.split(" ").map(word => capitalize(word));
        return words.join(" ");
    }

	return (
		<PropertyContainer>
			<PropertyName>{capitalizeTitle(text)+":"}</PropertyName>

            {
                type==="text" && <TextProperty>{rating}</TextProperty>
            }

            {
                type!=="text" && <Rating rating={rating}></Rating>
            }
		</PropertyContainer>
	);
};

export default CatProperty;
