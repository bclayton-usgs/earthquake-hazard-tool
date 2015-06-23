'use strict';

var SelectedCollectionView = require('mvc/SelectedCollectionView'),

    Util = require('util/Util');

var TIME_HORIZONS = [
  {
    'id': 2475,
    'value': 2475,
    'display': '2% in 50 years',
    'displayorder': 0
  },
  {
    'id': 475,
    'value': 475,
    'display': '10% in 50 years',
    'displayorder': 1
  }
];

/**
 * Displays a collection of Time Horizons in a collection select box,
 * The collection of time horizons updates when the selected analysis
 * in the collection of analyses changes.
 *
 * timeHorizonSelectView({
 *   el: document.createElement('div'),
 *   collection: Collection([Analysis])
 * });
 *
 * @param {[type]} params [description]
 */
var timeHorizonSelectView = function (params) {

  var _this,
      _initialize,

      _buttonGroup,

      _setSliderValue,
      _updateTimeHorizon;

  _this = SelectedCollectionView(params);

  /**
   * @constructor
   */
  _initialize = function () {
    var buttons = [],
        options,
        i;

    options = TIME_HORIZONS;

    for(i = 0; i < options.length; i++) {
      buttons.push('<button value="' + options[i].value + '"">' +
          options[i].display + '</button>');
    }

    _buttonGroup = document.createElement('div');
    _buttonGroup.className = 'button-group';
    _buttonGroup.innerHTML = buttons.join('');

    // bind to click on the button group
    _buttonGroup.addEventListener('click', _updateTimeHorizon);

    _this.el.appendChild(_buttonGroup);
  };

  /**
   * update the currently selected Analysis model with
   * the time horizon value from the button that was clicked
   */
  _updateTimeHorizon = function (e) {
    var timeHorizon = e.target.value;

    if (_this.model) {
      _this.model.set({'timeHorizon': parseInt(timeHorizon, 10)});
    }
  };

  /**
   * Calls CollectionSelectBox.destroy() and cleans up local variables
   */
  _this.destroy = Util.compose(function () {
    // unbind
    _buttonGroup.removeEventListener('click', _updateTimeHorizon);
    // methods
    _setSliderValue = null;
    _updateTimeHorizon = null;
    // variables
    _buttonGroup = null;
    _this = null;
    _initialize = null;
  }, _this.destroy);


  _initialize(params);
  params = null;
  return _this;

};

module.exports = timeHorizonSelectView;