import firebaseConfig from '../js/config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Handle form submission
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('balance-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const studentId = document.getElementById('student-id').value;
        const docRef = doc(db, 'students', studentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            document.getElementById('balance-display').innerText = 
                `Name: ${data.name}\nBalance: $${data.balance.toFixed(2)}`;
        } else {
            document.getElementById('balance-display').innerText = 'No account found for that ID.';
        }
    });
});
