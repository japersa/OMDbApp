import React from 'react';
import {Provider} from 'react-redux';
import MovieSearch from './src/screens/MovieSearch';
import {store} from './src/redux/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <MovieSearch />
    </Provider>
  );
}
