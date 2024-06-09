import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AnimalManagement = () => {
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [breed, setBreed] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [colour, setColour] = useState('');
    const [customer, setCustomer] = useState('');
    const [customers, setCustomers] = useState([]);
    const [animals, setAnimals] = useState([]);
    const [editAnimalId, setEditAnimalId] = useState(null);
    const [searchedCustomer, setSearchedCustomer] = useState('');
    const [searchedAnimalName, setSearchedAnimalName] = useState('');

    useEffect(() => {
        fetchCustomers();
        fetchAnimals();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/customers');
            setCustomers(Array.isArray(response.data.content) ? response.data.content : []);
        } catch (error) {
            toast.error('Failed to fetch customers.');
            console.error(error);
        }
    };

    const fetchAnimals = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/animals');
            console.log(response.data);
            setAnimals(Array.isArray(response.data.content) ? response.data.content : []);
        } catch (error) {
            toast.error('Failed to fetch animals.');
            console.error(error);
        }
    };

    const handleCreateAnimal = async () => {
        try {
            const animalRequest = {
                name,
                species,
                breed,
                gender,
                dateOfBirth,
                colour,
                customer: { id: customer }
            };
            await axios.post('http://localhost:8080/api/v1/animals', animalRequest);
            toast.success('Animal created successfully!');
            fetchAnimals();
            resetForm();
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to create animal.';
            toast.error(errorMessage);
            console.error(error);
        }
    };

    const handleDeleteAnimal = async (animalId) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/animals/${animalId}`);
            toast.success('Animal deleted successfully!');
            fetchAnimals();
        } catch (error) {
            toast.error('Failed to delete animal.');
            console.error(error);
        }
    };

    const handleUpdateAnimal = async (animalId) => {
        try {
            const animalRequest = {
                name,
                species,
                breed,
                gender,
                dateOfBirth,
                colour,
                customer: { id: customer }
            };
            await axios.put(`http://localhost:8080/api/v1/animals/${animalId}`, animalRequest);
            toast.success('Animal updated successfully!');
            fetchAnimals();
            setEditAnimalId(null);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to update animal.';
            toast.error(errorMessage);
            console.error(error);
        }
    };

    const handleEditClick = (animal) => {
        setEditAnimalId(animal.id);
        setName(animal.name);
        setSpecies(animal.species);
        setBreed(animal.breed);
        setGender(animal.gender);
        setDateOfBirth(animal.dateOfBirth);
        setColour(animal.colour);
        setCustomer(animal.customer.id);
    };

    const handleCancelEdit = () => {
        setEditAnimalId(null);
        resetForm();
    };

    const resetForm = () => {
        setName('');
        setSpecies('');
        setBreed('');
        setGender('');
        setDateOfBirth('');
        setColour('');
        setCustomer('');
    };

    const handleSearchByCustomer = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/animals/searchByCustomer?customerName=${searchedCustomer}`);
            console.log(response.data);
            setAnimals(Array.isArray(response.data.content) ? response.data.content : []);
        } catch (error) {
            toast.error('Failed to fetch animals for the customer.');
            console.error(error);
        }
    };

    const handleSearchByAnimalName = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/animals/searchByName?name=${searchedAnimalName}`);
            console.log(response.data);
            setAnimals(Array.isArray(response.data.content) ? response.data.content : []);
        } catch (error) {
            toast.error('Failed to fetch animals by name.');
            console.error(error);
        }
    };

    return (
        <div className='component'>
            <h2>Animal Management</h2>
            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            </div>
            <div className="form-group">
                <label>Species</label>
                <input type="text" className="form-control" value={species} onChange={(e) => setSpecies(e.target.value)} placeholder="Species" />
            </div>
            <div className="form-group">
                <label>Breed</label>
                <input type="text" className="form-control" value={breed} onChange={(e) => setBreed(e.target.value)} placeholder="Breed" />
            </div>
            <div className="form-group">
                <label>Gender</label>
                <input type="text" className="form-control" value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Gender" />
            </div>
            <div className="form-group">
                <label>Date of Birth</label>
                <input type="datetime-local" className="form-control" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Colour</label>
                <input type="text" className="form-control" value={colour} onChange={(e) => setColour(e.target.value)} placeholder="Colour" />
            </div>
            <div className="form-group">
                <label>Customer</label>
                <select className="form-control" value={customer} onChange={(e) => setCustomer(e.target.value)}>
                    <option value="">Select Customer</option>
                    {customers.map((cust) => (
                        <option key={cust.id} value={cust.id}>
                            {cust.name}
                        </option>
                    ))}
                </select>
            </div>
            <button className="btn btn-primary" onClick={handleCreateAnimal}>Add Animal</button>
            <br />
            <br />
            <div className="form-group">
                <label>Search by Customer Name</label>
                <div className="input-group">
                    <input type="text" className="form-control" value={searchedCustomer} onChange={(e) => setSearchedCustomer(e.target.value)} placeholder="Customer Name" />
                    <div className="input-group-append">
                    </div>
                </div>
                <br />
                <button className="btn btn-primary" type="button" onClick={handleSearchByCustomer}>Search</button>
                <button className='btn btn-primary' type='button' onClick={fetchAnimals}>Show All</button>
            </div>
            <div className="form-group">
                <label>Search by Animal Name</label>
                <div className="input-group">
                    <input type="text" className="form-control" value={searchedAnimalName} onChange={(e) => setSearchedAnimalName(e.target.value)} placeholder="Animal Name" />
                    <div className="input-group-append">
                    </div>
                </div>
                <br />
                <button className="btn btn-primary" type="button" onClick={handleSearchByAnimalName}>Search</button>
            </div>
            <ToastContainer position="top-center" />
            <br />
            <br />
            <h2>Animals</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Species</th>
                        <th>Breed</th>
                        <th>Gender</th>
                        <th>Date of Birth</th>
                        <th>Colour</th>
                        <th>Customer</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {animals.map((animal) => (
                        <tr key={animal.id}>
                            <td>{editAnimalId === animal.id ? <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} /> : animal.name}</td>
                            <td>{editAnimalId === animal.id ? <input type="text" className="form-control" value={species} onChange={(e) => setSpecies(e.target.value)} /> : animal.species}</td>
                            <td>{editAnimalId === animal.id ? <input type="text" className="form-control" value={breed} onChange={(e) => setBreed(e.target.value)} /> : animal.breed}</td>
                            <td>{editAnimalId === animal.id ? <input type="text" className="form-control" value={gender} onChange={(e) => setGender(e.target.value)} /> : animal.gender}</td>
                            <td>{editAnimalId === animal.id ? <input type="datetime-local" className="form-control" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} /> : animal.dateOfBirth}</td>
                            <td>{editAnimalId === animal.id ? <input type="text" className="form-control" value={colour} onChange={(e) => setColour(e.target.value)} /> : animal.colour}</td>
                            <td>{animal.customer.name}</td>
                            <td>
                                {editAnimalId === animal.id ? (
                                    <div className="btn-group">
                                        <button className="btn btn-primary" onClick={() => handleUpdateAnimal(animal.id)}><i className='bi bi-check'></i></button>
                                        <button className="btn btn-secondary" onClick={handleCancelEdit}><i className='bi bi-x'></i></button>
                                    </div>
                                ) : (
                                    <div className="btn-group">
                                        <button className="btn btn-primary" onClick={() => handleEditClick(animal)}><i className='bi bi-pencil'></i></button>
                                        <button className="btn btn-danger" onClick={() => handleDeleteAnimal(animal.id)}><i className='bi bi-trash'></i></button>
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

export default AnimalManagement;