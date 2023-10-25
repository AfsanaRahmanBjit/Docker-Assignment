const express = require("express");
const routes = express();
const BookController= require("../controller/BookController");
const {bookValidator } = require("../middleware/bookValidator");
const {isAuthorized,isAdmin,isUser}=require("../middleware/isAuthorized");
const upload = require("../config/files");


routes.get("/all",BookController.getAll);
routes.get("/get/:id",BookController.getOneById);
routes.post("/add", isAuthorized,isAdmin,bookValidator.add,BookController.add);
routes.put("/update/:id",isAuthorized,isAdmin,bookValidator.update,BookController.update);
routes.patch("/update/:id",isAuthorized,isAdmin,bookValidator.partialUpdate,BookController.partialUpdate);
routes.delete("/delete/:id",isAuthorized,isAdmin,BookController.deleteOneById);


module.exports = routes;
