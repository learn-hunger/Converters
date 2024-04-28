import ts from "typescript";
import { ErrorExist } from "../constants/checks";
import { EColorCodes, EErrorTypes, EInfoTypes, EMessages, EOtherVariables, ESuggestionTypes, ESymbols, ESyntaxTypes } from "../constants/error-prompts";
import { CCheckRegex } from "../constants/regex";
import { TChecks, TErrorTypes } from "../types/types";

export function reportBlock(sourceFile: ts.SourceFile, node: ts.Node, errorMessage: TErrorTypes, check: TChecks): void {
    ErrorExist.state=true;
    console.log(
        reportError(sourceFile, node, errorMessage),"\n",
        EOtherVariables.INFO_GAP,reportInfo(check),"\n",
        EOtherVariables.SYNTAX_GAP,reportSyntax(check),"\n",
        EOtherVariables.SUGGESTION_GAP,reportSuggestion(check)
    );
    // console.log(reportInfo(infoMessage));
    // reportSyntax();
    // reportSuggestion();
}

function reportError(sourceFile: ts.SourceFile, node: ts.Node, errorMessage: TErrorTypes): string {
    const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
    const message = `${EMessages.ERROR} ${EErrorTypes[errorMessage]} in file ${EColorCodes.DEFAULT} ${ESymbols.UNDERLINE}${sourceFile.fileName}${ESymbols.REMOVE_UNDERLINE} ${EColorCodes.RED}at location ${EColorCodes.DEFAULT}(${line + 1},${character + 1})`
    return message;
}

function reportInfo(infoMessage: TChecks): string {
    const message = `${EMessages.INFO} ${EInfoTypes[infoMessage]} `
    return message;
}

function reportSyntax(syntaxMessage:TChecks):string {
    const message=`${EMessages.INFO} ${EOtherVariables.SYNTAX} ${ESyntaxTypes[syntaxMessage]}\n\tPattern is: ${CCheckRegex[syntaxMessage]}`
    return message
 }
function reportSuggestion(syntaxMessage:TChecks):string {
    const message=`${EMessages.SUGGESTION} ${ESuggestionTypes[syntaxMessage]}`;
    return message;
 }