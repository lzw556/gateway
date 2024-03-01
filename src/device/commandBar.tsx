import React from "react";
import { Tooltip } from "antd";
import {
  DEVICE_TYPE,
  RU_COMMANDS,
  SA_COMMANDS,
  SPT_COMMANDS,
  ST_COMMANDS,
} from "./constants";
import * as DC from "./dc";
import * as SAS from "./sas";
import * as SQ from "./sq";
import { SVT110, SVT210R, SVT210510, SVT220520 } from "./svt";
import { Device, DeviceCommandKey } from "./types";
import { Format } from "../locale";
import { HTTP } from "../util";
import { PopConfirm } from "../components/popConfirm";

export const CommandBar = (props: Device) => {
  const { address, type } = props;
  const commands = [];
  switch (type) {
    case DEVICE_TYPE.RU.value:
      commands.push(...RU_COMMANDS);
      break;
    case DEVICE_TYPE.SA.value:
      commands.push(...SA_COMMANDS);
      break;
    case DEVICE_TYPE.SAS.value:
      commands.push(...SAS.COMMANDS);
      break;
    case DEVICE_TYPE.DC110.value:
    case DEVICE_TYPE.DC210.value:
      commands.push(...DC.COMMANDS);
      break;
    case DEVICE_TYPE.SVT110.value:
      commands.push(...SVT110.COMMANDS);
      break;
    case DEVICE_TYPE.SVT210R.value:
      commands.push(...SVT210R.COMMANDS);
      break;
    case DEVICE_TYPE.SVT210510.value:
      commands.push(...SVT210510.COMMANDS);
      break;
    case DEVICE_TYPE.SVT220520.value:
      commands.push(...SVT220520.COMMANDS);
      break;
    case DEVICE_TYPE.ST.value:
      commands.push(...ST_COMMANDS);
      break;
    case DEVICE_TYPE.SQ.value:
      commands.push(...SQ.COMMANDS);
      break;
    case DEVICE_TYPE.SPT.value:
      commands.push(...SPT_COMMANDS);
      break;
  }
  const handleClickCommandBtn = (
    address: string,
    value: DeviceCommandKey,
    qs?: string
  ) => {
    HTTP.put(`devices/${address}/${value}${qs ?? ""}`);
  };
  return (
    <>
      {commands.map(({ confirm, confirmText, label, qs, value }) => {
        const desc =
          confirmText ??
          `are.you.sure.you.want.to.${label.replace("device.command.", "")}`;
        return (
          <Tooltip key={value} title={<Format id={label} />}>
            <PopConfirm
              confirmHandler={() => handleClickCommandBtn(address, value, qs)}
              description={<Format id={desc} />}
              title={<Format id={label} />}
              skip={!confirm}
            >
              <a href="#;">
                <span className={`iconfont icon-${value}`}></span>
              </a>
            </PopConfirm>
          </Tooltip>
        );
      })}
    </>
  );
};
