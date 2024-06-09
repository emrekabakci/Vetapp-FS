import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ReportsManagement = () => {
    const [reports, setReports] = useState([]);
    const [title, setTitle] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [price, setPrice] = useState(0);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState('');
    const [editReportId, setEditReportId] = useState(null);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchReports();
        fetchAppointments();
    }, []);

    useEffect(() => {
        console.log('Appointments:', appointments);
    }, [appointments]);

    useEffect(() => {
        console.log('Reports:', reports);
    }, [reports]);

    const fetchReports = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/reports');
            console.log('Reports API Response:', response.data);
            setReports(Array.isArray(response.data.content) ? response.data.content : []);
        } catch (error) {
            toast.error('Failed to fetch reports.');
            console.error('Error fetching reports:', error);
        }
    };

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/appointments');
            console.log('Appointments API Response:', response.data);
            setAppointments(Array.isArray(response.data.content) ? response.data.content : []);
        } catch (error) {
            toast.error('Failed to fetch appointments.');
            console.error('Error fetching appointments:', error);
        }
    };

    const handleCreateReport = async () => {
        try {
            const reportRequest = {
                title,
                diagnosis,
                price,
                appointmentId: selectedAppointmentId
            };
            await axios.post('http://localhost:8080/api/v1/reports', reportRequest);
            toast.success('Report created successfully!');
            fetchReports();
            resetForm();
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to create report.';
            toast.error(errorMessage);
            console.error('Error creating report:', error);
        }
    };

    const handleDeleteReport = async (reportId) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/reports/${reportId}`);
            toast.success('Report deleted successfully!');
            fetchReports();
        } catch (error) {
            toast.error('Failed to delete report.');
            console.error('Error deleting report:', error);
        }
    };

    const handleUpdateReport = async (reportId) => {
        try {
            const reportRequest = {
                title,
                diagnosis,
                price,
                appointmentId: selectedAppointmentId
            };
            await axios.put(`http://localhost:8080/api/v1/reports/${reportId}`, reportRequest);
            toast.success('Report updated successfully!');
            fetchReports();
            setEditReportId(null);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to update report.';
            toast.error(errorMessage);
            console.error('Error updating report:', error);
        }
    };

    const handleEditClick = (report) => {
        setEditReportId(report.id);
        setTitle(report.title);
        setDiagnosis(report.diagnosis);
        setPrice(report.price);
        setSelectedAppointmentId(report.appointmentId);
    };

    const handleCancelEdit = () => {
        setEditReportId(null);
        resetForm();
    };

    const resetForm = () => {
        setTitle('');
        setDiagnosis('');
        setPrice(0);
        setSelectedAppointmentId('');
    };

    return (
        <div className='component'>
            <h2>Reports Management</h2>
            <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Diagnosis</label>
                <input type="text" className="form-control" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Price</label>
                <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Appointment</label>
                <select className="form-control" value={selectedAppointmentId} onChange={(e) => setSelectedAppointmentId(e.target.value)}>
                    <option value="">Select an Appointment</option>
                    {appointments.map((appointment) => (
                        <option key={appointment.id} value={appointment.id}>
                            {appointment.appointmentDate} - {appointment.doctor.name} - {appointment.animal.name}
                        </option>
                    ))}
                </select>
            </div>
            <button className="btn btn-primary" onClick={handleCreateReport}>Add Report</button>
            <br />
            <br />
            <ToastContainer position="top-center" />
            <br />
            <br />
            <h2>Reports</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Diagnosis</th>
                        <th>Price</th>
                        <th>Appointment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report) => (
                        <tr key={report.id}>
                            <td>{editReportId === report.id ? <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} /> : report.title}</td>
                            <td>{editReportId === report.id ? <input type="text" className="form-control" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} /> : report.diagnosis}</td>
                            <td>{editReportId === report.id ? <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} /> : report.price}</td>
                            <td>{editReportId === report.id ? (
                                <select className="form-control" value={selectedAppointmentId} onChange={(e) => setSelectedAppointmentId(e.target.value)}>
                                    <option value="">Select an Appointment</option>
                                    {appointments.map((appointment) => (
                                        <option key={appointment.id} value={appointment.id}>
                                            {appointment.appointmentDate} - {appointment.doctor.name} - {appointment.animal.name}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                `${report.appointment?.appointmentDate || ''} - ${report.doctor?.name || ''} - ${report.animal?.name || ''}`
                            )}</td>
                            <td>
                                {editReportId === report.id ? (
                                    <div className="btn-group">
                                        <button className="btn btn-primary" onClick={() => handleUpdateReport(report.id)}>Save</button>
                                        <button className="btn btn-secondary" onClick={handleCancelEdit}>Cancel</button>
                                    </div>
                                ) : (
                                    <div className="btn-group">
                                        <button className="btn btn-primary" onClick={() => handleEditClick(report)}>Edit</button>
                                        <button className="btn btn-danger" onClick={() => handleDeleteReport(report.id)}>Delete</button>
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

export default ReportsManagement;