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
7. **JSON Format**
    Basic JSON Format
    ```bash
            {
        "source": "",
        "topic": "",
        "question": "",
        "type": "",
        "choices": {
            "A": "",
            "B": "",
            "C": "",
            "D": ""
        },
        "keyPoints": [
            {
            "title": "",
            "keywords": [],
            "explanation": ""
            }
        ],
        "answer": "",
        "page": 0,
        "most_voted": ""
        }
    ```
    Description
    1. "source": By default, this is empty string. It is intended to store the origin of the data or information, such as a reference to a textbook, website, or other resources.
    2. "topic": default, this is empty string. Specifies the subject or category to which the question belongs, helping in organizing questions by their relevant topics or themes.
    3. "question": This field contains the text of the question that is to be presented to the user. 
    4. "type": The type can be either "option" or "multiple_choice". "option" is used for questions with only one correct answer, while "multiple_choice" signifies that multiple answers are correct.
    5. "choices": The choices keys should be "A", "B", "C", "D", etc., depending on the number of choices provided. Each key corresponds to an option for the multiple-choice question.
    6. "keyPoints": [
        {
            "title": The title of this key points. It should be no more than 30 characters.
            "keywords":An array of strings found in the question highlights significant terms or concepts. The keywords, derived from the exact words in the question, can be a sentence or a single word. These should be identified in the question for highlight identification.
            "explanation": A detailed explanation or description of the key point.
            }
        ],  "keyPoints" is an array object where each item includes a title, keywords, and an explanation related to the question.
    7. "answer":This field stores the answer. It can be an array or a single value, depending on whether "type" is "option" or "multiple_choice" if single "A" if multiple choice ["A","B"]. please Identify the answer by default

    8. "page": Used for pagination. This indicates the page number or position of the question within a sequence, by default set to 0.

    9. "most_voted": Used to store information about the most popular or most chosen answer by users if the data is collected from interactive sessions or polls. by default copy the value of the answer
    
    Ensuring Clause
    1. Ensure that the Exam Question JSON structure is followed. below is the json structure.
        {
        "source": "",
        "topic": "",
        "question": "",
        "type": "",
        "choices": {
            "A": "",
            "B": "",
            "C": "",
            "D": ""
        },
        "keyPoints": [
            {
            "title": "",
            "keywords": [],
            "explanation": ""
            }
        ],
        "answer": "",
        "page": 0,
        "most_voted": ""
        }

    2. Ensure that object key "source" by default, this is empty string. 
    3. Ensure that object key "topic" by default, this is empty string. 
    4. Ensure that object key "type" can be either "option" or "multiple_choice". "option" is used for questions with only one correct answer, while "multiple_choice" signifies that multiple answers are correct.
    5. Ensure that we have a minimum of five key points; the more, the better. If the provided question cannot have more than five, then you can provide the necessary key points count.
    6. Ensure that the keyPoints object has element "title" it should be no more than 30 characters.
    7. Ensure that the keyPoints object has element "keywords" and the keywords that are present in the question.
    8. Ensure that the keyPoints object has element "explanation". Then, write your response in relevance to the object title and keywords.
    9. Ensure that an appropriate code block tag may be added to the "question" and "choices" if deemed needed.
    10. Ensure that the content text in the "question" and "choices" keys is JSON-compliant by assessing the need for <codeblock> tags for any code blocks, incorporating \n for new lines, and \t for tab stops. Evaluate each question and choices to determine the necessity of <codeblock> tags, and apply them only when needed, while consistently using \n and \t to accurately preserve the content's structure and presentation


8. **Upload a Specific File:** Upload `exam.json` from the `src` directory to the bucket:
    ```bash
    gsutil cp ./src/examJson/GoogleCloudDeveloper_Exam_Dump.json gs://exam-bucket-test1/exam.json
    gsutil cp ./src/examJson/GoogleCloudDigitalLeader.json gs://exam-bucket-test1/GoogleCloudDigitalLeader.json
    gsutil cp ./src/examJson/GoogleCloudDeveloper_Cloud_Guro.json gs://exam-bucket-test1/GoogleCloudDeveloper_Cloud_Guro.json
    ```
    to remove
    ```bash
    gsutil rm gs://exam-bucket-test1/exam.json gs://exam-bucket-test1/GoogleCloudDigitalLeader.json gs://exam-bucket-test1/GoogleCloudDeveloper_Cloud_Guro.json
    ```

This guide assists in deploying your React application and uploading specific files to Google Cloud Storage, ensuring your project is up-to-date and accessible.
