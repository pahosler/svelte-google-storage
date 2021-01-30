module.exports = (req, res) => {
  const date = new Date().toString();
  const bucket_name = process.env.bucket_name;
  res.status(200).send({date: date,bucket_name: bucket_name});
};
