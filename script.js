document.addEventListener('DOMContentLoaded', function() {
    // Dynamically update the current year in the footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Get the offset of the sticky navbar to prevent content from hiding behind it
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const offsetTop = targetSection.offsetTop - navbarHeight - 20; // -20 for a little extra padding

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Optional: Close mobile nav if open (implement this if you add a mobile menu toggle)
                // if (window.innerWidth <= 768) {
                //     // Add code here to close mobile nav
                // }
            }
        });
    });

    // Optional: Add 'active' class to nav link based on scroll position (ScrollSpy)
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    function highlightNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjust offset to account for sticky navbar height
            const navbarHeight = document.querySelector('.navbar').offsetHeight;

            if (window.scrollY >= sectionTop - navbarHeight - 50) { // -50 for a small buffer
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
    window.addEventListener('resize', highlightNavLink); // Recalculate on resize
    highlightNavLink(); // Call on load to set initial active state
});