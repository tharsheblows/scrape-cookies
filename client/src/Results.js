import React from 'react';
import Result from "./Result";

const Results = ( props ) => {

	const { cookies, searchedSite } = props;

	const isFirstParty = (c) => {

		if ( ! searchedSite ) {
			return false;
		}

		let searchedUrl;
		try {
			searchedUrl = new URL(searchedSite);
		} catch {
			return false;
		}

		const searchedHostname = searchedUrl.hostname ?? '';
		const cookieDomain = c.domain.replace(/^(\.)/, ''); // Take off the first . if it's there.
		return searchedHostname
			.toLowerCase()
			.includes(cookieDomain.toLowerCase());
	}

	// only get up to index here.
	const markup = cookies.map((c, i) => {


		// This is a bit handwaving. There must be a better way.
		return (
			<Result
				isGood={isFirstParty(c)}
				key={i}
				cookie={c}
			/>
		);
	});

	// Just leaving this here for now.
	const firstPartyCount =  cookies.reduce((count, cookie) => {
		if ( isFirstParty(cookie) ){
			return count += 1;
		}
		return count;
	}, 0 );

	return (
		<>
			<div className="counts">
				<h2>Cookie counts</h2>
				<p className="warning">
					Please remember that the assignment of first vs
					third party cookies is a work in progress. The
					cookie details are correct though so you can
					double check.
				</p>
				<p className="cookie-count">
					<strong>Total cookies:</strong> {cookies.length}
				</p>
				<p className="first-party-count">
					<strong>First party cookies:</strong> {firstPartyCount}
				</p>
				<p className="third-party-count">
					<strong>Third party cookies:</strong>{ ' ' }
					{cookies.length - firstPartyCount}
				</p>
			</div>
			<div className="results">{markup}</div>
		</>
	);
};

export default Results;
