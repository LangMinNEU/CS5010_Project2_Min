import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    doc,
    updateDoc,
    query,
    where,
    orderBy,
    limit,
    addDoc
} from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



function MyFirestoreHandler() {
    const myFireStore = {};

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

    

    async function searchFlights(index, from, to, stay) {
        try {
            const noEarlier = stay * 10000 + 2503010000;
            const noLater = (stay + 1) * 10000 + 2503010000;
            // console.log(`noEarlier is ${noEarlier}, noLater is ${noLater}`);
            const flightsRef = collection(db, "flights");
            const q = query(flightsRef, where("origin", "==", from), where("destination", "==", to), where("departure", ">=", noEarlier), where("departure", "<=", noLater), orderBy("price", "asc"), limit(1));
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

    async function savePlan(flights) {
        try {
            const docRef = await addDoc(collection(db, "plans"), { flights });
            return docRef.id; // Return generated plan ID
        } catch (error) {
            console.error("Error saving plan:", error);
            return null;
        }
    }

    async function getAllPlans() {
        try {
            const plansCol = collection(db, "plans");
            const plansSnapshot = await getDocs(plansCol);
            const result = plansSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return result;
        } catch (error) {
            console.error("Error fetching all plans:", error);
            return [];
        }
    }

    // myFireStore.getFlights = getFlights;
    // myFireStore.getPlans = getPlans;
    myFireStore.searchFlights = searchFlights;
    myFireStore.savePlan = savePlan;
    myFireStore.getAllPlans = getAllPlans;

    return myFireStore;
      
}

const myDatabase = new MyFirestoreHandler();

export { myDatabase };