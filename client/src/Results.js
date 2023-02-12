import React, { useState, useEffect } from 'react';
import Result from "./Result";

const Results = ( props ) => {

	const { cookies, searchedSite } = props;
	const [index, setIndex] = useState(0);
	const [cookiesMarkup, setCookiesMarkup] = useState('');
	const [timerId, setTimerId] = useState('');

	// All of the timeout shenanigans are for the sheer drama of it.
	// Started from https://stackoverflow.com/questions/65840192/loop-through-an-array-and-show-single-item-at-a-time-with-dynamic-time-duration.
	// Thank you Drew Reese!
	useEffect(() => {
		const markupTimerId = setInterval(
			() => {
				setIndex((i) => (i + 1) % cookies.length);
			}, // <-- increment index
			300
		);
		setTimerId(markupTimerId);
		return () => clearInterval(markupTimerId);
	}, [cookies]);

	const searchedDomain = searchedSite.replace(
		/https:\/\/|http:\/\//gi,
		''
	);

	useEffect(() => {
		// Clear the timeout when we're done.
		if (index >= cookies.length - 1) {
			clearInterval(timerId);
		}

		// This is a bit handwaving.

		// only get up to index here.
		const markup = cookies.map((c, i) => {
			return i <= index ? (
				<Result
					isGood={c.domain.includes(searchedDomain)}
					key={i}
					cookie={c}
				/>
			) : (
				''
			);
		});
		setCookiesMarkup(markup);
	}, [index, setCookiesMarkup]);

	// Just leaving this here for now.
	const firstPartyCount = cookies.reduce((count, cookie) => {
		console.log(cookie.domain);
		console.log(searchedDomain);
		if ( cookie.domain.includes(searchedDomain) ){
			return count += 1;
		}
		return count;
	}, 0);

	return (
		<>
			<div id="results">{cookiesMarkup}</div>
		</>
	);
};

export default Results;
