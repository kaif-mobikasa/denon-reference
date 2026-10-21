/**
 * DENON LUXURY REDESIGN - INTERACTIVE SCRIPTS
 * Handles: Announcement ticker, Mega-menus, Search palette, Cart drawer, Mobile navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Announcement Bar Carousel ---
  const announcementSlides = document.querySelectorAll('.announcement-item');
  const prevBtn = document.querySelector('.announcement-prev-btn');
  const nextBtn = document.querySelector('.announcement-next-btn');
  let currentSlide = 0;
  let slideInterval = null;

  function showSlide(index) {
    if (!announcementSlides.length) return;
    if (index >= announcementSlides.length) currentSlide = 0;
    else if (index < 0) currentSlide = announcementSlides.length - 1;
    else currentSlide = index;

    announcementSlides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === currentSlide);
    });
  }

  function startSlideAuto() {
    stopSlideAuto();
    slideInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 4500);
  }

  function stopSlideAuto() {
    if (slideInterval) clearInterval(slideInterval);
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showSlide(currentSlide - 1);
      startSlideAuto();
    });

    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showSlide(currentSlide + 1);
      startSlideAuto();
    });
  }

  const announcementBar = document.querySelector('.announcement-bar');
  if (announcementBar) {
    announcementBar.addEventListener('mouseenter', stopSlideAuto);
    announcementBar.addEventListener('mouseleave', startSlideAuto);
    startSlideAuto();
  }

  // --- 2. Sticky Header Elevation ---
  const header = document.querySelector('.denon-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header?.classList.add('is-sticky');
    } else {
      header?.classList.remove('is-sticky');
    }
  });

  // --- 3. Mega Menu Hover & Click Behavior ---
  const menuItemsWithDropdown = document.querySelectorAll('.nav-item-has-menu');
  menuItemsWithDropdown.forEach((item) => {
    const trigger = item.querySelector('.nav-anchor');
    const dropdown = item.querySelector('.mega-dropdown-panel');

    if (dropdown) {
      // Toggle on click
      trigger?.addEventListener('click', (e) => {
        const isCurrentOpen = item.classList.contains('open');
        // Close all others first
        menuItemsWithDropdown.forEach((other) => other.classList.remove('open'));
        if (!isCurrentOpen) {
          e.preventDefault();
          item.classList.add('open');
        }
      });
    }
  });

  // Close menus when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item-has-menu')) {
      menuItemsWithDropdown.forEach((item) => item.classList.remove('open'));
    }
    if (!e.target.closest('.utility-has-popover')) {
      document.querySelectorAll('.utility-has-popover').forEach((el) => el.classList.remove('open'));
    }
  });

  // --- 4. Search Palette Overlay ---
  const searchTriggers = document.querySelectorAll('.search-trigger-btn');
  const searchModal = document.querySelector('.search-palette-modal');
  const searchCloseBtn = document.querySelector('.search-close-action');
  const searchInput = document.querySelector('.search-input-control');

  function openSearch() {
    searchModal?.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput?.focus(), 100);
  }

  function closeSearch() {
    searchModal?.classList.remove('open');
    document.body.style.overflow = '';
  }

  searchTriggers.forEach((btn) => btn.addEventListener('click', openSearch));
  searchCloseBtn?.addEventListener('click', closeSearch);

  searchModal?.addEventListener('click', (e) => {
    if (e.target === searchModal) closeSearch();
  });

  // Keyboard shortcut Cmd+K / Ctrl+K
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (searchModal?.classList.contains('open')) {
        closeSearch();
      } else {
        openSearch();
      }
    }
    if (e.key === 'Escape') {
      if (searchModal?.classList.contains('open')) closeSearch();
      if (cartDrawer?.classList.contains('open')) closeCart();
      if (mobileDrawer?.classList.contains('open')) closeMobileMenu();
      menuItemsWithDropdown.forEach((item) => item.classList.remove('open'));
    }
  });

  // --- 5. Cart Slide Drawer ---
  const cartTriggers = document.querySelectorAll('.cart-trigger-btn');
  const cartDrawer = document.querySelector('.cart-drawer-panel');
  const cartOverlay = document.querySelector('.cart-drawer-overlay');
  const cartCloseBtn = document.querySelector('.cart-close-btn');

  function openCart() {
    cartDrawer?.classList.add('open');
    cartOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartDrawer?.classList.remove('open');
    cartOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  cartTriggers.forEach((btn) => btn.addEventListener('click', openCart));
  cartCloseBtn?.addEventListener('click', closeCart);
  cartOverlay?.addEventListener('click', closeCart);

  // --- 6. Mobile Drawer & Accordion Navigation ---
  const mobileToggle = document.querySelector('.hamburger-btn');
  const mobileDrawer = document.querySelector('.mobile-nav-slide-drawer');
  const mobileClose = document.querySelector('.mobile-drawer-close');

  function toggleMobileMenu() {
    const isOpen = mobileDrawer?.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function openMobileMenu() {
    mobileDrawer?.classList.add('open');
    mobileToggle?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileDrawer?.classList.remove('open');
    mobileToggle?.classList.remove('open');
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', toggleMobileMenu);
  mobileClose?.addEventListener('click', closeMobileMenu);

  // Mobile Accordions
  const mobileAccordionTriggers = document.querySelectorAll('.mobile-accordion-toggle');
  mobileAccordionTriggers.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetMenu = btn.nextElementSibling;
      if (targetMenu && targetMenu.classList.contains('mobile-sub-accordion')) {
        const isShown = targetMenu.classList.contains('show');
        document.querySelectorAll('.mobile-sub-accordion').forEach((el) => el.classList.remove('show'));
        if (!isShown) {
          targetMenu.classList.add('show');
        }
      }
    });
  });


  // --- 11. Footer Mobile Accordions ---
  const footerAccordionCols = document.querySelectorAll('.footer-accordion-col');
  footerAccordionCols.forEach((col) => {
    const headerBtn = col.querySelector('.footer-accordion-header');
    if (!headerBtn) return;

    headerBtn.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        const isOpen = col.classList.contains('is-open');

        // Close other open accordions for clean single-panel behavior
        footerAccordionCols.forEach((other) => {
          if (other !== col) {
            other.classList.remove('is-open');
            other.querySelector('.footer-accordion-header')?.setAttribute('aria-expanded', 'false');
          }
        });

        if (isOpen) {
          col.classList.remove('is-open');
          headerBtn.setAttribute('aria-expanded', 'false');
        } else {
          col.classList.add('is-open');
          headerBtn.setAttribute('aria-expanded', 'true');
        }
      }
    });
  });

  // --- 12. Hero Advanced Search Handler ---
  const heroSearchForm = document.querySelector('.advanced-search-form');
  if (heroSearchForm) {
    heroSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const targetSection = document.getElementById('accessories') || document.getElementById('speaker-showcase');
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // --- 13. Breville Parts Carousel Navigation ---
  const partsTrack = document.querySelector('.parts-carousel-track');
  const partsPrevBtn = document.querySelector('.parts-nav-prev');
  const partsNextBtn = document.querySelector('.parts-nav-next');

  if (partsTrack && partsPrevBtn && partsNextBtn) {
    partsPrevBtn.addEventListener('click', () => {
      const cardWidth = partsTrack.querySelector('.parts-category-card')?.offsetWidth || 280;
      partsTrack.scrollBy({ left: -(cardWidth + 20), behavior: 'smooth' });
    });

    partsNextBtn.addEventListener('click', () => {
      const cardWidth = partsTrack.querySelector('.parts-category-card')?.offsetWidth || 280;
      partsTrack.scrollBy({ left: cardWidth + 20, behavior: 'smooth' });
    });
  }

  // --- 14. Best Selling Denon Accessories Swiper Carousel ---
  let accSwiper = null;
  function initAccessoriesSwiper() {
    if (typeof Swiper !== 'undefined' && document.querySelector('.accessories-swiper')) {
      accSwiper = new Swiper('.accessories-swiper', {
        slidesPerView: 1.25,
        spaceBetween: 16,
        grabCursor: true,
        speed: 550,
        navigation: {
          nextEl: '.acc-nav-next',
          prevEl: '.acc-nav-prev',
        },
        scrollbar: {
          el: '.accessories-scrollbar',
          draggable: true,
        },
        breakpoints: {
          540: {
            slidesPerView: 2.1,
            spaceBetween: 20,
          },
          820: {
            slidesPerView: 3.1,
            spaceBetween: 24,
          },
          1120: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        },
      });
    }

    // Interactive Capsule Category Filter Tabs
    const accPillBtns = document.querySelectorAll('.acc-pill-btn');
    const accSlides = document.querySelectorAll('.accessories-swiper .swiper-slide');

    if (accPillBtns.length && accSlides.length) {
      accPillBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const cat = btn.getAttribute('data-category');

          accPillBtns.forEach((b) => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
          });
          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');

          accSlides.forEach((slide) => {
            const slideCat = slide.getAttribute('data-category');
            if (cat === 'all' || slideCat === cat) {
              slide.style.display = 'flex';
            } else {
              slide.style.display = 'none';
            }
          });

          if (accSwiper) {
            accSwiper.update();
            accSwiper.slideTo(0);
          }
        });
      });
    }
  }

  // Banner pills active toggle
  const shopPills = document.querySelectorAll('.denon-shop-pill');
  if (shopPills.length) {
    shopPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        shopPills.forEach((p) => {
          p.classList.remove('active');
          p.setAttribute('aria-selected', 'false');
        });
        pill.classList.add('active');
        pill.setAttribute('aria-selected', 'true');
      });
    });
  }

  // Accessories Quick View & Add to Cart interactive feedback
  document.querySelectorAll('.btn-add-cart').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const label = btn.querySelector('span');
      if (label && !btn.classList.contains('added')) {
        const originalText = label.textContent;
        label.textContent = 'Added! ✓';
        btn.classList.add('added');
        btn.style.background = '#10b981';
        btn.style.color = '#ffffff';
        btn.style.borderColor = '#10b981';
        setTimeout(() => {
          label.textContent = originalText;
          btn.classList.remove('added');
          btn.style.background = '';
          btn.style.color = '';
          btn.style.borderColor = '';
        }, 1500);
      }
    });
  });

  document.querySelectorAll('.btn-quick-view').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.accessory-card');
      const title = card?.querySelector('.acc-title')?.getAttribute('title') || 'Accessory';
      const price = card?.querySelector('.acc-price')?.textContent || '';
      const label = btn.querySelector('span');
      if (label) {
        const originalText = label.textContent;
        label.textContent = 'Viewing...';
        setTimeout(() => {
          label.textContent = originalText;
        }, 1200);
      }
    });
  });

  // --- 16. Denon FAQ Accordion & Category Filter Controller ---
  function initDenonFaqAccordion() {
    const faqItems = document.querySelectorAll('.denon-faq-item');
    const filterBtns = document.querySelectorAll('.faq-filter-btn');

    // Accordion Toggle
    faqItems.forEach((item, index) => {
      const questionBtn = item.querySelector('.denon-faq-question');
      if (!questionBtn) return;

      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        // Close other items when opening a new one
        if (!isOpen) {
          faqItems.forEach((other) => {
            if (other !== item) {
              other.classList.remove('is-open');
              other.querySelector('.denon-faq-question')?.setAttribute('aria-expanded', 'false');
            }
          });
        }

        // Toggle clicked item (allows opening and closing any item)
        if (isOpen) {
          item.classList.remove('is-open');
          questionBtn.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('is-open');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // Category Filter Pills
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const selectedFilter = btn.getAttribute('data-filter') || 'all';

        faqItems.forEach((item, index) => {
          const itemCat = item.getAttribute('data-category');
          if (selectedFilter === 'all' || itemCat === selectedFilter) {
            item.classList.remove('faq-hidden');
            if (index === 0) {
              item.classList.add('is-open');
              item.querySelector('.denon-faq-question')?.setAttribute('aria-expanded', 'true');
            }
          } else {
            item.classList.add('faq-hidden');
            if (index !== 0) {
              item.classList.remove('is-open');
              item.querySelector('.denon-faq-question')?.setAttribute('aria-expanded', 'false');
            }
          }
        });
      });
    });
  }

  initAccessoriesSwiper();
  initDenonFaqAccordion();
});
