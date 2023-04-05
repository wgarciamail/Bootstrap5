function sendAddress(){
    let addressInformation = document.getElementById("addressData");
    let numberData = document.getElementById("numberData");
    numberData.classList.remove("hidden");
    addressInformation.classList.add("hidden");
}
function sendNumber(){
    let numberData = document.getElementById("numberData");
    let successInformation = document.getElementById("success-information");
    successInformation.classList.remove("hidden")
    numberData.classList.add("hidden");
}

function takePhoneNumber(){
    console.log("recibiendo informacion desde la ventana modal");
    let phoneNumber = document.getElementById("phoneNumber").value;
    let validationNumber = document.getElementById("validationNumber");
    let numberData = document.getElementById("numberData");
    let exampleModalLabel = document.getElementById("exampleModalLabel");
    if (phoneNumber == null || phoneNumber == ""){
        phoneNumber = Math.floor(Math.random() * 5000) + 1;
    }

    document.getElementById("phoneNumeberRecived").innerHTML = phoneNumber;
    validationNumber.classList.remove("hidden");
    numberData.classList.add("hidden");
    exampleModalLabel.innerHTML = "Ingrese su código de validación."

}
/* 
function raiseModal(){
    var myModal = new bootstrap.Modal(document.getElementById("verifyCodeModal"), {});
    document.onclick = function () {
    myModal.show();
    };
} */