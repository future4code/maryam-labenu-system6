import { Turma } from "../types";
import { BaseDataBase } from "./baseDataBase";


export class ClassDataBase extends BaseDataBase {

    async create(turma: Turma) {
        await ClassDataBase.connection('labenusystem_turma')
            .insert({
                id: turma.getId(),
                nome: turma.getNome(),
                modulo: turma.getModulo()
            })
    }


}