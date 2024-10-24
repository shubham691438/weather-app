
# Real-Time Weather Monitoring Application


## Overview
This project implements a real-time weather monitoring system using the OpenWeatherMap API. 

The system is built to handle weather data for major metro cities in India (Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad). The system performs the following tasks:

- Retrieves weather data at configurable intervals.
- Processes the data to compute daily summaries (average, maximum, minimum temperature, and dominant weather condition).
- Triggers Email alerts when user-defined thresholds are breached.
- Provides a visualization of weather summaries and Historical weather treands trends.

    ![App Screenshot](./readmeAsset/homePage.png)


## Demo
Video Demo of Appication :
Live Demo of Application :


## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:**  React.js for visualizing the weather data
- **Database:** MongoDB
- **API:** OpenWeatherMap API


# Setup Instructions

## Prerequisites
- **Node.js**: Ensure you have Node.js (version >= 14.x) installed.
- **MongoDB**: MongoDB should be installed locally or accessible via a cloud instance (e.g., MongoDB Atlas).
- **Git**: For version control.

## Steps to Run the Application

1. **Clone the repository**:

    ```bash
    git clone https://github.com/shubham691438/weather-app.git
    cd weather-app
    ```

2. **Add environment variables in the frontend and backend folders with the filename `.env`**:

    - **Frontend `.env`**:

      ```bash
      VITE_BACKEND_URL=http://localhost:3030
      ```

    - **Backend `.env`**:

      ```bash
      MONGO_URI=mongodb+srv://ss691438:1234@weatherapp.4mrf0.mongodb.net/weatherApp
      WEATHER_API_KEY=784c92e26925b23022d5b6b1feab1147
      OFFICIAL_EMAIL=ss691438@gmail.com
      PASS=hbpjcmzwtppynsxs
      SECRET_JWT_KEY=aieurykjdheriufbasfia
      ```

3. **Install Dependencies**:

    ```bash
    npm run install-all
    ```
4. **Start Application**    
    ```bash
    npm start
    ```

