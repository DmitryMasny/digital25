const { Router } = require( 'express' )
const bcrypt = require( 'bcryptjs' )
const config = require( 'config' )
const jwt = require( 'jsonwebtoken' )
const { check, validationResult } = require( 'express-validator' )
const User = require( '../models/User' )
const { sendVerificationEmail } = require( '../plugins/email.plugin.js' )
const router = Router()

const { TAG } = require( 'client/src/consts/responseTags' )

const generateLink = ( req, list = [] ) => {
  return `${ process.env.NODE_ENV === "production" ?
    `${ req.protocol }://${ req.get( "host" ) }` : 'http://localhost:3000'
  }/auth/${ list.map( x => `/${ x }&` ).join( '' ) }`;
}

// /api/auth/login
router.post(
  '/login',
  [
    check( 'email', 'Введите корректный email' ).normalizeEmail().isEmail(),
    check( 'password', 'Введите пароль' ).exists()
  ],
  async ( req, res ) => {
    try {
      const errors = validationResult( req )

      if ( !errors.isEmpty() ) {
        return res.status( 400 ).json( {
          errors: errors.array(),
          message: 'Некорректный данные при входе в систему'
        } )
      }

      const { email, password } = req.body

      const user = await User.findOne( { email } )

      if ( !user ) {
        return res.status( 400 ).json( { tag: TAG.AUTH.USER_NOT_FOUND, message: 'Пользователь не найден' } )
      }
      if ( user.verifyCode ) {
        return res.status( 400 ).json( { tag: TAG.AUTH.NOT_VERIFIED, message: 'verifyCode' } )
      }

      const isMatch = await bcrypt.compare( password, user.password )

      if ( !isMatch ) {
        return res.status( 400 ).json( { tag: TAG.WRONG_PWD, message: 'Неверный пароль, попробуйте снова' } )
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get( 'jwtSecret' ),
        { expiresIn: '14d' }
      )

      res.json( { token, userId: user.id } )

    } catch ( e ) {
      res.status( 500 ).json( { message: 'Что-то пошло не так, попробуйте снова' } )
    }
  } )

// /api/auth/register
router.post(
  '/register',
  [
    check( 'email', 'Некорректный email' ).isEmail(),
    check( 'password', 'Минимальная длина пароля 6 символов' )
      .isLength( { min: 6 } )
  ],
  async ( req, res ) => {
    try {
      const errors = validationResult( req )
      console.log( 'register' )

      if ( !errors.isEmpty() ) {
        return res.status( 400 ).json( {
          tag: TAG.AUTH.WRONG_REG_DATA,
          message: 'Некорректные данные при регистрации',
          errors: errors.array(),
        } )
      }

      const { email, password } = req.body

      const candidate = await User.findOne( { email } )

      if ( candidate ) {
        if ( candidate.verifyCode ) return res.status( 400 ).json( {
          tag: TAG.AUTH.USER_NOT_VERIFY,
          message: 'Вы не активировали свою почту'
        } )
        return res.status( 400 ).json( { tag: TAG.AUTH.USER_EXIST, message: 'Такой пользователь уже существует' } )
      }
      const hashedPassword = await bcrypt.hash( password, 12 )
      const rand = Math.floor( Math.random() * 1000000 )

      const user = new User( { email, password: hashedPassword, verifyCode: rand } )
      await user.save()

      const activationLink = generateLink( req, [ 'confirm-email', rand, user._id ] )


      // Верификация почты
      await sendVerificationEmail( { toEmail: email, link: activationLink } )
      console.log( 'Verification email has been sended. Activate link: ', activationLink )
      res.status( 200 ).json( { tag: TAG.AUTH.REG_SUCCESS, message: 'Подтвердите вашу почту' } )

    } catch ( e ) {
      res.status( 500 ).json( { message: 'Что-то пошло не так, попробуйте снова' } )
    }
  } )

// /api/auth/verify
router.get( '/verify/:userId/:secretCode',
  async ( req, res ) => {
    try {

      const user = await User.findById( req.params.userId );

      if ( user && user.verifyCode && user.verifyCode.toString() === req.params.secretCode.toString() ) {
        console.log( "email is verified" );

        delete user.verifyCode
        await user.save()

        res.status( 201 ).json( { tag: TAG.AUTH.VERIFY_SUCCESS, message: 'Пользователь создан' } )
        // res.redirect(generateLink(req));
      } else {
        console.log( "email is not verified" );
        res.status( 400 ).json( { message: 'Неверный код подтверждения' } )
      }

    } catch ( e ) {
      res.status( 500 ).json( { message: 'Что-то пошло не так, попробуйте снова' } )
    }
  } )

// /api/auth/repeat-email-verify
router.post(
  '/repeat-email-verify',
  [
    check( 'email', 'Некорректный email' ).isEmail(),
    check( 'password', 'Минимальная длина пароля 6 символов' )
      .isLength( { min: 6 } )
  ],
  async ( req, res ) => {
    try {
      const { email } = req.body

      const candidate = await User.findOne( { email } )

      if ( candidate && candidate.verifyCode ) {
        const rand = Math.floor( Math.random() * 1000000 )
        const activationLink = generateLink( req, [ 'confirm-email', rand, candidate._id ] )

        // Верификация почты
        await sendVerificationEmail( { toEmail: email, link: activationLink } )

        return res.status( 200 ).json( {
          tag: TAG.AUTH.REPEAT_VERIFY_SUCCESS,
          message: 'Такой пользователь уже существует'
        } )
      }

      res.status( 400 ).json( { tag: TAG.AUTH.USER_NOT_FOUND, message: 'Пользователь не найден' } )

    } catch ( e ) {
      res.status( 500 ).json( { message: 'Что-то пошло не так, попробуйте снова' } )
    }
  } )

// /api/auth/restore-pwd
router.post(
  '/restore-pwd',
  [
    check( 'email', 'Некорректный email' ).isEmail()
  ],
  async ( req, res ) => {
    try {
      const errors = validationResult( req )
      console.log( 'restore-pwd', errors )

      if ( !errors.isEmpty() ) {
        return res.status( 400 ).json( {
          message: 'Некорректные данные',
          errors: errors.array(),
        } )
      }

      const { email } = req.body

      const candidate = await User.findOne( { email } )

      if ( candidate ) {
        if ( candidate.verifyCode ) return res.status( 400 ).json( {
          tag: TAG.AUTH.USER_NOT_VERIFY,
          message: 'Вы не активировали свою почту'
        } )

        const rand = Math.floor( Math.random() * 1000000 )

        candidate.changePwdCode = rand
        await candidate.save()

        const activationLink = generateLink( req, [ 'confirm-restore-pwd', rand, candidate._id ] )

        // Верификация почты
        await sendVerificationEmail( {
          toEmail: email,
          html: "Hi, bro! <br>Please Click on the link to change pwd.<br><a href=" + activationLink + ">Click here to verify</a>"
        } )

        return res.status( 200 ).json( { tag: TAG.AUTH.RESTORE_PWD_SUCCESS } )
      }

      res.status( 400 ).json( { tag: TAG.AUTH.USER_NOT_FOUND, message: 'Пользователь не найден' } )

    } catch ( e ) {
      res.status( 500 ).json( { message: 'Что-то пошло не так, попробуйте снова' } )
    }
  } )

// /api/auth/change-pwd
router.post(
  '/change-pwd',
  [
    check( 'email', 'Некорректный email' ).isEmail()
  ],
  async ( req, res ) => {
    try {
      const errors = validationResult( req )
      console.log( 'change-pwd', errors )

      if ( !errors.isEmpty() ) {
        return res.status( 400 ).json( {
          message: 'Некорректные данные',
          errors: errors.array(),
        } )
      }

      const { email, password, newPassword, changePwdCode } = req.body

      const user = await User.findOne( { email } )

      if ( user ) {
        if ( changePwdCode ) {
          if ( user.changePwdCode === changePwdCode && newPassword ) {
            user.password = await bcrypt.hash( newPassword, 12 )
            await user.save()

            return res.status( 200 ).json( { tag: TAG.AUTH.CHANGE_PWD_SUCCESS } )
          }
          return res.status( 500 ).json( { message: 'Что-то пошло не так' } )
        }
        if ( password && newPassword ) {
          const isMatch = await bcrypt.compare( password, user.password )

          if ( !isMatch ) {
            return res.status( 400 ).json( { tag: TAG.WRONG_PWD, message: 'Неверный пароль, попробуйте снова' } )
          }

          user.password = await bcrypt.hash( newPassword, 12 )
          await user.save()
          return res.status( 200 ).json( { tag: TAG.AUTH.CHANGE_PWD_SUCCESS } )
        }
      }
      return res.status( 500 ).json( { message: 'Что-то пошло не так' } )

    } catch ( e ) {
      res.status( 500 ).json( { message: 'Что-то пошло не так, попробуйте снова' } )
    }
  } )


module.exports = router
