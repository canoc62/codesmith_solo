const Sequelize = require('sequelize');

function parse(obj) {                 //recursivly parses Object to create Sequelize Model
  obj = JSON.parse(obj);
  let resObj = {};
  let sequelizeObj = {
    'string': Sequelize.STRING,
    'number': Sequelize.INTEGER,
    'boolean': Sequelize.BOOLEAN
  }
  for(let key in obj) {
    if(Array.isArray(obj[key])) {
      let ans = sequelizeObj[typeof obj[key][0]]
      resObj[key] = Sequelize.ARRAY(ans);
    }

  else if(typeof obj[key] === 'object') {
    resObj[key] = parse(obj[key])
  }
  else {
    resObj[key] = sequelizeObj[typeof obj[key]];
  }
}
  return resObj;
}