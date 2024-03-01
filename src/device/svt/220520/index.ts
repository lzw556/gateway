import {
  ACC3_IS_AUTO,
  ACC3_ODR,
  ACC3_RANGE,
  ACC3_RANGE2,
  ACC3_SAMPLES,
  BASE_FREQUENCY,
  DATA_AXIS,
  DISP_MODE,
  SAMPLE_OFFSET2,
  SAMPLE_PERIOD2,
  TX_LEVEL2,
  VIBRATION_K_X,
  VIBRATION_K_Y,
  VIBRATION_K_Z,
} from "../common";
import { ACC3_ODR2, ACC3_SAMPLES2, DEVICE_COMMAND } from "../../constants";
import { DeviceSensorSettingsField, SensorSettingsSensor } from "../../types";
import { createIntervalOption } from "../../../util";
import { Unit } from "../../../constants";

const RANGE_OPTIONS = [
  { label: "range.2g", value: 0 },
  { label: "range.4g", value: 1 },
  { label: "range.8g", value: 2 },
  { label: "range.16g", value: 3 },
];

const ODR_OPTIONS = [
  { label: "odr.0.417KHz", value: 5 },
  { label: "odr.0.833KHz", value: 6 },
  { label: "odr.1.667KHz", value: 7 },
  { label: "odr.3.333KHz", value: 12 },
  { label: "odr.6.667KHz", value: 13 },
  { label: "odr.13.333KHz", value: 14 },
  { label: "odr.26.667KHz", value: 15 },
];

const ACC1_ODR_OPTIONS = [
  { label: "odr.0.4KHz", value: 0 },
  { label: "odr.0.8KHz", value: 1 },
  { label: "odr.1.6KHz", value: 2 },
  { label: "odr.3.2KHz", value: 3 },
  { label: "odr.6.4KHz", value: 4 },
  { label: "odr.12.8KHz", value: 5 },
  { label: "odr.25.6KHz", value: 6 },
  { label: "odr.51.2KHz", value: 7 },
  { label: "odr.64KHz", value: 8 },
];

const ACC1_ODR: DeviceSensorSettingsField = {
  label: "sensor.settings.acc1.odr",
  name: ["settings", "sensors", "acc1_odr"],
};
const ACC1_SAMPLES: DeviceSensorSettingsField = {
  label: "sensor.settings.acc1.samples",
  name: ["settings", "sensors", "acc1_samples"],
};

const ACC1_ODR2: DeviceSensorSettingsField = {
  label: "sensor.settings.acc1.odr2",
  name: ["settings", "sensors", "acc1_odr_2"],
};
const ACC1_SAMPLES2: DeviceSensorSettingsField = {
  label: "sensor.settings.acc1.samples2",
  name: ["settings", "sensors", "acc1_samples_2"],
  unit: Unit.INTERVAL.SECOND,
};

export const SETTINGS_FIELDS: DeviceSensorSettingsField[] = [
  { ...ACC3_IS_AUTO, label: "sensor.settings.acc3.is.auto.xy" },
  {
    ...ACC3_RANGE,
    label: "sensor.settings.acc3.range.xy",
    options: RANGE_OPTIONS,
  },
  { ...ACC3_ODR, label: "sensor.settings.acc3.odr.xy", options: ODR_OPTIONS },
  { ...ACC3_SAMPLES, label: "sensor.settings.acc3.samples.xy" },
  { ...ACC1_ODR, options: ACC1_ODR_OPTIONS },
  { ...ACC1_SAMPLES, options: ACC3_SAMPLES.options },
  VIBRATION_K_X,
  VIBRATION_K_Y,
  VIBRATION_K_Z,
  BASE_FREQUENCY,
  DISP_MODE,
];

export const WAVE_SETTINGS_FIELDS: DeviceSensorSettingsField[] = [
  DATA_AXIS,
  TX_LEVEL2,
  SAMPLE_PERIOD2,
  SAMPLE_OFFSET2,
  {
    ...ACC3_RANGE2,
    label: "sensor.settings.acc3.range2.xy",
    options: RANGE_OPTIONS,
  },
  { ...ACC3_ODR2, label: "sensor.settings.acc3.odr2.xy", options: ODR_OPTIONS },
  { ...ACC3_SAMPLES2, label: "sensor.settings.acc3.samples2.xy" },
  { ...ACC1_ODR2, options: ACC1_ODR_OPTIONS },
  ACC1_SAMPLES2,
];

export const DEFAULT_SETTINGS: Partial<SensorSettingsSensor> = {
  acc3_is_auto: false,
  acc3_range: 3,
  acc3_odr: 12,
  acc3_samples: 4096,
  acc1_odr: 3,
  acc1_samples: 4096,
  vibration_k_x: 1,
  vibration_k_y: 1,
  vibration_k_z: 1,
  base_frequency: 0,
  disp_mode: 0,
  is_enabled_2: false,
  data_axis: 0,
  tx_level_2: 0,
  sample_period_2: createIntervalOption({ unit: "hour", value: 4 })
    .value as number,
  sample_offset_2: createIntervalOption({ unit: "second", value: 10 })
    .value as number,
  acc3_range_2: 2,
  acc3_odr_2: 12,
  acc3_samples_2: 1,
  acc1_odr_2: 3,
  acc1_samples_2: 1,
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
