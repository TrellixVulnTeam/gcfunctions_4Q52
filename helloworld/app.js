//Bill Hahn's JSON Product Catalog Lookup
//using Cloud Datastore from Cloud Funcions
//for Autocomplete lookups, on demand.

exports.helloworld = function helloworld(req, res) {
  // Imports the Google Cloud client library
  const Datastore = require('@google-cloud/datastore');

  // Your Google Cloud Platform project ID
  const projectId = 'bill-hahn-sandbox';

  // Instantiates a client
  const datastore = Datastore({
    projectId: projectId
  });

  let name = req.query.name || 'Apple';
  //let message = 'Hey you should type a product name ';
  // [START prodouctQuery]
  //function searchProduct (name) {
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
      res.status(200).send(Products[0].name);
      console.log('Product Autocomplete: ');
      //Debug response
      res.status(200).send(name);
      Products.forEach((name) => console.log(name));
    });
  Products.forEach((name) => res.status(200).send(name));
};

/*exports.helloworld = function helloworld(req, res) {
  let name = req.query.name || 'Bill';
  let message = 'Hey ' + name;
  console.log(message);
  res.status(200).send('Success: ' + message);
};
*/
