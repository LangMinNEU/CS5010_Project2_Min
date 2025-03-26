# Functional Programming


### Pure Functions
In src/database/FirebaseData.js, I have
```javascript
async function searchFlights(index, from, to, stay) {}
```
It does not mutate outside state (other than calling Firestore).

### Pure Functions Counterexample
```javascript
let counter = 0;
function increment() {
    counter++; // depends on and changes external state
    return counter;
}
```


### Immutability
In src/components/AllPlans.jsx, I have
```javascript
const [plans, setPlans] = useState([]);
```
It does not mutate state directly but creates new arrays/objects when updating UI state.

### Immutability Counterexample
```javascript
const user = { name: "Alice" };
function rename(user) {
  user.name = "Bob"; // directly mutating the original object
  return user;
}
```


### First-class Functions
In src/components/AllPlans.jsx, I have
```javascript
<button onClick={() => handleDelete(plan.id)}>Delete Plan</button>
```
It passes functions as props, which is first-class function.

### First-class Functions Counterexample
```javascript
function execute(fn) {
  return fn(); // valid
}
execute("not a function"); // ❌ passing a string, not a function
```


### Higher-order Functions
In src/components/AllPlans.jsx, I have
```javascript
{plans.map((plan, index) => (
    <div key={plan.id} > </div>
))}
```
Array methods like map() and filter() are both higher-order functions.

### Higher-order Functions Counterexample
```javascript
const numbers = [1, 2, 3];
const doubled = [];
for (let i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2); // imperative loop, no HOF like .map()
}
```


### Declarative over Imperative
In src/database/FirebaseData.js, I have
```javascript
const q = query(flightsRef, where("origin", "==", from), where("destination", "==", to), where("departure", ">=", noEarlier), where("departure", "<=", noLater), orderBy("price", "asc"), limit(1));
```
The query is declarative. We only declare what result I want.

### Declarative over Imperative Counterexample
```javascript
const ul = document.createElement("ul");
const items = ["Home", "About", "Contact"];
for (let i = 0; i < items.length; i++) {
  const li = document.createElement("li");
  li.textContent = items[i];
  ul.appendChild(li); // direct DOM manipulation
}
document.body.appendChild(ul);
```



# Array Method

### Map
In src/pages/SearchPage.jsx, I have
```javascript
{flights.map((flight, index) => (
    <li key={index}>
    Flight: {flight.flightId} | From {flight.origin} To {flight.destination} | Time: {flight.departure} | Price: ${flight.price}
    </li>
))}
```

### Map Counterexample
```javascript
const numbers = [1, 2, 3];
const doubled = [];
for (let i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2); // manual transformation
}
console.log(doubled); // [2, 4, 6]
```


### Filter
In src/components/SearchForm.jsx, I have
```javascript
const removeTrip = (index) => {
    const updatedTrips = trips.filter((_, i) => i !== index);
    setTrips(updatedTrips);
};
```

### Filter Counterexample
```javascript
const numbers = [1, 2, 3, 4, 5];
const evens = [];
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    evens.push(numbers[i]); // manual filtering
  }
}
console.log(evens); // [2, 4]
```


### Reduce Counterexample
```javascript
const numbers = [1, 2, 3, 4];
let total = 0;
for (let i = 0; i < numbers.length; i++) {
  total += numbers[i]; // manual accumulation
}
console.log(total); // 10
```



# Design Pattern

### Module
In src/components/AllPlans.jsx, I have
```javascript
import { myDatabase } from "../database/FirebaseData.js";
```
The function encapsulate all Firestore logic inside MyFirestoreHandler().

### Module Counterexample
```javascript
// Bad: no encapsulation, pollutes global scope
let userName = "Alice";
function login() {
  console.log(`${userName} logged in`);
}
function logout() {
  console.log(`${userName} logged out`);
}
// These variables/functions are globally accessible and modifiable
userName = "Bob"; // ❌ Easily changed externally
```


### Singleton
In JavaScript, when using ES Modules, each module is evaluated once, and the same instance (its exports) is cached and shared wherever it was imported.

### Singleton Counterexample
```javascript
// Bad: creates a new object every time
function createConfig() {
  return {
    env: "production",
    debug: false,
  };
}
const configA = createConfig();
const configB = createConfig();
console.log(configA === configB); // ❌ false — multiple instances!
```


### Factory
In file FirebaseData.js, I have
```javascript
function MyFirestoreHandler() {}
```
which is a factory function that builds and returns a customized object myFireStore with attached logic.

### Factory Counterexample
```javascript
// Bad: directly creates different car types in client code
function createSUV() {
  return { type: "SUV", seats: 7 };
}
function createSedan() {
  return { type: "Sedan", seats: 5 };
}
// Client code decides what to call — tight coupling
let myCar;
const choice = "sedan";
if (choice === "suv") {
  myCar = createSUV(); // ❌ Exposes implementation details
} else {
  myCar = createSedan();
}
```

