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
    ]
    ,
    Brujo: [
        // Clase Inmaterial (usa D4)
        { 
            nombre: "Espectro", ataqueBase: 1, salud: 4, clase: "Inmaterial", dadoAtaque: 4,
            atributosFijos: { Maldicion: 1, Miedo: 0, Supersticion: 0 }, 
            recursosDerrota: { Miedo: 0, Superstición: 0, Valor: 1, Fe: 1, Conocimiento: 1 } 
        },
        { 
            nombre: "Fantasma", ataqueBase: 3, salud: 5, clase: "Inmaterial", dadoAtaque: 4,
            atributosFijos: { Maldicion: 3, Miedo: 0, Supersticion: 0 }, 
            recursosDerrota: { Miedo: 0, Superstición: 0, Valor: 2, Fe: 1, Conocimiento: 1 } 
        },
        { 
            nombre: "Poltergeist", ataqueBase: 4, salud: 6, clase: "Inmaterial", dadoAtaque: 4,
            atributosFijos: { Maldicion: 4, Miedo: 0, Supersticion: 0 }, 
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
            nombre: "Ogro", ataqueBase: 12, salud: 16, clase: "Monstruo", dadoAtaque: 12,
            atributosFijos: { Destruccion: 8, Aplastamiento: 4, Miedo: 0, Supersticion: 0 },  
            recursosDerrota: { Miedo: 0, Superstición: 0, Valor: 14, Fe: 8, Conocimiento: 6 } 
        }
    ]
};

const maldiciones = {
    "Ninguna": {
        costo: 0,
        efectosBrujoHPPorClase: { Inmaterial: 0, Encarnado: 0, Monstruo: 0 },
        efectosGobernador: {},
        recursosBonus: {} 
    },
    "Niebla Pestilente": {
        costo: 10,
        efectosBrujoHPPorClase: { Inmaterial: 1, Encarnado: 2, Monstruo: 3 },
        efectosGobernador: {
            "Vigilante": { Fe: -1 },
            "Aldeanos Furiosos": {},
            "Escuadrón de Soldados": {},
            "Guerrero Sagrado": {}
        },
        recursosBonus: { Miedo: 1, Superstición: 2 } 
    },
    "Lluvia de Sangre": {
        costo: 20,
        efectosBrujoHPPorClase: { Inmaterial: 2, Encarnado: 3, Monstruo: 4 },
        efectosGobernador: {
            "Vigilante": { Valor: -1 },
            "Aldeanos Furiosos": { Fe: -2 },
            "Escuadrón de Soldados": { Fe: -2 },
            "Guerrero Sagrado": {}
        },
        recursosBonus: { Miedo: 2, Superstición: 3 } 
    },
    "Maldición de Sombras Aladas": {
        costo: 30,
        efectosBrujoHPPorClase: { Inmaterial: 3, Encarnado: 4, Monstruo: 5 },
        efectosGobernador: {
            "Vigilante": { Fe: -2 },
            "Aldeanos Furiosos": { Fe: -3 },
            "Escuadrón de Soldados": { Conocimiento: -1 },
            "Guerrero Sagrado": {}
        },
        recursosBonus: { Miedo: 3, Superstición: 4 } 
    }
};

const bendiciones = {
    "Ninguna": {
        costo: 0,
        efectoGobernadorFe: 0,
        efectoGoberreroSagradoFe: 0,
        efectosBrujoHP: 0,
        recursosBonus: {} 
    },
    "Plegaria": {
        costo: 5,
        efectoGobernadorFe: 1, 
        efectoGoberreroSagradoFe: 2, 
        efectosBrujoHP: 1, 
        recursosBonus: { Valor: 1, Fe: 2 } 
    },
    "Cántico Ferviente": {
        costo: 10,
        efectoGobernadorFe: 2, 
        efectoGoberreroSagradoFe: 3, 
        efectosBrujoHP: 0, 
        recursosBonus: { Valor: 3, Fe: 2 } 
    },
    "Exorcismo": {
        costo: 15,
        efectoGobernadorFe: 3, 
        efectoGoberreroSagradoFe: 5, 
        efectosBrujoHP: 0, 
        recursosBonus: { Valor: 4, Fe: 3 } 
    }
};

const artilugios = {
    "Ninguno": { recursosBonus: {} }, // Añadido
    "Cristal Transmutador": {
        tipo: "Espiritual", 
        efectos: {
            "Vigilante": { ataqueFijo: 2, dadoAdicional: 0 },
            "Escuadrón de Soldados": { ataqueFijo: 3, dadoAdicional: 0 },
            "Guerrero Sagrado": { ataqueFijo: 4, dadoAdicional: 0 },
        },
        recursosBonus: { Conocimiento: 1 } // NUEVO
    },
    "Saeta Cáustica": {
        tipo: "Físico", 
        efectos: {
            "Escuadrón de Soldados": { ataqueFijo: 0, dadoAdicional: 4 }, 
            "Guerrero Sagrado": { ataqueFijo: 0, dadoAdicional: 4 },      
        },
        recursosBonus: { Conocimiento: 2 } // NUEVO
    },
    "Orbe Explosivo": {
        tipo: "Físico", 
        efectos: {
            "Guerrero Sagrado": { ataqueFijo: 0, dadoAdicional: 8 }, 
        },
        recursosBonus: { Conocimiento: 3 } // NUEVO
    }
};


// Objeto para guardar el estado y los datos del combate (usando copias de la unidad)
let estadoCombate = {
    atacante: { 
        nombre: 'N/A', ataqueBase: 0, salud: 0, modificador: 0, hpInicial: 0, atributosFijos: {}, 
        artilugioAtaqueFijo: 0, artilugioDadoAdicional: 0,
        saetaUsosRestantes: 0,      
        orbeUsosRestantes: 0        
    },
    defensor: { 
        nombre: 'N/A', ataqueBase: 0, salud: 0, modificador: 0, hpInicial: 0, atributosFijos: {}, 
        artilugioAtaqueFijo: 0, artilugioDadoAdicional: 0,
        saetaUsosRestantes: 0,      
        orbeUsosRestantes: 0        
    },
    rolAtacante: null, 
    rolDefensor: null,
    iniciativa: null,
    ronda: 0,
    
    // Almacenar los nombres de los modificadores aplicados
    maldicionAplicada: 'Ninguna',
    bendicionAplicada: 'Ninguna',
    artilugiosGanancia: [], // NUEVO: Para rastrear artilugios usados/activos
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
        artilugioDadoAdicional: 0,
        saetaUsosRestantes: 0,
        orbeUsosRestantes: 0
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
    
    // Resetear modificadores de combate guardados
    estadoCombate.maldicionAplicada = 'Ninguna';
    estadoCombate.bendicionAplicada = 'Ninguna';
    estadoCombate.artilugiosGanancia = []; // NUEVO: Limpiar antes de cada combate
    
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
        document.getElementById('ganador-combate').innerHTML = `Combate finalizado por HUÍDA exitosa de <span class="nombre-perdedor">${estadoCombate.defensor.nombre}</span>.`;
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


// NUEVA FUNCIÓN AUXILIAR para rellenar los selects de cantidad de consumibles
function precargarSelectCantidad(selectId, nombreArtilugio) {
    const selectCantidad = document.getElementById(selectId);
    if (!selectCantidad) return;
    
    selectCantidad.innerHTML = ''; // Limpiar opciones
    
    // Opción por defecto (0 usos)
    let optionNinguno = document.createElement('option');
    optionNinguno.value = 0;
    optionNinguno.textContent = `0 ${nombreArtilugio}s`;
    selectCantidad.appendChild(optionNinguno);

    // Opciones de 1 y 2 usos
    for (let i = 1; i <= 2; i++) {
        const option = document.createElement('option');
        option.value = i;
        const nombrePlural = (i === 1) ? nombreArtilugio : nombreArtilugio + 's';
        option.textContent = `${i} ${nombrePlural}`; 
        selectCantidad.appendChild(option);
    }
}

// Llenar los menús desplegables de Artilugios (PASO 5) de forma condicional
function llenarSelectsArtilugiosCondicional(unidadGobernador, unidadBrujo) {
    
    // Ocultar todos los grupos por defecto
    // (Asumiendo que tienes IDs: grupo-cristal, grupo-saeta, grupo-orbe en tu HTML)
    const grupoCristal = document.getElementById('grupo-cristal');
    const grupoSaeta = document.getElementById('grupo-saeta');
    const grupoOrbe = document.getElementById('grupo-orbe');

    if (grupoCristal) grupoCristal.style.display = 'none';
    if (grupoSaeta) grupoSaeta.style.display = 'none';
    if (grupoOrbe) grupoOrbe.style.display = 'none';
    
    // === 1. Lógica para Artilugios Espirituales (CRISTAL TRANSMUTADOR) ===
    
    const esBrujoInmaterial = (unidadBrujo.clase === 'Inmaterial');
    const puedeUsarCristal = ["Vigilante", "Escuadrón de Soldados", "Guerrero Sagrado"].includes(unidadGobernador.nombre);
    
    if (esBrujoInmaterial && puedeUsarCristal && grupoCristal) {
        grupoCristal.style.display = 'block';
    }

    // === 2. Lógica para Artilugios Físicos (SAETA y ORBE) ===

    const esBrujoFisico = (unidadBrujo.clase === 'Encarnado' || unidadBrujo.clase === 'Monstruo');
    
    if (esBrujoFisico) {
        
        // --- SAETA CÁUSTICA (D4) ---
        const puedeUsarSaeta = ["Escuadrón de Soldados", "Guerrero Sagrado"].includes(unidadGobernador.nombre);
        if (puedeUsarSaeta && grupoSaeta) {
            grupoSaeta.style.display = 'block';
             // Asegurar que el select de Saeta tenga 1 o 2
            precargarSelectCantidad('select-cantidad-saeta', 'Saeta Cáustica');
        }

        // --- ORBE EXPLOSIVO (D8) ---
        const puedeUsarOrbe = (unidadGobernador.nombre === "Guerrero Sagrado");
        if (puedeUsarOrbe && grupoOrbe) {
            grupoOrbe.style.display = 'block';
            // Asegurar que el select de Orbe tenga 1 o 2
            precargarSelectCantidad('select-cantidad-orbe', 'Orbe Explosivo');
        }
    }
}

// PASO 4 - Aplicar Modificadores y Avanzar
function aplicarModificadoresYAvanzar() {
    const maldicionSeleccionada = document.getElementById('select-maldicion').value;
    const bendicionSeleccionada = document.getElementById('select-bendicion').value;
    
    // Guardar modificadores seleccionados en el estado
    estadoCombate.maldicionAplicada = maldicionSeleccionada;
    estadoCombate.bendicionAplicada = bendicionSeleccionada;
    
    const datosMal = maldiciones[maldicionSeleccionada];
    const datosBen = bendiciones[bendicionSeleccionada];
    
    const { atacante, defensor, rolAtacante, rolDefensor } = estadoCombate;
    let logModificadores = [];

    const unidadGobernador = (rolAtacante === 'Gobernador') ? atacante : defensor;
    const unidadBrujo = (rolAtacante === 'Brujo') ? atacante : defensor;

    // --- A. EFECTOS DE MALDICIONES (BRUJO) ---
    // 1. HP para la Unidad del Brujo (+HP)
    const claseBrujo = unidadBrujo.clase;
    const hpAdicionalMaldicion = datosMal.efectosBrujoHPPorClase?.[claseBrujo] || 0; 

    if (hpAdicionalMaldicion > 0) {
        unidadBrujo.salud += hpAdicionalMaldicion;
        unidadBrujo.hpInicial = unidadBrujo.salud; 
        logModificadores.push(`Maldición: ${unidadBrujo.nombre} (${claseBrujo}) recibe +${hpAdicionalMaldicion} HP.`);
    }

    // 2. Efectos en Atributos Fijos del Gobernador (Debilitadores)
    const efectosEnGov = datosMal.efectosGobernador[unidadGobernador.nombre];
    
    if (efectosEnGov && Object.keys(efectosEnGov).length > 0) {
        for (const atributo in efectosEnGov) {
            if (unidadGobernador.atributosFijos && unidadGobernador.atributosFijos[atributo] !== undefined) {
                // Asegurarse de que el valor no sea negativo. (El atributo fijo no puede ser menor a 0)
                const nuevoValor = unidadGobernador.atributosFijos[atributo] + efectosEnGov[atributo];
                unidadGobernador.atributosFijos[atributo] = Math.max(0, nuevoValor); 
                logModificadores.push(`Maldición: ${unidadGobernador.nombre} recibe ${efectosEnGov[atributo]} a ${atributo} (actual: ${unidadGobernador.atributosFijos[atributo]}).`);
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
    registro.innerHTML = '<h5>Registro de Modificadores:</h5>' + logModificadores.map(log => `<p class="mod-log">${log}</p>`).join('');

    // === LÓGICA CONDICIONAL PARA SALTAR EL PASO 5 ===

    // Identificamos quién es la unidad del Gobernador (para esta comprobación)
    const nombreUnidadGov = unidadGobernador.nombre;

    if (nombreUnidadGov === "Aldeanos Furiosos") {
        // Los Aldeanos Furiosos no usan Artilugios: saltamos al Paso 6.
        registro.innerHTML += '<p class="alerta">Los Aldeanos Furiosos NO usan Artilugios. Pasando directo al Combate.</p>';
        avanzarPaso(6);
    } else {
        // Si no son Aldeanos Furiosos, preparamos el Paso 5.

        // Llenamos y mostramos condicionalmente los selectores de Artilugios.
        llenarSelectsArtilugiosCondicional(unidadGobernador, unidadBrujo); 
        
        document.getElementById('info-defensor-artilugio').textContent = 
            `${defensor.nombre} (${defensor.clase}).`;
        
        avanzarPaso(5); // Avanza al Paso 5 (Artilugios)
    }
}

// Función auxiliar para publicar el log y avanzar
function publicarLogYAvazar(logArray) {
    let registro = document.getElementById('registro-combate');
    registro.innerHTML += '<h5>Registro de Artilugios:</h5>' + logArray.map(log => `<p class="mod-log">${log}</p>`).join('');

    // Ocultar selects de artilugios al avanzar (por limpieza)
    const grupos = ['grupo-cristal', 'grupo-saeta', 'grupo-orbe'];
    grupos.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    avanzarPaso(6); // Ir al paso de combate
}


// PASO 5 - Aplicar Artilugios y Avanzar
function aplicarArtilugiosYAvanzar() {
    
    const { atacante, defensor, rolAtacante } = estadoCombate;
    let logArtilugio = [];
    
    const unidadGobernador = (rolAtacante === 'Gobernador') ? atacante : defensor;
    const unidadBrujo = (rolAtacante === 'Brujo') ? atacante : defensor;

    // Reiniciar modificadores antes de aplicar los nuevos
    unidadGobernador.artilugioAtaqueFijo = 0;
    unidadGobernador.artilugioDadoAdicional = 0;
    unidadGobernador.saetaUsosRestantes = 0;
    unidadGobernador.orbeUsosRestantes = 0;
    
    // NUEVO: Limpiar la lista de artilugios para ganancia
    estadoCombate.artilugiosGanancia = []; 

    // Si la unidad no puede usar artilugios, salimos después de registrar.
    if (!unidadGobernador.atributosFijos || unidadGobernador.nombre === "Aldeanos Furiosos") {
        logArtilugio.push(`La unidad ${unidadGobernador.nombre} no utiliza Artilugios.`);
        publicarLogYAvazar(logArtilugio);
        return;
    }

    const nombreGov = unidadGobernador.nombre;
    const claseBrujo = unidadBrujo.clase;

    // ==========================================================
    // A. CRISTAL TRANSMUTADOR (Fijo, Espiritual)
    // ==========================================================
    const selectCristal = document.getElementById('select-cristal');
    if (selectCristal && selectCristal.value === "Cristal Transmutador") {
        const datosCristal = artilugios["Cristal Transmutador"];
        const efectosCristal = datosCristal.efectos[nombreGov];
        
        // Solo aplica si el enemigo es Inmaterial
        if (claseBrujo === 'Inmaterial' && efectosCristal) {
            unidadGobernador.artilugioAtaqueFijo = efectosCristal.ataqueFijo;
            logArtilugio.push(`Usando Cristal Transmutador: +${efectosCristal.ataqueFijo} Ataque Espiritual.`);
            estadoCombate.artilugiosGanancia.push("Cristal Transmutador"); // NUEVO
        } else {
            logArtilugio.push(`Cristal Transmutador seleccionado pero no aplicable contra ${unidadBrujo.nombre} (${claseBrujo}).`);
        }
    }

    // ==========================================================
    // B. SAETA CÁUSTICA (Consumible, Físico, D4)
    // ==========================================================
    const selectSaeta = document.getElementById('select-cantidad-saeta');
    let usosSaeta = 0;
    if (selectSaeta) {
        usosSaeta = parseInt(selectSaeta.value) || 0;
    }

    if (usosSaeta > 0) {
        const datosSaeta = artilugios["Saeta Cáustica"];
        const efectosSaeta = datosSaeta.efectos[nombreGov];
        
        // Solo aplica si el enemigo es Físico
        if (claseBrujo !== 'Inmaterial' && efectosSaeta) {
            unidadGobernador.saetaUsosRestantes = usosSaeta;
            logArtilugio.push(`Saeta Cáustica (+1D4) seleccionada con ${usosSaeta} usos.`);
            estadoCombate.artilugiosGanancia.push("Saeta Cáustica"); // NUEVO
        } else {
            logArtilugio.push(`Saeta Cáustica seleccionada (${usosSaeta} usos) pero no aplicable contra ${unidadBrujo.nombre} (${claseBrujo}).`);
        }
    }
    
    // ==========================================================
    // C. ORBE EXPLOSIVO (Consumible, Físico, D8)
    // ==========================================================
    const selectOrbe = document.getElementById('select-cantidad-orbe');
    let usosOrbe = 0;
    if (selectOrbe) {
        usosOrbe = parseInt(selectOrbe.value) || 0;
    }

    if (usosOrbe > 0 && nombreGov === "Guerrero Sagrado") {
        const datosOrbe = artilugios["Orbe Explosivo"];
        const efectosOrbe = datosOrbe.efectos[nombreGov];

        // Solo aplica si el enemigo es Físico
        if (claseBrujo !== 'Inmaterial' && efectosOrbe) {
            unidadGobernador.orbeUsosRestantes = usosOrbe;
            logArtilugio.push(`Orbe Explosivo (+1D8) seleccionada con ${usosOrbe} usos.`);
            estadoCombate.artilugiosGanancia.push("Orbe Explosivo"); // NUEVO
        } else {
            logArtilugio.push(`Orbe Explosivo seleccionada (${usosOrbe} usos) pero no aplicable contra ${unidadBrujo.nombre} (${claseBrujo}).`);
        }
    }
    
    // ==========================================================
    // D. ESTABLECER DADO ADICIONAL PRINCIPAL (PARA EL PASO 6)
    // ==========================================================
    
    // Orbe (D8) tiene preferencia sobre Saeta (D4) si ambos fueron seleccionados y aplican.
    if (unidadGobernador.orbeUsosRestantes > 0) {
        unidadGobernador.artilugioDadoAdicional = artilugios["Orbe Explosivo"].efectos[nombreGov].dadoAdicional; // 8
    } else if (unidadGobernador.saetaUsosRestantes > 0) {
        unidadGobernador.artilugioDadoAdicional = artilugios["Saeta Cáustica"].efectos[nombreGov].dadoAdicional; // 4
    } else {
        unidadGobernador.artilugioDadoAdicional = 0;
    }

    if (unidadGobernador.saetaUsosRestantes > 0 && unidadGobernador.orbeUsosRestantes > 0) {
        logArtilugio.push(`¡Guerrero Sagrado activó DOBLE CONSUMIBLE! Principal: Orbe D8. Secundario: Saeta D4.`);
    }

    publicarLogYAvazar(logArtilugio);
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
        
        // B. Artilugio (Ataque Fijo y Dado Adicional, incluyendo Consumibles Múltiples)
        if (atacante.artilugioAtaqueFijo > 0 || atacante.artilugioDadoAdicional > 0) {
            
            // --- 1. APLICACIÓN DEL ARTILUGIO FIJO (CRISTAL TRANSMUTADOR) ---
            if (atacante.artilugioAtaqueFijo > 0) {
                resA.totalAtaque += atacante.artilugioAtaqueFijo;
                logModificadoresRonda += (logModificadoresRonda ? " | " : "") + `Cristal Fijo: +${atacante.artilugioAtaqueFijo}.`;
            }
            
            // --- 2. APLICACIÓN DEL DADO ADICIONAL (PRINCIPAL Y SECUNDARIO) ---
            
            let dadoAdicionalUsado = 0; // Para el log
            
            // Lógica para Consumibles (Saeta D4, Orbe D8)
            if (atacante.artilugioDadoAdicional > 0) {
                
                // Determinar qué dado estamos usando (si hay usos restantes del dadoPrincipal)
                const dadoPrincipal = atacante.artilugioDadoAdicional;
                
                // Usamos el Dado Principal si tiene usos restantes
                if ((dadoPrincipal === 8 && atacante.orbeUsosRestantes > 0) || (dadoPrincipal === 4 && atacante.saetaUsosRestantes > 0)) {
                    
                    const tiradaExtra = simularTirada(0, dadoPrincipal);
                    resA.totalAtaque += tiradaExtra.dado; 
                    dadoAdicionalUsado = dadoPrincipal;
                    
                    // Consumir el uso principal
                    if (dadoPrincipal === 8) {
                        atacante.orbeUsosRestantes--;
                        logModificadoresRonda += (logModificadoresRonda ? " | " : "") + ` Orbe D${dadoPrincipal}: +${tiradaExtra.dado}`;
                    } else { // D4
                        atacante.saetaUsosRestantes--;
                        logModificadoresRonda += (logModificadoresRonda ? " | " : "") + ` Saeta D${dadoPrincipal}: +${tiradaExtra.dado}`;
                    }
                    
                    logModificadoresRonda += ` [Usos restantes: ${dadoPrincipal === 8 ? atacante.orbeUsosRestantes : atacante.saetaUsosRestantes}]`;

                    // Si se agota el principal D8, PROMOCIONAR D4 a principal (solo si quedan usos de D4)
                    if (dadoPrincipal === 8 && atacante.orbeUsosRestantes === 0) {
                       atacante.artilugioDadoAdicional = (atacante.saetaUsosRestantes > 0) ? 4 : 0;
                    } else if (dadoPrincipal === 4 && atacante.saetaUsosRestantes === 0) {
                       atacante.artilugioDadoAdicional = 0; // Se agota
                    }

                // Lógica de "Artilugio Secundario" (Sólo si el D8 se agotó y el D4 tenía usos)
                } else if (dadoPrincipal === 8 && atacante.orbeUsosRestantes === 0 && atacante.saetaUsosRestantes > 0) {
                 
                     const dadoSecundario = 4; // Saeta D4
                     const tiradaSecundaria = simularTirada(0, dadoSecundario);
                     
                     resA.totalAtaque += tiradaSecundaria.dado;
                     dadoAdicionalUsado = dadoSecundario;
                     
                     // Consumir uso secundario (Saeta)
                     atacante.saetaUsosRestantes--;
                     
                     logModificadoresRonda += (logModificadoresRonda ? " | " : "") + ` Secundario D${dadoSecundario}: +${tiradaSecundaria.dado}. [Usos D4 restantes: ${atacante.saetaUsosRestantes}]`;

                     // Si se agota el secundario, limpiar el dado principal (que ahora es 4)
                     if (atacante.saetaUsosRestantes === 0) {
                        atacante.artilugioDadoAdicional = 0;
                     }
                } else {
                    logModificadoresRonda += (logModificadoresRonda ? " | " : "") + ` Dado Adicional: ¡Usos agotados!`;
                    // Limpiar artilugioDadoAdicional si aún no se hizo
                    atacante.artilugioDadoAdicional = 0; 
                }
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
    let nuevoRegistro = '<h5>Registro de Rondas:</h5>';
    
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
    let rolGanador;
    
    if (atacante.salud <= 0 && defensor.salud <= 0) {
        ganador = "¡Doble KO! Ambos han caído.";
        perdedor = { nombre: "N/A", recursosDerrota: {} }; 
        rolGanador = null;
    } else if (atacante.salud <= 0) {
        ganador = defensor.nombre;
        perdedor = atacante;
        rolGanador = estadoCombate.rolDefensor;
    } else {
        ganador = atacante.nombre;
        perdedor = defensor;
        rolGanador = estadoCombate.rolAtacante;
    }
    
    // --- 1. LÓGICA DE BONIFICACIÓN POR MODIFICADOR (Maldición/Bendición) ---
    
    // Copiar los recursos base del perdedor
    let recursosFinales = { ...perdedor.recursosDerrota }; 
    let bonusRecursos = {};
    let logRecursos = '';
    
    if (rolGanador === 'Brujo' && estadoCombate.maldicionAplicada !== 'Ninguna') {
        bonusRecursos = maldiciones[estadoCombate.maldicionAplicada].recursosBonus || {};
        logRecursos = ` (Bono por Maldición: ${estadoCombate.maldicionAplicada})`;
    } else if (rolGanador === 'Gobernador' && estadoCombate.bendicionAplicada !== 'Ninguna') {
        bonusRecursos = bendiciones[estadoCombate.bendicionAplicada].recursosBonus || {};
        logRecursos = ` (Bono por Bendición: ${estadoCombate.bendicionAplicada})`;
    }

    // Sumar los recursos de bonificación a los recursos base
    for (const recurso in bonusRecursos) {
        if (bonusRecursos[recurso] > 0) {
            recursosFinales[recurso] = (recursosFinales[recurso] || 0) + bonusRecursos[recurso];
        }
    }
    
    // --- 2. LÓGICA DE BONIFICACIÓN POR ARTILUGIO (Solo Gobernador) ---
    
    if (rolGanador === 'Gobernador' && estadoCombate.artilugiosGanancia.length > 0) {
        
        let maxConocimientoBonus = 0;
        let artilugioConBono = '';
        
        // Buscar el artilugio con el mayor bono de Conocimiento aplicado
        estadoCombate.artilugiosGanancia.forEach(artilugioName => {
            const artilugioData = artilugios[artilugioName];
            if (artilugioData && artilugioData.recursosBonus && artilugioData.recursosBonus.Conocimiento) {
                const currentBonus = artilugioData.recursosBonus.Conocimiento;
                if (currentBonus > maxConocimientoBonus) {
                    maxConocimientoBonus = currentBonus;
                    artilugioConBono = artilugioName;
                }
            }
        });

        if (maxConocimientoBonus > 0) {
            // Sumar el bono de Conocimiento (asegurándose de que exista el campo)
            recursosFinales.Conocimiento = (recursosFinales.Conocimiento || 0) + maxConocimientoBonus;
            // Añadir al log, separándolo del log anterior si ya existe
            logRecursos += `${logRecursos ? ' y' : ''} (Bono por Artilugio: ${artilugioConBono}, +${maxConocimientoBonus} Conocimiento)`;
        }
    }
    
    // --- 3. GENERAR EL HTML FINAL ---
    
    let recursosHTML = '';
    
    for (const recurso in recursosFinales) {
        if (recursosFinales[recurso] > 0) {
            recursosHTML += `<p>${recurso}: <span class="recursos">${recursosFinales[recurso]}</span></p>`;
        }
    }
    
    // --- 4. ACTUALIZAR PANTALLA ---

    // GANADOR
    document.getElementById('ganador-combate').innerHTML = `Vencedor: <span class="nombre-ganador">${ganador}</span>`;
    
    // PERDEDOR/RECURSOS
    document.getElementById('recursos-obtenidos').innerHTML = `
        <h4>Recursos obtenidos de <span class="nombre-perdedor">${perdedor.nombre}</span>${logRecursos}:</h4>
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
    
    mostrarPaso(1);
});