# Nodejs-task3
## compilation errors
1. import error.
fix reqire (var router = require('express').Router();).
Исправлена строка 1 в файле controllers\usercontroller.js.  

2. import error.
fix reqire (var bcrypt = require('bcryptjs');).
Исправлена строка 2 в файле controllers\usercontroller.js.  

3. import error.
fix reqire (var User = require('../models/user')).
Исправлена строка 5 в файле controllers\usercontroller.js. 
 
4. import error.
fix reqire (var Game = require('../models/game')).
Исправлена строка 5 и 116 в файле controllers\gamecontroller.js.

5. export fix. 
fix module.exports = function(sequelize, DataTypes).
Исправлена строка 1 в файле models\game.js.

6. export fix. 
var User = require('../models/user');
Исправлена строка 2 в файле middleware\validate-session.js

## logic errors

7. promise error
autenticate try catch add строка 9-15 в файле db.js

8. app.liseten error.
app.listen(PORT, function() {
    console.log(`App is running on http://localhost:${PORT}`)
})
Исправлена строка 21,22 в файле app.js

9. body-parser error 
app.use(require('body-parser').json());
Исправлена строка 17 в файле app.js


11. Ошибка получения данных 
function findSuccess(game) {
                res.status(200).json({
Исправлена строка 7 в файле controllers/gamecontroller.js

12. Ошибки get запроса
Game.findAll({ where: { owner_id: req.user.id } })
Game.findOne({ where: { id: req.params.id, owner_id: req.params.id } })
owner_id: req.body.user.id,
owner_id: req.body.user.id,
Исправлена строка 5,21,69,92 в файле controllers/gamecontroller.js


13. Ошибки доступа к DB.
Game(sequelize, DataTypes).
const sequelize = require('../db');
const DataTypes = require('sequelize');
строки 3, 4, 5,22,38, 60, 89, 

14. Те же ошибки доступа у user

15. Не строгое сравнение ( могут быть ошибки), ошибка db
 if (req.method == 'OPTIONS') {
 User(sequelize, DataTypes).
5 строка
middleware/validate-session.js

16. Убрать console.log(sessionToken)  (вывод данных пользователя в консоль ) 
11 строка middleware/validate-session.js.  

17. Ошибка passwordhash: bcrypt.hashSync(user.password, 10),
passwordHash: bcrypt.hashSync(user.password, 10),
15 строка controllers/usercontroller

refactoring:
change var to const;
change function to arrow function
create const user = req.body.user; for request
const bodyParser = require('body-parser');
app.use(require('body-parser').json()); => app.use(express.json());
add middlewear res.send('Service is running!');
fix  - app.use(require('./middleware/validate-session')) => const validateSession = require('./middleware/validate-session');
user router & service moved to a separate module
