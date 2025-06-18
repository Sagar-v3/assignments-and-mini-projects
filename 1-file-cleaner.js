// <!-- ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ``` -->


const fs = require("fs");

function fileCleaner() {
    fs.readFile("a.txt", "utf-8", (err, data)=> {
        let str = data;
        console.log(str);
        let cleanStr = str.trim().replace(/\s+/g, ' ');
        console.log(cleanStr);
        fs.writeFile("a.txt", cleanStr, (err) => {
            if(err) {
                console.log(err);
            }
        });
    });
}

fileCleaner();