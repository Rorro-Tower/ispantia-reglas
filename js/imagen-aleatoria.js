// =======================================================================
// LÓGICA DE IMAGEN ALEATORIA EN EL HEADER
// =======================================================================

function cargarImagenHeaderAleatoria() {
    const imagenesHeader = [
        'imagenes/combate/combate-1.jpg', // Asegúrate de que estas rutas sean correctas
        'imagenes/combate/combate-2.jpg',
        'imagenes/combate/combate-3.jpg',
        'imagenes/combate/combate-4.jpg',
        'imagenes/combate/combate-5.jpg',
        'imagenes/combate/combate-6.jpg',
        'imagenes/combate/combate-7.jpg'
    ];

    const imgElement = document.getElementById('imagen-header');

    if (imgElement) {
        // Genera un índice aleatorio
        const indiceAleatorio = Math.floor(Math.random() * imagenesHeader.length);
        // Asigna la imagen aleatoria al src del elemento
        imgElement.src = imagenesHeader[indiceAleatorio];
        // Opcional: podrías querer actualizar el alt text también si tus imágenes son muy diferentes
        imgElement.alt = `Imagen de Combate - ${indiceAleatorio + 1}`; 
    }
}