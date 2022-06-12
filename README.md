# NodeJs Cloud Bucket File Upload :open_file_folder:

This is a simple demonstration of how one can upload files from their nodejs server to cloud bucket storage! You can use this code to implement the cloud upload functionality in your projects!

For this project, I have used [Linode](https://www.linode.com/) cloud hosting provider along with [Aws Sdk](https://www.npmjs.com/package/aws-sdk) and [Multer S3](https://www.npmjs.com/package/multer-s3)

### Pre Requisites :dart:
1. A cloud hosting account like Aws or Linode
2. Git and Npm installed on your computer
3. Your hosting platform's access and secret Keys, bucket name and bucket region (You can easily get them by going through your hosting platform's documentation)

### Project Setup :pencil:
1. Clone this repository

```
git clone https://github.com/ishantchauhan710/FileUpload-CloudBucket-NodeJs-Example.git
```

2. In the root folder, create .env file and write:
```
STORAGE_ACCESS_KEY = YOUR-ACCESS-KEY
STORAGE_SECRET_KEY = YOUR-SECRET-KEY
STORAGE_BUCKET = YOUR-BUCKET-NAME
STORAGE_REGION = YOUR-BUCKET-REGION
```

3. Then install all the dependencies by opening terminal and writing:
```
npm install
```

4. Then start the server by writing:
```
npm start
```

5. Finally, to test the code, open your web browser and write:
```
127.0.0.1:7000
```

### Important Note :bangbang:
1. In future, if you plan to update the project the dependencies, ensure that the aws-sdk and multer-s3 version starts with same digit eg. 2.x.x or 3.x.x otherwise you may get an error
2. Never share your hosting credentials with anyone! Always keep them securely stored in environmental variables

## Contact
For any queries, you can mail me at developerishant710@gmail.com
