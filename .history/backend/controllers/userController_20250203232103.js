export const getUser = async(req,res) => {
    try{
        const { userId } = req.body.user;
        
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