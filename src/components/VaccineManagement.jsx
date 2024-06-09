import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const VaccineManagement = () => {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [protectionStartDate, setProtectionStartDate] = useState('');
    const [protectionFinishDate, setProtectionFinishDate] = useState('');
    const [selectedAnimalId, setSelectedAnimalId] = useState('');
    const [animals, setAnimals] = useState([]);
    const [vaccinations, setVaccinations] = useState([]);
    const [editVaccineId, setEditVaccineId] = useState(null);
    const [searchedAnimalId, setSearchedAnimalId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        fetchVaccinations();
        fetchAnimals();
    }, []);

    const fetchVaccinations = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/vaccinations');
            setVaccinations(Array.isArray(response.data.content) ? response.data.content : []);
        } catch (error) {
            toast.error('Failed to fetch vaccinations.');
            console.error(error);
        }
    };

    const fetchAnimals = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/animals');
            setAnimals(Array.isArray(response.data.content) ? response.data.content : []);
        } catch (error) {
            toast.error('Failed to fetch animals.');
            console.error(error);
        }
    };

    const handleCreateVaccine = async () => {
        try {
            const vaccineRequest = {
                name,
                code,
                protectionStartDate,
                protectionFinishDate,
                animalWithoutCustomer: { id: selectedAnimalId }
            };
            await axios.post('http://localhost:8080/api/v1/vaccinations', vaccineRequest);
            toast.success('Vaccine created successfully!');
            fetchVaccinations();
            resetForm();
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to create vaccine.';
            toast.error(errorMessage);
            console.error(error);
        }
    };

    const handleDeleteVaccine = async (vaccineId) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/vaccinations/${vaccineId}`);
            toast.success('Vaccine deleted successfully!');
            fetchVaccinations();
        } catch (error) {
            toast.error('Failed to delete vaccine.');
            console.error(error);
        }
    };

    const handleUpdateVaccine = async (vaccineId) => {
        try {
            const vaccineRequest = {
                name,
                code,
                protectionStartDate,
                protectionFinishDate,
                animalWithoutCustomer: { id: selectedAnimalId }
            };
            await axios.put(`http://localhost:8080/api/v1/vaccinations/${vaccineId}`, vaccineRequest);
            toast.success('Vaccine updated successfully!');
            fetchVaccinations();
            setEditVaccineId(null);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to update vaccine.';
            toast.error(errorMessage);
            console.error(error);
        }
    };

    const handleEditClick = (vaccine) => {
        setEditVaccineId(vaccine.id);
        setName(vaccine.name);
        setCode(vaccine.code);
        setProtectionStartDate(vaccine.protectionStartDate);
        setProtectionFinishDate(vaccine.protectionFinishDate);
        setSelectedAnimalId(vaccine.animalWithoutCustomer?.id || '');
    };

    const handleCancelEdit = () => {
        setEditVaccineId(null);
        resetForm();
    };

    const resetForm = () => {
        setName('');
        setCode('');
        setProtectionStartDate('');
        setProtectionFinishDate('');
        setSelectedAnimalId('');
    };

    const handleSearchByAnimalId = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/vaccinations/searchByAnimal?id=${searchedAnimalId}`);
            setVaccinations(Array.isArray(response.data.content) ? response.data.content : []);
        } catch (error) {
            toast.error('Failed to fetch vaccinations by animal ID.');
            console.error(error);
        }
    };

    const handleSearchByVaccinationRange = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/vaccinations/searchByVaccinationRange?startDate=${startDate}&endDate=${endDate}`);
            setVaccinations(Array.isArray(response.data.content) ? response.data.content : []);
        } catch (error) {
            toast.error('Failed to fetch vaccinations by date range.');
            console.error(error);
        }
    };

    return (
        <div className='component'>
            <h2>Vaccine Management</h2>
            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            </div>
            <div className="form-group">
                <label>Code</label>
                <input type="text" className="form-control" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Code" />
            </div>
            <div className="form-group">
                <label>Protection Start Date</label>
                <input type="date" className="form-control" value={protectionStartDate} onChange={(e) => setProtectionStartDate(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Protection Finish Date</label>
                <input type="date" className="form-control" value={protectionFinishDate} onChange={(e) => setProtectionFinishDate(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Animal</label>
                <select className="form-control" value={selectedAnimalId} onChange={(e) => setSelectedAnimalId(e.target.value)}>
                    <option value="">Select an Animal</option>
                    {animals.map((animal) => (
                        <option key={animal.id} value={animal.id}>
                            {animal.name} ({animal.species})
                        </option>
                    ))}
                </select>
            </div>
            <button className="btn btn-primary" onClick={handleCreateVaccine}>Add Vaccine</button>
            <br />
            <br />
            <div className="form-group">
                <label>Search by Animal</label>
                <select className="form-control" value={searchedAnimalId} onChange={(e) => setSearchedAnimalId(e.target.value)}>
                    <option value="">Select an Animal</option>
                    {animals.map((animal) => (
                        <option key={animal.id} value={animal.id}>
                            {animal.name} ({animal.species})
                        </option>
                    ))}
                </select>
                <br />
                <button className="btn btn-primary" type="button" onClick={handleSearchByAnimalId}>Search</button>
                <button className='btn btn-primary' type='button' onClick={fetchVaccinations}>Show All</button>
            </div>
            <div className="form-group">
                <label>Search by Vaccination Date Range</label>
                <div className="input-group">
                    <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <input type="date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    <div className="input-group-append">
                    </div>
                </div>
                <br />
                <button className="btn btn-primary" type="button" onClick={handleSearchByVaccinationRange}>Search</button>
            </div>
            <ToastContainer position="top-center" />
            <br />
            <br />
            <h2>Vaccinations</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Protection Start Date</th>
                        <th>Protection Finish Date</th>
                        <th>Animal</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {vaccinations.map((vaccine) => (
                        <tr key={vaccine.id}>
                            <td>{editVaccineId === vaccine.id ? <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} /> : vaccine.name}</td>
                            <td>{editVaccineId === vaccine.id ? <input type="text" className="form-control" value={code} onChange={(e) => setCode(e.target.value)} /> : vaccine.code}</td>
                            <td>{editVaccineId === vaccine.id ? <input type="date" className="form-control" value={protectionStartDate} onChange={(e) => setProtectionStartDate(e.target.value)} /> : vaccine.protectionStartDate}</td>
                            <td>{editVaccineId === vaccine.id ? <input type="date" className="form-control" value={protectionFinishDate} onChange={(e) => setProtectionFinishDate(e.target.value)} /> : vaccine.protectionFinishDate}</td>
                            <td>{editVaccineId === vaccine.id ? (
                                <select className="form-control" value={selectedAnimalId} onChange={(e) => setSelectedAnimalId(e.target.value)}>
                                    <option value="">Select an Animal</option>
                                    {animals.map((animal) => (
                                        <option key={animal.id} value={animal.id}>
                                            {animal.name} ({animal.species})
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                vaccine.animalWithoutCustomer
                                    ? `${vaccine.animalWithoutCustomer.name} (${vaccine.animalWithoutCustomer.species})`
                                    : 'Unknown Animal'
                            )}</td>
                            <td>
                                {editVaccineId === vaccine.id ? (
                                    <div className="btn-group">
                                        <button className="btn btn-primary" onClick={() => handleUpdateVaccine(vaccine.id)}><i className='bi bi-check'></i></button>
                                        <button className="btn btn-secondary" onClick={handleCancelEdit}><i className='bi bi-x'></i></button>
                                    </div>
                                ) : (
                                    <div className="btn-group">
                                        <button className="btn btn-primary" onClick={() => handleEditClick(vaccine)}><i className='bi bi-pencil'></i></button>
                                        <button className="btn btn-danger" onClick={() => handleDeleteVaccine(vaccine.id)}><i className='bi bi-trash'></i></button>
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

export default VaccineManagement;