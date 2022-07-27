# Restaurant Reservation System

Live Deployment: https://gw-restaurant-res-frontend.herokuapp.com/
Backend API: https://gw-restaurant-res-backend.herokuapp.com/

## Uses

This application allows any user or restaurant to create, manage, and view reservations.

- Users are able to create tables with varying capacities.
- Users are asl oable to create reservations with a guests name, mobile number, date of reservation, reservation time, and amount of people attending.
- With small adjustments this can be perfect for any business as well.
- Finishing a reservation will reopen the table assigned to the reservation.
- Reservations can be searched by mobile number and every reservation associated with that number will be displayed regardless of it's status.

## Client Functionality

### Dashboard

This dashboard contains a table for reservations, a table for the list of tables, and a navigation bar to show the selected date and to move to the previous, next or today's date.

Each reservation has a button to seat, edit, and cancel the reservation.

Each table has a button to finish the reservation.

![image](https://github.com/GabrielWootenDev/restaurant-reservation-project/blob/0b53d3e7eb29083bd855b8b86b9f238dfedf5475/ReadMe-screenshots/Dashboard.png)

### Search Page

The searchpage contains a form with a field to enter a mobile number and a button to initiate a search for all reservations with that mobile number.

![image](https://github.com/GabrielWootenDev/restaurant-reservation-project/blob/6dfd50b0c0e2cd3766d3b4e2a0d85ea538872905/ReadMe-screenshots/search-page.png)

This is the page with a valid mobile number, it shows the same table as the dashboard but only filled with the reservations belonging to that mobile number.

![image](https://github.com/GabrielWootenDev/restaurant-reservation-project/blob/6dfd50b0c0e2cd3766d3b4e2a0d85ea538872905/ReadMe-screenshots/search-page-results.png)

When there are no results for a givin mobile number the page is displayed as below.

![image](https://github.com/GabrielWootenDev/restaurant-reservation-project/blob/6dfd50b0c0e2cd3766d3b4e2a0d85ea538872905/ReadMe-screenshots/search-no-results.png)

### New Reservation / Edit Reservation

The create reservation page contains a form with fields to enter all the information necessary to create a reservation; First Name, Last Name, Mobile Number, Reservation Date, Reservation Time, and Party Size / Number of People.

The same page is used when editing a reservation and when doing so the form will be prefilled with the information from the chosen reservation.

In both cases appopriate errors will display on the page
when submitting if any exists to help users correct mistakes before the reservation is finalized.

![image](https://github.com/GabrielWootenDev/restaurant-reservation-project/blob/e59f2a1a5a467b77587b39795bd6040ab9309c0e/ReadMe-screenshots/create-edit-reservation.png)

### New Table

The New Table page contains a form with fields for table name and capacity.

The table name must be longer than 2 characters and the capacity 1 or greater.

![image](https://github.com/GabrielWootenDev/restaurant-reservation-project/blob/8c3705cfecc98a222ded5a91b507ce6c396af8c3/ReadMe-screenshots/new-table.png)

## API Functionality

https://gw-restaurant-res-backend.herokuapp.com

### /reservations

- GET - Retrieves and lists all reservations
- POST - Creates a new reservations using the request body data in this form:

        {
          "data": {
            "first_name": "first",
            "last_name": "last",
            "mobile_number": "0000000000",
            "reservation_date": "2022-01-01",
            "reservation_time": "00:00",
            "people": number of people,
        }
      }

### /reservations?date={insertDateHere}

- GET - Retrieves and lists all reservations for the date

### /reservations?mobile_number={insertMobileNumberHere}

- GET - Retrieves and lists all reservations for the mobile_number

### /reservations/{reservation_id}

- GET - Retrieves the information for the selected reservation_id

- PUT - Updates the reservation with the given reservation_id with the request body data in this form

        {
          "data": {
            "first_name": "first",
            "last_name": "last",
            "mobile_number": "0000000000",
            "reservation_date": "2022-01-01",
            "reservation_time": "00:00",
            "people": insert number of people,
        }
      }

### /reservations/{reservations_id}/status

- PUT - Updates the status of the reservation with the given reservation_id with the request body data in this form

        {
          "data": {
            "status": "newStatus,
        }
      }

### /tables

- GET - Retrieves and lists all existing tables

- POST - Creates a new table using the request body data in this form:

        {
          "data": {
            "table_name": "insert table name",
            "capacity": insert number of maximum occupants,
        }
      }


### /tables/open

- GET - Retrieves and lists all tables with no associated reservation_id

### /tables/{table_id}

- GET - Retrieves the information for the selected table_id

### /tables/{table_id}/seat

- GET - Retrieves the information for the selected table_id

- PUT - Updates the table with the associated table_id with the reservation that is seating at it from the body data 

        {
          "data": {
            "reservation_id": insert reservation_id,
        }
      }

- DELETE - Removes the reservation_id related to the table_id and updates the associated reservations status to "finished"

# Technical Information

## Built With -

- React.js
- Node.js
- HTML
- CSS
- Express
- PostgreSQL
- Knex.js
- cors

### Knex

Run `npx knex` commands from within the `back-end` folder, which is where the `knexfile.js` file is located.

## Installation

1. Fork and clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your ElephantSQL database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5001`.
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` to start your server in development mode.

If you have trouble getting the server to run, reach out for assistance.

## Running tests

- `npm test` runs _all_ tests.
- `npm run test:backend` runs _all_ backend tests.
- `npm run test:frontend` runs _all_ frontend tests.
- `npm run test:e2e` runs only the end-to-end tests.

If you would like a reminder of which npm scripts are available, run `npm run` to see a list of available commands.

Note that the logging level for the backend is set to `warn` when running tests and `info` otherwise.
