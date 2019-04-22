import * as React from 'react';
import ContentLoader from 'react-content-loader';

export default () => <ContentLoader
    className="card-content-loader"
    height={275}
    width={412}
    speed={2}
    primaryColor="#d3d3d3"
    secondaryColor="#e0dede"
>
    <rect x="190" y="25" rx="0" ry="0" width="195" height="30" />
    <rect x="190" y="80" rx="0" ry="0" width="105" height="30" />
    <rect x="190" y="137" rx="0" ry="0" width="130" height="30" />
    <rect x="0" y="0" rx="3" ry="3" width="164" height="275" />
    <rect x="190" y="215" rx="0" ry="0" width="185" height="30" />
</ContentLoader>;