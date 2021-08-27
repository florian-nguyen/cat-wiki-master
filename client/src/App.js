import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";
import { ClockLoader } from "react-spinners";

import baseUrl from "./api";

import Header from "./components/header";
import Footer from "./components/footer";
import SingleCatPage from "./components/singleCatPage";
import TopTenPage from "./components/topTenPage";

import HomePage from "./components/homePage";
import ErrorPage from "./components/errorPage";
import SearchResultsPage from "./components/searchResultsPage";

const StyledApp = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	height: 100%;
	padding: 0 5%;
	margin: 0;
	overflow-x: hidden;
`;

const StyledMain = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: space-between;
	align-items: stretch;

	max-width: 1100px;
	margin: 0 auto;
`;

const LoaderContainer = styled(motion.div)`
	width: 100%;
	height: 50%;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

function App() {
	const [breeds, setBreeds] = useState([]);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		if (breeds.length === 0) {
			const getAllBreeds = async () => {
				const preparedUrl = encodeURI(baseUrl + "/breeds");

				await axios
					.get(preparedUrl)
					.then(({ data }) => {
						setBreeds(data);
						setLoading(false);
					})
					.catch((error) => console.log(error));
			};

			getAllBreeds();
		}
	}, [breeds]);

	return (
		<StyledApp>
			<Header />

			<StyledMain>
				<BrowserRouter>
					<AnimatePresence>
						<Switch>
							{isLoading && (
								<LoaderContainer
									initial={{ opacity: 0, height: "50%" }}
									animate={{ opacity: 1, height: "50%" }}
									exit={{ opacity: 0, height: "0" }}
								>
									<ClockLoader color="#DEC68B" />
									<p>Please wait a few seconds...</p>
								</LoaderContainer>
							)}
							{breeds && !isLoading && (
								<Route
									exact
									path="/"
									render={() => <HomePage data={breeds} />}
								/>
							)}

							{breeds &&
								!isLoading &&
								breeds.map((breed, index) => {
									return (
										<Route
											key={index}
											exact
											path={`/breed/${breed.name.toLowerCase()}`}
											render={() => (
												<SingleCatPage
													name={breed.name.toLowerCase()}
													data={breed}
												/>
											)}
										/>
									);
								})}

							{breeds && !isLoading && (
								<Route
									exact
									path="/favourites"
									render={() => <TopTenPage data={breeds} />}
								/>
							)}

							{breeds && !isLoading && (
								<Route
									exact
									path="/search"
									render={(props) => (
										<SearchResultsPage
											data={props.location.state.data}
											search={props.location.state.search}
										/>
									)}
								/>
							)}

							{breeds && !isLoading && (
								<Route exact path="/*" component={ErrorPage} />
							)}
						</Switch>
					</AnimatePresence>
				</BrowserRouter>
			</StyledMain>

			<Footer />
		</StyledApp>
	);
}

export default App;
