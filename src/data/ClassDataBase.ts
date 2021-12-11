import { Turma } from "../types";
import { BaseDataBase } from "./BaseDataBase";


export class ClassDataBase extends BaseDataBase {

    async create(turma: Turma) {
        await ClassDataBase.connection('labenusystem_turma')
            .insert({
                id: turma.getId(),
                nome: turma.getNome(),
                modulo: turma.getModulo()
            })
    }

    async getActiveClass(): Promise<Turma[]> {

        const turmas: Turma[] = await ClassDataBase.connection('labenusystem_turma')
            .select()
            .where("modulo", ">", "0")

        return turmas
    }

    async changeModule(nome: string, modulo: string) {
        await ClassDataBase.connection('labenusystem_turma')
        .update({
            modulo: modulo
        })
        .where("nome", "=", nome)
    }
}