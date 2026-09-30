import { useEffect, useState } from 'react'
import api from './api'

const subjects = [
  { id: 'math', name: 'Matemáticas', short: 'Mates', icon: '∑', color: 'orange', description: 'Números, formas y retos' },
  { id: 'biology', name: 'Biología', short: 'Bio', icon: '✦', color: 'cyan', description: 'Descubre la vida' },
  { id: 'spanish', name: 'Español', short: 'Letras', icon: 'Aa', color: 'green', description: 'Historias y palabras' },
]

const rawActivitySets = {
  math: [
    {
    subject: 'Matemáticas',
    label: 'Misión: Reparto espacial',
    title: 'Si comemos 3 de 8 trozos, ¿cuántos sobran?',
    hint: 'Cuenta los trozos que siguen en la pizza: 8 en total menos 3 comidos.',
    answers: ['3/8', '5/8', '8/3', '1/2'],
    correct: 1,
    icon: '◒',
    color: 'orange',
    },
    { subject: 'Matemáticas', label: 'Misión: Cuenta estelar', title: 'Arrastra el resultado correcto de 7 + 5.', hint: 'Junta cinco unidades a las siete que ya tienes.', answers: ['10', '11', '12', '13'], correct: 2, icon: '∑', color: 'orange' },
    { subject: 'Matemáticas', label: 'Misión: Salto numérico', title: 'Coloca en la casilla el número que viene después de 29.', hint: 'Cuenta una unidad más.', answers: ['28', '30', '31', '39'], correct: 1, icon: '∑', color: 'orange' },
    { subject: 'Matemáticas', label: 'Misión: Formas galácticas', title: 'Une el triángulo con su número de lados.', hint: 'Tri significa tres.', answers: ['2 lados', '3 lados', '4 lados', '5 lados'], correct: 1, icon: '△', color: 'orange' },
    { subject: 'Matemáticas', label: 'Misión: Reparto justo', title: 'Ordena estos números de menor a mayor.', hint: 'El número más pequeño debe ir primero.', sortSequence: ['?', '4', '5', '8'], answers: ['2', '4', '5', '8'], correct: 0, icon: '◒', color: 'orange' },
    { subject: 'Matemáticas', label: 'Misión: Multiplicador', title: 'Encuentra el grupo que representa 3 × 4.', hint: 'Busca tres grupos con cuatro elementos cada uno.', answers: ['3 grupos de 4', '3 grupos de 3', '4 grupos de 4', '2 grupos de 4'], correct: 0, icon: '×', color: 'orange' },
    { subject: 'Matemáticas', label: 'Misión: Reloj de arena', title: 'Encuentra el reloj que marca una hora completa.', hint: 'Una hora tiene 60 minutos.', answers: ['30 min', '45 min', '60 min', '100 min'], correct: 2, icon: '◷', color: 'orange' },
    { subject: 'Matemáticas', label: 'Misión: Medidas', title: 'Colorea la unidad correcta para medir un lápiz.', hint: 'Es una medida pequeña de longitud.', answers: ['Kilómetros', 'Centímetros', 'Litros', 'Kilos'], correct: 1, icon: '↔', color: 'orange' },
    { subject: 'Matemáticas', label: 'Misión: Números pares', title: 'Completa el rompecabezas con el número par.', hint: 'Los números pares pueden dividirse en dos grupos iguales.', answers: ['7', '9', '11', '12'], correct: 3, icon: '2', color: 'orange' },
    { subject: 'Matemáticas', label: 'Misión: Problema final', title: 'Tienes 15 pegatinas y regalas 6. ¿Cuántas quedan?', hint: 'Resta las pegatinas que regalaste.', answers: ['7', '8', '9', '10'], correct: 2, icon: '★', color: 'orange' },
  ],
  biology: [
    {
    subject: 'Biología',
    label: 'Misión: Exploradores del bosque',
    title: '¿Qué necesita una planta para fabricar su alimento?',
    hint: 'Las hojas capturan energía de algo que viene del cielo.',
    answers: ['Luz del sol', 'Arena dorada', 'Una brújula', 'Nieve'],
    correct: 0,
    icon: '❋',
    color: 'cyan',
    },
    { subject: 'Biología', label: 'Misión: Huellas de vida', title: 'Arrastra la palabra que completa: un ser vivo necesita __.', hint: 'Piensa en algo que todos los seres vivos necesitan para mantenerse.', answers: ['Energía', 'Pintura', 'Juguetes', 'Silencio'], correct: 0, icon: '❋', color: 'cyan' },
    { subject: 'Biología', label: 'Misión: Cuerpo humano', title: 'Coloca el órgano que usamos para respirar.', hint: 'Está dentro de tu pecho y se llena de aire.', answers: ['Los pulmones', 'El estómago', 'La piel', 'El codo'], correct: 0, icon: '♡', color: 'cyan' },
    { subject: 'Biología', label: 'Misión: Animales expertos', title: 'Une el animal con el grupo de los mamíferos.', hint: 'Los mamíferos alimentan a sus crías con leche.', answers: ['Delfín', 'Mariposa', 'Rana', 'Sardina'], correct: 0, icon: '♧', color: 'cyan' },
    { subject: 'Biología', label: 'Misión: Cadena alimentaria', title: 'Ordena la cadena: ¿qué animal empieza comiendo plantas?', hint: 'Los herbívoros se alimentan de vegetales.', sortSequence: ['Plantas', '?', 'Águila', 'Descomponedores'], answers: ['León', 'Conejo', 'Águila', 'Tiburón'], correct: 1, icon: '♧', color: 'cyan' },
    { subject: 'Biología', label: 'Misión: Ciclo del agua', title: 'Encuentra el objeto que representa el agua congelada.', hint: 'El agua cambia a un estado sólido.', answers: ['Hielo', 'Vapor', 'Gota', 'Fuego'], correct: 0, icon: '◇', color: 'cyan' },
    { subject: 'Biología', label: 'Misión: Hábitats', title: 'Colorea el lugar donde vive normalmente un pez.', hint: 'Busca un lugar lleno de agua.', answers: ['Desierto', 'Agua', 'Cueva seca', 'Nubes'], correct: 1, icon: '≈', color: 'cyan' },
    { subject: 'Biología', label: 'Misión: Cuidemos la Tierra', title: '¿Qué acción ayuda a reciclar?', hint: 'Separar materiales permite volver a usarlos.', answers: ['Mezclar toda la basura', 'Separar papel y plástico', 'Tirar pilas al río', 'Gastar más agua'], correct: 1, icon: '↻', color: 'cyan' },
    { subject: 'Biología', label: 'Misión: Energía verde', title: 'Completa: la parte que absorbe agua es la __.', hint: 'Está bajo la tierra y parece una red.', fillPrompt: 'La planta absorbe agua por la _ _ _ _', answers: ['Flor', 'Raíz', 'Hoja', 'Fruto'], correct: 1, icon: '❋', color: 'cyan' },
    { subject: 'Biología', label: 'Misión: Gran exploración', title: '¿Qué necesitan todos los animales para vivir?', hint: 'Piensa en algo que respiramos.', answers: ['Aire y alimento', 'Juguetes', 'Pintura', 'Música'], correct: 0, icon: '✦', color: 'cyan' },
  ],
  spanish: [
    {
    subject: 'Español',
    label: 'Misión: Detectives de historias',
    title: 'Elige el sinónimo de “valiente”.',
    hint: 'Una persona valiente se atreve a hacer cosas difíciles.',
    answers: ['Miedoso', 'Rápido', 'Valeroso', 'Pequeño'],
    correct: 2,
    icon: 'Aa',
    color: 'green',
    },
    { subject: 'Español', label: 'Misión: Letras viajeras', title: 'Arrastra la sílaba que completa la palabra __SA.', hint: 'Falta una sílaba para formar una palabra que usamos en casa.', answers: ['ME', 'LA', 'SO', 'PA'], correct: 0, icon: 'Aa', color: 'green' },
    { subject: 'Español', label: 'Misión: Ordena la historia', title: 'Coloca primero la acción que hacemos al despertar.', hint: 'Es el primer momento de la mañana.', answers: ['Dormir', 'Abrir los ojos', 'Cenar', 'Apagar el sol'], correct: 1, icon: '↗', color: 'green' },
    { subject: 'Español', label: 'Misión: Palabras opuestas', title: 'Une “grande” con su palabra opuesta.', hint: 'Busca una palabra que indique poco tamaño.', answers: ['Enorme', 'Gigante', 'Pequeño', 'Alto'], correct: 2, icon: '↔', color: 'green' },
    { subject: 'Español', label: 'Misión: Cazadores de verbos', title: 'Ordena la acción: ¿qué hacemos primero al preparar una merienda?', hint: 'Antes de comer, primero elegimos y preparamos los alimentos.', sortSequence: ['?', 'Comer', 'Limpiar la mesa', 'Guardar los platos'], answers: ['Elegir los alimentos', 'Comer', 'Guardar los platos', 'Limpiar la mesa'], correct: 0, icon: '⚡', color: 'green' },
    { subject: 'Español', label: 'Misión: Signos secretos', title: 'Encuentra el signo de pregunta escondido.', hint: 'Aparece al principio y al final de una pregunta.', answers: ['¡ !', '¿ ?', '( )', '[ ]'], correct: 1, icon: '¿?', color: 'green' },
    { subject: 'Español', label: 'Misión: Comprensión lectora', title: 'Colorea la nube que trae lluvia.', hint: 'Un paraguas protege de algo que cae del cielo.', answers: ['☀ Sol', '☁ Nube', '★ Estrella', '♥ Corazón'], correct: 1, icon: '☂', color: 'green' },
    { subject: 'Español', label: 'Misión: Nombres propios', title: '¿Cuál es un nombre propio?', hint: 'Los nombres propios identifican a una persona concreta.', answers: ['niña', 'ciudad', 'Lucía', 'animal'], correct: 2, icon: 'A', color: 'green' },
    { subject: 'Español', label: 'Misión: Construye frases', title: 'Completa: “El gato ___ leche”.', hint: 'Elige una acción que pueda hacer un gato.', fillPrompt: 'El gato _ _ _ _ leche', answers: ['bebe', 'azul', 'mesa', 'rápido'], correct: 0, icon: '✎', color: 'green' },
    { subject: 'Español', label: 'Misión: Gran narrador', title: '¿Qué parte de un cuento presenta a los personajes?', hint: 'Es el comienzo de la historia.', answers: ['El inicio', 'El final', 'El título solamente', 'La despedida'], correct: 0, icon: '✦', color: 'green' },
  ],
}

const activityFormats = [
  { name: 'Cuestionario', icon: '☑', type: 'quiz', instruction: 'Lee la pregunta y elige una respuesta.' },
  { name: 'Arrastra', icon: '↔', type: 'drag', instruction: 'Arrastra la respuesta hasta la zona correcta.' },
  { name: 'Coloca', icon: '⌖', type: 'place', instruction: 'Coloca el elemento en el lugar indicado.' },
  { name: 'Une las palabras', icon: '⛓', type: 'match', instruction: 'Une cada palabra con su pareja.' },
  { name: 'Ordena', icon: '☷', type: 'sort', instruction: 'Ordena los elementos para resolver el reto.' },
  { name: 'Encuentra el objeto', icon: '⌕', type: 'find', instruction: 'Encuentra el objeto escondido en la escena.' },
  { name: 'Colorea', icon: '◉', type: 'color', instruction: 'Elige el elemento que debes colorear.' },
  { name: 'Rompecabezas', icon: '▦', type: 'puzzle', instruction: 'Completa las piezas del rompecabezas.' },
  { name: 'Completa palabras', icon: '✎', type: 'fill', instruction: 'Completa la palabra o la operación con lo que falta.' },
  { name: 'Desafío final', icon: '♛', type: 'quiz', instruction: 'Supera el desafío final de la unidad.' },
]

const formatPlans = {
  math: [0, 1, 2, 3, 4, 5, 5, 6, 7, 9],
  biology: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  spanish: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
}

const activitySets = Object.fromEntries(
  Object.entries(rawActivitySets).map(([subjectId, activities]) => [
    subjectId,
    activities.map((activity, index) => ({ ...activity, format: activityFormats[formatPlans[subjectId][index]] })),
  ]),
)

const defaultEquippedAvatar = {
  helmets: 'helmet_default',
  suits: 'suit_default',
  auras: 'aura_none',
}

const avatarCatalog = [
  // 0 XP (Básicos iniciales)
  { id: 'helmet_default', category: 'helmets', name: 'Gafas Clásicas', icon: 'visibility', symbol: '👓', requiredXp: 0, desc: 'Visor básico de cadete novato.' },
  { id: 'suit_default', category: 'suits', name: 'Uniforme Cadete', icon: 'shield', symbol: '🥋', requiredXp: 0, desc: 'Traje reglamentario de la Academia.' },
  { id: 'aura_none', category: 'auras', name: 'Sin Aura', icon: 'circle', symbol: '○', color: 'transparent', requiredXp: 0, desc: 'Sin aura de energía activa.' },

  // Cada 50 XP algo nuevo:
  { id: 'aura_cyan', category: 'auras', name: 'Aura Neón Celeste', icon: 'flare', symbol: '✧', color: '#00C2D6', requiredXp: 50, desc: 'Resplandor cuántico de energía cian.' },
  { id: 'helmet_cyber', category: 'helmets', name: 'Gafas Cyber Visor', icon: 'visibility', symbol: '🥽', requiredXp: 100, desc: 'Lentes con interfaz táctica digital.' },
  { id: 'suit_solar', category: 'suits', name: 'Traje Explorador Solar', icon: 'shield', symbol: '⚡', requiredXp: 150, desc: 'Tejido fotovoltaico reforzado.' },
  { id: 'aura_blaze', category: 'auras', name: 'Fuego Estelar Blaze', icon: 'local_fire_department', symbol: '♨', color: '#FF9800', requiredXp: 200, desc: 'Aura ardiente por racha imparable.' },
  { id: 'helmet_fenix', category: 'helmets', name: 'Visor Fénix Dorado', icon: 'whatshot', symbol: '✨', requiredXp: 250, desc: 'Filtro solar para explorar nebulosas.' },
  { id: 'suit_quantum', category: 'suits', name: 'Armadura Cuántica', icon: 'shield', symbol: '⚙', requiredXp: 300, desc: 'Coraza ligera de grafeno y titanio.' },
  { id: 'aura_mystic', category: 'auras', name: 'Pulso Violeta Místico', icon: 'auto_fix_high', symbol: '✦', color: '#5B36F5', requiredXp: 350, desc: 'Onda mental de sabiduría cósmica.' },
  { id: 'helmet_alfa', category: 'helmets', name: 'Casco Táctico Alfa', icon: 'military_tech', symbol: '🪖', requiredXp: 400, desc: 'Casco presurizado para misiones límite.' },
  { id: 'suit_galaxy', category: 'suits', name: 'Traje Galaxia Élite', icon: 'stars', symbol: '🌌', requiredXp: 450, desc: 'Material estrellado anti-gravedad.' },
  { id: 'aura_emerald', category: 'auras', name: 'Tormenta Esmeralda', icon: 'bolt', symbol: '⚡', color: '#10B981', requiredXp: 500, desc: 'Bio-campo bioeléctrico de la naturaleza.' },
  { id: 'helmet_holo', category: 'helmets', name: 'Visor Holográfico 4D', icon: 'view_in_ar', symbol: '🔮', requiredXp: 550, desc: 'Proyecta datos y fórmulas en el aire.' },
  { id: 'suit_commander', category: 'suits', name: 'Exotraje de Comandante', icon: 'workspace_premium', symbol: '🎖', requiredXp: 600, desc: 'Blindaje insignia de alto rango.' },
  { id: 'aura_supernova', category: 'auras', name: 'Supernova Dorada', icon: 'wb_sunny', symbol: '☼', color: '#EAB308', requiredXp: 650, desc: 'Luz radiante de estrella recién nacida.' },
  { id: 'helmet_crown', category: 'helmets', name: 'Corona Astral Cósmica', icon: 'diamond', symbol: '👑', requiredXp: 700, desc: 'Díadema de cristal puro para mentes maestras.' },
  { id: 'suit_sage', category: 'suits', name: 'Túnica Sabio Estelar', icon: 'checkroom', symbol: '👘', requiredXp: 750, desc: 'Manto tejido con fibras de cometa.' },
  { id: 'aura_infinity', category: 'auras', name: 'Aura Cósmica Infinita', icon: 'all_inclusive', symbol: '♾', color: '#9333EA', requiredXp: 800, desc: 'Vórtice dimensional de poder sin límites.' },
  { id: 'helmet_infinite_eye', category: 'helmets', name: 'Ojo del Infinito', icon: 'remove_red_eye', symbol: '👁', requiredXp: 850, desc: 'Visión omnisciente de patrones y retos.' },
  { id: 'suit_legend', category: 'suits', name: 'Manto Legendario', icon: 'shield', symbol: '🛡', requiredXp: 900, desc: 'Armadura forjada en el núcleo del saber.' },
  { id: 'aura_singularity', category: 'auras', name: 'Singularidad Rosa', icon: 'cyclone', symbol: '🌀', color: '#EC4899', requiredXp: 950, desc: 'Distorsión del hiperespacio en tonos magenta.' },
  { id: 'helmet_diadem', category: 'helmets', name: 'Diadema Dimensional', icon: 'lens_blur', symbol: '💫', requiredXp: 1000, desc: 'Canalizador de concentración absoluta.' },
  { id: 'suit_titania', category: 'suits', name: 'Armadura Deus Titania', icon: 'shield', symbol: '⚜', requiredXp: 1050, desc: 'Exoesqueleto de aleación ultrarresistente.' },
  { id: 'aura_plasma', category: 'auras', name: 'Plasma Estelar Supremo', icon: 'electric_bolt', symbol: '⚡', color: '#06B6D4', requiredXp: 1100, desc: 'Torrente de plasma de alta pureza.' },
  { id: 'helmet_multiverse', category: 'helmets', name: 'Visor Multiverso', icon: 'auto_awesome', symbol: '🌌', requiredXp: 1150, desc: 'La cúspide de la tecnología de Quest Academy.' },
  { id: 'suit_emperor', category: 'suits', name: 'Traje Emperador Celestial', icon: 'military_tech', symbol: '🥋', requiredXp: 1200, desc: 'Tejido imperial con incrustaciones cósmicas.' },
  { id: 'aura_quantum', category: 'auras', name: 'Aura Cuántica Hiper-Luz', icon: 'flare', symbol: '✧', color: '#3B82F6', requiredXp: 1250, desc: 'Resplandor cuántico de alta frecuencia.' },
  { id: 'helmet_oracle', category: 'helmets', name: 'Casco Oráculo Cósmico', icon: 'psychology', symbol: '🔮', requiredXp: 1300, desc: 'Casco que anticipa variables complejas.' },
  { id: 'suit_chronos', category: 'suits', name: 'Exoarmadura Chronos', icon: 'hourglass_top', symbol: '⏳', requiredXp: 1350, desc: 'Blindaje con campos de dilatación temporal.' },
  { id: 'aura_darkmatter', category: 'auras', name: 'Aura Materia Oscura', icon: 'dark_mode', symbol: '🌑', color: '#7C3AED', requiredXp: 1400, desc: 'Onda gravitacional de materia exótica.' },
  { id: 'helmet_valkyrie', category: 'helmets', name: 'Visor Valquiria Estelar', icon: 'flight', symbol: '🪽', requiredXp: 1450, desc: 'Visor de vuelo para expediciones estelares.' },
  { id: 'suit_godlike', category: 'suits', name: 'Armadura Titán Supremo', icon: 'workspace_premium', symbol: '🏆', requiredXp: 1500, desc: 'La armadura definitiva para el mejor explorador.' },
]

function readEquippedAvatar() {
  try {
    const saved = JSON.parse(localStorage.getItem('quest-equipped-avatar'))
    return saved ? { ...defaultEquippedAvatar, ...saved } : defaultEquippedAvatar
  } catch {
    return defaultEquippedAvatar
  }
}

function AvatarCanvas({ helmetId, suitId, auraId, size = 144, className = '' }) {
  const helmet = avatarCatalog.find((i) => i.id === helmetId) || avatarCatalog[0]
  const suit = avatarCatalog.find((i) => i.id === suitId) || avatarCatalog[1]
  const aura = avatarCatalog.find((i) => i.id === auraId) || avatarCatalog[2]

  const auraColor = aura?.color && aura.color !== 'transparent' ? aura.color : null

  return (
    <svg
      viewBox="0 0 160 160"
      width={size}
      height={size}
      className={className}
      style={{ display: 'block', borderRadius: 16, overflow: 'hidden' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e1838" />
          <stop offset="100%" stopColor="#2c2250" />
        </linearGradient>

        {auraColor && (
          <radialGradient id={`auraGlow_${aura.id}`} cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor={auraColor} stopOpacity="0.85" />
            <stop offset="60%" stopColor={auraColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={auraColor} stopOpacity="0" />
          </radialGradient>
        )}

        <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fcd3b2" />
          <stop offset="100%" stopColor="#eeb28b" />
        </linearGradient>

        <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3d2215" />
          <stop offset="100%" stopColor="#1f110a" />
        </linearGradient>

        <linearGradient id="suitCadet" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5b36f5" />
          <stop offset="100%" stopColor="#3815b8" />
        </linearGradient>

        <linearGradient id="suitSolar" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff7700" />
          <stop offset="100%" stopColor="#d44e00" />
        </linearGradient>

        <linearGradient id="suitQuantum" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>

        <linearGradient id="suitGalaxy" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#1e103a" />
        </linearGradient>

        <linearGradient id="suitCommander" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </linearGradient>

        <linearGradient id="suitSage" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#064e3b" />
        </linearGradient>

        <linearGradient id="suitLegend" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>

        <linearGradient id="suitTitania" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>

        <linearGradient id="suitEmperor" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
      </defs>

      {/* 1. Fondo */}
      <rect width="160" height="160" fill="url(#bgGrad)" />

      {/* 2. Capa Aura (Reactiva según aura equipada) */}
      {auraColor && (
        <g className="aura-layer">
          <circle cx="80" cy="70" r="68" fill={`url(#auraGlow_${aura.id})`} />
          {aura.id === 'aura_cyan' && (
            <circle cx="80" cy="70" r="54" fill="none" stroke="#00C2D6" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.85" />
          )}
          {aura.id === 'aura_blaze' && (
            <g opacity="0.9">
              <path d="M50 40 Q80 15 110 40 Q80 30 50 40 Z" fill="#FF9800" />
              <circle cx="80" cy="70" r="56" fill="none" stroke="#FFA726" strokeWidth="2.5" strokeDasharray="8 6" />
            </g>
          )}
          {aura.id === 'aura_mystic' && (
            <circle cx="80" cy="70" r="58" fill="none" stroke="#C084FC" strokeWidth="2.5" strokeDasharray="4 3" opacity="0.85" />
          )}
          {aura.id === 'aura_emerald' && (
            <circle cx="80" cy="70" r="56" fill="none" stroke="#10B981" strokeWidth="3" opacity="0.8" />
          )}
          {aura.id === 'aura_supernova' && (
            <g opacity="0.9">
              <circle cx="80" cy="70" r="58" fill="none" stroke="#FDE047" strokeWidth="2.5" strokeDasharray="12 4" />
              <line x1="80" y1="5" x2="80" y2="25" stroke="#FDE047" strokeWidth="2.5" />
              <line x1="80" y1="115" x2="80" y2="135" stroke="#FDE047" strokeWidth="2.5" />
              <line x1="20" y1="70" x2="40" y2="70" stroke="#FDE047" strokeWidth="2.5" />
              <line x1="120" y1="70" x2="140" y2="70" stroke="#FDE047" strokeWidth="2.5" />
            </g>
          )}
          {aura.id === 'aura_infinity' && (
            <circle cx="80" cy="70" r="60" fill="none" stroke="#9333EA" strokeWidth="3" strokeDasharray="16 8" opacity="0.85" />
          )}
          {aura.id === 'aura_singularity' && (
            <circle cx="80" cy="70" r="57" fill="none" stroke="#EC4899" strokeWidth="3.5" opacity="0.9" />
          )}
          {aura.id === 'aura_plasma' && (
            <g opacity="0.85">
              <circle cx="80" cy="70" r="56" fill="none" stroke="#06B6D4" strokeWidth="2.5" strokeDasharray="5 3" />
              <path d="M40 35 L48 45 L44 55" stroke="#06B6D4" strokeWidth="2" fill="none" />
              <path d="M120 35 L112 45 L116 55" stroke="#06B6D4" strokeWidth="2" fill="none" />
            </g>
          )}
          {aura.id === 'aura_quantum' && (
            <circle cx="80" cy="70" r="59" fill="none" stroke="#3B82F6" strokeWidth="3" strokeDasharray="10 5" opacity="0.85" />
          )}
          {aura.id === 'aura_darkmatter' && (
            <circle cx="80" cy="70" r="61" fill="none" stroke="#A855F7" strokeWidth="4" strokeDasharray="6 6" opacity="0.9" />
          )}
        </g>
      )}

      {/* 3. Pelo posterior */}
      <path d="M48 68 C40 45 52 24 80 22 C108 24 120 45 112 68 C108 80 114 90 115 95 C98 90 94 92 80 92 C66 92 62 90 45 95 C46 90 52 80 48 68 Z" fill="url(#hairGrad)" />

      {/* 4. Cuello */}
      <path d="M68 95 L92 95 L90 116 L70 116 Z" fill="#e29e74" />

      {/* 5. Cabeza / Rostro */}
      <path d="M52 64 C52 44 64 36 80 36 C96 36 108 44 108 64 C108 84 96 98 80 98 C64 98 52 84 52 64 Z" fill="url(#skinGrad)" />

      {/* Orejas */}
      <circle cx="51" cy="67" r="6" fill="#eeb28b" />
      <circle cx="109" cy="67" r="6" fill="#eeb28b" />

      {/* Ojos y mejillas */}
      <ellipse cx="68" cy="66" rx="4" ry="5.5" fill="#1b1a27" />
      <ellipse cx="92" cy="66" rx="4" ry="5.5" fill="#1b1a27" />
      <circle cx="69.5" cy="64.5" r="1.5" fill="#ffffff" />
      <circle cx="93.5" cy="64.5" r="1.5" fill="#ffffff" />
      <ellipse cx="62" cy="74" rx="4.5" ry="2.5" fill="#fca5a5" opacity="0.6" />
      <ellipse cx="98" cy="74" rx="4.5" ry="2.5" fill="#fca5a5" opacity="0.6" />
      <path d="M73 78 Q80 84 87 78" stroke="#9a3412" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M63 58 Q68 56 73 59" stroke="#3d2215" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M87 59 Q92 56 97 58" stroke="#3d2215" strokeWidth="2.2" strokeLinecap="round" fill="none" />

      {/* 6. Flequillo / Pelo frontal */}
      <path d="M52 46 C56 32 68 26 80 26 C90 26 104 30 108 44 C100 37 92 40 85 45 C78 40 70 41 62 48 C57 44 54 45 52 46 Z" fill="url(#hairGrad)" />
      <path d="M70 28 C74 18 86 19 88 28 Z" fill="url(#hairGrad)" />

      {/* 7. Traje dinámico (Cambia visualmente con cada traje equipado) */}
      <g className="suit-layer">
        {suit.id === 'suit_default' && (
          <g>
            <path d="M38 160 L38 126 C42 110 60 106 80 106 C100 106 118 110 122 126 L122 160 Z" fill="url(#suitCadet)" />
            <path d="M68 106 L80 124 L92 106 Z" fill="#2e1065" />
            <path d="M75 106 L80 114 L85 106 Z" fill="#00C2D6" />
            <line x1="80" y1="124" x2="80" y2="160" stroke="#fcd34d" strokeWidth="2" />
            <circle cx="60" cy="126" r="3.5" fill="#fcd34d" />
          </g>
        )}

        {suit.id === 'suit_solar' && (
          <g>
            <path d="M38 160 L38 126 C42 110 60 106 80 106 C100 106 118 110 122 126 L122 160 Z" fill="#1e1e24" />
            <path d="M48 124 L64 122 L62 160 L44 160 Z" fill="url(#suitSolar)" />
            <path d="M112 124 L96 122 L98 160 L116 160 Z" fill="url(#suitSolar)" />
            <polygon points="80,118 88,128 80,138 72,128" fill="#FF9800" stroke="#FFE082" strokeWidth="1.5" />
          </g>
        )}

        {suit.id === 'suit_quantum' && (
          <g>
            <path d="M38 160 L38 126 C42 110 60 106 80 106 C100 106 118 110 122 126 L122 160 Z" fill="url(#suitQuantum)" />
            <path d="M50 114 L80 130 L110 114 L114 128 L80 144 L46 128 Z" fill="#0f172a" opacity="0.6" />
            <circle cx="80" cy="132" r="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="80" cy="132" r="4.5" fill="#38bdf8" />
          </g>
        )}

        {suit.id === 'suit_galaxy' && (
          <g>
            <path d="M38 160 L38 126 C42 110 60 106 80 106 C100 106 118 110 122 126 L122 160 Z" fill="url(#suitGalaxy)" />
            <circle cx="56" cy="130" r="1.5" fill="#ffffff" />
            <circle cx="104" cy="128" r="1" fill="#ffffff" />
            <circle cx="70" cy="148" r="1.5" fill="#e9d5ff" />
            <circle cx="92" cy="144" r="1.2" fill="#c084fc" />
            <path d="M66 106 L80 122 L94 106 Z" fill="#3b0764" stroke="#c084fc" strokeWidth="1.5" />
            <polygon points="80,128 84,136 80,144 76,136" fill="#c084fc" />
          </g>
        )}

        {suit.id === 'suit_commander' && (
          <g>
            <path d="M38 160 L38 126 C42 110 60 106 80 106 C100 106 118 110 122 126 L122 160 Z" fill="url(#suitCommander)" />
            <rect x="36" y="120" width="16" height="7" rx="3" fill="#fcd34d" />
            <rect x="108" y="120" width="16" height="7" rx="3" fill="#fcd34d" />
            <path d="M68 106 L80 126 L92 106 Z" fill="#450a0a" stroke="#fcd34d" strokeWidth="2" />
            <line x1="80" y1="126" x2="80" y2="160" stroke="#fcd34d" strokeWidth="2.5" />
            <circle cx="62" cy="134" r="3.5" fill="#38bdf8" stroke="#fcd34d" strokeWidth="1" />
            <circle cx="70" cy="134" r="3.5" fill="#fbbf24" stroke="#fcd34d" strokeWidth="1" />
          </g>
        )}

        {suit.id === 'suit_sage' && (
          <g>
            <path d="M38 160 L38 126 C42 110 60 106 80 106 C100 106 118 110 122 126 L122 160 Z" fill="url(#suitSage)" />
            <path d="M66 106 C66 118 94 118 94 106 Z" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
            <polygon points="80,116 87,125 80,134 73,125" fill="#34d399" stroke="#ffffff" strokeWidth="1" />
            <path d="M52 140 Q80 152 108 140" stroke="#6ee7b7" strokeWidth="2" fill="none" />
          </g>
        )}

        {suit.id === 'suit_legend' && (
          <g>
            <path d="M38 160 L38 126 C42 110 60 106 80 106 C100 106 118 110 122 126 L122 160 Z" fill="url(#suitLegend)" />
            <path d="M55 116 L80 134 L105 116 L115 130 L80 156 L45 130 Z" fill="#451a03" />
            <circle cx="80" cy="136" r="6" fill="#fbbf24" stroke="#ffffff" strokeWidth="1.5" />
          </g>
        )}

        {suit.id === 'suit_titania' && (
          <g>
            <path d="M38 160 L38 126 C42 110 60 106 80 106 C100 106 118 110 122 126 L122 160 Z" fill="url(#suitTitania)" />
            <path d="M48 116 L80 138 L112 116" stroke="#0284c7" strokeWidth="3" fill="none" />
            <polygon points="80,126 89,138 80,150 71,138" fill="#38bdf8" stroke="#fcd34d" strokeWidth="1.5" />
          </g>
        )}

        {suit.id === 'suit_emperor' && (
          <g>
            <path d="M38 160 L38 126 C42 110 60 106 80 106 C100 106 118 110 122 126 L122 160 Z" fill="url(#suitEmperor)" />
            <path d="M52 110 L80 134 L108 110" stroke="#fcd34d" strokeWidth="3" fill="none" />
            <circle cx="80" cy="136" r="7" fill="#fbbf24" stroke="#f5d0fe" strokeWidth="2" />
          </g>
        )}

        {!['suit_default', 'suit_solar', 'suit_quantum', 'suit_galaxy', 'suit_commander', 'suit_sage', 'suit_legend', 'suit_titania', 'suit_emperor'].includes(suit.id) && (
          <g>
            <path d="M38 160 L38 126 C42 110 60 106 80 106 C100 106 118 110 122 126 L122 160 Z" fill="url(#suitCadet)" />
            <polygon points="80,120 88,130 80,140 72,130" fill="#38bdf8" />
          </g>
        )}
      </g>

      {/* 8. Casco / Gafas dinámico (Cambia visualmente en ojos y cabeza) */}
      <g className="helmet-layer">
        {helmet.id === 'helmet_default' && (
          <g>
            <path d="M54 44 Q80 38 106 44" stroke="#4b5563" strokeWidth="4" fill="none" />
            <ellipse cx="66" cy="42" rx="9" ry="7" fill="#f59e0b" stroke="#374151" strokeWidth="2.5" />
            <ellipse cx="94" cy="42" rx="9" ry="7" fill="#f59e0b" stroke="#374151" strokeWidth="2.5" />
            <line x1="75" y1="42" x2="85" y2="42" stroke="#374151" strokeWidth="3" />
            <ellipse cx="64" cy="40" rx="3" ry="2" fill="#ffffff" opacity="0.7" />
            <ellipse cx="92" cy="40" rx="3" ry="2" fill="#ffffff" opacity="0.7" />
          </g>
        )}

        {helmet.id === 'helmet_cyber' && (
          <g>
            <path d="M52 58 L108 58 L103 74 L57 74 Z" fill="#0891b2" stroke="#00C2D6" strokeWidth="2" opacity="0.9" />
            <line x1="56" y1="64" x2="104" y2="64" stroke="#ffffff" strokeWidth="1.5" opacity="0.85" />
            <rect x="52" y="60" width="4" height="12" fill="#00C2D6" />
            <rect x="104" y="60" width="4" height="12" fill="#00C2D6" />
          </g>
        )}

        {helmet.id === 'helmet_fenix' && (
          <g>
            <polygon points="52,60 80,50 108,60 104,74 80,68 56,74" fill="#d97706" stroke="#fbbf24" strokeWidth="2" opacity="0.95" />
            <polygon points="62,62 80,56 98,62 94,70 80,66 66,70" fill="#fef08a" opacity="0.8" />
            <polygon points="46,55 54,60 50,68 42,60" fill="#f59e0b" />
            <polygon points="114,55 106,60 110,68 118,60" fill="#f59e0b" />
          </g>
        )}

        {helmet.id === 'helmet_alfa' && (
          <g>
            <path d="M46 68 C46 36 60 22 80 22 C100 22 114 36 114 68" stroke="#ffffff" strokeWidth="5" fill="none" />
            <path d="M48 68 C48 40 62 26 80 26 C98 26 112 40 112 68" stroke="#5b36f5" strokeWidth="3" fill="none" />
            <rect x="42" y="60" width="8" height="16" rx="3" fill="#5b36f5" stroke="#ffffff" strokeWidth="1.5" />
            <rect x="110" y="60" width="8" height="16" rx="3" fill="#5b36f5" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="114" y1="60" x2="118" y2="40" stroke="#00C2D6" strokeWidth="2" />
            <circle cx="118" cy="39" r="2.5" fill="#00C2D6" />
          </g>
        )}

        {helmet.id === 'helmet_holo' && (
          <g>
            <rect x="54" y="58" width="52" height="17" rx="4" fill="#a855f7" stroke="#e9d5ff" strokeWidth="2" opacity="0.75" />
            <circle cx="68" cy="66" r="5" stroke="#ffffff" strokeWidth="1.2" fill="none" />
            <circle cx="92" cy="66" r="5" stroke="#ffffff" strokeWidth="1.2" fill="none" />
            <line x1="78" y1="66" x2="82" y2="66" stroke="#ffffff" strokeWidth="1.5" />
          </g>
        )}

        {helmet.id === 'helmet_crown' && (
          <g>
            <polygon points="56,34 64,18 72,28 80,14 88,28 96,18 104,34" fill="#fcd34d" stroke="#d97706" strokeWidth="1.5" />
            <circle cx="80" cy="22" r="3.5" fill="#38bdf8" />
            <circle cx="64" cy="24" r="2.5" fill="#ec4899" />
            <circle cx="96" cy="24" r="2.5" fill="#ec4899" />
          </g>
        )}

        {helmet.id === 'helmet_infinite_eye' && (
          <g>
            <circle cx="80" cy="46" r="7" fill="#1e1b4b" stroke="#a855f7" strokeWidth="2" />
            <ellipse cx="80" cy="46" rx="4" ry="5.5" fill="#c084fc" />
            <circle cx="80" cy="46" r="2" fill="#ffffff" />
            <path d="M70 46 L64 46 M90 46 L96 46" stroke="#c084fc" strokeWidth="2" />
          </g>
        )}

        {helmet.id === 'helmet_diadem' && (
          <g>
            <path d="M50 50 Q80 40 110 50" stroke="#f8fafc" strokeWidth="4" fill="none" />
            <path d="M50 50 Q80 40 110 50" stroke="#38bdf8" strokeWidth="2" fill="none" />
            <circle cx="50" cy="50" r="4.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="110" cy="50" r="4.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
            <polygon points="80,38 85,44 80,50 75,44" fill="#38bdf8" />
          </g>
        )}

        {helmet.id === 'helmet_multiverse' && (
          <g>
            <path d="M50 56 L110 56 L105 75 L55 75 Z" fill="url(#suitSolar)" opacity="0.9" />
            <path d="M52 58 L108 58 L104 66 L54 66 Z" fill="#38bdf8" opacity="0.8" />
            <path d="M54 66 L104 66 L102 73 L56 73 Z" fill="#a855f7" opacity="0.8" />
            <line x1="50" y1="56" x2="110" y2="56" stroke="#ffffff" strokeWidth="2" />
          </g>
        )}

        {!['helmet_default', 'helmet_cyber', 'helmet_fenix', 'helmet_alfa', 'helmet_holo', 'helmet_crown', 'helmet_infinite_eye', 'helmet_diadem', 'helmet_multiverse'].includes(helmet.id) && (
          <g>
            <path d="M52 58 L108 58 L103 74 L57 74 Z" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" opacity="0.85" />
          </g>
        )}
      </g>
    </svg>
  )
}

const initialProgress = {
  xp: 0,
  streak: 0,
  completed: 0,
  selectedSubject: 'math',
  completedExercises: { math: [], biology: [], spanish: [] },
  achievements: 0,
}

function readProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem('quest-progress'))
    if (!saved) return initialProgress
    const xp = (saved.xp === 1280) ? 0 : (typeof saved.xp === 'number' ? saved.xp : 0)
    const completedExercises = saved.completedExercises || initialProgress.completedExercises
    const completed = Object.values(completedExercises).reduce((total, exercises) => total + exercises.length, 0)
    return { ...initialProgress, ...saved, xp, completedExercises, completed }
  } catch {
    return initialProgress
  }
}

function getSubjectProgress(progress, subjectId) {
  const completed = progress.completedExercises?.[subjectId]?.length || 0
  return Math.round((completed / 10) * 100)
}

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('quest-token'))
  const [currentUser, setCurrentUser] = useState(null)
  const [page, setPage] = useState(window.location.hash.replace('#', '') || 'missions')
  const [progress, setProgress] = useState(readProgress)
  const [subjectId, setSubjectId] = useState(progress.selectedSubject || 'math')
  const [challengeIndex, setChallengeIndex] = useState(0)
  const [ranking, setRanking] = useState([])
  const [catalogSubjects, setCatalogSubjects] = useState(subjects)
  const [catalogActivities, setCatalogActivities] = useState(activitySets)
  const [showLivesModal, setShowLivesModal] = useState(false)
  const [equippedAvatar, setEquippedAvatar] = useState(readEquippedAvatar)

  useEffect(() => {
    localStorage.setItem('quest-equipped-avatar', JSON.stringify(equippedAvatar))
  }, [equippedAvatar])

  useEffect(() => {
    if (!token) return
    const fetchMe = () => {
      api.get('/me').then(({ data }) => {
        setCurrentUser(data.user)
        if (data.user && typeof data.user.xp === 'number') {
          setProgress((prev) => ({
            ...prev,
            xp: data.user.xp,
            completed: data.user.completed_missions ?? prev.completed,
            streak: data.user.streak ?? prev.streak,
          }))
        }
      }).catch(() => {
        localStorage.removeItem('quest-token')
        setToken(null)
      })
    }
    fetchMe()
    const livesTimer = window.setInterval(fetchMe, 30 * 1000)
    return () => window.clearInterval(livesTimer)
  }, [token])

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get('stripe_session_id')
    if (!token || !sessionId) return
    api.post('/billing/confirm', { session_id: sessionId }).then(({ data }) => {
      setCurrentUser(data.user)
      window.history.replaceState({}, '', `${window.location.pathname}#missions`)
    }).catch(() => {})
  }, [token])

  useEffect(() => {
    if (!token) return
    api.get('/subjects').then(({ data }) => {
      if (!data.subjects.length) return
      const nextSubjects = data.subjects.map((subject) => ({ ...subject, id: String(subject.id), short: subject.short || subject.name.slice(0, 8), color: subject.color || 'violet' }))
      const nextActivities = Object.fromEntries(nextSubjects.map((subject) => {
        const serverActivities = data.subjects.find((item) => String(item.id) === subject.id)?.activities || []
        const fallbackKey = subject.name === 'Matemáticas' ? 'math' : subject.name === 'Biología' ? 'biology' : subject.name === 'Español' ? 'spanish' : null
        const sourceActivities = serverActivities.length ? serverActivities : (fallbackKey ? activitySets[fallbackKey] : [])
        return [subject.id, sourceActivities.map((activity) => ({ ...activity, subject: subject.name, color: subject.color, format: activity.format?.name ? activity.format : { name: activity.format, icon: activity.icon, type: activity.format_type, instruction: activity.instruction || 'Lee la actividad y elige una respuesta.' } }))]
      }))
      setCatalogSubjects(nextSubjects)
      setCatalogActivities(nextActivities)
      setSubjectId((current) => nextSubjects.some((subject) => subject.id === current) ? current : nextSubjects[0].id)
    }).catch(() => {})
  }, [token, page])

  useEffect(() => {
    localStorage.setItem('quest-progress', JSON.stringify(progress))
  }, [progress])

  useEffect(() => {
    const handleHash = () => setPage(window.location.hash.replace('#', '') || 'missions')
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  useEffect(() => {
    if (!token) return

    const syncProgress = async () => {
      try {
        await api.put('/progress', {
          xp: progress.xp,
          completed_missions: progress.completed,
          streak: progress.streak,
        })
        const { data } = await api.get('/ranking')
        setRanking(data.ranking)
      } catch {
        setRanking([])
      }
    }

    syncProgress()
  }, [token, progress.xp, progress.completed, progress.streak])

  if (!token) return <LoginPage onLogin={({ token: newToken, user }) => {
    localStorage.setItem('quest-token', newToken)
    setCurrentUser(user)
    if (user && typeof user.xp === 'number') {
      setProgress((prev) => ({
        ...prev,
        xp: user.xp,
        completed: user.completed_missions ?? 0,
        streak: user.streak ?? 0,
      }))
    }
    window.location.hash = 'missions'
    setPage('missions')
    setToken(newToken)
  }} />

  const navigate = (destination) => {
    window.location.hash = destination
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const chooseSubject = (id) => {
    setSubjectId(id)
    setProgress((current) => ({ ...current, selectedSubject: id }))
  }

  const openSubject = (id) => {
    chooseSubject(id)
    navigate('subject')
  }

  const openExercise = (index) => {
    setChallengeIndex(index)
    navigate('challenge')
  }

  const completeActivity = (id, exerciseIndex) => {
    const completedExercises = progress.completedExercises?.[id] || []
    if (completedExercises.includes(exerciseIndex)) return
    setProgress((current) => ({
      ...current,
      xp: current.xp + 25,
      completed: current.completed + 1,
      completedExercises: { ...current.completedExercises, [id]: [...completedExercises, exerciseIndex] },
    }))
  }

  const logout = async () => {
    try {
      await api.post('/logout')
    } catch {
      // El token local se elimina aunque la API no este disponible.
    }
    localStorage.removeItem('quest-token')
    window.location.hash = ''
    setToken(null)
  }

  return (
    <div className="app-shell">
      <TopBar progress={progress} user={currentUser} equippedAvatar={equippedAvatar} onProfile={() => navigate('profile')} onAdmin={currentUser?.is_admin ? () => navigate('admin') : null} />
      <main className="page-wrap">
        {page === 'map' && <MapPage subjects={catalogSubjects} activities={catalogActivities} subjectId={subjectId} completedExercises={progress.completedExercises?.[subjectId] || []} onChooseSubject={chooseSubject} onStart={(index) => { setChallengeIndex(index); navigate('challenge') }} />}
        {page === 'subject' && <SubjectPage subjects={catalogSubjects} activities={catalogActivities} subjectId={subjectId} completedExercises={progress.completedExercises?.[subjectId] || []} onChooseSubject={chooseSubject} onOpenExercise={openExercise} />}
        {page === 'challenge' && <ChallengePage activities={catalogActivities[subjectId]} startingIndex={challengeIndex} completedExercises={progress.completedExercises?.[subjectId] || []} hasLives={currentUser?.is_admin || currentUser?.lives > 0} onComplete={(exerciseIndex) => completeActivity(subjectId, exerciseIndex)} onNoLives={() => setShowLivesModal(true)} onWrong={async () => { if (currentUser?.is_admin) return; try { const { data } = await api.post('/lives/lose'); setCurrentUser(data.user); if (data.user.lives <= 0) setShowLivesModal(true) } catch (error) { if (error.response?.data?.user) { setCurrentUser(error.response.data.user); setShowLivesModal(true) } } }} onNext={(exerciseIndex) => {
          const isLastExercise = exerciseIndex >= catalogActivities[subjectId].length - 1
          if (isLastExercise) navigate('missions')
          else setChallengeIndex(exerciseIndex + 1)
        }} />}
        {page === 'profile' && <ProfilePage user={currentUser} onUserUpdated={setCurrentUser} progress={progress} equippedAvatar={equippedAvatar} onEquipAvatar={setEquippedAvatar} onReset={() => { setProgress(initialProgress); setEquippedAvatar(defaultEquippedAvatar); }} onLogout={logout} />}
        {page === 'admin' && currentUser?.is_admin && <AdminPageV2 />}
        {(!['map', 'subject', 'challenge', 'profile', 'admin'].includes(page)) && <DashboardPage subjects={catalogSubjects} progress={progress} ranking={ranking} onNavigate={navigate} onChooseSubject={openSubject} />}
      </main>
      <BottomNav page={page} onNavigate={navigate} />
      {!currentUser?.is_admin && currentUser?.lives <= 0 && showLivesModal && <LivesEmptyModal user={currentUser} onClose={() => setShowLivesModal(false)} onPurchased={(user) => { setCurrentUser(user); setShowLivesModal(false) }} />}
    </div>
  )
}

function LoginPage({ onLogin }) {
  const [registerMode, setRegisterMode] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (registerMode) {
        await api.post('/register', { name, email, password })
        setRegisterMode(false)
        setPassword('')
        setError('Cuenta creada. Ahora inicia sesión.')
      } else {
        const { data } = await api.post('/login', { email, password })
        onLogin(data)
      }
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'No se pudo iniciar sesión.')
    } finally {
      setLoading(false)
    }
  }

  return <main className="login-page">
    <section className="login-card page-enter">
      <span className="login-orbit">✦</span>
      <span className="eyebrow">QUEST ACADEMY</span>
      <h1>{registerMode ? 'Crea tu cuenta' : 'Vuelve a tu aventura'}</h1>
      <p>{registerMode ? 'Regístrate para comenzar a explorar.' : 'Inicia sesión para continuar tus misiones y conservar tu progreso.'}</p>
      <form onSubmit={submit}>
        {registerMode && <label>Nombre<input type="text" value={name} onChange={(event) => setName(event.target.value)} required autoComplete="name" /></label>}
        <label>Correo electrónico<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" /></label>
        <label>Contraseña<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" /></label>
        {error && <div className="login-error" role="alert">{error}</div>}
        <button className="primary-button login-submit" disabled={loading}>{loading ? 'Procesando...' : registerMode ? 'Crear cuenta' : 'Entrar a la academia'} <span>→</span></button>
      </form>
      <button className="login-switch" onClick={() => { setRegisterMode(!registerMode); setError('') }}>{registerMode ? 'Ya tengo una cuenta' : '¿No tienes cuenta? Crear cuenta'}</button>
    </section>
  </main>
}

function LivesEmptyModal({ user, onClose, onPurchased }) {
  const isPaidLives = Boolean(user?.has_paid_lives)
  const [resetAt, setResetAt] = useState(user?.lives_reset_at ? new Date(user.lives_reset_at).getTime() + 5 * 60 * 1000 : Date.now() + 5 * 60 * 1000)
  const [timeLeft, setTimeLeft] = useState(Math.max(0, resetAt - Date.now()))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(Math.max(0, resetAt - Date.now())), 1000)
    return () => window.clearInterval(timer)
  }, [resetAt])

  useEffect(() => {
    if (timeLeft !== 0 || isPaidLives) return
    api.get('/me').then(({ data }) => {
      onPurchased(data.user)
      if (data.user.lives > 0) return
      setResetAt(new Date(data.user.lives_reset_at).getTime() + 5 * 60 * 1000)
    }).catch(() => {})
  }, [timeLeft, isPaidLives, onPurchased])

  const buyPlan = async () => {
    setLoading(true)
    setError('')
    try {
      const { data } = await api.post('/billing/checkout')
      window.location.href = data.url
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'No se pudo abrir el pago.')
      setLoading(false)
    }
  }

  const hours = String(Math.floor(timeLeft / 3600000)).padStart(2, '0')
  const minutes = String(Math.floor((timeLeft % 3600000) / 60000)).padStart(2, '0')
  const seconds = String(Math.floor((timeLeft % 60000) / 1000)).padStart(2, '0')
  return <div className="lives-overlay"><section className="lives-modal"><button className="modal-close lives-close" onClick={onClose} aria-label="Cerrar aviso de vidas">×</button><span className="lives-modal-icon">♥</span><span className="eyebrow">MISIÓN EN PAUSA</span><h2>Te quedaste sin vidas</h2>{isPaidLives ? <p>Ya usaste tus 10 vidas pagadas. Compra nuevamente el plan para continuar.</p> : <p>Se recarga 1 vida cada 5 minutos, hasta un máximo de 7.</p>}<div className="lives-countdown">{isPaidLives ? 'Siguiente vida gratuita no disponible' : <>Siguiente vida en <strong>{hours}:{minutes}:{seconds}</strong></>}</div><div className="premium-offer"><span className="eyebrow">QUEST ACADEMY</span><h3>Recarga de vidas</h3><p>Recibe 10 vidas para continuar tus misiones. Cuando se agoten, tendrás que comprar el plan otra vez.</p><strong className="premium-price">$120 USD</strong><button className="primary-button" onClick={buyPlan} disabled={loading}>{loading ? 'Abriendo pago...' : 'Comprar 10 vidas'} <span>→</span></button></div>{error && <div className="login-error">{error}</div>}</section></div>
}

function TopBar({ progress, user, equippedAvatar, onProfile, onAdmin }) {
  const equippedAura = avatarCatalog.find((item) => item.id === equippedAvatar?.auras)
  const auraColor = equippedAura?.color && equippedAura.color !== 'transparent' ? equippedAura.color : null
  const initials = (user?.name || 'LA').split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase()

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <button className="brand-button" onClick={() => { window.location.hash = 'missions' }} aria-label="Ir al inicio">
          <span
            className="avatar"
            style={{
              padding: 0,
              overflow: 'hidden',
              boxShadow: auraColor ? `0 0 14px ${auraColor}, 0 3px 0 #2f198e` : undefined,
              border: auraColor ? `2px solid ${auraColor}` : undefined,
            }}
          >
            <AvatarCanvas
              helmetId={equippedAvatar?.helmets}
              suitId={equippedAvatar?.suits}
              auraId={equippedAvatar?.auras}
              size={42}
            />
          </span>
          <span className="brand-copy"><strong>Quest Academy</strong><small>CADETE ESPACIAL</small></span>
        </button>
        <div className="hud-actions">
          <span className="stat-pill xp-pill"><b>✦</b> {progress.xp.toLocaleString('es-ES')} XP</span>
          <span className="stat-pill streak-pill"><b>♨</b> {progress.streak} DÍAS</span>
          {!user?.is_admin && <span className="stat-pill lives-pill"><b>♥</b> {user?.lives ?? 7} VIDAS</span>}
          {onAdmin && <button className="icon-button admin-icon" onClick={onAdmin} aria-label="Abrir administración">⚙</button>}
          <button className="icon-button" onClick={onProfile} aria-label="Abrir perfil">⌁</button>
        </div>
      </div>
    </header>
  )
}

function DashboardPage({ subjects, progress, ranking, onNavigate, onChooseSubject }) {
  return (
    <div className="dashboard page-enter">
      <section className="hero-banner">
        <div className="hero-copy">
          <span className="eyebrow">MISIÓN DEL DÍA · LISTA PARA TI</span>
          <h1>Tu próxima gran idea<br /><em>empieza aquí.</em></h1>
          <p>Explora, juega y desbloquea nuevos mundos de conocimiento.</p>
          <button className="primary-button" onClick={() => onNavigate('map')}>Continuar aventura <span>→</span></button>
        </div>
        <div className="hero-orbit" aria-hidden="true"><span>✦</span><strong>14</strong><small>NIVEL</small></div>
      </section>
      <section className="section-heading"><div><span className="eyebrow muted">TU UNIVERSO DE HOY</span><h2>Elige tu misión</h2></div><button className="text-button" onClick={() => onNavigate('map')}>Ver mapa <span>→</span></button></section>
      <div className="subject-grid">
        {subjects.map((subject, index) => <SubjectCard key={subject.id} subject={subject} progress={getSubjectProgress(progress, subject.id)} index={index} onSelect={() => onChooseSubject(subject.id)} />)}
      </div>
      <section className="dashboard-lower">
        <div className="mission-card">
          <div className="mission-card-top"><span className="eyebrow">RACHA DE EXPLORADOR</span><span className="streak-number">{progress.streak} <small>días</small></span></div>
          <h3>¡Vas genial, Leo!</h3><p>Completa una misión hoy para mantener encendida tu racha.</p>
          <div className="mini-progress"><span style={{ width: '72%' }} /></div><small>4 de 5 días completados</small>
        </div>
        <RankingCard ranking={ranking} />
      </section>
    </div>
  )
}

function RankingCard({ ranking }) {
  return <div className="rank-card"><div className="rank-card-heading"><div className="rank-icon">♛</div><div><span className="eyebrow muted">RANKING DE TODOS LOS ALUMNOS</span><h3>Progreso de la academia</h3></div></div>{ranking.length === 0 ? <p className="ranking-empty">Aún no hay datos de progreso.</p> : <div className="ranking-list">{ranking.map((student) => <div className="ranking-row" key={student.id}><span className={`rank-number rank-${student.rank}`}>{student.rank}</span><strong>{student.name}</strong><span className="ranking-missions">{student.completed_missions} misiones</span><b>{student.xp.toLocaleString('es-ES')} XP</b></div>)}</div>}</div>
}

function SubjectCard({ subject, progress, index, onSelect }) {
  return <button className={`subject-card subject-${subject.color}`} onClick={onSelect} style={{ '--delay': `${index * 80}ms` }}>
    <div className="subject-card-head"><span className="subject-icon">{subject.icon}</span><span className="arrow">↗</span></div>
    <div><span className="eyebrow">{subject.short}</span><h3>{subject.name}</h3><p>{subject.description}</p></div>
    <div className="card-progress"><span style={{ width: `${progress}%` }} /></div><small>{progress}% explorado</small>
  </button>
}

function SubjectPage({ subjects, activities: activitySets, subjectId, completedExercises, onChooseSubject, onOpenExercise }) {
  const subject = subjects.find((item) => item.id === subjectId) || subjects[0]
  const activities = activitySets[subjectId] || []
  const percentage = Math.round((completedExercises.length / activities.length) * 100)
  return <div className="subject-page page-enter">
    <section className={`subject-overview subject-${subject.color}`}>
      <div><span className="eyebrow">RUTA DE APRENDIZAJE · {percentage}% EXPLORADO</span><h1>{subject.name}</h1><p>{subject.description}. Elige una actividad para comenzar.</p></div>
      <div className="subject-overview-score"><strong>{completedExercises.length}/{activities.length}</strong><span>completadas</span></div>
    </section>
    <div className="subject-switcher">{subjects.map((item) => <button className={item.id === subjectId ? 'active' : ''} key={item.id} onClick={() => onChooseSubject(item.id)}>{item.icon} {item.short}</button>)}</div>
    <div className="activity-heading"><div><span className="eyebrow muted">RECORRIDO COMPLETO</span><h2>10 actividades para explorar</h2></div><span className="activity-count">{completedExercises.length}/10 listas</span></div>
    <div className="activity-list">{activities.map((activity, index) => {
      const done = completedExercises.includes(index)
      const available = done || index <= completedExercises.length
      return <button className={`activity-row ${done ? 'done' : ''} ${available ? '' : 'locked'}`} key={`${subjectId}-${index}`} onClick={() => available && onOpenExercise(index)} disabled={!available}>
        <span className="activity-number">{done ? '✓' : String(index + 1).padStart(2, '0')}</span>
        <span className="activity-details"><small>{activity.label}</small><strong>{activity.format.icon} {activity.format.name}</strong><span>{activity.title}</span><em>{done ? 'Completada · puedes repasarla' : available ? 'Disponible ahora' : 'Completa la actividad anterior'}</em></span>
        <span className="activity-action">{done ? '↻' : available ? '→' : '⌑'}</span>
      </button>
    })}</div>
  </div>
}

function MapPage({ subjects, activities: activitySets, subjectId, completedExercises, onChooseSubject, onStart }) {
  const selected = subjects.find((subject) => subject.id === subjectId) || subjects[0]
  const activities = activitySets[subjectId] || []
  const nextExercise = activities.findIndex((_, index) => !completedExercises.includes(index))
  const allCompleted = nextExercise === -1
  return <div className="map-page page-enter">
    <section className={`map-header subject-${selected.color}`}><div><span className="eyebrow">RUTA DE APRENDIZAJE</span><h1>{selected.name}</h1><p>{selected.description}. Elige un nivel para continuar.</p></div><span className="large-subject-icon">{selected.icon}</span></section>
    <div className="subject-switcher">{subjects.map((subject) => <button className={subject.id === subjectId ? 'active' : ''} key={subject.id} onClick={() => onChooseSubject(subject.id)}>{subject.icon} {subject.short}</button>)}</div>
    <section className="level-path">
      <div className="path-line" />
      {activities.map((activity, index) => {
        const done = completedExercises.includes(index)
        const active = !allCompleted && index === nextExercise
        const status = done ? 'done' : active ? 'active' : 'locked'
        return <LevelNode key={`${subjectId}-map-${index}`} number={String(index + 1).padStart(2, '0')} title={activity.title} status={status} note={done ? 'Completado' : active ? `${activity.format.icon} ${activity.format.name} disponible` : 'Completa el ejercicio anterior'} onClick={() => onStart(index)} />
      })}
    </section>
    <div className="continue-dock"><div><span className="eyebrow">{allCompleted ? 'RUTA COMPLETADA' : 'EN PROGRESO'}</span><strong>{allCompleted ? 'Has completado los 10 ejercicios' : `Ejercicio ${nextExercise + 1} · ${selected.short}`}</strong></div>{!allCompleted && <button className="primary-button compact" onClick={() => onStart(nextExercise)}>Continuar <span>→</span></button>}</div>
  </div>
}

function LevelNode({ number, title, status, note, onClick }) {
  const content = <><span className="node-number">{status === 'done' ? '✓' : status === 'locked' ? '⌑' : number}</span><div><span className={`status-label ${status}`}>{note}</span><h3>{title}</h3>{status === 'locked' && <p>Desbloquea el nivel anterior para seguir.</p>}</div>{status === 'active' && <span className="node-arrow">→</span>}</>
  return status === 'active' ? <button className="level-node active" onClick={onClick}>{content}</button> : <div className={`level-node ${status}`}>{content}</div>
}

function ActivityInteraction({ activity, selected, setSelected, checked }) {
  const format = activity.format.type
  const choose = (index) => !checked && setSelected(index)
  if (format === 'place') {
    return <div className="activity-interaction place-interaction"><p>Coloca la respuesta en la zona indicada:</p><div className={`place-target ${selected !== null ? 'filled' : ''}`}>{selected === null ? 'Zona de destino' : activity.answers[selected]}</div><div className="choice-strip">{activity.answers.map((answer, index) => <button className={selected === index ? 'selected' : ''} onClick={() => choose(index)} key={answer}>{answer}</button>)}</div></div>
  }
  if (format === 'drag') {
    return <div className="activity-interaction drag-interaction"><div className="drag-options">{activity.answers.map((answer, index) => <button className="drag-token" draggable={!checked} onDragStart={(event) => event.dataTransfer.setData('answer-index', index)} onClick={() => choose(index)} key={answer}>{answer}</button>)}</div><div className={`drop-zone ${selected !== null ? 'filled' : ''}`} onDragOver={(event) => event.preventDefault()} onDrop={(event) => choose(Number(event.dataTransfer.getData('answer-index')))}><span>{selected === null ? 'Suelta aquí tu respuesta' : activity.answers[selected]}</span></div></div>
  }
  if (format === 'match') {
    return <div className="activity-interaction match-interaction"><p>Une el concepto con su pareja:</p><div className="match-pair"><span className="match-source">Concepto</span><span className="match-connector">→</span><div className="match-options">{activity.answers.map((answer, index) => <button className={`match-card ${selected === index ? 'selected' : ''} ${checked && index === activity.correct ? 'correct' : ''}`} onClick={() => choose(index)} key={answer}><span>{String.fromCharCode(65 + index)}</span>{answer}</button>)}</div></div></div>
  }
  if (format === 'crossword') {
    return <div className="activity-interaction crossword-interaction"><p>Completa el crucigrama seleccionando la respuesta correcta:</p><div className="crossword-board">{activity.answers.map((answer, index) => <button className={`${selected === index ? 'selected' : ''} ${checked && index === activity.correct ? 'correct' : ''}`} onClick={() => choose(index)} key={answer}><span>{String.fromCharCode(65 + index)}</span>{answer}</button>)}</div></div>
  }
  if (format === 'boolean') {
    return <div className="activity-interaction boolean-interaction"><p>¿La afirmación es verdadera o falsa?</p><div className="boolean-options">{activity.answers.slice(0, 2).map((answer, index) => <button className={`${selected === index ? 'selected' : ''} ${checked && index === activity.correct ? 'correct' : ''}`} onClick={() => choose(index)} key={answer}>{answer}</button>)}</div></div>
  }
  if (format === 'sort') {
    const sequence = activity.sortSequence || ['1', '2', '3', '?']
    return <div className="activity-interaction sort-interaction"><p>Pulsa el elemento que completa el orden:</p><div className="sort-track">{sequence.map((item, index) => <span className={item === '?' ? `sort-missing ${selected !== null ? 'filled' : ''}` : ''} key={`${item}-${index}`}>{item === '?' && selected !== null ? activity.answers[selected] : item}</span>)}</div><div className="choice-strip">{activity.answers.map((answer, index) => <button className={selected === index ? 'selected' : ''} onClick={() => choose(index)} key={answer}>{answer}</button>)}</div></div>
  }
  if (format === 'find' || format === 'place' || format === 'color') {
    return <div className={`activity-interaction scene-interaction ${format}-scene`}><div className="scene-board"><span className="scene-sun">✦</span><span className="scene-ground">⌁ ⌁ ⌁</span>{activity.answers.map((answer, index) => <button className={`scene-object object-${index} ${selected === index ? 'selected' : ''} ${checked && index === activity.correct ? 'correct' : ''}`} onClick={() => choose(index)} key={answer}>{answer}</button>)}</div><p>{format === 'find' ? 'Toca el objeto correcto.' : format === 'place' ? 'Toca el lugar correcto.' : 'Toca el elemento que debes colorear.'}</p></div>
  }
  if (format === 'puzzle') {
    return <div className="activity-interaction puzzle-interaction"><div className="puzzle-board">{activity.answers.map((answer, index) => <button className={`${selected === index ? 'selected' : ''} ${checked && index === activity.correct ? 'correct' : ''}`} onClick={() => choose(index)} key={answer}><span>{index + 1}</span><small>{answer}</small></button>)}</div><p>Elige la pieza que completa la imagen.</p></div>
  }
  if (format === 'fill') {
    return <div className="activity-interaction fill-interaction"><div className="word-card">{activity.fillPrompt || 'Completa el reto'}</div><div className="choice-strip">{activity.answers.map((answer, index) => <button className={selected === index ? 'selected' : ''} onClick={() => choose(index)} key={answer}>{answer}</button>)}</div></div>
  }
  return <div className="answer-grid">{activity.answers.map((answer, index) => <button className={`answer-option ${selected === index ? 'selected' : ''} ${checked && index === activity.correct ? 'correct' : ''} ${checked && selected === index && !isCorrectAnswer(selected, activity.correct) ? 'wrong' : ''}`} key={answer} onClick={() => choose(index)} aria-pressed={selected === index}><span className="answer-letter">{String.fromCharCode(65 + index)}</span><strong>{answer}</strong><span className="answer-check">{checked && index === activity.correct ? '✓' : selected === index ? '•' : ''}</span></button>)}</div>
}

function isCorrectAnswer(selected, correct) {
  return selected === correct
}

function ChallengePage({ activities, startingIndex, completedExercises, hasLives, onComplete, onNoLives, onWrong, onNext }) {
  const exerciseList = activities?.length ? activities : activitySets.math
  const exerciseIndex = Math.min(startingIndex ?? completedExercises.length, exerciseList.length - 1)
  const activity = exerciseList[exerciseIndex]
  const completed = completedExercises.includes(exerciseIndex)
  const [selected, setSelected] = useState(null)
  const [checked, setChecked] = useState(completed)
  const [showHint, setShowHint] = useState(false)
  const isCorrect = selected === activity.correct
  useEffect(() => { setSelected(null); setChecked(completed); setShowHint(false) }, [exerciseIndex, completed])
  const selectAnswer = (index) => {
    if (!completed && !isCorrect) {
      setSelected(index)
      setChecked(false)
    }
  }
  const checkAnswer = () => {
    if (selected !== null) {
      if (!hasLives) {
        onNoLives?.()
        return
      }
      setChecked(true)
      if (isCorrect) onComplete(exerciseIndex)
      else onWrong?.()
    }
  }
  const advance = () => onNext(exerciseIndex)
  const isFinished = completedExercises.length >= exerciseList.length
  const isLastExercise = exerciseIndex >= exerciseList.length - 1
  const canAdvance = completed || checked
  const actionLabel = canAdvance ? (isLastExercise ? 'Finalizado' : 'Siguiente') : 'Comprobar'
  return <div className="challenge-page page-enter">
    <div className="challenge-progress"><span>EJERCICIO {Math.min(exerciseIndex + 1, exerciseList.length)} DE {exerciseList.length}</span><div><i style={{ width: `${(completedExercises.length / exerciseList.length) * 100}%` }} /></div><span>{Math.round((completedExercises.length / exerciseList.length) * 100)}%</span></div>
    <div className="challenge-context"><span className={`subject-dot ${activity.color}`}>{activity.icon}</span><span>{activity.subject} · NIVEL 3</span><span className="xp-reward">✦ +20 XP</span></div>
    <section className="challenge-card"><div className={`challenge-illustration ${activity.color}`}><span>{activity.format.icon}</span><small>{activity.format.name}<br />QUEST LAB</small></div><div className="question-copy"><span className="eyebrow">{activity.format.icon} {activity.format.name} · {activity.label}</span><h1>{activity.title}</h1><p>{activity.format.instruction} {activity.hint}</p><button className="hint-button" onClick={() => setShowHint(!showHint)}>💡 Pista del explorador</button>{showHint && <div className="hint-box">{activity.hint}</div>}</div></section>
    <ActivityInteraction activity={activity} selected={selected} setSelected={selectAnswer} checked={checked && isCorrect} />
    <footer className={`feedback-bar ${checked ? (isCorrect || completed ? 'success' : 'error') : ''}`}><div className="feedback-icon">{checked && (isCorrect || completed) ? '✓' : '✦'}</div><div><strong>{checked ? (isCorrect || completed ? (isFinished ? '¡Ruta completada!' : '¡Muy bien!') : 'Respuesta revisada') : 'Tu turno, explorador'}</strong><p>{checked ? (isCorrect || completed ? (isFinished ? 'Has completado los 10 ejercicios de esta materia.' : 'Has ganado 20 XP y el siguiente ejercicio ya está listo.') : 'Puedes reintentarlo o pasar al siguiente ejercicio.') : 'Elige una respuesta para comprobar tu idea.'}</p></div><button className="primary-button" disabled={!completed && selected === null} onClick={canAdvance ? advance : checkAnswer}>{actionLabel} <span>→</span></button></footer>
  </div>
}

function AdminPageV2() {
  const types = [
    ['quiz', 'Cuestionario', '☑'], ['crossword', 'Crucigrama', '▦'], ['drag', 'Arrastra y suelta', '↔'],
    ['match', 'Relaciona conceptos', '⛓'], ['color', 'Colorea', '◉'], ['boolean', 'Verdadero o falso', '✓'],
  ]
  const emptySubject = { name: '', short: '', icon: '✦', color: 'violet', description: '' }
  const emptyActivity = { label: '', title: '', hint: '', answers: '', correct: 0, icon: '☑', format: 'Cuestionario', format_type: 'quiz', instruction: 'Lee la pregunta y elige una respuesta.', sort_order: 0 }
  const [subjects, setSubjects] = useState([])
  const [subjectForm, setSubjectForm] = useState(emptySubject)
  const [activityForm, setActivityForm] = useState(emptyActivity)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [editingSubject, setEditingSubject] = useState(null)
  const [editingActivity, setEditingActivity] = useState(null)
  const [message, setMessage] = useState('')
  const load = async () => { const { data } = await api.get('/subjects'); setSubjects(data.subjects); setSelectedSubject((current) => current || data.subjects[0]?.id || null) }
  useEffect(() => { load().catch(() => setMessage('No se pudieron cargar las materias.')) }, [])
  const saveSubject = async (event) => { event.preventDefault(); const request = editingSubject ? api.put(`/admin/subjects/${editingSubject}`, subjectForm) : api.post('/admin/subjects', subjectForm); await request; setSubjectForm(emptySubject); setEditingSubject(null); setMessage('Materia guardada.'); await load() }
  const saveActivity = async (event) => { event.preventDefault(); const payload = { ...activityForm, answers: activityForm.answers.split(',').map((answer) => answer.trim()).filter(Boolean) }; const request = editingActivity ? api.put(`/admin/activities/${editingActivity}`, payload) : api.post(`/admin/subjects/${selectedSubject}/activities`, payload); await request; setActivityForm(emptyActivity); setEditingActivity(null); setMessage('Actividad guardada.'); await load() }
  const removeSubject = async (id) => { if (!window.confirm('¿Eliminar materia y actividades?')) return; await api.delete(`/admin/subjects/${id}`); await load() }
  const removeActivity = async (id) => { await api.delete(`/admin/activities/${id}`); await load() }
  const selected = subjects.find((subject) => subject.id === selectedSubject)
  return <div className="admin-page page-enter"><div className="admin-heading"><div><span className="eyebrow">CONTROL DE CONTENIDO</span><h1>Panel administrador</h1><p>Organiza materias y crea diferentes tipos de actividades.</p></div><button className="secondary-button" onClick={() => { window.location.hash = 'missions' }}>Volver a misiones</button></div>{message && <div className="admin-message">{message}</div>}<div className="admin-layout"><section className="admin-panel panel"><div className="admin-panel-title"><h2>Materias</h2><span>{subjects.length} registradas</span></div><form className="admin-form" onSubmit={saveSubject}><input placeholder="Nombre de materia" value={subjectForm.name} onChange={(event) => setSubjectForm({ ...subjectForm, name: event.target.value })} required /><input placeholder="Nombre corto" value={subjectForm.short} onChange={(event) => setSubjectForm({ ...subjectForm, short: event.target.value })} required /><div className="admin-form-row"><input placeholder="Icono" value={subjectForm.icon} onChange={(event) => setSubjectForm({ ...subjectForm, icon: event.target.value })} /><select value={subjectForm.color} onChange={(event) => setSubjectForm({ ...subjectForm, color: event.target.value })}><option value="violet">Violeta</option><option value="orange">Naranja</option><option value="cyan">Cian</option><option value="green">Verde</option></select></div><textarea placeholder="Descripción" value={subjectForm.description} onChange={(event) => setSubjectForm({ ...subjectForm, description: event.target.value })} /><button className="primary-button" type="submit">{editingSubject ? 'Guardar cambios' : 'Crear materia'}</button></form><div className="admin-subject-list">{subjects.map((subject) => <div className={`admin-subject-item ${selectedSubject === subject.id ? 'selected' : ''}`} key={subject.id} onClick={() => setSelectedSubject(subject.id)}><span className="subject-icon">{subject.icon}</span><strong>{subject.name}</strong><small>{subject.activities.length} actividades</small><div><button onClick={(event) => { event.stopPropagation(); setEditingSubject(subject.id); setSubjectForm(subject) }}>Editar</button><button onClick={(event) => { event.stopPropagation(); removeSubject(subject.id) }}>Borrar</button></div></div>)}</div></section><section className="admin-panel panel"><div className="admin-panel-title"><div><h2>Actividades</h2><span>{selected ? selected.name : 'Selecciona una materia'}</span></div></div>{selected && <><form className="admin-form" onSubmit={saveActivity}><input placeholder="Etiqueta de la actividad" value={activityForm.label} onChange={(event) => setActivityForm({ ...activityForm, label: event.target.value })} required /><input placeholder="Pregunta o título" value={activityForm.title} onChange={(event) => setActivityForm({ ...activityForm, title: event.target.value })} required /><textarea placeholder="Pista" value={activityForm.hint} onChange={(event) => setActivityForm({ ...activityForm, hint: event.target.value })} /><input placeholder="Respuestas separadas por coma" value={activityForm.answers} onChange={(event) => setActivityForm({ ...activityForm, answers: event.target.value })} required /><div className="admin-form-row"><input type="number" min="0" placeholder="Índice correcto" value={activityForm.correct} onChange={(event) => setActivityForm({ ...activityForm, correct: Number(event.target.value) })} /><select value={activityForm.format_type} onChange={(event) => { const type = types.find((item) => item[0] === event.target.value); setActivityForm({ ...activityForm, format_type: type[0], format: type[1], icon: type[2] }) }}>{types.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></div><button className="primary-button" type="submit">{editingActivity ? 'Guardar actividad' : 'Crear actividad'}</button></form><div className="admin-activity-list">{selected.activities.map((activity) => <div className="admin-activity-item" key={activity.id}><strong>{activity.title}</strong><small>{activity.label} · {activity.format}</small><div><button onClick={() => { setEditingActivity(activity.id); setActivityForm({ ...activity, answers: activity.answers.join(', ') }) }}>Editar</button><button onClick={() => removeActivity(activity.id)}>Borrar</button></div></div>)}</div></>}</section></div></div>
}

function AdminPage() {
  const emptySubject = { name: '', short: '', icon: '✦', color: 'violet', description: '' }
  const emptyActivity = { label: '', title: '', hint: '', answers: '', correct: 0, icon: '☑', format: 'Cuestionario', format_type: 'quiz', instruction: 'Lee la pregunta y elige una respuesta.', sort_order: 0 }
  const [subjects, setSubjects] = useState([])
  const [subjectForm, setSubjectForm] = useState(emptySubject)
  const [activityForm, setActivityForm] = useState(emptyActivity)
  const [editingSubject, setEditingSubject] = useState(null)
  const [editingActivity, setEditingActivity] = useState(null)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [message, setMessage] = useState('')

  const loadSubjects = async () => {
    const { data } = await api.get('/subjects')
    setSubjects(data.subjects)
    setSelectedSubject((current) => current || data.subjects[0]?.id || null)
  }

  useEffect(() => { loadSubjects().catch(() => setMessage('No se pudieron cargar las materias.')) }, [])

  const submitSubject = async (event) => {
    event.preventDefault()
    const request = editingSubject ? api.put(`/admin/subjects/${editingSubject}`, subjectForm) : api.post('/admin/subjects', subjectForm)
    await request
    setSubjectForm(emptySubject)
    setEditingSubject(null)
    setMessage('Materia guardada correctamente.')
    await loadSubjects()
  }

  const removeSubject = async (id) => {
    if (!window.confirm('¿Eliminar esta materia y sus actividades?')) return
    await api.delete(`/admin/subjects/${id}`)
    setMessage('Materia eliminada.')
    await loadSubjects()
  }

  const submitActivity = async (event) => {
    event.preventDefault()
    const payload = { ...activityForm, answers: activityForm.answers.split(',').map((answer) => answer.trim()).filter(Boolean) }
    const request = editingActivity ? api.put(`/admin/activities/${editingActivity}`, payload) : api.post(`/admin/subjects/${selectedSubject}/activities`, payload)
    await request
    setActivityForm(emptyActivity)
    setEditingActivity(null)
    setMessage('Actividad guardada correctamente.')
    await loadSubjects()
  }

  const editSubject = (subject) => { setEditingSubject(subject.id); setSubjectForm({ name: subject.name, short: subject.short, icon: subject.icon, color: subject.color, description: subject.description || '' }) }
  const editActivity = (activity) => { setEditingActivity(activity.id); setActivityForm({ ...activity, answers: activity.answers.join(', ') }) }
  const removeActivity = async (id) => { await api.delete(`/admin/activities/${id}`); setMessage('Actividad eliminada.'); await loadSubjects() }
  const selected = subjects.find((subject) => subject.id === selectedSubject)

  return <div className="admin-page page-enter"><div className="admin-heading"><div><span className="eyebrow">CONTROL DE CONTENIDO</span><h1>Panel administrador</h1><p>Crea y organiza las materias y actividades de Quest Academy.</p></div><button className="secondary-button" onClick={() => { window.location.hash = 'missions' }}>Volver a misiones</button></div>{message && <div className="admin-message">{message}</div>}<div className="admin-layout"><section className="admin-panel panel"><div className="admin-panel-title"><h2>Materias</h2><span>{subjects.length} registradas</span></div><form className="admin-form" onSubmit={submitSubject}><input placeholder="Nombre de materia" value={subjectForm.name} onChange={(event) => setSubjectForm({ ...subjectForm, name: event.target.value })} required /><input placeholder="Nombre corto" value={subjectForm.short} onChange={(event) => setSubjectForm({ ...subjectForm, short: event.target.value })} required /><div className="admin-form-row"><input placeholder="Icono" value={subjectForm.icon} onChange={(event) => setSubjectForm({ ...subjectForm, icon: event.target.value })} /><select value={subjectForm.color} onChange={(event) => setSubjectForm({ ...subjectForm, color: event.target.value })}><option value="violet">Violeta</option><option value="orange">Naranja</option><option value="cyan">Cian</option><option value="green">Verde</option></select></div><textarea placeholder="Descripción" value={subjectForm.description} onChange={(event) => setSubjectForm({ ...subjectForm, description: event.target.value })} /><button className="primary-button" type="submit">{editingSubject ? 'Guardar cambios' : 'Crear materia'}</button>{editingSubject && <button className="text-button" type="button" onClick={() => { setEditingSubject(null); setSubjectForm(emptySubject) }}>Cancelar edición</button>}</form><div className="admin-subject-list">{subjects.map((subject) => <div className={`admin-subject-item ${selectedSubject === subject.id ? 'selected' : ''}`} key={subject.id} onClick={() => setSelectedSubject(subject.id)}><span className="subject-icon">{subject.icon}</span><strong>{subject.name}</strong><small>{subject.activities.length} actividades</small><div><button onClick={(event) => { event.stopPropagation(); editSubject(subject) }}>Editar</button><button onClick={(event) => { event.stopPropagation(); removeSubject(subject.id) }}>Borrar</button></div></div>)}</div></section><section className="admin-panel panel"><div className="admin-panel-title"><div><h2>Actividades</h2><span>{selected ? `Materia: ${selected.name}` : 'Selecciona una materia'}</span></div></div>{selected && <><form className="admin-form" onSubmit={submitActivity}><input placeholder="Etiqueta, por ejemplo: Misión 1" value={activityForm.label} onChange={(event) => setActivityForm({ ...activityForm, label: event.target.value })} required /><input placeholder="Pregunta o título" value={activityForm.title} onChange={(event) => setActivityForm({ ...activityForm, title: event.target.value })} required /><textarea placeholder="Pista" value={activityForm.hint} onChange={(event) => setActivityForm({ ...activityForm, hint: event.target.value })} /><input placeholder="Respuestas separadas por coma" value={activityForm.answers} onChange={(event) => setActivityForm({ ...activityForm, answers: event.target.value })} required /><div className="admin-form-row"><input type="number" min="0" placeholder="Índice correcto" value={activityForm.correct} onChange={(event) => setActivityForm({ ...activityForm, correct: Number(event.target.value) })} /><select value={activityForm.format_type} onChange={(event) => setActivityForm({ ...activityForm, format_type: event.target.value, format: event.target.options[event.target.selectedIndex].text })}><option value="quiz">Cuestionario</option><option value="drag">Arrastra</option><option value="sort">Ordena</option><option value="fill">Completa palabras</option></select></div><button className="primary-button" type="submit">{editingActivity ? 'Guardar actividad' : 'Crear actividad'}</button>{editingActivity && <button className="text-button" type="button" onClick={() => { setEditingActivity(null); setActivityForm(emptyActivity) }}>Cancelar edición</button>}</form><div className="admin-activity-list">{selected.activities.map((activity) => <div className="admin-activity-item" key={activity.id}><strong>{activity.title}</strong><small>{activity.label} · {activity.answers.length} respuestas</small><div><button onClick={() => editActivity(activity)}>Editar</button><button onClick={() => removeActivity(activity.id)}>Borrar</button></div></div>)}</div></>}</section></div></div>
}

function ProfilePage({ user, onUserUpdated, progress, equippedAvatar, onEquipAvatar, onReset, onLogout }) {
  const [editing, setEditing] = useState(false)
  return (
    <>
      <ProfileView
        user={user}
        progress={progress}
        equippedAvatar={equippedAvatar}
        onEquipAvatar={onEquipAvatar}
        onReset={onReset}
        onLogout={onLogout}
        onEdit={() => setEditing(true)}
      />
      {editing && (
        <ProfileEditor
          user={user}
          onClose={() => setEditing(false)}
          onUpdated={(updatedUser) => {
            onUserUpdated(updatedUser)
            setEditing(false)
          }}
        />
      )}
    </>
  )
}

function ProfileEditor({ user, onClose, onUpdated }) {
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', password: '' })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const save = async (event) => {
    event.preventDefault()
    setError('')
    setSaving(true)
    try {
      const { data } = await api.put('/profile', form)
      onUpdated(data.user)
    } catch (requestError) {
      const validationErrors = requestError.response?.data?.errors
      setError(validationErrors ? Object.values(validationErrors).flat()[0] : requestError.response?.data?.message || 'No se pudieron guardar los cambios.')
    } finally {
      setSaving(false)
    }
  }
  return <div className="profile-edit-overlay"><section className="profile-edit-modal"><div className="admin-panel-title"><div><span className="eyebrow">CUENTA</span><h2>Editar perfil</h2></div><button className="modal-close" onClick={onClose} aria-label="Cerrar">×</button></div><form className="admin-form" onSubmit={save}><label>Nombre<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required /></label><label>Correo electrónico<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required /></label><label>Nueva contraseña <small>Déjala vacía para conservar la actual.</small><input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} minLength="6" autoComplete="new-password" /></label>{error && <div className="login-error">{error}</div>}<button className="primary-button" disabled={saving}>{saving ? 'Guardando...' : 'Guardar cambios'}</button></form></section></div>
}

function ProfileView({ user, progress, equippedAvatar, onEquipAvatar, onReset, onLogout, onEdit }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [feedbackToast, setFeedbackToast] = useState(null)

  const displayName = user?.name || 'Leo Aventurero'

  // Equipamiento activo
  const helmetItem = avatarCatalog.find((item) => item.id === equippedAvatar?.helmets) || avatarCatalog[0]
  const suitItem = avatarCatalog.find((item) => item.id === equippedAvatar?.suits) || avatarCatalog[1]
  const auraItem = avatarCatalog.find((item) => item.id === equippedAvatar?.auras) || avatarCatalog[2]

  const auraColor = auraItem?.color && auraItem.color !== 'transparent' ? auraItem.color : null

  // Próximo desbloqueo: cada 50 XP
  const nextMilestone = Math.floor(progress.xp / 50) * 50 + 50
  const nextRewardItem = avatarCatalog.find((item) => item.requiredXp === nextMilestone) || avatarCatalog.find((item) => item.requiredXp > progress.xp)
  const xpToNext = Math.max(0, (nextRewardItem?.requiredXp || nextMilestone) - progress.xp)
  const tierProgress = Math.min(100, Math.round(((progress.xp % 50) / 50) * 100))

  const categories = [
    { id: 'all', label: 'Todos', icon: 'grid_view' },
    { id: 'helmets', label: 'Cascos & Gafas', icon: 'smart_toy' },
    { id: 'suits', label: 'Trajes', icon: 'checkroom' },
    { id: 'auras', label: 'Color Aura', icon: 'palette' },
  ]

  const filteredItems = activeCategory === 'all'
    ? avatarCatalog
    : avatarCatalog.filter((item) => item.category === activeCategory)

  const handleItemClick = (item) => {
    const isUnlocked = progress.xp >= item.requiredXp
    if (!isUnlocked) {
      const needed = item.requiredXp - progress.xp
      setFeedbackToast({
        type: 'warning',
        message: `🔒 Requiere ${item.requiredXp} XP. Te faltan ${needed} XP para desbloquear "${item.name}". ¡Supera retos para ganar +20 XP cada uno!`,
      })
      setTimeout(() => setFeedbackToast(null), 4000)
      return
    }

    onEquipAvatar((current) => ({
      ...current,
      [item.category]: item.id,
    }))
    setFeedbackToast({
      type: 'success',
      message: `¡${item.name} equipado en tu explorador!`,
    })
    setTimeout(() => setFeedbackToast(null), 2500)
  }

  return (
    <div className="profile-page page-enter">
      {/* Neo-Digital Avatar Stage Card */}
      <section className="avatar-hero-card">
        <div className="avatar-hero-card-accent" />

        <div className="avatar-meta-pills">
          <div className="meta-badges-group">
            <span className="meta-pill pill-level">
              <span className="material-symbols-outlined" style={{ fontSize: 15 }}>military_tech</span>
              Nivel 14 · Maestro Estratega
            </span>
            <span className="meta-pill pill-elite">Rango Élite</span>
          </div>
          <span className="meta-pill pill-live">
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>auto_fix_high</span>
            Taller Activo
          </span>
        </div>

        <div className="avatar-stage-layout">
          {/* Avatar Showcase Pod */}
          <div className="avatar-stage-pod">
            <div className="avatar-pod-box">
              {/* Tag: Helmet/Visor (Top Left) */}
              <div className="avatar-floating-tag tag-tl" title={helmetItem.name}>
                <span className="material-symbols-outlined">{helmetItem.icon || 'visibility'}</span>
                <span>{helmetItem.name}</span>
              </div>

              {/* Tag: Aura (Top Right) */}
              <div className="avatar-floating-tag tag-tr" title={auraItem.name}>
                {auraColor ? (
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: auraColor, display: 'inline-block', boxShadow: `0 0 5px ${auraColor}` }} />
                ) : (
                  <span className="material-symbols-outlined" style={{ fontSize: 13 }}>circle</span>
                )}
                <span>{auraItem.name}</span>
              </div>

              {/* Central Avatar Frame con ilustración reactiva */}
              <div
                className="avatar-glow-ring"
                style={{
                  boxShadow: auraColor ? `0 0 28px ${auraColor}88, 0 6px 0 #3e21b6` : '0 6px 0 #3e21b6',
                  borderColor: auraColor || 'var(--violet)',
                }}
              >
                <AvatarCanvas
                  helmetId={equippedAvatar?.helmets}
                  suitId={equippedAvatar?.suits}
                  auraId={equippedAvatar?.auras}
                  size={144}
                />
                <div className="avatar-active-dot" title="Equipo activo">
                  <span className="material-symbols-outlined" style={{ fontSize: 15 }}>check</span>
                </div>
              </div>

              {/* Tag: Suit (Bottom Center) */}
              <div className="avatar-floating-tag tag-bc" title={suitItem.name}>
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>shield</span>
                <span>{suitItem.name}</span>
              </div>
            </div>

            <span className="avatar-stage-caption">
              <span className="pulse-indicator" />
              Vista previa activa en tiempo real
            </span>
          </div>

          {/* Identity & Progression Column */}
          <div className="avatar-identity-col">
            <div className="identity-header-wrap">
              <div>
                <h1>{displayName}</h1>
                <p>{user?.email || 'Explorador de la Academia desde Septiembre 2024 · Escuadrón Alfa'}</p>
              </div>
              <button className="secondary-button" onClick={onEdit}>
                <span className="material-symbols-outlined" style={{ fontSize: 17 }}>tune</span>
                Editar perfil
              </button>
            </div>

            {/* Next Reward Progress Energy Rail */}
            <div className="next-reward-rail-card">
              <div className="next-reward-rail-header">
                <span>Próximo desbloqueo cada 50 XP</span>
                <strong>{progress.xp} XP / {nextRewardItem?.requiredXp || nextMilestone} XP</strong>
              </div>
              <div className="next-reward-bar">
                <div className="next-reward-fill" style={{ width: `${tierProgress}%` }} />
              </div>
              <div className="next-reward-footer">
                <span>
                  {nextRewardItem ? (
                    <>Faltan <strong>{xpToNext} XP</strong> para desbloquear <strong>{nextRewardItem.name}</strong></>
                  ) : (
                    '¡Todos los artículos actuales desbloqueados!'
                  )}
                </span>
                <strong>{tierProgress}% tramo</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Taller de Estilo: Personalización de Avatar */}
      <section className="workshop-card">
        <div className="workshop-head-row">
          <div className="workshop-title-box">
            <span className="material-symbols-outlined">tune</span>
            <div>
              <h2>Taller de Estilo: Personalización de Avatar</h2>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)' }}>
                Cada 50 XP desbloqueas una recompensa nueva. Haz clic para equipar al instante.
              </p>
            </div>
          </div>
          <span className="workshop-hint-badge">
            ✦ {avatarCatalog.filter((i) => progress.xp >= i.requiredXp).length} de {avatarCatalog.length} desbloqueados
          </span>
        </div>

        {feedbackToast && (
          <div className={`workshop-feedback-toast ${feedbackToast.type}`}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
              {feedbackToast.type === 'warning' ? 'lock' : 'check_circle'}
            </span>
            <span>{feedbackToast.message}</span>
          </div>
        )}

        {/* Category Tabs */}
        <div className="workshop-tab-strip">
          {categories.map((cat) => {
            const count = cat.id === 'all'
              ? avatarCatalog.length
              : avatarCatalog.filter((i) => i.category === cat.id).length
            return (
              <button
                key={cat.id}
                className={`workshop-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className="tab-count">{count}</span>
              </button>
            )
          })}
        </div>

        {/* Rewards Items Grid */}
        <div className="workshop-items-grid">
          {filteredItems.map((item) => {
            const isUnlocked = progress.xp >= item.requiredXp
            const isEquipped = equippedAvatar?.[item.category] === item.id
            const needed = item.requiredXp - progress.xp

            return (
              <div
                key={item.id}
                className={`reward-card-item ${isEquipped ? 'equipped' : ''} ${!isUnlocked ? 'locked' : ''}`}
                onClick={() => handleItemClick(item)}
                style={{ cursor: isUnlocked ? 'pointer' : 'default' }}
              >
                <div>
                  <div className="reward-card-top">
                    <div className={`reward-icon-sq cat-${item.category}`}>
                      <span className="material-symbols-outlined">{item.icon || 'star'}</span>
                    </div>
                    <div className="reward-info-box">
                      <div className="reward-title-row">
                        <strong title={item.name}>{item.name}</strong>
                        <span className="reward-xp-pill">{item.requiredXp} XP</span>
                      </div>
                      <small style={{ color: 'var(--muted)', fontSize: 10, textTransform: 'uppercase', fontWeight: 800 }}>
                        {item.category === 'helmets' ? 'Casco / Gafas' : item.category === 'suits' ? 'Traje' : 'Color Aura'}
                      </small>
                    </div>
                  </div>
                  <p className="reward-card-desc">{item.desc}</p>
                </div>

                <div>
                  {isEquipped ? (
                    <button className="reward-action-btn btn-equipped" type="button">
                      <span className="material-symbols-outlined" style={{ fontSize: 15 }}>check</span>
                      Equipado
                    </button>
                  ) : isUnlocked ? (
                    <button className="reward-action-btn btn-equip" type="button">
                      Equipar
                    </button>
                  ) : (
                    <button className="reward-action-btn btn-locked" type="button" title={`Faltan ${needed} XP`}>
                      <span className="material-symbols-outlined" style={{ fontSize: 14 }}>lock</span>
                      Bloqueado (Faltan {needed} XP)
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Existing Stats, Badges, CTA & Actions Preserved Intact */}
      <section className="stats-grid">
        <Stat value={progress.xp.toLocaleString('es-ES')} label="XP TOTAL" tone="violet" />
        <Stat value={progress.streak} label="RACHA" tone="orange" />
        <Stat value={progress.completed} label="MISIONES" tone="cyan" />
        <Stat value="92%" label="PRECISIÓN" tone="green" />
      </section>

      <section className="profile-columns">
        <div className="achievements panel">
          <div className="section-heading" style={{ marginTop: 0 }}>
            <div>
              <span className="eyebrow muted">COLECCIÓN</span>
              <h2>Medallero de Héroe</h2>
            </div>
            <span className="collection-count">{progress.achievements}/8</span>
          </div>
          <div className="badge-grid">
            <Badge icon="✦" title="Primera órbita" done />
            <Badge icon="♨" title="Racha de fuego" done />
            <Badge icon="◒" title="Mente matemática" done />
            <Badge icon="❋" title="Biólogo curioso" done />
            <Badge icon="Aa" title="Amigo de las letras" />
            <Badge icon="♛" title="Maestro explorador" />
          </div>
        </div>

        <div className="profile-cta panel">
          <span className="eyebrow">PRÓXIMO DESBLOQUEO</span>
          <h2>{nextRewardItem?.name || 'Recompensa de Élite'}</h2>
          <p>
            {nextRewardItem
              ? `Consigue ${xpToNext} XP más en misiones para personalizar tu avatar con ${nextRewardItem.name}.`
              : '¡Has desbloqueado todas las recompensas disponibles!'}
          </p>
          <div className="mini-progress">
            <span style={{ width: `${tierProgress}%` }} />
          </div>
          <button className="primary-button" onClick={() => window.scrollTo({ top: 350, behavior: 'smooth' })}>
            Ver taller de estilo <span>→</span>
          </button>
        </div>
      </section>

      <div className="profile-actions">
        <button className="reset-button" onClick={onReset}>Reiniciar progreso de prueba</button>
        <button className="logout-button" onClick={onLogout}>Cerrar sesión <span>↪</span></button>
      </div>
    </div>
  )
}

function Stat({ value, label, tone }) { return <div className={`stat-card ${tone}`}><strong>{value}</strong><span>{label}</span></div> }
function Badge({ icon, title, done }) { return <div className={`badge ${done ? 'done' : 'locked'}`}><span>{icon}</span><strong>{title}</strong><small>{done ? 'DESBLOQUEADO' : 'EN PROGRESO'}</small></div> }

function BottomNav({ page, onNavigate }) {
  return <nav className="bottom-nav">{[['missions', '⌂', 'Misiones'], ['map', '◌', 'Mapa'], ['challenge', '◇', 'Reto'], ['profile', '♛', 'Perfil']].map(([id, icon, label]) => <button className={page === id || (page === 'missions' && id === 'missions') ? 'active' : ''} key={id} onClick={() => onNavigate(id)}><span>{icon}</span><small>{label}</small></button>)}</nav>
}

export default App
