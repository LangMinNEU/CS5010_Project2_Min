import { useState } from "react";

const SearchForm = ({ onSearch }) => {
    const [trips, setTrips] = useState([{ from: "", to: "", days: "" }]);
  
    const handleChange = (index, field, value) => {
        const updatedTrips = [...trips];
        updatedTrips[index][field] = value;
        setTrips(updatedTrips);
    };
  
    const addTrip = () => {
        setTrips([...trips, { from: "", to: "", days: "" }]);
    };
  
    const removeTrip = (index) => {
        const updatedTrips = trips.filter((_, i) => i !== index);
        setTrips(updatedTrips);
    };
  
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(trips);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        {trips.map((trip, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="From City"
              value={trip.from}
              onChange={(e) => handleChange(index, "from", e.target.value)}
              style={{ marginRight: "10px" }}
            />
            <input
              type="text"
              placeholder="To City"
              value={trip.to}
              onChange={(e) => handleChange(index, "to", e.target.value)}
              style={{ marginRight: "10px" }}
            />
            <input
              type="number"
              placeholder="Days"
              value={trip.days}
              onChange={(e) => handleChange(index, "days", e.target.value)}
              style={{ marginRight: "10px" }}
            />
            {trips.length > 1 && (
              <button type="button" onClick={() => removeTrip(index)}>Remove</button>
            )}
          </div>
        ))}
        <div style={{ marginBottom: "10px" }}>
          <button type="button" onClick={addTrip}>+ Add Another Trip</button>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <button type="submit">Search Flights</button>
        </div>
      </form>
    );
};
  
  export default SearchForm;