import multer, { memoryStorage } from 'multer';
import { Storage } from '@google-cloud/storage';
import { project_id, client_email, private_key } from '../storage';

// multer - create memory storage for image uploaded via req.files
const m = multer({
  storage: memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb
  },
});

// Instantiate storage client
const GCS = new Storage({
  projectId: project_id,
  credentials: {
    client_email,
    private_key,
  },
});

const bucket = GCS.bucket('plantgram_garden');

// Upload image to storage
module.exports =
  (m.single('file'),
  (req, res, next) => {
    const {
      query: { file },
    } = req;
    console.log('req', file);
    if (!file) {
      res.status(400).send('No file uploaded.');
      return;
    }

    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(file.name);
    console.log('file is:', req.query);
    // Set contentType metadata so browser will render
    // the image instead of downloading the file (default behavior)
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on('error', (err) => {
      next(err);
      return;
    });

    blobStream.on('finish', () => {
      // Public URL can be used to directly access the file via HTTP
      const publicUrl = `https://storage.googleapi.com/${bucket.name}/${blob.name}`;
      // Make image public
      blob.makePublic().then(() => {
        res.status(200).send(`Success!\n Image uploaded to ${publicUrl}`);
      });
    });
    blobStream.end(file.buffer);
  });
// export default handler();
