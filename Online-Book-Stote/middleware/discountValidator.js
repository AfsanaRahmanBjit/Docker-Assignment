const { body } = require("express-validator");
const dateFormat = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}\+00:00)$/;


const discountValidator = {
  add: [
    body("bookID")
      .exists()
      .withMessage("Please provide a book ID")
      .bail()
      .notEmpty()
      .withMessage("Book ID cannot be empty")
      .bail()
      .isMongoId()
      .withMessage("Book ID must be a valid MongoDB ObjectId"),

    body("discountPercentage")
      .exists()
      .withMessage("Please provide a discount percentage")
      .bail()
      .notEmpty()
      .withMessage("Discount percentage cannot be empty")
      .bail()
      .isNumeric()
      .withMessage("Discount percentage must be a numeric value")
      .bail()
      .isFloat({ min: 1, max: 100 })
      .withMessage("Discount percentage must be between 0 and 100"),

    body("startDate")
      .exists()
      .withMessage("Please provide a start date")
      .bail()
      .notEmpty()
      .withMessage("Start Date  cannot be empty")
      .bail()
      .matches(dateFormat)
      .withMessage("Start date must be in the format 'YYYY-MM-DDTHH:MM:SS.sss+00:00'"),

      

    body("endDate")
      .exists()
      .withMessage("Please provide an end date")
      .bail()
      .notEmpty()
      .withMessage("End Date cannot be empty")
      .bail()
      .matches(dateFormat)
      .withMessage("End date must be in the format 'YYYY-MM-DDTHH:MM:SS.sss+00:00'"),
  ],
  
  update: [
    body("discountPercentage")
      .exists()
      .withMessage("Please provide a discount percentage")
      .bail()
      .notEmpty()
      .withMessage("Discount percentage cannot be empty")
      .bail()
      .isNumeric()
      .withMessage("Discount percentage must be a numeric value")
      .bail()
      .isFloat({ min: 1, max: 100 })
      .withMessage("Discount percentage must be between 1 and 100"),

    body("startDate")
      .exists()
      .withMessage("Please provide a start date")
      .bail()
      .notEmpty()
      .withMessage("Start Date  cannot be empty")
      .bail()
      .matches(dateFormat)
      .withMessage("Start date must be in the format 'YYYY-MM-DDTHH:MM:SS.sss+00:00'"),

    body("endDate")
      .exists()
      .withMessage("Please provide an end date")
      .bail()
      .notEmpty()
      .withMessage("End Date  cannot be empty")
      .bail()
      .matches(dateFormat)
      .withMessage("End date must be in the format 'YYYY-MM-DDTHH:MM:SS.sss+00:00'"),

  ],

  partialUpdate: [
    body("discountPercentage")
      .optional()
      .isNumeric()
      .withMessage("Discount percentage must be a numeric value")
      .bail()
      .isFloat({ min: 1, max: 100 })
      .withMessage("Discount percentage must be between 1 and 100"),

    body("startDate")
      .optional()
      .matches(dateFormat)
      .withMessage("Start date must be in the format 'YYYY-MM-DDTHH:MM:SS.sss+00:00'"),



    body("endDate")
      .optional()
      .matches(dateFormat)
      .withMessage("End date must be in the format 'YYYY-MM-DDTHH:MM:SS.sss+00:00'"),

  ]
};

module.exports = { discountValidator };
