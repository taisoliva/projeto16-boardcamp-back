import {db} from "../database/database.js"

export async function getGames(req, res){
    try{
        const games = await db.query(`SELECT * FROM games;`)
        res.send(games.rows)
    }catch(err){
        res.status(500).send(err.message)
    }
}

export async function postGames(req,res){

    const { name, image, stockTotal, pricePerDay } = req.body
    console.log(name, image, stockTotal, pricePerDay)

    try {
        const nameCheck = await db.query(`SELECT * FROM games WHERE name='${name}';`)
        console.log(nameCheck.rows.length)
        if(nameCheck.rows.length !== 0) return res.status(409).send("Jogo já cadastrado")

        await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") 
                                    VALUES ('${name}', '${image}', ${stockTotal}, ${pricePerDay});`)
        
        res.sendStatus(201)
        
        /*const hash = bcrypt.hashSync(password, 10)

        await db.collection("users").insertOne({ name, email, password: hash })
        res.sendStatus(201) */

    } catch (err) {
        res.status(500).send(err.message)
    }

}