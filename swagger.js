const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Hotel Mobile Apis',
            version: '1.0.0',
            description: 'Your API Description'
        },
        servers: [
            {
                url: 'http://localhost:3000', // Change this to your server URL
                description: 'Local server'
            },
                {
                url: 'https://node-app-66q3.onrender.com', // Change this to your server URL
                description: 'Live server'
            },
        ]
        
    },
     components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    apis: ['./routes/*.js'] // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = {
  
    swaggerUi,
      swaggerDocs
}
