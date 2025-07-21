import requests
import json

# Function to send grammar correction prompt to MathStral (chat endpoint)
def call_local_llm_chat(prompt):
    url = "http://localhost:1234/v1/chat/completions"
    headers = {
        "Content-Type": "application/json"
    }

    payload = {
        "model": "mathstral",  # Replace with your exact model name if different
        "messages": [
            {"role": "system", "content": "You are a helpful assistant that corrects grammar in paragraphs."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.2
    }

    try:
        response = requests.post(url, headers=headers, data=json.dumps(payload))
        response.raise_for_status()
        result = response.json()
        return result["choices"][0]["message"]["content"].strip()
    except requests.exceptions.RequestException as e:
        print(f"Error communicating with MathStral LLM: {e}")
        return None

# Function to correct grammar
def correct_grammar(text):
    prompt = (
        f"Correct the grammar of the following paragraph:\n\n{text}\n\n"
        "Only output the corrected version of the paragraph without any explanation."
    )
    corrected = call_local_llm_chat(prompt)
    return corrected if corrected else text

