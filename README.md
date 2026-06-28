# 🍽️ TasteLens – AI-Powered Personalized Food Recommendation System

> A full-stack food recommendation platform that suggests personalized Indian dishes using machine learning and an intuitive React-based interface.

🌐 **Live Demo:** https://tastelens.onrender.com/

⚙️ **Backend API:** https://tastelens-api-5s9c.onrender.com/


https://github.com/user-attachments/assets/1e5715aa-a48e-4afc-a3b6-bdd6f7db3b3d


![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Flask](https://img.shields.io/badge/Flask-3.1-black?logo=flask)
![Python](https://img.shields.io/badge/Python-3-blue?logo=python)
![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-orange?logo=scikitlearn)
![Render](https://img.shields.io/badge/Hosted_on-Render-46E3B7?logo=render)
![License](https://img.shields.io/badge/License-MIT-green)
---

## 📖 Overview

TasteLens is an AI-powered food recommendation system designed to provide personalized dish suggestions based on user preferences. The application combines machine learning techniques with a modern full-stack architecture to deliver an interactive and responsive user experience.

The frontend is built using **React** and **Vite**, while the recommendation engine is implemented using **Flask**, **Pandas**, and **Scikit-learn**.

---

## Features

* Personalized food recommendations based on user preferences.
* Content-based recommendation engine using Scikit-learn.
* Interactive and responsive React frontend.
* RESTful Flask API for recommendation generation.
* Dataset-driven recommendation workflow.
* End-to-end cloud deployment using Render.

---

#  Project Architecture

```
                User
                  │
                  ▼
        React + Vite Frontend
                  │
        HTTP REST API Requests
                  │
                  ▼
        Flask Recommendation API
                  │
        Recommendation Engine
                  │
                  ▼
     Indian Food Recommendation Dataset
```

---

#  Recommendation System

The recommendation engine is built using content-based filtering techniques.

It analyzes food attributes such as:

* Cuisine
* Dish Name
* Ingredients
* Category
* Similarity between food items

The backend processes the dataset and returns the most relevant recommendations based on the user's selected dish.

---

# Tech Stack

## Frontend

* **React.js** – Built the interactive and component-based user interface.
* **Vite** – Fast build tool and development server for improved performance.
* **JavaScript** – Implemented client-side application logic and API interactions.
* **HTML5** – Structured the web application's content and layout.
* **CSS3** – Styled the application for a clean and responsive design.
* **Tailwind CSS** – Utility-first CSS framework used to create a modern and consistent UI.
* **React Router** – Enabled client-side routing and seamless navigation between pages.

## Backend

* **Flask** – Developed the RESTful API and handled backend request processing.
* **Flask-CORS** – Enabled secure communication between the React frontend and Flask backend.
* **Pandas** – Loaded, cleaned, and processed the food recommendation dataset.
* **NumPy** – Performed numerical computations required for data processing.
* **Scikit-learn** – Implemented the content-based recommendation engine using machine learning techniques.

## Deployment

* **Render** – Hosted both the frontend and backend, providing a publicly accessible web application.

## Version Control

* **Git** – Managed source code, tracked changes, and maintained project history.
* **GitHub** – Hosted the repository, enabled version control, and supported collaborative development and deployment.

---

#  Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/vedikagupta890/TasteLens.git
cd TasteLens
```

---

## 2. Backend Setup

Navigate to the backend directory.

```bash
cd backend
```

Create a virtual environment.

```bash
python -m venv venv
```

Activate it.

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies.

```bash
pip install -r requirements.txt
```

Run the Flask server.

```bash
python recommend.py
```

The backend will start on:

```
http://127.0.0.1:5000
```

---

## 3. Frontend Setup

Navigate to the frontend folder.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

The frontend will run on:

```
http://localhost:5173
```

---

# 🌍 Deployment

## Frontend

Hosted on Render

https://tastelens.onrender.com/

## Backend

Hosted on Render

https://tastelens-api-5s9c.onrender.com/

---

#  Dataset

The recommendation engine uses a curated dataset of Indian food items containing information such as:

* Food ID
* Dish Name
* Cuisine
* Category
* Ingredients
* Additional metadata used for recommendations

The dataset is processed by the backend to generate personalized recommendations.

---

# 📸 Screenshots


Home Page:
<img width="959" height="467" alt="image" src="https://github.com/user-attachments/assets/1f099d3b-9e04-44ce-9394-2b61a3490a1e"/>


Recommendation Page:
<img width="959" height="473" alt="image" src="https://github.com/user-attachments/assets/be597c20-82b4-4db7-978d-e6dfd1e2492b"/>


Food Details:
<img width="959" height="475" alt="image" src="https://github.com/user-attachments/assets/96cca918-683e-483e-a540-6c0ba39e2de3"/>
<img width="951" height="465" alt="image" src="https://github.com/user-attachments/assets/ab7996f5-b3a3-407a-a69c-9b4ef5114f97"/>
<img width="959" height="474" alt="image" src="https://github.com/user-attachments/assets/b97ceaf1-bfd2-4e10-a1b7-092a37f81599"/>




---

# Future Improvements

* User authentication
* Personalized user profiles
* Collaborative filtering
* Hybrid recommendation system
* Restaurant integration
* Nutrition-based recommendations
* User ratings and reviews
* Favorites and recommendation history



# ⭐ If you found this project interesting

Please consider giving the repository a ⭐ to support the project.
