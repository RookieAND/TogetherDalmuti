import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import { DEV_CONFIG, PROD_CONFIG } from '@/constants/index';

dotenv.config();

// ES Module 에는 __dirname 변수가 없기에 이를 만들어야 함.
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isProd: boolean = process.env.NODE_ENV === 'production';
const CONFIG = isProd ? PROD_CONFIG : DEV_CONFIG;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.get('/', (_, res) => {
  res.status(200).send('Web Dalmuti Server has been Enabled.');
});

app.listen(CONFIG.port, () => {
  console.log(`server is running on ${CONFIG.port}`);
});

// MongoDB Connection 관련 파트. (Cluster URL의 경우 환경변수 파일에 저장)
// 6.0.0 부터는 자동으로 useNewUrlParser, useCreateIndex, useUnifiedTopology 옵션이 적용됨.
// mongoose.connect(`${process.env.ATLAS_URL}`);

// const DBconnection = mongoose.connection;
// DBconnection.once('open', () => {
//   console.log('MongoDB 클러스터와의 연결이 성공적으로 완료되었습니다.');
// });
