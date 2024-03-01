import React from "react";
import { SETTINGS_FIELDS, WAVE_SETTINGS_FIELDS } from ".";
import { FormItem } from "../../../components/formItem";
import { IS_ENABLED2 } from "../common";
import { SensorSettingsSensor } from "../../types";

export const Settings = (props: Partial<SensorSettingsSensor>) => {
  const settings = useSettings(props.is_enabled_2);
  return (
    <>
      {settings.map((f) => (
        <FormItem key={f.label} {...f} />
      ))}
    </>
  );
};

export function useSettings(enabledValue?: boolean) {
  const [enabled, setEnabled] = React.useState(enabledValue ?? false);
  const enabledField = { ...IS_ENABLED2, onChange: setEnabled };
  const settings = [...SETTINGS_FIELDS, enabledField];
  return enabled ? [...settings, ...WAVE_SETTINGS_FIELDS] : settings;
}
