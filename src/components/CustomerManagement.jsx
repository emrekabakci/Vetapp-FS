import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const CustomerManagement = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [customers, setCustomers] = useState([]);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [searchName, setSearchName] = useState('');

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('https://statistical-meagan-emrekabakci-205b6144.koyeb.app/api/v1/customers');
            setCustomers(response.data.content);
        } catch (error) {
            toast.error('Failed to fetch customers.');
            console.error(error);
        }
    };

    const searchCustomersByName = async (name) => {
        try {
            const response = await axios.get(`https://statistical-meagan-emrekabakci-205b6144.koyeb.app/api/v1/customers/searchByName?name=${name}`);
            setCustomers(response.data.content);
        } catch (error) {
            toast.error('Failed to search customers.');
            console.error(error);
        }
    };

    const handleCreateCustomer = async () => {
        try {
            const response = await axios.post('https://statistical-meagan-emrekabakci-205b6144.koyeb.app/api/v1/customers', {
                name,
                phone,
                email,
                address,
                city
            });
            toast.success('Customer created successfully!');
            fetchCustomers();
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to create customer.';
            toast.error(errorMessage);
            console.error(error);
        }
    };

    const handleDeleteCustomer = async (customerId) => {
        try {
            await axios.delete(`https://statistical-meagan-emrekabakci-205b6144.koyeb.app/api/v1/customers/${customerId}`);
            toast.success('Customer deleted successfully!');
            fetchCustomers();
        } catch (error) {
            toast.error('Failed to delete customer.');
            console.error(error);
        }
    };

    const handleEditCustomer = (customer) => {
        setEditingCustomer(customer);
    };

    const handleUpdateCustomer = async () => {
        try {
            await axios.put(`https://statistical-meagan-emrekabakci-205b6144.koyeb.app/api/v1/customers/${editingCustomer.id}`, {
                name: editingCustomer.name,
                phone: editingCustomer.phone,
                email: editingCustomer.email,
                address: editingCustomer.address,
                city: editingCustomer.city
            });
            toast.success('Customer updated successfully!');
            setEditingCustomer(null);
            fetchCustomers();
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to update customer.';
            toast.error(errorMessage);
            console.error(error);
        }
    };

    const handleChange = (e, field) => {
        setEditingCustomer({ ...editingCustomer, [field]: e.target.value });
    };

    return (
        <div className='component'>
            <h2>Customer Management</h2>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
            {editingCustomer ? (
                <button onClick={handleUpdateCustomer}>Update Customer</button>
            ) : (
                <button onClick={handleCreateCustomer}>Add Customer</button>
            )}
            <ToastContainer position="top-center" />
            <br />
            <br />

            <h2>Customers</h2>
            <div className="form-group">
                <input type="text" className="form-control" value={searchName} onChange={(e) => setSearchName(e.target.value)} placeholder="Search by Name" />
                <button className="btn btn-secondary mt-2" onClick={() => searchCustomersByName(searchName)}>Search</button>
                <button className="btn btn-secondary mt-2" onClick={fetchCustomers}>Show All</button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>City</th>
                        <th style={{ width: '150px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id}>
                            <td>
                                {editingCustomer?.id === customer.id ? (
                                    <input type="text" value={editingCustomer.name} onChange={(e) => handleChange(e, 'name')} />
                                ) : (
                                    customer.name
                                )}
                            </td>
                            <td>
                                {editingCustomer?.id === customer.id ? (
                                    <input type="email" value={editingCustomer.email} onChange={(e) => handleChange(e, 'email')} />
                                ) : (
                                    customer.email
                                )}
                            </td>
                            <td>
                                {editingCustomer?.id === customer.id ? (
                                    <input type="text" value={editingCustomer.phone} onChange={(e) => handleChange(e, 'phone')} />
                                ) : (
                                    customer.phone
                                )}
                            </td>
                            <td>
                                {editingCustomer?.id === customer.id ? (
                                    <input type="text" value={editingCustomer.address} onChange={(e) => handleChange(e, 'address')} />
                                ) : (
                                    customer.address
                                )}
                            </td>
                            <td>
                                {editingCustomer?.id === customer.id ? (
                                    <input type="text" value={editingCustomer.city} onChange={(e) => handleChange(e, 'city')} />
                                ) : (
                                    customer.city
                                )}
                            </td>
                            <td>
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    {editingCustomer?.id === customer.id ? (
                                        <button className="btn btn-primary mr-2" onClick={handleUpdateCustomer}>
                                            <i className="bi bi-check"></i>
                                        </button>
                                    ) : (
                                        <button className="btn btn-primary mr-2" onClick={() => handleEditCustomer(customer)}>
                                            <i className="bi bi-pencil"></i>
                                        </button>
                                    )}
                                    <button className="btn btn-danger" onClick={() => handleDeleteCustomer(customer.id)}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerManagement;
