/**
 * Background Cloud Function to be triggered by Cloud Storage.
 *
 * @param {object} event The Cloud Functions event.
 * @param {function} The callback function.
 */
// Imports the Google Cloud client libraries
const BigQuery = require('@google-cloud/bigquery');
const Storage = require('@google-cloud/storage');

exports.bigQueryImportCSV = function(event, callback) {
  // Get Event Data (e.g. bucket name and filename metadata)
  const file = event.data;
  // The project ID to use, e.g. "your-project-id"
  const projectId = "bill-hahn-sandbox";
  // The ID of the dataset of the table into which data should be imported, e.g. "my_dataset"
  const datasetId = "Marketing_Dataset";
  // The ID of the table into which data should be imported, e.g. "my_table"
  const tableId = "Marketing_Data_by_Year";
  // Get bucketname from event.data, which comes from gcs triggered upload event
  const bucketname = file.bucket;
  // Get file name from event.data, which comes from gcs triggered upload event
  const filename = file.name;
  // BigQuery API
  const bigquery = BigQuery({
    projectId: projectId
  });
  // GCS Storage API
  const storage = Storage({
    projectId: projectId
  });
  // Job Metadata (e.g. SKIP header row in CSV)
  var jobmetadata = {
    //  skipLeadingRows: 1
  }

  let job;
  // Imports CSV file from GCS bucket into BigData Marketing_Dataset.Marketing_Data_by_Year)
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
