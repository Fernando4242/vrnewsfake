//Animation on Cards
var dark = false;

// $(".card").addClass("animated bounce")
$("#local-one").addClass("animated zoomIn");
$("#local-two").addClass("animated zoomIn");

//Animation on Main Content
$(".main-content").addClass("animated");

// Functions For Articles
function home() {
  $("#local-article").addClass("d-none");
  $("#local-one").addClass("d-none");
  $("#local-two").addClass("d-none");
}

function articleone() {
  $("#local-article").removeClass("d-none");
  $("#local-one").removeClass("d-none");
  $("#local-two").addClass("d-none");
  window.scrollBy(0,700);
}

function articletwo() {
  $("#local-article").removeClass("d-none");
  $("#local-one").addClass("d-none");
  $("#local-two").removeClass("d-none");
  window.scrollBy(0,700);
}

//Implement those functions
$(".article-home").on("click", home);
$(".article-one-link").on("click", articleone);
$(".article-two-link").on("click", articletwo);

$("#one-art").on("click", articleone);
$("#two-art").on("click", articletwo);

//DarkMode
function DarkMode() {
  if (dark === true) {
    $("body").removeClass("dark-mode");
    $("#dark-on-off").removeClass("btn-light");
    $("#dark-on-off").addClass("btn-dark");
    $("#dark-on-off").text("Dark Mode");
    dark = false;
    localStorage.setItem("theme", false);
  } else if (dark === false) {
    $("body").addClass("dark-mode");
    $("#dark-on-off").removeClass("btn-dark");
    $("#dark-on-off").addClass("btn-light");
    dark = true;
    $("#dark-on-off").text("Light Mode");
    localStorage.setItem("theme", true);
  }
}

$("body").prepend('<div id="preloader"> <h1>Loading...</h1></div>');

$(document).ready(function () {
  if (
    localStorage.getItem("theme") != null &&
    localStorage.getItem("theme") === "true"
  ) {
    DarkMode();
  } else {
    localStorage.setItem("theme", dark);
  }
  $("#preloader").remove();
});

//Weather API
window.onload = function () {
  //WRITE MY NAME IN EACH ARTICLE and MY LIST OF AUTOMATED STUFF HUEHUE CAUSE ITS COOL
  $(".author").text(`By Fernando Portillo, NewsFake`);
  $(".img-author img").attr(
    `src`,
    `images/dont_worry_about_this_folder/me.jpg`
  );
  $(".source").text("Credits");

  if (localStorage.getItem("theme") == null) {
    alert(
      "This articles are based on other articles credits are in the credits button at the bottom, Thank you!"
    );
  }

  function getWeatherJSON() {
    const url =
      "https://api.openweathermap.org/data/2.5/weather?id=4684888&units=imperial&appid=a04b387edaf9a8431334ad8a28467935";
    $.getJSON(url).done((res) => {
      var iconID = res.weather[0].icon;
      var temperature = Math.round(res.main.temp);
      var cloudy = res.clouds.all;
      var windSpeed = Math.round(res.wind.speed);
      var humidity = res.main.humidity;

      var today = new Date();
      var date = new Date().toDateString();
      var h = today.getHours();

      $(".time").text(date);
      $("#description").text(`${res.weather[0].description}`);
      $(".location").text(`${res.name}, Texas ${res.sys.country}`);
      $("#icon").attr(
        `src`,
        `http://openweathermap.org/img/wn/${iconID}@2x.png`
      );
      $(".display").text(`${temperature}`);
      $("#cloudy").text(`Cloudiness: ${cloudy}%`);
      $("#humidity").text(`Humidity: ${humidity}%`);
      $("#wind").text(`Wind: ${windSpeed} mph`);

      console.log("api call");
    });

    setInterval(() => {
      //GET THE TIME AND DATE
      var today = new Date();
      var h = today.getHours();
      var m = today.getMinutes();
      var s = today.getSeconds();
      dd = "AM";

      if (6 <= h && h <= 10) {
        //Morning
        $(".jumbotron").css(
          "background-image",
          "url(" + "images/jumbo/morning.jpg" + ")"
        );
      } else if (11 <= h && h <= 17) {
        //day
        $(".jumbotron").css(
          "background-image",
          "url(" + "images/jumbo/day.jpg" + ")"
        );
      } else if (h >= 17 || h < 6) {
        //night
        $(".jumbotron").css(
          "background-image",
          "url(" + "images/jumbo/night.jpg" + ")"
        );
      }

      //CONVERT TO 12 HOUR
      if (h >= 12) {
        h = h - 12;
        dd = "PM";
      } else if (h == 0) {
        h = 12;
      }

      //ADDS ZERO WHEN ITS SINGLE DIGIT
      h = checkTime(h);
      m = checkTime(m);
      s = checkTime(s);

      //DISPLAYS HOUR
      $(".hour").text(`${h} : ${m} : ${s} ${dd}`);
    }, 1000);
  }

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  function getImageAd() {
    const width = 900;
    const height = 250;
    const collectionID = 1999207;

    const url = `https://source.unsplash.com/collection/${collectionID}/${width}x${height}`;
    
    fetch(url).then((res) => {
      var imageURL = res.url;
      $("#headerAd").attr(`src`, `${imageURL}`);
    });

    
  }

  getImageAd();
  getWeatherJSON();

  $(".social").hover(
    function () {
      $(this).addClass("animated pulse");
      $(this).css("padding", "30px");
    },
    function () {
      $(this).removeClass("animated pulse");
      $(this).css("padding", "20px");
    }
  );

  //LAST MODIFIED
  var modified = document.lastModified;
  $(".last-modified").text(`Last updated ${modified}`);

  $("#dark-on-off").on("click", DarkMode);
};

//Makes overlay in home page appear or disappear
setInterval(() => {
  var scrolly = window.pageYOffset / 600;
  $(".card-img-overlay").css("opacity", `${scrolly}`);
});

//The Sources I Used
function openSource() {
  $("#display-sources").removeClass("d-none");
}

function closeSource() {
  $("#display-sources").addClass("d-none");
}

$(".source").on("click", openSource);
$("#close-source").on("click", closeSource);
