import { TChecks } from "../types/types";
export const CCheckRegex:{[key in TChecks]:RegExp}={
    ENUM_IDENTIFIER: (/^E/),
    TYPE_IDENTIFER: (/^T/),
}

