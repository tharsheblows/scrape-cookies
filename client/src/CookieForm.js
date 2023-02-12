import React, { useState } from 'react';
import Results from './Results';

const CookieForm = () => {

	const [ site, setSite ] = useState('');
	const [ message, setMessage ] = useState('');
	const [ hasCookies, setHasCookies ] = useState(false);
	const [ cookies, setCookies ] = useState([]);
	const [ loading, setLoading ] = useState(false);

	const handleSubmit = (e) => {
		// Prevent the browser from reloading the page
		e.preventDefault();

		setLoading(true);

		console.log({site});

		const body = {
			"site": site
		}

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
				setLoading(false);
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
			<form className="form">
				<label htmlFor="site" className="label">
					Website page
				</label>
				<input
					className="input"
					name="site"
					type="text"
					value={site} // ...force the input's value to match the state variable...
					onChange={(e) => setSite(e.target.value)}
				/>
				<p className="help">Please enter the full url with the https:// bit.</p>
				<button
					className="submit"
					type="submit"
					onClick={(e) => handleSubmit(e)}
				>
					Get the cookies
				</button>
				<hr className="separator"/>
				<div class="more-info">
					<p className="help">
						The location on this seems to be set by your browser
						location. So to see what's set in other areas – and the
						results vary wildly by area – change your location via a
						VPN. This is a proof of concept but it'd be interesting to have it here.
					</p>
					<p className="help">
						Also, Puppeteer is launched in an incognito context.
					</p>
					<p className="help">
						Lastly, this is a proof of concept and it's possible to break it.
						Let me know if that happens.
					</p>
				</div>
			</form>
			<hr className="separator" />
			{loading && (
				<div className="loading status">
					Please wait while we get the page. This can take a while.
				</div>
			)}
			{! loading && hasCookies && cookies.length === 0 &&
				<div className="status good">There are no cookies to show.</div>
			}
			{hasCookies && ! loading && <Results cookies={cookies} searchedSite={site} />}
			{!hasCookies && message && ! loading && (
				<div className="error status">{message}</div>
			)}
		</>
	);
};

export default CookieForm;
