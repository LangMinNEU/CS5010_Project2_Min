import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    doc,
    updateDoc,
    query,
    where,
} from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



function MyFirestoreHandler() {
    const myFireStore = {};

    // const firebaseConfig = {
    //     apiKey: "YOUR_API_KEY",
    //     authDomain: "YOUR_AUTH_DOMAIN",
    //     projectId: "YOUR_PROJECT_ID",
    //     storageBucket: "YOUR_STORAGE_BUCKET",
    //     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    //     appId: "YOUR_APP_ID"
    // };

    // // Initialize Firebase
    // const app = initializeApp(firebaseConfig);
    // const db = getFirestore(app);

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyDJr7j_RD11aFU098QJGJR8xWc39u1us7A",
        authDomain: "neu-cs5010-project2-min.firebaseapp.com",
        projectId: "neu-cs5010-project2-min",
        storageBucket: "neu-cs5010-project2-min.firebasestorage.app",
        messagingSenderId: "381413991324",
        appId: "1:381413991324:web:3b6b03738e3d94cea85e59",
        measurementId: "G-M7W07JWZXG"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const db = getFirestore(app);

    

    async function getFlights() {
        const flightsCol = collection(db, "flights");
        const flightsSnapshot = await getDocs(flightsCol);
        const flightsList = flightsSnapshot.docs.map((doc) => doc.data());
        console.log("Flights: ", flightsList);
        return flightsList;
    }

    async function getPlans() {
        const plansCol = collection(db, "plans");
        const plansSnapshot = await getDocs(plansCol);
        const plansList = flightsSnapshot.docs.map((doc) => doc.data());
        console.log("Plans: ", plansList);
        return plansList;
    }

    async function searchFlights(from, to) {
        try {
            const flightsRef = collection(db, "flights");
            const q = query(flightsRef, where("origin", "==", from), where("destination", "==", to));
            const querySnapshot = await getDocs(q);
            const results = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return results;
        } catch (error) {
            console.error("Error searching flights:", error);
            return [];
        }
    }

    myFireStore.getFlights = getFlights;
    myFireStore.getPlans = getPlans;
    myFireStore.searchFlights = searchFlights;

    return myFireStore;
      
}

const myDatabase = new MyFirestoreHandler();

export { myDatabase };