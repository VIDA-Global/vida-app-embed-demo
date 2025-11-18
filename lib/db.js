import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

// Use ephemeral /tmp storage on Vercel (read-only project filesystem in serverless functions)
// Falls back to local project directory when running locally.
const dataDir = path.join(process.env.VERCEL ? '/tmp' : process.cwd(), 'data');

async function readJSON(file) {
  try {
    const fullPath = path.join(dataDir, file);
    const data = await fs.readFile(fullPath, 'utf8');
    if (!data) return [];
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return [];
    }
    throw err;
  }
}

async function writeJSON(file, data) {
  const fullPath = path.join(dataDir, file);
  try {
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    // Atomic-ish write: write to temp file then rename.
    const tmpPath = fullPath + '.tmp';
    await fs.writeFile(tmpPath, JSON.stringify(data, null, 2));
    await fs.rename(tmpPath, fullPath);
  } catch (err) {
    console.error('writeJSON error', { file, err });
    throw err;
  }
}

export async function getUsers() {
  return readJSON('users.json');
}

export async function saveUsers(users) {
  await writeJSON('users.json', users);
}

export async function getAccounts() {
  return readJSON('accounts.json');
}

export async function saveAccounts(accounts) {
  await writeJSON('accounts.json', accounts);
}

export async function getInvites() {
  return readJSON('invites.json');
}

export async function saveInvites(invites) {
  await writeJSON('invites.json', invites);
}

export async function getSessions() {
  return readJSON('sessions.json');
}

export async function saveSessions(sessions) {
  await writeJSON('sessions.json', sessions);
}

export async function generateId(prefix = '') {
  const id = crypto.randomBytes(8).toString('hex');
  return `${prefix}_${id}`;
}