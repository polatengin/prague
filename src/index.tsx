import React from 'react';
import ReactDOM from 'react-dom';

import { AppContext } from './Services/AppContext';

import { App } from './Views/App';

import "./bundle.css"

ReactDOM.render(<AppContext.Provider value=""><React.StrictMode><App /></React.StrictMode></AppContext.Provider>,document.getElementById('root'));
