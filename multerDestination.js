module.exports = function multerDestination() {
  var date = new Date();
  var month = date.getMonth();
  var year = date.getFullYear();

  month = month > 9 ? month : '0' + month;

  return [
    '/images/blog/',
    month,
    '-',
    year
  ].join('');
}
