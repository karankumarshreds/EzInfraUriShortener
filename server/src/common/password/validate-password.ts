import { scrypt } from 'crypto';
import { promisify } from 'util';

// returns a buffer
const scryptAsync = promisify(scrypt);

export const validatePassword = async (storedPassword: string, suppliedPassword: string): Promise<boolean> => {
  const [hashedPassword, salt] = storedPassword.split('.');
  console.log('SALT ', salt);
  console.log(hashedPassword);
  // encrypt supplied password
  const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
  console.log(buf.toString('hex'));
  // returns boolean
  return buf.toString('hex') === hashedPassword;
};
