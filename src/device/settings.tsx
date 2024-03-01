import React from "react";
import * as DC from "./dc";
import * as SAS from "./sas";
import * as SQ from "./sq";
import { SVT110, SVT210R, SVT210510, SVT220520 } from "./svt";
import { COMMON_SETTINGS_FIDLES, DEVICE_TYPE } from "./constants";
import { FormItem } from "../components/formItem";
import { DeviceTypeValue, SensorSettingsSensor } from "./types";
import { getSensorSettingsByType } from "./utils";

export const Settings = ({
  type,
  initial,
}: {
  type: DeviceTypeValue;
  initial?: Partial<SensorSettingsSensor>;
}) => {
  let settingsEle = null;
  const settings = getSensorSettingsByType(type, initial);
  switch (type) {
    case DEVICE_TYPE.DC110.value:
    case DEVICE_TYPE.DC210.value:
      settingsEle = <DC.Settings type={type} />;
      break;
    case DEVICE_TYPE.SAS.value:
      settingsEle = <SAS.Settings {...settings} />;
      break;
    case DEVICE_TYPE.SQ.value:
      settingsEle = <SQ.Settings {...settings} />;
      break;
    case DEVICE_TYPE.SVT110.value:
      settingsEle = <SVT110.Settings {...settings} />;
      break;
    case DEVICE_TYPE.SVT210R.value:
      settingsEle = <SVT210R.Settings {...settings} />;
      break;
    case DEVICE_TYPE.SVT210510.value:
      settingsEle = <SVT210510.Settings {...settings} />;
      break;
    case DEVICE_TYPE.SVT220520.value:
      settingsEle = <SVT220520.Settings {...settings} />;
      break;
  }
  return (
    <>
      {type !== DEVICE_TYPE.RU.value &&
        COMMON_SETTINGS_FIDLES.map((f) => <FormItem key={f.label} {...f} />)}
      {settingsEle}
    </>
  );
};
