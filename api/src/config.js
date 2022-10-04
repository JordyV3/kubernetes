import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3000;
export const DB_HOST = process.env.DB_HOST || "db-mysql-do-user-12527031-0.b.db.ondigitalocean.com";
export const DB_USER = process.env.DB_USER || "doadmin";
export const DB_PASSWORD = process.env.DB_PASSWORD || "AVNS_MrgyHjIwi-R6P941SvV";
export const DB_DATABASE = process.env.DB_DATABASE || "companydb";
export const DB_PORT = process.env.DB_PORT || 25060;
