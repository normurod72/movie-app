import * as React from 'react';
import { Pagination } from 'antd';

export default (movies:any, onChange:any)=>(
    <div className="pagination-container">
        {
            movies.data.length !== 0 && 
            <Pagination 
                hideOnSinglePage={true}
                showQuickJumper={true} 
                defaultCurrent={1}  
                current={movies.page}  
                total={movies.total_pages*10} 
                onChange={(pageNumber:number)=>onChange(pageNumber)} />
        }
    </div>
);