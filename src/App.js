import React from 'react';
import { Provider } from 'react-redux';
import store from './react-redux-store/store.js';
import GameBlock from "./GameBlock.jsx";

export default function App() {
  return (
    <Provider store={store}>
      <GameBlock/>
    </Provider>
  );
}