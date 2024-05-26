const activeButton = document.getElementById("ative-btn");
activeButton.addEventListener("click", (event) => {
  if (activeButton.textContent === "Block") {
    activeButton.textContent = "Active";
  } else {
    activeButton.textContent = "Block";
  }
});
