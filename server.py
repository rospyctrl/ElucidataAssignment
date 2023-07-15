
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from itertools import islice
import csv

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

@app.get("/api/differential/")
async def get_data(limit: int = 20000):
    csv_file = "./DE-results.csv" 

    try:
        data = []
        with open(csv_file, "r") as file:
            csv_reader = csv.reader(file)
            header = next(csv_reader)

            for row in islice(csv_reader, limit):
                data.append(dict(zip(header, row)))

        return {"data": data}

    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to retrieve data from CSV file")


# app = FastAPI()

# @app.get("/data")
# async def get_data():
#     with open("./DE-results.csv", "r") as csvfile:
#         reader = csv.reader(csvfile, delimiter=",")
#         data = []
#         for row in reader:
#             data.append(row)
#     return json.dumps(data)

# if __name__ == "__main__":
#     app.run(debug=True)
