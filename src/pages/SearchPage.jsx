import { useState } from "react";

import PageTemplate from "./PageTemplate";
import SearchForm from "../components/SearchForm";

import { myDatabase } from "../database/FirebaseData";

// import myDatabase from "../database/FirebaseData.js";

export default function SearchPage() {

    // const [searchData, setSearchData] = useState([]);
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
            for (const trip of searchData) {
                const results = await myDatabase.searchFlights(trip.from, trip.to);
                // const results = await myDatabase.searchFlights(trip.from, trip.to);
                allResults = [...allResults, ...results.map(flight => ({ ...flight, days: trip.days }))];
            }
            setFlights(allResults);
        } catch (err) {
            setError("Failed to fetch flight data");
        }
    
        setLoading(false);
    };

    // async function searchFlights() {

    // }

    // return (
    //     <PageTemplate>
    //         <h2>Beta Version - All Trips Starts at March 1st</h2>
    //         <br></br>
    //         <h2>Search for your flights</h2>
    //         <br></br>
    //         <SearchForm onSearch={handleSearch} />
    //     </PageTemplate>
    // );

    return (
        <PageTemplate>
            <div>
            <h2>Beta Version - All Trips Starts at March 1st</h2>
            <br></br>
            <h2>Search for your flights</h2>
            <br></br>
            <SearchForm onSearch={handleSearch} />
        
            {loading && <p>Loading flights...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        
            {flights.length > 0 ? (
                <ul>
                {flights.map((flight, index) => (
                    <li key={index}>
                    From {flight.origin} To {flight.destination}, Price: ${flight.price}
                    </li>
                ))}
                </ul>
            ) : (
                !loading && <p>No flights found</p>
            )}
            </div>
        </PageTemplate>
    );
}