import * as React from 'react';
import { Container} from 'react-grid-system';
import { Alert } from 'antd';

export default (movies:any)=>(
    (!movies.data || movies.error) &&
    <Container fluid={true}>
        <Alert
            message="Error"
            description="Something went wrong while fetching data"
            type="error"
            showIcon={true}
        />
    </Container>
);