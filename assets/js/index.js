let db = firebase.firestore();
let auth = firebase.auth();

// function switchBg(bg) {
//     var images = {
//         'bg1.jpg': 'Joshua Earle',
//         'bg2.jpg': 'Martin Jernberg',
//         'bg3.jpg': 'Juskteez Vu',
//         't1.png': 'Jason Leung',
//         't2.png': 'Pawel Czerwinski'
//     };

//     var randomImage = bg;
    
//     var body = document.getElementById('body');
//     body.style.backgroundImage = 'url(/assets/img/index/' + randomImage + ')';
// }

// document.addEventListener('DOMContentLoaded', function () {
//     switchBg('bg1.jpg')
// });

document.addEventListener('DOMContentLoaded', (event) => {
    animateValue('students-engaged', 0, 300, 500);
    animateValue('initiatives', 0, 10, 500);

    // video observer
    const video = document.querySelector('video');
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.muted = true;
                    video.play()
                } else {
                    video.pause()
                }
            });
        }, { threshold: 0.5 });
        observer.observe(video);
    }

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

function smoothScrollAboveElement(elementId, offset) {
    const element = document.getElementById(elementId);
    if (element) {
        const elementRect = element.getBoundingClientRect();
        const elementTop = elementRect.top + window.pageYOffset;
        window.scrollTo({
            top: elementTop - offset,
            behavior: 'smooth'
        });
    }
}

function animateValue(id, start, end, duration) {
    let range = start - end
    let current = start;
    let increment = end > start ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));
    let obj = document.getElementById(id);

    let timer = setInterval(function () {
        current += increment;
        obj.innerText = current.toLocaleString();
        if (current === end) {
            obj.innerText = obj.innerHTML + '+';
            clearInterval(timer);
        }
    }, stepTime)
}
