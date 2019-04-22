import * as React from 'react';
import { Container, Row, Col } from 'react-grid-system';

import ContentLoader from "react-content-loader"


export default () => {
    return (
        <div className="movie-details">
            <Container fluid={true}>
                <Row justify="between">
                    <Col md={9}>
                        <Row justify="between">
                            <Col xs={12} sm={6} md={4}>
                                <ContentLoader
                                    height={475}
                                    width={331}
                                    speed={1}
                                    primaryColor="#d3d3d3"
                                    secondaryColor="#e0dede"
                                >
                                    <rect x="0" y="0" rx="3" ry="3" width="331" height="475" />
                                </ContentLoader>
                            </Col>
                            <Col xs={12} sm={6} md={8}>
                                <div className="movie-details__content">
                                    <ContentLoader
                                        height={500}
                                        width={500}
                                        speed={1}
                                        primaryColor="#d3d3d3"
                                        secondaryColor="#e0dede"
                                    >
                                        <rect x="0" y="17" rx="10" ry="10" width="420" height="33" />
                                        <rect x="0" y="71" rx="10" ry="10" width="315" height="33" />
                                        <rect x="0" y="125" rx="10" ry="10" width="233" height="20" />
                                        <rect x="0" y="216" rx="5" ry="5" width="195" height="13" />
                                        <rect x="0" y="251" rx="5" ry="5" width="195" height="13" />
                                    </ContentLoader>
                                </div>
                            </Col>
                        </Row>
                    </Col>

                    <Col xs={12} sm={12} md={3}>
                        <ContentLoader
                            height={200}
                            width={327}
                            speed={1}
                            primaryColor="#d3d3d3"
                            secondaryColor="#e0dede"
                        >
                            <rect x="0" y="17" rx="10" ry="10" width="300" height="25" />
                            <rect x="0" y="67" rx="5" ry="5" width="195" height="17" />
                            <rect x="0" y="90" rx="5" ry="5" width="195" height="17" />
                        </ContentLoader>
                        <br />
                        <ContentLoader
                            height={200}
                            width={327}
                            speed={1}
                            primaryColor="#d3d3d3"
                            secondaryColor="#e0dede"
                        >
                            <rect x="0" y="17" rx="10" ry="10" width="300" height="25" />
                            <rect x="0" y="67" rx="5" ry="5" width="195" height="17" />
                            <rect x="0" y="90" rx="5" ry="5" width="195" height="17" />
                        </ContentLoader>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}