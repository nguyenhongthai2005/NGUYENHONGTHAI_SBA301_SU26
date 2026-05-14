import { Row, Col, Card, Button } from "react-bootstrap"

import orchids from "../data/orchids"

function Orchids() {

    return (
        <Row>

            {
                orchids.map((orchid) => (

                    <Col md={3} key={orchid.id} className="mb-4">

                        <Card>

                            <Card.Img
                                variant="top"
                                src={orchid.image}
                                style={{
                                    height: "220px",
                                    objectFit: "cover"
                                }}
                            />

                            <Card.Body>

                                <Card.Title>
                                    {orchid.name}
                                </Card.Title>

                                <Card.Text>
                                    {orchid.category}
                                </Card.Text>

                                <Button variant="primary">
                                    Detail
                                </Button>

                            </Card.Body>

                        </Card>

                    </Col>

                ))
            }

        </Row>
    )
}

export default Orchids