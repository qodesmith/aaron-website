function dateConversion(date) {
  if (Object.prototype.toString.call(date) !== '[object Date]') {
    throw new TypeError('You must provide a valid Date object.');
  }

  var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  // FEBRUARY 26, 2016
  // .getDay      => 0 (0 - 6)
  // .getMonth    => 7
  // .getDate     => 7 (1 - 31)
  // .getFullYear => 2016

  return [
    days[date.getDay()], // ex. 'Sunday'
    ', ',
    months[date.getMonth()], // ex. 'August'
    ' ',
    date.getDate(), // ex. '7'
    ', ',
    date.getFullYear() // ex. '2016'
  ].join('');
}
