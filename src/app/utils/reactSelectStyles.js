export const colourStyles = {
  option: (styles, {isFocused}) => {
    return {
      ...styles,
      backgroundColor: isFocused ? '#999999' : null,
      color: '#333333',
    }
  },
}
