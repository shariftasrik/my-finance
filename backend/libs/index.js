import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export const hashPassword = async(userValue) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(userValue, salt);

    return hashedPassword;
}

export const comparePassword = async(userPassword, password)=>{
    try {
        const isMatch = await bcrypt.compare(userPassword, password);
        return isMatch;

    } catch (error) {
        console.log(error);
    }
}

export const getMonthName = (monthIndex) => {
    const months = [
        "January", 
        "February", 
        "March", 
        "April", 
        "May", 
        "June",
        "July", 
        "August", 
        "September", 
        "October", 
        "November", 
        "December"
    ];
    return months[monthIndex] || "";
};


export const createJWT = (id)=>{
    return JWT.sign(
        {
            userId: id
        }, 
        process.env.JWT_SECRET, 
        {
            expiresIn: "1d",
        }
    );
};
