
// var totalSeconds = 1 * 60;
// const interval = setInterval(() => {
//     const hour = Math.floor(totalSeconds / 3600)
//     const remaining = totalSeconds % 3600
//     const minutes = Math.floor(remaining / 60);
//     const seconds = totalSeconds % 60;
//     console.log("second", seconds);


//     var some = (`${hour}:    ${minutes}:${seconds}`);
//     document.getElementById('demo').innerHTML = some
//     if (totalSeconds <= 0) {
//         clearInterval(interval);
//     }
//     totalSeconds--;
// }, 1000);


// let promises = new Promise(function (resolve, reject) {
//     setTimeout(() => {
//         let x = 0
//         if (x == 0) {
//             resolve("ok")
//         } else {
//             reject("error")
//         }
//     }, 2000)
// })


// promises.then(
//     function (value) { mydisplay(value); },
//     function (error) { mydisplay(error); }
// );

function myDisplayer(some) {
    document.getElementById("demo").innerHTML = some;
}

async function myFunction() { return "Hello"; }

myFunction().then(
    function (value) { myDisplayer(value); },
    function (error) { myDisplayer(error); }
)