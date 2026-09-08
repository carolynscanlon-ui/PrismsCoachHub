(function () {
  var STATES = [
    { abbr: 'AK', name: 'Alaska', row: 1, col: 1 },
    { abbr: 'ME', name: 'Maine', row: 1, col: 13 },
    { abbr: 'WA', name: 'Washington', row: 2, col: 2 },
    { abbr: 'MT', name: 'Montana', row: 2, col: 4 },
    { abbr: 'ND', name: 'North Dakota', row: 2, col: 5 },
    { abbr: 'MN', name: 'Minnesota', row: 2, col: 6 },
    { abbr: 'WI', name: 'Wisconsin', row: 2, col: 7 },
    { abbr: 'MI', name: 'Michigan', row: 2, col: 8 },
    { abbr: 'NY', name: 'New York', row: 2, col: 11 },
    { abbr: 'VT', name: 'Vermont', row: 2, col: 12 },
    { abbr: 'NH', name: 'New Hampshire', row: 2, col: 13 },
    { abbr: 'OR', name: 'Oregon', row: 3, col: 2 },
    { abbr: 'ID', name: 'Idaho', row: 3, col: 3 },
    { abbr: 'WY', name: 'Wyoming', row: 3, col: 4 },
    { abbr: 'SD', name: 'South Dakota', row: 3, col: 5 },
    { abbr: 'IA', name: 'Iowa', row: 3, col: 6 },
    { abbr: 'IL', name: 'Illinois', row: 3, col: 7 },
    { abbr: 'IN', name: 'Indiana', row: 3, col: 8 },
    { abbr: 'OH', name: 'Ohio', row: 3, col: 9 },
    { abbr: 'PA', name: 'Pennsylvania', row: 3, col: 10 },
    { abbr: 'NJ', name: 'New Jersey', row: 3, col: 11 },
    { abbr: 'CT', name: 'Connecticut', row: 3, col: 12 },
    { abbr: 'MA', name: 'Massachusetts', row: 3, col: 13 },
    { abbr: 'NV', name: 'Nevada', row: 4, col: 2 },
    { abbr: 'UT', name: 'Utah', row: 4, col: 3 },
    { abbr: 'CO', name: 'Colorado', row: 4, col: 4 },
    { abbr: 'NE', name: 'Nebraska', row: 4, col: 5 },
    { abbr: 'MO', name: 'Missouri', row: 4, col: 6 },
    { abbr: 'KY', name: 'Kentucky', row: 4, col: 7 },
    { abbr: 'WV', name: 'West Virginia', row: 4, col: 8 },
    { abbr: 'VA', name: 'Virginia', row: 4, col: 9 },
    { abbr: 'MD', name: 'Maryland', row: 4, col: 10 },
    { abbr: 'DE', name: 'Delaware', row: 4, col: 11 },
    { abbr: 'RI', name: 'Rhode Island', row: 4, col: 13 },
    { abbr: 'CA', name: 'California', row: 5, col: 2 },
    { abbr: 'AZ', name: 'Arizona', row: 5, col: 3 },
    { abbr: 'NM', name: 'New Mexico', row: 5, col: 4 },
    { abbr: 'KS', name: 'Kansas', row: 5, col: 5 },
    { abbr: 'AR', name: 'Arkansas', row: 5, col: 6 },
    { abbr: 'TN', name: 'Tennessee', row: 5, col: 7 },
    { abbr: 'NC', name: 'North Carolina', row: 5, col: 9 },
    { abbr: 'DC', name: 'Washington, DC', row: 5, col: 10 },
    { abbr: 'OK', name: 'Oklahoma', row: 6, col: 5 },
    { abbr: 'LA', name: 'Louisiana', row: 6, col: 6 },
    { abbr: 'MS', name: 'Mississippi', row: 6, col: 7 },
    { abbr: 'AL', name: 'Alabama', row: 6, col: 8 },
    { abbr: 'GA', name: 'Georgia', row: 6, col: 9 },
    { abbr: 'SC', name: 'South Carolina', row: 6, col: 10 },
    { abbr: 'TX', name: 'Texas', row: 7, col: 5 },
    { abbr: 'FL', name: 'Florida', row: 7, col: 10 },
    { abbr: 'HI', name: 'Hawaii', row: 8, col: 1 }
  ];

  var COACHES = {
    IL: { region: 'Leadership', people: [{ name: 'Carolyn Scanlon', role: 'Professional Learning Manager' }] },
    MA: { region: 'Travel', travel: true, people: [{ name: 'Alex Jennison', role: 'Travel Coach' }] },
    TX: { region: 'Travel', travel: true, people: [{ name: 'Doug Torres', role: 'Travel Coach' }] },
    AL: { region: 'Alabama', people: [{ name: 'Tynisa Williams', role: 'Teacher Coach' }] },
    CA: { region: 'California', people: [{ name: 'Ioana Robles', role: 'Teacher Coach', city: 'CV/CA' }, { name: 'Jeremy Fishman', role: 'Teacher Coach' }, { open: true }] },
    FL: { region: 'Florida', people: [{ name: 'Michelle Walker', role: 'Teacher Coach' }, { name: 'Duke Chinn', role: 'Teacher Coach', city: 'Broward' }, { name: 'Taheerah Nasai', role: 'Teacher Coach', city: 'Broward' }, { name: 'Jordan Rhoden', role: 'Teacher Coach', city: 'Broward' }, { open: true }] },
    GA: { region: 'Georgia', people: [{ name: 'Sandreka Brown', role: 'Teacher Coach' }] },
    MI: { region: 'Michigan', people: [{ open: true }] },
    MD: { region: 'Mid Atlantic', people: [{ name: 'Philip Cygan', role: 'Teacher Coach' }] },
    DC: { region: 'Mid Atlantic', people: [{ open: true }] },
    NJ: { region: 'New Jersey', people: [{ name: 'Jennifer Stranz', role: 'Teacher Coach', city: 'Newark' }, { name: 'Amber Ginsberg', role: 'Teacher Coach', city: 'Newark' }, { name: 'Mariah Jukes', role: 'Teacher Coach', city: 'Newark' }] },
    NY: { region: 'New York', people: [{ name: 'Robert Mullen', role: 'Teacher Coach' }] },
    OK: { region: 'Oklahoma', people: [{ name: 'Janou Farrell', role: 'Teacher Coach' }] },
    SC: { region: 'South Carolina', people: [{ name: 'LaWanna McClease', role: 'Teacher Coach' }] }
  };

  var grid = document.getElementById('state-grid');
  var detail = document.getElementById('map-detail');
  if (!grid || !detail) return;

  STATES.forEach(function (state) {
    var data = COACHES[state.abbr];
    var tile = document.createElement('div');
    tile.className = 'state-tile' + (data ? ' has-coaches' : '') + (data && data.travel ? ' travel-tile' : '');
    tile.style.gridRow = state.row;
    tile.style.gridColumn = state.col;
    tile.textContent = state.abbr;
    tile.title = state.name + (data && data.travel ? ' (Travel — supports nationwide)' : '');

    if (data) {
      var filledCount = data.people.filter(function (p) { return !p.open; }).length;
      if (filledCount > 0) {
        var badge = document.createElement('span');
        badge.className = 'state-tile-count';
        badge.textContent = filledCount;
        tile.appendChild(badge);
      }
      if (data.travel) {
        var plane = document.createElement('span');
        plane.className = 'state-tile-travel';
        plane.textContent = '✈';
        tile.appendChild(plane);
      }
      tile.addEventListener('click', function () {
        document.querySelectorAll('.state-tile.selected').forEach(function (t) { t.classList.remove('selected'); });
        tile.classList.add('selected');
        renderDetail(state, data);
      });
    }

    grid.appendChild(tile);
  });

  function renderDetail(state, data) {
    var html = '<div class="map-detail-state">' + state.name + '</div>';
    html += '<div class="map-detail-region">' + data.region +
      (data.travel ? ' — based here, supports districts nationwide' : '') + '</div>';
    data.people.forEach(function (p) {
      if (p.open) {
        html += '<div class="map-detail-coach open-role"><span class="map-detail-dot"></span>Open role</div>';
      } else {
        html += '<div class="map-detail-coach"><span class="map-detail-dot"></span>' + p.name + (p.role ? ' — ' + p.role : '') + (p.city ? ' · ' + p.city : '') + '</div>';
      }
    });
    detail.innerHTML = html;
  }
})();
