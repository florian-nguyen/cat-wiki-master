import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useClickOutside } from "react-click-outside-hook";
import { AnimatePresence, motion } from "framer-motion";
import { ClockLoader } from "react-spinners";
import { useHistory } from "react-router-dom";

import { FaSearch } from "react-icons/fa";

import logo from "../../resources/CatwikiLogoWhite.svg";

const Container = styled.div`
	color: white;
	font-weight: 500;
	font-size: 0.9rem;

	overflow: visible;
`;

const SearchContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	max-width: 250px;
	height: 100%;
`;

const Logo = styled.img`
	width: 180px;
`;

const InputSection = styled.form`
	position: relative;
	display: flex;
	width: 100%;
	height: 50px;
	align-items: stretch;
	border-radius: 25px;
	overflow: hidden;

	& #breedName {
		width: 100%;
		padding: 1rem 2rem;
		color: #291507;
		border: none;
		outline: none;
		font-size: 1.1rem;
	}

	& #submit-search {
		border: none;
		outline: none;

		position: absolute;
		right: 0;

		display: flex;
		align-items: center;
		justify-content: center;
		margin: auto 0;

		width: 50px;
		height: 50px;

		color: #291507;
		background-color: transparent;
		font-weight: 700;

		cursor: pointer;
		transition: all 0.5s ease-in-out;

		&:hover {
			opacity: 0.7;
			color: white;
			background-color: orangered;
		}
	}
`;

const SearchResultContainer = styled(motion.div)`
	margin-top: 1rem;
	padding: 0.5rem;
	background-color: white;
	border-radius: 15px;

	& > div {
		height: 100%;
		color: black;
		overflow: hidden scroll;

		::-webkit-scrollbar {
			width: 5px;
		}

		::-webkit-scrollbar-track {
			background: #f1f1f1;
			border-radius: 5px;
		}

		::-webkit-scrollbar-thumb {
			background: #bdbdbd;
			border-radius: 5px;
		}

		::-webkit-scrollbar-thumb:hover {
			background: #555;
		}

		& > div {
			height: 1rem;

			&:hover {
				background-color: rgba(151, 151, 151, 0.1);
			}
		}
	}
`;

const SearchResult = styled.div`
	font-weight: 500;
	min-width: 100%;
	height: 100%;
	padding: 0.4rem 0;

	border-radius: 5px;
	cursor: pointer;
`;

const ResultText = styled.span`
	padding: 0.3rem 0;
	font-size: 0.9rem;
	height: 100%;
	width: 400px;
`;

const containerVariants = {
	open: {
		height: "10rem",
	},

	loading: {
		height: "3rem",
	},
};

const containerTransition = {
	type: "spring",
	damping: 20,
	stiffness: 100,
};

const LoadingWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	min-height: 40px;
	width: 100%;
`;

const ErrorMessageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	min-height: 40px;
	width: 100%;

	& div {
		font-size: 0.9rem;
	}
`;

const SearchBar = ({ data }) => {
	let history = useHistory();
	const [searchText, setSearchText] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isSearching, setIsSearching] = useState(false);
	const [parentRef, isClickedOutside] = useClickOutside();
	const [searchContainerOpenState, setSearchContainerOpenState] = useState(false);

	const handleSearchChange = async (e) => {

		const newValue = (e.target.value || e.target.innerText).toLowerCase();
		setSearchText(newValue);
		setIsLoading(true);

		const filteredData = data.filter((breed) =>
			breed.name.toLowerCase().includes(newValue),
		);

		setSearchResults(filteredData);
		setIsLoading(false);

		if (newValue.trim() === "") setSearchResults([]);
	};

	const handleManualSubmit = async (e) => {
		e.preventDefault();


		if ((searchResults.length === 1)) {
			
			const preparedPath = encodeURI(`/breed/${searchResults[0].name.toLowerCase()}`);
			history.push({
				pathname: preparedPath,
				state: { data: searchResults[0] },
			});
		} else {
			history.push({
				pathname: "/search",
				state: { data: searchResults, search: searchText },
			});
		}
	};

	const handleBreedSelection = (e, id) => {
		
		handleSearchChange(e)

		setIsSearching(false);
	};

	const openSearchContainer = () => {
		setIsSearching(true);
		setSearchContainerOpenState(true);
	};

	const shutSearchContainer = () => {
		setSearchContainerOpenState(false);
		setSearchText("");
		setSearchResults([]);
		setIsLoading(false);
		setIsSearching(false);
	};

	useEffect(() => {

		if (isClickedOutside) shutSearchContainer();
	}, [isClickedOutside, data, searchText, isLoading]);

	return (
		<Container>
			<SearchContent ref={parentRef}>
				<Logo src={logo} alt="logo cat wiki" />
				<p>Get to know more about your cat breed</p>
				<InputSection onSubmit={handleManualSubmit}>
					<label htmlFor="breedName" hidden></label>
					<input
						id="breedName"
						name="breedName"
						type="text"
						placeholder="Enter your breed"
						value={searchText}
						onChange={handleSearchChange}
						onFocus={openSearchContainer}
						autoComplete="off"
						required
					/>
					<button id="submit-search" type="submit">
						<FaSearch />
					</button>
				</InputSection>

				<AnimatePresence>
					{isSearching && searchText.trim() !== "" && (
						<SearchResultContainer
							animate={isLoading ? "loading" : "open"}
							variants={containerVariants}
							transition={containerTransition}
						>
							{isLoading && (
								<LoadingWrapper>
									<ClockLoader loading color="#bdbdbd" size={40} />
								</LoadingWrapper>
							)}

							{!isLoading && searchResults.length > 0 && (
								<div>
									{searchResults.map((result) => (
										<SearchResult
											key={result.name}
											onClick={(e) => handleBreedSelection(e, result.name)}
										>
											<ResultText>{result.name}</ResultText>
										</SearchResult>
									))}
								</div>
							)}
							{!isLoading && searchResults.length === 0 && (
								<ErrorMessageWrapper>
									<div>No results found...</div>
								</ErrorMessageWrapper>
							)}
						</SearchResultContainer>
					)}
				</AnimatePresence>
			</SearchContent>
		</Container>
	);
};

export default SearchBar;
