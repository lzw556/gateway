export const Unit = {
  AREA: "unit.area",
  BATTERY: "unit.battery",
  INTERVAL: {
    DAY: "unit.interval.day",
    HOUR: "unit.interval.hour",
    MINUTE: "unit.interval.minute",
    SECOND: "unit.interval.second",
    MILLISECOND: "unit.interval.millisecond",
  },
  LENGTH: "unit.length",
  modulus: "unit.modulus",
  PRELOAD: "unit.preload",
  SIGNAL: "unit.signal",
  SPEED_OBJECT: "unit.speed.object",
};

export const Mac = {
  get: (mac: string) => {
    const _mac = mac.toUpperCase()
    if (_mac.length === 12) {
      return _mac.replace(/\w(?=(\w{2})+$)/g, "$&-");
    }
    return _mac;
  },
  set: (mac: string) => mac.toLowerCase().replaceAll("-", ""),
};
