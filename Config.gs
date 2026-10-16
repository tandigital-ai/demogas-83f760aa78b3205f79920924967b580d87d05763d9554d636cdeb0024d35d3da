/* AI-ARCHITECT-BANNER
 * Tác giả: TDA
 * Liên hệ: 0986509106
 * TDA — Think Daily. Act AI
 * © 2026
 */
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';

const SHEET_NAMES = {
  SETTINGS: 'Settings',
  USERS: 'Users',
  STUDENTS: 'Students',
  CLASSES: 'Classes',
  SESSIONS: 'Sessions',
  ATTENDANCE: 'Attendance',
  SCORES: 'Scores',
  FEES: 'Fees',
  PAYMENTS: 'Payments',
  COMMENTS: 'Comments',
  MATERIALS: 'Materials',
  ASSIGNMENTS: 'Assignments',
  SUBMISSIONS: 'Submissions',
  AI_JOBS: 'AiJobs',
  MUTATION_LOG: 'MutationLog',
  AUDIT_LOG: 'AuditLog'
};

const PROPERTY_KEYS = {
  GEMINI_API_KEY: 'GEMINI_API_KEY',
  CALENDAR_ID: 'CALENDAR_ID',
  DRIVE_FOLDER_ID: 'DRIVE_FOLDER_ID'
};

const DEFAULT_PAGE_SIZE = 20;

const MAX_AI_CALLS_PER_DAY = 100;