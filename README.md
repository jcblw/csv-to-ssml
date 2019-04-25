# CSV to SSML

Small tool to convert CSV instructions to SSML. CSV is often more approachable and a lot easier to read.

## Dependencies

This library only only has one dependency.

- [ssml](https://www.npmjs.com/package/ssml)

## Usage

#### Example

```javascript
import fs from "fs";
import { toSSML } from "csv-to-ssml";

fs.readFile("./path-to/instructions.csv", "utf8", (err, csv) => {
  const ssml = toSSML(csv);
  console.log(ssml);
  fs.writeFile("./path-to/instructions.ssml", ssml, () => {});
});
```

## toSSML

This is a function that takes a string CSV file, and will output a string SSML file.

#### CSV Format

The CSV file does need a certain set of instructions to be able to put the proper tags around text and breaks.

```
TEXT, hi there
BREAK, 0.5
TEXT, this is a sample
```

For more info on SSML [see the spec](https://www.w3.org/TR/speech-synthesis11/)

##### TEXT

This is a text node, it currently adds just any text in the table to this.

```
TEXT, hi there
```

> Since this is a CSV parser any comma are viewed as separators and will be treated as such

##### BREAK

This is silence between different instructions. The number notation is in seconds and decimal values are allowed.

```
BREAK, 1
```

##### AUDIO

This is a reference to a link. It will embed an audio file into a SSML sequence.

```
AUDIO, https://samples.co/example.mp4
```

##### PROSODY

This will set the rate of the voice dictation.

```
PROSODY, slow
```

##### LANGUAGE

This sets the language of the SSML document.

> This will erase any information added to the documents prior so put this notation at the top of your CSV document.

```
LANGUAGE, en-US
```
