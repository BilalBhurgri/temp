from flask import Flask
import whisper
import ollama

#ollama = Ollama()
model = whisper.load_model("base")
result = model.transcribe("sqrt15739.mp3")
ollama.pull("llama3.2")
response = ollama.generate(model="llama3.2", prompt=result["text"])
print("User: ", result["text"],"\n", "LLM: ", response.response)

'''
app = Flask(__name__)

@app.route("/")

def
def speechToText():
    model = whisper.load_model("base")
    result = model.transcribe("sqrt15739.mp3")
    print(result["text"])
    llmResponse(result["text"])
    data = {'transcribedUser'}

def llmResponse(query):
    ollama.pull("llama3.2")
    response = ollama.generate(model="llama3.2", prompt=query)
    return response

def serverResponse(Audio file):
    # do STT on Audio file
    # do LLM response
    # do TTS on response
    # Send JSON with transcribed client input, LLM text response, and LLM Audio

if __name__ == "__main__":
    app.run(debug=True)
'''
