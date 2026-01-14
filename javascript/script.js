
// const data = [
//     {
//         id: 1,
//         title: "javascript",
//         description: "js is used in web development to design the websites for the user"
//     },
//     {
//         id: 2,
//         title: "python",
//         description: "js is used in web development to design the websites for the user"
//     },
//     {
//         id: 3,
//         title: "c++",
//         description: "js is used in web development to design the websites for the user"
//     },

// ]


var data = JSON.parse(localStorage.getItem('userData')) || [];
var taskLogs = JSON.parse(localStorage.getItem('timeLogs')) || [];

const tableBody = document.querySelector('#table');

function renderTable() {
    const tableBody = document.getElementById('table');
    tableBody.innerHTML = data.map((item, index) => `
        <tr data-id = "${index}" onclick="showRowDetails(this)" 
            class="cursor-pointer hover:bg-gray-100 odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
            <th scope="row" class="px-6 py-4 font-medium text-heading whitespace-wrap align-top">${index + 1}</th>
            <td class="px-6 py-4 border p-2 break-words align-top text-wrap">${item.title}</td>
            <td class="px-6 py-4 border p-2 break-words text-wrap align-top">${item.description}</td>
            <td class="px-6 py-4 align-top">
                <div class="flex gap-4 items-center" onclick="event.stopPropagation()">
                    <input data-id="${index}" ${item.isChecked ? 'checked' : ''} type="checkbox" onclick="toggleCheck(this)">
                    <i class="fa fa-trash cursor-pointer" style="color:red" onclick="deleteItem(this)"></i>
                </div>
            </td>
            <td class="px-6 py-4 align-top">
                <div class="flex gap-4 items-center" onclick="event.stopPropagation()">
                    <i class="fa fa-pencil-square-o cursor-pointer" onclick="changeData(this)" data-id="${index}"></i>
                </div>
            </td>
        </tr>
    `).join('');
}

var closeBtn = document.getElementById("closeBtn")
closeBtn.addEventListener('click', () => {
    close()
})

function close() {
    console.log("closed");

    document.getElementById('detailsModal').style.display = 'none'
}

let currentTimerInterval = null;
let activeTimerId = null;
let activeStartTime = null;

function showRowDetails(e) {
    var idx = e.getAttribute('data-id');
    const modal = document.getElementById('detailsModal');
    const modalBody = modal.querySelector('.p-6');
    modal.style.display = 'block';

    function msToTime(ms) {
        const hours = Math.floor(ms / 3600000);
        const minutes = Math.floor((ms % 3600000) / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);

        return [
            hours.toString().padStart(2, '0'),
            minutes.toString().padStart(2, '0'),
            seconds.toString().padStart(2, '0')
        ].join(':');
    }



    const isRunning = !!data[idx].StartTIME;

    modalBody.innerHTML = `
    <div class="space-y-4 p-4 border rounded-lg shadow-sm">
        <div class="space-y-2">
            <p>Title: <span id="item-title">${data[idx].title}</span></p>
            <p>Timer: <span id="timer-display" class="text-xl">00:00:00</span></p>
        </div>
        <div class="flex gap-2">
            <button id="start-btn" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ${isRunning ? 'hidden' : ''}">Start</button>
            <button id="stop-btn" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 ${isRunning ? '' : 'hidden'}">Stop</button>
        </div>

        <div class="mt-6 border-t pt-4">
            <h3 class="font-bold mb-2">Time Logs</h3>
            <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                <table class="w-full text-sm text-left text-body">
                    <thead class="text-sm text-body bg-neutral-secondary-soft border-b border-default">
                        <tr>
                            <th class="px-6 py-3 font-medium">Start time</th>
                            <th class="px-6 py-3 font-medium">End time</th>
                            <th class="px-6 py-3 font-medium">Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${taskLogs.filter(item => item.taskId === idx).map(item =>
        item.timelogs.map(log => `
                                <tr class="bg-neutral-primary">
                                    <td class="px-6 py-4">${log.startTime}</td>
                                    <td class="px-6 py-4">${log.endTime}</td>
                                    <td class="px-6 py-4">${msToTime(log.duration)}</td>
                                </tr>`).join('')
    ).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    </div>`;

    const startbtn = document.getElementById('start-btn');
    const stopbtn = document.getElementById('stop-btn');
    const display = document.getElementById('timer-display');

    const updateDisplay = () => {
        if (!data[idx].StartTIME) return;

        const startTime = new Date(data[idx].StartTIME);
        console.log("starttime", startTime);

        const now = new Date();
        const diff = Math.floor((now - startTime) / 1000);


        const h = Math.floor(diff / 3600).toString().padStart(2, '0');
        const m = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
        const s = (diff % 60).toString().padStart(2, '0');

        if (display) display.textContent = `${h}:${m}:${s}`;
    };


    if (isRunning) {
        if (currentTimerInterval) clearInterval(currentTimerInterval);
        currentTimerInterval = setInterval(updateDisplay, 1000);
        updateDisplay();
    }

    startbtn.onclick = () => {

        data[idx].StartTIME = new Date();
        localStorage.setItem('userData', JSON.stringify(data));
        activeTimerId = idx;

        startbtn.classList.add('hidden');
        stopbtn.classList.remove('hidden');

        if (currentTimerInterval) clearInterval(currentTimerInterval);
        currentTimerInterval = setInterval(updateDisplay, 1000);
        updateDisplay();
    };

    stopbtn.onclick = () => {
        const endtime = new Date();
        const startTime = new Date(data[idx].StartTIME);
        const durationMs = endtime - startTime;

        const newLogEntry = {
            startTime: startTime.toLocaleString(),
            endTime: endtime.toLocaleString(),
            duration: durationMs
        };

        const taskIndex = taskLogs.findIndex(item => item.taskId === idx);
        if (taskIndex !== -1) {
            taskLogs[taskIndex].timelogs.push(newLogEntry);

            localStorage.setItem('timeLogs', JSON.stringify(taskLogs));
            data[idx].StartTIME = ""
            localStorage.setItem('userData', JSON.stringify(data));

        } else {
            taskLogs.push({ taskId: idx, timelogs: [newLogEntry] });
        }

        localStorage.setItem('timeLogs', JSON.stringify(taskLogs));


        clearInterval(currentTimerInterval);
        data[idx].StartTIME = null;
        activeTimerId = null;

        showRowDetails(e);
    };
}


renderTable();

const SubBtn = document.getElementById('SubmitButton');
SubBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let formTitle = document.getElementById('title')
    let formDescription = document.getElementById('description')
    var userData = {
        id: Date.now(),
        title: formTitle.value,
        description: formDescription.value,
        isChecked: false,
        isToggle: false,
        StartTIME: ""
    };

    console.log("userData", userData);


    if (formValidation(userData)) {


        data.unshift(userData);
        localStorage.setItem('userData', JSON.stringify(data));
        renderTable();

        formTitle.value = "";
        formDescription.value = "";

        Swal.fire({ title: "Good job!", text: "DATA ADDED SUCCESSFULLY", icon: "success" });
    } else {
        Swal.fire({ title: "Failed!", text: "Please fill in all fields!", icon: "error" });
    }
});




const formValidation = (userData) => {
    if (userData.title.trim().length === 0 || userData.description.trim().length === 0) {
        return false;
    }
    return true;
};

function deleteItem(e) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            console.log(e.getAttribute('data-user'));
            console.log("data:", data);
            data.splice(e.getAttribute('data-user'), 1)
            localStorage.setItem('userData', JSON.stringify(data));
            renderTable();
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
}


function toggleCheck(e) {
    document.getElementById('trash').style.display = "block"
    console.log(e.getAttribute('data-id'));
    var idx = e.getAttribute('data-id')
    console.log(idx);

    console.log(data[idx]);


    if (data[idx].isChecked) {
        data[idx].isChecked = false
        localStorage.setItem('userData', JSON.stringify(data));

        console.log("data", data);


    } else {
        data[idx].isChecked = true
        console.log("data", data);
        localStorage.setItem('userData', JSON.stringify(data));

    }


    const selectId = data.filter(items => items.isChecked).map(item => item.id)
    console.log("select", selectId);

    if (selectId.length === 0) {
        trash.style.display = "none"
    }

    console.log("check", data[idx].isChecked);
    console.log("data", data);




}
function changeData(e) {

    let formTitle = document.getElementById('title')
    let formDescription = document.getElementById('description')

    console.log(formTitle);
    console.log(formDescription);
    const idx = e.getAttribute('data-id')


    console.log("data", data);
    const changBtn = document.getElementById("changeButton")
    if (!(data[idx].isToggle)) {
        data[idx].isToggle = true
        formTitle.value = data[idx].title;
        formDescription.value = data[idx].description;
        document.getElementById("SubmitButton").style.display = "none";
        changBtn.style.display = "block";
        console.log("data", data);

        console.log(data[idx].title)
        changBtn.addEventListener("click", (e) => {

            console.log("idx", idx);

            data[idx].title = formTitle.value

            data[idx].description = formDescription.value


            if (data[idx].title.trim().length === 0 ||
                data[idx].description.trim().length === 0) {
                return false;
            }
            else {
                localStorage.setItem('userData', JSON.stringify(data));
                data[idx].isToggle = false
                renderTable()
            }


        })



    }
    else {
        data[idx].isToggle = false
        formTitle.value = "";
        formDescription.value = "";
        document.getElementById("SubmitButton").style.display = "block";



        document.getElementById("changeButton").style.display = "none";
        renderTable()

    }




}

function changeData1(e) {
    console.log(select);

    select = false
    let formTitle = document.getElementById('title')
    let formDescription = document.getElementById('description')

    console.log(formTitle);
    console.log(formDescription);
    const idx = e.getAttribute('data-id')
    formTitle.value = "";
    formDescription.value = "";


}
const DeleteAllBtn = document.getElementById('trash')
DeleteAllBtn.addEventListener("click", () => {
    multipleDelte()

})

function multipleDelte() {
    const selectId = data.filter(items => items.isChecked).map(item => item.id)
    console.log("selectAll", selectId.length);
    if (selectId.length == 0) {
        Swal.fire("FIRST SELECT ");
    }
    else {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                data = data.filter(item => !selectId.includes(item.id));
                console.log("data", data);


                localStorage.setItem('userData', JSON.stringify(data));
                renderTable()


                Swal.fire({
                    title: "Deleted!",
                    text: "Your data has been deleted.",
                    icon: "success"
                });
            }
        });
    }

}

const removeallData = document.querySelector(".removeALL")
console.log(removeallData);

removeallData.addEventListener("click", () => {

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
            localStorage.clear()
            data = []
            taskLogs = []
            renderTable()
            document.getElementById('trash').style.display = "none"
        }
    });







})

const resetbtn = document.getElementById('resetButton')
resetbtn.addEventListener('click', () => {
    document.getElementById("SubmitButton").style.display = "block";
    document.getElementById("changeButton").style.display = "none";
})

const trash = document.getElementById('trash')
trash.style.display = "none"



const tableContent = document.querySelector('#tableContent');






