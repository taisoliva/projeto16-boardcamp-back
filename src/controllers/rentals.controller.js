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

}

export async function finishRentals(req, res){

}

export async function deleteRentals(req,res){

}