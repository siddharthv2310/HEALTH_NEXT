import jwt from 'jsonwebtoken'

// admin authentication middleware

const authAdmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers;
        if (!atoken) {
            return res.json({ success: false, message: "not Authorized! please login again" });
        }
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET missing");
        }
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)

        if (token_decode.role !== "admin") {
            return res.json({ success: false, message: "Not Authorized" });
        }

        req.adminId = token_decode.id;

        next();
    }
    catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message })
    }
}

export default authAdmin;