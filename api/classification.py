import requests
import pandas as pd
import time

# LM Studio API endpoint
url = "http://localhost:1234/v1/chat/completions"
headers = {
    "Content-Type": "application/json"
}

def classify_description(text):
    prompt = f"""
Classify the following product description into:

1. Domain (like Healthcare, Agriculture, IoT, Education, etc.)
2. Idea Type (Hardware, Software, or Both)

Return only in this format:
Domain: <your domain>
Idea Type: <hardware/software/both>

Description:
{text}
"""

    payload = {
        "model": "local-model",  # Leave as 'local-model' if not renamed in LM Studio
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7
    }

    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        content = response.json()["choices"][0]["message"]["content"]

        domain, idea_type = "", ""
        for line in content.split('\n'):
            if "Domain:" in line:
                domain = line.split("Domain:")[1].strip()
            if "Idea Type:" in line:
                idea_type = line.split("Idea Type:")[1].strip()

        return domain, idea_type
    except Exception as e:
        print("❌ Error:", e)
        return "", ""