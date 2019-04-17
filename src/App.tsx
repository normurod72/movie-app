import * as React from 'react';
import './App.less';
import logo from './assets/images/logo.png';
import Movie from './components/movie';

import store from './redux/store';
import { Provider } from "react-redux";

class App extends React.Component {


    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                    </header>
                    <Movie />
                </div>
            </Provider>
        );
    }
}

export default App;
