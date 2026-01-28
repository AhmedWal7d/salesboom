/**
 * SALESBOOM COMMON JAVASCRIPT
 * Reusable functions for all pages
 * Version: 1.0.0
 */

(function() {
  'use strict';

  // ===================================
  // UTILITY FUNCTIONS
  // ===================================
  
  const SalesboomUtils = {
    /**
     * Show error message for a form field
     */
    showError: function(fieldId) {
      const field = document.getElementById(fieldId);
      const errorMsg = document.getElementById(fieldId + '_error');
      
      if (field) {
        field.classList.add('error');
      }
      if (errorMsg) {
        errorMsg.classList.add('show');
      }
    },

    /**
     * Hide error message for a form field
     */
    hideError: function(fieldId) {
      const field = document.getElementById(fieldId);
      const errorMsg = document.getElementById(fieldId + '_error');
      
      if (field) {
        field.classList.remove('error');
      }
      if (errorMsg) {
        errorMsg.classList.remove('show');
      }
    },

    /**
     * Clear all errors in a form
     */
    clearAllErrors: function(formId) {
      const form = document.getElementById(formId);
      if (!form) return;
      
      const errorMessages = form.querySelectorAll('.error-message');
      errorMessages.forEach(msg => msg.classList.remove('show'));
      
      const errorInputs = form.querySelectorAll('.error');
      errorInputs.forEach(input => input.classList.remove('error'));
    },

    /**
     * Validate email format
     */
    isValidEmail: function(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    },

    /**
     * Validate phone number (basic validation)
     */
    isValidPhone: function(phone) {
      // Remove all non-digit characters
      const cleaned = phone.replace(/\D/g, '');
      // Check if it has at least 10 digits
      return cleaned.length >= 10;
    },

    /**
     * Scroll to element smoothly
     */
    scrollTo: function(element, offset = 0) {
      if (!element) return;
      
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    },

    /**
     * Get form data as object
     */
    getFormData: function(formId) {
      const form = document.getElementById(formId);
      if (!form) return {};
      
      const formData = new FormData(form);
      const data = {};
      
      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }
      
      return data;
    }
  };

  // Make utils globally available
  window.SalesboomUtils = SalesboomUtils;

  // ===================================
  // FORM VALIDATION
  // ===================================
  
  const FormValidator = {
    /**
     * Initialize form validation
     */
    init: function(formId, options = {}) {
      const form = document.getElementById(formId);
      if (!form) return;

      // Set default options
      const defaultOptions = {
        onSuccess: null,
        onError: null,
        scrollToError: true
      };
      const settings = { ...defaultOptions, ...options };

      // Add submit event listener
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        SalesboomUtils.clearAllErrors(formId);
        
        // Validate form
        const isValid = FormValidator.validateForm(formId);
        
        if (isValid) {
          if (settings.onSuccess && typeof settings.onSuccess === 'function') {
            settings.onSuccess(form);
          } else {
            form.submit();
          }
        } else {
          if (settings.onError && typeof settings.onError === 'function') {
            settings.onError(form);
          }
          
          // Scroll to first error
          if (settings.scrollToError) {
            const firstError = form.querySelector('.error');
            if (firstError) {
              SalesboomUtils.scrollTo(firstError, 100);
            }
          }
        }
      });

      // Add input event listeners to clear errors on input
      const inputs = form.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        input.addEventListener('input', function() {
          SalesboomUtils.hideError(this.id);
        });
        
        input.addEventListener('change', function() {
          SalesboomUtils.hideError(this.id);
        });
      });
    },

    /**
     * Validate entire form
     */
    validateForm: function(formId) {
      const form = document.getElementById(formId);
      if (!form) return false;

      let isValid = true;
      const inputs = form.querySelectorAll('[required]');

      inputs.forEach(input => {
        if (!FormValidator.validateField(input)) {
          isValid = false;
        }
      });

      return isValid;
    },

    /**
     * Validate individual field
     */
    validateField: function(field) {
      const fieldType = field.type;
      const fieldValue = field.value.trim();
      const fieldId = field.id;

      // Check if required field is empty
      if (field.hasAttribute('required') && !fieldValue) {
        SalesboomUtils.showError(fieldId);
        return false;
      }

      // Email validation
      if (fieldType === 'email' && fieldValue) {
        if (!SalesboomUtils.isValidEmail(fieldValue)) {
          SalesboomUtils.showError(fieldId);
          return false;
        }
      }

      // Phone validation
      if (fieldType === 'tel' && fieldValue) {
        if (!SalesboomUtils.isValidPhone(fieldValue)) {
          SalesboomUtils.showError(fieldId);
          return false;
        }
      }

      // Select validation
      if (fieldType === 'select-one' && field.hasAttribute('required')) {
        if (!fieldValue || fieldValue === '' || fieldValue === '0') {
          SalesboomUtils.showError(fieldId);
          return false;
        }
      }

      // Checkbox validation
      if (fieldType === 'checkbox' && field.hasAttribute('required')) {
        if (!field.checked) {
          SalesboomUtils.showError(fieldId);
          return false;
        }
      }

      return true;
    }
  };

  // Make FormValidator globally available
  window.FormValidator = FormValidator;

  // ===================================
  // PASSWORD MATCHING
  // ===================================
  
  const PasswordMatcher = {
    /**
     * Initialize password matching functionality
     */
    init: function(password1Id, password2Id, indicatorId) {
      const password1 = document.getElementById(password1Id);
      const password2 = document.getElementById(password2Id);
      const indicator = document.getElementById(indicatorId);

      if (!password1 || !password2) return;

      const checkMatch = function() {
        if (password1.value && password2.value) {
          if (password1.value === password2.value && password1.value.length >= 6) {
            if (indicator) indicator.classList.add('show');
            password2.classList.remove('error');
            const errorMsg = document.getElementById(password2Id + '_error');
            if (errorMsg) errorMsg.classList.remove('show');
          } else {
            if (indicator) indicator.classList.remove('show');
          }
        } else {
          if (indicator) indicator.classList.remove('show');
        }
      };

      password1.addEventListener('input', checkMatch);
      password2.addEventListener('input', checkMatch);
    }
  };

  // Make PasswordMatcher globally available
  window.PasswordMatcher = PasswordMatcher;

  // ===================================
  // COUNTRY SELECTION HANDLER
  // ===================================
  
  const CountryHandler = {
    /**
     * Initialize country selection handler
     */
    init: function(countrySelectId, countryNameInputId) {
      const countrySelect = document.getElementById(countrySelectId);
      const countryNameInput = document.getElementById(countryNameInputId);

      if (!countrySelect || !countryNameInput) return;

      countrySelect.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        if (selectedOption && selectedOption.value) {
          countryNameInput.value = selectedOption.text;
        }
      });
    }
  };

  // Make CountryHandler globally available
  window.CountryHandler = CountryHandler;

  // ===================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ===================================
  
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#0') {
          e.preventDefault();
          return;
        }
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          SalesboomUtils.scrollTo(target, 100);
        }
      });
    });
  }

  // ===================================
  // SCROLL ANIMATIONS
  // ===================================
  
  const ScrollAnimations = {
    /**
     * Initialize scroll-triggered animations
     */
    init: function(selectors = []) {
      // Default selectors if none provided
      const defaultSelectors = [
        '.feature-card',
        '.benefit-item',
        '.process-step',
        '.faq-item',
        '.sidebar-card',
        '.card',
        '.info-content'
      ];

      const elementsToAnimate = selectors.length > 0 ? selectors : defaultSelectors;
      
      // Create intersection observer
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, observerOptions);

      // Observe all matching elements
      elementsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          el.style.opacity = '0';
          el.style.transform = 'translateY(20px)';
          el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          observer.observe(el);
        });
      });
    }
  };

  // Make ScrollAnimations globally available
  window.ScrollAnimations = ScrollAnimations;

  // ===================================
  // SUCCESS MESSAGE HANDLER
  // ===================================
  
  const SuccessMessage = {
    /**
     * Show success message and hide form
     */
    show: function(successMessageId, formId) {
      const successMessage = document.getElementById(successMessageId);
      const form = document.getElementById(formId);

      if (successMessage) {
        successMessage.classList.add('show');
        SalesboomUtils.scrollTo(successMessage, 50);
      }

      if (form) {
        form.style.display = 'none';
      }
    },

    /**
     * Hide success message and show form
     */
    hide: function(successMessageId, formId) {
      const successMessage = document.getElementById(successMessageId);
      const form = document.getElementById(formId);

      if (successMessage) {
        successMessage.classList.remove('show');
      }

      if (form) {
        form.style.display = 'block';
      }
    }
  };

  // Make SuccessMessage globally available
  window.SuccessMessage = SuccessMessage;

  // ===================================
  // COOKIE UTILITIES
  // ===================================
  
  const CookieUtils = {
    /**
     * Set a cookie
     */
    set: function(name, value, days = 1) {
      let expires = '';
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
      }
      document.cookie = name + '=' + value + expires + '; path=/';
    },

    /**
     * Get a cookie
     */
    get: function(name) {
      const nameSG = name + '=';
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameSG) === 0) {
          return c.substring(nameSG.length, c.length);
        }
      }
      return null;
    },

    /**
     * Delete a cookie
     */
    delete: function(name) {
      this.set(name, '', -1);
    }
  };

  // Make CookieUtils globally available
  window.CookieUtils = CookieUtils;

  // ===================================
  // LOADING SPINNER
  // ===================================
  
  const LoadingSpinner = {
    /**
     * Show loading spinner on button
     */
    show: function(buttonId) {
      const button = document.getElementById(buttonId);
      if (!button) return;

      button.disabled = true;
      button.dataset.originalText = button.textContent;
      button.textContent = 'Loading...';
    },

    /**
     * Hide loading spinner on button
     */
    hide: function(buttonId) {
      const button = document.getElementById(buttonId);
      if (!button) return;

      button.disabled = false;
      if (button.dataset.originalText) {
        button.textContent = button.dataset.originalText;
      }
    }
  };

  // Make LoadingSpinner globally available
  window.LoadingSpinner = LoadingSpinner;

  // ===================================
  // AUTO-INITIALIZE ON DOM READY
  // ===================================
  
  function autoInitialize() {
    // Initialize smooth scroll
    initSmoothScroll();

    // Initialize scroll animations
    ScrollAnimations.init();

    // Auto-detect and initialize password matchers
    if (document.getElementById('user_password') && 
        document.getElementById('user_password_2') && 
        document.getElementById('passwordMatch')) {
      PasswordMatcher.init('user_password', 'user_password_2', 'passwordMatch');
    }

    // Auto-detect and initialize country handlers
    if (document.getElementById('country') && 
        document.getElementById('country_name')) {
      CountryHandler.init('country', 'country_name');
    }

    // Auto-detect and initialize version edition handlers
    const versionEdition = document.getElementById('version_edition');
    const versionInput = document.getElementById('version');
    if (versionEdition && versionInput) {
      versionEdition.addEventListener('change', function() {
        versionInput.value = this.value;
      });
    }
  }

  // Run auto-initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInitialize);
  } else {
    autoInitialize();
  }

})();

// ===================================
// EXAMPLE USAGE PATTERNS
// ===================================

/**
 * Example 1: Initialize form validation for demo request form
 * 
 * FormValidator.init('demoForm', {
 *   onSuccess: function(form) {
 *     LoadingSpinner.show('submitButton');
 *     // Submit form or make AJAX request
 *     form.submit();
 *   },
 *   onError: function(form) {
 *     console.log('Form validation failed');
 *   }
 * });
 */

/**
 * Example 2: Initialize form validation for trial signup form
 * 
 * FormValidator.init('trialForm', {
 *   onSuccess: function(form) {
 *     SuccessMessage.show('successMessage', 'trialForm');
 *     // Optionally submit form in production
 *     // form.submit();
 *   }
 * });
 */

/**
 * Example 3: Custom password matching
 * 
 * PasswordMatcher.init('password1', 'password2', 'matchIndicator');
 */

/**
 * Example 4: Custom scroll animations
 * 
 * ScrollAnimations.init([
 *   '.custom-card',
 *   '.custom-section',
 *   '.custom-element'
 * ]);
 */

/**
 * Example 5: Manual field validation
 * 
 * const emailField = document.getElementById('email');
 * if (!FormValidator.validateField(emailField)) {
 *   console.log('Email is invalid');
 * }
 */

/**
 * Example 6: Show/hide loading state
 * 
 * LoadingSpinner.show('submitBtn');
 * // After operation completes
 * LoadingSpinner.hide('submitBtn');
 */

/**
 * Example 7: Cookie management
 * 
 * CookieUtils.set('username', 'john@example.com', 7);
 * const username = CookieUtils.get('username');
 * CookieUtils.delete('username');
 */
