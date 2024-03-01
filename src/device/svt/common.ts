import { TX_LEVEL_OPTIONS } from "../constants";
import { DeviceSensorSettingsField } from "../types";
import { createIntervalOption } from "../../util";

export const ACC3_IS_AUTO: DeviceSensorSettingsField = {
  label: "sensor.settings.acc3.is.auto",
  name: ["settings", "sensors", "acc3_is_auto"],
  tag: "switch",
};

export const ACC3_RANGE: DeviceSensorSettingsField = {
  label: "sensor.settings.acc3.range",
  name: ["settings", "sensors", "acc3_range"],
};

export const ACC3_ODR: DeviceSensorSettingsField = {
  label: "sensor.settings.acc3.odr",
  name: ["settings", "sensors", "acc3_odr"],
};

export const ACC3_SAMPLES: DeviceSensorSettingsField = {
  label: "sensor.settings.acc3.samples",
  name: ["settings", "sensors", "acc3_samples"],
  options: [1024, 2048, 4096].map((n) => ({ label: `samples.${n}`, value: n })),
};

export const VIBRATION_K_X: DeviceSensorSettingsField = {
  label: "sensor.settings.vibration.k.x",
  name: ["settings", "sensors", "vibration_k_x"],
};

export const VIBRATION_K_Y: DeviceSensorSettingsField = {
  label: "sensor.settings.vibration.k.y",
  name: ["settings", "sensors", "vibration_k_y"],
};

export const VIBRATION_K_Z: DeviceSensorSettingsField = {
  label: "sensor.settings.vibration.k.z",
  name: ["settings", "sensors", "vibration_k_z"],
};

export const BASE_FREQUENCY: DeviceSensorSettingsField = {
  label: "sensor.settings.base.frequency",
  name: ["settings", "sensors", "base_frequency"],
};

export const DISP_MODE: DeviceSensorSettingsField = {
  label: "sensor.settings.disp.mode",
  name: ["settings", "sensors", "disp_mode"],
  options: [
    { label: "sensor.settings.disp.mode.lo", value: 0 },
    { label: "sensor.settings.disp.mode.hi", value: 1 },
  ],
};

export const IS_ENABLED2: DeviceSensorSettingsField = {
  label: "sensor.settings.is.enabled2",
  name: ["settings", "sensors", "is_enabled_2"],
  tag: "switch",
};

export const DATA_AXIS: DeviceSensorSettingsField = {
  label: "sensor.settings.data.axis",
  name: ["settings", "sensors", "data_axis"],
  options: [
    { label: "data.axis.XYZ", value: 0 },
    { label: "data.axis.X", value: 1 },
    { label: "data.axis.Y", value: 2 },
    { label: "data.axis.Z", value: 3 },
  ],
};

export const TX_LEVEL2: DeviceSensorSettingsField = {
  label: "sensor.settings.tx.level2",
  name: ["settings", "sensors", "tx_level_2"],
  options: TX_LEVEL_OPTIONS,
};

export const SAMPLE_PERIOD2: DeviceSensorSettingsField = {
  label: "sensor.settings.sample.period2",
  name: ["settings", "sensors", "sample_period_2"],
  options: [
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
    createIntervalOption({ unit: "day", value: 1 }),
  ],
};

export const SAMPLE_OFFSET2: DeviceSensorSettingsField = {
  label: "sensor.settings.sample.offset2",
  name: ["settings", "sensors", "sample_offset_2"],
  options: [
    createIntervalOption({ unit: "second", value: 10 }),
    createIntervalOption({ unit: "second", value: 20 }),
    createIntervalOption({ unit: "second", value: 30 }),
    createIntervalOption({ unit: "minute", value: 1 }),
    createIntervalOption({ unit: "minute", value: 2 }),
    createIntervalOption({ unit: "minute", value: 5 }),
    createIntervalOption({ unit: "minute", value: 10 }),
    createIntervalOption({ unit: "minute", value: 15 }),
    createIntervalOption({ unit: "minute", value: 20 }),
    createIntervalOption({ unit: "minute", value: 30 }),
    createIntervalOption({ unit: "hour", value: 1 }),
    createIntervalOption({ unit: "hour", value: 2 }),
  ],
};

export const ACC3_RANGE2: DeviceSensorSettingsField = {
  label: "sensor.settings.acc3.range2",
  name: ["settings", "sensors", "acc3_range_2"],
};
