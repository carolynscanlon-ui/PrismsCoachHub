// ─────────────────────────────────────────────────────────────────────────
// I Move It — coaching-day type content
//
// EDIT THIS FILE to change what coaches see for each coaching-day type.
// Rendering lives in coach-field-guide.js — this file is pure content.
//
// These five coaching-day types are defined by the coach's and teacher's
// roles during the visit, not by the four Prisms instructional day types
// (Tutorial, Content Module, Transfer/Assessment, Skill Builder).
// ─────────────────────────────────────────────────────────────────────────

var DAY_TYPES = [
  { id: 'tutorial', label: 'Tutorial Day', hint: "Students' first time in VR" },
  { id: 'vr-co-taught', label: 'VR Co-Taught', hint: 'You and the teacher share the VR lesson' },
  { id: 'vr-teacher-led', label: 'VR Teacher-Led', hint: 'Teacher leads the VR lesson solo' },
  { id: 'transfer-co-taught', label: 'Transfer Co-Taught', hint: 'You and the teacher share Transfer Day' },
  { id: 'transfer-teacher-led', label: 'Transfer Teacher-Led', hint: 'Teacher leads Transfer Day solo' }
];

// ─── Printable guide — shared before/during/after items ───────────────────
// Identical across all five day types except a day-specific addition to
// "before" (see beforeExtra on individual guides below).
var PRINT_SHARED = {
  before: [
    'Confirm the lesson, class periods, coaching-day type, and goal',
    'Complete lesson study',
    'Send the pre-coaching email',
    'Confirm materials, rosters, headsets, and teacher readiness'
  ],
  during: [
    'Protect the instructional purpose and learning arc',
    'Coach toward increasing teacher ownership',
    'Capture evidence connected to the coaching goal'
  ],
  after: [
    'Complete the Service Tracker by class period',
    'Complete the Coaching AAR within 48–72 hours',
    'Send the post-coaching email',
    'Share the appropriate leave-behind or resources',
    'Identify strengths and one or two actionable next steps',
    'Confirm the next implementation opportunity or coaching date when possible',
    'Communicate significant successes, needs, or risks to the appropriate CSM or team member'
  ]
};

// ─── Per-day-type content ───────────────────────────────────────────────
// purpose / coachRole / teacherRole / success show on the page.
// beforeExtra (optional) is a day-specific addition to the printable
// guide's "Before the Coaching Day" list only.
var COACHING_DAY_GUIDES = {
  tutorial: {
    purpose: 'Prepare students and the teacher for successful use of the headsets and establish classroom routines before the first Content Module.',
    coachRole: 'Help the teacher prepare the classroom and technology, model or co-facilitate the Tutorial as needed, support troubleshooting, and help establish efficient headset routines.',
    teacherRole: 'Remain actively involved, learn and practice the routines, manage students, participate in troubleshooting, and prepare to lead future VR experiences.',
    success: 'Students can independently access and navigate the VR environment, classroom routines are established, student tech helpers are ready, and the teacher feels prepared for the first Content Module.',
    beforeExtra: 'Confirm student tech helpers have been identified'
  },

  'vr-co-taught': {
    purpose: 'Support a teacher who is developing readiness to facilitate the VR portion of a Content Module.',
    coachRole: 'Plan with the teacher, share facilitation responsibilities, model selected instructional or technical moves, and provide just-in-time support without taking over the entire experience.',
    teacherRole: 'Actively facilitate agreed-upon portions of the lesson, manage students, monitor learning, and practice the routines that will support future independence.',
    success: 'The complete VR learning experience is protected, responsibilities are genuinely shared, and the teacher is ready to assume greater ownership during the next opportunity.'
  },

  'vr-teacher-led': {
    purpose: 'Strengthen teacher ownership and instructional quality during a teacher-led VR lesson.',
    coachRole: 'Observe, collect evidence, support only when needed, and provide specific feedback connected to the five routines and the agreed-upon coaching goal.',
    teacherRole: 'Lead the lesson, manage the technology and students, monitor student thinking, and facilitate the instructional arc.',
    success: 'The teacher successfully leads the VR experience and leaves with a clearly identified strength and an actionable next step.'
  },

  'transfer-co-taught': {
    purpose: 'Help the teacher connect the VR experience to formal math or science reasoning during Transfer Day.',
    coachRole: 'Plan and facilitate selected portions with the teacher, model questioning or discourse moves, and help use student thinking and CFU evidence to guide instruction.',
    teacherRole: 'Lead agreed-upon portions of the lesson, connect the student experience to disciplinary concepts, facilitate writing and discourse, and respond to student understanding.',
    success: 'Students make the intended connection between the immersive experience and the formal content, and the teacher is increasingly prepared to lead Transfer Day independently.'
  },

  'transfer-teacher-led': {
    purpose: 'Strengthen independent teacher implementation of Transfer Day, the Proximal CFU, and revision.',
    coachRole: 'Observe, collect evidence, support only when necessary, and provide focused feedback connected to the agreed-upon goal.',
    teacherRole: 'Lead the lesson, facilitate writing and discourse, monitor understanding, use CFU evidence, and support revision.',
    success: 'The teacher protects the complete Transfer Day arc and uses student evidence to determine the next instructional step.'
  }
};
