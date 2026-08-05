// Sticky header shadow
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  nav.classList.toggle('open');
});

// Mobile dropdown toggles
document.querySelectorAll('.nav-item.has-dropdown .nav-link').forEach(link => {
  link.addEventListener('click', e => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      link.parentElement.classList.toggle('open');
    }
  });
});

// Close nav when a link is clicked (mobile)
document.querySelectorAll('.dropdown a, .nav-item:not(.has-dropdown) .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      nav.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });
});

// Back to top
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Quote form submission
document.getElementById('quoteForm').addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('modalOverlay').classList.add('active');
  e.target.reset();
});

document.getElementById('modalClose').addEventListener('click', () => {
  document.getElementById('modalOverlay').classList.remove('active');
});

document.getElementById('modalOverlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) e.currentTarget.classList.remove('active');
});

// ── Postcode address lookup ──────────────────────────────────────────────────
// Sign up free at https://getaddress.io (100 lookups/day, no credit card)
// then paste your API key below:
var GETADDRESS_KEY = '';

(function () {
  var postcodeInput = document.getElementById('postcode');
  var findBtn       = document.getElementById('findAddressBtn');
  var feedbackEl    = document.getElementById('postcode-feedback');
  var addrSelect    = document.getElementById('address-select');
  var addrManual    = document.getElementById('address-manual');
  if (!postcodeInput || !findBtn) return;

  function setFeedback(msg, type) {
    feedbackEl.textContent = msg;
    feedbackEl.className = 'postcode-feedback' + (type ? ' ' + type : '');
  }

  function setBusy(busy) {
    findBtn.disabled = busy;
    findBtn.textContent = busy ? 'Searching…' : 'Find Address';
  }

  function hideAddressFields() {
    addrSelect.style.display = 'none';
    addrSelect.disabled = true;
    addrManual.style.display = 'none';
    addrManual.disabled = true;
  }

  function showDropdown(addresses) {
    addrManual.style.display = 'none';
    addrManual.disabled = true;
    addrSelect.innerHTML = '';
    var ph = document.createElement('option');
    ph.value = '';
    ph.textContent = '— Select your address (' + addresses.length + ' found) —';
    addrSelect.appendChild(ph);
    addresses.forEach(function (line) {
      var opt = document.createElement('option');
      opt.value = line;
      opt.textContent = line;
      addrSelect.appendChild(opt);
    });
    addrSelect.disabled = false;
    addrSelect.style.display = 'block';
    addrSelect.focus();
  }

  function showManualEntry(hint) {
    addrSelect.style.display = 'none';
    addrSelect.disabled = true;
    addrManual.placeholder = hint ? 'e.g. 42 ' + hint : 'Enter your full address';
    addrManual.disabled = false;
    addrManual.style.display = 'block';
    addrManual.focus();
  }

  function doLookup() {
    var postcode = postcodeInput.value.trim().toUpperCase();
    if (postcode.length < 5) {
      setFeedback('Please enter a valid postcode first', 'error');
      return;
    }

    setBusy(true);
    setFeedback('Searching…', 'loading');
    hideAddressFields();

    if (GETADDRESS_KEY) {
      // getAddress.io — Royal Mail PAF data, fast & accurate
      fetch('https://api.getaddress.io/find/' + encodeURIComponent(postcode) +
            '?api-key=' + GETADDRESS_KEY + '&expand=true')
        .then(function (r) {
          if (r.status === 401) throw new Error('bad_key');
          if (!r.ok) throw new Error('not_found');
          return r.json();
        })
        .then(function (data) {
          setBusy(false);
          if (!data.addresses || !data.addresses.length) throw new Error('no_results');
          var addresses = data.addresses.map(function (a) {
            return a.formatted_address.filter(Boolean).join(', ');
          });
          setFeedback('✓ ' + addresses.length + ' addresses found', 'success');
          showDropdown(addresses);
        })
        .catch(function (err) {
          setBusy(false);
          if (err.message === 'bad_key') {
            setFeedback('API key invalid — check your getaddress.io key', 'error');
          } else if (err.message === 'not_found' || err.message === 'no_results') {
            setFeedback('No addresses found for this postcode', 'error');
          } else {
            setFeedback('Could not reach address service — please enter address manually', 'error');
            showManualEntry('');
          }
        });
    } else {
      // No API key — validate postcode with postcodes.io (fast, ~100ms)
      // then ask user to type their address
      fetch('https://api.postcodes.io/postcodes/' + encodeURIComponent(postcode.replace(/\s+/g, '')))
        .then(function (r) { return r.json(); })
        .then(function (data) {
          setBusy(false);
          if (data.status !== 200 || !data.result) {
            setFeedback('Postcode not found — please check and try again', 'error');
            return;
          }
          var road = data.result.thoroughfare || '';
          var area = [data.result.admin_district, data.result.admin_county].filter(Boolean).join(', ');
          setFeedback('✓ ' + postcode + (area ? ' — ' + area : ''), 'success');
          showManualEntry(road);
        })
        .catch(function () {
          setBusy(false);
          setFeedback('Could not validate postcode — please enter address manually', 'error');
          showManualEntry('');
        });
    }
  }

  findBtn.addEventListener('click', doLookup);
  postcodeInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); doLookup(); }
  });
  postcodeInput.addEventListener('input', function () {
    hideAddressFields();
    setFeedback('', '');
  });
})();

// Animate elements on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .guarantee-card, .testimonial-card, .step, .biz-card, .contact-card, .accreditation-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});
