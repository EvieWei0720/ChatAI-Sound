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
  const { handleNewMessage, isLoading, setIsLoading } = props;
  const [searchValue, setSearchValue] = useState("");

  const onSearch = async (question) => {
    if (!question.trim()) return; //prevent empty question
    setSearchValue("");
    setIsLoading(true);
    handleNewMessage(question);
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
