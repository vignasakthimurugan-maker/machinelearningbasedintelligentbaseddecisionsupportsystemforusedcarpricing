import React, { useEffect, useState } from "react";
import "./App.css";
import carBg from "./assets/car_bg.png";
import steering from "./assets/steering.png";
import wheel from "./assets/wheel.png";

function App() {
  const [showVideo, setShowVideo] = useState(true);
  const [page, setPage] = useState("welcome");
  const [price, setPrice] = useState(null);

  const [form, setForm] = useState({
    Brand: "",
    Model: "",
    Year: "",
    KM_Driven: "",
    Fuel_Type: "",
    Transmission: "",
    Owner: "",
    Engine_CC: "",
    Mileage_kmpl: "",
    Current_Market_Price: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(false);
      setPage("welcome");
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
  if (!showVideo) {
    setTimeout(() => {
      const elements = document.querySelectorAll(".slide-up");
      elements.forEach((el) => el.classList.add("active"));
    }, 100);
  }
}, [showVideo, page]);

  useEffect(() => {
    setTimeout(() => {
      const elements = document.querySelectorAll(".slide-up");
      elements.forEach((el) => el.classList.add("active"));
    }, 1000);
  }, [page]);

  useEffect(() => {
  if (page === "result") {
    window.history.pushState({ page: "form" }, "");
  }
}, [page]);

useEffect(() => {
  const handleBack = () => {
    setPage("form");
  };

  window.addEventListener("popstate", handleBack);

  return () => {
    window.removeEventListener("popstate", handleBack);
  };
}, []);

  const handlePredict = async () => {
    for (let key in form) {
      if (form[key] === "") {
        alert("Please fill all fields");
        return;
      }
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (data.predicted_price) {
        setPrice(data.predicted_price);
        setPage("result");
      } else {
        alert("Error: " + data.error);
      }

    } catch (error) {
      alert("Server error");
    }
  };

  return (
  <div className="App">

    {showVideo ? (

      <div className="video-container">
        <video autoPlay muted playsInline className="intro-video">
          <source src="/CarsAnima.mp4" type="video/mp4" />
        </video>
      </div>

    ) : page === "welcome" ? (

      <div className="main-content slide-up">
        <img src={carBg} alt="bg" className="car-bg" />

        <div className="content-wrapper">

          <div className="title-box">
            <h2 className="title-text">
              MACHINE LEARNING-BASED INTELLIGENT DECISION SUPPORT SYSTEM FOR USED CARS PRICING
            </h2>

            <div className="icon-row">
              <img src={steering} className="icon" />
              <img src={steering} className="icon" />
              <img src={wheel} className="icon" />
              <img src={wheel} className="icon" />
              <img src={wheel} className="icon" />
              <img src={wheel} className="icon" />
              <img src={wheel} className="icon" />
              <img src={steering} className="icon" />
              <img src={steering} className="icon" />
            </div>

          </div>

          {/* 🔥 button must be OUTSIDE title-box */}
          <button className="predict-btn" onClick={() => setPage("form")}>
            START PREDICTION
          </button>

        </div>
      </div>

) : page === "form" ? (

        <div className="main-content slide-up">
          <img src={carBg} alt="bg" className="car-bg" />

          {/* ✅ FIX ADDED */}
          <div className="content-wrapper">

            <div className="title-box">
              <h2 className="title-text">
                Enter The Car's Details
              </h2>
            </div>

            <div className="form-container">

              <label>Enter the Brand</label>
              <select name="Brand" value={form.Brand} onChange={handleChange} >
                <option value="">Select Brand</option>
                <option>Maruti</option>
                <option>Tata</option>
                <option>Ford</option>
                <option>Hyundai</option>
                <option>Toyota</option>
                <option>Mahindra</option>
                <option>Honda</option>
                <option>Kia</option>
              </select>

              <label>Enter the Model</label>
              <select name="Model" value={form.Model} onChange={handleChange} >
                <option value="">Choose Model</option>
                <option>City</option>
                <option>i20</option>
                <option>Altroz</option>
                <option>Swift</option>
                <option>Seltos</option>
                <option>Baleno</option>
                <option>Figo</option>
                <option>Nexon</option>
                <option>Scorpio</option>
              </select>

              <label>Enter the Year of Model</label>
              <input type="number" name="Year" value={form.Year} placeholder="Year (e.g. 2022)" onChange={handleChange}/>

              <label>Enter the Kilometers Driven</label>
              <input type="number" name="KM_Driven" value={form.KM_Driven} placeholder="Kilometers Driven" onChange={handleChange} />

              <label>Choose the Number of Owners</label>
              <select name="Owner" value={form.Owner} onChange={handleChange} >
                <option value="">Owner</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>

             <label>Enter Engine Capacity in CC</label>
             <input
              type="number"
              name="Engine_CC"
              value={form.Engine_CC}    
              placeholder="Enter Engine Capacity (CC)"
              onChange={handleChange}
             />

              <label>Enter Mileage (kmpl)</label>
              <input type="number" name="Mileage_kmpl" value={form.Mileage_kmpl} placeholder="Mileage (kmpl)"
               onChange={handleChange} />

              <label>Enter Current Market Price</label>
              <input type="number" name="Current_Market_Price" value={form.Current_Market_Price} placeholder="Current Market Price" onChange={handleChange} /> 
 
              <label>Choose Fuel Type</label>
              <select name="Fuel_Type" value={form.Fuel_Type} onChange={handleChange} >
                <option value="">Fuel</option>
                <option>Petrol</option>
                <option>Diesel</option>
              </select>

              <label>Choose Transmission Type</label>
              <select name="Transmission" value={form.Transmission} onChange={handleChange} >
                <option value="">Transmission</option>
                <option>Manual</option>
                <option>Automatic</option>
              </select>

              <button className="predict-btn" onClick={handlePredict}>
                Predict the Car's Price 
              </button>

            </div>
          </div>
        </div>

      ) : (

        <div className="main-content slide-up result-page">
          <img src={carBg} alt="bg" className="car-bg" />

          <div className="result-glass-box">
            <h2>ESTIMATED SELLING PRICE</h2>
            <h1>₹ {price ? price : "Loading..."}</h1>
          </div>
        </div>

      )}

    </div>
  );
}

export default App;