const express = require("express"); // Express server
const fs = require("fs"); // File system module for file handling
const path = require("path"); // Path module for path handling
const crypto = require("crypto"); // Crypto module for random data generation
const multer = require("multer"); // Multer for file upload handling

const app = express(); // Express App Object

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
const multerStorage = multer.diskStorage({
  destination: "./uploads/", // Server file storage directory
  filename: (req, file, cb) => {
    // File name configurations
    return crypto.pseudoRandomBytes(16, function (err, raw) {
      // Generate random data in form of bytes
      if (err) {
        return cb(err); // If an error occurs, we return it
      }
      return cb(
        null, // If there is no error, we set up a random file name as we convert "raw" random bytes to string and attach its extension to it (Eg. 48903473793332900727.ext)
        "" + raw.toString("hex") + path.extname(file.originalname)
      );
    });
  },
});

// When we access the "/upload" endpoint, we want to upload the file, so we use multer middleware with the endpoint
app.post(
  "/upload",
  multer({
    storage: multerStorage, // Multer storage engine
  }).single("upload"), // Single file upload
  (req, res) => {
    console.log(req.file); // In callback function, we display the uploaded data
    console.log(req.body);
    res.redirect("/uploads/" + req.file.filename); // And redirect user to the newly uploaded file's location
    console.log(req.file.filename);
    return res.status(200).end();
  }
);

// We can use this endpoint to get the uploaded file [Only images can be rendered on webpage]
app.get("/uploads/:upload", (req, res) => {
  const file = req.params.upload;
  console.log(req.params.upload);
  const img = fs.readFileSync(__dirname + "/uploads/" + file);
  res.writeHead(200, { "Content-Type": "image/png" });
  res.end(img, "binary");
});

// Start our server
app.listen(7000, () => {
  console.log("Server started");
});
