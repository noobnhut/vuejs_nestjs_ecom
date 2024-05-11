import dayjs from 'dayjs'
export default {
    formatCurrency(value) {
        let val = (value / 1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' đồng'
      },

      formatTime(value)
      {
        return dayjs(value).format('DD/MM/YYYY')
      }
}