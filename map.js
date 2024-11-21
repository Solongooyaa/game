// Map exercise
// Array дахь тоонуудыг квадрат болгоод шинэ array-д хадгалах:

// const numbers = [12, 10, 23, 20, -10];
// const powernumbers = numbers.map((x) => x ** 2);

// console.log(powernumbers);

// Гар утасны дугаарууд хадгалсан array байна. Зөвхөн эхний 4 оронн хадгалсан шинэ array үүсгэх
const phoneNumbers = ["99887766", "11223344", "12345678"];
const newphoneNumbers = phoneNumbers.map((number) => number.slice(0, 4));
console.log(newphoneNumbers);
