import express from "express";

import { getAllProducts, insertProduct } from "./controllers/products.js";
import {
  createUser,
  loginUser,
  verifyJWT,
  isAuth,
  getUserInfo
} from "./controllers/credential.js";

import {createPayment, createPaymentDB} from './controllers/payment.js';
import getAllOrders from './controllers/orders.js';


const router = express.Router();

router.get("/getAllProducts", getAllProducts);
router.post("/insertProduct", insertProduct);
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/isUserAuth", verifyJWT, isAuth);
router.post('/getUserInfo', getUserInfo);
router.post('/payments/create', createPayment);
router.post('/payments/createDB', createPaymentDB);
router.post('/getAllOrders', getAllOrders)

export default router;
