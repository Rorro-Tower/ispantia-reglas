// =======================================================================
// DATOS GLOBALES: UNIDADES Y ESTADO DEL COMBATE (ACTUALIZADO CON RECURSOS)
// =======================================================================

const unidadesDisponibles = {
    Gobernador: [
        { 
            nombre: "Vigilante", ataqueBase: 2, salud: 5, esPrincipal: false, 
            recursosDerrota: { Miedo: 2, Superstición: 1, Valor: 0, Fe: 0, Conocimiento: 0 } 
        },
        { 
            nombre: "Aldeanos Furiosos", ataqueBase: 1, salud: 3, esPrincipal: false, 
            recursosDerrota: { Miedo: 6, Superstición: 2, Valor: 0, Fe: 0, Conocimiento: 0 } 
        },
        { 
            nombre: "Escuadrón de Soldados", ataqueBase: 3, salud: 6, esPrincipal: false, 
            recursosDerrota: { Miedo: 8, Superstición: 4, Valor: 0, Fe: 0, Conocimiento: 0 } 
        },
        { 
            nombre: "Guerrero Sagrado", ataqueBase: 4, salud: 8, esPrincipal: true, 
            recursosDerrota: { Miedo: 10, Superstición: 8, Valor: 0, Fe: 0, Conocimiento: 0 } 
        }
    ],
    Brujo: [
        { 
            nombre: "Espectro", ataqueBase: 2, salud: 4, esPrincipal: false, 
            recursosDerrota: { Miedo: 0, Superstición: 0, Valor: 1, Fe: 1, Conocimiento: 1 } 
        },
        { 
            nombre: "Fantasma", ataqueBase: 1, salud: 3, esPrincipal: false, 
            recursosDerrota: { Miedo: 0, Superstición: 0, Valor: 2, Fe: 1, Conocimiento: 1 } 
        },
        { 
            nombre: "Poltergeist", ataqueBase: 3, salud: 5, esPrincipal: false, 
            recursosDerrota: { Miedo: 0, Superstición: 0, Valor: 3, Fe: 2, Conocimiento: 1 } 
        },
        { 
            nombre: "Zombie", ataqueBase: 1, salud: 4, esPrincipal: false, 
            recursosDerrota: { Miedo: 0, Superstición: 0, Valor: 3, Fe: 2, Conocimiento: 2 } 
        },
        { 
            nombre: "Esqueleto", ataqueBase: 2, salud: 5, esPrincipal: false, 
            recursosDerrota: { Miedo: 0, Superstición: 0, Valor: 3, Fe: 3, Conocimiento: 2 } 
        },
        { 
            nombre: "Demonio", ataqueBase: 5, salud: 10, esPrincipal: true, 
            recursosDerrota: { Miedo: 0, Superstición: 0, Valor: 4, Fe: 3, Conocimiento: 2 } 
        },
        { 
            nombre: "Planta Carnívora", ataqueBase: 2, salud: 6, esPrincipal: false, 
            recursosDerrota: { Miedo: 0, Superstición: 0, Valor: 6, Fe: 4, Conocimiento: 3 } 
        },
        { 
            nombre: "Árbol Maligno", ataqueBase: 3, salud: 7, esPrincipal: false, 
            recursosDerrota: { Miedo: 0, Superstición: 0, Valor: 10, Fe: 6, Conocimiento: 4 } 
        },
        { 
            nombre: "Ogro", ataqueBase: 4, salud: 9, esPrincipal: false, 
            recursosDerrota: { Miedo: 0, Superstición: 0, Valor: 14, Fe: 8, Conocimiento: 6 } 
        }
    ]
};

// Objeto para guardar el estado y los datos del combate (usando copias de la unidad)
let estadoCombate = {
    atacante: { nombre: 'N/A', ataqueBase: 0, salud: 0, modificador: 0, esPrincipal: false, recursosDerrota: {}, hpInicial: 0 },
    defensor: { nombre: 'N/A', ataqueBase: 0, salud: 0, modificador: 0, esPrincipal: false, recursosDerrota: {}, hpInicial: 0 },
    iniciativa: null, // 'atacante' o 'defensor'
    ronda: 0
};


// =======================================================================
// FUNCIONES DE NAVEGACIÓN Y UTILIDAD
// =======================================================================

function mostrarPaso(numPaso) {
    // Oculta todos los divs de pasos y muestra el solicitado
    document.querySelectorAll('[id^="paso-"]').forEach(el => {
        el.classList.remove('paso-actual');
        el.classList.add('paso-oculto');
    });
    // Maneja casos como 'paso-5-6' y 'paso-final'
    document.getElementById(`paso-${numPaso}`).classList.remove('paso-oculto');
    document.getElementById(`paso-${numPaso}`).classList.add('paso-actual');
}

function avanzarPaso(numSiguiente) {
    mostrarPaso(numSiguiente);
}

function simularTirada(ataqueTotal) {
    const dado = Math.floor(Math.random() * 6) + 1; // Dado de 6 (1-6)
    const totalAtaque = ataqueTotal + dado;
    return { dado, totalAtaque };
}

// =======================================================================
// LÓGICA DE CADA PASO
// =======================================================================

// PASO 1
function seleccionarBando(iniciativa) {
    estadoCombate.iniciativa = iniciativa;
    
    if (iniciativa === 'atacante') {
        estadoCombate.rolAtacante = 'Gobernador';
        estadoCombate.rolDefensor = 'Brujo';
    } else {
        estadoCombate.rolAtacante = 'Brujo';
        estadoCombate.rolDefensor = 'Gobernador';
    }
    
    document.getElementById('nombre-defensor').textContent = estadoCombate.rolDefensor; 
    
    avanzarPaso(2);
}

// Llenar los menús desplegables al inicio
function llenarSelectsUnidades() {
    const selectGobernador = document.getElementById('select-gobernador');
    const selectBrujo = document.getElementById('select-brujo');
    
    const rellenarSelect = (selectElement, unidadArray) => {
        selectElement.innerHTML = '';
        unidadArray.forEach(unidad => {
            const option = document.createElement('option');
            option.value = unidad.nombre; 
            option.textContent = `${unidad.nombre} (A:${unidad.ataqueBase} / HP:${unidad.salud})`;
            selectElement.appendChild(option);
        });
    };
    
    rellenarSelect(selectGobernador, unidadesDisponibles.Gobernador);
    rellenarSelect(selectBrujo, unidadesDisponibles.Brujo);
}

// PASO 2 - Guardar Unidades y Avanzar
function guardarUnidades() {
    const nombreGov = document.getElementById('select-gobernador').value;
    const nombreBru = document.getElementById('select-brujo').value;

    const unidadGov = unidadesDisponibles.Gobernador.find(u => u.nombre === nombreGov);
    const unidadBru = unidadesDisponibles.Brujo.find(u => u.nombre === nombreBru);

    if (estadoCombate.rolAtacante === 'Gobernador') {
        estadoCombate.atacante = { ...unidadGov, modificador: 0, hpInicial: unidadGov.salud };
        estadoCombate.defensor = { ...unidadBru, modificador: 0, hpInicial: unidadBru.salud };
    } else {
        estadoCombate.atacante = { ...unidadBru, modificador: 0, hpInicial: unidadBru.salud };
        estadoCombate.defensor = { ...unidadGov, modificador: 0, hpInicial: unidadGov.salud };
    }
    
    avanzarPaso(3);
}

// PASO 3 (Lógica de Huida)
function iniciarHuida() {
    const tiradaHuida = Math.floor(Math.random() * 6) + 1; 
    let resultadoHuida;
    let registro = document.getElementById('registro-combate');
    
    if (tiradaHuida >= 4) { // Asumimos 4+ es éxito
        resultadoHuida = `¡Éxito! El ${estadoCombate.defensor.nombre} ha huido con un ${tiradaHuida}.`;
        registro.innerHTML += `<p class="exito">${resultadoHuida}</p>`;
        document.getElementById('ganador-combate').textContent = `Combate finalizado por HUÍDA exitosa del ${estadoCombate.defensor.nombre}.`;
        mostrarPaso('final');
        return;
    } else {
        resultadoHuida = `¡Fallo! El ${estadoCombate.defensor.nombre} falló la huida con un ${tiradaHuida}. El combate continúa.`;
        registro.innerHTML += `<p class="fallo">${resultadoHuida}</p>`;
        avanzarPaso(4);
    }
}


// PASO 4 (Guardar modificadores y avanzar a combate)
function finalizarModificadores() {
    // **AQUÍ VA LA LÓGICA PARA LEER INPUTS DEL PASO 4**
    
    // PASO 5: Publicar HP iniciales
    const { atacante, defensor } = estadoCombate;
    
    document.getElementById('hp-iniciales-info').innerHTML = `
        HP Iniciales: 
        <strong>${atacante.nombre}</strong> (${atacante.salud} HP, A:${atacante.ataqueBase}) 
        vs 
        <strong>${defensor.nombre}</strong> (${defensor.salud} HP, A:${defensor.ataqueBase})`;
    
    document.getElementById('registro-combate').innerHTML = '<h4>Registro de Rondas:</h4>';
    mostrarPaso('5-6');
}


// PASO 6 (Bucle de Combate - Ejecutar una Ronda)
function ejecutarRonda() {
    // 1. Verificar si el combate debe continuar
    if (estadoCombate.atacante.salud <= 0 || estadoCombate.defensor.salud <= 0) {
        finalizarCombate();
        let registro = document.getElementById('registro-combate');
        return;
    }

    estadoCombate.ronda++;
    const { atacante, defensor } = estadoCombate;
    
    // Obtener resultados de tirada (Tirada + Ataque Base + Modificador)
    const resA = simularTirada(atacante.ataqueBase + atacante.modificador);
    const resD = simularTirada(defensor.ataqueBase + defensor.modificador);
    
    let ganadorRonda = "Empate";
    let logAtaqueEspecial = "";

    // 2. Determinar el ganador de la ronda y aplicar daño
    if (resA.totalAtaque > resD.totalAtaque) {
        defensor.salud -= 1;
        ganadorRonda = atacante.nombre;
    } else if (resD.totalAtaque > resA.totalAtaque) {
        atacante.salud -= 1;
        ganadorRonda = defensor.nombre;
    } 
    
    // Asumiendo que la unidad principal del Gobernador puede hacer Ataque Especial
    if (atacante.esPrincipal && estadoCombate.rolAtacante === 'Gobernador') {
         logAtaqueEspecial = " | *Posible Ataque Especial del Gobernador verificado.*";
    }

    // 3. REGISTRAR SOLO LA ÚLTIMA RONDA (CAMBIO CLAVE: Usamos '=' en lugar de '+=')
    let registro = document.getElementById('registro-combate');
    
    // El título se mantiene para evitar que desaparezca
    let nuevoRegistro = '<h4>Registro de Rondas:</h4>';
    
    nuevoRegistro += `<p class="ronda-activa">
        <strong>Ronda ${estadoCombate.ronda}</strong> (Último Ataque)<br> 
        Ataque ${atacante.nombre}: [${resA.dado} + ${atacante.ataqueBase}] = <strong>${resA.totalAtaque}</strong><br>
        Ataque ${defensor.nombre}: [${resD.dado} + ${defensor.ataqueBase}] = <strong>${resD.totalAtaque}</strong><br>
        <span class="resultado-ronda">Gana: ${ganadorRonda}. 
        HP Act.: ${atacante.salud} / ${defensor.salud}</span> ${logAtaqueEspecial}
    </p>`;

    // Reemplaza todo el contenido del registro con la última ronda
    registro.innerHTML = nuevoRegistro; 
    
    // 4. Verificar si el combate terminó después de esta ronda
    if (atacante.salud <= 0 || defensor.salud <= 0) {
        finalizarCombate();
    }
}

// Función de Finalización (Recursos y Resultado)
function finalizarCombate() {
    const { atacante, defensor } = estadoCombate;
    let registro = document.getElementById('registro-combate');
    
    let ganador;
    let perdedor;
    
    if (atacante.salud <= 0 && defensor.salud <= 0) {
        ganador = "¡Doble KO! Ambos han caído.";
        perdedor = { nombre: "N/A", recursosDerrota: {} }; 
    } else if (atacante.salud <= 0) {
        ganador = defensor.nombre;
        perdedor = atacante;
    } else {
        ganador = atacante.nombre;
        perdedor = defensor;
    }
    
    const recursos = perdedor.recursosDerrota;
    let recursosHTML = '';

    // Generar la lista de recursos obtenidos (solo muestra los que no son 0)
    for (const recurso in recursos) {
        if (recursos[recurso] > 0) {
            recursosHTML += `<p>• **${recurso}:** ${recursos[recurso]}</p>`;
        }
    }

    // Publicar resultado final
    document.getElementById('ganador-combate').textContent = `¡El GANADOR es ${ganador}!`;
    document.getElementById('recursos-obtenidos').innerHTML = `
        <h4>Recursos obtenidos de ${perdedor.nombre}:</h4>
        ${recursosHTML || '<p>— Sin recursos por derrota. —</p>'}
    `;
    // Asegurarse de que la última ronda se marque como finalizada
    registro.innerHTML += `<p class="final-combate">**COMBATE FINALIZADO**</p>`;

    mostrarPaso('final');
}


// =======================================================================
// INICIALIZACIÓN
// =======================================================================

document.addEventListener('DOMContentLoaded', () => {
    llenarSelectsUnidades();
    mostrarPaso(1);
});