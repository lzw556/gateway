import { NamePath } from "antd/es/form/interface";
import { Unit } from "./constants";
import { RuleObject } from "antd/es/form";

export interface Interval {
  unit: Lowercase<keyof typeof Unit.INTERVAL>;
  value: number;
}

export interface InputProps<NamePath> {
  disabled?: boolean;
  name: NamePath;
  value?: string | number | boolean;
  hidden?: boolean;
  password?: boolean;
  rules?: RuleObject[];
  tag?: "checkbox" | "select" | "switch";
}

export interface Option {
  label: string;
  value: string | number;
}

export interface SelectProps {
  options: Option[];
  onChange?: React.Dispatch<React.SetStateAction<any>>;
}

export interface EditableField<Names = NamePath, Labels = React.ReactNode>
  extends InputProps<Names>,
    Partial<SelectProps> {
  label: Labels;
  unit?: string;
  valueFormat?: {
    get?: (...paras: any) => any;
    set?: (...paras: any) => any;
  };
}
