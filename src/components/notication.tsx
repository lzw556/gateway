import React from "react";
import { message } from "antd";
import { MessageInstance } from "antd/es/message/interface";

export const NoticationContext = React.createContext<MessageInstance>(null!);

export const NoticationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <NoticationContext.Provider value={messageApi}>
      {contextHolder}
      {children}
    </NoticationContext.Provider>
  );
};

export function useNoticationContext() {
  return React.useContext(NoticationContext);
}
