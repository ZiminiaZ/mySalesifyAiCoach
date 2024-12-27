from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import re

# Initialize Flask App
app = Flask(__name__)
CORS(app)

# Load GPT-2 model and tokenizer
model_name = "gpt2-large"
tokenizer = GPT2Tokenizer.from_pretrained(model_name)
model = GPT2LMHeadModel.from_pretrained(model_name)

# Mock Recommendations Logic
def generate_recommendations(scores):
    recommendations = {}
    if scores.get("negotiation", 0) < 5:
        recommendations["negotiation"] = "Watch 'Mastering Negotiations' video."
    else:
        recommendations["negotiation"] = "Practice advanced negotiation case studies."
    if scores.get("time_management", 0) < 5:
        recommendations["time_management"] = "Complete 'Time Management 101' course."
    else:
        recommendations["time_management"] = "Optimize your daily schedule for productivity."
    return recommendations

# Function to get actionable coaching tip using GPT-2
def get_coaching_tip(skill, score):
    prompt = (
        f"Give one line of advice for a person with {skill} skill of {score}out of 10."
    )

    try:
        # Encode the input prompt
        input_ids = tokenizer.encode(prompt, return_tensors='pt')

        # Generate the output using GPT-2
        output = model.generate(
            input_ids,
            max_length=100,
            num_beams=5,
            no_repeat_ngram_size=2,
            early_stopping=True,
        )

        # Decode the generated text
        generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
       
        # Remove the prompt from the output
        tip = generated_text[len(prompt):].strip()

        # Clean up the text: remove leading punctuation, numbers, or extra spaces
        tip = re.sub(r"^[\.\d:\s]+", "", tip)
        
        return tip if len(tip) > 0 else "No valid advice generated."
    except Exception as e:
        return f"Error generating coaching tip for {skill}: {str(e)}"

# Endpoint 1: Recommend Tips
@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    if not data or "scores" not in data:
        return jsonify({"error": "Scores are required"}), 400

    scores = data["scores"]
    recommendations = generate_recommendations(scores)

    return jsonify(recommendations)

# Endpoint 2: Coaching Tips
@app.route("/coach", methods=["POST"])
def coach():
    data = request.get_json()
    if not data or "scores" not in data:
        return jsonify({"error": "Scores are required"}), 400

    scores = data["scores"]

    # Prepare the response with dynamic coaching tips
    coaching_tips = {}
    for skill, score in scores.items():
        tip = get_coaching_tip(skill, score)
        coaching_tips[f"{skill.capitalize()} (Score: {score})"] = tip

    return jsonify(coaching_tips)

# Start Flask Server
if __name__ == "__main__":
    app.run(port=5000, debug=True)
