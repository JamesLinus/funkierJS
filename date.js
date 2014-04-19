(function() {
  "use strict";


  var makeModule = function(require, exports) {

    var base = require('./base');
    var object = require('./object');
    var curry = base.curry;
    var callProp = object.callProp;


    /*
     * getDayOfMonth: A wrapper around Date.prototype.getDate. Takes a date object,
     *                and returns an integer representing the day of the month (1-31)
     *                of the given date.
     *
     */

    var getDayOfMonth = callProp('getDate');


    /*
     * getDayOfWeek: A wrapper around Date.prototype.getDay. Takes a date object,
     *               and returns an integer representing the day of the week (0-6)
     *               of the given date.
     *
     */

    var getDayOfWeek = callProp('getDay');


    /*
     * getFullYear: A wrapper around Date.prototype.getFullYear. Takes a date object,
     *              and returns an—at time of writing—4 digit number representing the year
     *              of the given date.
     *
     */

    var getFullYear = callProp('getFullYear');


    /*
     * getHours: A wrapper around Date.prototype.getHours. Takes a date object, and returns
     *           an integer representing the hour field (0-23) of the given date.
     *
     */

    var getHours = callProp('getHours');


    /*
     * getMilliseconds: A wrapper around Date.prototype.getMilliseconds. Takes a date object, and
     *                  returns an integer representing the milliseconds field (0-999) of the given date.
     *
     */

    var getMilliseconds = callProp('getMilliseconds');


    /*
     * getMinutes: A wrapper around Date.prototype.getMinutes. Takes a date object, and returns
     *             an integer representing the minutes field (0-59) of the given date.
     *
     */

    var getMinutes = callProp('getMinutes');


    /*
     * getMonth: A wrapper around Date.prototype.getMonth. Takes a date object, and returns
     *           an integer representing the month field (0-11) of the given date.
     *
     */

    var getMonth = callProp('getMonth');


    /*
     * getSeconds: A wrapper around Date.prototype.getSeconds. Takes a date object, and returns
     *             an integer representing the seconds field (0-59) of the given date.
     *
     */

    var getSeconds = callProp('getSeconds');


    /*
     * toEpochMilliseconds: A wrapper around Date.prototype.getTime. Takes a date object, and returns
     *                      the number of milliseconds elapsed since midnight, January 1 1970.
     *
     */

    var toEpochMilliseconds = callProp('getTime');


    /*
     * getTimezoneOffset: A wrapper around Date.prototype.getTimezoneOffset. Takes a date object, and
     *                    returns the delta in minutes between the Javascript environment and UTC.
     *
     */

    var getTimezoneOffset = callProp('getTimezoneOffset');


    /*
     * getUTCDayOfMonth: A wrapper around Date.prototype.getUTCDate. Takes a date object,
     *                   and returns an integer representing the day of the month (1-31)
     *                   of the given date adjusted for UTC.
     *
     */

    var getUTCDayOfMonth = callProp('getUTCDate');


    /*
     * getUTCDayOfWeek: A wrapper around Date.prototype.getUTCDay. Takes a date object,
     *                  and returns an integer representing the day of the week (0-6)
     *                  of the given date adjusted for UTC.
     *
     */

    var getUTCDayOfWeek = callProp('getUTCDay');


    /*
     * getUTCFullYear: A wrapper around Date.prototype.getUTCFullYear. Takes a date object,
     *                 and returns an—at time of writing—4 digit number representing the year
     *                 of the given date adjusted for UTC.
     *
     */

    var getUTCFullYear = callProp('getUTCFullYear');


    /*
     * getUTCHours: A wrapper around Date.prototype.getUTCHours. Takes a date object, and returns
     *              an integer representing the hour field of the given date (0-23) adjusted for UTC.
     *
     */

    var getUTCHours = callProp('getUTCHours');


    /*
     * getUTCMilliseconds: A wrapper around Date.prototype.getUTCMilliseconds. Takes a date object, and
     *                     returns an integer representing the milliseconds field (0-999) of the given
     *                     date adjusted for UTC.
     *
     */

    var getUTCMilliseconds = callProp('getUTCMilliseconds');


    /*
     * getUTCMinutes: A wrapper around Date.prototype.getUTCMinutes. Takes a date object, and returns
     *                an integer representing the minutes field (0-59) of the given date adjusted for UTC.
     *
     */

    var getUTCMinutes = callProp('getUTCMinutes');


    /*
     * getUTCMonth: A wrapper around Date.prototype.getUTCMonth. Takes a date object, and returns
     *              an integer representing the month field (0-11) of the given date adjusted for UTC.
     *
     */

    var getUTCMonth = callProp('getUTCMonth');


    /*
     * getUTCSeconds: A wrapper around Date.prototype.getUTCSeconds. Takes a date object, and returns
     *                an integer representing the seconds field (0-59) of the given date adjusted for UTC.
     *
     */

    var getUTCSeconds = callProp('getUTCSeconds');


    /*
     *
     * toLocaleDateString: A wrapper around Date.prototype.toLocaleDateString. Takes a date object,
     *                     and returns a string representing the date portion of the object, formatted
     *                     according to locale conventions.
     *
     */

    var toLocaleDateString = callProp('toLocaleDateString');


    /*
     *
     * toLocaleString: A wrapper around Date.prototype.toLocaleString. Takes a date object, and returns
     *                 a string representing the object, formatted according to locale conventions.
     *
     */

    var toLocaleString = callProp('toLocaleString');


    /*
     *
     * toLocaleTimeString: A wrapper around Date.prototype.toLocaleTimeString. Takes a date object, and returns
     *                     a string representing the time portion of the object, formatted according to locale conventions.
     *
     */

    var toLocaleTimeString = callProp('toLocaleTimeString');


    /*
     *
     * toDateString: A wrapper around Date.prototype.toDateString. Takes a date object, and returns
     *              and returns a string representing the date portion of the object.
     *
     */

    var toDateString = callProp('toDateString');


    /*
     *
     * toTimeString: A wrapper around Date.prototype.toTimeString. Takes a date object, and returns
     *               a string representing the time portion of the object.
     *
     */

    var toTimeString = callProp('toTimeString');


    /*
     *
     * toISOString: A wrapper around Date.prototype.toISOString. Takes a date object, and returns
     *              a representation of the date in ISO format.
     *
     */

    var toISOString = callProp('toISOString');


    /*
     *
     * toUTCString: A wrapper around Date.prototype.toUTCString. Takes a date object, and returns
     *              a representation of the equivalent date in UTC.
     *
     */

    var toUTCString = callProp('toUTCString');


    /*
     * setDayOfMonth: A wrapper around Date.prototype.setDate. Takes a value between
     *                1 and 31, and a Date object, and sets the day of the month of
     *                to the given value, adjusting if necessary (for example, setting
     *                the day to 31 in a Date whose month is April will set the day to 1
     *                and the month to May). Returns the given date.
     *
     */

    // We cannot use callProp for the setters due to the need to return
    // the given date

    var setDayOfMonth = curry(function(val, d) {
      d.setDate(val);
      return d;
    });


    /*
     * setFullYear: A wrapper around Date.prototype.setFullYear. Takes a value representing
     *              the year, and a Date object, and sets the year to the given value.
     *              Returns the given date.
     *
     */

    var setFullYear = curry(function(val, d) {
      d.setFullYear(val);
      return d;
    });


    /*
     * setHours: A wrapper around Date.prototype.setHours. Takes a value representing
     *           the hour of the day, and sets the hour to the given value, adjusting
     *           if necessary (all values > 23 will move the day forward by hours div 24
     *           days). Returns the given date.
     *
     */

    var setHours = curry(function(val, d) {
      d.setHours(val);
      return d;
    });


    /*
     * setMilliseconds: A wrapper around Date.prototype.setMilliseconds. Takes a value
     *                  representing the milliseconds, and sets the milliseconds to the
     *                  given value, adjusting if necessary (values > 999 may increment
     *                  the seconds field, which may in turn cause an increment of minutes,
     *                  and so on). Returns the given date.
     *
     */

    var setMilliseconds = curry(function(val, d) {
      d.setMilliseconds(val);
      return d;
    });


    /*
     * setMinutes: A wrapper around Date.prototype.setMinutes. Takes a value between 0-59
     *             representing the minutes, and sets the given date's minutes to the
     *             that value. Invalid values will cause a change in other fields: if the
     *             given minutes > 59, then the hours will be incremented by minutes div 60.
     *             This in turn may cause a cascade of increments to other fields.
     *             Returns the given date.
     *
     */

    var setMinutes = curry(function(val, d) {
      d.setMinutes(val);
      return d;
    });


    /*
     * setMonth: A wrapper around Date.prototype.setMonth. Takes a value between 0-11
     *           representing the month, and sets the given date's month to the
     *           that value. Invalid values will cause a change in other fields: if the
     *           given month > 11, then the year will be incremented by month div 12.
     *           Returns the given date.
     *
     */

    var setMonth = curry(function(val, d) {
      d.setMonth(val);
      return d;
    });


    /*
     * setSeconds: A wrapper around Date.prototype.setSeconds. Takes a value between 0-59
     *             representing the seconds, and sets the given date's seconds to the
     *             that value. Invalid values will cause a change in other fields: if the
     *             given seconds > 59, then the minutes will be incremented by seconds div 60.
     *             This in turn may cause a cascade of increments to other fields.
     *             Returns the given date.
     *
     */

    var setSeconds = curry(function(val, d) {
      d.setSeconds(val);
      return d;
    });


    /*
     * setTimeSinceEpoch: A wrapper around Date.prototype.setTime. Takes a value representing
     *                    the number of milliseconds since midnight, January 1, 1970, and a
     *                    date. Simultaneously sets all the fields of the given date to represent
     *                    the date and time that is that many milliseconds since the epoch.
     *                    Returns the given date.
     *
     */

    var setTimeSinceEpoch = curry(function(val, d) {
      d.setTime(val);
      return d;
    });


    /*
     * setUTCDayOfMonth: A wrapper around Date.prototype.setUTCDate. Takes a value between
     *                   1 and 31, and a Date object, and sets the day of the month to the
     *                   local equivalent of the given value. Invalid values will cause a change
     *                   in other fields: for example, changing the day to 31 in a month with 30
     *                   days will increment the month, which may in turn increment the year.
     *                   Returns the given date.
     *
     */

    var setUTCDayOfMonth = curry(function(val, d) {
      d.setUTCDate(val);
      return d;
    });


    /*
     * setUTCFullYear: A wrapper around Date.prototype.setUTCFullYear. Takes a value representing
     *                 the year, and a Date object, and sets the year to the local equivalent of
     *                 the given value. Returns the given date.
     *
     */

    var setUTCFullYear = curry(function(val, d) {
      d.setUTCFullYear(val);
      return d;
    });


    /*
     * setUTCHours: A wrapper around Date.prototype.setUTCHours. Takes a value between 0-23
     *              representing the hour of the day, and sets the hour to the local equivalent
     *              of the given value. Invalid values will cause a change in other fields: if
     *              the value > 23, then the day will be incremented by hours div 24. This may in
     *              turn cause a cascade of increments to other fields. Returns the given date.
     *
     */

    var setUTCHours = curry(function(val, d) {
      d.setUTCHours(val);
      return d;
    });


    /*
     * setUTCMilliseconds: A wrapper around Date.prototype.setUTCMilliseconds. Takes a value
     *                     between 0-999 representing the milliseconds, and sets the milliseconds
     *                     to the local equivalent of the given value. Invalud values will cause
     *                     a change in other fields: if the value > 999, then the seconds will be
     *                     incremented by milliseconds div 1000. This may in turn cause a cascade
     *                     of increments to other fields. Returns the given date.
     *
     */

    var setUTCMilliseconds = curry(function(val, d) {
      d.setUTCMilliseconds(val);
      return d;
    });


    /*
     * setUTCMinutes: A wrapper around Date.prototype.setUTCMinutes. Takes a value between 0-59
     *                representing the minutes, and sets the given date's minutes to the local
     *                equivalent of that value. Invalid values will cause a change in other fields:
     *                if the given minutes > 59, then the hours will be incremented by minutes div 60.
     *                This in turn may cause a cascade of increments to other fields.
     *                Returns the given date.
     *
     */

    var setUTCMinutes = curry(function(val, d) {
      d.setUTCMinutes(val);
      return d;
    });


    /*
     * setUTCMonth: A wrapper around Date.prototype.setUTCMonth. Takes a value between 0-11
     *              representing the month, and sets the given date's month to the local
     *              equivalent of that value. Invalid values will cause a change in other fields
     *              if the given month > 11, then the year will be incremented by month div 12.
     *              Returns the given date.
     *
     */

    var setUTCMonth = curry(function(val, d) {
      d.setUTCMonth(val);
      return d;
    });


    /*
     * setUTCSeconds: A wrapper around Date.prototype.setUTCSeconds. Takes a value between 0-59
     *                representing the seconds, and sets the given date's seconds to the local
     *                equivalent of that value. Invalid values will cause a change in other fields:
     *                if the given seconds > 59, then the minutes will be incremented by seconds div 60.
     *                This in turn may cause a cascade of increments to other fields.
     *                Returns the given date.
     *
     */

    var setUTCSeconds = curry(function(val, d) {
      d.setUTCSeconds(val);
      return d;
    });


    var exported = {
      getDayOfMonth: getDayOfMonth,
      getDayOfWeek: getDayOfWeek,
      getFullYear: getFullYear,
      getHours: getHours,
      getMilliseconds: getMilliseconds,
      getMinutes: getMinutes,
      getMonth: getMonth,
      getSeconds: getSeconds,
      getTimezoneOffset: getTimezoneOffset,
      getUTCDayOfMonth: getUTCDayOfMonth,
      getUTCDayOfWeek: getUTCDayOfWeek,
      getUTCFullYear: getUTCFullYear,
      getUTCHours: getUTCHours,
      getUTCMilliseconds: getUTCMilliseconds,
      getUTCMinutes: getUTCMinutes,
      getUTCMonth: getUTCMonth,
      getUTCSeconds: getUTCSeconds,
      setDayOfMonth: setDayOfMonth,
      setFullYear: setFullYear,
      setHours: setHours,
      setMilliseconds: setMilliseconds,
      setMinutes: setMinutes,
      setMonth: setMonth,
      setSeconds: setSeconds,
      setTimeSinceEpoch: setTimeSinceEpoch,
      setUTCDayOfMonth: setUTCDayOfMonth,
      setUTCFullYear: setUTCFullYear,
      setUTCHours: setUTCHours,
      setUTCMilliseconds: setUTCMilliseconds,
      setUTCMinutes: setUTCMinutes,
      setUTCMonth: setUTCMonth,
      setUTCSeconds: setUTCSeconds,
      toDateString: toDateString,
      toEpochMilliseconds: toEpochMilliseconds,
      toISOString: toISOString,
      toLocaleDateString: toLocaleDateString,
      toLocaleString: toLocaleString,
      toLocaleTimeString: toLocaleTimeString,
      toTimeString: toTimeString,
      toUTCString: toUTCString
    };


    module.exports = exported;
  };


  // AMD/CommonJS foo
  if (typeof(define) === "function") {
    define(function(require, exports, module) {
      makeModule(require, exports, module);
    });
  } else {
    makeModule(require, exports, module);
  }
})();
