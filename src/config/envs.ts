import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

  PORT: get('PORT').required().asPortNumber(),
  FILE_PATH: get('FILE_PATH').required().asString(),
  
}