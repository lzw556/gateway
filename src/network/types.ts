import { EditableField } from "../types";

export interface GatewayStatus {
  address: string;
  battery_voltage: number;
  broadcast_addr: string;
  gateway: string;
  ip_addr: string;
  ip_mac: string;
  is_debugging_mode: boolean;
  is_mqtt_connected: true;
  is_ntp_connected: true;
  maintaining: boolean;
  product_id: string;
  provisioned: true;
  provisioning: boolean;
  real_voltage: number;
  signal: number;
  software_build_time: string;
  software_version: string;
  subnet_mask: string;
  supporting_4G: boolean;
  supporting_5G: boolean;
  supporting_can: boolean;
  supporting_modbus: true;
  supporting_provisioning_mode_4: boolean;
  supporting_wifi: boolean;
  synced: boolean;
  system_time: number;
}

export interface NetworkSettings {
  ipn: IPN;
  system: System;
  wsn: WSN;
}

export interface IPN {
  apn: string;
  apn_name: string;
  apn_pwd: string;
  cloud_if: number;
  gateway_addr: string;
  gateway_addr_2: string;
  http_password: string;
  http_port: number;
  http_username: string;
  ip_addr: string;
  ip_addr_2: string;
  ip_mode: number;
  ip_mode_2: number;
  mqtt2_addr: string;
  mqtt2_is_enabled: boolean;
  mqtt2_name: string;
  mqtt2_network: number;
  mqtt2_port: number;
  mqtt2_pwd: string;
  mqtt_addr: string;
  mqtt_client_id: string;
  mqtt_is_enabled: boolean;
  mqtt_name: string;
  mqtt_port: number;
  mqtt_pwd: string;
  network_if: number;
  ntp_addr: string;
  ntp_is_enabled: boolean;
  primary_dns: string;
  primary_dns_2: string;
  subnet_mask: string;
  subnet_mask_2: string;
}

export interface System {
  dbg_communication_period: number;
  dbg_sample_period: number;
  dbg_timeout: number;
  device_name: string;
  device_secret: string;
  led_blinking_cnt: number;
  led_blinking_cnt2: number;
  led_blinking_cnt3: number;
  led_run_time: number;
  led_run_time2: number;
  modbus_addr: number;
  modbus_is_enabled: boolean;
  modbus_mode: number;
  modbus_rs485_baudrate: number;
  product_key: string;
  simulation_is_enabled: boolean;
  system_mode: number;
}

export type ProvisionModeValue = 1 | 2 | 3;

export type ProvisionModeOption = { label: string; value: ProvisionModeValue };

type ProvisonModeCategory = "GROUP" | "TIME" | "CONTINUOUS";

export type ProvisionMode = {
  [Key in ProvisonModeCategory]: ProvisionModeOption;
};

export interface WSN {
  call_period: number;
  communication_offset: number;
  communication_period: number;
  communication_period_2: number;
  group_interval: number;
  group_size: number;
  group_size_2: number;
  interval_cnt: number;
  provisioning_mode: ProvisionModeValue;
  tempo: number;
}

type WSNEditableFieldNames = [
  "wsn",
  Extract<
    keyof WSN,
    | "communication_offset"
    | "communication_period"
    | "communication_period_2"
    | "group_size"
    | "provisioning_mode"
  >
];
type WSNEditableFieldLabels =
  | "communication.offset"
  | "communication.period"
  | "communication.period.2"
  | "group.size"
  | "provisioning.mode";

export type WSNEditableField = EditableField<
  WSNEditableFieldNames,
  WSNEditableFieldLabels
>;

export type GatewayEditableField = EditableField<
  ["ipn", keyof IPN] | ["system", keyof System],
  | "device.name"
  | "ip.mode"
  | "ip.addr"
  | "subnet.mask"
  | "gateway.addr"
  | "primary.dns"
  | "cloud.if"
  | "ntp.is.enabled"
  | "ntp.addr"
  | "mqtt.is.enabled"
  | "mqtt.addr"
  | "mqtt.port"
  | "mqtt.name"
  | "mqtt.pwd"
  | "mqtt.client.id"
  | "product.key"
  | "device.secret"
  | "modbus.is.enabled"
  | "modbus.mode"
  | "modbus.addr"
>;
