import { Interval, Option } from "./types";

export function formatDate(
  timestamp: number,
  format?: "yyyy-mm-dd" | "hh:mm:ss"
) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  if (format === "yyyy-mm-dd") {
    return `${pad(year, 4)}-${pad(month)}-${pad(day)}`;
  } else if (format === "hh:mm:ss") {
    return `${pad(hour)}:${pad(minute)}:${pad(second)}`;
  } else {
    return `${pad(year, 4)}-${pad(month)}-${pad(day)} ${pad(hour)}:${pad(
      minute
    )}:${pad(second)}`;
  }
}

function pad(interval: number, total = 2, str = "0") {
  return interval.toString().padStart(total, str);
}

export function createIntervalOption(interval: Interval): Option {
  const { unit, value } = interval;
  if (value === 0) return { label: "interval.none", value };
  return {
    label: `${unit}.${value}`,
    value: formatInterval(interval).millisecond,
  };
}

export function formatInterval(interval: Interval) {
  const { unit, value } = interval;
  switch (unit) {
    case "day":
      return formatDay(value);
    case "hour":
      return formatHour(value);
    case "minute":
      return formatMinute(value);
    case "second":
      return formatSecond(value);
    case "millisecond":
      return formatMillisecond(value);
  }
}

function formatDay(value: number) {
  return formatHour(value * 24);
}

function formatHour(value: number) {
  return formatMinute(value * 60);
}

function formatMinute(value: number) {
  return formatSecond(value * 60);
}

function formatSecond(value: number) {
  return formatMillisecond(value * 1000);
}

function formatMillisecond(value: number) {
  return {
    hour: value / (60 * 60 * 1000),
    minute: value / (60 * 1000),
    second: value / 1000,
    millisecond: value,
  };
}

export function getOptionLabelByValue(
  value: string | number,
  options?: Option[]
) {
  if (!options || options.length === 0) return value;
  const option = options.find((o) => o.value === value);
  return option ? option.label : value;
}

const headers = {
  "Content-Type": "application/json",
};

const init: RequestInit = {
  credentials: "include",
  headers,
};

const BASE = "cgi-bin/";

export const HTTP = {
  get: <T>(url: string) =>
    fetch(`${BASE}${url}`, init).then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      } else {
        return res.json() as Promise<T>;
      }
    }),
  post: <T>(url: string, data: Object) =>
    fetch(`${BASE}${url}`, {
      ...init,
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      } else {
        return res.json() as Promise<T>;
      }
    }),
  put: <T>(url: string, data?: Object) =>
    fetch(`${BASE}${url}`, {
      ...init,
      method: "PUT",
      body: JSON.stringify(data),
    }).then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      } else {
        return res.json() as Promise<T>;
      }
    }),
  delete: (url: string) =>
    fetch(`${BASE}${url}`, { ...init, method: "DELETE" }).then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      } else {
        return res.ok;
      }
    }),
};

export function download(content: Blob, filename: string) {
  const url = window.URL.createObjectURL(content);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
}

export function valueToArray(optionArray: number[], value: number) {
  var ret = [];
  for (let i = 0; i < optionArray.length; i++) {
    if ((value & optionArray[i]) > 0) {
      ret.push(optionArray[i]);
    }
  }
  return ret;
}
