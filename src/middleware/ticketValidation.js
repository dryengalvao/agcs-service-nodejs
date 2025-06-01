const { validationResult, checkSchema } = require('express-validator');
const logger = require("../utils/logger");

// Definição do schema para validação dos campos do ticket
const ticketValidationSchema = {
  title: {
    notEmpty: { errorMessage: 'O campo Title é obrigatório' },
    trim: true,
    isLength: {
      options: { min: 3, max: 255 },
      errorMessage: 'O campo Title deve ter entre 3 e 255 caracteres'
    }
  },
  description: {
    notEmpty: { errorMessage: 'O campo Description é obrigatório' },
    trim: true,
    isLength: {
      options: { min: 3, max: 1000 },
      errorMessage: 'O campo Description deve ter entre 3 e 1000 caracteres'
    }
  },
  category: {
    notEmpty: { errorMessage: 'O campo Category é obrigatório' },
    trim: true
  },
  sentiment: {
    optional: true,
    trim: true
  }
};


const TicketValidation = async (req, res, next) => {
  
  await Promise.all(checkSchema(ticketValidationSchema).map(validation => validation.run(req)));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error(`Erros de validação na criação de ticket: ${JSON.stringify(errors.array())}`);
    return res.status(422).json({ errors: errors.array() });
  }

  next();
};

module.exports = TicketValidation;
