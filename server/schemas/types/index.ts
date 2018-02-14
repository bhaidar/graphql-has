// NOTE: Import schemas here

class TypeDefs {
    constructor() {}

    merge(input: any, debug=false): any {
        const internalTypes = ``;   // NOTE: Insert imported schemas inside this string
        const output = `
            ${input}
            ${internalTypes}
        `;
        if (debug) {
            this.debug(output);
        }
        return output;
    }

    private debug(schema: any) {
        console.log(schema);
    }
}
export { TypeDefs };
