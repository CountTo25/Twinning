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

    public async run(): Promise<any>
    {
        await new Promise(async (r, rj) => {
            for (const pipe of this.members) {
                await pipe(this.subject);
            }
            r(null);
        })
        console.log('pipe done'+this.constructor.name);
    }
}


type Pipe<Subject> = (subject: Subject) => Promise<any>;