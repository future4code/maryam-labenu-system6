import { Request, Response } from "express"
import { StudentDataBase } from "../data/StudentDataBase"
import { Estudante } from "../types"


export const createStudent = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nome, email, data_nasc, turma_id, hobbies } = req.body
        const id = Date.now().toString()

        
        if (!nome || !email || !data_nasc || !turma_id || !hobbies) {
            res.statusCode = 422
            throw new Error("Todos os campos solicitados são necessários.")
        }

        const studentDB = new StudentDataBase()
        
        const newStudent = new Estudante(id, nome, email, data_nasc, turma_id, hobbies)
        
        await studentDB.create(newStudent)

        res.status(201).send("Novo Estudante criado com sucesso")

    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500).send("Algum erro aconteceu, tente novamente!")
        } else {
            res.status(res.statusCode).send(error.message)
        }
    }
}