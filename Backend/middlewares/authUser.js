import jwt from 'jsonwebtoken'

// User Authentication Middleware

const authUser = async (req, res, next) => {
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

        // Authorization: Bearer TOKEN

        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Invalid token format"
            });
        }

        const token = authHeader.split(" ")[1];

        // Check if token exists
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing"
            });
        }

        // Verify Token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Attach user id to request
        req.userId = decoded.id

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

export default authUser;


