import { useEffect, useState } from "react";
import { myDatabase } from "../database/FirebaseData.js";

const AllPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      const plansData = await myDatabase.getAllPlans();
      setPlans(plansData);
      setLoading(false);
    };

    fetchPlans();
  }, []);
  

  if (loading) return <p>Loading saved plans...</p>;
  if (plans.length === 0) return <p>No saved plans found.</p>;

  return (
    <div>
      {plans.map((plan, index) => (
        <div key={plan.id} style={{ border: "1px solid black", padding: "10px", marginBottom: "10px" }}>
          <h3>Plan {index + 1}</h3>
          <ul>
            {plan.flights.map((flight, i) => (
              <li key={i}>
                Flight: {flight.flightId} | From {flight.origin} To {flight.destination} | Time: {flight.departure} | Price: ${flight.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AllPlans;
