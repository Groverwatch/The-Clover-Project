let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function goToPreviousMonth() {
    if (month <= 0) {
        month = 11; 
        year--;
    }

    else {
        month--;
    }

    displayCalendarsInMain();

    var currentDate = new Date(year, month);
    document.getElementById("date").innerHTML = `${months[month]} ${year}`;
}

function goToFollowingMonth() {
    if (month >= 11) {
        month = 0;
        year++;
    }
    
    else {
        month++;
    }
    
    displayCalendarsInMain();
    var currentDate = new Date(year, month);
    document.getElementById("date").innerHTML = `${months[month]} ${year}`;
}

function daysInMonth(year, month) {
    console.log(`${year} / ${month}`);
    return new Date(year, month, 0).getDate(); 
}