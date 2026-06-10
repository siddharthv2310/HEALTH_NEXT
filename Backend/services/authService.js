import { OAuth2Client } from "google-auth-library";

// Initialize the Google OAuth2 client using your environment variable
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const verifyGoogleCode = async (code) => {
    // 1. Exchange the single-use authorization code for raw tokens from Google
    const { tokens } = await client.getToken({
        code,
        redirect_uri: 'postmessage' // 'postmessage' tells Google we used a web-popup flow
    });

    // 2. Extract and verify the ID Token found inside the token payload
    const ticket = await client.verifyIdToken({
        idToken: tokens.id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    
    // 3. Return a clean, uniform object back to the controller
    return {
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
    };
};