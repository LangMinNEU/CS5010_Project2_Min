# Gogo - Air Travel Planner

## Summary
This is a functional programming project for course CS5010. Gogo is an air travel planner that helps people search for airfare and arrange travel plans. This app also use Firestore to save data.

- Users can
  - search for flights by entering multiple destinations and the number of days they plan to stay at each location 
  - save search results as a plan
  - view, rename, and delete a plan

## Author
Lang Min

## Working Files
- ./index.html
- ./src/main.jsx
- ./src/pages/PageTemplate.jsx
- ./src/pages/SearchPage.jsx
- ./src/pages/PlanPage.jsx
- ./src/components/SearchForm.jsx
- ./src/components/AllPlans.jsx
- ./src/database/FirebaseData.js
- ./README.md
- ./Demonstration.md

## How To Run
This app is deployed, so users can directly run by <br>
[Click Here](https://neu-cs5010-project2-min.firebaseapp.com/)

In case the deployment goes wrong, you can clone the project and follow these steps <br>
To run the code, in terminal run
```bash
npm install
```
Then, run
```bash
npm run dev
```

## Video
NEU CS5010 Project2 Introduction Video <br>
[Watch on YouTube](https://youtu.be/HFRyaINY4DM)

Functional Programming Code Demonstration <br>
[Watch on YouTube](https://youtu.be/3i2ivskEUxM)

## Gen AI Usage
### Usage 1
I asked ChatGPT 4o what components can suit my need of a search page. I referred the answer it provided. <br>
Prompt: I have a SearchPage.jsx. I want this page to show some input boxes that ask users to input city from and to, as well as the days to stay, like a multiple-way air travel input. Provide me some components. <br>
Answer: <br>
SearchPage.jsx (Main Page)
```javascript
import { useState } from "react";
import SearchForm from "../components/SearchForm";
const SearchPage = () => {
  const [searchData, setSearchData] = useState([]);
  const handleSearch = (data) => {
    setSearchData(data);
    console.log("User Input:", data);
  };
  return (
    <div>
      <h1>Plan Your Multi-City Trip</h1>
      <SearchForm onSearch={handleSearch} />
      {searchData.length > 0 && (
        <div>
          <h2>Your Itinerary</h2>
          <ul>
            {searchData.map((item, index) => (
              <li key={index}>
                {item.from} → {item.to}, Stay: {item.days} days
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default SearchPage;
```
SearchForm.jsx (Form for User Input)
```javascript
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
          />
          <input
            type="text"
            placeholder="To City"
            value={trip.to}
            onChange={(e) => handleChange(index, "to", e.target.value)}
          />
          <input
            type="number"
            placeholder="Days"
            value={trip.days}
            onChange={(e) => handleChange(index, "days", e.target.value)}
          />
          {trips.length > 1 && (
            <button type="button" onClick={() => removeTrip(index)}>Remove</button>
          )}
        </div>
      ))}
      <button type="button" onClick={addTrip}>+ Add Another Trip</button>
      <button type="submit">Search Flights</button>
    </form>
  );
};
export default SearchForm;
```

### Usage 2
I asked ChatGPT 4o about how to display fetched data on pages. I studied and modified the answer it provided. <br>
Prompt: Now in src/database/FirebaseData.js, I have my firestore and data ready to use. How to show the result based on user input of cities? <br>
Answer: <br>
```javascript
import { useState } from "react";
import SearchForm from "../components/SearchForm";
import { searchFlights } from "../database/FirebaseData";
const SearchPage = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSearch = async (searchData) => {
    setLoading(true);
    setError(null);
    setFlights([]);
    try {
      const results = await searchFlights(searchData[0].from, searchData[0].to);
      setFlights(results);
    } catch (err) {
      setError("Failed to fetch flight data");
    }
    setLoading(false);
  };
  return (
    <div>
      <h1>Search Flights</h1>
      <SearchForm onSearch={handleSearch} />
      {loading && <p>Loading flights...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {flights.length > 0 ? (
        <ul>
          {flights.map((flight) => (
            <li key={flight.id}>
              {flight.from} → {flight.to}, Price: ${flight.price}
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No flights found</p>
      )}
    </div>
  );
};
export default SearchPage;
```

### Usage 3
I asked ChatGPT 4o about any console error when running the program by directly copying the error message as prompt.

### Usage 4
I asked ChatGPT 4o about the deployment of my app using Firebase, and I followed the instruction it provided. <br>
Prompt: How to deploy a web app using Firebase? <br>
Answer: <br>
```bash
npm install -g firebase-tools
firebase login
firebase init
npm run build
firebase deploy
```

### Usage 5
I asked ChatGPT 4o that whether my code is containing functional programming principles, array methods, and design patterns. I referred some of the answers.

### Usage 6
I asked ChatGPT 4o to provide a counterexample for each of the listed functional programming concepts, array methods, and design patterns.

