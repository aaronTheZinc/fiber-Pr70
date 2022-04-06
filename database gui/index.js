(async () => {
    const app = require('express')();
    const {Noco} = require("nocodb");
    app.use(await Noco.init({}));
    console.log(`Visit : localhost:9090/dashboard`)    
    app.listen(9090);
})()
