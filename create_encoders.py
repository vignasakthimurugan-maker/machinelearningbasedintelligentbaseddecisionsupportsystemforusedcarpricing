from sklearn.preprocessing import LabelEncoder
import joblib

le_brand = LabelEncoder()
le_brand.pkl(["Maruti", "Hyundai", "Honda", "Toyota", "Tata", "Mahindra"])

le_model = LabelEncoder()
le_model.pkl(["Swift", "i20", "City", "Innova", "Nexon", "XUV700"])

joblib.dump(le_brand, "le_brand.pkl")
joblib.dump(le_model, "le_model.pkl")

print("Created le_brand.pkl and le_model.pkl")