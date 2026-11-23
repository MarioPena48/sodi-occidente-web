export const FLEET = [
  {
    id: "sprinter-19",
    name: "Mercedes-Benz Sprinter 19",
    category: "large",
    capacity: "19 pasajeros",
    subtitle: "Camioneta ejecutiva de techo alto",
    specs: "Chofer incluido • A/C doble zona",
    image: "./images/fleet-sprinter.jpg",
  },
  {
    id: "hiace-14",
    name: "Toyota Hiace Turística",
    category: "med",
    capacity: "14 pasajeros",
    subtitle: "Ideal para sierra y viajes familiares",
    specs: "Chofer incluido • Amplio maletero",
    image: "./images/fleet-hiace.jpg",
  },
  {
    id: "suburban-vip",
    name: "Suburban Ejecutiva VIP",
    category: "vip",
    capacity: "6–7 pasajeros",
    subtitle: "Traslados directivos y aeropuerto GDL",
    specs: "Chofer incluido • Interiores en piel",
    image: "./images/fleet-suburban.jpg",
  },
  {
    id: "sprinter-vip",
    name: "Sprinter Lounge Ejecutiva",
    category: "large",
    capacity: "15 pasajeros",
    subtitle: "Asientos capitán reclinables en piel",
    specs: "Chofer incluido • Viajes largos",
    image: "./images/interior-leather.jpg",
  },
  {
    id: "sprinter-tequila",
    name: "Sprinter Ruta Turística",
    category: "large",
    capacity: "19 pasajeros",
    subtitle: "Especial para Tequila, Mazamitla y Tapalpa",
    specs: "Chofer incluido • Paradas flexibles",
    image: "./images/hero-tequila-sprinter.jpg",
  },
  {
    id: "flotilla-eventos",
    name: "Flotilla para Eventos y Bodas",
    category: "xl",
    capacity: "20–60+ pasajeros",
    subtitle: "Múltiples camionetas coordinadas",
    specs: "Choferes uniformados • Circuitos",
    image: "./images/chauffeur-handover.jpg",
  },
];

export const DESTINATIONS = [
  {
    id: "tequila",
    name: "Tequila, Jalisco",
    time: "1 h 15 min desde GDL",
    desc: "Ruta del Agave, destilerías emblemáticas y haciendas. Tu chofer los recoge en Guadalajara, espera en cada cata y los regresa seguros sin que nadie tenga que manejar.",
    image: "./images/hero-tequila-sprinter.jpg",
  },
  {
    id: "mazamitla",
    name: "Mazamitla, Jalisco",
    time: "2 h 15 min desde GDL",
    desc: "Sierra del Tigre, bosque de pinos y cabañas familiares. Subida cómoda y segura en carretera de montaña con operador experto y espacio para todo el equipaje.",
    image: "./images/dest-mazamitla.jpg",
  },
  {
    id: "tapalpa",
    name: "Tapalpa, Jalisco",
    time: "2 h 00 min desde GDL",
    desc: "Pueblo Mágico, Las Piedrotas y retiros en la montaña. Ideal para grupos grandes, bodas en haciendas o fines de semana con amigos y familia.",
    image: "./images/dest-tapalpa.jpg",
  },
  {
    id: "chapala",
    name: "Lago de Chapala y Ajijic",
    time: "55 min desde GDL",
    desc: "Malecón, galerías de arte y gastronomía frente al lago. Servicio puerta a puerta con horarios flexibles y camioneta climatizada a tu disposición todo el día.",
    image: "./images/dest-chapala.jpg",
  },
  {
    id: "vallarta",
    name: "Puerto Vallarta y Riviera Nayarit",
    time: "3 h 30 min por autopista",
    desc: "Traslados directos a hoteles, resorts y convenciones en la costa. Asientos reclinables, aire acondicionado y descanso total durante todo el trayecto.",
    image: "./images/dest-vallarta.jpg",
  },
  {
    id: "aeropuerto",
    name: "Aeropuerto GDL, Zapopan y Eventos",
    time: "20–40 min zona metro",
    desc: "Recepción puntual en llegadas del Aeropuerto de Guadalajara, Expo Guadalajara, zona Andares y haciendas para bodas o congresos corporativos.",
    image: "./images/chauffeur-handover.jpg",
  },
];

export const EXPERIENCES = [
  {
    id: "exp-tequila",
    title: "Ruta del Tequila",
    desc: "Recolección en tu hotel o domicilio, recorrido por destilerías y regreso seguro sin preocuparte por el volante.",
    duration: "10 horas • Ida y vuelta",
    note: "Chofer incluido",
    destName: "Tequila, Jalisco",
    image: "./images/hero-tequila-sprinter.jpg",
  },
  {
    id: "exp-mazamitla",
    title: "Fin de semana en Mazamitla",
    desc: "Salida viernes y regreso domingo directo a tu cabaña en la sierra. Espacio sobrado para equipaje y grupo completo.",
    duration: "3 días • Viernes a domingo",
    note: "Chofer incluido",
    destName: "Mazamitla, Jalisco",
    image: "./images/dest-mazamitla.jpg",
  },
  {
    id: "exp-tapalpa",
    title: "Escapada a Tapalpa",
    desc: "Pueblo Mágico, Valle de los Enigmas y haciendas. Viaja cómodo en camioneta amplia con operador capacitado.",
    duration: "Día completo o fin de semana",
    note: "Chofer incluido",
    destName: "Tapalpa, Jalisco",
    image: "./images/dest-tapalpa.jpg",
  },
  {
    id: "exp-ejecutivo",
    title: "Jornada Ejecutiva y Bodas",
    desc: "Traslados corporativos, aeropuerto GDL o circuitos continuos para invitados de boda con choferes uniformados.",
    duration: "8–12 horas • A tu horario",
    note: "Chofer incluido",
    destName: "Aeropuerto GDL, Zapopan y Eventos",
    image: "./images/chauffeur-handover.jpg",
  },
];

export const REVIEWS = [
  {
    quote: "Rentamos la Sprinter para ir 18 personas a Tequila. El chofer fue impecable, puntual y todos disfrutamos las destilerías sin preocuparnos por manejar de regreso.",
    name: "Carlos Ramírez",
    initials: "CR",
    trip: "Sprinter 19 pax • Tequila, Jalisco",
  },
  {
    quote: "La camioneta llegó impecable a nuestra casa para ir el fin de semana a Mazamitla. Cabían todas las maletas y el operador conocía cada curva de la sierra.",
    name: "Mariana González",
    initials: "MG",
    trip: "Hiace 14 pax • Mazamitla",
  },
  {
    quote: "Coordinaron tres camionetas para los invitados de nuestra boda en Tapalpa. Todos llegaron a tiempo y el regreso de madrugada fue súper seguro.",
    name: "Andrea y Luis",
    initials: "AL",
    trip: "Flotilla Eventos • Tapalpa",
  },
  {
    quote: "Trabajamos con SODI cada mes para traslados del Aeropuerto de Guadalajara a Zapopan. Unidades nuevas, choferes presentables y factura inmediata.",
    name: "Jorge Mendoza",
    initials: "JM",
    trip: "Suburban VIP • Corporativo GDL",
  },
  {
    quote: "Hicimos un viaje familiar de 15 personas a Puerto Vallarta. Aire acondicionado perfecto, asientos cómodos y un trato súper amable de principio a fin.",
    name: "Sofía Herrera",
    initials: "SH",
    trip: "Sprinter 19 pax • Puerto Vallarta",
  },
];

export const FAQS = [
  {
    q: "¿Todas las camionetas se rentan únicamente con chofer?",
    a: "Sí. El 100% de nuestros servicios en SODI de Occidente incluyen chofer profesional capacitado. Así garantizamos seguridad en carretera, cuidado de la unidad y que todo tu grupo disfrute el viaje sin cansancio ni riesgos al volante.",
  },
  {
    q: "¿Cuántos pasajeros caben en sus camionetas?",
    a: "Contamos con SUV ejecutivas para 6–7 pasajeros, camionetas turísticas para 14 pasajeros y Mercedes-Benz Sprinter para hasta 19 pasajeros. Para bodas, empresas o grupos de 20 a 60+ personas coordinamos varias camionetas en simultáneo.",
  },
  {
    q: "¿Viajan a Tequila, Mazamitla, Tapalpa y destinos fuera de Jalisco?",
    a: "Sí. Realizamos viajes diarios a Tequila, Mazamitla, Tapalpa, Chapala, Ajijic, Guachimontones y Puerto Vallarta, así como traslados foráneos a León, Guanajuato, Aguascalientes, Colima, Morelia y CDMX.",
  },
  {
    q: "¿El servicio incluye seguro de viajero y facturación fiscal?",
    a: "Totalmente. Todas nuestras unidades cuentan con seguro de viajero vigente y mantenimiento preventivo certificado. Somos Servicios y Transportes SODI de Occidente S.A. de C.V. y emitimos factura CFDI.",
  },
  {
    q: "¿Pueden recoger a nuestro grupo en el Aeropuerto de Guadalajara o en varios puntos?",
    a: "Sí. Recogemos directamente en llegadas del Aeropuerto Internacional de Guadalajara (GDL), hoteles en Zapopan o Guadalajara, domicilios particulares y podemos programar paradas acordadas en tu ruta.",
  },
];
