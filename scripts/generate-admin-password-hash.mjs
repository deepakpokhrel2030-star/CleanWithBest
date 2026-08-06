import crypto from 'crypto';
import { stdin, stdout, stderr, exit } from 'process';
import readline from 'readline/promises';

const ITERATIONS = 210000;
const KEY_LENGTH = 32;
const DIGEST = 'sha256';

const rl = readline.createInterface({ input: stdin, output: stdout });

try {
  const password = await rl.question('Admin password to hash: ');

  if (!password.trim()) {
    stderr.write('Password cannot be empty.\n');
    exit(1);
  }

  const salt = crypto.randomBytes(16).toString('base64url');
  const hash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString('base64url');

  stdout.write(`\nADMIN_PASSWORD_HASH=pbkdf2_sha256$${ITERATIONS}$${salt}$${hash}\n`);
} finally {
  rl.close();
}
