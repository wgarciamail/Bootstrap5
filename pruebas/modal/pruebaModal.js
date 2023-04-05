function sendAddress() {
    let addressInformation = document.getElementById("addressData");
    let numberData = document.getElementById("numberData");
    numberData.classList.remove("hidden");
    addressInformation.classList.add("hidden");
}
function sendNumber() {
    let numberData = document.getElementById("numberData");
    let successInformation = document.getElementById("success-information");
    successInformation.classList.remove("hidden")
    numberData.classList.add("hidden");
}