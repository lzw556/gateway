import { ACC3_ODR2, ACC3_SAMPLES2, DEVICE_COMMAND } from "../constants";
import { DeviceSensorSettingsField, SensorSettingsSensor } from "../types";
import { Unit } from "../../constants";
import { createIntervalOption } from "../../util";

export const FLAGS = {
  STATIC: 1 as 1,
  DYNAMIC: 2 as 2,
};

export const SENSOR_FLAGS: DeviceSensorSettingsField = {
  label: "sensor.settings.sensor.flags",
  name: ["settings", "sensors", "sensor_flags"],
  options: [
    { label: "sensor.settings.sensor.flags.static", value: FLAGS.STATIC },
    { label: "sensor.settings.sensor.flags.dynamic", value: FLAGS.DYNAMIC },
  ],
};

const OBJECT_RADIUS: DeviceSensorSettingsField = {
  label: "sensor.settings.object.radius",
  name: ["settings", "sensors", "object_radius"],
  unit: Unit.LENGTH,
};

const OBJECT_HEIGHT: DeviceSensorSettingsField = {
  label: "sensor.settings.object.height",
  name: ["settings", "sensors", "object_height"],
  unit: Unit.LENGTH,
};

const DYNAMIC_SETTINGS_FIELDS: DeviceSensorSettingsField[] = [
  {
    ...ACC3_ODR2,
    label: "sensor.settings.odr",
    options: [
      { label: "odr.1Hz", value: 0 },
      { label: "odr.5Hz", value: 1 },
      { label: "odr.10Hz", value: 2 },
      { label: "odr.20Hz", value: 3 },
      { label: "odr.50Hz", value: 4 },
      { label: "odr.100Hz", value: 5 },
      { label: "odr.200Hz", value: 6 },
      { label: "odr.500Hz", value: 7 },
    ],
  },
  {
    ...ACC3_SAMPLES2,
    label: "sensor.settings.samples",
    options: [
      createIntervalOption({ unit: "second", value: 1 }),
      createIntervalOption({ unit: "second", value: 2 }),
      createIntervalOption({ unit: "second", value: 3 }),
      createIntervalOption({ unit: "second", value: 4 }),
      createIntervalOption({ unit: "second", value: 5 }),
      createIntervalOption({ unit: "second", value: 10 }),
    ],
  },
];

export const SETTINGS_FIDLES = {
  [FLAGS.STATIC]: [OBJECT_RADIUS, OBJECT_HEIGHT],
  [FLAGS.DYNAMIC]: [...DYNAMIC_SETTINGS_FIELDS, OBJECT_RADIUS, OBJECT_HEIGHT],
};

export const DEFAULT_SETTINGS: Partial<SensorSettingsSensor> = {
  sensor_flags: 1,
  acc3_odr_2: 0,
  acc3_samples_2: createIntervalOption({ unit: "second", value: 1 })
    .value as number,
  object_radius: 0,
  object_height: 0,
};

export const COMMANDS = [
  DEVICE_COMMAND.RESET,
  DEVICE_COMMAND.ACQUIRE_DATA,
  DEVICE_COMMAND.RESTORE,
  DEVICE_COMMAND.REBOOT,
  DEVICE_COMMAND.UPGRADE_FIRMWARE,
];

export * from "./settings";
