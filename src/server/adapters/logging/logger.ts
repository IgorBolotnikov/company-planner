import { CONFIG } from "@/config";
import pino from "pino";

export const logger = pino({
  level: CONFIG.ENV === "production" ? "info" : "debug",
});
