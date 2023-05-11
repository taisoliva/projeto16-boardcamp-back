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

    res.sendStatus(200)

    /* try {
        const user = await db.collection("users").findOne({ email })
        if (user) return res.status(409).send("E-mail já foi cadastrado!")

        const hash = bcrypt.hashSync(password, 10)

        await db.collection("users").insertOne({ name, email, password: hash })
        res.sendStatus(201)

    } catch (err) {
        res.status(500).send(err.message)
    } */

}