import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import {persistStore, autoRehydrate} from 'redux-persist'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { configureStore } from './store/configureStore';
import HomeView from './containers/HomeView.js'
import TodoApp from './reducers/index'

const app = document.getElementById('app');

const store = createStore(TodoApp, undefined,
 		autoRehydrate()
	);
	persistStore(store)

ReactDOM.render(
	<Provider store={store}>
	<HomeView />
	</Provider>, app);
