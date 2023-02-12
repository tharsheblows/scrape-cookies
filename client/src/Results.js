import React, { useState, useEffect } from 'react';
import Result from "./Result";

const Results = ( props ) => {

	const { cookies, searchedSite } = props;


	const searchedDomain = searchedSite.replace(
		/https:\/\/www|http:\/\/www|https:\/\/|http:\/\//gi,
		''
	);
	// only get up to index here.
	const markup = cookies.map((c, i) => {
		// This is a bit handwaving. There must be a better way.
		return <Result isGood={ c.domain.toLowerCase().includes( searchedDomain.toLowerCase() )} key={i} cookie={c} />;
	});

	// Just leaving this here for now.
	const firstPartyCount =  cookies.reduce((count, cookie) => {
		if ( cookie.domain.includes(searchedDomain) ){
			return count += 1;
		}
		return count;
	}, 0 );

	return (
		<>
			<div className="counts">
				<h2>Cookie counts</h2>
				<p className="warning">
					These numbers will overcount third party cookies when you are
					searching a subdomains eg https://images.google.com/.
					Please check the list below.
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
