import * as React from 'react';
import { Input } from 'antd';
import { Container, Row, Col } from 'react-grid-system';

import './index.less';

interface Props { onSearch:any, query:string };

const Search : React.FC<Props> = ({onSearch, query}:Props)=>(
    <div className="searchbox">
        <Container>
            <Row justify="center">
                <Col sm={8}>
                    <Input.Search
                        value={query}
                        size="large"
                        placeholder="Enter the movie name you want to watch"
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>onSearch(e.currentTarget.value)}
                        onSearch={onSearch}
                    />
                </Col>
            </Row>
        </Container>
    </div>
);

export default Search;