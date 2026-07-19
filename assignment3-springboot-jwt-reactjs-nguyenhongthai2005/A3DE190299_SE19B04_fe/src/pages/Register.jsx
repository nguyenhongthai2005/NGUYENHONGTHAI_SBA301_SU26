import { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import axiosInstance from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        customerFullName: '', telephone: '', emailAddress: '', customerBirthday: '', password: '', customerStatus: 1
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/customers/register', formData);
            alert('Registration successful! You can now login.');
            navigate('/login');
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center mt-5">
            <Card style={{ width: '500px' }} className="shadow">
                <Card.Body>
                    <h3 className="text-center mb-4">Register</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" onChange={e => setFormData({...formData, customerFullName: e.target.value})} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" onChange={e => setFormData({...formData, emailAddress: e.target.value})} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onChange={e => setFormData({...formData, password: e.target.value})} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Telephone</Form.Label>
                            <Form.Control type="text" onChange={e => setFormData({...formData, telephone: e.target.value})} required />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control type="date" onChange={e => setFormData({...formData, customerBirthday: e.target.value})} required />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">Register</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Register;
