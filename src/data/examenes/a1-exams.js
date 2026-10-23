export const a1Exams = [
  {
    id: 1,
    level: "A1",
    theme: "Presentaciones y saludos",
    icon: "User",
    vocabulary: [
      {
        word: "hola",
        definition: "Palabra para saludar",
        chinese: "你好",
        example: "Hola, ¿cómo estás?",
      },
      {
        word: "adiós",
        definition: "Palabra para despedirse",
        chinese: "再见",
        example: "Adiós, hasta mañana.",
      },
      {
        word: "gracias",
        definition: "Palabra para agradecer",
        chinese: "谢谢",
        example: "Gracias por tu ayuda.",
      },
      {
        word: "por favor",
        definition: "Palabra para pedir algo educadamente",
        chinese: "请",
        example: "Un café, por favor.",
      },
      {
        word: "buenos días",
        definition: "Saludo por la mañana",
        chinese: "早上好",
        example: "Buenos días, profesor.",
      },
      {
        word: "buenas tardes",
        definition: "Saludo por la tarde",
        chinese: "下午好",
        example: "Buenas tardes, señora.",
      },
      {
        word: "buenas noches",
        definition: "Saludo por la noche o para dormir",
        chinese: "晚上好/晚安",
        example: "Buenas noches, papá.",
      },
      {
        word: "nombre",
        definition: "Palabra que identifica a una persona",
        chinese: "名字",
        example: "Mi nombre es Ana.",
      },
      {
        word: "llamarse",
        definition: "Verbo para decir el nombre",
        chinese: "叫",
        example: "Me llamo Carlos.",
      },
      {
        word: "encantado/a",
        definition: "Palabra para mostrar alegría al conocer a alguien",
        chinese: "很高兴认识你",
        example: "Encantada, soy Laura.",
      },
    ],
    reading: {
      textType: "narrativo",
      title: "Mi primera semana en clase de español",
      text: `Hola, me llamo Pablo. Soy de Madrid, España. Tengo veintidós años. Estudio español en una escuela de la ciudad. Mi profesor se llama Luis. Es muy simpático.

En mi clase hay doce estudiantes. Ellos son de diferentes países: China, Japón, Estados Unidos y Francia. Mis compañeros son muy amables. Mi mejor amigo se llama Chen. Él es de Pekín, China. Chen es muy inteligente y estudia mucho.

Las clases empiezan a las nueve de la mañana. Terminamos a la una de la tarde. En la clase leemos, escribimos y hablamos en español. Me gusta mucho la clase de español. Es muy interesante.

Por la tarde, voy a casa y como con mi familia. Luego, hago los deberes y escucho música española. Por la noche, veo la televisión y hablo con mis amigos por teléfono. Me gusta mucho mi vida en Madrid.`,
      questions: [
        {
          id: 1,
          question: "¿Cómo se llama el profesor?",
          options: ["a) Pablo", "b) Luis", "c) Chen", "d) Carlos"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Mi profesor se llama Luis".',
        },
        {
          id: 2,
          question: "¿De dónde es Chen?",
          options: ["a) De España", "b) De Pekín, China", "c) De Japón", "d) De Francia"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Chen es de Pekín, China".',
        },
        {
          id: 3,
          question: "¿A qué hora terminan las clases?",
          options: ["a) A las nueve", "b) A las doce", "c) A la una", "d) A las dos"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Terminamos a la una de la tarde".',
        },
        {
          id: 4,
          question: "¿Cuántos años tiene Pablo?",
          options: ["a) Veinte años", "b) Veintiuno", "c) Veintidós", "d) Veintitrés"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Tengo veintidós años".',
        },
        {
          id: 5,
          question: "¿Cuántos estudiantes hay en la clase?",
          options: ["a) Diez", "b) Once", "c) Doce", "d) Trece"],
          correctAnswer: 2,
          explanation: 'El texto dice: "En mi clase hay doce estudiantes".',
        },
        {
          id: 6,
          question: "¿Qué hace Pablo por la noche?",
          options: ["a) Estudia", "b) Ve la televisión", "c) Va al cine", "d) Lee un libro"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Por la noche, veo la televisión".',
        },
        {
          id: 7,
          question: "¿Cómo es el profesor Luis?",
          options: ["a) Es serio", "b) Es simpático", "c) Es alto", "d) Es joven"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Es muy simpático".',
        },
        {
          id: 8,
          question: "¿De qué país son los compañeros de Pablo?",
          options: ["a) Solo de España", "b) De diferentes países", "c) Solo de China", "d) De América"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Ellos son de diferentes países".',
        },
        {
          id: 9,
          question: "¿Qué hace Pablo por la tarde?",
          options: [
            "a) Va al cine",
            "b) Estudia en la biblioteca",
            "c) Va a casa y come con su familia",
            "d) Hace deporte",
          ],
          correctAnswer: 2,
          explanation: 'El texto dice: "Por la tarde, voy a casa y como con mi familia".',
        },
        {
          id: 10,
          question: "¿De dónde es Pablo?",
          options: ["a) De Barcelona", "b) De Madrid", "c) De Sevilla", "d) De Valencia"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Soy de Madrid, España".',
        },
      ],
    },
    listening: {
      title: "Mi presentación",
      transcription: `Hola, soy María. Tengo veinticinco años. Vivo en Barcelona, España. Soy profesora de español para extranjeros.

Trabajo en una escuela de idiomas. Mi escuela está en el centro de la ciudad. Mis estudiantes son de muchos países. Me gusta mucho mi trabajo porque hablo con gente nueva cada día.

Por la mañana, me levanto a las siete. Desayuno café con leche y tostadas. A las ocho y media salgo de casa. Voy a la escuela en metro. La escuela está a diez minutos de mi casa.

Mis clases empiezan a las nueve. Termino de trabajar a las cinco de la tarde. Luego, voy al gimnasio. Hago ejercicio dos horas. A las ocho, vuelvo a casa y ceno con mi familia.

Por la noche, veo una serie en la televisión o leo un libro. Me gusta mucho leer. A veces salgo con mis amigos. Vamos a cenar o al cine. Me encanta mi vida.`,
      questions: [
        {
          id: 1,
          question: "¿Qué edad tiene María?",
          options: ["a) Veinte años", "b) Veintidós años", "c) Veinticinco años", "d) Treinta años"],
          correctAnswer: 2,
        },
        {
          id: 2,
          question: "¿Dónde vive María?",
          options: ["a) En Madrid", "b) En Barcelona", "c) En Valencia", "d) En Sevilla"],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "¿Qué desayuna María?",
          options: [
            "a) Té y galletas",
            "b) Café con leche y tostadas",
            "c) Zumo y fruta",
            "d) Leche con cereales",
          ],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "¿A qué hora sale de casa?",
          options: ["a) A las siete", "b) A las ocho", "c) A las ocho y media", "d) A las nueve"],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "¿Cómo va María a la escuela?",
          options: ["a) En coche", "b) En autobús", "c) En metro", "d) Andando"],
          correctAnswer: 2,
        },
        {
          id: 6,
          question: "¿A qué hora empiezan sus clases?",
          options: ["a) A las ocho", "b) A las ocho y media", "c) A las nueve", "d) A las diez"],
          correctAnswer: 2,
        },
        {
          id: 7,
          question: "¿Dónde trabaja María?",
          options: [
            "a) En un hospital",
            "b) En una oficina",
            "c) En una escuela de idiomas",
            "d) En un restaurante",
          ],
          correctAnswer: 2,
        },
        {
          id: 8,
          question: "¿Qué hace María después del trabajo?",
          options: ["a) Va a casa", "b) Va al gimnasio", "c) Va al cine", "d) Va a la biblioteca"],
          correctAnswer: 1,
        },
        {
          id: 9,
          question: "¿Qué le gusta hacer por la noche?",
          options: ["a) Jugar al ordenador", "b) Ver series o leer", "c) Escuchar música", "d) Cocinar"],
          correctAnswer: 1,
        },
        {
          id: 10,
          question: "¿A veces sale con sus amigos?",
          options: ["a) Sí, a veces", "b) No, nunca", "c) Todos los días", "d) Solo los fines de semana"],
          correctAnswer: 0,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi presentación",
        description:
          "Preséntate. Incluye: cómo te llamas, de dónde eres, qué haces (trabajas o estudias), tu edad.",
        structure: {
          intro: "Di tu nombre.",
          body: "Di tu edad y de dónde eres.",
          conclusion: "Di a qué te dedicas.",
        },
        connectors: ["Me llamo", "Tengo", "Soy de", "Vivo en"],
        wordCount: "40-60 palabras",
      },
      optionB: {
        title: "Un día normal",
        description:
          "Escribe sobre un día normal. Incluye: a qué hora te levantas, qué desayunas, qué haces por la mañana, tarde y noche.",
        structure: {
          intro: "Di a qué hora te levantas.",
          body: "Describe tus actividades del día.",
          conclusion: "Di qué haces por la noche.",
        },
        connectors: ["Por la mañana", "Luego", "Por la tarde", "Por la noche"],
        wordCount: "40-60 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Preséntate",
        description: "Preséntate durante 1 minuto. Di tu nombre, edad, país y ciudad, profesión o estudios.",
        connectors: ["Me llamo", "Tengo", "Soy de", "Vivo en", "Soy estudiante/profesor/a"],
        guideQuestions: [
          "¿Cómo te llamas?",
          "¿Cuántos años tienes?",
          "¿De dónde eres?",
          "¿Dónde vives ahora?",
          "¿A qué te dedicas?",
        ],
      },
      topic2: {
        title: "Tu rutina diaria",
        description:
          "Habla sobre tu rutina diaria durante 1 minuto. Di a qué hora te levantas, qué comes, qué haces durante el día.",
        connectors: [
          "Me levanto a las",
          "Desayuno",
          "Por la mañana",
          "Por la tarde",
          "Por la noche",
          "Me acuesto a las",
        ],
        guideQuestions: [
          "¿A qué hora te levantas?",
          "¿Qué desayunas?",
          "¿Qué haces por la mañana?",
          "¿Qué haces por la tarde?",
          "¿A qué hora te acuestas?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero os conocéis en una fiesta. Tenéis que preguntaros cosas para conoceros: nombre, edad, profesión, gustos.",
      questions: [
        {
          question: "Pregunta a tu compañero: ¿Cómo te llamas? ¿Cuántos años tienes?",
          help: "Usa: ¿Cómo te llamas? / ¿Cuántos años tienes?",
          usefulPhrases: [
            "Hola, ¿cómo te llamas?",
            "Mucho gusto.",
            "Encantado/a de conocerte.",
            "¿De dónde eres?",
          ],
        },
        {
          question: "Pregunta a tu compañero: ¿A qué te dedicas? ¿Dónde vives?",
          help: "Usa: ¿A qué te dedicas? / ¿Dónde vives?",
          usefulPhrases: ["¿Trabajas o estudias?", "¿Dónde vives?", "¿Te gusta tu ciudad?", "Yo soy..."],
        },
        {
          question: "Pregunta a tu compañero: ¿Qué te gusta hacer en tu tiempo libre?",
          help: "Usa: ¿Qué te gusta hacer? / ¿Cuál es tu hobby?",
          usefulPhrases: [
            "¿Qué te gusta hacer?",
            "En mi tiempo libre me gusta...",
            "A mí también me gusta...",
            "¿Te gusta el cine/deporte/música?",
          ],
        },
      ],
    },
  },
  {
    id: 2,
    level: "A1",
    theme: "La familia",
    icon: "Users",
    vocabulary: [
      {
        word: "padre",
        definition: "El hombre que tiene hijos",
        chinese: "父亲",
        example: "Mi padre se llama Juan.",
      },
      {
        word: "madre",
        definition: "La mujer que tiene hijos",
        chinese: "母亲",
        example: "Mi madre es profesora.",
      },
      {
        word: "hermano",
        definition: "Un hijo más de la misma madre y padre",
        chinese: "兄弟",
        example: "Tengo un hermano mayor.",
      },
      {
        word: "hermana",
        definition: "Una hija más de la misma madre y padre",
        chinese: "姐妹",
        example: "Mi hermana es pequeña.",
      },
      {
        word: "abuelo",
        definition: "El padre de mi padre o de mi madre",
        chinese: "祖父",
        example: "Mi abuelo tiene 70 años.",
      },
      {
        word: "abuela",
        definition: "La madre de mi padre o de mi madre",
        chinese: "祖母",
        example: "Mi abuela cocina bien.",
      },
      {
        word: "tío",
        definition: "El hermano de mi padre o de mi madre",
        chinese: "叔叔/舅舅",
        example: "Mi tío vive en Madrid.",
      },
      {
        word: "tía",
        definition: "La hermana de mi padre o de mi madre",
        chinese: "阿姨/姑姑",
        example: "Mi tía es enfermera.",
      },
      {
        word: "primo",
        definition: "El hijo de mi tío o de mi tía",
        chinese: "堂兄弟",
        example: "Juego with mi primo.",
      },
      {
        word: "prima",
        definition: "La hija de mi tío o de mi tía",
        chinese: "堂姐妹",
        example: "Mi prima tiene 5 años.",
      },
    ],
    reading: {
      textType: "descriptivo",
      title: "Mi familia",
      text: `Mi familia es pequeña pero muy unida. Mi padre se llama José y mi madre se llama Ana. Mi padre tiene cuarenta y dos años. Es alto y moreno. Trabaja en una oficina. Mi madre tiene cuarenta años. Es baja y rubia. Es profesora de español.

Yo tengo un hermano. Se llama Pablo. Tiene dieciocho años. Es estudiante. Vive en otra ciudad porque estudia en la universidad. Mi hermano es muy inteligente y simpático. Hablamos por teléfono todos los días.

Mis abuelos viven cerca de mi casa. Mi abuelo se llama Miguel. Tiene sesenta y ocho años. Mi abuela se llama Carmen. Tiene sesenta y cinco años. Ellos están jubilados. Por las tardes, mi abuela cocina para toda la familia. Mi abuelo me cuenta historias de cuando era joven.

Los domingos, toda mi familia come junta en casa de mis abuelos. Mis tíos y mis primos también vienen. Somos diez personas. Es un día muy feliz para todos.`,
      questions: [
        {
          id: 1,
          question: "¿Cómo se llama el padre?",
          options: ["a) José", "b) Ana", "c) Pablo", "d) Miguel"],
          correctAnswer: 0,
          explanation: 'El texto dice: "Mi padre se llama José".',
        },
        {
          id: 2,
          question: "¿Cuántos años tiene la madre?",
          options: ["a) Treinta y ocho", "b) Cuarenta", "c) Cuarenta y dos", "d) Cuarenta y cinco"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Mi madre tiene cuarenta años".',
        },
        {
          id: 3,
          question: "¿Cómo se llama el hermano?",
          options: ["a) José", "b) Miguel", "c) Pablo", "d) Carlos"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Se llama Pablo".',
        },
        {
          id: 4,
          question: "¿Dónde vive el hermano?",
          options: [
            "a) En casa de los padres",
            "b) En otra ciudad",
            "c) En casa de los abuelos",
            "d) En Madrid",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Vive en otra ciudad".',
        },
        {
          id: 5,
          question: "¿Qué profesión tiene la madre?",
          options: ["a) Enfermera", "b) Profesora", "c) Médico", "d) Camarera"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Es profesora de español".',
        },
        {
          id: 6,
          question: "¿Cuántos años tiene el abuelo?",
          options: ["a) Sesenta y cinco", "b) Sesenta y ocho", "c) Setenta", "d) Setenta y dos"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Tiene sesenta y ocho años".',
        },
        {
          id: 7,
          question: "¿Qué hace la abuela por las tardes?",
          options: ["a) Ve la televisión", "b) Cocina", "c) Lee libros", "d) Pasea"],
          correctAnswer: 1,
          explanation: 'El texto dice: "mi abuela cocina para toda la familia".',
        },
        {
          id: 8,
          question: "¿Cuándo come toda la familia junta?",
          options: ["a) Los sábados", "b) Los domingos", "c) Los viernes", "d) Los lunes"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Los domingos, toda mi familia come junta".',
        },
        {
          id: 9,
          question: "¿Cuántas personas son en la comida familiar?",
          options: ["a) Ocho", "b) Nueve", "c) Diez", "d) Once"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Somos diez personas".',
        },
        {
          id: 10,
          question: "¿Qué hace el abuelo?",
          options: ["a) Trabaja", "b) Cocina", "c) Cuenta historias", "d) Estudia"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Mi abuelo me cuenta historias".',
        },
      ],
    },
    listening: {
      title: "La familia de Carlos",
      transcription: `Hola, soy Carlos. Tengo veintisiete años. Soy ingeniero. Vivo en Valencia con mi familia.

Mi familia es grande. Mi padre se llama Manuel. Tiene sesenta años. Es jardinero. A mi padre le gusta mucho la naturaleza. Mi madre se llama Rosa. Tiene cincuenta y cinco años. Es enfermera. Trabaja en un hospital.

Yo tengo dos hermanas. Una se llama Laura. Tiene treinta años. Es arquitecta. Vive en Barcelona. Mi otra hermana se llama Marta. Tiene veinticinco años. Es estudiante de medicina. Marta vive con mis padres.

Mis abuelos ya no viven. Pero tengo muchos tíos y primos. Los domingos, nos reunimos en casa de mis padres. Comemos juntos y hablamos de todo. Me encanta mi familia.`,
      questions: [
        {
          id: 1,
          question: "¿Qué edad tiene Carlos?",
          options: ["a) Veinticinco años", "b) Veintiséis años", "c) Veintisiete años", "d) Veintiocho años"],
          correctAnswer: 2,
        },
        {
          id: 2,
          question: "¿Dónde vive Carlos?",
          options: ["a) Madrid", "b) Barcelona", "c) Valencia", "d) Sevilla"],
          correctAnswer: 2,
        },
        {
          id: 3,
          question: "¿Cuántos años tiene el padre?",
          options: ["a) Cincuenta años", "b) Cincuenta y cinco", "c) Sesenta", "d) Sesenta y cinco"],
          correctAnswer: 2,
        },
        {
          id: 4,
          question: "¿Qué profesión tiene la madre?",
          options: ["a) Médico", "b) Enfermera", "c) Profesora", "d) Arquitecta"],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "¿Cuántas hermanas tiene Carlos?",
          options: ["a) Una", "b) Dos", "c) Tres", "d) Ninguna"],
          correctAnswer: 1,
        },
        {
          id: 6,
          question: "¿Cómo se llama la hermana mayor?",
          options: ["a) Marta", "b) Laura", "c) Ana", "d) Carmen"],
          correctAnswer: 1,
        },
        {
          id: 7,
          question: "¿Dónde vive Laura?",
          options: ["a) Valencia", "b) Madrid", "c) Barcelona", "d) Sevilla"],
          correctAnswer: 2,
        },
        {
          id: 8,
          question: "¿Qué estudia Marta?",
          options: ["a) Arquitectura", "b) Medicina", "c) Ingeniería", "d) Enfermería"],
          correctAnswer: 1,
        },
        {
          id: 9,
          question: "¿Qué hace el padre?",
          options: ["a) Es médico", "b) Es jardinero", "c) Es profesor", "d) Es ingeniero"],
          correctAnswer: 1,
        },
        {
          id: 10,
          question: "¿Cuándo se reúne la familia?",
          options: ["a) Sábados", "b) Domingos", "c) Viernes", "d) Todos los días"],
          correctAnswer: 1,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi familia",
        description: "Describe a tu familia. Incluye: con quién vives, cómo se llaman, qué edad tienen.",
        structure: {
          intro: "Di con quién vives.",
          body: "Describe a tu padre y madre.",
          conclusion: "Di cómo es tu familia.",
        },
        connectors: ["Mi padre se llama", "Mi madre es", "Tengo", "Mi familia es"],
        wordCount: "40-60 palabras",
      },
      optionB: {
        title: "Un domingo con mi familia",
        description:
          "Escribe sobre un domingo con tu familia. Incluye: qué haces, dónde estás, con quién estás.",
        structure: {
          intro: "Di dónde estás los domingos.",
          body: "Describe qué haces.",
          conclusion: "Di por qué te gusta.",
        },
        connectors: ["Los domingos", "Estoy con", "Comemos", "Me gusta"],
        wordCount: "40-60 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Describe a tu familia",
        description:
          "Habla de tu familia durante 1 minuto. Di cuántos sois, cómo se llaman tus padres y hermanos, qué edad tienen.",
        connectors: [
          "Mi familia es",
          "Mi padre se llama",
          "Mi madre se llama",
          "Tengo un hermano/una hermana",
          "Se llama",
        ],
        guideQuestions: [
          "¿Cuántas personas hay en tu familia?",
          "¿Cómo se llaman tus padres?",
          "¿Tienes hermanos?",
          "¿Cómo se llaman tus hermanos?",
          "¿Cuántos años tienen?",
        ],
      },
      topic2: {
        title: "La comida familiar",
        description:
          "Habla sobre la comida en tu familia durante 1 minuto. Dónde coméis, qué coméis, con quién.",
        connectors: ["En mi familia", "Normalmente comemos en", "Comemos", "Vienen a casa", "Me gusta"],
        guideQuestions: [
          "¿Dónde coméis normalmente?",
          "¿Quién cocina en tu casa?",
          "¿Qué comida te gusta más?",
          "¿Vienen tus abuelos/tíos?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero sois primos. Os encontráis en una fiesta familiar. Tenéis que hablar de vuestra familia común.",
      questions: [
        {
          question: "Pregunta a tu compañero: ¿Quiénes son tus padres? ¿Los conozco?",
          help: "Usa: ¿Tus padres se llaman? / ¿Tu madre es...?",
          usefulPhrases: [
            "¿Quiénes son tus padres?",
            "¿Tu madre se llama?",
            "No conozco a tu padre.",
            "¿Viven cerca?",
          ],
        },
        {
          question: "Pregunta a tu compañero: ¿Tienes hermanos? ¿Cómo se llaman?",
          help: "Usa: ¿Tienes hermanos? / ¿Cómo se llaman?",
          usefulPhrases: [
            "¿Tienes hermanos?",
            "¿Cuántos hermanos tienes?",
            "¿Cómo se llaman?",
            "¿Qué edad tienen?",
          ],
        },
        {
          question: "Pregunta a tu compañero: ¿Te gusta venir a las comidas familiares? ¿Por qué?",
          help: "Usa: ¿Te gusta venir? / ¿Por qué te gusta?",
          usefulPhrases: [
            "¿Te gusta venir a las comidas?",
            "¿Por qué te gusta?",
            "A mí me gusta porque...",
            "¿Qué comida prefieres?",
          ],
        },
      ],
    },
  },
  {
    id: 3,
    level: "A1",
    theme: "La casa y la rutina",
    icon: "Home",
    vocabulary: [
      {
        word: "casa",
        definition: "Lugar donde se vive",
        chinese: "房子",
        example: "Mi casa es grande.",
      },
      {
        word: "habitación",
        definition: "Parte de la casa donde se duerme",
        chinese: "房间",
        example: "Mi habitación es pequeña.",
      },
      {
        word: "cocina",
        definition: "Parte de la casa donde se prepara la comida",
        chinese: "厨房",
        example: "La cocina está limpia.",
      },
      {
        word: "baño",
        definition: "Parte de la casa para lavarse",
        chinese: "浴室",
        example: "El baño tiene ducha.",
      },
      {
        word: "cama",
        definition: "Mueble para dormir",
        chinese: "床",
        example: "Mi cama es cómoda.",
      },
      {
        word: "mesa",
        definition: "Mueble con patas para comer o trabajar",
        chinese: "桌子",
        example: "La mesa del comedor es grande.",
      },
      {
        word: "silla",
        definition: "Mueble para sentarse",
        chinese: "椅子",
        example: "Necesito una silla.",
      },
      {
        word: "ventana",
        definition: "Abertura en la pared para luz y aire",
        chinese: "窗户",
        example: "La ventana está abierta.",
      },
      {
        word: "puerta",
        definition: "Abertura para entrar y salir",
        chinese: "门",
        example: "Cierra la puerta.",
      },
      {
        word: "nevera",
        definition: "Electrodoméstico para conservar comida fría",
        chinese: "冰箱",
        example: "La leche está en la nevera.",
      },
    ],
    reading: {
      textType: "descriptivo",
      title: "Mi casa",
      text: `Vivo en una casa pequeña pero bonita. Está en una ciudad cerca de Madrid. Mi casa tiene cuatro habitaciones: un salón, dos dormitorios, una cocina y un baño.

El salón es grande. Hay un sofá gris, una mesa pequeña y una televisión. Me gusta ver la televisión en el salón. Las ventanas del salón son grandes. Entra mucha luz por la mañana.

Mi dormitorio es mi habitación favorita. Hay una cama, un armario y una mesita. La cama es muy cómoda. En el armario tengo mi ropa. En la mesita hay una lámpara y mis libros.

La cocina es pequeña pero tiene todo. Hay nevera, microondas, horno y lavadora. Me gusta cocinar. Normalmente cocino para mi familia.

El baño es pequeño. Hay ducha, lavabo, espejo y váter. La ducha es nueva.

Me gusta mucho mi casa. Es un lugar tranquilo y acogedor.`,
      questions: [
        {
          id: 1,
          question: "¿Dónde está la casa?",
          options: ["a) En Madrid", "b) Cerca de Madrid", "c) En Barcelona", "d) En Valencia"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Está en una ciudad cerca de Madrid".',
        },
        {
          id: 2,
          question: "¿Cuántas habitaciones tiene la casa?",
          options: ["a) Tres", "b) Cuatro", "c) Cinco", "d) Seis"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Mi casa tiene cuatro habitaciones".',
        },
        {
          id: 3,
          question: "¿De qué color es el sofá?",
          options: ["a) Azul", "b) Rojo", "c) Verde", "d) Gris"],
          correctAnswer: 3,
          explanation: 'El texto dice: "un sofá gris".',
        },
        {
          id: 4,
          question: "¿Cuál es la habitación favorita?",
          options: ["a) La cocina", "b) El salón", "c) El dormitorio", "d) El baño"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Mi dormitorio es mi habitación favorita".',
        },
        {
          id: 5,
          question: "¿Qué hay en la mesita?",
          options: ["a) Una lámpara y libros", "b) Un ordenador", "c) Una televisión", "d) Fotos"],
          correctAnswer: 0,
          explanation: 'El texto dice: "En la mesita hay una lámpara y mis libros".',
        },
        {
          id: 6,
          question: "¿Qué electrodomésticos hay en la cocina?",
          options: [
            "a) Nevera y lavadora",
            "b) Nevera, microondas, horno y lavadora",
            "c) Lavavajillas y nevera",
            "d) Horno y microondas",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Hay nevera, microondas, horno y lavadora".',
        },
        {
          id: 7,
          question: "¿Qué hay en el baño?",
          options: ["a) Bañera", "b) Ducha, lavabo, espejo y váter", "c) Solo ducha", "d) Lavadora"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Hay ducha, lavabo, espejo y váter".',
        },
        {
          id: 8,
          question: "¿Le gusta cocinar?",
          options: ["a) Sí", "b) No", "c) A veces", "d) No lo dice"],
          correctAnswer: 0,
          explanation: 'El texto dice: "Me gusta cocinar".',
        },
        {
          id: 9,
          question: "¿Cómo es la casa?",
          options: ["a) Grande", "b) Pequeña pero bonita", "c) Fea", "d) Antigua"],
          correctAnswer: 1,
          explanation: 'El texto dice: "una casa pequeña pero bonita".',
        },
        {
          id: 10,
          question: "¿Cómo son las ventanas del salón?",
          options: ["a) Pequeñas", "b) Grandes", "c) Altas", "d) Bajas"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Las ventanas del salón son grandes".',
        },
      ],
    },
    listening: {
      title: "Un día normal en mi casa",
      transcription: `Hola, me llamo Ana. Vivo con mis padres en un piso en Barcelona. Hoy os voy a contar mi rutina diaria.

Me levanto a las siete de la mañana. Voy al baño y me ducho. Luego, desayuno en la cocina. Normalmente tomo café con leche y galletas. Después, me visto en mi dormitorio.

A las ocho salgo de casa. Voy al trabajo en autobús. Trabajo en una oficina. Como en el trabajo a las dos. Normalmente como en el comedor con mis compañeros.

Vuelvo a casa a las seis de la tarde. Llego, cambio de ropa y descanso un poco en el salón. Veo la televisión o leo.

A las ocho, preparo la cena. Ceno con mis padres en el comedor. Hablamos de nuestro día. Me gusta mucho este momento.

Después de cenar, lavo los platos. Luego, me ducho otra vez. A las diez y media, me voy a la cama. Leo un poco antes de dormir. Me acuesto a las once.`,
      questions: [
        {
          id: 1,
          question: "¿A qué hora se levanta Ana?",
          options: ["a) A las seis", "b) A las siete", "c) A las ocho", "d) A las nueve"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Qué desayuna Ana?",
          options: [
            "a) Té y tostadas",
            "b) Café con leche y galletas",
            "c) Zumo y fruta",
            "d) Leche con cereales",
          ],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "¿Cómo va al trabajo?",
          options: ["a) Andando", "b) En metro", "c) En autobús", "d) En coche"],
          correctAnswer: 2,
        },
        {
          id: 4,
          question: "¿A qué hora vuelve a casa?",
          options: ["a) A las cinco", "b) A las seis", "c) A las siete", "d) A las ocho"],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "¿Con quién cena Ana?",
          options: ["a) Con sus amigos", "b) Con sus padres", "c) Con su pareja", "d) Sola"],
          correctAnswer: 1,
        },
        {
          id: 6,
          question: "¿Qué hace después de cenar?",
          options: ["a) Ve la televisión", "b) Lava los platos", "c) Lee un libro", "d) Escucha música"],
          correctAnswer: 1,
        },
        {
          id: 7,
          question: "¿A qué hora se acuesta Ana?",
          options: ["a) A las diez", "b) A las diez y media", "c) A las once", "d) A las once y media"],
          correctAnswer: 2,
        },
        {
          id: 8,
          question: "¿Dónde come Ana normalmente?",
          options: [
            "a) En casa",
            "b) En el comedor del trabajo",
            "c) En un restaurante",
            "d) En casa de sus padres",
          ],
          correctAnswer: 1,
        },
        {
          id: 9,
          question: "¿Qué hace Ana antes de dormir?",
          options: ["a) Ve la tele", "b) Lee un poco", "c) Escucha música", "d) Habla por teléfono"],
          correctAnswer: 1,
        },
        {
          id: 10,
          question: "¿Dónde vive Ana?",
          options: ["a) En Madrid", "b) En Barcelona", "c) En Valencia", "d) En Sevilla"],
          correctAnswer: 1,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi casa",
        description:
          "Describe tu casa. Incluye: cuántas habitaciones hay, cómo es tu habitación, qué te gusta de tu casa.",
        structure: {
          intro: "Di dónde está tu casa.",
          body: "Describe las habitaciones.",
          conclusion: "Di qué te gusta más.",
        },
        connectors: ["Mi casa está", "Tiene", "Mi habitación es", "Me gusta"],
        wordCount: "40-60 palabras",
      },
      optionB: {
        title: "Mi rutina diaria",
        description:
          "Escribe sobre tu rutina. Incluye: a qué hora te levantas, qué desayunas, qué haces por la mañana, tarde y noche.",
        structure: {
          intro: "Di a qué hora te levantas.",
          body: "Describe tu día.",
          conclusion: "Di a qué hora te acuestas.",
        },
        connectors: [
          "Me levanto a las",
          "Desayuno",
          "Por la mañana",
          "Por la tarde",
          "Por la noche",
          "Me acuesto",
        ],
        wordCount: "40-60 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Describe tu casa",
        description:
          "Habla sobre tu casa durante 1 minuto. Di dónde está, cuántas habitaciones tiene, cómo es tu dormitorio.",
        connectors: ["Mi casa está en", "Tiene", "Mi dormitorio es", "Hay una", "Me gusta"],
        guideQuestions: [
          "¿Dónde está tu casa?",
          "¿Cuántas habitaciones tiene?",
          "¿Cómo es tu dormitorio?",
          "¿Qué hay en tu dormitorio?",
        ],
      },
      topic2: {
        title: "Tu rutina diaria",
        description:
          "Habla sobre tu rutina diaria durante 1 minuto. Di a qué hora te levantas, qué haces por la mañana, tarde y noche.",
        connectors: ["Me levanto a las", "Por la mañana", "Por la tarde", "Por la noche", "Me acuesto a las"],
        guideQuestions: [
          "¿A qué hora te levantas?",
          "¿Qué desayunas?",
          "¿Qué haces por la mañana?",
          "¿Qué haces por la noche?",
          "¿A qué hora te acuestas?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero sois nuevos compañeros de piso. Tenéis que hablar sobre la casa y la rutina diaria.",
      questions: [
        {
          question: "Pregunta a tu compañero: ¿Qué habitación prefieres? ¿Por qué?",
          help: "Usa: ¿Qué habitación te gusta más? / ¿Por qué?",
          usefulPhrases: [
            "¿Qué habitación prefieres?",
            "Me gusta el salón porque...",
            "¿Por qué te gusta esa habitación?",
            "A mí me gusta...",
          ],
        },
        {
          question: "Pregunta a tu compañero: ¿A qué hora te levantas normalmente? ¿Qué desayunas?",
          help: "Usa: ¿A qué hora te levantas? / ¿Qué desayunas?",
          usefulPhrases: [
            "¿A qué hora te levantas?",
            "¿Qué desayunas?",
            "Yo desayuno...",
            "Normalmente me levanto a las...",
          ],
        },
        {
          question: "Pregunta a tu compañero: ¿Qué haces después de cenar? ¿A qué hora te acuestas?",
          help: "Usa: ¿Qué haces después de cenar? / ¿A qué hora te acuestas?",
          usefulPhrases: [
            "¿Qué haces después de cenar?",
            "¿Ves la televisión?",
            "¿A qué hora te acuestas?",
            "Yo me acuesto a las...",
          ],
        },
      ],
    },
  },
  {
    id: 4,
    level: "A1",
    theme: "La comida y bebida",
    icon: "UtensilsCrossed",
    vocabulary: [
      {
        word: "comida",
        definition: "Alimento que se come",
        chinese: "食物",
        example: "La comida española es buena.",
      },
      {
        word: "agua",
        definition: "Líquido para beber",
        chinese: "水",
        example: "Bebo agua cada día.",
      },
      {
        word: "pan",
        definition: "Alimento hecho con harina",
        chinese: "面包",
        example: "Como pan en el desayuno.",
      },
      {
        word: "leche",
        definition: "Líquido blanco de vaca",
        chinese: "牛奶",
        example: "Tomo leche con café.",
      },
      {
        word: "café",
        definition: "Bebida caliente de color negro",
        chinese: "咖啡",
        example: "Desayuno café con leche.",
      },
      {
        word: "fruta",
        definition: "Alimento dulce de plantas",
        chinese: "水果",
        example: "Como fruta por la tarde.",
      },
      {
        word: "verdura",
        definition: "Planta que se come",
        chinese: "蔬菜",
        example: "Las verduras son sanas.",
      },
      {
        word: "carne",
        definition: "Alimento de animales",
        chinese: "肉",
        example: "Como carne dos veces por semana.",
      },
      {
        word: "pescado",
        definition: "Animal del mar que se come",
        chinese: "鱼",
        example: "El pescado es saludable.",
      },
      {
        word: "desayuno",
        definition: "Primera comida del día",
        chinese: "早餐",
        example: "Mi desayuno es a las 8.",
      },
    ],
    reading: {
      textType: "descriptivo",
      title: "Mi comida favorita: la paella",
      text: `Hola, me llamo Lucía y soy de Valencia, España. Hoy quiero hablaros de mi comida favorita: la paella. La paella es un plato típico español que lleva arroz, pollo, conejo, judías verdes y azafrán. Es un plato muy famoso en todo el mundo.

Mi abuela prepara la paella todos los domingos para toda la familia. Vienen mis padres, mis tíos y mis primos. Somos doce personas. La paella de mi abuela es la mejor del mundo. Todos la esperamos con muchas ganas.

Por las mañanas, desayuno café con leche y pan tostado con aceite de oliva y tomate. Es un desayuno muy típico en España. A las dos de la tarde, como en el comedor de la universidad. Normalmente como ensalada, pescado o carne y fruta de postre.

Por la noche, ceno algo ligero porque ya he comido mucho durante el día. Normalmente ceno sopa de verduras o un yogur con fruta. Los fines de semana, salgo con mis amigos a cenar fuera y probamos platos nuevos. Me encanta la comida y compartirla con la gente que quiero.`,
      questions: [
        {
          id: 1,
          question: "¿De dónde es Lucía?",
          options: ["a) De Madrid", "b) De Valencia", "c) De Barcelona", "d) De Sevilla"],
          correctAnswer: 1,
          explanation: 'El texto dice: "soy de Valencia, España".',
        },
        {
          id: 2,
          question: "¿Qué plato prepara la abuela de Lucía?",
          options: ["a) Tortilla", "b) Paella", "c) Gazpacho", "d) Ensalada"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Mi abuela prepara la paella".',
        },
        {
          id: 3,
          question: "¿Qué ingredientes lleva la paella?",
          options: [
            "a) Arroz, pollo y tomate",
            "b) Arroz, pollo, conejo, judías y azafrán",
            "c) Pasta y verduras",
            "d) Solo arroz y pescado",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "lleva arroz, pollo, conejo, judías verdes y azafrán".',
        },
        {
          id: 4,
          question: "¿Cuándo prepara la paella la abuela?",
          options: ["a) Los sábados", "b) Los domingos", "c) Los viernes", "d) Todos los días"],
          correctAnswer: 1,
          explanation: 'El texto dice: "prepara la paella todos los domingos".',
        },
        {
          id: 5,
          question: "¿Cuántas personas son en la comida familiar?",
          options: ["a) Ocho", "b) Tenis", "c) Doce", "d) Quince"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Somos doce personas".',
        },
        {
          id: 6,
          question: "¿Qué desayuna Lucía?",
          options: [
            "a) Té y galletas",
            "b) Café con leche y pan tostado",
            "c) Zumo y fruta",
            "d) Leche con cereales",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "desayuno café con leche y pan tostado".',
        },
        {
          id: 7,
          question: "¿A qué hora come Lucía?",
          options: ["a) A las doce", "b) A la una", "c) A las dos", "d) A las tres"],
          correctAnswer: 2,
          explanation: 'El texto dice: "A las dos de la tarde, como".',
        },
        {
          id: 8,
          question: "¿Qué cena normalmente Lucía?",
          options: ["a) Carne", "b) Pescado", "c) Sopa o yogur con fruta", "d) Paella"],
          correctAnswer: 2,
          explanation: 'El texto dice: "ceno sopa de verduras o un yogur con fruta".',
        },
        {
          id: 9,
          question: "¿Qué hace Lucía los fines de semana?",
          options: ["a) Cocina en casa", "b) Sale con amigos a cenar", "c) Ve la televisión", "d) Estudia"],
          correctAnswer: 1,
          explanation: 'El texto dice: "salgo con mis amigos a cenar fuera".',
        },
        {
          id: 10,
          question: "¿Por qué le gusta la comida a Lucía?",
          options: [
            "a) Porque es barata",
            "b) Porque es rápida",
            "c) Porque le gusta compartirla",
            "d) Porque es fácil",
          ],
          correctAnswer: 2,
          explanation: 'El texto dice: "Me encanta la comida y compartirla".',
        },
      ],
    },
    listening: {
      title: 'En el restaurante "El Sabor"',
      transcription: `Buenos días, soy Carlos y soy camarero en el restaurante "El Sabor". Hoy quiero contaros cómo es un día normal en mi trabajo.

El restaurante abre a las doce del mediodía. Primero, preparamos las mesas y la cocina. A la una, llegan los primeros clientes. Muchos clientes piden platos típicos españoles como paella, tortilla y gazpacho. La paella es el plato más popular.

Por la tarde, a las cuatro, cerramos un par de horas para descansar. Yo como en casa con mi familia. Después, volvemos a abrir para la cena. La cena empieza a las ocho y media.

Lo que más me gusta de mi trabajo es hablar con la gente. Muchos clientes son turistas de otros países. Les encanta probar nuestra comida española. Es muy bonito ver sus caras felices cuando prueban la paella por primera vez. Me siento muy orgulloso de mi trabajo.`,
      questions: [
        {
          id: 1,
          question: "¿Cómo se llama el camarero?",
          options: ["a) Luis", "b) Carlos", "c) Pablo", "d) Miguel"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Cómo se llama el restaurante?",
          options: ["a) La Paella", "b) El Sabor", "c) La Cocina", "d) El Sol"],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "¿A qué hora abre el restaurante?",
          options: ["a) A las diez", "b) A las once", "c) A las doce", "d) A la una"],
          correctAnswer: 2,
        },
        {
          id: 4,
          question: "¿Cuál es el plato más popular?",
          options: ["a) La tortilla", "b) El gazpacho", "c) La paella", "d) La ensalada"],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "¿A qué hora cierran para descansar?",
          options: ["a) A las dos", "b) A las tres", "c) A las cuatro", "d) A las cinco"],
          correctAnswer: 2,
        },
        {
          id: 6,
          question: "¿Dónde come Carlos por la tarde?",
          options: ["a) En el restaurante", "b) En casa con su familia", "c) En un bar", "d) No come"],
          correctAnswer: 1,
        },
        {
          id: 7,
          question: "¿A qué hora empieza la cena?",
          options: ["a) A las siete", "b) A las ocho", "c) A las ocho y media", "d) A las nueve"],
          correctAnswer: 2,
        },
        {
          id: 8,
          question: "¿Qué tipo de clientes visitan el restaurante?",
          options: ["a) Solo españoles", "b) Muchos turistas", "c) Solo familias", "d) Solo parejas"],
          correctAnswer: 1,
        },
        {
          id: 9,
          question: "¿Qué le gusta más a Carlos de su trabajo?",
          options: ["a) Cocinar", "b) Ganar dinero", "c) Hablar con la gente", "d) Limpiar"],
          correctAnswer: 2,
        },
        {
          id: 10,
          question: "¿Cómo se siente Carlos con su trabajo?",
          options: ["a) Aburrido", "b) Cansado", "c) Orgulloso", "d) Triste"],
          correctAnswer: 2,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi comida favorita",
        description:
          "Escribe 3-4 frases sobre tu comida favorita. Di qué comes, cuándo la comes y por qué te gusta.",
        structure: {
          intro: "Di tu comida favorita.",
          body: "Di cuándo la comes.",
          conclusion: "Di por qué te gusta.",
        },
        connectors: ["Mi comida favorita es", "Normalmente como", "Me gusta porque"],
        wordCount: "20-40 palabras",
      },
      optionB: {
        title: "Un día en un restaurante",
        description: "Escribe 3-4 frases sobre un restaurante. Di qué pediste, si te gustó y cuánto pagaste.",
        structure: {
          intro: "Di a qué restaurante fuiste.",
          body: "Di qué pediste.",
          conclusion: "Di si te gustó.",
        },
        connectors: ["Fui a un restaurante", "Pedí", "La comida estaba", "Pagué"],
        wordCount: "20-40 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Tu comida favorita",
        description:
          "Habla de tu comida favorita en 30-45 segundos. Di qué es, qué ingredientes tiene y cuándo la comes.",
        connectors: ["Mi comida favorita es", "Tiene", "Normalmente la como", "Me gusta porque"],
        guideQuestions: [
          "¿Cuál es tu comida favorita?",
          "¿Qué ingredientes tiene?",
          "¿Cuándo la comes?",
          "¿Por qué te gusta?",
        ],
      },
      topic2: {
        title: "Tu desayuno ideal",
        description: "Habla de tu desayuno ideal en 30-45 segundos. Di qué comes y qué bebes por la mañana.",
        connectors: ["Por la mañana", "Desayuno", "Bebo", "Me gusta"],
        guideQuestions: ["¿A qué hora desayunas?", "¿Qué comes en el desayuno?", "¿Qué bebes?", "¿Es sano?"],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero estáis en un restaurante. Tenéis que pedir comida y hablar sobre los platos.",
      questions: [
        {
          question: "Pregunta a tu compañero: ¿Qué vas a pedir? ¿Por qué?",
          help: "Usa: ¿Qué vas a pedir? / ¿Por qué?",
          usefulPhrases: ["¿Qué vas a pedir?", "Yo voy a pedir...", "¿Te gusta la comida española?"],
        },
        {
          question: "Pregunta a tu compañero: ¿Te gusta el pescado o la carne?",
          help: "Usa: ¿Te gusta el pescado? / ¿Prefieres la carne?",
          usefulPhrases: ["¿Te gusta el pescado?", "¿Prefieres la carne?", "A mí me gusta más..."],
        },
        {
          question: "Pregunta a tu compañero: ¿Qué quieres de postre?",
          help: "Usa: ¿Qué quieres de postre? / ¿Te gusta el flan?",
          usefulPhrases: ["¿Qué quieres de postre?", "¿Te gusta el flan?", "Yo quiero..."],
        },
      ],
    },
  },
  {
    id: 5,
    level: "A1",
    theme: "El tiempo libre y deportes",
    icon: "Activity",
    vocabulary: [
      {
        word: "tiempo libre",
        definition: "Horas sin trabajo o estudio",
        chinese: "空闲时间",
        example: "En mi tiempo libre leo.",
      },
      {
        word: "deporte",
        definition: "Actividad física",
        chinese: "运动",
        example: "Hago deporte cada día.",
      },
      {
        word: "fútbol",
        definition: "Deporte con pelota y dos equipos",
        chinese: "足球",
        example: "Juego al fútbol los sábados.",
      },
      {
        word: "música",
        definition: "Arte de los sonidos",
        chinese: "音乐",
        example: "Escucho música por la noche.",
      },
      {
        word: "cine",
        definition: "Lugar donde se ven películas",
        chinese: "电影院",
        example: "Voy al cine los domingos.",
      },
      {
        word: "leer",
        definition: "Mirar y entender letras",
        chinese: "阅读",
        example: "Leo un libro cada mes.",
      },
      {
        word: "viajar",
        definition: "Ir a otra ciudad o país",
        chinese: "旅行",
        example: "Me gusta viajar en verano.",
      },
      {
        word: "piscina",
        definition: "Lugar para nadar",
        chinese: "游泳池",
        example: "Nado en la piscina.",
      },
      {
        word: "amigo",
        definition: "Persona que te gusta",
        chinese: "朋友",
        example: "Salgo con mis amigos.",
      },
      {
        word: "fin de semana",
        definition: "Sábado y domingo",
        chinese: "周末",
        example: "El fin de semana descanso.",
      },
    ],
    reading: {
      textType: "narrativo",
      title: "Mi tiempo libre",
      text: `Hola, soy Carlos y vivo en Barcelona. Quiero contaros cómo paso mi tiempo libre. Me encanta hacer deporte y estar con mis amigos.

Los sábados por la mañana, juego al fútbol en el parque con mis compañeros de trabajo. Somos un equipo de diez personas y jugamos todos los sábados. A veces ganamos, a veces perdemos, pero siempre nos divertimos mucho. Después del partido, vamos todos juntos a tomar algo y charlamos sobre el partido.

Los domingos, me gusta hacer algo diferente. Normalmente voy a la piscina municipal con mi hermana pequeña. Ella está aprendiendo a nadar y yo la ayudo. Me gusta el agua y nadar me relaja mucho. También me gusta tomar el sol y leer un libro en la piscina.

Por las tardes, cuando no tengo planes, me gusta leer libros de aventuras o ver películas en casa. También escucho música mientras cocino. Mi cantante favorito es un español que se llama Pablo Alborán. A veces, cuando hace buen tiempo, voy al cine con mis amigos.

Lo que más me gusta es hacer deporte al aire libre. Me hace sentir bien y feliz. Hacer deporte es muy importante para la salud.`,
      questions: [
        {
          id: 1,
          question: "¿Dónde vive Carlos?",
          options: ["a) Madrid", "b) Valencia", "c) Barcelona", "d) Sevilla"],
          correctAnswer: 2,
          explanation: 'El texto dice: "vivo en Barcelona".',
        },
        {
          id: 2,
          question: "¿Qué hace Carlos los sábados?",
          options: ["a) Va a la piscina", "b) Juega al fútbol", "c) Va al cine", "d) Lee libros"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Los sábados juego al fútbol".',
        },
        {
          id: 3,
          question: "¿Con quién juega al fútbol Carlos?",
          options: ["a) Con su familia", "b) Con sus compañeros de trabajo", "c) Con su hermana", "d) Solo"],
          correctAnswer: 1,
          explanation: 'El texto dice: "con mis compañeros de trabajo".',
        },
        {
          id: 4,
          question: "¿Qué hace Carlos después del partido?",
          options: [
            "a) Va a casa",
            "b) Va a trabajar",
            "c) Va a tomar algo con sus amigos",
            "d) Va a la piscina",
          ],
          correctAnswer: 2,
          explanation: 'El texto dice: "vamos todos juntos a tomar algo".',
        },
        {
          id: 5,
          question: "¿Qué hace Carlos los domingos?",
          options: ["a) Juega al fútbol", "b) Va a la piscina", "c) Trabaja", "d) Va al cine"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Los domingos voy a la piscina".',
        },
        {
          id: 6,
          question: "¿Quién va con Carlos a la piscina?",
          options: ["a) Su amigo", "b) Su madre", "c) Su hermana pequeña", "d) Su padre"],
          correctAnswer: 2,
          explanation: 'El texto dice: "con mi hermana pequeña".',
        },
        {
          id: 7,
          question: "¿Qué hace Carlos por las tardes?",
          options: ["a) Hace deporte", "b) Lee libros o ve películas", "c) Trabaja", "d) Duerme"],
          correctAnswer: 1,
          explanation: 'El texto dice: "me gusta leer libros de aventuras o ver películas".',
        },
        {
          id: 8,
          question: "¿Cómo se llama el cantante favorito de Carlos?",
          options: ["a) Enrique Iglesias", "b) Pablo Alborán", "c) Alejandro Sanz", "d) David Bisbal"],
          correctAnswer: 1,
          explanation: 'El texto dice: "se llama Pablo Alborán".',
        },
        {
          id: 9,
          question: "¿Qué le gusta hacer a Carlos cuando hace buen tiempo?",
          options: ["a) Ir al parque", "b) Ir al cine", "c) Ir a la playa", "d) Ir a la montaña"],
          correctAnswer: 1,
          explanation: 'El texto dice: "voy al cine con mis amigos".',
        },
        {
          id: 10,
          question: "¿Por qué le gusta hacer deporte a Carlos?",
          options: [
            "a) Porque es famoso",
            "b) Porque le hace sentir bien y feliz",
            "c) Porque es obligatorio",
            "d) Porque es fácil",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Me hace sentir bien y feliz".',
        },
      ],
    },
    listening: {
      title: "Mi hobby favorito: la música",
      transcription: `Hola, soy Ana y quiero hablaros de mi hobby favorito: la música. Toco la guitarra desde que tenía doce años. Mis padres me regalaron mi primera guitarra para mi cumpleaños.

Los fines de semana, toco la guitarra en mi habitación. Me gusta aprender canciones nuevas. También me gusta mucho escuchar música pop. Mi cantante favorito es un español que se llama Pablo Alborán. Tiene una voz muy bonita.

A veces, voy a conciertos con mis amigos. El último concierto fue en Madrid y fue increíble. Cantamos y bailamos toda la noche. La música me hace sentir muy feliz y relajada. Cuando estoy triste, escucho música y me siento mejor. Para mí, la música es muy importante en mi vida.`,
      questions: [
        {
          id: 1,
          question: "¿Cuál es el hobby favorito de Ana?",
          options: ["a) El deporte", "b) La música", "c) El cine", "d) Leer"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Qué instrumento toca Ana?",
          options: ["a) El piano", "b) La batería", "c) La guitarra", "d) El violín"],
          correctAnswer: 2,
        },
        {
          id: 3,
          question: "¿Cuándo empezó a tocar la guitarra Ana?",
          options: ["a) A los diez años", "b) A los once años", "c) A los doce años", "d) A los trece años"],
          correctAnswer: 2,
        },
        {
          id: 4,
          question: "¿Quién le regaló la primera guitarra a Ana?",
          options: ["a) Sus amigos", "b) Sus abuelos", "c) Sus padres", "d) Su hermana"],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "¿Cuándo toca la guitarra Ana?",
          options: ["a) Todos los días", "b) Los fines de semana", "c) Por la noche", "d) Por la mañana"],
          correctAnswer: 1,
        },
        {
          id: 6,
          question: "¿Qué tipo de música escucha Ana?",
          options: ["a) Música clásica", "b) Música pop", "c) Música rock", "d) Música jazz"],
          correctAnswer: 1,
        },
        {
          id: 7,
          question: "¿De dónde es su cantante favorito?",
          options: ["a) Mexicano", "b) Argentino", "c) Español", "d) Colombiano"],
          correctAnswer: 2,
        },
        {
          id: 8,
          question: "¿A dónde fue Ana al último concierto?",
          options: ["a) Barcelona", "b) Valencia", "c) Madrid", "d) Sevilla"],
          correctAnswer: 2,
        },
        {
          id: 9,
          question: "¿Cómo se sintió Ana en el concierto?",
          options: ["a) Aburrida", "b) Cansada", "c) Muy feliz", "d) Nerviosa"],
          correctAnswer: 2,
        },
        {
          id: 10,
          question: "¿Qué hace Ana cuando está triste?",
          options: ["a) Llora", "b) Escucha música", "c) Duerme", "d) Camina"],
          correctAnswer: 1,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi fin de semana",
        description: "Escribe 3-4 frases sobre tu fin de semana. Di qué haces el sábado y el domingo.",
        structure: {
          intro: "Di dónde vas el sábado.",
          body: "Di qué haces el domingo.",
          conclusion: "Di si te gusta.",
        },
        connectors: ["El sábado", "El domingo", "Me gusta", "Por la noche"],
        wordCount: "20-40 palabras",
      },
      optionB: {
        title: "Mi deporte favorito",
        description:
          "Escribe 3-4 frases sobre tu deporte favorito. Di qué deporte es, dónde lo practicas y con quién.",
        structure: {
          intro: "Di tu deporte favorito.",
          body: "Di dónde lo practicas.",
          conclusion: "Di con quién juegas.",
        },
        connectors: ["Mi deporte favorito es", "Practico en", "Juego con", "Me gusta porque"],
        wordCount: "20-40 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Tu tiempo libre",
        description: "Habla de tu tiempo libre en 30-45 segundos. Di qué te gusta hacer, con quién y dónde.",
        connectors: ["En mi tiempo libre", "Me gusta", "Normalmente voy a", "Con mis amigos"],
        guideQuestions: [
          "¿Qué te gusta hacer en tu tiempo libre?",
          "¿Con quién lo haces?",
          "¿Dónde?",
          "¿Por qué te gusta?",
        ],
      },
      topic2: {
        title: "Tu deporte favorito",
        description:
          "Habla de tu deporte favorito en 30-45 segundos. Di qué deporte es, cuándo lo practicas y por qué te gusta.",
        connectors: ["Mi deporte favorito es", "Lo practico", "Me gusta porque"],
        guideQuestions: [
          "¿Cuál es tu deporte favorito?",
          "¿Cuándo lo practicas?",
          "¿Dónde?",
          "¿Por qué te gusta?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero queréis hacer planes para el fin de semana. Tenéis que decidir qué hacer.",
      questions: [
        {
          question: "Pregunta a tu compañero: ¿Qué te gusta hacer el fin de semana?",
          help: "Usa: ¿Qué te gusta hacer? / ¿Te gusta el deporte?",
          usefulPhrases: ["¿Qué te gusta hacer el fin de semana?", "¿Te gusta el fútbol?", "Yo prefiero..."],
        },
        {
          question: "Pregunta a tu compañero: ¿Prefieres ir al cine o hacer deporte?",
          help: "Usa: ¿Prefieres... o...?",
          usefulPhrases: ["¿Prefieres el cine o el deporte?", "¿Vamos al cine?", "¿Por qué prefieres eso?"],
        },
        {
          question: "Pregunta a tu compañero: ¿Quieres ir a la piscina conmigo el sábado?",
          help: "Usa: ¿Quieres ir a...? / ¿Te apetece?",
          usefulPhrases: ["¿Quieres ir a la piscina?", "¿A qué hora?", "Vale, me gusta la idea."],
        },
      ],
    },
  },
  {
    id: 6,
    level: "A1",
    theme: "La ropa y las estaciones",
    icon: "Shirt",
    vocabulary: [
      {
        word: "ropa",
        definition: "Prendas que nos vestimos",
        chinese: "衣服",
        example: "Compro ropa nueva.",
      },
      {
        word: "camiseta",
        definition: "Prenda de manga corta",
        chinese: "T恤",
        example: "Llevo una camiseta azul.",
      },
      {
        word: "pantalón",
        definition: "Prenda para las piernas",
        chinese: "裤子",
        example: "Mis pantalones son negros.",
      },
      {
        word: "zapatos",
        definition: "Para los pies",
        chinese: "鞋子",
        example: "Necesito zapatos cómodos.",
      },
      {
        word: "verano",
        definition: "Estación más calurosa",
        chinese: "夏天",
        example: "En verano llevo camiseta.",
      },
      {
        word: "invierno",
        definition: "Estación más fría",
        chinese: "冬天",
        example: "En invierno llevo chaqueta.",
      },
      {
        word: "chaqueta",
        definition: "Prenda de abrigo",
        chinese: "夹克",
        example: "Llevo chaqueta porque hace frío.",
      },
      {
        word: "color",
        definition: "Propiedad de las cosas",
        chinese: "颜色",
        example: "Mi color favorito es rojo.",
      },
      {
        word: "tienda",
        definition: "Lugar para comprar",
        chinese: "商店",
        example: "Voy a la tienda de ropa.",
      },
      {
        word: "comprar",
        definition: "Obtener algo con dinero",
        chinese: "买",
        example: "Compro una camisa nueva.",
      },
    ],
    reading: {
      textType: "descriptivo",
      title: "Mi ropa según la estación",
      text: `Hola, soy Marta y vivo en Madrid. Quiero hablaros de mi ropa y cómo me visto según la estación del año.

En verano, hace mucho calor en Madrid. Por eso llevo ropa ligera: camisetas de colores claros y pantalones cortos. Mis colores favoritos para el verano son el blanco y el azul. También llevo sandalias y gafas de sol para protegerme del sol.

En invierno, hace mucho frío. Llevo chaquetas gruesas, jerséis de lana y pantalones largos. Mi chaqueta favorita es negra y me la puso mi abuela. También llevo bufanda, guantes y gorro. Me gusta el invierno porque puedo usar ropa de abrigo y estar calentita.

En primavera y otoño, el tiempo es variable. Llevo chaquetas más ligeras y jerséis finos. Me gusta vestirme con colores cálidos como el naranja y el marrón.

Normalmente compro mi ropa en una tienda cerca de mi casa. La dependienta es muy simpática y siempre me ayuda a elegir. A veces compro ropa por internet, pero prefiero ir a la tienda para probármela.`,
      questions: [
        {
          id: 1,
          question: "¿Dónde vive Marta?",
          options: ["a) Barcelona", "b) Madrid", "c) Valencia", "d) Sevilla"],
          correctAnswer: 1,
          explanation: 'El texto dice: "vivo en Madrid".',
        },
        {
          id: 2,
          question: "¿Qué lleva Marta en verano?",
          options: ["a) Chaquetas", "b) Camisetas y pantalones cortos", "c) Jerséis de lana", "d) Bufanda"],
          correctAnswer: 1,
          explanation: 'El texto dice: "llevo ropa ligera: camisetas y pantalones cortos".',
        },
        {
          id: 3,
          question: "¿Qué colores le gustan a Marta en verano?",
          options: ["a) Negro y gris", "b) Blanco y azul", "c) Rojo y verde", "d) Naranja y marrón"],
          correctAnswer: 1,
          explanation: 'El texto dice: "mis colores favoritos son el blanco y el azul".',
        },
        {
          id: 4,
          question: "¿Qué lleva Marta en invierno?",
          options: [
            "a) Camisetas",
            "b) Chaquetas gruesas y jerséis de lana",
            "c) Pantalones cortos",
            "d) Sandalias",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Llevo chaquetas gruesas, jerséis de lana y pantalones largos".',
        },
        {
          id: 5,
          question: "¿De qué color es la chaqueta favorita de Marta?",
          options: ["a) Azul", "b) Blanca", "c) Negra", "d) Gris"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Mi chaqueta favorita es negra".',
        },
        {
          id: 6,
          question: "¿Quién le regaló la chaqueta a Marta?",
          options: ["a) Su madre", "b) Su abuela", "c) Su hermana", "d) Su amiga"],
          correctAnswer: 1,
          explanation: 'El texto dice: "me la puso mi abuela".',
        },
        {
          id: 7,
          question: "¿Qué lleva Marta en primavera y otoño?",
          options: [
            "a) Camisetas",
            "b) Chaquetas ligeras y jerséis finos",
            "c) Abrigos gruesos",
            "d) Ropa de verano",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Llevo chaquetas más ligeras y jerséis finos".',
        },
        {
          id: 8,
          question: "¿Qué colores le gustan a Marta en otoño?",
          options: ["a) Blanco y azul", "b) Naranja y marrón", "c) Rojo y verde", "d) Negro y gris"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Me gusta vestirme con colores cálidos como el naranja y el marrón".',
        },
        {
          id: 9,
          question: "¿Dónde compra Marta la ropa normalmente?",
          options: [
            "a) En internet",
            "b) En una tienda cerca de su casa",
            "c) En un mercado",
            "d) En otro país",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "compro mi ropa en una tienda cerca de mi casa".',
        },
        {
          id: 10,
          question: "¿Por qué prefiere ir a la tienda?",
          options: [
            "a) Es más barato",
            "b) Puede probarse la ropa",
            "c) Hay más variedad",
            "d) Es más rápido",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "prefiero ir a la tienda para probármela".',
        },
      ],
    },
    listening: {
      title: "Comprando ropa para el verano",
      transcription: `Hoy es sábado y voy al centro comercial con mi amiga Elena. Necesito comprar ropa para el verano porque me voy de vacaciones a la playa la próxima semana.

Entramos en una tienda de ropa. Hay muchas ofertas. Veo una camiseta blanca muy bonita. Cuesta 10 euros. También veo unos pantalones cortos azules. Cuestan 15 euros. Me los pruebo y me quedan bien.

Elena me ayuda a elegir. Me dice que la camiseta blanca y los pantalones azules combinan muy bien. También me compro un vestido rojo para las noches de verano. Cuesta 20 euros.

Pago todo con tarjeta. La dependienta es muy amable y me da una bolsa bonita. Estoy muy contenta con mi compra. Elena también compra unos zapatos nuevos. Pasamos una tarde muy divertida juntas.`,
      questions: [
        {
          id: 1,
          question: "¿Dónde va Marta?",
          options: ["a) Al supermercado", "b) Al centro comercial", "c) Al restaurante", "d) Al cine"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Con quién va Marta?",
          options: ["a) Con su madre", "b) Con su amiga Elena", "c) Con su hermana", "d) Con su prima"],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "¿Por qué necesita ropa nueva?",
          options: [
            "a) Porque va a trabajar",
            "b) Porque se va de vacaciones",
            "c) Porque va a una boda",
            "d) Porque tiene un examen",
          ],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "¿Qué compra Marta?",
          options: [
            "a) Una chaqueta",
            "b) Una camiseta blanca y pantalones azules",
            "c) Un abrigo",
            "d) Zapatos",
          ],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "¿Cuánto cuesta la camiseta?",
          options: ["a) 5 euros", "b) 10 euros", "c) 15 euros", "d) 20 euros"],
          correctAnswer: 1,
        },
        {
          id: 6,
          question: "¿Cuánto cuestan los pantalones cortos?",
          options: ["a) 10 euros", "b) 15 euros", "c) 20 euros", "d) 25 euros"],
          correctAnswer: 1,
        },
        {
          id: 7,
          question: "¿Qué compra también Marta para las noches de verano?",
          options: ["a) Un vestido rojo", "b) Una chaqueta", "c) Un jersey", "d) Una bufanda"],
          correctAnswer: 0,
        },
        {
          id: 8,
          question: "¿Cuánto cuesta el vestido?",
          options: ["a) 15 euros", "b) 20 euros", "c) 25 euros", "d) 30 euros"],
          correctAnswer: 1,
        },
        {
          id: 9,
          question: "¿Cómo paga Marta?",
          options: ["a) En efectivo", "b) Con tarjeta", "c) Con cheque", "d) No paga"],
          correctAnswer: 1,
        },
        {
          id: 10,
          question: "¿Qué compra Elena?",
          options: ["a) Una camiseta", "b) Un vestido", "c) Zapatos", "d) Un bolso"],
          correctAnswer: 2,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi ropa favorita",
        description:
          "Escribe 3-4 frases sobre tu ropa favorita. Di qué prenda es, de qué color y cuándo la llevas.",
        structure: {
          intro: "Di tu prenda favorita.",
          body: "Di de qué color es.",
          conclusion: "Di cuándo la llevas.",
        },
        connectors: ["Mi prenda favorita es", "Es de color", "La llevo cuando", "Me gusta porque"],
        wordCount: "20-40 palabras",
      },
      optionB: {
        title: "Un día de compras",
        description: "Escribe 3-4 frases sobre un día de compras. Di qué compraste, dónde y cuánto pagaste.",
        structure: {
          intro: "Di dónde fuiste.",
          body: "Di qué compraste.",
          conclusion: "Di cuánto pagaste.",
        },
        connectors: ["Fui a", "Compré", "Pagué", "Me gustó"],
        wordCount: "20-40 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Tu ropa favorita",
        description:
          "Habla de tu ropa favorita en 30-45 segundos. Di qué prenda es, de qué color y por qué te gusta.",
        connectors: ["Mi ropa favorita es", "Es de color", "Me gusta porque", "La llevo a menudo"],
        guideQuestions: [
          "¿Qué ropa te gusta más?",
          "¿De qué color es?",
          "¿Cuándo la llevas?",
          "¿Por qué te gusta?",
        ],
      },
      topic2: {
        title: "La ropa de verano y de invierno",
        description: "Habla de la ropa que llevas en verano y en invierno en 30-45 segundos.",
        connectors: ["En verano llevo", "En invierno llevo", "Porque hace", "Me gusta más"],
        guideQuestions: [
          "¿Qué llevas en verano?",
          "¿Qué llevas en invierno?",
          "¿Qué prefieres, calor o frío?",
          "¿Por qué?",
        ],
      },
    },
    interaction: {
      situation: "Tú y tu compañero estáis en una tienda de ropa. Tenéis que elegir un regalo para un amigo.",
      questions: [
        {
          question: "Pregunta a tu compañero: ¿Qué ropa podemos regalar a nuestro amigo?",
          help: "Usa: ¿Qué le regalamos? / ¿Le gusta la ropa?",
          usefulPhrases: ["¿Qué le podemos regalar?", "¿Le gustan las camisetas?", "Yo creo que..."],
        },
        {
          question: "Pregunta a tu compañero: ¿De qué color compramos la camiseta?",
          help: "Usa: ¿De qué color? / ¿Te gusta el azul?",
          usefulPhrases: [
            "¿De qué color la compramos?",
            "¿Prefieres el blanco o el negro?",
            "El azul es bonito.",
          ],
        },
        {
          question: "Pregunta a tu compañero: ¿Cuánto queremos gastar?",
          help: "Usa: ¿Cuánto dinero tenemos? / ¿Cuánto cuesta?",
          usefulPhrases: ["¿Cuánto queremos gastar?", "Tenemos 20 euros.", "Esta camiseta cuesta 15."],
        },
      ],
    },
  },
  {
    id: 7,
    level: "A1",
    theme: "La ciudad y los lugares",
    icon: "Building",
    vocabulary: [
      {
        word: "ciudad",
        definition: "Lugar grande con muchas casas",
        chinese: "城市",
        example: "Madrid es una ciudad grande.",
      },
      {
        word: "calle",
        definition: "Camino entre casas",
        chinese: "街道",
        example: "Mi calle es tranquila.",
      },
      {
        word: "plaza",
        definition: "Espacio grande en la ciudad",
        chinese: "广场",
        example: "La plaza tiene una fuente.",
      },
      {
        word: "parque",
        definition: "Lugar con árboles y flores",
        chinese: "公园",
        example: "Voy al parque los domingos.",
      },
      {
        word: "tienda",
        definition: "Lugar para comprar cosas",
        chinese: "商店",
        example: "La tienda cierra a las 8.",
      },
      {
        word: "supermercado",
        definition: "Tienda grande de comida",
        chinese: "超市",
        example: "Compro fruta en el supermercado.",
      },
      {
        word: "restaurante",
        definition: "Lugar para comer",
        chinese: "餐厅",
        example: "Ceno en un restaurante italiano.",
      },
      {
        word: "biblioteca",
        definition: "Lugar con libros para leer",
        chinese: "图书馆",
        example: "Estudio en la biblioteca.",
      },
      {
        word: "escuela",
        definition: "Lugar para aprender",
        chinese: "学校",
        example: "Mi escuela está cerca de casa.",
      },
      {
        word: "hospital",
        definition: "Lugar para personas enfermas",
        chinese: "医院",
        example: "El hospital está en el centro.",
      },
    ],
    reading: {
      textType: "descriptivo",
      title: "Mi ciudad: Granada",
      text: `Hola, soy Javier y vivo en Granada, una ciudad pequeña pero muy bonita del sur de España. Granada tiene muchos lugares interesantes para visitar.

Mi casa está cerca del parque García Lorca, que es el parque más grande de la ciudad. Los domingos por la mañana, voy al parque con mis amigos. Jugamos al fútbol o simplemente paseamos y hablamos. Hay muchos árboles y flores. Me gusta mucho la naturaleza.

En el centro de la ciudad, hay una plaza muy famosa que se llama la Plaza Nueva. Es una plaza muy animada donde hay restaurantes y tiendas. Los fines de semana, la gente se reúne allí para tomar algo y disfrutar del buen tiempo.

También hay una biblioteca pública cerca de mi escuela. Voy allí los martes y jueves para estudiar y hacer los deberes. La biblioteca es muy tranquila y hay muchos libros. Me encanta leer.

Lo que más me gusta de Granada es que es una ciudad tranquila y segura. La gente es muy amable y siempre te ayuda. Me siento muy feliz viviendo aquí.`,
      questions: [
        {
          id: 1,
          question: "¿Dónde vive Javier?",
          options: ["a) Madrid", "b) Barcelona", "c) Granada", "d) Sevilla"],
          correctAnswer: 2,
          explanation: 'El texto dice: "vivo en Granada".',
        },
        {
          id: 2,
          question: "¿Cómo es Granada?",
          options: ["a) Grande y ruidosa", "b) Pequeña y bonita", "c) Fea y aburrida", "d) Moderna y cara"],
          correctAnswer: 1,
          explanation: 'El texto dice: "una ciudad pequeña pero muy bonita".',
        },
        {
          id: 3,
          question: "¿Dónde está la casa de Javier?",
          options: [
            "a) Cerca del hospital",
            "b) Cerca del parque",
            "c) Cerca de la escuela",
            "d) Cerca de la plaza",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Mi casa está cerca del parque".',
        },
        {
          id: 4,
          question: "¿Cómo se llama el parque?",
          options: [
            "a) Parque Central",
            "b) Parque García Lorca",
            "c) Parque del Sur",
            "d) Parque de la Ciudad",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "el parque García Lorca".',
        },
        {
          id: 5,
          question: "¿Cuándo va Javier al parque?",
          options: ["a) Los sábados", "b) Los domingos", "c) Los lunes", "d) Todos los días"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Los domingos voy al parque".',
        },
        {
          id: 6,
          question: "¿Qué hay en el centro de la ciudad?",
          options: ["a) Un hospital", "b) Una plaza famosa", "c) Un parque", "d) Una biblioteca"],
          correctAnswer: 1,
          explanation: 'El texto dice: "hay una plaza muy famosa".',
        },
        {
          id: 7,
          question: "¿Cómo se llama la plaza?",
          options: ["a) Plaza Mayor", "b) Plaza Nueva", "c) Plaza del Sol", "d) Plaza de la Ciudad"],
          correctAnswer: 1,
          explanation: 'El texto dice: "la Plaza Nueva".',
        },
        {
          id: 8,
          question: "¿Dónde estudia Javier?",
          options: ["a) En casa", "b) En la biblioteca", "c) En la escuela", "d) En el parque"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Estudio en la biblioteca".',
        },
        {
          id: 9,
          question: "¿Cuándo va Javier a la biblioteca?",
          options: [
            "a) Los lunes y miércoles",
            "b) Los martes y jueves",
            "c) Los viernes",
            "d) Los fines de semana",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "los martes y jueves para estudiar".',
        },
        {
          id: 10,
          question: "¿Por qué le gusta Granada a Javier?",
          options: ["a) Es grande y moderna", "b) Es tranquila y segura", "c) Es barata", "d) Es famosa"],
          correctAnswer: 1,
          explanation: 'El texto dice: "es una ciudad tranquila y segura".',
        },
      ],
    },
    listening: {
      title: "Un paseo por el centro",
      transcription: `Hoy es domingo y hace muy buen tiempo en Granada. Decido salir a pasear por el centro de la ciudad con mi hermana pequeña.

Primero, vamos a la Plaza Nueva. La plaza está llena de gente. Hay familias, turistas y grupos de amigos. Vemos una fuente muy bonita y nos hacemos una foto. Mi hermana está muy contenta.

Luego, paseamos por las calles del centro. Hay muchas tiendas de recuerdos y restaurantes. El olor a comida es increíble. Decidimos comer en un restaurante italiano. Pedimos pizza y pasta. La comida está deliciosa.

Después de comer, vamos al parque García Lorca. Mi hermana juega en los columpios y yo leo un libro en un banco. Es un día perfecto. Me encanta pasar el tiempo con mi hermana y disfrutar de mi ciudad.`,
      questions: [
        {
          id: 1,
          question: "¿Qué día es hoy?",
          options: ["a) Sábado", "b) Domingo", "c) Lunes", "d) Viernes"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Con quién sale Javier?",
          options: ["a) Con su madre", "b) Con su hermana pequeña", "c) Con sus amigos", "d) Con su primo"],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "¿A dónde van primero?",
          options: ["a) Al parque", "b) A la Plaza Nueva", "c) A la biblioteca", "d) Al hospital"],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "¿Qué hay en la plaza?",
          options: ["a) Una iglesia", "b) Una fuente", "c) Un supermercado", "d) Un cine"],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "¿Dónde comen?",
          options: [
            "a) En un restaurante italiano",
            "b) En un restaurante español",
            "c) En casa",
            "d) En un bar",
          ],
          correctAnswer: 0,
        },
        {
          id: 6,
          question: "¿Qué piden para comer?",
          options: ["a) Paella", "b) Pizza y pasta", "c) Ensalada", "d) Sopa"],
          correctAnswer: 1,
        },
        {
          id: 7,
          question: "¿Cómo está la comida?",
          options: ["a) Mala", "b) Deliciosa", "c) Regular", "d) Fría"],
          correctAnswer: 1,
        },
        {
          id: 8,
          question: "¿A qué lugar van después de comer?",
          options: [
            "a) Al centro comercial",
            "b) Al parque García Lorca",
            "c) A la biblioteca",
            "d) Al cine",
          ],
          correctAnswer: 1,
        },
        {
          id: 9,
          question: "¿Qué hace la hermana de Javier en el parque?",
          options: ["a) Lee un libro", "b) Juega en los columpios", "c) Corre", "d) Duerme"],
          correctAnswer: 1,
        },
        {
          id: 10,
          question: "¿Qué hace Javier en el parque?",
          options: ["a) Juega al fútbol", "b) Lee un libro", "c) Duerme", "d) Habla por teléfono"],
          correctAnswer: 1,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi ciudad",
        description: "Escribe 3-4 frases sobre tu ciudad. Di cómo es, qué lugares hay y qué te gusta hacer.",
        structure: {
          intro: "Di cómo es tu ciudad.",
          body: "Di qué lugares hay.",
          conclusion: "Di qué te gusta hacer.",
        },
        connectors: ["Mi ciudad es", "Hay", "Me gusta ir a"],
        wordCount: "20-40 palabras",
      },
      optionB: {
        title: "Mi lugar favorito en la ciudad",
        description:
          "Escribe 3-4 frases sobre tu lugar favorito. Di qué lugar es, dónde está y por qué te gusta.",
        structure: {
          intro: "Di tu lugar favorito.",
          body: "Di dónde está.",
          conclusion: "Di por qué te gusta.",
        },
        connectors: ["Mi lugar favorito es", "Está en", "Me gusta porque"],
        wordCount: "20-40 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Describe tu ciudad",
        description:
          "Habla de tu ciudad en 30-45 segundos. Di cómo es, qué lugares hay y qué te gusta hacer.",
        connectors: ["Mi ciudad es", "Hay", "Me gusta", "Los fines de semana"],
        guideQuestions: [
          "¿Cómo es tu ciudad?",
          "¿Qué lugares hay?",
          "¿Qué te gusta hacer?",
          "¿Dónde vas los fines de semana?",
        ],
      },
      topic2: {
        title: "Tu lugar favorito",
        description:
          "Habla de tu lugar favorito en la ciudad en 30-45 segundos. Di qué es, dónde está y por qué te gusta.",
        connectors: ["Mi lugar favorito es", "Está en", "Me gusta porque", "Voy a menudo"],
        guideQuestions: ["¿Cuál es tu lugar favorito?", "¿Dónde está?", "¿Por qué te gusta?", "¿Cuándo vas?"],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero queréis ir al centro de la ciudad. Tenéis que decidir qué lugares visitar.",
      questions: [
        {
          question: "Pregunta a tu compañero: ¿Qué lugares quieres visitar?",
          help: "Usa: ¿Qué quieres visitar? / ¿Vamos al parque?",
          usefulPhrases: ["¿Qué quieres visitar?", "¿Vamos al parque?", "¿O prefieres la plaza?"],
        },
        {
          question: "Pregunta a tu compañero: ¿Vamos a comer a un restaurante? ¿Cuál prefieres?",
          help: "Usa: ¿Vamos a comer? / ¿Qué restaurante te gusta?",
          usefulPhrases: [
            "¿Vamos a comer?",
            "¿Te gusta la comida italiana?",
            "Yo creo un restaurante bueno.",
          ],
        },
        {
          question: "Pregunta a tu compañero: ¿Cómo vamos al centro? ¿Andando o en autobús?",
          help: "Usa: ¿Cómo vamos? / ¿Andando o en autobús?",
          usefulPhrases: ["¿Vamos andando?", "¿Cogemos el autobús?", "El centro está cerca."],
        },
      ],
    },
  },
  {
    id: 8,
    level: "A1",
    theme: "Los animales",
    icon: "PawPrint",
    vocabulary: [
      {
        word: "perro",
        definition: "Animal doméstico, amigo del hombre",
        chinese: "狗",
        example: "Mi perro se llama Max.",
      },
      {
        word: "gato",
        definition: "Animal doméstico independiente",
        chinese: "猫",
        example: "El gato duerme mucho.",
      },
      {
        word: "pájaro",
        definition: "Animal que vuela",
        chinese: "鸟",
        example: "Los pájaros cantan.",
      },
      {
        word: "pez",
        definition: "Animal que vive en el agua",
        chinese: "鱼",
        example: "Tengo peces en casa.",
      },
      {
        word: "caballo",
        definition: "Animal grande que corre",
        chinese: "马",
        example: "Me gusta montar a caballo.",
      },
      {
        word: "vaca",
        definition: "Animal que da leche",
        chinese: "牛",
        example: "La vaca come hierba.",
      },
      {
        word: "gallo",
        definition: "Animal que canta por la mañana",
        chinese: "公鸡",
        example: "El gallo canta al amanecer.",
      },
      {
        word: "conejo",
        definition: "Animal pequeño con orejas largas",
        chinese: "兔子",
        example: "Mi conejo come zanahorias.",
      },
      {
        word: "tortuga",
        definition: "Animal con caparazón",
        chinese: "乌龟",
        example: "La tortuga es lenta.",
      },
      {
        word: "mascota",
        definition: "Animal que vive en casa",
        chinese: "宠物",
        example: "Mi mascota es un perro.",
      },
    ],
    reading: {
      textType: "descriptivo",
      title: "Mis mascotas",
      text: `Hola, soy Clara y vivo en Sevilla. En mi casa tenemos dos mascotas: un perro llamado Lucas y un gato llamado Lila. Son muy diferentes pero se llevan bien.

Lucas es un perro grande y muy juguetón. Tiene dos años y le encanta correr en el parque. Todos los días, mi padre saca a Lucas a pasear por la mañana y por la tarde. Lucas es muy inteligente y sabe hacer trucos como sentarse y dar la pata. Es muy cariñoso y siempre me espera en la puerta cuando vuelvo de la escuela.

Lila, mi gata, es más tranquila. Es pequeña, de color gris y tiene los ojos verdes. Le gusta dormir todo el día en el sofá. Por la noche, se despierta y juega con sus juguetes. Es muy independiente y no le gusta que la cojan en brazos, pero a veces se sienta en mi regazo cuando veo la televisión.

Además de mis mascotas, me gustan mucho los animales en general. Mi animal favorito de la naturaleza es el caballo porque es muy elegante y fuerte. También me gustan las tortugas, aunque son muy lentas.

Los animales son muy importantes en mi vida. Me hacen sentir feliz y me enseñan a ser responsable. Los fines de semana, a veces vamos al zoo y vemos otros animales. Es una actividad que me encanta.`,
      questions: [
        {
          id: 1,
          question: "¿Dónde vive Clara?",
          options: ["a) Madrid", "b) Barcelona", "c) Sevilla", "d) Valencia"],
          correctAnswer: 2,
          explanation: 'El texto dice: "vivo en Sevilla".',
        },
        {
          id: 2,
          question: "¿Cuántas mascotas tiene Clara?",
          options: ["a) Una", "b) Dos", "c) Tres", "d) Cuatro"],
          correctAnswer: 1,
          explanation: 'El texto dice: "tenemos dos mascotas".',
        },
        {
          id: 3,
          question: "¿Cómo se llama el perro?",
          options: ["a) Lila", "b) Lucas", "c) Max", "d) Leo"],
          correctAnswer: 1,
          explanation: 'El texto dice: "un perro llamado Lucas".',
        },
        {
          id: 4,
          question: "¿Cómo es Lucas?",
          options: [
            "a) Pequeño y tranquilo",
            "b) Grande y juguetón",
            "c) Viejo y cansado",
            "d) Rápido y silencioso",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Lucas es un perro grande y muy juguetón".',
        },
        {
          id: 5,
          question: "¿Quién saca a Lucas a pasear?",
          options: ["a) Clara", "b) La madre de Clara", "c) El padre de Clara", "d) La hermana de Clara"],
          correctAnswer: 2,
          explanation: 'El texto dice: "mi padre saca a Lucas a pasear".',
        },
        {
          id: 6,
          question: "¿Cómo se llama la gata?",
          options: ["a) Lucas", "b) Lila", "c) Luna", "d) Lola"],
          correctAnswer: 1,
          explanation: 'El texto dice: "un gato llamado Lila".',
        },
        {
          id: 7,
          question: "¿De qué color es Lila?",
          options: ["a) Blanca", "b) Negra", "c) Gris", "d) Naranja"],
          correctAnswer: 2,
          explanation: 'El texto dice: "de color gris".',
        },
        {
          id: 8,
          question: "¿Qué animal le gusta a Clara de la naturaleza?",
          options: ["a) El perro", "b) El gato", "c) El caballo", "d) El pájaro"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Mi animal favorito de la naturaleza es el caballo".',
        },
        {
          id: 9,
          question: "¿Qué hacen los fines de semana a veces Clara y su familia?",
          options: ["a) Van al parque", "b) Van al zoo", "c) Van a la playa", "d) Van al cine"],
          correctAnswer: 1,
          explanation: 'El texto dice: "los fines de semana, a veces vamos al zoo".',
        },
        {
          id: 10,
          question: "¿Qué enseñan los animales a Clara?",
          options: ["a) A ser rica", "b) A ser famosa", "c) A ser responsable", "d) A ser rápida"],
          correctAnswer: 2,
          explanation: 'El texto dice: "me enseñan a ser responsable".',
        },
      ],
    },
    listening: {
      title: "Una visita al zoo",
      transcription: `Hoy es sábado y mi familia y yo vamos al zoo de Sevilla. Hace muy buen tiempo y estamos todos muy contentos.

Primero, vemos a los leones. Los leones son muy grandes y fuertes. Están descansando bajo un árbol. Parecen muy tranquilos pero sé que son animales salvajes.

Luego, vamos a ver a las jirafas. Las jirafas son muy altas y tienen el cuello muy largo. Comen hojas de los árboles. Son muy elegantes.

Después, vamos a la zona de los monos. Los monos son mis favoritos. Son muy divertidos y hacen muchas tonterías. Saltan de un lado a otro y juegan todo el tiempo. La gente se ríe mucho viéndolos.

También vemos a los pingüinos y a los delfines. Pero los animales que más me gustan son los monos. Me encanta el zoo porque puedo ver muchos animales y aprender sobre ellos. Salimos del zoo muy felices y con muchas ganas de volver pronto.`,
      questions: [
        {
          id: 1,
          question: "¿Qué día van al zoo?",
          options: ["a) Domingo", "b) Sábado", "c) Lunes", "d) Viernes"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Qué animales ven primero?",
          options: ["a) Las jirafas", "b) Los leones", "c) Los monos", "d) Los pingüinos"],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "¿Cómo son los leones?",
          options: [
            "a) Pequeños y rápidos",
            "b) Grandes y fuertes",
            "c) Altos y delgados",
            "d) Lentos y viejos",
          ],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "¿Dónde están los leones?",
          options: ["a) En una cueva", "b) Bajo un árbol", "c) En el agua", "d) En una roca"],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "¿Qué comen las jirafas?",
          options: ["a) Carne", "b) Hojas de los árboles", "c) Fruta", "d) Pescado"],
          correctAnswer: 1,
        },
        {
          id: 6,
          question: "¿Qué animales son los favoritos?",
          options: ["a) Los leones", "b) Las jirafas", "c) Los monos", "d) Los pingüinos"],
          correctAnswer: 2,
        },
        {
          id: 7,
          question: "¿Qué hacen los monos?",
          options: ["a) Duermen", "b) Saltan y juegan", "c) Comen", "d) Nadan"],
          correctAnswer: 1,
        },
        {
          id: 8,
          question: "¿Qué hacen los monos que hace reír a la gente?",
          options: ["a) Cantan", "b) Hacen tonterías", "c) Corren", "d) Bailan"],
          correctAnswer: 1,
        },
        {
          id: 9,
          question: "¿Qué otros animales ven?",
          options: [
            "a) Perros y gatos",
            "b) Pingüinos y delfines",
            "c) Caballos y vacas",
            "d) Tortugas y conejos",
          ],
          correctAnswer: 1,
        },
        {
          id: 10,
          question: "¿Cómo salen del zoo?",
          options: ["a) Tristes", "b) Cansados", "c) Muy felices", "d) Enfadados"],
          correctAnswer: 2,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi mascota",
        description: "Escribe 3-4 frases sobre tu mascota. Di qué animal es, cómo se llama y qué hace.",
        structure: {
          intro: "Di qué mascota tienes.",
          body: "Di cómo se llama.",
          conclusion: "Di qué hace.",
        },
        connectors: ["Tengo un/una", "Se llama", "Es", "Le gusta"],
        wordCount: "20-40 palabras",
      },
      optionB: {
        title: "Mi animal favorito",
        description:
          "Escribe 3-4 frases sobre tu animal favorito. Di qué animal es, cómo es y por qué te gusta.",
        structure: {
          intro: "Di tu animal favorito.",
          body: "Di cómo es.",
          conclusion: "Di por qué te gusta.",
        },
        connectors: ["Mi animal favorito es", "Es", "Vive en", "Me gusta porque"],
        wordCount: "20-40 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Tu mascota o animal favorito",
        description:
          "Habla de tu mascota o animal favorito en 30-45 segundos. Di qué animal es, cómo es y por qué te gusta.",
        connectors: ["Mi animal favorito es", "Tiene", "Me gusta porque", "Es muy"],
        guideQuestions: ["¿Cuál es tu animal favorito?", "¿Cómo es?", "¿Dónde vive?", "¿Por qué te gusta?"],
      },
      topic2: {
        title: "Una visita al zoo",
        description:
          "Habla de una visita al zoo en 30-45 segundos. Di qué animales viste y cuál te gustó más.",
        connectors: ["Fui al zoo", "Vi", "El que más me gustó fue", "Porque"],
        guideQuestions: [
          "¿Fuiste al zoo alguna vez?",
          "¿Qué animales viste?",
          "¿Cuál te gustó más?",
          "¿Por qué?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero queréis tener una mascota en vuestro piso. Tenéis que decidir qué animal elegir.",
      questions: [
        {
          question: "Pregunta a tu compañero: ¿Qué mascota prefieres? ¿Un perro o un gato?",
          help: "Usa: ¿Qué prefieres? / ¿Un perro o un gato?",
          usefulPhrases: ["¿Qué mascota prefieres?", "¿Te gustan los perros?", "Yo prefiero los gatos."],
        },
        {
          question: "Pregunta a tu compañero: ¿Tenemos espacio en casa para un perro?",
          help: "Usa: ¿Hay espacio? / ¿Podemos tener un perro?",
          usefulPhrases: ["¿Tenemos espacio?", "El perro necesita espacio.", "El gato es más pequeño."],
        },
        {
          question: "Pregunta a tu compañero: ¿Quién va a cuidar de la mascota?",
          help: "Usa: ¿Quién la cuida? / ¿Tú o yo?",
          usefulPhrases: ["¿Quién va a cuidarla?", "Yo puedo sacar al perro.", "Tú puedes limpiar."],
        },
      ],
    },
  },
  {
    id: 9,
    level: "A1",
    theme: "La salud y el cuerpo",
    icon: "Activity",
    vocabulary: [
      {
        word: "cabeza",
        definition: "Parte superior del cuerpo",
        chinese: "头",
        example: "Me duele la cabeza.",
      },
      {
        word: "mano",
        definition: "Parte del cuerpo para coger cosas",
        chinese: "手",
        example: "Lávate las manos.",
      },
      {
        word: "pie",
        definition: "Parte del cuerpo para caminar",
        chinese: "脚",
        example: "Me duelen los pies.",
      },
      {
        word: "ojo",
        definition: "Parte del cuerpo para ver",
        chinese: "眼睛",
        example: "Tiene los ojos verdes.",
      },
      {
        word: "boca",
        definition: "Parte del cuerpo para comer y hablar",
        chinese: "嘴巴",
        example: "Abre la boca.",
      },
      {
        word: "doctor",
        definition: "Persona que cura enfermos",
        chinese: "医生",
        example: "Voy al doctor.",
      },
      {
        word: "enfermo",
        definition: "Persona que no está bien",
        chinese: "生病的",
        example: "Estoy enfermo, no voy a clase.",
      },
      {
        word: "farmacia",
        definition: "Tienda donde venden medicinas",
        chinese: "药店",
        example: "Compro medicina en la farmacia.",
      },
      {
        word: "medicina",
        definition: "Producto para curar",
        chinese: "药",
        example: "Tomo la medicina cada 8 horas.",
      },
      {
        word: "fiebre",
        definition: "Temperatura alta del cuerpo",
        chinese: "发烧",
        example: "Tengo fiebre, 39 grados.",
      },
    ],
    reading: {
      textType: "narrativo",
      title: "Una visita al médico",
      text: `Hola, soy Laura y hoy quiero contaros lo que me pasó ayer. Me desperté muy temprano con un fuerte dolor de cabeza. También tenía fiebre y me sentía muy cansada. No podía ni levantarme de la cama.

Mi madre, preocupada, me tomó la temperatura. Tenía 38,5 grados. Decidió llevarme al médico inmediatamente. Fuimos al centro de salud, que está cerca de nuestra casa. La sala de espera estaba llena de personas, pero esperamos pacientemente.

Cuando entramos en la consulta, el médico me preguntó qué me pasaba. Le dije que me dolía la cabeza, que tenía fiebre y que me sentía muy débil. Me miró la garganta, me escuchó el pecho y me dijo que tenía una gripe fuerte. Me recetó un medicamento para bajar la fiebre y me recomendó descansar mucho y beber mucha agua.

Después de la visita, fuimos a la farmacia a comprar la medicina. La farmacéutica nos explicó cómo debía tomarla: una pastilla cada ocho horas durante tres días.

Llegué a casa y me tomé la primera pastilla. Me acosté en la cama y dormí toda la tarde. Cuando desperté, me sentía un poco mejor. Mi madre me preparó una sopa caliente y me dijo que tenía que comer algo ligero.

Hoy me siento mucho mejor. Ya no tengo fiebre y el dolor de cabeza ha desaparecido. Voy a descansar un día más antes de volver a la escuela. Esta experiencia me ha enseñado que es muy importante cuidar nuestra salud y acudir al médico cuando estamos enfermos.`,
      questions: [
        {
          id: 1,
          question: "¿Cómo se llama la protagonista?",
          options: ["a) Ana", "b) Laura", "c) María", "d) Carmen"],
          correctAnswer: 1,
          explanation: 'El texto dice: "soy Laura".',
        },
        {
          id: 2,
          question: "¿Qué le dolía a Laura?",
          options: ["a) La garganta", "b) La cabeza", "c) El estómago", "d) La espalda"],
          correctAnswer: 1,
          explanation: 'El texto dice: "un fuerte dolor de cabeza".',
        },
        {
          id: 3,
          question: "¿Qué temperatura tenía Laura?",
          options: ["a) 37 grados", "b) 38,5 grados", "c) 39 grados", "d) 40 grados"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Tenía 38,5 grados".',
        },
        {
          id: 4,
          question: "¿Quién llevó a Laura al médico?",
          options: ["a) Su padre", "b) Su madre", "c) Su hermana", "d) Su amiga"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Mi madre me llevó al médico".',
        },
        {
          id: 5,
          question: "¿Qué le diagnosticó el médico a Laura?",
          options: ["a) Una alergia", "b) Una gripe fuerte", "c) Un resfriado", "d) Una intoxicación"],
          correctAnswer: 1,
          explanation: 'El texto dice: "tenía una gripe fuerte".',
        },
        {
          id: 6,
          question: "¿Qué le recetó el médico?",
          options: [
            "a) Un jarabe",
            "b) Un medicamento para bajar la fiebre",
            "c) Antibióticos",
            "d) Vitaminas",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Me recetó un medicamento para bajar la fiebre".',
        },
        {
          id: 7,
          question: "¿A dónde fueron después de la consulta?",
          options: ["a) A casa", "b) A la farmacia", "c) Al hospital", "d) Al supermercado"],
          correctAnswer: 1,
          explanation: 'El texto dice: "fuimos a la farmacia".',
        },
        {
          id: 8,
          question: "¿Cada cuánto tiempo debía tomar la medicina Laura?",
          options: ["a) Cada 4 horas", "b) Cada 6 horas", "c) Cada 8 horas", "d) Cada 12 horas"],
          correctAnswer: 2,
          explanation: 'El texto dice: "una pastilla cada ocho horas".',
        },
        {
          id: 9,
          question: "¿Qué preparó la madre de Laura para comer?",
          options: ["a) Pasta", "b) Una sopa caliente", "c) Ensalada", "d) Carne"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Mi madre me preparó una sopa caliente".',
        },
        {
          id: 10,
          question: "¿Qué ha aprendido Laura de esta experiencia?",
          options: [
            "a) Que hay que comer bien",
            "b) Que es importante cuidar la salud",
            "c) Que hay que hacer deporte",
            "d) Que hay que trabajar mucho",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "es muy importante cuidar nuestra salud".',
        },
      ],
    },
    listening: {
      title: "En la farmacia",
      transcription: `Buenos días, soy Pedro y trabajo en una farmacia en el centro de Barcelona. Hoy quiero contaros cómo es un día normal en mi trabajo.

La farmacia abre a las nueve de la mañana. Lo primero que hago es organizar los medicamentos en las estanterías. Hay muchos tipos de medicinas: pastillas, jarabes, cremas y vitaminas.

A lo largo del día, vienen muchas personas con diferentes problemas de salud. Algunos vienen con receta del médico y otros piden medicamentos sin receta. La gente también viene a preguntar sobre sus síntomas. Yo les escucho y les recomiendo el mejor tratamiento.

Un caso común es la gente que viene con fiebre. Les pregunto si tienen dolor de cabeza o de garganta. Les doy un termómetro para medir la temperatura. Si la fiebre es alta, les recomiendo un medicamento para bajarla.

También vienen personas con alergias en primavera. Les doy antihistamínicos para el picor y la congestión nasal. En invierno, muchas personas tienen tos y resfriados.

Lo que más me gusta de mi trabajo es poder ayudar a las personas. Cuando alguien se siente mejor gracias a mis consejos, me siento muy satisfecho. Cada día aprendo algo nuevo sobre la salud y los medicamentos.`,
      questions: [
        {
          id: 1,
          question: "¿Cómo se llama el farmacéutico?",
          options: ["a) Pablo", "b) Pedro", "c) Carlos", "d) Luis"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Dónde trabaja Pedro?",
          options: ["a) En Madrid", "b) En Valencia", "c) En Barcelona", "d) En Sevilla"],
          correctAnswer: 2,
        },
        {
          id: 3,
          question: "¿A qué hora abre la farmacia?",
          options: ["a) A las ocho", "b) A las nueve", "c) A las diez", "d) A las once"],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "¿Qué hace Pedro primero en el trabajo?",
          options: [
            "a) Limpia la farmacia",
            "b) Organiza los medicamentos",
            "c) Atiende a los clientes",
            "d) Lee el periódico",
          ],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "¿Qué tipos de medicamentos hay en la farmacia?",
          options: [
            "a) Solo pastillas",
            "b) Pastillas, jarabes, cremas y vitaminas",
            "c) Solo jarabes",
            "d) Solo cremas",
          ],
          correctAnswer: 1,
        },
        {
          id: 6,
          question: "¿Qué pregunta Pedro a las personas con fiebre?",
          options: [
            "a) Si tienen alergias",
            "b) Si tienen dolor de cabeza o garganta",
            "c) Si tienen tos",
            "d) Si tienen vómitos",
          ],
          correctAnswer: 1,
        },
        {
          id: 7,
          question: "¿Qué medicamento recomienda Pedro para la fiebre alta?",
          options: ["a) Vitaminas", "b) Un medicamento para bajarla", "c) Un jarabe", "d) Crema"],
          correctAnswer: 1,
        },
        {
          id: 8,
          question: "¿Qué problema tienen las personas en primavera?",
          options: ["a) Fiebre", "b) Alergias", "c) Gripe", "d) Dolores de cabeza"],
          correctAnswer: 1,
        },
        {
          id: 9,
          question: "¿Qué problemas tienen las personas en invierno?",
          options: ["a) Alergias", "b) Tos y resfriados", "c) Fiebre", "d) Dolores de estómago"],
          correctAnswer: 1,
        },
        {
          id: 10,
          question: "¿Qué es lo que más le gusta a Pedro de su trabajo?",
          options: ["a) Ganar dinero", "b) Ayudar a las personas", "c) Tener amigos", "d) Trabajar poco"],
          correctAnswer: 1,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Una vez que estuve enfermo/a",
        description:
          "Escribe 3-4 frases sobre una vez que estuviste enfermo. Di qué te dolía, qué hiciste y cómo mejoraste.",
        structure: {
          intro: "Di cuándo estuviste enfermo.",
          body: "Di qué te dolía.",
          conclusion: "Di cómo mejoraste.",
        },
        connectors: ["Una vez estuve enfermo", "Me dolía", "Fui al médico", "Mejoré"],
        wordCount: "20-40 palabras",
      },
      optionB: {
        title: "Consejos para estar sano",
        description: "Escribe 3-4 frases sobre cómo estar sano. Di qué comes, qué haces y qué evitas.",
        structure: {
          intro: "Di qué comes para estar sano.",
          body: "Di qué haces.",
          conclusion: "Di qué evitas.",
        },
        connectors: ["Para estar sano", "Como", "Hago", "Evito"],
        wordCount: "20-40 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Una visita al médico",
        description:
          "Habla de una visita al médico en 30-45 segundos. Di qué te dolía, qué te dijo el médico y cómo te sientes ahora.",
        connectors: ["Una vez fui al médico porque", "Me dolía", "El médico me dijo", "Ahora me siento"],
        guideQuestions: [
          "¿Por qué fuiste al médico?",
          "¿Qué te dolía?",
          "¿Qué te recetó?",
          "¿Cómo estás ahora?",
        ],
      },
      topic2: {
        title: "Hábitos saludables",
        description:
          "Habla de tus hábitos saludables en 30-45 segundos. Di qué comes, si haces deporte y cuánto duermes.",
        connectors: ["Para estar sano", "Como", "Hago deporte", "Duermo", "No como"],
        guideQuestions: [
          "¿Qué comes para estar sano?",
          "¿Haces deporte?",
          "¿Cuánto duermes?",
          "¿Qué evitas comer?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero sois compañeros de piso. Uno de vosotros está enfermo. Tenéis que hablar sobre qué hacer.",
      questions: [
        {
          question: "¿Qué te duele? ¿Tienes fiebre?",
          help: "Usa: ¿Qué te duele? / ¿Tienes fiebre?",
          usefulPhrases: ["¿Qué te duele?", "¿Tienes fiebre?", "¿Tomaste la medicina?"],
        },
        {
          question: "¿Vamos al médico o prefieres descansar en casa?",
          help: "Usa: ¿Vamos al médico? / ¿Prefieres quedarte en casa?",
          usefulPhrases: ["¿Prefieres ir al médico?", "Puedes descansar en casa.", "Te preparo una sopa."],
        },
        {
          question: "¿Necesitas que te ayude con algo?",
          help: "Usa: ¿Necesitas ayuda? / ¿Puedo hacer algo por ti?",
          usefulPhrases: ["¿Necesitas algo?", "¿Te traigo agua?", "¿Quieres comer algo?"],
        },
      ],
    },
  },
  {
    id: 10,
    level: "A1",
    theme: "Las profesiones",
    icon: "Briefcase",
    vocabulary: [
      {
        word: "profesor",
        definition: "Persona que enseña",
        chinese: "老师",
        example: "Mi profesor de español es bueno.",
      },
      {
        word: "médico",
        definition: "Persona que cura enfermos",
        chinese: "医生",
        example: "El médico me receta medicina.",
      },
      {
        word: "enfermera",
        definition: "Mujer que cuida enfermos",
        chinese: "护士",
        example: "La enfermera me pone una inyección.",
      },
      {
        word: "cocinero",
        definition: "Persona que prepara comida",
        chinese: "厨师",
        example: "El cocinero hace paella.",
      },
      {
        word: "camarero",
        definition: "Persona que sirve en restaurantes",
        chinese: "服务员",
        example: "El camarero toma nota.",
      },
      {
        word: "policía",
        definition: "Persona que cuida la seguridad",
        chinese: "警察",
        example: "La policía ayuda a la gente.",
      },
      {
        word: "bombero",
        definition: "Persona que apaga fuegos",
        chinese: "消防员",
        example: "El bombero apaga el incendio.",
      },
      {
        word: "conductor",
        definition: "Persona que maneja un vehículo",
        chinese: "司机",
        example: "El conductor del autobús es amable.",
      },
      {
        word: "artista",
        definition: "Persona que pinta o toca música",
        chinese: "艺术家",
        example: "El artista pinta cuadros.",
      },
      {
        word: "estudiante",
        definition: "Persona que estudia",
        chinese: "学生",
        example: "Soy estudiante de español.",
      },
    ],
    reading: {
      textType: "descriptivo",
      title: "Las profesiones de mi familia",
      text: `Hola, soy David y quiero hablaros de las profesiones de mi familia. Es un tema que me parece muy interesante porque todos tenemos trabajos diferentes.

Mi padre se llama Antonio y es médico. Trabaja en el hospital universitario de la ciudad. Es cirujano y opera a muchas personas. Le encanta su trabajo porque puede salvar vidas. A veces trabaja muchas horas, pero nunca se queja.

Mi madre se llama Carmen y es profesora de primaria. Enseña en una escuela cerca de nuestra casa. Le gusta mucho trabajar con niños pequeños. Dice que los niños son muy creativos y divertidos. Ella les enseña a leer, escribir y hacer matemáticas.

Mi hermana mayor, Paula, es estudiante de enfermería. Quiere ser enfermera como mi tía. Dice que le gusta cuidar de las personas y ayudar a los enfermos. Estudia mucho y está muy ilusionada.

Yo, por mi parte, quiero ser bombero. Me gusta ayudar a la gente y me encanta la aventura. Los bomberos son muy valientes y trabajan en equipo. Sé que es un trabajo peligroso pero muy importante para la sociedad.

En mi familia, todos estamos muy orgullosos de nuestras profesiones. Creemos que trabajar es importante y que hay que ayudar a los demás.`,
      questions: [
        {
          id: 1,
          question: "¿Cómo se llama el padre de David?",
          options: ["a) David", "b) Antonio", "c) Carmen", "d) Paula"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Mi padre se llama Antonio".',
        },
        {
          id: 2,
          question: "¿Qué profesión tiene the padre?",
          options: ["a) Profesor", "b) Médico", "c) Bombero", "d) Conductor"],
          correctAnswer: 1,
          explanation: 'El texto dice: "es médico".',
        },
        {
          id: 3,
          question: "¿Dónde trabaja el padre?",
          options: ["a) En una escuela", "b) En un hospital", "c) En un restaurante", "d) En una oficina"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Trabaja en el hospital".',
        },
        {
          id: 4,
          question: "¿Qué es la madre de David?",
          options: ["a) Médico", "b) Enfermera", "c) Profesora", "d) Cocinera"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Mi madre es profesora".',
        },
        {
          id: 5,
          question: "¿Dónde trabaja la madre?",
          options: ["a) En un hospital", "b) En una escuela", "c) En un restaurante", "d) En una oficina"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Enseña en una escuela".',
        },
        {
          id: 6,
          question: "¿Qué estudia la hermana de David?",
          options: ["a) Medicina", "b) Enfermería", "c) Arquitectura", "d) Ingeniería"],
          correctAnswer: 1,
          explanation: 'El texto dice: "es estudiante de enfermería".',
        },
        {
          id: 7,
          question: "¿Qué quiere ser la hermana?",
          options: ["a) Médico", "b) Profesora", "c) Enfermera", "d) Bombero"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Quiere ser enfermera".',
        },
        {
          id: 8,
          question: "¿Qué quiere ser David?",
          options: ["a) Médico", "b) Profesor", "c) Bombero", "d) Policía"],
          correctAnswer: 2,
          explanation: 'El texto dice: "quiero ser bombero".',
        },
        {
          id: 9,
          question: "¿Por qué quiere ser bombero David?",
          options: ["a) Por el dinero", "b) Por ayudar a la gente", "c) Por fama", "d) Por viajar"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Me gusta ayudar a la gente".',
        },
        {
          id: 10,
          question: "¿Qué piensa David sobre el trabajo de bombero?",
          options: ["a) Es fácil", "b) Es peligroso pero importante", "c) Es aburrido", "d) Es para vagos"],
          correctAnswer: 1,
          explanation: 'El texto dice: "un trabajo peligroso pero muy importante".',
        },
      ],
    },
    listening: {
      title: "Mi trabajo como cocinero",
      transcription: `Hola, me llamo Javier y soy cocinero en un restaurante español en el centro de Madrid. Llevo trabajando aquí cinco años y me encanta mi trabajo.

Me levanto a las ocho de la mañana todos los días. Desayuno rápido y voy al trabajo. Llego al restaurante a las diez. Primero, preparo todos los ingredientes para el día. Lavo y corto verduras, preparo las salsas y marino la carne y el pescado.

A las doce, el restaurante abre. Los clientes empiezan a llegar. Mis platos favoritos para preparar son la paella y la tortilla de patatas. También hago gazpacho y otros platos típicos españoles. Me gusta mucho cuando los clientes me dicen que la comida está deliciosa.

Trabajo hasta las cuatro de la tarde. Luego descanso dos horas. Vuelvo a trabajar a las seis para la cena. Termino a las once de la noche.

Lo mejor de mi trabajo es que puedo ser creativo con la comida. Me encanta probar recetas nuevas y sorprender a los clientes. Ser cocinero es duro pero muy gratificante.`,
      questions: [
        {
          id: 1,
          question: "¿Cómo se llama the cocinero?",
          options: ["a) Carlos", "b) Javier", "c) Pablo", "d) Miguel"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Dónde trabaja Javier?",
          options: ["a) En Valencia", "b) En Barcelona", "c) En Madrid", "d) En Sevilla"],
          correctAnswer: 2,
        },
        {
          id: 3,
          question: "¿Cuántos años lleva trabajando Javier?",
          options: ["a) Dos años", "b) Tres años", "c) Cinco años", "d) Diez años"],
          correctAnswer: 2,
        },
        {
          id: 4,
          question: "¿A qué hora llega al trabajo?",
          options: ["a) A las 8", "b) A las 9", "c) A las 10", "d) A las 11"],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "¿Qué prepara primero Javier?",
          options: ["a) La paella", "b) Los ingredientes", "c) La tortilla", "d) La sopa"],
          correctAnswer: 1,
        },
        {
          id: 6,
          question: "¿Cuáles son los platos favoritos de Javier?",
          options: ["a) Pizza y pasta", "b) Paella y tortilla", "c) Sopa y ensalada", "d) Carne y pescado"],
          correctAnswer: 1,
        },
        {
          id: 7,
          question: "¿A qué hora abre el restaurante?",
          options: ["a) A las 10", "b) A las 11", "c) A las 12", "d) A la 1"],
          correctAnswer: 2,
        },
        {
          id: 8,
          question: "¿A qué hora termina de trabajar por la mañana?",
          options: ["a) A las 2", "b) A las 3", "c) A las 4", "d) A las 5"],
          correctAnswer: 2,
        },
        {
          id: 9,
          question: "¿Qué hace Javier cuando descansa?",
          options: ["a) Duerme", "b) Lee", "c) No se dice", "d) Ve la tele"],
          correctAnswer: 2,
        },
        {
          id: 10,
          question: "¿Qué es lo mejor de su trabajo para Javier?",
          options: ["a) Ganar dinero", "b) Ser creativo", "c) Tener amigos", "d) Viajar"],
          correctAnswer: 1,
        },
      ],
    },
    writing: {
      optionA: {
        title: "La profesión de mis padres",
        description: "Escribe 3-4 frases sobre lo que hacen tus padres. Di qué son y dónde trabajan.",
        structure: {
          intro: "Di qué es tu padre.",
          body: "Di qué es tu madre.",
          conclusion: "Di qué quieres ser tú.",
        },
        connectors: ["Mi padre es", "Mi madre es", "Trabaja en", "Yo quiero ser"],
        wordCount: "20-40 palabras",
      },
      optionB: {
        title: "Mi profesión ideal",
        description:
          "Escribe 3-4 frases sobre tu profesión ideal. Di qué quieres ser, por qué y dónde quieres trabajar.",
        structure: {
          intro: "Di qué quieres ser.",
          body: "Di por qué te gusta.",
          conclusion: "Di dónde quieres trabajar.",
        },
        connectors: ["Quiero ser", "Me gusta porque", "Quiero trabajar en"],
        wordCount: "20-40 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Las profesiones de tu familia",
        description:
          "Habla de las profesiones de tu familia en 30-45 segundos. Di qué hace cada uno y dónde trabaja.",
        connectors: ["Mi padre es", "Trabaja en", "Mi madre es", "Mi hermano/hermana es"],
        guideQuestions: [
          "¿Qué hace tu padre?",
          "¿Dónde trabaja?",
          "¿Qué hace tu madre?",
          "¿Qué quieres ser tú?",
        ],
      },
      topic2: {
        title: "Tu profesión ideal",
        description:
          "Habla de tu profesión ideal en 30-45 segundos. Di qué quieres ser, por qué te gusta y qué hay que estudiar.",
        connectors: ["Mi profesión ideal es", "Me gusta porque", "Para ser", "Hay que estudiar"],
        guideQuestions: [
          "¿Qué quieres ser de mayor?",
          "¿Por qué te gusta esa profesión?",
          "¿Qué hay que estudiar?",
          "¿Dónde quieres trabajar?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero habláis sobre vuestros trabajos ideales. Tenéis que preguntaros y aconsejaros.",
      questions: [
        {
          question: "Pregunta a tu compañero: ¿Qué quieres ser en el futuro? ¿Por qué?",
          help: "Usa: ¿Qué quieres ser? / ¿Por qué te gusta?",
          usefulPhrases: ["¿Qué quieres ser?", "¿Por qué te gusta?", "Yo quiero ser..."],
        },
        {
          question: "Pregunta a tu compañero: ¿Qué es más importante, ganar dinero o ayudar a la gente?",
          help: "Usa: ¿Qué es más importante? / ¿Dinero o ayudar?",
          usefulPhrases: [
            "Para mí es importante...",
            "Ayudar a la gente es mejor.",
            "El dinero también importa.",
          ],
        },
        {
          question: "Pregunta a tu compañero: ¿Prefieres trabajar solo o con otras personas?",
          help: "Usa: ¿Prefieres trabajar solo? / ¿O en equipo?",
          usefulPhrases: ["Me gusta trabajar en equipo.", "Prefiero trabajar solo.", "Depende del trabajo."],
        },
      ],
    },
  },
  {
    id: 11,
    level: "A1",
    theme: "Los medios de transporte",
    icon: "Car",
    vocabulary: [
      {
        word: "coche",
        definition: "Vehículo con cuatro ruedas",
        chinese: "汽车",
        example: "Mi padre tiene un coche nuevo.",
      },
      {
        word: "autobús",
        definition: "Vehículo grande para muchas personas",
        chinese: "公共汽车",
        example: "Voy al trabajo en autobús.",
      },
      {
        word: "metro",
        definition: "Tren que va por debajo de la ciudad",
        chinese: "地铁",
        example: "El metro es rápido.",
      },
      {
        word: "tren",
        definition: "Vehículo largo sobre raíles",
        chinese: "火车",
        example: "Viajo en tren a Madrid.",
      },
      {
        word: "avión",
        definition: "Vehículo que vuela",
        chinese: "飞机",
        example: "El avión sale a las 10.",
      },
      {
        word: "barco",
        definition: "Vehículo que navega en el agua",
        chinese: "船",
        example: "El barco es grande.",
      },
      {
        word: "bicicleta",
        definition: "Vehículo de dos ruedas sin motor",
        chinese: "自行车",
        example: "Voy en bicicleta al parque.",
      },
      {
        word: "moto",
        definition: "Vehículo de dos ruedas con motor",
        chinese: "摩托车",
        example: "Su moto es rápida.",
      },
      {
        word: "taxi",
        definition: "Coche que se paga por viaje",
        chinese: "出租车",
        example: "Llamo un taxi al aeropuerto.",
      },
      {
        word: "billete",
        definition: "Papel para viajar en transporte",
        chinese: "票",
        example: "Compro un billete de tren.",
      },
    ],
    reading: {
      textType: "descriptivo",
      title: "Cómo voy a la universidad",
      text: `Hola, soy Elena y vivo en Madrid. Estudio arquitectura en la universidad, que está en el centro de la ciudad. Mi casa está en las afueras, así que cada día tengo que hacer un viaje de unos 45 minutos para llegar a clase.

Para ir a la universidad, uso dos transportes diferentes. Primero, cojo el autobús en la parada que está al lado de mi casa. El autobús número 32 me lleva hasta la estación de Atocha. El autobús suele ir muy lleno por la mañana, pero yo siempre encuentro un asiento. Durante el trayecto, aprovecho para repasar mis apuntes de clase o escuchar música.

En la estación de Atocha, cojo el metro. La línea de metro es rápida y limpia. Tardo unos 15 minutos hasta la parada de la universidad. Me gusta ir en metro porque es puntual y no hay problemas de tráfico. Además, puedo leer mientras viajo.

Los fines de semana, no voy a la universidad. Aprovecho para moverme por la ciudad de forma más relajada. Normalmente, voy en bicicleta al parque o a casa de mis amigos. La bicicleta es mi medio de transporte favorito porque es ecológica y también hago ejercicio.

Cuando llueve mucho o hace mucho frío, mis padres me dejan el coche. Pero prefiero usar el transporte público porque es más sostenible. Creo que es importante cuidar el medio ambiente.`,
      questions: [
        {
          id: 1,
          question: "¿Dónde vive Elena?",
          options: [
            "a) En el centro de Madrid",
            "b) En las afueras de Madrid",
            "c) En Barcelona",
            "d) En Valencia",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Mi casa está en las afueras".',
        },
        {
          id: 2,
          question: "¿Cuánto tarda Elena en llegar a la universidad?",
          options: ["a) 30 minutos", "b) 45 minutos", "c) Una hora", "d) 15 minutos"],
          correctAnswer: 1,
          explanation: 'El texto dice: "un viaje de unos 45 minutos".',
        },
        {
          id: 3,
          question: "¿Qué transporte coge Elena primero?",
          options: ["a) El metro", "b) El autobús", "c) El tren", "d) El taxi"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Primero, cojo el autobús".',
        },
        {
          id: 4,
          question: "¿Qué número de autobús coge Elena?",
          options: ["a) El 20", "b) El 32", "c) El 45", "d) El 10"],
          correctAnswer: 1,
          explanation: 'El texto dice: "El autobús número 32".',
        },
        {
          id: 5,
          question: "¿Qué hace Elena en el autobús?",
          options: [
            "a) Duerme",
            "b) Repasa sus apuntes o escucha música",
            "c) Lee el periódico",
            "d) Habla por teléfono",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "aprovecho para repasar mis apuntes o escuchar música".',
        },
        {
          id: 6,
          question: "¿Qué transporte coge Elena después del autobús?",
          options: ["a) El autobús", "b) El metro", "c) El tren", "d) La bicicleta"],
          correctAnswer: 1,
          explanation: 'El texto dice: "cojo el metro".',
        },
        {
          id: 7,
          question: "¿Cuánto tarda Elena en el metro?",
          options: ["a) 10 minutos", "b) 15 minutos", "c) 20 minutos", "d) 30 minutos"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Tardo unos 15 minutos".',
        },
        {
          id: 8,
          question: "¿Cuál es el medio de transporte favorito de Elena?",
          options: ["a) El coche", "b) El metro", "c) La bicicleta", "d) El autobús"],
          correctAnswer: 2,
          explanation: 'El texto dice: "La bicicleta es mi medio de transporte favorito".',
        },
        {
          id: 9,
          question: "¿Cuándo usa Elena el coche?",
          options: [
            "a) Todos los días",
            "b) Los fines de semana",
            "c) Cuando llueve o hace mucho frío",
            "d) Nunca",
          ],
          correctAnswer: 2,
          explanation:
            'El texto dice: "Cuando llueve mucho o hace mucho frío, mis padres me dejan el coche".',
        },
        {
          id: 10,
          question: "¿Por qué prefiere Elena el transporte público?",
          options: ["a) Es más barato", "b) Es más rápido", "c) Es más sostenible", "d) Es más cómodo"],
          correctAnswer: 2,
          explanation: 'El texto dice: "prefiero usar el transporte público porque es más sostenible".',
        },
      ],
    },
    listening: {
      title: "Un viaje a la playa",
      transcription: `Hola, soy Roberto y hoy quiero contaros mi viaje de fin de semana a la playa con mis amigos. Fuimos a Valencia, que está a unos 350 kilómetros de Madrid.

Decidimos ir en tren porque es más cómodo y rápido que el autobús. Compramos los billetes con dos semanas de antelación por internet para conseguir un mejor precio. El billete de ida y vuelta costó 50 euros por persona.

El tren salía de la estación de Atocha a las ocho de la mañana. Llegamos a Valencia a las once y media. El viaje fue muy agradable. El tren era moderno y tenía asientos muy cómodos. Durante el viaje, leímos libros, escuchamos música y hablamos de nuestros planes para el fin de semana.

En Valencia, nos alojamos en un hotel cerca de la playa. Pasamos el fin de semana nadando en el mar, tomando el sol y comiendo paella. Fue un fin de semana fantástico.

El domingo por la tarde, cogimos el tren de vuelta a Madrid. Llegamos a casa a las nueve de la noche. Estábamos muy cansados pero felices. Me encanta viajar en tren y ya estoy pensando en el próximo viaje.`,
      questions: [
        {
          id: 1,
          question: "¿Quién cuenta la historia?",
          options: ["a) Elena", "b) Roberto", "c) Carlos", "d) Pablo"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿A dónde fueron Roberto y sus amigos?",
          options: ["a) Barcelona", "b) Valencia", "c) Sevilla", "d) Madrid"],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "¿Qué medio de transporte usaron?",
          options: ["a) El autobús", "b) El tren", "c) El coche", "d) El avión"],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "¿Cuánto costó el billete de ida y vuelta?",
          options: ["a) 30 euros", "b) 40 euros", "c) 50 euros", "d) 60 euros"],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "¿A qué hora salió el tren de Madrid?",
          options: ["a) A las 7:00", "b) A las 8:00", "c) A las 9:00", "d) A las 10:00"],
          correctAnswer: 1,
        },
        {
          id: 6,
          question: "¿A qué hora llegaron a Valencia?",
          options: ["a) A las 10:00", "b) A las 11:00", "c) A las 11:30", "d) A las 12:00"],
          correctAnswer: 2,
        },
        {
          id: 7,
          question: "¿Dónde se alojaron en Valencia?",
          options: [
            "a) En un camping",
            "b) En un hotel cerca de la playa",
            "c) En casa de unos amigos",
            "d) En un hostal",
          ],
          correctAnswer: 1,
        },
        {
          id: 8,
          question: "¿Qué actividades hicieron en la playa?",
          options: ["a) Jugar al fútbol", "b) Nadar y tomar el sol", "c) Visitar museos", "d) Ir de compras"],
          correctAnswer: 1,
        },
        {
          id: 9,
          question: "¿Qué comieron en Valencia?",
          options: ["a) Gazpacho", "b) Paella", "c) Tortilla", "d) Tapas"],
          correctAnswer: 1,
        },
        {
          id: 10,
          question: "¿A qué hora llegaron a Madrid el domingo?",
          options: ["a) A las 7:00", "b) A las 8:00", "c) A las 9:00", "d) A las 10:00"],
          correctAnswer: 2,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Cómo voy al trabajo o a la escuela",
        description: "Escribe 3-4 frases sobre cómo viajas. Di qué transportes usas y cuánto tiempo tardas.",
        structure: {
          intro: "Di dónde estudias o trabajas.",
          body: "Di qué transportes usas.",
          conclusion: "Di cuánto tiempo tardas.",
        },
        connectors: ["Voy a", "Primero", "Después", "El viaje dura"],
        wordCount: "20-40 palabras",
      },
      optionB: {
        title: "Mi medio de transporte favorito",
        description:
          "Escribe 3-4 frases sobre tu medio de transporte favorito. Di qué es, por qué te gusta y a dónde vas con él.",
        structure: {
          intro: "Di tu medio favorito.",
          body: "Di por qué te gusta.",
          conclusion: "Di a dónde vas.",
        },
        connectors: ["Mi medio favorito es", "Me gusta porque", "Voy a"],
        wordCount: "20-40 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Cómo viajas cada día",
        description:
          "Habla de cómo viajas cada día en 30-45 segundos. Di qué transportes usas, cuánto tiempo tardas y si te gusta.",
        connectors: ["Cada día voy a", "Primero", "Después", "El viaje dura", "Me gusta porque"],
        guideQuestions: [
          "¿Cómo vas al trabajo o a la escuela?",
          "¿Cuánto tiempo tardas?",
          "¿Qué transportes usas?",
          "¿Te gusta tu viaje?",
        ],
      },
      topic2: {
        title: "Un viaje que hiciste",
        description:
          "Habla de un viaje que hiciste en 30-45 segundos. Di cómo fuiste, a dónde y si te gustó.",
        connectors: ["Una vez viajé a", "Fui en", "El viaje duró", "Me gustó porque"],
        guideQuestions: [
          "¿A dónde viajaste?",
          "¿Cómo fuiste?",
          "¿Cuánto tiempo duró?",
          "¿Te gustó el viaje?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero queréis viajar juntos a otra ciudad. Tenéis que decidir cómo ir y cuándo salir.",
      questions: [
        {
          question: "Pregunta a tu compañero: ¿Cómo preferimos viajar? ¿En tren, autobús o avión?",
          help: "Usa: ¿Cómo prefieres viajar? / ¿En tren o en avión?",
          usefulPhrases: ["¿Cómo prefieres viajar?", "El tren es más barato.", "El avión es más rápido."],
        },
        {
          question: "Pregunta a tu compañero: ¿A qué hora queremos salir? ¿Por la mañana o por la tarde?",
          help: "Usa: ¿A qué hora salimos? / ¿Mañana o tarde?",
          usefulPhrases: [
            "¿Salimos por la mañana?",
            "Por la tarde hay menos gente.",
            "Yo prefiero por la mañana.",
          ],
        },
        {
          question: "Pregunta a tu compañero: ¿Compramos los billetes online o en la estación?",
          help: "Usa: ¿Compramos online? / ¿En la estación?",
          usefulPhrases: [
            "Online es más fácil.",
            "En la estación es más seguro.",
            "Podemos comparar precios.",
          ],
        },
      ],
    },
  },
  {
    id: 12,
    level: "A1",
    theme: "Las vacaciones",
    icon: "Sun",
    vocabulary: [
      {
        word: "vacaciones",
        definition: "Días sin trabajo o estudio",
        chinese: "假期",
        example: "Las vacaciones de verano son largas.",
      },
      {
        word: "playa",
        definition: "Lugar de arena cerca del mar",
        chinese: "海滩",
        example: "Voy a la playa en verano.",
      },
      {
        word: "montaña",
        definition: "Lugar alto con árboles",
        chinese: "山",
        example: "Me gusta la montaña.",
      },
      {
        word: "hotel",
        definition: "Lugar donde dormir de viaje",
        chinese: "酒店",
        example: "Reservo un hotel cerca de la playa.",
      },
      {
        word: "viajar",
        definition: "Ir a otro lugar",
        chinese: "旅行",
        example: "Me gusta viajar a países nuevos.",
      },
      {
        word: "maleta",
        definition: "Bolsa grande para la ropa de viaje",
        chinese: "行李箱",
        example: "Hago la maleta el día antes.",
      },
      {
        word: "sol",
        definition: "Luz y calor del día",
        chinese: "太阳",
        example: "En la playa hay mucho sol.",
      },
      {
        word: "piscina",
        definition: "Lugar de agua para nadar",
        chinese: "游泳池",
        example: "Nado en la piscina del hotel.",
      },
      {
        word: "familia",
        definition: "Padres, hermanos y otros",
        chinese: "家人",
        example: "Viajo con mi familia.",
      },
      {
        word: "descansar",
        definition: "No hacer nada, relajarse",
        chinese: "休息",
        example: "En vacaciones descanso mucho.",
      },
    ],
    reading: {
      textType: "narrativo",
      title: "Mis vacaciones en la playa",
      text: `Hola, soy Patricia y quiero contaros mis vacaciones del verano pasado. Fue un viaje que siempre recordaré porque lo pasamos genial en familia.

El verano pasado, mis padres decidieron que íbamos a pasar una semana en la playa. Elegimos la costa de Cádiz, en el sur de España. Allí hace muy buen tiempo en verano y las playas son preciosas. Reservamos un hotel que estaba justo al lado de la playa. Desde nuestra habitación, podíamos ver el mar.

Cada día, después de desayunar, bajábamos a la playa. Nos bañábamos en el mar, que estaba muy caliente. Me encantaba nadar entre las olas. También tomábamos el sol y leíamos libros. Mi hermano pequeño construía castillos de arena. A veces, jugábamos al voleibol en la playa con otros turistas.

Por la tarde, cuando el sol era muy fuerte, volvíamos al hotel y descansábamos un rato en la piscina. La piscina era muy grande y tenía toboganes. Por la noche, cenábamos pescado fresco en los restaurantes del paseo marítimo. El pescado era delicioso, sobre todo el atún y la lubina.

El último día de vacaciones, hicimos una excursión en barco. Vimos delfines y otros animales marinos. Fue una experiencia increíble. Cuando llegó el momento de volver a casa, estábamos todos tristes porque no queríamos irnos. Pero guardamos muchos recuerdos bonitos de esas vacaciones inolvidables.`,
      questions: [
        {
          id: 1,
          question: "¿Cómo se llama la protagonista?",
          options: ["a) Ana", "b) Patricia", "c) Laura", "d) Carmen"],
          correctAnswer: 1,
          explanation: 'El texto dice: "soy Patricia".',
        },
        {
          id: 2,
          question: "¿Dónde fueron de vacaciones?",
          options: ["a) A la montaña", "b) A la playa de Cádiz", "c) A la ciudad", "d) Al extranjero"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Elegimos la costa de Cádiz".',
        },
        {
          id: 3,
          question: "¿Cuánto tiempo estuvieron de vacaciones?",
          options: ["a) Tres días", "b) Una semana", "c) Quince días", "d) Un mes"],
          correctAnswer: 1,
          explanation: 'El texto dice: "pasar una semana en la playa".',
        },
        {
          id: 4,
          question: "¿Dónde estaba el hotel?",
          options: [
            "a) En la montaña",
            "b) Lejos de la playa",
            "c) Al lado de la playa",
            "d) En el centro de la ciudad",
          ],
          correctAnswer: 2,
          explanation: 'El texto dice: "un hotel que estaba justo al lado de la playa".',
        },
        {
          id: 5,
          question: "¿Qué veían desde la habitación del hotel?",
          options: ["a) La ciudad", "b) La montaña", "c) El mar", "d) El río"],
          correctAnswer: 2,
          explanation: 'El texto dice: "podíamos ver el mar".',
        },
        {
          id: 6,
          question: "¿Qué hacía el hermano pequeño de Patricia en la playa?",
          options: ["a) Nadaba", "b) Construía castillos de arena", "c) Leía libros", "d) Dormía"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Mi hermano pequeño construía castillos de arena".',
        },
        {
          id: 7,
          question: "¿Qué hacían por la tarde?",
          options: [
            "a) Iban al cine",
            "b) Descansaban en la piscina",
            "c) Hacían excursiones",
            "d) Iban de compras",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "volvíamos al hotel y descansábamos un rato en la piscina".',
        },
        {
          id: 8,
          question: "¿Qué cenaban por la noche?",
          options: ["a) Carne", "b) Pescado fresco", "c) Pasta", "d) Pizza"],
          correctAnswer: 1,
          explanation: 'El texto dice: "cenábamos pescado fresco".',
        },
        {
          id: 9,
          question: "¿Qué hicieron el último día?",
          options: [
            "a) Fueron al zoo",
            "b) Hicieron una excursión en barco",
            "c) Fueron al parque",
            "d) Visitaron museos",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "hicimos una excursión en barco".',
        },
        {
          id: 10,
          question: "¿Cómo se sintieron al volver a casa?",
          options: ["a) Muy contentos", "b) Tristes", "c) Enfadados", "d) Cansados"],
          correctAnswer: 1,
          explanation: 'El texto dice: "estábamos todos tristes porque no queríamos irnos".',
        },
      ],
    },
    listening: {
      title: "Preparando las vacaciones ideales",
      transcription: `Hola, soy Miguel y estoy muy emocionado porque el próximo mes me voy de vacaciones a la montaña con mis mejores amigos. Es la primera vez que hacemos un viaje todos juntos y estamos muy ilusionados.

Hemos elegido los Pirineos, una cadena montañosa entre España y Francia. Allí hay muchos pueblos con encanto y paisajes espectaculares. Vamos a estar diez días, desde el 15 al 25 de agosto.

Vamos a alojarnos en un albergue de montaña. Es más barato que un hotel y tiene un ambiente muy familiar. Además, está cerca de las rutas de senderismo.

Hemos planeado muchas actividades: senderismo por los bosques, visitar lagos de montaña y hacer fotografías de la naturaleza. También vamos a probar la comida típica de la zona, como el queso de montaña y los embutidos.

Ya he empezado a preparar la mochila. Necesito ropa cómoda y caliente, porque en la montaña puede hacer frío por la noche. También llevaré una chaqueta impermeable por si llueve. No puedo olvidar la cámara de fotos para capturar los mejores momentos.

Estoy seguro de que serán unas vacaciones inolvidables. La naturaleza siempre me hace sentir libre y feliz.`,
      questions: [
        {
          id: 1,
          question: "¿Quién se va de vacaciones?",
          options: ["a) Patricia", "b) Miguel", "c) Carlos", "d) Roberto"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Dónde va Miguel de vacaciones?",
          options: ["a) A la playa", "b) A la montaña", "c) A la ciudad", "d) Al extranjero"],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "¿Con quién va Miguel?",
          options: ["a) Con su familia", "b) Con sus amigos", "c) Solo", "d) Con su pareja"],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "¿Cuántos días van a estar?",
          options: ["a) 5 días", "b) 7 días", "c) 10 días", "d) 15 días"],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "¿Dónde van a alojarse?",
          options: ["a) En un hotel", "b) En un albergue", "c) En un camping", "d) En una casa rural"],
          correctAnswer: 1,
        },
        {
          id: 6,
          question: "¿Qué actividades van a hacer?",
          options: [
            "a) Nadar y tomar el sol",
            "b) Senderismo y visitar lagos",
            "c) Ir de compras",
            "d) Visitar museos",
          ],
          correctAnswer: 1,
        },
        {
          id: 7,
          question: "¿Qué comida típica van a probar?",
          options: ["a) Paella", "b) Queso y embutidos de montaña", "c) Gazpacho", "d) Tortilla"],
          correctAnswer: 1,
        },
        {
          id: 8,
          question: "¿Qué necesita Miguel para el viaje?",
          options: ["a) Ropa de verano", "b) Ropa cómoda y caliente", "c) Ropa elegante", "d) Traje de baño"],
          correctAnswer: 1,
        },
        {
          id: 9,
          question: "¿Qué no puede olvidar Miguel?",
          options: ["a) La comida", "b) La cámara de fotos", "c) Los libros", "d) La música"],
          correctAnswer: 1,
        },
        {
          id: 10,
          question: "¿Cómo se siente Miguel con las vacaciones?",
          options: ["a) Nervioso", "b) Muy ilusionado", "c) Preocupado", "d) Aburrido"],
          correctAnswer: 1,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mis últimas vacaciones",
        description:
          "Escribe 3-4 frases sobre tus últimas vacaciones. Di a dónde fuiste, con quién y qué hiciste.",
        structure: {
          intro: "Di a dónde fuiste.",
          body: "Di con quién fuiste.",
          conclusion: "Di qué hiciste.",
        },
        connectors: ["En mis últimas vacaciones fui a", "Viajé con", "Cada día", "Me gustó"],
        wordCount: "20-40 palabras",
      },
      optionB: {
        title: "Mis vacaciones ideales",
        description:
          "Escribe 3-4 frases sobre tus vacaciones ideales. Di a dónde quieres ir, con quién y qué quieres hacer.",
        structure: {
          intro: "Di a dónde quieres ir.",
          body: "Di con quién quieres ir.",
          conclusion: "Di qué quieres hacer.",
        },
        connectors: ["Mis vacaciones ideales son en", "Quiero ir con", "Me gustaría"],
        wordCount: "20-40 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Tus últimas vacaciones",
        description:
          "Habla de tus últimas vacaciones en 30-45 segundos. Di a dónde fuiste, qué hiciste y si te gustaron.",
        connectors: ["Mis últimas vacaciones fueron en", "Fui a", "Hice", "Me gustaron porque"],
        guideQuestions: [
          "¿A dónde fuiste?",
          "¿Con quién fuiste?",
          "¿Qué hiciste allí?",
          "¿Te gustaron las vacaciones?",
        ],
      },
      topic2: {
        title: "Tu destino ideal para vacaciones",
        description:
          "Habla de tu destino ideal para vacaciones en 30-45 segundos. Di a dónde quieres ir, por qué y qué quieres hacer.",
        connectors: ["Mi destino ideal es", "Me gustaría ir a", "Porque", "Allí quiero"],
        guideQuestions: [
          "¿A dónde quieres ir?",
          "¿Por qué te gusta ese lugar?",
          "¿Con quién quieres ir?",
          "¿Qué quieres hacer allí?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero queréis planificar unas vacaciones juntos. Tenéis que decidir el destino, las fechas y las actividades.",
      questions: [
        {
          question: "Pregunta a tu compañero: ¿Prefieres playa o montaña para las vacaciones?",
          help: "Usa: ¿Qué prefieres? / ¿Playa o montaña?",
          usefulPhrases: [
            "¿Prefieres playa o montaña?",
            "A mí me gusta más la playa.",
            "La montaña también es bonita.",
          ],
        },
        {
          question: "Pregunta a tu compañero: ¿Cuántos días queremos ir? ¿Una semana o quince días?",
          help: "Usa: ¿Cuántos días? / ¿Una semana o dos?",
          usefulPhrases: ["¿Una semana está bien?", "Quince días es mejor.", "Yo solo puedo una semana."],
        },
        {
          question:
            "Pregunta a tu compañero: ¿Qué actividades quieres hacer? ¿Nadar, caminar o visitar ciudades?",
          help: "Usa: ¿Qué quieres hacer? / ¿Te gusta nadar?",
          usefulPhrases: [
            "Quiero nadar en la playa.",
            "Me gusta caminar por la montaña.",
            "Podemos visitar ciudades también.",
          ],
        },
      ],
    },
  },
  {
    id: 13,
    level: "A1",
    theme: "Las fiestas y tradiciones",
    icon: "Gift",
    vocabulary: [
      {
        word: "cumpleaños",
        definition: "Día en que naciste",
        chinese: "生日",
        example: "Mi cumpleaños es el 5 de mayo.",
      },
      {
        word: "fiesta",
        definition: "Celebración con gente",
        chinese: "派对",
        example: "Hay una fiesta en mi casa.",
      },
      {
        word: "regalo",
        definition: "Algo que das a alguien",
        chinese: "礼物",
        example: "Compro un regalo para mi madre.",
      },
      {
        word: "Navidad",
        definition: "Fiesta del 25 de diciembre",
        chinese: "圣诞节",
        example: "En Navidad ceno con mi familia.",
      },
      {
        word: "Año Nuevo",
        definition: "Fiesta del 1 de enero",
        chinese: "新年",
        example: "En Año Nuevo como 12 uvas.",
      },
      {
        word: "tarta",
        definition: "Postre grande con velas",
        chinese: "蛋糕",
        example: "Soplamos las velas de la tarta.",
      },
      {
        word: "invitado",
        definition: "Persona que va a una fiesta",
        chinese: "客人",
        example: "Hay muchos invitados en la fiesta.",
      },
      {
        word: "celebrar",
        definition: "Hacer una fiesta",
        chinese: "庆祝",
        example: "Celebramos mi cumpleaños en casa.",
      },
      {
        word: "felicitar",
        definition: "Decir algo bonito",
        chinese: "祝贺",
        example: "Te felicito por tu cumpleaños.",
      },
      {
        word: "tradición",
        definition: "Costumbre de una familia",
        chinese: "传统",
        example: "Comer uvas en Nochevieja es tradición.",
      },
    ],
    reading: {
      textType: "narrativo",
      title: "Mi fiesta de cumpleaños",
      text: `Hola, soy Sofía. Ayer celebré mi cumpleaños número 18. Mis padres me prepararon una fiesta sorpresa en nuestra casa. La casa estaba decorada con globos de colores y una pancarta de feliz cumpleaños. Mi abuela hizo una tarta de chocolate con tres pisos. ¡La tarta tenía dieciocho velas!

Vinieron todos mis amigos y mi familia. Fue un día muy especial para mí. Mis amigos me regalaron ropa, libros y joyas. Pero mi regalo favorito fue un viaje sorpresa a París que me regalaron mis padres. Estoy muy emocionada por viajar a Francia.

Me gustó mucho mi fiesta porque estuve rodeada de las personas que más quiero. Fue un cumpleaños inolvidable.`,
      questions: [
        {
          id: 1,
          question: "¿Cómo se llama la protagonista?",
          options: ["a) Ana", "b) Sofía", "c) Laura", "d) María"],
          correctAnswer: 1,
          explanation: 'El texto dice: "soy Sofía".',
        },
        {
          id: 2,
          question: "¿Qué cumpleaños celebró Sofía?",
          options: ["a) 16 años", "b) 17 años", "c) 18 años", "d) 19 años"],
          correctAnswer: 2,
          explanation: 'El texto dice: "mi cumpleaños número 18".',
        },
        {
          id: 3,
          question: "¿Quién preparó la fiesta?",
          options: ["a) Sus amigos", "b) Sus padres", "c) Su abuela", "d) Su hermana"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Mis padres me prepararon una fiesta sorpresa".',
        },
        {
          id: 4,
          question: "¿Qué había en la casa para decorar?",
          options: ["a) Flores", "b) Globos y una pancarta", "c) Luces", "d) Guirnaldas"],
          correctAnswer: 1,
          explanation: 'El texto dice: "La casa estaba decorada con globos de colores y una pancarta".',
        },
        {
          id: 5,
          question: "¿Qué tipo de tarta hizo la abuela?",
          options: [
            "a) Tarta de fresa",
            "b) Tarta de chocolate de tres pisos",
            "c) Tarta de vainilla",
            "d) Tarta de limón",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "una tarta de chocolate con tres pisos".',
        },
        {
          id: 6,
          question: "¿Cuántas velas tenía la tarta?",
          options: ["a) 16", "b) 17", "c) 18", "d) 19"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Tenía dieciocho velas".',
        },
        {
          id: 7,
          question: "¿Qué regalos recibió Sofía de sus amigos?",
          options: ["a) Ropa, libros y joyas", "b) Un teléfono", "c) Un ordenador", "d) Un coche"],
          correctAnswer: 0,
          explanation: 'El texto dice: "Mis amigos me regalaron ropa, libros y joyas".',
        },
        {
          id: 8,
          question: "¿Qué regalo de cumpleaños le gustó más a Sofía?",
          options: ["a) La ropa", "b) El dinero", "c) Un viaje a París", "d) Los libros"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Mi regalo favorito fue un viaje sorpresa a París".',
        },
        {
          id: 9,
          question: "¿Quién le regaló el viaje a París?",
          options: ["a) Sus amigos", "b) Su abuela", "c) Sus padres", "d) Su hermana"],
          correctAnswer: 2,
          explanation: 'El texto dice: "un viaje sorpresa a París que me regalaron mis padres".',
        },
        {
          id: 10,
          question: "¿Por qué fue especial este cumpleaños?",
          options: [
            "a) Por los regalos",
            "b) Por la tarta",
            "c) Porque estaba rodeada de las personas que más quiere",
            "d) Por el viaje",
          ],
          correctAnswer: 2,
          explanation: 'El texto dice: "porque estuve rodeada de las personas que más quiero".',
        },
      ],
    },
    listening: {
      title: "La Nochevieja en mi familia",
      transcription: `Hola, soy Javier y quiero contaros cómo celebramos la Nochevieja en mi familia. Es una de mis tradiciones favoritas del año.

La Nochevieja es el 31 de diciembre, el último día del año. Ese día, toda mi familia se reúne en casa de mis abuelos. Somos casi veinte personas, así que la casa se llena de vida, ruido y risas.

Mis abuelos preparan una cena especial con platos típicos de Navidad: cordero, marisco y turrón. La mesa está siempre llena de comida deliciosa. Mientras cenamos, hablamos de todo lo que ha pasado durante el año y hacemos planes para el año nuevo.

Lo más emocionante llega a las doce de la noche. Todos nos ponemos en la puerta de la casa con una uva en la mano. Cuando el reloj da las doce campanadas, comemos una uva por cada campanada. Es una tradición que trae buena suerte. ¡Hay que comerlas rápido!

Después de las uvas, nos abrazamos y felicitamos el año nuevo. Luego, bailamos, cantamos y reímos hasta muy tarde. A las dos de la madrugada, abrimos los regalos de Reyes. Los niños están muy impacientes.

Me encanta la Nochevieja porque es un momento para estar con la familia y celebrar la vida. Es una noche mágica que espero con muchas ganas cada año.`,
      questions: [
        {
          id: 1,
          question: "¿Qué día es la Nochevieja?",
          options: ["a) 24 de diciembre", "b) 25 de diciembre", "c) 31 de diciembre", "d) 1 de enero"],
          correctAnswer: 2,
        },
        {
          id: 2,
          question: "¿Dónde se reúne la familia de Javier?",
          options: [
            "a) En un restaurante",
            "b) En su casa",
            "c) En casa de sus abuelos",
            "d) En casa de sus tíos",
          ],
          correctAnswer: 2,
        },
        {
          id: 3,
          question: "¿Cuántas personas son en la cena de Nochevieja?",
          options: ["a) 10 personas", "b) 15 personas", "c) 20 personas", "d) 25 personas"],
          correctAnswer: 2,
        },
        {
          id: 4,
          question: "¿Qué platos preparan los abuelos?",
          options: [
            "a) Paella y tortilla",
            "b) Cordero, marisco y turrón",
            "c) Pasta y pizza",
            "d) Ensalada y sopa",
          ],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "¿Qué tradición hacen a las doce de la noche?",
          options: ["a) Cantar", "b) Comer 12 uvas", "c) Bailar", "d) Abrir regalos"],
          correctAnswer: 1,
        },
        {
          id: 6,
          question: "¿Cuántas uvas comen en Nochevieja?",
          options: ["a) 6", "b) 10", "c) 12", "d) 15"],
          correctAnswer: 2,
        },
        {
          id: 7,
          question: "¿Qué creen que trae comer las uvas?",
          options: ["a) Dinero", "b) Buena suerte", "c) Salud", "d) Felicidad"],
          correctAnswer: 1,
        },
        {
          id: 8,
          question: "¿Qué hacen después de las uvas?",
          options: ["a) Se van a dormir", "b) Bailan y cantan", "c) Ven la tele", "d) Comen más"],
          correctAnswer: 1,
        },
        {
          id: 9,
          question: "¿A qué hora abren los regalos?",
          options: ["a) A las 12", "b) A la 1", "c) A las 2", "d) A las 3"],
          correctAnswer: 2,
        },
        {
          id: 10,
          question: "¿Por qué le gusta la Nochevieja a Javier?",
          options: [
            "a) Por la comida",
            "b) Por los regalos",
            "c) Por estar con la familia",
            "d) Por el turrón",
          ],
          correctAnswer: 2,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi último cumpleaños",
        description:
          "Escribe 3-4 frases sobre tu último cumpleaños. Di qué hiciste, quién vino y qué regalos recibiste.",
        structure: {
          intro: "Di cuándo fue.",
          body: "Di qué hiciste.",
          conclusion: "Di qué regalos te gustaron.",
        },
        connectors: ["Mi último cumpleaños fue", "Vinieron", "Recibí", "Me gustó"],
        wordCount: "20-40 palabras",
      },
      optionB: {
        title: "Una fiesta importante en mi país",
        description:
          "Escribe 3-4 frases sobre una fiesta importante. Di cuándo es, qué se hace y por qué te gusta.",
        structure: {
          intro: "Di qué fiesta es.",
          body: "Di cuándo es.",
          conclusion: "Di por qué te gusta.",
        },
        connectors: ["Una fiesta importante es", "Se celebra", "La gente", "Me gusta porque"],
        wordCount: "20-40 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Tu último cumpleaños",
        description:
          "Habla de tu último cumpleaños en 30-45 segundos. Di cuándo fue, qué hiciste y qué te gustó más.",
        connectors: ["Mi último cumpleaños fue", "Celebramos", "Lo que más me gustó fue", "Fue un día"],
        guideQuestions: [
          "¿Cuándo fue tu cumpleaños?",
          "¿Qué hiciste?",
          "¿Quién vino?",
          "¿Qué regalo te gustó más?",
        ],
      },
      topic2: {
        title: "Una tradición familiar",
        description:
          "Habla de una tradición de tu familia en 30-45 segundos. Di qué hacen, cuándo y por qué es especial.",
        connectors: ["En mi familia tenemos una tradición", "Hacemos", "Es especial porque"],
        guideQuestions: [
          "¿Qué tradición tienes en tu familia?",
          "¿Cuándo la celebran?",
          "¿Qué hacen?",
          "¿Por qué es importante?",
        ],
      },
    },
    interaction: {
      situation: "Tú y tu compañero queréis organizar una fiesta de cumpleaños sorpresa para un amigo.",
      questions: [
        {
          question: "Pregunta a tu compañero: ¿Dónde hacemos la fiesta? ¿En tu casa o en la mía?",
          help: "Usa: ¿Dónde la hacemos? / ¿En tu casa o en la mía?",
          usefulPhrases: ["Mi casa es más grande.", "Tu casa está más cerca.", "Podemos alquilar un sitio."],
        },
        {
          question: "Pregunta a tu compañero: ¿Qué comida preparamos? ¿Tarta, bocadillos o pizza?",
          help: "Usa: ¿Qué comida? / ¿Tarta o pizza?",
          usefulPhrases: [
            "Podemos hacer una tarta.",
            "Los bocadillos son fáciles.",
            "La pizza a todos les gusta.",
          ],
        },
        {
          question: "Pregunta a tu compañero: ¿Qué regalo compramos entre los dos?",
          help: "Usa: ¿Qué le regalamos? / ¿Cuánto dinero ponemos?",
          usefulPhrases: [
            "Podemos comprar un libro.",
            "Una camiseta es buena idea.",
            "Yo puedo poner 10 euros.",
          ],
        },
      ],
    },
  },
  {
    id: 14,
    level: "A1",
    theme: "La tecnología básica",
    icon: "Smartphone",
    vocabulary: [
      {
        word: "teléfono",
        definition: "Aparato para llamar",
        chinese: "电话",
        example: "Mi teléfono es nuevo.",
      },
      {
        word: "ordenador",
        definition: "Máquina para trabajar",
        chinese: "电脑",
        example: "Uso el ordenador en casa.",
      },
      {
        word: "internet",
        definition: "Red para buscar cosas",
        chinese: "互联网",
        example: "Busco información en internet.",
      },
      {
        word: "móvil",
        definition: "Teléfono pequeño",
        chinese: "手机",
        example: "Llamo desde mi móvil.",
      },
      {
        word: "pantalla",
        definition: "Parte del móvil que ves",
        chinese: "屏幕",
        example: "La pantalla está rota.",
      },
      {
        word: "aplicación",
        definition: "Programa en el móvil",
        chinese: "应用",
        example: "Uso una aplicación para estudiar.",
      },
      {
        word: "mensaje",
        definition: "Texto corto por móvil",
        chinese: "消息",
        example: "Te envío un mensaje.",
      },
      {
        word: "llamar",
        definition: "Hablar por teléfono",
        chinese: "打电话",
        example: "Te llamo esta noche.",
      },
      {
        word: "cargador",
        definition: "Aparato para dar batería",
        chinese: "充电器",
        example: "Necesito el cargador.",
      },
      {
        word: "batería",
        definition: "Energía del móvil",
        chinese: "电池",
        example: "Mi batería está baja.",
      },
    ],
    reading: {
      textType: "descriptivo",
      title: "Mi móvil y yo",
      text: `Hola, soy Daniel y quiero hablaros de mi relación con la tecnología, especialmente con mi móvil. Es un dispositivo que uso a diario para muchas cosas.

Hace dos meses, mis padres me compraron un móvil nuevo para mi cumpleaños. Es un teléfono de última generación con una pantalla grande y muy clara. Me encanta porque puedo ver vídeos y fotos con muy buena calidad. La batería dura todo el día, así que no tengo que preocuparme por cargarlo constantemente.

Uso mi móvil para muchas cosas. Lo primero que hago por la mañana es mirar la hora y revisar los mensajes de mis amigos. También uso aplicaciones para estudiar, como Duolingo, donde practico inglés todos los días. Por la noche, veo alguna serie en Netflix o escucho música mientras hago los deberes.

WhatsApp es mi aplicación favorita. Hablo a diario con mis amigos y mi familia. A veces, hacemos videollamadas con mis abuelos que viven en otra ciudad. Es increíble poder verlos aunque estén lejos. La tecnología nos ayuda a mantenernos conectados.

También uso internet para buscar información para mis trabajos del instituto. Es muy útil porque encuentro respuestas rápidamente. Sin embargo, intento no pasar demasiado tiempo delante de la pantalla porque sé que no es bueno para la vista.

En mi opinión, la tecnología es una herramienta maravillosa si la usamos con responsabilidad. Nos facilita la vida y nos comunica con el mundo.`,
      questions: [
        {
          id: 1,
          question: "¿Cómo se llama el protagonista?",
          options: ["a) Carlos", "b) Daniel", "c) Pablo", "d) Miguel"],
          correctAnswer: 1,
          explanation: 'El texto dice: "soy Daniel".',
        },
        {
          id: 2,
          question: "¿Cuándo compró Daniel su móvil nuevo?",
          options: ["a) Hace una semana", "b) Hace un mes", "c) Hace dos meses", "d) Hace tres meses"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Hace dos meses, mis padres me compraron un móvil nuevo".',
        },
        {
          id: 3,
          question: "¿Quién le compró el móvil a Daniel?",
          options: ["a) Sus abuelos", "b) Sus amigos", "c) Sus padres", "d) Él mismo"],
          correctAnswer: 2,
          explanation: 'El texto dice: "mis padres me compraron un móvil nuevo".',
        },
        {
          id: 4,
          question: "¿Qué hace Daniel con el móvil por la mañana?",
          options: ["a) Ve vídeos", "b) Mira la hora y revisa mensajes", "c) Juega", "d) Hace fotos"],
          correctAnswer: 1,
          explanation: 'El texto dice: "mira la hora y revisa los mensajes".',
        },
        {
          id: 5,
          question: "¿Qué aplicación usa Daniel para estudiar?",
          options: ["a) WhatsApp", "b) Netflix", "c) Duolingo", "d) Instagram"],
          correctAnswer: 2,
          explanation: 'El texto dice: "uso aplicaciones para estudiar, como Duolingo".',
        },
        {
          id: 6,
          question: "¿Cuál es la aplicación favorita de Daniel?",
          options: ["a) Instagram", "b) WhatsApp", "c) Facebook", "d) TikTok"],
          correctAnswer: 1,
          explanation: 'El texto dice: "WhatsApp es mi aplicación favorita".',
        },
        {
          id: 7,
          question: "¿Con quién habla Daniel por WhatsApp?",
          options: [
            "a) Solo con sus amigos",
            "b) Con sus amigos y familia",
            "c) Solo con sus padres",
            "d) Con desconocidos",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Hablo a diario con mis amigos y mi familia".',
        },
        {
          id: 8,
          question: "¿Qué usan Daniel y sus abuelos para comunicarse?",
          options: ["a) Cartas", "b) Llamadas", "c) Videollamadas", "d) Mensajes de texto"],
          correctAnswer: 2,
          explanation: 'El texto dice: "hacemos videollamadas con mis abuelos".',
        },
        {
          id: 9,
          question: "¿Para qué usa Daniel internet?",
          options: [
            "a) Para jugar",
            "b) Para buscar información para el instituto",
            "c) Para comprar",
            "d) Para ver el tiempo",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "buscar información para mis trabajos del instituto".',
        },
        {
          id: 10,
          question: "¿Qué consejo da Daniel sobre el uso de la tecnología?",
          options: [
            "a) Hay que usarla todo el día",
            "b) Hay que usarla con responsabilidad",
            "c) Hay que evitarla",
            "d) Hay que comprar la más cara",
          ],
          correctAnswer: 1,
          explanation:
            'El texto dice: "la tecnología es una herramienta maravillosa si la usamos con responsabilidad".',
        },
      ],
    },
    listening: {
      title: "Una llamada familiar importante",
      transcription: `Hola, soy Ana y hoy quiero contaros una historia sobre cómo la tecnología me ayudó a conectar con mi familia.

Ayer recibí una llamada muy especial. Era mi hermano mayor, que vive en Estados Unidos desde hace tres años. No hablamos con mucha frecuencia porque la diferencia horaria es complicada. Pero ayer me llamó para darme una gran noticia: ¡va a venir a España el próximo mes!

Hablamos por teléfono durante casi una hora. Me contó cómo está su vida allí, su trabajo y sus amigos. Yo le conté lo que ha pasado en la familia, que nuestros padres ya están jubilados y que nuestra abuela ha cumplido 90 años.

También me envió unas fotos por WhatsApp. Le vi diferente, más mayor y con el pelo más largo. Pero su sonrisa era la misma de siempre. Me alegró mucho verle.

Aunque estamos lejos, la tecnología nos permite estar cerca. Podemos llamarnos, enviarnos mensajes y fotos en cualquier momento. Es como si viviéramos en la misma ciudad. Me siento muy agradecida por poder mantener esta conexión con mi hermano.

Ahora estoy muy emocionada porque por fin podré abrazarle después de tanto tiempo. La tecnología es increíble, pero nada supera un abrazo en persona.`,
      questions: [
        {
          id: 1,
          question: "¿Quién es la protagonista?",
          options: ["a) María", "b) Ana", "c) Laura", "d) Sofía"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Quién llamó a Ana?",
          options: ["a) Su madre", "b) Su hermano", "c) Su amigo", "d) Su tío"],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "¿Dónde vive el hermano de Ana?",
          options: ["a) En España", "b) En Estados Unidos", "c) En México", "d) En Argentina"],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "¿Cuánto tiempo hace que el hermano vive en Estados Unidos?",
          options: ["a) Un año", "b) Dos años", "c) Tres años", "d) Cinco años"],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "¿Cuánto tiempo hablaron por teléfono?",
          options: ["a) 15 minutos", "b) 30 minutos", "c) Casi una hora", "d) Dos horas"],
          correctAnswer: 2,
        },
        {
          id: 6,
          question: "¿Qué noticia le dio el hermano a Ana?",
          options: [
            "a) Que se casa",
            "b) Que viene a España",
            "c) Que tiene un nuevo trabajo",
            "d) Que tiene un hijo",
          ],
          correctAnswer: 1,
        },
        {
          id: 7,
          question: "¿Qué envió el hermano por WhatsApp?",
          options: ["a) Un vídeo", "b) Fotos", "c) Un mensaje de voz", "d) Un documento"],
          correctAnswer: 1,
        },
        {
          id: 8,
          question: "¿Qué edad tiene la abuela de Ana?",
          options: ["a) 85 años", "b) 87 años", "c) 90 años", "d) 92 años"],
          correctAnswer: 2,
        },
        {
          id: 9,
          question: "¿Qué permite la tecnología a Ana y su hermano?",
          options: [
            "a) Estar siempre juntos",
            "b) Estar cerca aunque lejos",
            "c) No extrañarse",
            "d) Viajar juntos",
          ],
          correctAnswer: 1,
        },
        {
          id: 10,
          question: "¿Cómo se siente Ana ahora?",
          options: ["a) Triste", "b) Emocionada", "c) Enfadada", "d) Preocupada"],
          correctAnswer: 1,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Para qué uso mi móvil",
        description: "Escribe 3-4 frases sobre cómo usas tu móvil. Di qué aplicaciones usas más y para qué.",
        structure: {
          intro: "Di qué móvil tienes.",
          body: "Di qué aplicaciones usas.",
          conclusion: "Di para qué las usas.",
        },
        connectors: ["Mi móvil es", "Uso aplicaciones como", "Me gusta", "También uso"],
        wordCount: "20-40 palabras",
      },
      optionB: {
        title: "La tecnología en mi vida",
        description:
          "Escribe 3-4 frases sobre cómo usas la tecnología. Di qué aparatos usas y para qué te ayudan.",
        structure: {
          intro: "Di qué aparatos tienes.",
          body: "Di para qué los usas.",
          conclusion: "Di si te ayudan.",
        },
        connectors: ["En casa tengo", "Uso", "Me ayuda a", "Es importante porque"],
        wordCount: "20-40 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Tu móvil y cómo lo usas",
        description:
          "Habla de tu móvil en 30-45 segundos. Di qué móvil tienes, qué aplicaciones usas y para qué.",
        connectors: ["Mi móvil es", "Tiene", "Las aplicaciones que más uso son", "Me gusta porque"],
        guideQuestions: [
          "¿Qué móvil tienes?",
          "¿Qué aplicaciones usas?",
          "¿Para qué usas el móvil?",
          "¿Cuánto tiempo lo usas al día?",
        ],
      },
      topic2: {
        title: "La tecnología en tu casa",
        description:
          "Habla de la tecnología en tu casa en 30-45 segundos. Di qué aparatos tienes y para qué los usas.",
        connectors: ["En mi casa hay", "Usamos", "Es útil porque"],
        guideQuestions: [
          "¿Qué aparatos tecnológicos tienes?",
          "¿Para qué usas el ordenador?",
          "¿Tienes wifi en casa?",
          "¿Qué harías sin tecnología?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero queréis comprar un regalo tecnológico para un amigo. Tenéis que decidir qué comprar.",
      questions: [
        {
          question:
            "Pregunta a tu compañero: ¿Qué le podemos regalar? ¿Un móvil, unos auriculares o una tablet?",
          help: "Usa: ¿Qué le regalamos? / ¿Un móvil o unos auriculares?",
          usefulPhrases: ["Los auriculares son más baratos.", "Una tablet es cara.", "Un móvil es muy útil."],
        },
        {
          question: "Pregunta a tu compañero: ¿Cuánto dinero queremos gastar?",
          help: "Usa: ¿Cuánto dinero ponemos? / ¿Cuál es nuestro presupuesto?",
          usefulPhrases: [
            "Yo puedo poner 20 euros.",
            "Con 50 euros compramos algo bueno.",
            "Podemos gastar 30 entre los dos.",
          ],
        },
        {
          question: "Pregunta a tu compañero: ¿Lo compramos online o en una tienda?",
          help: "Usa: ¿Online o en tienda? / ¿Dónde es mejor?",
          usefulPhrases: [
            "Online es más barato.",
            "En la tienda lo vemos antes.",
            "Hay que pagar envío online.",
          ],
        },
      ],
    },
  },
  {
    id: 15,
    level: "A1",
    theme: "Las emociones básicas (Detallado)",
    icon: "Heart",
    vocabulary: [
      {
        word: "feliz",
        definition: "Que siente alegría",
        chinese: "快乐的",
        example: "Estoy feliz hoy.",
      },
      {
        word: "triste",
        definition: "Que siente pena",
        chinese: "悲伤的",
        example: "Estoy triste por la noticia.",
      },
      {
        word: "enfadado",
        definition: "Que siente enfado",
        chinese: "生气的",
        example: "Estoy enfadado con él.",
      },
      {
        word: "cansado",
        definition: "Que necesita descansar",
        chinese: "累的",
        example: "Estoy cansado del trabajo.",
      },
      {
        word: "nervioso",
        definition: "Que está inquieto",
        chinese: "紧张 de ",
        example: "Estoy nervioso por el examen.",
      },
      {
        word: "contento",
        definition: "Que está satisfecho",
        chinese: "满意的",
        example: "Estoy contento con mi nota.",
      },
      {
        word: "preocupado",
        definition: "Que tiene miedo por algo",
        chinese: "担心的",
        example: "Estoy preocupado por mi madre.",
      },
      {
        word: "sorprendido",
        definition: "Que se asombra",
        chinese: "惊讶的",
        example: "Estoy sorprendido por la noticia.",
      },
      {
        word: "aburrido",
        definition: "Que siente aburrimiento",
        chinese: "无聊的",
        example: "Estoy aburrido en casa.",
      },
      {
        word: "ilusionado",
        definition: "Que tiene esperanza",
        chinese: "期待的",
        example: "Estoy ilusionado con el viaje.",
      },
    ],
    reading: {
      textType: "descriptivo",
      title: "Mis emociones en un día",
      text: `Hola, soy Andrea y quiero contaros cómo cambian mis emociones a lo largo de un día normal. Mis sentimientos varían según lo que me pasa y las personas con las que estoy.

Esta mañana, me desperté muy contenta porque era viernes. Durante la semana estoy muy cansada y nerviosa con los estudios, pero el viernes es diferente. Me siento feliz porque sé que llega el fin de semana. Desayuné con mi madre y me dio una buena noticia: íbamos a cenar fuera por la noche. ¡Me puse muy ilusionada!

En el instituto, las cosas cambiaron un poco. Hicimos un examen de matemáticas. Me puse muy nerviosa porque no había estudiado mucho. El examen fue difícil y no estaba segura de mis respuestas. Cuando salí de clase, estaba preocupada y triste porque pensaba que me había salido mal.

Por suerte, por la tarde llegó un mensaje de mis amigos. Quedamos para ir al cine. Me olvidé de la preocupación y me puse contenta. Estuvimos juntos, reímos y pasamos un buen rato. La película nos gustó mucho. Me sentía feliz y relajada.

Por la noche, fui a cenar con mi madre como habíamos planeado. La cena fue deliciosa. Cuando llegué a casa, estaba cansada pero muy feliz. Recordé todo lo que había pasado durante el día y me di cuenta de que las emociones son normales. Todos los días tenemos momentos buenos y malos. Lo importante es aprender a manejar nuestros sentimientos y disfrutar de los buenos momentos.`,
      questions: [
        {
          id: 1,
          question: "¿Cómo se llama la protagonista?",
          options: ["a) Ana", "b) Andrea", "c) Marta", "d) Laura"],
          correctAnswer: 1,
          explanation: 'El texto dice: "soy Andrea".',
        },
        {
          id: 2,
          question: "¿Por qué estaba contenta Andrea por la mañana?",
          options: [
            "a) Porque tenía un examen",
            "b) Porque era viernes",
            "c) Porque iba de viaje",
            "d) Porque tenía un regalo",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "me desperté muy contenta porque era viernes".',
        },
        {
          id: 3,
          question: "¿Qué noticia le dio su madre?",
          options: [
            "a) Que iban a cenar fuera",
            "b) Que iban de vacaciones",
            "c) Que tenía un regalo",
            "d) Que venían los abuelos",
          ],
          correctAnswer: 0,
          explanation: 'El texto dice: "íbamos a cenar fuera por la noche".',
        },
        {
          id: 4,
          question: "¿Qué examen hicieron en el instituto?",
          options: ["a) Lengua", "b) Matemáticas", "c) Historia", "d) Inglés"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Hicimos un examen de matemáticas".',
        },
        {
          id: 5,
          question: "¿Cómo se sintió Andrea después del examen?",
          options: ["a) Feliz", "b) Nerviosa y preocupada", "c) Enfadada", "d) Aburrida"],
          correctAnswer: 1,
          explanation: 'El texto dice: "estaba preocupada y triste porque pensaba que me había salido mal".',
        },
        {
          id: 6,
          question: "¿Quién le envió un mensaje a Andrea por la tarde?",
          options: ["a) Su madre", "b) Su profesor", "c) Sus amigos", "d) Su hermana"],
          correctAnswer: 2,
          explanation: 'El texto dice: "llegó un mensaje de mis amigos".',
        },
        {
          id: 7,
          question: "¿Qué hicieron Andrea y sus amigos?",
          options: [
            "a) Fueron al cine",
            "b) Fueron al parque",
            "c) Fueron de compras",
            "d) Fueron a la playa",
          ],
          correctAnswer: 0,
          explanation: 'El texto dice: "Quedamos para ir al cine".',
        },
        {
          id: 8,
          question: "¿Cómo se sintió Andrea con sus amigos?",
          options: ["a) Nerviosa", "b) Contentay feliz", "c) Triste", "d) Enfadada"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Me sentía feliz y relajada".',
        },
        {
          id: 9,
          question: "¿Qué hizo Andrea por la noche?",
          options: ["a) Fue al cine", "b) Cenó con su madre", "c) Estuvo con amigos", "d) Hizo un examen"],
          correctAnswer: 1,
          explanation: 'El texto dice: "fui a cenar con mi madre".',
        },
        {
          id: 10,
          question: "¿Qué conclusión saca Andrea al final del día?",
          options: [
            "a) Las emociones son malas",
            "b) Hay que aprender a manejar los sentimientos",
            "c) Siempre hay que estar feliz",
            "d) Los exámenes son lo más importante",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "lo importante es aprender a manejar nuestros sentimientos".',
        },
      ],
    },
    listening: {
      title: "Un día con muchas emociones",
      transcription: `Hola, soy Pablo y hoy ha sido un día muy intenso lleno de emociones. Quiero compartirlo con vosotros.

Esta mañana me levanté muy nervioso porque tenía una entrevista de trabajo importante. Llevaba semanas preparándome para este momento. El nerviosismo me hizo desayunar muy rápido y casi olvido la cartera en casa.

Llegué a la entrevista a las diez en punto. La entrevista duró una hora. Al principio, estaba muy nervioso, pero poco a poco me fui relajando. El entrevistador era muy simpático y me hizo preguntas interesantes sobre mi experiencia.

Cuando salí de la entrevista, me sentía aliviado. Ya había pasado lo más difícil. Llamé a mi novia y le conté cómo había ido. Ella me dijo que estaba segura de que lo había hecho bien. Me puse contento y optimista.

Por la tarde, recibí una llamada del entrevistador. ¡Me dieron el trabajo! No podía creerlo. Me sentí muy feliz, sorprendido y emocionado. Llamé a mi novia y gritamos de alegría por teléfono.

Para celebrarlo, fui a casa de mis padres y les conté la noticia. Mi madre se puso muy contenta y mi padre me dio un abrazo. Cenamos juntos y brindamos con champán. Estaba tan feliz que no podía dejar de sonreír.

Esta noche, antes de dormir, reflexioné sobre todo lo que había pasado. Pasé del nerviosismo a la alegría en solo unas horas. Me di cuenta de que la vida está llena de emociones y que hay que disfrutar cada momento.`,
      questions: [
        {
          id: 1,
          question: "¿Quién es el protagonista?",
          options: ["a) Carlos", "b) Pablo", "c) Daniel", "d) Miguel"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Por qué estaba nervioso por la mañana?",
          options: [
            "a) Por un examen",
            "b) Por una entrevista de trabajo",
            "c) Por una cita médica",
            "d) Por un viaje",
          ],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "¿A qué hora fue la entrevista?",
          options: ["a) A las 9:00", "b) A las 10:00", "c) A las 11:00", "d) A las 12:00"],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "¿Cuánto duró la entrevista?",
          options: ["a) 30 minutos", "b) 45 minutos", "c) Una hora", "d) Dos horas"],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "¿Cómo era el entrevistador?",
          options: ["a) Serio", "b) Simpático", "c) Antipático", "d) Callado"],
          correctAnswer: 1,
        },
        {
          id: 6,
          question: "¿Qué hizo Pablo después de la entrevista?",
          options: ["a) Fue a casa", "b) Llamó a su novia", "c) Fue al cine", "d) Durmió"],
          correctAnswer: 1,
        },
        {
          id: 7,
          question: "¿Qué noticia recibió Pablo por la tarde?",
          options: [
            "a) Que no había conseguido el trabajo",
            "b) Que había conseguido el trabajo",
            "c) Que tenía que hacer otra entrevista",
            "d) Que el trabajo ya no existía",
          ],
          correctAnswer: 1,
        },
        {
          id: 8,
          question: "¿Cómo se sintió Pablo al recibir la noticia?",
          options: ["a) Triste", "b) Enfadado", "c) Feliz y sorprendido", "d) Preocupado"],
          correctAnswer: 2,
        },
        {
          id: 9,
          question: "¿Dónde fue Pablo a celebrar?",
          options: ["a) A un restaurante", "b) A casa de sus padres", "c) Al cine", "d) A casa de su novia"],
          correctAnswer: 1,
        },
        {
          id: 10,
          question: "¿Qué aprendió Pablo después de este día?",
          options: [
            "a) Que hay que tener miedo a los cambios",
            "b) Que la vida está llena de emociones y hay que disfrutarla",
            "c) Que el trabajo es lo más importante",
            "d) Que hay que estar siempre nervioso",
          ],
          correctAnswer: 1,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Cómo me siento hoy",
        description: "Escribe 3-4 frases sobre cómo te sientes hoy y por qué.",
        structure: {
          intro: "Di cómo te sientes.",
          body: "Di por qué.",
          conclusion: "Di qué vas a hacer.",
        },
        connectors: ["Hoy estoy", "Porque", "Me siento", "Voy a"],
        wordCount: "20-40 palabras",
      },
      optionB: {
        title: "Un día feliz",
        description: "Escribe 3-4 frases sobre un día feliz que recuerdes.",
        structure: {
          intro: "Di qué día fue.",
          body: "Di qué pasó.",
          conclusion: "Di cómo te sentiste.",
        },
        connectors: ["Recuerdo un día", "Ese día", "Me sentí"],
        wordCount: "20-40 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Cómo te sientes hoy",
        description: "Habla de cómo te sientes hoy en 30-45 segundos. Di por qué y qué vas a hacer.",
        connectors: ["Hoy me siento", "Porque", "Voy a"],
        guideQuestions: ["¿Cómo te sientes hoy?", "¿Por qué?", "¿Qué vas a hacer?"],
      },
      topic2: {
        title: "Un día de mucho estrés",
        description: "Habla de un día de mucho estrés en 30-45 segundos. Di qué pasó y cómo te sentiste.",
        connectors: ["Un día tuve estrés", "Pasó que", "Me sentí", "Después"],
        guideQuestions: ["¿Qué pasó?", "¿Cómo te sentiste?", "¿Qué hiciste para calmarte?"],
      },
    },
    interaction: {
      situation: "Tú y tu compañero habláis de cómo os sentís hoy.",
      questions: [
        {
          question: "¿Cómo te sientes hoy? ¿Feliz o cansado?",
          help: "Usa: Me siento...",
          usefulPhrases: ["¿Cómo te sientes?", "Yo estoy feliz.", "¿Y tú?"],
        },
        {
          question: "¿Por qué estás cansado? ¿Dormiste mal?",
          help: "Usa: Estoy cansado porque...",
          usefulPhrases: ["¿Dormiste bien?", "Trabajé mucho.", "Me acosté tarde."],
        },
        {
          question: "¿Qué haces cuando estás triste?",
          help: "Usa: Cuando estoy triste...",
          usefulPhrases: ["Llamo a un amigo.", "Escucho música.", "Veo una película."],
        },
      ],
    },
  },
  {
    id: 16,
    level: "A1",
    theme: "Las profesiones",
    icon: "Briefcase",
    vocabulary: [
      {
        word: "profesor",
        definition: "Persona que enseña",
        chinese: "老师",
        example: "Mi profesor de español es bueno.",
      },
      {
        word: "médico",
        definition: "Persona que cura enfermos",
        chinese: "医生",
        example: "El médico me da medicina.",
      },
      {
        word: "enfermera",
        definition: "Mujer que cuida enfermos",
        chinese: "护士",
        example: "La enfermera es muy amable.",
      },
      {
        word: "cocinero",
        definition: "Persona que prepara comida",
        chinese: "厨师",
        example: "El cocinero hace paella.",
      },
      {
        word: "camarero",
        definition: "Persona que sirve en restaurantes",
        chinese: "服务员",
        example: "El camarero toma nota.",
      },
      {
        word: "policía",
        definition: "Persona que cuida la seguridad",
        chinese: "警察",
        example: "La policía ayuda a la gente.",
      },
      {
        word: "bombero",
        definition: "Persona que apaga fuegos",
        chinese: "消防员",
        example: "El bombero apaga el fuego.",
      },
      {
        word: "conductor",
        definition: "Persona que maneja un vehículo",
        chinese: "司机",
        example: "El conductor es simpático.",
      },
      {
        word: "cartero",
        definition: "Persona que reparte cartas",
        chinese: "邮递员",
        example: "El cartero llega a las 10.",
      },
      {
        word: "dentista",
        definition: "Persona que cuida los dientes",
        chinese: "牙医",
        example: "Voy al dentista cada año.",
      },
    ],
    reading: {
      textType: "descriptivo",
      title: "Las profesiones de mi familia",
      text: "Mi padre es médico. Trabaja en un hospital. Mi madre es profesora. Enseña en una escuela. Mi hermana quiere ser enfermera. Yo quiero ser bombero. Me gusta ayudar a la gente.",
      questions: [
        {
          id: 1,
          question: "¿Qué es el padre?",
          options: ["a) Profesor", "b) Médico", "c) Bombero", "d) Camarero"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Mi padre es médico".',
        },
        {
          id: 2,
          question: "¿Qué es la madre?",
          options: ["a) Médico", "b) Enfermera", "c) Profesora", "d) Cocinera"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Mi madre es profesora".',
        },
        {
          id: 3,
          question: "¿Qué quiere ser la hermana?",
          options: ["a) Médico", "b) Bombero", "c) Enfermera", "d) Profesora"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Mi hermana quiere ser enfermera".',
        },
        {
          id: 4,
          question: "¿Qué quiere ser el narrador?",
          options: ["a) Médico", "b) Bombero", "c) Profesor", "d) Policía"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Yo quiero ser bombero".',
        },
        {
          id: 5,
          question: "¿Por qué quiere ser bombero?",
          options: ["a) Por dinero", "b) Por ayudar a la gente", "c) Por fama", "d) Por viajar"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Me gusta ayudar a la gente".',
        },
      ],
    },
    listening: {
      title: "Un día de trabajo",
      transcription:
        "Soy cocinero. Trabajo en un restaurante. Me levanto a las 8. Voy al trabajo a las 10. Preparo paella y tortilla. Salgo a las 6. Me gusta mi trabajo.",
      questions: [
        {
          id: 1,
          question: "¿Qué es él?",
          options: ["a) Camarero", "b) Cocinero", "c) Médico", "d) Profesor"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Dónde trabaja?",
          options: ["a) En un hospital", "b) En una escuela", "c) En un restaurante", "d) En una oficina"],
          correctAnswer: 2,
        },
        {
          id: 3,
          question: "¿A qué hora va al trabajo?",
          options: ["a) A las 8", "b) A las 9", "c) A las 10", "d) A las 11"],
          correctAnswer: 2,
        },
        {
          id: 4,
          question: "¿Qué prepara?",
          options: ["a) Pizza", "b) Paella y tortilla", "c) Sopa", "d) Ensalada"],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "¿Le gusta su trabajo?",
          options: ["a) Sí", "b) No", "c) A veces", "d) No sabe"],
          correctAnswer: 0,
        },
      ],
    },
    writing: {
      optionA: {
        title: "La profesión de mis padres",
        description: "Escribe 3-4 frases sobre el trabajo de tus padres. Di qué son y dónde trabajan.",
        structure: {
          intro: "Di qué es tu padre.",
          body: "Di qué es tu madre.",
          conclusion: "Di qué quieres ser tú.",
        },
        connectors: ["Mi padre es", "Mi madre es", "Trabaja en", "Yo quiero ser"],
        wordCount: "20-40 palabras",
      },
      optionB: {
        title: "Mi profesión ideal",
        description: "Escribe 3-4 frases sobre tu profesión ideal. Di qué quieres ser y por qué.",
        structure: {
          intro: "Di qué quieres ser.",
          body: "Di por qué te gusta.",
          conclusion: "Di dónde quieres trabajar.",
        },
        connectors: ["Quiero ser", "Me gusta porque", "Quiero trabajar en"],
        wordCount: "20-40 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Las profesiones de tu familia",
        description: "Habla de las profesiones de tu familia en 30-45 segundos. Di qué hace cada uno.",
        connectors: ["Mi padre es", "Mi madre es", "Mi hermano es", "Yo quiero ser"],
        guideQuestions: ["¿Qué hace tu padre?", "¿Qué hace tu madre?", "¿Qué quieres ser tú?", "¿Por qué?"],
      },
      topic2: {
        title: "Tu trabajo ideal",
        description: "Habla de tu trabajo ideal en 30-45 segundos. Di qué quieres ser y por qué.",
        connectors: ["Quiero ser", "Me gusta porque", "Es importante"],
        guideQuestions: ["¿Qué quieres ser?", "¿Por qué te gusta?", "¿Dónde quieres trabajar?"],
      },
    },
    interaction: {
      situation: "Tú y tu compañero habláis sobre vuestros trabajos ideales.",
      questions: [
        {
          question: "¿Qué quieres ser? ¿Por qué?",
          help: "Usa: Quiero ser... porque...",
          usefulPhrases: ["¿Qué quieres ser?", "¿Por qué te gusta?", "Yo quiero ser..."],
        },
        {
          question: "¿Dónde quieres trabajar? ¿En una ciudad grande o pequeña?",
          help: "Usa: Quiero trabajar en...",
          usefulPhrases: ["¿En una ciudad grande?", "¿O prefieres un pueblo?", "Yo prefiero..."],
        },
        {
          question: "¿Te gusta trabajar solo o con gente?",
          help: "Usa: Me gusta trabajar...",
          usefulPhrases: ["¿Solo o con compañeros?", "Yo prefiero...", "Trabajar en equipo es divertido."],
        },
      ],
    },
  },
  {
    id: 17,
    level: "A1",
    theme: "Los medios de transporte",
    icon: "Car",
    vocabulary: [
      {
        word: "coche",
        definition: "Vehículo con cuatro ruedas",
        chinese: "汽车",
        example: "Mi padre tiene un coche.",
      },
      {
        word: "autobús",
        definition: "Vehículo grande para muchas personas",
        chinese: "公共汽车",
        example: "Voy al trabajo en autobús.",
      },
      {
        word: "metro",
        definition: "Tren que va por debajo de la ciudad",
        chinese: "地铁",
        example: "El metro es rápido.",
      },
      {
        word: "tren",
        definition: "Vehículo largo sobre raíles",
        chinese: "火车",
        example: "Viajo en tren a Madrid.",
      },
      {
        word: "avión",
        definition: "Vehículo que vuela",
        chinese: "飞机",
        example: "El avión es rápido.",
      },
      {
        word: "barco",
        definition: "Vehículo que navega en el agua",
        chinese: "船",
        example: "El barco es grande.",
      },
      {
        word: "bicicleta",
        definition: "Vehículo de dos ruedas",
        chinese: "自行车",
        example: "Voy en bicicleta al parque.",
      },
      {
        word: "moto",
        definition: "Vehículo de dos ruedas con motor",
        chinese: "摩托车",
        example: "La moto es roja.",
      },
      {
        word: "taxi",
        definition: "Coche que se paga por viaje",
        chinese: "出租车",
        example: "Llamo un taxi.",
      },
      {
        word: "billete",
        definition: "Papel para viajar",
        chinese: "票",
        example: "Compro un billete de tren.",
      },
    ],
    reading: {
      textType: "descriptivo",
      title: "Cómo voy a la escuela",
      text: "Vivo lejos de la escuela. Cojo el autobús. El autobús es grande. Después cojo el metro. El metro es rápido. Llego en 30 minutos. Me gusta viajar en metro.",
      questions: [
        {
          id: 1,
          question: "¿Dónde vive?",
          options: ["a) Cerca", "b) Lejos", "c) En la escuela", "d) En el centro"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Vivo lejos de la escuela".',
        },
        {
          id: 2,
          question: "¿Qué coge primero?",
          options: ["a) Metro", "b) Tren", "c) Autobús", "d) Taxi"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Cojo el autobús".',
        },
        {
          id: 3,
          question: "¿Qué coge después?",
          options: ["a) Autobús", "b) Metro", "c) Tren", "d) Bicicleta"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Después cojo el metro".',
        },
        {
          id: 4,
          question: "¿Cuánto tiempo tarda?",
          options: ["a) 15 minutos", "b) 20 minutos", "c) 30 minutos", "d) 45 minutos"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Llego en 30 minutos".',
        },
        {
          id: 5,
          question: "¿Qué le gusta?",
          options: ["a) Autobús", "b) Metro", "c) Tren", "d) Coche"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Me gusta viajar en metro".',
        },
      ],
    },
    listening: {
      title: "Un viaje a Madrid",
      transcription:
        "Voy a Madrid en tren. El billete cuesta 25 euros. Salgo a las 9. Llego a las 11. El tren es cómodo. Me gusta viajar en tren.",
      questions: [
        {
          id: 1,
          question: "¿Cómo va a Madrid?",
          options: ["a) Coche", "b) Tren", "c) Avión", "d) Autobús"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Cuánto cuesta el billete?",
          options: ["a) 15€", "b) 20€", "c) 25€", "d) 30€"],
          correctAnswer: 2,
        },
        {
          id: 3,
          question: "¿A qué hora sale?",
          options: ["a) 8:00", "b) 9:00", "c) 10:00", "d) 11:00"],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "¿A qué hora llega?",
          options: ["a) 9:00", "b) 10:00", "c) 11:00", "d) 12:00"],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "¿Le gusta viajar en tren?",
          options: ["a) Sí", "b) No", "c) A veces", "d) No sabe"],
          correctAnswer: 0,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Cómo voy a la escuela",
        description: "Escribe 3-4 frases sobre cómo vas a la escuela. Di qué transportes usas.",
        structure: {
          intro: "Di dónde vives.",
          body: "Di qué transportes usas.",
          conclusion: "Di cuánto tiempo tardas.",
        },
        connectors: ["Vivo", "Cojo", "Después", "Tardo"],
        wordCount: "20-40 palabras",
      },
      optionB: {
        title: "Mi medio de transporte favorito",
        description:
          "Escribe 3-4 frases sobre tu medio de transporte favorito. Di qué es y por qué te gusta.",
        structure: {
          intro: "Di tu medio favorito.",
          body: "Di por qué te gusta.",
          conclusion: "Di a dónde vas.",
        },
        connectors: ["Mi medio favorito es", "Me gusta porque", "Voy a"],
        wordCount: "20-40 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Cómo viajas cada día",
        description: "Habla de cómo viajas cada día en 30-45 segundos. Di qué transportes usas.",
        connectors: ["Cada día voy a", "Cojo", "El viaje dura"],
        guideQuestions: [
          "¿Cómo vas al trabajo o a la escuela?",
          "¿Qué transportes usas?",
          "¿Cuánto tiempo tardas?",
        ],
      },
      topic2: {
        title: "Tu medio de transporte favorito",
        description: "Habla de tu medio de transporte favorito en 30-45 segundos. Di qué es y por qué.",
        connectors: ["Mi medio favorito es", "Es", "Me gusta porque"],
        guideQuestions: ["¿Cuál es tu medio favorito?", "¿Por qué te gusta?", "¿A dónde vas con él?"],
      },
    },
    interaction: {
      situation: "Tú y tu compañero queréis viajar juntos. Tenéis que decidir cómo ir.",
      questions: [
        {
          question: "¿Cómo prefieres viajar? ¿En tren o en autobús?",
          help: "Usa: Prefiero... porque...",
          usefulPhrases: [
            "¿Prefieres tren o autobús?",
            "El tren es más rápido.",
            "El autobús es más barato.",
          ],
        },
        {
          question: "¿A qué hora quieres salir? ¿Por la mañana o por la tarde?",
          help: "Usa: Prefiero salir...",
          usefulPhrases: ["Por la mañana?", "Por la tarde?", "Yo prefiero por la mañana."],
        },
        {
          question: "¿Compramos los billetes online o en la estación?",
          help: "Usa: Podemos comprar...",
          usefulPhrases: ["¿Online o en la estación?", "Online es más fácil.", "En la estación es seguro."],
        },
      ],
    },
  },
  {
    id: 18,
    level: "A1",
    theme: "Las vacaciones",
    icon: "Sun",
    vocabulary: [
      {
        word: "vacaciones",
        definition: "Días sin trabajo",
        chinese: "假期",
        example: "Las vacaciones de verano son largas.",
      },
      {
        word: "playa",
        definition: "Lugar de arena cerca del mar",
        chinese: "海滩",
        example: "Voy a la playa en verano.",
      },
      {
        word: "montaña",
        definition: "Lugar alto con árboles",
        chinese: "山",
        example: "Me gusta la montaña.",
      },
      {
        word: "hotel",
        definition: "Lugar para dormir",
        chinese: "酒店",
        example: "Reservo un hotel.",
      },
      {
        word: "viajar",
        definition: "Ir a otro lugar",
        chinese: "旅行",
        example: "Me gusta viajar.",
      },
      {
        word: "maleta",
        definition: "Bolsa para la ropa",
        chinese: "行李箱",
        example: "Hago la maleta.",
      },
      {
        word: "sol",
        definition: "Luz del día",
        chinese: "太阳",
        example: "Hay mucho sol.",
      },
      {
        word: "piscina",
        definition: "Lugar de agua para nadar",
        chinese: "游泳池",
        example: "Nado en la piscina.",
      },
      {
        word: "familia",
        definition: "Padres y hermanos",
        chinese: "家人",
        example: "Viajo con mi familia.",
      },
      {
        word: "descansar",
        definition: "No hacer nada",
        chinese: "休息",
        example: "En vacaciones descanso.",
      },
    ],
    reading: {
      textType: "narrativo",
      title: "Mis vacaciones en la playa",
      text: "El verano fui a la playa con mi familia. El hotel estaba cerca del mar. Nadaba en el mar y tomaba el sol. Comía pescado. Fue muy bonito.",
      questions: [
        {
          id: 1,
          question: "¿A dónde fue?",
          options: ["a) Montaña", "b) Playa", "c) Ciudad", "d) Campo"],
          correctAnswer: 1,
          explanation: 'El texto dice: "fui a la playa".',
        },
        {
          id: 2,
          question: "¿Con quién fue?",
          options: ["a) Amigos", "b) Familia", "c) Solo", "d) Compañeros"],
          correctAnswer: 1,
          explanation: 'El texto dice: "con mi familia".',
        },
        {
          id: 3,
          question: "¿Dónde estaba el hotel?",
          options: ["a) Lejos", "b) Cerca del mar", "c) En la montaña", "d) En la ciudad"],
          correctAnswer: 1,
          explanation: 'El texto dice: "El hotel estaba cerca del mar".',
        },
        {
          id: 4,
          question: "¿Qué comía?",
          options: ["a) Carne", "b) Pescado", "c) Verdura", "d) Fruta"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Comía pescado".',
        },
        {
          id: 5,
          question: "¿Cómo fueron las vacaciones?",
          options: ["a) Aburridas", "b) Bonitas", "c) Cortas", "d) Feas"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Fue muy bonito".',
        },
      ],
    },
    listening: {
      title: "Preparando las vacaciones",
      transcription:
        "Este verano voy a la montaña. Voy con amigos. Vamos a hacer senderismo. Dormimos en un albergue. Necesito una mochila.",
      questions: [
        {
          id: 1,
          question: "¿Dónde va?",
          options: ["a) Playa", "b) Montaña", "c) Ciudad", "d) Extranjero"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Con quién va?",
          options: ["a) Familia", "b) Amigos", "c) Solo", "d) Pareja"],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "¿Qué van a hacer?",
          options: ["a) Nadar", "b) Senderismo", "c) Comprar", "d) Trabajar"],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "¿Dónde duermen?",
          options: ["a) Hotel", "b) Albergue", "c) Camping", "d) Casa"],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "¿Qué necesita?",
          options: ["a) Maleta", "b) Mochila", "c) Bañador", "d) Coche"],
          correctAnswer: 1,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mis últimas vacaciones",
        description: "Escribe 3-4 frases sobre tus últimas vacaciones. Di a dónde fuiste.",
        structure: {
          intro: "Di a dónde fuiste.",
          body: "Di con quién fuiste.",
          conclusion: "Di qué hiciste.",
        },
        connectors: ["Fui a", "Viajé con", "Hice", "Me gustó"],
        wordCount: "20-40 palabras",
      },
      optionB: {
        title: "Mis vacaciones ideales",
        description: "Escribe 3-4 frases sobre tus vacaciones ideales. Di a dónde quieres ir.",
        structure: {
          intro: "Di a dónde quieres ir.",
          body: "Di con quién.",
          conclusion: "Di qué quieres hacer.",
        },
        connectors: ["Quiero ir a", "Con", "Me gustaría"],
        wordCount: "20-40 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Tus últimas vacaciones",
        description: "Habla de tus últimas vacaciones en 30-45 segundos. Di a dónde fuiste.",
        connectors: ["Fui a", "Con", "Hice", "Me gustó"],
        guideQuestions: ["¿A dónde fuiste?", "¿Con quién?", "¿Qué hiciste?", "¿Te gustó?"],
      },
      topic2: {
        title: "Tu destino ideal",
        description: "Habla de tu destino ideal para vacaciones en 30-45 segundos.",
        connectors: ["Mi destino ideal es", "Porque", "Quiero hacer"],
        guideQuestions: ["¿A dónde quieres ir?", "¿Por qué?", "¿Qué quieres hacer?"],
      },
    },
    interaction: {
      situation: "Tú y tu compañero queréis planificar unas vacaciones juntos.",
      questions: [
        {
          question: "¿Prefieres playa o montaña?",
          help: "Usa: Prefiero...",
          usefulPhrases: ["¿Playa o montaña?", "Me gusta más la playa.", "La montaña es bonita."],
        },
        {
          question: "¿Cuántos días queremos ir? ¿Una semana?",
          help: "Usa: Podemos ir... días",
          usefulPhrases: ["¿Una semana?", "¿Quince días?", "Yo prefiero una semana."],
        },
        {
          question: "¿Qué quieres hacer? ¿Nadar, caminar o visitar ciudades?",
          help: "Usa: Quiero...",
          usefulPhrases: ["Quiero nadar.", "Me gusta caminar.", "Podemos visitar ciudades."],
        },
      ],
    },
  },
  {
    id: 19,
    level: "A1",
    theme: "La tecnología básica",
    icon: "Smartphone",
    vocabulary: [
      {
        word: "teléfono",
        definition: "Aparato para llamar",
        chinese: "电话",
        example: "Mi teléfono es nuevo.",
      },
      {
        word: "ordenador",
        definition: "Máquina para trabajar",
        chinese: "电脑",
        example: "Uso el ordenador.",
      },
      {
        word: "internet",
        definition: "Red para buscar cosas",
        chinese: "互联网",
        example: "Busco en internet.",
      },
      {
        word: "móvil",
        definition: "Teléfono pequeño",
        chinese: "手机",
        example: "Llamo desde mi móvil.",
      },
      {
        word: "pantalla",
        definition: "Parte del móvil que ves",
        chinese: "屏幕",
        example: "La pantalla es grande.",
      },
      {
        word: "aplicación",
        definition: "Programa en el móvil",
        chinese: "应用",
        example: "Uso una aplicación.",
      },
      {
        word: "mensaje",
        definition: "Texto corto",
        chinese: "消息",
        example: "Te envío un mensaje.",
      },
      {
        word: "llamar",
        definition: "Hablar por teléfono",
        chinese: "打电话",
        example: "Te llamo esta noche.",
      },
      {
        word: "cargador",
        definition: "Aparato para dar batería",
        chinese: "充电器",
        example: "Necesito el cargador.",
      },
      {
        word: "batería",
        definition: "Energía del móvil",
        chinese: "电池",
        example: "La batería está baja.",
      },
    ],
    reading: {
      textType: "descriptivo",
      title: "Mi móvil",
      text: "Tengo un móvil nuevo. La pantalla es grande. Uso muchas aplicaciones. Hablo con mis amigos. La batería dura todo el día.",
      questions: [
        {
          id: 1,
          question: "¿Qué tiene nuevo?",
          options: ["a) Ordenador", "b) Móvil", "c) Tablet", "d) Tele"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Tengo un móvil nuevo".',
        },
        {
          id: 2,
          question: "¿Como es la pantalla?",
          options: ["a) Pequeña", "b) Grande", "c) Mediana", "d) Oscura"],
          correctAnswer: 1,
          explanation: 'El texto dice: "La pantalla es grande".',
        },
        {
          id: 3,
          question: "¿Con quién habla?",
          options: ["a) Familia", "b) Amigos", "c) Profesor", "d) Jefe"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Hablo con mis amigos".',
        },
        {
          id: 4,
          question: "¿Cuánto dura la batería?",
          options: ["a) Medio día", "b) Todo el día", "c) Dos días", "d) Una semana"],
          correctAnswer: 1,
          explanation: 'El texto dice: "La batería dura todo el día".',
        },
        {
          id: 5,
          question: "¿Qué usa muchas?",
          options: ["a) Fotos", "b) Aplicaciones", "c) Videos", "d) Llamadas"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Uso muchas aplicaciones".',
        },
      ],
    },
    listening: {
      title: "Una llamada importante",
      transcription:
        "Ayer llamó mi hermano. Vive lejos. Hablamos media hora. Me dijo que viene a visitarme. Me alegré mucho.",
      questions: [
        {
          id: 1,
          question: "¿Quién llamó?",
          options: ["a) Madre", "b) Hermano", "c) Amigo", "d) Profesor"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Dónde vive su hermano?",
          options: ["a) Cerca", "b) Lejos", "c) En su casa", "d) En Madrid"],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "¿Cuánto hablaron?",
          options: ["a) 15 minutos", "b) Media hora", "c) Una hora", "d) Dos horas"],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "¿Qué le dijo?",
          options: [
            "a) Que se casa",
            "b) Que viene a visitarlo",
            "c) Que necesita dinero",
            "d) Que está enfermo",
          ],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "¿Cómo se sintió?",
          options: ["a) Triste", "b) Alegre", "c) Enfadado", "d) Preocupado"],
          correctAnswer: 1,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Para qué uso mi móvil",
        description: "Escribe 3-4 frases sobre cómo usas tu móvil.",
        structure: {
          intro: "Di qué móvil tienes.",
          body: "Di qué aplicaciones usas.",
          conclusion: "Di para qué las usas.",
        },
        connectors: ["Mi móvil es", "Uso", "Me gusta"],
        wordCount: "20-40 palabras",
      },
      optionB: {
        title: "La tecnología en mi casa",
        description: "Escribe 3-4 frases sobre los aparatos tecnológicos que tienes en casa.",
        structure: {
          intro: "Di qué aparatos tienes.",
          body: "Di para qué los usas.",
          conclusion: "Di si te ayudan.",
        },
        connectors: ["En casa tengo", "Uso", "Me ayuda"],
        wordCount: "20-40 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Tu móvil",
        description: "Habla de tu móvil en 30-45 segundos. Di qué móvil tienes y qué aplicaciones usas.",
        connectors: ["Mi móvil es", "Tiene", "Uso", "Me gusta"],
        guideQuestions: ["¿Qué móvil tienes?", "¿Qué aplicaciones usas?", "¿Para qué usas el móvil?"],
      },
      topic2: {
        title: "La tecnología en tu casa",
        description: "Habla de la tecnología en tu casa en 30-45 segundos.",
        connectors: ["En mi casa hay", "Usamos", "Es útil"],
        guideQuestions: ["¿Qué aparatos tienes?", "¿Para qué usas el ordenador?", "¿Tienes wifi?"],
      },
    },
    interaction: {
      situation: "Tú y tu compañero queréis comprar un regalo tecnológico para un amigo.",
      questions: [
        {
          question: "¿Qué le regalamos? ¿Un móvil o unos auriculares?",
          help: "Usa: Podemos regalarle...",
          usefulPhrases: ["¿Un móvil?", "¿Auriculares?", "Los auriculares son más baratos."],
        },
        {
          question: "¿Cuánto dinero podemos gastar?",
          help: "Usa: Podemos gastar...",
          usefulPhrases: ["¿20 euros?", "¿30 euros?", "Yo puedo poner 10 euros."],
        },
        {
          question: "¿Lo compramos online o en una tienda?",
          help: "Usa: Podemos comprarlo...",
          usefulPhrases: ["¿Online?", "¿En una tienda?", "Online es más barato."],
        },
      ],
    },
  },
  {
    id: 20,
    level: "A1",
    theme: "Las emociones básicas",
    icon: "Heart",
    vocabulary: [
      {
        word: "feliz",
        definition: "Que siente alegría",
        chinese: "快乐的",
        example: "Estoy feliz hoy.",
      },
      {
        word: "triste",
        definition: "Que siente pena",
        chinese: "悲伤的",
        example: "Estoy triste por la noticia.",
      },
      {
        word: "enfadado",
        definition: "Que siente enfado",
        chinese: "生气的",
        example: "Estoy enfadado con él.",
      },
      {
        word: "cansado",
        definition: "Que necesita descansar",
        chinese: "累的",
        example: "Estoy cansado del trabajo.",
      },
      {
        word: "nervioso",
        definition: "Que está inquieto",
        chinese: "紧张的",
        example: "Estoy nervioso por el examen.",
      },
      {
        word: "contento",
        definition: "Que está satisfecho",
        chinese: "满意的",
        example: "Estoy contento con mi nota.",
      },
      {
        word: "preocupado",
        definition: "Que tiene miedo por algo",
        chinese: "担心的",
        example: "Estoy preocupado por mi madre.",
      },
      {
        word: "sorprendido",
        definition: "Que se asombra",
        chinese: "惊讶的",
        example: "Estoy sorprendido por la noticia.",
      },
      {
        word: "aburrido",
        definition: "Que siente aburrimiento",
        chinese: "无聊的",
        example: "Estoy aburrido en casa.",
      },
      {
        word: "ilusionado",
        definition: "Que tiene esperanza",
        chinese: "期待的",
        example: "Estoy ilusionado con el viaje.",
      },
    ],
    reading: {
      textType: "descriptivo",
      title: "Cómo me siento",
      text: "Hoy estoy contento porque es mi cumpleaños. Mis amigos me llaman. Recibo regalos. Por la noche hay fiesta. Estoy muy feliz.",
      questions: [
        {
          id: 1,
          question: "¿Cómo se siente?",
          options: ["a) Triste", "b) Contento", "c) Enfadado", "d) Cansado"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Hoy estoy contento".',
        },
        {
          id: 2,
          question: "¿Por qué está contento?",
          options: ["a) Por el trabajo", "b) Por su cumpleaños", "c) Por el viaje", "d) Por la escuela"],
          correctAnswer: 1,
          explanation: 'El texto dice: "porque es mi cumpleaños".',
        },
        {
          id: 3,
          question: "¿Quién le llama?",
          options: ["a) Familia", "b) Amigos", "c) Profesores", "d) Vecinos"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Mis amigos me llaman".',
        },
        {
          id: 4,
          question: "¿Qué recibe?",
          options: ["a) Flores", "b) Regalos", "c) Cartas", "d) Regalos"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Recibo regalos".',
        },
        {
          id: 5,
          question: "¿Cómo se siente al final?",
          options: ["a) Triste", "b) Feliz", "c) Cansado", "d) Nervioso"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Estoy muy feliz".',
        },
      ],
    },
    listening: {
      title: "Un día difícil",
      transcription:
        "Hoy ha sido un día difícil. Me levanto tarde. Pierdo el autobús. Llego tarde al trabajo. Mi jefe se enfada. Estoy triste y cansado.",
      questions: [
        {
          id: 1,
          question: "¿Cómo ha sido el día?",
          options: ["a) Bueno", "b) Difícil", "c) Normal", "d) Divertido"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Qué pierde?",
          options: ["a) Llaves", "b) Autobús", "c) Cartera", "d) Móvil"],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "¿Dónde llega tarde?",
          options: ["a) Casa", "b) Trabajo", "c) Escuela", "d) Cita"],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "¿Cómo se siente su jefe?",
          options: ["a) Contento", "b) Enfadado", "c) Triste", "d) Cansado"],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "¿Cómo se siente él?",
          options: ["a) Feliz", "b) Triste y cansado", "c) Nervioso", "d) Sorprendido"],
          correctAnswer: 1,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Cómo me siento hoy",
        description: "Escribe 3-4 frases sobre cómo te sientes hoy y por qué.",
        structure: {
          intro: "Di cómo te sientes.",
          body: "Di por qué.",
          conclusion: "Di qué vas a hacer.",
        },
        connectors: ["Hoy estoy", "Porque", "Me siento", "Voy a"],
        wordCount: "20-40 palabras",
      },
      optionB: {
        title: "Un día feliz",
        description: "Escribe 3-4 frases sobre un día feliz que recuerdes.",
        structure: {
          intro: "Di qué día fue.",
          body: "Di qué pasó.",
          conclusion: "Di cómo te sentiste.",
        },
        connectors: ["Recuerdo un día", "Ese día", "Me sentí"],
        wordCount: "20-40 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Cómo te sientes hoy",
        description: "Habla de cómo te sientes hoy en 30-45 segundos. Di por qué y qué vas a hacer.",
        connectors: ["Hoy me siento", "Porque", "Voy a"],
        guideQuestions: ["¿Cómo te sientes hoy?", "¿Por qué?", "¿Qué vas a hacer?"],
      },
      topic2: {
        title: "Un día de mucho estrés",
        description: "Habla de un día de mucho estrés en 30-45 segundos. Di qué pasó y cómo te sentiste.",
        connectors: ["Un día tuve estrés", "Pasó que", "Me sentí", "Después"],
        guideQuestions: ["¿Qué pasó?", "¿Cómo te sentiste?", "¿Qué hiciste para calmarte?"],
      },
    },
    interaction: {
      situation: "Tú y tu compañero habláis de cómo os sentís hoy.",
      questions: [
        {
          question: "¿Cómo te sientes hoy? ¿Feliz o cansado?",
          help: "Usa: Me siento...",
          usefulPhrases: ["¿Cómo te sientes?", "Yo estoy feliz.", "¿Y tú?"],
        },
        {
          question: "¿Por qué estás cansado? ¿Dormiste mal?",
          help: "Usa: Estoy cansado porque...",
          usefulPhrases: ["¿Dormiste bien?", "Trabajé mucho.", "Me acosté tarde."],
        },
        {
          question: "¿Qué haces cuando estás triste?",
          help: "Usa: Cuando estoy triste...",
          usefulPhrases: ["Llamo a un amigo.", "Escucho música.", "Veo una película."],
        },
      ],
    },
  },
  {
    id: 21,
    level: "A1",
    theme: "Las profesiones y el trabajo",
    icon: "Briefcase",
    vocabulary: [
      {
        word: "oficina",
        definition: "Lugar físico de trabajo",
        chinese: "办公室",
        example: "Mi oficina está en el centro de Madrid.",
      },
      {
        word: "compañero",
        definition: "Persona que trabaja con otra",
        chinese: "同事",
        example: "Carlos es mi compañero de oficina.",
      },
      {
        word: "reunión",
        definition: "Grupo de personas reunidas para hablar",
        chinese: "会议",
        example: "Tengo una reunión importante a las diez.",
      },
      {
        word: "horario",
        definition: "Distribución de las horas de trabajo",
        chinese: "时间表/作息",
        example: "Mi horario de trabajo es de mañana.",
      },
      {
        word: "firma",
        definition: "Nombre escrito para validar un papel",
        chinese: "签名",
        example: "Necesito su firma en este contrato.",
      },
      {
        word: "cliente",
        definition: "Persona que compra un servicio o producto",
        chinese: "客户",
        example: "El cliente de China llama por teléfono.",
      },
      {
        word: "ordenador",
        definition: "Máquina para trabajar y escribir",
        chinese: "电脑",
        example: "Uso el ordenador para escribir correos.",
      },
      {
        word: "informe",
        definition: "Documento escrito sobre un tema",
        chinese: "报告",
        example: "He terminado el informe de ventas hoy.",
      },
    ],
    reading: {
      textType: "narrativo",
      title: "Mi primer día de trabajo en Madrid",
      text: `Hola, me llamo Juan y soy de Pekín, China. Hoy es mi primer día de trabajo en una empresa internacional en Madrid. Estoy un poco nervioso pero muy contento. Trabajo como secretario en la oficina del director.

La oficina está en la gran avenida del centro. Es un lugar muy moderno y luminoso. En la oficina hay seis compañeros de trabajo. Ellos son muy simpáticos y me ayudan mucho. Mi compañera de mesa se llama Ana. Ella es de Madrid, tiene veintiocho años y habla inglés excelente. Ella me enseña dónde están las cosas.

Mi horario de trabajo empieza a las nueve de la mañana y termino a las cinco de la tarde. Hoy, por la mañana, hago mi primer informe en el ordenador y hablo por teléfono con un cliente de China. Me gusta hablar con los clientes en mi lengua materna.

A las dos de la tarde, como un bocadillo en la cocina de la oficina con mis compañeros. Ellos me preguntan sobre China y yo les hablo de mi familia en Pekín. A las cinco, firmo mi primer contrato de trabajo y voy a casa en metro. ¡Es un día fantástico!`,
      questions: [
        {
          id: 1,
          question: "¿De dónde es Juan?",
          options: [
            "a) De Madrid, España",
            "b) De Pekín, China",
            "c) De Barcelona, España",
            "d) De Shanghái, China",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "me llamo Juan y soy de Pekín, China".',
        },
        {
          id: 2,
          question: "¿Qué profesión tiene Juan en la empresa?",
          options: ["a) Es el director", "b) Es informático", "c) Es secretario", "d) Es médico"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Trabajo como secretario en la oficina del director".',
        },
        {
          id: 3,
          question: "¿Cómo es la oficina del director?",
          options: [
            "a) Pequeña y oscura",
            "b) Antigua y ruidosa",
            "c) Moderna y luminosa",
            "d) Lejos del centro",
          ],
          correctAnswer: 2,
          explanation: 'El texto dice: "Es un lugar muy moderno y luminoso".',
        },
        {
          id: 4,
          question: "¿Cuántos compañeros de trabajo hay en la oficina de Juan?",
          options: ["a) Cuatro", "b) Cinco", "c) Seis", "d) Siete"],
          correctAnswer: 2,
          explanation: 'El texto dice: "En la oficina hay seis compañeros de trabajo".',
        },
        {
          id: 5,
          question: "¿Quién es Ana?",
          options: [
            "a) La secretaria del director",
            "b) La compañera de mesa de Juan",
            "c) Una cliente de China",
            "d) La jefa de recursos humanos",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Mi compañera de mesa se llama Ana".',
        },
        {
          id: 6,
          question: "¿Qué edad tiene Ana?",
          options: ["a) Veintidós años", "b) Veinticinco años", "c) Veintiocho años", "d) Treinta años"],
          correctAnswer: 2,
          explanation: 'El texto dice: "tiene veintiocho años".',
        },
        {
          id: 7,
          question: "¿A qué hora termina de trabajar Juan?",
          options: [
            "a) A las nueve de la mañana",
            "b) A las dos de la tarde",
            "c) A las cinco de la tarde",
            "d) A las seis de la tarde",
          ],
          correctAnswer: 2,
          explanation: 'El texto dice: "termino a las cinco de la tarde".',
        },
        {
          id: 8,
          question: "¿Qué tarea hace Juan por la mañana en el ordenador?",
          options: [
            "a) Escribe un correo",
            "b) Hace su primer informe",
            "c) Mira fotos de Madrid",
            "d) Llama a su abuelo",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Hoy, por la mañana, hago mi primer informe en el ordenador".',
        },
        {
          id: 9,
          question: "¿Con quién habla Juan en su lengua materna?",
          options: ["a) Con Ana", "b) Con el director", "c) Con un cliente de China", "d) Con sus padres"],
          correctAnswer: 2,
          explanation:
            'El texto dice: "hablo por teléfono con un cliente de China. Me gusta hablar con los clientes en mi lengua materna".',
        },
        {
          id: 10,
          question: "¿Cómo vuelve Juan a su casa al final del día?",
          options: ["a) En coche", "b) En autobús", "c) En metro", "d) Andando"],
          correctAnswer: 2,
          explanation: 'El texto dice: "voy a casa en metro".',
        },
      ],
    },
    listening: {
      title: "La profesión de mi tía Carmen",
      transcription: `Hola, soy Elena. Hoy quiero hablaros de mi tía Carmen. Ella tiene cuarenta y cinco años y vive en Barcelona. Mi tía es enfermera y trabaja en un hospital infantil muy grande en el centro de la ciudad.

Su horario de trabajo es muy duro pero a ella le encanta su profesión. Trabaja de lunes a viernes, por la mañana. Se levanta a las seis de la madrugada. Desayuna café con leche y tostadas con aceite de oliva. A las siete y media sale de casa y va al hospital en autobús. El viaje dura treinta minutos. Ella lee novelas de misterio en el autobús.

En el hospital, Carmen cuida a los niños enfermos. Ella les da la medicina, mide su temperatura con el termómetro y ayuda a los médicos. Los niños la quieren mucho porque es muy alegre y cariñosa. Siempre tiene una sonrisa en la cara.

Termina su trabajo a las tres de la tarde. Vuelve a casa, come con su familia y descansa un poco. Por la tarde, a veces va a la piscina municipal a nadar para relajarse. Ella dice que cuidar la salud es lo más importante en la vida.`,
      questions: [
        {
          id: 1,
          question: "¿Cuántos años tiene la tía Carmen?",
          options: ["a) Treinta y cinco", "b) Cuarenta", "c) Cuarenta y cinco", "d) Cincuenta"],
          correctAnswer: 2,
        },
        {
          id: 2,
          question: "¿Dónde vive Carmen?",
          options: ["a) En Madrid", "b) En Barcelona", "c) En Valencia", "d) En Sevilla"],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "¿Cuál es la profesión de Carmen?",
          options: ["a) Es médica", "b) Es secretaria", "c) Es enfermera", "d) Es profesora"],
          correctAnswer: 2,
        },
        {
          id: 4,
          question: "¿En qué tipo de hospital trabaja Carmen?",
          options: [
            "a) En un hospital de campaña",
            "b) En un hospital infantil grande",
            "c) En una clínica de ojos",
            "d) En un hospital militar",
          ],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "¿A qué hora se levanta Carmen por la mañana?",
          options: ["a) A las seis", "b) A las seis y media", "c) A las siete", "d) A las siete y media"],
          correctAnswer: 0,
        },
        {
          id: 6,
          question: "¿Qué desayuna Carmen?",
          options: [
            "a) Té verde y galletas",
            "b) Café con leche y tostadas",
            "c) Zumo de naranja",
            "d) Yogur con fruta",
          ],
          correctAnswer: 1,
        },
        {
          id: 7,
          question: "¿Cómo va Carmen al trabajo?",
          options: ["a) En metro", "b) En autobús", "c) En coche", "d) Andando"],
          correctAnswer: 1,
        },
        {
          id: 8,
          question: "¿Qué hace Carmen en el autobús?",
          options: ["a) Duerme", "b) Escucha música", "c) Lee novelas", "d) Habla por teléfono"],
          correctAnswer: 2,
        },
        {
          id: 9,
          question: "¿Por qué la quieren mucho los niños del hospital?",
          options: [
            "a) Porque es muy seria",
            "b) Porque es alegre y cariñosa",
            "c) Porque les da dulces",
            "d) Porque es joven",
          ],
          correctAnswer: 1,
        },
        {
          id: 10,
          question: "¿Qué hace Carmen por la tarde para relajarse?",
          options: ["a) Va al cine", "b) Va a la piscina a nadar", "c) Va de compras", "d) Duerme la siesta"],
          correctAnswer: 1,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi profesión ideal",
        description:
          "Escribe sobre tu profesión ideal. Incluye: qué quieres ser en el futuro, por qué te gusta esa profesión y dónde quieres trabajar.",
        structure: {
          intro: "Di qué profesión quieres tener.",
          body: "Explica por qué te gusta y qué tareas hace.",
          conclusion: "Di en qué lugar te gustaría trabajar.",
        },
        connectors: ["Quiero ser", "Me gusta porque", "Trabajaré en", "Es importante"],
        wordCount: "30-40 palabras",
      },
      optionB: {
        title: "Mi primer día de clase",
        description:
          "Escribe sobre tu primer día de clase de español. Incluye: cómo es tu profesor/a, cuántos alumnos hay y qué haces en la clase.",
        structure: {
          intro: "Di a qué hora empieza la clase.",
          body: "Describe a tu profesor/a y a tus compañeros.",
          conclusion: "Di qué hacéis en el aula.",
        },
        connectors: ["Mi clase empieza a las", "El profesor es", "Hay muchos", "En clase hablamos"],
        wordCount: "30-40 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Tu trabajo o estudios",
        description:
          "Habla sobre tu trabajo actual o tus estudios durante 1 minuto. Di qué haces, dónde y si te gusta.",
        connectors: ["Trabajo en", "Estudio en", "Mi horario es", "Me gusta porque", "Mis compañeros son"],
        guideQuestions: [
          "¿Trabajas o estudias?",
          "¿Dónde está tu lugar de trabajo o escuela?",
          "¿Cuál es tu horario diario?",
          "¿Te gusta lo que haces?",
          "¿Cómo son tus compañeros?",
        ],
      },
      topic2: {
        title: "Un día en la oficina",
        description:
          "Habla de un día de trabajo normal en tu oficina durante 1 minuto. Di qué haces por la mañana y por la tarde.",
        connectors: [
          "Por la mañana",
          "Llego a las",
          "Uso el ordenador para",
          "Por la tarde",
          "Termino a las",
        ],
        guideQuestions: [
          "¿A qué hora llegas a la oficina?",
          "¿Qué haces por la mañana?",
          "¿Con quién comes al mediodía?",
          "¿Qué herramientas de trabajo usas?",
          "¿A qué hora sales de la oficina?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero os conocéis en vuestro primer día de trabajo en una oficina nueva de Madrid. Tenéis que hablar para presentaros y coordinar tareas básicas.",
      questions: [
        {
          question:
            "Preséntate a tu compañero: dile tu nombre, de dónde eres y qué puesto tienes en la oficina.",
          help: "Usa: Hola, me llamo... / Soy de... / Trabajo como...",
          usefulPhrases: [
            "Hola, buenos días. Me llamo Juan.",
            "Encantado de conocerte, soy el nuevo secretario.",
            "Yo soy de Pekín, China. ¿Y tú?",
            "Mucho gusto.",
          ],
        },
        {
          question: "Pregunta a tu compañero sobre su horario de trabajo y dónde prefiere comer al mediodía.",
          help: "Usa: ¿Cuál es tu horario? / ¿A qué hora comes? / ¿Dónde comes?",
          usefulPhrases: [
            "¿A qué hora empieza tu horario de trabajo?",
            "Yo como a las dos de la tarde en la cocina. ¿Y tú?",
            "Hay un restaurante de menú del día muy cerca.",
            "Perfecto, comemos juntos.",
          ],
        },
        {
          question:
            "Pídele ayuda a tu compañero de forma educada con un problema técnico del ordenador de tu mesa.",
          help: "Usa: Por favor, ¿me ayudas? / Mi ordenador no funciona... / ¿Podrías ayudarme?",
          usefulPhrases: [
            "Disculpa, ¿me puedes echar una mano, por favor?",
            "Mi ordenador de mesa no funciona bien hoy.",
            "¿Puedes mirar la pantalla conmigo?",
            "¡Muchísimas gracias, eres muy amable!",
          ],
        },
      ],
    },
  },
  {
    id: 22,
    level: "A1",
    theme: "Las compras y la comida",
    icon: "Apple",
    vocabulary: [
      {
        word: "mercado",
        definition: "Lugar público de venta de alimentos",
        chinese: "市场",
        example: "Compro pescado fresco en el mercado de mi barrio.",
      },
      {
        word: "precio",
        definition: "Valor en dinero de una cosa",
        chinese: "价格",
        example: "¿Cuál es el precio de este kilo de naranjas?",
      },
      {
        word: "kilo",
        definition: "Medida de peso de mil gramos",
        chinese: "公斤",
        example: "Quiero un kilo de manzanas verdes, por favor.",
      },
      {
        word: "verduras",
        definition: "Plantas comestibles que se cultivan",
        chinese: "蔬菜",
        example: "Las verduras son excelentes para la salud.",
      },
      {
        word: "frutas",
        definition: "Alimento dulce de plantas",
        chinese: "水果",
        example: "Me encanta merendar fruta fresca.",
      },
      {
        word: "pescado",
        definition: "Pez sacado del agua para comer",
        chinese: "鱼/海鲜",
        example: "El pescador vende salmón fresco en la pescadería.",
      },
      {
        word: "pagar",
        definition: "Dar dinero por un producto",
        chinese: "付款",
        example: "Quiero pagar en efectivo, por favor.",
      },
      {
        word: "tarjeta",
        definition: "Plástico para pagar de forma electrónica",
        chinese: "卡",
        example: "¿Aceptan tarjeta de crédito en esta tienda?",
      },
    ],
    reading: {
      textType: "descriptivo",
      title: "El sábado en el mercado de mi barrio",
      text: `Hola, soy Marta y hoy os voy a contar mi mañana de compras en el mercado tradicional de mi barrio en Valencia. Los sábados me levanto temprano, desayuno un té verde y salgo de casa a las nueve de la mañana. Me gusta ir al mercado porque los alimentos son muy frescos y sanos.

Primero, voy a la frutería de mi amigo Paco. Las manzanas rojas tienen un precio excelente hoy, solo dos euros el kilo. Compro dos kilos de manzanas y un kilo de plátanos. Paco es muy simpático y siempre me regala una naranja dulce. ¡Es de muy buena educación dar las gracias!

Después, voy a la verdulería. Necesito verduras para preparar una ensalada y una sopa caliente. Compro una lechuga grande, un kilo de tomates rojos y medio kilo de cebollas. Todo cuesta cuatro euros en total. Le pregunto a la dependienta si puedo pagar con tarjeta de débito y ella me dice que sí, que aceptan tarjeta.

Finalmente, voy a la pescadería. El pescado en este mercado es del día. Compro medio kilo de salmón fresco. Cuesta ocho euros. El pescadero corta el pescado en rodajas muy limpias y lo pone en una bolsa de papel.

Pago todo, me despido con un afectuoso "¡Buen fin de semana!" y vuelvo a casa andando a pie. Me encanta el ambiente animado de mi mercado.`,
      questions: [
        {
          id: 1,
          question: "¿Qué día de la semana va Marta al mercado?",
          options: ["a) Los domingos", "b) Los viernes", "c) Los sábados", "d) Los lunes"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Los sábados me levanto temprano... y voy al mercado".',
        },
        {
          id: 2,
          question: "¿A qué hora sale Marta de casa por la mañana?",
          options: ["a) A las ocho", "b) A las ocho y media", "c) A las nueve", "d) A las diez"],
          correctAnswer: 2,
          explanation: 'El texto dice: "salgo de casa a las nueve de la mañana".',
        },
        {
          id: 3,
          question: "¿Qué desayuna Marta antes de salir?",
          options: ["a) Café con leche", "b) Té verde", "c) Zumo de naranja", "d) Un plátano"],
          correctAnswer: 1,
          explanation: 'El texto dice: "desayuno un té verde y salgo".',
        },
        {
          id: 4,
          question: "¿Cómo se llama el frutero amigo de Marta?",
          options: ["a) Juan", "b) Paco", "c) Carlos", "d) Miguel"],
          correctAnswer: 1,
          explanation: 'El texto dice: "voy a la frutería de mi amigo Paco".',
        },
        {
          id: 5,
          question: "¿Cuánto cuesta el kilo de manzanas rojas?",
          options: ["a) Un euro", "b) Dos euros", "c) Tres euros", "d) Cuatro euros"],
          correctAnswer: 1,
          explanation:
            'El texto dice: "Las manzanas rojas tienen un precio excelente hoy, solo dos euros el kilo".',
        },
        {
          id: 6,
          question: "¿Qué fruta le regala Paco a Marta?",
          options: ["a) Un plátano", "b) Una manzana", "c) Una naranja dulce", "d) Una fresa"],
          correctAnswer: 2,
          explanation: 'El texto dice: "siempre me regala una naranja dulce".',
        },
        {
          id: 7,
          question: "¿Qué verduras compra Marta para la ensalada y la sopa?",
          options: [
            "a) Patatas y zanahorias",
            "b) Lechuga, tomates y cebollas",
            "c) Judías verdes",
            "d) Tomates y pimientos",
          ],
          correctAnswer: 1,
          explanation:
            'El texto dice: "Compro una lechuga grande, un kilo de tomates rojos y medio kilo de cebollas".',
        },
        {
          id: 8,
          question: "¿Cómo paga Marta en la verdulería?",
          options: ["a) En efectivo", "b) Con cheque", "c) Con tarjeta de débito", "d) No paga"],
          correctAnswer: 2,
          explanation:
            'El texto dice: "Le pregunto a la dependienta si puedo pagar con tarjeta de débito y ella me dice que sí".',
        },
        {
          id: 9,
          question: "¿Qué tipo de pescado compra Marta en la pescadería?",
          options: ["a) Atún", "b) Bacalao", "c) Salmón fresco", "d) Sardinas"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Compro medio kilo de salmón fresco".',
        },
        {
          id: 10,
          question: "¿Cómo vuelve Marta a su casa al final de las compras?",
          options: ["a) En autobús", "b) En coche", "c) En metro", "d) Andando a pie"],
          correctAnswer: 2,
          explanation: 'El texto dice: "vuelvo a casa andando a pie".',
        },
      ],
    },
    listening: {
      title: "Preparando una paella familiar",
      transcription: `Hola, soy Carlos. Hoy es domingo y en mi casa es tradición comer paella juntos. Mi padre prepara la mejor paella de Valencia. Pero antes de cocinar, tenemos que comprar los ingredientes en el supermercado.

Mi padre y yo salimos a las diez de la mañana en coche. Primero, vamos a la carnicería. Compramos un kilo de pollo troceado y medio de carne de cerdo. Cuesta diez euros en total. El carnicero nos atiende muy rápido y nos dice "¡Buen provecho!" de antemano.

Después, vamos a la sección de frutas y verduras. Necesitamos verduras frescas para la paella: judías verdes y un pimiento rojo grande. También compramos dos tomates maduros para hacer la salsa de la paella. Mi padre elige los tomates con mucho cuidado. Luego, compramos un kilo de arroz redondo, que es el arroz básico para la paella, y una caja de azafrán, que da el color amarillo típico y el aroma.

Pago todo en la caja del supermercado con mi tarjeta de crédito porque no llevo efectivo hoy. El cajero es un chico joven muy amable. Nos da una bolsa de papel y nos despide atentamente.

Llegamos a casa a las once y media. Mi madre ya ha puesto la mesa en la terraza del salón. ¡Tengo muchísima hambre y el olor de la cocina ya es excelente!`,
      questions: [
        {
          id: 1,
          question: "¿Qué día de la semana comen paella en familia?",
          options: ["a) Los viernes", "b) Los sábados", "c) Los domingos", "d) Los lunes"],
          correctAnswer: 2,
        },
        {
          id: 2,
          question: "¿A qué hora salen de casa Carlos y su padre?",
          options: ["a) A las nueve", "b) A las diez", "c) A las diez y media", "d) A las once"],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "¿Cómo van al supermercado?",
          options: ["a) En metro", "b) En autobús", "c) En coche", "d) Andando a pie"],
          correctAnswer: 2,
        },
        {
          id: 4,
          question: "¿Qué compran en la carnicería?",
          options: [
            "a) Un kilo de pollo y medio de cerdo",
            "b) Dos kilos de ternera",
            "c) Pescado fresco",
            "d) Jamón serrano",
          ],
          correctAnswer: 0,
        },
        {
          id: 5,
          question: "¿Cuánto cuesta la carne en total?",
          options: ["a) Cinco euros", "b) Ocho euros", "c) Diez euros", "d) Quince euros"],
          correctAnswer: 2,
        },
        {
          id: 6,
          question: "¿Qué verduras compran para la paella?",
          options: [
            "a) Patatas y zanahorias",
            "b) Judías verdes y un pimiento rojo",
            "c) Cebolla y ajo",
            "d) Lechuga y pepino",
          ],
          correctAnswer: 1,
        },
        {
          id: 7,
          question: "¿Qué ingrediente da el color amarillo típico a la paella?",
          options: ["a) El limón", "b) El azafrán", "c) El tomate", "d) El arroz"],
          correctAnswer: 1,
        },
        {
          id: 8,
          question: "¿Cómo paga Carlos en el supermercado?",
          options: ["a) En efectivo", "b) Con cheque", "c) Con tarjeta de crédito", "d) Con el móvil"],
          correctAnswer: 2,
        },
        {
          id: 9,
          question: "¿A qué hora llegan de vuelta a casa?",
          options: ["a) A las once", "b) A las once y media", "c) A las doce", "d) A la una"],
          correctAnswer: 1,
        },
        {
          id: 10,
          question: "¿Dónde ha puesto la madre de Carlos la mesa para comer?",
          options: [
            "a) En la cocina",
            "b) En el dormitorio",
            "c) En la terraza del salón",
            "d) En el jardín",
          ],
          correctAnswer: 2,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi plato favorito",
        description:
          "Escribe sobre tu plato de comida favorito. Incluye: qué plato es, cuáles son sus ingredientes principales y cuándo lo comes.",
        structure: {
          intro: "Di cuál es tu comida favorita.",
          body: "Menciona los ingredientes principales.",
          conclusion: "Di con quién o cuándo lo comes.",
        },
        connectors: ["Mi plato favorito es", "Lleva", "Me gusta porque", "Normalmente lo como"],
        wordCount: "30-40 palabras",
      },
      optionB: {
        title: "Un día de compras en el mercado",
        description:
          "Escribe sobre tu última visita a un mercado de tu ciudad. Di qué compraste, cómo pagaste y si los alimentos estaban frescos.",
        structure: {
          intro: "Di a qué mercado fuiste.",
          body: "Describe qué alimentos (fruta, verdura, carne) compraste.",
          conclusion: "Di cuánto pagaste y cómo lo hiciste.",
        },
        connectors: ["Fui al mercado de", "Compré medio kilo de", "Los precios eran", "Pagué con tarjeta"],
        wordCount: "30-40 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Tu comida favorita",
        description:
          "Habla sobre tu comida favorita en español durante 1 minuto. Explica de qué país es, qué lleva y por qué te encanta.",
        connectors: [
          "Mi plato favorito es",
          "Es una comida típica de",
          "Sus ingredientes son",
          "Me gusta porque",
          "Se sirve caliente/frío",
        ],
        guideQuestions: [
          "¿Cuál es tu plato de comida preferido?",
          "¿De qué país o región es típico?",
          "¿Qué ingredientes lleva?",
          "¿Es un plato sano?",
          "¿Quién lo cocina mejor en tu familia?",
        ],
      },
      topic2: {
        title: "Hacer la compra semanal",
        description:
          "Habla de cómo haces la compra semanal de comida durante 1 minuto. Di dónde vas, qué compras habitualmente y cómo pagas.",
        connectors: [
          "Normalmente compro en",
          "Los sábados por la mañana",
          "Compro fruta como",
          "Prefiero pagar con",
          "Los precios están",
        ],
        guideQuestions: [
          "¿Dónde haces la compra normalmente (supermercado, mercado de barrio)?",
          "¿Qué día de la semana prefieres ir?",
          "¿Qué frutas y verduras compras siempre?",
          "¿Prefieres pagar con tarjeta o en efectivo?",
          "¿Haces una lista de la compra antes de salir?",
        ],
      },
    },
    interaction: {
      situation:
        "Estás en la frutería tradicional de tu barrio en España y necesitas comprar varias frutas y verduras para preparar una ensalada y una cena familiar. Hablas con el frutero para pedir los precios y encargar el peso.",
      questions: [
        {
          question:
            "Saluda al frutero de forma educada y pídele los precios del kilo de manzanas rojas y de tomates.",
          help: "Usa: ¡Buenos días! / ¿Qué precio tiene el kilo de...? / ¿A cómo están los tomates hoy?",
          usefulPhrases: [
            "¡Buenos días! ¿Qué tal estás hoy?",
            "¿Me puede decir el precio del kilo de manzanas, por favor?",
            "¿A cómo tiene los tomates hoy, señor?",
            "¿Están dulces las naranjas?",
          ],
        },
        {
          question:
            "Pídele al frutero que te prepare medio kilo de tomates, un kilo de manzanas y un melón grande.",
          help: "Usa: Deme medio kilo de... / Póngame un kilo de... / Quiero un melón grande, por favor.",
          usefulPhrases: [
            "Póngame medio kilo de tomates rojos, por favor.",
            "Deme un kilo de manzanas verdes, por favor.",
            "Quiero este melón grande que está aquí.",
            "Que esté maduro, por favor.",
          ],
        },
        {
          question: "Pregunta el precio total de la compra y dile que quieres pagar con tarjeta de crédito.",
          help: "Usa: ¿Cuánto es en total? / ¿Aceptan tarjeta? / ¿Puedo pagar con tarjeta de crédito?",
          usefulPhrases: [
            "¿Cuánto cuesta todo en total?",
            "¿Puedo pagar con tarjeta de crédito, por favor?",
            "Aquí tiene mi tarjeta. No llevo efectivo hoy.",
            "Muchas gracias por su amable atención. ¡Hasta luego!",
          ],
        },
      ],
    },
  },
  {
    id: 23,
    level: "A1",
    theme: "La casa, ubicación y muebles",
    icon: "Home",
    vocabulary: [
      {
        word: "mudarse",
        definition: "Cambiar de casa o habitación",
        chinese: "搬家",
        example: "Quiero mudarme a un piso más luminoso en verano.",
      },
      {
        word: "alquiler",
        definition: "Dinero que pagas cada mes por la vivienda",
        chinese: "租金/出租",
        example: "El alquiler de mi estudio en Madrid es de quinientos euros.",
      },
      {
        word: "fianza",
        definition: "Depósito de dinero obligatorio al alquilar",
        chinese: "押金",
        example: "Tengo que pagar un mes de fianza al propietario.",
      },
      {
        word: "amplio",
        definition: "Espacio grande con desahogo",
        chinese: "宽敞的",
        example: "Nuestra cocina es muy amplia y cómoda.",
      },
      {
        word: "luminoso",
        definition: "Que tiene mucha luz natural del sol",
        chinese: "明亮的",
        example: "El salón del piso es muy luminoso por las mañanas.",
      },
      {
        word: "acogedor",
        definition: "Lugar cálido y cómodo",
        chinese: "温馨的",
        example: "Mi dormitorio es pequeño pero muy acogedor.",
      },
      {
        word: "sofá",
        definition: "Mueble cómodo para sentarse varias personas",
        chinese: "沙发",
        example: "Tenemos un sofá gris muy cómodo en el salón.",
      },
      {
        word: "armario",
        definition: "Mueble con puertas para guardar la ropa",
        chinese: "衣柜",
        example: "Tengo mi ropa colgada en el armario de mi habitación.",
      },
    ],
    reading: {
      textType: "descriptivo",
      title: "Mi nuevo piso compartido en el centro de Madrid",
      text: `Hola, me llamo Elena. La semana pasada me mudé a un piso compartido en el centro de Madrid. Estoy muy ilusionada con mi nueva vivienda. Es un piso en la tercera planta de un edificio moderno con ascensor.

El piso es bastante amplio, muy luminoso y acogedor. Tiene tres dormitorios, un salón-comedor, una cocina equipada y dos baños. Pago un alquiler de cuatrocientos euros al mes, con los gastos de agua y luz incluidos en el precio. Para alquilarlo, tuve que pagar un mes de fianza al propietario, que es un señor mayor muy educado e inteligente.

Mi habitación favorita es mi dormitorio. Es pequeño pero entra mucha luz del sol por la mañana porque tiene una ventana grande con vistas a una plaza tranquila. En mi dormitorio hay una cama individual cómoda, un armario grande para colgar mi ropa y una mesa de estudio con una silla de madera. Encima de la mesa tengo mi ordenador portátil y mis libros de español.

La cocina de la casa es bastante amplia. Hay nevera, lavavajillas, microondas y horno. Comparto el piso con dos chicas estudiantes de medicina que son muy limpias y simpáticas. Una es de Colombia y la otra es de Italia. Vivir con ellas es genial porque nos ayudamos mucho con las tareas de casa. Me gusta mucho mi nueva vida aquí.`,
      questions: [
        {
          id: 1,
          question: "¿Cuándo se mudó Elena a su nuevo piso?",
          options: ["a) Ayer por la tarde", "b) La semana pasada", "c) Hace un mes", "d) En verano"],
          correctAnswer: 1,
          explanation: 'El texto dice: "La semana pasada me mudé a un piso compartido".',
        },
        {
          id: 2,
          question: "¿En qué planta del edificio está el piso?",
          options: [
            "a) En la primera planta",
            "b) En la segunda planta",
            "c) En la tercera planta",
            "d) En la planta baja",
          ],
          correctAnswer: 2,
          explanation: 'El texto dice: "Es un piso en la tercera planta de un edificio".',
        },
        {
          id: 3,
          question: "¿Cuántos dormitorios tiene la vivienda en total?",
          options: ["a) Dos", "b) Tres", "c) Cuatro", "d) Cinco"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Tiene tres dormitorios".',
        },
        {
          id: 4,
          question: "¿Cuánto paga Elena de alquiler al mes?",
          options: [
            "a) Trescientos euros",
            "b) Trescientos cincuenta",
            "c) Cuatrocientos euros",
            "d) Quinientos euros",
          ],
          correctAnswer: 2,
          explanation: 'El texto dice: "Pago un alquiler de cuatrocientos euros al mes".',
        },
        {
          id: 5,
          question: "¿Qué gastos están incluidos en el precio del alquiler?",
          options: ["a) Solo internet", "b) Agua y luz", "c) Fianza y comunidad", "d) Ninguno"],
          correctAnswer: 1,
          explanation: 'El texto dice: "con los gastos de agua y luz incluidos en el precio".',
        },
        {
          id: 6,
          question: "¿Cuántos meses de fianza tuvo que pagar Elena al propietario?",
          options: ["a) Ninguno", "b) Un mes", "c) Dos meses", "d) Tres meses"],
          correctAnswer: 1,
          explanation: 'El texto dice: "tuve que pagar un mes de fianza al propietario".',
        },
        {
          id: 7,
          question: "¿Por qué entra mucha luz natural en el dormitorio de Elena?",
          options: [
            "a) Porque tiene dos puertas",
            "b) Porque es exterior y tiene un patio",
            "c) Porque tiene una ventana grande con vistas a la plaza",
            "d) Porque no tiene armario",
          ],
          correctAnswer: 2,
          explanation:
            'El texto dice: "entra mucha luz del sol por la mañana porque tiene una ventana grande con vistas a una plaza tranquila".',
        },
        {
          id: 8,
          question: "¿Qué muebles hay en el dormitorio de Elena?",
          options: [
            "a) Sofá y televisión",
            "b) Cama individual, armario, mesa de estudio y silla",
            "c) Solo una cama de matrimonio",
            "d) Dos camas literas y mesa de noche",
          ],
          correctAnswer: 1,
          explanation:
            'El texto dice: "En mi dormitorio hay una cama individual cómoda, un armario grande... y una mesa de estudio con una silla".',
        },
        {
          id: 9,
          question: "¿Con quién comparte Elena el piso de alquiler?",
          options: [
            "a) Con su familia",
            "b) Con dos chicas estudiantes de medicina",
            "c) Con el propietario del edificio",
            "d) Con un informático de China",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Comparto el piso con dos chicas estudiantes de medicina".',
        },
        {
          id: 10,
          question: "¿De qué países son las compañeras de piso de Elena?",
          options: [
            "a) De España y Francia",
            "b) De Colombia e Italia",
            "c) De México y Canadá",
            "d) De China y Japón",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Una es de Colombia y la otra es de Italia".',
        },
      ],
    },
    listening: {
      title: "La mudanza de Carlos",
      transcription: `Hola, soy Carlos y hoy quiero contaros mi experiencia de mudanza. Hace dos días alquilé un pequeño estudio en un barrio residencial muy tranquilo y seguro de Madrid. Estaba cansado de vivir en el centro ruidoso.

Mi estudio es de una sola habitación pero es muy moderno y luminoso. Pago quinientos cincuenta euros al mes, con los gastos de internet y comunidad incluidos. El casero es un señor muy amable. Él me dejó las llaves de la casa tras firmar el contrato y pagar dos meses de fianza.

Ayer por la tarde hice el transporte de mis muebles con un camión de mudanzas. Compré una cama de matrimonio nueva para mi dormitorio porque la antigua era muy incómoda. La coloqué al lado de la ventana para tener luz natural por la mañana. También compré un armario blanco muy amplio para guardar mis chaquetas y pantalones.

En el salón, que está en el mismo espacio, puse un sofá gris de tres plazas, una mesa pequeña de madera para comer y dos sillas cómodas. Encima de la mesa de comer he puesto un jarrón con flores que me regaló mi madre. En la cocina hay microondas, nevera, horno y lavavajillas. Me encanta usar el lavavajillas porque me ahorra mucho tiempo y agua.

Hoy estoy muy cansado por el esfuerzo, pero muy feliz de vivir en un sitio tan acogedor y silencioso. Mi estudio ya está listo y completamente amueblado.`,
      questions: [
        {
          id: 1,
          question: "¿Dónde alquiló Carlos su nuevo estudio?",
          options: [
            "a) En el centro ruidoso de Madrid",
            "b) En un barrio residencial tranquilo y seguro",
            "c) En las afueras de Barcelona",
            "d) En una residencia de estudiantes",
          ],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Cuánto paga de alquiler mensual?",
          options: [
            "a) Cuatrocientos euros",
            "b) Cuarenta y cinco euros",
            "c) Quinientos cincuenta euros",
            "d) Seiscientos euros",
          ],
          correctAnswer: 2,
        },
        {
          id: 3,
          question: "¿Qué gastos están incluidos en su tarifa mensual?",
          options: ["a) Agua y luz", "b) Internet y comunidad", "c) Fianza y garaje", "d) Ninguno"],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "¿Cuántos meses de fianza tuvo que entregar Carlos?",
          options: ["a) Un mes", "b) Dos meses", "c) Tres meses", "d) Ninguno"],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "¿Qué mueble nuevo compró Carlos para su dormitorio?",
          options: [
            "a) Un sofá gris",
            "b) Una cama de matrimonio",
            "c) Una mesa de noche",
            "d) Un espejo grande",
          ],
          correctAnswer: 1,
        },
        {
          id: 6,
          question: "¿Dónde colocó la cama Carlos?",
          options: [
            "a) Al lado de la cocina",
            "b) Detrás de la puerta",
            "c) Al lado de la ventana",
            "d) Enfrente del sofá",
          ],
          correctAnswer: 2,
        },
        {
          id: 7,
          question: "¿De qué color es el armario amplio que compró?",
          options: ["a) Azul claro", "b) Blanco", "c) Negro", "d) Gris"],
          correctAnswer: 1,
        },
        {
          id: 8,
          question: "¿Qué regalo de su madre ha colocado Carlos encima de la mesa?",
          options: [
            "a) Una televisión",
            "b) Un jarrón con flores",
            "c) Un ordenador portátil",
            "d) Una lámpara moderna",
          ],
          correctAnswer: 1,
        },
        {
          id: 9,
          question: "¿Qué electrodoméstico de la cocina le gusta mucho usar porque le ahorra tiempo?",
          options: ["a) El microondas", "b) El horno", "c) La nevera", "d) El lavavajillas"],
          correctAnswer: 3,
        },
        {
          id: 10,
          question: "¿Cómo describe Carlos su estudio al final de la mudanza?",
          options: [
            "a) Oscuro e incómodo",
            "b) Ruidoso y antiguo",
            "c) Acogedor y completamente amueblado",
            "d) Sucio y sin muebles",
          ],
          correctAnswer: 2,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi habitación favorita",
        description:
          "Escribe sobre la habitación favorita de tu casa. Di qué habitación es, qué muebles tiene y por qué te gusta pasar tiempo allí.",
        structure: {
          intro: "Di cuál es tu habitación favorita.",
          body: "Describe el mobiliario (cama, mesa, armario) y su color.",
          conclusion: "Explica por qué te gusta tanto.",
        },
        connectors: [
          "Mi habitación favorita es",
          "Tiene una cama",
          "Al lado de la mesa hay",
          "Me gusta porque es",
        ],
        wordCount: "30-40 palabras",
      },
      optionB: {
        title: "Mi casa ideal",
        description:
          "Escribe sobre cómo es la casa de tus sueños. Di dónde está situada, cuántas plantas tiene y cómo es su salón o jardín.",
        structure: {
          intro: "Di dónde está tu casa ideal.",
          body: "Describe la estructura física, habitaciones y el salón.",
          conclusion: "Di qué actividades te gustaría hacer allí.",
        },
        connectors: [
          "Mi casa ideal está en",
          "Tiene dos plantas y",
          "El salón es muy amplio y",
          "Allí me gustaría",
        ],
        wordCount: "30-40 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Tu vivienda actual",
        description:
          "Describe tu vivienda actual en español durante 1 minuto. Di si es un piso compartido o casa, cuántas habitaciones tiene y describe tu dormitorio.",
        connectors: [
          "Vivo en un piso/casa que está en",
          "Tiene tres habitaciones:",
          "Mi dormitorio es bastante",
          "En mi habitación hay",
          "Lo que más me gusta es",
        ],
        guideQuestions: [
          "¿Vives en una casa o en un piso?",
          "¿Dónde está ubicada tu vivienda?",
          "¿Cuántas habitaciones tiene tu casa?",
          "¿Cómo es físicamente tu dormitorio?",
          "¿Con quién compartes la vivienda?",
        ],
      },
      topic2: {
        title: "Las tareas de casa",
        description:
          "Habla sobre cómo organizas las tareas domésticas en tu vivienda durante 1 minuto. Di qué haces tú y qué hacen tus compañeros o familia.",
        connectors: [
          "En mi casa compartimos",
          "Yo normalmente me encargo de",
          "Mi compañero limpia",
          "Antes de comer",
          "Después de cenar",
        ],
        guideQuestions: [
          "¿Quién limpia las zonas comunes de tu vivienda?",
          "¿Qué tareas de casa haces tú habitualmente?",
          "¿Te gusta cocinar o prefieres fregar los platos?",
          "¿A qué hora soléis limpiar el fin de semana?",
          "¿Consideras que tu casa está siempre limpia y ordenada?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero habéis alquilado un piso nuevo de estudiantes en el centro de Madrid y necesitáis poneros de acuerdo sobre la distribución y compra de los muebles para el salón-comedor común.",
      questions: [
        {
          question:
            "Pregúntale a tu compañero de piso qué mueble prefiere poner en el centro del salón: si un sofá de tres plazas o una mesa de estudio amplia.",
          help: "Usa: ¿Qué prefieres poner en...? / ¿Un sofá o una mesa? / Creo que es mejor...",
          usefulPhrases: [
            "¿Qué mueble prefieres colocar en medio del salón?",
            "Yo creo que un sofá gris grande es indispensable para descansar.",
            "¿Y dónde ponemos la mesa de estudio?",
            "Al lado de la ventana entra más luz natural.",
          ],
        },
        {
          question:
            "Proponle comprar un televisor de pantalla plana y pregúntale de qué color quiere pintar las paredes del salón.",
          help: "Usa: ¿Y si compramos una televisión...? / ¿De qué color pintamos las paredes? / Prefiero el blanco...",
          usefulPhrases: [
            "¿Compramos un televisor de pantalla plana para ver series?",
            "¿De qué color te gustaría pintar las paredes?",
            "Un tono gris claro o blanco haría el salón más luminoso.",
            "A mí me gusta la idea.",
          ],
        },
        {
          question:
            "Discutid el presupuesto de la compra y decidid de forma educada si preferís pagar a medias o solicitar ayuda económica (beca/padres).",
          help: "Usa: ¿Cuánto dinero queremos gastar? / ¿Pagamos a medias? / Es un poco caro...",
          usefulPhrases: [
            "¿Cuánto dinero podemos gastar entre los dos?",
            "Los muebles de madera son muy caros en el centro.",
            "Podemos pagar a medias los gastos del sofá.",
            "¡Perfecto, me parece una gran idea!",
          ],
        },
      ],
    },
  },
  {
    id: 24,
    level: "A1",
    theme: "La familia y las celebraciones",
    icon: "Gift",
    vocabulary: [
      {
        word: "abuelo",
        definition: "Padre del padre o de la madre",
        chinese: "爷爷/外公",
        example: "Mi abuelo tiene setenta años hoy.",
      },
      {
        word: "nieto",
        definition: "Hijo del hijo o de la hija",
        chinese: "孙子/外孙",
        example: "Soy el nieto mayor de mi abuela Carmen.",
      },
      {
        word: "cumpleaños",
        definition: "Aniversario de nacimiento de alguien",
        chinese: "生日",
        example: "El cumpleaños de mi madre es el primero de mayo.",
      },
      {
        word: "tarta",
        definition: "Pastel dulce de celebración con velas",
        chinese: "蛋糕",
        example: "Soplamos las velas de la tarta de chocolate.",
      },
      {
        word: "regalo",
        definition: "Objeto de cortesía que entregas gratis",
        chinese: "礼物",
        example: "Compro un regalo precioso para mi tía.",
      },
      {
        word: "invitar",
        definition: "Llamar formalmente a alguien a una fiesta",
        chinese: "邀请",
        example: "Quiero invitar a mis compañeros de clase a comer.",
      },
      {
        word: "fiesta",
        definition: "Reunión social para divertirse y celebrar",
        chinese: "派对/聚会",
        example: "Preparamos una fiesta sorpresa espectacular.",
      },
      {
        word: "celebrar",
        definition: "Festejar un suceso especial con alegría",
        chinese: "庆祝",
        example: "Celebramos el Año Nuevo en familia.",
      },
    ],
    reading: {
      textType: "narrativo",
      title: "El cumpleaños número setenta de mi abuelo",
      text: `Hola, soy Sofía. Hoy os quiero contar una fiesta de cumpleaños muy especial. El domingo pasado celebramos el cumpleaños número setenta de mi abuelo materno, Miguel. Él es una persona maravillosa, muy educada y cariñosa. Vive en una casa de campo con mi abuela Carmen, cerca de Toledo.

Mis padres y yo preparamos una gran fiesta sorpresa. Invitamos a todos los parientes y amigos de mi abuelo. En total, fuimos veinticinco invitados. Mis tíos y primos vinieron desde Barcelona en tren para la celebración. Mi abuelo no sabía nada; cuando entró en el salón y vio a toda la familia reunida, se puso muy emocionado y feliz. ¡Casi llora de alegría!

La casa estaba decorada de forma espectacular con globos de color dorado y una pancarta grande que decía "¡Feliz cumpleaños, Miguel!". Mi madre preparó una comida deliciosa: cordero asado, ensalada mixta de la huerta y patatas al horno. Para beber, tomamos vino tinto de la casa y agua fría con gas. De postre, mi abuela Carmen sacó una tarta de chocolate de tres pisos. ¡La tarta tenía setenta velas de cera! Todos cantamos la canción de cumpleaños en español y mi abuelo sopló todas las velas de una sola vez. ¡Él tiene muchísima fuerza!

Después de comer, le dimos los regalos. Mis primos le regalaron un libro de fotos antiguas de Toledo. Mi regalo para él fue un reloj de pulsera plateado muy moderno. Él me dio un fuerte abrazo y un beso gigante en la mejilla, y me dio las gracias atentamente. Fue un día inolvidable para toda nuestra familia.`,
      questions: [
        {
          id: 1,
          question: "¿Cuántos años cumplió el abuelo Miguel?",
          options: ["a) Sesenta años", "b) Sesenta y cinco", "c) Setenta años", "d) Ochenta años"],
          correctAnswer: 2,
          explanation: 'El texto dice: "celebramos el cumpleaños número setenta de mi abuelo materno".',
        },
        {
          id: 2,
          question: "¿Dónde vive el abuelo Miguel con la abuela Carmen?",
          options: [
            "a) En un piso céntrico de Madrid",
            "b) En una residencia de estudiantes",
            "c) En una casa de campo cerca de Toledo",
            "d) En la costa de Cádiz",
          ],
          correctAnswer: 2,
          explanation: 'El texto dice: "Vive en una casa de campo con mi abuela Carmen, cerca de Toledo".',
        },
        {
          id: 3,
          question: "¿Qué tipo de fiesta prepararon para el abuelo?",
          options: [
            "a) Una cena de Navidad",
            "b) Una fiesta sorpresa",
            "c) Una reunión formal de negocios",
            "d) Una boda civil",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Mis padres y yo preparamos una gran fiesta sorpresa".',
        },
        {
          id: 4,
          question: "¿Cuántos invitados vinieron a la celebración en total?",
          options: ["a) Diez", "b) Doce", "c) Veinte", "d) Veinticinco"],
          correctAnswer: 3,
          explanation: 'El texto dice: "En total, fuimos veinticinco invitados".',
        },
        {
          id: 5,
          question: "¿De qué ciudad vinieron los tíos y primos del narrador?",
          options: ["a) De Madrid", "b) De Barcelona", "c) De Sevilla", "d) De Pekín"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Mis tíos y primos vinieron desde Barcelona".',
        },
        {
          id: 6,
          question: "¿De qué color eran los globos para decorar la casa?",
          options: ["a) Rojos y negros", "b) Plateados y celestes", "c) Dorados", "d) Rosas y blancos"],
          correctAnswer: 2,
          explanation:
            'El texto dice: "La casa estaba decorada de forma espectacular con globos de color dorado".',
        },
        {
          id: 7,
          question: "¿Qué comida preparó la madre de Sofía para el almuerzo?",
          options: [
            "a) Paella valenciana",
            "b) Tortilla de patatas",
            "c) Cordero asado, ensalada mixta y patatas",
            "d) Pasta italiana con salsa de tomate",
          ],
          correctAnswer: 2,
          explanation:
            'El texto dice: "Mi madre preparó una comida deliciosa: cordero asado, ensalada mixta de la huerta y patatas al horno".',
        },
        {
          id: 8,
          question: "¿Cuántas velas de cera tenía la tarta de chocolate?",
          options: ["a) Treinta y cinco", "b) Cincuenta", "c) Sesenta y ocho", "d) Setenta"],
          correctAnswer: 3,
          explanation: 'El texto dice: "La tarta tenía setenta velas de cera".',
        },
        {
          id: 9,
          question: "¿Qué le regaló Sofía a su abuelo Miguel?",
          options: [
            "a) Un libro de fotos antiguas",
            "b) Un reloj de pulsera plateado",
            "c) Una chaqueta de abrigo",
            "d) Globos dorados",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Mi regalo para él fue un reloj de pulsera plateado muy moderno".',
        },
        {
          id: 10,
          question: "¿Cómo reaccionó el abuelo al recibir el regalo de Sofía?",
          options: [
            "a) Se enfadó mucho",
            "b) Le dio un fuerte abrazo y un beso",
            "c) No dijo nada",
            "d) Se acostó a dormir",
          ],
          correctAnswer: 1,
          explanation:
            'El texto dice: "Él me dio un fuerte abrazo y un beso gigante en la mejilla, y me dio las gracias".',
        },
      ],
    },
    listening: {
      title: "La fiesta de Año Nuevo en mi familia",
      transcription: `Hola, soy Javier. La Nochevieja es una de mis celebraciones favoritas de todo el año. El treinta y uno de diciembre, mi familia se reúne para celebrar la fiesta de Año Nuevo en la gran casa de mis abuelos paternos en Valencia. Somos casi veinte personas, así que la casa se llena de vida, ruido y muchísimas risas.

La cena es espectacular. Mis tías y mi madre preparan cordero asado, pescado fresco al horno y marisco de la costa. De postre, comemos turrón y uvas dulces de mesa. Charlamos cariñosamente sobre todo lo que ha ocurrido durante el año y prometemos visitarnos más a menudo en el porvenir.

Lo más emocionante ocurre a las doce menos cinco de la noche. Mi abuelo enciende la televisión del salón para ver las doce campanadas de la Puerta del Sol de Madrid. Cada invitado coge una taza con exactamente doce uvas, una por cada campanada. Es una tradición española muy antigua que trae buena suerte para el año nuevo. ¡Hay que comerlas súper rápido, una cada tres segundos! Al principio yo me hago un lío, pero siempre termino a tiempo.

Después de las doce campanadas, nos abrazamos, nos damos dos besos y nos felicitamos el Año Nuevo deseando salud para todos. Los niños abren los regalos de Reyes a la una de la madrugada bajo el árbol de Navidad de la terraza. ¡Todos estamos muy felices e ilusionados con el año que empieza!`,
      questions: [
        {
          id: 1,
          question: "¿Qué celebración describe Javier como su favorita?",
          options: [
            "a) Su cumpleaños",
            "b) El Día del Trabajo",
            "c) La Nochevieja (Año Nuevo)",
            "d) La Pascua",
          ],
          correctAnswer: 2,
        },
        {
          id: 2,
          question: "¿Dónde se reúne la familia de Javier para cenar?",
          options: [
            "a) En un restaurante de comida rápida",
            "b) En casa de sus tíos en Barcelona",
            "c) En la casa de sus abuelos en Valencia",
            "d) En la costa de Cádiz",
          ],
          correctAnswer: 2,
        },
        {
          id: 3,
          question: "¿Cuántas personas se reúnen en la cena aproximadamente?",
          options: ["a) Seis", "b) Diez", "c) Veinte", "d) Veinticinco"],
          correctAnswer: 2,
        },
        {
          id: 4,
          question: "¿Qué comen de postre en la cena?",
          options: [
            "a) Flan casero",
            "b) Tarta de chocolate de tres pisos",
            "c) Turrón y uvas dulces",
            "d) Helado de fresa",
          ],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "¿A qué hora enciende el abuelo la televisión del salón?",
          options: [
            "a) A las diez de la noche",
            "b) A las once y media",
            "c) A las doce menos cinco",
            "d) A la una de la madrugada",
          ],
          correctAnswer: 2,
        },
        {
          id: 6,
          question: "¿De qué plaza española son las doce campanadas oficiales de Año Nuevo?",
          options: [
            "a) Plaza Mayor de Sevilla",
            "b) Puerta del Sol de Madrid",
            "c) Plaza Nueva de Granada",
            "d) Plaza de España de Barcelona",
          ],
          correctAnswer: 1,
        },
        {
          id: 7,
          question: "¿Cuántas uvas debe comer cada invitado según la tradición?",
          options: ["a) Cinco", "b) Diez", "c) Doce", "d) Quince"],
          correctAnswer: 2,
        },
        {
          id: 8,
          question: "¿Qué cree la tradición española que trae comer las doce uvas?",
          options: [
            "a) Mucho dinero",
            "b) Gran éxito y buena suerte",
            "c) Un viaje sorpresa",
            "d) Un coche nuevo",
          ],
          correctAnswer: 1,
        },
        {
          id: 9,
          question: "¿Qué se dan los invitados después de las campanadas de medianoche?",
          options: [
            "a) Un regalo tecnológico",
            "b) Abrazos y dos besos",
            "c) Una tarta de chocolate",
            "d) La cuenta de la cena",
          ],
          correctAnswer: 1,
        },
        {
          id: 10,
          question: "¿A qué hora abren los regalos los niños de la familia?",
          options: [
            "a) A las doce menos diez",
            "b) A las doce en punto",
            "c) A la una de la madrugada",
            "d) A las ocho de la mañana",
          ],
          correctAnswer: 2,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi último cumpleaños",
        description:
          "Escribe sobre la celebración de tu último cumpleaños. Di qué edad cumpliste, dónde fue la fiesta y qué regalos recibiste.",
        structure: {
          intro: "Di cuántos años cumpliste.",
          body: "Describe la fiesta, comida y las personas que vinieron.",
          conclusion: "Menciona tu regalo favorito.",
        },
        connectors: [
          "Mi último cumpleaños fue el",
          "Cumplí veinte años y",
          "Vinieron mis amigos de",
          "Mi regalo favorito fue un",
        ],
        wordCount: "30-40 palabras",
      },
      optionB: {
        title: "Una fiesta tradicional en mi país",
        description:
          "Escribe sobre una fiesta o celebración tradicional muy importante en tu país. Di cuándo es, qué come la gente y por qué te gusta.",
        structure: {
          intro: "Presenta el nombre de la celebración.",
          body: "Explica cuándo se celebra y qué tradiciones se hacen.",
          conclusion: "Menciona la comida típica.",
        },
        connectors: [
          "Una fiesta muy importante es",
          "Se celebra en el mes de",
          "La gente se reúne para",
          "Comemos platos tradicionales como",
        ],
        wordCount: "30-40 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Un miembro de tu familia",
        description:
          "Describe a un miembro de tu familia durante 1 minuto. Di quién es, cómo se llama, qué edad tiene, a qué se dedica y cómo es su físico y personalidad.",
        connectors: [
          "Quiero hablar de mi",
          "Se llama",
          "Tiene cuarenta años y es",
          "Es una persona muy",
          "Físicamente es alto/a y tiene",
        ],
        guideQuestions: [
          "¿De qué miembro de tu familia quieres hablar?",
          "¿Cómo se llama y qué edad tiene?",
          "¿A qué se dedica (trabaja o estudia)?",
          "¿Cómo es su personalidad (simpático, inteligente, alegre)?",
          "¿Cómo es físicamente (ojos, pelo, alto/bajo)?",
        ],
      },
      topic2: {
        title: "Tu fiesta favorita",
        description:
          "Habla sobre tu fiesta o celebración favorita del año durante 1 minuto. Explica cuándo se celebra, con quién la pasas y qué hacéis.",
        connectors: [
          "Mi fiesta favorita del año es",
          "Se celebra el",
          "Me reúno con mi",
          "Lo que más me gusta es",
          "Ese día comemos",
        ],
        guideQuestions: [
          "¿Cuál es tu celebración preferida?",
          "¿En qué fecha se celebra?",
          "¿Con quién te reúnes para celebrar?",
          "¿Qué actividades especiales hacéis ese día?",
          "¿Cuál es la comida típica de esa fiesta?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero sois primos y queréis organizar juntos una fiesta de cumpleaños sorpresa espectacular para vuestro abuelo materno Miguel en su casa de campo.",
      questions: [
        {
          question:
            "Pregúntale a tu primo dónde prefiere hacer la fiesta sorpresa: si en el salón de casa de los abuelos o en la terraza del jardín exterior.",
          help: "Usa: ¿Dónde hacemos la fiesta? / ¿En el salón o en el jardín? / Creo que en la terraza...",
          usefulPhrases: [
            "Hola primo, ¿dónde hacemos la fiesta de nuestro abuelo?",
            "Yo prefiero la terraza del jardín porque es amplia y luminosa.",
            "En el salón hace mucho calor en agosto.",
            "¡Perfecto, el jardín es una gran idea!",
          ],
        },
        {
          question:
            "Proponle invitar a todos los tíos y primos de Barcelona y decidid qué comida y bebida vais a preparar.",
          help: "Usa: Podemos invitar a... / ¿Qué comida preparamos? / ¿Paella, asado o tarta?",
          usefulPhrases: [
            "Podemos invitar a todos nuestros tíos y primos de Barcelona.",
            "Ellos vendrán en tren el viernes por la tarde.",
            "De comida, ¿preparamos paella o asado de cordero?",
            "Mi abuela Carmen puede preparar una tarta de chocolate gigante.",
          ],
        },
        {
          question:
            "Discutid qué regalo vais a comprar entre los dos y cuánto dinero queréis gastar en total.",
          help: "Usa: ¿Qué regalo le compramos? / ¿Cuánto dinero ponemos? / Yo puedo poner... euros.",
          usefulPhrases: [
            "¿Qué regalo de cumpleaños le compramos entre los dos?",
            "Un reloj de pulsera plateado sería un detalle precioso.",
            "¿Cuánto dinero podemos gastar en total?",
            "Yo puedo poner cincuenta euros. ¿Y tú?",
          ],
        },
      ],
    },
  },
  {
    id: 25,
    level: "A1",
    theme: "Las vacaciones, el hotel y el transporte",
    icon: "Sun",
    vocabulary: [
      {
        word: "vacaciones",
        definition: "Días libres sin trabajo o estudio",
        chinese: "假期",
        example: "Mis vacaciones de verano son en el mes de agosto.",
      },
      {
        word: "playa",
        definition: "Terreno de arena fina cerca del mar",
        chinese: "海滩",
        example: "Voy a la playa con mi familia para nadar y tomar el sol.",
      },
      {
        word: "hotel",
        definition: "Lugar de alojamiento temporal para viajeros",
        chinese: "酒店",
        example: "Reservo una habitación doble en un hotel cerca del mar.",
      },
      {
        word: "tren",
        definition: "Medio de transporte rápido sobre vías de hierro",
        chinese: "火车",
        example: "Viajo a Cádiz en un tren de alta velocidad muy cómodo.",
      },
      {
        word: "bañador",
        definition: "Prenda de ropa que se usa para nadar",
        chinese: "泳衣",
        example: "Compro un bañador de color azul para ir a la playa.",
      },
      {
        word: "mar",
        definition: "Gran masa de agua salada que cubre la Tierra",
        chinese: "大海",
        example: "Me encanta bañarme en el mar y escuchar el sonido de las olas.",
      },
      {
        word: "reserva",
        definition: "Acción de guardar un alojamiento o mesa con antelación",
        chinese: "预订",
        example: "Tengo una reserva confirmada para tres noches.",
      },
      {
        word: "maleta",
        definition: "Caja o bolsa grande para llevar ropa en un viaje",
        chinese: "行李箱",
        example: "Hago la maleta de viaje la noche anterior.",
      },
    ],
    reading: {
      textType: "narrativo",
      title: "Mis vacaciones en Cádiz",
      text: `Hola, me llamo Li Na. Soy de Pekín, China. El verano pasado viajé a España para pasar unas vacaciones inolvidables. Elegí la hermosa ciudad de Cádiz, que está en el sur de la península.

Fui con mi hermano mayor en un tren de alta velocidad desde Madrid. El viaje duró unas cuatro horas y fue muy cómodo porque el tren era moderno y limpio. Reservamos una habitación doble en un hotel pequeño que estaba justo al lado de la playa. Desde nuestra ventana podíamos ver el mar azul y oír las olas por la noche.

Por las mañanas, íbamos a la playa temprano. Yo nadaba en el mar durante dos horas y mi hermano prefería leer libros de aventuras bajo la sombrilla. Comíamos en un restaurante de la playa. Siempre pedíamos pescado fresco, patatas fritas y una ensalada de tomate deliciosa. Por las tardes, volvíamos al hotel y descansábamos un rato en la piscina de la terraza. Me gustó mucho la ciudad porque la gente es muy amable, alegre y acogedora. Estábamos tristes el último día porque no queríamos irnos.`,
      questions: [
        {
          id: 1,
          question: "¿De dónde es la protagonista de la historia?",
          options: ["a) De Madrid", "b) De Cádiz", "c) De Pekín, China", "d) De Sevilla"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Hola, me llamo Li Na. Soy de Pekín, China".',
        },
        {
          id: 2,
          question: "¿Con quién viajó Li Na a Cádiz?",
          options: ["a) Con sus padres", "b) Con su hermano mayor", "c) Con sus amigos", "d) Sola"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Fui con mi hermano mayor".',
        },
        {
          id: 3,
          question: "¿Qué medio de transporte usaron para viajar desde Madrid?",
          options: [
            "a) Un autobús público",
            "b) Un coche de alquiler",
            "c) Un tren de alta velocidad",
            "d) Un avión directo",
          ],
          correctAnswer: 2,
          explanation: 'El texto dice: "Fui con mi hermano mayor en un tren de alta velocidad desde Madrid".',
        },
        {
          id: 4,
          question: "¿Cuánto tiempo duró el viaje en tren?",
          options: ["a) Dos horas", "b) Tres horas", "c) Cuatro horas", "d) Cinco horas"],
          correctAnswer: 2,
          explanation: 'El texto dice: "El viaje duró unas cuatro horas".',
        },
        {
          id: 5,
          question: "¿Dónde estaba situado el hotel de los hermanos?",
          options: [
            "a) En una montaña tranquila",
            "b) Justo al lado de la playa",
            "c) Lejos del mar, en el centro",
            "d) Cerca de la estación de tren",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "un hotel pequeño que estaba justo al lado de la playa".',
        },
        {
          id: 6,
          question: "¿Qué se podía ver desde la ventana de la habitación?",
          options: ["a) El parque central", "b) Las montañas lejanas", "c) El mar azul", "d) La plaza mayor"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Desde nuestra ventana podíamos ver el mar azul".',
        },
        {
          id: 7,
          question: "¿Qué actividad prefería hacer el hermano de Li Na en la playa?",
          options: [
            "a) Nadar en el mar hondo",
            "b) Hacer fotos con la cámara",
            "c) Jugar al fútbol con amigos",
            "d) Leer libros de aventuras",
          ],
          correctAnswer: 3,
          explanation: 'El texto dice: "mi hermano prefería leer libros de aventuras bajo la sombrilla".',
        },
        {
          id: 8,
          question: "¿Dónde comían los hermanos al mediodía?",
          options: [
            "a) En el comedor del hotel",
            "b) En un restaurante de la playa",
            "c) En su propia habitación",
            "d) En casa de unos tíos españoles",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Comíamos en un restaurante de la playa".',
        },
        {
          id: 9,
          question: "¿Qué pedían siempre para almorzar?",
          options: [
            "a) Carne asada y arroz",
            "b) Paella mixta y pollo",
            "c) Pescado fresco y ensalada de tomate",
            "d) Pasta italiana y sopa",
          ],
          correctAnswer: 2,
          explanation:
            'El texto dice: "Siempre pedíamos pescado fresco, patatas fritas y una ensalada de tomate deliciosa".',
        },
        {
          id: 10,
          question: "¿Qué hacían por las tardes tras volver de la playa?",
          options: [
            "a) Estudiaban gramática en el aula",
            "b) Paseaban por el centro de salud",
            "c) Descansaban en la piscina de la terraza",
            "d) Iban de compras al centro comercial",
          ],
          correctAnswer: 2,
          explanation:
            'El texto dice: "Por las tardes, volvíamos al hotel y descansábamos un rato en la piscina de la terraza".',
        },
      ],
    },
    listening: {
      title: "Un viaje de fin de semana en coche",
      transcription: `Hola, soy Carlos. El fin de semana pasado hice un viaje de vacaciones estupendo en coche con mis amigos de la universidad. Fuimos a un pueblo de montaña muy bonito y tranquilo cerca de Madrid.

Salimos el sábado por la mañana a las ocho en punto de la mañana para evitar el tráfico. El viaje en coche duró solo una hora y media porque la autopista estaba despejada. Hacía un tiempo magnífico, con mucho sol, cielo azul y un aire muy fresco y limpio. Al llegar, dejamos nuestras maletas en una casa rural acogedora que tiene un jardín grande con piscina.

Por la tarde, caminamos por los senderos del bosque y vimos muchos animales en libertad, como caballos salvajes, vacas y pájaros de muchos colores. Mi amiga Laura hizo muchas fotografías bonitas con su cámara nueva. Por la noche, preparamos carne de cerdo asada en la barbacoa del jardín, cenamos todos juntos y hablamos de nuestros planes de estudio para el año que viene. Volvimos a casa el domingo por la tarde a las ocho de la tarde. Fue un viaje fantástico porque me relaja muchísimo estar rodeado de naturaleza.`,
      questions: [
        {
          id: 1,
          question: "¿Quién cuenta su experiencia de viaje en la grabación?",
          options: ["a) Roberto", "b) Carlos", "c) David", "d) Pablo"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Con quién viajó el protagonista el fin de semana pasado?",
          options: [
            "a) Con sus padres y abuelos",
            "b) Con sus compañeros de oficina",
            "c) Con sus amigos de la universidad",
            "d) Solo, de mochilero",
          ],
          correctAnswer: 2,
        },
        {
          id: 3,
          question: "¿Qué medio de transporte utilizaron para ir al pueblo?",
          options: [
            "a) Un tren de alta velocidad",
            "b) Un autobús interurbano",
            "c) Su propio coche",
            "d) Una bicicleta de montaña",
          ],
          correctAnswer: 2,
        },
        {
          id: 4,
          question: "¿A qué hora salieron de viaje el sábado por la mañana?",
          options: [
            "a) A las siete en punto",
            "b) A las ocho en punto",
            "c) A las nueve de la mañana",
            "d) Al mediodía",
          ],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "¿Cuánto tiempo duró el viaje en coche por carretera?",
          options: [
            "a) Una hora justa",
            "b) Una hora y media",
            "c) Dos horas enteras",
            "d) Tres horas y cuarto",
          ],
          correctAnswer: 1,
        },
        {
          id: 6,
          question: "¿Cómo era el clima durante el viaje de fin de semana?",
          options: [
            "a) Hacía mucho frío y soplaba viento",
            "b) Llovía intensamente y estaba nublado",
            "c) Hacía un tiempo magnífico con mucho sol",
            "d) Estaba nevando en la carretera",
          ],
          correctAnswer: 2,
        },
        {
          id: 7,
          question: "¿Dónde se alojaron al llegar al pueblo de montaña?",
          options: [
            "a) En un hotel de cinco estrellas",
            "b) En un albergue juvenil barato",
            "c) En una casa rural acogedora",
            "d) En un camping cerca del río",
          ],
          correctAnswer: 2,
        },
        {
          id: 8,
          question: "¿Qué actividad deportiva o recreativa hicieron por la tarde?",
          options: [
            "a) Nadaron en el mar hondo",
            "b) Caminaron por los senderos del bosque",
            "c) Fueron de compras al centro comercial",
            "d) Leyeron novelas en la biblioteca pública",
          ],
          correctAnswer: 1,
        },
        {
          id: 9,
          question: "¿Qué comieron para cenar el sábado por la noche en el jardín?",
          options: [
            "a) Sopa de verduras caliente",
            "b) Paella tradicional de marisco",
            "c) Carne de cerdo asada en la barbacoa",
            "d) Pizza y pasta italiana",
          ],
          correctAnswer: 2,
        },
        {
          id: 10,
          question: "¿A qué hora volvieron de su viaje el domingo por la tarde?",
          options: [
            "a) A las seis en punto",
            "b) A las siete de la tarde",
            "c) A las ocho de la tarde",
            "d) A las diez de la noche",
          ],
          correctAnswer: 2,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mis vacaciones ideales",
        description:
          "Escribe un texto corto sobre tus vacaciones ideales. Incluye: a dónde quieres ir, con quién, qué medio de transporte prefieres y qué actividades quieres hacer.",
        structure: {
          intro: "Di cuál es tu destino de vacaciones favorito.",
          body: "Explica con quién quieres ir y cómo vas a viajar.",
          conclusion: "Describe las actividades que te gustaría realizar allí.",
        },
        connectors: [
          "Mis vacaciones ideales son en",
          "Quiero viajar con",
          "Prefiero ir en",
          "Allí me gustaría",
        ],
        wordCount: "40-60 palabras",
      },
      optionB: {
        title: "Un hotel que recuerdo",
        description:
          "Describe un hotel donde estuviste de vacaciones. Incluye: cómo se llamaba, dónde estaba situado, cómo era tu habitación y si te gustó el desayuno incluido.",
        structure: {
          intro: "Di el nombre y la ubicación del hotel.",
          body: "Describe la habitación y los muebles principales.",
          conclusion: "Explica si te gustó el servicio de desayuno y la piscina.",
        },
        connectors: [
          "Estuve en un hotel llamado",
          "Estaba cerca de",
          "Mi habitación era muy",
          "El desayuno incluido estaba",
        ],
        wordCount: "40-60 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Tu último viaje de vacaciones",
        description:
          "Habla sobre tus últimas vacaciones durante 1 minuto. Di a dónde fuiste, con quién, qué transporte usaste y qué comida típica probaste allí.",
        connectors: [
          "En mis últimas vacaciones fui a",
          "Viajé con mi",
          "Fuimos en",
          "Allí comimos",
          "Lo que más me gustó fue",
        ],
        guideQuestions: [
          "¿A dónde fuiste en tus últimas vacaciones?",
          "¿Con quién realizaste el viaje?",
          "¿Qué medio de transporte utilizaste para llegar?",
          "¿Qué comida o plato típico probaste?",
          "¿Te gustaron las vacaciones y por qué?",
        ],
      },
      topic2: {
        title: "Describir un viaje en tren",
        description:
          "Habla sobre un viaje en tren que recuerdes durante 1 minuto. Di de qué estación saliste, cómo era el tren y qué hiciste durante el trayecto.",
        connectors: [
          "Recuerdo un viaje en tren a",
          "El tren salía de la estación de",
          "El tren era muy",
          "Durante el viaje yo",
        ],
        guideQuestions: [
          "¿A qué ciudad viajaste en tren?",
          "¿De qué estación de tren saliste?",
          "¿Cómo era físicamente el tren?",
          "¿Qué hiciste para pasar el tiempo durante el viaje?",
          "¿Prefieres viajar en tren o en coche?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero de clase queréis organizar unas vacaciones juntos para este verano. Tenéis que poneros de acuerdo sobre el destino, el hotel y el transporte.",
      questions: [
        {
          question:
            "Pregunta a tu compañero si prefiere ir de vacaciones a la playa o a la montaña este verano.",
          help: "Usa: ¿Qué prefieres para las vacaciones? / ¿Te gusta más la playa o la montaña?",
          usefulPhrases: [
            "Hola, ¿qué prefieres para nuestras vacaciones?",
            "¿Te gusta más la playa o la montaña?",
            "Yo prefiero ir a la playa porque me encanta nadar en el mar.",
            "La montaña es preciosa y muy tranquila.",
          ],
        },
        {
          question: "Pregúntale cuántos días queréis pasar de viaje y qué tipo de hotel prefiere reservar.",
          help: "Usa: ¿Cuántos días vamos de viaje? / ¿Qué hotel prefieres reservar?",
          usefulPhrases: [
            "¿Cuántos días queremos estar de viaje?",
            "¿Una semana o diez días?",
            "Prefiero un hotel acogedor que esté cerca de la playa.",
            "Es mejor reservar un hotel con desayuno incluido.",
          ],
        },
        {
          question:
            "Pregúntale qué medio de transporte es mejor para viajar y qué maletas necesitáis llevar.",
          help: "Usa: ¿Cómo viajamos? / ¿En tren, autobús o coche? / ¿Llevamos maleta grande?",
          usefulPhrases: [
            "¿Cómo viajamos hasta allí?",
            "El tren es más rápido y muy cómodo.",
            "Yo tengo coche y podemos viajar por carretera.",
            "Solo necesito llevar mi equipaje de mano y una mochila.",
          ],
        },
      ],
    },
  },
  {
    id: 26,
    level: "A1",
    theme: "El clima, las estaciones y la ropa",
    icon: "Shirt",
    vocabulary: [
      {
        word: "clima",
        definition: "Conjunto de condiciones atmosféricas de una zona o estación",
        chinese: "气候",
        example: "El clima de Madrid en invierno es muy seco y frío.",
      },
      {
        word: "tormenta",
        definition: "Lluvia muy fuerte con viento, rayos y truenos",
        chinese: "暴风雨/雷雨",
        example: "Hay una tormenta fuerte y por eso no puedo salir a correr.",
      },
      {
        word: "chaqueta",
        definition: "Prenda de ropa con mangas que sirve para abrigarse",
        chinese: "夹克/外套",
        example: "Llevo una chaqueta gorda porque hoy hace mucho frío.",
      },
      {
        word: "paraguas",
        definition: "Objeto plegable que sirve para protegerse de la lluvia",
        chinese: "雨伞",
        example: "No olvides coger tu paraguas porque el cielo está gris.",
      },
      {
        word: "frío",
        definition: "Temperatura muy baja que causa sensación de heladez",
        chinese: "冷",
        example: "En invierno hace mucho frío y por eso llevo bufanda.",
      },
      {
        word: "nieve",
        definition: "Agua helada que cae de las nubes en copos blancos y finos",
        chinese: "雪",
        example: "A los niños les encanta jugar con la nieve blanca en el parque.",
      },
      {
        word: "bufanda",
        definition: "Prenda de ropa larga que abriga el cuello",
        chinese: "围巾",
        example: "Llevo mi bufanda de lana favorita para proteger el cuello.",
      },
      {
        word: "nublado",
        definition: "Cielo cubierto de nubes grises que tapan el sol",
        chinese: "阴天的",
        example: "Hoy el día está completamente nublado y parece que va a llover.",
      },
    ],
    reading: {
      textType: "descriptivo",
      title: "Un día de invierno en Madrid",
      text: `Hola, soy Pedro. Vivo en Madrid, la capital de España. Hoy quiero hablaros de cómo es un día normal de invierno en mi ciudad. En invierno, especialmente en el mes de enero, hace muchísimo frío aquí y el clima es muy seco.

Hoy me desperté a las siete de la mañana y miré por la ventana de mi dormitorio. El cielo estaba completamente nublado, de color gris oscuro, y no se podía ver el sol. Mi madre me dijo por la mañana que por la tarde habría una tormenta fuerte con lluvia intensa y viento frío. Por eso, decidí vestirme con ropa de mucho abrigo para ir a estudiar. Me puse unos pantalones vaqueros negros, un jersey de lana gris, mi chaqueta más gorda de color rojo y una bufanda azul.

Salí de casa con mi paraguas a las ocho de la mañana. Fui al instituto en metro porque cuando hace mal tiempo prefiero evitar andar a pie por la calle. Durante el recreo, empezó a llover muchísimo y soplaba un viento helado. Mis compañeros de clase y yo decidimos quedarnos en la biblioteca leyendo y charlando tranquilamente. Me gusta el invierno porque por las noches me encanta estar en casa con mi familia tomando una sopa de verduras caliente en el comedor.`,
      questions: [
        {
          id: 1,
          question: "¿Dónde vive el protagonista del texto?",
          options: ["a) En Barcelona", "b) En Sevilla", "c) En Madrid", "d) En Valencia"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Vivo en Madrid, la capital de España".',
        },
        {
          id: 2,
          question: "¿En qué mes hace especialmente mucho frío según Pedro?",
          options: ["a) En diciembre", "b) En enero", "c) En febrero", "d) En noviembre"],
          correctAnswer: 1,
          explanation: 'El texto dice: "En invierno, especialmente en el mes de enero, hace muchísimo frío".',
        },
        {
          id: 3,
          question: "¿A qué hora se despertó el joven hoy?",
          options: [
            "a) A las seis de la mañana",
            "b) A las siete de la mañana",
            "c) A las ocho en punto",
            "d) A las nueve de la mañana",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Hoy me desperté a las siete de la mañana".',
        },
        {
          id: 4,
          question: "¿Cómo estaba el cielo por la mañana al mirar por la ventana?",
          options: [
            "a) Completamente despejado",
            "b) Completamente nublado y gris",
            "c) Con sol brillante",
            "d) Nevando en abundancia",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "El cielo estaba completamente nublado, de color gris oscuro".',
        },
        {
          id: 5,
          question: "¿Quién avisó a Pedro sobre la tormenta de la tarde?",
          options: [
            "a) Su profesor de inglés",
            "b) Su compañero de clase",
            "c) Su madre por la mañana",
            "d) La televisión de la sala",
          ],
          correctAnswer: 2,
          explanation:
            'El texto dice: "Mi madre me dijo por la mañana que por la tarde habría una tormenta fuerte".',
        },
        {
          id: 6,
          question: "¿De qué color es la bufanda de abrigo de Pedro?",
          options: ["a) Gris claro", "b) Negra y gorda", "c) Azul oscuro", "d) Roja y llamativa"],
          correctAnswer: 2,
          explanation: 'El texto dice: "y una bufanda azul".',
        },
        {
          id: 7,
          question: "¿Qué objeto cogió para protegerse de la lluvia antes de salir?",
          options: [
            "a) Un paraguas",
            "b) Un sombrero gordo",
            "c) Una mochila impermeable",
            "d) Una gabardina azul",
          ],
          correctAnswer: 0,
          explanation: 'El texto dice: "Salí de casa con mi paraguas".',
        },
        {
          id: 8,
          question: "¿Cómo se trasladó Pedro hasta el instituto?",
          options: [
            "a) Fue andando a pie",
            "b) Fue en metro",
            "c) Fue en autobús",
            "d) Fue en coche con sus padres",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Fui al instituto en metro".',
        },
        {
          id: 9,
          question: "¿Dónde pasaron el tiempo de recreo Pedro y sus compañeros?",
          options: [
            "a) Jugando al fútbol en el patio",
            "b) Comiendo en la cafetería",
            "c) Leyendo y charlando en la biblioteca",
            "d) Comprando libros en la librería",
          ],
          correctAnswer: 2,
          explanation: 'El texto dice: "decidimos quedarnos en la biblioteca leyendo y charlando".',
        },
        {
          id: 10,
          question: "¿Qué prefiere tomar Pedro por las noches en casa?",
          options: [
            "a) Un chocolate caliente",
            "b) Un vaso de agua con gas",
            "c) Una sopa de verduras caliente",
            "d) Una tostada de tomate",
          ],
          correctAnswer: 2,
          explanation:
            'El texto dice: "me encanta estar en casa con mi familia tomando una sopa de verduras caliente".',
        },
      ],
    },
    listening: {
      title: "Un paseo por la nieve con amigos",
      transcription: `Hola, soy Lucía. El fin de semana pasado fuimos a la montaña porque cayó la primera nevada grande del año en los Pirineos. Hacía muchísimo frío, unos dos grados bajo cero, pero estábamos todos muy contentos e ilusionados de ver la nieve por primera vez.

Fui con mi mejor amiga Elena y mi primo Javier. Todos llevábamos ropa de abrigo adecuada para no enfriarnos: chaquetas de montaña impermeables, guantes negros de lana, bufandas gordas y gorros para proteger la cabeza. Al llegar, todo el paisaje estaba cubierto de nieve blanca y fina. Era precioso, parecía de película.

Jugamos durante dos horas a tirar bolas de nieve y caminamos despacio por los senderos marcados. Después de caminar tanto tiempo, teníamos frío y hambre, así que entramos en una cafetería muy acogedora del pueblo de montaña. Pedimos chocolate caliente con churros tradicionales para merendar. Estaba riquísimo, dulce y caliente, y nos ayudó a recuperar la energía. Volvimos a casa por la tarde a las seis en un autobús de línea. Fue un día de invierno perfecto en la montaña.`,
      questions: [
        {
          id: 1,
          question: "¿Quién es la persona que habla en el audio?",
          options: ["a) Marta", "b) Lucía", "c) Elena", "d) Carmen"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿A dónde viajaron el fin de semana pasado?",
          options: [
            "a) A la playa de Cádiz",
            "b) A la montaña",
            "c) Al zoo municipal",
            "d) Al centro comercial",
          ],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "¿Por qué decidieron realizar ese viaje de fin de semana?",
          options: [
            "a) Porque hacía calor en la ciudad",
            "b) Porque cayó la primera nevada grande",
            "c) Porque era el cumpleaños de Javier",
            "d) Para comprar ropa en tiendas",
          ],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "¿Qué temperatura hacía aproximadamente en la montaña?",
          options: [
            "a) Diez grados de media",
            "b) Cero grados exactos",
            "c) Dos grados bajo cero",
            "d) Cinco grados centígrados",
          ],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "¿De qué color eran los guantes de lana que llevaban?",
          options: ["a) Rojos y alegres", "b) Azules claros", "c) Negros", "d) Blancos y limpios"],
          correctAnswer: 2,
        },
        {
          id: 6,
          question: "¿Con quién viajó la protagonista de la historia?",
          options: [
            "a) Con sus padres y abuelo",
            "b) Con su amiga Elena y su primo Javier",
            "c) Con sus compañeros de oficina",
            "d) Sola con su mascota",
          ],
          correctAnswer: 2,
        },
        {
          id: 7,
          question: "¿Cuánto tiempo jugaron a tirar bolas de nieve?",
          options: ["a) Una hora justa", "b) Dos horas", "c) Tres horas enteras", "d) Cuatro horas y cuarto"],
          correctAnswer: 1,
        },
        {
          id: 8,
          question: "¿Qué tipo de lugar visitaron después de caminar por el bosque?",
          options: [
            "a) Una biblioteca pública grande",
            "b) Una cafetería muy acogedora",
            "c) Un hotel de cinco estrellas",
            "d) Una carnicería tradicional",
          ],
          correctAnswer: 1,
        },
        {
          id: 9,
          question: "¿Qué pidieron para merendar y calentarse del frío?",
          options: [
            "a) Café con leche solo",
            "b) Chocolate caliente con churros",
            "c) Té verde con limón y tostadas",
            "d) Sopa de verduras caliente",
          ],
          correctAnswer: 2,
        },
        {
          id: 10,
          question: "¿Cómo regresaron a casa al final de la tarde?",
          options: [
            "a) En su propio coche",
            "b) En metro subterráneo",
            "c) En un tren rápido",
            "d) En un autobús de línea",
          ],
          correctAnswer: 3,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi ropa de invierno favorita",
        description:
          "Escribe un correo a tu amigo español describiendo tu ropa de invierno favorita. Di qué prendas usas, de qué color son, cuándo las llevas y por qué te gusta el frío.",
        structure: {
          intro: "Saluda y di qué prendas de abrigo usas normalmente.",
          body: "Describe los colores y el material de tu bufanda, chaqueta y pantalones.",
          conclusion: "Explica qué actividad te gusta hacer en el invierno.",
        },
        connectors: [
          "En invierno llevo siempre",
          "Mi chaqueta favorita es de color",
          "Llevo bufanda cuando",
          "Me gusta mucho el invierno porque",
        ],
        wordCount: "40-60 palabras",
      },
      optionB: {
        title: "Un día de lluvia en mi ciudad",
        description:
          "Escribe sobre un día de lluvia en tu ciudad natal. Incluye: cómo está el cielo, qué objeto necesitas llevar siempre contigo y qué prefieres comer o beber en casa.",
        structure: {
          intro: "Describe el cielo nublado y el clima de lluvia.",
          body: "Explica qué llevas puesto para no mojarte.",
          conclusion: "Menciona qué plato caliente tomas al volver a casa.",
        },
        connectors: [
          "Cuando llueve en mi ciudad, el cielo está",
          "Siempre salgo de casa con mi",
          "Prefiero viajar en metro porque",
          "Por la noche ceno una",
        ],
        wordCount: "40-60 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Describir la ropa de verano y de invierno",
        description:
          "Habla sobre la diferencia de ropa que llevas en las estaciones de verano e invierno durante 1 minuto. Di qué colores prefieres usar y por qué.",
        connectors: [
          "En verano llevo ropa ligera como",
          "Mis colores favoritos en verano son",
          "Sin embargo, en invierno hace frío y uso",
          "Prefiero el invierno porque",
        ],
        guideQuestions: [
          "¿Qué prendas de ropa usas en la estación de verano?",
          "¿Cuáles son tus colores de ropa preferidos en verano?",
          "¿Qué ropa es obligatoria llevar en invierno para el frío?",
          "¿Llevas paraguas y bufanda de lana?",
          "¿Prefieres la ropa ligera de verano o la de abrigo de invierno?",
        ],
      },
      topic2: {
        title: "Tu clima favorito del año",
        description:
          "Habla sobre tu clima y estación del año favoritos durante 1 minuto. Di qué temperatura hace, cómo está el cielo y qué ropa usas normalmente.",
        connectors: [
          "Mi clima favorito es el",
          "Me encanta la primavera porque",
          "La temperatura es de",
          "Normalmente me visto con",
          "No me gusta el frío porque",
        ],
        guideQuestions: [
          "¿Cuál es tu estación del año favorita y por qué?",
          "¿Qué clima prefieres: calor, frío o templado?",
          "¿Cómo está el cielo normalmente en esa época del año?",
          "¿Qué tipo de ropa usas en esa estación?",
          "¿Qué actividades realizas al aire libre?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero estáis en una gran tienda de ropa del centro de Madrid para elegir un regalo para el cumpleaños de un amigo común de la universidad.",
      questions: [
        {
          question:
            "Pregunta a tu compañero qué tipo de prenda podemos regalar a nuestro amigo y qué talla usa.",
          help: "Usa: ¿Qué le podemos regalar para su cumpleaños? / ¿Qué talla de ropa usa él?",
          usefulPhrases: [
            "Hola, ¿qué le podemos regalar a nuestro amigo?",
            "¿Qué ropa prefieres comprar para su regalo?",
            "Yo creo que una chaqueta o un jersey de lana gris es ideal.",
            "Él usa la talla mediana (talla M), si no me equivoco.",
          ],
        },
        {
          question: "Pregúntale de qué color compramos la ropa y si es mejor de color azul claro o negra.",
          help: "Usa: ¿De qué color la compramos? / ¿Prefieres el azul o el negro?",
          usefulPhrases: [
            "¿De qué color compramos la chaqueta?",
            "El azul claro es muy alegre para el invierno.",
            "El negro es más elegante y combina muy bien con todo.",
            "Me gusta la idea del gris oscuro también.",
          ],
        },
        {
          question:
            "Pregúntale cuánto dinero queremos gastar y si podemos pagar con tarjeta de crédito en caja.",
          help: "Usa: ¿Cuánto dinero podemos gastar? / ¿Aceptan tarjeta en la tienda?",
          usefulPhrases: [
            "¿Cuánto dinero queremos gastar entre los dos?",
            "Tengo treinta euros para el regalo.",
            "Podemos comprar una bufanda y unos guantes si es muy caro.",
            "Sí, en esta tienda aceptan tarjeta de crédito o efectivo.",
          ],
        },
      ],
    },
  },
  {
    id: 27,
    level: "A1",
    theme: "Los animales y las rutinas",
    icon: "PawPrint",
    vocabulary: [
      {
        word: "mascota",
        definition: "Animal doméstico que vive en casa con personas para hacer compañía",
        chinese: "宠物",
        example: "Mi mascota favorita es un perro labrador muy juguetón.",
      },
      {
        word: "perro",
        definition: "Animal doméstico leal y cariñoso que ladra",
        chinese: "狗",
        example: "Saco a pasear a mi perro por el parque todas las tardes.",
      },
      {
        word: "gato",
        definition: "Animal doméstico de carácter independiente que maúlla",
        chinese: "猫",
        example: "Mi gata Lila duerme casi todo el día encima de nuestro sofá.",
      },
      {
        word: "veterinario",
        definition: "Médico especializado en la salud de los animales",
        chinese: "兽医",
        example: "Llevo a mi gata enferma al veterinario para comprar la medicina.",
      },
      {
        word: "pienso",
        definition: "Alimento seco preparado para la nutrición de animales domésticos",
        chinese: "宠物粮/饲料",
        example: "Compro un saco de pienso de carne en la tienda de mascotas.",
      },
      {
        word: "pasear",
        definition: "Caminar para hacer ejercicio, distraerse o sacar a un animal",
        chinese: "散步/遛狗",
        example: "Me gusta pasear con mi perro por el parque al atardecer.",
      },
      {
        word: "responsabilidad",
        definition: "Obligación o deber moral de cuidar de algo o de alguien",
        chinese: "责任",
        example: "Cuidar bien de un animal en casa es una gran responsabilidad.",
      },
      {
        word: "pájaro",
        definition: "Animal que tiene plumas, pico y es capaz de volar por el aire",
        chinese: "鸟",
        example: "El pájaro verde canta alegre por las mañanas desde su jaula.",
      },
    ],
    reading: {
      textType: "descriptivo",
      title: "Mi perro Max y mi gata Lila",
      text: `Hola, me llamo Clara y vivo en Sevilla, una hermosa ciudad del sur de España. En mi casa tenemos dos mascotas que son sumamente importantes para toda mi familia: un perro llamado Max y una gata llamada Lila. Aunque son animales de especies muy diferentes, se llevan extremadamente bien y conviven felices en nuestro hogar.

Max es un perro de raza labrador de tres años. Es muy grande, juguetón, cariñoso y de color marrón claro. Todos los días de la semana, mi padre o yo sacamos a Max a pasear por la mañana antes de ir a trabajar y por la tarde cuando volvemos de nuestras clases. Le encanta correr por el parque detrás de una pelota roja y es muy inteligente. Sabe sentarse de inmediato cuando se lo pido y siempre me espera alegre detrás de la puerta de entrada cuando regreso del instituto.

Lila, por su parte, es una gata de color gris claro con unos ojos verdes preciosos y brillantes. Tiene dos años de edad y es mucho más tranquila, silenciosa e independiente que Max. Pasa casi todo el día durmiendo plácidamente encima de nuestro sofá del salón. Por la noche, se despierta activa, juega con sus juguetes de plástico y come su pienso. Tener animales en casa es una gran responsabilidad porque requiere darles comida de calidad, limpiar sus cosas a diario y llevarlos al veterinario de inmediato cuando están enfermos, pero su cariño nos hace sentir muy felices en casa.`,
      questions: [
        {
          id: 1,
          question: "¿En qué ciudad de España vive Clara con su familia?",
          options: ["a) En Madrid", "b) En Barcelona", "c) En Sevilla", "d) En Granada"],
          correctAnswer: 2,
          explanation: 'El texto dice: "voco en Sevilla, una hermosa ciudad del sur de España".',
        },
        {
          id: 2,
          question: "¿Cuántas mascotas tienen en casa de Clara?",
          options: ["a) Una", "b) Dos", "c) Tres", "d) Cuatro"],
          correctAnswer: 1,
          explanation:
            'El texto dice: "tenemos dos mascotas... un perro llamado Max y una gata llamada Lila".',
        },
        {
          id: 3,
          question: "¿De qué raza específica es el perro Max?",
          options: [
            "a) Es un pastor alemán",
            "b) Es un labrador",
            "c) Es un caniche pequeño",
            "d) Es un perro salchicha",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Max es un perro de raza labrador".',
        },
        {
          id: 4,
          question: "¿Cuántos años de edad tiene el perro Max?",
          options: ["a) Un año", "b) Dos años", "c) Tres años", "d) Cuatro años"],
          correctAnswer: 2,
          explanation: 'El texto dice: "un perro de raza labrador de tres años".',
        },
        {
          id: 5,
          question: "¿De qué color físico es el perro Max?",
          options: ["a) Negro brillante", "b) Blanco puro", "c) Marrón claro", "d) Gris oscuro"],
          correctAnswer: 2,
          explanation: 'El texto dice: "y de color marrón claro".',
        },
        {
          id: 6,
          question: "¿Quién saca a pasear al perro Max habitualmente?",
          options: [
            "a) Solo la madre de Clara",
            "b) El padre de Clara o ella misma",
            "c) El hermano menor de la familia",
            "d) Un vecino muy amable del edificio",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "mi padre o yo sacamos a Max a pasear".',
        },
        {
          id: 7,
          question: "¿Qué actividad le encanta hacer a Max cuando está en el parque?",
          options: [
            "a) Dormir plácidamente bajo un árbol",
            "b) Correr detrás de una pelota roja",
            "c) Nadar en el río hondo",
            "d) Ladrar a las palomas",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Le encanta correr por el parque detrás de una pelota roja".',
        },
        {
          id: 8,
          question: "¿De qué color son los ojos de la gata Lila?",
          options: ["a) Azules claros", "b) Negros", "c) Verdes", "d) Amarillos"],
          correctAnswer: 2,
          explanation: 'El texto dice: "con unos ojos verdes preciosos y brillantes".',
        },
        {
          id: 9,
          question: "¿Dónde pasa la gata Lila casi todo el día durmiendo?",
          options: [
            "a) En la cocina, cerca de la nevera",
            "b) En la alfombra del dormitorio de Clara",
            "c) Encima del sofá del salón",
            "d) En la terraza de la casa",
          ],
          correctAnswer: 2,
          explanation:
            'El texto dice: "Pasa casi todo el día durmiendo plácidamente encima de nuestro sofá del salón".',
        },
        {
          id: 10,
          question: "¿Por qué tener mascotas en casa es una gran responsabilidad?",
          options: [
            "a) Porque el pienso es excesivamente caro",
            "b) Porque hacen mucho ruido por las noches",
            "c) Porque requieren comida, limpieza y atención médica",
            "d) Porque no te permiten ir de vacaciones nunca",
          ],
          correctAnswer: 2,
          explanation:
            'El texto dice: "es una gran responsabilidad porque requiere darles comida de calidad, limpiar sus cosas a diario y llevarlos al veterinario de inmediato".',
        },
      ],
    },
    listening: {
      title: "Una visita al veterinario de urgencia",
      transcription: `Hola, soy Clara. Ayer por la tarde tuvimos un pequeño problema en casa y tuvimos que ir a la clínica del veterinario de urgencia porque Lila, mi gata, no quería comer nada de su pienso y estaba muy triste y débil en un rincón del salón. Normalmente ella es muy activa, come mucho y juega por toda la casa, pero ayer solo quería dormir de forma extraña.

Fuimos rápidamente a la clínica veterinaria que está al lado de la biblioteca pública de mi barrio en Sevilla. La sala de espera estaba muy llena de personas con otros animales domésticos. Había tres perros pequeños nerviosos y un pájaro verde precioso que cantaba en su jaula metálica. Esperamos unos quince minutos pacientemente y finalmente entramos en la consulta del doctor.

El veterinario miró a Lila con muchísimo cuidado y cariño. Le tomó la temperatura con un termómetro, le revisó la garganta, le miró los dientes y la pesó en la báscula. Nos explicó con mucha calma que Lila tenía una pequeña infección en el estómago por comer unas plantas extrañas del jardín. Nos recetó una medicina líquida para dársela con una jeringuilla de plástico y nos recomendó que guardara reposo absoluto en un lugar cálido y tranquilo. Compramos el medicamento en la misma clínica y volvimos a casa. Hoy por la mañana Lila ya está mucho mejor, se ha levantado activa y ha empezado a comer un poco de comida ligera.`,
      questions: [
        {
          id: 1,
          question: "¿Quién es la narradora de la grabación del audio?",
          options: ["a) Laura", "b) Clara", "c) Elena", "d) Marta"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Por qué motivo tuvieron que acudir de urgencia a la clínica?",
          options: [
            "a) Para vacunar al perro Max",
            "b) Porque la gata Lila no quería comer y estaba muy triste",
            "c) Para comprar un saco de pienso de ternera",
            "d) Para adoptar un gato nuevo",
          ],
          correctAnswer: 2,
        },
        {
          id: 3,
          question: "¿Dónde está situada exactamente la clínica veterinaria del barrio?",
          options: [
            "a) Enfrente del gran centro comercial",
            "b) Al lado de la biblioteca pública",
            "c) Cerca de la parada de metro del centro",
            "d) Lejos del pueblo, en el campo",
          ],
          correctAnswer: 2,
        },
        {
          id: 4,
          question: "¿Qué otros animales se encontraban en la sala de espera de la clínica?",
          options: [
            "a) Caballos grandes y vacas",
            "b) Tortugas lentas y peces de colores",
            "c) Tres perros pequeños y un pájaro verde",
            "d) Conejos blancos y gatos",
          ],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "¿Cuánto tiempo tuvieron que esperar antes de entrar en la consulta?",
          options: [
            "a) Cinco minutos escasos",
            "b) Diez minutos",
            "c) Quince minutos",
            "d) Media hora larga",
          ],
          correctAnswer: 2,
        },
        {
          id: 6,
          question: "¿Qué acción realizó primero el médico con la gata Lila?",
          options: [
            "a) Le puso una inyección en la pata",
            "b) La examinó con muchísimo cuidado y cariño",
            "c) Le dio de comer un pienso especial",
            "d) Le limpió las orejas con agua",
          ],
          correctAnswer: 2,
        },
        {
          id: 7,
          question: "¿Qué problema médico o diagnóstico tenía la gata?",
          options: [
            "a) Una fractura en su pata derecha",
            "b) Una pequeña infección en el estómago",
            "c) Un fuerte resfriado con mucha tos",
            "d) Dolor de oídos por la tormenta",
          ],
          correctAnswer: 2,
        },
        {
          id: 8,
          question: "¿A qué se debía la enfermedad de la gata según el veterinario?",
          options: [
            "a) A salir por el barrio de noche",
            "b) A comer unas plantas extrañas del jardín",
            "c) A beber agua fría sin gas",
            "d) A la comida en mal estado de la nevera",
          ],
          correctAnswer: 2,
        },
        {
          id: 9,
          question: "¿Qué tratamiento le recetó el doctor para curarse?",
          options: [
            "a) Unas pastillas grandes difíciles de tomar",
            "b) Una medicina líquida para dársela con jeringuilla",
            "c) Una crema especial para la piel del lomo",
            "d) Sopa de pollo tibia de postre",
          ],
          correctAnswer: 2,
        },
        {
          id: 10,
          question: "¿Cómo se encuentra la gata hoy por la mañana en casa?",
          options: [
            "a) Sigue muy débil y enferma",
            "b) Ya está mucho mejor, activa y come un poco",
            "c) Ha vuelto a tener mucha fiebre alta",
            "d) Sigue en la clínica ingresada",
          ],
          correctAnswer: 1,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi mascota favorita",
        description:
          "Escribe un texto corto sobre tu mascota favorita. Di qué animal es, cómo se llama, qué come habitualmente, cómo es físicamente y con qué frecuencia la sacas a pasear o juegas con ella.",
        structure: {
          intro: "Introduce el animal y su nombre.",
          body: "Describe su aspecto físico (color, tamaño) y su comida preferida.",
          conclusion: "Explica tu rutina diaria de juego o paseo con ella.",
        },
        connectors: [
          "Mi mascota favorita es un",
          "Se llama",
          "Es de color y muy",
          "Todos los días le doy de comer",
          "Por la tarde me gusta pasear con",
        ],
        wordCount: "40-60 palabras",
      },
      optionB: {
        title: "Tener un animal en casa",
        description:
          "Escribe tu opinión sobre tener animales en casa. Explica si es una gran responsabilidad, qué cuidados requiere un gato o un perro y por qué nos hace felices.",
        structure: {
          intro: "Di si tienes animales o te gustaría tenerlos.",
          body: "Explica las responsabilidades de alimentación, limpieza y veterinario.",
          conclusion: "Concluye explicando por qué son buenos compañeros de vida.",
        },
        connectors: [
          "Tener un animal en casa es una",
          "Requiere comprar pienso y limpiar su",
          "Es obligatorio llevarlo al",
          "Me encantan porque hacen mucha",
        ],
        wordCount: "40-60 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "El cuidado de un perro",
        description:
          "Habla sobre los cuidados diarios que necesita un perro mascota durante 1 minuto. Di qué come, cuántas veces sale a la calle y cuándo hay que llevarlo al veterinario.",
        connectors: [
          "Cuidar a un perro requiere mucha",
          "Primero, hay que darle de comer un",
          "Segundo, es necesario sacarlo a pasear",
          "Cuando está enfermo, lo llevamos al",
          "En mi opinión, es un amigo muy",
        ],
        guideQuestions: [
          "¿Qué tipo de comida consume un perro doméstico?",
          "¿Cuántas veces al día es necesario sacarlo a pasear por el parque?",
          "¿Por qué es importante jugar con él?",
          "¿Cuándo es obligatorio visitar al veterinario de animales?",
          "¿Es el perro tu mascota preferida?",
        ],
      },
      topic2: {
        title: "Una visita al parque de animales o zoo",
        description:
          "Habla sobre una visita a un zoo o parque de animales que recuerdes durante 1 minuto. Di con quién fuiste, qué animales viste y cuál te gustó más.",
        connectors: [
          "Recuerdo una visita fantástica al",
          "Fui con mis tíos y mis",
          "Vimos muchos animales grandes como",
          "El animal que más me gustó fue el",
          "Me encantó la experiencia porque",
        ],
        guideQuestions: [
          "¿A qué parque de animales o zoo fuiste de excursión?",
          "¿Con quién realizaste la visita de fin de semana?",
          "¿Qué animales grandes o interesantes pudiste ver en libertad?",
          "¿Cuál fue tu animal favorito de la visita?",
          "¿Por qué es divertido e interesante aprender sobre la naturaleza?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero de piso queréis adoptar un animal de compañía para tener en vuestro piso compartido del centro. Tenéis que poneros de acuerdo sobre cuál elegir.",
      questions: [
        {
          question:
            "Pregunta a tu compañero si prefiere adoptar un perro juguetón o una gata independiente para el piso.",
          help: "Usa: ¿Qué mascota prefieres que adoptemos? / ¿Te gustan más los perros o los gatos?",
          usefulPhrases: [
            "Hola, ¿qué mascota prefieres para nuestro piso compartido?",
            "¿Te gustan más los perros grandes o los gatos tranquilos?",
            "Yo prefiero una gata porque es más limpia e independiente.",
            "Un perro es más cariñoso y muy divertido para jugar.",
          ],
        },
        {
          question:
            "Pregúntale si tenemos suficiente espacio en el salón o en la terraza para un perro grande.",
          help: "Usa: ¿Hay suficiente espacio en la casa? / ¿El perro es demasiado grande?",
          usefulPhrases: [
            "¿Crees que tenemos suficiente espacio para un perro labrador?",
            "Nuestro salón es amplio y muy luminoso, pero no tiene jardín.",
            "Un perro grande necesita salir a la calle tres veces al día.",
            "La gata puede dormir plácidamente encima del sofá.",
          ],
        },
        {
          question:
            "Pregúntale quién va a tener la responsabilidad de limpiar, comprar el pienso y llevarlo al veterinario.",
          help: "Usa: ¿Quién cuida al animal? / ¿Quién compra el pienso? / ¿Quién limpia sus cosas?",
          usefulPhrases: [
            "¿Cómo nos dividimos la responsabilidad de cuidarlo?",
            "Yo puedo sacar al perro a pasear todas las mañanas temprano.",
            "Tú puedes comprar el saco de pienso de carne y limpiar su espacio.",
            "Es obligatorio pagar la medicina a medias si se pone enfermo.",
          ],
        },
      ],
    },
  },
  {
    id: 28,
    level: "A1",
    theme: "El aeropuerto y viajar en avión",
    icon: "Plane",
    vocabulary: [
      {
        word: "aeropuerto",
        definition: "Lugar de despegue y aterrizaje de aviones comerciales con terminales de pasajeros",
        chinese: "机场",
        example: "Llego al aeropuerto de Madrid en metro porque es muy cómodo y rápido.",
      },
      {
        word: "vuelo",
        definition: "Trayecto o viaje que realiza un avión por el aire",
        chinese: "航班/飞行",
        example: "Mi vuelo directo a Pekín sale por la tarde desde la terminal cuatro.",
      },
      {
        word: "pasaporte",
        definition: "Documento oficial con fotografía indispensable para cruzar fronteras",
        chinese: "护照",
        example: "Muestro mi pasaporte y mi visado en el control de seguridad.",
      },
      {
        word: "facturar",
        definition: "Registrar las maletas grandes en el mostrador para enviarlas a la bodega",
        chinese: "值机/托运",
        example: "Tengo que facturar mi maleta grande de color azul en el mostrador.",
      },
      {
        word: "seguridad",
        definition: "Control del aeropuerto que revisa a los pasajeros y su equipaje de mano",
        chinese: "安检/安全",
        example: "Pasamos el control de seguridad quitándonos el abrigo y el cinturón.",
      },
      {
        word: "asiento",
        definition: "Lugar físico para sentarse en la cabina del avión",
        chinese: "座位",
        example: "Prefiero un asiento de ventanilla para poder ver las nubes.",
      },
      {
        word: "embarque",
        definition: "Acción de entrar o acceder a la cabina del avión por la puerta asignada",
        chinese: "登机",
        example: "La puerta de embarque abre a las nueve y media de la mañana.",
      },
      {
        word: "retraso",
        definition: "Demora o tardanza en el horario de salida programado",
        chinese: "延误",
        example: "El avión sale con una hora de retraso por la tormenta de nieve.",
      },
    ],
    reading: {
      textType: "narrativo",
      title: "Mi viaje de Madrid a Pekín",
      text: `Hola, me llamo Wang Wei y soy de Pekín, China. Hoy quiero contaros mi experiencia de mi primer viaje largo en avión de regreso a mi país tras estudiar español durante un año en la ciudad de Madrid. Mi vuelo salía a las diez en punto de la noche de un viernes de junio.

Llegué al aeropuerto de Madrid-Barajas cuatro horas antes del vuelo porque estaba extremadamente nervioso de perder el avión. Lo primero que hice fue buscar en las pantallas gigantes de la terminal el mostrador de facturación número 45 de mi compañía aérea. Allí entregué mi pasaporte de China y mi visado de estudiante, y facturé mi maleta de viaje grande de color azul oscuro, que pesaba exactamente veintiún kilos. El agente de facturación fue muy amable y educado conmigo. Me asignó un asiento excelente de ventanilla, el 12A, me entregó mi tarjeta de embarque y me dijo que la puerta de embarque era la B24 en la zona de embarque de la terminal internacional.

Después de facturar mi maleta grande, pasé con calma por el control de seguridad. Tuve que sacarme el cinturón, la chaqueta de abrigo de invierno y colocar mi ordenador portátil y la tablet en una bandeja de plástico de forma separada. El control fue un poco lento porque había una gran cantidad de turistas de muchos países, pero todo salió perfectamente. Llegué a la puerta de embarque a las nueve y media, justo cuando el personal abría el acceso. El viaje en avión duró once horas de vuelo directo. Fue un vuelo muy tranquilo y la comida estaba bastante sabrosa.`,
      questions: [
        {
          id: 1,
          question: "¿Quién es el protagonista principal de la lectura?",
          options: ["a) Carlos Ruiz", "b) Wang Wei", "c) Laura Lin", "d) Elena Gómez"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Hola, me llamo Wang Wei".',
        },
        {
          id: 2,
          question: "¿De qué ciudad y país procede el protagonista?",
          options: [
            "a) De Madrid, España",
            "b) De Barcelona, España",
            "c) De Pekín, China",
            "d) De Sevilla, España",
          ],
          correctAnswer: 2,
          explanation: 'El texto dice: "soy de Pekín, China".',
        },
        {
          id: 3,
          question: "¿Por qué viajó Wang Wei de regreso a su país?",
          options: [
            "a) De vacaciones a la playa",
            "b) Tras terminar de estudiar español en Madrid",
            "c) Por un nuevo empleo de oficina",
            "d) Para visitar a sus suegros",
          ],
          correctAnswer: 1,
          explanation:
            'El texto dice: "de regreso a mi país tras estudiar español durante un año en la ciudad de Madrid".',
        },
        {
          id: 4,
          question: "¿A qué hora de la noche salía programado el vuelo de Wang Wei?",
          options: [
            "a) A las ocho de la tarde",
            "b) A las diez en punto de la noche",
            "c) Al mediodía",
            "d) A la una de la madrugada",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Mi vuelo salía a las diez en punto de la noche".',
        },
        {
          id: 5,
          question: "¿Con cuántas horas de antelación llegó al aeropuerto por nerviosismo?",
          options: [
            "a) Dos horas de antelación",
            "b) Tres horas",
            "c) Cuatro horas de antelación",
            "d) Cinco horas enteras",
          ],
          correctAnswer: 2,
          explanation: 'El texto dice: "Llegué al aeropuerto de Madrid-Barajas cuatro horas antes".',
        },
        {
          id: 6,
          question: "¿Qué número de mostrador de facturación buscó en las pantallas?",
          options: ["a) El doce", "b) El veinticuatro", "c) El cuarenta y cinco", "d) El cincuenta"],
          correctAnswer: 2,
          explanation: 'El texto dice: "el mostrador de facturación número 45".',
        },
        {
          id: 7,
          question: "¿Cuánto pesaba su maleta rígida facturada?",
          options: [
            "a) Diez kilos justos",
            "b) Quince kilos y medio",
            "c) Veintiún kilos exactos",
            "d) Treinta kilos",
          ],
          correctAnswer: 2,
          explanation: 'El texto dice: "mi maleta de viaje grande... que pesaba exactamente veintiún kilos".',
        },
        {
          id: 8,
          question: "¿Qué tipo de asiento le asignó el amable agente en el avión?",
          options: [
            "a) Un asiento de pasillo cómodo",
            "b) El asiento 12A de ventanilla",
            "c) Un asiento incómodo en el centro",
            "d) Un asiento de primera clase grande",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Me asignó un asiento excelente de ventanilla, el 12A".',
        },
        {
          id: 9,
          question: "¿Qué objetos electrónicos colocó en la bandeja de seguridad por separado?",
          options: [
            "a) Su teléfono móvil y su cargador",
            "b) Su ordenador portátil y la tablet",
            "c) Su cámara de fotos y la batería",
            "d) Sus auriculares y la lámpara",
          ],
          correctAnswer: 1,
          explanation:
            'El texto dice: "y colocar mi ordenador portátil y la tablet en una bandeja de plástico de forma separada".',
        },
        {
          id: 10,
          question: "¿Cuántas horas duró el vuelo directo de regreso?",
          options: [
            "a) Nueve horas",
            "b) Diez horas y cuarto",
            "c) Once horas de vuelo",
            "d) Doce horas de madrugada",
          ],
          correctAnswer: 2,
          explanation: 'El texto dice: "El viaje en avión duró once horas de vuelo directo".',
        },
      ],
    },
    listening: {
      title: "Reclamación de equipaje perdido",
      transcription: `Buenas tardes, soy Wang Wei. Ayer por la tarde llegué al aeropuerto de Pekín de mi largo viaje en avión desde España, pero tuve un problema grave en la terminal: mi maleta grande de color azul oscuro no salió por la cinta de equipajes número cuatro con las otras maletas de mi vuelo.

Fui inmediatamente a la oficina de reclamaciones de equipaje de la compañía aérea, que está al lado de la aduana de entrada. El empleado de la oficina fue muy amable y atento. Me pidió mi pasaporte de China, mi tarjeta de embarque del vuelo y el resguardo de la maleta facturada que tenía pegado detrás de mi billete. Le describí mi equipaje con detalle: una maleta rígida de gran tamaño, de color azul oscuro, con una pegatina roja con la bandera de China en el asa superior.

El empleado buscó los datos en el sistema de ordenadores de la oficina y me explicó que mi maleta se había quedado retenida en el aeropuerto de Madrid debido a un transbordo rápido de última hora, pero que ya venía en camino en el siguiente vuelo directo de la madrugada. Me prometió que la maleta llegaría hoy por la mañana y que me la enviarían gratis en una furgoneta a la dirección de mi casa en Pekín. Rellené el formulario oficial y salí más tranquilo de la oficina. Hoy por la mañana, un conductor muy amable me ha traído la maleta a casa en perfecto estado y limpia. Al final, todo salió bien gracias a la tecnología.`,
      questions: [
        {
          id: 1,
          question: "¿Quién habla de su problema en la grabación del audio?",
          options: ["a) Carlos", "b) Wang Wei", "c) Pedro", "d) Luis"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Qué problema técnico o de servicio tuvo el pasajero al llegar a Pekín?",
          options: [
            "a) Perdió su pasaporte internacional",
            "b) Su maleta grande no salió por la cinta de equipajes",
            "c) El vuelo llegó con cuatro horas de retraso",
            "d) Su asiento de pasillo estaba ocupado",
          ],
          correctAnswer: 2,
        },
        {
          id: 3,
          question: "¿A qué oficina del aeropuerto acudió inmediatamente para reclamar?",
          options: [
            "a) Al mostrador de facturación",
            "b) A la oficina de reclamaciones de equipaje",
            "c) Al control de seguridad nacional",
            "d) A la farmacia del aeropuerto",
          ],
          correctAnswer: 2,
        },
        {
          id: 4,
          question: "¿Qué documentos le solicitó el empleado de reclamaciones?",
          options: [
            "a) Solo su carnet de conducir de Pekín",
            "b) Su pasaporte, la tarjeta de embarque y el resguardo de la maleta",
            "c) Su visado de estudiante en España",
            "d) Su contrato de alquiler amueblado",
          ],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "¿De qué color y aspecto era la maleta perdida en el viaje?",
          options: [
            "a) Pequeña, ligera y de color negro",
            "b) Grande, rígida y de color azul oscuro",
            "c) Una mochila gris con un guion bajo",
            "d) Amarilla de equipaje de mano",
          ],
          correctAnswer: 2,
        },
        {
          id: 6,
          question: "¿Dónde tenía colocada la pegatina roja con la bandera de China?",
          options: [
            "a) En las ruedas de la maleta",
            "b) En la pantalla electrónica",
            "c) En el asa superior",
            "d) En la parte de detrás",
          ],
          correctAnswer: 2,
        },
        {
          id: 7,
          question: "¿En qué lugar se había quedado la maleta facturada según el sistema informático?",
          options: [
            "a) En el hotel de Pekín",
            "b) En el aeropuerto de Madrid-Barajas",
            "c) En la parada de metro de Atocha",
            "d) Dentro de la cabina del avión",
          ],
          correctAnswer: 2,
        },
        {
          id: 8,
          question: "¿A qué se debió que la maleta se quedara en el aeropuerto de origen?",
          options: [
            "a) A que pesaba más de treinta kilos de límite",
            "b) A un transbordo rápido de última hora",
            "c) A que la aduana la retuvo por seguridad",
            "d) A un fallo del carnicero de equipaje",
          ],
          correctAnswer: 2,
        },
        {
          id: 9,
          question: "¿Qué promesa o solución le ofreció el empleado de la compañía?",
          options: [
            "a) Que le darían una maleta nueva gratis",
            "b) Que tenía que regresar a Madrid a buscarla",
            "c) Que se la enviarían gratis a su casa al día siguiente",
            "d) Que le devolverían cien euros de fianza",
          ],
          correctAnswer: 2,
        },
        {
          id: 10,
          question: "¿Cómo recibió finalmente Wang Wei su maleta perdida hoy?",
          options: [
            "a) Tuvo que ir de nuevo al aeropuerto de Pekín a buscarla",
            "b) Un conductor muy amable se la trajo a su casa en perfecto estado",
            "c) Sigue esperando la maleta porque se ha perdido para siempre",
            "d) Se la envió su madre por correo certificado desde España",
          ],
          correctAnswer: 2,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi primer viaje en avión",
        description:
          "Escribe un texto corto sobre tu primer viaje en avión. Di a qué país viajaste, cómo era el aeropuerto, si facturaste tu maleta grande y si preferiste asiento de ventanilla o de pasillo.",
        structure: {
          intro: "Di cuándo fue tu viaje y tu destino.",
          body: "Describe el proceso de facturación en el mostrador del aeropuerto.",
          conclusion: "Explica cómo fue el vuelo y si te gustó la comida de cabina.",
        },
        connectors: [
          "Mi primer viaje en avión fue a",
          "Llegué al aeropuerto muy",
          "Facturé mi maleta en el mostrador",
          "Mi asiento era el de",
          "El vuelo duró unas",
        ],
        wordCount: "40-60 palabras",
      },
      optionB: {
        title: "Un problema con las maletas",
        description:
          "Escribe una reclamación simulada por correo electrónico a una aerolínea por la pérdida de tu equipaje. Describe la maleta, el número de vuelo y solicita la entrega en tu hotel.",
        structure: {
          intro: "Presenta tus datos de vuelo y número de billete.",
          body: "Describe físicamente tu maleta perdida (color, tamaño, pegatinas).",
          conclusion: "Indica la dirección del hotel para la entrega gratuita.",
        },
        connectors: [
          "Escribo este correo porque mi maleta no ha salido en la",
          "Viajé en el vuelo número",
          "Mi maleta es grande, rígida y de color",
          "Por favor, envíen mi equipaje al hotel",
        ],
        wordCount: "40-60 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Cómo llegar al aeropuerto",
        description:
          "Habla sobre las diferentes formas de llegar al aeropuerto de tu ciudad para coger un vuelo durante 1 minuto. Di qué transportes prefieres y cuánto equipaje llevas.",
        connectors: [
          "Para ir al aeropuerto de mi ciudad, se puede ir en",
          "Normalmente prefiero coger el metro porque",
          "Si tengo mucha prisa, llamo a un",
          "Cuando viajo llevo una maleta grande y mi",
          "En mi opinión, es importante llegar temprano porque",
        ],
        guideQuestions: [
          "¿Cómo se llama el aeropuerto más cercano a tu casa?",
          "¿Qué medios de transporte público conectan con el aeropuerto?",
          "¿Prefieres viajar en metro, autobús o taxi y por qué?",
          "¿Con cuántas horas de antelación es recomendable llegar?",
          "¿Qué equipaje de mano llevas contigo en la cabina?",
        ],
      },
      topic2: {
        title: "Tu experiencia viajando en avión",
        description:
          "Habla sobre tus experiencias o tus gustos al viajar en avión durante 1 minuto. Di si prefieres asiento de ventanilla o pasillo y qué haces para pasar las horas de vuelo.",
        connectors: [
          "Viajar en avión es una experiencia",
          "Siempre elijo un asiento de",
          "Me gusta la ventanilla para ver las nubes y el",
          "Durante las horas de vuelo, yo prefiero",
          "La comida que sirven en la cabina es",
        ],
        guideQuestions: [
          "¿Te gusta viajar en avión o prefieres el tren?",
          "¿Prefieres un asiento de ventanilla o uno de pasillo y por qué?",
          "¿Qué actividades realizas durante las horas de vuelo (leer, dormir, ver películas)?",
          "¿Te pones nervioso durante el despegue o el aterrizaje?",
          "¿Cuál ha sido el viaje en avión más largo que has realizado?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero estáis en la cola del control de seguridad del aeropuerto internacional y tenéis prisa porque vuestro vuelo a Pekín sale en cuarenta minutos.",
      questions: [
        {
          question:
            "Pregunta a tu compañero si tiene listos su pasaporte, tarjeta de embarque y visado de estudiante.",
          help: "Usa: ¿Tienes tu pasaporte a mano? / ¿Dónde está tu tarjeta de embarque?",
          usefulPhrases: [
            "Hola, ¿tienes todos tus documentos listos para pasar el control?",
            "¿Dónde tienes guardado tu pasaporte y tu visado de estudiante?",
            "Sí, los tengo en mi bolsillo exterior de la mochila de mano.",
            "¡Ay, no encuentro mi tarjeta de embarque! Espera...",
          ],
        },
        {
          question:
            "Pregúntale qué objetos electrónicos u objetos de abrigo debe colocar en las bandejas de plástico.",
          help: "Usa: ¿Qué tenemos que poner en la bandeja? / ¿Sacas el ordenador portátil de la mochila?",
          usefulPhrases: [
            "¿Qué tenemos que sacar para poner por separado en la bandeja?",
            "Es obligatorio sacar el ordenador portátil y la tablet.",
            "También tenemos que quitarnos la chaqueta gorda de invierno y el cinturón.",
            "Los zapatos no hacen falta si no pita el arco de seguridad.",
          ],
        },
        {
          question:
            "Pregúntale si sabe dónde está nuestra puerta de embarque y cuánto tiempo de retraso tiene el vuelo.",
          help: "Usa: ¿Sabes qué puerta de embarque tenemos? / ¿Hay algún retraso en las pantallas?",
          usefulPhrases: [
            "¿Has mirado las pantallas gigantes para ver nuestra puerta de embarque?",
            "Nuestra puerta es la B24, está al final del pasillo internacional.",
            "¡Qué suerte! En la pantalla dice que el vuelo sale con quince minutos de retraso.",
            "Menos mal, así podemos caminar tranquilos a paso lento.",
          ],
        },
      ],
    },
  },
  {
    id: 29,
    level: "A1",
    theme: "La salud y el cuerpo",
    icon: "Activity",
    vocabulary: [
      {
        word: "dolor",
        definition: "Sensación molesta o aflictiva en una parte del cuerpo",
        chinese: "疼痛 / 痛",
        example: "Tengo un fuerte dolor de cabeza.",
      },
      {
        word: "fiebre",
        definition: "Fenómeno patológico que se manifiesta por elevación de la temperatura",
        chinese: "发烧 / 发热",
        example: "El niño tiene fiebre, tiene 38 grados.",
      },
      {
        word: "pastilla",
        definition: "Porción pequeña de pasta medicinal",
        chinese: "药片",
        example: "Tomo una pastilla para la fiebre.",
      },
      {
        word: "médico",
        definition: "Persona legalmente autorizada para profesar y ejercer la medicina",
        chinese: "医生",
        example: "El médico me receta un jarabe para la tos.",
      },
      {
        word: "gripe",
        definition: "Enfermedad epidémica aguda, acompañada de fiebre y tos",
        chinese: "流感 / 流行性感冒",
        example: "Muchos alumnos tienen gripe en invierno.",
      },
      {
        word: "jarabe",
        definition: "Líquido espeso y dulce que se usa como medicina",
        chinese: "糖浆",
        example: "El jarabe de fresa es muy dulce.",
      },
      {
        word: "receta",
        definition: "Prescripción médica escrita para comprar un medicamento",
        chinese: "处方",
        example: "Necesito una receta para comprar este medicamento.",
      },
      {
        word: "reposo",
        definition: "Estado de quietud o descanso",
        chinese: "休养 / 休息",
        example: "El doctor me recomienda hacer tres días de reposo.",
      },
    ],
    reading: {
      textType: "narrativo",
      title: "Un día de enfermedad",
      text: `Ayer fue un día muy difícil para mí. Me desperté muy temprano con un fuerte dolor de cabeza y de garganta. También tenía mucha fiebre. Mi termómetro marcaba treinta y ocho grados y medio. Estaba tan cansada y débil que no podía levantarme de la cama.

Mi madre decidió llevarme al centro de salud por la mañana. Allí, esperamos un rato en la sala de espera porque había muchos pacientes con gripe. Luego, entramos en la consulta del doctor Martínez. Es un médico muy amable. Él me miró la garganta, me escuchó el pecho y me dijo que tenía una gripe estacional fuerte.

El doctor me recetó un jarabe para la tos y unas pastillas para bajar la fiebre. Después, fuimos a la farmacia de la esquina a comprar los medicamentos. La farmacéutica me explicó que debía tomar el jarabe tres veces al día, siempre después de las comidas. Ahora estoy en la cama de mi dormitorio descansando, haciendo reposo y bebiendo mucha agua. Espero volver pronto a la escuela.`,
      questions: [
        {
          id: 1,
          question: "¿Cómo se siente la protagonista ayer?",
          options: ["a) Muy alegre", "b) Muy cansada y débil", "c) Muy enérgica", "d) Muy aburrida"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Estaba tan cansada y débil que no podía levantarme de la cama".',
        },
        {
          id: 2,
          question: "¿Qué síntomas físicos tenía ella?",
          options: [
            "a) Dolor de estómago",
            "b) Dolor de muelas",
            "c) Dolor de cabeza y garganta con fiebre",
            "d) Solo dolor de pies",
          ],
          correctAnswer: 2,
          explanation:
            'El texto dice: "Me desperté muy temprano con un fuerte dolor de cabeza y de garganta. También tenía mucha fiebre".',
        },
        {
          id: 3,
          question: "¿Qué temperatura corporal marcaba el termómetro?",
          options: [
            "a) Treinta y siete grados",
            "b) Treinta y ocho grados y medio",
            "c) Treinta y nueve grados",
            "d) Cuarenta grados",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Mi termómetro marcaba treinta y ocho grados y medio".',
        },
        {
          id: 4,
          question: "¿A dónde llevó la madre a la protagonista?",
          options: [
            "a) Al hospital central",
            "b) A la escuela",
            "c) Al centro de salud",
            "d) Al supermercado",
          ],
          correctAnswer: 2,
          explanation: 'El texto dice: "Mi madre decidió llevarme al centro de salud por la mañana".',
        },
        {
          id: 5,
          question: "¿Por qué tuvieron que esperar un rato allí?",
          options: [
            "a) Porque el médico no estaba",
            "b) Porque había muchos pacientes con gripe",
            "c) Porque llegaron tarde",
            "d) Porque cerraron la farmacia",
          ],
          correctAnswer: 1,
          explanation:
            'El texto dice: "esperamos un rato en la sala de espera porque había muchos pacientes con gripe".',
        },
        {
          id: 6,
          question: "¿Cómo se llama el médico que la atendió?",
          options: ["a) Doctor Martínez", "b) Doctor López", "c) Doctor García", "d) Doctor Wang"],
          correctAnswer: 0,
          explanation: 'El texto dice: "entramos en la consulta del doctor Martínez".',
        },
        {
          id: 7,
          question: "¿Qué diagnóstico específico le dio el doctor?",
          options: [
            "a) Un resfriado común",
            "b) Una alergia primaveral",
            "c) Una gripe estacional fuerte",
            "d) Dolor de espalda",
          ],
          correctAnswer: 2,
          explanation: 'El texto dice: "me dijo que tenía una gripe estacional fuerte".',
        },
        {
          id: 8,
          question: "¿Qué medicamentos le recetó el médico?",
          options: [
            "a) Una crema para la piel",
            "b) Vitaminas",
            "c) Un jarabe y unas pastillas",
            "d) Solo tiritas",
          ],
          correctAnswer: 2,
          explanation:
            'El texto dice: "El doctor me recetó un jarabe para la tos y unas pastillas para bajar la fiebre".',
        },
        {
          id: 9,
          question: "¿Dónde compraron las medicinas?",
          options: [
            "a) En la farmacia de la esquina",
            "b) En el hospital",
            "c) En el supermercado",
            "d) En una tienda de ropa",
          ],
          correctAnswer: 0,
          explanation: 'El texto dice: "fuimos a la farmacia de la esquina a comprar los medicamentos".',
        },
        {
          id: 10,
          question: "¿Cuándo debe tomar el jarabe para la tos?",
          options: [
            "a) Antes de dormir únicamente",
            "b) Tres veces al día, después de las comidas",
            "c) Cada cuatro horas con agua fría",
            "d) Solo por la mañana temprano",
          ],
          correctAnswer: 1,
          explanation:
            'El texto dice: "La farmacéutica me explicó que debía tomar el jarabe tres veces al día, siempre después de las comidas".',
        },
      ],
    },
    listening: {
      title: "La rutina de una enfermera",
      transcription: `Hola, soy Carmen y soy enfermera. Trabajo en un hospital infantil muy grande en el centro de Sevilla. Me encanta mi trabajo porque me gusta mucho cuidar a los niños enfermos.

Mi jornada de trabajo empieza muy temprano, a las ocho de la mañana. Primero, visito a los pacientes en sus habitaciones y les tomo la temperatura. Si tienen fiebre o dolor, les doy la medicina que receta el médico. A las dos de la tarde, como con mis compañeros de trabajo en el comedor del hospital. Charlamos y descansamos un poco.

Por la tarde, sigo trabajando con los médicos en las consultas. Terminamos a las cinco de la tarde. Después del trabajo, voy a pie a casa porque el hospital está muy cerca de mi piso. Por la noche, ceno algo ligero con mi esposo, leo un libro y me acuesto temprano para descansar bien.`,
      questions: [
        {
          id: 1,
          question: "¿Qué profesión tiene Carmen?",
          options: ["a) Médica", "b) Profesora", "c) Enfermera", "d) Farmacéutica"],
          correctAnswer: 2,
        },
        {
          id: 2,
          question: "¿Dónde trabaja Carmen exactamente?",
          options: [
            "a) En una escuela de idiomas",
            "b) En un hospital infantil en Sevilla",
            "c) En un centro de salud de Madrid",
            "d) En una farmacia de barrio",
          ],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "¿A qué hora empieza su jornada laboral por la mañana?",
          options: [
            "a) A las siete en punto",
            "b) A las ocho en punto",
            "c) A las ocho y media",
            "d) A las nueve de la mañana",
          ],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "¿Qué es lo primero que hace Carmen al llegar a las habitaciones?",
          options: [
            "a) Tomar la temperatura a los niños",
            "b) Darles el desayuno",
            "c) Limpiar las camas",
            "d) Hablar con los padres",
          ],
          correctAnswer: 0,
        },
        {
          id: 5,
          question: "¿Qué les da Carmen a los pacientes si tienen dolor o fiebre?",
          options: [
            "a) Un caramelo de fresa",
            "b) Un vaso de leche caliente",
            "c) La medicina que receta el médico",
            "d) Un libro de cuentos",
          ],
          correctAnswer: 2,
        },
        {
          id: 6,
          question: "¿A qué hora come Carmen en el hospital?",
          options: [
            "a) A la una del mediodía",
            "b) A las dos de la tarde",
            "c) A las tres de la tarde",
            "d) Come en su casa de noche",
          ],
          correctAnswer: 1,
        },
        {
          id: 7,
          question: "¿Con quién come Carmen a las dos?",
          options: [
            "a) Sola en la consulta",
            "b) Con los niños enfermos",
            "c) Con sus compañeros de trabajo",
            "d) Con su esposo",
          ],
          correctAnswer: 2,
        },
        {
          id: 8,
          question: "¿A qué hora termina Carmen de trabajar por la tarde?",
          options: [
            "a) A las cuatro en punto",
            "b) A las cinco en punto",
            "c) A las seis en punto",
            "d) A las ocho de la noche",
          ],
          correctAnswer: 1,
        },
        {
          id: 9,
          question: "¿Cómo vuelve Carmen a su casa desde el hospital?",
          options: ["a) En metro", "b) En autobús municipal", "c) A pie", "d) En el coche de su esposo"],
          correctAnswer: 2,
        },
        {
          id: 10,
          question: "¿Qué actividades realiza Carmen por la noche antes de dormir?",
          options: [
            "a) Va al gimnasio dos horas",
            "b) Cence, lee un libro y se acuesta temprano",
            "c) Trabaja con el ordenador",
            "d) Sale de fiesta con sus amigas",
          ],
          correctAnswer: 1,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Cómo me siento hoy",
        description:
          "Escribe un correo electrónico a tu profesor de español explicando cómo te sientes hoy y por qué no puedes asistir a la clase de esta tarde.",
        structure: {
          intro: "Saludo formal y cómo te sientes hoy.",
          body: "Explica las razones físicas (fiebre, dolor de cabeza, dolor de garganta).",
          conclusion: "Despedida formal y tu deseo de recuperarte pronto.",
        },
        connectors: [
          "Estimado profesor",
          "Hoy me siento muy mal",
          "Tengo fiebre",
          "No puedo ir a clase",
          "Un cordial saludo",
        ],
        wordCount: "40-60 palabras",
      },
      optionB: {
        title: "Mis hábitos para estar sano",
        description: "Escribe un texto breve sobre tus hábitos diarios para cuidar tu salud física y mental.",
        structure: {
          intro: "Introduce la importancia de la salud.",
          body: "Describe lo que comes, bebes y el deporte que practicas.",
          conclusion: "Menciona las horas que duermes y lo que evitas.",
        },
        connectors: [
          "Para estar sano",
          "Normalmente como",
          "Bebo mucha agua",
          "Hago deporte",
          "Evito la comida rápida",
        ],
        wordCount: "40-60 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Una visita al médico",
        description:
          "Habla durante 1 minuto sobre una experiencia en la que estuviste enfermo y fuiste a la consulta del médico.",
        connectors: [
          "Recuerdo que me dolía",
          "Tenía fiebre de",
          "Fui al médico con",
          "El doctor me recetó",
          "Ahora estoy",
        ],
        guideQuestions: [
          "¿Cuándo estuviste enfermo?",
          "¿Qué síntomas tenías y qué te dolía?",
          "¿Con quién fuiste al centro de salud?",
          "¿Qué te dijo el médico y qué medicina tomaste?",
          "¿Cómo te sientes ahora?",
        ],
      },
      topic2: {
        title: "Mi rutina saludable",
        description: "Describe tu rutina diaria enfocada en mantener una buena salud física.",
        connectors: [
          "Me levanto temprano",
          "Para desayunar tomo",
          "Hago deporte los",
          "Duermo ocho horas",
          "Para mí es importante",
        ],
        guideQuestions: [
          "¿A qué hora te levantas y qué desayunas?",
          "¿Qué alimentos sanos comes a mediodía?",
          "¿Qué tipo de ejercicio físico o deporte haces y con qué frecuencia?",
          "¿Cuántas horas duermes cada noche?",
          "¿Qué haces cuando estás muy estresado o cansado?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero de piso estáis en casa. Uno de vosotros se siente muy enfermo (tiene fiebre y dolor de estómago) y el otro le ayuda a decidir qué hacer.",
      questions: [
        {
          question: "Pregunta a tu compañero: ¿Qué te duele exactamente? ¿Te has tomado la temperatura?",
          help: "Usa: ¿Qué te pasa? / ¿Te duele el estómago?",
          usefulPhrases: [
            "Hola, te veo muy pálido. ¿Qué te pasa?",
            "¿Te duele mucho el estómago?",
            "¿Tienes fiebre alta hoy?",
            "Toma el termómetro, por favor.",
          ],
        },
        {
          question: "Aconseja a tu compañero: ¿Quieres ir al médico de cabecera o prefieres descansar?",
          help: "Usa: Deberías ir al médico. / Yo te acompaño.",
          usefulPhrases: [
            "Deberías ir al centro de salud de inmediato.",
            "Yo te acompaño en coche si quieres.",
            "¿Prefieres quedarte en la cama haciendo reposo?",
            "Te preparo una sopa caliente ahora mismo.",
          ],
        },
        {
          question: "Ofrece tu ayuda: ¿Necesitas que vaya a la farmacia a comprar alguna medicina?",
          help: "Usa: ¿Quieres una pastilla? / Voy a la farmacia.",
          usefulPhrases: [
            "¿Quieres que vaya a la farmacia de la esquina?",
            "Tengo pastillas para el dolor aquí.",
            "¿Necesitas un vaso de agua fría?",
            "No te preocupes, yo limpio la cocina.",
          ],
        },
      ],
    },
  },
  {
    id: 30,
    level: "A1",
    theme: "Tiendas y compras",
    icon: "ShoppingBag",
    vocabulary: [
      {
        word: "centro comercial",
        definition: "Gran edificio con muchas tiendas y restaurantes de ocio",
        chinese: "购物中心 / 商场",
        example: "Los sábados por la tarde voy al centro comercial con mis amigas.",
      },
      {
        word: "dependiente",
        definition: "Persona que atiende a los clientes en una tienda",
        chinese: "售货员 / 店员",
        example: "El dependiente de la tienda de ropa es muy amable.",
      },
      {
        word: "precio",
        definition: "Valor en dinero de un producto o servicio",
        chinese: "价格",
        example: "¿Cuál es el precio de este abrigo negro?",
      },
      {
        word: "tarjeta de crédito",
        definition: "Tarjeta electrónica para pagar en los comercios",
        chinese: "信用卡",
        example: "Pago la ropa nueva con mi tarjeta de crédito.",
      },
      {
        word: "efectivo",
        definition: "Dinero en monedas o billetes físicos",
        chinese: "现金",
        example: "No tengo tarjeta hoy, pago en efectivo.",
      },
      {
        word: "zapatería",
        definition: "Tienda especializada en calzado",
        chinese: "鞋店",
        example: "Voy a la zapatería a comprar unas botas de invierno.",
      },
      {
        word: "talla",
        definition: "Medida oficial de la ropa o el calzado",
        chinese: "尺寸 / 尺码",
        example: "Busco estos pantalones en la talla 38.",
      },
      {
        word: "regalo",
        definition: "Objeto que se da a alguien sin cobrar nada, por afecto",
        chinese: "礼物",
        example: "Compro un regalo de cumpleaños para mi hermano.",
      },
    ],
    reading: {
      textType: "descriptivo",
      title: "Una tarde de compras",
      text: `Hoy es sábado por la tarde y hace bastante frío en la calle. Por eso, mi amiga Elena y yo hemos decidido ir al centro comercial de nuestro barrio. Es un edificio enorme con muchas tiendas de ropa, zapaterías y restaurantes.

Primero, entramos en una tienda de ropa muy conocida. Elena busca un regalo de cumpleaños para su hermano menor. Ve una camiseta blanca preciosa. Su precio es de quince euros. El dependiente de la tienda, que es muy amable, nos ayuda a buscar la talla mediana. Elena decide comprar la camiseta y la paga con su tarjeta de crédito en la caja.

Después, vamos a la zapatería del segundo piso. Yo necesito unas zapatillas de deporte nuevas para correr por el parque. Me pruebo unas de color azul marino de la talla cuarenta y dos. Son comodísimas. Cuestan cuarenta euros. Como no aceptan mi tarjeta hoy, las pago en efectivo con un billete de cincuenta euros. El cajero me da diez euros de cambio.

Finalmente, vamos a una cafetería del centro comercial a tomar un chocolate caliente con churros. Estamos muy contentas con nuestras compras de hoy. Ha sido una tarde excelente y divertida.`,
      questions: [
        {
          id: 1,
          question: "¿Qué día de la semana van de compras las amigas?",
          options: [
            "a) Sábado por la tarde",
            "b) Domingo por la mañana",
            "c) Viernes por la noche",
            "d) Martes por la mañana",
          ],
          correctAnswer: 0,
          explanation: 'El texto dice: "Hoy es sábado por la tarde y hace bastante frío en la calle".',
        },
        {
          id: 2,
          question: "¿Por qué decidieron ir al centro comercial?",
          options: [
            "a) Porque es barato",
            "b) Porque hace bastante frío en la calle",
            "c) Porque está lejos",
            "d) Porque no hay coches",
          ],
          correctAnswer: 1,
          explanation:
            'El texto dice: "hace bastante frío en la calle. Por eso, mi amiga Elena y yo hemos decidido ir al centro comercial".',
        },
        {
          id: 3,
          question: "¿Cómo es el centro comercial de su barrio?",
          options: [
            "a) Pequeño y antiguo",
            "b) Enorme con muchas tiendas y zapaterías",
            "c) Barato pero sucio",
            "d) Solo tiene restaurantes",
          ],
          correctAnswer: 1,
          explanation:
            'El texto dice: "Es un edificio enorme con muchas tiendas de ropa, zapaterías y restaurantes".',
        },
        {
          id: 4,
          question: "¿Para quién busca un regalo Elena?",
          options: ["a) Para su madre", "b) Para su novio", "c) Para su hermano menor", "d) Para su abuelo"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Elena busca un regalo de cumpleaños para su hermano menor".',
        },
        {
          id: 5,
          question: "¿Qué regalo elige Elena para su hermano?",
          options: [
            "a) Una chaqueta negra",
            "b) Unos pantalones cortos",
            "c) Una camiseta blanca",
            "d) Unos zapatos",
          ],
          correctAnswer: 2,
          explanation: 'El texto dice: "Ve una camiseta blanca preciosa".',
        },
        {
          id: 6,
          question: "¿Cuánto cuesta la camiseta de Elena?",
          options: ["a) Diez euros", "b) Quince euros", "c) Veinte euros", "d) Treinta euros"],
          correctAnswer: 1,
          explanation: 'El texto dice: "Su precio es de quince euros".',
        },
        {
          id: 7,
          question: "¿Cómo paga Elena la camiseta en la caja?",
          options: [
            "a) Con tarjeta de crédito",
            "b) En efectivo",
            "c) Con un cheque",
            "d) No paga, es gratis",
          ],
          correctAnswer: 0,
          explanation:
            'El texto dice: "Elena decide comprar la camiseta y la paga con su tarjeta de crédito".',
        },
        {
          id: 8,
          question: "¿Dónde está situada la zapatería del centro comercial?",
          options: [
            "a) En la planta baja",
            "b) En el primer piso",
            "c) En el segundo piso",
            "d) Fuera del edificio",
          ],
          correctAnswer: 2,
          explanation: 'El texto dice: "vamos a la zapatería del segundo piso".',
        },
        {
          id: 9,
          question: "¿De qué talla y color son las zapatillas de deporte que compra la protagonista?",
          options: [
            "a) Talla cuarenta, color rojo",
            "b) Talla cuarenta y dos, color azul marino",
            "c) Talla cuarenta y uno, color negro",
            "d) Talla treinta y ocho, color blanco",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Me pruebo unas de color azul marino de la talla cuarenta y dos".',
        },
        {
          id: 10,
          question: "¿Por qué paga la protagonista las zapatillas en efectivo?",
          options: [
            "a) Porque prefiere la moneda física",
            "b) Porque no aceptan su tarjeta hoy",
            "c) Porque tiene un descuento",
            "d) Porque no tiene tarjeta de crédito",
          ],
          correctAnswer: 1,
          explanation:
            'El texto dice: "Como no aceptan mi tarjeta hoy, las pago en efectivo con un billete de cincuenta euros".',
        },
      ],
    },
    listening: {
      title: "Comprando ropa de invierno",
      transcription: `Hola, soy Roberto. Hoy es domingo y estoy de compras en una tienda de ropa del centro de Madrid con mi prima Sofía. Necesito ropa de abrigo nueva porque el invierno de este año es extremadamente frío.

Primero, busco un abrigo negro. El dependiente de la tienda me muestra uno precioso de lana. Cuesta ochenta euros. Me lo pruebo en el probador y me queda perfecto, es de la talla cincuenta. Después, veo unas bufandas de colores. Sofía me aconseja elegir la bufanda de color gris claro porque combina muy bien con el abrigo negro. La bufanda cuesta quince euros.

También compro unos guantes de cuero por veinte euros. Pago todo con mi tarjeta de crédito en la caja. El total es de ciento quince euros. La dependienta es muy amable y me da una bolsa grande de papel. Sofía también se compra una chaqueta roja muy moderna. Salimos de la tienda muy felices y listos para el frío.`,
      questions: [
        {
          id: 1,
          question: "¿Qué día de la semana va de compras Roberto?",
          options: ["a) Sábado por la tarde", "b) Domingo", "c) Viernes por la mañana", "d) Lunes laborable"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Con quién está de compras en la tienda?",
          options: ["a) Con su novia", "b) Con su prima Sofía", "c) Con su madre", "d) Solo"],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "¿Por qué necesita Roberto ropa de abrigo nueva?",
          options: [
            "a) Porque va a viajar a China",
            "b) Porque el invierno de este año es extremadamente frío",
            "c) Por su primer día de trabajo",
            "d) Porque ha perdido su ropa vieja",
          ],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "¿De qué color es el abrigo que busca Roberto?",
          options: ["a) Azul marino", "b) Gris claro", "c) Negro", "d) Rojo fuerte"],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "¿Cuánto cuesta el abrigo de lana?",
          options: ["a) Cincuenta euros", "b) Sesenta euros", "c) Ochenta euros", "d) Cien euros"],
          correctAnswer: 2,
        },
        {
          id: 6,
          question: "¿De qué talla es el abrigo que se prueba Roberto?",
          options: [
            "a) Talla cuarenta y ocho",
            "b) Talla cincuenta",
            "c) Talla cincuenta y dos",
            "d) Talla cuarenta y dos",
          ],
          correctAnswer: 1,
        },
        {
          id: 7,
          question: "¿Qué color de bufanda le aconseja Sofía?",
          options: ["a) Roja", "b) Negra", "c) Gris clara", "d) Azul oscuro"],
          correctAnswer: 2,
        },
        {
          id: 8,
          question: "¿Cuánto cuesta la bufanda?",
          options: ["a) Diez euros", "b) Quince euros", "c) Veinte euros", "d) Veinticinco euros"],
          correctAnswer: 1,
        },
        {
          id: 9,
          question: "¿Cuánto paga Roberto en total por sus compras?",
          options: [
            "a) Ochenta euros",
            "b) Noventa y cinco euros",
            "c) Ciento quince euros",
            "d) Ciento cincuenta euros",
          ],
          correctAnswer: 2,
        },
        {
          id: 10,
          question: "¿Qué prenda de vestir se compra la prima Sofía?",
          options: [
            "a) Una bufanda negra",
            "b) Unos guantes de cuero",
            "c) Una chaqueta roja muy moderna",
            "d) Un vestido blanco",
          ],
          correctAnswer: 2,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi último día de compras",
        description: "Escribe 3-4 frases sobre un día que fuiste de compras a una tienda o centro comercial.",
        structure: {
          intro: "Di a dónde fuiste y cuándo.",
          body: "Describe qué compraste, de qué color y talla.",
          conclusion: "Di cuánto pagaste y cómo (tarjeta o efectivo).",
        },
        connectors: [
          "El sábado pasado fui a",
          "Compré un",
          "Es de color",
          "Pagué con tarjeta",
          "Me gustó mucho",
        ],
        wordCount: "40-60 palabras",
      },
      optionB: {
        title: "Un regalo para mi madre",
        description:
          "Escribe un texto corto sobre la compra de un regalo especial para el cumpleaños de tu madre.",
        structure: {
          intro: "Menciona que es el cumpleaños de tu madre y qué quieres comprar.",
          body: "Describe la tienda a la que fuiste y el precio del regalo.",
          conclusion: "Di si le gustó el regalo.",
        },
        connectors: [
          "Es el cumpleaños de mi madre",
          "Quiero comprarle",
          "Fui a una tienda de",
          "Cuesta treinta euros",
          "Le gustó mucho",
        ],
        wordCount: "40-60 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Mi ropa favorita",
        description:
          "Habla durante 1 minuto sobre tu prenda de vestir favorita, de qué color es, dónde la compraste y cuándo la llevas.",
        connectors: [
          "Mi ropa favorita es",
          "La compré en",
          "Cuesta",
          "Es de la talla",
          "La llevo los fines de semana",
        ],
        guideQuestions: [
          "¿Cuál es tu prenda de vestir o calzado favorito?",
          "¿De qué color y de qué material es?",
          "¿Dónde la compraste y cuánto costó?",
          "¿Cuándo la llevas normalmente?",
          "¿Por qué te gusta tanto?",
        ],
      },
      topic2: {
        title: "Ir de tiendas en mi ciudad",
        description: "Describe las opciones para ir de compras en tu ciudad de origen o donde vives ahora.",
        connectors: [
          "En mi ciudad hay",
          "El centro comercial más grande es",
          "Prefiero comprar en",
          "Los precios son",
          "Normalmente pago con",
        ],
        guideQuestions: [
          "¿Hay tiendas pequeñas o centros comerciales grandes en tu ciudad?",
          "¿Cuál es tu lugar preferido para comprar y por qué?",
          "¿Con quién vas de compras normalmente?",
          "¿Los dependientes son amables?",
          "¿Cómo prefieres pagar tus compras (tarjeta o efectivo)?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero estáis en una tienda de ropa en el centro de Madrid. Queréis elegir un regalo de cumpleaños para un amigo común (Carlos), que cumple 21 años el próximo lunes.",
      questions: [
        {
          question:
            "Pregunta a tu compañero: ¿Qué prenda de vestir le gusta más a Carlos? ¿Una camiseta o unos pantalones cortos?",
          help: "Usa: ¿Qué le regalamos? / ¿Le gustan las camisetas?",
          usefulPhrases: [
            "Hola. ¿Qué le podemos regalar a Carlos?",
            "¿Le gustan las camisetas de manga corta?",
            "¿O prefieres unos pantalones cortos azules?",
            "Su color favorito es el rojo.",
          ],
        },
        {
          question:
            "Pregunta por los detalles técnicos: ¿Qué talla usa Carlos y de qué color compramos la prenda?",
          help: "Usa: ¿Qué talla es? / ¿Es de color negro o blanco?",
          usefulPhrases: [
            "¿Sabes qué talla de ropa usa Carlos?",
            "Creo que usa la talla mediana (M).",
            "La camiseta negra combina con todo.",
            "Vamos a preguntar al dependiente de la tienda.",
          ],
        },
        {
          question:
            "Negocia el presupuesto: ¿Cuánto dinero queremos gastar entre los dos y cómo vamos a pagar?",
          help: "Usa: ¿Cuánto cuesta? / ¿Pagas con tarjeta o efectivo?",
          usefulPhrases: [
            "¿Cuál es nuestro presupuesto máximo?",
            "Esta chaqueta de abrigo cuesta cuarenta euros.",
            "Yo puedo poner veinte euros en efectivo.",
            "Perfecto, yo pago con tarjeta de crédito en la caja.",
          ],
        },
      ],
    },
  },
  {
    id: 31,
    level: "A1",
    theme: "La ciudad y direcciones",
    icon: "MapPin",
    vocabulary: [
      {
        word: "calle",
        definition: "Vía pública entre edificios o solares",
        chinese: "街道",
        example: "Mi oficina está en la calle Mayor.",
      },
      {
        word: "esquina",
        definition: "Arista o ángulo que forman dos calles al cruzarse",
        chinese: "拐角 / 路口",
        example: "La farmacia está en la esquina de la plaza.",
      },
      {
        word: "recto",
        definition: "En línea recta, sin desvíos",
        chinese: "直 (直走)",
        example: "Siga todo recto para llegar al parque.",
      },
      {
        word: "girar",
        definition: "Dar vueltas, cambiar de dirección (izquierda/derecha)",
        chinese: "转弯 / 拐",
        example: "Tienes que girar a la derecha en el semáforo.",
      },
      {
        word: "lejos",
        definition: "A gran distancia de un lugar",
        chinese: "远",
        example: "El hospital está lejos de mi piso.",
      },
      {
        word: "cerca",
        definition: "A poca distancia de un lugar",
        chinese: "近",
        example: "El banco está muy cerca del metro.",
      },
      {
        word: "plaza",
        definition: "Lugar ancho y espacioso dentro de una población",
        chinese: "广场",
        example: "La plaza Mayor tiene una fuente preciosa.",
      },
      {
        word: "parada",
        definition: "Lugar donde paran los autobuses o taxis",
        chinese: "车站 / 站点",
        example: "La parada de autobús está enfrente del banco.",
      },
    ],
    reading: {
      textType: "narrativo",
      title: "Perdido en Granada",
      text: `Hola, soy Javier y hoy quiero contaros mi experiencia de ayer por la tarde en Granada, una ciudad pequeña pero muy bonita del sur de España. Es mi primera semana viviendo aquí porque estudio español en una escuela del centro.

Ayer quería ir a la biblioteca municipal para preparar mis deberes de gramática española. La biblioteca está cerca del parque García Lorca. Sin embargo, no tengo datos en mi móvil y me perdí en las calles del centro. Estaba muy preocupado porque no sabía cómo volver a mi piso.

Decidí pedir indicaciones a una mujer mayor que caminaba por la calle. Le pregunté de forma muy educada: "Disculpe, señora, ¿sabe dónde está la biblioteca pública?". Ella me sonrió de forma muy amable y me dijo: "Sí, claro, joven. No está lejos de aquí".

Me explicó las direcciones paso a paso: "Siga todo recto por esta calle hasta llegar a la Plaza Nueva. En la esquina de la plaza, gire a la izquierda y cruce el paso de cebra. La biblioteca está justo al lado del supermercado, enfrente del gran parque". Seguí sus instrucciones y llegué en diez minutos. La gente de Granada es muy amable con los extranjeros.`,
      questions: [
        {
          id: 1,
          question: "¿Dónde ocurre la historia de Javier?",
          options: ["a) En Madrid", "b) En Barcelona", "c) En Sevilla", "d) En Granada"],
          correctAnswer: 3,
          explanation: 'El texto dice: "hoy quiero contaros mi experiencia de ayer por la tarde en Granada".',
        },
        {
          id: 2,
          question: "¿Cómo describe Javier la ciudad de Granada?",
          options: [
            "a) Enorme y muy ruidosa",
            "b) Pequeña pero muy bonita",
            "c) Fea y aburrida",
            "d) Moderna y muy cara",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Granada, una ciudad pequeña pero muy bonita del sur de España".',
        },
        {
          id: 3,
          question: "¿Por qué está Javier en Granada?",
          options: [
            "a) Porque está de vacaciones",
            "b) Porque trabaja en un banco",
            "c) Porque estudia español en una escuela",
            "d) Porque visita a sus abuelos",
          ],
          correctAnswer: 2,
          explanation:
            'El texto dice: "Es mi primera semana viviendo aquí porque estudio español en una escuela del centro".',
        },
        {
          id: 4,
          question: "¿A qué lugar quería ir Javier ayer?",
          options: [
            "a) Al centro comercial",
            "b) A la biblioteca municipal",
            "c) Al hospital infantil",
            "d) A la estación de tren",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Ayer quería ir a la biblioteca municipal para preparar mis deberes".',
        },
        {
          id: 5,
          question: "¿Por qué se perdió Javier en las calles del centro?",
          options: [
            "a) Porque llovía mucho",
            "b) Porque era de noche",
            "c) Porque no tiene datos en su móvil",
            "d) Porque no tiene mapa de papel",
          ],
          correctAnswer: 2,
          explanation: 'El texto dice: "no tengo datos en mi móvil y me perdí en las calles del centro".',
        },
        {
          id: 6,
          question: "¿A quién decidió pedir indicaciones Javier?",
          options: [
            "a) A un policía de tráfico",
            "b) A un taxista",
            "c) A una mujer mayor que caminaba",
            "d) A un dependiente de la tienda",
          ],
          correctAnswer: 2,
          explanation:
            'El texto dice: "Decidí pedir indicaciones a una mujer mayor que caminaba por la calle".',
        },
        {
          id: 7,
          question: "¿La biblioteca pública está lejos del lugar del encuentro?",
          options: [
            "a) Sí, está a una hora en autobús",
            "b) No, no está lejos",
            "c) Sí, está en las afueras de la ciudad",
            "d) Está al lado de la comisaría",
          ],
          correctAnswer: 1,
          explanation: 'La mujer dice: "No está lejos de aquí".',
        },
        {
          id: 8,
          question: "¿Cuál es el primer paso de las instrucciones de la mujer?",
          options: [
            "a) Girar a la derecha",
            "b) Coger un taxi en la esquina",
            "c) Siga todo recto por esta calle hasta la Plaza Nueva",
            "d) Cruzar el parque",
          ],
          correctAnswer: 2,
          explanation: 'La señora dice: "Siga todo recto por esta calle hasta llegar a la Plaza Nueva".',
        },
        {
          id: 9,
          question: "¿Dónde tiene que girar el estudiante al llegar a la esquina de la plaza?",
          options: [
            "a) A la derecha",
            "b) A la izquierda",
            "c) No tiene que girar",
            "d) Tiene que entrar en la iglesia",
          ],
          correctAnswer: 1,
          explanation: 'La señora dice: "En la esquina de la plaza, gire a la izquierda".',
        },
        {
          id: 10,
          question: "¿Dónde está situada la biblioteca exactamente?",
          options: [
            "a) Al lado de la farmacia, enfrente de la estación",
            "b) Al lado del supermercado, enfrente del gran parque",
            "c) Detrás del banco central",
            "d) Dentro del centro comercial",
          ],
          correctAnswer: 1,
          explanation:
            'La señora dice: "La biblioteca está justo al lado del supermercado, enfrente del gran parque".',
        },
      ],
    },
    listening: {
      title: "Un paseo por Madrid",
      transcription: `Hola, soy Li Wei. Hoy es domingo y hace un sol espectacular en Madrid. He decidido salir a pasear por el centro de la ciudad con mi compañero de piso, Carlos.

Primero, cogemos el metro cerca de nuestro piso y vamos hasta la estación de Sol. Al salir, la Plaza Mayor está llena de vida. Hay muchos turistas sacando fotos y familias paseando. Vemos una estatua muy famosa en el centro de la plaza. Luego, caminamos por las calles comerciales que están al lado. Hay muchas librerías y tiendas de regalos.

A las dos de la tarde, tenemos hambre. Carlos me propone comer en un restaurante italiano que está enfrente del mercado municipal. Pedimos pasta fresca y agua fría. La comida está riquísima. Después de comer, vamos andando hasta el parque de El Retiro. Nos sentamos en un banco debajo de un árbol grande y yo leo un libro de español. Me encanta pasear y disfrutar de Madrid en fin de semana.`,
      questions: [
        {
          id: 1,
          question: "¿Qué día de la semana realiza Li Wei el paseo?",
          options: ["a) Sábado por la tarde", "b) Domingo", "c) Lunes laborable", "d) Viernes por la noche"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "¿Con quién pasea Li Wei por el centro de la ciudad?",
          options: [
            "a) Con su hermano mayor",
            "b) Con su compañero de piso Carlos",
            "c) Con su profesora de español",
            "d) Solo",
          ],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "¿Qué medio de transporte público utilizan para ir al centro?",
          options: ["a) El autobús número 32", "b) El metro", "c) Un taxi", "d) Van en bicicleta"],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "¿Qué estación de metro eligen para bajarse?",
          options: [
            "a) Estación de Atocha",
            "b) Estación de Sol",
            "c) Estación de Retiro",
            "d) Estación del norte",
          ],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "¿Qué hay en el centro de la Plaza Mayor de Madrid?",
          options: [
            "a) Una fuente de mármol",
            "b) Una estatua muy famosa",
            "c) Un supermercado enorme",
            "d) Una parada de taxis",
          ],
          correctAnswer: 1,
        },
        {
          id: 6,
          question: "¿Qué tipo de tiendas comerciales hay en las calles de al lado de la plaza?",
          options: [
            "a) Carnicerías y pescaderías",
            "b) Librerías y tiendas de regalos",
            "c) Zapaterías caras",
            "d) Farmacias de guardia",
          ],
          correctAnswer: 1,
        },
        {
          id: 7,
          question: "¿A qué hora deciden comer porque tienen hambre?",
          options: [
            "a) A la una del mediodía",
            "b) A las dos de la tarde",
            "c) A las tres de la tarde",
            "d) A las ocho de la noche",
          ],
          correctAnswer: 1,
        },
        {
          id: 8,
          question: "¿Dónde está situado el restaurante italiano?",
          options: [
            "a) Al lado de la estación de tren",
            "b) Enfrente del mercado municipal",
            "c) Dentro del centro comercial",
            "d) En el parque del Retiro",
          ],
          correctAnswer: 1,
        },
        {
          id: 9,
          question: "¿A qué parque famoso van andando después de comer?",
          options: [
            "a) Parque García Lorca",
            "b) Parque de El Retiro",
            "c) Parque del Sur",
            "d) Parque Central",
          ],
          correctAnswer: 1,
        },
        {
          id: 10,
          question: "¿Qué hace Li Wei en el parque mientras descansa bajo el árbol?",
          options: [
            "a) Juega al fútbol con Carlos",
            "b) Lee un libro de español",
            "c) Duerme dos horas en la hierba",
            "d) Escucha música con el móvil",
          ],
          correctAnswer: 1,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi barrio y mi casa",
        description:
          "Escribe un correo electrónico a un amigo describiendo el barrio donde vives y cómo llegar a tu casa desde la parada de metro más cercana.",
        structure: {
          intro: "Presenta tu barrio (tranquilo, ruidoso, céntrico).",
          body: "Describe qué lugares hay cerca (supermercado, parque, farmacia).",
          conclusion: "Da instrucciones sencillas para llegar a tu puerta.",
        },
        connectors: [
          "Mi barrio es muy",
          "Hay un parque al lado de",
          "Para llegar a mi casa",
          "Siga todo recto",
          "Gira a la derecha",
        ],
        wordCount: "40-60 palabras",
      },
      optionB: {
        title: "Mi rincón favorito de la ciudad",
        description:
          "Escribe un texto corto sobre tu lugar preferido en la ciudad (un parque, una plaza, un museo).",
        structure: {
          intro: "Di cuál es tu rincón favorito y dónde está.",
          body: "Describe cómo es físicamente y qué hay allí.",
          conclusion: "Explica por qué te gusta ir en tu tiempo libre.",
        },
        connectors: [
          "Mi lugar favorito es",
          "Está situado en",
          "Es amplio y luminoso",
          "Me gusta ir porque",
          "Me relaja mucho",
        ],
        wordCount: "40-60 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "La ciudad donde vivo",
        description:
          "Habla durante 1 minuto sobre la ciudad en la que vives actualmente, cómo es y qué lugares visitas los fines de semana.",
        connectors: [
          "Vivo en",
          "Es una ciudad",
          "Tiene muchos lugares como",
          "Los sábados me gusta ir al",
          "Está cerca de",
        ],
        guideQuestions: [
          "¿En qué ciudad vives y cómo es (grande, tranquila, turística)?",
          "¿Qué servicios esenciales (hospital, bancos, supermercados) hay en tu zona?",
          "¿Hay zonas verdes o parques para pasear cerca de tu casa?",
          "¿Qué lugares visitas en tu tiempo libre?",
          "¿Qué es lo que más te gusta de tu ciudad?",
        ],
      },
      topic2: {
        title: "Perdido en un lugar nuevo",
        description:
          "Narra una situación real o imaginaria en la que te perdiste en una ciudad desconocida y tuviste que pedir ayuda.",
        connectors: [
          "Una vez viajé a",
          "No tenía mapa ni",
          "Me perdí en",
          "Le pregunté a un",
          "Me explicó que tenía que",
          "Llegué en",
        ],
        guideQuestions: [
          "¿A qué ciudad viajaste y con quién?",
          "¿Por qué te perdiste (no tenías móvil, las calles eran difíciles)?",
          "¿Cómo te sentías en ese momento (nervioso, preocupado)?",
          "¿A quién pediste indicaciones y qué le dijiste?",
          "¿Cómo llegaste finalmente a tu destino?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero sois turistas en Barcelona. Queréis ir a cenar a un restaurante típico del centro pero estáis perdidos. Decidís pedir direcciones a un policía en la calle y poneros de acuerdo en cómo ir.",
      questions: [
        {
          question:
            "Pregunta a tu compañero: ¿Qué restaurante prefieres buscar? ¿El de tapas o la marisquería?",
          help: "Usa: ¿Qué restaurante buscamos? / ¿Prefieres las tapas?",
          usefulPhrases: [
            "Hola, estoy muy perdido hoy.",
            "¿Qué restaurante queremos buscar para cenar?",
            "Yo prefiero un bar de tapas tradicionales.",
            "La marisquería está muy lejos de aquí.",
          ],
        },
        {
          question: "Pregunta al policía de forma formal: ¿Podría decirnos si hay un metro por aquí cerca?",
          help: "Usa: Disculpe, oficial. / ¿Dónde está el metro?",
          usefulPhrases: [
            "Disculpe, agente. Estamos perdidos.",
            "¿Podría indicarnos dónde está la estación más cercana?",
            "¿Se puede ir andando o está muy lejos?",
            "Muchas gracias por su amable ayuda.",
          ],
        },
        {
          question: "Ponte de acuerdo con tu compañero: ¿Vamos a pie o cogemos el autobús de la esquina?",
          help: "Usa: ¿Vamos andando? / ¿Cogemos el autobús?",
          usefulPhrases: [
            "El policía dice que el metro está a cinco minutos.",
            "¿Prefieres ir andando (a pie)?",
            "Hace bastante frío, mejor cogemos el autobús.",
            "La parada está al lado de la farmacia.",
          ],
        },
      ],
    },
  },
  {
    id: 32,
    level: "A1",
    theme: "La comida y bebida",
    icon: "Coffee",
    vocabulary: [
      {
        word: "café con leche",
        definition: "Bebida caliente de café mezclado con leche",
        chinese: "牛奶咖啡 / 拿铁",
        example: "Por la mañana desayuno un café con leche templado.",
      },
      {
        word: "zumo de naranja",
        definition: "Líquido exprimido de la naranja natural",
        chinese: "橙汁",
        example: "El zumo de naranja natural tiene mucha vitamina C.",
      },
      {
        word: "caña",
        definition: "Vaso pequeño de cerveza tirada de barril",
        chinese: "一杯生啤 / 扎啤 (小杯)",
        example: "Camarero, una caña bien fría, por favor.",
      },
      {
        word: "ración",
        definition: "Plato de comida que se comparte entre varias personas en un bar",
        chinese: "一盘 / 一份 (分享装小吃)",
        example: "Pedimos una ración de patatas bravas para compartir.",
      },
      {
        word: "camarero",
        definition: "Persona que sirve comidas y bebidas en los bares",
        chinese: "服务员 / 侍者",
        example: "El camarero toma nota de nuestro pedido.",
      },
      {
        word: "cuenta",
        definition: "Papel que detalla el precio total consumido en el bar",
        chinese: "账单 / 结账",
        example: "Camarero, la cuenta, por favor.",
      },
      {
        word: "patatas bravas",
        definition: "Patatas fritas cortadas en cubos con salsa picante típica de España",
        chinese: "辣辣土豆 / 勇敢辣土豆",
        example: "Las patatas bravas de este bar están deliciosas.",
      },
      {
        word: "chocolate caliente",
        definition: "Bebida dulce y espesa hecha de chocolate fundido en leche",
        chinese: "热巧克力",
        example: "En invierno tomamos chocolate caliente con churros.",
      },
    ],
    reading: {
      textType: "descriptivo",
      title: "Una tarde en la cafetería madrileña",
      text: `Hola, soy Li Na y soy estudiante china. Vivo en Madrid desde hace tres meses. Me encanta la vida social de la ciudad. Los españoles pasan mucho tiempo en las terrazas de las cafeterías charlando con amigos.

Ayer por la tarde, quedé con mi compañero de clase, Carlos, en una cafetería muy acogedora al lado de la Plaza Mayor. El camarero, que era muy cortés, se acercó a nuestra mesa y nos preguntó: "¿Qué desean tomar?".

Carlos, que tenía mucha prisa porque entraba a trabajar tarde, pidió un café con leche caliente y un cruasán. Yo preferí pedir un zumo de naranja natural y una tostada con aceite de oliva. La comida estaba deliciosa. Después de comer, estuvimos una hora charlando en español sobre nuestros planes para el fin de semana.

Finalmente, pedimos la cuenta. En total fueron siete euros con cincuenta céntimos. Pagamos con tarjeta de crédito en la mesa. Al salir, nos despedimos del camarero de forma muy educada: "Hasta luego, muchas gracias". En España, es una norma social de cortesía dar las gracias al salir de un local público. Me encanta la cultura de los bares de Madrid.`,
      questions: [
        {
          id: 1,
          question: "¿Cuánto tiempo lleva Li Na viviendo en Madrid?",
          options: ["a) Un mes", "b) Dos meses", "c) Tres meses", "d) Cinco meses"],
          correctAnswer: 2,
          explanation: 'El texto dice: "Vivo en Madrid desde hace tres meses".',
        },
        {
          id: 2,
          question: "¿Dónde pasan los españoles mucho tiempo según Li Na?",
          options: [
            "a) En los hospitales",
            "b) En las oficinas de extranjería",
            "c) En las terrazas de las cafeterías charlando",
            "d) En la biblioteca municipal",
          ],
          correctAnswer: 2,
          explanation:
            'El texto dice: "Los españoles pasan mucho tiempo en las terrazas de las cafeterías charlando".',
        },
        {
          id: 3,
          question: "¿Con quién se reunió la protagonista ayer por la tarde?",
          options: [
            "a) Con su profesor de español",
            "b) Con su hermano mayor",
            "c) Con su compañero de clase Carlos",
            "d) Sola en la cafetería",
          ],
          correctAnswer: 2,
          explanation: 'El texto dice: "quedé con mi compañero de clase, Carlos".',
        },
        {
          id: 4,
          question: "¿Dónde está situada la cafetería acogedora?",
          options: [
            "a) Lejos del centro",
            "b) Al lado de la Plaza Mayor",
            "c) Dentro de la estación de tren",
            "d) En el hospital central",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "en una cafetería muy acogedora al lado de la Plaza Mayor".',
        },
        {
          id: 5,
          question: "¿Qué le preguntó el camarero a las amigas al acercarse?",
          options: [
            'a) "¿De dónde eres?"',
            'b) "¿Cuántos años tiene usted?"',
            'c) "¿Qué desean tomar?"',
            'd) "¿Cómo te llamas?"',
          ],
          correctAnswer: 2,
          explanation: 'El texto dice: "se acercó a nuestra mesa y nos preguntó: "¿Qué desean tomar?""',
        },
        {
          id: 6,
          question: "¿Por qué tenía prisa Carlos?",
          options: [
            "a) Porque el tren salía pronto",
            "b) Porque entraba a trabajar tarde",
            "c) Porque tenía frío",
            "d) Porque tenía un examen",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "Carlos, que tenía mucha prisa porque entraba a trabajar tarde".',
        },
        {
          id: 7,
          question: "¿Qué pidió Carlos para merendar?",
          options: [
            "a) Un chocolate caliente con churros",
            "b) Una caña de cerveza bien fría",
            "c) Un café con leche caliente y un cruasán",
            "d) Un zumo de naranja natural",
          ],
          correctAnswer: 2,
          explanation: 'El texto dice: "Carlos... pidió un café con leche caliente y un cruasán".',
        },
        {
          id: 8,
          question: "¿Qué ordenó Li Na para comer y beber?",
          options: [
            "a) Un té verde y una ensalada",
            "b) Un zumo de naranja natural y una tostada con aceite de oliva",
            "c) Un café solo y una tarta de chocolate",
            "d) Agua con gas fría",
          ],
          correctAnswer: 1,
          explanation:
            'El texto dice: "Yo preferí pedir un zumo de naranja natural y una tostada con aceite de oliva".',
        },
        {
          id: 9,
          question: "¿Cuánto pagaron en total por la merienda de los dos?",
          options: [
            "a) Cinco euros exactos",
            "b) Siete euros con cincuenta céntimos",
            "c) Diez euros en efectivo",
            "d) Fue gratis, invitó la casa",
          ],
          correctAnswer: 1,
          explanation: 'El texto dice: "En total fueron siete euros con cincuenta céntimos".',
        },
        {
          id: 10,
          question: "¿Qué norma social de cortesía realizan los clientes al salir de la cafetería?",
          options: [
            "a) No dicen nada al camarero",
            "b) Dan las gracias y se despiden de forma educada",
            "c) Regatean el precio de la cuenta",
            "d) Dejan propina de cincuenta euros",
          ],
          correctAnswer: 1,
          explanation:
            'El texto dice: "Al salir, nos despedimos del camarero de forma muy educada... En España, es una norma social de cortesía dar las gracias al salir".',
        },
      ],
    },
    listening: {
      title: "Una tarde de tapas en Madrid",
      transcription: `Hola, me llamo Carlos y soy camarero en el bar de tapas "El Sabor" en el centro de Madrid. Llevo trabajando en este local cinco años y me encanta hablar con la gente, especialmente con los turistas.

Ayer a las ocho de la tarde, que es la hora típica en la que abrimos para las cenas, llegaron dos estudiantes chinos. Se sentaron en una de las mesas de la terraza exterior. Se veían muy alegres. Me acerqué y les pregunté qué deseaban tomar.

Me pidieron dos cañas de cerveza bien fría y una botella de agua sin gas. Para comer, me pidieron una ración de patatas bravas y otra ración de croquetas de jamón para compartir en medio de la mesa. En España, es una tradición muy bonita compartir las raciones entre todos los amigos de la mesa. Serví las bebidas de inmediato y la comida estuvo lista en diez minutos. Me dijeron que el pulpo y las patatas estaban riquísimos. Al final, pagaron treinta euros con tarjeta de crédito, me dieron las gracias de forma muy educada y les deseé una feliz noche.`,
      questions: [
        {
          id: 1,
          question: "¿Cómo se llama el camarero del bar de tapas?",
          options: ["a) Pedro", "b) Luis", "c) Carlos", "d) Javier"],
          correctAnswer: 2,
        },
        {
          id: 2,
          question: "¿Cómo se llama el bar de tapas donde trabaja Carlos?",
          options: ["a) El Sol", "b) El Sabor", "c) La Paella", "d) La Cafetería"],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "¿A qué hora abren habitualmente el local para las cenas por la tarde?",
          options: [
            "a) A las cuatro de la tarde",
            "b) A las seis en punto",
            "c) A las ocho de la tarde",
            "d) A las diez de la noche",
          ],
          correctAnswer: 2,
        },
        {
          id: 4,
          question: "¿De qué nacionalidad eran los dos estudiantes que se sentaron en la terraza?",
          options: ["a) Españoles", "b) Chinos", "c) Canadienses", "d) Franceses"],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "¿Qué bebidas pidieron los estudiantes en primer lugar?",
          options: [
            "a) Dos cafés con leche y un té",
            "b) Dos cañas de cerveza bien fría y una botella de agua sin gas",
            "c) Un zumo de naranja natural y refresco de cola",
            "d) Una botella de vino tinto de la casa",
          ],
          correctAnswer: 1,
        },
        {
          id: 6,
          question: "¿Qué raciones de comida ordenaron para compartir?",
          options: [
            "a) Paella valenciana de marisco",
            "b) Ensalada de pollo y sopa caliente",
            "c) Una ración de patatas bravas y otra de croquetas de jamón",
            "d) Tortilla de patatas entera",
          ],
          correctAnswer: 2,
        },
        {
          id: 7,
          question: "¿Qué costumbre o tradición española de mesa realizan los amigos?",
          options: [
            "a) Regatear el precio final de la cuenta",
            "b) Compartir las raciones en medio de la mesa",
            "c) Pedir platos individuales sin hablar",
            "d) Comer en absoluto silencio",
          ],
          correctAnswer: 1,
        },
        {
          id: 8,
          question: "¿Cuánto tiempo tardó la comida en estar lista en la mesa?",
          options: ["a) Cinco minutos", "b) Diez minutos", "c) Veinte minutos", "d) Media hora"],
          correctAnswer: 1,
        },
        {
          id: 9,
          question: "¿Cuánto pagaron los estudiantes por toda la consumición?",
          options: ["a) Quince euros", "b) Veinticinco euros", "c) Treinta euros", "d) Cincuenta euros"],
          correctAnswer: 2,
        },
        {
          id: 10,
          question: "¿Cómo realizaron el pago de la cuenta al final?",
          options: [
            "a) En efectivo con billetes de veinte euros",
            "b) Con tarjeta de crédito",
            "c) No pagaron, invitó el camarero",
            "d) Dejaron un cheque bancario",
          ],
          correctAnswer: 1,
        },
      ],
    },
    writing: {
      optionA: {
        title: "Mi desayuno ideal",
        description:
          "Escribe un texto breve describiendo qué desayunas normalmente por la mañana, con quién y por qué te gusta.",
        structure: {
          intro: "Di a qué hora desayunas y dónde.",
          body: "Describe qué comes (tostadas, cruasanes) y qué bebes (café, té, zumo).",
          conclusion: "Explica con quién desayunas y por qué es un momento importante.",
        },
        connectors: [
          "Por la mañana desayuno a las",
          "Normalmente tomo",
          "Bebo un zumo de",
          "Desayuno con mi",
          "Me gusta porque",
        ],
        wordCount: "40-60 palabras",
      },
      optionB: {
        title: "Una tarde de tapas con amigos",
        description:
          "Escribe 3-4 frases sobre una tarde que fuiste a un bar de tapas tradicional con tus compañeros de clase.",
        structure: {
          intro: "Menciona el nombre del bar de tapas y con quién fuiste.",
          body: "Describe las bebidas y raciones de comida que pedisteis para compartir.",
          conclusion: "Menciona el precio final y si os gustó la comida.",
        },
        connectors: [
          "El sábado fui con mis amigos al bar",
          "Pedimos cañas de cerveza",
          "Para compartir elegimos patatas bravas",
          "La comida estaba riquísima",
          "Pagué con tarjeta",
        ],
        wordCount: "40-60 palabras",
      },
    },
    monologue: {
      topic1: {
        title: "Mi comida favorita española",
        description:
          "Habla durante 1 minuto sobre tu plato favorito de España (la paella, la tortilla de patata, etc.), qué ingredientes lleva y cuándo lo comes.",
        connectors: [
          "Mi comida favorita española es",
          "Es un plato típico que lleva",
          "Normalmente la como los",
          "La cocina mi",
          "Me gusta mucho porque",
        ],
        guideQuestions: [
          "¿Cuál es tu comida española favorita?",
          "¿Qué ingredientes principales lleva este plato?",
          "¿Quién la prepara mejor en tu familia o a qué restaurante vas?",
          "¿Con qué frecuencia comes este plato?",
          "¿Por qué se la recomiendas a tus compañeros chinos?",
        ],
      },
      topic2: {
        title: "La cafetería de mi escuela",
        description:
          "Describe la cafetería de tu academia, instituto o universidad, qué desayunos ofrece y cómo te atienden.",
        connectors: [
          "La cafetería de mi escuela está en",
          "Ofrece desayunos como",
          "El precio de un café es de",
          "Los dependientes son",
          "Suelo ir con",
        ],
        guideQuestions: [
          "¿Dónde está situada la cafetería de tu centro de estudios?",
          "¿Qué alimentos y bebidas puedes comprar para desayunar por la mañana?",
          "¿Los dependientes y camareros son amables con los alumnos?",
          "¿Cuál es el precio medio de un desayuno completo?",
          "¿Vas solo o acompañado en el recreo?",
        ],
      },
    },
    interaction: {
      situation:
        "Tú y tu compañero estáis sentados en una terraza de una cafetería del centro de Madrid. Tenéis mucha hambre y sed, y decidís llamar al camarero para pedir la merienda compartida.",
      questions: [
        {
          question: "Pregunta a tu compañero: ¿Qué tienes ganas de beber? ¿Café con leche o un zumo natural?",
          help: "Usa: ¿Qué quieres beber? / Yo prefiero un zumo.",
          usefulPhrases: [
            "Hola, ¡tengo muchísima sed!",
            "¿Qué tienes ganas de beber tú hoy?",
            "Yo voy a pedir un café con leche caliente.",
            "El zumo de naranja natural de aquí es excelente.",
          ],
        },
        {
          question:
            "Pregunta a tu compañero: ¿Qué ración de comida pedimos para compartir en medio de la mesa?",
          help: "Usa: ¿Qué comemos? / ¿Pedimos unas patatas bravas?",
          usefulPhrases: [
            "Tengo un poco de hambre de merienda.",
            "¿Pedimos una ración de patatas bravas para compartir?",
            "A mí me gustan más los cruasanes dulces.",
            "Vamos a llamar al camarero: ¡Por favor, camarero!",
          ],
        },
        {
          question: "Pide la cuenta de manera educada al camarero: ¿Aceptan pago con tarjeta en la mesa?",
          help: "Usa: La cuenta, por favor. / ¿Puedo pagar con tarjeta?",
          usefulPhrases: [
            "Camarero, la cuenta por favor.",
            "¿Cuánto cuesta la merienda de los dos?",
            "¿Aceptan tarjeta de crédito en la terraza?",
            "Muchas gracias por su rápido servicio, muy amable.",
          ],
        },
      ],
    },
  },
];
export { a1Exams as default };
