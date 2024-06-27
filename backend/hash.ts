import crypto from 'crypto';

interface HashResult {
  hash: string;
}

export function hashPassword(password: string): HashResult {
  const hash = crypto.createHash('sha512')
    .update(password)
    .digest('hex');

  return { hash };
}