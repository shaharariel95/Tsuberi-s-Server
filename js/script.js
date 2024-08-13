
// header section selection active change
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    function setActiveLink() {
        let currentSection = '';
    
    
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
            const sectionHeight = section.clientHeight;
            const sectionBottom = sectionTop + sectionHeight;
            const scrollPosition = window.pageYOffset + 100; // Use a fixed offset
    
    
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = section.getAttribute('id');
            }
        });
        
    
        navLinks.forEach(link => {
            const href = link.getAttribute('href').substring(1); // Remove the '#'
            link.classList.remove('active');
            if (href === currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', debounce(setActiveLink, 15));
    window.addEventListener('load', setActiveLink);
    window.addEventListener('resize', debounce(setActiveLink, 15));
});



function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


// images "looking in the diraction of the mouse"
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('mousemove', (e) => {
        const floatingImages = document.querySelectorAll('.floating-squircles img');
        
        floatingImages.forEach(img => {
            const rect = img.getBoundingClientRect();
            const imgX = rect.left + rect.width / 2;
            const imgY = rect.top + rect.height / 2;

            const deltaX = e.clientX - imgX;
            const deltaY = e.clientY - imgY;

            // Limit the rotation to a small range to avoid flipping
            const angleX = Math.max(Math.min((deltaY / rect.height) * 10, 10), -10);
            const angleY = Math.max(Math.min((deltaX / rect.width) * -10, 10), -10);

            img.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            img.style.transition = 'transform 0.2s ease-out'; // Smooth transition
        });
    });
});



