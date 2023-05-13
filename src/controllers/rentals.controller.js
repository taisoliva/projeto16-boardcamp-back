import {db} from "../database/database.js"

export async function getRentals(req,res){

    try{
        const rentals = await db.query(`SELECT * FROM rentals`)
        res.send(rentals.rows)

    }catch(err){
        return res.status(500).send(err.message)
    }
}

export async function postRentals(req,res){

    const {customerId, gameId, daysRented} = req.body

    try{
        const clientCheck = await db.query(`SELECT * FROM customers WHERE id=$1;`, [customerId])
        if(clientCheck.rows.length === 0) return res.status(400).send("Cliente não existente")
        
    }catch(err){
        return res.status(500).send(err.message)
    }
}

export async function finishRentals(req, res){

}

export async function deleteRentals(req,res){

}