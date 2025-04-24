import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { defineDriver, createInstance, NodeLocalStorageDriver } from '../src/localforage-node-localstorage-driver'
import fs from 'fs'
import path from 'path'
import localforage from 'localforage'

const DefaultStoragePath = './.localforage'

const TestData = { Name:'John', Age:30, isActive:true }
const TestKey  = 'testUserData'

function cleanupStorageDirectory () {
  if (fs.existsSync(DefaultStoragePath)) {
    try {
      const Files = fs.readdirSync(DefaultStoragePath)
      for (const File of Files) {
        fs.unlinkSync(path.join(DefaultStoragePath,File))
      }
      fs.rmdirSync(DefaultStoragePath)
    } catch (Signal:any) {
      console.error('Error cleaning up storage directory:',Signal)
    }
  }
}

describe('localforage-node-localstorage-driver', () => {
  let LocalForageInstance:any

  beforeEach(async () => {
    cleanupStorageDirectory()
    
    try {
      await defineDriver()
      
      LocalForageInstance = createInstance({
        Name:     'testInstance',
        StoreName:'testStore',
        Driver:   NodeLocalStorageDriver
      })
      
      await LocalForageInstance.ready()
    } catch (Signal:any) {
      console.error('Setup error:',Signal)
      throw Signal
    }
  })

  afterEach(() => {
    cleanupStorageDirectory()
  })

  it('should register and use the node-localstorage driver', async () => {
    expect(LocalForageInstance).toBeDefined()
    expect(LocalForageInstance.driver()).toBe(NodeLocalStorageDriver)
  })

  it('should store and retrieve data correctly', async () => {
    await LocalForageInstance.setItem(TestKey,TestData)
    
    const retrievedData = await LocalForageInstance.getItem(TestKey)
    
    expect(retrievedData).toEqual(TestData)
  })

  it('should remove data correctly', async () => {
    await LocalForageInstance.setItem(TestKey,TestData)
    await LocalForageInstance.removeItem(TestKey)
    
    const retrievedData = await LocalForageInstance.getItem(TestKey)
    
    expect(retrievedData).toBeNull()
  })

  it('should clear all data correctly', async () => {
    await LocalForageInstance.setItem('Key1','Value1')
    await LocalForageInstance.setItem('Key2','Value2')
    await LocalForageInstance.setItem('Key3','Value3')
    
    const KeysBeforeClear = await LocalForageInstance.keys()
    expect(KeysBeforeClear.length).toBe(3)
    
    await LocalForageInstance.clear()
    
    const KeysAfterClear = await LocalForageInstance.keys()
    expect(KeysAfterClear.length).toBe(0)
  })

  it('should iterate over items correctly', async () => {
    await LocalForageInstance.setItem('Key1', 'Value1')
    await LocalForageInstance.setItem('Key2', 'Value2')
    await LocalForageInstance.setItem('Key3', 'Value3')
    
    const Keys = await LocalForageInstance.keys()
    expect(Keys.length).toBe(3)
    
    const iteratedValues:string[] = []
    
    await LocalForageInstance.iterate((Value:string) => {
      iteratedValues.push(Value)
    })
    
    expect(iteratedValues.length).toBe(3)
    expect(iteratedValues).toContain('Value1')
    expect(iteratedValues).toContain('Value2')
    expect(iteratedValues).toContain('Value3')
  })

  it('should work with custom storage path', async () => {
    const customPath = './.customStorage'
    
    if (fs.existsSync(customPath)) {
      const Files = fs.readdirSync(customPath)
      for (const File of Files) {
        fs.unlinkSync(path.join(customPath,File))
      }
      fs.rmdirSync(customPath)
    }
    
    try {
      const customInstance = createInstance({
        Name:       'customInstance',
        StoreName:  'customStore',
        StoragePath:customPath,
        Driver:     NodeLocalStorageDriver
      })
      
      await customInstance.ready()
      
      await customInstance.setItem(TestKey, TestData)
      
      expect(fs.existsSync(customPath)).toBe(true)
      
      const retrievedData = await customInstance.getItem(TestKey)
      expect(retrievedData).toEqual(TestData)
    } finally {
      if (fs.existsSync(customPath)) {
        const Files = fs.readdirSync(customPath)
        for (const File of Files) {
          fs.unlinkSync(path.join(customPath,File))
        }
        fs.rmdirSync(customPath)
      }
    }
  })
})
