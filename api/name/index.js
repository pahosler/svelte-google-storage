module.exports = (req, res) => {
  const { body } = req;
  res.send(JSON.stringify(`Hello ${body}`));
};
