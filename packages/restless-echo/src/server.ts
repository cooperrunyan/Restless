import { app } from './app';
import { config } from 'dotenv';

config();

app.listen({ port: +process.env.PORT! }, () => console.log(`App running on port: ${process.env.PORT}`));
