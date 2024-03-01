import React from "react";
import { Col, Button, Card, Form, Row, Select } from "antd";
import {
  DEVICE_NAME,
  IP_MODE,
  IP_MODE_STATIC_FIELDS,
  MODBUS_FIELDS,
  MODBUS_IS_ENABLED,
  MQTT_ALIYUN_FIELDS,
  MQTT_FIELDS,
  MQTT_HIDDENS,
  NTP_ADDR,
  NTP_IS_ENABLED,
  PRIMARY_DNS,
  SETTINGS_DEFAULT,
} from "./constants";
import { GatewayEditableField, NetworkSettings } from "./types";
import { FormItem } from "../components/formItem";
import { Format } from "../locale";
import { HTTP } from "../util";
import { useAppDataContext } from "../appData";

export const Settings = (props: NetworkSettings) => {
  const [form] = Form.useForm<NetworkSettings>();
  const ipMode = useIpModeFields(props);
  const ntps = useNTPFields(props);
  let ipnMode = 1;
  if (props.ipn.mqtt_is_enabled) {
    if (props.ipn.cloud_if === 2) {
      ipnMode = 2;
    }
  } else {
    ipnMode = 0;
  }
  const [IPNMode, setIPNMode] = React.useState(ipnMode);
  const mqtts = useMQTTFields(IPNMode);
  const modbuses = useMODBUSFields(props);
  const { setSettings } = useAppDataContext();
  return (
    <Card
      className="section"
      bordered={false}
      headStyle={{ border: 0 }}
      size="small"
      title={<Format id="settings" />}
      extra={
        <Button
          type="text"
          onClick={() => {
            form.validateFields().then((values) => {
              HTTP.put<NetworkSettings>("settings/", values).then(setSettings);
            });
          }}
        >
          <Format id="save" />
        </Button>
      }
    >
      <Form
        form={form}
        labelCol={{ xs: 12, sm: 8, md: 8, lg: 9 }}
        initialValues={{
          ipn: {
            ...SETTINGS_DEFAULT.ipn,
            ...props.ipn,
            ip_mode: props?.ipn?.ip_mode === 0,
          },
          system: {
            ...SETTINGS_DEFAULT.system,
            ...props.system,
          },
        }}
      >
        <Row>
          <FormItemCol>
            <FormItem {...DEVICE_NAME} />
          </FormItemCol>
        </Row>
        <Row>
          <FormItemCol>
            <FormItem {...ipMode.switch} />
          </FormItemCol>
        </Row>
        <Row>
          {ipMode.fields.map((f) => (
            <FormItemCol key={f.label}>
              <FormItem {...f} />
            </FormItemCol>
          ))}
        </Row>
        <Row>
          <FormItemCol>
            <FormItem {...PRIMARY_DNS} />
          </FormItemCol>
        </Row>
        <Row>
          {ntps.map((f) => (
            <FormItemCol key={f.label}>
              <FormItem {...f} />
            </FormItemCol>
          ))}
        </Row>
        <Row>
          <Col {...{ xs: 24, sm: 24, md: 12, lg: 12 }}>
            <Form.Item label={<Format id="mqtt.interface" />}>
              <Select
                defaultValue={1}
                options={[
                  { label: <Format id="ipn.mode.none" />, value: 0 },
                  { label: <Format id="ipn.mode.mqtt" />, value: 1 },
                  { label: <Format id="ipn.mode.aiot.cloud" />, value: 2 },
                ]}
                onChange={(mode) => {
                  setIPNMode(mode);
                  if (mode === 0) {
                    form.setFieldsValue({
                      ipn: { cloud_if: 0, mqtt_is_enabled: false },
                    });
                  } else if (mode === 1) {
                    form.setFieldsValue({
                      ipn: { cloud_if: 0, mqtt_is_enabled: true },
                    });
                  } else if (mode === 2) {
                    form.setFieldsValue({
                      ipn: { cloud_if: 2, mqtt_is_enabled: true },
                    });
                  }
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          {mqtts.map((f) => (
            <FormItemCol key={f.label}>
              <FormItem {...f} />
            </FormItemCol>
          ))}
        </Row>
        <Row>
          <FormItemCol>
            <FormItem {...modbuses.switch} />
          </FormItemCol>
        </Row>
        <Row>
          {modbuses.fields.map((f) => (
            <FormItemCol key={f.label}>
              <FormItem {...f} />
            </FormItemCol>
          ))}
        </Row>
      </Form>
    </Card>
  );
};

const FormItemCol = ({ children }: { children: React.ReactNode }) => {
  return <Col {...{ xs: 24, sm: 24, md: 12, lg: 12 }}>{children}</Col>;
};

function useIpModeFields(settings: NetworkSettings) {
  const [DHCPEnabled, setDHCPEnabled] = React.useState(
    settings.ipn.ip_mode === 0
  );
  const ipMode = {
    ...IP_MODE,
    onChange: setDHCPEnabled,
  } as GatewayEditableField;
  return { switch: ipMode, fields: DHCPEnabled ? [] : IP_MODE_STATIC_FIELDS };
}

function useNTPFields(settings: NetworkSettings) {
  const [NTPEnabled, setNTPEnabled] = React.useState(
    settings.ipn.ntp_is_enabled
  );
  const ntp = {
    ...NTP_IS_ENABLED,
    onChange: setNTPEnabled,
  } as GatewayEditableField;
  return NTPEnabled ? [ntp, NTP_ADDR] : [ntp];
}

function useMQTTFields(ipnMode: number) {
  return ipnMode === 0
    ? MQTT_HIDDENS
    : ipnMode === 1
    ? [...MQTT_HIDDENS, ...MQTT_FIELDS]
    : [...MQTT_HIDDENS, ...MQTT_FIELDS, ...MQTT_ALIYUN_FIELDS];
}

function useMODBUSFields(settings: NetworkSettings) {
  const [MODBUSEnabled, setMODBUSEnabled] = React.useState(
    settings.system.modbus_is_enabled
  );
  const modbus = {
    ...MODBUS_IS_ENABLED,
    onChange: setMODBUSEnabled,
  } as GatewayEditableField;
  return { switch: modbus, fields: MODBUSEnabled ? MODBUS_FIELDS : [] };
}
