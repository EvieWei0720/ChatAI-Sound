import React, { useState } from "react";
import axios from "axios";
import { Input } from "antd";

const { Search } = Input;

const DOMAIN = "http://localhost:5001";

const searchContainer = {
  display: "flex",
  justifyContent: "center",
};

const ChatComponent = (props) => {
  const { handleResp, addQuestion, isLoading, setIsLoading } = props;
  const [searchValue, setSearchValue] = useState("");

  const onSearch = async (question) => {
    if (!question.trim()) return; //prevent empty question
    setSearchValue("");
    setIsLoading(true);
    addQuestion(question);

    try {
      //API call
      const response = await axios.get(`${DOMAIN}/chat`, {
        params: { question },
      });
      handleResp(question, response.data);
    } catch (error) {
      console.error("Error fetching chat response:", error);
      handleResp(
        question,
        "Sorry, there was an error processing your request."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div style={searchContainer}>
      <Search
        placeholder="Ask me anything"
        enterButton="Send"
        size="large"
        value={searchValue} //current value of input
        onChange={handleChange} //change value when typing
        onSearch={onSearch} //when press enter or click button
        loading={isLoading}
      />
    </div>
  );
};

export default ChatComponent;
