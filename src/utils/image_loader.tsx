import * as React from 'react';
import Img from 'react-image';
import {NO_PHOTO_SRC, API_IMG_URL,API_IMG_POSTER_SIZE, API_IMG_PLACEHOLDER_SIZE} from '../api.conf.json';

export default (posterPath:string,size:string=API_IMG_POSTER_SIZE,placeholderSize:string=API_IMG_PLACEHOLDER_SIZE)=>{
    let srcPath=[]; 
    let placeholderPath=[];
    if(posterPath===null){
        srcPath=[NO_PHOTO_SRC];
        placeholderPath=[NO_PHOTO_SRC];
    }else{
        srcPath=[`${API_IMG_URL}${size}${posterPath}`, NO_PHOTO_SRC];
        placeholderPath=[`${API_IMG_URL}${placeholderSize}${posterPath}`, NO_PHOTO_SRC];
    }
    return <Img
        src={srcPath}
        loader={<Img
            style={{filter: 'blur(4px)', 'animation': 'hue 3s infinite'}}
            src={placeholderPath}
        />}
    />
}