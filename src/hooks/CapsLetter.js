
export  const capitalizeFirstLetter = (inputString) => {
    if (!inputString) {
      return "";
    }
  
    return inputString
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  export  const replaceUnderscores=(str)=> {
  
    return str.replace(/_/g, " ");
}