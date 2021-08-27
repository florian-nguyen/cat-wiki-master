import React from "react";
import styled from "styled-components";

const ImageFrame = styled.div`
	display: block;
	position: relative;
	width: 100%;
	height: 100%;
	background-position: center;
	background-size: cover;
	border-radius: 24px;
`;

const DecoratedImageFrame = styled(ImageFrame)`
	&::after {
		display: block;
		position: absolute;
		left: -10px;
		top: 8%;
		height: 50%;
		width: 30px;
		content: "";

		background-color: #dec68b;
		border-radius: 8px;
		z-index: -1;
	}
`;

const DecoratedImage = ({ url, disabled }) => {
	if (!disabled) {
		return <DecoratedImageFrame style={{ backgroundImage: `url(${url})` }} />;
	} else {
		return <ImageFrame style={{ backgroundImage: `url(${url})` }} />;
	}
};

export default DecoratedImage;
