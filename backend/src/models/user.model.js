const yup = require('yup')

// Definir esquema de Yup
const userModel = yup.object().shape({
    name: yup.string().uppercase().min(3).max(30).required('Name is required'),
    email: yup.string().email().required('Email is required'),
    password: yup.string().min(4).required('Password is required'),
    type: yup.string().oneOf(['admin', 'user'], 'Type must be admin or user').required(),
});

module.exports = {userModel}