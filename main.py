import pandas as pd
import numpy as np
import random

# Number of rows
n = 2000   # 👈 Changed to 2000

brands_models = {
    "Maruti": ["Swift", "Baleno", "Dzire"],
    "Hyundai": ["i20", "Creta", "Venue"],
    "Honda": ["City", "Amaze"],
    "Tata": ["Nexon", "Altroz"],
    "Mahindra": ["XUV300", "Scorpio"],
    "Toyota": ["Innova", "Glanza"],
    "Kia": ["Seltos", "Sonet"],
    "Ford": ["EcoSport", "Figo"]
}

fuel_types = ["Petrol", "Diesel"]
transmissions = ["Manual", "Automatic"]

data = []

for _ in range(n):
    brand = random.choice(list(brands_models.keys()))
    model = random.choice(brands_models[brand])
    year = random.randint(2012, 2023)
    km_driven = random.randint(5000, 150000)
    fuel = random.choice(fuel_types)
    transmission = random.choice(transmissions)
    owner = random.randint(0, 3)
    engine_cc = random.randint(800, 2500)
    mileage = round(random.uniform(12, 25), 1)

    base_price = random.randint(500000, 2000000)
    depreciation = (2025 - year) * random.randint(20000, 50000)
    selling_price = max(base_price - depreciation - (km_driven * 2), 100000)

    data.append([
        brand, model, year, km_driven, fuel,
        transmission, owner, engine_cc,
        mileage, base_price, selling_price
    ])

columns = [
    "Brand", "Model", "Year", "KM_Driven", "Fuel_Type",
    "Transmission", "Owner", "Engine_CC",
    "Mileage_kmpl", "Current_Market_Price", "Selling_Price"
]

df = pd.DataFrame(data, columns=columns)

df.to_csv("used_cars_2000_rows.csv", index=False)

print("Dataset generated successfully with 2000 rows!")