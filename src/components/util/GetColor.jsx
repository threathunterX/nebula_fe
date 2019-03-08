// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function colorToRgb(hexColor) {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  let sColor = hexColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#';
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    const sColorChange = [];
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`, 16));
    }
    return sColorChange;
  }
  return sColor;
}

// 取两个颜色中间的颜色
export default function getColor(startColor, endColor, scale) {
  const startRGB = colorToRgb(startColor);
  const endRGB = colorToRgb(endColor);
  let scaleColor = '#';
  for (let i = 0; i < 3; i += 1) {
    const num = endRGB[i] + ((startRGB[i] - endRGB[i]) * scale);
    // 转为16进制
    scaleColor += Math.floor(Math.abs(num)).toString(16);
  }

  return scaleColor;
}
