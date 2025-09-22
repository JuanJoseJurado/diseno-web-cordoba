window.addEventListener("DOMContentLoaded", function () {
    // Obtener el formulario y el elemento de estado
    var form = document.getElementById("contactForm");
    var status = document.getElementById("form-status");

    // Manejador para el envío exitoso del formulario
    function success() {
        form.reset();
        status.innerHTML = "¡Gracias! Tu mensaje ha sido enviado.";
        status.style.display = "block";
        status.style.color = "green";
    }

    // Manejador para errores en el envío del formulario
    function error() {
        status.innerHTML = "Oops! Hubo un problema al enviar tu mensaje.";
        status.style.display = "block";
        status.style.color = "red";
    }

    // Escuchar el evento de envío del formulario
    form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var data = new FormData(form);
        ajax(form.method, form.action, data, success, error);
    });
});

// Función auxiliar para realizar la petición AJAX
function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
            success(xhr.response, xhr.responseType);
        } else {
            error(xhr.status, xhr.response, xhr.responseType);
        }
    };
    xhr.send(data);
}
