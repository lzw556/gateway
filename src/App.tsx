import React from "react";
import "./App.css";
import { Card, ConfigProvider, Segmented } from "antd";
import { WSNDetail } from "./network/wsnDetail";
import { ReadonlyDeviceTable } from "./device/readonlyDeviceTable";
import { EditableDeviceTable } from "./device/editableDeviceTable";
import { Settings } from "./network/settings";
import { Toolbar } from "./network/toolbar";
import { Format, LocaleContextProvider, useLocaleContext } from "./locale";
import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";
import { StatusBar } from "./network/statusBar";
import { AppDataContextProvider, useAppDatas } from "./appData";
import { NoticationContextProvider } from "./components/notication";

function App() {
  const { language } = useLocaleContext();
  const [section, setSection] = React.useState<string | number>("network");
  const [deviceListCategory, setDeviceListCategory] = React.useState<
    string | number
  >("s");
  const apps = useAppDatas();
  const { gateway, status, settings, devices } = apps;

  React.useEffect(() => {
    // document.cookie = "auth=admin";
    document.title = language === "en-us" ? "loT Gateway" : "物联网网关";
  }, [language]);

  return (
    <LocaleContextProvider>
      <AppDataContextProvider config={apps}>
        <NoticationContextProvider>
          <ConfigProvider locale={language === "en-us" ? enUS : zhCN}>
            {gateway !== undefined &&
              settings !== undefined &&
              status !== undefined && (
                <div className="gateway">
                  <div className="switch">
                    <Segmented
                      onChange={setSection}
                      options={[
                        { label: <Format id="network" />, value: "network" },
                        { label: <Format id="gateway" />, value: "device" },
                      ]}
                    />
                  </div>
                  <div
                    className={`network ${
                      section === "network" ? "selected" : ""
                    }`}
                  >
                    {settings && <WSNDetail {...settings} />}
                    <Card
                      className="section"
                      bordered={false}
                      headStyle={{ border: 0 }}
                      size="small"
                      title={<Format id="device.list" />}
                    >
                      <Segmented
                        onChange={setDeviceListCategory}
                        options={[
                          { label: <Format id="status" />, value: "s" },
                          { label: <Format id="management" />, value: "m" },
                        ]}
                        size="small"
                      />
                      <ReadonlyDeviceTable
                        devices={devices.filter(
                          ({ address }) => gateway.address !== address
                        )}
                        style={{
                          marginTop: 20,
                          display:
                            deviceListCategory === "s" ? "block" : "none",
                        }}
                      />
                      <EditableDeviceTable
                        gateway={gateway}
                        devices={devices.filter(
                          ({ address }) => gateway.address !== address
                        )}
                        style={{
                          marginTop: 12,
                          display:
                            deviceListCategory === "m" ? "block" : "none",
                        }}
                      />
                    </Card>
                  </div>
                  <div
                    className={`device ${
                      section === "device" ? "selected" : ""
                    }`}
                  >
                    <StatusBar name={gateway.name} status={status} />
                    <Settings {...settings!} />
                    <Toolbar />
                  </div>
                </div>
              )}
          </ConfigProvider>
        </NoticationContextProvider>
      </AppDataContextProvider>
    </LocaleContextProvider>
  );
}

export default App;
