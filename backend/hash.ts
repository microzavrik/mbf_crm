import crypto from 'crypto'

interface HashResult {
    hash: string;
    salt: string;
};

export async function hashPassword(password: string): Promise<HashResult> {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString("hex");

    return { hash, salt };
}