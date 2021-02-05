import multer, { memoryStorage } from 'multer';
import storage from '@google-cloud/storage';
import crypto from 'crypto';
import { encrypted } from './service-account.enc';
const GOOGLE_ENCRYPTION_SECRET = '^Jx.>+9;>jUFR},q';
const GOOGLE_ENCRYPTION_IV = 'L,cg6\\}A+fSU&2L';
// decrypt keyfile
const algorithm = 'aes-128-cbc';
const decipher = crypto.createDecipheriv(
  algorithm,
  GOOGLE_ENCRYPTION_SECRET,
  GOOGLE_ENCRYPTION_IV
);

const getDecryptedSecret = () => {
  let decrypted = decipher.update(encrypted, 'base64', 'utf8');

  decrypted += decipher.final('utf8');

  return JSON.parse(decrypted);
};

let { project_id, client_email, private_key } = getDecryptedSecret();

module.exports = { project_id, client_email, private_key };
