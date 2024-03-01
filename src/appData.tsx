import React from "react";
import { GatewayStatus, NetworkSettings } from "./network/types";
import { Device, Devices } from "./device/types";
import { SETTINGS_DEFAULT } from "./network/constants";
import { HTTP } from "./util";

export type AppDataContextProps = {
  devices: Device[];
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  gateway?: Device;
  settings?: NetworkSettings;
  setSettings: React.Dispatch<
    React.SetStateAction<NetworkSettings | undefined>
  >;
  status?: GatewayStatus;
  setStatus: React.Dispatch<React.SetStateAction<GatewayStatus | undefined>>;
};

export const AppDataContext = React.createContext<AppDataContextProps>({
  devices: [],
  setDevices: () => undefined,
  setSettings: () => undefined,
  setStatus: () => undefined,
});

export const AppDataContextProvider = ({
  children,
  config,
}: {
  children: React.ReactNode;
  config: AppDataContextProps;
}) => {
  return (
    <AppDataContext.Provider value={{ ...config }}>
      {children}
    </AppDataContext.Provider>
  );
};
export function useAppDatas() {
  const [devices, setDevices] = React.useState<Device[]>([]);
  const gateway = devices[0];
  const [settings, setSettings] = React.useState<NetworkSettings | undefined>(
    SETTINGS_DEFAULT
  );
  const [status, setStatus] = React.useState<GatewayStatus | undefined>();

  React.useEffect(() => {
    HTTP.get<Devices>("devices/").then((devices) => {
      const fetchs = devices.map(({ address }) =>
        HTTP.get<Device>(`devices/${address}`)
      );
      Promise.all(fetchs).then(setDevices);
    });
    HTTP.get<NetworkSettings>("settings/").then(setSettings);

    HTTP.get<GatewayStatus>("status/").then(setStatus);

    // setDevices([
    //   {
    //     address: "c13a058e902d",
    //     parentAddress: "c13a058e902d",
    //     online: 0,
    //     modbus: 0,
    //     name: "THETA_GU100S",
    //     type: 1,
    //     battery: 0,
    //     signal: 0,
    //     lastUpdate: 1709016218418,
    //     isAlarming: false,
    //     sensors: [],
    //     settings: {},
    //     deviceInformation: {},
    //   },
    //   {
    //     address: "111111022601",
    //     parentAddress: "c13a058e902d",
    //     online: 0,
    //     modbus: 1,
    //     name: "111111022601",
    //     type: 131073,
    //     battery: 0,
    //     signal: 0,
    //     lastUpdate: 1709023383727,
    //     isAlarming: false,
    //     sensors: [],
    //     settings: {
    //       sensors: {
    //         sample_period: 3600000,
    //         sample_offset: 0,
    //         tx_level: 0,
    //         is_enabled_2: false,
    //       },
    //     },
    //     deviceInformation: {},
    //   },
    //   {
    //     address: "111111022801",
    //     parentAddress: "c13a058e902d",
    //     online: 0,
    //     modbus: 2,
    //     name: "111111022801",
    //     type: 196609,
    //     battery: 0,
    //     signal: 0,
    //     lastUpdate: 1709091785317,
    //     isAlarming: false,
    //     sensors: [],
    //     settings: {
    //       sensors: {
    //         sensor_flags: 3,
    //         sample_period: 3600000,
    //         sample_offset: 0,
    //         tx_level: 0,
    //         is_enabled_2: false,
    //         speed_object: 5920,
    //         initial_preload: 0,
    //         initial_length: 0,
    //         preload_coef: 1,
    //         scan_mode: 0,
    //         elastic_modulus: 210,
    //         sectional_area: 1305.462,
    //         clamped_length: 215,
    //       },
    //     },
    //     deviceInformation: {},
    //   },
    //   {
    //     address: "111111022802",
    //     parentAddress: "c13a058e902d",
    //     online: 0,
    //     modbus: 3,
    //     name: "111111022802",
    //     type: 327945,
    //     battery: 0,
    //     signal: 0,
    //     lastUpdate: 1709101828442,
    //     isAlarming: false,
    //     sensors: [],
    //     settings: {
    //       sensors: {
    //         sample_period: 3600000,
    //         sample_offset: 0,
    //         tx_level: 0,
    //         sample_period_2: 14400000,
    //         sample_offset_2: 10000,
    //         is_enabled_2: true,
    //         tx_level_2: 0,
    //         acc3_is_auto: false,
    //         acc3_range: 3,
    //         acc3_odr: 12,
    //         acc3_samples: 4096,
    //         acc3_range_2: 3,
    //         acc3_odr_2: 12,
    //         base_frequency: 0,
    //         vibration_k_x: 1,
    //         vibration_k_y: 1,
    //         vibration_k_z: 1,
    //         data_axis: 0,
    //         disp_mode: 0,
    //       },
    //     },
    //     deviceInformation: {},
    //   },
    // ]);
    // setSettings({
    //   system: {
    //     system_mode: 0,
    //     modbus_is_enabled: true,
    //     modbus_mode: 1,
    //     modbus_addr: 123,
    //     modbus_rs485_baudrate: 9600,
    //     simulation_is_enabled: false,
    //     dbg_timeout: 86400000,
    //     dbg_communication_period: 1200000,
    //     dbg_sample_period: 1200000,
    //     device_name: "THETA_GU100S",
    //     product_key: "",
    //     device_secret: "",
    //     led_run_time: 65535,
    //     led_run_time2: 65535,
    //     led_blinking_cnt: 0,
    //     led_blinking_cnt2: 0,
    //     led_blinking_cnt3: 0,
    //   },
    //   wsn: {
    //     provisioning_mode: 2,
    //     communication_offset: 10000,
    //     communication_period: 300000,
    //     group_size: 63,
    //     group_size_2: 1,
    //     group_interval: 150000,
    //     communication_period_2: 0,
    //     interval_cnt: 1,
    //   },
    //   ipn: {
    //     cloud_if: 0,
    //     ip_mode: 0,
    //     ip_addr: "192.168.1.100",
    //     subnet_mask: "255.255.255.0",
    //     gateway_addr: "192.168.1.1",
    //     primary_dns: "114.114.114.114",
    //     ip_mode_2: 0,
    //     ip_addr_2: "192.168.1.100",
    //     subnet_mask_2: "255.255.255.0",
    //     gateway_addr_2: "192.168.1.1",
    //     primary_dns_2: "114.114.114.114",
    //     network_if: 0,
    //     apn: "",
    //     apn_name: "",
    //     apn_pwd: "",
    //     mqtt_is_enabled: true,
    //     mqtt_addr: "mqtt.thetasensors.com",
    //     mqtt_port: 1883,
    //     mqtt_name: "theta-hd:ts-guest",
    //     mqtt_pwd: "fi2LmGb4e3Jm25Go",
    //     mqtt_client_id: "",
    //     ntp_is_enabled: true,
    //     ntp_addr: "ntp5.aliyun.com",
    //     http_port: 80,
    //     http_username: "admin",
    //     http_password: "admin",
    //     mqtt2_is_enabled: false,
    //     mqtt2_network: 0,
    //     mqtt2_addr: "mqtt.thetasensors.com",
    //     mqtt2_port: 1883,
    //     mqtt2_name: "theta-hd:ts-guest",
    //     mqtt2_pwd: "fi2LmGb4e3Jm25Go",
    //   },
    // });
    // setStatus({
    //   address: "c13a058e902d",
    //   software_version: "1.6.6",
    //   product_id: "10600",
    //   software_build_time: "Jan 15 2024 17:31:51",
    //   supporting_4G: false,
    //   supporting_5G: false,
    //   supporting_wifi: false,
    //   supporting_provisioning_mode_4: false,
    //   supporting_can: false,
    //   supporting_modbus: true,
    //   ip_mac: "c2:3a:05:8e:90:2d",
    //   ip_addr: "172.16.7.101",
    //   subnet_mask: "255.255.255.0",
    //   gateway: "172.16.7.1",
    //   broadcast_addr: "172.16.7.255",
    //   real_voltage: 3287,
    //   battery_voltage: 3287,
    //   signal: 0,
    //   synced: false,
    //   provisioned: true,
    //   is_debugging_mode: false,
    //   provisioning: false,
    //   maintaining: false,
    //   is_mqtt_connected: true,
    //   is_ntp_connected: true,
    //   system_time: 1709023594,
    // });
  }, []);

  return {
    devices,
    gateway,
    setDevices,
    settings,
    setSettings,
    status,
    setStatus,
  };
}

export function useAppDataContext() {
  return React.useContext(AppDataContext);
}
