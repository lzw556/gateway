import React from "react";
import { Card, Space, Statistic } from "antd";
import { GATEWAY_STATUS_FIELDS } from "./constants";
import { Format } from "../locale";
import { GatewayStatus } from "./types";

export const StatusBar = ({
  name,
  status,
}: {
  name: string;
  status: GatewayStatus;
}) => {
  return (
    <Card
      className="section"
      bordered={false}
      headStyle={{ border: 0 }}
      size="small"
      title={name}
    >
      <Space size={60} wrap={true}>
        {GATEWAY_STATUS_FIELDS.map((f) => (
          <Statistic
            key={f.name}
            title={<Format id={f.label} />}
            value={status[f.name] as string | number}
            formatter={(value) => {
              if (f.valueFormat && f.valueFormat.get) {
                return (
                  <span className="ant-statistic-content-value">
                    <Format id={`${f.valueFormat.get(value)}`} />
                  </span>
                );
              } else {
                return value;
              }
            }}
          />
        ))}
      </Space>
    </Card>
  );
};
