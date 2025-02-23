import { pool } from "../libs/database.js";

export const getUser = async(req,res) => {
    try{
        const { userId } = req.body.user;

        const userExist = await pool.query({
            text: `SELECT * FROM tbluser WHERE id = $1`,
            values: [userId],
        })

        const user = userExist.rows[0];

        if(!user){
            return res
             .status(404)
             .json({
                status: "failed",
                message: "User not found",
            });
        }
        user.password = undefined;

        res.status(201).json({
            status: "success",
            user,
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            status: "failed",
            message: error.message,
        })
    }
};


export const changePassword = async(req,res) => {
    try{

    }catch(error){
        console.log(error);
        res.status(500).json({
            status: "failed",
            message: error.message,
        })
    }
};



export const updateUser = async(req,res) => {
    try{
        const {userId} = req.body.user


        
    }catch(error){
        console.log(error);
        res.status(500).json({
            status: "failed",
            message: error.message,
        })
    }
};


// export const signinUser = async(req,res) => {
//     try{

//     }catch(error){
//         console.log(error);
//         res.status(500).json({
//             status: "failed",
//             message: error.message,
//         })
//     }
// };