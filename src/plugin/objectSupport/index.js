export default (o, c) => {
  const proto = c.prototype
  const isObject = obj => !(obj instanceof Date) && !(obj instanceof Array) && obj instanceof Object
  const prettyUnit = (u) => {
    const unit = proto.$utils().p(u)
    return unit === 'date' ? 'day' : unit
  }
  const parseDate = (cfg) => {
    const { date, utc } = cfg
    const $d = {}
    if (isObject(date)) {
      Object.keys(date).forEach((k) => {
        $d[prettyUnit(k)] = date[k]
      })
      const y = $d.year || 1970
      const M = $d.month - 1 || 0
      const d = $d.day || 1
      const h = $d.hour || 0
      const m = $d.minute || 0
      const s = $d.second || 0
      const ms = $d.millisecond || 0
      if (utc) {
        return new Date(Date.UTC(y, M, d, h, m, s, ms))
      }
      return new Date(y, M, d, h, m, s, ms)
    }
    return date
  }

  const oldParse = proto.parse
  proto.parse = function (cfg) {
    // console.log(cfg)
    cfg.date = parseDate.bind(this)(cfg)
    oldParse.bind(this)(cfg)
  }

  const setObject = function (argument) {
    const keys = Object.keys(argument)
    let chain = this.clone()
    keys.forEach((key) => {
      chain = chain.$set(key, argument[key])
    })
    return chain
  }
  const addObject = function (argument) {
    const keys = Object.keys(argument)
    let chain = this
    keys.forEach((key) => {
      chain = chain.add(argument[key], key)
    })
    return chain
  }

  const subtractObject = function (argument) {
    const keys = Object.keys(argument)
    let chain = this
    keys.forEach((key) => {
      chain = chain.subtract(argument[key], key)
    })
    return chain
  }

  const oldSet = proto.set
  proto.set = function (string, int) {
    if (string instanceof Object) {
      return setObject.bind(this)(string)
    }
    return oldSet.bind(this)(string, int)
  }
  const oldAdd = proto.add
  proto.add = function (number, string) {
    if (number instanceof Object) {
      return addObject.bind(this)(number)
    }
    return oldAdd.bind(this)(number, string)
  }
  const oldSubtract = proto.subtract
  proto.subtract = function (number, string) {
    if (number instanceof Object) {
      return subtractObject.bind(this)(number)
    }
    return oldSubtract.bind(this)(number, string)
  }
}
