var btnComprar = document.getElementsByClassName('comprar')

for (i = 0; i < btnComprar.length; i++) {
    btnComprar[i].addEventListener('click', function () {
        var productId = this.dataset.product
        var action = this.dataset.action
        console.log('SKU PRODUCTO: ', productId, 'Action :', action)

        console.log('USER :', user)
        if (user === 'AnonymousUser') {
            var alertContainer = document.getElementById('alert-container');
            var alertHTML = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    Debes iniciar sesión para agregar productos.
                    <a href="/iniciar_sesion" class="alert-link">Iniciar sesión</a>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
            alertContainer.innerHTML = alertHTML;
        } else {
            actualizarOrdenUsuario(productId, action)
        }
    })
}

function actualizarOrdenUsuario(productId, action) {
    console.log('Usuario logeadooo')

    var url = 'agregarAlCarrito/'

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({ 'productId': productId, 'action': action })
    })
        .then((response) => {
            return response.json()
        })

        .then((data) => {
            console.log('data', data)
            location.reload()
        })
}
