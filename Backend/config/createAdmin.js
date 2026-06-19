import bcrypt from "bcrypt";
import adminModel from "../models/adminModel.js";

const createAdmin = async () => {
    try {

        const existingAdmin = await adminModel.findOne({
            email: process.env.ADMIN_EMAIL
        });

        if (existingAdmin) {
            return;
        }

        const hashedPassword = await bcrypt.hash(
            process.env.ADMIN_PASSWORD,
            10
        );

        await adminModel.create({
            name: "Super Admin",
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            role: "admin"
        });


    } catch (error) {
        console.log(error);
    }
};

export default createAdmin;