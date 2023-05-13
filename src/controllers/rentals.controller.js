import {db} from "../database/database.js"
import dayjs from "dayjs"

export async function getRentals(req,res){

    try{
        const rentals = await db.query(`SELECT rentals.*, customers.name AS "clientName", games.name AS "gameName" FROM rentals 
        JOIN customers ON customers.id = rentals."customerId"
        JOIN games ON games.id = rentals."gameId";`)

        const formatteRentals = rentals.rows.map(rental => {
            return {
                id:rental.id,
                customerId: rental.customerId,
                gameId: rental.gameId,
                rentDate: dayjs(rental.rentDate).format("YYYY-MM-DD"),
                daysRented : rental.daysRented,
                returnDate: rental.returnDate,
                originalPrice: rental.originalPrice,
                delayFee: rental.delayFee,
                customer: { 
                    id:rental.customerId,
                    name: rental.clientName
                },
                game : {
                    id:rental.gameId,
                    name: rental.gameName
                }
            }
        })
        
        res.send(formatteRentals)



    }catch(err){
        return res.status(500).send(err.message)
    }
}

export async function postRentals(req,res){

    const {customerId, gameId, daysRented} = req.body

    try{
        const clientCheck = await db.query(`SELECT * FROM customers WHERE id=$1;`, [customerId])
        if(clientCheck.rows.length === 0) return res.status(400).send("Cliente não existente")

        const gameCheck = await db.query(`SELECT * FROM games WHERE id=$1;`, [gameId])
        if(gameCheck.rows.length === 0) return res.status(400).send("Jogo não existente")

        const stockTotal = gameCheck.rows[0].stockTotal
        const pricePerDay = gameCheck.rows[0].pricePerDay

        const rentals = await db.query(`SELECT * FROM rentals WHERE "gameId"=$1`, [gameId])
        if(rentals.rows.length === stockTotal) return res.status(400).send("Unidade não disponível")

        const today = dayjs().format("YYYY-MM-DD")
        const originalPrice = pricePerDay * daysRented
        
        await db.query(`INSERT INTO rentals 
                            ("customerId", "gameId", 
                            "rentDate", "daysRented", 
                            "returnDate", "originalPrice", "delayFee")
                        VALUES ($1, $2, $3, $4, $5, $6, $7)`, 
                        [customerId, gameId, today, daysRented, null, originalPrice, null])

        res.sendStatus(201)

    }catch(err){
        return res.status(500).send(err.message)
    }
}

export async function finishRentals(req, res){

}

export async function deleteRentals(req,res){

}