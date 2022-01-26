type Definition = {
    columns: {
        [name: string]: string
    },
    relations: {[relation: string]: {
        many: boolean,
    }}
}
    
export default Definition;