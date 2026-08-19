/* =========================================================
   Shri Amarnath S — Portfolio
   Mobile nav · scroll reveal · document preview/download modal
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- MOBILE NAV ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = navToggle.querySelector('i');
      const isOpen = navLinks.classList.contains('open');
      icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });

    // Close the mobile menu after a link is tapped
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.querySelector('i').className = 'fa-solid fa-bars';
      });
    });
  }

  /* ---------- SCROLL REVEAL ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- DOCUMENT PREVIEW / DOWNLOAD MODAL ---------- */
  // Update the `file` paths below once the real PDFs are added to
  // assets/documents/ in the repo (see assets/documents/README.txt).
  const DOCS = {
    resume: {
      title: 'Résumé — Shri Amarnath S',
      sub: 'PDF · Updated August 2026',
      file: 'assets/documents/resume.pdf'
    },
    nptel: {
      title: 'NPTEL Elite Certificate',
      sub: 'IIT Kharagpur',
      file: 'assets/documents/nptel-elite-certificate.pdf'
    },
    publication: {
      title: 'Publication Certificate',
      sub: 'IC-AIETS 2026',
      file: 'assets/documents/ic-aiets-2026-publication.pdf'
    },
    internship: {
      title: 'Internship Completion Certificate',
      sub: 'Astonish Infotech',
      file: 'assets/documents/astonish-infotech-internship.pdf'
    },
    nacotech: {
      title: 'Code Crack — 2nd Prize',
      sub: 'NacoTech 2K26',
      file: 'assets/documents/nacotech-2k26-code-crack.pdf'
    }
  };

  const backdrop = document.getElementById('modalBackdrop');
  const modalTitle = document.getElementById('modalTitle');
  const modalSub = document.getElementById('modalSub');
  const modalBody = document.getElementById('modalBody');
  const modalDownload = document.getElementById('modalDownload');
  const modalClose = document.getElementById('modalClose');
  let lastFocused = null;

  function isImage(path) {
    return /\.(png|jpe?g|webp|gif|svg)$/i.test(path);
  }

  function openModal(docKey) {
    const doc = DOCS[docKey];
    if (!doc) return;

    modalTitle.textContent = doc.title;
    modalSub.textContent = doc.sub;
    modalDownload.href = doc.file;

    modalBody.innerHTML = isImage(doc.file)
      ? `<img src="${doc.file}" alt="${doc.title}">`
      : `<iframe src="${doc.file}" title="${doc.title}"></iframe>`;

    lastFocused = document.activeElement;
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
    modalBody.innerHTML = ''; // stop any loading PDF/image
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('[data-doc]').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.getAttribute('data-doc')));
  });

  modalClose.addEventListener('click', closeModal);

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) closeModal();
  });

});
