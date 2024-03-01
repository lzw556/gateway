import React from "react";
import { FLAGS, SENSOR_FLAGS, SETTINGS_FIDLES } from ".";
import { FormItem } from "../../components/formItem";
import {  SensorSettingsSensor } from "../types";

type FlagValue = (typeof FLAGS)[keyof typeof FLAGS];

export const Settings = (props: Partial<SensorSettingsSensor>) => {
  const settings = useSettings(props.sensor_flags as FlagValue);
  return (
    <>
      {settings.map((f) => (
        <FormItem key={f.label} {...f} />
      ))}
    </>
  );
};

export function useSettings(flag: FlagValue) {
  const [mode, setMode] = React.useState<FlagValue>(flag ?? 1);
  const flags = { ...SENSOR_FLAGS, onChange: setMode };
  return [flags, ...SETTINGS_FIDLES[mode]];
}
