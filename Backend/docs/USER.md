# User — Backend Documentation

Overview
- Purpose: describes the `User` data model, validation rules, endpoints, controller/service behavior, authentication flow, and example requests/responses implemented in this repo.

Required environment variables
- `JWT_SECRET` — secret used to sign JWTs (required).
- `JWT_EXPIRES_IN` — token expiry (default `24h`).
- `BCRYPT_SALT_ROUNDS` — optional integer for bcrypt salt rounds (default 10).
- `NODE_ENV` — used to set cookie `secure` flag in production.

Model: User (`models/user.model.js`)
- Fields:
  - `fullname.firstname` (String) — min length 2.
  - `fullname.lastname` (String) — min length 2.
  - `email` (String) — required, unique, validated with regex pattern.
  - `password` (String) — required, `select: false` so queries omit it by default.
  - `socketId` (String) — optional.
- Validations & constraints:
  - `email` matches standard email regex in schema.
  - `firstname`/`lastname` have `minlength` validation.
  - Password length is enforced at the route level (minimum 6 characters in validators).
- Schema hooks & methods:
  - `pre('save')` hashes the password if it was modified using `hashPassword`.
  - `statics.hashPassword(password)` hashes with bcrypt using `BCRYPT_SALT_ROUNDS` or 10.
  - `methods.comparePassword(enteredPassword)` compares with bcrypt and handles missing stored password.
  - `methods.generateAuthToken()` signs a JWT using `JWT_SECRET` and returns it (throws if `JWT_SECRET` missing).
  - `toJSON` transform: removes `_id`, `__v`, and `password`, and maps `_id` to `id`.

Routes (defined in `routes/user.routes.js`)
- `POST /register` — validators: `email` is email, `password` min 6.
  - Controller: `registerUser` (`controllers/user.controller.js`)
  - Flow:
    1. Validate request using `express-validator`.
    2. Check if a user with the email already exists using `userModel.findOne({ email })`.
    3. Hash password using `userModel.hashPassword(password)`.
    4. Call `userService.createUser` to create the record.
    5. Generate JWT via `user.generateAuthToken()`.
    6. Set cookie `token` with `cookieOptions` and return `{ token, user }` with `201`.

- `POST /login` — validators: `email`, `password`.
  - Controller: `loginUser`
  - Flow:
    1. Validate request.
    2. Find user with `select('+password')` to get hashed password.
    3. Compare password with `user.comparePassword(password)`.
    4. Generate JWT, clear `user.password` from response, set cookie `token`, return `{ token, user }` with `200`.

- `GET /profile` — protected by `authMiddleware.authUser` (middleware must attach `req.user`).
  - Controller: `getUserProfile` returns `req.user`.

- `GET /logout` — protected by `authMiddleware.authUser`.
  - Controller: `logoutUser` clears the cookie `token`, extracts the token from `req.cookies.token` or `Authorization` header, and saves it to `BlacklistTokenModel` so it cannot be reused.

Controller: `controllers/user.controller.js` (high level)
- Uses `validationResult` to return `400` for invalid requests.
- Uses `userModel` to check existing users and to hash passwords.
- Uses `userService.createUser` which simply wraps `userModel.create`.
- Sets cookie options:
  - `httpOnly: true`
  - `secure: process.env.NODE_ENV === 'production'`
  - `sameSite: 'strict'`

Service: `services/user.service.js`
- `createUser({ firstname, lastname, email, password })`:
  - Validates that required fields are present and calls `userModel.create({ fullname: {...}, email, password })`.

Security notes
- Passwords are hashed using bcrypt before save; route validators enforce a minimum length.
- JWTs are signed with `JWT_SECRET`. If the secret is missing `generateAuthToken()` throws.
- Authentication tokens are set as a secure, httpOnly cookie (in production) and also returned in JSON.
- Logout stores tokens in a blacklist collection (`models/blacklistToken.model.js`) — ensure middleware checks blacklist on auth.

Example requests
- Register (POST /user/register) body:

  {
    "fullname": { "firstname": "Alice", "lastname": "Doe" },
    "email": "alice@example.com",
    "password": "supersecret"
  }

- Login (POST /user/login) body:

  {
    "email": "alice@example.com",
    "password": "supersecret"
  }

Files of interest
- Model: [models/user.model.js](models/user.model.js#L1)
- Controller: [controllers/user.controller.js](controllers/user.controller.js#L1)
- Service: [services/user.service.js](services/user.service.js#L1)
- Routes: [routes/user.routes.js](routes/user.routes.js#L1)

Recommended improvements
- Ensure the authentication middleware checks the `BlacklistToken` when validating JWTs.
- Consider centralizing token issuance and cookie setting to avoid duplication between controllers.
- Keep naming consistent (e.g., use `User` vs `user` consistently in variables) to avoid confusion.
