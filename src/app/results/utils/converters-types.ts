import { EAnalytics } from "./converters-constants";

export interface IAnalytics {
  event: keyof typeof EAnalytics;
  data: string;
}
