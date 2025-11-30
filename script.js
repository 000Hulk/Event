(function () {
  const slides = Array.from(document.querySelectorAll('#catSlider .slide'));
  let current = 0;
  const AUTOPLAY_DELAY = 3500;

  function update() {
    slides.forEach((s, i) => {
      if (i === current) {
        s.classList.add('active');
        s.setAttribute('aria-hidden', 'false');
      } else {
        s.classList.remove('active');
        s.setAttribute('aria-hidden', 'true');
      }
    });
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    update();
  }

  // Initialize first slide
  update();

  // Autoplay
  setInterval(nextSlide, AUTOPLAY_DELAY);
})();



// =================================== Work show sectiom====================

const galleryLinks = document.querySelectorAll('#work-gallery a');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  galleryLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const img = link.href;
      lightboxImg.src = img;
      lightbox.classList.remove('hidden');
      lightbox.classList.add('flex');
    });
  });

  lightboxClose.addEventListener('click', () => {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
  });

  lightbox.addEventListener('click', e => {
    if(e.target === lightbox) {
      lightbox.classList.add('hidden');
      lightbox.classList.remove('flex');
    }
  });





  document.addEventListener('DOMContentLoaded', function () {
    const buttons = Array.from(document.querySelectorAll('.faq-btn'));
    const panels = Array.from(document.querySelectorAll('.faq-content'));

    // Ensure panels start collapsed
    panels.forEach(panel => {
      panel.style.maxHeight = '0px';
    });

    function closeAllExcept(exceptIndex = -1) {
      panels.forEach((panel, i) => {
        const btn = buttons[i];
        if (i === exceptIndex) return;
        panel.style.maxHeight = '0px';
        if (btn) {
          btn.setAttribute('aria-expanded', 'false');
          const icon = btn.querySelector('.faq-icon');
          if (icon) icon.textContent = '+';
        }
      });
    }

    buttons.forEach((btn, idx) => {
      const panel = panels[idx];
      const icon = btn.querySelector('.faq-icon');

      // click toggles
      btn.addEventListener('click', () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';

        if (isOpen) {
          // close
          panel.style.maxHeight = '0px';
          btn.setAttribute('aria-expanded', 'false');
          if (icon) icon.textContent = '+';
        } else {
          // close others, then open this
          closeAllExcept(idx);
          panel.style.maxHeight = panel.scrollHeight + 'px';
          btn.setAttribute('aria-expanded', 'true');
          if (icon) icon.textContent = '−';
        }
      });

      // keyboard accessibility
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          const next = e.key === 'ArrowDown' ? (idx + 1) % buttons.length : (idx - 1 + buttons.length) % buttons.length;
          buttons[next].focus();
        }
      });

      // Make sure panel height adjusts on window resize (if content wraps)
      window.addEventListener('resize', () => {
        if (btn.getAttribute('aria-expanded') === 'true') {
          // refresh to new scrollHeight
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    });

    // Optional: close all on click outside
    document.addEventListener('click', (e) => {
      const inside = e.target.closest('.faq-item');
      if (!inside) closeAllExcept(-1);
    }, { passive: true });
  });