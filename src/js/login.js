// (function() {
//   /**
//    * addEventListener: HTML DOM 方法
//    */
//   window.addEventListener(
//     "load",
//     function() {
//       console.log("load");
//       var forms = document.getElementsByClassName("needs-validation");
//       var validation = Array.prototype.filter.call(forms, function(form) {
//         form.addEventListener(
//           "submit",
//           function(event) {
//             console.log("submit");
//             event.preventDefault();
//             event.stopPropagation();
//             form.classList.add("was-validated");
//             if (form.checkValidity() === false) {
//               return false;
//             }

//             return;
//           },
//           false
//         );
//       });
//     },
//     false
//   );
// })();
$(document).ready(function() {
  $("form").submit(function() {});
});
