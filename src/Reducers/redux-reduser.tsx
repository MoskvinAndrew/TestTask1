import {combineReducers, createStore} from 'redux';
import appReducer from "./appReducer";

export type StoreReduxType = typeof store
export type RootState = ReturnType<typeof reducers>


let reducers = combineReducers({
    app:appReducer,
});

export let store = createStore(reducers);
// @ts-ignore
window.store = store;