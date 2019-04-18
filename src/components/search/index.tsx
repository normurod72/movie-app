import * as React from 'react';
import { Input } from 'antd';
import { Container, Row, Col } from 'react-grid-system';

import './index.less';

interface Props { onSearch:any };

const Search : React.FC<Props> = ({onSearch}:Props)=>(
    <div className="searchbox">
        <Container>
            <Row justify="center">
                <Col sm={8}>
                    <Input.Search
                        size="large"
                        placeholder="Enter the movie name you want to watch"
                        onChange={onSearch}
                        onSearch={onSearch}
                    />
                </Col>
            </Row>
        </Container>
    </div>
);

export default Search;