define(['jquery'], function($){
  return utilities = {
    getTodayDate: function(){
      var now = new Date();
      var today = ( x = 1+now.getMonth(), x < 10 ? "0"+x : x)+"/"+now.getDate()+"/"+now.getFullYear();
      return today;
    }
  }
})