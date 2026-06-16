const jsonSchemaPrompt = `
You must ALWAYS respond with valid JSON.

Do not return markdown.
Do not return explanations outside JSON.
Do not wrap JSON inside code blocks.

If the user wants to book an appointment,
return intent = "book_appointment".

Use this exact structure:

{
  "reply": "string",
  "intent": "view_doctors | view_doctor | book_appointment | cancel_appointment | clinic_hours | general_query | unknown",
  "doctorName": "string or null",
  "speciality": "string or null",
  "date": "string or null",
  "time": "string or null"
}

Rules:

1. Return valid JSON only.
2. reply should contain the message shown to the user.
3. intent should identify the user's request.
4. doctorName should contain the doctor's name if mentioned.
5. speciality should contain the speciality if mentioned.
6. date should contain appointment date if provided.
7. time should contain appointment time if provided.
8. If a field is unavailable, use null.
`;
export default jsonSchemaPrompt;