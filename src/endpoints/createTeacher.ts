import { Request, Response } from "express"
import { TeacherDataBase } from "../data/TeacherDataBase"
import { Docente } from "../types"


export const createTeacher = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nome, email, data_nasc, turma_id, especialidades } = req.body
        const id = Date.now().toString()

        
        if (!nome || !email || !data_nasc || !turma_id || !especialidades) {
            res.statusCode = 422
            throw new Error("Todos os campos solicitados são necessários.")
        }

        const teachertDB = new TeacherDataBase()
        
        const newTeacher = new Docente(id, nome, email, data_nasc, turma_id, especialidades)
        
        await teachertDB.create(newTeacher)

        res.status(200).send("Novo Professor criado com sucesso")

    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500).send("Algum erro aconteceu, tente novamente!")
        } else {
            res.status(res.statusCode).send(error.message)
        }
    }
}