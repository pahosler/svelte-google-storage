import storage from '@google-cloud/storage';
import { project_id, client_email, private_key } from './storage';

// Instantiate storage client
const gcs = storage({
  projectId: project_id,
  credentials: {
    client_email,
    private_key,
  },
});

// Delete image from storage
