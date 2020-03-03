var baseUrl = "http://localhost:3000/";
$(document).ready(function() {
  $("form").submit(function(event) {
    event.stopPropagation();
    event.stopPropagation;
    var tmpData = $("form").serializeArray(),
      data = {};
    $.each(tmpData, function() {
      data[this.name] = this.value;
    });
    console.log(data, "data");
    var settings = {
        data: JSON.stringify(data),
        error: function(error) {
          console.log(error, "res");
          return;
        },
        success: function(data, textStatus) {
          console.log(data, "res");
          return;
        }
      },
      url = baseUrl + "login";
    $.ajax(url, settings);
    return;
  });
});
