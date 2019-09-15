import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Root from "./root";
import store from "./store";

//////////////////////////
// Configure Multi Lang //
//////////////////////////
import { loadLiterals } from "./store/actions/literals";
import loadLang from "./i18n";
const lang = loadLang("en");
store.dispatch(loadLiterals(lang));

/////////
// End //
/////////

ReactDOM.render(<Root store={store} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
