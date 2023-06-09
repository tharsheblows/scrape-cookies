import React, { useState } from 'react';
import Results from './Results';

const CookieForm = () => {

	const [ site, setSite ] = useState('');
	const [ message, setMessage ] = useState('');
	const [ hasCookies, setHasCookies ] = useState(false);
	const [ cookies, setCookies ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ onLoaded, setOnLoaded ] = useState(false);

	const handleSubmit = (e) => {
		// Prevent the browser from reloading the page
		e.preventDefault();

		setCookies([]);
		setLoading(true);

		const body = {
			"site": site,
			"onLoaded": onLoaded
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
				<div className="field">
					<label htmlFor="site" className="label">
						Website page
					</label>
					<input
						className="input"
						name="site"
						id="site"
						type="url"
						value={site} // ...force the input's value to match the state variable...
						onChange={(e) => setSite(e.target.value.trim())}
					/>
					<p className="help">
						Please enter the full url with the https:// bit.
					</p>
				</div>
				<div className="field field__secondary">
					<div className="field__checkbox">
						<input
							type="checkbox"
							value={onLoaded}
							name="onLoaded"
							id="onLoaded"
							onChange={() => setOnLoaded(!onLoaded)}
						/>
						<label htmlFor="onLoaded" className="inline-label">
							Check to wait for DOM Content Loaded rather than
							idle. This is useful if you get a timeout with it
							unticked.
						</label>
					</div>
				</div>
				<div className="field">
					{loading && (
						<button className="submit" type="submit" disabled>
							loading
						</button>
					)}
					{!loading && (
						<button
							className="submit"
							type="submit"
							onClick={(e) => handleSubmit(e)}
						>
							Search for cookies
						</button>
					)}
					{!loading && hasCookies && (
						<a className="go-to-cookies button" href="#cookies">
							Go to the cookie list
						</a>
					)}
				</div>
				<hr className="separator" />
				<div className="more-info">
					<p className="help">
						Ideally leave the checkbox above unchecked. This has the
						page wait until network activity mainly stops before
						continuing. Sometimes it never stops though. Sometimes
						sites just take too long.
					</p>
					<p className="help">
						The sites will see this traffic as coming from the US.
						The cookie consent check on a site can vary by location
						so it might not get triggered.
					</p>
					<p className="help">
						This only looks at the first 30k pixels in height of a
						page. Usually not an issue.
					</p>
					<p className="help">
						The count and assignment of first party vs third party
						cookies is a work in progress. If you could, let me know
						where it's still incorrect.
					</p>
					<p className="help">
						Puppeteer is launched in an incognito context.
					</p>
					<p className="help">
						Lastly, this is a proof of concept and it's possible to
						break it. Let me know if that happens.
					</p>
				</div>
			</form>
			<hr className="separator" />
			{loading && (
				<div className="loading status">
					Please wait while we get the page. This can take a while.
				</div>
			)}
			{!loading && hasCookies && cookies.length === 0 && (
				<div className="status good">There are no cookies to show.</div>
			)}
			{hasCookies && !loading && (
				<div id="cookies">
					<Results cookies={cookies} searchedSite={site} />
				</div>
			)}
			{!hasCookies && message && !loading && (
				<div className="error status">{message}</div>
			)}
		</>
	);
};

export default CookieForm;
