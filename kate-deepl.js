/* kate-script
 * author: b606 <b606@gmail.com>
 * license: LGPL
 * revision: 1
 * kate-version: 3.4
 * functions: deepLtranslate
 * 
 * 2018-08-17
 */

var katescript = {
    "author": "b606 <b606@gmail.com>",
    "license": "LGPL",
    "revision": 1,
    "kate-version": "3.4",
    "functions": ["deepLtranslate"],
    "actions": [
        {   "function": "deepLtranslate",
            "name": "Translate Selected Text",
            "category": "Editing",
            "shortcut": "Ctrl+Shift+Alt+T",
            "interactive": "false"
        }
    ]
}; // kate-script-header, must be at the start of the file without comments

// required katepart js libraries
require ("range.js");

// Bits from node_modules/deepl-translator/example.js
// Result in SyntaxError: Parse error
// const {
//   translate,
//   detectLanguage,
//   wordAlternatives,
//   translateWithAlternatives,
// } = require("deepl-translator.js");

// Result in SyntaxError: Parse error
// <global>() at /home/b606/.local/share/katepart5/script/commands/kate-deepl.js:41
require("deepl-translator.js");

function deepLtranslate()
{
    var selection = view.selection();
    var cursor = view.cursorPosition();
    if (selection.isValid() && selection.onSingleLine()) {
        var text = document.text(selection);
        var text_to_translate = trim_rwvars(text);
        var translated_text = text_to_translate;
        debug(text);
        debug(text_to_translate);
//         translateWithAlternatives(text_to_translated, 'FR' )
        debug(translate(text_to_translate, 'EN', 'FR'));
        
        /* Bits from the example.js in node_modules/deepl-translate
        translated_text = res.translation;
        translate(text_to_translate, 'EN', 'FR' )
            .then(res =>
                console.log(
                `Translation alternatives: ${res.translationAlternatives.join('/ ')}`
                );
                translated_text = res.translation;
            )
            .catch(console.error);
        */
        document.editBegin();
        document.removeText(selection);
        document.insertText(selection.start, translated_text);
        document.editEnd();
        var size_diff = translated_text.length - text.length;
        selection.end.column += size_diff;
        view.setSelection(selection);
        if (selection.start.column < cursor.column) {
            cursor.column += size_diff;
        }
        view.setCursorPosition(cursor);
    }
}

function action(cmd)
{
    var a = new Object();
    a.icon = "edit-find-replace";
    a.category = i18n("Editing");
    a.interactive = false;
    if (cmd == "deepLtranslate") {
        a.text = i18n("Translate Selected Text");
        a.shortcut = "Ctrl+Shift+ALt+T";
    }

    return a;
}

function help(cmd)
{
    if (cmd == "deepLtranslate") {
        return i18n("Sort the selected text or whole document.");
    }
}

// kate: space-indent on; indent-width 4; replace-tabs on;
