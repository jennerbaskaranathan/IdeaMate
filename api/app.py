from flask import Flask, request, jsonify
from flask_cors import CORS
from classification import classify_description
from grammar_correction import correct_grammar
from chatbot import call_local_llm_chat

app = Flask(__name__)
CORS(app)

@app.route('/classify', methods=['POST'])
def classify():
    idea = request.form.get('idea')
    if not idea:
        return jsonify({'status': 'error', 'message': 'No idea provided'}), 400
    domain, idea_type = classify_description(idea)
    return jsonify({'status': 'success', 'domain': domain, 'idea_type': idea_type})

@app.route('/grammar', methods=['POST'])
def grammar():
    idea = request.form.get('idea')
    if not idea:
        return jsonify({'status': 'error', 'message': 'No idea provided'}), 400
    corrected = correct_grammar(idea)
    return jsonify({'status': 'success', 'corrected': corrected})

@app.route('/chatbot', methods=['POST'])
def chatbot():
    prompt = request.form.get('prompt')
    if not prompt:
        return jsonify({'status': 'error', 'message': 'No prompt provided'}), 400
    reply = call_local_llm_chat(prompt)
    return jsonify({'status': 'success', 'reply': reply})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
