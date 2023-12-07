import { ServerError } from "../models/serverError"
import { makeAutoObservable } from "mobx"

export default class CommonStore {
    errors: ServerError | null = null

    constructor(){
        makeAutoObservable(this)
    }

    setObserverError(errors: ServerError){
        this.errors = errors
    }
}
