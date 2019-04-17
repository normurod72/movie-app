import * as React from 'react';
import { Tag } from 'antd';

import './index.less';

export interface GenreProps { genres_ids: any[], genres:any[] };

class Genre extends React.Component<GenreProps> {
    tagColors=[
        "magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "purple"
    ];
    render() {
        return (
            <div className="movie-genres">
                {this.props.genres_ids.map((id:number)=><Tag key={id} color={this.tagColors[Math.ceil(Math.random()*11)-2]}>
                        {this.props.genres.find(genre=>genre.id===id).name}
                    </Tag>
                )}               
            </div>
        );
    }
}

export default Genre;