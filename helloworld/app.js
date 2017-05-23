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

  const productName = req.query.name || 'Apple';
  //const prodInfo = req.query.prodinfo || '';

  // [START prodouctQuery]
  //function searchProduct (productName) {
  const query = datastore.createQuery('Product')
    .filter('name', ">=", productName)
    .filter('name', "<", productName+"~")
    //.select(prodInfo)
    .order('name', {
      descending: true
  });
  datastore.runQuery(query, function(err, products) {
     res.status(200).send(products)
     //entities.forEach((name) => res.status(200).send(name));
  });
}
