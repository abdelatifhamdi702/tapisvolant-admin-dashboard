function capitalizeFirstLetter(str) {
  const slices = str.split(/( |\n)/g)
  let capitalized = ''
  slices.map((e) => {
    if (e.charAt(0) === '\\') e = e.substring(1)
    capitalized += e.charAt(0).toUpperCase() + e.slice(1) + ' '
  })
  // converting first letter to uppercase
  return capitalized.replace(/ +/g, ' ')
}
