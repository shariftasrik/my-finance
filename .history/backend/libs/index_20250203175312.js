import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export const hashPassword = async(userValue) => {
    const salt = await bcrypt.genSalt
}