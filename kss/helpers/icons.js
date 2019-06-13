module.exports = function (Handlebars) {
  'use strict';

  Handlebars.registerHelper('kssIcons', function (doc, block) {
    var output = [];

    doc.split('\n').forEach( icon=> {
      this.icon = {};
      this.icon.name = icon;
      !!icon && output.push(block.fn(this))
    });

    return output.join('');
  });
};
