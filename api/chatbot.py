import requests
import json

def call_local_llm_chat(prompt):
    url = "http://localhost:1234/v1/chat/completions"
    headers = {
        "Content-Type": "application/json"
    }

    payload = {
        "model": "mathstral",
        "messages": [
            {"role": "system", "content": "You are a helpful assistant that chats with users , your name is IMate , you should help the users with their qns on innovations , and also about the query if an given paragrph by them comes under which domain and which patent , you should not answer any other unrelated topics"},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.5
    }

    try:
        response = requests.post(url, headers=headers, data=json.dumps(payload))
        response.raise_for_status()
        result = response.json()
        return result["choices"][0]["message"]["content"].strip()
    except requests.exceptions.RequestException as e:
        print(f"LLM error: {e}")
        return "Sorry, I'm having trouble right now."
