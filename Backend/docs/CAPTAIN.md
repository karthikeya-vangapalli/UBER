# Captain — Backend Documentation

Overview
- Purpose: documents the `Captain` data model, validation rules, endpoints, controller/service behavior, notable naming inconsistencies in the codebase (`caption` vs `captain` and `vechical` spelling), and example requests/responses.

Required environment variables
- `JWT_SECRET` — secret used to sign JWTs (required).
- `JWT_EXPIRES_IN` — token expiry (default `24h`).
- `BCRYPT_SALT_ROUNDS` — optional integer for bcrypt salt rounds (default 10).

Model: Captain (`models/captain.model.js`)
- Fields:
  - `fullname.firstname` (String) — required, min length 2.
  - `fullname.lastname` (String) — min length 2.
  - `email` (String) — required, unique, validated with regex.
  - `password` (String) — required.
  - `socketId` (String).
  - `status` (String) — enum `['active','inactive']`, default `'inactive'`.
  - `vechical` (Object) — note spelling `vechical` used across code:
    - `color` (String) — required.
    - `plate` (String) — required.
    - `capacity` (Number) — required, min 1.
    - `vechicalType` (String) — required, enum `['car','motercycle','auto']`.
  - `location.lat` (Number), `location.lng` (Number).
- Methods & helpers:
  - `methods.generateAuthToken()` — signs JWT with `JWT_SECRET` and `JWT_EXPIRES_IN`.
  - `methods.comparePassword(enteredPassword)` — compares entered password with hashed password using bcrypt.
  - `statics.hashPassword(password)` — helper to hash a password with bcrypt (salt rounds 10 hardcoded in this model file).

Routes (defined in `routes/captain.routes.js`)
- `POST /register` — validation chain (express-validator):
  - `body('email').isEmail()`
  - `body('fullname.firstname').notEmpty()`
  - `body('password').isLength({min:6})`
  - `body('vechical.color').notEmpty()`
  - `body('vechical.plate').notEmpty()`
  - `body('vechical.capacity').isInt({min:1})`
  - `body('vechical.vechicalType').isIn(['car','motercycle','auto'])`
  - Controller: `registerCaptain` in `controllers/captain.controller.js`.

Controller: `controllers/captain.controller.js` (high level)
- Flow in `registerCaptain`:
  1. Validate request with `validationResult`.
  2. Extract `fullname`, `email`, `password`, `vechical` from `req.body`.
  3. Check `captionModel.findOne({ email })` for existing captain.
  4. Hash password via `captionModel.hashPassword(password)`.
  5. Call `captionService.createCaption(...)` with fields mapped from the request body.
  6. Generate token via `caption.generateAuthToken()` and return `{ token, caption }` with `201`.

Service: `services/captain.service.js`
- `createCaption({ firstname, lastname, email, password, color, plate, capacity, vechicalType })`:
  - Validates required fields are present; throws `Error('All fields are required')` if any missing.
  - Calls `captionModel.create({...})` to insert a new captain document.

Notable code issues & recommendations
- Naming inconsistencies:
  - Files and variables use both `captain` and `caption` — standardize to `captain` to avoid confusion.
  - `vechical` is a misspelling of `vehicle` across schema, routes, controllers, and services — consider renaming to `vehicle` (requires DB migration or aliasing).
- Hardcoded bcrypt rounds:
  - `captain.model.js` uses `bcrypt.hash(password, 10)`; consider using `BCRYPT_SALT_ROUNDS` env var like `user.model.js` for consistency.
- Error handling:
  - `captionService.createCaption` throws a generic `Error` when fields omitted; consider returning a validation error object or letting `express-validator` cover required field checks.

Example request (POST /captain/register)

  {
    "fullname": { "firstname": "Bob", "lastname": "Smith" },
    "email": "bob@example.com",
    "password": "captainpass",
    "vechical": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vechicalType": "car"
    }
  }

Files of interest
- Model: [models/captain.model.js](models/captain.model.js#L1)
- Controller: [controllers/captain.controller.js](controllers/captain.controller.js#L1)
- Service: [services/captain.service.js](services/captain.service.js#L1)
- Routes: [routes/captain.routes.js](routes/captain.routes.js#L1)

Recommended next steps
- Standardize naming (`captain` vs `caption`, `vehicle` vs `vechical`) across code and migrate existing documents accordingly.
- Use a single helper for password hashing parameters (use `BCRYPT_SALT_ROUNDS` consistently).
- Add explicit error handling for service-level errors and return consistent API error responses.
