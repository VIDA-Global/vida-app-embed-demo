import crypto from 'crypto';
import { getSessions, saveSessions, generateId, getUsers, saveUsers } from './db.js';

export function hashPassword(password, salt = crypto.randomBytes(8).toString('hex')) {
  const hash = crypto.createHash('sha256').update(salt + password).digest('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password, hashed) {
  const [salt, hash] = hashed.split(':');
  const hashVerify = crypto.createHash('sha256').update(salt + password).digest('hex');
  return hashVerify === hash;
}

export async function createSession(userId) {
  const sessions = await getSessions();
  const token = await generateId('sess');
  sessions.push({ token, userId });
  await saveSessions(sessions);
  return token;
}

export async function getUserFromSession(token) {
  if (!token) return null;
  const sessions = await getSessions();
  const session = sessions.find((s) => s.token === token);
  if (!session) return null;
  const users = await getUsers();
  return users.find((u) => u.id === session.userId) || null;
}

export async function removeSession(token) {
  const sessions = await getSessions();
  const filtered = sessions.filter((s) => s.token !== token);
  await saveSessions(filtered);
}

export async function createUser({ id, email, password, fullName, businessId, isAdmin }) {
  const users = await getUsers();
  users.push({ id, email, password, fullName, businessId, isAdmin });
  await saveUsers(users);
}