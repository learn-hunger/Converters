
import * as ts from "typescript";
import { LHLint } from "../.LHLint";
import { EChecks, ErrorExist } from "../constants/checks";
import { CCheckRegex } from "../constants/regex";
import { TChecks } from "../types/types";
import { reportBlock } from "./report-block";
export function checkLinting(sourceFile: ts.SourceFile) {
    delintNode(sourceFile);
    function delintNode(node: ts.Node) {
      switch (node.kind) {
        case ts.SyntaxKind.EnumDeclaration:
          const enumNode=node as ts.EnumDeclaration;
          const check=EChecks[EChecks.ENUM_IDENTIFIER];
          if(LHLint[check as TChecks] && !CCheckRegex.ENUM_IDENTIFIER.test(enumNode.name.getText())){
            reportBlock(sourceFile,node,"IDENTIER_ERROR",check as TChecks)
            // process.exit(1)
          }
          break;
        // case ts.SyntaxKind.ForStatement:
        // case ts.SyntaxKind.ForInStatement:
        // case ts.SyntaxKind.WhileStatement:
        // case ts.SyntaxKind.DoStatement:
        //   if ((node as ts.IterationStatement).statement.kind !== ts.SyntaxKind.Block) {
        //     reportError(
        //       node,
        //       'A looping statement\'s contents should be wrapped in a block body.'
        //     );
        //   }
        //   break;
  
        // case ts.SyntaxKind.IfStatement:
        //   const ifStatement = node as ts.IfStatement;
        //   if (ifStatement.thenStatement.kind !== ts.SyntaxKind.Block) {
        //     reportError(ifStatement.thenStatement, 'An if statement\'s contents should be wrapped in a block body.');
        //   }
        //   if (
        //     ifStatement.elseStatement &&
        //     ifStatement.elseStatement.kind !== ts.SyntaxKind.Block &&
        //     ifStatement.elseStatement.kind !== ts.SyntaxKind.IfStatement
        //   ) {
        //     reportError(
        //       ifStatement.elseStatement,
        //       'An else statement\'s contents should be wrapped in a block body.'
        //     );
        //   }
        //   break;
        // case ts.SyntaxKind.BinaryExpression:
        //   const op = (node as ts.BinaryExpression).operatorToken.kind;
        //   if (op === ts.SyntaxKind.EqualsEqualsToken || op === ts.SyntaxKind.ExclamationEqualsToken) {
        //     // reportError(node, 'Use \'===\' and \'!==\'.');
        //   }
        //   break;
      }
  
      ts.forEachChild(node, delintNode);
    }
  
    if(ErrorExist.state){
      process.exit(1)
    }
  
  }