const {body} = require('express-validator');

//ragistation validator

const validatCatagori =[
  body('name')
  .trim()
  .notEmpty()
  .withMessage('catagori Name is require.Enter your catagoriname')
  .isLength({min:3})
  .withMessage('Name should be at least 3 characters long'),
];

module.exports ={
  validatCatagori,
}