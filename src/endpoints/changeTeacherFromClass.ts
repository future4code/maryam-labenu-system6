import { Request, Response } from "express"
import { TeacherDataBase } from "../data/TeacherDataBase"


export const changeTeacherFromClass = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id
        const turma_id = req.body.turma_id

        if (!turma_id) {
            res.statusCode = 422
            throw new Error("O ID da turma é necessario")
        }

        const teacherDB = new TeacherDataBase()
        await teacherDB.changeTeacherFromClass(id, turma_id)

        res.status(200).send("Alteração da turma do docente realizada!")

    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500).send("Algum erro aconteceu, tente novamente!")
        } else {
            res.status(res.statusCode).send(error.message)
        }
    }
}