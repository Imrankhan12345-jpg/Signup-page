var email = document.getElementById("email")
var password = document.getElementById("password")
var contact = document.getElementById("contact")
var submitbtn = document.getElementById("submitbtn")

var check = false

// FIXED: Changed to "keydown" and used modern e.key for absolute stability across browsers
email.addEventListener("keydown", function (e) { 
    submitbtn.disabled = false
    if (e.key !== "Enter") {
        check = false
    }
    if (e.key === "Enter" && check == false) {
        check = true
        var res = ValidatorFunction() 
        if (res == true) {
            Submit()
        }
    }
})

password.addEventListener("keydown", function (e) { 
    submitbtn.disabled = false
    if (e.key === "Enter" && check == false) {
        check = true
        var res = ValidatorFunction()
        if (res == true) {
            Submit()
        }
    }
})

contact.addEventListener("keydown", function (e) { 
    submitbtn.disabled = false
    if (e.key === "Enter" && check == false) {
        check = true
        var res = ValidatorFunction()
        if (res == true) {
            Submit()
        }
    }
})


function ValidatorFunction() {
    // Check all fields, if any field is empty move focus on that field
    if (email.value == "") {
        ShowToastify("Enter email address ")
        email.focus()
        return false
    }
    
    // FIXED: Run email syntax rules before checking password/contact fields
    if (CheckEmailValid() == false) {
        email.focus()
        return false
    }

    else if (password.value == "") {
        password.focus()
        ShowToastify("Enter password")
        return false
    }
    else if (password.value.length < 6) {
        password.focus()
        ShowToastify("Enter at least 6 characters in password")
        return false
    }
    else if (contact.value == "") {
        contact.focus()
        ShowToastify("Enter contact no")
        return false
    }
    else if (!contact.value.startsWith("03")) {
    contact.focus()
    ShowToastify("Please enter number starting with 03")
    return false
    }
    else if (contact.value.length != 11) {
    contact.focus()
    ShowToastify("Please enter an 11-digit Pakistani mobile number")
    return false
    }
    return true
}

function ShowToastify(message) {
    Toastify({
        text: message, 
        duration: 3000, 
        gravity: "top", 
        position: "center", 
        stopOnFocus: false,
        style: {
            background: "linear-gradient(to right, #836031, #1900ff8a)", 
            color: "#ffffff", 
            borderRadius: "8px", 
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)" 
        },
    }).showToast();

    setTimeout(function () { 
        submitbtn.disabled = false
        check = false 
    }, 3000)
}

function Submit() {
    submitbtn.disabled = true
    console.log(email.value)
    var res = ValidatorFunction()
    if (res == true) {
        ShowToastify("Submit Your Form")
        email.value = ""
        password.value = ""
        contact.value = ""
        email.focus()
    }
}

var openeye = document.getElementById("openeye")
var closeeye = document.getElementById("closeeye")

function SetIcon(tag) {
    console.log(tag.classList)
    if (tag.classList.contains("eye-icon-close")) {
        openeye.style.display = "inline"
        closeeye.style.display = "none"
        password.type="text"
    }
    else if (tag.classList.contains("eye-icon-open")) {
        closeeye.style.display = "inline"
        openeye.style.display = "none"
        password.type="password"
    }
}

// FIXED: Wrapped your original logic inside a callable function, targeted email.value, and corrected the slice method
function CheckEmailValid() {
    var emailStr = email.value.trim() // trim removes space from first and last in line.
    
    var checkIndex = emailStr.indexOf("@") 
    var checkEmailat = emailStr.includes("@") 
    var checkEmailcom = emailStr.endsWith(".com") 
    
    // FIXED: Corrected string slicing to safely read domain right after '@'
    var domainPart = checkIndex !== -1 ? emailStr.slice(checkIndex + 1, checkIndex + 6).toLowerCase() : ""
    var checkGmail = (domainPart === "gmail")

    if (checkEmailat && checkGmail == false) {
        ShowToastify("Please add gmail after @.")
        return false
    }
    else if (checkEmailat && checkIndex < 3) { 
        ShowToastify("Please,brother,put 3 letter before @.")
        return false
    }
    else if (checkEmailat == false && checkEmailcom == false) {
        ShowToastify("Please,brother,add @ and .com in your email.")
        return false
    }
    else if (checkEmailat == false) {
        ShowToastify("Please,brother,add @ in your email.")
        return false
    }
    else if (checkEmailcom == false) {
        ShowToastify("Please,brother,add .com in your email.")
        return false
    }
    else if (checkEmailat && checkEmailcom == true) {
        // Form is clean and valid
        return true
    }
    return true
}