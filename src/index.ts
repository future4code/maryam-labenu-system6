import { Request, Response } from "express"
import app from "./app"
import { createClass } from "./endpoints/createClass"
import { createStudent } from "./endpoints/createStudent"
import { createTeacher } from "./endpoints/createTeacher"
import { getActiveClass } from "./endpoints/getActiveClass"
import { getStudentByName } from "./endpoints/getStudentByName"
import { getTeachers } from "./endpoints/getTeachers"


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