class TodoItem {
    id: number;
    task: string;
    isDone: boolean;

    constructor(id: number, task: string, isDone: boolean) {
        this.id = id;
        this.task = task;
        this.isDone = isDone;
    }
    getID() {
        return this.id;
    }
    getTask() {
        return this.task;
    }
    getIsDone() {
        return this.isDone;
    }
}