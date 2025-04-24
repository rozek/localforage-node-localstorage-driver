// LocalForage driver for Node.js and Deno using node-localstorage

  import { LocalStorage } from 'node-localstorage'
  import localforage      from 'localforage'
  import fs               from 'fs'

  const DefaultDriverName  = 'NodeLocalStorage'
  const DefaultStoragePath = './.localforage'

  interface LocalForageOptions {
    Name?:string
    StoreName?:string
    Description?:string
    Size?:number
    StoragePath?:string
    Driver?:string|string[]
    [Key:string]:any
  }

  const DefaultConfig:LocalForageOptions = {
    Description:'Node.js localStorage driver',
    Name:DefaultDriverName,
    StoreName:'keyvaluepairs',
    StoragePath:DefaultStoragePath,
    Size:50 * 1024 * 1024 // 50MB
  }

  let Storage:LocalStorage|null = null

/**** defineDriver - register the driver with localforage ****/

  const NodeLocalStorageDriver = {
    _driver:DefaultDriverName,
    _support:DriverIsSupported,
    _initStorage:initializeStorage,
    getItem, setItem, removeItem, clear, length, key, keys, iterate
  }

  export function defineDriver ():Promise<any> {
    return localforage.defineDriver(NodeLocalStorageDriver as any)
  }

/**** createInstance - create a new instance of localforage using this driver ****/

  export function createInstance (Options?:LocalForageOptions):any {
    const mergedOptions = {
      ...DefaultConfig,
      ...Options,
      driver: DefaultDriverName
    }

    return localforage.createInstance(mergedOptions)
  }

  export { DefaultDriverName as NodeLocalStorageDriver }

/**** DriverIsSupported - check if the driver is supported in this environment ****/

  function DriverIsSupported ():Promise<boolean> {
    try {
      // Check if node-localstorage is available
      return Promise.resolve(typeof LocalStorage !== 'undefined')
    } catch (Signal:any) {
      return Promise.resolve(false)
    }
  }

/**** initializeStorage - initialize storage instance ****/

  function initializeStorage (Options:LocalForageOptions):Promise<void> {
    const mergedOptions = {
      ...DefaultConfig,
      ...Options
    }

    const StoragePath = mergedOptions.StoragePath || DefaultStoragePath
    const StorageSize = mergedOptions.Size || DefaultConfig.Size

    try {
      ensureDirectoryExists(StoragePath)

      Storage = new LocalStorage(StoragePath,StorageSize)
      return Promise.resolve()
    } catch (Signal:any) {
      return Promise.reject(Signal)
    }
  }

/**** getItem - get an item from storage ****/

  function getItem<T> (Key:string, Callback?:(Error:any,Value:T|null) => void):Promise<T|null> {
    if (Storage == null) {
      const ErrorToThrow = new Error('Storage is not initialized')
      if (Callback != null) {
        Callback(ErrorToThrow,null)
      }
      return Promise.reject(ErrorToThrow)
    }

    const Value  = Storage.getItem(Key)
    const Result = deserialize<T>(Value)

    if (Callback != null) {
      Callback(null,Result)
    }
    return Promise.resolve(Result)
  }

/**** setItem - set an item in storage ****/

  function setItem<T> (Key:string, Value:T, Callback?:(Error:any,Value:T) => void):Promise<T> {
    if (Storage == null) {
      const ErrorToThrow = new Error('Storage is not initialized')
      if (Callback != null) {
        Callback(ErrorToThrow,Value)
      }
      return Promise.reject(ErrorToThrow)
    }

    try {
      const serializedValue = serialize(Value)
      Storage.setItem(Key,serializedValue)

      if (Callback != null) {
        Callback(null,Value)
      }
      return Promise.resolve(Value)
    } catch (Signal:any) {
      if (Callback != null) {
        Callback(Signal, Value)
      }
      return Promise.reject(Signal)
    }
  }

/**** removeItem - remove an item from storage ****/

  function removeItem (Key:string, Callback?:(Error:any) => void):Promise<void> {
    if (Storage == null) {
      const ErrorToThrow = new Error('Storage is not initialized')
      if (Callback != null) {
        Callback(ErrorToThrow)
      }
      return Promise.reject(ErrorToThrow)
    }

    try {
      Storage.removeItem(Key)

      if (Callback != null) {
        Callback(null)
      }
      return Promise.resolve()
    } catch (Signal:any) {
      if (Callback != null) {
        Callback(Signal)
      }
      return Promise.reject(Signal)
    }
  }

/**** clear - clear all items from storage ****/

  function clear (Callback?:(Error:any) => void): Promise<void> {
    if (Storage == null) {
      const ErrorToThrow = new Error('Storage is not initialized')
      if (Callback != null) {
        Callback(ErrorToThrow)
      }
      return Promise.reject(ErrorToThrow)
    }

    try {
      Storage.clear()

      if (Callback != null) {
        Callback(null)
      }
      return Promise.resolve()
    } catch (Signal:any) {
      if (Callback != null) {
        Callback(Signal)
      }
      return Promise.reject(Signal)
    }
  }

/**** length - get the number of items in storage ****/

  function length (Callback?:(Error:any, NumberOfKeys:number) => void):Promise<number> {
    if (Storage == null) {
      const ErrorToThrow = new Error('Storage is not initialized')
      if (Callback != null) {
        Callback(ErrorToThrow,0)
      }
      return Promise.reject(ErrorToThrow)
    }

    const NumberOfKeys = Storage.length

    if (Callback != null) {
      Callback(null,NumberOfKeys)
    }
    return Promise.resolve(NumberOfKeys)
  }

/**** key - get a key at a specific index ****/

  function key (KeyIndex:number, Callback?:(Error:any, Key:string) => void):Promise<string> {
    if (Storage == null) {
      const ErrorToThrow = new Error('Storage is not initialized')
      if (Callback != null) {
        Callback(ErrorToThrow,'')
      }
      return Promise.reject(ErrorToThrow)
    }

    try {
      const KeyName = Storage.key(KeyIndex)

      if (KeyName === null) {
        const ErrorToThrow = new Error(`Key at index ${KeyIndex} not found`)
        if (Callback != null) {
          Callback(ErrorToThrow, '')
        }
        return Promise.reject(ErrorToThrow)
      }

      if (Callback != null) {
        Callback(null,KeyName)
      }
      return Promise.resolve(KeyName)
    } catch (Signal:any) {
      if (Callback != null) {
        Callback(Signal, '')
      }
      return Promise.reject(Signal)
    }
  }

/**** keys - get all keys in storage ****/

  function keys (Callback?:(Error:any, Keys:string[]) => void):Promise<string[]> {
    if (Storage == null) {
      const ErrorToThrow = new Error('Storage is not initialized')
      if (Callback != null) {
        Callback(ErrorToThrow,[])
      }
      return Promise.reject(ErrorToThrow)
    }

    try {
      const KeyList:string[] = []
      for (let i = 0; i < Storage.length; i++) {
        const KeyName = Storage.key(i)
        if (KeyName !== null) {
          KeyList.push(KeyName)
        }
      }

      if (Callback != null) {
        Callback(null, KeyList)
      }
      return Promise.resolve(KeyList)
    } catch (Signal:any) {
      if (Callback != null) {
        Callback(Signal,[])
      }
      return Promise.reject(Signal)
    }
  }

/**** iterate - iterate over all items in storage ****/

  function iterate<T,U> (
    Iterator:(Value:T, Key:string, IterationNumber:number) => U,
    Callback?:(Error:any, Result:U) => void
  ):Promise<any> {
    if (Storage == null) {
      const ErrorToThrow = new Error('Storage is not initialized')
      if (Callback) {
        Callback(ErrorToThrow,undefined as any)
      }
      return Promise.reject(ErrorToThrow)
    }

    try {
      const StorageLength = Storage.length
      let IterationNumber = 1

      for (let i = 0; i < StorageLength; i++) {
        const Key = Storage.key(i)
        if (Key != null) {
          const Value = deserialize<T>(Storage.getItem(Key))
          if (Value !== null) {
            const IterationResult = Iterator(Value,Key,IterationNumber++) as U
            if (IterationResult !== undefined) {
              if (Callback != null) {
                Callback(null,IterationResult)
              }
              return Promise.resolve(IterationResult)
            }
          }
        }
      }

      if (Callback != null) {
        Callback(null,undefined as any)
      }
      return Promise.resolve(undefined as any)
    } catch (Signal:any) {
      if (Callback != null) {
        Callback(Signal, undefined as any)
      }
      return Promise.reject(Signal)
    }
  }

/**** serialize - serializes data for storage in node-localstorage ****/

  function serialize (Item:unknown):string {
    return JSON.stringify(Item)
  }

/**** deserialize - deserializes data from node-localstorage ****/

  function deserialize<T> (Value:string|null):T|null {
    if (Value === null) { return null }

    try {
      return JSON.parse(Value) as T
    } catch (Signal:any) {
      return null
    }
  }

/**** ensureDirectoryExists - ensures a directory exists before using it ****/

  function ensureDirectoryExists (DirPath:string):void {
    if (!fs.existsSync(DirPath)) {
      fs.mkdirSync(DirPath, { recursive:true })
    }
  }
