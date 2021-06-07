const Sequelize = require('sequelize');
                                //database username   password
                                const sequelize = new Sequelize('gamedb', 'postgres', 'ghastb0i', {
    host: 'localhost',
    port: '5433',
    dialect: 'postgres'
})

sequelize.authenticate().then(
    function success() {
        console.log("Connected to DB");
        
    })
    .catch( function fail(err) {
        console.log(`Error: ${err}`);
    });

module.exports = sequelize;
