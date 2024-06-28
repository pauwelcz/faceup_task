# Records - records CRUD operation

- [About The Project](#about-the-project)
   * [Built with](#built-with)
   * [Getting started](#getting-started)
      + [Prerequisities](#prerequisities)
      + [Init database](#init-database)
      + [Project start](#project-start)
   * [Graphql queries and mutations](#graphql-queries-and-mutations)
      + [Mutation createRecord(createRecordInput)](#mutation-createrecordcreaterecordinput)
      + [Mutation updateRecord(updateRecordInput)](#mutation-updaterecordupdaterecordinput)
      + [Mutation removeRecord(id)](#mutation-removerecordid)
      + [Mutation generateUrl(id)](#mutation-generate-urlid)
      + [Query filesByRecord(recordId)](#query-filesbyrecordrecordid)
      + [Query records](#query-records)
   * [Author](#author)

## About The Project

This project is part of a technical round. Project demonstrates:
- CRUD operations on tables **records** and **files**
- saves attached files to **S3 bucket**
- allows **download** attached files from details
- shows simple UI created with **React**

### Built with

- Visual Studio Code
- NodeJS v18.16.0
- NestJS 10.2.0
- Docker 25.0.3

### Getting started

#### Prerequisities

- NodeJS v18.16.0
- NestJS 10.2.0
- Docker 25.0.3

#### Init database

1. Create `.env` file and fill it with variables (variable names are included in `.env.example` file ). 
2. Start Docker, if you do not have it started
3. Open terminal
4. Run command `docker compose up`

After these steps you should be able to connect to MySQL database.
There will be created also container simulating AWS enviroment.

For stopping project simply press `ctrl + c` in terminal.

#### Project start

1. In folder `server` run these commands:
    - `npm i` for install depencencies
    - `npm run start` for starting server 
2. In folder `client` run these commands:
    - `npm i` for install dependencies
    - `npm start` for starting client (press also `y` for running in another port)

_Note_: You should be able to work only with `server` (localhost:3000)

Now client will run on `http://localhost:3001/`

### Graphql queries and mutations

#### Mutation createRecord(createRecordInput)

This mutation will create record, also with attached files. Attached files are also saved in S3 bucket.

#### Mutation updateRecord(updateRecordInput)

This mutation will update existing record, also with attached files. Attached files are also saved in S3 bucket. In cases that some files are already updated, you can delete tham with "trashbin checkbox icon". These marked files will be removed (from DB and S3)

#### Mutation removeRecord(id)

This mutation will remove record with possible uploaded files (from DB and S3).

### Mutation generateUrl(id)

This mutation will generate presigned URL from S3 bucket object to download file in record details.

### Query filesByRecord(recordId)

This query will return all files for one record. It is used in record details and update existing record.

#### Query records

Query will return all records by its limit and offset. In React part of code there is also pagination and refetching after CRUD modification of records.

_Note_: Inputs and outputs can be founded in [graphql playground docs](http://localhost:3000/graphql/).

### Author

- Name: **Pavel Sedlář**
- <a href="https://www.linkedin.com/in/pavel-sedl%C3%A1%C5%99-574039117/">LinkedIn Profile</a>
- <a href="https://github.com/pauwelcz/objedname_task">Github repository</a>