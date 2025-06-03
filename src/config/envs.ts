import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

  PORT: get('PORT').required().default(3000).asPortNumber(),
  FILE_PATH: get('FILE_PATH').required().default("files").asString(),
  HOST_NAME: get('HOST_NAME').required().default('http://localhost').asString(),
  BANDAGE_PORT: get('BANDAGE_PORT').required().default(3001).asPortNumber(),
}