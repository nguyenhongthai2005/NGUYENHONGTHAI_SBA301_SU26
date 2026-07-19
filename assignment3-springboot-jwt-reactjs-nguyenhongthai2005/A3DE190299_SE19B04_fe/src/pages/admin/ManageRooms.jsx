import { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form, Card } from 'react-bootstrap';
import axiosInstance from '../../api/axiosConfig';

const ManageRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({ roomNumber: '', roomDetailDescription: '', roomMaxCapacity: '', roomPricePerDay: '', roomStatus: 1 });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        loadRooms();
    }, []);

    const loadRooms = async () => {
        const res = await axiosInstance.get('/rooms');
        setRooms(res.data);
    };

    const handleSave = async () => {
        if(editId) {
            await axiosInstance.put(`/rooms/${editId}`, form);
        } else {
            await axiosInstance.post('/rooms', form);
        }
        setShow(false);
        loadRooms();
    };

    const handleDelete = async (id) => {
        await axiosInstance.delete(`/rooms/${id}`);
        loadRooms();
    };

    const openEdit = (room) => {
        setForm(room);
        setEditId(room.roomID);
        setShow(true);
    };

    return (
        <Container className="mt-5">
            <Card className="shadow">
                <Card.Body>
                    <div className="d-flex justify-content-between mb-4">
                        <h3>Manage Rooms</h3>
                        <Button variant="primary" onClick={() => {setEditId(null); setForm({roomStatus: 1}); setShow(true);}}>Add Room</Button>
                    </div>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Room ID</th>
                                <th>Number</th>
                                <th>Capacity</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.map(r => (
                                <tr key={r.roomID}>
                                    <td>{r.roomID}</td>
                                    <td>{r.roomNumber}</td>
                                    <td>{r.roomMaxCapacity}</td>
                                    <td>${r.roomPricePerDay}</td>
                                    <td>{r.roomStatus === 1 ? 'Active' : 'Inactive'}</td>
                                    <td>
                                        <Button variant="warning" size="sm" className="me-2" onClick={() => openEdit(r)}>Edit</Button>
                                        <Button variant="danger" size="sm" onClick={() => handleDelete(r.roomID)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton><Modal.Title>{editId ? 'Edit' : 'Add'} Room</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control type="text" placeholder="Room Number" className="mb-3" value={form.roomNumber || ''} onChange={e => setForm({...form, roomNumber: e.target.value})} />
                        <Form.Control type="text" placeholder="Description" className="mb-3" value={form.roomDetailDescription || ''} onChange={e => setForm({...form, roomDetailDescription: e.target.value})} />
                        <Form.Control type="number" placeholder="Capacity" className="mb-3" value={form.roomMaxCapacity || ''} onChange={e => setForm({...form, roomMaxCapacity: e.target.value})} />
                        <Form.Control type="number" placeholder="Price Per Day" className="mb-3" value={form.roomPricePerDay || ''} onChange={e => setForm({...form, roomPricePerDay: e.target.value})} />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSave}>Save</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ManageRooms;
