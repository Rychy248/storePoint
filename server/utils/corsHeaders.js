// USED THE CORS PAQUTE INSTACE OF MANUALLY IMPLEMNTATION

// Middleware para configurar los encabezados CORS
function corsHeaders (req, res, next) {
    // Allowed origins (Domines)
    const allowedOrigins = ['http://localhost', "http://127.0.0.1:5500","http://localhost:8080/", "localhost:8080","http://localhost:8080"];

    //Verify if the origin in the request is in the allowd domines
    let origin = req.headers.origin;
    origin = origin ? origin : req.headers.host;
    console.log("FETCH FROM ORIGIN: "+origin);

    if (allowedOrigins.includes(origin)) {
        // Configure the headers CORS for allow the access from the especific origin
        res.setHeader('Access-Control-Allow-Origin', origin);
    };

    // config the others hedaers
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    console.log("CORS HEADERS FUNCTION REACHED")
    // Continue with the other midleware
    next();
};

// module.exports = corsHeaders;

/** ORIGINAL EXAMPLE
    // Middleware para configurar los encabezados CORS
    app.use((req, res, next) => {
        // Orígenes permitidos (dominios)
        const allowedOrigins = ['https://www.dominio1.com', 'https://www.dominio2.com', 'https://www.dominio3.com'];

        // Verificar si el origen de la solicitud está en los dominios permitidos
        const origin = req.headers.origin;
        if (allowedOrigins.includes(origin)) {
            // Configurar los encabezados CORS para permitir el acceso desde el origen específico
            res.setHeader('Access-Control-Allow-Origin', origin);
        }

        // Configurar otros encabezados CORS necesarios
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        // Continuar con el siguiente middleware
        next();
    });

 */
