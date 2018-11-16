const bcrypt = require('bcryptjs');

exports.hashAsync = (password, saltRounds = 10) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function(err, hash){
      if(err) return reject(err);
      resolve(hash);
    });
  })
};

exports.compareAsync = (expected, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(expected, hash, (err, res) => {
      if(err) return reject(err);
      resolve(res);
    });
  })
}
