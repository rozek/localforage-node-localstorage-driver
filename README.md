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

### Registering the Driver and Creating an Instance ###

```typescript
import localforage from 'localforage';
import { defineDriver, createInstance, NODE_LOCALSTORAGE } from 'localforage-node-localstorage-driver';

// First, define the driver (do this once in your application)
async function setup() {
  // Register the driver
  await defineDriver();
  
  // Create a LocalForage instance that uses the node-localstorage driver
  const store = createInstance({
    name: 'myApp',
    storeName: 'myStore'
  });
  
  // Now you can use all LocalForage methods
  await store.setItem('user', { id: 1, name: 'John' });
  const user = await store.getItem('user');
  console.log(user); // { id: 1, name: 'John' }
}

setup();
```

### Using With Existing LocalForage Instance ###

If you already have a LocalForage instance and want to add this driver to it:

```typescript
import localforage from 'localforage';
import { defineDriver, NODE_LOCALSTORAGE } from 'localforage-node-localstorage-driver';

async function setupWithExistingInstance() {
  // Register the driver
  await defineDriver();
  
  // Configure LocalForage to use node-localstorage driver
  localforage.config({
    driver: NODE_LOCALSTORAGE,
    name: 'myApp',
    storeName: 'myStore'
  });
  
  // Now you can use LocalForage as usual
  await localforage.setItem('key', 'value');
}
```

## Advanced Configuration ###

The driver supports the standard LocalForage configuration options plus additional options specific to the node-localstorage driver:

```typescript
const store = createInstance({
  // Standard LocalForage options
  name: 'myApp',
  storeName: 'myStore',
  description: 'My Application Store',
  
  // node-localstorage specific options
  storagePath: './custom-storage-path', // Custom path for storing data (default: './.localforage')
  size: 10 * 1024 * 1024 // Custom size limit in bytes (default: 5MB)
});
```

### Storage Location ###

By default, the driver creates a `./.localforage` directory in your application root to store the data. You can customize this by specifying a `storagePath` in the configuration options.

## API Reference ##

This driver supports all the standard LocalForage methods:

### Core Methods ###

- `setItem(key, value)`: Stores data in the storage.
- `getItem(key)`: Retrieves data from the storage.
- `removeItem(key)`: Removes an item from the storage.
- `clear()`: Removes all items from the storage.
- `length()`: Gets the number of items in the storage.
- `key(index)`: Gets the name of the key at the provided index.
- `keys()`: Gets the list of all keys in the storage.
- `iterate(iteratorCallback)`: Iterates through each value in the storage.

### Driver-specific Exports ###

- `defineDriver()`: Registers the Node.js localStorage driver with LocalForage.
- `createInstance(options)`: Creates a new LocalForage instance using the Node.js localStorage driver.
- `NODE_LOCALSTORAGE`: The driver name constant to use when manually configuring LocalForage.

## Examples ##

### Storing and Retrieving Complex Data ###

```typescript
import { createInstance } from 'localforage-node-localstorage-driver';

async function manageUserPreferences() {
  const store = createInstance({ name: 'preferences' });
  
  // Store complex object
  await store.setItem('userPreferences', {
    theme: 'dark',
    notifications: {
      email: true,
      push: false
    },
    recentSearches: ['node.js', 'localstorage', 'persistent storage']
  });
  
  // Later, retrieve it
  const preferences = await store.getItem('userPreferences');
  console.log(preferences.theme); // 'dark'
}
```

### Iterating Through All Items ###

```typescript
import { createInstance } from 'localforage-node-localstorage-driver';

async function processAllItems() {
  const store = createInstance();
  
  // First add some items
  await store.setItem('item1', { value: 'first' });
  await store.setItem('item2', { value: 'second' });
  await store.setItem('item3', { value: 'third' });
  
  // Now iterate through all items
  await store.iterate((value, key, iterationNumber) => {
    console.log(`[${iterationNumber}] ${key}: ${JSON.stringify(value)}`);
    
    // If you want to stop iteration early, return any non-undefined value
    if (key === 'item2') {
      return true; // This will stop the iteration and return true
    }
  });
}
```

## License ##

[MIT License](LICENSE.md)
