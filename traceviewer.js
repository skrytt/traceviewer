window.addEventListener('load', function() {
  var app = new Vue({
      el: '#app',
      data: {
          message: 'Welcome! The time is ' + new Date().toLocaleString()
      }
  });
})
