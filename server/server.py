from flask import Flask
import whisper
import ollama
#from fastapi import FastAPI
#from fastapi.responses import FileResponse
from transformers import AutoProcessor, BarkModel
import scipy

#ollama = Ollama()
app = Flask(__name__)

def roughTest(fileName):
    whisper_model = whisper.load_model("base")
    whisper_transcribe = model.transcribe(fileName)
    ollama.pull("llama3.2")
    ollama_response = ollama.generate(model="llama3.2", prompt=whisper_transcribe["text"])
    print("User: ", whisper_transcribe["text"],"\n", "LLM: ", ollama_response.response)
    bark_processor = AutoProcessor.from_pretrained("suno/bark")
    bark_model = BarkModel.from_pretrained("suno/bark")

    voice_preset = "v2/en_speaker_6"

    inputs = bark_processor(ollama_response.response, voice_preset=voice_preset)

    if "attention_mask" not in inputs:
        inputs["attention_mask"] = torch.ones_like(inputs["input_ids"])

    audio_array = model.generate(**inputs)
    audio_array = audio_array.cpu().numpy().squeeze()

    sample_rate = model.generation_config.sample_rate
    scipy.io.wavfile.write("b1.wav", rate=sample_rate, data=audio_array)

roughTest("philos.mp3")

'''
@app.route("/response")
def serverResponse(filepath):
    # store file
    # do STT on Audio file
    textQuery = speechToText(filepath)
    # do LLM response
    textResponse = llmResponse(textQuery["text"])
    # do TTS on response
    textToSpeech(textResponse)
    # Send JSON with transcribed client input, LLM text response, and LLM Audio
    print("User: ", textQuery["text"], "\n", "LLM: ", response.response)

def storeAudio():
    return 0

def speechToText(filepath):
    model = whisper.load_model("base")
    result = model.transcribe(filepath)
    return result
    llmResponse(result["text"])
    data = {'transcribedUser'}

def llmResponse(query):
    ollama.pull("llama3.2")
    response = ollama.generate(model="llama3.2", prompt=query)
    return response

def textToSpeech(filepath):
    processor = AutoProcessor.from_pretrained("suno/bark")
    model = BarkModel.from_pretrained("suno/bark")

    voice_preset = "v2/en_speaker_6"

    inputs = processor(filepath, voice_preset=voice_preset)

    audio_array = model.generate(**inputs)
    audio_array = audio_array.cpu().numpy().squeeze()

    sample_rate = model.generation_config.sample_rate
    scipy.io.wavfile.write("bark_out.wav", rate=sample_rate, data=audio_array)

if __name__ == "__main__":
    app.run(debug=True)
'''