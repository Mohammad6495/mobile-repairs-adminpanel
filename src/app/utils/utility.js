export const formatPrice = (number) => {
    if(number) {
      if (number.toString().length > 3) {
        let arr2 = [];
        let arr = number.toString().split("");
    
        let addedLength = 0;
    
        if (arr.length % 3 !== 0) {
          arr.unshift("0");
    
          addedLength += 1;
    
          if (arr.length % 3 !== 0) {
            arr.unshift("0");
            addedLength += 1;
          }
        }
    
        arr.forEach((item, index) => {
          if (index !== 0 && index % 3 === 0 && index !== arr.length - 1) {
            arr2.push(",");
            arr2.push(item);
          } else {
            arr2.push(item);
          }
        });
    
        if (addedLength > 0) arr2.splice(0, addedLength);
    
        let str = "";
        arr2.forEach((item) => {
          str += item.toString();
        });
    
        return str;
      } else {
        return number;
      }
    }else {
      return null
    }
  };