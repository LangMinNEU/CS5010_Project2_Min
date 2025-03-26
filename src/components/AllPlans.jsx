import { useEffect, useState } from "react";
import { myDatabase } from "../database/FirebaseData.js";

export const AllPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchPlans = async () => {
  //     const plansData = await myDatabase.getAllPlans();
  //     setPlans(plansData);
  //     setLoading(false);
  //   };

  //   fetchPlans();
  // }, []);

  // const fetchPlans = async () => {
  //   const plansData = await getAllPlans();
  //   setPlans(plansData);
  //   setLoading(false);
  // };
  const fetchPlans = async () => {
    try {
      const plansData = await myDatabase.getAllPlans();
      console.log("Fetched plans:", plansData); // 🐞 Debug log
      setPlans(plansData || []);
    } catch (err) {
      console.error("Error fetching plans:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleDelete = async (id) => {
    await myDatabase.deletePlan(id);
    // fetchPlans(); // Refresh UI after delete
  };

  const handleUpdate = async (id) => {
    const newName = prompt("Enter a new name for this plan:");
    if (newName) {
      await myDatabase.updatePlan(id, { name: newName });
      // fetchPlans(); // Refresh UI after update
    }
  };

  if (loading) return <p>Loading saved plans...</p>;
  if (plans.length === 0) return <p>No saved plans found.</p>;

  return (
    <div>
      {plans.map((plan, index) => (
        
        <div key={plan.id} style={{ border: "1px solid black", padding: "10px", marginBottom: "10px" }}>
          <h3>{plan.name || `Plan ${index + 1}`}</h3>
          <ul>
            {plan.flights.map((flight, i) => (
              <li key={i}>
                Flight: {flight.flightId} | From {flight.origin} To {flight.destination} | Time: {flight.departure} | Price: ${flight.price}
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button onClick={() => handleUpdate(plan.id)}>Edit Plan Name</button>
            <button onClick={() => handleDelete(plan.id)}>Delete Plan</button>
          </div>
        </div>
      ))}
    </div>
  );
};
