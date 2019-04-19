import * as React from 'react';
import { Tag } from 'antd';

import './index.less';
import { colors } from '../../assets/tag_colors.json';

interface Props { genres_ids: any[], genres: any[] };

const GenreTags: React.FunctionComponent<Props> = ({ genres_ids, genres }: Props) => (
    <div className="movie-genres">
        {genres_ids.map((id: number) => <Tag key={id} color={colors[Math.ceil(Math.random() * genres.length) - 1]}>
            {genres.find(genre => genre.id === id).name}
        </Tag>
        )}
    </div>
);

export default GenreTags;