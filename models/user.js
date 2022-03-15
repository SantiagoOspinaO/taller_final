const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

/**
 * Se crea el modelo del usuario.
 * 
 * @version 1.00.00
 * 
 * @author Santiago Ospina Osorio <santiago.m200@outlook.es>
 * 
 * @since 1.00.000 14-03-2022
 */
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'El usernaem es requerido'],
        unique: true
    },
    password: {
        type:String,
        required: [true, 'El password es requerido']
    }
});

/**
 * Se crea el metodo pre.
 * 
 * @version 1.00.00
 * 
 * @author Santiago Ospina Osorio <santiago.m200@outlook.es>
 * 
 * @since 1.00.000 14-03-2022
 */
UserSchema.pre('save', function(next) {
    if (this.isNew || this.isModified('password')) {
        const document = this;
        bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
            if (err) {
                next(err);
            } else {
                document.password = hashedPassword;
                next();
            }
            
        });
    } else {
        next();
    }
});

/**
 * Se crea el metodo isCorrectPassword con el objetivo de verificar que las contraseñas coincidan. 
 * @param {*} password 
 * @param {*} callback 
 * 
 * @version 1.00.00
 * 
 * @author Santiago Ospina Osorio <santiago.m200@outlook.es>
 * 
 * @since 1.00.000 14-03-2022
 */
UserSchema.methods.isCorrectPassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, same) {
        if(err) {
            callback(err);
        } else {
            callback(err, same);
        }
    });
}

module.exports = mongoose.model('User', UserSchema);