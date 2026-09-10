// ─────────────────────────────────────────────────────────────────────────
// I Move It — rendering & wiring
//
// This file only renders what's in coach-field-guide-data.js — it has no
// content of its own. To change what coaches see, edit that file, not
// this one.
// ─────────────────────────────────────────────────────────────────────────
(function () {
  var dayGrid = document.getElementById('fg-daytype-grid');
  var resultEl = document.getElementById('fg-result');
  var printEl = document.getElementById('print-guide');
  if (!dayGrid || !resultEl) return;

  var state = { dayType: null };

  function escapeHtml(s) {
    return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function makeToggleButton(id, label, hint, onSelect) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'fg-daytype-btn';
    btn.setAttribute('aria-pressed', 'false');
    btn.innerHTML = '<span class="fg-btn-label">' + escapeHtml(label) + '</span>' +
      (hint ? '<span class="fg-btn-hint">' + escapeHtml(hint) + '</span>' : '');
    btn.addEventListener('click', function () { onSelect(id, btn); });
    return btn;
  }

  function selectInGroup(grid, activeBtn) {
    Array.prototype.forEach.call(grid.children, function (btn) {
      var isActive = btn === activeBtn;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  // ─── Coaching-day type selector ─────────────────────────────────────
  DAY_TYPES.forEach(function (dt) {
    var btn = makeToggleButton(dt.id, dt.label, dt.hint, function (id, btnEl) {
      selectInGroup(dayGrid, btnEl);
      state.dayType = id;
      renderResult();
    });
    dayGrid.appendChild(btn);
  });

  var DAY_TYPE_LOOKUP = {};
  DAY_TYPES.forEach(function (dt) { DAY_TYPE_LOOKUP[dt.id] = dt; });

  // ─── Printable guide ─────────────────────────────────────────────────
  function buildPrintHtml(dayTypeId) {
    var dayDef = DAY_TYPE_LOOKUP[dayTypeId];
    var g = COACHING_DAY_GUIDES[dayTypeId];
    if (!dayDef || !g) return '';

    var before = PRINT_SHARED.before.slice();
    if (g.beforeExtra) before.push(g.beforeExtra);

    function textSection(title, text) {
      return '<div class="print-section"><h2>' + escapeHtml(title) + '</h2><p>' + escapeHtml(text) + '</p></div>';
    }
    function listSection(title, items) {
      return '<div class="print-section"><h2>' + escapeHtml(title) + '</h2><ul>' +
        items.map(function (i) { return '<li>' + escapeHtml(i) + '</li>'; }).join('') +
        '</ul></div>';
    }

    var html = '';
    html += '<div class="print-brand">Prisms Coach Hub</div>';
    html += '<h1>' + escapeHtml(dayDef.label) + '</h1>';
    html += textSection('Purpose', g.purpose);
    html += textSection('Coach Role', g.coachRole);
    html += textSection('Teacher Role', g.teacherRole);
    html += textSection('What Success Looks Like', g.success);
    html += listSection('Before the Coaching Day', before);
    html += listSection('During the Coaching Day', PRINT_SHARED.during);
    html += listSection('After the Coaching Day', PRINT_SHARED.after);
    return html;
  }

  function printGuide(dayTypeId) {
    if (!printEl) return;
    printEl.innerHTML = buildPrintHtml(dayTypeId);
    window.print();
  }

  // ─── Result panel ────────────────────────────────────────────────────
  function renderResult() {
    if (!state.dayType) { resultEl.innerHTML = ''; return; }
    var dayDef = DAY_TYPE_LOOKUP[state.dayType];
    var g = COACHING_DAY_GUIDES[state.dayType];
    if (!g) {
      resultEl.innerHTML = '<div class="fg-empty">No guide content yet for this day type.</div>';
      return;
    }

    var html = '';
    html += '<div class="fg-result">';
    html += '<div class="fg-result-header"><div class="fg-result-title">' + escapeHtml(dayDef.label) + '</div></div>';
    html += '<div class="fg-block"><div class="fg-label">Purpose</div><p class="fg-text">' + escapeHtml(g.purpose) + '</p></div>';
    html += '<div class="fg-block"><div class="fg-label">Coach Role</div><p class="fg-text">' + escapeHtml(g.coachRole) + '</p></div>';
    html += '<div class="fg-block"><div class="fg-label">Teacher Role</div><p class="fg-text">' + escapeHtml(g.teacherRole) + '</p></div>';
    html += '<div class="fg-block"><div class="fg-label">What Success Looks Like</div><p class="fg-text">' + escapeHtml(g.success) + '</p></div>';
    html += '<button type="button" class="cycle-card-link fg-print-btn">Print Full Guide</button>';
    html += '</div>';
    resultEl.innerHTML = html;

    var printBtn = resultEl.querySelector('.fg-print-btn');
    if (printBtn) {
      printBtn.addEventListener('click', function () { printGuide(state.dayType); });
    }

    resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
})();
