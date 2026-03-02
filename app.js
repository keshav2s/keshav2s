// Portfolio data for carousel
const portfolioData = [
    { id: 1, title: '25-KVA', description: 'Reliable, fuel-efficient, and ultra-quiet power solution for homes and businesses. Delivers stable performance with low noise operation and durable construction for long-lasting backup support.', image: '1.JPG', tech: ['25kva', 'SILENT', 'FUEL-EFFICIENT'] },
    { id: 2, title: '62-KVA', description: 'High-capacity diesel generator built for continuous performance and efficiency. Features advanced voltage regulation and sturdy build quality to ensure uninterrupted power for demanding applications.', image: '2.jpg', tech: ['62kva', 'Efficient', 'Reliable'] },
    { id: 3, title: '125-KVA', description: 'The 125 kVA generator delivers reliable, fuel-efficient, and stable electricity with durable construction, making it ideal for continuous and backup power needs.', image: '3.jpg', tech: ['Industrial', 'Heavy-Duty', 'Powerhouse'] },
    { id: 4, title: 'Cyber Defense', description: 'Military-grade cybersecurity framework with real-time threat detection and automated response.', image: 'images/cyber-defense.jpg', tech: ['Zero Trust', 'AI Defense', 'Encryption'] },
    { id: 5, title: 'Data Nexus', description: 'Big data processing platform capable of analyzing petabytes of information in real-time.', image: 'images/data-nexus.jpg', tech: ['Apache Spark', 'Hadoop', 'Kafka'] },
    { id: 6, title: 'AR Interface', description: 'Augmented reality system for immersive data visualization and interactive experiences.', image: 'images/ar-interface.jpg', tech: ['Unity', 'ARCore', 'Computer Vision'] },
    { id: 7, title: 'IoT Matrix', description: 'Intelligent IoT ecosystem connecting millions of devices with edge computing capabilities.', image: 'images/iot-matrix.jpg', tech: ['MQTT', 'Edge AI', '5G'] }
];

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    const header = document.getElementById('header');
    if (section) {
        const headerHeight = header.offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
}

// Initialize particles for philosophy section
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 15;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (18 + Math.random() * 8) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Carousel
let currentIndex = 0;
const carousel = document.getElementById('carousel');
const indicatorsContainer = document.getElementById('indicators');

function createCarouselItem(data, index) {
    const item = document.createElement('div');
    item.className = 'carousel-item';
    item.dataset.index = index;
    const techBadges = data.tech.map(tech => `<span class="tech-badge">${tech}</span>`).join('');
    item.innerHTML = `
        <div class="card">
            <div class="card-number">0${data.id}</div>
            <div class="card-image"><img src="${data.image}" alt="${data.title}"></div>
            <h3 class="card-title">${data.title}</h3>
            <p class="card-description">${data.description}</p>
            <div class="card-tech">${techBadges}</div>
            <button class="card-cta" onclick="scrollToSection('about')">Explore</button>
        </div>
    `;
    return item;
}

function initCarousel() {
    portfolioData.forEach((data, index) => {
        const item = createCarouselItem(data, index);
        carousel.appendChild(item);

        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.dataset.index = index;
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });
    updateCarousel();
}

function updateCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const totalItems = items.length;
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024;

    items.forEach((item, index) => {
        let offset = index - currentIndex;
        if (offset > totalItems / 2) offset -= totalItems;
        else if (offset < -totalItems / 2) offset += totalItems;
        const absOffset = Math.abs(offset);
        const sign = offset < 0 ? -1 : 1;
        item.style.transform = '';
        item.style.opacity = '';
        item.style.zIndex = '';
        item.style.transition = 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)';

        let spacing1 = 400, spacing2 = 600, spacing3 = 750;
        if (isMobile) { spacing1 = 280; spacing2 = 420; spacing3 = 550; }
        else if (isTablet) { spacing1 = 340; spacing2 = 520; spacing3 = 650; }

        if (absOffset === 0) item.style.transform = 'translate(-50%, -50%) translateZ(0) scale(1)', item.style.opacity = '1', item.style.zIndex = '10';
        else if (absOffset === 1) item.style.transform = `translate(-50%, -50%) translateX(${sign * spacing1}px) translateZ(-200px) rotateY(${-sign * (isMobile ? 25 : 30)}deg) scale(${isMobile ? 0.88 : 0.85})`, item.style.opacity = '0.8', item.style.zIndex = '5';
        else if (absOffset === 2) item.style.transform = `translate(-50%, -50%) translateX(${sign * spacing2}px) translateZ(-350px) rotateY(${-sign * (isMobile ? 35 : 40)}deg) scale(${isMobile ? 0.75 : 0.7})`, item.style.opacity = '0.5', item.style.zIndex = '3';
        else if (absOffset === 3) item.style.transform = `translate(-50%, -50%) translateX(${sign * spacing3}px) translateZ(-450px) rotateY(${-sign * (isMobile ? 40 : 45)}deg) scale(${isMobile ? 0.65 : 0.6})`, item.style.opacity = '0.3', item.style.zIndex = '2';
        else item.style.transform = 'translate(-50%, -50%) translateZ(-500px) scale(0.5)', item.style.opacity = '0', item.style.zIndex = '1';
    });

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

function nextSlide() { currentIndex = (currentIndex + 1) % portfolioData.length; updateCarousel(); }
function prevSlide() { currentIndex = (currentIndex - 1 + portfolioData.length) % portfolioData.length; updateCarousel(); }
function goToSlide(index) { currentIndex = index; updateCarousel(); }

// Event listeners
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
if (nextBtn) nextBtn.addEventListener('click', nextSlide);
if (prevBtn) prevBtn.addEventListener('click', prevSlide);
document.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') prevSlide(); if (e.key === 'ArrowRight') nextSlide(); });
window.addEventListener('resize', () => { clearTimeout(resizeTimeout); resizeTimeout = setTimeout(updateCarousel, 250); });

// Initialize on load
initCarousel();
initParticles();

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
if (menuToggle && navMenu) menuToggle.addEventListener('click', () => { navMenu.classList.toggle('active'); menuToggle.classList.toggle('active'); });

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => { if (window.scrollY > 100) header.classList.add('scrolled'); else header.classList.remove('scrolled'); });

// Smooth scrolling and active navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        window.scrollTo({ top: targetSection.offsetTop - header.offsetHeight, behavior: 'smooth' });
        if (navMenu) navMenu.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('active');
    }
}));

function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;
    sections.forEach(section => {
        if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === section.getAttribute('id')) link.classList.add('active');
            });
        }
    });
}
window.addEventListener('scroll', updateActiveNav);

// Animated counter for stats
function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const counter = setInterval(() => { current += step; if (current >= target) { element.textContent = target; clearInterval(counter); } else element.textContent = Math.floor(current); }, 16);
}

// Intersection Observer for stats animation
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(number => { if (!number.classList.contains('animated')) { number.classList.add('animated'); animateCounter(number); } });
        }
    });
}, { threshold: 0.5, rootMargin: '0px 0px -100px 0px' });

const statsSection = document.querySelector('.stats-section');
if (statsSection) observer.observe(statsSection);

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    alert(`Thank you ${data.name}! Your message has been transmitted successfully. We'll respond within 24 hours.`);
    contactForm.reset();
});

// Loading screen
window.addEventListener('load', () => {
    setTimeout(() => { const loader = document.getElementById('loader'); if (loader) loader.classList.add('hidden'); }, 1500);
});

// Parallax effect
window.addEventListener('scroll', () => {
    const parallax = document.querySelector('.hero');
    if (parallax) parallax.style.transform = `translateY(${window.pageYOffset * 0.5}px)`;
});
