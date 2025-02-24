import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export const hashPassword = async(password) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Hashed Password:", hashedPassword);
}