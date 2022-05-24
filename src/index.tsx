import { CssBaseline } from '@material-ui/core';
import { persistSto, store } from '@redux/store';
import { history } from '@utils/index';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { theme } from '@utils/index'
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <ConnectedRouter history={history}>
                    <PersistGate loading={11} persistor={persistSto}>
                        <App />
                        <CssBaseline />
                    </PersistGate>
                </ConnectedRouter>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
    ,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
