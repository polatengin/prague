import React from 'react';
import ReactDOM from 'react-dom';

import { AppContext } from './Services/AppContext';

import { App } from './Views/App';

import "./bundle.css"

ReactDOM.render(<React.StrictMode><App /></React.StrictMode>,document.getElementById('root'));
