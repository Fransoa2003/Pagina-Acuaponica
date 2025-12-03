import 'dotenv/config';
import app from './app.js';
import {connectDB} from './db.js';

connectDB();

app.listen(3001,'0.0.0.0'); //especificamos el puerto y el servidor 0.0.0.0 para escuchar lo externo
console.log('Servidor en el puerto',3001);
// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Servidor Express ejecutándose en el puerto ${PORT}`);
//   });
// });