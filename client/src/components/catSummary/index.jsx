import React from 'react'
import styled from 'styled-components';

import CatProperty from '../catProperty';

const CatInfoContainer = styled.div`
	/* width: 55%; */
	padding-left: 2rem;
	min-width: 400px;

	@media (max-width: 720px) {
		width: 100%;
		padding-left: 0;
	}
`;

const Title = styled.h1`
	margin-top: 0;
	font-size: 1.8rem;
`;

const CatDescription = styled.p`
	font-size: 0.9rem;
	text-align: justify;
`;

const PropertiesContainer = styled.div``;

const CatSummary = ({data}) => {
    return (
			<CatInfoContainer>
				<Title>{data.name}</Title>
				<CatDescription>{data.description}</CatDescription>

				<PropertiesContainer>
					<CatProperty
						type="text"
						text="temperament"
						rating={data.temperament}
					/>

					<CatProperty type="text" text="origin" rating={data.origin} />

					<CatProperty
						type="text"
						text="life span"
						rating={data.life_span + " years"}
					/>

					<CatProperty
						type="range"
						text="adaptability"
						rating={data.adaptability}
					/>

					<CatProperty
						type="range"
						text="affection level"
						rating={data.affection_level}
					/>

					<CatProperty
						type="range"
						text="child friendly"
						rating={data.child_friendly}
					/>

					<CatProperty type="range" text="grooming" rating={data.grooming} />

					<CatProperty
						type="range"
						text="intelligence"
						rating={data.intelligence}
					/>

					<CatProperty
						type="range"
						text="health issues"
						rating={data.health_issues}
					/>

					<CatProperty
						type="range"
						text="social needs"
						rating={data.social_needs}
					/>

					<CatProperty
						type="range"
						text="stranger friendly"
						rating={data.stranger_friendly}
					/>
				</PropertiesContainer>
			</CatInfoContainer>
		);
}

export default CatSummary
