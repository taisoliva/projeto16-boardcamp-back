import {db} from "../database/database.js"
import dayjs from "dayjs"

export async function getClientes(req,res){

    try{
        const clientes = await db.query(`SELECT * FROM customers`)
        const formattedCientes = clientes.rows.map(cliente => {
            return {
                ...cliente,
                birthday: dayjs(cliente.birthday).format('YYYY-MM-DD')
            }
        })
        res.status(200).send(formattedCientes)
    }catch(err){
        return res.status(500).send(err.message)
    }

}

export async function postClientes(req,res){
    const {name, phone, cpf, birthday} = req.body

    try{
        const cpfCheck = await db.query(`SELECT * FROM customers WHERE cpf = '${cpf}';`)
        if(cpfCheck.rows.length !== 0 ) return res.status(409).send("Ciente já cadastrado")

        const formattedDate = dayjs(birthday).format('YYYY-MM-DD')
        await db.query(`INSERT INTO customers (name, phone, cpf, birthday) 
                        VALUES ('${name}', '${phone}', '${cpf}', '${formattedDate}');`)
        
        res.sendStatus(201)

    }catch(err){
        return res.status(500).send(err.message )
    }
}

export async function buscarClientes(req,res){
    const {id} = req.params;

    try{
        const cliente = await db.query(`SELECT * FROM customers WHERE id=$1;`, [id])
        if(cliente.rows.length === 0 ) return res.status(404).send("Usuario não encontrado")
        const formattedCientes = cliente.rows.map(client => {
            return {
                ...client,
                birthday: dayjs(client.birthday).format('YYYY-MM-DD')
            }
        })
        res.send(formattedCientes[0])
    }catch(err){
        return res.status(500).send(err.message)
    }
}

export async function updateClientes(req,res){

    const {id} = req.params;
    const {name, phone, cpf, birthday} = req.body
    try{
        const cliente = await db.query(`SELECT * FROM customers WHERE id=$1;`, [id])
        if(cliente.rows.length === 0 ) return res.status(404).send("Usuario não encontrado")
        
        const cpfCheck = await db.query(`SELECT * FROM customers WHERE cpf='${cpf}';`)
        if(cpfCheck.rows.length !== 0) return res.status(409).send("Usuario já cadastrado")
        const formattedDate = dayjs(birthday).format('YYYY-MM-DD')

        await db.query(`UPDATE customers SET 
                                        name='${name}', 
                                        phone='${phone}', 
                                        cpf='${cpf}',
                                        birthday='${formattedDate}'
                                WHERE id=$1`, [id])
        res.sendStatus(200)

    } catch(err){
        return res.status(500).send(err.message)
    }
    


}