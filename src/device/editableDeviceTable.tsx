import React from "react";
import { Button, Space, Table, Tooltip, Upload } from "antd";
import { DeviceAdd } from "./add";
import { DEVICE_EDITABLE_TABLE_FIELDS } from "./constants";
import { Device } from "./types";
import { CommandBar } from "./commandBar";
import { Format } from "../locale";
import { HTTP, download } from "../util";
import { useAppDataContext } from "../appData";
import { DeviceEdit } from "./edit";
import { PopConfirm } from "../components/popConfirm";
import { useNoticationContext } from "../components/notication";

export const EditableDeviceTable = ({
  gateway,
  devices,
  style,
}: {
  gateway: Device;
  devices: Device[];
  style?: React.CSSProperties;
}) => {
  const message = useNoticationContext();
  const { settings: networkSettings, setDevices } = useAppDataContext();
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [editDevice, setEditDevice] = React.useState<{
    open: boolean;
    device: Device | undefined;
  }>({ open: false, device: undefined });
  const handleDelete = (address: string) => {
    HTTP.delete(`devices/${address}`).then((res: boolean) => {
      if (res) {
        message.success(<Format id="device.delete.successfully" />);
        setDevices((prev) => prev.filter((d) => d.address !== address));
      } else {
        message.success(<Format id="device.delete.fail" />);
      }
    });
  };
  return (
    <Table
      columns={[
        ...DEVICE_EDITABLE_TABLE_FIELDS,
        {
          name: "operation",
          label: "operation",
          valueFormat: {
            get: (_: any, row: Device) => (
              <Space>
                <Tooltip title={<Format id="operation.update" />}>
                  <a
                    href="#;"
                    onClick={() =>
                      setEditDevice((prev) => ({
                        ...prev,
                        open: true,
                        device: row,
                      }))
                    }
                  >
                    <span className="iconfont icon-edit"></span>
                  </a>
                </Tooltip>
                <Tooltip title={<Format id="operation.delete" />}>
                  <PopConfirm
                    description={
                      <Format id="are.you.sure.you.want.to.delete" />
                    }
                    title={<Format id="device.delete" />}
                    skip={false}
                    confirmHandler={() => handleDelete(row.address)}
                  >
                    <a href="#;">
                      <span className="iconfont icon-delete"></span>
                    </a>
                  </PopConfirm>
                </Tooltip>
                <Tooltip title={<Format id="operation.alert" />}>
                  <a href="#;">
                    <span className="iconfont icon-alert"></span>
                  </a>
                </Tooltip>
                <CommandBar {...row} />
              </Space>
            ),
          },
        },
      ].map(({ label, name, valueFormat }) => ({
        dataIndex: name,
        key: name,
        title: <Format id={label} />,
        render:
          name === "parentAddress"
            ? (_: any, row: Device) =>
                [gateway, ...devices].find(
                  (d) => d.address === row.parentAddress
                )?.name
            : valueFormat?.get,
      }))}
      dataSource={devices}
      pagination={false}
      rowKey={(row) => row.address}
      size="small"
      style={style}
      title={() => (
        <Space>
          <Button
            size="small"
            type="primary"
            onClick={() => setOpenAddModal(true)}
          >
            <Format id="device.add" />
          </Button>
          <Button size="small" onClick={() => HTTP.put("/provision")}>
            <Format id="provision" />
          </Button>
          {/* <Upload
            accept=".json"
            customRequest={(ops) => {
              const formData = new FormData();
              formData.append("file", ops.file);

            }}
          >
            <Button size="small">
              <Format id="import" />
            </Button>
          </Upload> */}
          <Button
            size="small"
            onClick={() => {
              const settings = {
                deviceList: devices.map(
                  (
                    { name, address, parentAddress, modbus, type, settings },
                    index
                  ) => ({
                    id: index,
                    name,
                    address,
                    parentAddress,
                    modbus,
                    type,
                    settings,
                  })
                ),
                wsn: networkSettings?.wsn,
              };
              download(
                new Blob([JSON.stringify(settings)], {
                  type: "application/json",
                }),
                "settings.json"
              );
            }}
          >
            <Format id="export" />
          </Button>
          <Button size="small">
            <Format id="batch" />
          </Button>
          <DeviceAdd
            open={openAddModal}
            onCancel={() => setOpenAddModal(false)}
            onSuccess={() => setOpenAddModal(false)}
            title={<Format id="device.add" />}
          />
          {editDevice.device && (
            <DeviceEdit
              device={editDevice.device}
              open={editDevice.open}
              onCancel={() =>
                setEditDevice((prev) => ({
                  ...prev,
                  open: false,
                  device: undefined,
                }))
              }
              onSuccess={() =>
                setEditDevice((prev) => ({
                  ...prev,
                  open: false,
                  device: undefined,
                }))
              }
              title={<Format id="device.edit" />}
            />
          )}
        </Space>
      )}
    />
  );
};
