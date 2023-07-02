## Setup Instructions

### Frontend

1. Navigate to the client directory: `cd client`
2. Install dependencies: `npm install`
3. Start the frontend development server: `npm run start`

### Backend

1. Navigate to the server directory: `cd server`
2. Set up the Python virtual environment: `python -m venv venv`
3. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate.bat`
   - On Linux/Mac: `source venv/bin/activate`
4. Install the required Python packages: `pip install -r requirements.txt`
5. Start the backend server: `python -m src.main`

#### Backend Shortcut for Windows (with Make)

If you are using Windows and have Make installed, you can also follow these steps:

1. Navigate to the server directory: `cd server`
2. Set up the Python virtual environment using Make: `make venv`
3. Activate the virtual environment using Make: `make activate`
4. Install the required Python packages: `make install`
5. Start the backend server: `make run`

## Design Choices

### Frontend Considerations

- Prioritized reducing API calls to apisguru as this may incur charges in production
- Fetched entire list of API names 1 time and saved the result using redux which will persits a refresh (assumption: the list should not change too frequently)
- Individual company info are only fetched when toggled on the accordion and similiar saved

### Backend Stack

- Python since there is an element of scheduling data ingesting, code can be reused in the future to build a proper pipeline via dagster or airflow
- Python is a popular language to work with machine learning which is becoming quite popular in finance, easy to extend if future business requirements call for NLP or forecasting
- Swagger at "/docs" for quality of life

### Database Choice

- I chose SQL since the schema has already been defined, we can make use of joins for complex queries as the project develops and new use cases arises
- Postgres is typically the cheapest option in the SQL family
