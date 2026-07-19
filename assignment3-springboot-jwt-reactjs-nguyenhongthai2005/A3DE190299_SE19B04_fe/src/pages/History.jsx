import { useEffect, useState, useContext } from 'react';
import { Container, Table, Card } from 'react-bootstrap';
import axiosInstance from '../api/axiosConfig';
import { AuthContext } from '../context/AuthContext';

const History = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    
    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        try {
            const cusRes = await axiosInstance.get(`/customers/email/${user.email}`);
            const currentUser = cusRes.data;
            if(currentUser){
                const res = await axiosInstance.get(`/bookings/customer/${currentUser.customerID}`);
                setBookings(res.data);
            }
        } catch (error) {
        }
    };

    return (
        <Container className="mt-5">
            <Card className="shadow">
                <Card.Body>
                    <h3 className="mb-4">My Booking History</h3>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>Date</th>
                                <th>Total Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(b => (
                                <tr key={b.bookingReservationID}>
                                    <td>{b.bookingReservationID}</td>
                                    <td>{b.bookingDate}</td>
                                    <td>${b.totalPrice}</td>
                                    <td>{b.bookingStatus === 1 ? 'Active' : 'Cancelled'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default History;
