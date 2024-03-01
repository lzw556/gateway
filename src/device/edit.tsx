import React from "react";
import { Form, Modal, ModalProps } from "antd";
import { FormItem } from "../components/formItem";
import { Settings } from "./settings";
import { Device } from "./types";
import {
  buildInitialValues,
  buildPostValues,
  getSensorSettingsByType,
  useDeviceFields,
} from "./utils";
import { useAppDataContext } from "../appData";
import { HTTP } from "../util";
import { useNoticationContext } from "../components/notication";
import { Format } from "../locale";

export const DeviceEdit = (
  props: ModalProps & { device: Device } & {
    onSuccess?: () => void;
  }
) => {
  const message = useNoticationContext();
  const { devices, setDevices } = useAppDataContext();
  const [form] = Form.useForm<Device>();
  const type = props.device.type;
  const initialSensorSettings = getSensorSettingsByType(
    type,
    props.device.settings.sensors
  );
  const { fields } = useDeviceFields(devices);

  return (
    <Modal
      {...props}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            const data = buildPostValues(values);
            HTTP.put<Device>(`devices/${data.address}`, data).then((dev) => {
              if (dev && dev.type > 0) {
                setDevices((prev) =>
                  prev.map((d) => {
                    if (d.address === dev.address) {
                      return dev;
                    } else {
                      return d;
                    }
                  })
                );
                message.success(<Format id="device.edit.successfully" />);
                props.onSuccess?.();
              } else {
                message.error(<Format id="device.edit.fail" />);
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
        initialValues={buildInitialValues({
          ...props.device,
          settings: {
            ...props.device.settings,
            sensors: initialSensorSettings,
          },
        })}
      >
        {fields.map((f) => (
          <FormItem key={f.name} {...f} />
        ))}
        {type !== undefined && (
          <Form.Item
            noStyle
            shouldUpdate={(prev, crt) => prev.type !== crt.type}
          >
            {() => <Settings type={type} initial={initialSensorSettings} />}
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};
