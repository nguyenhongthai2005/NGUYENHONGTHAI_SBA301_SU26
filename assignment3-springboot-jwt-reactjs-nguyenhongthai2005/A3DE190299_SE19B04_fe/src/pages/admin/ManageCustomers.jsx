import { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form, Card } from 'react-bootstrap';
import axiosInstance from '../../api/axiosConfig';

const ManageCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({ customerFullName: '', telephone: '', emailAddress: '', customerBirthday: '', password: '', customerStatus: 1 });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        const res = await axiosInstance.get('/customers');
        setCustomers(res.data);
    };

    const handleSave = async () => {
        if(editId) {
            await axiosInstance.put(`/customers/${editId}`, form);
        } else {
            await axiosInstance.post('/customers', form);
        }
        setShow(false);
        loadCustomers();
    };

    const handleDelete = async (id) => {
        await axiosInstance.delete(`/customers/${id}`);
        loadCustomers();
    };

    const openEdit = (customer) => {
        setForm(customer);
        setEditId(customer.customerID);
        setShow(true);
    };

    return (
        <Container className="mt-5">
            <Card className="shadow">
                <Card.Body>
                    <div className="d-flex justify-content-between mb-4">
                        <h3>Manage Customers</h3>
                        <Button variant="primary" onClick={() => {setEditId(null); setForm({}); setShow(true);}}>Add Customer</Button>
                    </div>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map(c => (
                                <tr key={c.customerID}>
                                    <td>{c.customerID}</td>
                                    <td>{c.customerFullName}</td>
                                    <td>{c.emailAddress}</td>
                                    <td>{c.telephone}</td>
                                    <td>
                                        <Button variant="warning" size="sm" className="me-2" onClick={() => openEdit(c)}>Edit</Button>
                                        <Button variant="danger" size="sm" onClick={() => handleDelete(c.customerID)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton><Modal.Title>{editId ? 'Edit' : 'Add'} Customer</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control type="text" placeholder="Name" className="mb-3" value={form.customerFullName || ''} onChange={e => setForm({...form, customerFullName: e.target.value})} />
                        <Form.Control type="email" placeholder="Email" className="mb-3" value={form.emailAddress || ''} onChange={e => setForm({...form, emailAddress: e.target.value})} disabled={!!editId} />
                        <Form.Control type="text" placeholder="Phone" className="mb-3" value={form.telephone || ''} onChange={e => setForm({...form, telephone: e.target.value})} />
                        <Form.Control type="date" className="mb-3" value={form.customerBirthday || ''} onChange={e => setForm({...form, customerBirthday: e.target.value})} />
                        <Form.Control type="password" placeholder="Password" className="mb-3" value={form.password || ''} onChange={e => setForm({...form, password: e.target.value})} />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSave}>Save</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ManageCustomers;
