import React from "react";
import { Card, Form, Modal, ModalProps, Space, Statistic } from "antd";
import {
  COMMUNICATION_OFFSET_FIELD,
  PROVISION_MODE,
  PROVISION_MODE_FIELD,
  WSN_DEFAULT_CONTINUOUS,
  WSN_DEFAULT_GROUP,
  WSN_DEFAULT_TIME,
  WSN_EDITABLE_FIELDS,
} from "./constants";
import {
  NetworkSettings,
  ProvisionModeValue,
  WSN,
  WSNEditableField,
} from "./types";
import { FormItem } from "../components/formItem";
import { Format } from "../locale";
import { HTTP } from "../util";
import { useAppDataContext } from "../appData";
import { useNoticationContext } from "../components/notication";

export const WSNDetail = (settings: NetworkSettings) => {
  const { wsn } = settings;
  const [open, setOpen] = React.useState(false);
  const fields =
    wsn.provisioning_mode > 0
      ? [
          PROVISION_MODE_FIELD,
          ...(WSN_EDITABLE_FIELDS[wsn.provisioning_mode] ?? []),
        ].map((f) => {
          let value = wsn[f.name[1]] as number | string;
          if (f.valueFormat && f.valueFormat.get) {
            value = f.valueFormat.get(value, f.options);
          }
          return { ...f, value };
        })
      : [];

  return (
    <Card
      className="section"
      bordered={false}
      headStyle={{ border: 0 }}
      size="small"
    >
      <Space size={60} wrap={true}>
        {fields.map(({ label, unit, value }) => (
          <Statistic
            key={value}
            title={<Format id={label} />}
            value={value}
            formatter={(value) => {
              if (unit) {
                return (
                  <>
                    {value}
                    <Format id={`${unit}`} />
                  </>
                );
              } else {
                return <Format id={`${value}`} />;
              }
            }}
          />
        ))}
        <a href="#;" onClick={() => setOpen(true)}>
          {fields.length > 0 ? (
            <span className="iconfont icon-edit"></span>
          ) : (
            <Format id="configure.network.settings" />
          )}
        </a>
        {open && (
          <WSNSetting
            open={open}
            onCancel={() => setOpen(false)}
            onSuccess={() => setOpen(false)}
            title={<Format id="network" />}
            wsn={buildInitialValues(settings.wsn)}
          />
        )}
      </Space>
    </Card>
  );
};

const WSNSetting = (
  props: ModalProps & { wsn: Partial<WSN> } & { onSuccess?: () => void }
) => {
  const message = useNoticationContext();
  const { setSettings } = useAppDataContext();
  const [form] = Form.useForm<NetworkSettings>();
  const { wsn, ...rest } = props;
  const { setMode, fields } = useWSNFields(wsn);

  return (
    <Modal
      {...rest}
      okText={<Format id="operation.update" />}
      onOk={() =>
        form.validateFields().then((values) => {
          HTTP.put<NetworkSettings>("settings", {
            ipn: { mqtt_polling_interval: 0 },
          }).then((res) => {
            if (res.wsn.provisioning_mode) {
              HTTP.put<NetworkSettings>("wsnSettings/", {
                ...values,
                wsn: buildPostValues(values.wsn),
              }).then((res) => {
                if (res.wsn.provisioning_mode > 0) {
                  setSettings((prev) => ({ ...prev!, wsn: res.wsn }));
                  message.success(<Format id="network.edit.successfully" />);
                  props.onSuccess?.();
                } else {
                  message.success(<Format id="network.edit.fail" />);
                }
              });
            } else {
            }
          });
        })
      }
    >
      <Form form={form} labelCol={{ span: 8 }} initialValues={{ wsn }}>
        {fields &&
          fields
            .map((f) => {
              if (f.name.includes("provisioning_mode")) {
                return {
                  ...f,
                  onChange: (mode: ProvisionModeValue) => {
                    setMode(mode);
                    if (mode === PROVISION_MODE.GROUP.value) {
                      form.setFieldsValue({
                        wsn: buildInitialValues(WSN_DEFAULT_GROUP),
                      });
                    } else if (mode === PROVISION_MODE.TIME.value) {
                      form.setFieldsValue({
                        wsn: buildInitialValues(WSN_DEFAULT_TIME),
                      });
                    }
                  },
                };
              } else {
                return f;
              }
            })
            .map((f) => <FormItem key={f.label} {...f} />)}
      </Form>
    </Modal>
  );
};

function useWSNFields(wsn: Partial<WSN>) {
  const [mode, setMode] = React.useState<ProvisionModeValue>(
    wsn.provisioning_mode!
  );
  const fields: WSNEditableField[] = [
    PROVISION_MODE_FIELD,
    ...(WSN_EDITABLE_FIELDS[mode] ?? []),
  ];
  return { setMode, fields };
}

function buildPostValues(values: WSN) {
  return {
    ...values,
    communication_offset: COMMUNICATION_OFFSET_FIELD.valueFormat?.set?.(
      values.communication_offset
    ) as number,
  };
}

function buildInitialValues(values: Partial<WSN>) {
  const defaultSettings =
    values.provisioning_mode === PROVISION_MODE.GROUP.value
      ? WSN_DEFAULT_GROUP
      : values.provisioning_mode === PROVISION_MODE.TIME.value
      ? WSN_DEFAULT_TIME
      : WSN_DEFAULT_CONTINUOUS;
  return {
    ...defaultSettings,
    ...values,
    communication_offset: COMMUNICATION_OFFSET_FIELD.valueFormat?.get?.(
      values.communication_offset
    ) as number,
  };
}
