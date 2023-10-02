import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
const firebaseConfig = {
    apiKey: "AIzaSyDkeQhIjKjXl6ruJwZ3lOG0LwSa5-T9qLs",
    authDomain: "prateek-5bd13.firebaseapp.com",
    projectId: "prateek-5bd13",
    storageBucket: "prateek-5bd13.appspot.com",
    messagingSenderId: "550542718433",
    appId: "1:550542718433:web:1d980152172f1ba987cea0",
    measurementId: "G-4CHHHCPN48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app }

let analytics = getAnalytics(app)
console.log(analytics)
function redirectSection(page) {
    s
    let formContainer = document.querySelector(".formContainer")
    let detailsContainer = document.querySelector(".detailsContainer")
    let detailRedirection = document.querySelector(".redirectToDetails")
    let formRedirection = document.querySelector(".redirectToForm")
    if (page === "details") {
        detailsContainer.style.display = "block"
        formContainer.style.display = "none"
        formRedirection.style.display = "block"
        detailRedirection.style.display = "none"
        getDetailData();
    }
    else {
        detailsContainer.style.display = "none"
        formContainer.style.display = "block"
        formRedirection.style.display = "none"
        detailRedirection.style.display = "block"
    }
}

function showLoader(value, text = "") {
    let loader = document.querySelector(".loader");
    loader.innerHTML = text
    loader.style.display = value === true ? "flex" : "none"
}

function showErr(showError, message = "", id = "") {
    if (showError === true) {
        let element = document.querySelector("#" + id)
        element.style.display = "block"
        element.innerHTML = message
    }
    else {
        let errorMsgElements = document.querySelectorAll('.errMsg')
        for (let i = 0; i < errorMsgElements.length; i++) {
            console.log(errorMsgElements)
            errorMsgElements[i].style.display = "none"

        }
    }
}

function validateEmail(email) {
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    return emailRegex.test(email);
}


function getDetailData() {
    showLoader(true, "Loading...");
    fetch('https://ptserver.netlify.app/.netlify/functions/api/get-data').then((res) => {
        if (res.status === 200 || res.status === 201) {
            return res.json()
        }
        else {
            throw newError(res)
        }

    }).then((data) => {
        let dataArr = [`<tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Country</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Date Of Birth</th>
                </tr>`];
        let detailsTable = document.querySelector(".detailsTable")


        for (let i = 0; i < data.data.length; i++) {
            let value = data.data[i]
            dataArr.push(`<tr>
                    <td>${value["first_name"]}</td>
                    <td>${value["last_name"]}</td>
                    <td>${value["email"]}</td>
                    <td>${value["country"]}</td>
                    <td>${value["state"]}</td>
                    <td>${value["city"]}</td>
                    <td>${value["gender"]}</td>
                    <td>${value["age"]}</td>
                    <td>${format_time(value["dob"])}</td>
                </tr>`)
        }

        detailsTable.innerHTML = dataArr.join("")
        showLoader(false)

    }).catch((err) => {
        console.log("Error, Please Try Again")
        console.log(err)
        redirectSection("form")
    })
}

function format_time(time, enable_utc = true) {
    var mydate = new Date(time);
    let data = { "day": "numeric", "month": "short", "year": "numeric", "hour": "numeric", "minute": "numeric" }
    if (enable_utc === true) {
        data["timeZone"] = "UTC"
    }
    return mydate.toLocaleDateString('en-US', data)
}

function getSelectedGender() {
    let gender = document.querySelectorAll("[name='gender']")
    for (i = 0; i < gender.length; i++) {
        if (gender[i].checked) {
            return gender[i].id
        }

    }
}



function submitForm() {
    showErr(false)
    let first_name = document.querySelector("#firstName").value
    let last_name = document.querySelector("#lastName").value
    let email = document.querySelector("#email").value
    let dob = document.querySelector("#dob").value
    let country = document.querySelector("#country").value
    let state = document.querySelector("#state").value
    let city = document.querySelector("#city").value
    let age = document.querySelector("#age").value
    let selectedGender = getSelectedGender()
    let isError = false;

    if (first_name === undefined || first_name.trim() === "") {
        showErr(true, "Enter First Name", "firstNameErr")
        isError = true
    }
    else if (/^[A-Za-z ]+$/.test(first_name) === false) {
        showErr(true, "Only Alphabets are Allowed", "firstNameErr")
        isError = true
    }

    if (last_name === undefined || last_name.trim() === "") {
        showErr(true, "Enter First Name", "lastNameErr")
        isError = true
    }
    else if (/^[A-Za-z ]+$/.test(last_name) === false) {
        showErr(true, "Only Alphabets are Allowed", "lastNameErr")
        isError = true
    }

    if (email === undefined || email.trim() === "") {
        showErr(true, "Enter Email", "emailErr")
        isError = true
    }
    else if (validateEmail(email) === false) {
        showErr(true, "Invalid Email", "emailErr")
        isError = true
    }


    if (country === undefined || country.trim() === "") {
        showErr(true, "Enter Country", "countryErr")
        isError = true
    }
    else if (/^[A-Za-z ]+$/.test(country) === false) {
        showErr(true, "Only Alphabets are Allowed", "countryErr")
        isError = true
    }



    if (state === undefined || state.trim() === "") {
        showErr(true, "Enter State", "stateErr")
        isError = true
    }
    else if (/^[A-Za-z ]+$/.test(state) === false) {
        showErr(true, "Only Alphabets are Allowed", "stateErr")
        isError = true
    }



    if (city === undefined || city.trim() === "") {
        showErr(true, "Enter City", "cityErr")
        isError = true
    }
    else if (/^[A-Za-z ]+$/.test(city) === false) {
        showErr(true, "Only Alphabets are Allowed", "cityErr")
        isError = true
    }

    if (age === undefined || age.trim() === "") {
        showErr(true, "Enter Age", "ageErr")
        isError = true
    }
    else if (/^[0-9]*$/.test(age) === false) {
        showErr(true, "Only Numbers are Allowed", "ageErr")
        isError = true
    }

    if (dob === undefined || dob.trim() === "") {
        showErr(true, "Enter Date Of Birth", "dobErr")
        isError = true
    }

    else if (new Date(dob) > new Date()) {
        showErr(true, "Invalid Date Of Birth", "dobErr")
        isError = true
    }
    if (isError === false) {
        showLoader(true, "Submitting Data...")

        let body = {
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "dob": dob,
            "country": country,
            "state": state,
            "city": city,
            "age": age,
            "gender": selectedGender,
        }

        let options = {
            "method": "post",
            "body": JSON.stringify(body), "headers": {
                'Content-Type': 'application/json'
            }
        }
        fetch('https://ptserver.netlify.app/.netlify/functions/api/submit', options).then((res) => {
            if (res.status === 200 || res.status === 201) {
                return res.json()
            }
            else {
                throw newError(res)
            }
        }).then((data) => {
            if (data["status"] === "success") {
                alert(data["message"])
                window.location.reload();
            }
        }).catch((err) => {
            alert("Error, Please Try Again")
            showLoader(false)
            console.log(err)
        })
    }
}

