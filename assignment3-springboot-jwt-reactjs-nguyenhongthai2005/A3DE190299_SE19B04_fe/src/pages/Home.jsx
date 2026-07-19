import { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import axiosInstance from '../api/axiosConfig';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const [rooms, setRooms] = useState([]);
    const [showBooking, setShowBooking] = useState(false);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        loadRooms();
    }, []);

    const loadRooms = async () => {
        try {
            const res = await axiosInstance.get('/rooms');
            setRooms(res.data.filter(r => r.roomStatus === 1));
        } catch (error) {
        }
    };

    const handleSelect = (id) => {
        if(selectedRooms.includes(id)) {
            setSelectedRooms(selectedRooms.filter(rId => rId !== id));
        } else {
            setSelectedRooms([...selectedRooms, id]);
        }
    };

    const submitBooking = async () => {
        try {
            const cusRes = await axiosInstance.get(`/customers/email/${user.email}`);
            const currentUser = cusRes.data;
            
            if(!currentUser) {
                alert('Customer not found!');
                return;
            }

            await axiosInstance.post('/bookings', {
                customerId: currentUser.customerID,
                roomIds: selectedRooms
            });
            setShowBooking(false);
            setSelectedRooms([]);
            alert('Booking successful!');
        } catch (error) {
            alert('Booking failed.');
        }
    };

    return (
        <Container>
            <h2 className="mb-4 text-center">Available Rooms</h2>
            {user?.role === 'ROLE_CUSTOMER' && selectedRooms.length > 0 && (
                <div className="text-center mb-4">
                    <Button variant="success" onClick={() => setShowBooking(true)}>
                        Book Selected Rooms ({selectedRooms.length})
                    </Button>
                </div>
            )}
            <Row>
                {rooms.map(room => (
                    <Col md={4} key={room.roomID} className="mb-4">
                        <Card className="shadow-sm h-100 room-card">
                            <Card.Body>
                                <Card.Title>Room {room.roomNumber}</Card.Title>
                                <Card.Text>
                                    <strong>Description:</strong> {room.roomDetailDescription}<br/>
                                    <strong>Capacity:</strong> {room.roomMaxCapacity} persons<br/>
                                    <strong>Price:</strong> ${room.roomPricePerDay}/day
                                </Card.Text>
                                {user?.role === 'ROLE_CUSTOMER' && (
                                    <Button 
                                        variant={selectedRooms.includes(room.roomID) ? "danger" : "primary"}
                                        onClick={() => handleSelect(room.roomID)}
                                    >
                                        {selectedRooms.includes(room.roomID) ? "Deselect" : "Select to Book"}
                                    </Button>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal show={showBooking} onHide={() => setShowBooking(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Booking</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>You have selected {selectedRooms.length} rooms to book.</p>
                    <p>Do you want to proceed?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowBooking(false)}>Cancel</Button>
                    <Button variant="primary" onClick={submitBooking}>Confirm Booking</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Home;
