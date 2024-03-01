import { DEVICE_COMMAND, SPEED_OBJECT } from "../constants";
import { DeviceSensorSettingsField, SensorSettingsSensor } from "../types";
import { Unit } from "../../constants";
import { createIntervalOption, valueToArray } from "../../util";

export const SENSOR_FLAGS: DeviceSensorSettingsField = {
  label: "sensor.settings.sensor.flags",
  name: ["settings", "sensors", "sensor_flags"],
  options: [
    { label: "sensor.settings.sensor.flags.static", value: 1 },
    { label: "sensor.settings.sensor.flags.dynamic", value: 2 },
    { label: "sensor.settings.sensor.flags.coordinate", value: 4 },
    { label: "sensor.settings.sensor.flags.waveform", value: 8 },
  ],
  tag: "checkbox",
  valueFormat: {
    get: (value: number) => valueToArray([1, 2, 4, 8], value),
    set: (values: number[]) => values.reduce((prev, crt) => prev | crt),
  },
};

const SCAN_MODE: DeviceSensorSettingsField = {
  label: "sensor.settings.scan.mode",
  name: ["settings", "sensors", "scan_mode"],
  options: [
    { label: "sensor.settings.scan.mode.small.bolt", value: 0 },
    { label: "sensor.settings.scan.mode.big.bolt", value: 3 },
  ],
};

const INITIAL_PRELOAD: DeviceSensorSettingsField = {
  label: "sensor.settings.initial.preload",
  name: ["settings", "sensors", "initial_preload"],
  unit: Unit.PRELOAD,
};

const INITIAL_LENGTH: DeviceSensorSettingsField = {
  label: "sensor.settings.initial.length",
  name: ["settings", "sensors", "initial_length"],
  unit: Unit.LENGTH,
};

const PRELOAD_COEF: DeviceSensorSettingsField = {
  label: "sensor.settings.preload.coef",
  name: ["settings", "sensors", "preload_coef"],
};

const ELASTIC_MODULUS: DeviceSensorSettingsField = {
  label: "sensor.settings.elastic.modulus",
  name: ["settings", "sensors", "elastic_modulus"],
  unit: Unit.modulus,
};

const SECTIONAL_AREA: DeviceSensorSettingsField = {
  label: "sensor.settings.sectional.area",
  name: ["settings", "sensors", "sectional_area"],
  unit: Unit.AREA,
};

const CLAMPED_LENGTH: DeviceSensorSettingsField = {
  label: "sensor.settings.clamped.length",
  name: ["settings", "sensors", "clamped_length"],
  unit: Unit.LENGTH,
};

export const STATIC_SETTINGS_FIDLES: DeviceSensorSettingsField[] = [
  SPEED_OBJECT,
  SCAN_MODE,
  INITIAL_PRELOAD,
  INITIAL_LENGTH,
  PRELOAD_COEF,
  ELASTIC_MODULUS,
  SECTIONAL_AREA,
  CLAMPED_LENGTH,
];

export const DYNAMIC_SETTINGS_FIELDS: DeviceSensorSettingsField[] = [
  {
    label: "sensor.settings.odr",
    name: ["settings", "sensors", "odr"],
    options: [
      { label: "odr.10Hz", value: 0 },
      { label: "odr.20Hz", value: 1 },
      { label: "odr.40Hz", value: 2 },
      { label: "odr.80Hz", value: 3 },
    ],
  },
  {
    label: "sensor.settings.samples",
    name: ["settings", "sensors", "samples"],
    options: [
      createIntervalOption({ unit: "second", value: 1 }),
      createIntervalOption({ unit: "second", value: 2 }),
      createIntervalOption({ unit: "second", value: 4 }),
      createIntervalOption({ unit: "second", value: 8 }),
      createIntervalOption({ unit: "second", value: 16 }),
    ],
  },
  SPEED_OBJECT,
  SCAN_MODE,
  INITIAL_PRELOAD,
  INITIAL_LENGTH,
  PRELOAD_COEF,
  ELASTIC_MODULUS,
  SECTIONAL_AREA,
  CLAMPED_LENGTH,
];

export const DEFAULT_SETTINGS: Partial<SensorSettingsSensor> = {
  sensor_flags: [1],
  speed_object: 5920,
  scan_mode: 0,
  odr: 1,
  samples: createIntervalOption({ unit: "second", value: 16 }).value as number,
  initial_preload: 0,
  initial_length: 0,
  preload_coef: 1,
  elastic_modulus: 210,
  sectional_area: 1305.462,
  clamped_length: 215,
};

export const COMMANDS = [
  DEVICE_COMMAND.RESET,
  DEVICE_COMMAND.CALIBRATE,
  DEVICE_COMMAND.ACQUIRE_DATA,
  DEVICE_COMMAND.RESTORE,
  DEVICE_COMMAND.REBOOT,
  DEVICE_COMMAND.UPGRADE_FIRMWARE,
];

export * from "./settings";
