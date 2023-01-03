const socket = io();
console.log("empezamos");
const catalogoElement = document.querySelector('#catalogo');
const chatElement = document.querySelector('#chat');

function addMessage(e) {
    if(document.querySelector('#email').value){
        const fecha = new Date();

        const mensaje = {
            email: document.querySelector('#email').value,
            text: document.querySelector('#message').value,
            date: fecha.toLocaleString()
        };

        socket.emit('addMessage', mensaje);
    }

    return false;
}

const renderMessages = messages => {
    const html = messages.map((message, index) => {
        return(
            `
            <div class="">
                <strong class="text-info">${message.email}</strong>
                <span class="text-warning">[${message.date}]</span>:
                <i class="text-success">${message.text}</i>
            </div>
            `
        )
    }).join(" ");
    chatElement.innerHTML = html;
}


function addProduct(e) {
    const producto = {
        title: document.querySelector('#title').value,
        price: document.querySelector('#price').value,
        thumbnail: document.querySelector('#thumbnail').value
    };
    socket.emit('addProduct', producto);
    return false;
}

const renderProducts = products => {
    const html = products.map((product, index) => {
        return(
            `
            <tr class="align-middle">
                <td class="">${product.title}</td>
                <td class="text-end">${product.price}</td>
                <td class="text-center"><img src="${product.thumbnail}" alt="${product.title}"></td>
            </tr>
            `
        )
    }).join(" ");
    catalogoElement.innerHTML = html;
}

socket.on('products', products => {
    renderProducts(products);
});

socket.on('messages', messages => {
    renderMessages(messages);
});