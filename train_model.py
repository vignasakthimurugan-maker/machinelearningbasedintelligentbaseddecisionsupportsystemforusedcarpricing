import pandas as pd
import joblib
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor

# Load dataset
df = pd.read_csv("used_cars_2000_rows.csv")

# 🔥 Encode categorical data
le_brand = LabelEncoder()
le_model = LabelEncoder()

df["Brand"] = le_brand.fit_transform(df["Brand"])
df["Model"] = le_model.fit_transform(df["Model"])

df["Fuel_Type"] = df["Fuel_Type"].map({"Petrol": 0, "Diesel": 1})
df["Transmission"] = df["Transmission"].map({"Manual": 0, "Automatic": 1})

columns_order = [
    "Brand", "Model", "Year", "KM_Driven",
    "Fuel_Type", "Transmission", "Owner",
    "Engine_CC", "Mileage_kmpl", "Current_Market_Price"
]

# Split
X = df.drop("Selling_Price", axis=1)
y = df["Selling_Price"]

# Train
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = RandomForestRegressor()
model.fit(X_train, y_train)

# 🔥 Save everything
joblib.dump(model, "car_price_model.pkl")
joblib.dump(le_brand, "le_brand.pkl")
joblib.dump(le_model, "le_model.pkl")

print("✅ Model trained and saved!")