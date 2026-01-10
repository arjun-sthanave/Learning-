var nameInput = document.getElementById('name');
var orderInput = document.getElementById('order');
var StatusBtn = document.getElementById('status')
var maxInput = document.getElementById('max')
console.log('max', maxInput);

var minInput = document.getElementById('min')
var SearchBtn = document.getElementById('search')

var nameFilter = ''
var orderFilter = ''
var statusFilter = ''
var minFilter
var maxFilter


const table = new DataTable('#example', {
    ajax: {
        url: './data.json',
        dataSrc:

            function (json) {

                let filteredData = json.data;


                if (nameFilter) {
                    filteredData = filteredData.filter(item =>
                        item.customer.firstname
                            .toLowerCase()
                            .includes(nameFilter.toLowerCase())
                    );
                }

                if (orderFilter) {
                    filteredData = filteredData.filter(item =>
                        item.order_number
                            .toString()
                            .includes(orderFilter)
                    );
                }

                if (maxFilter || minFilter) {


                    filteredData = filteredData.filter(item => minFilter <= parseFloat(item.total) && parseFloat(item.total) <= maxFilter);
                    console.log("filter", filteredData);

                }
                if (statusFilter === "All") {
                    return filteredData
                }

                if (statusFilter) {


                    filteredData = filteredData.filter(item =>
                        item.status
                            .toLowerCase()
                            .includes(statusFilter.toLowerCase())
                    );
                }
                return filteredData;
            }
    },
    pageLength: 50,
    lengthChange: false,
    columns: [
        {
            className: 'dt-control',
            orderable: false,
            data: null,
            defaultContent: ''
        },
        {


            render: function (data, type, row, meta) {
                console.log("data", data);
                console.log("type", type);
                console.log("row", row);
                console.log("meta", meta);

                return meta.settings._iDisplayStart + meta.row + 1;
            }
        },

        { data: 'customer.firstname' },

        { data: 'customer.lastname' },
        { data: 'order_number' },
        { data: 'total' },
        { data: 'status' },
        { data: 'payment_status' },
        { data: 'source' },
        { data: 'customer.customer_code' },
        { data: 'customer.mobile' }
    ],
    order: [[1, 'asc']]
});


nameInput.addEventListener('keyup', function () {
    nameFilter = this.value;
    table.ajax.reload();
});

orderInput.addEventListener('keyup', function () {
    orderFilter = this.value;
    table.ajax.reload();
});


SearchBtn.addEventListener('click', () => {
    minFilter = minInput.value
    console.log("min", minFilter);

    maxFilter = maxInput.value
    console.log("max", maxFilter);
    table.ajax.reload();

})
StatusBtn.addEventListener('click', () => {
    console.log("status", StatusBtn.value);
    statusFilter = StatusBtn.value
    table.ajax.reload();
})


function format(d) {
    // `d` is the original data object for the row
    return (
        '<dl>' +
        '<dt>Full name:</dt>' +
        '<dd>' +
        d.name +
        '</dd>' +
        '<dt>Extension number:</dt>' +
        '<dd>' +
        d.extn +
        '</dd>' +
        '<dt>Extra info:</dt>' +
        '<dd>And any further details here (images etc)...</dd>' +
        '</dl>'
    );
}
table.on('click', 'tbody td.dt-control', function (e) {
    let tr = e.target.closest('tr');
    let row = table.row(tr);

    if (row.child.isShown()) {
        // This row is already open - close it
        row.child.hide();
    }
    else {
        // Open this row
        row.child(format(row.data())).show();
    }
});