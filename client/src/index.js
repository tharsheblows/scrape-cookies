import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

import App from './App';
import CookieForm from './CookieForm';
import './App.scss';

const el = document.getElementById('app');
const root = createRoot(el);

root.render(<App />);

const hydrationEl = document.getElementById('hydration');
const hydrationRoot = createRoot( hydrationEl );

hydrationRoot.render(<CookieForm />);
