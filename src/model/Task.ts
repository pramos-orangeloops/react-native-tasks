
export class Task {
    id: string;
    description: string;
    isDone: boolean;
    addedDate: Date;
    doneDate: Date | null;
    imageUrl: string | null;

    constructor(id: string, description: string, isDone: boolean, addedDate: Date, doneDate: Date | null = null, imageUrl: string | null = null) {
        this.id = id;
        this.description = description;
        this.isDone = isDone;
        this.addedDate = addedDate;
        this.doneDate = doneDate;
        this.imageUrl = imageUrl
    }
}