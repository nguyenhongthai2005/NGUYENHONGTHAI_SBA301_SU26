import { useEffect, useState, useContext } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import axiosInstance from '../api/axiosConfig';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const res = await axiosInstance.get(`/customers/email/${user.email}`);
            setCustomer(res.data);
        } catch (error) {
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`/customers/${customer.customerID}`, customer);
            alert('Profile updated successfully!');
        } catch (error) {
            alert('Update failed');
        }
    };

    if(!customer) return <Container>Loading...</Container>;

    return (
        <Container className="mt-5">
            <Card className="shadow mx-auto" style={{ maxWidth: '600px' }}>
                <Card.Body>
                    <h3 className="mb-4 text-center">My Profile</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" value={customer.customerFullName} onChange={e => setCustomer({...customer, customerFullName: e.target.value})} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Telephone</Form.Label>
                            <Form.Control type="text" value={customer.telephone} onChange={e => setCustomer({...customer, telephone: e.target.value})} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control type="date" value={customer.customerBirthday} onChange={e => setCustomer({...customer, customerBirthday: e.target.value})} required />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={customer.password} onChange={e => setCustomer({...customer, password: e.target.value})} required />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">Update Profile</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Profile;
