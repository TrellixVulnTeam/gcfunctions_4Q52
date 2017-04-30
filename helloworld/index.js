exports.helloworld = function helloworld(req, res) {
  let name = req.query.name || 'Willy';
  let message = 'Hey ' + name;
  console.log(message);
  res.status(200).send('Success: ' + message);
};
