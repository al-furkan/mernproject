const connectDatabase = require('./config/db');
const app = require('./app');

const { serverPort } = require('./secret')

app. listen(serverPort, async()=>{
    console.log(`server is running at http://localhost:${serverPort}`);
    await connectDatabase();
});
