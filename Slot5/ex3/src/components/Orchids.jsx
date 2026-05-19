import { useState } from "react"
import { Row, Col, Card, Button, Modal } from "react-bootstrap"

import orchids from "../data/orchids"

function Orchids() {

    const [show, setShow] = useState(false)
    const [selected, setSelected] = useState(null)

    const handleShow = (orchid) => {
        setSelected(orchid)
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
        setSelected(null)
    }

    return (
        <>
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

                                <Button variant="primary" onClick={() => handleShow(orchid)}>
                                    Detail
                                </Button>

                            </Card.Body>

                        </Card>

                    </Col>

                ))
            }

        </Row>

        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{selected?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selected && (
                    <>
                        <img
                            src={selected.image}
                            alt={selected.name}
                            style={{ width: "100%", height: "400px", objectFit: "cover", marginBottom: "1rem" }}
                        />

                        <p>{selected.description}</p>
                        <p><strong>Origin:</strong> {selected.origin}</p>
                        <p><strong>Color:</strong> {selected.color}</p>
                        <p><strong>Rating:</strong> {selected.rating}</p>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default Orchids
