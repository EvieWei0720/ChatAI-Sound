import React from "react";
import { Spin, Card, Typography } from "antd";
import { AudioOutlined, UserOutlined, RobotOutlined } from "@ant-design/icons";
import axios from "axios";
import { Buffer } from "buffer";

const { Paragraph } = Typography;

const DOMAIN = "http://localhost:5001";

const containerStyle = {
  marginBottom: "16px",
};

const userContainer = {
  textAlign: "right",
};

const agentContainer = {
  textAlign: "left",
};

const userStyle = {
  maxWidth: "70%",
  display: "inline-block",
};

const agentStyle = {
  maxWidth: "70%",
  display: "inline-block",
  position: "relative",
};

const audioIconStyle = {
  position: "absolute",
  top: "50%",
  right: "-25px",
  transform: "translateY(-50%)",
  cursor: "pointer",
};

const RenderQA = (props) => {
  const { conversation, isLoading } = props;

  const handleTextToSpeech = async (words) => {
    try {
      const response = await axios.get(`${DOMAIN}/tts?words=${words}`, {
        responseType: "arraybuffer", // Important for receiving binary data
      });

      const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error("Error with TTS API:", error);
    }
  };

  // If the page is loading for the first time
  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      {conversation.map((entry, index) => (
        <div
          key={index}
          style={entry.sender === "user" ? userContainer : agentContainer}
        >
          <Card
            style={entry.sender === "user" ? userStyle : agentStyle}
            bodyStyle={{ padding: "10px" }}
            type="inner"
          >
            {entry.sender === "user" ? (
              <div style={{ color: "#1677FF" }}>
                <UserOutlined style={{ marginRight: "8px" }} />
                <Paragraph style={{ display: "inline" }}>
                  {entry.message}
                </Paragraph>
              </div>
            ) : (
              <div style={{ color: "black" }}>
                <RobotOutlined style={{ marginRight: "8px" }} />
                <Paragraph style={{ display: "inline" }}>
                  {entry.message}
                </Paragraph>
                <AudioOutlined
                  style={audioIconStyle}
                  onClick={() => handleTextToSpeech(entry.message)}
                />
              </div>
            )}
          </Card>
        </div>
      ))}
    </div>
  );
};

export default RenderQA;
