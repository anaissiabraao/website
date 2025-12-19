import type { Service } from "@/types/services";

type TFn = (key: string) => string;

const tOr = (t: TFn, key: string, fallback: string) => {
  const v = t(key);
  return v === key ? fallback : v;
};

export const getServiceText = (t: TFn, service: Service) => {
  return {
    name: tOr(t, `service.${service.id}.name`, service.name),
    description: tOr(t, `service.${service.id}.description`, service.description),
    longDescription: tOr(
      t,
      `service.${service.id}.longDescription`,
      service.longDescription || service.description,
    ),
  };
};


