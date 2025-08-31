//get voice id
import fs from "node:fs/promises";
import dotenv from "dotenv";
dotenv.config();

const API_BASE_URL = "https://api.sws.speechify.com";

const API_KEY = process.env.SPEECHIFY_API_KEY;

// async / await == promise in JS
// promise has 3 status: resolve (backend returns ok), reject(backend returns fail), pending(backend still running)
async function createVoice(name, filePath) {
  const sampleFile = await fs.readFile(filePath);

  const consent = JSON.stringify({
    fullName: "Evie",
    email: "test@gamil.com",
  });

  const formdata = new FormData(); //FormData object, used to build data for HTTP POST requests

  formdata.set("name", name);
  formdata.set("consent", consent); // for saftey reason
  formdata.set("sample", new Blob([sampleFile]));

  //fetch(backend API)
  const res = await fetch(`${API_BASE_URL}/v1/voices`, {
    method: "POST",
    body: formdata,
    headers: {
      Authorization: `Bearer ${API_KEY}`, //The word Bearer is a standard keyword indicating that a token is being passed to authenticate the request.
    },
  });

  if (!res.ok) {
    const errText = await res.text(); // capture API error body
    throw new Error(`Voice cloning API error ${res.status}: ${errText}`);
  }

  const responseData = await res.json(); // res.json() returns all the result from fetch()

  return responseData;
}

async function main() {
  const voiceData = await createVoice("IU voice", "voices/IU.mp4");
  console.log(voiceData.id); //cloned voice id, used because of speechify has it
}

main();
