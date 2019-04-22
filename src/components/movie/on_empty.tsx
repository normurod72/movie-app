import * as React from 'react';

export default (movies:any)=>{
    return (
    (movies.data.length===0 && movies.fetching===false) &&
    <div style={{textAlign:'center'}} >No movies found</div> 
)};