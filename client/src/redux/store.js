import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import bikeReducer from './slice.js';

const store = configureStore({
    reducer: {
        bikeState: bikeReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export default store;