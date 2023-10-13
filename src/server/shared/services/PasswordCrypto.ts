import { compare, genSalt, hash } from 'bcryptjs';

const SALT_RANDOMS = 8;
const hashPassword = async (password: string) => {
  const saltGeneretaded = await genSalt(SALT_RANDOMS);

  return await hash(password, saltGeneretaded);
};

const verifyPassword = async (password: string, hashedPass: string) => {
  return await compare(password, hashedPass);
};

export const PasswordCrypto = {
  hashPassword,
  verifyPassword,
};
