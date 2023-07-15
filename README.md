### Assignment Project

#### Technologies Used
- React JS 
- FastApi
- Recharts
- Material UI

#### To start the fastapi server
- In the root folder, run the following command
```cmd
    uvicorn server:app
```
- This will start the server on `http://127.0.0.1:8000`

#### To start the React Application
- Go to `/volcanoapp` folder and run the following command
```cmd
    npm i
    npm start
```
- This will start the application on `http://localhost:3000`


**NOTE**
To address occasional crashes caused by a large dataset (>20,000), an API modification has been made by introducing a limit query parameter to restrict the number of datasets. In the current implementation, the limit has been set to 8000. If necessary, you can remove or modify this limit as needed in the App.js file.