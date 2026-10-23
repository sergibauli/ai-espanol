export const a2Exams = [
  {
    id: 1,
    level: "A2",
    theme: "La familia",
    icon: "Users",
    vocabulary: [
      {
        word: "padres",
        definition: "El hombre y la mujer que tienen hijos",
        chinese: "父母",
        example: "Mis padres viven en Madrid.",
      },
      {
        word: "hermano/a",
        definition: "Hijo de los mismos padres",
        chinese: "兄弟/姐妹",
        example: "Mi hermana mayor estudia medicina.",
      },
      {
        word: "abuelo/a",
        definition: "Padre o madre del padre o de la madre",
        chinese: "祖父/祖母",
        example: "Mi abuela cocina muy bien.",
      },
      {
        word: "primo/a",
        definition: "Hijo del tío o de la tía",
        chinese: "堂/表兄弟姐妹",
        example: "Voy de vacaciones con mis primos.",
      },
      {
        word: "cuñado/a",
        definition: "Esposo o esposa del hermano o hermana",
        chinese: "姐夫/嫂子",
        example: "Mi cuñado trabaja en una oficina.",
      },
      {
        word: "suegro/a",
        definition: "Padre o madre del esposo o de la esposa",
        chinese: "岳父/岳母",
        example: "Los suegros de Ana son muy amables.",
      },
      {
        word: "nuera",
        definition: "Mujer casada con el hijo",
        chinese: "儿媳",
        example: "La nuera de mi madre es doctora.",
      },
      {
        word: "yerno",
        definition: "Hombre casado con la hija",
        chinese: "女婿",
        example: "El yerno de don Carlos es ingeniero.",
      },
      {
        word: "gemelos/as",
        definition: "Dos hermanos nacidos el mismo día",
        chinese: "双胞胎",
        example: "Mis primos gemelos se parecen mucho.",
      },
      {
        word: "sobrino/a",
        definition: "Hijo del hermano o de la hermana",
        chinese: "侄子/侄女",
        example: "Mi sobrina tiene cinco años.",
      },
      {
        word: "pareja",
        definition: "Persona con la que se tiene una relación sentimental",
        chinese: "伴侣",
        example: "Llevo dos años con mi pareja.",
      },
    ],
    reading: {
      textType: "narrativo",
      title: "Una familia española",
      text: `La familia García vive en un piso en el centro de Barcelona. Antonio, el padre, tiene cuarenta y cinco años y trabaja como camarero en un restaurante. Su mujer, María, es enfermera en el hospital de la ciudad. Tienen tres hijos: Lucía, que tiene diecisiete años y está en el instituto; Pedro, de catorce, que le encanta jugar al fútbol; y la pequeña, Sofía, que solo tiene seis años y va al colegio.

Los domingos, toda la familia se reúne en casa de los abuelos, que viven en las afueras. Los abuelos, José y Carmen, tienen un jardín grande donde los nietos juegan mientras los adultos preparan la comida. La abuela Carmen cocina paella, el plato favorito de todos. También van los tíos y primos. La familia de Carlos, el hermano de Antonio, tiene dos hijos gemelos de ocho años.

María dice que le gusta mucho estas reuniones familiares porque pueden hablar de todo. Los primos se llevan muy bien y los abuelos están felices de ver a toda la familia junta. Para Sofía, la mejor parte es cuando el abuelo José le cuenta historias antes de dormir la siesta.`,
      questions: [
        {
          id: 1,
          question: "¿Cuántos hijos tienen Antonio y María?",
          options: ["a) Dos", "b) Tres", "c) Cuatro", "d) Uno"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Tienen tres hijos: Lucía, Pedro y Sofía".',
        },
        {
          id: 2,
          question: "¿Dónde trabaja Antonio?",
          options: ["a) En un hospital", "b) En un restaurante", "c) En una oficina", "d) En un colegio"],
          correctAnswer: 1,
          explanation: "El texto dice que Antonio trabaja como camarero en un restaurante.",
        },
        {
          id: 3,
          question: "¿Qué edad tiene Sofía?",
          options: ["a) Cuatro años", "b) Cinco años", "c) Seis años", "d) Siete años"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Sofía, que solo tiene seis años".',
        },
        {
          id: 4,
          question: "¿Dónde viven los abuelos?",
          options: ["a) En el centro de Barcelona", "b) En las afueras", "c) En Madrid", "d) En el hospital"],
          correctAnswer: 1,
          explanation: "El texto dice que los abuelos viven en las afueras.",
        },
        {
          id: 5,
          question: "¿Qué cocina la abuela Carmen?",
          options: ["a) Gazpacho", "b) Tortilla", "c) Paella", "d) Pasta"],
          correctAnswer: 2,
          explanation: 'El texto dice: "La abuela Carmen cocina paella".',
        },
        {
          id: 6,
          question: "¿Cuándo se reúne la familia?",
          options: ["a) Los sábados", "b) Los viernes", "c) Los domingos", "d) Los lunes"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Los domingos, toda la familia se reúne".',
        },
        {
          id: 7,
          question: "¿Qué le gusta hacer a Pedro?",
          options: ["a) Jugar al fútbol", "b) Leer libros", "c) Cocinar", "d) Dibujar"],
          correctAnswer: 0,
          explanation: 'El texto dice: "Pedro, de catorce, que le encanta jugar al fútbol".',
        },
        {
          id: 8,
          question: "¿Cuántos años tienen los primos gemelos?",
          options: ["a) Seis años", "b) Siete años", "c) Ocho años", "d) Nueve años"],
          correctAnswer: 2,
          explanation: 'El texto dice: "dos hijos gemelos de ocho años".',
        },
        {
          id: 9,
          question: "¿Qué hace el abuelo José con Sofía?",
          options: [
            "a) Juega al fútbol",
            "b) Le cuenta historias",
            "c) Cocina con ella",
            "d) La lleva al colegio",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "el abuelo José le cuenta historias antes de dormir la siesta".',
        },
        {
          id: 10,
          question: "¿Qué profesión tiene María?",
          options: ["a) Profesora", "b) Camarera", "c) Enfermera", "d) Doctora"],
          correctAnswer: 2,
          explanation: 'El texto dice: "María, es enfermera en el hospital".',
        },
      ],
    },
    listening: {
      title: "La boda de mi hermana",
      transcription: `Hola, me llamo Roberto y voy a contaros la historia de la boda de mi hermana Elena. Elena se casó el verano pasado con su novio Miguel. La boda fue en un pueblo pequeño de Galicia.

Elena es la mayor de tres hermanos. Yo soy el del medio y tenemos un hermano pequeño llamado David. Elena tiene treinta años, yo veintiocho y David veinticinco.

El día de la boda hizo muy buen tiempo. La ceremonia fue en la iglesia del pueblo y después hicieron una fiesta en un restaurante. Vinieron más de cien personas: familiares, amigos y compañeros de trabajo de los novios.

Mi madre lloró mucho durante la ceremonia. Mi padre, que es más serio, también tenía los ojos llorosos. Los abuelos de Elena estaban muy contentos de ver a su nieta casándose.

Yo fui el padrino de la boda. Tuve que hacer un discurso después de la cena. Estaba muy nervioso, pero todo salió bien. David tocó la guitarra y cantó una canción para los novios. Fue un momento muy emotivo.

La fiesta duró hasta las seis de la mañana. Todo el mundo bailó, comió y se divirtió mucho. Fue el día más feliz de la vida de mi hermana.`,
      questions: [
        {
          id: 1,
          question: "¿Cuántos hermanos tiene Roberto?",
          options: ["a) Uno", "b) Dos", "c) Tres", "d) Cuatro"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Dónde fue la boda?",
          options: ["a) En Madrid", "b) En Barcelona", "c) En un pueblo de Galicia", "d) En Sevilla"],
          correctAnswer: 2,
        },
        {
          id: 3,
          question: "¿Cuántos años tiene Elena?",
          options: ["a) Veinticinco", "b) Veintiocho", "c) Treinta", "d) Treinta y dos"],
          correctAnswer: 2,
        },
        {
          id: 4,
          question: "¿Quién se casó con Elena?",
          options: ["a) David", "b) Roberto", "c) Miguel", "d) José"],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "¿Qué profesión tenía Roberto en la boda?",
          options: ["a) Cantante", "b) Padrino", "c) Cocinero", "d) Fotógrafo"],
          correctAnswer: 1,
        },
        {
          id: 6,
          question: "¿Qué instrumento tocó David?",
          options: ["a) El piano", "b) La batería", "c) La guitarra", "d) El violín"],
          correctAnswer: 2,
        },
        {
          id: 7,
          question: "¿Cuántas personas vinieron a la boda?",
          options: ["a) Menos de cincuenta", "b) Más de cien", "c) Exactamente setenta", "d) Doscientas"],
          correctAnswer: 1,
        },
        {
          id: 8,
          question: "¿Hasta qué hora duró la fiesta?",
          options: [
            "a) Hasta medianoche",
            "b) Hasta las dos",
            "c) Hasta las cuatro",
            "d) Hasta las seis de la mañana",
          ],
          correctAnswer: 3,
        },
        {
          id: 9,
          question: "¿Cómo estaba el tiempo el día de la boda?",
          options: ["a) Llovió mucho", "b) Hizo muy buen tiempo", "c) Hizo frío", "d) Nevó"],
          correctAnswer: 1,
        },
        {
          id: 10,
          question: "¿Qué hizo Roberto durante la cena?",
          options: ["a) Cantó", "b) Bailó", "c) Hizo un discurso", "d) Cocinó"],
          correctAnswer: 2,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi familia",
        description:
          "Escribe sobre tu familia. Incluye: cuántos sois, qué hacéis juntos, cómo es tu casa, qué te gusta de tu familia.",
        structure: {
          intro: "Presenta a tu familia y di cuántos sois.",
          body: "Describe a cada miembro y qué hacéis juntos.",
          conclusion: "Di por qué tu familia es importante para ti.",
        },
        connectors: ["Primero", "También", "Después", "Por eso", "Finalmente"],
        wordCount: "80-120 palabras",
      },
      optionB: {
        title: "Un día especial con mi familia",
        description:
          "Escribe sobre un día especial que pasaste con tu familia. Incluye: cuándo fue, qué hicisteis, dónde fuisteis, por qué fue especial.",
        structure: {
          intro: "Di cuándo y dónde fue ese día.",
          body: "Describe las actividades que hicisteis.",
          conclusion: "Explica por qué fue un día especial.",
        },
        connectors: ["El día", "Primero", "Luego", "Por eso", "En conclusión"],
        wordCount: "80-120 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Describe a tu familia",
        description:
          "Habla sobre tu familia durante 1-2 minutos. Di quiénes son, qué hacen, cómo son físicamente y de carácter.",
        connectors: [
          "Mi familia está formada por",
          "Mi padre/madre es",
          "Nos llevamos bien porque",
          "Lo que más me gusta",
        ],
        guideQuestions: [
          "¿Cual es tu experiencia personal con este tema?",
          "¿Como afecta a tu dia a dia?",
          "¿Que opinan tus familiares o amigos?",
          "¿Que cambiarias o mejorarias?",
        ],
      },
      topic2: {
        title: "Las reuniones familiares",
        description:
          "Habla sobre las reuniones familiares en tu cultura. ¿Con qué frecuencia os reunís? ¿Qué hacéis? ¿Qué coméis?",
        connectors: ["En mi familia", "Normalmente", "Lo más importante", "Me encanta"],
        guideQuestions: [
          "¿Cuando empezaste a interesarte por esto?",
          "¿Que aspectos te resultan mas importantes?",
          "¿Como ha evolucionado con el tiempo?",
          "¿Que consejo darias a alguien en esta situacion?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero de clase sois hermanos que tenéis que organizar una fiesta sorpresa para los padres. Tenéis que decidir el lugar, la comida y quién invitar.",
      questions: [
        {
          question: "¿Dónde crees que deberíamos hacer la fiesta? ¿En casa o en un restaurante?",
          help: "Da tu opinión y explica por qué. Usa: Creo que... porque...",
          usefulPhrases: [
            "Te recomiendo...",
            "Si te gusta esto, deberias probar...",
            "Lo mejor de este sitio es...",
            "Evita ir los fines de semana porque esta lleno.",
            "Personalmente, yo prefiero...",
            "Un truco es...",
          ],
        },
        {
          question: "¿A quién deberíamos invitar? ¿Solo familia o también amigos?",
          help: "Sugiere quién invitar. Usa: Yo pienso que... / También podríamos...",
          usefulPhrases: [
            "Creo que la mejor opcion es...",
            "En mi opinion, deberias considerar...",
            "Una alternativa interesante seria...",
            "Ten en cuenta que...",
            "Yo en tu lugar...",
            "Lo importante es...",
          ],
        },
        {
          question: "¿Qué comida prepararemos? ¿Quién cocinará?",
          help: "Propón platos y quién cocina. Usa: Podemos hacer... / Yo puedo...",
          usefulPhrases: [
            "Segun mi experiencia...",
            "Algo que funciona muy bien es...",
            "Te sugiero que...",
            "No olvides que...",
            "Un consejo practico es...",
            "La clave esta en...",
          ],
        },
      ],
    },
  },
  {
    id: 2,
    level: "A2",
    theme: "La casa y los muebles",
    icon: "Home",
    vocabulary: [
      {
        word: "sala de estar",
        definition: "Habitación principal de la casa para recibir visitas",
        chinese: "客厅",
        example: "La sala deestar tiene un sofá muy cómodo.",
      },
      {
        word: "dormitorio",
        definition: "Habitación donde se duerme",
        chinese: "卧室",
        example: "Mi dormitorio tiene una cama grande.",
      },
      {
        word: "cocina",
        definition: "Lugar donde se prepara la comida",
        chinese: "厨房",
        example: "La cocina está muy limpia.",
      },
      {
        word: "baño",
        definition: "Habitación con ducha o bañera y váter",
        chinese: "浴室",
        example: "El baño tiene una ducha nueva.",
      },
      {
        word: "balcón",
        definition: "Espacio exterior de un piso, con barandilla",
        chinese: "阳台",
        example: "El balcón tiene muchas plantas.",
      },
      {
        word: "armario",
        definition: "Mueble para guardar ropa",
        chinese: "衣柜",
        example: "Mi armario está lleno de camisetas.",
      },
      {
        word: "estantería",
        definition: "Mueble con baldas para poner libros u objetos",
        chinese: "书架",
        example: "La estantería tiene muchos libros.",
      },
      {
        word: "lámpara",
        definition: "Objeto que da luz en una habitación",
        chinese: "灯",
        example: "La lámpara del techo es muy bonita.",
      },
      {
        word: "alfombra",
        definition: "Tapiz para el suelo",
        chinese: "地毯",
        example: "La alfombra de la sala es roja.",
      },
      {
        word: "cortinas",
        definition: "Telas que cubren las ventanas",
        chinese: "窗帘",
        example: "Las cortinas son de color azul.",
      },
      {
        word: "vecino",
        definition: "Persona que vive cerca",
        chinese: "邻居",
        example: "Mi vecino es muy simpático.",
      },
    ],
    reading: {
      textType: "descriptivo",
      title: "Mi piso nuevo",
      text: `El mes pasado me mudé a un piso nuevo en el centro de Valencia. Mi piso está en un edificio antiguo pero bonito, en la tercera planta. Tiene ascensor, lo cual es muy práctico porque no me gusta subir escaleras con las bolsas de la compra.

El piso no es muy grande, pero es acogedor. Tiene dos dormitorios, un baño, una cocina y una sala de estar. La sala de estar es mi habitación favorita porque tiene mucha luz natural gracias a dos ventanas grandes. También tiene un balcón pequeño donde pongo mis plantas y tomo el café por las mañanas.

Los muebles son nuevos. En la sala de estar hay un sofá azul, una mesa de centro de madera y una estantería blanca donde guardo mis libros y fotos. La televisión está en la pared, frente al sofá. La lámpara del techo es moderna y da una luz cálida.

El dormitorio principal tiene una cama doble, dos mesillas de noche y un armario grande de color blanco. Las cortinas son grises y hay una alfombra suave al lado de la cama. El segundo dormitorio es más pequeño y lo uso como despacho para estudiar español.

La cocina es mi segundo lugar favorito. Tiene todos los electrodomésticos nuevos: nevera, lavavajillas, horno y microondas. Hay muchos armarios para guardar la comida. El baño es pequeño pero funcional, con ducha, lavabo y espejo grande.

El mejor de todo son los vecinos. La señora del segundo pila es muy amable y siempre me saluda. El edificio está cerca de un supermercado, una farmacia y el metro. ¡Estoy muy feliz con mi nuevo hogar!`,
      questions: [
        {
          id: 1,
          question: "¿En qué planta está el piso?",
          options: ["a) Primera planta", "b) Segunda planta", "c) Tercera planta", "d) Cuarta planta"],
          correctAnswer: 2,
          explanation: 'El texto dice: "en la tercera planta".',
        },
        {
          id: 2,
          question: "¿Cuántos dormitorios tiene el piso?",
          options: ["a) Uno", "b) Dos", "c) Tres", "d) Cuatro"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Tiene dos dormitorios".',
        },
        {
          id: 3,
          question: "¿Cuál es la habitación favorita del narrador?",
          options: ["a) La cocina", "b) El baño", "c) La sala de estar", "d) El dormitorio"],
          correctAnswer: 2,
          explanation: 'El texto dice: "La sala de estar es mi habitación favorita".',
        },
        {
          id: 4,
          question: "¿De qué color es el sofá?",
          options: ["a) Rojo", "b) Verde", "c) Azul", "d) Blanco"],
          correctAnswer: 2,
          explanation: 'El texto dice: "un sofá azul".',
        },
        {
          id: 5,
          question: "¿Para qué usa el segundo dormitorio?",
          options: [
            "a) Para invitados",
            "b) Como despacho para estudiar",
            "c) Como trastero",
            "d) Para guardar ropa",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "lo uso como despacho para estudiar español".',
        },
        {
          id: 6,
          question: "¿Qué tiene el balcón?",
          options: ["a) Una mesa grande", "b) Muchas plantas", "c) Una hamaca", "d) Una barbacoa"],
          correctAnswer: 1,
          explanation: 'El texto dice: "un balcón pequeño donde pongo mis plantas".',
        },
        {
          id: 7,
          question: "¿De qué color son las cortinas?",
          options: ["a) Azules", "b) Rojas", "c) Grises", "d) Blancas"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Las cortinas son grises".',
        },
        {
          id: 8,
          question: "¿Qué hay al lado de la cama?",
          options: ["a) Una mesilla", "b) Una silla", "c) Una alfombra suave", "d) Una planta"],
          correctAnswer: 2,
          explanation: 'El texto dice: "hay una alfombra suave al lado de la cama".',
        },
        {
          id: 9,
          question: "¿Qué tiene cerca el edificio?",
          options: [
            "a) Un parque",
            "b) Un supermercado, farmacia y metro",
            "c) Una escuela",
            "d) Un hospital",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "cerca de un supermercado, una farmacia y el metro".',
        },
        {
          id: 10,
          question: "¿Por qué le gusta el ascensor?",
          options: [
            "a) Es moderno",
            "b) No le gusta subir escaleras con bolsas",
            "c) Es rápido",
            "d) Es grande",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "muy práctico porque no me gusta subir escaleras con las bolsas".',
        },
      ],
    },
    listening: {
      title: "Buscando piso",
      transcription: `Hola, soy Laura. Llevo dos semanas buscando piso en Madrid y es muy difícil. Ayer fui a ver tres pisos y os cuento cómo fueron las visitas.

El primer piso estaba en el barrio de Malasaña. Era un piso pequeño de un dormitorio, pero estaba muy bien reformado. La cocina era moderna y el baño tenía ducha nueva. El problema es que costaba novecientos euros al mes y era muy pequeño: solo treinta metros cuadrados.

El segundo piso estaba en Chamberí. Era más grande, con dos dormitorios y un balcón enorme. Me encantó la sala de estar porque tenía mucha luz y las ventanas daban a un parque. Pero el piso estaba en un cuarto piso sin ascensor y el edificio era muy antiguo. El precio era mil cien euros.

El tercer piso estaba cerca de la estación de Atocha. Tenía tres dormitorios, dos baños y una terraza. Era perfecto para compartir con amigos. Pero la zona era muy ruidosa por el tráfico y el precio era mil trescientos euros, demasiado caro para mí sola.

Al final, creo que me quedaré con el primero aunque sea pequeño. Me gusta el barrio y está cerca de mi trabajo. Solo necesito encontrar muebles pequeños que quepan bien.`,
      questions: [
        {
          id: 1,
          question: "¿Cuántos pisos visitó Laura?",
          options: ["a) Uno", "b) Dos", "c) Tres", "d) Cuatro"],
          correctAnswer: 2,
        },
        {
          id: 2,
          question: "¿Dónde estaba el primer piso?",
          options: ["a) En Chamberí", "b) En Malasaña", "c) Cerca de Atocha", "d) En Salamanca"],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "¿Cuánto costaba el primer piso?",
          options: ["a) 700 euros", "b) 800 euros", "c) 900 euros", "d) 1000 euros"],
          correctAnswer: 2,
        },
        {
          id: 4,
          question: "¿En qué piso estaba el segundo piso?",
          options: ["a) Primero", "b) Segundo", "c) Tercero", "d) Cuarto"],
          correctAnswer: 3,
        },
        {
          id: 5,
          question: "¿Por qué no le gustó el segundo piso del todo?",
          options: ["a) Era muy caro", "b) No tenía ascensor", "c) Era muy pequeño", "d) Estaba sucio"],
          correctAnswer: 1,
        },
        {
          id: 6,
          question: "¿Cuántos dormitorios tenía el tercer piso?",
          options: ["a) Uno", "b) Dos", "c) Tres", "d) Cuatro"],
          correctAnswer: 2,
        },
        {
          id: 7,
          question: "¿Cuál es el problema del tercer piso?",
          options: [
            "a) Está muy lejos",
            "b) Es muy ruidoso y caro",
            "c) Es muy pequeño",
            "d) No tiene terraza",
          ],
          correctAnswer: 1,
        },
        {
          id: 8,
          question: "¿Qué piso va a elegir Laura probablemente?",
          options: ["a) El primero", "b) El segundo", "c) El tercero", "d) Ninguno"],
          correctAnswer: 0,
        },
        {
          id: 9,
          question: "¿Por qué le gusta el primer piso?",
          options: ["a) Es grande", "b) Es barato y le gusta el barrio", "c) Tiene terraza", "d) Es moderno"],
          correctAnswer: 1,
        },
        {
          id: 10,
          question: "¿A qué da el balcón del segundo piso?",
          options: ["a) A la calle", "b) A un parque", "c) A la plaza", "d) A un edificio"],
          correctAnswer: 1,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi casa ideal",
        description:
          "Describe tu casa ideal. Incluye: dónde está, cuántas habitaciones tiene, cómo es, qué muebles tiene.",
        structure: {
          intro: "Di dónde estaría tu casa ideal.",
          body: "Describe las habitaciones y muebles.",
          conclusion: "Di por qué te gustaría vivir allí.",
        },
        connectors: [
          "Mi casa ideal estaría en",
          "Tendría",
          "En el dormitorio/salón",
          "También",
          "Me encantaría",
        ],
        wordCount: "80-120 palabras",
      },
      optionB: {
        title: "Un día en mi casa",
        description:
          "Escribe sobre un día normal en tu casa. Incluye: qué haces en cada habitación, con quién estás, qué te gusta de tu casa.",
        structure: {
          intro: "Presenta tu casa y la gente que vive contigo.",
          body: "Describe las actividades de un día normal.",
          conclusion: "Di qué es lo mejor de tu casa.",
        },
        connectors: ["Vivo en", "Por la mañana", "Después", "Por la noche", "Lo mejor de mi casa es"],
        wordCount: "80-120 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Describe tu casa o piso",
        description:
          "Habla sobre tu casa durante 1-2 minutos. Di dónde está, cuántas habitaciones tiene, cómo es cada habitación y qué muebles tiene.",
        connectors: ["Vivo en", "Mi casa tiene", "La habitación más grande es", "Me gusta mucho"],
        guideQuestions: [
          "¿Por que crees que este tema es relevante?",
          "¿Has tenido alguna experiencia relacionada?",
          "¿Como influye en la sociedad actual?",
          "¿Que futuro le ves a este tema?",
        ],
      },
      topic2: {
        title: "Tu habitación favorita",
        description:
          "Habla sobre tu habitación favorita de la casa. Describe cómo es, qué hay en ella y por qué te gusta.",
        connectors: [
          "Mi habitación favorita es",
          "En esta habitación hay",
          "Lo que más me gusta es",
          "Pasó mucho tiempo allí porque",
        ],
        guideQuestions: [
          "¿Cual es tu relacion personal con esto?",
          "¿Que ventajas e inconvenientes ves?",
          "¿Como lo viven las personas de tu entorno?",
          "¿Crees que va a cambiar en el futuro?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero queréis compartir piso. Tenéis que decidir qué tipo de piso buscáis, en qué barrio y cómo vais a repartir los gastos.",
      questions: [
        {
          question: "¿Qué tipo de piso preferís? ¿Grande o pequeño? ¿Con cuántas habitaciones?",
          help: "Da tu preferencia. Usa: Prefiero... porque... / Me gustaría...",
          usefulPhrases: [
            "Desde mi punto de vista...",
            "Me parece que lo mejor seria...",
            "Una buena idea podria ser...",
            "Recuerda que...",
            "Si fuera tu, yo...",
            "Lo fundamental es...",
          ],
        },
        {
          question: "¿En qué zona de la ciudad queréis vivir? ¿Por qué?",
          help: "Sugiere una zona. Usa: Creo que deberíamos... / Es mejor... porque...",
          usefulPhrases: [
            "Basandome en mi experiencia...",
            "Lo que a mi me funciona es...",
            "Prueba a...",
            "No te olvides de...",
            "Un tip muy util es...",
            "El secreto esta en...",
          ],
        },
        {
          question: "¿Cómo vais a repartir las tareas de la casa?",
          help: "Propón un reparto. Usa: Yo puedo... / ¿Qué te parece si...?",
          usefulPhrases: [
            "A mi modo de ver...",
            "Considero que deberias...",
            "Podrias intentar...",
            "Es importante recordar...",
            "Yo te aconsejaria que...",
            "Lo esencial es...",
          ],
        },
      ],
    },
  },
  {
    id: 3,
    level: "A2",
    theme: "La comida y restaurantes",
    icon: "UtensilsCrossed",
    vocabulary: [
      {
        word: "desayuno",
        definition: "Primera comida del día, por la mañana",
        chinese: "早餐",
        example: "El desayuno es la comida más importante.",
      },
      {
        word: "almuerzo",
        definition: "Comida del mediodía",
        chinese: "午餐",
        example: "El almuerzo es a las dos en España.",
      },
      {
        word: "cena",
        definition: "Última comida del día, por la noche",
        chinese: "晚餐",
        example: "La cena es ligera en mi casa.",
      },
      {
        word: "entrante",
        definition: "Primer plato de una comida",
        chinese: "前菜",
        example: "De entrante tomamos gazpacho.",
      },
      {
        word: "postre",
        definition: "Último plato dulce de una comida",
        chinese: "甜点",
        example: "De postre quiero flan.",
      },
      {
        word: "camarero",
        definition: "Persona que sirve en un restaurante",
        chinese: "服务员",
        example: "El camarero nos trajo el menú.",
      },
      {
        word: "cuenta",
        definition: "Documento con el precio a pagar en un restaurante",
        chinese: "账单",
        example: "¿Nos trae la cuenta, por favor?",
      },
      {
        word: "propina",
        definition: "Dinero extra que se da al camarero por el servicio",
        chinese: "小费",
        example: "En España la propina no es obligatoria.",
      },
      {
        word: "reserva",
        definition: "Acuerdo para tener una mesa preparada",
        chinese: "预订",
        example: "Tengo una reserva para cuatro personas.",
      },
      {
        word: "menú",
        definition: "Lista de platos de un restaurante",
        chinese: "菜单",
        example: "El menú del día cuesta doce euros.",
      },
      {
        word: "delicioso",
        definition: "Que tiene muy buen sabor",
        chinese: "美味的",
        example: "Esta tortilla está deliciosa.",
      },
    ],
    reading: {
      textType: "descriptivo",
      title: "Una cena especial",
      text: `El sábado pasado, mis amigos y yo fuimos a cenar a un restaurante español nuevo que abrió cerca de mi casa. Se llama "El Rincón de María" y tiene muy buenas opiniones en internet.

Llegamos a las nueve de la noche. El restaurante era acogedor, con paredes de color amarillo, mesas de madera y fotos antiguas de España. Había flores frescas en cada mesa y una música suave de guitarra española. El camarero, un chico joven muy simpático, nos llevó a nuestra mesa junto a la ventana.

Primero pedimos las bebidas: agua, cerveza y sangría. De entrantes, tomamos jamón ibérico, tortilla española y croquetas caseras. Todo estaba delicioso. El jamón se deshacía en la boca y las croquetas eran cremosas.

Para el plato principal, yo pedí paella de mariscos. Mis amigos pidieron pulpo a la gallega y costillas con salsa barbacoa. La paella era enorme, con gambas, mejillones y calamares. Estaba tan buena que comí todo.

De postre, compartimos churros con chocolate y tarta de queso. Los churros estaban calientes y crujientes. Pedimos la cuenta, que fue de veinticinco euros por persona. Dejamos una propina de cinco euros porque el servicio fue excelente.

Salimos del restaurante a medianoche, contentos y con el estómago lleno. Fue una noche inolvidable.`,
      questions: [
        {
          id: 1,
          question: "¿Cómo se llama el restaurante?",
          options: [
            "a) La Casa de María",
            "b) El Rincón de María",
            "c) María Restaurant",
            "d) El Restaurante de María",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Se llama El Rincón de María".',
        },
        {
          id: 2,
          question: "¿A qué hora llegaron?",
          options: ["a) A las ocho", "b) A las nueve", "c) A las diez", "d) A las siete"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Llegamos a las nueve de la noche".',
        },
        {
          id: 3,
          question: "¿Qué color tenían las paredes?",
          options: ["a) Rojo", "b) Azul", "c) Amarillo", "d) Blanco"],
          correctAnswer: 2,
          explanation: 'El texto dice: "paredes de color amarillo".',
        },
        {
          id: 4,
          question: "¿Qué tomaron de entrante?",
          options: ["a) Ensalada", "b) Jamón ibérico, tortilla y croquetas", "c) Sopa", "d) Pan"],
          correctAnswer: 1,
          explanation: 'El texto dice: "jamón ibérico, tortilla española y croquetas caseras".',
        },
        {
          id: 5,
          question: "¿Qué pidió el narrador de plato principal?",
          options: ["a) Pulpo", "b) Costillas", "c) Paella de mariscos", "d) Pollo"],
          correctAnswer: 2,
          explanation: 'El texto dice: "yo pedí paella de mariscos".',
        },
        {
          id: 6,
          question: "¿Cuánto costó la cena por persona?",
          options: ["a) 15 euros", "b) 20 euros", "c) 25 euros", "d) 30 euros"],
          correctAnswer: 2,
          explanation: 'El texto dice: "veinticinco euros por persona".',
        },
        {
          id: 7,
          question: "¿Qué dejaron de propina?",
          options: ["a) 2 euros", "b) 5 euros", "c) 10 euros", "d) Nada"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Dejamos una propina de cinco euros".',
        },
        {
          id: 8,
          question: "¿Qué postre tomaron?",
          options: ["a) Helado", "b) Fruta", "c) Churros con chocolate y tarta de queso", "d) Flan"],
          correctAnswer: 2,
          explanation: 'El texto menciona "churros con chocolate y tarta de queso".',
        },
        {
          id: 9,
          question: "¿Por qué dejaron propina?",
          options: [
            "a) Era obligatoria",
            "b) El servicio fue excelente",
            "c) Era muy cara la comida",
            "d) El camarero les pidió",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "porque el servicio fue excelente".',
        },
        {
          id: 10,
          question: "¿A qué hora salieron del restaurante?",
          options: ["a) A las diez", "b) A las once", "c) A medianoche", "d) A la una"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Salimos del restaurante a medianoche".',
        },
      ],
    },
    listening: {
      title: "En el supermercado",
      transcription: `Buenos días, soy Manuel y trabajo en el supermercado "La Plaza" desde hace cinco años. Hoy voy a contaros un día normal en mi trabajo.

Llego a las ocho de la mañana. Primero reviso las frutas y verduras: manzanas, plátanos, tomates, lechugas... Si alguna está mala, la quitamos. Después, pongo los productos nuevos en los estantes.

A las diez, abre el supermercado. Los primeros clientes son personas mayores que vienen a comprar el pan y el periódico. A mediodía, las madres y padres vienen a hacer la compra después de llevar a los niños al colegio.

Lo más complicado es la sección de pescado. Mucha gente pregunta cómo cocinar el pescado fresco. Yo siempre les doy consejos: "El salmón es bueno a la plancha" o "La merluza se puede hacer al horno".

Por la tarde, entre las cinco y las ocho, es cuando hay más gente. Todo el mundo viene después del trabajo. Hay colas largas en las cajas. Mi compañera Laura trabaja en la caja y siempre está sonriendo.

A las nueve cerramos. Recogemos todo, limpiamos y vamos a casa. Es un trabajo duro pero me gusta porque hablo con mucha gente.`,
      questions: [
        {
          id: 1,
          question: "¿Dónde trabaja Manuel?",
          options: ["a) En un restaurante", "b) En un supermercado", "c) En una oficina", "d) En un colegio"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿A qué hora llega Manuel al trabajo?",
          options: ["a) A las siete", "b) A las ocho", "c) A las nueve", "d) A las diez"],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "¿Qué revisa primero?",
          options: ["a) El pescado", "b) Las frutas y verduras", "c) El pan", "d) La leche"],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "¿Quiénes son los primeros clientes?",
          options: ["a) Los niños", "b) Las madres", "c) Personas mayores", "d) Los trabajadores"],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "¿Qué sección es la más complicada?",
          options: ["a) La frutería", "b) La sección de pescado", "c) La panadería", "d) La carnicería"],
          correctAnswer: 1,
        },
        {
          id: 6,
          question: "¿Cuándo hay más gente?",
          options: [
            "a) Por la mañana",
            "b) A mediodía",
            "c) Entre las cinco y las ocho de la tarde",
            "d) A las nueve",
          ],
          correctAnswer: 2,
        },
        {
          id: 7,
          question: "¿Quién trabaja en la caja?",
          options: ["a) Manuel", "b) Laura", "c) María", "d) Ana"],
          correctAnswer: 1,
        },
        {
          id: 8,
          question: "¿A qué hora cierra el supermercado?",
          options: ["a) A las ocho", "b) A las nueve", "c) A las diez", "d) A las once"],
          correctAnswer: 1,
        },
        {
          id: 9,
          question: "¿Cuánto tiempo lleva Manuel trabajando allí?",
          options: ["a) Dos años", "b) Tres años", "c) Cuatro años", "d) Cinco años"],
          correctAnswer: 3,
        },
        {
          id: 10,
          question: "¿Qué consejo da Manuel sobre el salmón?",
          options: [
            "a) Hacerlo al horno",
            "b) Hacerlo a la plancha",
            "c) Hacerlo frito",
            "d) Hacerlo hervido",
          ],
          correctAnswer: 1,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi comida favorita",
        description:
          "Escribe sobre tu comida favorita. Incluye: qué plato es, cómo se hace, cuándo la comes, por qué te gusta.",
        structure: {
          intro: "Di cuál es tu comida favorita.",
          body: "Describe los ingredientes y cómo se prepara.",
          conclusion: "Explica por qué es tu favorita y cuándo la comes.",
        },
        connectors: [
          "Mi comida favorita es",
          "Para prepararla necesitas",
          "Primero",
          "Después",
          "Me gusta porque",
        ],
        wordCount: "80-120 palabras",
      },
      optionB: {
        title: "Una experiencia en un restaurante",
        description:
          "Escribe sobre una vez que fuiste a un restaurante. Incluye: cuándo fue, dónde, qué pediste, si te gustó.",
        structure: {
          intro: "Di cuándo y dónde fuiste.",
          body: "Describe el restaurante y la comida.",
          conclusion: "Di si te gustó y si volverías.",
        },
        connectors: ["El", "Fuimos a", "El restaurante era", "Pedimos", "En conclusión"],
        wordCount: "80-120 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Tu comida favorita",
        description:
          "Habla sobre tu comida o plato favorito durante 1-2 minutos. Di qué es, de dónde es, qué ingredientes lleva y por qué te gusta.",
        connectors: [
          "Mi plato favorito es",
          "Es un plato de",
          "Lleva",
          "Lo que más me gusta es",
          "Normalmente lo como",
        ],
        guideQuestions: [
          "¿Como te enteraste de este tema por primera vez?",
          "¿Que es lo que mas te llama la atencion?",
          "¿Has vivido alguna situacion parecida?",
          "¿Que soluciones propondrias?",
        ],
      },
      topic2: {
        title: "Comer en casa vs. comer fuera",
        description:
          "Habla sobre las ventajas de comer en casa y de comer fuera. ¿Qué prefieres tú? ¿Por qué?",
        connectors: ["Creo que", "Por un lado", "Por otro lado", "Personalmente prefiero", "Por eso"],
        guideQuestions: [
          "¿Que papel juega esto en tu vida cotidiana?",
          "¿Crees que todo el mundo piensa igual?",
          "¿Que recuerdos tienes relacionados?",
          "¿Como te gustaria que fuera?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero vais a preparar una cena para unos amigos. Tenéis que decidir el menú, quién cocina cada cosa y dónde vais a comprar los ingredientes.",
      questions: [
        {
          question: "¿Qué tipo de comida prepararemos? ¿Española, china, italiana?",
          help: "Sugiere un tipo de cocina. Usa: Yo propongo... / ¿Qué te parece...?",
          usefulPhrases: [
            "En mi caso particular...",
            "Lo que mejor resultado me ha dado es...",
            "Intenta...",
            "Ten presente que...",
            "Un consejo que doy siempre es...",
            "El truco consiste en...",
          ],
        },
        {
          question: "¿Quién se encarga de cada plato?",
          help: "Reparte las tareas. Usa: Yo puedo hacer... / Tú puedes...",
          usefulPhrases: [
            "Pienso que lo mas acertado es...",
            "Te animo a que pruebes...",
            "Otra opcion interesante es...",
            "No subestimes...",
            "Mi recomendacion seria...",
            "Lo crucial es...",
          ],
        },
        {
          question: "¿Dónde compramos los ingredientes?",
          help: "Sugiere dónde comprar. Usa: Podemos ir a... / Es mejor comprar en...",
          usefulPhrases: [
            "Por mi experiencia...",
            "Algo que nunca falla es...",
            "Quizas deberias...",
            "Es fundamental que...",
            "Una estrategia efectiva es...",
            "La cuestion es...",
          ],
        },
      ],
    },
  },
  {
    id: 4,
    level: "A2",
    theme: "La ropa y las compras",
    icon: "Shirt",
    vocabulary: [
      {
        word: "camiseta",
        definition: "Prenda de vestir de manga corta",
        chinese: "T恤",
        example: "Voy a comprar una camiseta nueva.",
      },
      {
        word: "pantalón",
        definition: "Prenda que cubre las piernas",
        chinese: "裤子",
        example: "Los pantalones azules me quedan bien.",
      },
      {
        word: "chaqueta",
        definition: "Prenda de abrigo para el torso",
        chinese: "夹克",
        example: "Lleva la chaqueta porque hace frío.",
      },
      {
        word: "zapatos",
        definition: "Calzado para los pies",
        chinese: "鞋子",
        example: "Necesito zapatos nuevos para el trabajo.",
      },
      {
        word: "talla",
        definition: "Tamaño de una prenda de ropa",
        chinese: "尺码",
        example: "¿Qué talla usa usted?",
      },
      {
        word: "probador",
        definition: "Lugar pequeño en una tienda para probarse ropa",
        chinese: "试衣间",
        example: "Los probadores están al fondo.",
      },
      {
        word: "rebaja",
        definition: "Descuento en el precio original",
        chinese: "打折",
        example: "Las rebajas de verano empiezan en julio.",
      },
      {
        word: "devolver",
        definition: "Llevar algo de vuelta a la tienda porque no te gusta",
        chinese: "退货",
        example: "Quiero devolver esta camisa, es muy grande.",
      },
      {
        word: "cambiar",
        definition: "Dar una cosa para recibir otra diferente",
        chinese: "换",
        example: "¿Puedo cambiar estos zapatos por una talla más grande?",
      },
      {
        word: "dependiente/a",
        definition: "Persona que trabaja vendiendo en una tienda",
        chinese: "店员",
        example: "El dependiente me ayudó a encontrar mi talla.",
      },
      {
        word: "gratis",
        definition: "Que no cuesta dinero",
        chinese: "免费",
        example: "El envío es gratis si compras más de 50 euros.",
      },
    ],
    reading: {
      textType: "narrativo",
      title: "De compras en Madrid",
      text: `Ana es una estudiante china que lleva seis meses viviendo en Madrid. El sábado pasado, necesitaba comprar ropa nueva para una entrevista de trabajo. Su amiga española, Carmen, la acompañó.

Primero fueron a una gran tienda de ropa en la Gran Vía. Ana buscaba un vestido elegante y unos zapatos cómodos. El dependiente les dijo que la sección de vestidos estaba en la segunda planta. Subieron en el ascensor y empezaron a mirar.

Ana se probó tres vestidos en el probador. El primero era rojo y le quedaba muy bien, pero era demasiado caro: ochenta euros. El segundo era azul marino, más barato, pero no le gustaba el cuello. El tercero era negro, elegante y estaba de rebaja: solo cuarenta euros. ¡Ese fue el elegido!

Después, fueron a la sección de zapatos. Ana necesitaba zapatos de tacón, pero no muy altos porque no está acostumbrada. La dependiente le recomendó unos zapatos negros de tacón medio. Se los probó y caminó un poco. Eran cómodos y combinaban con el vestido. Costaban treinta y cinco euros.

En la caja, Carmen le preguntó a Ana si tenía la tarjeta de fidelidad. Ana no la tenía, así que la dependiente le hizo una rápidamente. Con la tarjeta, tuvo un diez por ciento de descuento. En total, pagó sesenta y siete euros y cincuenta céntimos.

Salieron de la tienda contentas. Ana estaba muy feliz con sus compras. "Ahora solo necesito practicar caminar con tacones", dijo riendo.`,
      questions: [
        {
          id: 1,
          question: "¿Para qué necesitaba Ana ropa nueva?",
          options: [
            "a) Para una fiesta",
            "b) Para una entrevista de trabajo",
            "c) Para una boda",
            "d) Para el colegio",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "para una entrevista de trabajo".',
        },
        {
          id: 2,
          question: "¿Quién acompañó a Ana?",
          options: ["a) Su madre", "b) Su hermana", "c) Su amiga Carmen", "d) Su compañera de piso"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Su amiga española, Carmen, la acompañó".',
        },
        {
          id: 3,
          question: "¿Dónde fueron de compras?",
          options: ["a) A Barcelona", "b) A la Gran Vía en Madrid", "c) A Sevilla", "d) A Valencia"],
          correctAnswer: 1,
          explanation: 'El texto dice: "en la Gran Vía".',
        },
        {
          id: 4,
          question: "¿Cuánto costaba el vestido rojo?",
          options: ["a) Cuarenta euros", "b) Sesenta euros", "c) Ochenta euros", "d) Treinta euros"],
          correctAnswer: 2,
          explanation: 'El texto dice: "ochenta euros".',
        },
        {
          id: 5,
          question: "¿Qué color era el vestido que compró?",
          options: ["a) Rojo", "b) Azul marino", "c) Negro", "d) Blanco"],
          correctAnswer: 2,
          explanation:
            'El texto dice: "El tercero era negro, elegante y estaba de rebaja... ¡Ese fue el elegido!"',
        },
        {
          id: 6,
          question: "¿Cuánto costaban los zapatos?",
          options: [
            "a) Veinticinco euros",
            "b) Treinta euros",
            "c) Treinta y cinco euros",
            "d) Cuarenta euros",
          ],
          correctAnswer: 2,
          explanation: 'El texto dice: "Costaban treinta y cinco euros".',
        },
        {
          id: 7,
          question: "¿Por qué tuvo descuento Ana?",
          options: [
            "a) Porque era estudiante",
            "b) Porque tenía la tarjeta de fidelidad",
            "c) Porque era su cumpleaños",
            "d) Porque llevaba dos prendas",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Con la tarjeta, tuvo un diez por ciento de descuento".',
        },
        {
          id: 8,
          question: "¿Cuánto pagó en total?",
          options: [
            "a) Sesenta euros",
            "b) Sesenta y siete euros y cincuenta céntimos",
            "c) Setenta euros",
            "d) Setenta y cinco euros",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "pagó sesenta y siete euros y cincuenta céntimos".',
        },
        {
          id: 9,
          question: "¿Qué tipo de zapatos buscaba Ana?",
          options: ["a) De tacón alto", "b) De tacón medio", "c) Planos", "d) De deporte"],
          correctAnswer: 1,
          explanation:
            'El texto dice que la dependiente le recomendó "unos zapatos negros de tacón medio" y esos fueron los que compró.',
        },
        {
          id: 10,
          question: "¿Cuánto tiempo lleva Ana en Madrid?",
          options: ["a) Tres meses", "b) Cuatro meses", "c) Seis meses", "d) Un año"],
          correctAnswer: 2,
          explanation: 'El texto dice: "lleva seis meses viviendo en Madrid".',
        },
      ],
    },
    listening: {
      title: "Las rebajas de enero",
      transcription: `Hola, soy Marta y trabajo en una tienda de ropa en el centro de Barcelona. Hoy os voy a contar cómo son las rebajas de enero.

Las rebajas empiezan el dos de enero. Ese día hay tanta gente que tenemos que abrir una hora antes, a las nueve en vez de a las diez. La gente hace cola desde las ocho de la mañana esperando entrar.

El primer día es el más caótico. Todo el mundo corre a buscar las mejores ofertas. Los artículos con más descuento, el setenta por ciento, se acaban en dos horas. Yo trabajo en la sección de abrigos y chaquetas, y el año pasado vendimos cincuenta abrigos en una sola mañana.

Muchos clientes vienen con la estrategia de comprar regalos para el año siguiente. Compran jerseys en rebajas para regalar el próximo Navidad. Es inteligente porque ahorran mucho dinero.

También tenemos muchas devoluciones de Navidad. La gente que recibió ropa que no le gusta o que no le queda bien viene a cambiarla o devolverla. A veces las colas de devolución son más largas que las de compra.

Las rebajas duran hasta finales de febrero. Al final, los productos que quedan tienen descuentos de hasta el ochenta por ciento. Es el mejor momento para encontrar verdaderas gangas.

Yo no compro durante las rebajas porque trabajo todo el día y estoy demasiado cansada. Prefiero ir una semana después, cuando hay menos gente y todavía quedan cosas buenas.`,
      questions: [
        {
          id: 1,
          question: "¿Cuándo empiezan las rebajas?",
          options: [
            "a) El uno de enero",
            "b) El dos de enero",
            "c) El seis de enero",
            "d) El uno de febrero",
          ],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿A qué hora abren el primer día?",
          options: ["a) A las ocho", "b) A las nueve", "c) A las diez", "d) A las once"],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "¿En qué sección trabaja Marta?",
          options: ["a) En zapatos", "b) En abrigos y chaquetas", "c) En pantalones", "d) En camisetas"],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "¿Cuántos abrigos vendieron el año pasado en una mañana?",
          options: ["a) Treinta", "b) Cuarenta", "c) Cincuenta", "d) Sesenta"],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "¿Qué compra la gente para regalar el próximo año?",
          options: ["a) Abrigos", "b) Zapatos", "c) Jerseys", "d) Camisetas"],
          correctAnswer: 2,
        },
        {
          id: 6,
          question: "¿Cuánto duran las rebajas?",
          options: [
            "a) Hasta finales de enero",
            "b) Hasta mediados de febrero",
            "c) Hasta finales de febrero",
            "d) Hasta marzo",
          ],
          correctAnswer: 2,
        },
        {
          id: 7,
          question: "¿Qué pasa con los productos que quedan al final?",
          options: ["a) Se tiran", "b) Se guardan", "c) Tienen descuentos de hasta el 80%", "d) Se donan"],
          correctAnswer: 2,
        },
        {
          id: 8,
          question: "¿Por qué Marta no compra durante las rebajas?",
          options: [
            "a) No le gusta",
            "b) Trabaja y está cansada",
            "c) No tiene dinero",
            "d) No necesita nada",
          ],
          correctAnswer: 1,
        },
        {
          id: 9,
          question: "¿Cuándo prefiere ir Marta de compras?",
          options: ["a) El primer día", "b) Una semana después", "c) El último día", "d) Nunca va"],
          correctAnswer: 1,
        },
        {
          id: 10,
          question: "¿Cuál es el descuento máximo el primer día?",
          options: ["a) El 50%", "b) El 60%", "c) El 70%", "d) El 80%"],
          correctAnswer: 2,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi ropa favorita",
        description:
          "Escribe sobre tu prenda de ropa favorita. Incluye: qué es, de qué color es, cuándo la llevas, por qué te gusta.",
        structure: {
          intro: "Di cuál es tu prenda favorita.",
          body: "Descríbela y di cuándo la usas.",
          conclusion: "Explica por qué es especial para ti.",
        },
        connectors: [
          "Mi prenda favorita es",
          "Es de color",
          "La uso cuando",
          "Me gusta porque",
          "En conclusión",
        ],
        wordCount: "80-120 palabras",
      },
      optionB: {
        title: "Un día de compras",
        description:
          "Escribe sobre un día que fuiste de compras. Incluye: dónde fuiste, qué compraste, si fue caro o barato.",
        structure: {
          intro: "Di cuándo y dónde fuiste de compras.",
          body: "Describe qué buscabas y qué compraste.",
          conclusion: "Di si fue una buena experiencia.",
        },
        connectors: ["El", "Fui a", "Buscaba", "Al final", "Fue"],
        wordCount: "80-120 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Describe tu ropa de hoy",
        description:
          "Habla sobre la ropa que llevas hoy durante 1-2 minutos. Di qué prendas llevas, de qué colores son, dónde las compraste y si te gustan.",
        connectors: ["Hoy llevo", "Es/Son de color", "Lo/La compré en", "Me gusta porque", "Creo que"],
        guideQuestions: [
          "¿Desde cuando conoces este tema?",
          "¿Que aspectos positivos y negativos tiene?",
          "¿Como afecta a las nuevas generaciones?",
          "¿Que importancia le das?",
        ],
      },
      topic2: {
        title: "Ir de compras",
        description:
          "Habla sobre ir de compras. ¿Te gusta o no? ¿Con quién vas? ¿Prefieres tiendas físicas o online?",
        connectors: ["Sobre ir de compras", "Personalmente", "Cuando voy", "Prefiero", "Porque"],
        guideQuestions: [
          "¿Que significa esto para ti personalmente?",
          "¿Has tenido que adaptarte por este motivo?",
          "¿Que piensan tus amigos al respecto?",
          "¿Crees que la situacion mejorara?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero trabajáis en una tienda de ropa. Un cliente necesita ayuda para encontrar un regalo. Tenéis que aconsejarle.",
      questions: [
        {
          question: "¿Qué tipo de ropa recomiendas para un regalo? ¿Por qué?",
          help: "Recomienda algo. Usa: Yo recomendaría... porque...",
          usefulPhrases: [
            "Sinceramente, yo creo que...",
            "Te propongo que...",
            "Valora la posibilidad de...",
            "No ignores que...",
            "Lo que funciona de verdad es...",
            "El objetivo principal es...",
          ],
        },
        {
          question: "¿Qué talla deberíamos sugerir si no sabemos la talla exacta?",
          help: "Sugiere una solución. Usa: Podemos... / Es mejor...",
          usefulPhrases: [
            "Si me preguntas a mi...",
            "Una solucion practica es...",
            "Piensa en la opcion de...",
            "Recuerda siempre que...",
            "El mejor consejo que puedo darte es...",
            "El punto clave es...",
          ],
        },
        {
          question: "¿El cliente quiere devolver un regalo que no le gusta. ¿Qué le dices?",
          help: "Explica la política. Usa: Puede... / Tiene que...",
          usefulPhrases: [
            "A mi entender...",
            "Lo mas sensato seria...",
            "No descartes la idea de...",
            "Hay que tener en cuenta que...",
            "Mi sugerencia es...",
            "Lo prioritario es...",
          ],
        },
      ],
    },
  },
  {
    id: 5,
    level: "A2",
    theme: "La ciudad y los lugares",
    icon: "Building2",
    vocabulary: [
      {
        word: "plaza",
        definition: "Espacio público abierto en una ciudad",
        chinese: "广场",
        example: "Nos vemos en la plaza mayor.",
      },
      {
        word: "biblioteca",
        definition: "Lugar donde se pueden leer o pedir prestados libros",
        chinese: "图书馆",
        example: "Estudio en la biblioteca todos los días.",
      },
      {
        word: "farmacia",
        definition: "Tienda donde se compran medicinas",
        chinese: "药店",
        example: "Necesito ir a la farmacia a comprar aspirinas.",
      },
      {
        word: "estación",
        definition: "Lugar donde paran los trenes o autobuses",
        chinese: "车站",
        example: "La estación de tren está en el centro.",
      },
      {
        word: "supermercado",
        definition: "Tienda grande donde se venden alimentos y productos varios",
        chinese: "超市",
        example: "Compro la fruta en el supermercado.",
      },
      {
        word: "hospital",
        definition: "Lugar donde los médicos atienden a los enfermos",
        chinese: "医院",
        example: "El hospital está abierto las 24 horas.",
      },
      {
        word: "parque",
        definition: "Lugar público con árboles y bancos para descansar",
        chinese: "公园",
        example: "Los niños juegan en el parque.",
      },
      {
        word: "cine",
        definition: "Lugar donde se ven películas",
        chinese: "电影院",
        example: "Vamos al cine a ver la nueva película.",
      },
      {
        word: "museo",
        definition: "Edificio donde se exponen obras de arte u objetos históricos",
        chinese: "博物馆",
        example: "El museo del Prado es muy famoso.",
      },
      {
        word: "restaurante",
        definition: "Lugar donde se paga para comer",
        chinese: "餐厅",
        example: "Cenamos en un restaurante italiano.",
      },
      {
        word: "ayuntamiento",
        definition: "Edificio del gobierno de una ciudad",
        chinese: "市政厅",
        example: "El ayuntamiento está en la plaza central.",
      },
    ],
    reading: {
      textType: "descriptivo",
      title: "Mi ciudad: Valencia",
      text: `Valencia es la tercera ciudad más grande de España, después de Madrid y Barcelona. Tiene más de 800.000 habitantes y está situada en la costa este del país, junto al mar Mediterráneo. Es una ciudad que combina lo histórico con lo moderno.

El centro de Valencia es muy bonito. La plaza del Ayuntamiento es el corazón de la ciudad, con edificios impresionantes y muchas terrazas de cafeterías. Cerca está la plaza de la Reina, donde se encuentra la catedral. Muchos turistas suben al Micalet, el campanario de la catedral, para ver las vistas de toda la ciudad.

Para los que les gusta la cultura, hay muchos museos. El más famoso es la Ciudad de las Artes y las Ciencias, un complejo moderno con un museo de ciencias, un acuario enorme y un teatro donde se hacen espectáculos. Los edificios son de color blanco y parecen del futuro.

Valencia también tiene muchos parques. El Jardín del Turia es un parque larguísimo que antes era un río. Ahora hay árboles, fuentes, zonas de deporte y paseos. Los valencianos van allí a correr, pasear a sus perros o hacer picnics con amigos.

La playa está muy cerca del centro. La Malvarrosa es la playa más famosa, con arena dorada y muchos restaurantes donde comer paella. En verano, está llena de gente tomando el sol y nadando en el mar.

La ciudad es famosa por sus fiestas. Las Fallas, en marzo, son las más importantes. Durante una semana, hay monumentos enormes en las calles, fuegos artificiales y música en cada esquina. Es una experiencia única.`,
      questions: [
        {
          id: 1,
          question: "¿Cuál es la posición de Valencia en tamaño entre las ciudades españolas?",
          options: ["a) La primera", "b) La segunda", "c) La tercera", "d) La cuarta"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Valencia es la tercera ciudad más grande de España".',
        },
        {
          id: 2,
          question: "¿Dónde está situada Valencia?",
          options: ["a) En el norte", "b) En el sur", "c) En la costa este", "d) En el oeste"],
          correctAnswer: 2,
          explanation: 'El texto dice: "en la costa este del país".',
        },
        {
          id: 3,
          question: "¿Qué es el Micalet?",
          options: ["a) Un museo", "b) El campanario de la catedral", "c) Un parque", "d) Un restaurante"],
          correctAnswer: 1,
          explanation: 'El texto dice: "el Micalet, el campanario de la catedral".',
        },
        {
          id: 4,
          question: "¿Cuál es el museo más famoso?",
          options: [
            "a) El Prado",
            "b) La Ciudad de las Artes y las Ciencias",
            "c) El Reina Sofía",
            "d) El Thyssen",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "El más famoso es la Ciudad de las Artes y las Ciencias".',
        },
        {
          id: 5,
          question: "¿Qué era el Jardín del Turia antes?",
          options: ["a) Un parque", "b) Un río", "c) Una carretera", "d) Un barrio"],
          correctAnswer: 1,
          explanation: 'El texto dice: "El Jardín del Turia es un parque larguísimo que antes era un río".',
        },
        {
          id: 6,
          question: "¿Cómo se llama la playa más famosa?",
          options: ["a) La Barceloneta", "b) La Malvarrosa", "c) La Concha", "d) Las Canteras"],
          correctAnswer: 1,
          explanation: 'El texto dice: "La Malvarrosa es la playa más famosa".',
        },
        {
          id: 7,
          question: "¿Cuándo son las Fallas?",
          options: ["a) En junio", "b) En julio", "c) En marzo", "d) En agosto"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Las Fallas, en marzo, son las más importantes".',
        },
        {
          id: 8,
          question: "¿Cuántos habitantes tiene Valencia?",
          options: ["a) Más de 500.000", "b) Más de 800.000", "c) Más de un millón", "d) Menos de 400.000"],
          correctAnswer: 1,
          explanation: 'El texto dice: "más de 800.000 habitantes".',
        },
        {
          id: 9,
          question: "¿Qué se puede hacer en el Jardín del Turia?",
          options: [
            "a) Solo pasear",
            "b) Correr, pasear perros o hacer picnics",
            "c) Solo correr",
            "d) Nadar",
          ],
          correctAnswer: 1,
          explanation: 'El texto menciona: "a correr, pasear a sus perros o hacer picnics".',
        },
        {
          id: 10,
          question: "¿Qué hay en la Ciudad de las Artes y las Ciencias?",
          options: [
            "a) Solo un museo",
            "b) Un museo, un acuario y un teatro",
            "c) Solo un acuario",
            "d) Solo un teatro",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "un museo de ciencias, un acuario enorme y un teatro".',
        },
      ],
    },
    listening: {
      title: "Un día turístico por Barcelona",
      transcription: `Hola, soy Tomás y ayer llevé a mi primo de visita por Barcelona porque nunca había estado. Fue un día muy largo pero divertido.

Empezamos a las nueve de la mañana en la Sagrada Familia. Mi primo se quedó con la boca abierta al ver la iglesia de Gaudí. Es tan alta y con tantos detalles que no podía parar de hacer fotos. Tuvimos que hacer cola cuarenta minutos para entrar.

Después, bajamos por el Paseo de Gracia. Entramos en algunas tiendas y le mostré la Casa Batlló y la Pedrera, otras obras de Gaudí. Comimos en un restaurante de tapas cerca de la plaza Cataluña. Mi primo probó el jamón ibérico por primera vez y le encantó.

Por la tarde, fuimos al Barrio Gótico. Caminamos por calles estrechas del siglo quince, vimos la catedral gótica y una plaza medieval donde había músicos tocando.

A las seis subimos al parque Güell. Las vistas de Barcelona desde allí arriba son increíbles. Todo el día estuvo soleado, así que se veía perfectamente el mar azul al fondo.

Terminamos el día en el puerto, cenando paella frente al agua. Mi primo dijo que Barcelona era la ciudad más bonita que había visto. Yo estoy de acuerdo.`,
      questions: [
        {
          id: 1,
          question: "¿Por qué Tomás llevó a su primo por Barcelona?",
          options: [
            "a) Porque su primo vivía allí",
            "b) Porque su primo nunca había estado",
            "c) Porque era su cumpleaños",
            "d) Porque era guía turístico",
          ],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Dónde empezaron la visita?",
          options: [
            "a) En el Parque Güell",
            "b) En la Sagrada Familia",
            "c) En el Barrio Gótico",
            "d) En la playa",
          ],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "¿Cuánto tiempo esperaron para entrar en la Sagrada Familia?",
          options: ["a) Veinte minutos", "b) Treinta minutos", "c) Cuarenta minutos", "d) Una hora"],
          correctAnswer: 2,
        },
        {
          id: 4,
          question: "¿Qué probó el primo por primera vez?",
          options: ["a) Paella", "b) Gazpacho", "c) Jamón ibérico", "d) Tortilla"],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "¿Qué visitaron por la tarde?",
          options: ["a) La Sagrada Familia", "b) El Barrio Gótico", "c) El Parque Güell", "d) La playa"],
          correctAnswer: 1,
        },
        {
          id: 6,
          question: "¿A qué hora subieron al Parque Güell?",
          options: ["a) A las cuatro", "b) A las cinco", "c) A las seis", "d) A las siete"],
          correctAnswer: 2,
        },
        {
          id: 7,
          question: "¿Dónde cenaron?",
          options: ["a) En el Barrio Gótico", "b) En el puerto", "c) En el Paseo de Gracia", "d) En casa"],
          correctAnswer: 1,
        },
        {
          id: 8,
          question: "¿Cómo fue el tiempo ese día?",
          options: ["a) Llovió", "b) Estuvo nublado", "c) Estuvo soleado", "d) Hizo viento"],
          correctAnswer: 2,
        },
        {
          id: 9,
          question: "¿Qué vieron en el Barrio Gótico?",
          options: [
            "a) La Sagrada Familia",
            "b) Calles estrechas y la catedral gótica",
            "c) La Casa Batlló",
            "d) El parque Güell",
          ],
          correctAnswer: 1,
        },
        {
          id: 10,
          question: "¿Qué opinó el primo de Barcelona?",
          options: [
            "a) Era muy grande",
            "b) Era muy cara",
            "c) Era la ciudad más bonita que había visto",
            "d) Era muy ruidosa",
          ],
          correctAnswer: 2,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi ciudad",
        description: "Escribe sobre tu ciudad. Incluye: dónde está, qué lugares tiene, qué te gusta de ella.",
        structure: {
          intro: "Presenta tu ciudad y dónde está.",
          body: "Describe los lugares importantes.",
          conclusion: "Di por qué te gusta vivir allí.",
        },
        connectors: ["Vivo en", "Está en", "Tiene", "Lo que más me gusta es", "En conclusión"],
        wordCount: "80-120 palabras",
      },
      optionB: {
        title: "Un lugar de mi ciudad",
        description:
          "Escribe sobre tu lugar favorito de tu ciudad. Incluye: dónde está, qué hay allí, por qué te gusta.",
        structure: {
          intro: "Di cuál es tu lugar favorito.",
          body: "Descríbelo y di qué actividades puedes hacer.",
          conclusion: "Explica por qué es especial para ti.",
        },
        connectors: ["Mi lugar favorito es", "Está en", "Allí puedes", "Me encanta porque", "Creo que"],
        wordCount: "80-120 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Describe tu ciudad",
        description:
          "Habla sobre tu ciudad durante 1-2 minutos. Di dónde está, cuántos habitantes tiene, qué lugares importantes tiene y qué se puede hacer allí.",
        connectors: ["Vivo en", "Es una ciudad", "Tiene", "Se puede", "Lo mejor es"],
        guideQuestions: [
          "¿Cual fue tu primera experiencia con esto?",
          "¿Como ha cambiado tu perspectiva?",
          "¿Que habilidades has desarrollado gracias a ello?",
          "¿Que le recomendarias a alguien que empieza?",
        ],
      },
      topic2: {
        title: "Tu lugar favorito de la ciudad",
        description:
          "Habla sobre tu lugar favorito en tu ciudad. Di dónde está, qué hay, qué haces allí y por qué te gusta.",
        connectors: [
          "Mi lugar favorito es",
          "Está situado en",
          "Cuando voy allí",
          "Me gusta porque",
          "Recomiendo ir",
        ],
        guideQuestions: [
          "¿Por que te parece interesante este tema?",
          "¿Que habilidades se necesitan?",
          "¿Como influye en otras areas de tu vida?",
          "¿Cual ha sido tu mayor aprendizaje?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero sois turistas en una ciudad española. Tenéis que decidir qué lugares visitar, cómo moveros por la ciudad y dónde comer.",
      questions: [
        {
          question: "¿Qué monumentos o lugares queréis visitar primero? ¿Por qué?",
          help: "Sugiere lugares. Usa: Yo creo que deberíamos... porque...",
          usefulPhrases: [
            "Yo diria que...",
            "Prueba esta opcion...",
            "Tal vez te interese...",
            "Es relevante saber que...",
            "Algo que debes probar es...",
            "El factor mas importante es...",
          ],
        },
        {
          question: "¿Cómo nos movemos por la ciudad? ¿A pie, en metro, en autobús?",
          help: "Propón transporte. Usa: Es mejor ir en... porque...",
          usefulPhrases: [
            "Mi impresion es que...",
            "Te convendria...",
            "Otra posibilidad es...",
            "No te pierdas el detalle de...",
            "Una buena tactica es...",
            "El aspecto decisivo es...",
          ],
        },
        {
          question: "¿Dónde vamos a comer? ¿Tenemos alguna preferencia?",
          help: "Sugiere dónde comer. Usa: ¿Qué te parece si...? / Podemos ir a...",
          usefulPhrases: [
            "Considerando la situacion...",
            "El enfoque mas adecuado es...",
            "Explora la opcion de...",
            "Destaca especialmente...",
            "Un metodo infalible es...",
            "El elemento central es...",
          ],
        },
      ],
    },
  },
  {
    id: 6,
    level: "A2",
    theme: "Los viajes y el transporte",
    icon: "Plane",
    vocabulary: [
      {
        word: "billete",
        definition: "Documento que permite viajar en transporte público",
        chinese: "票",
        example: "Compré el billete de tren online.",
      },
      {
        word: "maleta",
        definition: "Bolsa grande para llevar ropa en los viajes",
        chinese: "行李箱",
        example: "Mi maleta pesa veinte kilos.",
      },
      {
        word: "aeropuerto",
        definition: "Lugar donde despegan y aterrizan los aviones",
        chinese: "机场",
        example: "Llegué al aeropuerto con dos horas de antelación.",
      },
      {
        word: "andén",
        definition: "Plataforma de una estación donde se coge el tren",
        chinese: "站台",
        example: "El tren sale del andén número tres.",
      },
      {
        word: "retraso",
        definition: "Llegada más tarde de lo previsto",
        chinese: "延误",
        example: "El vuelo tiene una hora de retraso.",
      },
      {
        word: "equipaje",
        definition: "Conjunto de maletas y bolsas de un viajero",
        chinese: "行李",
        example: "Mi equipaje está en la cinta transportadora.",
      },
      {
        word: "pasaporte",
        definition: "Documento oficial para viajar a otros países",
        chinese: "护照",
        example: "No olvides tu pasaporte en el hotel.",
      },
      {
        word: "reserva",
        definition: "Acuerdo previo para tener algo preparado",
        chinese: "预订",
        example: "Tengo una reserva en el hotel Central.",
      },
      {
        word: "avión",
        definition: "Vehículo que vuela y transporta pasajeros",
        chinese: "飞机",
        example: "Cogí un avión directo a Madrid.",
      },
      {
        word: "taxi",
        definition: "Coche con conductor que lleva a las personas donde quieren",
        chinese: "出租车",
        example: "Tomamos un taxi al hotel porque era tarde.",
      },
      {
        word: "mapa",
        definition: "Dibujo que representa una ciudad o país",
        chinese: "地图",
        example: "Necesito un mapa para no perderme.",
      },
    ],
    reading: {
      textType: "narrativo",
      title: "Mi primer viaje en avión",
      text: `Tenía dieciocho años cuando cogí mi primer avión. Era un vuelo de Beijing a Madrid, con escala en Ámsterdam. Tenía mucho miedo porque nunca había volado y había oído historias de turbulencias.

Llegué al aeropuerto de Beijing con tres horas de antelación. Mi madre me ayudó a facturar la maleta y me dio un abrazo largo antes de pasar el control de seguridad. "Llámame cuando llegues", me dijo con lágrimas en los ojos.

El avión era enorme, mucho más grande de lo que imaginaba. Mi asiento estaba al lado de la ventanilla, justo lo que quería. Una azafata muy amable me explicó cómo abrocharme el cinturón y dónde estaban las salidas de emergencia.

Cuando el avión empezó a despegar, sentí una mezcla de emoción y nerviosismo. Los motores hacían mucho ruido y sentí que el avión se inclinaba hacia arriba. Cerré los ojos un momento, pero cuando los abrí, vimos cómo Beijing se hacía pequeño debajo de nosotros. Fue una sensación increíble.

El vuelo duró once horas en total. Vi tres películas, comí dos veces y dormí un poco. Hubo algunas turbulencias, pero no fueron tan malas como pensaba. En Ámsterdam, tuve que cambiar de terminal y esperar una hora.

Cuando llegué a Madrid, saqué mi equipaje y salí a buscar un taxi. El conductor me llevó al centro mientras yo miraba por la ventana, emocionado de empezar esta nueva aventura.`,
      questions: [
        {
          id: 1,
          question: "¿Qué edad tenía el narrador?",
          options: ["a) Dieciséis", "b) Diecisiete", "c) Dieciocho", "d) Veinte"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Tenía dieciocho años".',
        },
        {
          id: 2,
          question: "¿De dónde a dónde viajaba?",
          options: [
            "a) De Madrid a Beijing",
            "b) De Beijing a Madrid",
            "c) De Ámsterdam a Madrid",
            "d) De Beijing a Ámsterdam",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "un vuelo de Beijing a Madrid".',
        },
        {
          id: 3,
          question: "¿Dónde tenía la escala?",
          options: ["a) En París", "b) En Londres", "c) En Ámsterdam", "d) En Fráncfort"],
          correctAnswer: 2,
          explanation: 'El texto dice: "con escala en Ámsterdam".',
        },
        {
          id: 4,
          question: "¿Quién le ayudó a facturar la maleta?",
          options: ["a) Su padre", "b) Su madre", "c) Su hermana", "d) Nadie"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Mi madre me ayudó a facturar la maleta".',
        },
        {
          id: 5,
          question: "¿Dónde estaba su asiento?",
          options: ["a) En el pasillo", "b) En medio", "c) En la ventanilla", "d) En primera clase"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Mi asiento estaba al lado de la ventanilla".',
        },
        {
          id: 6,
          question: "¿Cuánto duró el vuelo?",
          options: ["a) Ocho horas", "b) Nueve horas", "c) Once horas", "d) Doce horas"],
          correctAnswer: 2,
          explanation: 'El texto dice: "El vuelo duró once horas".',
        },
        {
          id: 7,
          question: "¿Cuánto tiempo esperó en Ámsterdam?",
          options: ["a) Treinta minutos", "b) Una hora", "c) Dos horas", "d) Tres horas"],
          correctAnswer: 1,
          explanation: 'El texto dice: "esperar una hora".',
        },
        {
          id: 8,
          question: "¿Cómo llegó al centro de Madrid desde el aeropuerto?",
          options: ["a) En metro", "b) En autobús", "c) En taxi", "d) En tren"],
          correctAnswer: 2,
          explanation: 'El texto dice: "salí a buscar un taxi" y "El conductor me llevó al centro".',
        },
        {
          id: 9,
          question: "¿Qué hizo durante el vuelo?",
          options: [
            "a) Solo durmió",
            "b) Leyó un libro",
            "c) Vió películas, comió y durmió",
            "d) Habló con otros pasajeros",
          ],
          correctAnswer: 2,
          explanation: 'El texto dice: "Vi tres películas, comí dos veces y dormí un poco".',
        },
        {
          id: 10,
          question: "¿Por qué tenía miedo el narrador?",
          options: [
            "a) Porque era pequeño",
            "b) Porque nunca había volado y había oído historias de turbulencias",
            "c) Porque viajaba solo",
            "d) Porque el vuelo era largo",
          ],
          correctAnswer: 1,
          explanation:
            'El texto dice: "Tenía mucho miedo porque nunca había volado y había oído historias de turbulencias".',
        },
      ],
    },
    listening: {
      title: "Cogiendo el AVE",
      transcription: `El AVE es el tren de alta velocidad español. Cada año, millones de personas viajan en AVE entre las principales ciudades de España. Yo viajo en AVE al menos una vez al mes porque mi familia vive en Sevilla y yo trabajo en Madrid.

Los billetes de AVE se pueden comprar online, en las máquinas de la estación o en las taquillas. Yo siempre los compro con antelación porque sale mucho más barato. Un billete de Madrid a Sevilla cuesta unos cincuenta euros si lo compras con tres meses de anticipación, pero puede costar ciento cincuenta euros si lo compras el mismo día.

El AVE es muy puntual. Casi siempre llega a su hora exacta, o con un retraso máximo de cinco minutos. El viaje de Madrid a Sevilla dura dos horas y media. En coche tardarías más de cinco horas, y en avión, con el tiempo de espera en el aeropuerto, también es más lento.

Dentro del tren, hay diferentes clases: turista, turista plus y preferente. Yo normalmente viajo en turista porque es más económico. Los asientos son cómodos, hay enchufes para cargar el móvil y WiFi gratuito. También hay un vagón restaurante donde puedes comprar bocadillos, café y refrescos.

Lo que más me gusta del AVE es la comodidad. Puedes leer, trabajar con el ordenador o simplemente mirar por la ventanilla mientras el paisaje pasa a trescientos kilómetros por hora. Es una forma de viajar relajada y eficiente.`,
      questions: [
        {
          id: 1,
          question: "¿Qué es el AVE?",
          options: ["a) Un avión", "b) Un tren de alta velocidad", "c) Un autobús", "d) Un coche"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Con qué frecuencia viaja el narrador en AVE?",
          options: ["a) Cada semana", "b) Al menos una vez al mes", "c) Cada año", "d) Cada día"],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "¿Cuánto cuesta un billete de Madrid a Sevilla con tres meses de antelación?",
          options: [
            "a) Unos cincuenta euros",
            "b) Unos ochenta euros",
            "c) Ciento cincuenta euros",
            "d) Doscientos euros",
          ],
          correctAnswer: 0,
        },
        {
          id: 4,
          question: "¿Cuánto dura el viaje de Madrid a Sevilla en AVE?",
          options: ["a) Una hora", "b) Dos horas", "c) Dos horas y media", "d) Cinco horas"],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "¿Cuántas clases hay en el AVE?",
          options: ["a) Dos", "b) Tres", "c) Cuatro", "d) Una"],
          correctAnswer: 1,
        },
        {
          id: 6,
          question: "¿Qué clase suele usar el narrador?",
          options: ["a) Preferente", "b) Turista plus", "c) Turista", "d) Primera clase"],
          correctAnswer: 2,
        },
        {
          id: 7,
          question: "¿Qué hay en el vagón restaurante?",
          options: ["a) Solo café", "b) Bocadillos, café y refrescos", "c) Comida gourmet", "d) Nada"],
          correctAnswer: 1,
        },
        {
          id: 8,
          question: "¿A qué velocidad va el AVE?",
          options: ["a) 200 km/h", "b) 250 km/h", "c) 300 km/h", "d) 350 km/h"],
          correctAnswer: 2,
        },
        {
          id: 9,
          question: "¿Por qué le gusta el AVE al narrador?",
          options: [
            "a) Porque es barato",
            "b) Porque es cómodo y puede trabajar o leer",
            "c) Porque es rápido",
            "d) Porque tiene muchos vagones",
          ],
          correctAnswer: 1,
        },
        {
          id: 10,
          question: "¿Cuánto tardaría en coche de Madrid a Sevilla?",
          options: ["a) Dos horas", "b) Tres horas", "c) Más de cinco horas", "d) Cuatro horas"],
          correctAnswer: 2,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi último viaje",
        description:
          "Escribe sobre tu último viaje. Incluye: adónde fuiste, cómo viajaste, con quién fuiste, qué hiciste.",
        structure: {
          intro: "Di cuándo y adónde fuiste.",
          body: "Describe cómo fue el viaje y las actividades.",
          conclusion: "Di si te gustó y si repetirías.",
        },
        connectors: ["El mes pasado", "Fui a", "Viajé en", "Allí", "Fue"],
        wordCount: "80-120 palabras",
      },
      optionB: {
        title: "Medios de transporte",
        description:
          "Escribe sobre los medios de transporte que usas. Incluye: cuál usas más, por qué, ventajas y desventajas.",
        structure: {
          intro: "Presenta los medios de transporte que usas.",
          body: "Describe cuál prefieres y por qué.",
          conclusion: "Di qué medio de transporte te gustaría probar.",
        },
        connectors: ["Normalmente uso", "Por un lado", "Por otro lado", "Prefiero", "En el futuro"],
        wordCount: "80-120 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Describe tu último viaje",
        description:
          "Habla sobre tu último viaje durante 1-2 minutos. Di adónde fuiste, con quién, cómo viajaste, dónde te alojaste y qué hiciste.",
        connectors: [
          "Mi último viaje fue a",
          "Fui con",
          "Viajamos en",
          "Nos alojamos en",
          "Lo que más me gustó fue",
        ],
        guideQuestions: [
          "¿Como influye en tu vida diaria?",
          "¿Que cambios has notado con el tiempo?",
          "¿Que relacion tiene con tu entorno?",
          "¿Que consejo practico darias?",
        ],
      },
      topic2: {
        title: "Medios de transporte en tu ciudad",
        description:
          "Habla sobre los medios de transporte en tu ciudad. ¿Cuáles hay? ¿Cuál es el mejor? ¿Cuál prefieres tú?",
        connectors: [
          "En mi ciudad hay",
          "El medio de transporte más usado es",
          "Yo prefiero",
          "Porque",
          "Creo que",
        ],
        guideQuestions: [
          "¿Que te motivo a conocer mas sobre esto?",
          "¿Que aspectos te frustran o te alegran?",
          "¿Como lo viven otras personas?",
          "¿Que planes tienes relacionados?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero queréis organizar un viaje juntos. Tenéis que decidir el destino, cómo viajaréis, dónde os alojaréis y qué actividades haréis.",
      questions: [
        {
          question: "¿Adónde queremos ir de viaje? ¿Por qué?",
          help: "Sugiere un destino. Usa: Yo propongo... / ¿Qué te parece...?",
          usefulPhrases: [
            "Reflexionando sobre el tema...",
            "Mi propuesta es que...",
            "Tambien podrias pensar en...",
            "Es significativo que...",
            "Lo primordial es...",
            "El detalle mas importante es...",
          ],
        },
        {
          question: "¿Cómo vamos a viajar? ¿En avión, tren o coche?",
          help: "Propón un medio de transporte. Usa: Es mejor ir en... porque...",
          usefulPhrases: [
            "En la practica...",
            "Te resultara util...",
            "Dale una oportunidad a...",
            "Llama la atencion que...",
            "Una tecnica muy buena es...",
            "El componente vital es...",
          ],
        },
        {
          question: "¿Qué tipo de alojamiento buscamos? ¿Hotel, apartamento, hostal?",
          help: "Sugiere alojamiento. Usa: Podemos buscar... / Prefiero...",
          usefulPhrases: [
            "Viendolo con perspectiva...",
            "Creo que te beneficiaria...",
            "No dejes de considerar...",
            "Es llamativo que...",
            "La estrategia mas eficaz es...",
            "El pilar fundamental es...",
          ],
        },
      ],
    },
  },
  {
    id: 7,
    level: "A2",
    theme: "El tiempo atmosférico",
    icon: "CloudSun",
    vocabulary: [
      {
        word: "soleado",
        definition: "Con sol, sin nubes",
        chinese: "晴朗的",
        example: "Hoy está soleado, vamos a la playa.",
      },
      {
        word: "nublado",
        definition: "Con muchas nubes",
        chinese: "多云的",
        example: "El cielo está nublado, parece que va a llover.",
      },
      {
        word: "lluvia",
        definition: "Agua que cae del cielo",
        chinese: "雨",
        example: "No olvides el paraguas, hay lluvia.",
      },
      {
        word: "nieve",
        definition: "Agua congelada que cae del cielo en invierno",
        chinese: "雪",
        example: "Los niños juegan con la nieve.",
      },
      {
        word: "viento",
        definition: "Aire que se mueve con fuerza",
        chinese: "风",
        example: "Hace mucho viento, cierra la ventana.",
      },
      {
        word: "tormenta",
        definition: "Lluvia fuerte con truenos y relámpagos",
        chinese: "暴风雨",
        example: "La tormenta de anoche fue muy fuerte.",
      },
      {
        word: "temperatura",
        definition: "Grado de calor o frío del aire",
        chinese: "温度",
        example: "La temperatura hoy es de 25 grados.",
      },
      {
        word: "frío",
        definition: "Sensación de baja temperatura",
        chinese: "冷",
        example: "Hace mucho frío en invierno.",
      },
      {
        word: "calor",
        definition: "Sensación de alta temperatura",
        chinese: "热",
        example: "En agosto hace mucho calor en España.",
      },
      {
        word: "primavera",
        definition: "Estación entre invierno y verano",
        chinese: "春天",
        example: "En primavera florecen las flores.",
      },
      {
        word: "otoño",
        definition: "Estación entre verano e invierno",
        chinese: "秋天",
        example: "En otoño caen las hojas de los árboles.",
      },
    ],
    reading: {
      textType: "descriptivo",
      title: "Las estaciones en España",
      text: `España tiene un clima muy variado dependiendo de la región. En general, se pueden distinguir cuatro estaciones claras, aunque en algunas zonas el invierno es suave y en otras el verano es muy caluroso.

La primavera, de marzo a mayo, es una de las mejores épocas para visitar España. El tiempo es agradable, con temperaturas entre quince y veinticinco grados. En el sur, como en Andalucía, ya hace calor durante el día, pero las noches son frescas. Es el momento perfecto para visitar ciudades como Sevilla o Granada antes de que llegue el calor extremo del verano.

El verano, de junio a septiembre, es la temporada más calurosa. En el interior del país, las temperaturas pueden superar los cuarenta grados. Madrid y Sevilla son conocidas por su calor abrasador en julio y agosto. Sin embargo, en las costas el clima es más suave gracias al mar. Miles de turistas vienen a las playas españolas durante estos meses.

El otoño, de octubre a noviembre, es una estación muy agradable. El calor del verano empieza a desaparecer y las temperaturas bajan poco a poco. Es una buena época para visitar el norte de España, como Galicia o Asturias, donde los bosques se vuelven de colores preciosos. También es temporada de vendimia, cuando se recogen las uvas para hacer vino.

El invierno, de diciembre a febrero, varía mucho según la zona. En el norte y en las montañas nieva mucho y se puede esquiar en estaciones como Baqueira o Sierra Nevada. En el centro y el sur, el invierno es más suave, con temperaturas que rara vez bajan de cero grados. Madrid puede tener días soleados y fríos, mientras que en Barcelona el invierno es bastante templado.`,
      questions: [
        {
          id: 1,
          question: "¿Cuáles son los meses de la primavera en España?",
          options: ["a) Enero a marzo", "b) Marzo a mayo", "c) Junio a agosto", "d) Septiembre a noviembre"],
          correctAnswer: 1,
          explanation: 'El texto dice: "La primavera, de marzo a mayo".',
        },
        {
          id: 2,
          question: "¿Qué temperaturas hay en primavera?",
          options: [
            "a) Entre 5 y 10 grados",
            "b) Entre 15 y 25 grados",
            "c) Entre 30 y 40 grados",
            "d) Menos de cero",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "temperaturas entre quince y veinticinco grados".',
        },
        {
          id: 3,
          question: "¿Dónde hace más calor en verano?",
          options: ["a) En la costa", "b) En el norte", "c) En el interior del país", "d) En Galicia"],
          correctAnswer: 2,
          explanation:
            'El texto dice: "En el interior del país, las temperaturas pueden superar los cuarenta grados".',
        },
        {
          id: 4,
          question: "¿Por qué en las costas el verano es más suave?",
          options: [
            "a) Porque llueve mucho",
            "b) Gracias al mar",
            "c) Porque hay viento",
            "d) Porque está en el norte",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "en las costas el clima es más suave gracias al mar".',
        },
        {
          id: 5,
          question: "¿Qué pasa en el otoño en Galicia y Asturias?",
          options: [
            "a) Nieva mucho",
            "b) Los bosques se vuelven de colores preciosos",
            "c) Hace mucho calor",
            "d) Llueve poco",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "los bosques se vuelven de colores preciosos".',
        },
        {
          id: 6,
          question: "¿Qué es la vendimia?",
          options: [
            "a) Una fiesta",
            "b) Cuando se recogen las uvas para hacer vino",
            "c) Un tipo de uva",
            "d) Una danza tradicional",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "temporada de vendimia, cuando se recogen las uvas para hacer vino".',
        },
        {
          id: 7,
          question: "¿Dónde se puede esquiar en invierno?",
          options: ["a) En Barcelona", "b) En Baqueira o Sierra Nevada", "c) En Madrid", "d) En Sevilla"],
          correctAnswer: 1,
          explanation: 'El texto dice: "se puede esquiar en estaciones como Baqueira o Sierra Nevada".',
        },
        {
          id: 8,
          question: "¿Cómo es el invierno en Barcelona?",
          options: ["a) Muy frío", "b) Bastante templado", "c) Muy caluroso", "d) Nieva mucho"],
          correctAnswer: 1,
          explanation: 'El texto dice: "en Barcelona el invierno es bastante templado".',
        },
        {
          id: 9,
          question: "¿Cuántas estaciones tiene España?",
          options: ["a) Dos", "b) Tres", "c) Cuatro", "d) Cinco"],
          correctAnswer: 2,
          explanation: 'El texto dice: "se pueden distinguir cuatro estaciones claras".',
        },
        {
          id: 10,
          question: "¿Cuándo es la mejor época para visitar Sevilla según el texto?",
          options: ["a) En verano", "b) En invierno", "c) En primavera", "d) En otoño"],
          correctAnswer: 2,
          explanation:
            'El texto dice que primavera es "el momento perfecto para visitar ciudades como Sevilla".',
        },
      ],
    },
    listening: {
      title: "El pronóstico del tiempo",
      transcription: `Buenos días, aquí está el pronóstico del tiempo para hoy y mañana en la península ibérica.

Hoy, en la zona norte del país, tendremos un día nublado con lluvias por la mañana. En Bilbao y San Sebastián, la temperatura máxima será de dieciocho grados. Por la tarde, las nubes irán desapareciendo y saldrá el sol.

En el centro del país, Madrid tendrá un día soleado con cielo despejado. La temperatura alcanzará los veintiocho grados. Hace mucho calor para esta época del año, así que es importante beber agua y no exponerse al sol en las horas centrales del día.

En la zona mediterránea, Valencia y Barcelona tendrán un día parcialmente nublado. Por la mañana habrá niebla en la costa, pero después el sol aparecerá. La temperatura será de veinticinco grados aproximadamente.

En el sur, Sevilla tendrá un día muy caluroso con treinta y cinco grados. No hay previsión de lluvia. Por la tarde podría haber alguna tormenta aislada en las zonas de montaña de Córdoba y Granada.

Mañana, un frente frío llegará desde el Atlántico. En todo el país bajarán las temperaturas entre cinco y diez grados. Habrá lluvias en el oeste y centro, mientras que el este se mantendrá seco. En las zonas de montaña del norte podría nevar por encima de mil quinientos metros.

Esto es todo por hoy. Les deseamos un buen día.`,
      questions: [
        {
          id: 1,
          question: "¿Qué tiempo hará hoy en el norte?",
          options: ["a) Soleado", "b) Nublado con lluvias por la mañana", "c) Nevado", "d) Tormentoso"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Cuál será la temperatura máxima en Bilbao?",
          options: ["a) 15 grados", "b) 18 grados", "c) 20 grados", "d) 25 grados"],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "¿Cómo estará el tiempo en Madrid hoy?",
          options: ["a) Nublado", "b) Lloviendo", "c) Soleado con cielo despejado", "d) Nevado"],
          correctAnswer: 2,
        },
        {
          id: 4,
          question: "¿Cuántos grados hará en Madrid?",
          options: ["a) 20 grados", "b) 25 grados", "c) 28 grados", "d) 35 grados"],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "¿Habrá niebla en la costa mediterránea?",
          options: ["a) No", "b) Sí, por la mañana", "c) Sí, todo el día", "d) Solo por la tarde"],
          correctAnswer: 1,
        },
        {
          id: 6,
          question: "¿Cuántos grados hará en Sevilla?",
          options: ["a) 25 grados", "b) 28 grados", "c) 30 grados", "d) 35 grados"],
          correctAnswer: 3,
        },
        {
          id: 7,
          question: "¿Qué pasará mañana?",
          options: [
            "a) Subirán las temperaturas",
            "b) Llegará un frente frío",
            "c) Hará más calor",
            "d) No habrá cambios",
          ],
          correctAnswer: 1,
        },
        {
          id: 8,
          question: "¿Cuánto bajarán las temperaturas mañana?",
          options: ["a) 2-3 grados", "b) 5-10 grados", "c) 15 grados", "d) No bajarán"],
          correctAnswer: 1,
        },
        {
          id: 9,
          question: "¿Dónde podría nevar mañana?",
          options: [
            "a) En Madrid",
            "b) En Sevilla",
            "c) En zonas de montaña del norte por encima de 1500 metros",
            "d) En Barcelona",
          ],
          correctAnswer: 2,
        },
        {
          id: 10,
          question: "¿Qué se recomienda en Madrid por el calor?",
          options: [
            "a) No salir de casa",
            "b) Beber agua y no exponerse al sol en las horas centrales",
            "c) Llevar paraguas",
            "d) Vestirse de negro",
          ],
          correctAnswer: 1,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi estación favorita",
        description:
          "Escribe sobre tu estación del año favorita. Incluye: cuál es, qué tiempo hace, qué actividades haces, por qué te gusta.",
        structure: {
          intro: "Di cuál es tu estación favorita.",
          body: "Describe el tiempo y las actividades.",
          conclusion: "Explica por qué es tu favorita.",
        },
        connectors: [
          "Mi estación favorita es",
          "Durante esta estación",
          "El tiempo es",
          "Me gusta porque",
          "En conclusión",
        ],
        wordCount: "80-120 palabras",
      },
      optionB: {
        title: "El tiempo en mi ciudad",
        description:
          "Escribe sobre el clima de tu ciudad. Incluye: en qué país está, qué tiempo hace en cada estación, si te gusta.",
        structure: {
          intro: "Presenta tu ciudad y su clima general.",
          body: "Describe cada estación.",
          conclusion: "Di qué estación prefieres y por qué.",
        },
        connectors: [
          "Mi ciudad está en",
          "El clima es",
          "En verano",
          "En invierno",
          "Mi estación favorita es",
        ],
        wordCount: "80-120 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Describe el tiempo de hoy",
        description:
          "Habla sobre el tiempo que hace hoy y qué vas a hacer durante 1-2 minutos. Di si hace sol, si llueve, qué temperatura hace.",
        connectors: ["Hoy hace", "La temperatura es de", "Voy a", "Me gusta/No me gusta", "Por eso"],
        guideQuestions: [
          "¿Cual es tu experiencia mas memorable?",
          "¿Que habilidades has desarrollado?",
          "¿Como ha evolucionado para ti?",
          "¿Que importancia tiene en tu rutina?",
        ],
      },
      topic2: {
        title: "Las estaciones del año",
        description:
          "Habla sobre las cuatro estaciones. Di cuál te gusta más, qué haces en cada una y por qué prefieres una.",
        connectors: [
          "Hay cuatro estaciones",
          "Mi favorita es",
          "En esta estación",
          "Lo que más me gusta es",
          "Por eso",
        ],
        guideQuestions: [
          "¿Desde cuando forma parte de tu vida?",
          "¿Que desafios has encontrado?",
          "¿Como te ha cambiado?",
          "¿Que le recomendarias a un principiante?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero vais a hacer un viaje juntos. Tenéis que decidir la mejor época para ir, qué ropa llevar y qué actividades hacer según el clima.",
      questions: [
        {
          question: "¿En qué época del año queremos viajar? ¿Por qué?",
          help: "Sugiere una época. Usa: Creo que deberíamos ir en... porque...",
          usefulPhrases: [
            "En el dia a dia...",
            "Mi consejo directo es...",
            "Piensa tambien en...",
            "Observa que...",
            "Una buena practica es...",
            "El rasgo distintivo es...",
          ],
        },
        {
          question: "Según el clima de ese lugar, ¿qué ropa debemos llevar?",
          help: "Recomienda ropa. Usa: Necesitamos llevar... / Es importante traer...",
          usefulPhrases: [
            "Analizando las opciones...",
            "Te serviria mucho...",
            "Valorar la alternativa de...",
            "Cabe destacar que...",
            "Un recurso muy valioso es...",
            "El factor diferenciador es...",
          ],
        },
        {
          question: "Si llueve durante el viaje, ¿qué otras actividades podemos hacer?",
          help: "Sugiere alternativas. Usa: Si llueve, podemos... / También podríamos...",
          usefulPhrases: [
            "En primera persona...",
            "La mejor decision seria...",
            "Abre la mente a...",
            "Es curioso notar que...",
            "Un procedimiento exitoso es...",
            "El rasgo caracteristico es...",
          ],
        },
      ],
    },
  },
  {
    id: 8,
    level: "A2",
    theme: "Las mascotas y animales",
    icon: "Dog",
    vocabulary: [
      {
        word: "perro",
        definition: "Animal doméstico que ladra y es fiel",
        chinese: "狗",
        example: "Tengo un perro muy juguetón.",
      },
      {
        word: "gato",
        definition: "Animal doméstico pequeño con bigotes",
        chinese: "猫",
        example: "Mi gato duerme todo el día.",
      },
      {
        word: "pájaro",
        definition: "Animal con alas que vuela y canta",
        chinese: "鸟",
        example: "El pájaro canta cada mañana.",
      },
      {
        word: "pez",
        definition: "Animal que vive en el agua",
        chinese: "鱼",
        example: "Tengo un pez dorado en una pecera.",
      },
      {
        word: "veterinario",
        definition: "Médico que cuida la salud de los animales",
        chinese: "兽医",
        example: "Llevé a mi perro al veterinario.",
      },
      {
        word: "pasear",
        definition: "Llevar al perro a dar un paseo",
        chinese: "遛（狗）",
        example: "Paseo al pergo dos veces al día.",
      },
      {
        word: "jaula",
        definition: "Caja con barrotes para tener animales",
        chinese: "笼子",
        example: "El loro está en su jaula.",
      },
      {
        word: "acuario",
        definition: "Recipiente de vidrio para peces",
        chinese: "鱼缸",
        example: "Compré un acuario nuevo para mis peces.",
      },
      {
        word: "hamster",
        definition: "Roedor pequeño que guarda comida en las mejillas",
        chinese: "仓鼠",
        example: "Mi hermana tiene un hámster blanco.",
      },
      {
        word: "adoptar",
        definition: "Dar un hogar a un animal que no tiene dueño",
        chinese: "收养",
        example: "Decidimos adoptar un perro de la perrera.",
      },
      {
        word: "cuidar",
        definition: "Atender y proteger a alguien o algo",
        chinese: "照顾",
        example: "Tengo que cuidar a mi gato cuando está enfermo.",
      },
    ],
    reading: {
      textType: "narrativo",
      title: "Un perro llamado Lucky",
      text: `Hace tres años, Pedro adoptó un perro de la perrera municipal de Barcelona. El perro era mestizo, de color marrón, con las patas cortas y las orejas grandes. Le puso el nombre de Lucky porque tuvo suerte de encontrar un hogar.

Al principio, Lucky era muy tímido. No quería salir de su cesta y se escondía debajo de la cama cuando venía visitas. Pedro fue muy paciente. Cada día, pasaba tiempo sentado cerca de Lucky sin forzarlo. Poco a poco, el perro empezó a confiar.

Ahora, Lucky es un perro completamente diferente. Es muy cariñoso y siempre quiere jugar. Por la mañana, despierta a Pedro lamiéndole la cara. Después, van juntos al parque, donde Lucky corre detrás de las palomas y juega con otros perros.

Pedro dice que tener un perro ha cambiado su vida. Antes, hacía poco ejercicio y pasaba mucho tiempo en casa. Ahora, pasea a Lucky tres veces al día y ha conocido a muchos vecinos en el parque. "Lucky me ha hecho más social", dice Pedro.

El mes pasado, Lucky tuvo un problema de salud. No quería comer y estaba muy triste. Pedro lo llevó al veterinario de inmediato. Resultó que solo era una infección leve. El veterinario le dio unas pastillas y en tres días estaba mejor.

Pedro recomienda adoptar perros en vez de comprarlos. "Hay miles de perros en las perreras esperando una segunda oportunidad. Un perro adoptado te lo agradece toda la vida", afirma con una sonrisa.`,
      questions: [
        {
          id: 1,
          question: "¿Dónde adoptó Pedro a Lucky?",
          options: [
            "a) En una tienda",
            "b) En la perrera municipal de Barcelona",
            "c) En el veterinario",
            "d) En la calle",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Pedro adoptó un perro de la perrera municipal de Barcelona".',
        },
        {
          id: 2,
          question: "¿Por qué le pusieron Lucky?",
          options: [
            "a) Porque es rápido",
            "b) Porque tuvo suerte de encontrar un hogar",
            "c) Porque le gusta jugar",
            "d) Porque es de color marrón",
          ],
          correctAnswer: 1,
          explanation:
            'El texto dice: "Le puso el nombre de Lucky porque tuvo suerte de encontrar un hogar".',
        },
        {
          id: 3,
          question: "¿Cómo era Lucky al principio?",
          options: ["a) Muy activo", "b) Muy tímido", "c) Muy agresivo", "d) Muy ruidoso"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Al principio, Lucky era muy tímido".',
        },
        {
          id: 4,
          question: "¿Cómo despierta Lucky a Pedro?",
          options: ["a) Ladrando", "b) Saltando en la cama", "c) Lamiéndole la cara", "d) Moviendo la cola"],
          correctAnswer: 2,
          explanation: 'El texto dice: "despierta a Pedro lamiéndole la cara".',
        },
        {
          id: 5,
          question: "¿Cuántas veces pasea a Lucky Pedro?",
          options: ["a) Una vez", "b) Dos veces", "c) Tres veces", "d) Cuatro veces"],
          correctAnswer: 2,
          explanation: 'El texto dice: "pasea a Lucky tres veces al día".',
        },
        {
          id: 6,
          question: "¿Qué problema de salud tuvo Lucky?",
          options: [
            "a) Se rompió una pata",
            "b) Una infección leve",
            "c) Se comió algo malo",
            "d) Una herida",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Resultó que solo era una infección leve".',
        },
        {
          id: 7,
          question: "¿Qué le dio el veterinario?",
          options: ["a) Una inyección", "b) Un jarabe", "c) Unas pastillas", "d) Una operación"],
          correctAnswer: 2,
          explanation: 'El texto dice: "El veterinario le dio unas pastillas".',
        },
        {
          id: 8,
          question: "¿Qué recomienda Pedro?",
          options: [
            "a) Comprar perros en tiendas",
            "b) Adoptar perros de perreras",
            "c) No tener perros",
            "d) Tener perros de raza",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Pedro recomienda adoptar perros en vez de comprarlos".',
        },
        {
          id: 9,
          question: "¿Cómo ha cambiado la vida de Pedro con Lucky?",
          options: [
            "a) Hace más ejercicio y conoce a vecinos",
            "b) Duerme más",
            "c) Come mejor",
            "d) Viaja más",
          ],
          correctAnswer: 0,
          explanation:
            'El texto dice: "hace poco ejercicio... pasea a Lucky tres veces al día y ha conocido a muchos vecinos".',
        },
        {
          id: 10,
          question: "¿Cuánto tiempo hace que Pedro tiene a Lucky?",
          options: ["a) Un año", "b) Dos años", "c) Tres años", "d) Cuatro años"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Hace tres años, Pedro adoptó un perro".',
        },
      ],
    },
    listening: {
      title: "Mi gato Mishu",
      transcription: `Hola, me llamo Lin y tengo un gato llamado Mishu. Os voy a contar cómo es mi vida con él.

Mishu es un gato persa de color blanco con manchas grises. Lo adopte hace dos años en un refugio de animales. Cuando lo vi por primera vez, estaba sentado en su jaula mirándome con ojos grandes y azules. Me enamoré de inmediato.

Mishu es muy independiente, como la mayoría de los gatos. Pasa horas durmiendo en el sofá o en mi cama. Pero también es muy cariñoso cuando quiere. Por la noche, cuando estoy viendo la tele, siempre viene a sentarse en mi regazo y ronronea muy fuerte.

Le encanta jugar con una pelota roja que le compré. La empuja con las patas y corre detrás de ella por toda la casa. También le gusta mirar por la ventana y observar los pájaros del jardín. A veces hace ruidos raros cuando ve un pájaro cerca.

Cuidar de Mishu es fácil. Come dos veces al día, comida para gatos que compro en el supermercado. Su arenero lo limpio cada día. Una vez al mes lo llevo al veterinario para que le corten las uñas.

Lo mejor de tener un gato es que te hace compañía sin ser demasiado dependiente. Mishu es mi mejor amigo y no me imagino sin él.`,
      questions: [
        {
          id: 1,
          question: "¿Qué tipo de gato es Mishu?",
          options: ["a) Siamés", "b) Persa", "c) Europeo", "d) Bengala"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿De qué color es Mishu?",
          options: ["a) Negro", "b) Naranja", "c) Blanco con manchas grises", "d) Gris"],
          correctAnswer: 2,
        },
        {
          id: 3,
          question: "¿Dónde adoptó Lin a Mishu?",
          options: ["a) En una tienda", "b) En un refugio de animales", "c) En la calle", "d) Un regalo"],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "¿Qué hace Mishu por la noche?",
          options: [
            "a) Duerme",
            "b) Sale a la calle",
            "c) Se sienta en el regazo de Lin y ronronea",
            "d) Come",
          ],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "¿Con qué le gusta jugar a Mishu?",
          options: [
            "a) Con un ratón de juguete",
            "b) Con una cuerda",
            "c) Con una pelota roja",
            "d) Con una pluma",
          ],
          correctAnswer: 2,
        },
        {
          id: 6,
          question: "¿Cuántas veces come Mishu al día?",
          options: ["a) Una vez", "b) Dos veces", "c) Tres veces", "d) Cuatro veces"],
          correctAnswer: 1,
        },
        {
          id: 7,
          question: "¿Con qué frecuencia lo lleva Lin al veterinario?",
          options: ["a) Cada semana", "b) Cada mes", "c) Cada dos meses", "d) Cada año"],
          correctAnswer: 1,
        },
        {
          id: 8,
          question: "¿Por qué lo lleva al veterinario?",
          options: [
            "a) Para vacunarlo",
            "b) Para cortarle las uñas",
            "c) Porque está enfermo",
            "d) Para bañarlo",
          ],
          correctAnswer: 1,
        },
        {
          id: 9,
          question: "¿Qué le gusta hacer a Mishu junto a la ventana?",
          options: ["a) Dormir", "b) Observar pájaros", "c) Maullar", "d) Comer"],
          correctAnswer: 1,
        },
        {
          id: 10,
          question: "¿Qué opina Lin de tener un gato?",
          options: [
            "a) Es muy difícil",
            "b) Es caro",
            "c) Te hace compañía sin ser dependiente",
            "d) Es aburrido",
          ],
          correctAnswer: 2,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi mascota",
        description:
          "Escribe sobre tu mascota o el animal que te gustaría tener. Incluye: qué animal es, cómo es, qué come, qué haceis juntos.",
        structure: {
          intro: "Presenta tu mascota.",
          body: "Describe sus características y rutina.",
          conclusion: "Di por qué te gusta tener esa mascota.",
        },
        connectors: ["Mi mascota es", "Se llama", "Es de color", "Le gusta", "Me encanta porque"],
        wordCount: "80-120 palabras",
      },
      optionB: {
        title: "Animales salvajes",
        description:
          "Escribe sobre un animal salvaje que te gusta. Incluye: qué animal es, dónde vive, qué come, por qué te gusta.",
        structure: {
          intro: "Presenta el animal.",
          body: "Describe dónde vive y sus características.",
          conclusion: "Explica por qué te interesa este animal.",
        },
        connectors: ["Mi animal favorito es", "Vive en", "Se alimenta de", "Es", "Me gusta porque"],
        wordCount: "80-120 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Mi mascota favorita",
        description:
          "Habla sobre tu mascota o la mascota que te gustaría tener durante 1-2 minutos. Di qué animal es, cómo es, qué hace y por qué te gusta.",
        connectors: ["Yo tengo/Quiero tener", "Es un/una", "Se llama", "Es muy", "Lo/La mejor de"],
        guideQuestions: [
          "¿Que te sorprendio al conocer mas sobre esto?",
          "¿Como influye en tu dia a dia?",
          "¿Que relacion tiene con tu cultura?",
          "¿Como lo ves en el futuro?",
        ],
      },
      topic2: {
        title: "Animales en peligro de extinción",
        description:
          "Habla sobre animales en peligro de extinción. Di cuáles conoces, por qué están en peligro y qué podemos hacer.",
        connectors: [
          "Hay muchos animales en peligro",
          "Por ejemplo",
          "Están en peligro porque",
          "Podemos ayudar",
          "Es importante",
        ],
        guideQuestions: [
          "¿Cual es tu relacion con este tema?",
          "¿Que ventajas tiene para ti?",
          "¿Has tenido algun problema relacionado?",
          "¿Como lo mejorarias?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero queréis adoptar una mascota juntos. Tenéis que decidir qué animal, dónde adoptarlo y cómo cuidarlo.",
      questions: [
        {
          question: "¿Qué mascota queremos adoptar? ¿Perro, gato o otro animal?",
          help: "Sugiere un animal. Usa: Yo creo que deberíamos... porque...",
          usefulPhrases: [
            "Si hablamos claro...",
            "Intentalo de esta forma...",
            "Dale un enfoque a...",
            "No pasa desapercibido que...",
            "Una dinamica positiva es...",
            "El sello distintivo es...",
          ],
        },
        {
          question: "¿Dónde la adoptamos? ¿En una perrera, refugio o tienda?",
          help: "Propón un lugar. Usa: Podemos ir a... / Es mejor...",
          usefulPhrases: [
            "Sin rodeos...",
            "Tu mejor apuesta es...",
            "Introduce la variable de...",
            "Es evidente que...",
            "Una costumbre beneficiosa es...",
            "La marca de identidad es...",
          ],
        },
        {
          question: "¿Cómo repartimos las responsabilidades de cuidarla?",
          help: "Reparte tareas. Usa: Yo puedo... / Tú puedes...",
          usefulPhrases: [
            "Con franqueza...",
            "Te ira genial si...",
            "Incorpora la idea de...",
            "Se aprecia claramente que...",
            "Un protocolo eficiente es...",
            "El indicador principal es...",
          ],
        },
      ],
    },
  },
  {
    id: 9,
    level: "A2",
    theme: "La escuela y los estudios",
    icon: "GraduationCap",
    vocabulary: [
      {
        word: "alumno/a",
        definition: "Persona que estudia en una escuela o universidad",
        chinese: "学生",
        example: "Soy alumno de español en una academia.",
      },
      {
        word: "profesor/a",
        definition: "Persona que enseña en una escuela",
        chinese: "老师",
        example: "Mi profesora de español es muy paciente.",
      },
      {
        word: "clase",
        definition: "Grupo de estudiantes o lección impartida",
        chinese: "课/班级",
        example: "La clase empieza a las nueve.",
      },
      {
        word: "examen",
        definition: "Prueba para evaluar lo aprendido",
        chinese: "考试",
        example: "Tengo un examen de matemáticas mañana.",
      },
      {
        word: "deberes",
        definition: "Trabajo que los estudiantes hacen en casa",
        chinese: "作业",
        example: "Tengo muchos deberes para el lunes.",
      },
      {
        word: "biblioteca",
        definition: "Lugar con muchos libros para estudiar o leer",
        chinese: "图书馆",
        example: "Estudio en la biblioteca porque es tranquila.",
      },
      {
        word: "apuntarse",
        definition: "Inscribirse en un curso o clase",
        chinese: "报名",
        example: "Me quiero apuntar a clases de guitarra.",
      },
      {
        word: "aprender",
        definition: "Adquirir conocimientos o habilidades",
        chinese: "学习",
        example: "Quiero aprender a hablar español.",
      },
      {
        word: "estudiar",
        definition: "Dedicar tiempo a aprender algo",
        chinese: "学习/复习",
        example: "Estudio español todos los días.",
      },
      {
        word: "nota",
        definition: "Calificación de un examen o trabajo",
        chinese: "分数",
        example: "Saqué una buena nota en el examen.",
      },
      {
        word: "curso",
        definition: "Año académico o conjunto de clases sobre un tema",
        chinese: "课程/学年",
        example: "Este curso tengo muchas asignaturas.",
      },
    ],
    reading: {
      textType: "narrativo",
      title: "Mi experiencia estudiando español",
      text: `Me llamo Wei y llevo un año y medio estudiando español en una academia de Beijing. Decidí aprender este idioma porque siempre me ha gustado la cultura hispana y quiero viajar por Sudamérica en el futuro.

Mi clase tiene doce estudiantes, todos chinos menos una chica japonesa llamada Yuki. Nuestra profesora, Carmen, es de Valencia y lleva cinco años enseñando español en China. Es muy divertida y siempre trae fotos de España para mostrarnos. Sus clases nunca son aburridas.

Lunes y miércoles tenemos clase de gramática. Aprendemos los tiempos verbales, las preposiciones y cómo construir frases correctas. Martes y jueves son de conversación. Es mi parte favorita porque practicamos diálogos reales, como ir al restaurante o pedir direcciones. Los viernes hacemos ejercicios de escucha con audios de españoles nativos.

El examen más difícil hasta ahora fue el de los verbos irregulales. En español hay tantos verbos que no siguen las reglas que me volví loco estudiando. Pero saqué un ocho sobre diez, así que no fue tan mal.

Fuera de clase, intento practicar todo lo que puedo. Veo series españolas en Netflix con subtítulos, escucho música en español y tengo un intercambio de idiomas con un español que vive en Madrid. Hablamos por video una vez a la semana: él me ayuda con español y yo le ayudo con chino.

Mi objetivo es aprobar el examen DELE A2 el próximo año y después seguir hasta el B1. Es difícil, pero estoy muy motivado. Como dice mi profesora: "¡Poco a poco se llega lejos!"`,
      questions: [
        {
          id: 1,
          question: "¿Cuánto tiempo lleva Wei estudiando español?",
          options: ["a) Un año", "b) Un año y medio", "c) Dos años", "d) Seis meses"],
          correctAnswer: 1,
          explanation: 'El texto dice: "llevo un año y medio estudiando español".',
        },
        {
          id: 2,
          question: "¿Por qué decidió aprender español?",
          options: [
            "a) Porque es fácil",
            "b) Porque le gusta la cultura hispana y quiere viajar",
            "c) Porque lo necesita para el trabajo",
            "d) Porque sus padres se lo pidieron",
          ],
          correctAnswer: 1,
          explanation:
            'El texto dice: "Decidí aprender este idioma porque siempre me ha gustado la cultura hispana y quiero viajar por Sudamérica".',
        },
        {
          id: 3,
          question: "¿Cuántos estudiantes hay en la clase?",
          options: ["a) Diez", "b) Doce", "c) Quince", "d) Ocho"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Mi clase tiene doce estudiantes".',
        },
        {
          id: 4,
          question: "¿De dónde es la profesora?",
          options: ["a) De Madrid", "b) De Barcelona", "c) De Valencia", "d) De Sevilla"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Carmen, es de Valencia".',
        },
        {
          id: 5,
          question: "¿Qué días tienen clase de conversación?",
          options: ["a) Lunes y miércoles", "b) Martes y jueves", "c) Viernes", "d) Todos los días"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Martes y jueves son de conversación".',
        },
        {
          id: 6,
          question: "¿Qué fue lo más difícil para Wei?",
          options: ["a) La gramática", "b) Los verbos irregulares", "c) La conversación", "d) La escucha"],
          correctAnswer: 1,
          explanation: 'El texto dice: "El examen más difícil hasta ahora fue el de los verbos irregulares".',
        },
        {
          id: 7,
          question: "¿Qué nota sacó en ese examen?",
          options: ["a) Seis", "b) Siete", "c) Ocho", "d) Nueve"],
          correctAnswer: 2,
          explanation: 'El texto dice: "saqué un ocho sobre diez".',
        },
        {
          id: 8,
          question: "¿Cómo practica Wei fuera de clase?",
          options: [
            "a) Solo lee libros",
            "b) Ve series, escucha música y habla con un español",
            "c) Solo hace deberes",
            "d) Va a clases extra",
          ],
          correctAnswer: 1,
          explanation:
            'El texto menciona: "Veo series españolas... escucho música... tengo un intercambio de idiomas".',
        },
        {
          id: 9,
          question: "¿Cuál es el objetivo de Wei?",
          options: [
            "a) Aprobar el A1",
            "b) Aprobar el A2 y seguir al B1",
            "c) Trabajar en España",
            "d) Estudiar en Madrid",
          ],
          correctAnswer: 1,
          explanation:
            'El texto dice: "Mi objetivo es aprobar el examen DELE A2 el próximo año y después seguir hasta el B1".',
        },
        {
          id: 10,
          question: "¿Qué dice la profesora?",
          options: [
            'a) "El español es fácil"',
            'b) "Poco a poco se llega lejos"',
            'c) "Hay que estudiar más"',
            'd) "Los verbos son difíciles"',
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "¡Poco a poco se llega lejos!"',
        },
      ],
    },
    listening: {
      title: "El primer día de universidad",
      transcription: `Hola, soy Laura y hoy ha sido mi primer día de universidad en Madrid. Estoy estudiando Medicina y tengo muchas emociones mezcladas.

Me levanté a las seis de la mañana porque mi primera clase era a las ocho. Llegué a la facultad con media hora de antelación para no perderme. El campus es enorme, con edificios modernos y jardines por todas partes.

Mi primera clase fue Anatomía. El profesor, el doctor Martínez, explicó el sistema óseo. Usó un esqueleto de plástico para mostrarnos los huesos. Tomé muchos apuntes porque todo me pareció nuevo y difícil.

Después, tuve una clase de Química. El aula estaba llena, más de doscientos estudiantes. Tuve que sentarme en la última fila y apenas se oía al profesor. Tendré que llegar más temprano la próxima vez.

A mediodía, fui a la cafetería con unas chicas que conocí. María estudia Medicina también, y Carmen y Pedro estudian Biología. Fueron muy amables conmigo y me dieron consejos sobre qué profesores exigen más y cómo organizar los apuntes.

La última clase fue Biología Celular. El profesor nos explicó cómo funcionan las células y nos dejó un trabajo para la semana que viene. Ya tengo deberes el primer día.

Volví a casa a las seis, exhausta pero feliz. Sé que estos seis años van a ser muy duros, pero estoy emocionada de cumplir mi sueño de ser médica.`,
      questions: [
        {
          id: 1,
          question: "¿Qué estudia Laura?",
          options: ["a) Biología", "b) Medicina", "c) Química", "d) Anatomía"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿A qué hora se levantó Laura?",
          options: ["a) A las cinco", "b) A las seis", "c) A las siete", "d) A las ocho"],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "¿Cuál fue su primera clase?",
          options: ["a) Química", "b) Biología Celular", "c) Anatomía", "d) Física"],
          correctAnswer: 2,
        },
        {
          id: 4,
          question: "¿Quién es el doctor Martínez?",
          options: ["a) Un estudiante", "b) Un médico", "c) El profesor de Anatomía", "d) El decano"],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "¿Cuántos estudiantes había en la clase de Química?",
          options: ["a) Cien", "b) Más de doscientos", "c) Cincuenta", "d) Treinta"],
          correctAnswer: 1,
        },
        {
          id: 6,
          question: "¿Con quién fue a la cafetería?",
          options: ["a) Sola", "b) Con su hermano", "c) Con María, Carmen y Pedro", "d) Con el profesor"],
          correctAnswer: 2,
        },
        {
          id: 7,
          question: "¿Qué estudian Carmen y Pedro?",
          options: ["a) Medicina", "b) Química", "c) Biología", "d) Farmacia"],
          correctAnswer: 2,
        },
        {
          id: 8,
          question: "¿Cuál fue la última clase del día?",
          options: ["a) Anatomía", "b) Química", "c) Biología Celular", "d) Fisiología"],
          correctAnswer: 2,
        },
        {
          id: 9,
          question: "¿A qué hora volvió Laura a casa?",
          options: ["a) A las cuatro", "b) A las cinco", "c) A las seis", "d) A las siete"],
          correctAnswer: 2,
        },
        {
          id: 10,
          question: "¿Cuántos años durará la carrera?",
          options: ["a) Cuatro", "b) Cinco", "c) Seis", "d) Siete"],
          correctAnswer: 2,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi día en la escuela",
        description:
          "Escribe sobre un día normal en tu escuela o universidad. Incluye: a qué hora vas, qué clases tienes, qué haces en el recreo.",
        structure: {
          intro: "Presenta tu centro de estudios.",
          body: "Describe tu horario y actividades.",
          conclusion: "Di qué te gusta más de tu día escolar.",
        },
        connectors: [
          "Voy a",
          "Mi horario empieza a",
          "Después",
          "La clase que más me gusta es",
          "En conclusión",
        ],
        wordCount: "80-120 palabras",
      },
      optionB: {
        title: "Aprender idiomas",
        description:
          "Escribe sobre aprender un idioma extranjero. Incluye: qué idioma estudias, desde cuándo, qué es lo más difícil, qué haces para practicar.",
        structure: {
          intro: "Presenta el idioma que estudias.",
          body: "Describe desde cuándo y qué métodos usas.",
          conclusion: "Di por qué es importante aprender idiomas.",
        },
        connectors: ["Estudio", "Desde hace", "Lo más difícil es", "Para practicar", "Creo que"],
        wordCount: "80-120 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Mi experiencia escolar",
        description:
          "Habla sobre tu experiencia en la escuela o universidad durante 1-2 minutos. Di qué estudias, qué te gusta, qué es difícil y cuáles son tus planes.",
        connectors: [
          "Estudio",
          "Mi asignatura favorita es",
          "Lo más difícil es",
          "Mi profesor/a de",
          "En el futuro quiero",
        ],
        guideQuestions: [
          "¿Como empezaste en esto?",
          "¿Que es lo mas dificil y lo mas facil?",
          "¿Como influye en tus relaciones?",
          "¿Que has aprendido?",
        ],
      },
      topic2: {
        title: "Aprender español",
        description:
          "Habla sobre aprender español. Di por qué lo estudias, desde cuándo, qué es lo más difícil y cómo practicas.",
        connectors: [
          "Estudio español porque",
          "Empecé hace",
          "Lo que más me cuesta es",
          "Practico",
          "Mi objetivo es",
        ],
        guideQuestions: [
          "¿Por que te resulta importante?",
          "¿Que cambios te ha traido?",
          "¿Como lo ves en otros paises?",
          "¿Que te gustaria que mejorara?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero sois estudiantes nuevos en una escuela. Tenéis que decidir qué asignaturas vais a estudiar juntos y cómo vais a organizaros para estudiar.",
      questions: [
        {
          question: "¿Qué asignaturas te gustan más? ¿Por qué?",
          help: "Habla de tus preferencias. Usa: Me gusta... porque... / Prefiero...",
          usefulPhrases: [
            "Hablando sin tapujos...",
            "Notaras la diferencia con...",
            "Plantea la posibilidad de...",
            "Resulta obvio que...",
            "Una rutina recomendable es...",
            "El parametro esencial es...",
          ],
        },
        {
          question: "¿Cómo nos organizamos para estudiar juntos?",
          help: "Propón un plan. Usa: Podemos quedar... / ¿Qué te parece si...?",
          usefulPhrases: [
            "Sin ambages...",
            "Experimenta con...",
            "Desarrolla el concepto de...",
            "Se constata que...",
            "Un sistema que funciona es...",
            "El baremo decisivo es...",
          ],
        },
        {
          question: "¿Dónde preferimos estudiar? ¿En la biblioteca, en casa o en una cafetería?",
          help: "Sugiere un lugar. Usa: Yo prefiero... porque... / Es mejor...",
          usefulPhrases: [
            "Directamente...",
            "Atrévete a probar...",
            "Formula la hipotesis de...",
            "Queda patente que...",
            "Una forma acertada es...",
            "El criterio clave es...",
          ],
        },
      ],
    },
  },
  {
    id: 10,
    level: "A2",
    theme: "Las aficiones y el tiempo libre",
    icon: "Gamepad2",
    vocabulary: [
      {
        word: "afición",
        definition: "Actividad que se hace por placer en el tiempo libre",
        chinese: "爱好",
        example: "Mi afición es la fotografía.",
      },
      {
        word: "tiempo libre",
        definition: "Momento en el que no se trabaja ni estudia",
        chinese: "空闲时间",
        example: "En mi tiempo libre me gusta leer.",
      },
      {
        word: "hobby",
        definition: "Actividad recreativa favorita",
        chinese: "业余爱好",
        example: "El baile es mi hobby favorito.",
      },
      {
        word: "coleccionar",
        definition: "Acumular objetos de una misma categoría",
        chinese: "收集",
        example: "Colecciono sellos de diferentes países.",
      },
      {
        word: "pintar",
        definition: "Crear imágenes con colores sobre una superficie",
        chinese: "画画",
        example: "Me gusta pintar paisajes al óleo.",
      },
      {
        word: "tocar",
        definition: "Producir música con un instrumento",
        chinese: "演奏",
        example: "Mi hermano sabe tocar la guitarra.",
      },
      {
        word: "jardinería",
        definition: "Actividad de cuidar plantas y flores",
        chinese: "园艺",
        example: "La jardinería relaja mucho.",
      },
      {
        word: "senderismo",
        definition: "Actividad de caminar por rutas naturales",
        chinese: "徒步",
        example: "Los domingos hago senderismo en la montaña.",
      },
      {
        word: "voluntariado",
        definition: "Trabajo sin ánimo de lucro para ayudar a otros",
        chinese: "志愿活动",
        example: "Hago voluntariado en un comedor social.",
      },
      {
        word: "relajarse",
        definition: "Descansar y liberarse del estrés",
        chinese: "放松",
        example: "La música me ayuda a relajarme.",
      },
      {
        word: "entretenimiento",
        definition: "Actividad que divierte y ocupa el tiempo",
        chinese: "娱乐",
        example: "El cine es una forma de entretenimiento.",
      },
    ],
    reading: {
      textType: "descriptivo",
      title: "Aficiones populares entre los jóvenes españoles",
      text: `Los jóvenes españoles de entre quince y veinticinco años tienen muchas aficiones que ocupan su tiempo libre. Según una encuesta reciente, la actividad más popular es escuchar música, seguida de hacer deporte y ver series en plataformas como Netflix.

La música es fundamental para el ocio juvenil. El ochenta por ciento de los jóvenes escucha música todos los días, principalmente a través de Spotify o YouTube. Los géneros más escuchados son el reggaetón, el pop y el rap en español. Muchos también tocan instrumentos: la guitarra es la más popular entre los chicos y el piano entre las chicas.

El deporte también ocupa un lugar importante. El fútbol sigue siendo el rey, pero cada vez más jóvenes practican deportes como el baloncesto, el pádel, el yoga y el boxeo. Los gimnasios han crecido mucho en los últimos años y muchos jóvenes van después de clase o del trabajo.

Las series y el cine son otra afición muy extendida. Los jóvenes españoles ven una media de tres episodios al día. Las series españolas, como "La Casa de Papel" o "Élite", tienen mucho éxito tanto en España como en el extranjero.

Además de estas actividades digitales, hay jóvenes que prefieren aficiones más tradicionales. La fotografía, la pintura, la lectura y la cocina han vuelto a ponerse de moda, especialmente después de la pandemia. Muchos jóvenes descubrieron que hacer pan o plantar un huerto en casa podía ser muy satisfactorio.

Por último, el voluntariado es una afición que crece cada año. Muchos jóvenes dedican parte de su tiempo a ayudar en refugios de animales, comedores sociales o campañas medioambientales. Es una forma de ocupar el tiempo libre que también ayuda a los demás.`,
      questions: [
        {
          id: 1,
          question: "¿Cuál es la afición más popular según la encuesta?",
          options: ["a) Hacer deporte", "b) Ver series", "c) Escuchar música", "d) La fotografía"],
          correctAnswer: 2,
          explanation: 'El texto dice: "la actividad más popular es escuchar música".',
        },
        {
          id: 2,
          question: "¿Qué porcentaje de jóvenes escucha música todos los días?",
          options: ["a) El 50%", "b) El 60%", "c) El 70%", "d) El 80%"],
          correctAnswer: 3,
          explanation: 'El texto dice: "El ochenta por ciento de los jóvenes escucha música todos los días".',
        },
        {
          id: 3,
          question: "¿Cuál es el instrumento más popular entre los chicos?",
          options: ["a) El piano", "b) La batería", "c) La guitarra", "d) El violín"],
          correctAnswer: 2,
          explanation: 'El texto dice: "la guitarra es la más popular entre los chicos".',
        },
        {
          id: 4,
          question: "¿Qué deporte sigue siendo el más practicado?",
          options: ["a) Baloncesto", "b) Pádel", "c) Fútbol", "d) Yoga"],
          correctAnswer: 2,
          explanation: 'El texto dice: "El fútbol sigue siendo el rey".',
        },
        {
          id: 5,
          question: "¿Cuántos episodios ven los jóvenes al día de media?",
          options: ["a) Uno", "b) Dos", "c) Tres", "d) Cuatro"],
          correctAnswer: 2,
          explanation: 'El texto dice: "ven una media de tres episodios al día".',
        },
        {
          id: 6,
          question: "¿Qué series españolas tienen éxito?",
          options: ["a) Juego de Tronos", "b) La Casa de Papel y Élite", "c) Stranger Things", "d) Friends"],
          correctAnswer: 1,
          explanation: 'El texto menciona: "La Casa de Papel" o "Élite".',
        },
        {
          id: 7,
          question: "¿Qué aficiones tradicionales han vuelto a ponerse de moda?",
          options: [
            "a) Solo la fotografía",
            "b) La fotografía, pintura, lectura y cocina",
            "c) Solo la cocina",
            "d) Solo la lectura",
          ],
          correctAnswer: 1,
          explanation:
            'El texto dice: "La fotografía, la pintura, la lectura y la cocina han vuelto a ponerse de moda".',
        },
        {
          id: 8,
          question: "¿Cuándo resurgieron estas aficiones tradicionales?",
          options: [
            "a) Antes de la pandemia",
            "b) Durante la pandemia",
            "c) Después de la pandemia",
            "d) En 2019",
          ],
          correctAnswer: 2,
          explanation: 'El texto dice: "especialmente después de la pandemia".',
        },
        {
          id: 9,
          question: "¿Dónde hacen voluntariado los jóvenes?",
          options: [
            "a) Solo en hospitales",
            "b) En refugios de animales, comedores sociales o campañas medioambientales",
            "c) Solo en escuelas",
            "d) Solo en bibliotecas",
          ],
          correctAnswer: 1,
          explanation:
            'El texto menciona: "refugios de animales, comedores sociales o campañas medioambientales".',
        },
        {
          id: 10,
          question: "¿Qué plataformas musicales usa la mayoría?",
          options: ["a) Solo iTunes", "b) Spotify o YouTube", "c) Solo CDs", "d) Solo radio"],
          correctAnswer: 1,
          explanation: 'El texto dice: "principalmente a través de Spotify o YouTube".',
        },
      ],
    },
    listening: {
      title: "Mis aficiones de fin de semana",
      transcription: `Hola, soy Roberto y os voy a contar cómo suelo pasar los fines de semana. Trabajo de lunes a viernes en una oficina, así que el fin de semana es sagrado para mí.

Los sábados por la mañana, me levanto temprano y voy a jugar al fútbol con mis amigos. Somos un grupo de diez personas que nos conocimos en el instituto. Jugamos en un campo municipal durante una hora y media. No somos muy buenos, pero nos reímos mucho.

Después del fútbol, vuelvo a casa, me ducho y desayuno algo fuerte porque siempre tengo mucha hambre. Luego, dedico dos o tres horas a mi otra pasión: la fotografía. Me gusta salir a la calle con mi cámara y capturar momentos de la ciudad. Mi zona favorita es el centro histórico, donde hay edificios antiguos y gente interesante.

Los sábados por la tarde, normalmente quedo con mi novia. Vamos al cine, a tomar algo en una terraza o simplemente a pasear por el parque. A veces visitamos una exposición o un museo.

Los domingos son más tranquilos. Por la mañana, hago voluntariado en un refugio de perros. Llevo tres años yendo allí. Ayudo a pasear los perros, limpiar sus jaulas y darles de comer. Es una actividad que me llena mucho.

Por la tarde, me quedo en casa. Leo, escucho música o veo alguna serie. Es mi momento de desconectar antes de empezar otra semana de trabajo.

Creo que es importante tener aficiones que te hagan feliz y te desconecten del estrés diario.`,
      questions: [
        {
          id: 1,
          question: "¿Qué hace Roberto los sábados por la mañana?",
          options: ["a) Duerme hasta tarde", "b) Juega al fútbol", "c) Va al cine", "d) Estudia"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Cuántas personas juegan al fútbol con él?",
          options: ["a) Cinco", "b) Ocho", "c) Diez", "d) Doce"],
          correctAnswer: 2,
        },
        {
          id: 3,
          question: "¿Cuánto tiempo juegan al fútbol?",
          options: ["a) Una hora", "b) Una hora y media", "c) Dos horas", "d) Tres horas"],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "¿Cuál es su otra pasión?",
          options: ["a) La pintura", "b) La música", "c) La fotografía", "d) La cocina"],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "¿Cuál es su zona favorita para fotografiar?",
          options: ["a) El parque", "b) El centro histórico", "c) La playa", "d) Las afueras"],
          correctAnswer: 1,
        },
        {
          id: 6,
          question: "¿Qué hace los sábados por la tarde?",
          options: ["a) Trabaja", "b) Estudia", "c) Queda con su novia", "d) Hace deporte"],
          correctAnswer: 2,
        },
        {
          id: 7,
          question: "¿Dónde hace voluntariado los domingos?",
          options: [
            "a) En un hospital",
            "b) En un colegio",
            "c) En un refugio de perros",
            "d) En una biblioteca",
          ],
          correctAnswer: 2,
        },
        {
          id: 8,
          question: "¿Cuánto tiempo lleva haciendo voluntariado?",
          options: ["a) Un año", "b) Dos años", "c) Tres años", "d) Cuatro años"],
          correctAnswer: 2,
        },
        {
          id: 9,
          question: "¿Qué hace los domingos por la tarde?",
          options: ["a) Sale de fiesta", "b) Se queda en casa", "c) Juega al fútbol", "d) Va al cine"],
          correctAnswer: 1,
        },
        {
          id: 10,
          question: "¿Por qué cree importante tener aficiones?",
          options: [
            "a) Para ganar dinero",
            "b) Para conocer gente",
            "c) Para ser feliz y desconectar del estrés",
            "d) Para estudiar mejor",
          ],
          correctAnswer: 2,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mis aficiones",
        description:
          "Escribe sobre tus aficiones. Incluye: qué te gusta hacer en tu tiempo libre, con qué frecuencia lo haces, por qué te gusta.",
        structure: {
          intro: "Presenta tus aficiones principales.",
          body: "Describe cada afición y cuándo la practicas.",
          conclusion: "Di por qué son importantes para ti.",
        },
        connectors: ["En mi tiempo libre", "Me gusta", "Normalmente", "Porque", "Creo que"],
        wordCount: "80-120 palabras",
      },
      optionB: {
        title: "Un fin de semana perfecto",
        description:
          "Escribe cómo sería tu fin de semana perfecto. Incluye: qué harías, con quién, dónde irías.",
        structure: {
          intro: "Presenta cómo sería tu fin de semana ideal.",
          body: "Describe las actividades del sábado y domingo.",
          conclusion: "Di por qué sería perfecto.",
        },
        connectors: [
          "Mi fin de semana perfecto sería",
          "El sábado",
          "El domingo",
          "También",
          "Me encantaría",
        ],
        wordCount: "80-120 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Mis aficiones",
        description:
          "Habla sobre tus aficiones durante 1-2 minutos. Di qué te gusta hacer, con qué frecuencia, con quién y por qué te gusta.",
        connectors: [
          "En mi tiempo libre me gusta",
          "Lo hago",
          "Normalmente",
          "Me relaja porque",
          "Lo mejor es",
        ],
        guideQuestions: [
          "¿Que papel juega en tu vida?",
          "¿Como ha evolucionado?",
          "¿Que habilidades te ha aportado?",
          "¿Que planes tienes?",
        ],
      },
      topic2: {
        title: "El deporte en mi vida",
        description:
          "Habla sobre el deporte que practicas. Di cuál es, desde cuándo lo practicas, con quién y qué beneficios te aporta.",
        connectors: [
          "El deporte que practico es",
          "Empecé hace",
          "Lo practico",
          "Me ayuda a",
          "Creo que es importante",
        ],
        guideQuestions: [
          "¿Como te afecta personalmente?",
          "¿Que diferencias ves con el pasado?",
          "¿Como influye en tu entorno?",
          "¿Que consejo darias?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero queréis hacer algo juntos este fin de semana. Tenéis que decidir qué actividad hacer, a qué hora quedar y qué necesitáis llevar.",
      questions: [
        {
          question: "¿Qué actividad te apetece hacer este fin de semana?",
          help: "Sugiere algo. Usa: Me apetece... / ¿Qué te parece si...?",
          usefulPhrases: [
            "Con sinceridad...",
            "Lanza-te a...",
            "Vislumbra la opcion de...",
            "Se desprende que...",
            "Un acierto seguro es...",
            "El referente principal es...",
          ],
        },
        {
          question: "¿A qué hora quedamos y dónde?",
          help: "Propón hora y lugar. Usa: Podemos quedar a... en...",
          usefulPhrases: [
            "De forma directa...",
            "Olvidate de los miedos y...",
            "Contempla la alternativa de...",
            "Se infiere que...",
            "Una decision inteligente es...",
            "El modelo a seguir es...",
          ],
        },
        {
          question: "¿Qué tenemos que llevar? ¿Necesitamos preparar algo?",
          help: "Planifica lo necesario. Usa: Necesitamos... / Hay que llevar...",
          usefulPhrases: [
            "Sin velos...",
            "Empieza ya a...",
            "Adopta la perspectiva de...",
            "Se deduce claramente que...",
            "Un enfoque ganador es...",
            "El paradigma correcto es...",
          ],
        },
      ],
    },
  },
  {
    id: 11,
    level: "A2",
    theme: "La salud y el cuerpo",
    icon: "Heart",
    vocabulary: [
      {
        word: "cabeza",
        definition: "Parte superior del cuerpo donde está el cerebro",
        chinese: "头",
        example: "Me duele la cabeza.",
      },
      {
        word: "estómago",
        definition: "Órgano donde se digiere la comida",
        chinese: "胃",
        example: "Tengo dolor de estómago.",
      },
      {
        word: "garganta",
        definition: "Parte interna del cuello por donde pasa el aire y la comida",
        chinese: "喉咙",
        example: "Tengo la garganta irritada.",
      },
      {
        word: "resfriado",
        definition: "Enfermedad común con moqueo y estornudos",
        chinese: "感冒",
        example: "Tengo un resfriado fuerte.",
      },
      {
        word: "fiebre",
        definition: "Temperatura corporal alta por enfermedad",
        chinese: "发烧",
        example: "Tengo fiebre, necesito ir al médico.",
      },
      {
        word: "receta",
        definition: "Documento del médico para comprar medicinas",
        chinese: "处方",
        example: "El médico me dio una receta.",
      },
      {
        word: "pastilla",
        definition: "Medicamento en forma pequeña y redonda",
        chinese: "药片",
        example: "Tomo dos pastillas al día.",
      },
      {
        word: "cita",
        definition: "Acuerdo para ver a alguien a una hora determinada",
        chinese: "预约",
        example: "Tengo cita con el doctor a las diez.",
      },
      {
        word: "enfermo/a",
        definition: "Que tiene una enfermedad",
        chinese: "生病的",
        example: "No puedo ir al trabajo porque estoy enfermo.",
      },
      {
        word: "sano/a",
        definition: "Que tiene buena salud",
        chinese: "健康的",
        example: "Comer fruta es muy sano.",
      },
      {
        word: "medicina",
        definition: "Sustancia que cura o alivia una enfermedad",
        chinese: "药",
        example: "La medicina me hace sentir mejor.",
      },
    ],
    reading: {
      textType: "narrativo",
      title: "Una visita al médico",
      text: `El martes pasado me desperté con dolor de cabeza y fiebre. Tenía la garganta irritada y no podía hablar bien. Mi madre me dijo que debía ir al médico.

Llamé a la clínica a las ocho de la mañana para pedir cita. La recepcionista me dijo que podía ver al doctor García a las once. Esperé en casa, tomando té caliente con miel.

A las once menos cuarto llegué a la clínica. Había tres personas en la sala de espera. Un niño pequeño lloraba porque tenía miedo. Una señora mayor leía una revista. Yo me senté en una silla cerca de la ventana.

A las once y cuarto, la enfermera me llamó. Me pesó y tomó la temperatura: treinta y ocho grados. Después me llevó al consultorio del doctor García.

El doctor me preguntó qué síntomas tenía. Le expliqué que me dolía la cabeza, tenía fiebre y la garganta me picaba. Me miró la garganta con una luz pequeña y me escuchó el pecho con un estetoscopio.

"Tiene una infección de garganta", dijo. "Le voy a recetar antibióticos durante siete días. También tome este jarabe para la tos y beba mucha agua."

Fui a la farmacia con la receta. El farmacéutico me dio las pastillas y el jarabe. Me costó quince euros en total. Llegué a casa, tomé la primera pastilla y me fui a la cama. Al día siguiente ya me sentía mejor.`,
      questions: [
        {
          id: 1,
          question: "¿Qué síntomas tenía el narrador?",
          options: [
            "a) Solo dolor de cabeza",
            "b) Dolor de cabeza, fiebre y garganta irritada",
            "c) Solo tos",
            "d) Dolor de estómago",
          ],
          correctAnswer: 1,
          explanation: 'El texto menciona: "dolor de cabeza y fiebre" y "la garganta irritada".',
        },
        {
          id: 2,
          question: "¿A qué hora llamó para pedir cita?",
          options: ["a) A las siete", "b) A las ocho", "c) A las nueve", "d) A las diez"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Llamé a la clínica a las ocho de la mañana".',
        },
        {
          id: 3,
          question: "¿Qué temperatura tenía?",
          options: ["a) 36 grados", "b) 37 grados", "c) 38 grados", "d) 39 grados"],
          correctAnswer: 2,
          explanation: 'El texto dice: "treinta y ocho grados".',
        },
        {
          id: 4,
          question: "¿Qué le diagnosticó el doctor?",
          options: ["a) Un resfriado", "b) Gripe", "c) Infección de garganta", "d) Bronquitis"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Tiene una infección de garganta".',
        },
        {
          id: 5,
          question: "¿Cuántos días debía tomar antibióticos?",
          options: ["a) Cinco días", "b) Siete días", "c) Diez días", "d) Tres días"],
          correctAnswer: 1,
          explanation: 'El texto dice: "antibióticos durante siete días".',
        },
        {
          id: 6,
          question: "¿Qué más le recetó el doctor?",
          options: ["a) Solo pastillas", "b) Jarabe para la tos", "c) Vitaminas", "d) Inyecciones"],
          correctAnswer: 1,
          explanation: 'El texto dice: "tome este jarabe para la tos".',
        },
        {
          id: 7,
          question: "¿Cuánto costó la medicina?",
          options: ["a) Diez euros", "b) Doce euros", "c) Quince euros", "d) Veinte euros"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Me costó quince euros".',
        },
        {
          id: 8,
          question: "¿Cuándo se sintió mejor?",
          options: ["a) Ese mismo día", "b) Al día siguiente", "c) A los tres días", "d) A la semana"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Al día siguiente ya me sentía mejor".',
        },
        {
          id: 9,
          question: "¿Quién le acompañó al médico?",
          options: ["a) Su madre", "b) Su padre", "c) Nadie, fue solo", "d) Su amigo"],
          correctAnswer: 2,
          explanation:
            'El texto indica que fue solo: "Llamé a la clínica", "Fui a la farmacia", "Llegué a casa".',
        },
        {
          id: 10,
          question: "¿Qué tomó mientras esperaba en casa?",
          options: ["a) Café", "b) Té caliente con miel", "c) Agua fría", "d) Zumo"],
          correctAnswer: 1,
          explanation: 'El texto dice: "tomando té caliente con miel".',
        },
      ],
    },
    listening: {
      title: "Consejos para estar sano",
      transcription: `Hola, soy el doctor Hernández y hoy os voy a dar algunos consejos sencillos para manteneros sanos durante todo el año.

Primero, dormir bien es fundamental. Los adultos necesitan entre siete y ocho horas de sueño cada noche. Dormir poco afecta al sistema inmunológico y hace que nos enfermemos más. Intentad acostaros siempre a la misma hora.

Segundo, bebed mucha agua. El cuerpo humano está compuesto en un sesenta por ciento de agua. Debemos beber al menos dos litros de agua al día. El agua ayuda a eliminar toxinas y mantiene la piel hidratada.

Tercero, haced ejercicio regularmente. No hace falta ir al gimnasio todos los días. Con caminar treinta minutos diarios es suficiente. El ejercicio fortalece el corazón y reduce el estrés.

Cuarto, comed fruta y verdura todos los días. Se recomiendan cinco raciones diarias. Las frutas y verduras aportan vitaminas y minerales esenciales para el cuerpo.

Quinto, lavaros las manos frecuentemente. Es la mejor forma de prevenir infecciones. Usad jabón y agua durante al menos veinte segundos.

Por último, no olvidéis las revisiones médicas anuales. Es importante detectar cualquier problema de salud lo antes posible.`,
      questions: [
        {
          id: 1,
          question: "¿Cuántas horas de sueño necesitan los adultos?",
          options: ["a) 5-6 horas", "b) 7-8 horas", "c) 9-10 horas", "d) 10-12 horas"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Qué porcentaje del cuerpo es agua?",
          options: ["a) 40%", "b) 50%", "c) 60%", "d) 70%"],
          correctAnswer: 2,
        },
        {
          id: 3,
          question: "¿Cuántos litros de agua hay que beber al día?",
          options: ["a) Un litro", "b) Dos litros", "c) Tres litros", "d) Cuatro litros"],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "¿Cuánto ejercicio se recomienda?",
          options: ["a) Una hora", "b) Treinta minutos diarios", "c) Dos horas", "d) No es necesario"],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "¿Cuántas raciones de fruta y verdura se recomiendan?",
          options: ["a) Dos", "b) Tres", "c) Cuatro", "d) Cinco"],
          correctAnswer: 3,
        },
        {
          id: 6,
          question: "¿Cuánto tiempo hay que lavarse las manos?",
          options: ["a) 5 segundos", "b) 10 segundos", "c) 20 segundos", "d) 1 minuto"],
          correctAnswer: 2,
        },
        {
          id: 7,
          question: "¿Qué ejercicio menciona el doctor?",
          options: ["a) Ir al gimnasio", "b) Correr", "c) Caminar", "d) Nadar"],
          correctAnswer: 2,
        },
        {
          id: 8,
          question: "¿Por qué es importante dormir bien?",
          options: [
            "a) Para estudiar mejor",
            "b) Para el sistema inmunológico",
            "c) Para trabajar más",
            "d) Para perder peso",
          ],
          correctAnswer: 1,
        },
        {
          id: 9,
          question: "¿Con qué hay que lavarse las manos?",
          options: ["a) Solo agua", "b) Jabón y agua", "c) Gel antibacterial", "d) Alcohol"],
          correctAnswer: 1,
        },
        {
          id: 10,
          question: "¿Qué tipo de revisiones recomienda?",
          options: ["a) Mensuales", "b) Trimestrales", "c) Semestrales", "d) Anuales"],
          correctAnswer: 3,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Un día que estuve enfermo",
        description:
          "Escribe sobre un día que estuviste enfermo. Incluye: qué te dolía, qué hiciste, si fuiste al médico.",
        structure: {
          intro: "Di cuándo estuviste enfermo.",
          body: "Describe los síntomas y lo que hiciste.",
          conclusion: "Di cómo te curaste.",
        },
        connectors: ["El", "Me desperté con", "Fui al médico", "Me recetó", "Al final"],
        wordCount: "80-120 palabras",
      },
      optionB: {
        title: "Cómo mantenerse sano",
        description:
          "Escribe consejos para mantenerse sano. Incluye: qué comer, qué ejercicio hacer, otros hábitos saludables.",
        structure: {
          intro: "Presenta la importancia de la salud.",
          body: "Describe hábitos saludables.",
          conclusion: "Resume los consejos más importantes.",
        },
        connectors: ["Es importante", "Primero", "También", "Además", "En conclusión"],
        wordCount: "80-120 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Describe cómo te mantienes sano",
        description:
          "Habla sobre tus hábitos saludables durante 1-2 minutos. Di qué deporte haces, qué comes, cuánto duermes.",
        connectors: ["Para mantenerme sano", "Hago ejercicio", "Como", "Duermo", "Creo que"],
        guideQuestions: [
          "¿Cual es tu experiencia personal con este tema?",
          "¿Como afecta a tu dia a dia?",
          "¿Que opinan tus familiares o amigos?",
          "¿Que cambiarias o mejorarias?",
        ],
      },
      topic2: {
        title: "Una vez que estuviste enfermo",
        description:
          "Habla sobre una vez que estuviste enfermo. Di qué te pasó, qué síntomas tenías, qué hiciste y cuánto duró.",
        connectors: ["Hace", "Me puse enfermo", "Tenía", "Fui a", "Me recuperé"],
        guideQuestions: [
          "¿Cuando empezaste a interesarte por esto?",
          "¿Que aspectos te resultan mas importantes?",
          "¿Como ha evolucionado con el tiempo?",
          "¿Que consejo darias a alguien en esta situacion?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero sois amigos. Uno de vosotros está enfermo y el otro le da consejos para mejorar.",
      questions: [
        {
          question: "¿Qué síntomas tienes? ¿Cuándo empezaste a sentirte mal?",
          help: "Describe los síntomas. Usa: Me duele... / Tengo... desde...",
          usefulPhrases: [
            "Te recomiendo...",
            "Si te gusta esto, deberias probar...",
            "Lo mejor de este sitio es...",
            "Evita ir los fines de semana porque esta lleno.",
            "Personalmente, yo prefiero...",
            "Un truco es...",
          ],
        },
        {
          question: "¿Has tomado algo? ¿Has ido al médico?",
          help: "Pregunta y aconseja. Usa: ¿Has probado...? / Deberías...",
          usefulPhrases: [
            "Creo que la mejor opcion es...",
            "En mi opinion, deberias considerar...",
            "Una alternativa interesante seria...",
            "Ten en cuenta que...",
            "Yo en tu lugar...",
            "Lo importante es...",
          ],
        },
        {
          question: "¿Qué te preparo para ayudarte a sentirte mejor?",
          help: "Ofrece ayuda. Usa: Te puedo preparar... / ¿Quieres que te traiga...?",
          usefulPhrases: [
            "Segun mi experiencia...",
            "Algo que funciona muy bien es...",
            "Te sugiero que...",
            "No olvides que...",
            "Un consejo practico es...",
            "La clave esta en...",
          ],
        },
      ],
    },
  },
  {
    id: 12,
    level: "A2",
    theme: "El trabajo y profesiones",
    icon: "Briefcase",
    vocabulary: [
      {
        word: "trabajo",
        definition: "Actividad que se hace para ganar dinero",
        chinese: "工作",
        example: "Mi trabajo empieza a las nueve.",
      },
      {
        word: "empresa",
        definition: "Compañía u organización que produce bienes o servicios",
        chinese: "公司",
        example: "Trabajo en una empresa de tecnología.",
      },
      {
        word: "oficina",
        definition: "Lugar donde se trabaja con papeles y ordenadores",
        chinese: "办公室",
        example: "Mi oficina está en el centro.",
      },
      {
        word: "jefe/a",
        definition: "Persona que dirige a otros en el trabajo",
        chinese: "老板",
        example: "Mi jefa es muy exigente pero justa.",
      },
      {
        word: "compañero/a",
        definition: "Persona con la que se trabaja",
        chinese: "同事",
        example: "Mis compañeros son muy simpáticos.",
      },
      {
        word: "sueldo",
        definition: "Dinero que se recibe por el trabajo",
        chinese: "工资",
        example: "Mi sueldo es de mil quinientos euros.",
      },
      {
        word: "horario",
        definition: "Tiempo establecido para trabajar",
        chinese: "时间表",
        example: "Mi horario es de ocho a cinco.",
      },
      {
        word: "reunión",
        definition: "Encuentro de varias personas para hablar de trabajo",
        chinese: "会议",
        example: "Tenemos una reunión a las diez.",
      },
      {
        word: "currículum",
        definition: "Documento con la experiencia y estudios de una persona",
        chinese: "简历",
        example: "Envié mi currículum a diez empresas.",
      },
      {
        word: "entrevista",
        definition: "Conversación para evaluar a un candidato",
        chinese: "面试",
        example: "Tengo una entrevista mañana.",
      },
      {
        word: "jubilarse",
        definition: "Dejar de trabajar por haber llegado a cierta edad",
        chinese: "退休",
        example: "Mi padre se jubiló el año pasado.",
      },
    ],
    reading: {
      textType: "narrativo",
      title: "Mi primer trabajo en España",
      text: `Cuando llegué a Madrid hace dos años, necesitaba encontrar trabajo urgentemente. Tenía un nivel B1 de español y experiencia como recepcionista en China.

Primero, actualicé mi currículum en español. Un amigo español me ayudó a corregirlo. Después, lo envié a muchas empresas por internet. También me registré en varias páginas de empleo.

Después de dos semanas, una empresa de hostelería me llamó para una entrevista. Era un puesto de recepcionista en un hotel del centro. Me puse muy nervioso el día de la entrevista.

La entrevistadora, doña Rosa, fue muy amable. Me preguntó sobre mi experiencia, mis estudios y por qué quería trabajar en España. También me hizo una prueba de español: tenía que atender una llamada telefónica simulada.

Tres días después, me llamaron para decirme que había conseguido el puesto. Mi sueldo era de mil doscientos euros al mes, con contrato indefinido. Mi horario era de ocho de la mañana a cuatro de la tarde, con media hora para comer.

Ahora llevo dos años en el hotel. He conocido a compañeros maravillosos y he mejorado mucho mi español. El jefe de recepción, Carlos, me ha enseñado mucho sobre el sector hotelero.

Mi consejo para otros inmigrantes es: no os rindáis. Al principio parece imposible, pero con esfuerzo y paciencia se consigue.`,
      questions: [
        {
          id: 1,
          question: "¿Cuánto tiempo hace que llegó el narrador a Madrid?",
          options: ["a) Un año", "b) Dos años", "c) Tres años", "d) Seis meses"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Cuando llegué a Madrid hace dos años".',
        },
        {
          id: 2,
          question: "¿Qué experiencia tenía en China?",
          options: ["a) Camarero", "b) Recepcionista", "c) Guía turístico", "d) Profesor"],
          correctAnswer: 1,
          explanation: 'El texto dice: "experiencia como recepcionista en China".',
        },
        {
          id: 3,
          question: "¿Quién le ayudó con el currículum?",
          options: ["a) Su profesor", "b) Un amigo español", "c) Su hermano", "d) Nadie"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Un amigo español me ayudó a corregirlo".',
        },
        {
          id: 4,
          question: "¿En qué sector trabajaba la empresa?",
          options: ["a) Tecnología", "b) Hostelería", "c) Educación", "d) Construcción"],
          correctAnswer: 1,
          explanation: 'El texto dice: "una empresa de hostelería".',
        },
        {
          id: 5,
          question: "¿Quién le entrevistó?",
          options: ["a) Carlos", "b) Doña Rosa", "c) Un hombre", "d) No lo dice"],
          correctAnswer: 1,
          explanation: 'El texto dice: "La entrevistadora, doña Rosa".',
        },
        {
          id: 6,
          question: "¿Cuál era su sueldo?",
          options: ["a) Mil euros", "b) Mil doscientos euros", "c) Mil quinientos euros", "d) Dos mil euros"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Mi sueldo era de mil doscientos euros".',
        },
        {
          id: 7,
          question: "¿Cuál era su horario?",
          options: ["a) 9 a 5", "b) 8 a 4", "c) 10 a 6", "d) 7 a 3"],
          correctAnswer: 1,
          explanation: 'El texto dice: "de ocho de la mañana a cuatro de la tarde".',
        },
        {
          id: 8,
          question: "¿Cuánto tiempo tenía para comer?",
          options: ["a) Quince minutos", "b) Media hora", "c) Una hora", "d) Dos horas"],
          correctAnswer: 1,
          explanation: 'El texto dice: "media hora para comer".',
        },
        {
          id: 9,
          question: "¿Quién le enseñó sobre el sector hotelero?",
          options: ["a) Doña Rosa", "b) Carlos", "c) Su amigo", "d) Su jefe"],
          correctAnswer: 1,
          explanation: 'El texto dice: "El jefe de recepción, Carlos, me ha enseñado mucho".',
        },
        {
          id: 10,
          question: "¿Qué tipo de contrato tenía?",
          options: ["a) Temporal", "b) Indefinido", "c) Por horas", "d) De prácticas"],
          correctAnswer: 1,
          explanation: 'El texto dice: "contrato indefinido".',
        },
      ],
    },
    listening: {
      title: "Un día de trabajo de María",
      transcription: `Soy María y trabajo como enfermera en un hospital de Barcelona. Os voy a contar cómo es un día normal en mi trabajo.

Me despierto a las cinco y media de la mañana. Desayuno rápido, me visto con mi uniforme blanco y salgo de casa a las seis y cuarto. Cojo el metro porque el hospital queda lejos de mi casa.

Llego al hospital a las siete. El turno de mañana empieza a las siete y termina a las tres. Lo primero que hago es pasar por la sala de enfermeras para recibir la información del turno de noche. Me dicen cómo están los pacientes y si ha pasado algo importante.

Después, empiezo mi ronda. Tengo seis pacientes a mi cargo. Les tomo la tensión arterial, la temperatura y les doy las medicinas. Algunos pacientes están graves y necesitan más atención.

A las diez, el médico hace su ronda y yo le acompaño. Él revisa a cada paciente y yo anoto sus indicaciones. A veces hay que preparar a los pacientes para pruebas o cirugías.

El mediodía es el momento más tranquilo. Los pacientes comen y yo aprovecho para descansar un poco en la sala de enfermeras. Comí mi tupper y charlo con mis compañeras.

Por la tarde, sigo con las medicinas y atiendo a los familiares que vienen a visitar. A las tres, llega el turno de tarde y yo me voy a casa. Llego a las cuatro, descanso un rato y a las siete ceno con mi familia.

Es un trabajo duro y a veces triste, pero me gusta porque ayudo a la gente. Es muy gratificante ver a un paciente mejorarse y volver a casa.`,
      questions: [
        {
          id: 1,
          question: "¿A qué hora se despierta María?",
          options: ["a) A las cinco", "b) A las cinco y media", "c) A las seis", "d) A las siete"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Cómo va al trabajo?",
          options: ["a) En coche", "b) En autobús", "c) En metro", "d) A pie"],
          correctAnswer: 2,
        },
        {
          id: 3,
          question: "¿Cuándo empieza su turno?",
          options: ["a) A las seis", "b) A las siete", "c) A las ocho", "d) A las nueve"],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "¿Cuántos pacientes tiene a su cargo?",
          options: ["a) Cuatro", "b) Cinco", "c) Seis", "d) Siete"],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "¿Qué hace en su ronda?",
          options: [
            "a) Solo limpia",
            "b) Toma tensión, temperatura y da medicinas",
            "c) Solo habla con los pacientes",
            "d) Opera",
          ],
          correctAnswer: 1,
        },
        {
          id: 6,
          question: "¿A qué hora hace el médico su ronda?",
          options: ["a) A las nueve", "b) A las diez", "c) A las once", "d) A las doce"],
          correctAnswer: 1,
        },
        {
          id: 7,
          question: "¿Qué come María al mediodía?",
          options: ["a) En el comedor del hospital", "b) Su tupper", "c) Nada", "d) Un bocadillo"],
          correctAnswer: 1,
        },
        {
          id: 8,
          question: "¿Cuándo termina su turno?",
          options: ["a) A las dos", "b) A las tres", "c) A las cuatro", "d) A las cinco"],
          correctAnswer: 1,
        },
        {
          id: 9,
          question: "¿Qué le gusta de su trabajo?",
          options: ["a) El sueldo", "b) Los horarios", "c) Ayudar a la gente", "d) El hospital"],
          correctAnswer: 2,
        },
        {
          id: 10,
          question: "¿A qué hora cena María?",
          options: ["a) A las seis", "b) A las siete", "c) A las ocho", "d) A las nueve"],
          correctAnswer: 1,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi trabajo ideal",
        description:
          "Escribe sobre tu trabajo ideal. Incluye: qué sería, dónde trabajarías, qué harías, por qué te gusta.",
        structure: {
          intro: "Presenta tu trabajo ideal.",
          body: "Describe las actividades y condiciones.",
          conclusion: "Di por qué te gustaría ese trabajo.",
        },
        connectors: ["Mi trabajo ideal sería", "Me gustaría", "Trabajaría en", "Haría", "Porque"],
        wordCount: "80-120 palabras",
      },
      optionB: {
        title: "Un día en mi trabajo",
        description:
          "Escribe sobre un día normal en tu trabajo o el trabajo de alguien de tu familia. Incluye: horario, actividades, compañeros.",
        structure: {
          intro: "Presenta el trabajo.",
          body: "Describe un día típico.",
          conclusion: "Di qué te gusta de ese trabajo.",
        },
        connectors: ["Mi/Mi padre trabaja en", "Empieza a", "Después", "Sus compañeros son", "En conclusión"],
        wordCount: "80-120 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Describe tu trabajo",
        description:
          "Habla sobre tu trabajo durante 1-2 minutos. Di qué haces, dónde trabajas, con quién trabajas y si te gusta.",
        connectors: [
          "Trabajo como/en",
          "Mi trabajo consiste en",
          "Trabajo con",
          "Lo que más me gusta es",
          "En el futuro",
        ],
        guideQuestions: [
          "¿Por que crees que este tema es relevante?",
          "¿Has tenido alguna experiencia relacionada?",
          "¿Como influye en la sociedad actual?",
          "¿Que futuro le ves a este tema?",
        ],
      },
      topic2: {
        title: "Mi profesión ideal",
        description:
          "Habla sobre la profesión que te gustaría tener. Di qué es, por qué te interesa y qué tendrías que estudiar.",
        connectors: [
          "Mi profesión ideal es",
          "Me interesa porque",
          "Para serlo necesito",
          "Espero",
          "Creo que",
        ],
        guideQuestions: [
          "¿Cual es tu relacion personal con esto?",
          "¿Que ventajas e inconvenientes ves?",
          "¿Como lo viven las personas de tu entorno?",
          "¿Crees que va a cambiar en el futuro?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero estáis buscando trabajo. Tenéis que hablar de vuestra experiencia, qué tipo de trabajo buscáis y cómo preparar una entrevista.",
      questions: [
        {
          question: "¿Qué tipo de trabajo buscas? ¿Tienes experiencia?",
          help: "Habla de tu experiencia. Usa: He trabajado como... / Busco un puesto de...",
          usefulPhrases: [
            "Desde mi punto de vista...",
            "Me parece que lo mejor seria...",
            "Una buena idea podria ser...",
            "Recuerda que...",
            "Si fuera tu, yo...",
            "Lo fundamental es...",
          ],
        },
        {
          question: "¿Cómo te preparas para una entrevista de trabajo?",
          help: "Da consejos. Usa: Es importante... / Hay que...",
          usefulPhrases: [
            "Basandome en mi experiencia...",
            "Lo que a mi me funciona es...",
            "Prueba a...",
            "No te olvides de...",
            "Un tip muy util es...",
            "El secreto esta en...",
          ],
        },
        {
          question: "¿Qué es más importante: el sueldo o el ambiente de trabajo?",
          help: "Da tu opinión. Usa: Creo que... porque... / Para mí, lo más importante es...",
          usefulPhrases: [
            "A mi modo de ver...",
            "Considero que deberias...",
            "Podrias intentar...",
            "Es importante recordar...",
            "Yo te aconsejaria que...",
            "Lo esencial es...",
          ],
        },
      ],
    },
  },
  {
    id: 13,
    level: "A2",
    theme: "Las fiestas y tradiciones",
    icon: "PartyPopper",
    vocabulary: [
      {
        word: "fiesta",
        definition: "Celebración con música, comida y baile",
        chinese: "节日/派对",
        example: "En España hay muchas fiestas tradicionales.",
      },
      {
        word: "tradición",
        definition: "Costumbre que se transmite de generación en generación",
        chinese: "传统",
        example: "Es una tradición muy antigua.",
      },
      {
        word: "celebrar",
        definition: "Hacer una fiesta por algo especial",
        chinese: "庆祝",
        example: "Celebramos el cumpleaños con una tarta.",
      },
      {
        word: "fuegos artificiales",
        definition: "Luces y explosiones de colores en el cielo",
        chinese: "烟花",
        example: "Los fuegos artificiales fueron espectaculares.",
      },
      {
        word: "desfile",
        definition: "Marcha de personas por la calle en celebración",
        chinese: "游行",
        example: "El desfile de Navidad fue muy bonito.",
      },
      {
        word: "disfraz",
        definition: "Ropa especial para parecer otra persona en fiestas",
        chinese: "服装/装扮",
        example: "Mi disfraz de carnaval era de pirata.",
      },
      {
        word: "comida típica",
        definition: "Plato tradicional de una región o país",
        chinese: "传统食物",
        example: "La paella es la comida típica de Valencia.",
      },
      {
        word: "música tradicional",
        definition: "Música propia de una cultura",
        chinese: "传统音乐",
        example: "Escuchamos música tradicional durante la fiesta.",
      },
      {
        word: "feria",
        definition: "Fiesta típica andaluza con casetas y flamenco",
        chinese: "集市/庙会",
        example: "La feria de Sevilla es muy famosa.",
      },
      {
        word: "Nochevieja",
        definition: "La noche del treinta y uno de diciembre",
        chinese: "除夕夜",
        example: "En Nochevieja comemos doce uvas.",
      },
      {
        word: "Semana Santa",
        definition: "Celebración religiosa en la semana antes de Pascua",
        chinese: "圣周",
        example: "La Semana Santa en Sevilla es impresionante.",
      },
    ],
    reading: {
      textType: "descriptivo",
      title: "Las Fallas de Valencia",
      text: `Las Fallas son la fiesta más importante de Valencia. Se celebran cada año del quince al diecinueve de marzo en honor a San José, el patrón de los carpinteros. Durante estas fechas, la ciudad se llena de luz, color, música y polvora.

El elemento principal de las Fallas son los monumentos, llamados "ninots". Son figuras enormes hechas de cartón y madera que representan escenas satíricas sobre la actualidad. Los "falleros" trabajan todo el año para construir estos monumentos. Cada barrio de Valencia tiene su propia falla.

Durante la semana fallera, hay desfiles diarios con bandas de música y falleros vestidos con trajes tradicionales valencianos. Las mujeres llevan el "traje de fallera", un vestido elegante con bordados. También hay fuegos artificiales cada noche a las doce en punto.

Una de las tradiciones más curiosas es la "mascletà". Es un espectáculo de ruido y polvora que se hace en la plaza del Ayuntamiento a las dos de la tarde. Suena como cien mil petardos explotando al mismo tiempo. Para los valencianos, el ruido es música.

La fiesta termina la noche del diecinueve de marzo con la "Cremà". Todos los monumentos se queman, excepto un "ninot" que elige el público y se salva. Es una noche emotiva: la gente llora mientras las fallas arden.

Las Fallas fueron declaradas Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO en dos mil dieciséis. Atraen a más de un millón de visitantes cada año.`,
      questions: [
        {
          id: 1,
          question: "¿Cuándo se celebran las Fallas?",
          options: ["a) En enero", "b) En febrero", "c) Del 15 al 19 de marzo", "d) En abril"],
          correctAnswer: 2,
          explanation: 'El texto dice: "del quince al diecinueve de marzo".',
        },
        {
          id: 2,
          question: "¿A quién se celebran?",
          options: ["a) A la Virgen", "b) A San José", "c) A Santiago", "d) A Santa Teresa"],
          correctAnswer: 1,
          explanation: 'El texto dice: "en honor a San José".',
        },
        {
          id: 3,
          question: "¿De qué están hechos los ninots?",
          options: ["a) De piedra", "b) De metal", "c) De cartón y madera", "d) De plástico"],
          correctAnswer: 2,
          explanation: 'El texto dice: "hechas de cartón y madera".',
        },
        {
          id: 4,
          question: "¿Qué representan los ninots?",
          options: [
            "a) Escenas religiosas",
            "b) Escenas satíricas sobre la actualidad",
            "c) Historias antiguas",
            "d) Cuentos de hadas",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "representan escenas satíricas sobre la actualidad".',
        },
        {
          id: 5,
          question: "¿Cuántas fallas hay en Valencia?",
          options: ["a) Solo una", "b) Cinco", "c) Una por barrio", "d) Diez"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Cada barrio de Valencia tiene su propia falla".',
        },
        {
          id: 6,
          question: "¿Qué es la mascletà?",
          options: [
            "a) Un desfile",
            "b) Un espectáculo de ruido y pólvora",
            "c) Un concierto",
            "d) Una comida",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "un espectáculo de ruido y pólvora".',
        },
        {
          id: 7,
          question: "¿Cuándo se hace la mascletà?",
          options: [
            "a) A las diez de la mañana",
            "b) A las dos de la tarde",
            "c) A las seis de la tarde",
            "d) A medianoche",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "a las dos de la tarde".',
        },
        {
          id: 8,
          question: "¿Qué es la Cremà?",
          options: ["a) Un concierto", "b) Cuando queman los monumentos", "c) Un desfile", "d) Una cena"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Todos los monumentos se queman".',
        },
        {
          id: 9,
          question: "¿Cuándo fueron declaradas Patrimonio de la UNESCO?",
          options: ["a) 2010", "b) 2014", "c) 2016", "d) 2018"],
          correctAnswer: 2,
          explanation: 'El texto dice: "en dos mil dieciséis".',
        },
        {
          id: 10,
          question: "¿Cuántos visitantes atraen cada año?",
          options: ["a) Cien mil", "b) Medio millón", "c) Más de un millón", "d) Dos millones"],
          correctAnswer: 2,
          explanation: 'El texto dice: "más de un millón de visitantes".',
        },
      ],
    },
    listening: {
      title: "Navidad en mi familia",
      transcription: `Hola, soy Ana y os voy a contar cómo celebramos la Navidad en mi familia española.

Para nosotros, la Navidad empieza el veintidós de diciembre con la lotería. Todo el país está pendiente del número premiado. En mi casa, compramos lotería entre todos los vecinos del edificio. Si toca, ¡celebramos en grande!

La Nochebuena, el veinticuatro de diciembre, es la cena más importante. Toda la familia se reúne en casa de mis abuelos. Mi abuela prepara el pavo asado, mariscos y turrón para el postre. Antes de cenar, tomamos champán y brindamos por la familia.

A las doce de la noche, los niños abren algunos regalos, pero los principales llegan el seis de enero, con los Reyes Magos. El veinticinco es un día tranquilo: comemos las sobras de la cena y jugamos a juegos de mesa en familia.

El treinta y uno de diciembre, en Nochevieja, comemos las doce uvas con las campanadas. Es una tradición muy española: una uva por cada campanada. Luego brindamos con cava y salimos a celebrar hasta el amanecer.

Lo mejor de la Navidad para mí es pasar tiempo con la familia. El año pasado, mi primo vino desde Argentina y fue una Navidad inolvidable.`,
      questions: [
        {
          id: 1,
          question: "¿Cuándo empieza la Navidad para la familia de Ana?",
          options: [
            "a) El 1 de diciembre",
            "b) El 22 de diciembre con la lotería",
            "c) El 24 de diciembre",
            "d) El 6 de enero",
          ],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Dónde cenan en Nochebuena?",
          options: [
            "a) En un restaurante",
            "b) En casa de los abuelos",
            "c) En casa de Ana",
            "d) En casa de un tío",
          ],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "¿Qué come la abuela?",
          options: ["a) Pavo, mariscos y turrón", "b) Paella", "c) Pescado", "d) Cordero"],
          correctAnswer: 0,
        },
        {
          id: 4,
          question: "¿Cuándo abren los niños los regalos principales?",
          options: [
            "a) El 24 de diciembre",
            "b) El 25 de diciembre",
            "c) El 6 de enero",
            "d) El 31 de diciembre",
          ],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "¿Quién trae los regalos?",
          options: ["a) Papá Noel", "b) Los Reyes Magos", "c) Los abuelos", "d) Los padres"],
          correctAnswer: 1,
        },
        {
          id: 6,
          question: "¿Qué comen en Nochevieja?",
          options: ["a) Uvas", "b) Manzanas", "c) Peras", "d) Plátanos"],
          correctAnswer: 0,
        },
        {
          id: 7,
          question: "¿Cuántas uvas comen?",
          options: ["a) Una", "b) Seis", "c) Doce", "d) Veinte"],
          correctAnswer: 2,
        },
        {
          id: 8,
          question: "¿Qué beben después de las uvas?",
          options: ["a) Vino", "b) Cerveza", "c) Cava", "d) Agua"],
          correctAnswer: 2,
        },
        {
          id: 9,
          question: "¿Qué hacen el 25 de diciembre?",
          options: ["a) Trabajan", "b) Juegan a juegos de mesa", "c) Van de compras", "d) Estudian"],
          correctAnswer: 1,
        },
        {
          id: 10,
          question: "¿Por qué fue inolvidable la Navidad del año pasado?",
          options: [
            "a) Porque ganaron la lotería",
            "b) Porque vino su primo de Argentina",
            "c) Porque compraron muchos regalos",
            "d) Porque viajaron",
          ],
          correctAnswer: 1,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi fiesta favorita",
        description:
          "Escribe sobre tu fiesta favorita. Incluye: cuál es, cuándo se celebra, cómo la celebras, por qué te gusta.",
        structure: {
          intro: "Presenta tu fiesta favorita.",
          body: "Describe cómo se celebra y qué haces.",
          conclusion: "Explica por qué es especial para ti.",
        },
        connectors: ["Mi fiesta favorita es", "Se celebra", "Normalmente", "Lo mejor es", "Me encanta"],
        wordCount: "80-120 palabras",
      },
      optionB: {
        title: "Tradiciones de mi país",
        description:
          "Escribe sobre una tradición de tu país. Incluye: qué tradición es, cuándo se hace, qué significa.",
        structure: {
          intro: "Presenta la tradición.",
          body: "Describe qué se hace y cuándo.",
          conclusion: "Explica por qué es importante.",
        },
        connectors: [
          "En mi país",
          "Es una tradición",
          "Se celebra",
          "Durante esta fiesta",
          "Es importante porque",
        ],
        wordCount: "80-120 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Fiestas tradicionales",
        description:
          "Habla sobre una fiesta tradicional de España o de tu país durante 1-2 minutos. Di cuándo es, qué se celebra, qué se hace y qué comes.",
        connectors: [
          "La fiesta de",
          "Se celebra",
          "Durante esta fiesta",
          "Lo más especial es",
          "A mí me gusta",
        ],
        guideQuestions: [
          "¿Como te enteraste de este tema por primera vez?",
          "¿Que es lo que mas te llama la atencion?",
          "¿Has vivido alguna situacion parecida?",
          "¿Que soluciones propondrias?",
        ],
      },
      topic2: {
        title: "Celebraciones personales",
        description:
          "Habla sobre cómo celebras tu cumpleaños o una fiesta familiar importante. Di qué haces, con quién y qué comes.",
        connectors: [
          "Yo celebro",
          "Normalmente",
          "Mis amigos/familia",
          "Comemos",
          "Es un día especial porque",
        ],
        guideQuestions: [
          "¿Que papel juega esto en tu vida cotidiana?",
          "¿Crees que todo el mundo piensa igual?",
          "¿Que recuerdos tienes relacionados?",
          "¿Como te gustaria que fuera?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero tenéis que organizar una fiesta sorpresa para un amigo común. Tenéis que decidir cuándo, dónde y qué preparar.",
      questions: [
        {
          question: "¿Cuándo hacemos la fiesta? ¿Dónde?",
          help: "Propón fecha y lugar. Usa: ¿Qué te parece si...? / Podemos hacerla en...",
          usefulPhrases: [
            "En mi caso particular...",
            "Lo que mejor resultado me ha dado es...",
            "Intenta...",
            "Ten presente que...",
            "Un consejo que doy siempre es...",
            "El truco consiste en...",
          ],
        },
        {
          question: "¿Qué tipo de fiesta es? ¿Qué comida y bebida preparamos?",
          help: "Planifica la comida. Usa: Podemos preparar... / También podemos...",
          usefulPhrases: [
            "Pienso que lo mas acertado es...",
            "Te animo a que pruebes...",
            "Otra opcion interesante es...",
            "No subestimes...",
            "Mi recomendacion seria...",
            "Lo crucial es...",
          ],
        },
        {
          question: "¿A quién invitamos? ¿Cómo será la sorpresa?",
          help: "Organiza los invitados. Usa: Invitemos a... / La sorpresa puede ser...",
          usefulPhrases: [
            "Por mi experiencia...",
            "Algo que nunca falla es...",
            "Quizas deberias...",
            "Es fundamental que...",
            "Una estrategia efectiva es...",
            "La cuestion es...",
          ],
        },
      ],
    },
  },
  {
    id: 14,
    level: "A2",
    theme: "La tecnología básica",
    icon: "Smartphone",
    vocabulary: [
      {
        word: "móvil",
        definition: "Teléfono portátil con pantalla táctil",
        chinese: "手机",
        example: "Siempre llevo el móvil en el bolsillo.",
      },
      {
        word: "ordenador",
        definition: "Máquina electrónica para procesar información",
        chinese: "电脑",
        example: "Trabajo con el ordenador ocho horas al día.",
      },
      {
        word: "internet",
        definition: "Red mundial de comunicación de ordenadores",
        chinese: "互联网",
        example: "Necesito internet para trabajar.",
      },
      {
        word: "contraseña",
        definition: "Palabra secreta para acceder a una cuenta",
        chinese: "密码",
        example: "No olvides tu contraseña.",
      },
      {
        word: "aplicación",
        definition: "Programa que se usa en el móvil u ordenador",
        chinese: "应用程序",
        example: "Descargué una aplicación para aprender idiomas.",
      },
      {
        word: "redes sociales",
        definition: "Plataformas online para compartir contenido y conectar con gente",
        chinese: "社交网络",
        example: "Uso las redes sociales para hablar con amigos.",
      },
      {
        word: "wifi",
        definition: "Conexión inalámbrica a internet",
        chinese: "无线网络",
        example: "¿Cuál es la contraseña del wifi?",
      },
      {
        word: "cargador",
        definition: "Aparato para cargar la batería de un dispositivo",
        chinese: "充电器",
        example: "Necesito un cargador para el móvil.",
      },
      {
        word: "pantalla",
        definition: "Superficie donde se ve la información del ordenador o móvil",
        chinese: "屏幕",
        example: "La pantalla de mi móvil está rota.",
      },
      {
        word: "correo electrónico",
        definition: "Sistema para enviar mensajes por internet",
        chinese: "电子邮件",
        example: "Te envié un correo electrónico ayer.",
      },
      {
        word: "descargar",
        definition: "Copiar archivos de internet al ordenador o móvil",
        chinese: "下载",
        example: "Voy a descargar una película.",
      },
    ],
    reading: {
      textType: "narrativo",
      title: "Mi abuela aprende a usar el móvil",
      text: `Mi abuela Carmen tiene setenta y ocho años. Hasta el año pasado, usaba un teléfono antiguo que solo servía para llamar. Pero un día, sus nietos le regalaron un smartphone para su cumpleaños.

Al principio, Carmen estaba asustada. "Yo no entiendo de tecnología", decía siempre. La pantalla táctil le parecía magia. Cada vez que tocaba algo, abría aplicaciones sin querer y se perdía.

Pero Carmen es una mujer valiente. Empezó con lo básico: aprender a desbloquear el móvil con su huella dactilar. Después, aprendió a hacer llamadas y a guardar contactos. Escribía con un dedo, muy despacio, pero no se rendía.

Su nieto pequeño, Pablo, le enseñó a usar WhatsApp. Fue un momento histórico: Carmen envió su primer mensaje a toda la familia. Decía: "Hola, soy la abuela. Ya sé usar el móvil." Todos respondieron con emojis de corazón.

Después vino el reto más grande: las videollamadas. Quería ver a su nieta que vive en Londres. Pablo le explicó paso a paso. La primera vez, Carmen tenía el móvil al revés y solo se veía su techo. Pero a la segunda, ¡lo consiguió! Hablaron media hora.

Ahora, Carmen no puede vivir sin su móvil. Lee las noticias por la mañana, mira fotos de sus nietos en Instagram y hasta juega al solitario. Su frase favorita ahora es: "La tecnología no es tan difícil, solo hay que tener paciencia."`,
      questions: [
        {
          id: 1,
          question: "¿Cuántos años tiene la abuela Carmen?",
          options: ["a) Sesenta y ocho", "b) Setenta y ocho", "c) Ochenta y ocho", "d) Setenta"],
          correctAnswer: 1,
          explanation: 'El texto dice: "setenta y ocho años".',
        },
        {
          id: 2,
          question: "¿Qué le regalaron para su cumpleaños?",
          options: ["a) Un ordenador", "b) Un smartphone", "c) Una tablet", "d) Un reloj"],
          correctAnswer: 1,
          explanation: 'El texto dice: "sus nietos le regalaron un smartphone".',
        },
        {
          id: 3,
          question: "¿Qué usaba antes?",
          options: ["a) Nada", "b) Un teléfono antiguo", "c) Una tablet", "d) Un ordenador"],
          correctAnswer: 1,
          explanation: 'El texto dice: "usaba un teléfono antiguo que solo servía para llamar".',
        },
        {
          id: 4,
          question: "¿Quién le enseñó a usar WhatsApp?",
          options: ["a) Su nieta", "b) Pablo, su nieto pequeño", "c) Su hija", "d) Su vecino"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Su nieto pequeño, Pablo, le enseñó a usar WhatsApp".',
        },
        {
          id: 5,
          question: "¿Qué puso en su primer mensaje?",
          options: [
            "a) Una foto",
            'b) "Hola, soy la abuela. Ya sé usar el móvil."',
            "c) Un vídeo",
            "d) Un emoji",
          ],
          correctAnswer: 1,
          explanation: 'El texto cita: "Hola, soy la abuela. Ya sé usar el móvil."',
        },
        {
          id: 6,
          question: "¿Dónde vive su nieta?",
          options: ["a) En Madrid", "b) En Barcelona", "c) En Londres", "d) En París"],
          correctAnswer: 2,
          explanation: 'El texto dice: "su nieta que vive en Londres".',
        },
        {
          id: 7,
          question: "¿Qué pasó en su primera videollamada?",
          options: [
            "a) Todo salió bien",
            "b) Tenía el móvil al revés",
            "c) Se cortó la llamada",
            "d) No pudo conectar",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Carmen tenía el móvil al revés y solo se veía su techo".',
        },
        {
          id: 8,
          question: "¿Cuánto tiempo habló con su nieta?",
          options: ["a) Diez minutos", "b) Veinte minutos", "c) Media hora", "d) Una hora"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Hablaron media hora".',
        },
        {
          id: 9,
          question: "¿Qué hace ahora por la mañana?",
          options: ["a) Mira vídeos", "b) Lee las noticias", "c) Juega", "d) Llama a su nieta"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Lee las noticias por la mañana".',
        },
        {
          id: 10,
          question: "¿Cuál es su frase favorita ahora?",
          options: [
            'a) "La tecnología es difícil"',
            'b) "No entiendo nada"',
            'c) "La tecnología no es tan difícil, solo hay que tener paciencia."',
            'd) "Odio los móviles"',
          ],
          correctAnswer: 2,
          explanation: 'El texto cita: "La tecnología no es tan difícil, solo hay que tener paciencia."',
        },
      ],
    },
    listening: {
      title: "Un día sin móvil",
      transcription: `Soy Marta, tengo veintidós años y el sábado pasado hice un experimento: pasar veinticuatro horas sin móvil. Quería saber si era adicta a la tecnología.

El sábado por la mañana fue extraño. Mi primer instinto al despertar fue coger el móvil para mirar las redes sociales. Tuve que recordarme que no podía. Me sentí ansiosa, como si me faltara algo.

Desayuné con mi familia, algo que normalmente no hago porque desayuno mirando el móvil. Hablamos de muchas cosas. Mi madre se sorprendió de verme sin pantalla.

Por la tarde, salí con mi amiga Laura al parque. Normalmente, hacemos fotos para Instagram o miramos TikTok juntas. Ese día, solo caminamos y hablamos. Me di cuenta de que no habíamos tenido una conversación larga en meses.

Por la noche, fue lo más difícil. No podía ver series en el móvil ni hablar por WhatsApp con mi novio. Leí un libro que tenía abandonado desde hacía seis meses. Era un libro de misterio y me enganchó tanto que leí cien páginas.

Al día siguiente, recuperé mi móvil. Tenía doscientos mensajes no leídos, pero nada urgente. El experimento me enseñó que uso el móvil por costumbre, no porque lo necesite. Ahora intento dejarlo una hora al día.`,
      questions: [
        {
          id: 1,
          question: "¿Qué edad tiene Marta?",
          options: ["a) Veinte años", "b) Veintiuno años", "c) Veintidos años", "d) Veintitres años"],
          correctAnswer: 2,
        },
        {
          id: 2,
          question: "¿Cuánto tiempo estuvo sin móvil?",
          options: ["a) Doce horas", "b) Veinticuatro horas", "c) Cuarenta y ocho horas", "d) Una semana"],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "¿Qué sintió al despertar?",
          options: ["a) Feliz", "b) Ansiosa", "c) Triste", "d) Enfadada"],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "¿Con quién desayunó?",
          options: ["a) Sola", "b) Con su novio", "c) Con su familia", "d) Con su amiga"],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "¿Con quién salió por la tarde?",
          options: ["a) Con su madre", "b) Con Laura", "c) Con su novio", "d) Sola"],
          correctAnswer: 1,
        },
        {
          id: 6,
          question: "¿Qué hicieron en el parque?",
          options: ["a) Hicieron fotos", "b) Miraron TikTok", "c) Caminaron y hablaron", "d) Jugaron"],
          correctAnswer: 2,
        },
        {
          id: 7,
          question: "¿Qué hizo por la noche?",
          options: ["a) Vio series", "b) Usó WhatsApp", "c) Leyó un libro", "d] Dormido"],
          correctAnswer: 2,
        },
        {
          id: 8,
          question: "¿Cuántas páginas leyó?",
          options: ["a) Cincuenta", "b) Setenta", "c) Cien", "d) Doscientas"],
          correctAnswer: 2,
        },
        {
          id: 9,
          question: "¿Cuántos mensajes tenía al día siguiente?",
          options: ["a) Cien", "b) Doscientos", "c) Trescientos", "d) Ninguno"],
          correctAnswer: 1,
        },
        {
          id: 10,
          question: "¿Qué aprendió del experimento?",
          options: [
            "a) Que necesita el móvil",
            "b) Que usa el móvil por costumbre",
            "c) Que odia los libros",
            "d) Que no tiene amigos",
          ],
          correctAnswer: 1,
        },
      ],
    },
    writing: {
      optionA: {
        title: "La tecnología en mi vida",
        description:
          "Escribe sobre cómo usas la tecnología en tu día a día. Incluye: qué dispositivos usas, para qué, si te gusta.",
        structure: {
          intro: "Presenta cómo usas la tecnología.",
          body: "Describe los dispositivos y aplicaciones.",
          conclusion: "Di si crees que es buena o mala.",
        },
        connectors: ["Yo uso", "Todos los días", "Para", "Creo que", "En conclusión"],
        wordCount: "80-120 palabras",
      },
      optionB: {
        title: "Un día sin tecnología",
        description:
          "Escribe cómo sería un día sin tecnología para ti. Incluye: qué harías, qué no podrías hacer, si sería difícil.",
        structure: {
          intro: "Di cómo sería un día sin tecnología.",
          body: "Describe actividades que harías y no harías.",
          conclusion: "Di si crees que sería positivo o negativo.",
        },
        connectors: ["Sin tecnología", "No podría", "Pero sí podría", "Creo que sería", "En mi opinión"],
        wordCount: "80-120 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Mi uso de la tecnología",
        description:
          "Habla sobre cómo usas la tecnología durante 1-2 minutos. Di qué dispositivos tienes, qué aplicaciones usas y cuánto tiempo pasas con ellos.",
        connectors: [
          "Yo uso",
          "Todos los días paso",
          "Mis aplicaciones favoritas son",
          "Creo que uso demasiado",
          "Me gustaría reducir",
        ],
        guideQuestions: [
          "¿Desde cuando conoces este tema?",
          "¿Que aspectos positivos y negativos tiene?",
          "¿Como afecta a las nuevas generaciones?",
          "¿Que importancia le das?",
        ],
      },
      topic2: {
        title: "Redes sociales",
        description:
          "Habla sobre las redes sociales. Di cuáles usas, para qué, si son buenas o malas y por qué.",
        connectors: ["Yo uso", "Me sirven para", "Lo bueno es", "Lo malo es", "Creo que"],
        guideQuestions: [
          "¿Que significa esto para ti personalmente?",
          "¿Has tenido que adaptarte por este motivo?",
          "¿Que piensan tus amigos al respecto?",
          "¿Crees que la situacion mejorara?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero estáis teniendo problemas con vuestros dispositivos. Tenéis que ayudaros mutuamente y dar consejos.",
      questions: [
        {
          question: "¿Qué problema tienes con tu dispositivo? ¿Cuándo empezó?",
          help: "Describe tu problema. Usa: Mi... no funciona bien. Tiene...",
          usefulPhrases: [
            "Sinceramente, yo creo que...",
            "Te propongo que...",
            "Valora la posibilidad de...",
            "No ignores que...",
            "Lo que funciona de verdad es...",
            "El objetivo principal es...",
          ],
        },
        {
          question: "¿Has probado a reiniciarlo o a cambiar alguna configuración?",
          help: "Da consejos técnicos. Usa: Prueba a... / Deberías...",
          usefulPhrases: [
            "Si me preguntas a mi...",
            "Una solucion practica es...",
            "Piensa en la opcion de...",
            "Recuerda siempre que...",
            "El mejor consejo que puedo darte es...",
            "El punto clave es...",
          ],
        },
        {
          question: "¿Necesitas llevarlo a reparar o crees que podemos solucionarlo?",
          help: "Valora la situación. Usa: Creo que... / Es mejor...",
          usefulPhrases: [
            "A mi entender...",
            "Lo mas sensato seria...",
            "No descartes la idea de...",
            "Hay que tener en cuenta que...",
            "Mi sugerencia es...",
            "Lo prioritario es...",
          ],
        },
      ],
    },
  },
  {
    id: 15,
    level: "A2",
    theme: "Las emociones y sentimientos",
    icon: "Smile",
    vocabulary: [
      {
        word: "feliz",
        definition: "Que siente alegría y satisfacción",
        chinese: "快乐的",
        example: "Estoy muy feliz con mi nuevo trabajo.",
      },
      {
        word: "triste",
        definition: "Que siente pena o melancolía",
        chinese: "悲伤的",
        example: "Estoy triste porque se va mi amigo.",
      },
      {
        word: "enfadado/a",
        definition: "Que siente ira hacia alguien o algo",
        chinese: "生气的",
        example: "Mi padre está enfadado porque llegué tarde.",
      },
      {
        word: "nervioso/a",
        definition: "Que siente inquietud o agitación",
        chinese: "紧张的",
        example: "Estoy nervioso por el examen de mañana.",
      },
      {
        word: "cansado/a",
        definition: "Que siente fatiga o sueño",
        chinese: "累的",
        example: "Estoy cansado después de trabajar todo el día.",
      },
      {
        word: "emocionado/a",
        definition: "Que siente una emoción intensa",
        chinese: "激动的",
        example: "Estoy emocionado por el viaje.",
      },
      {
        word: "preocupado/a",
        definition: "Que siente inquietud por algo",
        chinese: "担心的",
        example: "Estoy preocupado por mi familia.",
      },
      {
        word: "sorprendido/a",
        definition: "Que siente asombro por algo inesperado",
        chinese: "惊讶的",
        example: "Estoy sorprendido por la noticia.",
      },
      {
        word: "miedo",
        definition: "Sensación de temor o angustia",
        chinese: "害怕",
        example: "Tengo miedo a las arañas.",
      },
      {
        word: "amor",
        definition: "Sentimiento de afecto profundo hacia alguien",
        chinese: "爱",
        example: "El amor de una madre es infinito.",
      },
      {
        word: "gratitud",
        definition: "Sentimiento de agradecimiento",
        chinese: "感激",
        example: "Le tengo mucha gratitud por su ayuda.",
      },
    ],
    reading: {
      textType: "narrativo",
      title: "El mejor día de mi vida",
      text: `Hace tres años, viví el día más feliz de mi vida. Fue el diez de junio, el día que mi hija Laura nació.

Todo empezó a las cuatro de la mañana. Mi mujer, Ana, me despertó porque sentía contracciones. Estaba nervioso pero intenté mantener la calma. Cogimos la maleta que teníamos preparada y fuimos al hospital.

En el hospital, la enfermera nos dijo que todavía faltaban horas para el nacimiento. Me quedé con Ana, dándole la mano y animándola. Ella estaba cansada pero valiente. Pasaron seis horas largas, con momentos de dolor y de espera.

A las diez y media de la mañana, la matrona nos dijo que era hora de empujar. Yo estaba tan emocionado que las manos me temblaban. Ana me miró y sonrió. "Podemos hacerlo", me dijo.

Y entonces, a las once en punto, oí el llanto más hermoso del mundo. Laura había nacido. Tenía el pelo negro, los ojos cerrados y las manos pequeñitas. La pusieron sobre el pecho de Ana, y las dos empezaron a llorar: Ana de emoción y Laura porque era su forma de decir "hola".

Yo también lloré. Nunca había sentido tanta felicidad. Era una mezcla de amor, gratitud y asombro. Miré a mi mujer, exhausta pero radiante, y supe que éramos una familia completa.

Ahora, cada diez de junio celebramos el cumpleaños de Laura. Y cada año, cuando sopla las velas, recuerdo ese día y vuelvo a sentir la misma emoción.`,
      questions: [
        {
          id: 1,
          question: "¿Cuándo nació Laura?",
          options: ["a) El 10 de mayo", "b) El 10 de junio", "c) El 10 de julio", "d) El 10 de agosto"],
          correctAnswer: 1,
          explanation: 'El texto dice: "el diez de junio".',
        },
        {
          id: 2,
          question: "¿A qué hora empezaron las contracciones?",
          options: ["a) A las tres", "b) A las cuatro", "c) A las cinco", "d) A las seis"],
          correctAnswer: 1,
          explanation: 'El texto dice: "a las cuatro de la mañana".',
        },
        {
          id: 3,
          question: "¿Cómo se sentía el narrador al principio?",
          options: ["a) Feliz", "b) Nervioso", "c) Enojado", "d) Triste"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Estaba nervioso".',
        },
        {
          id: 4,
          question: "¿Cuántas horas esperaron en el hospital?",
          options: ["a) Tres horas", "b) Cuatro horas", "c) Seis horas", "d) Ocho horas"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Pasaron seis horas largas".',
        },
        {
          id: 5,
          question: "¿A qué hora nació Laura?",
          options: ["a) A las diez", "b) A las diez y media", "c) A las once", "d) A las doce"],
          correctAnswer: 2,
          explanation: 'El texto dice: "a las once en punto".',
        },
        {
          id: 6,
          question: "¿De qué color era el pelo de Laura?",
          options: ["a) Rubio", "b) Pelirrojo", "c) Negro", "d) Castaño"],
          correctAnswer: 2,
          explanation: 'El texto dice: "el pelo negro".',
        },
        {
          id: 7,
          question: "¿Dónde pusieron a Laura?",
          options: [
            "a) En mis brazos",
            "b) Sobre el pecho de Ana",
            "c) En la cuna",
            "d) En el regazo de la enfermera",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "La pusieron sobre el pecho de Ana".',
        },
        {
          id: 8,
          question: "¿Qué sentimiento no menciona el narrador?",
          options: ["a) Amor", "b) Gratitud", "c) Miedo", "d) Asombro"],
          correctAnswer: 2,
          explanation: "El texto menciona amor, gratitud y asombro, pero no miedo.",
        },
        {
          id: 9,
          question: "¿Cómo estaba Ana después del parto?",
          options: ["a) Enfadada", "b) Exhausta pero radiante", "c) Dormida", "d) Triste"],
          correctAnswer: 1,
          explanation: 'El texto dice: "exhausta pero radiante".',
        },
        {
          id: 10,
          question: "¿Qué hacen cada 10 de junio?",
          options: [
            "a) Van al hospital",
            "b) Celebran el cumpleaños de Laura",
            "c) Viajan",
            "d) Compran regalos",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "cada diez de junio celebramos el cumpleaños de Laura".',
        },
      ],
    },
    listening: {
      title: "Cómo gestionar el estrés",
      transcription: `Hola, soy la psicóloga Marta y hoy voy a daros algunos consejos para gestionar el estrés del día a día.

Primero, identificad qué os estresa. A veces no sabemos por qué estamos nerviosos. Escribid en un papel todo lo que os preocupa. Verlo escrito ayuda a entender el problema.

Segundo, respirad profundamente. Cuando estamos estresados, respiramos rápido y superficial. Sentaos, cerrad los ojos e inspirad por la nariz durante cuatro segundos. Aguantad el aire cuatro segundos y expulsadlo por la boca otros cuatro. Hacedlo cinco veces. Veréis cómo os calmáis.

Tercero, haced ejercicio físico. Caminar, bailar o hacer yoga libera endorfinas, las hormonas de la felicidad. No hace falta ir al gimnasio. Con pasear media hora es suficiente.

Cuarto, hablad con alguien. Muchas veces, compartir nuestros problemas con un amigo o familiar nos hace sentir mejor. No tenéis que resolverlo todo solos.

Por último, dormid bien. El sueño es esencial para el equilibrio emocional. Intentad dormir entre siete y ocho horas. Apagad el móvil una hora antes de dormir.

Recordad: estar triste o nervioso de vez en cuando es normal. Pero si estos sentimientos duran semanas, buscad ayuda profesional.`,
      questions: [
        {
          id: 1,
          question: "¿Qué hay que hacer primero según la psicóloga?",
          options: ["a) Respirar", "b) Identificar qué te estresa", "c) Hacer ejercicio", "d) Dormir"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Cuántos segundos hay que aguantar el aire?",
          options: ["a) Dos", "b) Tres", "c) Cuatro", "d) Cinco"],
          correctAnswer: 2,
        },
        {
          id: 3,
          question: "¿Cuántas veces hay que repetir la respiración?",
          options: ["a) Tres", "b) Cinco", "c) Siete", "d) Diez"],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "¿Qué hormona libera el ejercicio?",
          options: ["a) Adrenalina", "b) Insulina", "c) Endorfinas", "d) Melatonina"],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "¿Cuánto ejercicio se recomienda?",
          options: ["a) Una hora", "b) Media hora", "c) Dos horas", "d) No importa"],
          correctAnswer: 1,
        },
        {
          id: 6,
          question: "¿Qué se recomienda hacer antes de dormir?",
          options: [
            "a) Ver la televisión",
            "b) Apagar el móvil una hora antes",
            "c) Comer algo",
            "d) Hacer ejercicio",
          ],
          correctAnswer: 1,
        },
        {
          id: 7,
          question: "¿Cuántas horas de sueño se recomiendan?",
          options: ["a) 5-6", "b) 7-8", "c) 9-10", "d) 10-12"],
          correctAnswer: 1,
        },
        {
          id: 8,
          question: "¿Qué hay que hacer para identificar el estrés?",
          options: ["a) Hablar con un amigo", "b) Escribirlo en un papel", "c) Hacer ejercicio", "d) Dormir"],
          correctAnswer: 1,
        },
        {
          id: 9,
          question: "¿Qué se aconseja si los sentimientos negativos duran semanas?",
          options: [
            "a) Ignorarlos",
            "b) Buscar ayuda profesional",
            "c) Hacer más ejercicio",
            "d) Dormir más",
          ],
          correctAnswer: 1,
        },
        {
          id: 10,
          question: "¿Cuál es la profesión de Marta?",
          options: ["a) Médica", "b) Psicóloga", "c) Profesora", "d) Enfermera"],
          correctAnswer: 1,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Un día feliz",
        description:
          "Escribe sobre el día más feliz de tu vida. Incluye: cuándo fue, qué pasó, por qué fue especial.",
        structure: {
          intro: "Presenta el día más feliz de tu vida.",
          body: "Describe lo que pasó.",
          conclusion: "Explica por qué fue tan especial.",
        },
        connectors: [
          "El día más feliz fue",
          "Pasó cuando",
          "Me sentí",
          "Fue especial porque",
          "Nunca olvidaré",
        ],
        wordCount: "80-120 palabras",
      },
      optionB: {
        title: "Cómo manejar el estrés",
        description:
          "Escribe sobre cómo manejas el estrés. Incluye: qué te estresa, qué haces para relajarte, consejos.",
        structure: {
          intro: "Di qué cosas te estresan.",
          body: "Describe cómo te relajas.",
          conclusion: "Da consejos generales.",
        },
        connectors: ["Me estresa", "Para relajarme", "También", "Es importante", "En conclusión"],
        wordCount: "80-120 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Describe cómo te sientes hoy",
        description:
          "Habla sobre cómo te sientes hoy y por qué durante 1-2 minutos. Di qué emociones tienes y qué las causa.",
        connectors: ["Hoy me siento", "Porque", "También estoy", "Lo que me hace sentir así es", "Creo que"],
        guideQuestions: [
          "¿Cual fue tu primera experiencia con esto?",
          "¿Como ha cambiado tu perspectiva?",
          "¿Que habilidades has desarrollado gracias a ello?",
          "¿Que le recomendarias a alguien que empieza?",
        ],
      },
      topic2: {
        title: "Un momento emotivo",
        description:
          "Habla sobre un momento muy emotivo que has vivido. Di qué pasó, cómo te sentiste y por qué fue importante.",
        connectors: [
          "Un momento emotivo fue",
          "Cuando",
          "Me sentí",
          "Fue importante porque",
          "Nunca olvidaré",
        ],
        guideQuestions: [
          "¿Por que te parece interesante este tema?",
          "¿Que habilidades se necesitan?",
          "¿Como influye en otras areas de tu vida?",
          "¿Cual ha sido tu mayor aprendizaje?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero habláis de vuestras emociones y sentimientos. Tenéis que contaros cómo os sentís últimamente y daronse apoyo mutuo.",
      questions: [
        {
          question: "¿Cómo te sientes últimamente? ¿Hay algo que te preocupa?",
          help: "Expresa tus emociones. Usa: Últimamente me siento... / Me preocupa...",
          usefulPhrases: [
            "Yo diria que...",
            "Prueba esta opcion...",
            "Tal vez te interese...",
            "Es relevante saber que...",
            "Algo que debes probar es...",
            "El factor mas importante es...",
          ],
        },
        {
          question: "¿Qué haces cuando te sientes triste o estresado?",
          help: "Comparte estrategias. Usa: Cuando estoy..., yo... / Me ayuda...",
          usefulPhrases: [
            "Mi impresion es que...",
            "Te convendria...",
            "Otra posibilidad es...",
            "No te pierdas el detalle de...",
            "Una buena tactica es...",
            "El aspecto decisivo es...",
          ],
        },
        {
          question: "¿Cómo puedo animarte o ayudarte?",
          help: "Ofrece apoyo. Usa: Puedo... / Si necesitas..., yo...",
          usefulPhrases: [
            "Considerando la situacion...",
            "El enfoque mas adecuado es...",
            "Explora la opcion de...",
            "Destaca especialmente...",
            "Un metodo infalible es...",
            "El elemento central es...",
          ],
        },
      ],
    },
  },
  {
    id: 16,
    level: "A2",
    theme: "Los números y precios",
    icon: "Calculator",
    vocabulary: [
      {
        word: "precio",
        definition: "Cantidad de dinero que cuesta algo",
        chinese: "价格",
        example: "¿Cuál es el precio de esta camiseta?",
      },
      {
        word: "descuento",
        definition: "Reducción en el precio original",
        chinese: "折扣",
        example: "Tienen un descuento del veinte por ciento.",
      },
      {
        word: "oferta",
        definition: "Producto con precio reducido por tiempo limitado",
        chinese: "优惠",
        example: "Hay una oferta especial en el supermercado.",
      },
      {
        word: "caro/a",
        definition: "Que tiene un precio alto",
        chinese: "贵的",
        example: "Este restaurante es muy caro.",
      },
      {
        word: "barato/a",
        definition: "Que tiene un precio bajo",
        chinese: "便宜的",
        example: "Encontré un hotel muy barato.",
      },
      {
        word: "gratis",
        definition: "Que no cuesta dinero",
        chinese: "免费的",
        example: "La entrada es gratis para niños.",
      },
      {
        word: "cambio",
        definition: "Dinero que te devuelven al pagar",
        chinese: "找零",
        example: "El cambio son cinco euros.",
      },
      {
        word: "factura",
        definition: "Documento que detalla una compra o servicio",
        chinese: "发票",
        example: "¿Me puede dar la factura, por favor?",
      },
      {
        word: "propina",
        definition: "Dinero extra que se da por un servicio",
        chinese: "小费",
        example: "Dejamos una propina de tres euros.",
      },
      {
        word: "recibo",
        definition: "Documento que prueba el pago de algo",
        chinese: "收据",
        example: "Guarda el recibo por si hay problemas.",
      },
      {
        word: "cuenta",
        definition: "Suma de lo que se debe pagar en un restaurante",
        chinese: "账单",
        example: "¿Nos trae la cuenta?",
      },
    ],
    reading: {
      textType: "narrativo",
      title: "Un día de compras inteligentes",
      text: `Elena es una estudiante que vive en Madrid con un presupuesto muy ajustado. Tiene que controlar sus gastos cuidadosamente. El sábado pasado, necesitaba comprar ropa, comida y un regalo para su madre. Tenía solo cien euros para todo.

Empezó en el mercado de la fruta. Compró manzanas, plátanos, tomates y lechuga. En total, gastó doce euros con cincuenta céntimos. El vendedor le regaló un limón.

Después fue a una tienda de ropa que estaba de rebajas. Encontró dos camisetas a diez euros cada una y un pantalón que costaba treinta euros pero estaba al cincuenta por ciento de descuento, así que pagó quince. En ropa gastó treinta y cinco euros en total.

Para el regalo de su madre, entró en una perfumería. Un perfume costaba cuarenta y cinco euros, demasiado caro. Pero encontró un set de cremas en oferta: veinticinco euros en vez de treinta y cinco. Compró ese y le dieron una bolsa de regalo gratis.

Hasta ese momento había gastado doce con cincuenta más treinta y cinco más veinticinco: setenta y dos euros con cincuenta céntimos. Le quedaban veintisiete euros con cincuenta céntimos.

Decidió ahorrar el resto. Caminó a casa en vez de coger el autobús y se tomó un café casero. "Controlar el dinero es difícil, pero se puede", pensó Elena.`,
      questions: [
        {
          id: 1,
          question: "¿Cuánto dinero tenía Elena para gastar?",
          options: ["a) Cincuenta euros", "b) Setenta y cinco euros", "c) Cien euros", "d) Doscientos euros"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Tenía solo cien euros".',
        },
        {
          id: 2,
          question: "¿Cuánto gastó en la frutería?",
          options: [
            "a) Diez euros",
            "b) Doce euros con cincuenta céntimos",
            "c) Quince euros",
            "d) Veinte euros",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "gastó doce euros con cincuenta céntimos".',
        },
        {
          id: 3,
          question: "¿Qué le regaló el vendedor?",
          options: ["a) Una naranja", "b) Un limón", "c) Una manzana", "d) Un plátano"],
          correctAnswer: 1,
          explanation: 'El texto dice: "El vendedor le regaló un limón".',
        },
        {
          id: 4,
          question: "¿Cuánto costaba el pantalón originalmente?",
          options: ["a) Quince euros", "b) Veinte euros", "c) Treinta euros", "d) Cuarenta euros"],
          correctAnswer: 2,
          explanation: 'El texto dice: "un pantalón que costaba treinta euros".',
        },
        {
          id: 5,
          question: "¿Cuánto pagó por el pantalón con el descuento?",
          options: ["a) Diez euros", "b) Quince euros", "c) Veinte euros", "d) Veinticinco euros"],
          correctAnswer: 1,
          explanation: 'El texto dice: "así que pagó quince".',
        },
        {
          id: 6,
          question: "¿Cuánto gastó en total en ropa?",
          options: [
            "a) Veinticinco euros",
            "b) Treinta euros",
            "c) Treinta y cinco euros",
            "d) Cuarenta euros",
          ],
          correctAnswer: 2,
          explanation: 'El texto dice: "En ropa gastó treinta y cinco euros".',
        },
        {
          id: 7,
          question: "¿Cuánto costaba el perfume originalmente?",
          options: [
            "a) Treinta y cinco euros",
            "b) Cuarenta euros",
            "c) Cuarenta y cinco euros",
            "d) Cincuenta euros",
          ],
          correctAnswer: 2,
          explanation: 'El texto dice: "Un perfume costaba cuarenta y cinco euros".',
        },
        {
          id: 8,
          question: "¿Cuánto costó el set de cremas en oferta?",
          options: [
            "a) Quince euros",
            "b) Veinticinco euros",
            "c) Treinta y cinco euros",
            "d) Cuarenta euros",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "veinticinco euros en vez de treinta y cinco".',
        },
        {
          id: 9,
          question: "¿Cuánto había gastado en total hasta ese momento?",
          options: [
            "a) Sesenta euros",
            "b) Setenta y dos euros con cincuenta céntimos",
            "c) Ochenta euros",
            "d) Noventa euros",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "setenta y dos euros con cincuenta céntimos".',
        },
        {
          id: 10,
          question: "¿Cuánto le quedaba?",
          options: [
            "a) Diez euros",
            "b) Veinticinco euros",
            "c) Veintisiete euros con cincuenta céntimos",
            "d) Treinta euros",
          ],
          correctAnswer: 2,
          explanation: 'El texto dice: "Le quedaban veintisiete euros con cincuenta céntimos".',
        },
      ],
    },
    listening: {
      title: "Ir de compras al supermercado",
      transcription: `Hola, soy Raúl y voy a explicar cómo hago la compra semanal en el supermercado con un presupuesto de cincuenta euros.

Lo primero es hacer una lista antes de salir de casa. Si voy sin lista, compro cosas que no necesito y gasto más. La lista incluye: leche, pan, huevos, fruta, verdura, carne y algún producto de limpieza.

Cuando llego al supermercado, empiezo por la sección de ofertas. A veces hay descuentos del treinta o cuarenta por ciento en productos que uso habitualmente. El mes pasado compré aceite con un descuento del cincuenta por ciento.

Después, voy a la sección de frutas y verduras. Compro productos de temporada porque son más baratos. Por ejemplo, en verano las sandías cuestan menos y en invierno las naranjas son más baratas.

Para la carne, miro siempre el precio por kilo. A veces hay ofertas de dos por uno. El pollo es más barato que la ternera, así que compro más pollo.

Para terminar, voy a la caja. Si llevo mi propia bolsa, me descuentan cinco céntimos. No es mucho, pero suma al final del mes.

Normalmente, gasto entre cuarenta y cinco y cincuenta euros semanales. La semana pasada gasté exactamente cuarenta y ocho euros con treinta céntimos.`,
      questions: [
        {
          id: 1,
          question: "¿Cuál es el presupuesto semanal de Raúl?",
          options: [
            "a) Cuarenta euros",
            "b) Cuarenta y cinco euros",
            "c) Cincuenta euros",
            "d) Sesenta euros",
          ],
          correctAnswer: 2,
        },
        {
          id: 2,
          question: "¿Qué hace antes de ir al supermercado?",
          options: ["a) Come algo", "b) Hace una lista", "c) Mira ofertas online", "d) Pregunta a su mujer"],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "¿Dónde empieza en el supermercado?",
          options: [
            "a) En la sección de carne",
            "b) En la sección de ofertas",
            "c) En la frutería",
            "d) En la panadería",
          ],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "¿Cuál fue el mayor descuento que encontró?",
          options: ["a) El 30%", "b) El 40%", "c) El 50%", "d) El 60%"],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "¿Por qué compra productos de temporada?",
          options: ["a) Son más sanos", "b) Son más baratos", "c) Son más sabrosos", "d) Son más bonitos"],
          correctAnswer: 1,
        },
        {
          id: 6,
          question: "¿Qué carne es más barata?",
          options: ["a) Ternera", "b) Cerdo", "c) Pollo", "d] Cordero"],
          correctAnswer: 2,
        },
        {
          id: 7,
          question: "¿Cuánto le descuentan si lleva su propia bolsa?",
          options: ["a) Un céntimo", "b) Cinco céntimos", "c) Diez céntimos", "d] Veinte céntimos"],
          correctAnswer: 1,
        },
        {
          id: 8,
          question: "¿Cuánto gastó la semana pasada?",
          options: [
            "a) Cuarenta y cinco euros",
            "b) Cuarenta y ocho euros con treinta céntimos",
            "c) Cincuenta euros",
            "d] Cuarenta euros",
          ],
          correctAnswer: 1,
        },
        {
          id: 9,
          question: "¿Qué mira en la sección de carne?",
          options: ["a) El color", "b) El precio por kilo", "c] La marca", "d] El olor"],
          correctAnswer: 1,
        },
        {
          id: 10,
          question: "¿Cuánto suele gastar semanalmente?",
          options: [
            "a) Entre treinta y cuarenta euros",
            "b] Entre cuarenta y cinco y cincuenta euros",
            "c] Entre cincuenta y sesenta euros",
            "d] Más de sesenta euros",
          ],
          correctAnswer: 1,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi presupuesto mensual",
        description:
          "Escribe sobre cómo gestionas tu dinero. Incluye: en qué gastas, cuánto ahorras, consejos para ahorrar.",
        structure: {
          intro: "Presenta tu situación económica.",
          body: "Describe en qué gastas tu dinero.",
          conclusion: "Da consejos para ahorrar.",
        },
        connectors: ["Yo gasto", "El mayor gasto es en", "Para ahorrar", "También", "En conclusión"],
        wordCount: "80-120 palabras",
      },
      optionB: {
        title: "Una compra importante",
        description:
          "Escribe sobre una compra importante que hiciste. Incluye: qué compraste, cuánto costó, si fue caro o barato.",
        structure: {
          intro: "Di qué compraste.",
          body: "Describe cómo fue la compra.",
          conclusion: "Di si te arrepientes o no.",
        },
        connectors: ["Hace", "Compré", "Costó", "Creo que fue", "En resumen"],
        wordCount: "80-120 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Ir de compras",
        description:
          "Habla sobre cómo haces la compra durante 1-2 minutos. Di dónde vas, qué compras, cuánto gastas.",
        connectors: [
          "Yo hago la compra en",
          "Normalmente compro",
          "Gasto aproximadamente",
          "Lo más caro es",
          "Intento ahorrar",
        ],
        guideQuestions: [
          "¿Como influye en tu vida diaria?",
          "¿Que cambios has notado con el tiempo?",
          "¿Que relacion tiene con tu entorno?",
          "¿Que consejo practico darias?",
        ],
      },
      topic2: {
        title: "Un regalo especial",
        description:
          "Habla sobre un regalo que compraste para alguien. Di para quién era, qué compraste, cuánto costó y cómo reaccionó.",
        connectors: ["Hace poco compré", "Era para", "Costó", "Cuando lo recibió", "Fue un momento"],
        guideQuestions: [
          "¿Que te motivo a conocer mas sobre esto?",
          "¿Que aspectos te frustran o te alegran?",
          "¿Como lo viven otras personas?",
          "¿Que planes tienes relacionados?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero estáis planeando un presupuesto para un viaje juntos. Tenéis que calcular los gastos y decidir cómo ahorrar.",
      questions: [
        {
          question: "¿Cuánto dinero tenemos para el viaje? ¿Cuánto podemos gastar en alojamiento?",
          help: "Habla del presupuesto. Usa: Tenemos... / Podemos gastar...",
          usefulPhrases: [
            "Reflexionando sobre el tema...",
            "Mi propuesta es que...",
            "Tambien podrias pensar en...",
            "Es significativo que...",
            "Lo primordial es...",
            "El detalle mas importante es...",
          ],
        },
        {
          question: "¿Qué es más importante: ahorrar en transporte o en comida?",
          help: "Da tu opinión. Usa: Creo que es más importante... porque...",
          usefulPhrases: [
            "En la practica...",
            "Te resultara util...",
            "Dale una oportunidad a...",
            "Llama la atencion que...",
            "Una tecnica muy buena es...",
            "El componente vital es...",
          ],
        },
        {
          question: "¿Cómo podemos reducir gastos?",
          help: "Da consejos. Usa: Podemos... / Es mejor...",
          usefulPhrases: [
            "Viendolo con perspectiva...",
            "Creo que te beneficiaria...",
            "No dejes de considerar...",
            "Es llamativo que...",
            "La estrategia mas eficaz es...",
            "El pilar fundamental es...",
          ],
        },
      ],
    },
  },
  {
    id: 17,
    level: "A2",
    theme: "Las direcciones y el GPS",
    icon: "MapPin",
    vocabulary: [
      {
        word: "dirección",
        definition: "Lugar donde vive una persona o está un edificio",
        chinese: "地址",
        example: "¿Cuál es tu dirección exacta?",
      },
      {
        word: "calle",
        definition: "Vía pública entre edificios",
        chinese: "街道",
        example: "Vivo en la calle Mayor.",
      },
      {
        word: "esquina",
        definition: "Punto donde se cruzan dos calles",
        chinese: "拐角",
        example: "La tienda está en la esquina.",
      },
      {
        word: "semáforo",
        definition: "Señal luminosa para regular el tráfico",
        chinese: "红绿灯",
        example: "Gire a la izquierda en el semáforo.",
      },
      {
        word: "rotonda",
        definition: "Intersección circular donde giran los coches",
        chinese: "环岛",
        example: "Tome la segunda salida en la rotonda.",
      },
      {
        word: "recto",
        definition: "Sin girar, hacia adelante",
        chinese: "直走",
        example: "Siga recto por esta calle.",
      },
      {
        word: "doblar",
        definition: "Cambiar de dirección girando",
        chinese: "转弯",
        example: "Doble a la derecha en la próxima calle.",
      },
      {
        word: "mapa",
        definition: "Representación de una ciudad o territorio",
        chinese: "地图",
        example: "Mire el mapa para no perderse.",
      },
      {
        word: "perdido/a",
        definition: "Que no sabe dónde está",
        chinese: "迷路的",
        example: "Estoy perdido, ¿me puede ayudar?",
      },
      {
        word: "indicaciones",
        definition: "Instrucciones para llegar a un lugar",
        chinese: "指示/路线",
        example: "¿Me puede dar indicaciones para llegar?",
      },
      {
        word: "metros",
        definition: "Unidad de medida de longitud",
        chinese: "米",
        example: "El museo está a doscientos metros.",
      },
    ],
    reading: {
      textType: "descriptivo",
      title: "Cómo llegar a mi casa",
      text: `Vivo en un piso del centro de Barcelona y mis amigos siempre se pierden cuando vienen por primera vez. Por eso, les doy estas indicaciones detalladas.

Primero, toma el metro y baja en la estación de Cataluña. Es la parada más céntrica de la ciudad. Sal por la puerta principal, la que da a la plaza.

Una vez en la plaza, camina recto por la calle Pelai. Es una calle peatonal llena de tiendas. Sigue andando unos trescientos metros hasta llegar a un gran edificio de color rojo: es la universidad.

Cuando veas el edificio rojo, gira a la izquierda en la calle Tallers. Es una calle estrecha con muchas tiendas de ropa. Camina por Tallers unos ciento cincuenta metros.

Llegarás a una pequeña plaza con una fuente. Cruza la plaza y toma la calle de la derecha, que se llama Riera Alta. Sigue recto por esta calle hasta el segundo semáforo.

En el segundo semáforo, gira a la derecha. Mi calle es la primera a la izquierda: Calle del Portal Nou. Mi edificio es el número quince, una casa azul con una puerta de madera. Es fácil de reconocer porque tiene plantas en el balcón.

Si te pierdes, llámame. O mejor, usa Google Maps. Escribe "Calle del Portal Nou 15, Barcelona" y te llevará directamente.`,
      questions: [
        {
          id: 1,
          question: "¿En qué estación de metro hay que bajar?",
          options: ["a) Sagrada Familia", "b) Cataluña", "c) Barceloneta", "d) Gràcia"],
          correctAnswer: 1,
          explanation: 'El texto dice: "baja en la estación de Cataluña".',
        },
        {
          id: 2,
          question: "¿Por qué puerta hay que salir?",
          options: ["a) La puerta trasera", "b) La puerta principal", "c) La puerta norte", "d) Cualquiera"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Sal por la puerta principal".',
        },
        {
          id: 3,
          question: "¿Por qué calle se camina desde la plaza?",
          options: ["a) Tallers", "b) Portal Nou", "c) Pelai", "d) Riera Alta"],
          correctAnswer: 2,
          explanation: 'El texto dice: "camina recto por la calle Pelai".',
        },
        {
          id: 4,
          question: "¿Cuántos metros hay que caminar por Pelai?",
          options: [
            "a) Cien metros",
            "b) Doscientos metros",
            "c) Trescientos metros",
            "d) Quinientos metros",
          ],
          correctAnswer: 2,
          explanation: 'El texto dice: "unos trescientos metros".',
        },
        {
          id: 5,
          question: "¿Dónde hay que girar a la izquierda?",
          options: ["a) En la plaza", "b) En el edificio rojo", "c) En el semáforo", "d) En la fuente"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Cuando veas el edificio rojo, gira a la izquierda".',
        },
        {
          id: 6,
          question: "¿Qué hay en la pequeña plaza?",
          options: ["a) Un árbol", "b) Una fuente", "c) Un mercado", "d) Una iglesia"],
          correctAnswer: 1,
          explanation: 'El texto dice: "una pequeña plaza con una fuente".',
        },
        {
          id: 7,
          question: "¿Cuál es la calle después de la plaza?",
          options: ["a) Tallers", "b) Riera Alta", "c) Portal Nou", "d) Pelai"],
          correctAnswer: 1,
          explanation: 'El texto dice: "toma la calle de la derecha, que se llama Riera Alta".',
        },
        {
          id: 8,
          question: "¿Dónde hay que girar a la derecha?",
          options: [
            "a) En la primera calle",
            "b) En el segundo semáforo",
            "c) En la plaza",
            "d) En el edificio rojo",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "En el segundo semáforo, gira a la derecha".',
        },
        {
          id: 9,
          question: "¿Cuál es el número del edificio?",
          options: ["a) El número 10", "b) El número 12", "c) El número 15", "d) El número 20"],
          correctAnswer: 2,
          explanation: 'El texto dice: "el número quince".',
        },
        {
          id: 10,
          question: "¿De qué color es la casa?",
          options: ["a) Roja", "b) Verde", "c) Azul", "d) Blanca"],
          correctAnswer: 2,
          explanation: 'El texto dice: "una casa azul".',
        },
      ],
    },
    listening: {
      title: "Perdido en Madrid",
      transcription: `Hola, soy Juan y os voy a contar la vez que me perdí en Madrid. Era mi primera vez en la capital y no conocía la ciudad.

Había quedado con un amigo en una cafetería llamada "El Gato Negro", en la calle Fuencarral. Tomé el metro y bajé en la estación de Gran Vía. Salí a la calle y empecé a caminar.

El problema es que Madrid tiene muchas calles que se parecen. Caminé recto, pero en una esquina giré a la izquierda en vez de a la derecha. Caminé diez minutos y no vi la cafetería. Me di cuenta de que algo iba mal.

Saqué el móvil para usar el GPS, pero la batería estaba al cinco por ciento. ¡Perfecto! Me acercaba a un señor mayor y le pregunté: "Disculpe, ¿dónde está la calle Fuencarral?"

El señor me miró y dijo: "Joven, está a tres calles de aquí. Tiene que volver sobre sus pasos, girar a la derecha en el semáforo y después seguir recto. Verá la calle a su izquierda."

Seguí sus indicaciones y, efectivamente, encontré la calle Fuencarral. La cafetería estaba a cincuenta metros. Llegué con veinte minutos de retraso, pero mi amigo todavía no había llegado.

Desde ese día, siempre llevo un cargador portátil y descargo el mapa de la ciudad antes de salir.`,
      questions: [
        {
          id: 1,
          question: "¿Dónde había quedado Juan?",
          options: [
            "a) En un restaurante",
            'b) En una cafetería llamada "El Gato Negro"',
            "c) En un cine",
            "d) En un museo",
          ],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Dónde bajó del metro?",
          options: ["a) En Sol", "b) En Gran Vía", "c) En Atocha", "d) En Tribunal"],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "¿Qué calle buscaba?",
          options: ["a) Gran Vía", "b) Fuencarral", "c) Alcalá", "d) Serrano"],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "¿En qué dirección giró mal?",
          options: ["a) A la derecha", "b) A la izquierda", "c) Recto", "d) No giró"],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "¿Por qué no pudo usar el GPS?",
          options: [
            "a) No tenía internet",
            "b) La batería estaba al 5%",
            "c) Se le rompió el móvil",
            "d) No sabía usarlo",
          ],
          correctAnswer: 1,
        },
        {
          id: 6,
          question: "¿A quién preguntó?",
          options: ["a) A un policía", "b) A un señor mayor", "c) A una turista", "d) A un camarero"],
          correctAnswer: 1,
        },
        {
          id: 7,
          question: "¿Qué le dijo el señor?",
          options: [
            "a) Que estaba lejos",
            "b) Que volviera, girara a la derecha y siguiera recto",
            "c) Que tomara un taxi",
            "d) Que estaba en la calle equivocada",
          ],
          correctAnswer: 1,
        },
        {
          id: 8,
          question: "¿A qué distancia estaba la cafetería de Fuencarral?",
          options: ["a) Diez metros", "b) Cincuenta metros", "c) Cien metros", "d) Doscientos metros"],
          correctAnswer: 1,
        },
        {
          id: 9,
          question: "¿Con cuánto retraso llegó?",
          options: ["a) Diez minutos", "b) Veinte minutos", "c) Media hora", "d) Una hora"],
          correctAnswer: 1,
        },
        {
          id: 10,
          question: "¿Qué lleva ahora siempre?",
          options: ["a) Un mapa de papel", "b) Un cargador portátil", "c) Una brújula", "d) Un taxi"],
          correctAnswer: 1,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Cómo llegar a mi casa",
        description:
          "Escribe instrucciones para llegar a tu casa desde un punto conocido. Incluye: calles, giros, puntos de referencia.",
        structure: {
          intro: "Di desde dónde empiezan las instrucciones.",
          body: "Describe el camino paso a paso.",
          conclusion: "Di cómo reconocer tu casa.",
        },
        connectors: ["Primero", "Después", "Gira a", "Sigue recto", "Finalmente"],
        wordCount: "80-120 palabras",
      },
      optionB: {
        title: "Una vez que me perdí",
        description:
          "Escribe sobre una vez que te perdiste. Incluye: dónde estabas, qué pasó, cómo encontraste el camino.",
        structure: {
          intro: "Di dónde y cuándo te perdiste.",
          body: "Describe lo que pasó.",
          conclusion: "Di cómo lo solucionaste.",
        },
        connectors: ["Una vez", "Estaba en", "Me di cuenta de que", "Por suerte", "Al final"],
        wordCount: "80-120 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Cómo llegar a un lugar de tu ciudad",
        description:
          "Explica cómo llegar a un lugar conocido de tu ciudad durante 1-2 minutos. Usa direcciones claras.",
        connectors: ["Para llegar a", "Primero ve a", "Después gira", "Sigue recto hasta", "Está al lado de"],
        guideQuestions: [
          "¿Cual es tu experiencia mas memorable?",
          "¿Que habilidades has desarrollado?",
          "¿Como ha evolucionado para ti?",
          "¿Que importancia tiene en tu rutina?",
        ],
      },
      topic2: {
        title: "Usar el GPS vs. preguntar a la gente",
        description:
          "Habla sobre si prefieres usar el GPS o preguntar a la gente cuando te pierdes. Di ventajas de cada opción.",
        connectors: ["Cuando me pierdo", "Prefiero", "El GPS es", "Pero preguntar a la gente", "Creo que"],
        guideQuestions: [
          "¿Desde cuando forma parte de tu vida?",
          "¿Que desafios has encontrado?",
          "¿Como te ha cambiado?",
          "¿Que le recomendarias a un principiante?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero estáis en una ciudad nueva y os habéis perdido. Tenéis que decidir cómo llegar a vuestro destino pidiendo ayuda.",
      questions: [
        {
          question: "¿Dónde creemos que estamos? ¿Qué calles vemos cerca?",
          help: "Describe la ubicación. Usa: Creo que estamos en... / Veo...",
          usefulPhrases: [
            "En el dia a dia...",
            "Mi consejo directo es...",
            "Piensa tambien en...",
            "Observa que...",
            "Una buena practica es...",
            "El rasgo distintivo es...",
          ],
        },
        {
          question: "¿A quién le preguntamos? ¿A un policía, a un comerciante?",
          help: "Sugiere a quién preguntar. Usa: Es mejor preguntar a... porque...",
          usefulPhrases: [
            "Analizando las opciones...",
            "Te serviria mucho...",
            "Valorar la alternativa de...",
            "Cabe destacar que...",
            "Un recurso muy valioso es...",
            "El factor diferenciador es...",
          ],
        },
        {
          question: "¿Usamos el móvil o preferimos preguntar a alguien?",
          help: "Decide el método. Usa: Yo prefiero... / El problema del móvil es que...",
          usefulPhrases: [
            "En primera persona...",
            "La mejor decision seria...",
            "Abre la mente a...",
            "Es curioso notar que...",
            "Un procedimiento exitoso es...",
            "El rasgo caracteristico es...",
          ],
        },
      ],
    },
  },
  {
    id: 18,
    level: "A2",
    theme: "La rutina diaria",
    icon: "Clock",
    vocabulary: [
      {
        word: "despertarse",
        definition: "Dejar de dormir y empezar a estar despierto",
        chinese: "醒来",
        example: "Me despierto a las siete todos los días.",
      },
      {
        word: "ducharse",
        definition: "Lavarse el cuerpo con agua",
        chinese: "淋浴",
        example: "Me ducho con agua caliente.",
      },
      {
        word: "vestirse",
        definition: "Ponerse ropa",
        chinese: "穿衣服",
        example: "Me visto rápido por la mañana.",
      },
      {
        word: "desayunar",
        definition: "Comer la primera comida del día",
        chinese: "吃早餐",
        example: "Desayuno cereales con leche.",
      },
      {
        word: "trabajar",
        definition: "Realizar una actividad para ganar dinero",
        chinese: "工作",
        example: "Trabajo ocho horas diarias.",
      },
      {
        word: "almorzar",
        definition: "Comer el plato principal del mediodía",
        chinese: "吃午餐",
        example: "Almuerzo a las dos de la tarde.",
      },
      {
        word: "merendar",
        definition: "Comer algo ligero por la tarde",
        chinese: "吃下午茶",
        example: "Los niños merienden a las cinco.",
      },
      {
        word: "cenar",
        definition: "Comer la última comida del día",
        chinese: "吃晚餐",
        example: "Cenamos temprano en casa.",
      },
      {
        word: "acostarse",
        definition: "Irse a la cama a dormir",
        chinese: "睡觉",
        example: "Me acuesto a las once.",
      },
      {
        word: "siesta",
        definition: "Descanso corto después de comer",
        chinese: "午睡",
        example: "En España mucha gente hace la siesta.",
      },
      {
        word: "hogar",
        definition: "Lugar donde vive una familia",
        chinese: "家",
        example: "Me gusta estar en mi hogar.",
      },
    ],
    reading: {
      textType: "narrativo",
      title: "Un día en la vida de Carlos",
      text: `Carlos es un estudiante universitario de veintiún años que vive en Granada. Su vida es ocupada pero organizada. Este es su día típico.

Se despierta a las siete de la mañana sin necesidad de despertador. Lo primero que hace es beber un vaso de agua y abrir la ventana para dejar entrar la luz. Después, se ducha en diez minutos. Nunca usa agua muy caliente porque dice que le despierta mejor el agua fría.

Se viste rápido: vaqueros, camiseta y zapatillas. No se peina mucho, solo se echa un poco de gel. Desayuna en la cocina con sus compañeros de piso: tostadas con aceite y tomate, café con leche y un zumo de naranja. Charlan un poco sobre el día que les espera.

A las ocho y cuarto sale de casa. Coge el autobús porque la universidad queda lejos. El viaje dura veinte minutos. En el autobús repasa apuntes o escucha música.

Las clases empiezan a las nueve y terminan a la una. Tiene tres clases por la mañana con un descanso de media hora a las once. En el descanso, toma un café en la cafetería de la facultad con sus amigos.

A la una y media almuerza en casa. Su madre le envía comida casera los lunes y él la calienta en el microondas. Come lentamente y aprovecha para descansar un rato. A veces echa una siesta de quince minutos.

Por la tarde, de tres a cinco, trabaja en una biblioteca como becario. Organiza libros y ayuda a otros estudiantes. A las cinco y media hace deporte en el gimnasio de la universidad.

Vuelve a casa a las siete, se ducha otra vez y cena con sus compañeros. Cenan algo ligero: ensalada, sopa o tortilla. Después, estudia un par de horas en su habitación.

A las once se acosta. Lee un rato un libro hasta que se le cierran los ojos. Normalmente, duerme ocho horas. "Dormir bien es la clave del éxito", dice Carlos.`,
      questions: [
        {
          id: 1,
          question: "¿A qué hora se despierta Carlos?",
          options: ["a) A las seis", "b) A las siete", "c) A las ocho", "d) A las nueve"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Se despierta a las siete".',
        },
        {
          id: 2,
          question: "¿Por qué usa agua fría en la ducha?",
          options: [
            "a) Porque le gusta",
            "b) Porque no hay agua caliente",
            "c) Porque le despierta mejor",
            "d) Porque es más rápido",
          ],
          correctAnswer: 2,
          explanation: 'El texto dice: "le despierta mejor el agua fría".',
        },
        {
          id: 3,
          question: "¿Qué desayuna?",
          options: ["a) Cereales", "b) Tostadas con aceite y tomate, café y zumo", "c) Fruta", "d) Nada"],
          correctAnswer: 1,
          explanation: 'El texto dice: "tostadas con aceite y tomate, café con leche y un zumo de naranja".',
        },
        {
          id: 4,
          question: "¿Cómo va a la universidad?",
          options: ["a) A pie", "b) En bici", "c) En autobús", "d) En coche"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Coge el autobús".',
        },
        {
          id: 5,
          question: "¿A qué hora terminan las clases?",
          options: ["a) A las doce", "b) A la una", "c) A las dos", "d) A las tres"],
          correctAnswer: 1,
          explanation: 'El texto dice: "terminan a la una".',
        },
        {
          id: 6,
          question: "¿Quién le envía comida?",
          options: ["a) Su abuela", "b) Su madre", "c) Él la cocina", "d] Su compañero"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Su madre le envía comida casera".',
        },
        {
          id: 7,
          question: "¿Cuánto dura su siesta?",
          options: ["a) Cinco minutos", "b) Diez minutos", "c) Quince minutos", "d) Media hora"],
          correctAnswer: 2,
          explanation: 'El texto dice: "una siesta de quince minutos".',
        },
        {
          id: 8,
          question: "¿Dónde trabaja por la tarde?",
          options: [
            "a) En un restaurante",
            "b) En una biblioteca",
            "c) En una tienda",
            "d) En la universidad",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "trabaja en una biblioteca".',
        },
        {
          id: 9,
          question: "¿A qué hora vuelve a casa?",
          options: ["a) A las seis", "b) A las siete", "c) A las ocho", "d) A las nueve"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Vuelve a casa a las siete".',
        },
        {
          id: 10,
          question: "¿A qué hora se acuesta?",
          options: ["a) A las diez", "b) A las once", "c) A las doce", "d) A la una"],
          correctAnswer: 1,
          explanation: 'El texto dice: "A las once se acosta".',
        },
      ],
    },
    listening: {
      title: "La rutina de una madre trabajadora",
      transcription: `Soy Patricia, tengo treinta y cinco años y soy madre de dos niños. Trabajo como recepcionista en un hotel y mi rutina es muy ajustada.

Me despierto a las seis de la mañana, antes que todos en casa. Lo primero es preparar el desayuno para mi familia: leche, cereales, tostadas y zumo. Mientras ellos desayunan, yo me ducho y me visto rápido.

A las siete y media, despierto a los niños. Les ayudo a vestirse y les peino. Mi marido los lleva al colegio en coche mientras yo salgo para el trabajo.

Llego al hotel a las ocho y media. Mi turno empieza a las nueve. Trabajo hasta las cinco de la tarde con una hora para comer a mediodía. En el trabajo atiendo llamadas, recibo a los huéspedes y resuelvo problemas.

A las cinco y cuarto recojo a los niños del colegio. Vamos a casa y les doy la merienda: yogur con fruta. Después, les ayudo con los deberes.

A las siete empiezo a preparar la cena. Cocino algo sencillo: pasta, pollo con verduras o pescado a la plancha. Cenamos todos juntos a las ocho. Es el único momento del día en que estamos todos tranquilos.

Después de cenar, lavo los platos, preparo la ropa para el día siguiente y doy un baño a los niños. A las nueve y media los acuesto y les leo un cuento.

A las diez, por fin, tengo tiempo para mí. Leo un rato, veo algo de televisión o hablo con mi marido. Me acuesto a las once. Es una vida cansada pero feliz.`,
      questions: [
        {
          id: 1,
          question: "¿Cuántos hijos tiene Patricia?",
          options: ["a) Uno", "b) Dos", "c) Tres", "d) Cuatro"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿A qué hora se despierta?",
          options: ["a) A las cinco", "b) A las seis", "c) A las siete", "d) A las ocho"],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "¿Qué prepara por la mañana?",
          options: ["a) La comida", "b) El desayuno", "c) La cena", "d) La merienda"],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "¿Quién lleva a los niños al colegio?",
          options: ["a) Patricia", "b) Su marido", "c) El autobús escolar", "d) Una vecina"],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "¿A qué hora empieza su turno?",
          options: ["a) A las ocho", "b) A las nueve", "c) A las diez", "d) A las ocho y media"],
          correctAnswer: 1,
        },
        {
          id: 6,
          question: "¿A qué hora termina de trabajar?",
          options: ["a) A las cuatro", "b) A las cinco", "c) A las seis", "d) A las siete"],
          correctAnswer: 1,
        },
        {
          id: 7,
          question: "¿Qué les da de merendar a los niños?",
          options: ["a) Galletas", "b) Yogur con fruta", "c) Bocadillo", "d) Zumo"],
          correctAnswer: 1,
        },
        {
          id: 8,
          question: "¿A qué hora cenan?",
          options: ["a) A las siete", "b) A las ocho", "c) A las nueve", "d) A las diez"],
          correctAnswer: 1,
        },
        {
          id: 9,
          question: "¿A qué hora acuesta a los niños?",
          options: ["a) A las ocho y media", "b) A las nueve", "c) A las nueve y media", "d) A las diez"],
          correctAnswer: 2,
        },
        {
          id: 10,
          question: "¿A qué hora se acuesta Patricia?",
          options: ["a) A las diez", "b) A las once", "c) A las doce", "d) A la una"],
          correctAnswer: 1,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi día típico",
        description:
          "Escribe sobre tu día típico. Incluye: a qué hora te levantas, qué haces por la mañana, tarde y noche.",
        structure: {
          intro: "Presenta tu rutina general.",
          body: "Describe tu día por partes.",
          conclusion: "Di si te gusta tu rutina.",
        },
        connectors: ["Me despierto a", "Por la mañana", "Después", "Por la tarde", "Finalmente"],
        wordCount: "80-120 palabras",
      },
      optionB: {
        title: "Mi fin de semana ideal",
        description:
          "Escribe sobre tu fin de semana ideal. Incluye: a qué hora te levantas, qué haces, con quién.",
        structure: {
          intro: "Presenta tu fin de semana ideal.",
          body: "Describe las actividades.",
          conclusion: "Di por qué sería perfecto.",
        },
        connectors: ["El sábado", "El domingo", "Me gustaría", "También", "Sería perfecto porque"],
        wordCount: "80-120 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Mi rutina diaria",
        description:
          "Habla sobre tu rutina diaria durante 1-2 minutos. Di a qué hora te levantas, qué haces por la mañana, a qué hora comes, qué haces por la tarde y a qué hora te acuestas.",
        connectors: ["Me despierto a", "Lo primero que hago es", "Después", "Por la tarde", "Me acuesto a"],
        guideQuestions: [
          "¿Que te sorprendio al conocer mas sobre esto?",
          "¿Como influye en tu dia a dia?",
          "¿Que relacion tiene con tu cultura?",
          "¿Como lo ves en el futuro?",
        ],
      },
      topic2: {
        title: "Fines de semana vs. días laborables",
        description:
          "Habla sobre las diferencias entre tus días laborables y tus fines de semana. Di qué haces en cada caso y cuál prefieres.",
        connectors: ["Entre semana", "Los fines de semana", "La diferencia es", "Prefiero", "Porque"],
        guideQuestions: [
          "¿Cual es tu relacion con este tema?",
          "¿Que ventajas tiene para ti?",
          "¿Has tenido algun problema relacionado?",
          "¿Como lo mejorarias?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero comparáis vuestras rutinas diarias. Tenéis que hablar de vuestros horarios y dar consejos para organizar mejor el tiempo.",
      questions: [
        {
          question: "¿A qué hora te levantas y te acuestas? ¿Tienes una rutina fija?",
          help: "Describe tu rutina. Usa: Me levanto a... / Me acuesto a...",
          usefulPhrases: [
            "Si hablamos claro...",
            "Intentalo de esta forma...",
            "Dale un enfoque a...",
            "No pasa desapercibido que...",
            "Una dinamica positiva es...",
            "El sello distintivo es...",
          ],
        },
        {
          question: "¿Qué haces en tu tiempo libre? ¿Cómo organizas tu día?",
          help: "Habla de tu organización. Usa: En mi tiempo libre... / Intento...",
          usefulPhrases: [
            "Sin rodeos...",
            "Tu mejor apuesta es...",
            "Introduce la variable de...",
            "Es evidente que...",
            "Una costumbre beneficiosa es...",
            "La marca de identidad es...",
          ],
        },
        {
          question: "¿Cómo podríamos ser más productivos? ¿Tienes algún consejo?",
          help: "Da consejos. Usa: Podríamos... / Es útil...",
          usefulPhrases: [
            "Con franqueza...",
            "Te ira genial si...",
            "Incorpora la idea de...",
            "Se aprecia claramente que...",
            "Un protocolo eficiente es...",
            "El indicador principal es...",
          ],
        },
      ],
    },
  },
  {
    id: 19,
    level: "A2",
    theme: "El cine y la televisión",
    icon: "Film",
    vocabulary: [
      {
        word: "película",
        definition: "Historia grabada en vídeo para ver en el cine o en casa",
        chinese: "电影",
        example: "Anoche vi una película muy buena.",
      },
      {
        word: "serie",
        definition: "Historia dividida en varios capítulos",
        chinese: "电视剧",
        example: "Estoy viendo una serie española.",
      },
      {
        word: "actor",
        definition: "Hombre que interpreta un papel en una película",
        chinese: "男演员",
        example: "Ese actor es muy famoso.",
      },
      {
        word: "actriz",
        definition: "Mujer que interpreta un papel en una película",
        chinese: "女演员",
        example: "La actriz ganó un premio importante.",
      },
      {
        word: "director",
        definition: "Persona que dirige una película",
        chinese: "导演",
        example: "El director de la película es español.",
      },
      {
        word: "pantalla",
        definition: "Superficie donde se ven las películas o series",
        chinese: "屏幕",
        example: "La pantalla del cine es enorme.",
      },
      {
        word: "entrada",
        definition: "Billete para ver una película en el cine",
        chinese: "电影票",
        example: "Las entradas cuestan ocho euros.",
      },
      {
        word: "palomitas",
        definition: "Maíz reventado que se come en el cine",
        chinese: "爆米花",
        example: "Compré palomitas y un refresco.",
      },
      {
        word: "capítulo",
        definition: "Parte de una serie o programa",
        chinese: "集",
        example: "Ví tres capítulos seguidos.",
      },
      {
        word: "documental",
        definition: "Programa o película sobre hechos reales",
        chinese: "纪录片",
        example: "El documental sobre la naturaleza fue increíble.",
      },
      {
        word: "estreno",
        definition: "Primera vez que se muestra una película",
        chinese: "首映",
        example: "El estreno de la película es el viernes.",
      },
    ],
    reading: {
      textType: "descriptivo",
      title: "El cine español",
      text: `El cine español tiene una historia larga y rica. Desde los años cincuenta hasta hoy, ha producido películas que han ganado premios en todo el mundo. Directores españoles como Pedro Almodóvar son conocidos internacionalmente.

Almodóvar es quizás el director español más famoso. Sus películas tienen colores vivos, historias emocionales y personajes inolvidables. Películas como "Todo sobre mi madre" y "Volver" ganaron premios en festivales como Cannes. Su estilo es único y fácil de reconocer.

En los últimos años, el cine español ha crecido mucho. Películas como "El laberinto del fauno" de Guillermo del Toro, aunque el director es mexicano, se filmó en España con actores españoles. También "La isla mínima", un thriller ambientado en los años setenta, tuvo mucho éxito.

Netflix y otras plataformas han ayudado al cine español a llegar a más gente. Series como "La Casa de Papel" se convirtieron en fenómenos mundiales. "Élite", otra serie española, también tiene millones de espectadores en todo el mundo.

Los españoles van al cine con frecuencia. El cine es una de las actividades de ocio más populares, especialmente entre los jóvenes. Los estrenos de viernes por la noche siempre atraen a mucho público. Las palomatas, por supuesto, son esenciales.

El Goya es el premio más importante del cine español. Se entrega cada año en una gala muy esperada. Ganar un Goya es el sueño de todo actor y director español.`,
      questions: [
        {
          id: 1,
          question: "¿Quién es el director español más famoso mencionado?",
          options: [
            "a) Guillermo del Toro",
            "b) Pedro Almodóvar",
            "c) Alejandro Amenábar",
            "d) Javier Bardem",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Almodóvar es quizás el director español más famoso".',
        },
        {
          id: 2,
          question: "¿Qué película ganó premios en Cannes?",
          options: [
            "a) El laberinto del fauno",
            "b) La isla mínima",
            "c) Todo sobre mi madre y Volver",
            "d) La Casa de Papel",
          ],
          correctAnswer: 2,
          explanation:
            'El texto dice: "Películas como Todo sobre mi madre y Volver ganaron premios en festivales como Cannes".',
        },
        {
          id: 3,
          question: "¿De qué país es Guillermo del Toro?",
          options: ["a) Español", "b) Mexicano", "c) Argentino", "d) Colombiano"],
          correctAnswer: 1,
          explanation: 'El texto dice: "aunque el director es mexicano".',
        },
        {
          id: 4,
          question: '¿En qué época está ambientada "La isla mínima"?',
          options: ["a) Años cincuenta", "b) Años sesenta", "c) Años setenta", "d) Años ochenta"],
          correctAnswer: 2,
          explanation: 'El texto dice: "un thriller ambientado en los años setenta".',
        },
        {
          id: 5,
          question: "¿Qué serie se convirtió en fenómeno mundial?",
          options: ["a) Élite", "b) La Casa de Papel", "c) Las chicas del cable", "d) Elite"],
          correctAnswer: 1,
          explanation:
            'El texto dice: "Series como La Casa de Papel se convirtieron en fenómenos mundiales".',
        },
        {
          id: 6,
          question: "¿Cuál es una de las actividades de ocio más populares?",
          options: ["a) Ir al teatro", "b) Ir al cine", "c) Ir a conciertos", "d) Ir a museos"],
          correctAnswer: 1,
          explanation: 'El texto dice: "El cine es una de las actividades de ocio más populares".',
        },
        {
          id: 7,
          question: "¿Qué día suelen ir los jóvenes al cine?",
          options: ["a) Lunes", "b) Miércoles", "c) Viernes", "d) Domingo"],
          correctAnswer: 2,
          explanation:
            'El texto dice: "Los estrenos de viernes por la noche siempre atraen a mucho público".',
        },
        {
          id: 8,
          question: "¿Cuál es el premio más importante del cine español?",
          options: ["a) El Oscar", "b) El Goya", "c) El César", "d) El BAFTA"],
          correctAnswer: 1,
          explanation: 'El texto dice: "El Goya es el premio más importante del cine español".',
        },
        {
          id: 9,
          question: "¿Cada cuánto se entrega el Goya?",
          options: ["a) Cada mes", "b) Cada seis meses", "c) Cada año", "d) Cada dos años"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Se entrega cada año".',
        },
        {
          id: 10,
          question: "¿Qué ha ayudado al cine español a llegar a más gente?",
          options: ["a) Los festivales", "b) Netflix y otras plataformas", "c) Los cines", "d) La radio"],
          correctAnswer: 1,
          explanation:
            'El texto dice: "Netflix y otras plataformas han ayudado al cine español a llegar a más gente".',
        },
      ],
    },
    listening: {
      title: "Mi serie favorita",
      transcription: `Hola, soy Marta y os quiero hablar de mi serie favorita: "La Casa de Papel".

La empecé a ver hace dos años porque todos mis amigos la recomendaban. Al principio no me llamaba la atención porque pensaba que era solo un atraco más. Pero desde el primer capítulo me enganché.

La serie trata sobre un grupo de delincuentes que asaltan la Fábrica Nacional de Moneda y Timbre de Madrid. El líder se llama El Profesor y es un genio. Planifica todo durante años: cada detalle, cada posible problema. Los otros personajes tienen nombres de ciudades: Tokio, Berlín, Nairobi, Río, Denver, Helsinki y Oslo.

Lo que más me gusta es cómo el Profesor siempre está un paso adelante de la policía. Cada capítulo tiene giros inesperados que te dejan con la boca abierta. Y el personaje de Berlín, aunque es un villano, tiene un carisma increíble.

He visto las cinco partes dos veces. La primera fue con subtítulos en español para entender todo. La segunda, sin subtítulos para practicar mi comprensión auditiva. Me ha ayudado mucho a mejorar mi español.

Mi capítulo favorito es el de la fuga del Profesor por el río Madrid. Es pura tensión y emoción. Si no habéis visto la serie, os la recomiendo mucho. Está en Netflix y tiene un final épico.`,
      questions: [
        {
          id: 1,
          question: "¿Cuál es la serie favorita de Marta?",
          options: ["a] Élite", "b] La Casa de Papel", "c] Las chicas del cable", "d] Vis a vis"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Cuánto hace que la empezó a ver?",
          options: ["a] Un año", "b] Dos años", "c] Tres años", "d] Seis meses"],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "¿De qué trata la serie?",
          options: [
            "a] Un robo en un banco",
            "b] Un atraco a la Fábrica de Moneda",
            "c] Una historia de amor",
            "d] Una comedia",
          ],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "¿Cómo se llama el líder?",
          options: ["a] Berlín", "b] El Profesor", "c] Tokio", "d] Río"],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "¿De qué ciudad no es un personaje?",
          options: ["a] Tokio", "b] Madrid", "c] Nairobi", "d] Berlín"],
          correctAnswer: 1,
        },
        {
          id: 6,
          question: "¿Cuántas veces ha visto la serie?",
          options: ["a] Una", "b] Dos", "c] Tres", "d] Cuatro"],
          correctAnswer: 1,
        },
        {
          id: 7,
          question: "¿Por qué la vio la segunda vez?",
          options: [
            "a] Porque le gustó más",
            "b] Para practicar español",
            "c] Porque no entendió el final",
            "d] Porque su amigo se la pidió",
          ],
          correctAnswer: 1,
        },
        {
          id: 8,
          question: "¿Cuál es su capítulo favorito?",
          options: ["a] El primero", "b] El de la fuga del Profesor", "c] El último", "d] El del atraco"],
          correctAnswer: 1,
        },
        {
          id: 9,
          question: "¿Dónde se puede ver la serie?",
          options: ["a] En HBO", "b] En Netflix", "c] En Amazon Prime", "d] En la tele"],
          correctAnswer: 1,
        },
        {
          id: 10,
          question: "¿Qué le ha ayudado la serie?",
          options: ["a] A conocer gente", "b] A mejorar su español", "c] A encontrar trabajo", "d] A viajar"],
          correctAnswer: 1,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi película favorita",
        description:
          "Escribe sobre tu película favorita. Incluye: título, género, argumento, por qué te gusta.",
        structure: {
          intro: "Presenta la película.",
          body: "Describe el argumento y los personajes.",
          conclusion: "Explica por qué te gusta.",
        },
        connectors: [
          "Mi película favorita es",
          "Trata sobre",
          "Los personajes son",
          "Me gusta porque",
          "Te la recomiendo",
        ],
        wordCount: "80-120 palabras",
      },
      optionB: {
        title: "Cine vs. ver películas en casa",
        description: "Escribe sobre las ventajas de ir al cine y de ver películas en casa. ¿Qué prefieres?",
        structure: {
          intro: "Presenta las dos opciones.",
          body: "Describe ventajas de cada una.",
          conclusion: "Di qué prefieres y por qué.",
        },
        connectors: ["Ir al cine tiene", "Pero ver en casa", "Por un lado", "Por otro lado", "Yo prefiero"],
        wordCount: "80-120 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Mi película o serie favorita",
        description:
          "Habla sobre tu película o serie favorita durante 1-2 minutos. Di de qué trata, quiénes son los protagonistas, por qué te gusta.",
        connectors: [
          "Mi favorita es",
          "Es una película/serie de",
          "Trata sobre",
          "Los protagonistas son",
          "Me encanta porque",
        ],
        guideQuestions: [
          "¿Como empezaste en esto?",
          "¿Que es lo mas dificil y lo mas facil?",
          "¿Como influye en tus relaciones?",
          "¿Que has aprendido?",
        ],
      },
      topic2: {
        title: "El cine en mi país",
        description:
          "Habla sobre el cine en tu país. Di si es popular, qué tipo de películas se hacen, si vas a menudo.",
        connectors: ["En mi país", "El cine es", "Se hacen películas de", "Yo voy al cine", "Creo que"],
        guideQuestions: [
          "¿Por que te resulta importante?",
          "¿Que cambios te ha traido?",
          "¿Como lo ves en otros paises?",
          "¿Que te gustaria que mejorara?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero queréis ver una película juntos pero no os ponéis de acuerdo. Tenéis que decidir qué ver y dónde.",
      questions: [
        {
          question: "¿Qué tipo de películas te gustan? ¿Acción, comedia, drama?",
          help: "Habla de tus gustos. Usa: Me gustan las películas de... / No me gustan...",
          usefulPhrases: [
            "Hablando sin tapujos...",
            "Notaras la diferencia con...",
            "Plantea la posibilidad de...",
            "Resulta obvio que...",
            "Una rutina recomendable es...",
            "El parametro esencial es...",
          ],
        },
        {
          question: "¿Vamos al cine o vemos algo en casa?",
          help: "Decide dónde. Usa: Es mejor ir al cine porque... / Prefiero en casa porque...",
          usefulPhrases: [
            "Sin ambages...",
            "Experimenta con...",
            "Desarrolla el concepto de...",
            "Se constata que...",
            "Un sistema que funciona es...",
            "El baremo decisivo es...",
          ],
        },
        {
          question: "¿Qué película podemos ver que nos guste a los dos?",
          help: "Negocia. Usa: ¿Qué te parece...? / Podemos ver...",
          usefulPhrases: [
            "Directamente...",
            "Atrévete a probar...",
            "Formula la hipotesis de...",
            "Queda patente que...",
            "Una forma acertada es...",
            "El criterio clave es...",
          ],
        },
      ],
    },
  },
  {
    id: 20,
    level: "A2",
    theme: "Los deportes",
    icon: "Trophy",
    vocabulary: [
      {
        word: "fútbol",
        definition: "Deporte donde dos equipos de once jugadores intentan marcar goles",
        chinese: "足球",
        example: "El fútbol es el deporte más popular.",
      },
      {
        word: "baloncesto",
        definition: "Deporte donde dos equipos lanzan una pelota a una canasta",
        chinese: "篮球",
        example: "Juego al baloncesto los fines de semana.",
      },
      {
        word: "natación",
        definition: "Deporte que consiste en nadar",
        chinese: "游泳",
        example: "La natación es muy buena para la espalda.",
      },
      {
        word: "correr",
        definition: "Moverse rápidamente a pie",
        chinese: "跑步",
        example: "Salgo a correr cada mañana.",
      },
      {
        word: "gimnasio",
        definition: "Lugar con aparatos para hacer ejercicio",
        chinese: "健身房",
        example: "Voy al gimnasio tres veces por semana.",
      },
      {
        word: "equipo",
        definition: "Grupo de personas que juegan juntas",
        chinese: "队伍",
        example: "Mi equipo favorito es el Real Madrid.",
      },
      {
        word: "partido",
        definition: "Encuentro deportivo entre dos equipos",
        chinese: "比赛",
        example: "El partido empieza a las ocho.",
      },
      {
        word: "entrenador",
        definition: "Persona que dirige y enseña a un equipo",
        chinese: "教练",
        example: "El entrenador es muy exigente.",
      },
      {
        word: "ejercicio",
        definition: "Actividad física para mantenerse en forma",
        chinese: "运动/锻炼",
        example: "Hacer ejercicio es bueno para la salud.",
      },
      {
        word: "carrera",
        definition: "Competición de correr",
        chinese: "赛跑",
        example: "Participé en una carrera de cinco kilómetros.",
      },
      {
        word: "medalla",
        definition: "Objeto que se da a los ganadores de una competición",
        chinese: "奖牌",
        example: "Ganó la medalla de oro.",
      },
    ],
    reading: {
      textType: "descriptivo",
      title: "Deportes populares en España",
      text: `El deporte es una parte fundamental de la vida española. Los españoles no solo disfrutan viendo deportes, sino también practicándolos. Vamos a ver los deportes más populares del país.

El fútbol es, sin duda, el deporte rey. España tiene dos de los clubes más grandes del mundo: el Real Madrid y el FC Barcelona. La selección española ganó la Copa del Mundo en dos mil diez y la Eurocopa en dos mil ocho y dos mil doce. Millones de personas ven los partidos cada semana.

El baloncesto es el segundo deporte más popular. España tiene uno de los mejores equipos nacionales del mundo, con jugadores como Pau Gasol. La Liga Endesa es la competición principal y muchos españoles siguen a sus equipos con pasión.

El ciclismo también tiene una gran tradición. La Vuelta a España es una de las tres grandes carreras ciclistas del mundo, junto con el Tour de Francia y el Giro de Italia. Cada agosto, los mejores ciclistas del mundo recorren las carreteras españolas.

En los últimos años, deportes como el pádel han crecido enormemente. El pádel es una mezcla de tenis y squash. En España hay más de cuatro millones de jugadores y las pistas están en todos los barrios.

También es popular la natación, especialmente en verano. Las piscinas municipales se llenan de familias que buscan refrescarse. Y el running, o correr, se ha convertido en una moda: cada fin de semana hay carreras populares en todas las ciudades.`,
      questions: [
        {
          id: 1,
          question: "¿Cuál es el deporte más popular en España?",
          options: ["a] Baloncesto", "b] Ciclismo", "c] Fútbol", "d] Natación"],
          correctAnswer: 2,
          explanation: 'El texto dice: "El fútbol es, sin duda, el deporte rey".',
        },
        {
          id: 2,
          question: "¿Cuándo ganó España la Copa del Mundo?",
          options: ["a] 2008", "b] 2010", "c] 2012", "d] 2014"],
          correctAnswer: 1,
          explanation: 'El texto dice: "ganó la Copa del Mundo en dos mil diez".',
        },
        {
          id: 3,
          question: "¿Cuál es el segundo deporte más popular?",
          options: ["a] Tenis", "b] Ciclismo", "c] Baloncesto", "d] Pádel"],
          correctAnswer: 2,
          explanation: 'El texto dice: "El baloncesto es el segundo deporte más popular".',
        },
        {
          id: 4,
          question: "¿Quién es Pau Gasol?",
          options: ["a] Un futbolista", "b] Un ciclista", "c] Un jugador de baloncesto", "d] Un tenista"],
          correctAnswer: 2,
          explanation: 'El texto dice: "jugadores como Pau Gasol" en la sección de baloncesto.',
        },
        {
          id: 5,
          question: "¿Cuál es una de las tres grandes carreras ciclistas?",
          options: ["a] El Tour de Francia", "b] La Vuelta a España", "c] Ambas", "d] Ninguna"],
          correctAnswer: 2,
          explanation:
            'El texto dice: "La Vuelta a España es una de las tres grandes carreras ciclistas del mundo, junto con el Tour de Francia".',
        },
        {
          id: 6,
          question: "¿Cuándo se celebra la Vuelta a España?",
          options: ["a] En junio", "b] En julio", "c] En agosto", "d] En septiembre"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Cada agosto".',
        },
        {
          id: 7,
          question: "¿Qué es el pádel?",
          options: [
            "a] Un tipo de tenis",
            "b] Una mezcla de tenis y squash",
            "c] Un tipo de fútbol",
            "d] Un deporte acuático",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "El pádel es una mezcla de tenis y squash".',
        },
        {
          id: 8,
          question: "¿Cuántos jugadores de pádel hay en España?",
          options: ["a] Un millón", "b] Dos millones", "c] Más de cuatro millones", "d] Diez millones"],
          correctAnswer: 2,
          explanation: 'El texto dice: "más de cuatro millones de jugadores".',
        },
        {
          id: 9,
          question: "¿Qué deporte es popular en verano?",
          options: ["a] Esquí", "b] Natación", "c] Ciclismo", "d] Pádel"],
          correctAnswer: 1,
          explanation: 'El texto dice: "También es popular la natación, especialmente en verano".',
        },
        {
          id: 10,
          question: "¿Qué se ha convertido en una moda?",
          options: ["a] Nadar", "b] Correr (running)", "c] Andar", "d] Bailar"],
          correctAnswer: 1,
          explanation: 'El texto dice: "el running, o correr, se ha convertido en una moda".',
        },
      ],
    },
    listening: {
      title: "Mi experiencia corriendo un maratón",
      transcription: `Hola, soy Alberto y hace seis meses corrí mi primer maratón en Madrid. Fue una de las experiencias más difíciles y gratificantes de mi vida.

Empecé a entrenar ocho meses antes. Al principio solo podía correr cinco kilómetros sin parar. Poco a poco fui aumentando la distancia: diez kilómetros, quince, veinte... Cada semana corría cuatro días: dos días cortos, un día largo y un día de descanso activo.

El día de la carrera, madrugué mucho. El maratón empezaba a las nueve de la mañana, pero llegué a las siete para calentar y ponerme el dorsal. Había más de diez mil corredores. El ambiente era increíble, con música y gente animando por todas partes.

Los primeros veinte kilómetros fueron bien. Mantenía un ritmo constante y me sentía fuerte. Pero del kilometro veinte al treinta, llamado "el muro", fue terrible. Las piernas me dolían, tenía sed y quería abandonar.

Lo que me salvó fue ver a mi familia en el kilómetro treinta y dos. Mi mujer y mis hijos tenían una pancarta que decía: "¡Papá, tú puedes!". Eso me dio fuerzas para seguir.

Los últimos diez kilómetros fueron pura voluntad. Corrí más despacio, pero no paré. Cuando vi la línea de meta, empecé a llorar. Había completado los cuarenta y dos kilómetros en cuatro horas y quince minutos.

Cruzando la meta, me dieron una medalla y una manta térmica. No podía caminar bien, pero sonreía como nunca. Ese día aprendí que los límites están solo en la cabeza.`,
      questions: [
        {
          id: 1,
          question: "¿Dónde corrió el maratón?",
          options: ["a] En Barcelona", "b] En Madrid", "c] En Sevilla", "d] En Valencia"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Cuánto tiempo entrenó?",
          options: ["a] Cuatro meses", "b] Seis meses", "c] Ocho meses", "d] Un año"],
          correctAnswer: 2,
        },
        {
          id: 3,
          question: "¿Cuántos kilómetros corría al principio?",
          options: ["a] Dos", "b] Cinco", "c] Diez", "d] Veinte"],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "¿A qué hora empezaba el maratón?",
          options: ["a] A las ocho", "b] A las nueve", "c] A las diez", "d] A las once"],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "¿Cuántos corredores había?",
          options: ["a] Mil", "b] Cinco mil", "c] Más de diez mil", "d] Veinte mil"],
          correctAnswer: 2,
        },
        {
          id: 6,
          question: "¿Cómo se llama la parte difícil del maratón?",
          options: ["a] La barrera", "b] El muro", "c] La montaña", "d] El desierto"],
          correctAnswer: 1,
        },
        {
          id: 7,
          question: "¿Dónde vio a su familia?",
          options: [
            "a] En el kilómetro 20",
            "b] En el kilómetro 30",
            "c] En el kilómetro 32",
            "d] En la meta",
          ],
          correctAnswer: 2,
        },
        {
          id: 8,
          question: "¿Qué le dieron en la meta?",
          options: ["a] Solo agua", "b] Una medalla y una manta térmica", "c] Un trofeo", "d] Una camiseta"],
          correctAnswer: 1,
        },
        {
          id: 9,
          question: "¿Cuánto duró el maratón?",
          options: ["a] Tres horas", "b] Cuatro horas", "c] Cuatro horas y quince minutos", "d] Cinco horas"],
          correctAnswer: 2,
        },
        {
          id: 10,
          question: "¿Qué aprendió Alberto?",
          options: [
            "a] Que correr es fácil",
            "b] Que los límites están en la cabeza",
            "c] Que no quiere volver a correr",
            "d] Que necesita entrenar más",
          ],
          correctAnswer: 1,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi deporte favorito",
        description:
          "Escribe sobre tu deporte favorito. Incluye: qué deporte es, cómo se juega, por qué te gusta.",
        structure: {
          intro: "Presenta tu deporte favorito.",
          body: "Describe cómo se juega y las reglas.",
          conclusion: "Explica por qué te gusta.",
        },
        connectors: [
          "Mi deporte favorito es",
          "Se juega",
          "Las reglas son",
          "Me gusta porque",
          "Te recomiendo",
        ],
        wordCount: "80-120 palabras",
      },
      optionB: {
        title: "Hacer deporte es importante",
        description:
          "Escribe sobre por qué es importante hacer deporte. Incluye: beneficios para la salud, para la mente, deportes que se pueden practicar.",
        structure: {
          intro: "Presenta la importancia del deporte.",
          body: "Describe los beneficios.",
          conclusion: "Anima a hacer deporte.",
        },
        connectors: ["Hacer deporte es importante", "Primero", "También", "Por ejemplo", "En conclusión"],
        wordCount: "80-120 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Mi deporte favorito",
        description:
          "Habla sobre tu deporte favorito durante 1-2 minutos. Di qué es, desde cuándo lo practicas, con quién y qué te gusta de él.",
        connectors: [
          "Mi deporte favorito es",
          "Practico desde",
          "Lo juego con",
          "Lo que más me gusta es",
          "Es importante para mí porque",
        ],
        guideQuestions: [
          "¿Que papel juega en tu vida?",
          "¿Como ha evolucionado?",
          "¿Que habilidades te ha aportado?",
          "¿Que planes tienes?",
        ],
      },
      topic2: {
        title: "Ver deporte vs. practicarlo",
        description: "Habla sobre si prefieres ver deporte o practicarlo. Di por qué y da ejemplos.",
        connectors: ["Prefiero", "Porque", "Cuando veo deporte", "Cuando practico", "Creo que"],
        guideQuestions: [
          "¿Como te afecta personalmente?",
          "¿Que diferencias ves con el pasado?",
          "¿Como influye en tu entorno?",
          "¿Que consejo darias?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero queréis hacer deporte juntos. Tenéis que decidir qué deporte practicar, dónde y con qué frecuencia.",
      questions: [
        {
          question: "¿Qué deporte te gustaría practicar juntos?",
          help: "Sugiere un deporte. Usa: ¿Te apetece jugar a...? / Podemos...",
          usefulPhrases: [
            "Con sinceridad...",
            "Lanza-te a...",
            "Vislumbra la opcion de...",
            "Se desprende que...",
            "Un acierto seguro es...",
            "El referente principal es...",
          ],
        },
        {
          question: "¿Dónde podemos practicarlo? ¿Necesitamos material?",
          help: "Organiza los detalles. Usa: Podemos ir a... / Necesitamos...",
          usefulPhrases: [
            "De forma directa...",
            "Olvidate de los miedos y...",
            "Contempla la alternativa de...",
            "Se infiere que...",
            "Una decision inteligente es...",
            "El modelo a seguir es...",
          ],
        },
        {
          question: "¿Con qué frecuencia quedamos? ¿Qué días os vienen bien?",
          help: "Planifica el horario. Usa: Podemos quedar... / Me viene bien...",
          usefulPhrases: [
            "Sin velos...",
            "Empieza ya a...",
            "Adopta la perspectiva de...",
            "Se deduce claramente que...",
            "Un enfoque ganador es...",
            "El paradigma correcto es...",
          ],
        },
      ],
    },
  },
];
export { a2Exams as default };
