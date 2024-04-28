import { TChecks } from "./types/types";

export const LHLint:{[key in TChecks]:boolean}={
    ENUM_IDENTIFIER: true,
    TYPE_IDENTIFER: true
}
