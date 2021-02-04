import { Storage } from '@google-cloud/storage';
import { project_id, client_email, private_key } from './storage';

// Instantiate storage client
const GCS = new Storage({
  projectId: project_id,
  credentials: {
    client_email,
    private_key,
  },
});

const bucketName = 'plantgram_yourplants';
const createBucket = async () => {
  await GCS.createBucket(bucketName);
  console.log(`Bucket ${bucketName} created`);
};

createBucket().catch(console.error);
