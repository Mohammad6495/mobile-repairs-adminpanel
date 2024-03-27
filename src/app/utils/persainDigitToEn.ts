const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
  arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g]
export const toEnglishDigit = function (str: string): string {
  let newStr: string = str
  for (let i: number = 0; i < 10; i++) {
    newStr = newStr
      .replace(persianNumbers[i], i.toLocaleString('en-US'))
      .replace(arabicNumbers[i], i.toLocaleString('en-US'))
  }
  return newStr
}
