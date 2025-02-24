import { pool } from "../libs/database.js";
import { hashPassword } from "../libs/index.js";



/
export const signupUser = async(req,res) => {
    try{
        const {firstName, email, password} = req.body;

        if(!(firstName || email || password)){
            return res.status(404).json({
                status: "failed",
                message: "Provide Required Fields!",
            });
        }

        const userExist = await pool.query({
            text: "SELECT EXISTS (SELECT * FROM tbluser WHERE email = $1)",
            values: [email],
        })

        if(userExist.rows[0].userExist){
            return res.statua(409).json({
                status: "failed",
                message: "Email Address already exist. Try Login",
            })
        }

        const hashedPassword = await hashPassword(password);
        const user = await pool.query({
            text: `INSERT INTO tbluser(firstName, email, password) VALUES ($1, $2, $3) RETURNING *`, 
            values: [firstName, email, hashedPassword],
        })

        user.rows[0].password = undefined;

        res.status(201).json({
            status: "success",
            message: "User Account Created Successfully",
            user: user.rows[0],
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            status: "failed",
            message: error.message,
        })
    }
};



// Sing-In
export const signinUser = async(req,res) => {
    try{

    }catch(error){
        console.log(error);
        res.status(500).json({
            status: "failed",
            message: error.message,
        })
    }
};