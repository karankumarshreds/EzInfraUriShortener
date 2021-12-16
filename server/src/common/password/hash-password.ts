import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

// returns a buffer
const scryptAsync = promisify(scrypt);

export const hashPassword = async (password: string): Promise<string> => {
  // generate a random string
  const salt = randomBytes(8).toString('hex');
  // hash the password (returned as buffer, so change it to string while using)
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString('hex')}.${salt}`;
};
