const toggleInputs = document.querySelectorAll(".switch-wrapper input");
const oneTimeInput = document.getElementById("one-time");
const monthlyInput = document.getElementById("monthly");
const oneTimePrice = document.getElementById("one-time-price");
const monthlyPrice = document.getElementById("monthly-price");


oneTimeInput.addEventListener("input", () => {
  oneTimePrice.classList.remove("hidden");
  monthlyPrice.classList.add("hidden");
});

monthlyInput.addEventListener("input", () => {
  monthlyPrice.classList.remove("hidden");
  oneTimePrice.classList.add("hidden");
});
