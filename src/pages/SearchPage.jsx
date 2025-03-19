import { useState } from "react";

import PageTemplate from "./PageTemplate.jsx";
import SearchForm from "../components/SearchForm.jsx";

import { myDatabase } from "../database/FirebaseData.js";

// import myDatabase from "../database/FirebaseData.js";

export default function SearchPage() {

    const [searchData, setSearchData] = useState([]);
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [plans, setPlans] = useState([]);

    // const handleSearch = (data) => {
    //     setSearchData(data);
    //     console.log("User Input:", data);
    // };
    const handleSearch = async (searchData) => {
        setLoading(true);
        setError(null);
        setFlights([]);
    
        try {
            let allResults = [];
            let i = 0;
            let daysStay = 0;
            for (const trip of searchData) {
                const results = await myDatabase.searchFlights(++i, trip.from, trip.to, daysStay);
                daysStay += parseInt(trip.days);
                console.log(`DaysStay is ${daysStay}`);
                // const results = await myDatabase.searchFlights(trip.from, trip.to);
                allResults = [...allResults, ...results.map(flight => ({ ...flight, days: trip.days }))];
            }
            setFlights(allResults);
        } catch (err) {
            setError("Failed to fetch flight data");
        }
    
        setLoading(false);
    };

    const handleSavePlan = async (flights) => {
        try {
            if (flights.length === 0) return;
            const result = await myDatabase.savePlan(flights); // Save to Firestore
            setPlans(result)
        } catch (err) {
            setError("Failed to save plan");
        }
    
    };

    return (
        <PageTemplate>
            <div>
            <h2>Beta Version</h2>
            <p>
                Due to the simulated data, available flights are only from March 1st to March 7th. 
                It includes only direct flight between any two of these three cities: San Francisco, San Diego, and Atlanta.
                We apologize for the inconvenience.
            </p>
            <br></br>
            <h2>Search for your flights</h2>
            <br></br>
            <SearchForm onSearch={handleSearch} />
            <br></br>
        
            <h3>Result</h3>
            {loading && <p>Loading flights...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        
            {flights.length > 0 ? (
                <>
                    <ul>
                    {flights.map((flight, index) => (
                        <li key={index}>
                        Flight: {flight.flightId} | From {flight.origin} To {flight.destination} | Time: {flight.departure} | Price: ${flight.price}
                        </li>
                    ))}
                    </ul>
                    <button onClick={() => handleSavePlan(flights)}>Save Plan</button>
                </>
            ) : (
                !loading && <p>No flights found</p>
            )}
            </div>
        </PageTemplate>
    );
}