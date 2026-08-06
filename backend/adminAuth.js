import crypto from 'crypto';

const HASH_PARTS = 4;
const KEY_LENGTH = 32;
const DIGEST = 'sha256';

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) return false;
  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

export function verifyAdminPassword(password, storedHash) {
  const parts = String(storedHash || '').split('$');
  if (parts.length !== HASH_PARTS) return false;

  const [algorithm, iterationsText, salt, hash] = parts;
  const iterations = Number(iterationsText);

  if (algorithm !== 'pbkdf2_sha256' || !Number.isInteger(iterations) || iterations < 100000 || !salt || !hash) {
    return false;
  }

  const candidateHash = crypto
    .pbkdf2Sync(String(password || ''), salt, iterations, KEY_LENGTH, DIGEST)
    .toString('base64url');

  return safeEqual(candidateHash, hash);
}
