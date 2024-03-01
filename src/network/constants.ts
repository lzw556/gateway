import { Mac, Unit } from "../constants";
import { EditableField } from "../types";
import { createIntervalOption, getOptionLabelByValue } from "../util";
import {
  GatewayEditableField,
  GatewayStatus,
  NetworkSettings,
  ProvisionMode,
  ProvisionModeOption,
  WSN,
  WSNEditableField,
} from "./types";

export const PROVISION_MODE: ProvisionMode = {
  GROUP: {
    label: "provision.mode.1",
    value: 1,
  },
  TIME: {
    label: "provision.mode.2",
    value: 2,
  },
  CONTINUOUS: {
    label: "provision.mode.3",
    value: 3,
  },
};

export const PROVISION_MODE_OPTIONS: ProvisionModeOption[] = [
  PROVISION_MODE.GROUP,
  PROVISION_MODE.TIME,
  PROVISION_MODE.CONTINUOUS,
];

export const WSN_DEFAULT_GROUP: Partial<WSN> = {
  provisioning_mode: PROVISION_MODE.GROUP.value,
  call_period: 12000,
  communication_period: createIntervalOption({ unit: "minute", value: 4 })
    .value as number,
  communication_offset: 10000,
  communication_period_2: 0,
  group_size: 1,
  group_size_2: 1,
  group_interval: 120000,
  tempo: 12000,
};

const WSN_DEFAULT_TIME_PARTS = {
  provisioning_mode: PROVISION_MODE.TIME.value,
  call_period: 150000,
  communication_period: createIntervalOption({ unit: "minute", value: 5 })
    .value as number,
  communication_period_2: createIntervalOption({ unit: "minute", value: 0 })
    .value as number,
  communication_offset: 10000,
  group_size: 63,
  group_size_2: 1,
  group_interval: 150000,
  tempo: 15000,
};

export const WSN_DEFAULT_TIME: WSN = {
  ...WSN_DEFAULT_TIME_PARTS,
  interval_cnt: 1,
};

export const WSN_DEFAULT_CONTINUOUS: Partial<WSN> =
  WSN_DEFAULT_TIME_PARTS;

export const PROVISION_MODE_FIELD: WSNEditableField = {
  label: "provisioning.mode",
  name: ["wsn", "provisioning_mode"],
  options: PROVISION_MODE_OPTIONS,
  valueFormat: {
    get: getOptionLabelByValue,
  },
};

export const COMMUNICATION_OFFSET_FIELD: WSNEditableField = {
  label: "communication.offset",
  name: ["wsn", "communication_offset"],
  unit: Unit.INTERVAL.SECOND,
  valueFormat: {
    get: (value) => (value as number) / 1000,
    set: (value) => (value as number) * 1000,
  },
};

export const GROUP_PROVISION_EDITABLE_FIELDS: WSNEditableField[] = [
  {
    label: "communication.period",
    name: ["wsn", "communication_period"],
    options: [
      createIntervalOption({ unit: "minute", value: 4 }),
      createIntervalOption({ unit: "minute", value: 10 }),
      createIntervalOption({ unit: "minute", value: 20 }),
      createIntervalOption({ unit: "minute", value: 30 }),
      createIntervalOption({ unit: "hour", value: 1 }),
      createIntervalOption({ unit: "hour", value: 2 }),
    ],
    valueFormat: {
      get: getOptionLabelByValue,
    },
  },
  COMMUNICATION_OFFSET_FIELD,
  {
    label: "group.size",
    name: ["wsn", "group_size"],
    options: [
      { label: "group.size.1", value: 1 },
      { label: "group.size.2", value: 2 },
      { label: "group.size.4", value: 4 },
      { label: "group.size.8", value: 8 },
    ],
    valueFormat: {
      get: getOptionLabelByValue,
    },
  },
];

export const TIME_PROVISION_EDITABLE_FIELDS: WSNEditableField[] = [
  {
    label: "communication.period",
    name: ["wsn", "communication_period"],
    options: [
      createIntervalOption({ unit: "minute", value: 5 }),
      createIntervalOption({ unit: "minute", value: 10 }),
      createIntervalOption({ unit: "minute", value: 20 }),
      createIntervalOption({ unit: "minute", value: 30 }),
      createIntervalOption({ unit: "hour", value: 1 }),
      createIntervalOption({ unit: "hour", value: 2 }),
    ],
    valueFormat: {
      get: getOptionLabelByValue,
    },
  },
  {
    label: "communication.period.2",
    name: ["wsn", "communication_period_2"],
    options: [
      createIntervalOption({ unit: "minute", value: 0 }),
      createIntervalOption({ unit: "minute", value: 10 }),
      createIntervalOption({ unit: "minute", value: 20 }),
      createIntervalOption({ unit: "minute", value: 30 }),
      createIntervalOption({ unit: "hour", value: 1 }),
      createIntervalOption({ unit: "hour", value: 2 }),
      createIntervalOption({ unit: "hour", value: 3 }),
      createIntervalOption({ unit: "hour", value: 4 }),
      createIntervalOption({ unit: "hour", value: 6 }),
      createIntervalOption({ unit: "hour", value: 8 }),
      createIntervalOption({ unit: "hour", value: 12 }),
    ],
    valueFormat: {
      get: getOptionLabelByValue,
    },
  },
  COMMUNICATION_OFFSET_FIELD,
];

export const WSN_EDITABLE_FIELDS = {
  [PROVISION_MODE.GROUP.value]: GROUP_PROVISION_EDITABLE_FIELDS,
  [PROVISION_MODE.TIME.value]: TIME_PROVISION_EDITABLE_FIELDS,
};

export const GATEWAY_STATUS_FIELDS: EditableField<
  Partial<keyof GatewayStatus>,
  | "device.address"
  | "ip.addr"
  | "mqtt.status"
  | "ntp.status"
  | "product.id"
  | "software.version"
>[] = [
  {
    label: "device.address",
    name: "address",
    valueFormat: {
      get: Mac.get,
    },
  },
  { label: "ip.addr", name: "ip_addr" },
  {
    label: "mqtt.status",
    name: "is_mqtt_connected",
    valueFormat: { get: (value) => (value ? "connected" : "disconnected") },
  },
  {
    label: "ntp.status",
    name: "is_ntp_connected",
    valueFormat: { get: (value) => (value ? "connected" : "disconnected") },
  },
  { label: "product.id", name: "product_id" },
  { label: "software.version", name: "software_version" },
];

export const DEVICE_NAME: GatewayEditableField = {
  label: "device.name",
  name: ["system", "device_name"],
};
export const IP_MODE: GatewayEditableField = {
  label: "ip.mode",
  name: ["ipn", "ip_mode"],
  tag: "switch",
};
export const IP_MODE_STATIC_FIELDS: GatewayEditableField[] = [
  { label: "ip.addr", name: ["ipn", "ip_addr"] },
  { label: "subnet.mask", name: ["ipn", "subnet_mask"] },
  { label: "gateway.addr", name: ["ipn", "gateway_addr"] },
];
export const PRIMARY_DNS: GatewayEditableField = {
  label: "primary.dns",
  name: ["ipn", "primary_dns"],
};
export const NTP_IS_ENABLED: GatewayEditableField = {
  label: "ntp.is.enabled",
  name: ["ipn", "ntp_is_enabled"],
  tag: "switch",
};
export const NTP_ADDR: GatewayEditableField = {
  label: "ntp.addr",
  name: ["ipn", "ntp_addr"],
};
export const MQTT_HIDDENS: GatewayEditableField[] = [
  { hidden: true, label: "mqtt.is.enabled", name: ["ipn", "mqtt_is_enabled"] },
  { hidden: true, label: "cloud.if", name: ["ipn", "cloud_if"] },
];
export const MQTT_FIELDS: GatewayEditableField[] = [
  { label: "mqtt.addr", name: ["ipn", "mqtt_addr"] },
  { label: "mqtt.port", name: ["ipn", "mqtt_port"] },
  { label: "mqtt.name", name: ["ipn", "mqtt_name"] },
  { label: "mqtt.pwd", name: ["ipn", "mqtt_pwd"], password: true },
];
export const MQTT_ALIYUN_FIELDS: GatewayEditableField[] = [
  { label: "mqtt.client.id", name: ["ipn", "mqtt_client_id"] },
  { label: "product.key", name: ["system", "product_key"] },
  { label: "device.secret", name: ["system", "device_secret"] },
];
export const MODBUS_IS_ENABLED: GatewayEditableField = {
  label: "modbus.is.enabled",
  name: ["system", "modbus_is_enabled"],
  tag: "switch",
};
export const MODBUS_FIELDS: GatewayEditableField[] = [
  {
    label: "modbus.mode",
    name: ["system", "modbus_mode"],
    options: [
      { label: "modbus.mode.rtu", value: 1 },
      { label: "modbus.mode.tcp", value: 2 },
    ],
  },
  { label: "modbus.addr", name: ["system", "modbus_addr"] },
];

const IPN_DEFAULT = {
  cloud_if: 0,
  ip_mode: 0,
  ip_addr: "192.168.1.100",
  subnet_mask: "255.255.255.0",
  gateway_addr: "192.168.1.1",
  primary_dns: "114.114.114.114",
  ip_mode_2: 0,
  ip_addr_2: "192.168.1.100",
  subnet_mask_2: "255.255.255.0",
  gateway_addr_2: "192.168.1.1",
  primary_dns_2: "114.114.114.114",
  network_if: 0,
  apn: "",
  apn_name: "",
  apn_pwd: "",
  mqtt_is_enabled: true,
  mqtt_addr: "mqtt.thetasensors.com",
  mqtt_port: 1883,
  mqtt_name: "theta-hd:ts-guest",
  mqtt_pwd: "fi2LmGb4e3Jm25Go",
  mqtt_client_id: "",
  ntp_is_enabled: true,
  ntp_addr: "ntp5.aliyun.com",
  http_port: 80,
  http_username: "admin",
  http_password: "admin",
  mqtt2_is_enabled: false,
  mqtt2_network: 0,
  mqtt2_addr: "mqtt.thetasensors.com",
  mqtt2_port: 1883,
  mqtt2_name: "theta-hd:ts-guest",
  mqtt2_pwd: "fi2LmGb4e3Jm25Go",
};

const SYSTEM_DEFAULT = {
  system_mode: 0,
  modbus_is_enabled: true,
  modbus_mode: 1,
  modbus_addr: 1,
  modbus_rs485_baudrate: 9600,
  simulation_is_enabled: false,
  dbg_timeout: 86400000,
  dbg_communication_period: 1200000,
  dbg_sample_period: 1200000,
  device_name: "THETA_GU100S",
  product_key: "",
  device_secret: "",
  led_run_time: 65535,
  led_run_time2: 65535,
  led_blinking_cnt: 0,
  led_blinking_cnt2: 0,
  led_blinking_cnt3: 0,
};

export const SETTINGS_DEFAULT: NetworkSettings = {
  ipn: IPN_DEFAULT,
  system: SYSTEM_DEFAULT,
  wsn: WSN_DEFAULT_TIME,
};
