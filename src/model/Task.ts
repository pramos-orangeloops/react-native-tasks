
export class Task {
    id: string;
    description: string;
    isDone: boolean;
    addedDate: Date;
    doneDate: Date | null;

    constructor(id: string, description: string, isDone: boolean, addedDate: Date, doneDate: Date | null = null) {
        this.id = id;
        this.description = description;
        this.isDone = isDone;
        this.addedDate = addedDate;
        this.doneDate = doneDate;
    }
}