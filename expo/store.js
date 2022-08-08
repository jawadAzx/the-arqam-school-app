import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./react-redux/reducers/index";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const initialState = {};

const middleware = [thunk];

const store = createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
const persistor = persistStore(store);


export { store, persistor };