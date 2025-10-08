particlesJS("particles-js", {
  particles: {
    number: {
        value: 100
    },
    size: {
        value: 2
    },
    color: {
        value: "#ffffff"
    },
    line_linked: {
        enable: true,
        color: "#fff"
    },
    move: {
        speed: 4
    }
  },
  interactivity: {
    events: {
        onhover: {
            enable: true,
            mode: "repulse"
        } 
    }
  }
});


// Helper: throttle
function throttle(fn, wait){
    let inThrottle = false, lastArgs = null;
    return function(...args){
        if(inThrottle){ lastArgs = args; return; }
        fn.apply(this, args);
        inThrottle = true;
        setTimeout(()=>{ inThrottle = false; if(lastArgs){ fn.apply(this, lastArgs); lastArgs = null; } }, wait);
    };
}

// Nav toggle for mobile
const navToggleButton = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('nav-links');
if(navToggleButton && navLinks){
    navToggleButton.addEventListener('click', ()=>{
        const isOpen = navLinks.classList.toggle('open');
        navToggleButton.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{
        navLinks.classList.remove('open');
        navToggleButton.setAttribute('aria-expanded','false');
    }));
}

// Reveal on scroll using IntersectionObserver fallback
(function(){
    const revealElements = Array.from(document.querySelectorAll('.reveal'));
    if('IntersectionObserver' in window){
        const io = new IntersectionObserver((entries)=>{
            entries.forEach(entry=>{
                if(entry.isIntersecting){
                    entry.target.classList.add('visible');
                    io.unobserve(entry.target);
                }
            });
        }, {root:null, threshold:0.15});
        revealElements.forEach(el=>io.observe(el));
    } else {
        const onScroll = throttle(()=>{
            const vh = window.innerHeight;
            revealElements.forEach(el=>{
                if(el.classList.contains('visible')) return;
                const rect = el.getBoundingClientRect();
                if(rect.top < vh * 0.85){ el.classList.add('visible'); }
            });
        }, 150);
        window.addEventListener('scroll', onScroll);
        onScroll();
    }
})();

// Back to top
const backToTopBtn = document.getElementById('backToTop');
if(backToTopBtn){
    const toggleBtn = throttle(()=>{
        if(window.scrollY > 400){ backToTopBtn.classList.add('show'); }
        else { backToTopBtn.classList.remove('show'); }
    }, 150);
    window.addEventListener('scroll', toggleBtn);
    toggleBtn();
    backToTopBtn.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
}

// Contact form basic handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();  // keep this if you want custom validation
    const formData = new FormData(contactForm);
    const name = (formData.get('name') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const message = (formData.get('message') || '').toString().trim();

    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // ✅ NEW: send the form data to Formspree
    fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        alert(`Thanks, ${name}! Your message has been received.`);
        contactForm.reset();
      }
      else {
        alert('Oops! Something went wrong, please try again.');
      }
    })
    .catch(() => alert('Network error. Please try again later.'));
  });
}


// Buttons functionality
const downloadCvBtn = document.getElementById('downloadCvBtn');
if(downloadCvBtn){
    downloadCvBtn.addEventListener('click', ()=>{
        // alert('CV download will start soon. Replace with actual file link.');
        window.location.href = 'assets/Aman Resume.pdf';
    });
}

// Footer year
const yearEl = document.getElementById('year');
if(yearEl){
  yearEl.textContent = new Date().getFullYear();
}

new Typed("#autoType", {
  strings: [`
        <p>  As a Computer Science graduate, I am skilled in building 
  responsive, user-focused web applications using HTML, CSS, 
  JavaScript, and ReactJS. I have a proven ability to integrate 
  APIs and use modern development tools like Git/GitHub to 
  deliver clean, maintainable, and high-performance code. 
  I am a dedicated problem-solver with a collaborative mindset, 
  seeking a WebDeveloper role to create innovative web 
  solutions in a dynamic team environment.</p>
    `],

  typeSpeed: 25,
  backSpeed: 0,
  smartBackspace: false,
  showCursor: true,
  cursorChar: '|',
  loop: false
});
