# ROI Interview Challenge

### Purpose

This application will take an tsv file consisting of a Google AdWords account structure and output a corresponding JSON structure.

### Requirements

It is recommended that this application is run with NodeJS version 10.15. It has not been tested with any other versions.
NodeJS 10.15 can be found here https://nodejs.org/de/blog/release/v0.10.15/.

### Installation

Clone the repo and run the following command:

```
npm install
```

### Execution

To run the application with the default input.tsv file, navigate to the root of the application directory and run the "npm start" script:

```
npm start
```

To run the application with a custom file, run the command with the filename argument:

```
npm start --input=/path/to/filename.tsv
```

or

```
npm start -- --input=/path/to/filename.tsv
```

To specify the output file, run the command with the --output argument:

```
npm start --input=/path/to/filename.tsv --output=/path/to/output.json
```
