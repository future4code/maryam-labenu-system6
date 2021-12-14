import { Request, Response } from "express"
import { TeacherDataBase } from "../data/TeacherDataBase"
import { Docente } from "../types"


export const getTeachers = async (req: Request, res: Response): Promise<void> => {
    try {

        const teacherDB = new TeacherDataBase()
        const getTeachers: Docente[] = await teacherDB.getTeachers()

        res.status(200).send(getTeachers)

    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500).send("Algum erro aconteceu, tente novamente!")
        } else {
            res.status(res.statusCode).send(error.message)
        }
    }
}