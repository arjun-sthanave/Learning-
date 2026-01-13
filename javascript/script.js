
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
const tableBody = document.querySelector('#table');
// 1. Updated render function with onclick event for the row
function renderTable() {
    const tableBody = document.getElementById('table');
    tableBody.innerHTML = data.map((item, index) => `
        <tr onclick="showRowDetails(${index})" 
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

function showRowDetails(index) {
    document.getElementById('detailsModal').style.display = 'block'
    const item = data[index];
    const modalBody = document.querySelector('#detailsModal .p-6');


    modalBody.innerHTML = `
        <div class="space-y-2">
            <p><strong>Title:</strong> ${item.title}</p>
            
        </div>
    `;


    const modalElement = document.getElementById('detailsModal');
    modalElement.classList.remove('hidden');
    modalElement.classList.add('flex');
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
        isToggle: false
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






