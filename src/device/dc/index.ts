import { DEVICE_COMMAND, SPEED_OBJECT } from "../constants";
import { DeviceSensorSettingsField, SensorSettingsSensor } from "../types";
import { Unit } from "../../constants";

const DC_COMMON_SETTINGS_FIDLES: DeviceSensorSettingsField[] = [
  {
    label: "sensor.settings.sensor.flags",
    name: ["settings", "sensors", "sensor_flags"],
    options: [
      { label: "sensor.settings.sensor.flags.static", value: 1 },
      { label: "sensor.settings.sensor.flags.coordinate", value: 2 },
      { label: "sensor.settings.sensor.flags.waveform", value: 4 },
    ],
  },
  SPEED_OBJECT,
  {
    label: "sensor.settings.rate.period",
    name: ["settings", "sensors", "rate_period"],
    unit: Unit.INTERVAL.DAY,
  },
  {
    label: "sensor.settings.rate.period2",
    name: ["settings", "sensors", "rate_period_2"],
    unit: Unit.INTERVAL.DAY,
  },
];

export const SETTINGS_FIDLES_110 = DC_COMMON_SETTINGS_FIDLES;

export const SETTINGS_FIDLES_210: DeviceSensorSettingsField[] = [
  {
    label: "sensor.settings.length.rod",
    name: ["settings", "sensors", "length_rod"],
    options: [
      { label: `sensor.settings.length.rod.12.4`, value: 124 },
      { label: "sensor.settings.length.rod.12.5", value: 125 },
      { label: "sensor.settings.length.rod.20", value: 200 },
      { label: "sensor.settings.length.rod.30", value: 300 },
      { label: "sensor.settings.length.rod.40", value: 400 },
    ],
  },
  {
    label: "sensor.settings.gain.select",
    name: ["settings", "sensors", "gain_select"],
    options: [
      { label: `sensor.settings.gain.select.auto`, value: 0 },
      { label: "sensor.settings.gain.select.10", value: 1 },
      { label: "sensor.settings.gain.select.15", value: 2 },
      { label: "sensor.settings.gain.select.25", value: 3 },
      { label: "sensor.settings.gain.select.30", value: 4 },
    ],
  },
  ...DC_COMMON_SETTINGS_FIDLES,
];

export const DEFAULT_SETTINGS: Partial<SensorSettingsSensor> = {
  sensor_flags: 1,
  speed_object: 5920,
  rate_period: 30,
  rate_period_2: 365,
  length_rod: 400,
  gain_select: 0,
};

export const COMMANDS = [
  DEVICE_COMMAND.RESET,
  DEVICE_COMMAND.CALIBRATE,
  DEVICE_COMMAND.COMPENSATE,
  DEVICE_COMMAND.ACQUIRE_DATA,
  DEVICE_COMMAND.RESTORE,
  DEVICE_COMMAND.REBOOT,
  DEVICE_COMMAND.UPGRADE_FIRMWARE,
];

export * from "./settings";
