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

## Functionality

### Dashboard 
This dashboard contains a table for reservations, a table for the list of tables, and  a navigation bar to show the selected date and to move to the previous, next or today's date.

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

![image]()



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