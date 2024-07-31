# TO-DO
Basic to-do web app

## ISSUES

- [ ] Add pico CSS  
- [ ] Toggle task completion  
- [ ] Updade task description  
- [x] Configure a local libSQL database  
- [x] Read all tasks from the database  
- [x] Save tasks in the database  

## Environment

- Instructions to setup the development environment
- Information about the production environment

### Development

Follow the instructions to setup the development environment

#### Go Version

See the file `.tool-versions` at the project root folder.

#### Database

By default, the program will open a local connection with a local.db file in the project root.

#### Environment variables

Create a copy of `.env-example` and rename it to `.env`. Fill the empty values if needed.

#### Run

To start the server use the following command:

```
go run ./src
```

## Production

Not deployed yet