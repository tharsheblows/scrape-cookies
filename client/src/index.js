import React from 'react';
import { createRoot } from 'react-dom/client';

import CookieForm from './CookieForm';

const cookieFormEL = document.getElementById('form');

if ( cookieFormEL ) {
	const cookieRoot = createRoot(cookieFormEL);
	cookieRoot.render(<CookieForm />);
}

