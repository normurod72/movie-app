import * as React from 'react';
import {Empty} from 'antd';

import AppHeader from '../app_header';
import './index.less';


interface Props { onPopularMovies:any };

const NotFound : React.FC<Props> = ({onPopularMovies}:Props)=>(
    <React.Fragment>
        <AppHeader showButton={true} onPopularMovies={onPopularMovies} />
        <Empty description="Page not found" />
    </React.Fragment>
);

export default NotFound;