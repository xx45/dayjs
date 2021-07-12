const fs = require('fs')
const path = require('path')
const util = require('util')
const { ncp } = require('ncp')

const { promisify } = util

const typeFileExt = '.d.ts'
const localeDir = path.join(process.env.PWD, 'esm/locale')
const pluginDir = path.join(process.env.PWD, 'esm/plugin')
const localeTypePath = path.join(process.env.PWD, 'esm/locale', `index${typeFileExt}`);

(async () => {
  try {
    const readLocaleDir = await promisify(fs.readdir)(localeDir)
    readLocaleDir.forEach(async (l) => {
      const filePath = path.join(localeDir, l)
      const readFile = await promisify(fs.readFile)(filePath, 'utf8')
      const result = readFile.replace(/'dayjs'/g, "'dayjs/esm'")
      await promisify(fs.writeFile)(filePath, result, 'utf8')
    })

    await promisify(ncp)('./types/', './esm')

    const readLocaleFile = await promisify(fs.readFile)(localeTypePath, 'utf8')
    const localResult = readLocaleFile.replace("'dayjs", "'dayjs/esm")
    await promisify(fs.writeFile)(localeTypePath, localResult, 'utf8')

    const readPluginDir = await promisify(fs.readdir)(pluginDir)
    readPluginDir.forEach(async (p) => {
      if (p.includes(typeFileExt)) {
        const pluginName = p.replace(typeFileExt, '')
        const filePath = path.join(pluginDir, p)
        const targetPath = path.join(pluginDir, pluginName, `index${typeFileExt}`)
        const readFile = await promisify(fs.readFile)(filePath, 'utf8')
        const result = readFile.replace(/'dayjs'/g, "'dayjs/esm'")
        await promisify(fs.writeFile)(targetPath, result, 'utf8')
        await promisify(fs.unlink)(filePath)
      }
    })
  } catch (e) {
    console.error(e) // eslint-disable-line no-console
  }
})()
