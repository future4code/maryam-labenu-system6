import { Request, Response } from "express"
import app from "./app"
import { changeModule } from "./endpoints/changeModule"
import { changeStudentFromClass } from "./endpoints/changeStudentFromClass"
import { changeTeacherFromClass } from "./endpoints/changeTeacherFromClass"
import { createClass } from "./endpoints/createClass"
import { createStudent } from "./endpoints/createStudent"
import { createTeacher } from "./endpoints/createTeacher"
import { getActiveClass } from "./endpoints/getActiveClass"
import { getStudentByName } from "./endpoints/getStudentByName"
import { getTeachers } from "./endpoints/getTeachers"

//TESTE
app.get("/", (req: Request, res: Response) => {
    res.send("Testando... Deu tudo certo!")
    console.log("configurações funcionando")
})

app.post("/turmas", createClass)
app.post("/estudantes", createStudent)
app.post("/docentes", createTeacher)

app.get("/turmas", getActiveClass)
app.get("/estudantes/:nome", getStudentByName)
app.get("/docentes", getTeachers)

app.put("/turmas/:id", changeModule)
app.put("/estudantes/:id", changeStudentFromClass)
app.put("/docentes/:id", changeTeacherFromClass)