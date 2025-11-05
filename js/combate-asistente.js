// =======================================================================
// DATOS GLOBALES: UNIDADES Y MODIFICADORES
// =======================================================================

const unidadesDisponibles = {
    Gobernador: [
        { 
            nombre: "Vigilante", ataqueBase: 3, salud: 4, 
            dadosAtaque: { Espiritual: 4, Físico: 4 }, // D4 es el máximo
            golpePoder: 1, // +1 al ataque
            atributosFijos: { Fe: 1, Valor: 1, Conocimiento: 1 }, 
            recursosDerrota: { Miedo: 2, Superstición: 1, Valor: 0, Fe: 0, Conocimiento: 0 } 
        },
        { 
            nombre: "Aldeanos Furiosos", ataqueBase: 3, salud: 6, 
            dadosAtaque: { Espiritual: 4, Físico: 6 }, // D4 o D6 es el máximo
            golpePoder: 2, // +2 al ataque
            atributosFijos: { Fe: 2, Valor: 1, Conocimiento: 0 },  
            recursosDerrota: { Miedo: 6, Superstición: 2, Valor: 0, Fe: 0, Conocimiento: 0 } 
        },
        { 
            nombre: "Escuadrón de Soldados", ataqueBase: 6, salud: 8, 
            dadosAtaque: { Espiritual: 8, Físico: 8 }, // D8 es el máximo
            golpePoder: 3, // +3 al ataque
            atributosFijos: { Fe: 1, Valor: 3, Conocimiento: 2 },  
            recursosDerrota: { Miedo: 8, Superstición: 4, Valor: 0, Fe: 0, Conocimiento: 0 } 
        },
        { 
            nombre: "Guerrero Sagrado", ataqueBase: 14, salud: 12, 
            dadosAtaque: { Espiritual: 12, Físico: 12 }, // D12 es el máximo
            golpePoder: 5, // +5 al ataque
            atributosFijos: { Fe: 6, Valor: 5, Conocimiento: 3 },  
            recursosDerrota: { Miedo: 10, Superstición: 8, Valor: 0, Fe: 0, Conocimiento: 0 } 
        }
    ],
    Brujo: [
        // Clase Inmaterial (usa D4)
        { 
            nombre: "Espectro", ataqueBase: 1, salud: 4, clase: "Inmaterial", dadoAtaque: 4,
            atributosFijos: { Maldicion: 1, Miedo: 0, Supersticion: 0 }, 
            recursosDerrota: { Miedo: 0, Superstición: 0, Valor: 1, Fe: 1, Conocimiento: 1 } 
        },
        { 
            nombre: "Fantasma", ataqueBase: 2, salud: 5, clase: "Inmaterial", dadoAtaque: 4,
            atributosFijos: { Maldicion: 2, Miedo: 0, Supersticion: 0 }, 
            recursosDerrota: { Miedo: 0, Superstición: 0, Valor: 2, Fe: 1, Conocimiento: 1 } 
        },
        { 
            nombre: "Poltergeist", ataqueBase: 3, salud: 6, clase: "Inmaterial", dadoAtaque: 4,
            atributosFijos: { Maldicion: 3, Miedo: 0, Supersticion: 0 }, 
            recursosDerrota: { Miedo: 0, Superstición: 0, Valor: 3, Fe: 2, Conocimiento: 1 } 
        },
        // Clase Encarnado (usa D6)
        { 
            nombre: "Zombie", ataqueBase: 2, salud: 7, clase: "Encarnado", dadoAtaque: 6,
            atributosFijos: { Voracidad: 2, Miedo: 0, Supersticion: 0 }, 
            recursosDerrota: { Miedo: 0, Superstición: 0, Valor: 3, Fe: 2, Conocimiento: 2 } 
        },
        { 
            nombre: "Esqueleto", ataqueBase: 1, salud: 8, clase: "Encarnado", dadoAtaque: 6,
            atributosFijos: { Frenesí: 1, Miedo: 0, Supersticion: 0 }, 
            recursosDerrota: { Miedo: 0, Superstición: 0, Valor: 3, Fe: 3, Conocimiento: 2 } 
        },
        { 
            nombre: "Demonio", ataqueBase: 2, salud: 9, clase: "Encarnado", dadoAtaque: 6,
            atributosFijos: { Crueldad: 2, Miedo: 0, Supersticion: 0 }, 
            recursosDerrota: { Miedo: 0, Superstición: 0, Valor: 4, Fe: 3, Conocimiento: 2 } 
        },
        // Clase Monstruo (usa D8, D9, D12)
        { 
            nombre: "Planta Carnívora", ataqueBase: 5, salud: 10, clase: "Monstruo", dadoAtaque: 8,
            atributosFijos: { Destruccion: 5, Miedo: 0, Supersticion: 0 }, 
            recursosDerrota: { Miedo: 0, Superstición: 0, Valor: 6, Fe: 4, Conocimiento: 3 } 
        },
        { 
            nombre: "Árbol Maligno", ataqueBase: 7, salud: 12, clase: "Monstruo", dadoAtaque: 9,
            atributosFijos: { Destruccion: 7, Miedo: 0, Supersticion: 0 }, 
            recursosDerrota: { Miedo: 0, Superstición: 0, Valor: 10, Fe: 6, Conocimiento: 4 } 
        },
        { 
            nombre: "Ogro", ataqueBase: 9, salud: 14, clase: "Monstruo", dadoAtaque: 12,
            atributosFijos: { Destruccion: 9, Miedo: 0, Supersticion: 0 },  
            recursosDerrota: { Miedo: 0, Superstición: 0, Valor: 14, Fe: 8, Conocimiento: 6 } 
        }
    ]
};

const maldiciones = {
    "Ninguna": {
        costo: 0,
        efectoBrujoHP: 0,
        efectosGobernador: {}
    },
    "Niebla Pestilente": {
        costo: 10,
        efectoBrujoHP: 1,
        efectosGobernador: {
            "Vigilante": { Fe: -1 },
            "Aldeanos Furiosos": {},
            "Escuadrón de Soldados": {},
            "Guerrero Sagrado": {}
        }
    },
    "Lluvia de Sangre": {
        costo: 20,
        efectoBrujoHP: 2,
        efectosGobernador: {
            "Vigilante": { Valor: -1 },
            "Aldeanos Furiosos": { Fe: -2 },
            "Escuadrón de Soldados": { Fe: -2 },
            "Guerrero Sagrado": {}
        }
    },
    "Maldición de Sombras Aladas": {
        costo: 30,
        efectoBrujoHP: 3,
        efectosGobernador: {
            "Vigilante": { Fe: -2 },
            "Aldeanos Furiosos": { Fe: -3 },
            "Escuadrón de Soldados": { Conocimiento: -1 },
            "Guerrero Sagrado": {}
        }
    }
};

const bendiciones = {
    "Ninguna": {
        costo: 0,
        efectoGobernadorFe: 0,
        efectoGoberreroSagradoFe: 0,
        efectosBrujoHP: 0
    },
    "Plegaria": {
        costo: 5,
        efectoGobernadorFe: 1, 
        efectoGoberreroSagradoFe: 2, 
        efectosBrujoHP: 1, 
    },
    "Cántico Ferviente": {
        costo: 10,
        efectoGobernadorFe: 2, 
        efectoGoberreroSagradoFe: 3, 
        efectosBrujoHP: 0, 
    },
    "Exorcismo": {
        costo: 15,
        efectoGobernadorFe: 3, 
        efectoGoberreroSagradoFe: 5, 
        efectosBrujoHP: 0, 
    }
};

const artilugios = {
    "Ninguno": {},
    "Cristal Transmutador": {
        tipo: "Espiritual", // Afecta a Inmaterial
        efectos: {
            "Vigilante": { ataqueFijo: 2, dadoAdicional: 0 },
            "Escuadrón de Soldados": { ataqueFijo: 3, dadoAdicional: 0 },
            "Guerrero Sagrado": { ataqueFijo: 4, dadoAdicional: 0 },
        }
    },
    "Saeta Cáustica": {
        tipo: "Físico", // Afecta a Encarnado y Monstruo
        // Dado Adicional D4 (ahora consumible)
        efectos: {
            "Escuadrón de Soldados": { ataqueFijo: 0, dadoAdicional: 4 }, 
            "Guerrero Sagrado": { ataqueFijo: 0, dadoAdicional: 4 },      
        }
    },
    "Orbe Explosivo": {
        tipo: "Físico", // Afecta a Encarnado y Monstruo
        // Dado Adicional D8 (consumible)
        efectos: {
            "Guerrero Sagrado": { ataqueFijo: 0, dadoAdicional: 8 }, 
        }
    }
};


// Objeto para guardar el estado y los datos del combate (usando copias de la unidad)
let estadoCombate = {
    atacante: { nombre: 'N/A', ataqueBase: 0, salud: 0, modificador: 0, hpInicial: 0, atributosFijos: {}, artilugioAtaqueFijo: 0, artilugioDadoAdicional: 0 },
    defensor: { nombre: 'N/A', ataqueBase: 0, salud: 0, modificador: 0, hpInicial: 0, atributosFijos: {}, artilugioAtaqueFijo: 0, artilugioDadoAdicional: 0 },
    rolAtacante: null, 
    rolDefensor: null,
    iniciativa: null,
    ronda: 0,
    artilugioUsosRestantes: 0 // Usado para Saeta Cáustica y Orbe Explosivo (consumibles)
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

// Función auxiliar para obtener el dado de ataque
function obtenerDadoAtaque(atacante, defensor) {
    const rolAtacante = (atacante === estadoCombate.atacante) ? estadoCombate.rolAtacante : estadoCombate.rolDefensor;
    
    // Lógica para el Brujo
    if (rolAtacante === 'Brujo') {
        return atacante.dadoAtaque; 
    } 
    
    // Lógica para el Gobernador
    if (rolAtacante === 'Gobernador') {
        const claseDefensor = defensor.clase;
        
        if (claseDefensor === 'Inmaterial') {
            return atacante.dadosAtaque.Espiritual;
        } else { // Encarnado o Monstruo
            return atacante.dadosAtaque.Físico;
        }
    }
    
    // Fallback (no debería pasar)
    return 6; 
}


// Función de tirada de dado modificada para recibir el número de caras
function simularTirada(ataqueTotal, numCarasDado) {
    const dado = Math.floor(Math.random() * numCarasDado) + 1;
    const totalAtaque = ataqueTotal + dado;
    return { dado, totalAtaque, numCarasDado };
}


// Función auxiliar para recalcular el ataqueBase sumando todos los atributos fijos
function recalcularAtaqueBase(unidad) {
    if (unidad.atributosFijos) {
        let nuevoAtaqueBase = 0;
        for (const attr in unidad.atributosFijos) {
            if (typeof unidad.atributosFijos[attr] === 'number') {
                nuevoAtaqueBase += unidad.atributosFijos[attr];
            }
        }
        unidad.ataqueBase = nuevoAtaqueBase;
        return nuevoAtaqueBase;
    }
    return unidad.ataqueBase; 
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

    // Propiedades base para las unidades de combate
    const baseUnitProps = { 
        modificador: 0, 
        artilugioAtaqueFijo: 0, 
        artilugioDadoAdicional: 0 
    };

    // Crear una copia profunda de la unidad para poder modificar su HP, Ataque y Atributos
    if (estadoCombate.rolAtacante === 'Gobernador') {
        estadoCombate.atacante = { 
            ...unidadGov, 
            ...baseUnitProps, 
            hpInicial: unidadGov.salud, 
            atributosFijos: { ...unidadGov.atributosFijos } 
        };
        estadoCombate.defensor = { 
            ...unidadBru, 
            ...baseUnitProps, 
            hpInicial: unidadBru.salud, 
            atributosFijos: { ...unidadBru.atributosFijos } 
        };
    } else {
        estadoCombate.atacante = { 
            ...unidadBru, 
            ...baseUnitProps, 
            hpInicial: unidadBru.salud, 
            atributosFijos: { ...unidadBru.atributosFijos } 
        };
        estadoCombate.defensor = { 
            ...unidadGov, 
            ...baseUnitProps, 
            hpInicial: unidadGov.salud, 
            atributosFijos: { ...unidadGov.atributosFijos } 
        };
    }
    
    document.getElementById('registro-combate').innerHTML = ''; 
    
    // ==========================================================
    // LÓGICA: Salto de Paso 3 si Gobernador ataca a Monstruo
    // ==========================================================
    
    // Verificamos si el Gobernador ataca (es atacante) Y si el defensor es un Monstruo
    const esGobernadorAtacante = (estadoCombate.rolAtacante === 'Gobernador');
    const esBrujoDefensorMonstruo = (estadoCombate.defensor.clase === 'Monstruo');

    let siguientePaso = 3; // Por defecto va al Paso 3 (Huida)
    let registro = document.getElementById('registro-combate');

    if (esGobernadorAtacante && esBrujoDefensorMonstruo) {
        siguientePaso = 4; // Salta la Huida
        registro.innerHTML += '<p class="alerta">**Nota:** Los Monstruos NO pueden huir. Saltando al Paso 4.</p>';
    }

    avanzarPaso(siguientePaso);
}

// PASO 3 (Lógica de Huida)
function iniciarHuida() {
    const tiradaHuida = Math.floor(Math.random() * 8) + 1; // Dado de 8 caras (D8)
    let resultadoHuida;
    let registro = document.getElementById('registro-combate');
    
    // Reglas de Huida: 1 a 6 es fallo, 7 u 8 es éxito
    if (tiradaHuida >= 7) { 
        resultadoHuida = `¡Fiuuu! ${estadoCombate.defensor.nombre} sacó un **${tiradaHuida}**, ¡Logró huir!`;
        registro.innerHTML += `<p class="exito">${resultadoHuida}</p>`;
        
        // Finaliza el combate
        document.getElementById('ganador-combate').textContent = `Combate finalizado por HUÍDA exitosa de ${estadoCombate.defensor.nombre}.`;
        mostrarPaso('final');
        return;
    } else { // 1 a 6
        resultadoHuida = `¡Ups! ${estadoCombate.defensor.nombre} intentó huir, pero solo obtuvo **${tiradaHuida}**. El combate continúa.`;
        registro.innerHTML += `<p class="fallo">${resultadoHuida}</p>`;
        
        // Continúa al Paso 4
        avanzarPaso(4);
    }
}

// Llenar los menús desplegables de Modificadores (PASO 4)
function llenarSelectsModificadores() {
    const selectMal = document.getElementById('select-maldicion');
    const selectBen = document.getElementById('select-bendicion');
    
    for (const nombre in maldiciones) {
        const option = document.createElement('option');
        option.value = nombre; 
        option.textContent = nombre;
        selectMal.appendChild(option);
    }
    
    for (const nombre in bendiciones) {
        const option = document.createElement('option');
        option.value = nombre; 
        option.textContent = nombre;
        selectBen.appendChild(option);
    }
}

// Función para manejar la visibilidad del select de cantidad si se selecciona un Artilugio Consumible
function manejarVisibilidadCantidadOrbe() {
    const selectArt = document.getElementById('select-artilugio');
    const grupoOrbe = document.getElementById('grupo-cantidad-orbe');

    if (!grupoOrbe || !selectArt) {
        return; 
    }
    
    const artilugioSeleccionado = selectArt.value;
    const esConsumible = (artilugioSeleccionado === "Orbe Explosivo" || artilugioSeleccionado === "Saeta Cáustica");
    
    // Si el artilugio es 'Orbe Explosivo' O 'Saeta Cáustica', mostrar el selector de cantidad.
    if (esConsumible) {
        
        // --- Lógica para actualizar la etiqueta del Select ---
        const selectCantidad = grupoOrbe.querySelector('#select-cantidad-orbe');
        if (selectCantidad) {
            
            // 1. Limpiar opciones existentes
            selectCantidad.innerHTML = '';
            
            // 2. Crear las nuevas opciones con el nombre del artilugio seleccionado
            for (let i = 1; i <= 2; i++) {
                const option = document.createElement('option');
                option.value = i;
                // Usar el nombre del artilugio
                const nombrePlural = (i === 1) ? artilugioSeleccionado : artilugioSeleccionado + 's';
                option.textContent = `${i} ${nombrePlural}`; 
                selectCantidad.appendChild(option);
            }
        }
        
        // Opcional: Actualizar la etiqueta principal
        const label = grupoOrbe.querySelector('label');
        if (label) {
             label.textContent = `Cantidad de ${artilugioSeleccionado}s (Máx. 2):`;
        }
        
        grupoOrbe.style.display = 'block';
    } else {
        grupoOrbe.style.display = 'none';
    }
}


// Llenar los menús desplegables de Artilugios (PASO 5) de forma condicional
function llenarSelectsArtilugiosCondicional(nombreUnidadGov) {
    const selectArt = document.getElementById('select-artilugio');
    selectArt.innerHTML = ''; // Limpiar opciones anteriores

    // 1. Artilugios disponibles por unidad:
    let artilugiosPermitidos = ["Ninguno"]; 
    
    if (nombreUnidadGov === "Vigilante") {
        artilugiosPermitidos.push("Cristal Transmutador");
    } else if (nombreUnidadGov === "Escuadrón de Soldados") {
        artilugiosPermitidos.push("Cristal Transmutador");
        artilugiosPermitidos.push("Saeta Cáustica");
    } else if (nombreUnidadGov === "Guerrero Sagrado") {
        artilugiosPermitidos.push("Cristal Transmutador");
        artilugiosPermitidos.push("Saeta Cáustica");
        artilugiosPermitidos.push("Orbe Explosivo");
    }

    // 2. Llenar el select con solo los permitidos
    for (const nombre of artilugiosPermitidos) {
        if (artilugios[nombre]) { 
            const option = document.createElement('option');
            option.value = nombre; 
            option.textContent = nombre;
            selectArt.appendChild(option);
        }
    }
    
    // También aseguramos que el selector de cantidad de Orbe esté oculto al recargar este select
    const grupoOrbe = document.getElementById('grupo-cantidad-orbe');
    if (grupoOrbe) {
        grupoOrbe.style.display = 'none';
    }
}

// PASO 4 - Aplicar Modificadores y Avanzar
function aplicarModificadoresYAvanzar() {
    const maldicionSeleccionada = document.getElementById('select-maldicion').value;
    const bendicionSeleccionada = document.getElementById('select-bendicion').value;
    
    const datosMal = maldiciones[maldicionSeleccionada];
    const datosBen = bendiciones[bendicionSeleccionada];
    
    const { atacante, defensor, rolAtacante, rolDefensor } = estadoCombate;
    let logModificadores = [];

    const unidadGobernador = (rolAtacante === 'Gobernador') ? atacante : defensor;
    const unidadBrujo = (rolAtacante === 'Brujo') ? atacante : defensor;

    // --- A. EFECTOS DE MALDICIONES (BRUJO) ---
    // 1. HP para la Unidad del Brujo (+HP)
    if (datosMal.efectoBrujoHP > 0) {
        unidadBrujo.salud += datosMal.efectoBrujoHP;
        unidadBrujo.hpInicial = unidadBrujo.salud; 
        logModificadores.push(`Maldición: ${unidadBrujo.nombre} recibe +${datosMal.efectoBrujoHP} HP.`);
    }

    // 2. Efectos en Atributos Fijos del Gobernador (Debilitadores)
    const efectosEnGov = datosMal.efectosGobernador[unidadGobernador.nombre];
    
    if (efectosEnGov && Object.keys(efectosEnGov).length > 0) {
        for (const atributo in efectosEnGov) {
            if (unidadGobernador.atributosFijos && unidadGobernador.atributosFijos[atributo] !== undefined) {
                unidadGobernador.atributosFijos[atributo] += efectosEnGov[atributo]; 
                logModificadores.push(`Maldición: ${unidadGobernador.nombre} recibe ${atributo} ${efectosEnGov[atributo]}.`);
            }
        }
    }
    
    // --- B. EFECTOS DE BENDICIONES (GOBERNADOR) ---
    // 3. HP Debilitantes para unidades específicas del Brujo (-HP)
    if (datosBen.efectosBrujoHP > 0) {
        if (["Espectro", "Fantasma", "Poltergeist"].includes(unidadBrujo.nombre)) {
            unidadBrujo.salud -= datosBen.efectosBrujoHP;
            unidadBrujo.hpInicial = unidadBrujo.salud; 
            logModificadores.push(`Bendición: ${unidadBrujo.nombre} pierde ${datosBen.efectosBrujoHP} HP.`);
        }
    }

    // 4. Fe para la Unidad del Gobernador (Potenciador)
    if (unidadGobernador.atributosFijos && unidadGobernador.atributosFijos.Fe !== undefined) {
        let feMod = 0;
        
        if (unidadGobernador.nombre === "Guerrero Sagrado" && datosBen.efectoGoberreroSagradoFe) {
            feMod = datosBen.efectoGoberreroSagradoFe;
        } else if (datosBen.efectoGobernadorFe) {
            feMod = datosBen.efectoGobernadorFe;
        }
        
        if (feMod > 0) {
            unidadGobernador.atributosFijos.Fe += feMod;
            logModificadores.push(`Bendición: ${unidadGobernador.nombre} recibe +${feMod} Fe.`);
        }
    }

    // --- RECALCULAR ATAQUE BASE (CRUCIAL) ---
    recalcularAtaqueBase(unidadGobernador);
    recalcularAtaqueBase(unidadBrujo);

    // --- PUBLICAR RESULTADOS FINALES DEL PASO 4 ---
    document.getElementById('hp-iniciales-info').innerHTML = `
        HP Iniciales (modificado): 
        <strong>${atacante.nombre}</strong> (HP:${atacante.salud}, A:${atacante.ataqueBase}) 
        vs 
        <strong>${defensor.nombre}</strong> (HP:${defensor.salud}, A:${defensor.ataqueBase})`;

    let registro = document.getElementById('registro-combate');
    registro.innerHTML = '<h4>Registro de Modificadores:</h4>' + logModificadores.map(log => `<p class="mod-log">${log}</p>`).join('');

    // === LÓGICA CONDICIONAL PARA SALTAR EL PASO 5 ===

    // Identificamos quién es la unidad del Gobernador (para esta comprobación)
    const nombreUnidadGov = unidadGobernador.nombre;

    if (nombreUnidadGov === "Aldeanos Furiosos") {
        // Los Aldeanos Furiosos no usan Artilugios: saltamos al Paso 6.
        registro.innerHTML += '<p class="alerta">Los Aldeanos Furiosos NO usan Artilugios. Pasando directo al Combate.</p>';
        avanzarPaso(6);
    } else {
        // Si no son Aldeanos Furiosos, preparamos el Paso 5.

        // Llenamos el select de Artilugios SOLO con los permitidos para la unidad.
        llenarSelectsArtilugiosCondicional(nombreUnidadGov); 
        
        // [Tu nueva línea para inyectar info del defensor en el Paso 5]
        document.getElementById('info-defensor-artilugio').textContent = 
            `${defensor.nombre} (${defensor.clase}).`;
        
        avanzarPaso(5); // Avanza al Paso 5 (Artilugios)
    }
}


// PASO 5 - Aplicar Artilugios y Avanzar
function aplicarArtilugiosYAvanzar() {
    const selectArt = document.getElementById('select-artilugio');
    // Si el select no está cargado (por error o por navegación incorrecta), salimos.
    if (!selectArt) {
        console.error("Error: El select de artilugios no se encontró.");
        return;
    }
    
    const artilugioSeleccionado = selectArt.value;
    const datosArt = artilugios[artilugioSeleccionado];
    
    const { atacante, defensor, rolAtacante, rolDefensor } = estadoCombate;
    let logArtilugio = [];
    let usosArtilugio = 0; // Usamos un nombre genérico para la cantidad de usos

    const unidadGobernador = (rolAtacante === 'Gobernador') ? atacante : defensor;
    const unidadBrujo = (rolAtacante === 'Brujo') ? atacante : defensor;
    
    // Reiniciar usos antes de empezar, para evitar arrastrar usos de un combate anterior
    estadoCombate.artilugioUsosRestantes = 0; 

    // Si se seleccionó un artilugio (y la unidad es del Gobernador)
    if (artilugioSeleccionado !== "Ninguno" && unidadGobernador.atributosFijos) {
        const nombreGov = unidadGobernador.nombre;
        const claseBrujo = unidadBrujo.clase;
        const efectosUnidad = datosArt.efectos[nombreGov];
        
        // >>> LÓGICA DE CANTIDAD PARA ARTILUGIOS CONSUMIBLES (Saeta y Orbe) <<<
        const esArtilugioConsumible = (artilugioSeleccionado === "Orbe Explosivo" || artilugioSeleccionado === "Saeta Cáustica");
        
        if (esArtilugioConsumible) {
            const selectCantidad = document.getElementById('select-cantidad-orbe');
            
            if (selectCantidad) {
                // Obtener el valor del select y convertir a entero
                usosArtilugio = parseInt(selectCantidad.value) || 0; 
            } else {
                usosArtilugio = 0; // Si no existe el select (error), no se usa
            }

            if (usosArtilugio < 1) {
                logArtilugio.push(`${artilugioSeleccionado} no fue utilizado (cantidad 0).`);
            } else {
                // Si se usaron, guardamos la cantidad para el control de rondas
                estadoCombate.artilugioUsosRestantes = usosArtilugio;
            }
        }
        // >>> FIN LÓGICA CONSUMIBLES <<<

        // 1. Determinar el tipo de ataque que aplica el artilugio
        const tipoAtaque = (claseBrujo === 'Inmaterial') ? 'Espiritual' : 'Físico';
        
        // 2. Aplicar solo si la unidad tiene efectos definidos y si el tipo de artilugio coincide con la clase del Brujo
        //    Y, si es Consumible, solo si la cantidad es > 0
        if (efectosUnidad && datosArt.tipo === tipoAtaque && (!esArtilugioConsumible || usosArtilugio > 0)) {
            
            // Limpiamos los modificadores de Artilugio antes de reasignar
            unidadGobernador.artilugioAtaqueFijo = 0;
            unidadGobernador.artilugioDadoAdicional = 0;
            
            // Aplicar bono fijo (Cristal Transmutador)
            if (efectosUnidad.ataqueFijo > 0) {
                unidadGobernador.artilugioAtaqueFijo = efectosUnidad.ataqueFijo;
                logArtilugio.push(`${nombreGov} usa ${artilugioSeleccionado}: +${efectosUnidad.ataqueFijo} Ataque ${tipoAtaque}.`);
            }
            
            // Aplicar dado adicional (Saeta y Orbe)
            if (efectosUnidad.dadoAdicional > 0) {
                unidadGobernador.artilugioDadoAdicional = efectosUnidad.dadoAdicional;
                
                // Si es consumible, especificamos los usos
                if (esArtilugioConsumible) {
                     logArtilugio.push(`${nombreGov} usa ${artilugioSeleccionado}: +1D${efectosUnidad.dadoAdicional} (Usos: ${usosArtilugio}).`);
                } else {
                    logArtilugio.push(`${nombreGov} usa ${artilugioSeleccionado}: +1D${efectosUnidad.dadoAdicional} Ataque ${tipoAtaque}.`);
                }
            }
        } else if (artilugioSeleccionado !== "Ninguno" && !esArtilugioConsumible) {
            // Caso: El artilugio (que NO es consumible, solo Cristal) no aplica por unidad o clase de enemigo
            logArtilugio.push(`${nombreGov} seleccionó ${artilugioSeleccionado}, pero **no aplica** contra ${unidadBrujo.nombre} (${claseBrujo}).`);
        } else if (esArtilugioConsumible && usosArtilugio === 0) {
             // Caso: El artilugio consumible fue seleccionado pero con 0 usos
             logArtilugio.push(`Se seleccionó ${artilugioSeleccionado}, pero no se especificó la cantidad de usos.`);
        }
    } else {
        logArtilugio.push(`No se seleccionó Artilugio.`);
    }

    // Ocultar el selector de cantidad de consumibles
    const grupoOrbe = document.getElementById('grupo-cantidad-orbe');
    if (grupoOrbe) {
        grupoOrbe.style.display = 'none';
    }

    // Publicar log y avanzar al combate
    let registro = document.getElementById('registro-combate');
    registro.innerHTML += '<h4>Registro de Artilugios:</h4>' + logArtilugio.map(log => `<p class="mod-log">${log}</p>`).join('');

    avanzarPaso(6); // Ir al paso de combate
}


// PASO 6 (Bucle de Combate - Ejecutar una Ronda)
function ejecutarRonda() {
    if (estadoCombate.atacante.salud <= 0 || estadoCombate.defensor.salud <= 0) {
        finalizarCombate();
        return;
    }

    estadoCombate.ronda++;
    const { atacante, defensor } = estadoCombate;
    
    // --- OBTENER DADOS Y TIRAR ---
    const dadoA = obtenerDadoAtaque(atacante, defensor);
    const dadoD = obtenerDadoAtaque(defensor, atacante);
    
    const rolA = estadoCombate.rolAtacante;
    const rolD = estadoCombate.rolDefensor;
    
    // Tiradas base (Ataque Base + Modificador)
    let resA = simularTirada(atacante.ataqueBase + atacante.modificador, dadoA);
    let resD = simularTirada(defensor.ataqueBase + defensor.modificador, dadoD);

    // --- APLICAR MODIFICADORES POST-TIRADA ---
    let logModificadoresRonda = "";
    
    // 1. ATACANTE: Golpe de Poder (Solo Gobernador) y Artilugios
    if (rolA === 'Gobernador') {
        // A. Golpe de Poder
        if (resA.dado === resA.numCarasDado) {
            const golpe = atacante.golpePoder;
            resA.totalAtaque += golpe;
            logModificadoresRonda += `¡${atacante.nombre} da un Golpe de Poder! (+${golpe})!`;
        }
        
        // B. Artilugio (Ataque Fijo y Dado Adicional)
        if (atacante.artilugioAtaqueFijo > 0 || atacante.artilugioDadoAdicional > 0) {
            
            // --- CONTROL CONSUMIBLE (SAETA CÁUSTICA Y ORBE EXPLOSIVO) ---
            // Los consumibles tienen Dado Adicional D4 (Saeta) o D8 (Orbe).
            const dadoArtilugio = atacante.artilugioDadoAdicional;
            const esArtilugioConsumible = (dadoArtilugio === 8 || dadoArtilugio === 4); 
            let aplicaArtilugio = true;
            
            if (esArtilugioConsumible && estadoCombate.artilugioUsosRestantes <= 0) {
                aplicaArtilugio = false; // No quedan usos
            }
            // --- FIN CONTROL CONSUMIBLE ---
            
            if (aplicaArtilugio) {
                
                // Bono Fijo (Aplica para Cristal Transmutador)
                resA.totalAtaque += atacante.artilugioAtaqueFijo;
                logModificadoresRonda += (logModificadoresRonda ? " | " : "") + `Artilugio: +${atacante.artilugioAtaqueFijo} Fijo.`;
                
                // Dado Adicional (Aplica para Saeta y Orbe)
                if (atacante.artilugioDadoAdicional > 0) {
                    const tiradaExtra = simularTirada(0, atacante.artilugioDadoAdicional);
                    resA.totalAtaque += tiradaExtra.dado; 
                    logModificadoresRonda += (logModificadoresRonda ? " | " : "") + ` Artilugio Dado: +${tiradaExtra.dado} (D${tiradaExtra.numCarasDado})`;

                    // Consumir el uso
                    if (esArtilugioConsumible) {
                        estadoCombate.artilugioUsosRestantes--;
                        logModificadoresRonda += ` [Usos restantes: ${estadoCombate.artilugioUsosRestantes}]`;
                        
                        // Si se agotaron, limpiamos el modificador para las siguientes rondas
                        if (estadoCombate.artilugioUsosRestantes === 0) {
                           atacante.artilugioAtaqueFijo = 0;
                           atacante.artilugioDadoAdicional = 0;
                        }
                    }
                }
            } else if (esArtilugioConsumible && estadoCombate.artilugioUsosRestantes === 0) {
                 logModificadoresRonda += (logModificadoresRonda ? " | " : "") + ` Artilugio Consumible: ¡Usos agotados!`;
            }
        }
    }
    
    // 2. DEFENSOR: Golpe de Poder (Solo Gobernador)
    if (rolD === 'Gobernador' && resD.dado === resD.numCarasDado) {
        const golpe = defensor.golpePoder;
        resD.totalAtaque += golpe;
        logModificadoresRonda += (logModificadoresRonda ? " | " : "") + `¡${defensor.nombre} da un Golpe de Poder (+${golpe})!`;
    }
    
    // --- RESOLUCIÓN Y DAÑO ---

    let ganadorRonda = "Empate";
    
    if (resA.totalAtaque > resD.totalAtaque) {
        defensor.salud -= 1;
        ganadorRonda = atacante.nombre;
    } else if (resD.totalAtaque > resA.totalAtaque) {
        atacante.salud -= 1;
        ganadorRonda = defensor.nombre;
    } 

    // --- REGISTRAR SÓLO LA ÚLTIMA RONDA ---
    
    let registro = document.getElementById('registro-combate');
    let nuevoRegistro = '<h4>Registro de Rondas:</h4>';
    
    // Información de Modificadores (Golpe de Poder / Artilugio)
    if (logModificadoresRonda) {
        nuevoRegistro += `<p class="alerta">${logModificadoresRonda}</p>`;
    }
    
    // Log de Tiradas
    nuevoRegistro += `<p class="ronda-activa">
        <strong>Ronda ${estadoCombate.ronda}</strong><br> 
        Ataque ${atacante.nombre}: [${resA.dado} / D${resA.numCarasDado} + ${atacante.ataqueBase}] = <strong>${resA.totalAtaque}</strong><br>
        Ataque ${defensor.nombre}: [${resD.dado} / D${resD.numCarasDado} + ${defensor.ataqueBase}] = <strong>${resD.totalAtaque}</strong><br>
        <span class="resultado-ronda">Gana: ${ganadorRonda}. 
        HP Act.: ${atacante.salud} / ${defensor.salud}</span>
    </p>`;

    registro.innerHTML = nuevoRegistro; 
    
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

    for (const recurso in recursos) {
        if (recursos[recurso] > 0) {
            recursosHTML += `<p>${recurso}: <span>${recursos[recurso]}</span></p>`;
        }
    }

    document.getElementById('ganador-combate').textContent = `Vencedor: ${ganador}`;
    document.getElementById('recursos-obtenidos').innerHTML = `
        <h4>Recursos obtenidos de ${perdedor.nombre}:</h4>
        ${recursosHTML || '<p>— Sin recursos por derrota. —</p>'}
    `;
    registro.innerHTML += `<p class="final-combate">EL COMBATE HA TERMINADO</p>`;

    mostrarPaso('final');
}


// =======================================================================
// INICIALIZACIÓN
// =======================================================================

document.addEventListener('DOMContentLoaded', () => {
    llenarSelectsUnidades();
    llenarSelectsModificadores();
    
    // Listener para mostrar/ocultar el selector de cantidad de artilugios
    const selectArt = document.getElementById('select-artilugio');
    if (selectArt) {
        selectArt.addEventListener('change', manejarVisibilidadCantidadOrbe);
    }
    
    mostrarPaso(1);
    // Nota: La función cargarImagenHeaderAleatoria no está incluida, 
    // pero si la tienes en tu HTML, mantén la llamada.
});