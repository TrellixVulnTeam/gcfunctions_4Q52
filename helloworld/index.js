/*exports.helloworld = function helloworld(req, res) {
  let name = req.query.name || 'Bill';
  let message = 'Hey ' + name;
  console.log(message);
  res.status(200).send('Success: ' + message);
};
*/

exports.helloworld = function helloworld(req, res) {
  let name = req.query.name || 'Apple';
  let message = 'Hey you should type a product name ';

  // [START prodouctQuery]
  function searchProduct (name) {
    const query = datastore.createQuery('Product')
    .filter('name', ">=", name)
    .filter('name', "<", name+"~")
    .select('name')
    .order('name', {
      descending: true
    });

  datastore.runQuery(query)
    .then((results) => {
      // Product entities found.
      const Products = results[0];
      console.log('Product Autocomplete: ');
      Products.forEach((name) => console.log(name));
    });
  Products.forEach((name) => res.status(200).send(name));
  }
};
