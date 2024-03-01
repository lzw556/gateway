import React from "react";
import { SETTINGS_FIDLES_110, SETTINGS_FIDLES_210 } from ".";
import { DEVICE_TYPE } from "../constants";
import { DeviceTypeValue } from "../types";
import { FormItem } from "../../components/formItem";

export const Settings = ({ type }: { type: DeviceTypeValue }) => {
  const settings =
    type === DEVICE_TYPE.DC110.value
      ? SETTINGS_FIDLES_110
      : SETTINGS_FIDLES_210;
  return (
    <>
      {settings.map((f) => (
        <FormItem key={`${type}-${f.label}`} {...f} />
      ))}
    </>
  );
};
