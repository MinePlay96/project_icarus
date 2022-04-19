import { registerAs } from '@nestjs/config';

export default registerAs('user', () => ({
  saltRounds: Number(process.env.SALT_ROUNDS || 10),
}));
