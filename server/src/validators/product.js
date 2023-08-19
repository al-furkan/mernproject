const {body} = require('express-validator');

//ragistation validator

const validatProduct =[
  body('name')
  .trim()
  .notEmpty()
  .withMessage('catagori Name is require.Enter your catagoriname')
  .isLength({min:3,max:150})
  .withMessage('Name should be at least 3-150 characters long'),

  body('description')
  .trim()
  .notEmpty()
  .withMessage('description is require.')
  .isLength({min:3})
  .withMessage('description should be at least 3 characters long'),

  body('price')
  .trim()
  .notEmpty()
  .withMessage('price is require.')
  .isLength({min:0})
  .withMessage('price should be positive number'),
  body('quantity')
  .trim()
  .notEmpty()
  .withMessage('quantity is require.')
  .isLength({min:0})
  .withMessage('quantity should be positive number'),
  body('catagory')
  .trim()
  .notEmpty()
  .withMessage('quantity is require.')
];

module.exports ={
    validatProduct,
}