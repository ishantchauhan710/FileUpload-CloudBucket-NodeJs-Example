const express = require("express"); // Express server
const multer = require("multer"); // Multer for file upload handling
const dotenv = require("dotenv"); // For handling environment variables
const aws = require("aws-sdk"); // For handling cloud hosting bucket
const multerS3 = require("multer-s3"); // For using multer with aws s3
const bodyParser = require("body-parser"); // For parsing json body data

// Configure environment variables
dotenv.config();

// Express App Object
const app = express();

// Enable communication using json data
app.use(bodyParser.json());

// Your storage region
const storageRegion = process.env.STORAGE_REGION;

// Bucket URL
const storageUrl = `https://${storageRegion}.linodeobjects.com`;

// Setup AWS Client
aws.config.update({
  secretAccessKey: process.env.STORAGE_SECRET_KEY,
  accessKeyId: process.env.STORAGE_ACCESS_KEY,
  endpoint: new aws.Endpoint(storageUrl),
});

// Aws S3 Client Object
s3 = new aws.S3();

// Now we create a simple HTML form to enable multer file upload functionality
const htmlForm =
  "<!DOCTYPE HTML><html><body>" +
  "<form method='post' action='/upload' enctype='multipart/form-data'>" +
  "<input type='file' name='upload'/>" +
  "<input type='submit' /></form>" +
  "</body></html>";

// We display the HTML form as default webpage
app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(htmlForm);
});

// We create a multer storage object
const multerStorage = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: process.env.STORAGE_BUCKET,
    key: function (req, file, cb) {
      console.log(file);
      cb(null, file.originalname);
    },
  }),
});

// When we access the "/upload" endpoint, we want to upload the file, so we use multer middleware with the endpoint
app.post(
  "/upload",
  multerStorage.array("upload", 25),
  function (req, res, next) {
    res.send({
      message: "File uploaded successfully!",
      urls: req.files.map(function (file) {
        return {
          url: file.location,
          name: file.key,
          type: file.mimetype,
          size: file.size,
        };
      }),
    });
  }
);

// Start our server
app.listen(7000, () => {
  console.log("Server started");
});
