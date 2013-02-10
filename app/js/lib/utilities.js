define(['jquery'], function($){
  var utilities = {
    getTodayDate: function(){
      var now = new Date();
      var month = 1+now.getMonth();
      var date = now.getDate();

      month = month < 10 ? "0"+month : month;
      date = date < 10 ? "0"+date : date;
      
      var today = month+"/"+date+"/"+now.getFullYear();
      return today;
    }
  };

  return utilities;
});