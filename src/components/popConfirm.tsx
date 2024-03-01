import React from "react";
import { Popconfirm, PopconfirmProps } from "antd";

export const PopConfirm = (
  props: PopconfirmProps & {
    confirmHandler: () => void;
    skip: boolean;
  }
) => {
  const { children, confirmHandler, skip, ...rest } = props;
  const [open, setOpen] = React.useState(false);
  const confirm = () => {
    setOpen(false);
    confirmHandler();
  };
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setOpen(newOpen);
      return;
    }
    if (skip) {
      confirm();
    } else {
      setOpen(newOpen);
    }
  };
  return (
    <Popconfirm
      {...rest}
      open={open}
      onOpenChange={handleOpenChange}
      onConfirm={confirm}
    >
      {children}
    </Popconfirm>
  );
};
