
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


let data = JSON.parse(localStorage.getItem('userData')) || [];


const tableBody = document.querySelector('#table');
function renderTable() {
    tableBody.innerHTML = data.map((items, index) => `
        <tr class="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
            <th scope="row" class="px-6 py-4 font-medium text-heading whitespace-nowrap">${index + 1}</th>
            <td class="px-6 py-4">${items.title}</td>
            <td class="px-6 py-4">${items.description}</td>
            <td class="px-6 py-4">
                <div class="flex gap-4 items-center">
                    <input ${items.isChecked ? 'checked' : ''} id="checkbox-${items.id}" type="checkbox">
                    <i class="fa fa-trash" onclick="deleteProduct(${index}) "></i>
                </div>
            </td>
        </tr>
    `).join('');
}

renderTable();


const form = document.getElementById('SubmitButton');
form.addEventListener('click', (event) => {
    event.preventDefault();


    const userData = {

        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        isChecked: false
    };




    console.log("title_len", userData.title.trim().length);
    console.log("description", userData.description.trim().length);

    formValidation(userData)
    data.push(userData);
    renderTable();

});

const formValidation = (userData) => {


    let isValid = true;



    if (userData.title.trim().length == 0) {

        isValid = false
    }
    if (userData.description.trim().length == 0) {

        isValid = false
    }
    console.log("isvalid", isValid);


    if (isValid) {
        localStorage.setItem('userData', JSON.stringify(data));
        Swal.fire({
            title: "Good job!",
            text: "DATA SUCCESSFULLY INSERTED!",
            icon: "success"
        });
    } else {
        Swal.fire({
            title: "Failed!",
            text: "DATA NOT INSERTED!",
            icon: "error"
        });

    }

}