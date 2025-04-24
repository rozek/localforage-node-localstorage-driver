# localforage-node-localstorage-driver #

a localForage driver for Node.js and Deno using node-localstorage

A [LocalForage](https://github.com/localForage/localForage) driver for Node.js and Deno environments that uses [node-localstorage](https://github.com/lmaccherone/node-localstorage) to provide localStorage API-compatible persistent storage.

## Why Use This? ##

LocalForage is a fast and simple storage library that provides a simple key/value API with support for multiple backends including IndexedDB, WebSQL, and localStorage. However, it's primarily designed for browser environments.

This driver allows you to use LocalForage in Node.js and Deno environments by leveraging the node-localstorage package, which provides an API-compatible implementation of the browser's localStorage. This enables you to:

- Use the same data access API across both browser and Node.js applications
- Persist data between application restarts in Node.js
- Maintain a consistent storage interface in isomorphic JavaScript applications
- Take advantage of LocalForage's simple promises-based API

## Installation ##

```bash
npm install localforage-node-localstorage-driver
```

or

```bash
yarn add localforage-node-localstorage-driver
```

## Basic Usage ##

### Registering the Driver and creating an Instance ###

```typescript
import localforage from 'localforage'
import { defineDriver, createInstance, NodeLocalStorageDriver } from 'localforage-node-localstorage-driver'

// first, define the driver (do this once in your application)
async function setup() {
  // register the driver
  await defineDriver()
  
  // create a LocalForage instance that uses the node-localstorage driver
  const Store = createInstance({
    Name:     'myApp',
    StoreName:'myStore'
  })
  
  // now you can use all LocalForage methods
  await Store.setItem('user', { Id:1, Name:'John' })
  const User = await Store.getItem('User')
  console.log(User) // { Id:1, Name:'John' }
}

setup()
```

### Using with existing LocalForage Instance ###

If you already have a LocalForage instance and want to add this driver to it:

```typescript
import localforage from 'localforage'
import { defineDriver, NodeLocalStorageDriver } from 'localforage-node-localstorage-driver'

async function setupWithExistingInstance() {
  // register the driver
  await defineDriver()
  
  // configure LocalForage to use node-localstorage driver
  localforage.config({
    Driver:    NodeLocalStorageDriver,
    Name:     'myApp',
    StoreName:'myStore'
  });
  
  // now you can use LocalForage as usual
  await localforage.setItem('key','value')
}
```

## Advanced Configuration ###

The driver supports the standard LocalForage configuration options plus additional options specific to the node-localstorage driver:

```typescript
const Store = createInstance({
  // standard LocalForage options
  Name:       'myApp',
  StoreName:  'myStore',
  Description:'My Application Store',
  
  // node-localstorage specific options
  StoragePath: './custom-storage-path', // custom path for storing data (default: './.localforage')
  Size: 10 * 1024 * 1024 // Custom size limit in bytes (default: 50MB)
})
```

### Storage Location ###

By default, the driver creates a `./.localforage` directory in your application root to store the data. You can customize this by specifying a `storagePath` in the configuration options.

## API Reference ##

This driver supports all the standard LocalForage methods:

### Core Methods ###

- `setItem(key,value)`: stores data in the storage
- `getItem(key)`: retrieves data from the storage
- `removeItem(key)`: removes an item from the storage
- `clear()`: removes all items from the storage
- `length()`: gets the number of items in the storage
- `key(index)`: gets the name of the key at the provided index
- `keys()`: gets the list of all keys in the storage
- `iterate(iteratorCallback)`: iterates through each value in the storage

### Driver-specific Exports ###

- `defineDriver()`: registers the Node.js localStorage driver with LocalForage
- `createInstance(options)`: creates a new LocalForage instance using the Node.js localStorage driver
- `NodeLocalStorageDriver`: the driver name constant to use when manually configuring LocalForage

## Examples ##

### Storing and retrieving complex Data ###

```typescript
import { createInstance } from 'localforage-node-localstorage-driver'

async function manageUserPreferences() {
  const Store = createInstance({ Name:'preferences' })
  
  // store complex object
  await Store.setItem('UserPreferences', {
    Theme: 'dark',
    Notifications: {
      EMail:true,
      Push: false
    },
    recentSearches: ['node.js','localstorage','persistent storage']
  });
  
  // later, retrieve it
  const Preferences = await Store.getItem('UserPreferences')
  console.log(Preferences.Theme) // 'dark'
}
```

### iterating through all Items ###

```typescript
import { createInstance } from 'localforage-node-localstorage-driver'

async function processAllItems() {
  const Store = createInstance()
  
  // first add some items
  await Store.setItem('Item1', { Value:'first' })
  await Store.setItem('Item2', { Value:'second' })
  await Store.setItem('Item3', { Value:'third' })
  
  // now iterate through all items
  await Store.iterate((Value,Key,IterationNumber) => {
    console.log(`[${IterationNumber}] ${Key}: ${JSON.stringify(Value)}`)
    
    // if you want to stop iteration early, return any non-undefined value
    if (Key === 'Item2') {
      return true; // Tthis will stop the iteration and return true
    }
  })
}
```

## License ##

[MIT License](LICENSE.md)
