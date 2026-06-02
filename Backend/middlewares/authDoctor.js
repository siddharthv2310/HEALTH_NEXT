import jwt from 'jsonwebtoken'

const authDoctor = async (req, res, next) => {
    try {

        // Get Authorization Header
        const authHeader = req.headers.authorization;

        // Check if header exists
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing"
            });
        }

        // Expected Format:
        // Authorization: Bearer TOKEN

        const dtoken = authHeader.split(' ')[1];

        // Check if token exists
        if (!dtoken) {
            return res.status(401).json({
                success: false,
                message: "Token missing"
            });
        }

        // Verify Token
        const decoded = jwt.verify(
            dtoken,
            process.env.JWT_SECRET
        );

        // Attach user id to request
       req.docId = decoded.id

        // Move to next middleware/controller
        next();

    }
    catch (err) {

        console.log(err);

        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Token"
        });
    }
}

export default authDoctor;


