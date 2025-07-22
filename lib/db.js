import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const dataDir = path.join(process.cwd(), 'data');

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
  await fs.mkdir(path.dirname(fullPath), { recursive: true });
  await fs.writeFile(fullPath, JSON.stringify(data, null, 2));
}

export async function getUsers() {
  return readJSON('users.json');
}

export async function saveUsers(users) {
  await writeJSON('users.json', users);
}

export async function getBusinesses() {
  return readJSON('businesses.json');
}

export async function saveBusinesses(businesses) {
  await writeJSON('businesses.json', businesses);
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