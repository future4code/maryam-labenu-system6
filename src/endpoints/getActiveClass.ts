import { Request, Response } from "express";
import { ClassDataBase } from "../data/ClassDataBase";
import { Turma } from "../types";


export const getActiveClass = async (req: Request, res: Response): Promise<void> => {
    try {

        const classDB = new ClassDataBase()
        const getClass: Turma[] = await classDB.getActiveClass()

        res.status(200).send(getClass)

    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500).send("Algum erro aconteceu, tente novamente!")
        } else {
            res.status(res.statusCode).send(error.message)
        }
    }
}