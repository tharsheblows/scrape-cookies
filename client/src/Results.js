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

	useEffect(() => {
		// Clear the timeout when we're done.
		if (index >= cookies.length - 1) {
			clearInterval(timerId);
		}

		const searchedDomain = searchedSite.replace(/https:\/\/|http:\/\//gi, '');
		// only get up to index here.
		const markup = cookies.map((c, i) => {
			// This is a bit handwaving.
			return i <= index ? <Result isGood={ c.domain.toLowerCase().includes( searchedDomain.toLowerCase() )} key={i} cookie={c} /> : '';
		});
		setCookiesMarkup(markup);
	}, [index, setCookiesMarkup]);

	return (
		<>
			<div id="results">{cookiesMarkup}</div>
		</>
	);
};

export default Results;
