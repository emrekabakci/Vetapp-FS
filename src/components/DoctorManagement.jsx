import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const DoctorManagement = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [editDoctorId, setEditDoctorId] = useState(null);
    const [availableDates, setAvailableDates] = useState([]);
    const [selectedDoctorId, setSelectedDoctorId] = useState('');
    const [workDay, setWorkDay] = useState('');
    const [editAvailableDateId, setEditAvailableDateId] = useState(null);

    useEffect(() => {
        fetchDoctors();
        fetchAvailableDates();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/doctors');
            setDoctors(response.data.content);
        } catch (error) {
            toast.error('Failed to fetch doctors.');
            console.error(error);
        }
    };

    const fetchAvailableDates = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/available-dates');
            setAvailableDates(response.data.content);
        } catch (error) {
            toast.error('Failed to fetch available dates.');
            console.error(error);
        }
    };

    const handleCreateDoctor = async () => {
        try {
            const doctorRequest = {
                name,
                phone,
                email,
                address,
                city
            };
            await axios.post('http://localhost:8080/api/v1/doctors', doctorRequest);
            toast.success('Doctor created successfully!');
            fetchDoctors();
            setName('');
            setPhone('');
            setEmail('');
            setAddress('');
            setCity('');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to create doctor.';
            toast.error(errorMessage);
            console.error(error);
        }
    };

    const handleDeleteDoctor = async (doctorId) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/doctors/${doctorId}`);
            toast.success('Doctor deleted successfully!');
            fetchDoctors();
        } catch (error) {
            toast.error('Failed to delete doctor.');
            console.error(error);
        }
    };

    const handleUpdateDoctor = async (doctorId) => {
        try {
            const doctorRequest = {
                name,
                phone,
                email,
                address,
                city
            };
            await axios.put(`http://localhost:8080/api/v1/doctors/${doctorId}`, doctorRequest);
            toast.success('Doctor updated successfully!');
            fetchDoctors();
            setEditDoctorId(null);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to update doctor.';
            toast.error(errorMessage);
            console.error(error);
        }
    };

    const handleEditClick = (doctor) => {
        setEditDoctorId(doctor.id);
        setName(doctor.name);
        setPhone(doctor.phone);
        setEmail(doctor.email);
        setAddress(doctor.address);
        setCity(doctor.city);
    };

    const handleCancelEdit = () => {
        setEditDoctorId(null);
        setName('');
        setPhone('');
        setEmail('');
        setAddress('');
        setCity('');
    };

    const handleAddAvailableDate = async () => {
        try {
            const availableDateRequest = {
                workDay,
                doctorId: selectedDoctorId
            };
            await axios.post('http://localhost:8080/api/v1/available-dates', availableDateRequest);
            toast.success('Available date added successfully!');
            fetchAvailableDates();
            setWorkDay('');
            setSelectedDoctorId('');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to add available date.';
            toast.error(errorMessage);
            console.error(error);
        }
    };

    const handleUpdateAvailableDate = async (availableDateId) => {
        try {
            const availableDateRequest = {
                workDay,
                doctorId: selectedDoctorId
            };
            await axios.put(`http://localhost:8080/api/v1/available-dates/${availableDateId}`, availableDateRequest);
            toast.success('Available date updated successfully!');
            fetchAvailableDates();
            setEditAvailableDateId(null);
            setWorkDay('');
            setSelectedDoctorId('');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to update available date.';
            toast.error(errorMessage);
            console.error(error);
        }
    };

    const handleDeleteAvailableDate = async (availableDateId) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/available-dates/${availableDateId}`);
            toast.success('Available date deleted successfully!');
            fetchAvailableDates();
        } catch (error) {
            toast.error('Failed to delete available date.');
            console.error(error);
        }
    };

    const handleEditAvailableDateClick = (date) => {
        setEditAvailableDateId(date.id);
        setSelectedDoctorId(date.doctorId);
        setWorkDay(date.workDay);
    };

    const handleCancelEditAvailableDate = () => {
        setEditAvailableDateId(null);
        setWorkDay('');
        setSelectedDoctorId('');
    };

    return (
        <div className='component'>
            <h2>Doctor Management</h2>
            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            </div>
            <div className="form-group">
                <label>Phone</label>
                <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            </div>
            <div className="form-group">
                <label>Address</label>
                <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
            </div>
            <div className="form-group">
                <label>City</label>
                <input type="text" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
            </div>
            {editDoctorId ? (
                <button className="btn btn-primary" onClick={() => handleUpdateDoctor(editDoctorId)}>Update Doctor</button>
            ) : (
                <button className="btn btn-primary" onClick={handleCreateDoctor}>Add Doctor</button>
            )}
            <button className="btn btn-secondary" onClick={handleCancelEdit} style={{ marginLeft: '10px' }}>Cancel</button>
            <ToastContainer position="top-center" />
            <br />
            <br />
            <h2>Doctors</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctor) => (
                        <tr key={doctor.id}>
                            <td>{editDoctorId === doctor.id ? <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} /> : doctor.name}</td>
                            <td>{editDoctorId === doctor.id ? <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} /> : doctor.phone}</td>
                            <td>{editDoctorId === doctor.id ? <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} /> : doctor.email}</td>
                            <td>{editDoctorId === doctor.id ? <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} /> : doctor.address}</td>
                            <td>{editDoctorId === doctor.id ? <input type="text" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} /> : doctor.city}</td>
                            <td>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    {editDoctorId === doctor.id ? (
                                        <>
                                            <button className="btn btn-success" onClick={() => handleUpdateDoctor(doctor.id)}><i className='bi bi-check'></i></button>
                                            <button className="btn btn-secondary" onClick={handleCancelEdit}><i className='bi bi-x'></i></button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="btn btn-primary" onClick={() => handleEditClick(doctor)}><i className='bi bi-pencil'></i></button>
                                            <button className="btn btn-danger" onClick={() => handleDeleteDoctor(doctor.id)}><i className='bi bi-trash'></i></button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <br />
            <h2>Available Dates Management</h2>
            <div className="form-group">
                <label>Doctor</label>
                <select className="form-control" value={selectedDoctorId} onChange={(e) => setSelectedDoctorId(e.target.value)}>
                    <option value=''>Select Doctor</option>
                    {doctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Available Date</label>
                <input type="date" className="form-control" value={workDay} onChange={(e) => setWorkDay(e.target.value)} />
            </div>
            {editAvailableDateId ? (
                <button className="btn btn-primary" onClick={() => handleUpdateAvailableDate(editAvailableDateId)}>Update Available Date</button>
            ) : (
                <button className="btn btn-primary" onClick={handleAddAvailableDate}>Add Available Date</button>
            )}
            <br />
            <br />
            <h2>Available Dates</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Doctor</th>
                        <th>Available Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {availableDates.map((date) => (
                        <tr key={date.id}>
                            <td>{doctors.find(doctor => doctor.id === date.doctorId)?.name || 'Unknown'}</td>
                            <td>{editAvailableDateId === date.id ? <input type="date" className="form-control" value={workDay} onChange={(e) => setWorkDay(e.target.value)} /> : date.workDay}</td>
                            <td>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    {editAvailableDateId === date.id ? (
                                        <>
                                            <button className="btn btn-success" onClick={() => handleUpdateAvailableDate(date.id)}><i className='bi bi-check'></i></button>
                                            <button className="btn btn-secondary" onClick={handleCancelEditAvailableDate}><i className='bi bi-x'></i></button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="btn btn-primary" onClick={() => handleEditAvailableDateClick(date)}><i className='bi bi-pencil'></i></button>
                                            <button className="btn btn-danger" onClick={() => handleDeleteAvailableDate(date.id)}><i className='bi bi-trash'></i></button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DoctorManagement;