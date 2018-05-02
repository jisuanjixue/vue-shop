export default {
  brands: state => {
    const brands = state.productList.map(item => item.brand)
    return [...new Set(brands)]
  },
  colors: state => {
    const colors = state.productList.map(item => item.color)
    return [...new Set(colors)]
  },
  images: state => {
    const images = state.productList.map(item => item.image)
    return [...new Set(images)]
  }
}
