Refine.DigitaliserImportingSourceUI=function(controller) {
  this._controller = controller;
}


Refine.DigitaliserImportingSourceUI.prototype.attachUI = function(bodyDiv) {
  var self = this;

  bodyDiv.html(DOM.loadHTML("digitaliser", "scripts/index/import-from-computer-form.html"));

  this._elmts = DOM.bind(bodyDiv);
  this._elmts.nextButton.click(function(evt) {
    if (self._elmts.fileInput[0].files.length === 0) {
      window.alert("You must specify a data file to import.");
    } else {
      self._controller.startImportJob(self._elmts.form, "Uploading data ...");
    }
  });
};

Refine.DigitaliserImportingSourceUI.prototype.focus = function() {
};
