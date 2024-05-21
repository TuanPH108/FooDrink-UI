document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".jsFilter").addEventListener("click", function () {
    document.querySelector(".filter-menu").classList.toggle("active");
  });

  document.querySelector(".grid").addEventListener("click", function () {
    document.querySelector(".list").classList.remove("active");
    document.querySelector(".grid").classList.add("active");
    document.querySelector(".products-area-wrapper").classList.add("gridView");
    document
      .querySelector(".products-area-wrapper")
      .classList.remove("tableView");
  });

  document.querySelector(".list").addEventListener("click", function () {
    document.querySelector(".list").classList.add("active");
    document.querySelector(".grid").classList.remove("active");
    document
      .querySelector(".products-area-wrapper")
      .classList.remove("gridView");
    document.querySelector(".products-area-wrapper").classList.add("tableView");
  });

  var modeSwitch = document.querySelector(".mode-switch");
  modeSwitch.addEventListener("click", function () {
    document.documentElement.classList.toggle("light");
    modeSwitch.classList.toggle("active");
  });

  const openDetailFormButton = document.getElementById("openDetailFormButton");
  const overlayForm = document.getElementById("overlayForm");

  if (openDetailFormButton && overlayForm) {
    openDetailFormButton.addEventListener("click", () => {
      overlayForm.style.display = "block";
    });
  }

  const imgs = document.querySelectorAll(".img-select a");
  const imgBtns = [...imgs];
  let imgId = 1;

  imgBtns.forEach((imgItem) => {
    imgItem.addEventListener("click", (event) => {
      event.preventDefault();
      imgId = imgItem.dataset.id;
      slideImage();
    });
  });

  function slideImage() {
    const displayWidth = document.querySelector(
      ".img-showcase img:first-child"
    ).clientWidth;

    document.querySelector(".img-showcase").style.transform = `translateX(${
      -(imgId - 1) * displayWidth
    }px)`;
  }
  window.addEventListener("resize", slideImage);
});
