import { Test } from "utt"

export default class extends Test {
    // Pass arguments to the program
    args() {
        return [ "" ];
    }
    
    // Generate the input
    // see docs for helpers to create the input
    input() {
        this.line("A line of stdin")
    }

    // OPTIONAL: Declare how the output should be transformed
    // transform() {
    //     return [ this.hash() ]  
    // }    

    // OPTIONAL: Include files 
    // files() {
    //     this.importFile("real.txt", "./path/to/real.txt")
    //     this.textFile("new.in", "2137")
    // }

    // Verify that the test passed succesfully
    // use a helper or write the logic yourself
    async check(output, expected) {
        await this.assertExact(output, expected)
    }
}
