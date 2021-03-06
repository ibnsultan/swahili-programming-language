const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");
const feedbackMessages = require("../../feedbackMessages.js");

class KwNodeKuro extends BaseNode {
    getNode () {
        if (KwNodeKuro.isExpectedKuroStatement(this)) {
            return KwNodeKuro.getParsedKuroNode(this);
        }

        this.throwError(feedbackMessages.unexpectedDeclaration(constants.KW.VUNJA));
    }

    static isExpectedKuroStatement (context) {
        return context.getBlockTypeStack().includes(constants.KW.HAKIKA) ||
                                            context.getBlockTypeStack().includes(constants.KW.WAKATI);
    }

    static getParsedKuroNode (context) {
        const node = {};
        node.operation = context.lexer().next().value;
        context.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);

        return node;
    }
}

module.exports = new KwNodeKuro();
