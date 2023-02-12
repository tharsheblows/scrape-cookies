import React, { useState, useEffect } from 'react';

const Results = ( props ) => {
	console.log(props);
	const { cookies } = props;
  	const [index, setIndex] = useState(0);
	const [cookiesMarkup, setCookiesMarkup] = useState('');
	const [ timerId, setTimerId ] = useState('');

	// All of the timeout shenanigans are for the sheer drama of it.
	useEffect(() => {
		const markupTimerId = setInterval(
			() => {
				setIndex((i) => (i + 1) % cookies.length);
			}, // <-- increment index
			200
		);
		setTimerId( markupTimerId );
		return () => clearInterval(markupTimerId);
  	}, [cookies]);

	useEffect(() => {
		// Clear the timeout when we're done.
		if( index >= cookies.length - 1 ) {
			clearInterval(timerId);
		}
		// only get up to index here.
		const markup = cookies.map( (c,i) => {
			return i <= index ? <li key={i}>{c.name}</li> : '';
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
