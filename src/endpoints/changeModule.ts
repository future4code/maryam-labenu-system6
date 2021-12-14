import { Request, Response } from "express";
import { ClassDataBase } from "../data/ClassDataBase";


export const changeModule = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id
        const modulo = req.body.modulo

        if (modulo > "6") {
            res.statusCode = 422
            throw new Error("Módulo não existente")
        }

        const classDB = new ClassDataBase()
        await classDB.changeModule(id, modulo)

        res.status(200).send("Alteração do módulo da turma realizado!")

    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500).send("Algum erro aconteceu, tente novamente!")
        } else {
            res.status(res.statusCode).send(error.message)
        }
    }
}