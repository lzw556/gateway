import React from "react";
import { Form, Modal, ModalProps } from "antd";
import { FormItem } from "../components/formItem";
import { Settings } from "./settings";
import { Device, DeviceTypeValue } from "./types";
import {
  buildPostValues,
  getSensorSettingsByType,
  useDeviceFields,
} from "./utils";
import { useAppDataContext } from "../appData";
import { HTTP } from "../util";
import { useNoticationContext } from "../components/notication";
import { Format } from "../locale";

export const DeviceAdd = (props: ModalProps & { onSuccess?: () => void }) => {
  const { devices, setDevices } = useAppDataContext();
  const message = useNoticationContext();
  const [form] = Form.useForm<Device>();
  const reset = (type: DeviceTypeValue) => {
    const defaultSettings = getSensorSettingsByType(type);
    if (defaultSettings) {
      form.setFieldsValue({ settings: { sensors: defaultSettings } });
    }
  };
  const { type, fields } = useDeviceFields(devices, true, reset);

  return (
    <Modal
      {...props}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            HTTP.post<Device>(
              "devices?subCommand=1",
              buildPostValues(values)
            ).then((dev) => {
              if (dev && dev.type > 0) {
                setDevices((prev) => [...prev, dev]);
                message.success(<Format id="device.add.successfully" />);
                props.onSuccess?.();
              } else {
                message.error(<Format id="device.add.fail" />);
              }
            });
          })
          .catch((error) => console.log(error));
      }}
      afterClose={() => form.resetFields()}
    >
      <Form
        form={form}
        labelCol={{ span: 8 }}
        style={{ overflow: "auto", maxHeight: 700 }}
      >
        {fields.map((f) => (
          <FormItem key={f.name} {...f} />
        ))}
        {type !== undefined && (
          <Form.Item
            noStyle
            shouldUpdate={(prev, crt) => prev.type !== crt.type}
          >
            {() => <Settings type={type} />}
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};
