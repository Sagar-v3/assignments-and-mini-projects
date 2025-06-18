// Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
// clock that shows you the current machine time?

// Can you make it so that it updates every second, and shows time in the following formats - 

//  - HH:MM::SS (Eg. 13:45:23)

//  - HH:MM::SS AM/PM (Eg 01:45:23 PM)

function clock() {

    const d = new Date;

    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();

    let hh = hours < 10 ? "0" + hours : hours;
    let mm = minutes < 10 ? "0" + minutes : minutes;
    let ss = seconds < 10 ? "0" + seconds : seconds; 
    
    const time24 = `${hh}:${mm}:${ss}`;

   const ampm = hours >= 12 ? "PM" : "AM";

   let hours12 = hours % 12;
   hours12 = hours12 === 0 ? 12 : hours12;

    const time12 = `${hours12}:${mm}:${ss}:${ampm}`;

    console.log(`24-hour: ${time24} | 12-hour: ${time12}`);
}

setInterval(clock, 1000);

// console.log(23%12);
