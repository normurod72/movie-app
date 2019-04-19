import * as React from 'react';
import './index.less';
import { Button, Icon } from 'antd';

import logo from '../../assets/images/logo.png';

interface Props { showButton:boolean, onPopularMovies:any };

const AppHeader : React.FC<Props> = ({showButton, onPopularMovies}:Props)=>(
    <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {showButton && <Button type="dashed" onClick={onPopularMovies} size={"large"}><Icon type="left" /> Back to popular movies</Button>}
    </header>
);

export default AppHeader;