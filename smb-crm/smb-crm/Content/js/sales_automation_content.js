
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
  } else {
    navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.08)';
  }
  
  lastScroll = currentScroll;
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.feature-card, .pain-point-card, .ai-card, .metric-card, .knowledge-card, .adoption-card, .scalability-card, .risk-card').forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(element);
});

const animateCounter = (element, target) => {
  const suffix = element.textContent.replace(/[\d,.%]/g, '').trim();
  const isPercentage = suffix.includes('%');
  const numericTarget = parseFloat(target);
  let current = 0;
  const increment = numericTarget / 50;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= numericTarget) {
      element.textContent = target + (isPercentage ? '' : suffix);
      clearInterval(timer);
    } else {
      const displayValue = isPercentage ? Math.floor(current) + '%' : Math.floor(current) + suffix;
      element.textContent = displayValue;
    }
  }, 30);
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      const statNumbers = entry.target.querySelectorAll('.stat-number');
      statNumbers.forEach(stat => {
        const text = stat.textContent;
        const match = text.match(/[\d,.]+/);
        if (match) {
          const number = parseFloat(match[0]);
          animateCounter(stat, text);
        }
      });
      entry.target.classList.add('animated');
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  statsObserver.observe(statsSection);
}

const metricObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      const metricValue = entry.target.querySelector('.metric-value');
      if (metricValue) {
        const text = metricValue.textContent;
        animateCounter(metricValue, text);
        entry.target.classList.add('animated');
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.metric-card').forEach(card => {
  metricObserver.observe(card);
});

const navLinks = document.querySelectorAll('.nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navbarCollapse.classList.contains('show')) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse);
      bsCollapse.hide();
    }
  });
});

document.querySelectorAll('.comparison-item').forEach(item => {
  item.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.02)';
    this.style.transition = 'transform 0.2s ease';
  });
  
  item.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
});
