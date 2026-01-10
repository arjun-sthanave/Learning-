var nameInput = document.getElementById('name');
var orderInput = document.getElementById('order');

let nameFilter = '';
let orderFilter = '';

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

                return filteredData;
            }
    },
    pageLength: 50,
    lengthChange: false,
    columns: [
        { data: 'customer.firstname' },
        { data: 'customer.lastname' },
        { data: 'order_number' },
        { data: 'total' },
        { data: 'status' },
        { data: 'payment_status' },
        { data: 'source' },
        { data: 'customer.customer_code' },
        { data: 'customer.mobile' }
    ]
});


nameInput.addEventListener('keyup', function () {
    nameFilter = this.value;
    table.ajax.reload();
});

orderInput.addEventListener('keyup', function () {
    orderFilter = this.value;
    table.ajax.reload();
});
