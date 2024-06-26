let db = firebase.firestore();
let auth = firebase.auth();

document.addEventListener('DOMContentLoaded', (event) => {
    // newsletter observer
    const emailInput = document.getElementById('email-address');
    emailInput.addEventListener('keypress', function(e) {
        if (e.key == 'Enter') {
            e.preventDefault();
            subscribeNewsletter();
        }
    })
});

function subscribeNewsletter() {
    const email = document.getElementById('email-address').value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || !email) {
        alert('Please enter a valid email address');
        return;
    }

    db.collection('newsletter').add({
        email: email
    }).then(() => {
        document.getElementById('email-address').value = '';
        
        window.location = `https://docs.google.com/forms/d/e/1FAIpQLSeEX67dCl21tveki2OioAXVolss3MOfOm2JdJUkwXoTUe0UzQ/viewform?usp=pp_url&entry.829953346=${email}`;
    }).catch((error) => {
        alert('Error subscribing to newsletter. Please try again later.');
    });
}