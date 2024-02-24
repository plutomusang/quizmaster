# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Deployment Guide for React App to Google Cloud Storage

This guide outlines the steps to build your React application and deploy it to Google Cloud Storage, along with uploading a specific file from the source directory.

## Prerequisites

- Ensure you have the Google Cloud SDK installed.
- Ensure you have Node.js and npm installed to build your React app.

## Steps

1. **Build Your React Application:** Navigate to your project directory and build your application:
    ```bash
    cd C:\Users\Navagis Dev\exam\test
    npm run build
    ```
    This step compiles your application into static files located in the `build` directory.

2. **Verify Google Cloud SDK Version:**
    ```bash
    gcloud --version
    ```

3. **Update Google Cloud SDK (Admin Mode Required):** Open your command line interface in administrator mode and update the Google Cloud components:
    ```bash
    gcloud components update
    ```

4. **Authenticate and Set Your GCloud Account:** List all authenticated accounts and set the active account:
    ```bash
    gcloud auth list
    gcloud config set account wizardgizmophilippines@gmail.com
    ```
    Verify the active account:
    ```bash
    gcloud config get-value account
    ```

5. **Select and Set Your GCloud Project:** List available projects and set the active project:
    ```bash
    gcloud projects list
    gcloud config set project majestic-fuze-399815
    ```
    Verify the active project:
    ```bash
    gcloud config get-value project
    ```

6. **Deploy to Google Cloud Storage:** Navigate to the build directory, list buckets, and synchronize the build directory with your target bucket:
    ```bash
    cd build
    gsutil ls
    # Ensure your target bucket is listed:
    # -> gs://exam-bucket-test1/
    gsutil -m rsync -r . gs://exam-bucket-test1
    ```

7. **Upload a Specific File:** Upload `exam.json` from the `src` directory to the bucket:
    ```bash
    gsutil cp ./src/examJson/GoogleCloudDeveloper_Exam_Dump.json gs://exam-bucket-test1/exam.json
    gsutil cp ./src/examJson/GoogleCloudDigitalLeader.json gs://exam-bucket-test1/GoogleCloudDigitalLeader.json
    gsutil cp ./src/examJson/GoogleCloudDeveloper_Cloud_Guro.json gs://exam-bucket-test1/GoogleCloudDeveloper_Cloud_Guro.json
    ```

This guide assists in deploying your React application and uploading specific files to Google Cloud Storage, ensuring your project is up-to-date and accessible.
