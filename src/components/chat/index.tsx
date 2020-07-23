import React, { useState, useRef } from "react";
import { Input, Comment, Card } from "antd";
import { sendMessage } from "../../utils/sendMessage";
import { IResponse } from "../../interfaces";
import { isEmpty } from "lodash";
import { SendOutlined } from "@ant-design/icons";
import "./index.css";

const Chat: React.FC<any> = ({ ...props }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [currentStep, setCurrentStep] = useState<number>();
  const [userStepMessages, setUserStepMessages] = useState<any>([]);
  const [botStepMessages, setBotStepMessages] = useState<any>([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    try {
      // @ts-ignore: Object is possibly 'null'.
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    } catch {
      // do nothing
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEmpty(inputMessage)) return;
      const step = currentStep ? currentStep + 1 : 0;
      setCurrentStep(step);

      const userStepMessage = { message: inputMessage };
      const userStepMessageList = userStepMessages;
      userStepMessageList.push(userStepMessage);
      setUserStepMessages(userStepMessageList);

      const response: IResponse = await sendMessage(inputMessage);

      const botStepMessage = {
        message: response.message,
        nextStep: response.nextStep,
      };
      const botStepMessageList = botStepMessages;
      botStepMessageList.push(botStepMessage);
      setBotStepMessages(botStepMessageList);

      setInputMessage("");
      scrollToBottom();
    } catch {
      setInputMessage("");
      const botStepMessage = {
        message: "Oops! It looks like we're experiencing technical issues",
      };
      const botStepMessageList = botStepMessages;
      botStepMessageList.push(botStepMessage);
      setBotStepMessages(botStepMessageList);
    }
  };
  return (
    <Card
      className="chat-wrapper"
      title={
        <div className="chat-card-title">
          <h4>Awesome ChatBot</h4>
          <p>Welcome</p>
        </div>
      }
    >
      <div className="chat-content">
        <div className="chat-card-title">
          {isEmpty(userStepMessages) && (
            <span>Start conversation with a greeting</span>
          )}
        </div>
        {userStepMessages &&
          userStepMessages.map((step, index) => {
            return (
              <>
                <div className="chat-user-message" key={"user-" + index}>
                  <Comment
                    author={"You"}
                    content={
                      <div className="user-message-wrapper">
                        <p>{step.message}</p>
                      </div>
                    }
                  />
                </div>
                <div className="bot-user-message" key={"bot-" + index}>
                  <Comment
                    author={"Bot"}
                    content={
                      <div className="bot-message-wrapper">
                        <p>
                          {botStepMessages[index]
                            ? botStepMessages[index]?.message
                            : "..."}
                        </p>
                      </div>
                    }
                  />
                  {botStepMessages[index]?.nextStep && (
                    <Comment
                      author={"Bot"}
                      content={
                        <div className="bot-message-wrapper">
                          <p>
                            {botStepMessages[index]
                              ? botStepMessages[index]?.nextStep
                              : "..."}
                          </p>
                        </div>
                      }
                    />
                  )}
                </div>{" "}
                <div id="bottom-div" ref={messagesEndRef} />
              </>
            );
          })}
      </div>
      <Card.Meta
        title={
          <Input
            className="chat-reply-input"
            placeholder="Start typing..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(event) => {
              if (event.key === "Enter") handleSubmit();
            }}
            suffix={
              <SendOutlined
                onClick={handleSubmit}
                style={{ fontSize: "26px", color: "blue" }}
                disabled={isEmpty(inputMessage)}
              />
            }
          />
        }
      />
    </Card>
  );
};
export default Chat;
