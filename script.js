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
// Free API key from https://getaddress.io (100 lookups/day on free plan)
var GETADDRESS_KEY = '';

(function () {
  var postcodeInput  = document.getElementById('postcode');
  var findBtn        = document.getElementById('findAddressBtn');
  var feedbackEl     = document.getElementById('postcode-feedback');
  var addressSelect  = document.getElementById('address-select');
  if (!postcodeInput || !findBtn) return;

  function setFeedback(msg, type) {
    feedbackEl.textContent = msg;
    feedbackEl.className = 'postcode-feedback' + (type ? ' ' + type : '');
  }

  function setBusy(busy) {
    findBtn.disabled = busy;
    findBtn.textContent = busy ? 'Searching…' : 'Find Address';
  }

  function showAddresses(addresses) {
    addressSelect.innerHTML = '';
    var placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = '— Select your address (' + addresses.length + ' found) —';
    addressSelect.appendChild(placeholder);

    addresses.forEach(function (line) {
      var opt = document.createElement('option');
      opt.value = line;
      opt.textContent = line;
      addressSelect.appendChild(opt);
    });

    addressSelect.style.display = 'block';
    addressSelect.focus();
  }

  function lookupWithGetAddress(postcode) {
    return fetch(
      'https://api.getaddress.io/find/' + encodeURIComponent(postcode) +
      '?api-key=' + GETADDRESS_KEY + '&expand=true'
    )
    .then(function (r) {
      if (!r.ok) throw new Error('not_found');
      return r.json();
    })
    .then(function (data) {
      if (!data.addresses || !data.addresses.length) throw new Error('no_results');
      return data.addresses.map(function (a) {
        return a.formatted_address.filter(Boolean).join(', ');
      });
    });
  }

  // Free fallback: postcodes.io validates the postcode, Nominatim finds buildings
  function lookupFree(postcode) {
    var clean = postcode.replace(/\s+/g, '').toUpperCase();
    return fetch('https://api.postcodes.io/postcodes/' + encodeURIComponent(clean))
      .then(function (r) { return r.json(); })
      .then(function (pcData) {
        if (pcData.status !== 200 || !pcData.result) throw new Error('invalid_postcode');
        var area = [pcData.result.admin_district, pcData.result.admin_county].filter(Boolean).join(', ');
        // Search Nominatim for buildings/houses at this postcode
        return fetch(
          'https://nominatim.openstreetmap.org/search' +
          '?format=json&addressdetails=1&limit=50&countrycodes=gb' +
          '&postalcode=' + encodeURIComponent(postcode)
        )
        .then(function (r) { return r.json(); })
        .then(function (results) {
          var addresses = results
            .filter(function (r) { return r.address && (r.address.house_number || r.address.building); })
            .map(function (r) {
              var parts = [
                r.address.house_number || r.address.building,
                r.address.road,
                r.address.suburb,
                r.address.town || r.address.city || r.address.village
              ].filter(Boolean);
              return parts.join(', ');
            });
          return { addresses: addresses, area: area };
        });
      });
  }

  function doLookup() {
    var postcode = postcodeInput.value.trim().toUpperCase();
    if (postcode.length < 5) {
      setFeedback('Please enter a valid postcode', 'error');
      return;
    }

    setBusy(true);
    setFeedback('Finding addresses…', 'loading');
    addressSelect.style.display = 'none';

    var lookup = GETADDRESS_KEY
      ? lookupWithGetAddress(postcode).then(function (addresses) { return { addresses: addresses, area: '' }; })
      : lookupFree(postcode);

    lookup
      .then(function (result) {
        setBusy(false);
        if (result.addresses && result.addresses.length > 0) {
          var areaText = result.area ? ' in ' + result.area : '';
          setFeedback('✓ ' + result.addresses.length + ' addresses found' + areaText, 'success');
          showAddresses(result.addresses);
        } else {
          var hint = result.area ? ' — ' + result.area : '';
          setFeedback('✓ Valid postcode' + hint + ' — no street-level data available, please enter address manually', 'success');
        }
      })
      .catch(function (err) {
        setBusy(false);
        var msg = (err.message === 'invalid_postcode' || err.message === 'not_found')
          ? 'Postcode not found — please check and try again'
          : 'Could not reach address service — please try again';
        setFeedback(msg, 'error');
      });
  }

  findBtn.addEventListener('click', doLookup);
  postcodeInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); doLookup(); }
  });
  postcodeInput.addEventListener('input', function () {
    addressSelect.style.display = 'none';
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
