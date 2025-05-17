import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

  PORT: get('PORT').required().default(3000).asPortNumber(),
  FILE_PATH: get('FILE_PATH').required().default("uploads").asString(),
  
}