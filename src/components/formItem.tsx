import React from "react";
import { Checkbox, Form, Input, Select, Switch } from "antd";
import { EditableField } from "../types";
import { Format } from "../locale";

export function FormItem({
  disabled,
  label,
  name,
  onChange,
  options,
  password,
  rules,
  tag = "select",
  unit,
  value,
  ...rest
}: EditableField) {
  const renderControl = () => {
    if (options) {
      const ops = options.map((o) => ({
        ...o,
        label: <Format id={o.label} />,
      }));
      if (tag === "select") {
        return (
          <Select
            disabled={disabled}
            options={ops}
            onChange={(value) => onChange?.(value)}
          />
        );
      } else {
        return (
          <Checkbox.Group
            disabled={disabled}
            options={ops}
            onChange={(value) => onChange?.(value)}
          />
        );
      }
    } else if (tag === "switch") {
      return (
        <Switch
          disabled={disabled}
          onChange={(value) => onChange?.(value)}
          size="small"
        />
      );
    } else {
      return password ? (
        <Input.Password disabled={disabled} />
      ) : (
        <Input
          disabled={disabled}
          suffix={unit ? <Format id={unit} /> : undefined}
        />
      );
    }
  };

  return (
    <Form.Item
      {...{ label: <Format id={label as any} />, name }}
      {...rest}
      initialValue={value}
      rules={rules?.map((r) => ({
        ...r,
        message: <Format id={r.message as string} />,
      }))}
    >
      {renderControl()}
    </Form.Item>
  );
}
