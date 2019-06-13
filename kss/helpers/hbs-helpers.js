module.exports = function(handlebars) {
  handlebars.registerHelper('myHelper', (doc, block) => {
    var output = [];
    var regex = /^(\S+)\s*:\s*(\S+)(?:\s*-\s*(.*))?$/gm;
    var test;

    while ((test = regex.exec(doc)) !== null) {
      this.icon = {};
      this.icon.name = test[1];
      this.icon.character = test[2];
      if (test[3] !== undefined) {
        this.icon.description = test[3];
      }
      output.push(block.fn(this));
    }

    return output.join('');
  });

  handlebars.registerHelper('BuildHtml', (cssClass, el, label) => {
    var construct;
    construct += `<${el} class="${cssClass}">${label}</${el}>`;
    return new handlebars.SafeString(construct);
  });

  handlebars.registerHelper('markup-sample', () => {

    /*
     This overrides {{{markup}}} helper in index.hbs -- not in use yet
    */

    if (!this.markup) {
      return '';
    }

    return this.markup;
  });
};
