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

  // ─── Shared list/example helpers ─────────────────────────────────────
  function listHtml(items, listClass) {
    if (!items || !items.length) return '';
    return '<ul class="' + listClass + '">' +
      items.map(function (i) { return '<li>' + escapeHtml(i) + '</li>'; }).join('') +
      '</ul>';
  }

  function examplesHtml(items, wrapClass, itemClass) {
    if (!items || !items.length) return '';
    return '<div class="' + wrapClass + '">' +
      items.map(function (ex) {
        return '<div class="' + itemClass + '"><strong>If ' + escapeHtml(ex.if) + '</strong> — ' + escapeHtml(ex.then) + '</div>';
      }).join('') +
      '</div>';
  }

  // ─── Printable guide ─────────────────────────────────────────────────
  // Combines the day-specific "How to Coach This Day" content with the
  // generic prep/follow-up checklist so a printed guide is complete on
  // its own — a coach doesn't need the on-screen cards in hand too.
  function buildPrintHtml(dayTypeId) {
    var dayDef = DAY_TYPE_LOOKUP[dayTypeId];
    var g = COACHING_DAY_GUIDES[dayTypeId];
    if (!dayDef || !g) return '';
    var h = g.howToCoach || {};

    var before = PRINT_SHARED.before.slice();
    if (g.beforeExtra) before.push(g.beforeExtra);
    before = before.concat(h.beforeVisit || []);

    var during = (h.duringLesson || []).concat(PRINT_SHARED.during);

    var lookForGood = (h.lookFor || {}).good || [];
    var lookForWatch = (h.lookFor || {}).watch || [];

    var after = (h.afterVisit || []).concat(PRINT_SHARED.after);

    function textSection(title, text) {
      return '<div class="print-section"><h2>' + escapeHtml(title) + '</h2><p>' + escapeHtml(text) + '</p></div>';
    }
    function listSection(title, items) {
      if (!items || !items.length) return '';
      return '<div class="print-section"><h2>' + escapeHtml(title) + '</h2><ul>' +
        items.map(function (i) { return '<li>' + escapeHtml(i) + '</li>'; }).join('') +
        '</ul></div>';
    }

    var body = '';
    body += textSection('Purpose', g.purpose);
    body += textSection('Coach Role', g.coachRole);
    body += textSection('Teacher Role', g.teacherRole);
    body += textSection('What Success Looks Like', g.success);

    body += listSection('Before the Visit', before);
    body += listSection('During the Lesson', during);

    if (lookForGood.length || lookForWatch.length) {
      body += '<div class="print-section"><h2>What to Look and Listen For</h2>';
      if (lookForGood.length) body += '<p class="print-sublabel">Signs it&rsquo;s going well</p><ul>' + lookForGood.map(function (i) { return '<li>' + escapeHtml(i) + '</li>'; }).join('') + '</ul>';
      if (lookForWatch.length) body += '<p class="print-sublabel">Watch for</p><ul>' + lookForWatch.map(function (i) { return '<li>' + escapeHtml(i) + '</li>'; }).join('') + '</ul>';
      body += '</div>';
    }

    body += listSection('After the Visit', after);

    if (h.examples && h.examples.length) {
      body += '<div class="print-section"><h2>Concrete Examples</h2>' +
        h.examples.map(function (ex) {
          return '<p><strong>If ' + escapeHtml(ex.if) + '</strong> — ' + escapeHtml(ex.then) + '</p>';
        }).join('') +
        '</div>';
    }

    // Header spans the full page width; everything else flows in two
    // print columns so a full guide fits on one page (or breaks cleanly
    // at a section boundary onto a second) without shrinking the text.
    var html = '';
    html += '<div class="print-header">';
    html += '<div class="print-brand">Prisms Coach Hub</div>';
    html += '<h1>' + escapeHtml(dayDef.label) + '</h1>';
    html += '</div>';
    html += '<div class="print-columns">' + body + '</div>';
    return html;
  }

  function printGuide(dayTypeId) {
    if (!printEl) return;
    printEl.innerHTML = buildPrintHtml(dayTypeId);
    window.print();
  }

  // ─── How to Coach This Day — collapsible, on-screen only ─────────────
  function renderHowToCoach(h) {
    if (!h) return '';
    var html = '<details class="fg-how-to">';
    html += '<summary>How to Coach This Day</summary>';
    html += '<div class="fg-how-to-body">';

    if (h.beforeVisit && h.beforeVisit.length) {
      html += '<div class="fg-sub-block"><div class="fg-sub-label">Before the Visit</div>' + listHtml(h.beforeVisit, 'tight-list') + '</div>';
    }
    if (h.duringLesson && h.duringLesson.length) {
      html += '<div class="fg-sub-block"><div class="fg-sub-label">During the Lesson</div>' + listHtml(h.duringLesson, 'tight-list') + '</div>';
    }
    var good = (h.lookFor || {}).good || [];
    var watch = (h.lookFor || {}).watch || [];
    if (good.length || watch.length) {
      html += '<div class="fg-sub-block"><div class="fg-sub-label">What to Look and Listen For</div>';
      if (good.length) html += '<div class="fg-sub-sub-label">Signs it&rsquo;s going well</div>' + listHtml(good, 'tight-list');
      if (watch.length) html += '<div class="fg-sub-sub-label">Watch for</div>' + listHtml(watch, 'tight-list');
      html += '</div>';
    }
    if (h.afterVisit && h.afterVisit.length) {
      html += '<div class="fg-sub-block"><div class="fg-sub-label">After the Visit</div>' + listHtml(h.afterVisit, 'tight-list') + '</div>';
    }
    if (h.examples && h.examples.length) {
      html += '<div class="fg-sub-block"><div class="fg-sub-label">Concrete Examples</div>' + examplesHtml(h.examples, 'fg-examples', 'fg-example') + '</div>';
    }

    html += '</div></details>';
    return html;
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
    html += renderHowToCoach(g.howToCoach);
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
