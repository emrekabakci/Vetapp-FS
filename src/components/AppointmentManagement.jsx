import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AppointmentsManagement = () => {
    const [appointmentDate, setAppointmentDate] = useState('');
    const [doctorId, setDoctorId] = useState('');
    const [animalId, setAnimalId] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [animals, setAnimals] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [editAppointmentId, setEditAppointmentId] = useState(null);
    const [searchedDoctorId, setSearchedDoctorId] = useState('');
    const [searchedAnimalId, setSearchedAnimalId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        fetchAppointments();
        fetchDoctors();
        fetchAnimals();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('https://statistical-meagan-emrekabakci-205b6144.koyeb.app/api/v1/appointments');
            setAppointments(Array.isArray(response.data.content) ? response.data.content : []);
        } catch (error) {
            toast.error('Failed to fetch appointments.');
            console.error(error);
        }
    };

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('https://statistical-meagan-emrekabakci-205b6144.koyeb.app/api/v1/doctors'); 
            setDoctors(Array.isArray(response.data.content) ? response.data.content : []);
        } catch (error) {
            toast.error('Failed to fetch doctors.');
            console.error(error);
        }
    };

    const fetchAnimals = async () => {
        try {
            const response = await axios.get('https://statistical-meagan-emrekabakci-205b6144.koyeb.app/api/v1/animals');
            setAnimals(Array.isArray(response.data.content) ? response.data.content : []);
        } catch (error) {
            toast.error('Failed to fetch animals.');
            console.error(error);
        }
    };

    const handleCreateAppointment = async () => {
        try {
            const appointmentRequest = {
                appointmentDate,
                doctor: { id: doctorId },
                animal: { id: animalId }
            };
            console.log('POST request to /api/v1/appointments with data:', appointmentRequest);
            await axios.post('https://statistical-meagan-emrekabakci-205b6144.koyeb.app/api/v1/appointments', appointmentRequest);
            toast.success('Appointment created successfully!');
            fetchAppointments();
            resetForm();
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to create appointment.';
            toast.error(errorMessage);
            console.error('Error in POST request:', error);
        }
    };

    const handleDeleteAppointment = async (appointmentId) => {
        try {
            console.log(`DELETE request to /api/v1/appointments/${appointmentId}`);
            await axios.delete(`https://statistical-meagan-emrekabakci-205b6144.koyeb.app/api/v1/appointments/${appointmentId}`);
            toast.success('Appointment deleted successfully!');
            fetchAppointments();
        } catch (error) {
            toast.error('Failed to delete appointment.');
            console.error('Error in DELETE request:', error);
        }
    };

    const handleUpdateAppointment = async (appointmentId) => {
        try {
            const appointmentRequest = {
                appointmentDate,
                doctor: { id: doctorId },
                animal: { id: animalId }
            };
            console.log(`PUT request to /api/v1/appointments/${appointmentId} with data:`, appointmentRequest);
            await axios.put(`https://statistical-meagan-emrekabakci-205b6144.koyeb.app/api/v1/appointments/${appointmentId}`, appointmentRequest);
            toast.success('Appointment updated successfully!');
            fetchAppointments();
            setEditAppointmentId(null);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to update appointment.';
            toast.error(errorMessage);
            console.error('Error in PUT request:', error);
        }
    };

    const handleEditClick = (appointment) => {
        setEditAppointmentId(appointment.id);
        setAppointmentDate(appointment.appointmentDate);
        setDoctorId(appointment.doctor?.id || '');
        setAnimalId(appointment.animal?.id || '');
    };

    const handleCancelEdit = () => {
        setEditAppointmentId(null);
        resetForm();
    };

    const resetForm = () => {
        setAppointmentDate('');
        setDoctorId('');
        setAnimalId('');
    };

    const handleSearchByDoctorAndDateRange = async () => {
        try {
            const url = `https://statistical-meagan-emrekabakci-205b6144.koyeb.app/api/v1/appointments/searchByDoctorAndDateRange?id=${searchedDoctorId}&startDate=${startDate}&endDate=${endDate}`;
            console.log(`GET request to ${url}`);
            const response = await axios.get(url);
            setAppointments(Array.isArray(response.data.content) ? response.data.content : []);
        } catch (error) {
            toast.error('Failed to fetch appointments by doctor and date range.');
            console.error('Error in GET request:', error);
        }
    };

    const handleSearchByAnimalAndDateRange = async () => {
        try {
            const url = `https://statistical-meagan-emrekabakci-205b6144.koyeb.app/api/v1/appointments/searchByAnimalAndDateRange?id=${searchedAnimalId}&startDate=${startDate}&endDate=${endDate}`;
            console.log(`GET request to ${url}`);
            const response = await axios.get(url);
            setAppointments(Array.isArray(response.data.content) ? response.data.content : []);
        } catch (error) {
            toast.error('Failed to fetch appointments by animal and date range.');
            console.error('Error in GET request:', error);
        }
    };
    return (
        <div className='component'>
            <h2>Appointments Management</h2>
            <div className="form-group">
                <label>Appointment Date</label>
                <input type="date" className="form-control" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Doctor</label>
                <select className="form-control" value={doctorId} onChange={(e) => setDoctorId(e.target.value)}>
                    <option value="">Select a Doctor</option>
                    {doctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.id}>
                            {doctor.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Animal</label>
                <select className="form-control" value={animalId} onChange={(e) => setAnimalId(e.target.value)}>
                    <option value="">Select an Animal</option>
                    {animals.map((animal) => (
                        <option key={animal.id} value={animal.id}>
                            {animal.name} ({animal.species})
                        </option>
                    ))}
                </select>
            </div>
            <button className="btn btn-primary" onClick={handleCreateAppointment}>Add Appointment</button>
            <br />
            <br />
            <div className="form-group">
                <label>Search by Doctor and Date Range</label>
                <select className="form-control" value={searchedDoctorId} onChange={(e) => setSearchedDoctorId(e.target.value)}>
                    <option value="">Select a Doctor</option>
                    {doctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.id}>
                            {doctor.name}
                        </option>
                    ))}
                </select>
                <div className="input-group">
                    <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <input type="date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button" onClick={handleSearchByDoctorAndDateRange}>Search</button>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label>Search by Animal and Date Range</label>
                <select className="form-control" value={searchedAnimalId} onChange={(e) => setSearchedAnimalId(e.target.value)}>
                    <option value="">Select an Animal</option>
                    {animals.map((animal) => (
                        <option key={animal.id} value={animal.id}>
                            {animal.name} ({animal.species})
                        </option>
                    ))}
                </select>
                <div className="input-group">
                    <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <input type="date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button" onClick={handleSearchByAnimalAndDateRange}>Search</button>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-center" />
            <br />
            <br />
            <h2>Appointments</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Appointment Date</th>
                        <th>Doctor</th>
                        <th>Animal</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{editAppointmentId === appointment.id ? <input type="datetime-local" className="form-control" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} /> : appointment.appointmentDate}</td>
                            <td>{editAppointmentId === appointment.id ? (
                                <select className="form-control" value={doctorId} onChange={(e) => setDoctorId(e.target.value)}>
                                    <option value="">Select a Doctor</option>
                                    {doctors.map((doctor) => (
                                        <option key={doctor.id} value={doctor.id}>
                                            {doctor.name}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                appointment.doctor?.name || 'Unknown Doctor'
                            )}</td>
                            <td>{editAppointmentId === appointment.id ? (
                                <select className="form-control" value={animalId} onChange={(e) => setAnimalId(e.target.value)}>
                                    <option value="">Select an Animal</option>
                                    {animals.map((animal) => (
                                        <option key={animal.id} value={animal.id}>
                                            {animal.name} ({animal.species})
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                appointment.animal?.name || 'Unknown Animal'
                            )}</td>
                            <td>
                                {editAppointmentId === appointment.id ? (
                                    <div className="btn-group">
                                        <button className="btn btn-primary" onClick={() => handleUpdateAppointment(appointment.id)}><i className='bi bi-check'></i></button>
                                        <button className="btn btn-secondary" onClick={handleCancelEdit}><i className='bi bi-x'></i></button>
                                    </div>
                                ) : (
                                    <div className="btn-group">
                                        <button className="btn btn-primary" onClick={() => handleEditClick(appointment)}><i className='bi bi-pencil'></i></button>
                                        <button className="btn btn-danger" onClick={() => handleDeleteAppointment(appointment.id)}><i className='bi bi-trash'></i></button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AppointmentsManagement;