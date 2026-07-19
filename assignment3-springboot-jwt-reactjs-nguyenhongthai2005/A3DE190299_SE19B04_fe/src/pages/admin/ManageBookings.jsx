import { useEffect, useState } from 'react';
import { Container, Table, Card } from 'react-bootstrap';
import axiosInstance from '../../api/axiosConfig';

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {
        const res = await axiosInstance.get('/bookings');
        setBookings(res.data);
    };

    return (
        <Container className="mt-5">
            <Card className="shadow">
                <Card.Body>
                    <h3 className="mb-4">Manage Bookings</h3>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>Customer ID</th>
                                <th>Date</th>
                                <th>Total Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(b => (
                                <tr key={b.bookingReservationID}>
                                    <td>{b.bookingReservationID}</td>
                                    <td>{b.customer?.customerID || 'N/A'}</td>
                                    <td>{b.bookingDate}</td>
                                    <td>${b.totalPrice}</td>
                                    <td>{b.bookingStatus === 1 ? 'Active' : 'Inactive'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ManageBookings;
