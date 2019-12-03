document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems);

  var elems = document.querySelectorAll(".carousel");
  var elems = document.querySelectorAll(".slider");
  var instances = M.Slider.init(elems, {
    height: 700,
    fullWidth: true,
    indicators: false
  });
});
