# Hapi Utility Belt

Tools for building `hapi` apps.

- [confStore](#confstore)
- [flatten](#flatten)
- [lsWithoutIndex](#lswithoutindex)
- [requireFiles](#requirefiles)
- [requireNameMethod](#requirenamemethod)
- [requireNameModule](#requirenamemodule)
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

### `confStore`

Creates configuration object stores based on criteria. Uses `confidence` to load up configurations. Passes `env` criteria by default with loads `NODE_ENV`.

##### Usage

Refer to [Hapi Confidence](https://github.com/hapijs/confidence) for details on what this accomplishes.



``` js
// Create a new confugration object store
const conf = new confStore({
    $meta: "this is a sample conf",
    hasCache: {
        $filter: 'env',
        development: false,
        staging: false,
        $default: true
    }
});

// Now you can use it
console.log(conf.get('/hasCache'));
// > false

console.log(conf.meta('/'));
// > "this is a sample conf"

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
confStore.setCriteria({
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
├── confStore.js
├── flatten.js
├── index.js
├── lsWithoutIndex.js
├── requireAndFlatten.js
├── requireFiles.js
├── requireNameMethod.js
└── requireNameModule.js
```

`lsWithoutIndex` would render the following:
``` js
const fileList = lsWithoutIndex('./lib');

console.log(fileList);

// No 'index.js'
// > [ 'confStore.js',
//   'flatten.js',
//   'lsWithoutIndex.js',
//   'requireAndFlatten.js',
//   'requireFiles.js',
//   'requireNameMethod.js',
//   'requireNameModule.js' ]
```


---

### `requireFiles`

This function uses `lsWithoutIndex` and `requireNameModule`

##### Usage

Consider the following tree:

```
lib
├── confStore.js
├── flatten.js
├── index.js
├── lsWithoutIndex.js
├── requireAndFlatten.js
├── requireFiles.js
├── requireNameMethod.js
└── requireNameModule.js
```

`requireFiles` would render the following:
``` js
const dirModules = requireFiles('./lib');

console.log(dirModules);

// { confStore: [Function: Config],
//   flatten: [Function: flatten],
//   lsWithoutIndex: [Function],
//   requireAndFlatten: [Function],
//   requireFiles: [Function],
//   requireNameMethod: [Function],
//   requireNameModule: [Function] }
```

---

### `requireNameMethod`

This function uses `lsWithoutIndex`

##### Usage

Consider the following tree:

```
lib
├── confStore.js
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

// [ { name: 'confStore', method: [Function: Config] },
//   { name: 'flatten', method: [Function: flatten] },
//   { name: 'lsWithoutIndex', method: [Function] },
//   { name: 'requireAndFlatten', method: [Function] },
//   { name: 'requireFiles', method: [Function] },
//   { name: 'requireNameMethod', method: [Function] },
//   { name: 'requireNameModule', method: [Function] } ]
```

---

### `requireNameModule`

This function uses `lsWithoutIndex` and `requireNameMethod`

##### Usage

Consider the following tree:

```
lib
├── confStore.js
├── flatten.js
├── index.js
├── lsWithoutIndex.js
├── requireAndFlatten.js
├── requireFiles.js
├── requireNameMethod.js
└── requireNameModule.js
```

`requireNameModule` would render the following:
``` js
const arr = requireNameModule('./lib');

console.log(arr);

// [ { name: 'confStore', module: [Function: Config] },
//   { name: 'flatten', module: [Function: flatten] },
//   { name: 'lsWithoutIndex', module: [Function] },
//   { name: 'requireAndFlatten', module: [Function] },
//   { name: 'requireFiles', module: [Function] },
//   { name: 'requireNameMethod', module: [Function] },
//   { name: 'requireNameModule', module: [Function] } ]
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

### `requireTestMirror`

Requires a module or folder that is mirrored in a test folder.

First argument is the directory from which you're requiring, and the second argument is a filename or path. If your tests do not live in `/test`, you may optionally pass a 3rd paramater detailing where your tests exist relative to the first argument. This will resolve using `path` builtin.

##### Usage

``` js
const myModule = requireTestMirror(__dirname, 'file.js', '/my/tests/are/here');

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
const AppConfig = requireTestMirror(__dirname, 'app.js');
```

is the equivalent of doing:

``` js
const AppConfig = require('../../config/app.js');
```

The difference is, if you were to ever move `config/app.js` to `really/deep/nested/folder/app.js`, you would only need to move your `test/config/app.js` to `test/really/deep/nested/folder/app.js` and not have to worry about breaking the path traversal in your test.
