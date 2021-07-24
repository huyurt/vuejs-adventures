﻿import axios from "axios";

const debug = process.env.NODE_DEV !== "production";
const baseURL = debug
    ? "https://localhost:5001/api/v2.0"
    : "?";
let api = axios.create({baseURL});
export default api;