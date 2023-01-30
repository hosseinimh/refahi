# Admin panel for crm100

## Brief

This project is designed with `Laravel` as backend, `React.js` as frontend and `MySql` for storing data.

## Installation

There are two main directories in the root: `project` and `public_html`.

All logics and Laravel core files are in `project` directory. `public_html` is responsible for representing the website, and all asset files such as images, js files and css are in it.

I created two files in the `project` directory which specify the environment and paths to main directories:
`server-config.json`, `server-config.php`. If you deploy the project on a subdomain, you can simply change the public_path in both files and we are all set.

### server-config.json

```bash
{
    "relativePublicPath": "./../public_html",
    "baseUrl": "http://127.0.0.1:8000"
}
```

### server-config.php

```bash
define('BASE_URL', 'http://127.0.0.1:8000');
define('PUBLIC_PATH', __DIR__ . '/../public_html');
define('FRAMEWORK_PATH', __DIR__);
```

### Database configuration

Also, you have to set the database connection parameters in `.env`:

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=non_certificates_db
DB_USERNAME=root
DB_PASSWORD=123456
```

### Tables migrations and fake data initialization

Go to the `project` directory and run this custom command:

```bash
php artisan project:init
```

This command creates a user to login:

````bash
user: 09155295009
password: 123456789a

## Deployment

To start the project on the server, just open your website:

```bash
  GET /
```

Or go to the `project` directory and run `artisan serve` command on localhost:

```bash
  php artisan serve
```

As mentioned before, default credentials are:

**username:** 09155295009

**password:** 123456789a

### Initialization

If you're on localhost, you can simply run a custom artisan console command to initialize the project:

```bash
php artisan project:init
```

If everything goes well, the output will be like this:

```bash
Initializing the project with fake data ...

Cache was cleared successfully.
Old uploaded files were deleted successfully.
Symbolic links were created successfully.
Creating tables and seeding data ...
Database tables were created successfully.
1 user was created successfully.
100 students were created successfully.
700 relatives were created successfully.

****
Username: 09155295009
Password: 123456789a
****

READY TO GO!
```

## Documentation

### Architecture

As Laravel is based on MVC, I use another layer called `Service`, which is responsible for all logic operations, so `Controller` layer is just for receiving inputs and representing outputs.

I also use separate classes for validating requests and send them as request inputs to controllers. These classes throw exceptions on invalid input fields, and in `render` function in `Handler` class, it will be catched and based on error, shows the appropriate response.

The project uses `API Resources` as `Repositories` to standardize responses.
It also utilizes Laravel ORM, `Eloquent`, for readability and integration.

#### Database

The project uses `MySQL` which is an open-source relational database management system.

#### sanctum

As API calls are stateless, sessions can't be used to identify users.
I use `sanctum` to authenticate and authorize users.
On the backend, I use `middlewares` to handle users accessing endpoint routes.

#### Application state container

Redux is an open-source JavaScript library for managing and centralizing application state. Redux is used for notifications, the current user properties, the current page the user is in, and so on.

#### UI

The project utilizes [coreui](https://coreui.io/) which is a free Bootstrap Admin Dashboard Template, and I made some changes to it.

For frontend validation, the project uses Yup which is a schema builder for runtime value parsing and validation.

### Programming languages

- PHP 8.0.2
- Laravel framework 9.19
- React 18.2.0

### Technologies & features

- MVC architecture
- Service layer
- Repository pattern
- Middleware
- Service container binding
- Dependency injection
- Route model binding
- Migration
- Database seeding
- Model factory
- sanctum
- Artisan CLI
- Custom console command
- Custom request validator
- Storage
- Symbolic links
- Exception handling
- Error logging
- Localization
- Redux
- React Router
- Axios
- Yup
- Local storage
- Bootstrap

## Authors

- [@hosseinimh](https://www.github.com/hosseinimh)

API Resource was designed, implemented, documented, and maintained by Mahmoud Hosseini, a Full Stack developer.

- Email: hosseinimh@gmail.com

- Twitter: [@hosseinimh](https://twitter.com/hosseinimh)

## Badges

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://hosseinimh.com/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mahmoud-hosseini-553324217)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/hosseinimh)

## 🚀 About Me

**Mahmoud Hosseini**

![Logo](https://avatars.githubusercontent.com/u/10962058?s=400&u=6b87ec621c17fcd26ec6c9364100b30f73bffb49&v=4)

I'm a Full Stack developer coding Php Laravel, React.JS, C#, ...

Learning programming for more than 18 years.

## 🛠 Skills

Javascript, HTML, CSS, Sass, Bootstrap, Material UI, React.JS, React native, PHP Laravel, PHP Codeigniter, WordPress, ...
````
