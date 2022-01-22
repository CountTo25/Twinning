export default abstract class Pipeline<Subject> {
    protected subject: Subject;
    protected members: Pipe<Subject>[] = [];
    constructor(subject: Subject) {
        this.subject = subject
    }

    public extend(by: Pipe<Subject>): void 
    {
        this.members.push(by);
    }

    public run(): void
    {
        for (const pipe of this.members) {
            pipe(this.subject);
        }
    }
}


type Pipe<Subject> = (subject: Subject) => void;