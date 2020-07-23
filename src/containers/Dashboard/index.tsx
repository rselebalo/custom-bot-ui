import React, { useState, useEffect } from "react";
import { Table, Card, Tabs } from "antd";
import moment from "moment";
import { fetchInteractions } from "../../utils/getInterationsData";
import { fetchInteractionMessages } from "../../utils/getIntreactioMessages";
import "../../components/chat/index.css";

const Dashboard: React.FC<any> = ({ ...props }) => {
  const [botInteractions, setBotInteractions] = useState([]);
  const [interactionMessage, setInteractionMessages] = useState([]);

  useEffect(() => {
    fetchInteractions()
      .then((res) => {
        if (!res.speech) setBotInteractions(res);
      })
      .catch();

    fetchInteractionMessages()
      .then((res) => {
        if (!res.speech) setInteractionMessages(res);
      })
      .catch();
  }, []);

  const interactionColumns = [
    {
      title: "User Identifier",
      key: "1",
      render: (record) => {
        return record.user.email;
      },
    },
    {
      title: "Time Started",
      dataIndex: "timeStarted",
      key: "2",
      render: (record) => moment(record).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Completed",
      dataIndex: "completed",
      key: "3",
      render: (record) => (record ? "Yes" : "No"),
    },
    {
      title: "Time Completed",
      dataIndex: "timeCompleted",
      key: "4",
      render: (record) =>
        record ? moment(record).format("YYYY-MM-DD HH:mm") : "",
    },
  ];

  const messageColumns = [
    {
      title: "User Identifier",
      key: "1",
      render: (record) => {
        return record.user.email;
      },
    },
    {
      title: "Time Recorded",
      dataIndex: "timeRecorded",
      key: "2",
    },
    {
      title: "User Message",
      key: "3",
      dataIndex: "userMessage",
    },
    {
      title: "Bot Response",
      key: "4",
      dataIndex: "botMessage",
    },
  ];
  return (
    <div>
      <br />
      <Card className="chat-wrapper">
        <Tabs>
          <Tabs.TabPane tab="Interactions" tabKey="1" key="1">
            <Table dataSource={botInteractions} columns={interactionColumns} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Interaction Messages" tabKey="2" key="2">
            <Table dataSource={interactionMessage} columns={messageColumns} />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Dashboard;
