import { Request, Response } from "express";
import { StudentDataBase } from "../data/StudentDataBase"
import { Estudante } from "../types";


export const getStudentByName = async (req: Request, res: Response): Promise<void> => {
    try {

        const nome: string = req.params.nome

        const studentDB = new StudentDataBase()
        const getStudent: Estudante[] = await studentDB.getStudentByName(nome)

        if(getStudent.length === 0) {
            res.statusCode = 404
            throw new Error("Estudante não encontrado")
        }

        res.status(200).send(getStudent)
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500).send("Algum erro aconteceu, tente novamente!")
        } else {
            res.status(res.statusCode).send(error.message)
        }
    }
}