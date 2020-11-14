let tab = document.querySelectorAll(".tab");
let contentsIdAll = document.querySelectorAll(".catalog__content");
for (i = 0; i < contentsIdAll.length; i++) {
  contentsIdAll[i].setAttribute("data-tab", i + 1);
}
let tabsALL = document.querySelectorAll(".tabs .tab");
for (i = 0; i < tabsALL.length; i++) {
  tabsALL[i].setAttribute("data-tab", i + 1);
}
// TABS WITH JS ONLY
for (i of tab) {
  i.addEventListener("click", function (event) {
    if (!event.currentTarget.classList.contains("tab_active")) {
      let dataTab = this.getAttribute("data-tab"),
        content = document.querySelector('.catalog__content[data-tab="' + dataTab + '"]');

      let activeTab = document.querySelector("li.tab_active");
      let activeContent = document.querySelector("div.catalog__content_active");

      activeTab.classList.remove("tab_active");
      this.classList.add("tab_active");

      activeContent.classList.remove("catalog__content_active");
      content.classList.add("catalog__content_active");
    }
  });
}

$(document).ready(function () {
  // ВаРИАНТ УЧИТЕЛЯ С БИБЛЕОТЕКОЙ

  $(".carousel__inner").slick({
    speed: 1000,
    adaptiveHeight: false,
    fade: true,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="icons/leftArrow.png"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="icons/rightArrow.png"></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          dots: true,
          arrows: false,
          
        },
      },
    ],
  });
  
// TABI JQUERY
  // $("ul.tabs").on("click", "li:not(.tab_active)", function () {
  //   $(this).addClass("tab_active").siblings().removeClass("tab_active");
  // });

  // $("[data-action='jsFurtherGo']").on('click', function(event){
  //   event.preventDefault();
  //   $(this).closest('div.catalog-item__content').removeClass('catalog-item__content_active').closest('div.catalog__wrapper').find('.catalog__list').addClass('catalog__list_active');

  // });
  // $('[data-action="jsFurtherBack"]').on('click', function(event) {
  //   event.preventDefault();
  //   $(this).closest('ul.catalog__list').removeClass('catalog__list_active').closest('div.catalog__wrapper').find('.catalog-item__content').addClass('catalog-item__content_active');
  // });

  // 
  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on("click", function (event) {
        event.preventDefault();
        $(".catalog-item__content").eq(i).toggleClass("catalog-item__content_active");
        $(".catalog__list").eq(i).toggleClass("catalog__list_active");
      });
    });
  }
  toggleSlide('[data-action="jsFurtherGo"]');
  toggleSlide('[data-action="jsFurtherBack"]');

  // $("#order").on("change", function () {
  //   let inputText = $(this).val();
  //   $("#jsSubmit").on("click", function () {
  //     if (inputText != "") {
  //       $(".tabs").prepend(`<li class="tab"><div>${inputText}</div></li>`);
  //     }
  //     inputText = "";
  //   });
  //   $(this).val("").focus();

  // });

  // $("#jsDelete").on("click", function () {
  //   $(".tab").each(function () {
  //     if ($(this).hasClass("tab_active")) {
  //       $(this).remove();
  //     }
  //   });
  // });

  // MODAL

  $('[data-modal="consultation"]').on("click", function () {
    $(".overlay, #consultation").fadeIn(500);
  });

  $(".modal__close").on("click", function () {
    $(".overlay, #consultation, #order, #thanks").fadeOut(500);
  });

  $(".button_mini").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__descr").text($(".catalog-item__subtitle").eq(i).text());
      $(".overlay, #order").fadeIn(500);
    });
  });
  

  // fixed header
  let promoH = $(".promo").innerHeight();
  let scrollTop = $(window).scrollTop();
  scrollCheck(promoH, scrollTop);
  $(window).on("scroll resize", function () {
    promoH = $(".promo").innerHeight();
    scrollTop = $(window).scrollTop();
    scrollCheck(promoH, scrollTop);
  });

  
  function scrollCheck(promoH, scrollTop) {
    if (scrollTop >= promoH) {
      $(".header").addClass("fixed");
      $(".pageup").fadeIn(500);
      $(".pageup").addClass("pageup_active");
    } else {
      $(".header").removeClass("fixed");
      $(".pageup").fadeOut(500);
      $(".pageup").removeClass("pageup_active");
    }
  }


  // animate scroll
  $(".promo__link a").on("click", function (e) {
    e.preventDefault();
    let offsetTop = $(".catalog").offset().top;
    $("html, body").animate({ scrollTop: offsetTop - 75 }, 700);
  });

  $(".pageup").on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 700);
  });

  // МОЙ ВАРИК
  // $('.button_mini').on('click',function() {
  //   let someText = $(this).closest('div.catalog-item__content').find('.catalog-item__subtitle').text();
  //   $('#order .modal__descr').text(someText);
  //   $('.overlay, #order').fadeIn(500);
  // });

  // VALIDATION
  function checkValidate(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        email: {
          required: true,
          email: true,
        },
        phone: "required",
      },
      messages: {
        name: {
          required: "Введите своё имя",
          minlength: jQuery.validator.format(
            "At least {0} characters required!"
          ),
        },
        phone: "Введите свой номер телефона",
        email: {
          required: "Введите свою почту",
          email: "Почта введена неверно",
        },
      },
    });
  }
  checkValidate("#consultation-form");
  checkValidate("#consultation form");
  checkValidate("#order form");
  $("input[name=phone]").mask("+998 (99) 999-99-99", { placeholder: "9" });

  // SUBMIT

  $("form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $("#consultation, #order").fadeOut(500);
      $(".overlay, #thanks").fadeIn(500);

      $("form").trigger("reset");
    });
    return false;
  });
});
// button КУПИТЬ JS ONLY
  // let buttonBuy = document.querySelectorAll('.button_mini');
  // let overlay = document.querySelector('.overlay');
  // let order = document.querySelector('#order');
  // for (i = 0; i < buttonBuy.length; i++) {
  //   buttonBuy[i].addEventListener('click', function(){
  //     overlay.style.display = 'block';
  //     let subTitleCatalogItem = this.closest('.catalog-item').querySelector('.catalog-item__subtitle').textContent;
  //     order.querySelector('.modal__descr').textContent = subTitleCatalogItem;
  //     order.style.display = 'block';
      
  //   });
  // }
// МОЙ ВАРИК
// let slides = document.querySelectorAll('.carousel__slide');
// let i = 0;

// function nextSlide() {
//   slides[i].classList.remove('carousel__slide_active');
//   i = (i + 1) % slides.length;
//   slides[i].classList.add('carousel__slide_active');
// }

// function prevSlide(){
//   slides[i].classList.remove('carousel__slide_active');
//   i = (i - 1 + slides.length) % slides.length;
//   slides[i].classList.add('carousel__slide_active');
// }
