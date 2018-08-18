# katescript-deepL
Using DeepL translator within kate

1. Verify the version of node.js: Required version > 6.0 (for debian stretch, install from the backport repository)
2. Install yarn (see https://yarnpkg.com/en/docs/install)
3. Install files from https://github.com/vsetka/deepl-translator using the recommended method
`yarn add deepl-translator`
4. Put the katescript-deepL file in `~/.local/share/katepart5/script/commands` (see https://docs.kde.org/stable5/en/applications/katepart/dev-scripting.html)
5. Modify the require() line to make accessible from kate-deepl.js the functions in the newly installed deepl-translator javascript files.

TODO:
- make DeepL fully functional.
- implement a method where the user is able to select one of the translation alternatives.
- implement a method to set the default target language for translation. DeepL can detect the text original language by using `'auto'`. As of now, DeepL recognises 'EN', 'DE', 'FR', 'ES', 'IT', 'NL', and 'PL'. 
- long term, use other translation services (why not google translate etc.?)
