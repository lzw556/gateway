import {
  DeviceCommand,
  DeviceField,
  DeviceOnline,
  DeviceOnlineValue,
  DeviceSensorSettingsField,
  DeviceType,
} from "./types";
import { Mac, Unit } from "../constants";
import { createIntervalOption, formatDate } from "../util";

export const TX_LEVEL_OPTIONS = [
  { label: "sensor.settings.tx.level.enabled", value: 0 },
  { label: "sensor.settings.tx.level.enabled.level1", value: 1 },
  { label: "sensor.settings.tx.level.enabled.level2", value: 2 },
  { label: "sensor.settings.tx.level.enabled.level3", value: 3 },
  { label: "sensor.settings.tx.level.disabled", value: 255 },
];

export const COMMON_SETTINGS_FIDLES: DeviceSensorSettingsField[] = [
  {
    label: "sensor.settings.sample.period",
    name: ["settings", "sensors", "sample_period"],
    options: [
      createIntervalOption({ unit: "minute", value: 1 }),
      createIntervalOption({ unit: "minute", value: 2 }),
      createIntervalOption({ unit: "minute", value: 2.5 }),
      createIntervalOption({ unit: "minute", value: 5 }),
      createIntervalOption({ unit: "minute", value: 10 }),
      createIntervalOption({ unit: "minute", value: 15 }),
      createIntervalOption({ unit: "minute", value: 20 }),
      createIntervalOption({ unit: "minute", value: 30 }),
      createIntervalOption({ unit: "hour", value: 1 }),
      createIntervalOption({ unit: "hour", value: 2 }),
      createIntervalOption({ unit: "hour", value: 3 }),
      createIntervalOption({ unit: "hour", value: 4 }),
      createIntervalOption({ unit: "hour", value: 6 }),
      createIntervalOption({ unit: "hour", value: 8 }),
      createIntervalOption({ unit: "hour", value: 12 }),
      createIntervalOption({ unit: "day", value: 1 }),
    ],
    value: createIntervalOption({ unit: "hour", value: 1 }).value as number,
  },
  {
    label: "sensor.settings.sample.offset",
    name: ["settings", "sensors", "sample_offset"],
    options: [
      createIntervalOption({ unit: "second", value: 0 }),
      createIntervalOption({ unit: "second", value: 10 }),
      createIntervalOption({ unit: "second", value: 30 }),
      createIntervalOption({ unit: "minute", value: 1 }),
      createIntervalOption({ unit: "minute", value: 2 }),
      createIntervalOption({ unit: "minute", value: 5 }),
      createIntervalOption({ unit: "minute", value: 10 }),
      createIntervalOption({ unit: "minute", value: 20 }),
      createIntervalOption({ unit: "minute", value: 30 }),
    ],
    value: createIntervalOption({ unit: "second", value: 0 }).value as number,
  },
  {
    label: "sensor.settings.tx.level",
    name: ["settings", "sensors", "tx_level"],
    options: TX_LEVEL_OPTIONS,
    value: 0,
  },
];

export const SPEED_OBJECT: DeviceSensorSettingsField = {
  label: "sensor.settings.speed.object",
  name: ["settings", "sensors", "speed_object"],
  unit: Unit.SPEED_OBJECT,
};

export const ACC3_ODR2: DeviceSensorSettingsField = {
  label: "sensor.settings.acc3.odr2",
  name: ["settings", "sensors", "acc3_odr_2"],
};

export const ACC3_SAMPLES2: DeviceSensorSettingsField = {
  label: "sensor.settings.acc3.samples2",
  name: ["settings", "sensors", "acc3_samples_2"],
  unit: Unit.INTERVAL.SECOND,
};

export const DEVICE_ONLINE: DeviceOnline = {
  0: "device.online.unprovisioned",
  1: "device.online.off",
  2: "device.online.lost",
  3: "device.online.on",
};

export const DEVICE_FIELD_NAME: DeviceField = {
  label: "device.name",
  name: "name",
  rules: [{ required: true, message: "please.enter.device.name" }],
};
export const DEVICE_FIELD_MAC: DeviceField = {
  label: "device.address",
  name: "address",
  rules: [{ required: true, message: "please.enter.mac.address" }],
  valueFormat: Mac,
};
export const DEVICE_FIELD_PARENT: DeviceField = {
  label: "device.parent",
  name: "parentAddress",
  rules: [{ required: true, message: "please.select.a.parent.address" }],
};
export const DEVICE_FIELD_MODBUS: DeviceField = {
  label: "device.modbus",
  name: "modbus",
  value: 0,
};

export const DEVICE_READONLY_TABLE_FIELDS: DeviceField[] = [
  DEVICE_FIELD_NAME,
  {
    label: "device.online",
    name: "online",
    valueFormat: { get: (value: DeviceOnlineValue) => DEVICE_ONLINE[value] },
  },
  { label: "device.alarm", name: "isAlarming", valueFormat: { get: () => "" } },
  { label: "device.data", name: "sensors", valueFormat: { get: () => "" } },
  {
    label: "device.battery",
    name: "battery",
    unit: Unit.BATTERY,
  },
  {
    label: "device.signal",
    name: "signal",
    unit: Unit.SIGNAL,
  },
  {
    label: "device.last.update",
    name: "lastUpdate",
    valueFormat: { get: (value) => formatDate(value, "hh:mm:ss") },
  },
];

export const DEVICE_EDITABLE_TABLE_FIELDS: DeviceField[] = [
  DEVICE_FIELD_MAC,
  DEVICE_FIELD_NAME,
  DEVICE_FIELD_PARENT,
  DEVICE_FIELD_MODBUS,
  {
    label: "device.firmware.version",
    name: "deviceInformation",
    valueFormat: { get: (value) => value?.firmware_version },
  },
];

export const DEVICE_TYPE: DeviceType = {
  RU: { label: "device.type.ru", value: 257 },
  SA: { label: "device.type.sa", value: 131073 },
  SAS: { label: "device.type.sas", value: 196609 },
  DC110: { label: "device.type.dc110", value: 262145 },
  DC210: { label: "device.type.dc210", value: 262401 },
  SVT110: { label: "device.type.svt110", value: 327945 },
  SVT210R: { label: "device.type.svt210r", value: 327938 },
  SVT220520: { label: "device.type.svt220520", value: 327940 },
  SVT210510: { label: "device.type.svt210510", value: 327943 },
  ST: { label: "device.type.st", value: 393217 },
  SQ: { label: "device.type.sq", value: 589825 },
  SPT: { label: "device.type.spt", value: 524290 },
};

export const DEVICE_TYPE_OPTIONS = [
  DEVICE_TYPE.RU,
  DEVICE_TYPE.SA,
  DEVICE_TYPE.SAS,
  DEVICE_TYPE.DC110,
  DEVICE_TYPE.DC210,
  DEVICE_TYPE.SVT110,
  DEVICE_TYPE.SVT210R,
  DEVICE_TYPE.SVT220520,
  DEVICE_TYPE.SVT210510,
  DEVICE_TYPE.ST,
  DEVICE_TYPE.SQ,
  DEVICE_TYPE.SPT,
];

export const DEVICE_FIELD_TYPE: DeviceField = {
  label: "device.type",
  name: "type",
  options: DEVICE_TYPE_OPTIONS,
  rules: [{ required: true, message: "please.select.an.device.type" }],
};

export const DEVICE_COMMAND: DeviceCommand = {
  ACQUIRE_DATA: {
    label: "device.command.acquire.data",
    value: "acquireData",
    qs: "?subComand=2",
  },
  CALIBRATE: { label: "device.command.calibrate", value: "calibrate" },
  COMPENSATE: { label: "device.command.compensate", value: "compensate" },
  RESET: { confirm: true, label: "device.command.reset", value: "resetData" },
  RESTORE: {
    confirm: true,
    confirmText: "are.you.sure.you.want.to.restore",
    label: "device.command.restore",
    value: "resetSettings",
  },
  REBOOT: { confirm: true, label: "device.command.reboot", value: "restart" },
  UPGRADE_FIRMWARE: {
    label: "device.command.upgrade.firmware",
    value: "upgradeFirmware",
  },
  CANCEL_FIRMWARE: {
    label: "device.command.cancel.upgrade.firmware",
    value: "cancelFirmware",
  },
};

export const GU_COMMANDS = [
  DEVICE_COMMAND.RESTORE,
  DEVICE_COMMAND.REBOOT,
  DEVICE_COMMAND.UPGRADE_FIRMWARE,
];

export const RU_COMMANDS = [
  DEVICE_COMMAND.RESET,
  DEVICE_COMMAND.RESTORE,
  DEVICE_COMMAND.REBOOT,
  DEVICE_COMMAND.UPGRADE_FIRMWARE,
];

export const SA_COMMANDS = [
  DEVICE_COMMAND.RESET,
  DEVICE_COMMAND.ACQUIRE_DATA,
  DEVICE_COMMAND.RESTORE,
  DEVICE_COMMAND.REBOOT,
  DEVICE_COMMAND.UPGRADE_FIRMWARE,
];

export const ST_COMMANDS = SA_COMMANDS;

export const SPT_COMMANDS = [
  DEVICE_COMMAND.RESET,
  DEVICE_COMMAND.CALIBRATE,
  DEVICE_COMMAND.ACQUIRE_DATA,
  DEVICE_COMMAND.RESTORE,
  DEVICE_COMMAND.REBOOT,
  DEVICE_COMMAND.UPGRADE_FIRMWARE,
];
