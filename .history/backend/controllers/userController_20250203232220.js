export const getUser = async(req,res) => {
    try{
        const { userId } = req.body.user;
        
        const userExist = await pool.query({
            text: "SELECT EXISTS (SELECT * FROM tbluser WHERE email = $1)",
            values: [email],
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