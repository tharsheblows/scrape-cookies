import React, { useState } from 'react';
import Results from './Results';

const CookieForm = () => {

	const [ site, setSite ] = useState('');
	const [ message, setMessage ] = useState('');
	const [ hasCookies, setHasCookies ] = useState(false);
	const [ cookies, setCookies ] = useState([]);

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
			.then((data) => {
				if ( data.cookies ) {
					console.log( data );
					setCookies(data.cookies);
					setHasCookies(true);
				} else {
					const m = data.message ?? 'Something has gone horribly wrong, maybe try reloading the page.';
					setMessage(m);
				}
			});
	}

	return (
		<>
			<form className="page-search__form">
				<label htmlFor="site" className="page-search__label">
					Website page
				</label>
				<input
					className="page-search__input"
					name="site"
					type="text"
					value={site} // ...force the input's value to match the state variable...
					onChange={(e) => setSite(e.target.value)}
				/>
				<p className="page-search__help">Please enter the full url.</p>
				<button
					className="page-search__submit"
					type="submit"
					onClick={(e) => handleSubmit(e)}
				>
					Get the cookies
				</button>
			</form>

			{ hasCookies &&  ( <Results cookies={cookies} /> ) }
			{ ! hasCookies && message && ( <div className="page-search__error">{message}</div> ) }
		</>
	);
};

export default CookieForm;
