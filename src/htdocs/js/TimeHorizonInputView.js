'use strict';

var SelectedCollectionView = require('mvc/SelectedCollectionView'),
    Util = require('util/Util'),
    Events = require('util/Events');

var TimeHorizonInputView = function (params) {
  var _this,
      _initialize,

      _timeHorizonInput,

      _updateTimeHorizon,
      _validateTimeHorizon;

  _this = SelectedCollectionView(params);

  _initialize = function () {

    _this.el.innerHTML =
        '<label for="basic-time-horizon-view">Time Horizon</label>' +
        '<small class="help">Return period in years</small>' +
        '<input type="text" id="basic-time-horizon-view"/>';

    _timeHorizonInput = _this.el.querySelector('#basic-time-horizon-view');
    _timeHorizonInput.addEventListener('change', _updateTimeHorizon);

    _timeHorizonInput.addEventListener('change', _validateTimeHorizon);
    Events.on('validate', _validateTimeHorizon);

    _this.render();
  };


  // Updates timeHorizon on the model
  _updateTimeHorizon = function () {
    var timeHorizonInputValue;

    if (_this.model) {
      if (_timeHorizonInput.value) {
        timeHorizonInputValue = parseInt(_timeHorizonInput.value, 10);
        if (timeHorizonInputValue >= 1 && timeHorizonInputValue <= 5000) {
          _this.model.set({
            'timeHorizon': timeHorizonInputValue
          });
          return;
        }
      }
      _timeHorizonInput.focus();

    }
  };

  /**
   * [_validateTimeHorizon description]
   * @return {[type]} [description]
   */
  _validateTimeHorizon = function () {
    var timeHorizonInputValue;

    if (_this.model) {
      if (_timeHorizonInput.value) {
        timeHorizonInputValue = parseInt(_timeHorizonInput.value, 10);
        if (timeHorizonInputValue >= 1 && timeHorizonInputValue <= 5000) {
          Events.trigger('remove-errors', {
            'input': 'timeHorizon'
          });
          _timeHorizonInput.className = '';
        } else {
          _timeHorizonInput.className = 'alert error';
          Events.trigger('add-errors', {
            'input': 'timeHorizon',
            'messages': [
              'The Time Horizon value must be >= 1 and <= 5,000'
            ]
          });
        }
      }
    }
  };

  _this.render = function () {
    if (_this.model) {
      _timeHorizonInput.value = _this.model.get('timeHorizon');
    }
  };

  // Destroy all the things
  _this.destroy = Util.compose(function () {
    _timeHorizonInput.removeEventListener('change', _updateTimeHorizon);

    _initialize = null;
    _this = null;
    _timeHorizonInput = null;
    _updateTimeHorizon = null;
    _validateTimeHorizon = null;
  }, _this.destroy);

  _initialize();
  params = null;
  return _this;
};

module.exports = TimeHorizonInputView;
