

  // Enable dropdown on hover for desktop
  document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth >= 992) {
      const dropdowns = document.querySelectorAll('.navbar .dropdown');
      
      dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
          const menu = this.querySelector('.dropdown-menu');
          if (menu) {
            menu.classList.add('show');
          }
        });
        
        dropdown.addEventListener('mouseleave', function() {
          const menu = this.querySelector('.dropdown-menu');
          if (menu) {
            menu.classList.remove('show');
          }
        });
      });
    }

    // ===== Mobile Dropdown Fix =====
    const dropdownToggles = document.querySelectorAll('.navbar .dropdown-toggle');
    
    // Close other dropdowns when opening a new one
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        if (window.innerWidth < 992) {
          const allDropdowns = document.querySelectorAll('.navbar .dropdown-menu.show');
          const currentDropdown = this.nextElementSibling;
          
          allDropdowns.forEach(menu => {
            if (menu !== currentDropdown) {
              menu.classList.remove('show');
            }
          });
        }
      });
    });

    // Close dropdown when clicking on item (Mobile)
    const dropdownItems = document.querySelectorAll('.navbar .dropdown-item');
    dropdownItems.forEach(item => {
      item.addEventListener('click', function(e) {
        if (window.innerWidth < 992) {
          const parentDropdown = this.closest('.dropdown-menu');
          if (parentDropdown) {
            parentDropdown.classList.remove('show');
          }
        }
      });
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '#heroCarousel') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Auto-play carousel
  const carousel = new bootstrap.Carousel(document.getElementById('heroCarousel'), {
    interval: 5000,
    ride: 'carousel'
  });




        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });


        window.addEventListener('load', function() {
  setTimeout(function() {
    document.getElementById('loading-screen').classList.add('hidden');
  }, 1000); // يختفي بعد ثانية من تحميل الصفحة
});




const backToTopBtn = document.getElementById('backToTop');

// إظهار/إخفاء الزر عند التمرير
window.addEventListener('scroll', function() {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

// الرجوع للأعلى عند الضغط
backToTopBtn.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
    