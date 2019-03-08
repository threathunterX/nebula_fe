// ,分隔数字
function splitFormat(num) {
  const numArray = [];
  let curNum = num;
  let numStr = '';
  while (curNum > 1000) {
    numArray.push(curNum % 1000);
    curNum = Math.floor(curNum / 1000);
  }
  numArray.push(curNum);
  // 拼装数字
  while (numArray.length > 0) {
    numStr += (`${numArray.pop()},`);
  }
  return numStr.substr(0, numStr.length - 1);
}

// 字节转换
function byteFormat(num) {
  let value = 0;
  if (num >= 1000 && num < 1000000) {
    value = parseFloat(num / 1024);
    return {
      value,
      unit: 'KB',
      text: `${value}KB`
    };
  } else if (num >= 1000000 && num < (1000 * 1000 * 1000)) {
    value = parseFloat(num / (1024 * 1024));
    return {
      value,
      unit: 'MB',
      text: `${value}MB`
    };
  } else if (num >= (1000 * 1000 * 1000)) {
    value = parseFloat(num / (1024 * 1024 * 1024));
    return {
      value,
      unit: 'GB',
      text: `${value}GB`
    };
  }
  return {
    value: num,
    unit: 'B',
    text: `${num}B`
  };
}

export default function NumberFormat(num, type) {
  if (typeof (num) !== 'number') {
    return num;
  }

  switch (type) {
    case 'split':
      return splitFormat(num);
    case 'byte':
      return byteFormat(num);
    default:
      if (num >= 1000 && num < 1000000) {
        return `${parseFloat((num / 1000).toFixed(2))}K`;
      } else if (num >= 1000000 || num <= -1000000) {
        return `${parseFloat((num / 1000000).toFixed(2))}M`;
      }
      return num;
  }
}
