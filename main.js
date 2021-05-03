var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const database = require("./config/Database");

var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(database.url, options);
};
connect();
mongoose.connection.on("error", console.log);
mongoose.connection.on("disconnected", connect);
require("fs")
  .readdirSync(__dirname + "/models")
  .forEach(function (file) {
    if (~file.indexOf(".js")) require(__dirname + "/models/" + file);
  });

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT,PATCH, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-api-key"
  );
  next();
});


mongoose.Promise = global.Promise;

app.use("/api", require("./routes/routes"));
// const {
//   getDifference,
//   convertCurrency,
//   setTheory,
//   matrixOperations,
//   generateBarcode,
//   checkSum,
//   qrCode,
//   electricCalculator,
//   logCalculator,
//   log2Calculator,
//   statCalculator,
//   trigCalculator,
//   emailAuthentication,
//   passwordMailTrigger,
//   verifyOtp,
// } = require("./Controller");

// //assignment 1
// app.get("/difference", getDifference);
// app.get("/fig-convert", convertCurrency);
// app.get("/matrix", matrixOperations);
// app.get("/setTheory", setTheory);
// app.get("/barcode", generateBarcode);
// app.get("/checkSum", checkSum);
// app.get("/qrCode", qrCode);

// //assignment 2
// app.post("/electric-calculator", electricCalculator);
// app.post("/log-calculator", logCalculator);
// app.post("/log2-calculator", log2Calculator);
// app.post("/stat-calculator", statCalculator);
// app.post("/trignometry-calculator", trigCalculator);

// //assignment 3

// // hauffman

// app.get("/hauffman", (req, res) => {
//   //function to calculate the frequencies
//   function frequency(str) {
//     var freq = {};
//     var len = str.length;
//     for (var i = 0; i < len; i++) {
//       var character = str[i];
//       if (freq[character]) {
//         freq[character]++;
//       } else {
//         freq[character] = 1;
//       }
//     }
//     return freq;
//   }

//   //functions to sort the frequiencies
//   function sort_frequency(freq) {
//     var tuples = [];
//     for (var a in freq) tuples.push([freq[a], a]);
//     tuples.sort();
//     return tuples;
//   }

//   //bulding a tree out of sorted frequiencies
//   function buildtree(tuples) {
//     while (tuples.length > 1) {
//       var leastTwo = tuples.slice(0, 2);
//       var theRest = tuples.slice(2);
//       var combFreq = leastTwo[0][0] + leastTwo[1][0];
//       var comb = [[combFreq].concat([leastTwo])];
//       tuples = theRest.concat(comb);
//       tuples.sort();
//     }
//     console.log(comb);
//     return comb;
//   }

//   //triming
//   function trimTree(tree) {
//     var p = tree[1];
//     if (typeof p == "string") {
//       return p;
//     } else {
//       return [trimTree(p[0]), trimTree(p[1])];
//     }
//   }

//   //assiging codes
//   var codes = {};
//   function assign_code(node, pat) {
//     if (typeof node == "string") {
//       codes[node] = pat;
//       console.log(codes);
//     } else if (typeof node == "object") {
//       assign_code(node[0], pat + "0");
//       assign_code(node[1], pat + "1");
//     }
//   }

//   //encode
//   function encode(str) {
//     output = "";
//     for (ch in str) {
//       output = output + codes[str[ch]];
//     }
//     return output;
//   }

//   //decode
//   function decode(tree, str) {
//     var output = "";
//     var p = tree;
//     for (bit in str) {
//       if (str[bit] == "0") {
//         p = p[0];
//       } else {
//         p = p[1];
//       }
//       if (typeof p == "string") {
//         output += p;
//         p = tree;
//       }
//     }
//     return output;
//   }
//   var str = req.query.str;
//   var freq = frequency(str);
//   var tuples = sort_frequency(freq);
//   var tree = buildtree(tuples);
//   //var trim = trimTree(tree);
//   assign_code(tree, "");
//   var enc = encode(str);
//   var dec = decode(tree, enc);

//   res.json({
//     encode: enc,
//     decode: dec,
//     t: tree,
//     tup: tuples,
//   });
// });

// //runlength

// app.get("/runlength", (req, res) => {
//   var str = req.query.str;
//   function encode(str) {
//     var encoding = "";
//     var count;
//     for (var i = 0; str[i]; i++) {
//       // count occurrences of character at index `i`
//       count = 1;
//       while (str[i] == str[i + 1]) {
//         count++, i++;
//       }
//       // append current character and its count to the result
//       encoding += count + str[i];
//     }
//     console.log(encoding);
//     return encoding;
//   }

//   function decode(text) {
//     if (text === "") return "";
//     let input = text;
//     let regex = /((\d+)?(\D))/g;
//     let result = "";
//     let match = regex.exec(input);
//     do {
//       result += match[3].repeat(+match[2]) || match[3];
//       match = regex.exec(input);
//     } while (match);

//     return result;
//   }

//   var enc = encode(str);
//   var dec = decode(enc);

//   res.json({
//     encode: enc,
//     decode: dec,
//   });
// });

// //lzw

// app.use("/lzw", (req, res) => {
//   function encode(uncompressed) {
//     "use strict";
//     // Build the dictionary.
//     var i,
//       dictionary = {},
//       c,
//       wc,
//       w = "",
//       result = [],
//       dictSize = 256;
//     for (i = 0; i < 256; i += 1) {
//       dictionary[String.fromCharCode(i)] = i;
//     }

//     for (i = 0; i < uncompressed.length; i += 1) {
//       c = uncompressed.charAt(i);
//       wc = w + c;
//       //Do not use dictionary[wc] because javascript arrays
//       //will return values for array['pop'], array['push'] etc
//       // if (dictionary[wc]) {
//       if (dictionary.hasOwnProperty(wc)) {
//         w = wc;
//       } else {
//         result.push(dictionary[w]);
//         // Add wc to the dictionary.
//         dictionary[wc] = dictSize++;
//         w = String(c);
//       }
//     }

//     // Output the code for w.
//     if (w !== "") {
//       result.push(dictionary[w]);
//     }
//     return result;
//   }

//   function decode(compressed) {
//     "use strict";
//     // Build the dictionary.
//     var i,
//       dictionary = [],
//       w,
//       result,
//       k,
//       entry = "",
//       dictSize = 256;
//     for (i = 0; i < 256; i += 1) {
//       dictionary[i] = String.fromCharCode(i);
//     }

//     w = String.fromCharCode(compressed[0]);
//     result = w;
//     for (i = 1; i < compressed.length; i += 1) {
//       k = compressed[i];
//       if (dictionary[k]) {
//         entry = dictionary[k];
//       } else {
//         if (k === dictSize) {
//           entry = w + w.charAt(0);
//         } else {
//           return null;
//         }
//       }

//       result += entry;

//       // Add w+entry[0] to the dictionary.
//       dictionary[dictSize++] = w + entry.charAt(0);

//       w = entry;
//     }
//     return result;
//   }
//   var str = req.query.str;
//   compressed = encode(str);
//   decompressed = decode(compressed);
//   res.json({
//     com: compressed,
//     dec: decompressed,
//   });
// });

// // assignment 4

// app.post("/emailAuth", emailAuthentication);

// app.post("/generateOtp", passwordMailTrigger);

// app.post("/verifyOtp", verifyOtp);

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Node backend listening at http://%s:%s", host, port);
});
