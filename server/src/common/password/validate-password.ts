import { scrypt } from 'crypto';
import { promisify } from 'util';

// returns a buffer
const scryptAsync = promisify(scrypt);

export const validatePassword = async (storedPassword: string, suppliedPassword: string): Promise<boolean> => {
  const [hashedPassword, salt] = storedPassword.split('.');
  // encrypt supplied password
  const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
  // returns boolean
  return buf.toString('hex') === hashedPassword;
};
