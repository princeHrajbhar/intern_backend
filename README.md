# School Management API

A Node.js API for school management that allows users to add new schools and retrieve a list of schools sorted by proximity to a user-specified location.

## Features

- Add new schools with name, address, and geographical coordinates
- List all schools sorted by proximity to a specified location
- Validation for all input data
- Proper error handling

## Technologies Used

- Node.js
- Express.js
- MySQL
- Dotenv (for environment variables)
- Body-parser (for parsing request bodies)
- CORS (for cross-origin resource sharing)

## Prerequisites

- Node.js (v12 or higher)
- MySQL Server

## Installation

1. Clone the repository:
```
git clone <repository-url>
```

2. Navigate to the project directory:
```
cd school-management-api
```

3. Install dependencies:
```
npm install
```

4. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=school_management_db
```

## Running the Application

### Development Mode

To run the application in development mode with hot reload:
```
npm run dev
```

### Production Mode

To run the application in production mode:
```
npm start
```

## API Endpoints

### Add School
- **URL**: `/api/addSchool`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "Example School",
    "address": "123 School St, City, Country",
    "latitude": 37.7749,
    "longitude": -122.4194
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "School added successfully",
    "data": {
      "id": 1,
      "name": "Example School",
      "address": "123 School St, City, Country",
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  }
  ```

### List Schools by Proximity
- **URL**: `/api/listSchools?latitude=37.7749&longitude=-122.4194`
- **Method**: `GET`
- **Query Parameters**:
  - `latitude`: The user's latitude
  - `longitude`: The user's longitude
- **Response**:
  ```json
  {
    "success": true,
    "message": "Schools retrieved successfully",
    "data": [
      {
        "id": 1,
        "name": "Example School",
        "address": "123 School St, City, Country",
        "latitude": 37.7749,
        "longitude": -122.4194,
        "created_at": "2023-04-20T12:34:56.000Z",
        "updated_at": "2023-04-20T12:34:56.000Z",
        "distance": 0
      },
      {
        "id": 2,
        "name": "Another School",
        "address": "456 Education Ave, City, Country",
        "latitude": 37.8049,
        "longitude": -122.4394,
        "created_at": "2023-04-20T12:45:00.000Z",
        "updated_at": "2023-04-20T12:45:00.000Z",
        "distance": 3.42
      }
    ]
  }
  ```

## Error Handling

The API includes proper error handling for various scenarios, including:
- Invalid input data
- Server errors
- Database connection issues

## Testing with Postman

A Postman collection is included for testing the API endpoints. Import the collection into Postman to get started.

## License

This project is licensed under the ISC License. #   i n t e r n _ b a c k e n d 
 
 