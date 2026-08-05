import crypto from 'crypto';
import { addSession, addUser, deleteSession, findSession, findUserByEmail, getUsers } from '@/backend/db';

const COOKIE_NAME = 'cwb_session';
const SESSION_DAYS = 7;

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, passwordHash) {
  const [salt, storedHash] = passwordHash.split(':');
  const attempted = hashPassword(password, salt).split(':')[1];
  return crypto.timingSafeEqual(Buffer.from(storedHash, 'hex'), Buffer.from(attempted, 'hex'));
}

function publicUser(user) {
  if (!user) return null;
  return { id: user.id, name: user.name, email: user.email, phone: user.phone || '', createdAt: user.createdAt };
}

export function registerUser({ name, email, phone, password }) {
  if (findUserByEmail(email)) {
    throw new Error('An account already exists with this email.');
  }

  const user = addUser({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone?.trim() || '',
    passwordHash: hashPassword(password),
  });

  return publicUser(user);
}

export function authenticateUser({ email, password }) {
  const user = findUserByEmail(email);
  if (!user || !verifyPassword(password, user.passwordHash)) {
    throw new Error('Invalid email or password.');
  }
  return publicUser(user);
}

export function createSession(userId) {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000).toISOString();
  return addSession({ userId, token, expiresAt });
}

export function getSessionUser(token) {
  if (!token) return null;
  const session = findSession(token);
  if (!session || new Date(session.expiresAt) <= new Date()) return null;
  return publicUser(getUsers().find(user => user.id === session.userId));
}

export function clearSession(token) {
  if (token) deleteSession(token);
}

export function setSessionCookie(response, token) {
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: SESSION_DAYS * 24 * 60 * 60,
    path: '/',
  });
  return response;
}

export function clearSessionCookie(response) {
  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/',
  });
  return response;
}

export function sessionTokenFrom(request) {
  return request.cookies.get(COOKIE_NAME)?.value;
}
