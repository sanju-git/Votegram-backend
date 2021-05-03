const { text } = require("body-parser");
const express = require("express");
const api = express();
const path = require("path");
api.use(express.json());

let otp1 = Math.floor(1000 + Math.random() * 9000);

// exports.getDifference = async (req, res, next) => {
//   console.log("getdifference");
//   try {
//     let { d1, d2 } = req.query;
//     d1 = new Date(d1);
//     d2 = new Date(d2);
//     console.log(d1, d2);
//     let diffTime = Math.abs(d2 - d1);
//     let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     console.log(diffTime + " milliseconds");
//     console.log(diffDays + " days");
//     return res.json({ diffTime, diffDays });
//   } catch (error) {
//     console.error("getDifference:", error);
//     return res.status(500).json({
//       success: false,
//       msg: "Invalid data",
//     });
//   }
// };

// exports.convertCurrency = (req, res, next) => {
//   let { num } = req.query;
//   try {
//     let a = [
//       "",
//       "one ",
//       "two ",
//       "three ",
//       "four ",
//       "five ",
//       "six ",
//       "seven ",
//       "eight ",
//       "nine ",
//       "ten ",
//       "eleven ",
//       "twelve ",
//       "thirteen ",
//       "fourteen ",
//       "fifteen ",
//       "sixteen ",
//       "seventeen ",
//       "eighteen ",
//       "nineteen ",
//     ];
//     let b = [
//       "",
//       "",
//       "twenty",
//       "thirty",
//       "forty",
//       "fifty",
//       "sixty",
//       "seventy",
//       "eighty",
//       "ninety",
//     ];

//     if ((num = num.toString()).length > 9) return "overflow";
//     n = ("000000000" + num)
//       .substr(-9)
//       .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
//     if (!n) return;
//     let str = "";
//     str +=
//       n[1] != 0
//         ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "crore "
//         : "";
//     str +=
//       n[2] != 0
//         ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "lakh "
//         : "";
//     str +=
//       n[3] != 0
//         ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "thousand "
//         : "";
//     str +=
//       n[4] != 0
//         ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "hundred "
//         : "";
//     str += "rupees ";
//     str +=
//       n[5] != 0
//         ? (str != "" ? "and " : "") +
//           (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) +
//           "only "
//         : "";
//     console.log("response");
//     return res.json({ str });
//   } catch (error) {
//     console.error("getDifference:", error);
//     return res.status(500).json({
//       success: false,
//       msg: "Invalid data",
//     });
//   }
// };

// async function arrayTranspose(mat) {
//   for (let i = 0; i < mat.length; i++) {
//     for (let j = 0; j < i; j++) {
//       const tmp = mat[i][j];
//       mat[i][j] = mat[j][i];
//       mat[j][i] = tmp;
//     }
//   }
//   console.log(mat);
//   return mat;
// }

// exports.matrixOperations = async (req, res, next) => {
//   let { operation } = req.query;
//   console.log(operation);
//   let mat = [
//     [1, 1, 1],
//     [2, 2, 2],
//     [3, 3, 3],
//   ];
//   let transpose = [];
//   try {
//     if (operation == "transpose") {
//       console.log("works");
//       transpose = await arrayTranspose(mat);
//     }
//     return res.json({ transpose });
//   } catch (error) {
//     console.error("matrixOperations:", error);
//     return res.status(500).json({
//       success: false,
//       msg: "Invalid data",
//     });
//   }
// };

// async function unionFun(a, b) {
//   let u = a;
//   b.forEach((element) => {
//     if (u.indexOf(element) == -1) {
//       u.push(element);
//     }
//   });

//   return u;
// }

// async function intersectionFun(a, b) {
//   let i = [];

//   a.forEach((element1) => {
//     b.forEach((element2) => {
//       if (element1 === element2 && i.indexOf(element1) == -1) {
//         i.push(element1);
//       }
//     });
//   });
//   return i;
// }

// async function differenceFun(a, b) {
//   let d = [];

//   a.forEach((element) => {
//     if (b.indexOf(element) === -1 && d.indexOf(element) == -1) {
//       d.push(element);
//     }
//   });

//   return d;
// }

// exports.setTheory = async (req, res, next) => {
//   let { operation } = req.query;
//   let set1 = [5, 6, 4, 9, 10];
//   let set2 = [1, 2, 3, 4, 5, 6];
//   try {
//     if (operation == "union") {
//       let union = await unionFun(set1, set2);
//       return res.json({ res: union });
//     } else if (operation == "intersection") {
//       let intersection = await intersectionFun(set1, set2);
//       return res.json({ res: intersection });
//     } else if (operation == "difference") {
//       let difference = await differenceFun(set1, set2);
//       return res.json({ res: difference });
//     }
//   } catch (error) {
//     console.error("setTheory:", error);
//     return res.status(500).json({
//       success: false,
//       msg: "Invalid data",
//     });
//   }
// };

// exports.generateBarcode = async (req, res, next) => {
//   try {
//     const { text1 } = req.query;
//     code1 = text1;
//     bwipjs.toBuffer(
//       {
//         bcid: "code128",
//         text: code1,
//         scale: 3,
//         height: 10,
//         includetext: true,
//         textxalign: "center",
//       },
//       function (err, png) {
//         if (err) {
//           console.log(err);
//         } else {
//           fs.writeFile(
//             "E:/Web services lab/html/images/" + code1 + ".png",
//             png,
//             (err) => {
//               if (err) throw err;
//               console.log("Code generates");
//             }
//           );
//         }
//       }
//     );
//     let absolute_path = path.resolve("./bar_img/" + code1 + ".png");
//     res.json({ path: "E:/Web services lab/html/images/" + code1 + ".png" });
//   } catch (error) {
//     console.error("setTheory:", error);
//     return res.status(500).json({
//       success: false,
//       msg: "Invalid data",
//     });
//   }
// };

// exports.checkSum = async (req, res) => {
//   try {
//     let { text } = req.query;
//     text = text.toString();
//     let hash = crypto.createHash("md5").update(text).digest("hex");
//     console.log(hash);
//     res.json({ hash: hash });
//   } catch (error) {
//     console.error("checkSum:", error);
//     return res.status(500).json({
//       success: false,
//       msg: "Invalid data",
//     });
//   }
// };

// exports.qrCode = async (req, res) => {
//   try {
//     const { text } = req.query;
//     code1 = text;
//     QRCode.toFile("qr_img/" + code1 + ".png", code1);
//     QRCode.toFile("E:/Web services lab/html/images/" + code1 + ".png", code1);
//     console.log("generates");
//     let absolute_path = path.resolve("./qr_img/" + code1 + ".png");
//     res.json({ path: "E:/Web services lab/html/images/" + code1 + ".png" });
//   } catch (error) {
//     console.error("checkSum:", error);
//     return res.status(500).json({
//       success: false,
//       msg: "Invalid data",
//     });
//   }
// };

// exports.electricCalculator = async (req, res) => {
//   try {
//     let {
//       inputType,
//       outputType,
//       inputValue,
//       voltageValue,
//       wattsValue,
//       ampsValue,
//       powerFactorValue,
//     } = req.body || null;
//     let result = null;
//     console.log(inputType, outputType, inputValue, voltageValue);
//     if (inputType === "Amps") {
//       if (outputType === "kW" || outputType === "kVA") {
//         result = (inputValue * voltageValue) / 1000 + outputType;
//       } else if (outputType === " Watts" || outputType === "vA") {
//         result = inputValue * voltageValue + outputType;
//       } else if (outputType === "Volts") {
//         result = inputValue / wattsValue + outputType;
//       }
//     } else if (inputType === "kW") {
//       if (outputType === "Amps") {
//         result = (inputValue / voltageValue) * 1000 + outputType;
//       } else if (outputType === "Volts") {
//         result = (inputValue / ampsValue) * 100 + outputType;
//       } else if (outputType === "vA") {
//         result = (inputValue / powerFactorValue) * 1000 + outputType;
//       } else if (outputType === "kVA") {
//         result = inputValue / powerFactorValue + outputType;
//       }
//     }

//     console.log(result);
//     res.json({ success: true, result });
//   } catch (e) {
//     console.log(e);
//   }
// };

// exports.logCalculator = async (req, res) => {
//   try {
//     let { baseValue, logValue, operation, num } = req.body || null;
//     let result = null;
//     if (operation === "antiLog") {
//       result = 1;
//       for (let i = 0; i < logValue; i++) {
//         result = result * baseValue;
//       }
//     } else if (operation === "log") {
//       result = Math.log(num) / Math.log(baseValue);
//     } else if (operation === "naturalLog") {
//       result = Math.log(num);
//     }
//     console.log(result);
//     res.json({ success: true, result });
//   } catch (e) {
//     console.log(e);
//   }
// };

// exports.log2Calculator = async (req, res) => {
//   try {
//     let { operation, numArray, root, num } = req.body || null;
//     let result = null;
//     console.log(req.body);
//     console.log(numArray, operation);
//     if (operation === "gcd") {
//       result = gcd(numArray);
//     } else if (operation === "lcm") {
//       result = lcm(numArray);
//     } else if (operation === "root") {
//       result = Math.pow(num, 1 / root);
//     }
//     console.log(result);
//     res.json({ success: true, result });
//   } catch (e) {
//     console.log(e);
//   }
// };

// function gcd(numArray) {
//   let a, b;
//   let len = numArray.length;
//   a = numArray[0];
//   for (let i = 1; i < len; i++) {
//     b = numArray[i];
//     a = gcd_two_numbers(a, b);
//   }
//   return a;
// }
// function gcd_two_numbers(x, y) {
//   x = Math.abs(x);
//   y = Math.abs(y);
//   while (y) {
//     let t = y;
//     y = x % y;
//     x = t;
//   }
//   return x;
// }

// function lcm2(a, b) {
//   return (a * b) / gcd_two_numbers(a, b);
// }
// function lcm(array) {
//   let n = 1;
//   for (let i = 0; i < array.length; ++i) n = lcm2(array[i], n);
//   return n;
// }

// exports.statCalculator = async (req, res) => {
//   try {
//     let { values } = req.body;
//     console.log(values);
//     // values = values.toArray();
//     console.log(typeof values);
//     let sd = standardDeviation(values);
//     let variance = getVariance(values);
//     console.log(sd);
//     res.json({ success: true, sd, variance });
//   } catch (e) {
//     console.log(e);
//   }
// };

// function standardDeviation(temp) {
//   let total = 0;
//   let v;
//   let mean = total / temp.length;
//   let total1 = 0;
//   let v1;
//   let temp23;
//   let square;

//   for (let i = 0; i < temp.length; i++) {
//     v = parseFloat(temp[i]);
//     total += v;
//   }

//   mean = total / temp.length;

//   for (let i = 0; i < temp.length; i++) {
//     v1 = Math.pow(parseFloat(temp[i]) - mean, 2);
//     total1 += v1;
//   }

//   temp23 = total1 / temp.length;
//   square = Math.sqrt(temp23);
//   console.log(square);
//   return square;
// }

// function getVariance(arr) {
//   let len = 0;
//   let sum = 0;
//   for (let i = 0; i < arr.length; i++) {
//     len = len + 1;
//     sum = sum + parseFloat(arr[i]);
//   }
//   let v = 0;
//   if (len > 1) {
//     let mean = sum / len;
//     for (let i = 0; i < arr.length; i++) {
//       if (arr[i] == "") {
//       } else {
//         v = v + (arr[i] - mean) * (arr[i] - mean);
//       }
//     }
//     return v / len;
//   } else {
//     return 0;
//   }
// }

// exports.trigCalculator = async (req, res) => {
//   try {
//     let { degrees, precision } = req.body || null;
//     console.log(degrees, precision);
//     let sinValue = await sin(degrees);
//     let cosValue = await cos(degrees);
//     let tanValue = await tan(degrees, precision);
//     console.log(sinValue, cosValue, tanValue);
//     res.json({ success: true, sinValue, cosValue, tanValue });
//   } catch (e) {
//     console.log(e);
//   }
// };

// async function sin(x) {
//   x = ((x % 360) * Math.PI) / 180;

//   var sin = 0,
//     plus = true;

//   for (var y = 1; y <= 99; y += 2) {
//     if (plus) {
//       sin += Math.pow(x, y) / (await factorial(y));
//     } else {
//       sin -= Math.pow(x, y) / (await factorial(y));
//     }

//     plus = !plus;
//   }

//   return sin;
// }

// async function cos(x) {
//   return sin(90 - x);
// }

// async function tan(x, precision) {
//   return rounder((await sin(x)) / (await cos(x)), precision);
// }

// async function factorial(x) {
//   for (var y = x - 1; y > 0; y--) {
//     x *= y;
//   }

//   return x;
// }

// async function rounder(x, precision) {
//   precision = Math.pow(10, precision.value - 1);
//   return Math.round(x * precision) / precision;
// }

// exports.emailAuthentication = async (req, res) => {
//   try {
//     let { email } = req.query;
//     // email = email.toString();
//     console.log(email);

//     let transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "sanjvasn@gmail.com",
//         pass: "babablacksheep",
//       },
//     });

//     let mailOptions = {
//       from: "sanjvasn@gmail.com",
//       to: email,
//       subject: "Verify account",
//       text: "Confrim your mail to verify your account",
//       html: '<a href="http://localhost:3000/emailAuth">Confrim email</a>',
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log("Email sent: " + info.response);
//         res.json({ success: true });
//       }
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };

// exports.passwordMailTrigger = async (req, res) => {
//   try {
//     let { email } = req.query;

//     let transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "sanjvasn@gmail.com",
//         pass: "babablacksheep",
//       },
//     });

//     let mailOptions = {
//       from: "sanjvasn@gmail.com",
//       to: email,
//       subject: "Change password",
//       text: "This is your OTP to change password",
//       html: "<a >" + otp1 + "</a>",
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log("Email sent: " + info.response);
//         res.json({ success: true });
//       }
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };

// exports.verifyOtp = async (req, res) => {
//   try {
//     let { otp } = req.query;
//     console.log(otp, otp1);
//     if (otp == otp1) {
//       res.json({ success: true });
//     } else {
//       res.json({ success: false });
//     }
//   } catch (e) {
//     console.log(e);
//   }
// };
