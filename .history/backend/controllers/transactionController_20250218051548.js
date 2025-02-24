import {pool} from "../libs/database.js"; 

export const getTransactions =async (req, res) => {
    try{
  const today=new Date();
  const _sevenDaysAgo=new Date(today);
  _sevenDaysAgo.setDate(today.getDate()-7);

  const sevenDaysAgo=_sevenDaysAgo.toISOString().split("T")[0];

const {df,dt,s}=req.query;
const {userId}=req.body.userId;
const startDate =new Date(df || sevenDaysAgo );
const endDate =new Date(df || new Date() );


const transactions = await pool.query({
    text: `SELECT * FROM tbltransaction 
           WHERE user_id = $1 
             AND createdat BETWEEN $2 AND $3 
             AND (description ILIKE $4 
                  OR status ILIKE $4 
                  OR source ILIKE $4) 
           ORDER BY id DESC`,
    values: [userId, startDate, endDate, `%${s}%`],
  });

  res.status(200).json({
    status: "success",
    data: transactions.rows,
  });


    } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
    }
    };



    
    export const getDashboardInformation = async (req, res) => {
    try {

        const {userId}=req.body.user;


const totalIncome=0;
const totalExpense=0;

const transactionsResult = await pool.query({
    text: `SELECT type, SUM(amount) AS totalAmount FROM tbltransaction WHERE user_id = $1 GROUP BY type`, 
    values: [userId],
    });
    const transactions =transactionsResult.rows;
    transactions.forEach((transaction) => { 
        if (transaction.type === "income") {
             totalIncome += transaction.totalamount; 
            } else {
                totalExpense += transaction.totalamount;

    }
    });


    const avaliaableBalance=totalIncome-totalExpense;





        
    } catch (error) {
    
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
    }
};








    export const addTransaction = async (req, res) => {
    
    try {
        const {userId}=req.body.user;
        const {account_id}=req.params;
        const {description,source,amount}=req.body;

          if(!(description || source || amount)){
            return res
            .status(403)
            .json({
                status :"failed",message:"provide required fields"
            });
          }
         
if (Number (amount) <= 0)
    return res
    .status(403)
    .json({ status: "failed", message: "Amount should be grater than 0." });

    const result = await pool.query({
    text: `SELECT * FROM tblaccount WHERE id = $1`,
    values: [account_id],
});

    const accountInfo = result.rows[0];

    if (!accountInfo) {
    return res
    .status(404)
    .json({ status: "failed", message: "Invalid account information." });
    }


    if(
        accountInfo.account_balance<=0 ||
        accountInfo.account_balance<Number(amount)
    ){
        return res
        .status(404)
        .json({ status: "failed", message: "failed.Insufficient account balance." });
        }
//Begin Transaction
await pool.query("BEGIN");

await pool.query({
    text: `UPDATE tblaccount SET account_balance = account_balance - $1, updatedat = CURRENT_TIMESTAMP WHERE id = $2`,
    values: [amount, account_id],
    });
    await pool.query({
    
    text: `INSERT INTO tbltransaction (user_id, description, type, status, amount, source) VALUES ($1, $2, $3, $4, $5, $6)`,
    values: [userId, description, "expense", "Completed", amount, source],
    });

    await pool.query("COMMIT");
    res.status(200).json({
        status:"success",
        message:"Transaction completed successfully"
    });














    } 
catch (error) {
    }
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
    };




    export const transferMoneyToAccountn = async (req, res) => { 
    try {

        const {userId}=req.body.user;
        const {from_account,to_account,amount}=req.body;

        if(!(from_account || to_account || amount)){
            return res.status(403).json({
                status:"failed",
                message:"privide  required fields!"
            });
        }
        const newAmount= Number(amount);
        if (Number (amount) <= 0)
            return res
            .status(403)
            .json({ status: "failed", message: "Amount should be grater than 0." });

    //cehck account details and balance for the 'from_account'
    
 const fromAccountResult = await pool.query({
text: `SELECT * FROM tblaccount WHERE id = $1`,
 values: [from_account],
});
const fromAccount = fromAccountResult.rows[0];
if (!fromAccount) {
return res.status(404).json({
status: "failed",
message: "Account information not found.",
});
}
if (newAmount > fromAccount.account_balance) {

return res.status(403).json({
status: "failed",
message: "Transfer failed. Insufficient account balance.",
});
}

//Begin transaction

await pool.query("BEGIN");
// Transfer from account
await pool.query({
text: `UPDATE tblaccount SET account_balance = account_balance - $1, updatedat = CURRENT_TIMESTAMP WHERE id = $2`,
values: [newAmount, from_account],
});
// Transfer to account
const toAccount = await pool.query({
text: `UPDATE tblaccount SET account_balance account_balance + $1, updatedat = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`,
values: [newAmount, to_account],
});


// Insert transaction records
const description = `Transfer (${fromAccount.account_name}-${toAccount.rows[0].account_name})`;

await pool.query({
text: `INSERT INTO tbltransaction (user_id, description, type, status, amount, source) VALUES ($1, $2, $3, $4, $5, $6)`,
values: [
userId,
description,
"expense",
"Completed",
amount,
fromAccount.account_name,
],
});

const description1 = `Transfer (${fromAccount.account_name}-${toAccount.rows[0].account_name})`;
await pool.query({
    text: `INSERT INTO tbltransaction (user_id, description, type, status, amount, source) VALUES ($1, $2, $3, $4, $5, $6)`,
    values: [
    userId,
    description,
    "income",
    "Completed",
    amount,
    fromAccount.account_name,
    ],
    });

    await pool.query("COMMIT");
    res.status(200).json({
        status:"success",
        message:"Transaction completed successfully"
    });





    } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
}

};
