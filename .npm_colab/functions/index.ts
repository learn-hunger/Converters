
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
        const enumNode = node as ts.EnumDeclaration;
        const checkEnumIdentifer = EChecks[EChecks.ENUM_IDENTIFIER];
        if (LHLint[checkEnumIdentifer as TChecks] && !CCheckRegex.ENUM_IDENTIFIER.test(enumNode.name.getText())) {
          reportBlock(sourceFile, node, "IDENTIER_ERROR", checkEnumIdentifer as TChecks)
        }

        break;
      case ts.SyntaxKind.TypeAliasDeclaration:
        const typeNode = node as ts.TypeAliasDeclaration;
        const checkTypeIdentier = EChecks[EChecks.TYPE_IDENTIFER];
        if (LHLint[checkTypeIdentier as TChecks] && !CCheckRegex.TYPE_IDENTIFER.test(typeNode.name.getText())) {
          reportBlock(sourceFile, node, "IDENTIER_ERROR", checkTypeIdentier as TChecks)
        }
        break;
      case ts.SyntaxKind.VariableDeclaration:
        const identifierNode = node as ts.VariableDeclaration;
        switch (identifierNode.parent.flags) {
          case ts.NodeFlags.Const:
            const checkConstIdentier = EChecks[EChecks.CONST_IDENTIFIER];
            if (LHLint[checkConstIdentier as TChecks] && !CCheckRegex.CONST_IDENTIFIER.test(identifierNode.name.getText())) {
              reportBlock(sourceFile, node, "IDENTIER_ERROR", checkConstIdentier as TChecks)
            }
            break;

        }
        break;
      case ts.SyntaxKind.InterfaceDeclaration:
        const interfaceNode = node as ts.InterfaceDeclaration;
        const checkInterfaceIdentier = EChecks[EChecks.INTERFACE_IDENTIFIER];
        if (LHLint[checkInterfaceIdentier as TChecks] && !CCheckRegex.INTERFACE_IDENTIFIER.test(interfaceNode.name.getText())) {
          reportBlock(sourceFile, node, "IDENTIER_ERROR", checkInterfaceIdentier as TChecks)
        }
        break;
      case ts.SyntaxKind.ModuleDeclaration:
        const namespaceNode = node as ts.NamedDeclaration;
        const checkNamespaceIdentier = EChecks[EChecks.NAMESPACE_IDENTIFER];
        if (LHLint[checkNamespaceIdentier as TChecks] && !CCheckRegex.NAMESPACE_IDENTIFER.test(namespaceNode.name?.getText()!)) {
          reportBlock(sourceFile, node, "IDENTIER_ERROR", checkNamespaceIdentier as TChecks)
        }
        break;

      case ts.SyntaxKind.ClassDeclaration:
        const classNode = node as ts.ClassDeclaration;
        const checkClassIdentier = EChecks[EChecks.CLASS_IDENTIFIER];
        const classAbstractModifiers = classNode.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.AbstractKeyword)

        if (classAbstractModifiers && LHLint[checkClassIdentier as TChecks] && !CCheckRegex.ABSTRACT_IDENTIFIER.test(classNode.name?.getText()!)) {
          reportBlock(sourceFile, node, "IDENTIER_ERROR", EChecks[EChecks.ABSTRACT_IDENTIFIER] as TChecks)
          break;
        }
        if (LHLint[checkClassIdentier as TChecks] && !CCheckRegex.CLASS_IDENTIFIER.test(classNode.name?.getText()!)) {
          reportBlock(sourceFile, node, "IDENTIER_ERROR", checkClassIdentier as TChecks)
        }
        break;

    }

    ts.forEachChild(node, delintNode);
  }

  if (ErrorExist.state) {
    process.exit(1)
  }

}