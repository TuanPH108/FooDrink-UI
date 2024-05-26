const activeButton = document.getElementById("ative-btn") as HTMLButtonElement;
activeButton.addEventListener("click", (event: MouseEvent) =>{
  if(activeButton.textContent === "Block")
  {
    activeButton.textContent = "Active";
  }
  else
  {
    activeButton.textContent = "Block";
  }
})