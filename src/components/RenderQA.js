import React from "react";
import { Spin } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import axios from "axios";
import { Buffer } from "buffer";

const DOMAIN = "http://localhost:5001";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-bewteen",
  marginBottom: "20px",
};

const userContainer = {
  textAlign: "right",
};

const agentContainer = {
  textAlign: "left",
};

const userStyle = {
  maxWidth: "50%",
  textAlign: "left",
  backgroundColor: "#1677FF",
  color: "white",
  display: "inline-block",
  padding: "10px",
  borderRadius: "10px",
  marginBottom: "10px",
};
const agentStyle = {
  maxWidth: "50%",
  textAlign: "left",
  backgroundColor: "#F9F9FE",
  color: "black",
  display: "inline-block",
  padding: "10px",
  borderRadius: "10px",
  marginBottom: "10px",
  position: "relative",
};

const audioIconStyle = {
  position: " absolute",
  top: "50%",
  right: "-25px",
  transform: "translateY(-50%)",
  corsor: "pointer",
};

const RenderQA = (props) => {
  const { conversation } = props;

  const handleTextToSpeech = async (words) => {
    try {
      const response = await axios.get(`${DOMAIN}/tts?words=${words}`);
      const decodedAudioData = Buffer.from(
        response?.data?.audio_data,
        "base64"
      );

      const audioBlob = new Blob([decodedAudioData], { type: "audio/mp3" });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error("Error with TTS API:", error);
    }
  };
  return (
    <>
      {conversation?.map((each, index) => (
        <div key={index} style={containerStyle}>
          <div style={userContainer}>
            <div style={userStyle}>{each.question}</div>
          </div>
          <div style={agentContainer}>
            <div style={agentStyle}>
              {each.answer === null ? <Spin size="small" /> : each.answer}
              <AudioOutlined
                style={audioIconStyle}
                onClick={() => handleTextToSpeech(each.answer)}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default RenderQA;
