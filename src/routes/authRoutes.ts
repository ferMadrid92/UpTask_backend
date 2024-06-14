import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";

const router = Router()

router.post('/create-account',
    body('name')
        .notEmpty().withMessage('El nombre no puede ir vacío'),
    body('password')
        .isLength({min: 8}).withMessage('La contraseña debe tener un mínimo de 8 caracteres'),
    body('password_confirmation').custom((value, {req}) => {
        if(value !== req.body.password) {
            throw new Error('Las contraseñas no son iguales')
        }
        return true
    }),
    body('email')
        .isEmail().withMessage('E-mail no válido'),
    handleInputErrors,
    AuthController.createAccount
)

router.post('/confirm-account',
    body('token')
        .notEmpty().withMessage('El Token no puede ir vacío'),
    handleInputErrors,
    AuthController.confirmAccount
)

router.post('/login',
    body('email')
        .isEmail().withMessage('E-mail no válido'),
    handleInputErrors,
    body('password')
        .notEmpty().withMessage('La contraseña no puede ir vacía'),
    AuthController.login
)

router.post('/request-code',
    body('email')
        .isEmail().withMessage('E-mail no válido'),
    handleInputErrors,
    AuthController.requestConfirmationCode
)

router.post('/forgot-password',
    body('email')
        .isEmail().withMessage('E-mail no válido'),
    handleInputErrors,
    AuthController.forgotPassword
)

router.post('/validate-token',
    body('token')
        .notEmpty().withMessage('El Token no puede ir vacío'),
    handleInputErrors,
    AuthController.validateToken
)

router.post('/reset-password/:token',
    param('token')
        .isNumeric().withMessage('Token no válido'),
    body('password')
        .isLength({min: 8}).withMessage('La contraseña debe tener un mínimo de 8 caracteres'),
    body('password_confirmation').custom((value, {req}) => {
        if(value !== req.body.password) {
            throw new Error('Las contraseñas no son iguales')
        }
        return true
    }),
    handleInputErrors,
    AuthController.resetPasswordWithToken
)

router.get('/user',
    authenticate,
    AuthController.user
)

//Profile
router.put('/profile',
    authenticate,
    body('name')
        .notEmpty().withMessage('El nombre no puede ir vacío'),
    body('email')
        .isEmail().withMessage('E-mail no válido'),
    handleInputErrors,
    AuthController.updateProfile
)

router.put('/update-password',
    authenticate,
    body('current_password')
        .notEmpty().withMessage('La contraseña actual es obligatoria'),
    body('password')
        .isLength({min: 8}).withMessage('La contraseña debe tener un mínimo de 8 caracteres'),
    body('password_confirmation').custom((value, {req}) => {
        if(value !== req.body.password) {
            throw new Error('Las contraseñas no son iguales')
        }
        return true
    }),
    handleInputErrors,
    AuthController.updateCurrentUserPassword
)

router.post('/check-password',
    authenticate,
    body('password')
        .notEmpty().withMessage('La contraseña no puede ir vacía'),
    handleInputErrors,
    AuthController.checkPassword
)

export default router