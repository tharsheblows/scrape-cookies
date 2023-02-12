import React, { useState } from 'react';

const Result = (props) => {
	const { cookie, isGood } = props;
	const [ showDetails, setShowDetails ] = useState(false);

	const cookieDetails = () => {
		const markup = Object.keys(cookie).map((key) => {
			return <li key={key}>{key}: {cookie[key]}</li>
		});
		return markup;
	}

	const partyClass = isGood ? 'first-party' : 'third-party';

	return (
		<>
			<div className={`cookie ${partyClass}`}>
				<div className="which-party">
					{ isGood ? `First party cookie` : `Third party cookie` }
				</div>
				<div className="cookie-name">
					cookie name: {cookie.name}
				</div>
				<div className="cookie-domain">
					cookie domain: {cookie.domain}
				</div>

				<button
					className="show-details"
					onClick={() => setShowDetails(!showDetails)}
				>
					{showDetails ? 'Hide details' : 'Show details'}
				</button>

				{showDetails && (
					<ul className="cookie-details">{cookieDetails()}</ul>
				)}
			</div>
		</>
	);
};

export default Result;
