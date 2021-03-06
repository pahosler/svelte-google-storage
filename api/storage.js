import crypto from 'crypto';
import { encrypted } from './service-account.enc';

// decrypt keyfile
const algorithm = 'aes-128-cbc';
const decipher = crypto.createDecipheriv(
  algorithm,
  process.env.GOOGLE_ENCRYPTION_SECRET,
  process.env.GOOGLE_ENCRYPTION_IV
);

const getDecryptedSecret = () => {
  let decrypted = decipher.update(encrypted, 'base64', 'utf8');

  decrypted += decipher.final('utf8');

  return JSON.parse(decrypted);
};

let { project_id, client_email, private_key } = getDecryptedSecret();

module.exports = { project_id, client_email, private_key };
