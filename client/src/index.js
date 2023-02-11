import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.scss';

const el = document.getElementById('app');

console.log( el );

ReactDOM.render(<App />, el);
