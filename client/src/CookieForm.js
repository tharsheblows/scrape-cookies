import React, { useState, useEffect } from 'react';

const CookieForm = () => {

	const [ greeting, setGreeting ] = useState('Submit');
	const [ site, setSite ] = useState('');
	const [ message, setMessage ] = useState('');

	useEffect(() => {
		setGreeting('hey there you lovely thing');
	}, [setGreeting]);

	const handleSubmit = (e) => {
		// Prevent the browser from reloading the page
		e.preventDefault();

		console.log(site);

		const body = {
			"site": site
		}

		console.log(body)

		// You can pass formData as a fetch body directly:
		fetch('/api', {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})
			.then((response) => response.json())
			.then((data) => console.log(data));
	}

	return (
		<div className="wrapper">
			<form method="post">
				<input
					name="site"
					type="text"
					value={site} // ...force the input's value to match the state variable...
					onChange={(e) => setSite(e.target.value)}
				/>
				<button type="submit" onClick={(e) => handleSubmit(e)}>{greeting}</button>
			</form>

			<div id="results">{message}</div>
		</div>
	);
};

export default CookieForm;
