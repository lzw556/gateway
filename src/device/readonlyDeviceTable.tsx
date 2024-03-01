import React from "react";
import { Table } from "antd";
import { Device } from "./types";
import { DEVICE_READONLY_TABLE_FIELDS } from "./constants";
import { Format } from "../locale";

export const ReadonlyDeviceTable = ({
  devices,
  style,
}: {
  devices: Device[];
  style?: React.CSSProperties;
}) => {
  return (
    <Table
      columns={DEVICE_READONLY_TABLE_FIELDS.map(
        ({ label, name, unit, valueFormat }) => ({
          dataIndex: name,
          key: name,
          title: <Format id={label} />,
          render: (value: any) => {
            if (valueFormat?.get) {
              return <Format id={valueFormat?.get(value) as string} />;
            } else if (unit) {
              return (
                <>
                  {value}
                  <Format id={unit} />
                </>
              );
            } else {
              return value;
            }
          },
        })
      )}
      dataSource={devices}
      pagination={false}
      rowKey={(row) => row.address}
      size="small"
      style={style}
    />
  );
};
