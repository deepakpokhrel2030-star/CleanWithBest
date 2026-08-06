import pg from 'pg';

const { Pool } = pg;

let pool;
let ready;

function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not configured');
  }

  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
  }

  return pool;
}

async function ensureTables() {
  if (!ready) {
    ready = getPool().query(`
      CREATE TABLE IF NOT EXISTS quotes (
        id BIGSERIAL PRIMARY KEY,
        data JSONB NOT NULL DEFAULT '{}'::jsonb,
        status TEXT NOT NULL DEFAULT 'new',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS contacts (
        id BIGSERIAL PRIMARY KEY,
        data JSONB NOT NULL DEFAULT '{}'::jsonb,
        status TEXT NOT NULL DEFAULT 'new',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
  }

  return ready;
}

function rowToEntry(row) {
  return {
    id: Number(row.id),
    ...(row.data || {}),
    status: row.status,
    createdAt: row.created_at?.toISOString?.() || row.created_at,
  };
}

async function listEntries(table) {
  await ensureTables();
  const { rows } = await getPool().query(
    `SELECT id, data, status, created_at FROM ${table} ORDER BY created_at DESC, id DESC`
  );
  return rows.map(rowToEntry);
}

async function addEntry(table, data) {
  await ensureTables();
  const { rows } = await getPool().query(
    `INSERT INTO ${table} (data, status) VALUES ($1, 'new') RETURNING id, data, status, created_at`,
    [data]
  );
  return rowToEntry(rows[0]);
}

async function deleteEntry(table, id) {
  await ensureTables();
  await getPool().query(`DELETE FROM ${table} WHERE id = $1`, [id]);
}

async function updateEntryStatus(table, id, status) {
  await ensureTables();
  await getPool().query(`UPDATE ${table} SET status = $1 WHERE id = $2`, [status, id]);
}

export function getQuotes() {
  return listEntries('quotes');
}

export function addQuote(quote) {
  return addEntry('quotes', quote);
}

export function deleteQuote(id) {
  return deleteEntry('quotes', id);
}

export function updateQuoteStatus(id, status) {
  return updateEntryStatus('quotes', id, status);
}

export function getContacts() {
  return listEntries('contacts');
}

export function addContact(contact) {
  return addEntry('contacts', contact);
}

export function deleteContact(id) {
  return deleteEntry('contacts', id);
}

export function updateContactStatus(id, status) {
  return updateEntryStatus('contacts', id, status);
}
