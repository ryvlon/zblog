var baseUrl = "http://localhost:3000/";

$(document).ready(function() {
  var $form = $("#form");
  $form.submit(function(e) {
    var tempData = $form.serializeArray(),
      data = {};
    $.each(tempData, function(i, item) {
      data[item.name] = item.value;
    });
    var settings = {
        method: "GET",
        data: data,
        error: function(error) {
          alert("登陆失败：" + error.responseText);
          return;
        },
        success: function(data, textStatus) {
          console.log(data, "res");
        //   location.url = "./home.html";
          window.location.href = '../html/home.html'
          return;
        }
      },
      url = baseUrl + "user/login";
    $.ajax(url, settings);
    e.preventDefault();
  });
});
