import { TChecks } from "../types/types"

export enum EOtherVariables{
    INFO_GAP="",
    SYNTAX_GAP="",
    SUGGESTION_GAP="",
    SYNTAX="Syntax: "
}
export enum EColorCodes{
    RED="\x1b[31m",
    GREEN="\x1b[32m",
    YELLOW="\x1b[33m",
    BLUE="\x1b[34m",
    DEFAULT="\x1b[0m"
}
export enum ESymbols{
    ERROR="X",
    INFO="!",
    SUCCESS="",
    BULB="\b\b\u{1F4A1}",
    BULLET="*",
    UNDERLINE='\x1b[4m',
    REMOVE_UNDERLINE='\x1b[0m'
}

export enum EMessages{
    ERROR=`${EColorCodes.RED} ${ESymbols.ERROR} ${ESymbols.BULLET} `,
    INFO=`${EColorCodes.BLUE} ${ESymbols.INFO} ${ESymbols.BULLET} `,
    SUGGESTION=`${EColorCodes.YELLOW}  ${ESymbols.BULB} ${ESymbols.BULLET} `,
    SUCCESS=`${EColorCodes.GREEN} ${ESymbols.SUCCESS} ${ESymbols.BULLET} `,
    SYNTAX=`${EColorCodes.YELLOW}  ${ESymbols.BULB} ${ESymbols.BULLET} `,

}

export enum EErrorTypes {
    // SyntaxError=`${red}Syntax Error at${blue}`
    IDENTIER_ERROR = "Identier Name Invalid ",
    VALUE_ERROR = "Value Name Invalid "
}

export const EInfoTypes:{[k in TChecks]:string}={
    ENUM_IDENTIFIER: "Enum Should Start With Letter E ",
    TYPE_IDENTIFER: "Type Should Start With T "
}

export const ESyntaxTypes:{[key in TChecks]:string}={
    ENUM_IDENTIFIER: `<E><Prefix><Suffix>`,
    TYPE_IDENTIFER: "<T><Prefix><Suffix>",
}

export const ESuggestionTypes: { [key in TChecks]: string } = {
    ENUM_IDENTIFIER: "example: enum ELearnHunger {};",
    TYPE_IDENTIFER: "example: type TLearnHunger {};"
}
