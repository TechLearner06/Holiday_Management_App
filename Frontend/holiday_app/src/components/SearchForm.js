import React, { useState } from "react";
import axios from "axios";
import "../App.css"

const SearchForm = () => {
    const [country, setCountry] = useState("");
    const [year, setYear] = useState("");
    const [holidays, setHolidays] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); 
        setLoading(true);

        try {
            const response = await axios.get("http://127.0.0.1:8000/api/holidays/", {
                params: { country, year },
            });
            setHolidays(response.data);
        } catch (err) {
            console.error("Error fetching holidays:", err);
            setError("Unable to fetch holiday data. Please try again.");
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="search-form">
                <div>
                    <label>Country (ISO Code):</label>
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Year:</label>
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{loading ? 'Loading...' : 'Search Holidays'}</button>
            </form>

            {error && <p className="error">{error}</p>}

            <div>
                <h2 className="title">Holiday List</h2>
                {holidays.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Country</th>
                                <th>Date</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {holidays.map((holiday, index) => (
                                <tr key={index}>
                                    <td>{holiday.name}</td>
                                    <td>{holiday.description || "N/A"}</td>
                                    <td>{holiday.country.name}</td>
                                    <td>{holiday.date.iso}</td>
                                    <td>{holiday.type.join(", ")}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No holidays found for the selected country and year.</p>
                )}
            </div>
        </div>
    );
};

export default SearchForm;
