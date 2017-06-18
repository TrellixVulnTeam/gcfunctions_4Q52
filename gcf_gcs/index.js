/**
 * Background Cloud Function to be triggered by Cloud Storage.
 *
 * @param {object} event The Cloud Functions event.
 * @param {function} The callback function.
 */
// Imports the Google Cloud client libraries
const BigQuery = require('@google-cloud/bigquery');
const Storage = require('@google-cloud/storage');

exports.helloGCS = function(event, callback) {
  const file = event.data;

  //if (file.resourceState === 'not_exists') {
  //  console.log(`File ${file.name} deleted.`);
  //} else if (file.metageneration === 1) {
  // metageneration attribute is updated on metadata changes.
  // on create value is 1
  //console.log(`File ${file.name} uploaded.`);


  // The project ID to use, e.g. "your-project-id"
  const projectId = "bill-hahn-sandbox";

  // The ID of the dataset of the table into which data should be imported, e.g. "my_dataset"
  const datasetId = "nodejs_created_dataset";

  // The ID of the table into which data should be imported, e.g. "my_table"
  const tableId = "babynames_yr2";

  // Get bucketname from event.data, which comes from gcs triggered upload event
  const bucketname = file.bucket;
  // The name of the Google Cloud Storage bucket where the file is located, e.g. "my-bucket"
  //const bucketName = "bh-babynames_yr";

  // Get file name from event.data, which comes from gcs triggered upload event
  const filename = file.name;
  // The name of the file from which data should be imported, e.g. "file.csv"
  //var filename = "yob2013yr.csv";

  // Instantiates clients
  const bigquery = BigQuery({
    projectId: projectId
  });

  const storage = Storage({
    projectId: projectId
  });

  // Metadata to skip the leading row in the CSV that has column header info
  var jobmetadata = {
    //  skipLeadingRows: 1
  }

  let job;
  // Imports data from a Google Cloud Storage file into the table
  bigquery
    .dataset(datasetId)
    .table(tableId)
    .import(storage.bucket(bucketname).file(filename), jobmetadata)
    .then((results) => {
      job = results[0];
      console.log(`Job ${job.id} started.`);
      return job.promise();
    })
    .then((results) => {
      console.log(`Job ${job.id} completed.`);
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });

  callback();
  //  };
};
