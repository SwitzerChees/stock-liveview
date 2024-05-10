# Stock Liveview

The `stock-liveview` is a NodeJS application designed to show the stock prices in real-time. It uses WebSockets to push the stock prices to the client. The stock prices are loaded from a MongoDB replica set.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- NodeJS
- Docker
- Access to a MongoDB replica set

### Installing

A step-by-step series of examples that tell you how to get a development environment running.

1. **Clone the repository**

   ```bash
   git clone https://github.com/switzerchees/stock-liveview.git
   cd stock-liveview
   ```

### Running

2. **Run the application**

   ```bash
    npm install
    npm start
   ```

Then acces the frontend at http://localhost:3000

### Environment Variables

- `MONGODB_URL`: The URL of the MongoDB replica set (default: `mongodb://localhost:27017,localhost:27018,localhost:27019`)
- `NODE_ENV`: The environment in which the application is running (default: `development`)
- `PORT`: The port on which the application will run (default: `3000`)
