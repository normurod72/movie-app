import * as React from 'react';
import './App.less';
import {Button} from 'antd';
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
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button type="primary">Button</Button>
        <br/>
        <Movie/>
      </div>
      </Provider>
    );
  }
}

export default App;
