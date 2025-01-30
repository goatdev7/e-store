# E-Store

E-Store is a full-stack application designed for learning and experimenting with web technologies. The project includes a GraphQL API for the backend and a React application for the frontend. It is currently under development and open for contributions.


## Tech Stack

### Backend
- GraphQL API: For managing and querying data.
- TypeScript: Ensures type safety and better code readability.


### Frontend
- React: For building the user interface.
- Next: Utilizing the power of Next.js to make the prject SEO friendly

## Features

- Backend: Fully functional GraphQL API for handling data operations.
- Frontend: Interactive React UI to consume the API.
- Modular and extensible design to support additional functionality.

## Contributing

This project is designed for learning purposes and welcomes contributions. Feel free to add or update functionality, fix bugs, or enhance the design.

## How to Test / Try Locally
To run E-Store on your local machine, follow these steps:
1. Clone the repo:
    ```
    git clone https://github.com/goatdev7/e-store.git \\
    cd e-store
    ```

2. Set Up MongoDB via Docker
    Make sure you have Docker installed on your machine.
    Pull and run a MongoDB Docker container (if not already running):
    ```
    docker run -d \
    --name e-store-mongo \
    -p 27017:27017 \
    -v e-store-mongo-data:/data/db \
    mongo:latest
    ```
    This starts a container named e-store-mongo on port 27017, persisting data in a Docker volume named e-store-mongo-data.

3. Set Up the Backend
    1. Navigate to the backend folder:
    ```
    cd backend
    ```

    2. Install dependencies:
    ```
    npm install
    ```

    3. Create or update your .env file if necessary (e.g., for your MongoDB connection string):
    ```
    MONGO_URI=mongodb://localhost:27017/e-store-db
    SECRET_KEY=your_secret_key
    ```

    4. Start the backend server:
    ```
    npm run dev
    ```

    By default, it will launch the server on http://localhost:4000

3. Set Up the Frontend
    1. Navigate to the frontend folder:
    ```
    cd ../frontend
    ```

    2. Install dependencies:
    ```
    npm install
    ```

    3. Start the frontend:
    ```
    npm run dev
    ```

    By default, this will start the Next.js app on http://localhost:3000

    4. Open the Application:
    Go to http://localhost:3000 to view the E-Store frontend.
4. Stopping MongoDB
    To stop your Docker container for MongoDB:
    ```
    docker stop e-store-mongo
    ```

    To remove it completely (and delete data if you’re not using a volume):
    ```
    docker rm e-store-mongo
    ```

With Docker managing MongoDB and Node.js processes running locally, you can explore and modify **E-Store** while benefiting from an isolated development environment. 

For additional questions or troubleshooting, please open an issue or submit a pull request.

## License

This project is open-source and can be freely used for educational purposes.