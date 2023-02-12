import React, { useState, useEffect } from 'react';

const CookieForm = () => {

	const [ greeting, setGreeting ] = useState('Submit');

	useEffect(() => {
		setGreeting('hey there you lovely thing');
	}, [setGreeting]);

	return (
		<div className="wrapper">
			<form id="cookie-form">
				<input type="text" />
				<button type="submit">{greeting}</button>
			</form>

			<div id="results"></div>
		</div>
	);
};

export default CookieForm;
