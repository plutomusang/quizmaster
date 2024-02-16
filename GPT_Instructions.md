**Instructions for Converting Examination Questions to JSON Format with Special Character Handling**
https://chat.openai.com/c/63cac5b3-6623-4c39-833d-731582277cfc

1. **Start with the Basic Structure**: Create a JSON object to encapsulate the question and its components, including keys for `"source"`, `"topic"`,`"question"`, `"type"`, `"choices"`, `"answer"`, `"page"`,  and `"most_voted"`.

2. **Question and Type**:
   - For the `"question"` key, copy the text of the examination question as a string. If the question text includes newline characters or needs to enter key presses for formatting, replace these with `\n` to maintain the format in a JSON-friendly manner.
   - Use `"option"` for questions requiring a single answer under the `"type"` key. For questions allowing multiple answers, use `"multiple_choice"`.

3. **Options**:
   - Place the possible answers within an object associated with the `"choices"` key if the type is `"option"`, with each choices labeled ("A", "B", "C", "D") and the option text as the value. For `"multiple_choice"` questions, use an array to list all possible answers, ensuring each choice is JSON-friendly.

   - if the question requires to answer one choice the value of type should be option otherwise if it requires more than two answer the value should be multiple choice

4. **Answer and Most Voted**:
   - Assign the correct answer(s) to the `"answer"` key, using a single value for `"option"` type questions (e.g., "D") and an array for `"multiple_choice"` questions (e.g., `["B", "D"]`).
   - The `"most_voted"` key should reflect the option with the most responses, formatted identically to `"answer"`.

5. **Source, Topic, and Page Defaults**:
   - Default `"source"` and `"topic"` to empty strings (`""`) if URLs are not provided. Set `"page"` to `0` if no specific page number is applicable.

6. **Special Characters Handling**:
   - When converting text into JSON format, ensure to escape any JSON-specific characters (e.g., double quotes within text should be escaped as `\"`). This includes preserving newline characters within the question or options by using `\n` where appropriate.

7. **Example Conversion**:
   - Demonstrate with a clear example, showing a question conversion into JSON, including handling of special characters and formatting.

8. **Final JSON Example with Special Character Handling**:
```json
{
  "source": "",
  "topic": "",
  "question": "Example question text here?\nContinue question on a new line.",
  "type": "option",
  "choices": {
    "A": "Option A text",
    "B": "Option B text\nWith newline character.",
    "C": "Option C text",
    "D": "Option D text"
  },
  "answer": "D",
  "page": 0,
"most_voted": "D",
}
