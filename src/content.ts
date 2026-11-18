import recuentos from './datos/cuentas.json';
import grabados from './datos/grabados.json';

/**
 * Textos de la web. Las citas son literales del texto de Project Gutenberg (#2000), con su ortografía
 * («vee», «agora», «desta»). Los grabados son de Gustave Doré para la edición francesa de 1863.
 */

export const G = grabados;
export type Grabado = keyof typeof grabados;
export const CUENTAS = recuentos;
const BASE = import.meta.env.BASE_URL;
export const url = (k: string) => `${BASE}img/${k}.webp`;
export const commons = (fichero: string) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(fichero.replace(/ /g, '_'))}`;
export const miles = (n: number) => n.toLocaleString('es-ES');

export const portada = {
  antetitulo: 'Don Quijote de la Mancha · grabados de Gustave Doré',
  titulo: ['Lo que ve', 'lo que hay'],
  entradilla: 'Cervantes escribe cada aventura dos veces: como la ve don Quijote y como es. Aquí el scroll hace de Sancho.',
  pista: 'Baja despacio',
  citas: [
    {texto: 'y así, del poco dormir y del mucho leer, se le secó el celebro, de manera que vino a perder el juicio.', donde: 'Primera parte, capítulo I'},
    {
      texto: 'y asentósele de tal modo en la imaginación que era verdad toda aquella máquina de aquellas sonadas soñadas invenciones que leía, que para él no había otra historia más cierta en el mundo.',
      donde: 'Primera parte, capítulo I',
    },
  ],
  pie: 'Doré lo dibuja leyendo, rodeado de todo lo que sale de los libros: caballeros, damas, dragones y gigantes.',
  leyenda: {
    titulo: 'Cómo se lee',
    texto: 'En cada aventura verás primero lo que ve él, de cerca y en oro. Al bajar, la cámara se aleja hasta enseñar el grabado entero, en tinta: lo que hay.',
    ve: 'Lo que ve',
    hay: 'Lo que hay',
  },
};

export type Aventura = {
  id: string;
  img: Grabado;
  /** Centro (0–1) y aumento del recorte de «lo que ve». */
  zoom: {x: number; y: number; s: number};
  extra?: Grabado;
  donde: string;
  titulo: string;
  etiquetas?: [string, string];
  ve: {palabra: string; cita: string; quien: string};
  hay: {palabra: string; cita: string; quien: string};
  nota: string;
};

export const aventuras: Aventura[] = [
  {
    id: 'venta',
    img: 'venta',
    zoom: {x: 0.62, y: 0.2, s: 2.6},
    donde: 'Primera parte, capítulos II y III',
    titulo: 'La venta',
    ve: {
      palabra: 'Un castillo',
      cita: 'se le representó que era un castillo con sus cuatro torres y chapiteles de luciente plata, sin faltarle su puente levadiza y honda cava',
      quien: 'El narrador, con los ojos de don Quijote',
    },
    hay: {
      palabra: 'Una venta',
      cita: 'y que el abadejo eran truchas; el pan, candeal; y las rameras, damas; y el ventero, castellano del castillo',
      quien: 'El narrador',
    },
    nota: 'Esa noche vela las armas junto al pozo del corral, y el ventero lo arma caballero con el libro de cuentas de la paja y la cebada.',
  },
  {
    id: 'molinos',
    img: 'molinos',
    zoom: {x: 0.42, y: 0.22, s: 2.3},
    donde: 'Primera parte, capítulo VIII',
    titulo: 'Los molinos',
    ve: {
      palabra: 'Treinta gigantes',
      cita: 'ves allí, amigo Sancho Panza, donde se descubren treinta, o pocos más, desaforados gigantes, con quien pienso hacer batalla y quitarles a todos las vidas',
      quien: 'Don Quijote',
    },
    hay: {
      palabra: 'Molinos de viento',
      cita: 'aquellos que allí se parecen no son gigantes, sino molinos de viento, y lo que en ellos parecen brazos son las aspas',
      quien: 'Sancho',
    },
    nota: 'Embiste, el aspa lo levanta con caballo y todo y lo tira rodando. Su explicación: el sabio Frestón «ha vuelto estos gigantes en molinos».',
  },
  {
    id: 'ovejas',
    img: 'ovejas',
    zoom: {x: 0.6, y: 0.22, s: 3},
    donde: 'Primera parte, capítulo XVIII',
    titulo: 'Los rebaños',
    ve: {
      palabra: 'Dos ejércitos',
      cita: 'Aquel caballero que allí ves de las armas jaldes, que trae en el escudo un león coronado, rendido a los pies de una doncella, es el valeroso Laurcalco, señor de la Puente de Plata',
      quien: 'Don Quijote',
    },
    hay: {
      palabra: 'Dos rebaños',
      cita: '¡Vuélvase vuestra merced, señor don Quijote, que voto a Dios que son carneros y ovejas las que va a embestir!',
      quien: 'Sancho',
    },
    nota: 'Los pastores le tiran piedras con hondas y le arrancan «tres o cuatro dientes y muelas». Para él, el encantador «ha vuelto los escuadrones de enemigos en manadas de ovejas».',
  },
  {
    id: 'batanes',
    img: 'batanes',
    zoom: {x: 0.32, y: 0.22, s: 2.6},
    donde: 'Primera parte, capítulo XX',
    titulo: 'Los golpes en la noche',
    ve: {
      palabra: 'Una aventura espantosa',
      cita: 'oyeron que daban unos golpes a compás, con un cierto crujir de hierros y cadenas',
      quien: 'El narrador',
    },
    hay: {
      palabra: 'Seis mazos de batán',
      cita: 'Y eran —si no lo has, ¡oh lector!, por pesadumbre y enojo— seis mazos de batán, que con sus alternativos golpes aquel estruendo formaban.',
      quien: 'El narrador',
    },
    nota: 'Pasan la noche esperando, con las patas de Rocinante atadas por Sancho para que su amo no se lance. Al ver los mazos, Sancho tiene que «apretarse las ijadas con los puños, por no reventar riendo».',
  },
  {
    id: 'dulcinea',
    img: 'dulcinea',
    zoom: {x: 0.3, y: 0.28, s: 2.2},
    donde: 'Segunda parte, capítulo X',
    titulo: 'Dulcinea',
    etiquetas: ['Lo que dice Sancho', 'Lo que ve don Quijote'],
    ve: {
      palabra: 'Dulcinea y sus doncellas',
      cita: '¿no vee que son éstas, las que aquí vienen, resplandecientes como el mismo sol a mediodía?',
      quien: 'Sancho',
    },
    hay: {
      palabra: 'Tres labradoras',
      cita: 'Yo no veo, Sancho, sino a tres labradoras sobre tres borricos.',
      quien: 'Don Quijote',
    },
    nota: 'Aquí se da la vuelta: el que inventa es Sancho y don Quijote ve lo que hay. Lo arregla a su manera: los encantadores han convertido a Dulcinea en labradora.',
  },
  {
    id: 'retablo',
    img: 'retablo',
    zoom: {x: 0.32, y: 0.64, s: 2.4},
    donde: 'Segunda parte, capítulo XXVI',
    titulo: 'El retablo de maese Pedro',
    ve: {
      palabra: 'Un ejército de moros',
      cita: '¡Deteneos, mal nacida canalla; no le sigáis ni persigáis; si no, conmigo sois en la batalla!',
      quien: 'Don Quijote',
    },
    hay: {
      palabra: 'Figurillas de pasta',
      cita: 'estos que derriba, destroza y mata no son verdaderos moros, sino unas figurillas de pasta',
      quien: 'Maese Pedro',
    },
    nota: 'Después paga los muñecos rotos uno por uno: cuarenta reales y tres cuartillos, y dos más por el trabajo de recoger al mono.',
  },
  {
    id: 'clavileno',
    img: 'clavileno',
    extra: 'cohetes',
    zoom: {x: 0.74, y: 0.2, s: 2},
    donde: 'Segunda parte, capítulo XLI',
    titulo: 'Clavileño',
    ve: {
      palabra: 'Un caballo que vuela',
      cita: 'no hay más que torcer esta clavija que sobre el cuello trae puesta, que él los llevará por los aires',
      quien: 'La condesa Trifaldi',
    },
    hay: {
      palabra: 'Un caballo de madera',
      cita: 'por la cola de Clavileño le pegaron fuego con unas estopas, y al punto, por estar el caballo lleno de cohetes tronadores, voló por los aires',
      quien: 'El narrador',
    },
    nota: 'Con los ojos tapados, los criados de los duques les dan aire con «unos grandes fuelles» para que crean que vuelan. Esta vez el engaño no es suyo: es de los duques.',
  },
];

export const cuentas = {
  antetitulo: 'Lo que dice él',
  titulo: 'El libro de cuentas',
  cita: 'estos encantadores que me persiguen no hacen sino ponerme las figuras como ellas son delante de los ojos, y luego me las mudan y truecan en las que ellos quieren',
  citaDonde: 'Don Quijote, ante los muñecos rotos (segunda parte, capítulo XXVI)',
  cabecera: ['Lo que ve', 'Lo que hay', 'Dónde', 'Su explicación'],
  filas: [
    ['Un castillo', 'Una venta', 'I, 2', 'Ninguna: el ventero le sigue la corriente'],
    ['Truchas', 'Abadejo', 'I, 2', 'Ninguna'],
    ['Treinta gigantes', 'Molinos de viento', 'I, 8', 'El sabio Frestón los volvió molinos'],
    ['Dos ejércitos', 'Dos rebaños', 'I, 18', 'El encantador los volvió ovejas'],
    ['Una aventura espantosa', 'Seis mazos de batán', 'I, 20', 'Se ríe con Sancho y luego se enfada'],
    ['El yelmo de Mambrino', 'Una bacía de barbero', 'I, 21', 'Alguien fundió la otra mitad del oro'],
    ['Una labradora', 'Una labradora', 'II, 10', 'Los encantadores han transformado a Dulcinea'],
    ['Moros', 'Figurillas de pasta', 'II, 26', 'Los encantadores le mudan las figuras'],
    ['Un caballo que vuela', 'Un caballo de madera', 'II, 41', 'Ninguna: se lo creen los dos'],
  ],
  recuentos: {
    titulo: 'En todo el libro',
    nota: `Recuento sobre las dos partes, unas ${miles(Math.round(recuentos.palabras / 1000) * 1000)} palabras, con singular y plural.`,
    items: [
      {n: recuentos.castillo, texto: 'veces «castillo»'},
      {n: recuentos.gigante, texto: 'veces «gigante»'},
      {n: recuentos.encantador, texto: 'veces «encantador»'},
      {n: recuentos.Dulcinea, texto: 'veces «Dulcinea»'},
      {n: recuentos.locura, texto: 'veces «locura»'},
      {n: recuentos.cuerdo, texto: 'veces «cuerdo»'},
    ],
  },
};

export const final = {
  antetitulo: 'Segunda parte, capítulo LXXIV',
  titulo: 'La última página',
  intro: 'Vuelve a casa vencido, cae enfermo, duerme «más de seis horas» y despierta con el juicio claro.',
  frase: 'yo fui loco, y ya soy cuerdo; fui don Quijote de la Mancha, y soy agora, como he dicho, Alonso Quijano el Bueno.',
  sancho: {
    texto: 'levántese desa cama, y vámonos al campo vestidos de pastores, como tenemos concertado: quizá tras de alguna mata hallaremos a la señora doña Dulcinea desencantada',
    quien: 'Sancho, junto a la cama',
  },
  cierre: 'Al final del libro, el que quiere seguir viendo castillos es Sancho.',
};

export const creditos = {
  titulo: 'Fuentes',
  fuentes: [
    {nombre: 'Project Gutenberg: Don Quijote (#2000), texto en español', url: 'https://www.gutenberg.org/ebooks/2000'},
    {nombre: 'Wikimedia Commons: grabados de Doré, tomo I (1863)', url: "https://commons.wikimedia.org/wiki/Category:Illustrations_by_Gustave_Doré_in_L'ingénieux_hidalgo_don_Quichotte_de_la_Manche_(1863),_Volume_I"},
    {nombre: 'Wikimedia Commons: grabados de Doré, tomo II (1863)', url: "https://commons.wikimedia.org/wiki/Category:Illustrations_by_Gustave_Doré_in_L'ingénieux_hidalgo_don_Quichotte_de_la_Manche_(1863)_-_Volume_II"},
  ],
  grabados:
    'Gustave Doré dibujaba sobre la plancha de madera y otros la tallaban; muchas llevan abajo a la derecha la firma de su grabador, H. Pisan. Se publicaron en 1863 en la traducción francesa de Louis Viardot.',
  metodo:
    'Web hecha con ayuda de IA (Claude). Los grabados son de dominio público y no se han generado ni retocado con IA: solo se han recortado, pasado a gris y teñido en pantalla. Las citas son literales; los recuentos salen de un script sobre el texto completo.',
  firma: 'Baja otra vez: vuelven los gigantes.',
};
