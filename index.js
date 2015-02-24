/**
 * Using json translation files with standard translation solution
 * @url https://github.com/mashpie/i18n-node
 */
module.exports.extension = function() {
    "use strict";

    global.i18n = require('i18n');

    var app = twee.getApplication()
        , initOptions = twee.getConfig('twee:extension:twee-i18n:init');

    initOptions["updateFiles"] = (app.get('env') == 'development' && twee.getConfig('twee:extension:twee-i18n:autoUpdate'));
    i18n.configure(initOptions);

    app.use(i18n.init);

    app.use(function (req, res, next) {
        app.locals.tr = global.tr = res.__;
        app.locals.tr = global.trn = res.__n;
        app.locals.i18n = global.i18n = i18n;
        next();
    });
};

module.dependencies = {
    "HTTP Parser": {
        "module": "twee-http-parser-extension"
    }
};


module.exports.configNamespace = 'twee-i18n';

module.exports.config = {
    "init": {
        locales:['en', 'ru']
        , defaultLocale: 'en'
        , cookie: 'locale'
        , directory: 'i18n'
        , updateFiles: false
    },
    "autoUpdate": false
};
