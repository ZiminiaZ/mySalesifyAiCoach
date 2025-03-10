# AI-Powered Sales Coach: Full Stack Application

This project is a full-stack application that uses an AI-powered backend and a React frontend to provide personalized sales coaching. The application allows users to input scores for key sales skills and receive personalized recommendations and coaching tips based on their performance.

The backend uses a Flask server with a GPT-2 model for generating coaching tips, while the frontend is built with React and communicates with the backend via API requests.

---

## Features

### Frontend
- **Score Inputs:** Users can input scores for two key sales skills: *Negotiation* and *Time Management*.
- **Gamification:** The app calculates a "level" based on the scores, giving users a sense of progress.
- **Recommendations & Coaching Tips:** Users can fetch personalized recommendations and coaching tips by making API requests.
- **Error Handling & Loading State:** Displays loading indicators and error messages if something goes wrong during API requests.

### Backend
- **Mock Recommendations:** Based on the input scores, the backend generates personalized recommendations for improving sales skills.
- **GPT-2 Powered Coaching Tips:** The backend uses a GPT-2 model to generate personalized coaching tips for each skill based on the user's score.
- **Flask API:** Provides endpoints to get recommendations (`/recommend`) and coaching tips (`/coach`).

---

## Tech Stack

### Frontend
- **React:** For building the user interface.
- **Axios:** For making HTTP requests to the backend.
- **Tailwind CSS:** For styling the application.

### Backend
- **Flask:** For building the API.
- **PyTorch & Transformers:** For loading and using the GPT-2 model to generate coaching tips.
- **CORS:** To handle cross-origin requests from the frontend.

---

## Components

### Frontend
- **`App`**: The main component that manages the application's state, user interactions, and API calls.
- **`ScoreInputs`**: A component that allows the user to input their scores for *Negotiation* and *Time Management*.
- **`Button`**: A component with buttons to trigger the fetching of recommendations and coaching tips from the backend.
- **`RecommendationsAndCoaching`**: A component that displays the fetched recommendations and coaching tips.

### Backend
- **`/recommend`**: An endpoint that returns personalized recommendations based on the user's scores.
- **`/coach`**: An endpoint that returns dynamic coaching tips for each skill using the GPT-2 model.

---

## Prerequisites

Before you begin, ensure you have met the following requirements:

- `npm` installed on your machine.
- `Python 3.7` or higher installed.
- `pip` (Python package installer) installed.

---

## Setup Instructions

### Step 1: Copy the Repository URL
1. Go to the GitHub repository page where you want to clone the project.
2. Click on the green **Code** button.
3. Under the **Clone** section:
   - **HTTPS:** Copy the HTTPS URL (e.g., `https://github.com/username/repo.git`).

### Step 2: Open a Terminal
1. Open a terminal (Command Prompt, Git Bash, or any CLI on your system).
2. Navigate to the directory where you want to clone the repository using the `cd` command.

```bash
cd path/to/your/directory
```

### Step 3: Clone the Repository
Run the `git clone` command followed by the repository URL:

#### Example using HTTPS:
```bash
git clone https://github.com/username/repo.git
```

### Step 4: Navigate into the Cloned Repository
Once cloned, move into the repository folder to run the application on both frontend and backend:

#### Frontend:
```bash
cd sales-coach
npm start
```
You can then copy and paste the localhost URL in your browser to start the frontend application
```
e.g. http://localhost:4173/
```

#### Backend:
##### Create Virtual Environment:
```bash
python -m venv venv
```

##### Activate Virtual Environment:

###### On Windows:
```bash
venv\Scripts\activate
```

###### On macOS/Linux:
```bash
source venv/bin/activate
```

##### Create a new terminal and get in the backend directory
```bash
cd backend
```
##### Install Requirements (you need to do this only once)
```bash
pip install -r requirements.txt
```
##### Run the backend
```bash
python app.py
```

After running the above command `gpt2-large` will install on your local machine. Make sure to have at least 6GB free space and a stable, good internet connection.

---
You can adjust scores of Negotiation and TimeManagement and click the `Get Recommendations` button to get recommendations along with the level you are at.

To get coaching tips, click on `Get Coaching Tips`. GPT-2 Large will generate coaching tips for you according to your scores!

Be aware that GPT2 is an older model and might generate vague context sometimes.
---
---

## Challenges Faced

### Problem 1: Network Instability
- **Issue:** The download of the `gpt2-large` model was interrupted due to connection issues.
- **Solution:** Used a stable internet connection.

### Problem 2: Vague AI Responses
- **Issue:** The AI model generated vague, overly generic, or irrelevant responses, and the coaching tips were too long or unrelated to the given skills and scores.
- **Possible Solutions:** Fine Tuning the model or adjusting the parameters.
- **Solution:** Refined the prompt to be specific, concise, and actionable while limiting randomness and output length using stricter `num_beams` and `n_gram` size configurations. Tested the pipeline method to integrate `gpt2-large` and then switched to tokenizer format.

### Problem 4: Prompt included in the output, extra spaces between texts and unnecessary punctuation.
- **Issue:** The prompt provided to the model was included in the output along with the text generated. It also included extra punctuation and spaces.
- **Solution:**
   Removing the prompt 
    ```py
        tip = generated_text[len(prompt):].strip()
    ```
    Clean up the text: remove leading punctuation, numbers, or extra spaces using re
    ```py
        tip = re.sub(r"^[\.\d:\s]+", "", tip)
    ```
### Problem 3: Model Size Optimization
- **Issue:** Finding the right size model for the output.
- **Solution:** Used `gpt-neo-1.3B`, then switched to `gpt2-medium`, and finally settled on `gpt2-large` for better output.
