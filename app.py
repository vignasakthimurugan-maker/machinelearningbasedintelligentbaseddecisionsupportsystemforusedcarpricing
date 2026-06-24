from flask import send_from_directory, Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__, static_folder="build", static_url_path="")
CORS(app)

# Load model
model = joblib.load("car_price_model.pkl")

# Load encoders
le_brand = joblib.load("le_brand.pkl")
le_model = joblib.load("le_model.pkl")

columns_order = [
    "Brand", "Model", "Year", "KM_Driven",
    "Fuel_Type", "Transmission", "Owner",
    "Engine_CC", "Mileage_kmpl", "Current_Market_Price"
]

@app.route("/")
def serve():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        if not data:
            return jsonify({"error": "No data received"}), 400

        for key, value in data.items():
            if value == "":
                return jsonify({"error": f"({key}) can't be empty"}), 400

        if data["Brand"] not in le_brand.classes_:
            return jsonify({"error": "Invalid Brand"}), 400

        if data["Model"] not in le_model.classes_:
            return jsonify({"error": "Invalid Model"}), 400

        fuel_map = {"Petrol": 0, "Diesel": 1}
        transmission_map = {"Manual": 0, "Automatic": 1}

        fuel = fuel_map[data["Fuel_Type"]]
        transmission = transmission_map[data["Transmission"]]

        brand = le_brand.transform([data["Brand"]])[0]
        model_name = le_model.transform([data["Model"]])[0]

        input_data = pd.DataFrame([{
            "Brand": brand,
            "Model": model_name,
            "Year": int(data["Year"]),
            "KM_Driven": int(data["KM_Driven"]),
            "Fuel_Type": fuel,
            "Transmission": transmission,
            "Owner": int(data["Owner"]),
            "Engine_CC": int(data["Engine_CC"]),
            "Mileage_kmpl": float(data["Mileage_kmpl"]),
            "Current_Market_Price": int(data["Current_Market_Price"])
        }])

        input_data = input_data[columns_order]

        prediction = model.predict(input_data)

        return jsonify({
            "predicted_price": round(float(prediction[0]), 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)