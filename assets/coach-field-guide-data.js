// ─────────────────────────────────────────────────────────────────────────
// I Move It — coaching-day type content
//
// EDIT THIS FILE to change what coaches see for each coaching-day type.
// Rendering lives in coach-field-guide.js — this file is pure content.
//
// These five coaching-day types are defined by the coach's and teacher's
// roles during the visit, not by the four Prisms instructional day types
// (Tutorial, Content Module, Transfer/Assessment, Skill Builder).
//
// Each type has:
//   - purpose / coachRole / teacherRole / success — the always-visible summary
//   - howToCoach — the collapsible "How to Coach This Day" detail, specific
//     to this day type only (the generic prep/follow-up checklist already
//     lives in the I Prep For It / I Close the Loop cards above, so this
//     stays focused on what's unique to this day type)
// ─────────────────────────────────────────────────────────────────────────

var DAY_TYPES = [
  { id: 'tutorial', label: 'Tutorial Day', hint: "Students' first time in VR" },
  { id: 'vr-co-taught', label: 'VR Co-Taught', hint: 'You and the teacher share the VR lesson' },
  { id: 'vr-teacher-led', label: 'VR Teacher-Led', hint: 'Teacher leads the VR lesson' },
  { id: 'transfer-co-taught', label: 'Transfer Co-Taught', hint: 'You and the teacher share Transfer Day' },
  { id: 'transfer-teacher-led', label: 'Transfer Teacher-Led', hint: 'Teacher leads Transfer Day' }
];

// ─── Printable guide — generic checklist shared by every day type ─────────
// Folded into the print output alongside the day-specific howToCoach
// content so a printed guide is complete on its own, without also needing
// the I Prep For It / I Close the Loop cards in hand.
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
var COACHING_DAY_GUIDES = {

  tutorial: {
    purpose: 'Prepare students and the teacher for successful use of the headsets and establish classroom routines before the first Content Module.',
    coachRole: 'Help the teacher prepare the classroom and technology, model or co-facilitate the Tutorial as needed, support troubleshooting, and help establish efficient headset routines.',
    teacherRole: 'Remain actively involved, learn and practice the routines, manage students, participate in troubleshooting, and prepare to lead future VR experiences.',
    success: 'Students can independently access and navigate the VR environment, classroom routines are established, student tech helpers are ready, and the teacher feels prepared for the first Content Module.',
    beforeExtra: 'Confirm student tech helpers have been identified',
    howToCoach: {
      beforeVisit: [
        'Confirm headsets are charged and updated',
        'Identify 2–3 students who will become tech helpers',
        'Decide on a distribution method with the teacher — pre-placed, grab-and-go, or tech helpers'
      ],
      duringLesson: [
        'Prepare equipment together: headsets powered off before charging, controllers matched to their headset',
        'Choose and model a distribution method — pre-placed, grab-and-go, or tech helpers',
        'Walk through headset setup as a group: strap fit, play boundary, and the VR Norms (Explore, Persist)',
        'Identify and train 2–3 tech helpers on the 5 primary troubleshooting issues'
      ],
      lookFor: {
        good: [
          'All instructions given before any headset goes on',
          'Auto Launch used from the Teacher Dashboard where possible',
          'Tech helpers actively distributing/collecting, not just watching'
        ],
        watch: [
          'No tech helpers identified yet, so the teacher is doing all the logistics solo',
          'Headset distribution or login eating most of the period',
          "Students unsure of VR Norms language (Explore / Persist) since it's their first exposure"
        ]
      },
      afterVisit: [
        'Can 2–3 tech helpers independently handle the 5 primary troubleshooting issues?',
        'Can the teacher run Auto Launch from the Dashboard without help?',
        'Did the hardware routine start-to-finish take noticeably less time than when the visit began?'
      ],
      examples: [
        { if: 'a student is hesitant to put the headset on', then: 'make the Frame conversation engaging, remind them breaks are OK, and offer a timer if it helps' },
        { if: 'distribution is taking too long', then: 'pre-set headsets on desks before class next time, or lean more on tech helpers' }
      ]
    }
  },

  'vr-co-taught': {
    purpose: 'Support a teacher who is developing readiness to facilitate the VR portion of a Content Module.',
    coachRole: 'Plan with the teacher, share facilitation responsibilities, model selected instructional or technical moves, and provide just-in-time support without taking over the entire experience.',
    teacherRole: 'Actively facilitate agreed-upon portions of the lesson, manage students, monitor learning, and practice the routines that will support future independence.',
    success: 'The complete VR learning experience is protected, responsibilities are genuinely shared, and the teacher is ready to assume greater ownership during the next opportunity.',
    howToCoach: {
      beforeVisit: [
        "Agree on which portions of Just-in-Time Feedback and the post-VR synthesis/discussion you'll each facilitate",
        'Preview the Synthesis Activity and discussion prompts together'
      ],
      duringLesson: [
        'Co-facilitate feedback in order: hints/peer support first, then individual conferencing (screencast, Teacher Talk Track, Socratic questions), then small/whole-group conferencing if a misconception is shared',
        'Provide the Synthesis Activity before VR ends and monitor the Dashboard to confirm students reach the Critical Task',
        'Coach student writing side by side with the teacher — press for a claim, ask for evidence, prompt for reasoning',
        'Select 2–3 representative student responses and use discussion prompts ("Do you agree or disagree? Why?") to facilitate discourse together'
      ],
      lookFor: {
        good: [
          'Teacher Dashboard open and monitored throughout VR',
          'Hints and peer support tried before individual conferencing',
          'Students write independently before any discussion begins'
        ],
        watch: [
          'Individual conferencing happening before hints/peer support are tried',
          'Synthesis Activity introduced too late, after most students have already left VR',
          'Discussion starting before students have written anything down'
        ]
      },
      afterVisit: [
        'Can the teacher describe, unprompted, when to use hints/peer support vs. individual vs. group conferencing?',
        'Did a full write-before-discuss cycle happen without you prompting it?',
        'Did the teacher connect student thinking back to the lesson objective during consolidation?'
      ],
      examples: [
        { if: "a student is stuck and hints/peer support haven't worked", then: 'move to individual conferencing — screencast and use the Teacher Talk Track or Socratic questions' },
        { if: 'several students share the same misconception', then: 'pause for small or whole-group conferencing rather than repeating the same individual conference' }
      ]
    }
  },

  'vr-teacher-led': {
    purpose: 'Strengthen teacher ownership and instructional quality during a teacher-led VR lesson.',
    coachRole: 'Observe, collect evidence, support only when needed, and provide specific feedback connected to the five routines and the agreed-upon coaching goal.',
    teacherRole: 'Lead the lesson, manage the technology and students, monitor student thinking, and facilitate the instructional arc.',
    success: 'The teacher successfully leads the VR experience and leaves with a clearly identified strength and an actionable next step.',
    howToCoach: {
      beforeVisit: [
        "Agree on the coaching goal and what evidence you'll collect",
        "Confirm you'll observe rather than co-facilitate unless a specific trigger requires stepping in"
      ],
      duringLesson: [
        "Observe which Just-in-Time Feedback level the teacher reaches for and whether it matches what's actually happening",
        'Step in only if a shared misconception goes unaddressed, or writing time is about to be skipped',
        'Whisper-coach sparingly — a quiet prompt, not a takeover'
      ],
      lookFor: {
        good: [
          'Teacher tries hints/peer support before jumping to individual conferencing',
          'Synthesis Activity assigned before VR time runs out',
          'Discussion prompts press for reasoning, not just answers'
        ],
        watch: [
          'Teacher jumps straight to individual conferencing without trying hints/peer support first',
          'Discourse becomes teacher-led telling instead of student discussion',
          'Consolidation gets rushed or skipped at the end'
        ]
      },
      afterVisit: [
        'Did the teacher match the right feedback level to the situation without a prompt from you?',
        'Did writing precede discussion without your intervention?',
        'Do you have specific, nameable evidence for the debrief?'
      ],
      examples: [
        { if: 'the teacher misses a shared misconception affecting multiple students', then: 'a brief, direct nudge to pause for group conferencing — this is worth interrupting for' },
        { if: 'writing time is about to be skipped', then: 'whisper-coach a reminder before discussion starts, rather than letting it go' }
      ]
    }
  },

  'transfer-co-taught': {
    purpose: 'Help the teacher connect the VR experience to formal math or science reasoning during Transfer Day.',
    coachRole: 'Plan and facilitate selected portions with the teacher, model questioning or discourse moves, and help use student thinking and CFU evidence to guide instruction.',
    teacherRole: 'Lead agreed-upon portions of the lesson, connect the student experience to disciplinary concepts, facilitate writing and discourse, and respond to student understanding.',
    success: 'Students make the intended connection between the immersive experience and the formal content, and the teacher is increasingly prepared to lead Transfer Day independently.',
    howToCoach: {
      beforeVisit: [
        'Review the AI feedback data together ahead of time if possible',
        "Agree on which portions of the revision cycle each of you will lead"
      ],
      duringLesson: [
        'Co-review AI feedback with the teacher and sort responses into Ready to move on / Nearly there / Needs review',
        'Model selecting the right revision pathway: procedural (redo on paper, Skill Builder if it’s a prerequisite gap), conceptual (conference briefly, revisit the Synthesis Activity), or written communication (sentence frame in Writing Guidance)',
        'Ask the pathway-specific diagnostic questions together — "What is the question asking?" or "What evidence supports your thinking?"',
        'Confirm students can explain what changed before retaking the CFU'
      ],
      lookFor: {
        good: [
          'Revision pathway matches the actual type of error',
          'Students retake the CFU after revising, not just review the answer',
          'Teacher confirms understanding before moving on'
        ],
        watch: [
          'Every student gets the same revision approach regardless of error type',
          'Revision becomes "look at the answer again" instead of a real pathway',
          'No time left to retake the CFU after revising'
        ]
      },
      afterVisit: [
        'Can the teacher independently match error type to revision pathway?',
        'Could students explain what changed in their own thinking?',
        'Did a full revision-and-retake cycle happen without you leading it?'
      ],
      examples: [
        { if: 'time is short and revision is at risk of being skipped', then: 'protect a shortened version — even one pathway, fully done, beats a rushed pass at all three' },
        { if: "a student's error doesn't clearly match one pathway", then: 'model asking the diagnostic questions together to figure out which one actually fits' }
      ]
    }
  },

  'transfer-teacher-led': {
    purpose: 'Strengthen independent teacher implementation of Transfer Day, the Proximal CFU, and revision.',
    coachRole: 'Observe, collect evidence, support only when necessary, and provide focused feedback connected to the agreed-upon goal.',
    teacherRole: 'Lead the lesson, facilitate writing and discourse, monitor understanding, use CFU evidence, and support revision.',
    success: 'The teacher protects the complete Transfer Day arc and uses student evidence to determine the next instructional step.',
    howToCoach: {
      beforeVisit: [
        "Agree on the coaching goal and what evidence you'll collect",
        'Plan to observe the revision cycle rather than co-facilitate, unless time is at risk of running out'
      ],
      duringLesson: [
        'Observe how the teacher sorts AI feedback results and assigns revision pathways',
        'Whisper-coach only if revision time is about to be cut entirely',
        "Note which diagnostic questions got used, or didn't, for the debrief"
      ],
      lookFor: {
        good: [
          'Different error types get routed to different revision pathways',
          'Students explain what changed before retaking the CFU',
          'Teacher confirms understanding rather than assuming it from a resubmission'
        ],
        watch: [
          'All errors treated the same way regardless of type',
          'Revision skipped or rushed when time runs short',
          'Retaking the CFU happens without students first explaining their change in thinking'
        ]
      },
      afterVisit: [
        'Did revision pathways match actual error types without your prompting?',
        'Did students retake the CFU after genuinely revising, not just resubmitting?',
        'Do you have specific, nameable evidence for the follow-up email?'
      ],
      examples: [
        { if: 'the teacher is about to skip revision for time', then: 'a quiet prompt to protect even a shortened version beats skipping it entirely' },
        { if: "revision pathway doesn't match the error type", then: 'flag it for the debrief rather than correcting it live' }
      ]
    }
  }
};
