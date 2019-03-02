var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('underscore');
const bcrypt = require('bcryptjs');
var ObjectId = mongoose.Schema.Types.ObjectId;

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    minlength: 1,
    trim: true,
    required: true
    // unique: true
  },
  firstName: {
    type: String
  },
  password: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: String
  },
  sex: {
    type: String
  },
  district: {
    type: String
  },
  state: {
    type: String
  },
  location:String,
  type: {
    type: String,
    required: true
  },
  vehicles:[
          {
              type:mongoose.Schema.Types.ObjectId,
              ref: "Vehicle"
          }
      ],
  crops:[
          {
              type:mongoose.Schema.Types.ObjectId,
              ref: "Crop"
          }
      ],
  warehouses:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref: "Warehouse"
    }
  ],
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email', 'firstName' , 'xAuth', 'mobileNo']);
};

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({
    _id: user._id.toHexString(),
    access
  }, 'abc123').toString();

  user.tokens.push({
    access,
    token
  });

  return user.save().then(() => {
    return token;
  });
};

UserSchema.methods.removeToken = function(token) {
  var user = this;
  return user.update({
    $pull: {
      tokens: {
        token
      }
    }
  })
}

UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })

};

UserSchema.statics.findByCredentials = function(email, password) {
  var User = this;

  return User.findOne({
    email
  }).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {

      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

UserSchema.pre('save', function(next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

var User = mongoose.model('User', UserSchema);

module.exports = {
  User
};
