import React, { useState } from "react";
import ChatComponent from "./components/ChatComponent";
import RenderQA from "./components/RenderQA";
import { Layout, Typography } from "antd"; // antd: component library
import axios from "axios"; // Import axios for API calls

const chatComponentStyle = {
  position: "fixed",
  bottom: "0",
  width: "80%",
  left: "10%",
  marginBottom: "20px",
};

const renderQAStyle = {
  marginTop: "50px",
  height: "50%",
  overflowY: "auto",
};

const App = () => {
  // store the conversation as an array of message objects from the DB
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { Header, Content } = Layout;
  const { Title } = Typography;

  // Function to send a new message to the backend
  const handleNewMessage = async (question) => {
    setIsLoading(true);

    setConversation((prev) => [...prev, { sender: "user", message: question }]);

    try {
      // Send the new question to the backend. The backend handles saving the user's message
      // and getting the AI response, saving both to the database.
      const response = await axios.get(
        `http://localhost:5001/chat?question=${question}`
      );
      // Add the bot's response to the conversation state
      setConversation((prev) => [
        ...prev,
        { sender: "bot", message: response.data.message },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setConversation((prev) => [
        ...prev,
        {
          sender: "bot",
          message: "Sorry, I am unable to respond at this time.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Layout
        style={{
          height: "100vh",
          backgroundColor: "white",
        }}
      >
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            position: "fixed",
            width: "100%",
          }}
        >
          <Title style={{ color: "white" }}>ChatAI</Title>
        </Header>
        <Content style={{ width: "80%", margin: "auto" }}>
          <br />
          <br />
          <div style={renderQAStyle}>
            <RenderQA conversation={conversation} />
          </div>
          <br />
          <br />
        </Content>
        <div style={chatComponentStyle}>
          <ChatComponent
            handleNewMessage={handleNewMessage}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
      </Layout>
    </>
  );
};

export default App;
