import React, { useState } from "react";
import ChatComponent from "./components/ChatComponent";
import RenderQA from "./components/RenderQA";
import { Layout, Typography } from "antd"; // antd: component library

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
  const [conversation, setConversation] = useState([]); //useState() change varibles' state to interact, inside () is initial state
  const [isLoading, setIsLoading] = useState(false);
  const { Header, Content } = Layout;
  const { Title } = Typography;

  const handleResp = (question, answer) => {
    setConversation((prev) =>
      prev.map((entry) =>
        entry.question === question ? { ...entry, answer } : entry
      )
    );
  };
  const addQuestion = (question) => {
    setConversation((prev) => [...prev, { question, answer: null }]);
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
          <Title style={{ color: "white" }}>PeopleAI</Title>
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
            handleResp={handleResp}
            addQuestion={addQuestion}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
      </Layout>
    </>
  );
};

export default App;
