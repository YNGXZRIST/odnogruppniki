import React from "react";
// import logo from './logo.svg';
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Welcome } from "./pages/Welcome";
import { Registration } from "./modules/registration/Registration";
import { Provider } from "react-redux";
import {compose, createStore} from "redux";
import { userReducer } from "./modules/userRedux/userReducer";
import {Profile} from "./modules/profile/Profile";
import {history} from "./modules/history";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
    }
}

const store = createStore(
  userReducer,window['__REDUX_DEVTOOLS_EXTENSION__'] && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
    // ReactDOM.render(
    //     <HistoryRouter history={history}>
    //         {/* The rest of your app goes here */}
    //     </HistoryRouter>,
    //     root
    // );
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/page/:username" element={<Profile />} />
      </Routes>
    </Provider>

  );
}
export default App;
