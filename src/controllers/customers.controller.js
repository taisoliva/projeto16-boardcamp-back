import {db} from "../database/database.js"

export async function getClientes(req,res){

    try{
        const clientes = await db.query(`SELECT * FROM customers`)
        res.status(200).send(clientes.rows)
    }catch(err){
        return res.status(500).send(err.message)
    }

}

export async function postClientes(req,res){
    const {name, phone, cpf, birthday} = req.body
    console.log(name, phone, cpf, birthday)

    try{
        const cpfCheck = await db.query(`SELECT * FROM customers WHERE cpf = '${cpf}';`)
        if(cpfCheck.rows.length !== 0 ) return res.status(409).send("Ciente já cadastrado")

        await db.query(`INSERT INTO customers (name, phone, cpf, birthday) 
                        VALUES ('${name}', '${phone}', '${cpf}', '${birthday}');`)
        
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
        res.send(cliente.rows[0])
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
        
        const cpfCheck = await db.query(`SELECT * FROM customers WHERE cpf='${cpf}' AND id!='${id}'`)
        if(cpfCheck.rows.length !== 0) return res.status(409).send("Usuario já cadastrado")

        await db.query(`UPDATE customers SET 
                                        name='${name}', 
                                        phone='${phone}', 
                                        birthday='${birthday}'
                                WHERE id=$1`, [id])
       
        console.log(cliente.rows[0].cpf)
        res.sendStatus(200)

    } catch(err){
        return res.status(500).send(err.message)
    }
    


}