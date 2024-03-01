import React from "react";
import {
  DYNAMIC_SETTINGS_FIELDS,
  SENSOR_FLAGS,
  STATIC_SETTINGS_FIDLES,
} from ".";
import { FormItem } from "../../components/formItem";
import { SensorSettingsSensor } from "../types";

export const Settings = (props: Partial<SensorSettingsSensor>) => {
  const settings = useSettings(props.sensor_flags as number);
  return (
    <>
      {settings.map((f) => (
        <FormItem key={f.label} {...f} />
      ))}
    </>
  );
};

export function useSettings(mode: number) {
  const [modes, setModes] = React.useState<number[]>(
    SENSOR_FLAGS.valueFormat?.get?.(mode)
  );
  const flags = { ...SENSOR_FLAGS, onChange: setModes };
  return modes.includes(2)
    ? [flags, ...DYNAMIC_SETTINGS_FIELDS]
    : [flags, ...STATIC_SETTINGS_FIDLES];
}
