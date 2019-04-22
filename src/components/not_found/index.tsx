import * as React from 'react';
import {Empty} from 'antd';

import AppHeader from '../app_header';
import './index.less';


interface Props { history:any };

const NotFound : React.FC<Props> = ({history}:Props)=>(
    <React.Fragment>
        <AppHeader showButton={true} onPopularMovies={()=>history.push('/home')} />
        <Empty description="Page not found" />
    </React.Fragment>
);

export default NotFound;