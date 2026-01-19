console.log('Daily Swimming Coach App Initialized');

// Mobile Menu Toggle
const menuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.main-nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const isHidden = getComputedStyle(nav).display === 'none';
    if (isHidden) {
        nav.style.display = 'block';
        nav.style.position = 'absolute';
        nav.style.top = '100%';
        nav.style.left = '0';
        nav.style.width = '100%';
        nav.style.background = 'white';
        nav.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        nav.style.padding = '1rem';
        // Change nav layout to vertical for mobile
        const ul = nav.querySelector('ul');
        if (ul) {
            ul.style.flexDirection = 'column';
            ul.style.gap = '1rem';
        }
    } else {
        nav.style.display = ''; // Revert to stylesheet default
        nav.style.position = '';
        nav.style.top = '';
        nav.style.left = '';
        nav.style.width = '';
        nav.style.background = '';
        nav.style.boxShadow = '';
        nav.style.padding = '';
        const ul = nav.querySelector('ul');
        if (ul) {
            ul.style.flexDirection = '';
            ul.style.gap = '';
        }
    }
  });
}

// Simple interaction for the CTA button
const ctaBtn = document.querySelector('.cta-button');
if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
        alert('Welcome! Your workout for today is loading...');
        // In a real app, this would navigate or fetch data
    });
}
