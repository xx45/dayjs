import { FORMAT_DEFAULT } from '../../constant'

export default (o, c) => { // locale needed later
  const proto = c.prototype
  const oldFormat = proto.format

  // extend en locale here
  proto.format = function (formatStr) {
    const locale = this.$locale()

    if (!this.isValid()) {
      return oldFormat.bind(this)(formatStr)
    }

    const utils = this.$utils()
    const str = formatStr || FORMAT_DEFAULT
    const result = str.replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g, (match) => {
      switch (match) {
        case 'Q':
          return Math.ceil((this.$M + 1) / 3)
        case 'Do':
          return locale.ordinal(this.$D)
        case 'gggg':
          return this.weekYear()
        case 'GGGG':
          return this.isoWeekYear()
        case 'wo':
          return locale.ordinal(this.week(), 'W') // W for week
        case 'w':
        case 'ww':
          return utils.s(this.week(), match === 'w' ? 1 : 2, '0')
        case 'W':
        case 'WW':
          return utils.s(this.isoWeek(), match === 'W' ? 1 : 2, '0')
        case 'k':
        case 'kk':
          return utils.s(String(this.$H === 0 ? 24 : this.$H), match === 'k' ? 1 : 2, '0')
        case 'X':
          return Math.floor(this.$d.getTime() / 1000)
        case 'x':
          return this.$d.getTime()
        case 'z':
          return `[${this.offsetName()}]`
        case 'zzz':
          return `[${this.offsetName('long')}]`
        default:
          return match
      }
    })
    return oldFormat.bind(this)(result)
  }
}

