// English [en]
// We don't need weekdaysShort, weekdaysMin, monthsShort in en.js locale
export default {
  name: 'en',
  weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
  months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
  ordinal: (number) => {
    const s = ['th', 'st', 'nd', 'rd']
    const v = number % 100
    return `[${number}${(s[(v - 20) % 10] || s[v] || s[0])}]`
  }
}
