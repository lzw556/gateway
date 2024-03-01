import React from "react";
import { Upload as AntdUpload, UploadProps } from "antd";

export const Upload = (props: UploadProps) => {
  const { children, ...rest } = props;
  return (
    <AntdUpload {...rest} showUploadList={false}>
      {children}
    </AntdUpload>
  );
};
