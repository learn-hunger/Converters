import { IAnalytics } from "./converters-types";

export enum EConverter {
  IMAGE_PDF_TO_TEXT,
  GPA,
}

export enum EAnalytics {
  GPA_PDF_ERROR,
  GPA_IMAGE_ERROR,
  GPA_PDF_SUCCESS,
  GPA_IMAGE_SUCCESS,
  TEXT_PDF_SUCCESS,
  TEXT_PDF_ERROR,
  TEXT_IMAGE_SUCCESS,
  TEXT_IMAGE_ERROR,
}
export const analytics: Record<EAnalytics, IAnalytics> = {
  [EAnalytics.GPA_PDF_ERROR]: {
    event: EAnalytics[EAnalytics.GPA_PDF_ERROR] as keyof typeof EAnalytics,
    data: "",
  },
  [EAnalytics.GPA_IMAGE_ERROR]: {
    event: EAnalytics[EAnalytics.GPA_IMAGE_ERROR] as keyof typeof EAnalytics,
    data: "",
  },
  [EAnalytics.GPA_PDF_SUCCESS]: {
    event: EAnalytics[EAnalytics.GPA_PDF_SUCCESS] as keyof typeof EAnalytics,
    data: "",
  },
  [EAnalytics.GPA_IMAGE_SUCCESS]: {
    event: EAnalytics[EAnalytics.GPA_IMAGE_SUCCESS] as keyof typeof EAnalytics,
    data: "",
  },
  [EAnalytics.TEXT_PDF_SUCCESS]: {
    event: EAnalytics[EAnalytics.TEXT_PDF_SUCCESS] as keyof typeof EAnalytics,
    data: "",
  },
  [EAnalytics.TEXT_IMAGE_SUCCESS]: {
    event: EAnalytics[EAnalytics.TEXT_IMAGE_SUCCESS] as keyof typeof EAnalytics,
    data: "",
  },
  [EAnalytics.TEXT_PDF_ERROR]: {
    event: EAnalytics[EAnalytics.TEXT_PDF_ERROR] as keyof typeof EAnalytics,
    data: "",
  },
  [EAnalytics.TEXT_IMAGE_ERROR]: {
    event: EAnalytics[EAnalytics.TEXT_IMAGE_ERROR] as keyof typeof EAnalytics,
    data: "",
  },
};
