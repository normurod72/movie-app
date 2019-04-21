import * as React from 'react';
import './index.less';

interface Props { children:any, image_path:string };

const BackdropWrapper: React.FC<Props> = ({ children, image_path }: Props) => 
    <div className="backdrop" style={{backgroundImage: `url(${image_path}), linear-gradient(#000, #1d5d29, #00d474)`}}>
        <div className="backdrop-wrapper">
            {children}
        </div>    
    </div>
;

export default BackdropWrapper;