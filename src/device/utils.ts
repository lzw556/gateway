import React from "react";
import {
  DEVICE_FIELD_MAC,
  DEVICE_FIELD_MODBUS,
  DEVICE_FIELD_NAME,
  DEVICE_FIELD_PARENT,
  DEVICE_FIELD_TYPE,
  DEVICE_TYPE,
} from "./constants";
import {
  Device,
  DeviceField,
  DeviceTypeValue,
  SensorSettingsSensor,
} from "./types";
import * as DC from "./dc";
import * as SAS from "./sas";
import * as SQ from "./sq";
import { SVT110, SVT210R, SVT210510, SVT220520 } from "./svt";
import { Mac } from "../constants";

export const getSensorSettingsByType = (
  type: DeviceTypeValue,
  initial?: Partial<SensorSettingsSensor>
) => {
  switch (type) {
    case DEVICE_TYPE.DC110.value:
    case DEVICE_TYPE.DC210.value:
      return initial
        ? { ...DC.DEFAULT_SETTINGS, ...initial }
        : DC.DEFAULT_SETTINGS;
    case DEVICE_TYPE.SAS.value:
      return initial
        ? { ...SAS.DEFAULT_SETTINGS, ...initial }
        : SAS.DEFAULT_SETTINGS;
    case DEVICE_TYPE.SQ.value:
      return initial
        ? { ...SQ.DEFAULT_SETTINGS, ...initial }
        : SQ.DEFAULT_SETTINGS;
    case DEVICE_TYPE.SVT110.value:
      return initial
        ? { ...SVT110.DEFAULT_SETTINGS, ...initial }
        : SVT110.DEFAULT_SETTINGS;
    case DEVICE_TYPE.SVT210R.value:
      return initial
        ? { ...SVT210R.DEFAULT_SETTINGS, ...initial }
        : SVT210R.DEFAULT_SETTINGS;
    case DEVICE_TYPE.SVT210510.value:
      return initial
        ? { ...SVT210510.DEFAULT_SETTINGS, ...initial }
        : SVT210510.DEFAULT_SETTINGS;
    case DEVICE_TYPE.SVT220520.value:
      return initial
        ? { ...SVT220520.DEFAULT_SETTINGS, ...initial }
        : SVT220520.DEFAULT_SETTINGS;
  }
};

export const buildPostValues = (values: Device): Device => {
  let transform = { ...values, address: Mac.set(values.address) };
  if (values.type === DEVICE_TYPE.SAS.value) {
    transform = {
      ...transform,
      settings: {
        ...transform.settings,
        sensors: {
          ...transform.settings.sensors,
          sensor_flags: SAS.SENSOR_FLAGS.valueFormat?.set?.(
            transform.settings.sensors?.sensor_flags
          ),
        },
      },
    };
  }
  return transform;
};

export const buildInitialValues = (values: Device): Device => {
  let initialValues = { ...values, address: Mac.get(values.address) };
  if (initialValues && initialValues.type === DEVICE_TYPE.SAS.value) {
    initialValues = {
      ...initialValues,
      settings: {
        ...initialValues.settings,
        sensors: {
          ...initialValues.settings.sensors,
          sensor_flags: SAS.SENSOR_FLAGS.valueFormat?.get?.(
            initialValues.settings.sensors?.sensor_flags
          ),
        },
      },
    };
  }
  return initialValues;
};

export const useDeviceFields = (
  devices: Device[],
  canEditType = false,
  resetFn?: (type: DeviceTypeValue) => void
) => {
  const [type, setType] = React.useState<DeviceTypeValue | undefined>();
  const fields = [
    DEVICE_FIELD_MAC,
    DEVICE_FIELD_NAME,
    { ...DEVICE_FIELD_TYPE, disabled: !canEditType },
    DEVICE_FIELD_PARENT,
    DEVICE_FIELD_MODBUS,
  ].map((f) => {
    if (canEditType && f.name === "type") {
      return {
        ...f,
        onChange: (type: DeviceTypeValue) => {
          setType(type);
          resetFn?.(type);
        },
      };
    }
    if (f.name === "parentAddress") {
      return {
        ...f,
        options: devices.map(({ address, name }) => ({
          label: name,
          value: address,
        })),
        value: devices[0].address,
      };
    } else {
      return f;
    }
  }) as DeviceField[];
  return { type, fields };
};
