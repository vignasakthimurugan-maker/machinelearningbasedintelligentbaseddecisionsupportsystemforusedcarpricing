try:
    import flask
    import flask_cors
    import pandas
    import sklearn
    import joblib

    print("✅ All packages are installed and working")

except ImportError as e:
    print("❌ Missing package:", e)