# Hapi Utility Belt

Tools for building `hapi` apps.

- [confidant](#confidant)
- [flatten](#flatten)
- [lsWithoutIndex](#lswithoutindex)
- [requireFiles](#requirefiles)
- [requireNameMethod](#requirenamemethod)
- [requireAndFlatten](#requireandflatten)
- [requireTestMirror](#requiretestmirror)

# Usage

`plugins/myHapiPlugin/myMethod.js`
``` js
module.exports = () => {
    return 'hello world';
}
```


`plugins/myHapiPlugin/index.js`
``` js

// Bring in requireNameMethod utility
const { requireNameMethod } = require('hapi-utility-belt');

module.exports = {
    name: 'myHapiPlugin',
    register: (server) => {

        // Register server methods from all files except index.js
        server.methods(requireNameMethod(__dirname));
    }
}
```


# API

---

### `confidant`

Creates configuration object stores based on criteria. Uses `confidence` to load up configurations. Passes `env` criteria by default with loads `NODE_ENV`.

##### Usage

Refer to [Hapi Confidence](https://github.com/hapijs/confidence) for details on what this accomplishes.


Without Criteria
``` js
// Create a new confugration object store

const myConfig = {
    $meta: "this is a sample conf",
    hasCache: {
        $filter: 'env',
        development: false,
        staging: false,
        $default: true
    }
}
const conf = new confidant(myConfig);

// Now you can use it
console.log(conf.get('/hasCache'));
// > false

console.log(conf.meta('/'));
// > "this is a sample conf"

```

With Criteria
``` js
// Create a new confugration object store

const criteria = {
    client: 'aaa'
}

const myConfig = {
    $meta: "this is a sample conf",
    hasCache: {
        $filter: 'env',
        development: false,
        staging: false,
        $default: true
    },
    showSlider: {
        $filter: 'client',
        aaa: true,
        $default: false
    }
}

const conf = new confidant(myConfig, criteria);

// Now you can use it
console.log(conf.get('/showSlider'));
// > true

```


##### Default criteria

``` js
{
    env: process.env.NODE_ENV || 'development'
}
```

##### Extend criteria

This function alters the internal criteria using `Object.assign()`. You can override `criteria.env` if you'd like with this function.

``` js
conf.setCriteria({
    buildNumber: process.env.BUILD_NUMBER
});
```

Now criteria will be:

``` js
{
    env: process.env.NODE_ENV || 'development',
    buildNumber: process.env.BUILD_NUMBER
}
```


---

### `deleteRecursive`

Deletes files recursively

##### Usage

``` js
deleteRecursive('./tmp');
```

---

### `flatten`

Flattens an array N levels deep

##### Usage

``` js
const x = [1, [2, 3, [4, 5, [6]]]];

console.log(flatten(x));
// > [1, 2, 3, [4, 5, [6]]];

console.log(flatten(x, 3));
// > [1, 2, 3, 4, 5, 6];

```

---

### `lsWithoutIndex`

##### Usage

Consider the following tree:

```
lib
├── confidant.js
├── deleteRecursive.js
├── flatten.js
├── index.js
├── lsWithoutIndex.js
├── requireAndFlatten.js
├── requireFiles.js
├── requireNameMethod.js
├── tryRequirePlugins.js
```

`lsWithoutIndex` would render the following:
``` js
const fileList = lsWithoutIndex('./lib');

console.log(fileList);

// No 'index.js'
// > [ 'confidant.js',
//    'deleteRecursive.js',
//    'flatten.js',
//    'lsWithoutIndex.js',
//    'requireAndFlatten.js',
//    'requireFiles.js',
//    'requireNameMethod.js',
//    'tryRequirePlugins.js' ]
```


---

### `requireFiles`

This function uses `lsWithoutIndex` and `requireNameModule`

##### Usage

Consider the following tree:

```
lib
├── confidant.js
├── deleteRecursive.js
├── flatten.js
├── index.js
├── lsWithoutIndex.js
├── requireAndFlatten.js
├── requireFiles.js
├── requireNameMethod.js
├── tryRequirePlugins.js
```

`requireFiles` would render the following:
``` js
const dirModules = requireFiles('./lib');

console.log(dirModules);

// { confidant: [Function: Config],
//   deleteRecursive: [Function: flatten],
//   flatten: [Function],
//   lsWithoutIndex: [Function],
//   requireAndFlatten: [Function],
//   requireFiles: [Function],
//   requireNameMethod: [Function],
//   tryRequirePlugins: [Function] }
```

---

### `requireNameMethod`

This function uses `lsWithoutIndex`

##### Usage

Consider the following tree:

```
lib
├── confidant.js
├── flatten.js
├── index.js
├── lsWithoutIndex.js
├── requireAndFlatten.js
├── requireFiles.js
├── requireNameMethod.js
└── requireNameModule.js
```

`requireNameMethod` would render the following:
``` js
const arr = requireFiles('./lib');

console.log(arr);

// [ { name: 'confidant', method: [Function: Config] },
//   { name: 'deleteRecursive', method: [Function: flatten] },
//   { name: 'flatten', method: [Function] },
//   { name: 'lsWithoutIndex', method: [Function] },
//   { name: 'requireAndFlatten', method: [Function] },
//   { name: 'requireFiles', method: [Function] },
//   { name: 'requireNameMethod', method: [Function] },
//   { name: 'tryRequirePlugins', method: [Function] } ]
```

---

### `requireAndFlatten`

Requires all modules in a folder and flattens them. This function expects the main file to return an array.

##### Usage

Consider the follow tree:

```
api
├── index.js
├── user
│   ├── create.js
│   ├── delete.js
│   ├── read.js
│   ├── index.js
│   ├── update.js
└── messages
    ├── create.js
    ├── delete.js
    ├── read.js
    ├── index.js
    ├── update.js
```

Lets suppose that, except for the main `api/index.js`, every sub-folder's `index.js` returns `Object.values(requireFile(__dirname))`.

##### `api/index.js`

``` js
console.log(requireAndFlatten(__dirname));
// [
//     { path: '/user/create', /* ...etc */  },
//     { path: '/user/read', /* ...etc */  },
//     { path: '/user/update', /* ...etc */  },
//     { path: '/user/delete', /* ...etc */  },
//     { path: '/messages/create', /* ...etc */  },
//     { path: '/messages/read', /* ...etc */  },
//     { path: '/messages/update', /* ...etc */  },
//     { path: '/messages/delete', /* ...etc */  },
// ]
```

---

### `tryRequirePlugins`

Wraps Hapi plugins module require in a try/catch. For use when requiring dev-only modules.

##### Usage

``` js

const server = Hapi.Server();

server.register(tryRequirePlugins([

    // These will fail in prodution
    { plugin: 'tv', options: {} },
    { plugin: 'blipp', options: {} },

    // These will not fail in production
    { plugin: 'inert', options: {} },
    { plugin: 'vision', options: {} },
]))
```

This way, running `npm install --production && npm start` will not throw an error.


---

### `requireTestMirror`

Requires a module or folder that is mirrored in a test folder.

First argument is the directory or filename you're requiring. If your tests do not live in `/test`, you may optionally pass a 2nd paramater detailing where your tests exist relative to the first argument. This will resolve using `path` builtin.

##### Usage

``` js
const myModule = requireTestMirror(__filename, '/my/tests/are/here');

// Same as:
// require('../../../../file.js')
```

Consider the follow tree:

```
config
├── app.js
├── plugins
│   └── index.js
└── server.js

test
└── config
    ├── app.js
    ├── plugins
    │   └── index.js
    └── server.js
```


##### `test/config/app.js`

Running the following:

``` js
const AppConfig = requireTestMirror(__filename);
```

is the equivalent of doing:

``` js
const AppConfig = require('../../config/app.js');
```

The difference is, if you were to ever move `config/app.js` to `really/deep/nested/folder/app.js`, you would only need to move your `test/config/app.js` to `test/really/deep/nested/folder/app.js` and not have to worry about breaking the path traversal in your test.
