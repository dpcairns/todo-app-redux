import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { configureStore } from './store/configureStore';
import HomeView from './containers/HomeView.js'
import TodoApp from './reducers/index'
import { Root } from './containers/Root';

const app = document.getElementById('app');

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
	<HomeView />
	</Provider>, app);
