import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readJSON(file) {
  ensureDir();
  const fp = path.join(DATA_DIR, file);
  if (!fs.existsSync(fp)) return [];
  try { return JSON.parse(fs.readFileSync(fp, 'utf8')); } catch { return []; }
}

function writeJSON(file, data) {
  ensureDir();
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2));
}

export function getQuotes() { return readJSON('quotes.json'); }
export function addQuote(q) {
  const list = getQuotes();
  const entry = { id: Date.now(), ...q, status: 'new', createdAt: new Date().toISOString() };
  list.unshift(entry);
  writeJSON('quotes.json', list);
  return entry;
}
export function deleteQuote(id) {
  writeJSON('quotes.json', getQuotes().filter(q => q.id !== Number(id)));
}
export function updateQuoteStatus(id, status) {
  const list = getQuotes().map(q => q.id === Number(id) ? { ...q, status } : q);
  writeJSON('quotes.json', list);
}

export function getContacts() { return readJSON('contacts.json'); }
export function addContact(c) {
  const list = getContacts();
  const entry = { id: Date.now(), ...c, status: 'new', createdAt: new Date().toISOString() };
  list.unshift(entry);
  writeJSON('contacts.json', list);
  return entry;
}
export function deleteContact(id) {
  writeJSON('contacts.json', getContacts().filter(c => c.id !== Number(id)));
}
export function updateContactStatus(id, status) {
  const list = getContacts().map(c => c.id === Number(id) ? { ...c, status } : c);
  writeJSON('contacts.json', list);
}

export function getUsers() { return readJSON('users.json'); }
export function findUserByEmail(email) {
  return getUsers().find(user => user.email.toLowerCase() === email.toLowerCase());
}
export function addUser(user) {
  const list = getUsers();
  const entry = { id: Date.now(), ...user, createdAt: new Date().toISOString() };
  list.unshift(entry);
  writeJSON('users.json', list);
  return entry;
}

export function getSessions() { return readJSON('sessions.json'); }
export function addSession(session) {
  const list = getSessions().filter(item => item.userId !== session.userId);
  const entry = { id: Date.now(), ...session, createdAt: new Date().toISOString() };
  list.unshift(entry);
  writeJSON('sessions.json', list);
  return entry;
}
export function findSession(token) {
  return getSessions().find(session => session.token === token);
}
export function deleteSession(token) {
  writeJSON('sessions.json', getSessions().filter(session => session.token !== token));
}
