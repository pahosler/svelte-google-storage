import { Storage } from '@google-cloud/storage';
import { project_id, client_email, private_key } from '../storage';

module.exports = async (req, res) => {
  // Instantiate storage client
  const GCS = new Storage({
    projectId: project_id,
    credentials: {
      client_email,
      private_key,
    },
  });

  const bucket = GCS.bucket('plantgram_garden');
  const {
    query: { file },
  } = req;
  const uploadFile = bucket.file(file);
  const options = {
    expires: Date.now() + 1 * 60 * 1000,
    fields: { 'x-goog-meta-test': 'data' },
  };

  const [response] = await uploadFile.generateSignedPostPolicyV4(options);
  console.log(response);
  res.status(200).json(response);
};
