import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [sites, setSites] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        pfas_level: '',
        lat: '',
        lng: ''
    });

    // Fetch existing sites
    const fetchSites = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/sites');
            const data = await response.json();
            // MapLibre expects GeoJSON, but our API returns it wrapped. 
            // Depending on your API structure, accessing .features is usually correct for GeoJSON.
            setSites(data.features || []);
        } catch (err) {
            console.error("Failed to fetch sites:", err);
        }
    };

    useEffect(() => {
        fetchSites();
    }, []);

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Submit New Site
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch('http://localhost:5000/api/sites', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            alert('Site Added Successfully!');
            fetchSites(); // Refresh list
            setFormData({ name: '', pfas_level: '', lat: '', lng: '' }); // Clear form
        } catch (err) {
            console.error(err);
            alert('Error adding site');
        }
    };

    // Delete Site
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this site?")) return;
        try {
            await fetch(`http://localhost:5000/api/sites/${id}`, { method: 'DELETE' });
            fetchSites(); // Refresh list
        } catch (err) {
            console.error(err);
            alert('Error deleting site');
        }
    };

    return (
        // 1. SCROLL WRAPPER: Handles the full-screen scroll behavior
        <div className="admin-scroll-wrapper">
            
            {/* 2. CONTENT CONTAINER: Centers the content */}
            <div className="admin-container">
                <h1>Admin Dashboard - PFAS Tracker</h1>
                
                {/* --- CREATE FORM --- */}
                <div className="admin-section">
                    <h2>Add New Contamination Site</h2>
                    <form onSubmit={handleSubmit} className="admin-form">
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Site Name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            type="number" 
                            name="pfas_level" 
                            placeholder="PFAS Level (ppt)" 
                            value={formData.pfas_level} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            type="number" 
                            step="any" 
                            name="lat" 
                            placeholder="Latitude (e.g. 12.97)" 
                            value={formData.lat} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            type="number" 
                            step="any" 
                            name="lng" 
                            placeholder="Longitude (e.g. 77.59)" 
                            value={formData.lng} 
                            onChange={handleChange} 
                            required 
                        />
                        <button type="submit">Add Site</button>
                    </form>
                </div>

                {/* --- LIST & DELETE --- */}
                <div className="admin-section">
                    <h2>Manage Existing Sites</h2>
                    <ul className="site-list">
                        {sites.length > 0 ? (
                            sites.map((site) => (
                                <li key={site.properties.id} className="site-item">
                                    <span>
                                        <strong>{site.properties.name}</strong> 
                                        {' '}(Level: {site.properties.level})
                                    </span>
                                    <button 
                                        onClick={() => handleDelete(site.properties.id)} 
                                        className="delete-btn"
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))
                        ) : (
                            <p>No sites found.</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;