import { EditableField } from "../types";

export interface Device {
  address: string;
  battery: number;
  deviceInformation: Partial<deviceInformation>;
  isAlarming: boolean;
  lastUpdate: number;
  modbus: number;
  name: string;
  online: DeviceOnlineValue;
  parentAddress: string;
  sensors: Sensor[];
  settings: {
    sensors?: Partial<SensorSettingsSensor>;
    system?: Partial<SensorSettingsSystem>;
  };
  signal: number;
  type: DeviceTypeValue;
}

export interface deviceInformation {
  ble_mark: string;
  firmware_build_time: string;
  firmware_version: string;
  gateway: string;
  ip_address: string;
  mac_address: string;
  manufacturer: string;
  model: string;
  name: string;
  product_id: number;
  subnet_mask: string;
}

export interface Sensor {
  fields: SensorField[];
  timestamp: number;
  type: number;
}

export interface SensorField {
  data: number;
  name: string;
  unit: string;
}

export interface SensorSettingsSensor {
  acc1_odr: number;
  acc1_odr_2: number;
  acc1_samples: number;
  acc1_samples_2: number;
  acc3_is_auto: boolean;
  acc3_odr: number;
  acc3_odr_2: number;
  acc3_range: number;
  acc3_range_2: number;
  acc3_samples: number;
  acc3_samples_2: number;
  acquisition_is_enabled: boolean;
  alarm1_actions: number;
  alarm1_level: number;
  alarm1_operator: number;
  alarm1_threshold: number;
  alarm1_type: number;
  alarm2_actions: number;
  alarm2_level: number;
  alarm2_operator: number;
  alarm2_threshold: number;
  alarm2_type: number;
  alarm3_actions: number;
  alarm3_level: number;
  alarm3_operator: number;
  alarm3_threshold: number;
  alarm3_type: number;
  alarm4_actions: number;
  alarm4_level: number;
  alarm4_operator: number;
  alarm4_threshold: number;
  alarm4_type: number;
  alarm_period: number;
  base_frequency: number;
  bolt_direction: number;
  bolt_mode: number;
  clamped_length: number;
  data_axis: number;
  den_is_enabled: boolean;
  disp_mode: number;
  elastic_modulus: number;
  filter_is_disabled: boolean;
  gain_select: number;
  initial_preload: number;
  initial_length: number;
  inspection_flags: number;
  inspection_period: number;
  is_enabled_2: boolean;
  length_rod: number;
  mag_gain: number;
  mag_is_auto: boolean;
  mag_odr: number;
  mag_range: number;
  mag_samples: number;
  object_height: number;
  object_radius: number;
  odr: number;
  preload_coef: number;
  rate_period: number;
  rate_period_2: number;
  sample_offset: number;
  sample_offset_2: number;
  sample_period: number;
  sample_period_2: number;
  samples: number;
  secondary_period: number;
  secondary_period_2: number;
  sectional_area: number;
  sensor_flags: number | number[];
  sensor_flags_2: number;
  scan_mode: number;
  speed_object: number;
  tx_level: number;
  tx_level_2: number;
  vibration_k_x: number;
  vibration_k_y: number;
  vibration_k_z: number;
}

export interface SensorSettingsSystem {
  device_secret: string;
  led_blinking_cnt: number;
  led_blinking_cnt2: number;
  led_blinking_cnt3: number;
  led_run_time: number;
  led_run_time2: number;
  polled_lasting_time: number;
  polled_start_time: number;
  product_key: string;
  system_mode: number;
}

export type Devices = { id: number; address: string }[];

export type DeviceOnlineValue = 0 | 1 | 2 | 3;

export type DeviceOnline = {
  [Key in DeviceOnlineValue]: `${"device.online"}.${
    | "unprovisioned"
    | "off"
    | "lost"
    | "on"}`;
};

type DeviceFieldNames = Extract<
  keyof Device,
  | "address"
  | "battery"
  | "deviceInformation"
  | "isAlarming"
  | "lastUpdate"
  | "modbus"
  | "name"
  | "online"
  | "parentAddress"
  | "sensors"
  | "settings"
  | "signal"
  | "type"
>;
type DeviceFieldLabels =
  | "device.alarm"
  | "device.battery"
  | "device.data"
  | "device.firmware.version"
  | "device.last.update"
  | "device.address"
  | "device.modbus"
  | "device.name"
  | "device.online"
  | "device.parent"
  | "device.signal"
  | "device.type";

export type DeviceField = EditableField<DeviceFieldNames, DeviceFieldLabels>;

export type DeviceTypeValue =
  | 1
  | 257
  | 131073
  | 196609
  | 262145
  | 262401
  | 327938
  | 327940
  | 327943
  | 327945
  | 393217
  | 524290
  | 589825;

export type DeviceType = {
  [Key in
    | "RU"
    | "SA"
    | "SAS"
    | "DC110"
    | "DC210"
    | "SVT110"
    | "SVT210R"
    | "SVT220520"
    | "SVT210510"
    | "ST"
    | "SQ"
    | "SPT"]: { label: string; value: DeviceTypeValue };
};

export type DeviceSensorSettingsField = EditableField<
  | ["settings", "sensors", keyof SensorSettingsSensor]
  | ["settings", "system", keyof SensorSettingsSystem],
  | "sensor.settings.sample.period"
  | "sensor.settings.sample.offset"
  | "sensor.settings.tx.level"
  | "sensor.settings.sensor.flags"
  | "sensor.settings.odr"
  | "sensor.settings.samples"
  | "sensor.settings.speed.object"
  | "sensor.settings.scan.mode"
  | "sensor.settings.initial.preload"
  | "sensor.settings.initial.length"
  | "sensor.settings.preload.coef"
  | "sensor.settings.elastic.modulus"
  | "sensor.settings.sectional.area"
  | "sensor.settings.clamped.length"
  | "sensor.settings.rate.period"
  | "sensor.settings.rate.period2"
  | "sensor.settings.length.rod"
  | "sensor.settings.gain.select"
  | "sensor.settings.acc3.is.auto"
  | "sensor.settings.acc3.range"
  | "sensor.settings.acc3.odr"
  | "sensor.settings.acc3.samples"
  | "sensor.settings.vibration.k.x"
  | "sensor.settings.vibration.k.y"
  | "sensor.settings.vibration.k.z"
  | "sensor.settings.base.frequency"
  | "sensor.settings.disp.mode"
  | "sensor.settings.is.enabled2"
  | "sensor.settings.data.axis"
  | "sensor.settings.tx.level2"
  | "sensor.settings.sample.period2"
  | "sensor.settings.sample.offset2"
  | "sensor.settings.acc3.range2"
  | "sensor.settings.acc3.odr2"
  | "sensor.settings.den.is.enabled"
  | "sensor.settings.acc3.samples2"
  | "sensor.settings.acc3.is.auto.xy"
  | "sensor.settings.acc3.range.xy"
  | "sensor.settings.acc3.odr.xy"
  | "sensor.settings.acc3.samples.xy"
  | "sensor.settings.acc1.odr"
  | "sensor.settings.acc1.samples"
  | "sensor.settings.acc3.range2.xy"
  | "sensor.settings.acc3.odr2.xy"
  | "sensor.settings.acc3.samples2.xy"
  | "sensor.settings.acc1.odr2"
  | "sensor.settings.acc1.samples2"
  | "sensor.settings.object.height"
  | "sensor.settings.object.radius"
>;

export type DeviceCommandKey =
  | "resetData"
  | "calibrate"
  | "compensate"
  | "acquireData"
  | "resetSettings"
  | "restart"
  | "upgradeFirmware"
  | "cancelFirmware";

export type DeviceCommand = {
  [Key in
    | "ACQUIRE_DATA"
    | "CALIBRATE"
    | "COMPENSATE"
    | "RESET"
    | "RESTORE"
    | "REBOOT"
    | "UPGRADE_FIRMWARE"
    | "CANCEL_FIRMWARE"]: {
    label: string;
    value: DeviceCommandKey;
    qs?: string;
    confirm?: boolean;
    confirmText?: string;
  };
};
