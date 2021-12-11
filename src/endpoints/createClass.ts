import { Request, Response } from "express";
import { ClassDataBase } from "../data/ClassDataBase";
import { Turma } from "../types";


export const createClass = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nome, modulo } = req.body
        const id = Date.now().toString()

        
        if (!nome || !modulo) {
            res.statusCode = 422
            throw new Error("Todos os campos solicitados são necessários.")
        }

        const classDB = new ClassDataBase()
        
        const newClass = new Turma(id, nome, modulo)
        
        await classDB.create(newClass)

        res.status(201).send("Nova Turma criada com sucesso")

    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500).send("Algum erro aconteceu, tente novamente!")
        } else {
            res.status(res.statusCode).send(error.message)
        }
    }
}