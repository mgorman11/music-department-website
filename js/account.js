import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Initialize Firebase using environment variables
const app = initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
});

const db = getFirestore(app);

// Handle form submission without page reload
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('account-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        // Prevent URL query strings
        const url = new URL(window.location);
        url.search = '';
        window.history.replaceState(null, '', url);

        // Fetch account data
        const studentId = document.getElementById('account-id').value;
        const docRef = doc(db, 'students', studentId);
        const docSnap = await getDoc(docRef);

        // Display result
        const display = document.getElementById('account-display');
        if (docSnap.exists()) {
            const data = docSnap.data();
            display.innerText = `Name: ${data.name}\nBalance: $${data.balance.toFixed(2)}`;
        } else {
            display.innerText = 'No account found for that ID.';
        }
    });
});

