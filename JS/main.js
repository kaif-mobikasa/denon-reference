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

  // --- 7. HEOS Video Audio Mute Toggle ---
  const videoToggleBtn = document.querySelector('.video-mute-toggle-btn');
  const storyVideo = document.querySelector('.cinema-heos-video, .story-heos-video');
  if (videoToggleBtn && storyVideo) {
    videoToggleBtn.addEventListener('click', () => {
      storyVideo.muted = !storyVideo.muted;
      const iconMuted = videoToggleBtn.querySelector('.icon-muted');
      const iconUnmuted = videoToggleBtn.querySelector('.icon-unmuted');
      if (storyVideo.muted) {
        if (iconMuted) iconMuted.style.display = 'block';
        if (iconUnmuted) iconUnmuted.style.display = 'none';
      } else {
        if (iconMuted) iconMuted.style.display = 'none';
        if (iconUnmuted) iconUnmuted.style.display = 'block';
      }
    });
  }

  // --- 8. Interactive Room Selector Chips ---
  const roomChips = document.querySelectorAll('.room-card-chip');
  roomChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      roomChips.forEach((c) => (c.style.borderColor = '#e2e8f0'));
      chip.style.borderColor = '#ea4a36';
    });
  });

  // --- 9. Swiper Carousel for Best Sellers ---
  function initBestSellersSwiper() {
    if (typeof Swiper !== 'undefined') {
      new Swiper('.bestsellers-swiper', {
        slidesPerView: 1.15,
        spaceBetween: 20,
        grabCursor: true,
        speed: 650,
        navigation: {
          nextEl: '.bestsellers-next',
          prevEl: '.bestsellers-prev',
        },
        pagination: {
          el: '.bestsellers-swiper-pagination',
          clickable: true,
        },
        scrollbar: {
          el: '.bestsellers-scrollbar',
          draggable: true,
        },
        breakpoints: {
          580: {
            slidesPerView: 1.6,
            spaceBetween: 24,
          },
          768: {
            slidesPerView: 2.2,
            spaceBetween: 28,
          },
          1024: {
            slidesPerView: 3.15,
            spaceBetween: 32,
          },
          1360: {
            slidesPerView: 3.6,
            spaceBetween: 36,
          },
        },
      });
    } else {
      // Offline fallback: smooth scroll container
      const swiperWrapper = document.querySelector('.bestsellers-swiper .swiper-wrapper');
      const prevBtn = document.querySelector('.bestsellers-prev');
      const nextBtn = document.querySelector('.bestsellers-next');

      if (swiperWrapper) {
        swiperWrapper.style.display = 'flex';
        swiperWrapper.style.overflowX = 'auto';
        swiperWrapper.style.scrollBehavior = 'smooth';
        swiperWrapper.style.gap = '24px';
        document.querySelectorAll('.bestsellers-swiper .swiper-slide').forEach((slide) => {
          slide.style.minWidth = '320px';
          slide.style.flexShrink = '0';
        });

        prevBtn?.addEventListener('click', () => {
          swiperWrapper.scrollBy({ left: -340, behavior: 'smooth' });
        });
        nextBtn?.addEventListener('click', () => {
          swiperWrapper.scrollBy({ left: 340, behavior: 'smooth' });
        });
      }
    }
  }

  // --- 10. Swiper Carousel for Our Favorite Polk Products ---
  function initPolkFavoritesSwiper() {
    if (typeof Swiper !== 'undefined') {
      new Swiper('.polk-favorites-swiper', {
        slidesPerView: 1.15,
        spaceBetween: 16,
        grabCursor: true,
        speed: 550,
        navigation: {
          nextEl: '#polkNextBtn',
          prevEl: '#polkPrevBtn',
        },
        scrollbar: {
          el: '.polk-favorites-scrollbar',
          draggable: true,
          hide: false,
        },
        breakpoints: {
          540: {
            slidesPerView: 1.8,
            spaceBetween: 18,
          },
          768: {
            slidesPerView: 2.3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3.2,
            spaceBetween: 24,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        },
      });
    } else {
      // Offline fallback: smooth scroll container
      const polkWrapper = document.querySelector('.polk-favorites-swiper .swiper-wrapper');
      const prevBtn = document.getElementById('polkPrevBtn');
      const nextBtn = document.getElementById('polkNextBtn');

      if (polkWrapper) {
        polkWrapper.style.display = 'flex';
        polkWrapper.style.overflowX = 'auto';
        polkWrapper.style.scrollBehavior = 'smooth';
        polkWrapper.style.gap = '20px';
        document.querySelectorAll('.polk-favorites-swiper .swiper-slide').forEach((slide) => {
          slide.style.minWidth = '280px';
          slide.style.flexShrink = '0';
        });

        prevBtn?.addEventListener('click', () => {
          polkWrapper.scrollBy({ left: -300, behavior: 'smooth' });
        });
        nextBtn?.addEventListener('click', () => {
          polkWrapper.scrollBy({ left: 300, behavior: 'smooth' });
        });
      }
    }
  }

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

  initBestSellersSwiper();
  initPolkFavoritesSwiper();
});
