import { Route } from "next";
import Link from "next/link";

export default function page3() {
    return (
        <html lang="en">
        <h1>My Homepage</h1>

        <Link href="/">
            <div>My Card</div>
        </Link>
        </html>
    )
}

export function page2(rows: number): void  {

    let currentNum = 1;

    for (let i = 1; i <= rows; i++) {
        let row = '';
        for (let j = 1; j <= i; j++) {
            row += currentNum;
            currentNum++;
        }
        console.log(row);
    }

}
page2(5);

console.log(page2)


export function Pyramid(rows: number): void {
    let currentNum = 1;

    for (let i = 1; i <= rows; i++) {
        let row = '';
        for (let j = 1; j <= i; j++) {
            row += currentNum;
            currentNum++;
        }
        console.log(row);
    }
 
}

Pyramid(5);

console.log(Pyramid)



const fs = require('fs');

export function getWords(filename: string, indices: any[]) {
    fs.readFile(filename, 'utf8', function(err: any, data: string) {
        if (err) throw err;
        let lines = data.split('\n');
        let selectedWords = indices.map(index => {
            let line = lines[index - 1]; // array indices start at 0, but your file's lines start at 1
            let word = line.split('. ')[1]; // split the line into number and word, and select the word
            return word;
        });
        console.log(selectedWords);
    });

    return (
    
        <html lang="en">
        <body>
            <h1>My Homepage</h1>
        </body>
        
        </html>
    )

}

getWords('encode1.txt', [1, 3]);

