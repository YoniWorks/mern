const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config(); // .env 파일 로드

const app = express();
app.use(cors());

// ✅ JSON 요청을 올바르게 처리
app.use(express.json()); // body-parser 불필요

// ✅ 모든 요청 로그 출력 (디버깅용)
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url}`);
  console.log("📝 Request Headers:", req.headers);
  console.log("📝 Request Body:", JSON.stringify(req.body, null, 2)); // JSON 본문 확인
  next();
});

// ✅ MongoDB 연결
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
client.connect();

// ✅ API 설정
const api = require("./api");
api.setApp(app, client);

// ✅ 서버 실행
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});


// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const { MongoClient } = require('mongodb');
// require('dotenv').config(); // .env 파일 로드

// const app = express();
// app.use(cors());


// app.use(bodyParser.json());
// app.use(express.json());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PATCH, DELETE, OPTIONS'
//   );
//   next();
// });

// // MongoDB 연결
// const url = process.env.MONGODB_URI;
// const client = new MongoClient(url);
// client.connect();

// // 카드 목록 (임시 데이터)
// const cardList = [
//   'Roy Campanella', 'Paul Molitor', 'Tony Gwynn', 'Dennis Eckersley', 'Reggie Jackson', 'Gaylord Perry',
//   'Buck Leonard', 'Rollie Fingers', 'Charlie Gehringer', 'Wade Boggs', 'Carl Hubbell', 'Dave Winfield',
//   'Jackie Robinson', 'Ken Griffey, Jr.', 'Al Simmons', 'Chuck Klein', 'Mel Ott', 'Mark McGwire', 'Nolan Ryan',
//   'Ralph Kiner', 'Yogi Berra', 'Goose Goslin', 'Greg Maddux', 'Frankie Frisch', 'Ernie Banks', 'Ozzie Smith',
//   'Hank Greenberg', 'Kirby Puckett', 'Bob Feller', 'Dizzy Dean', 'Joe Jackson', 'Sam Crawford', 'Barry Bonds',
//   'Duke Snider', 'George Sisler', 'Ed Walsh', 'Tom Seaver', 'Willie Stargell', 'Bob Gibson', 'Brooks Robinson',
//   'Steve Carlton', 'Joe Medwick', 'Nap Lajoie', 'Cal Ripken, Jr.', 'Mike Schmidt', 'Eddie Murray', 'Tris Speaker',
//   'Al Kaline', 'Sandy Koufax', 'Willie Keeler', 'Pete Rose', 'Robin Roberts', 'Eddie Collins', 'Lefty Gomez',
//   'Lefty Grove', 'Carl Yastrzemski', 'Frank Robinson', 'Juan Marichal', 'Warren Spahn', 'Pie Traynor',
//   'Roberto Clemente', 'Harmon Killebrew', 'Satchel Paige', 'Eddie Plank', 'Josh Gibson', 'Oscar Charleston',
//   'Mickey Mantle', 'Cool Papa Bell', 'Johnny Bench', 'Mickey Cochrane', 'Jimmie Foxx', 'Jim Palmer', 'Cy Young',
//   'Eddie Mathews', 'Honus Wagner', 'Paul Waner', 'Grover Alexander', 'Rod Carew', 'Joe DiMaggio', 'Joe Morgan',
//   'Stan Musial', 'Bill Terry', 'Rogers Hornsby', 'Lou Brock', 'Ted Williams', 'Bill Dickey', 'Christy Mathewson',
//   'Willie McCovey', 'Lou Gehrig', 'George Brett', 'Hank Aaron', 'Harry Heilmann', 'Walter Johnson', 'Roger Clemens',
//   'Ty Cobb', 'Whitey Ford', 'Willie Mays', 'Rickey Henderson', 'Babe Ruth'
// ];

// // api.js에서 API 설정 함수 호출
// const api = require('./api');
// api.setApp(app, client, cardList);

// // 서버 실행
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const { MongoClient } = require('mongodb');
// require('dotenv').config(); // .env 파일 로드

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PATCH, DELETE, OPTIONS'
//   );
//   next();
// });

// // MongoDB 연결
// const url = process.env.MONGODB_URI;
// const client = new MongoClient(url);
// client.connect();

// // api.js에서 API 설정 함수 호출
// var api = require('./api.js');
// api.setApp(app, client);

// // 서버 실행
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });




// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const { MongoClient } = require('mongodb');
// require('dotenv').config(); 

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PATCH, DELETE, OPTIONS'
//   );
//   next();
// });

// // MongoDB 연결
// const url = process.env.MONGODB_URI;
// const client = new MongoClient(url);
// client.connect();

// // 카드 목록 (임시 데이터)
// const cardList = [
//   'Roy Campanella', 'Paul Molitor', 'Tony Gwynn', 'Dennis Eckersley', 'Reggie Jackson', 'Gaylord Perry',
//   'Buck Leonard', 'Rollie Fingers', 'Charlie Gehringer', 'Wade Boggs', 'Carl Hubbell', 'Dave Winfield',
//   'Jackie Robinson', 'Ken Griffey, Jr.', 'Al Simmons', 'Chuck Klein', 'Mel Ott', 'Mark McGwire', 'Nolan Ryan',
//   'Ralph Kiner', 'Yogi Berra', 'Goose Goslin', 'Greg Maddux', 'Frankie Frisch', 'Ernie Banks', 'Ozzie Smith',
//   'Hank Greenberg', 'Kirby Puckett', 'Bob Feller', 'Dizzy Dean', 'Joe Jackson', 'Sam Crawford', 'Barry Bonds',
//   'Duke Snider', 'George Sisler', 'Ed Walsh', 'Tom Seaver', 'Willie Stargell', 'Bob Gibson', 'Brooks Robinson',
//   'Steve Carlton', 'Joe Medwick', 'Nap Lajoie', 'Cal Ripken, Jr.', 'Mike Schmidt', 'Eddie Murray', 'Tris Speaker',
//   'Al Kaline', 'Sandy Koufax', 'Willie Keeler', 'Pete Rose', 'Robin Roberts', 'Eddie Collins', 'Lefty Gomez',
//   'Lefty Grove', 'Carl Yastrzemski', 'Frank Robinson', 'Juan Marichal', 'Warren Spahn', 'Pie Traynor',
//   'Roberto Clemente', 'Harmon Killebrew', 'Satchel Paige', 'Eddie Plank', 'Josh Gibson', 'Oscar Charleston',
//   'Mickey Mantle', 'Cool Papa Bell', 'Johnny Bench', 'Mickey Cochrane', 'Jimmie Foxx', 'Jim Palmer', 'Cy Young',
//   'Eddie Mathews', 'Honus Wagner', 'Paul Waner', 'Grover Alexander', 'Rod Carew', 'Joe DiMaggio', 'Joe Morgan',
//   'Stan Musial', 'Bill Terry', 'Rogers Hornsby', 'Lou Brock', 'Ted Williams', 'Bill Dickey', 'Christy Mathewson',
//   'Willie McCovey', 'Lou Gehrig', 'George Brett', 'Hank Aaron', 'Harry Heilmann', 'Walter Johnson', 'Roger Clemens',
//   'Ty Cobb', 'Whitey Ford', 'Willie Mays', 'Rickey Henderson', 'Babe Ruth'
// ];

// // api.js에서 라우터 가져오기
// const apiRoutes = require('./api')(client, cardList);
// app.use(apiRoutes);

// // 서버 실행
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PATCH, DELETE, OPTIONS'
//   );
//   next();
// });

// var cardList = [
//   'Roy Campanella', 'Paul Molitor', 'Tony Gwynn', 'Dennis Eckersley', 'Reggie Jackson', 'Gaylord Perry',
//   'Buck Leonard', 'Rollie Fingers', 'Charlie Gehringer', 'Wade Boggs', 'Carl Hubbell', 'Dave Winfield',
//   'Jackie Robinson', 'Ken Griffey, Jr.', 'Al Simmons', 'Chuck Klein', 'Mel Ott', 'Mark McGwire', 'Nolan Ryan',
//   'Ralph Kiner', 'Yogi Berra', 'Goose Goslin', 'Greg Maddux', 'Frankie Frisch', 'Ernie Banks', 'Ozzie Smith',
//   'Hank Greenberg', 'Kirby Puckett', 'Bob Feller', 'Dizzy Dean', 'Joe Jackson', 'Sam Crawford', 'Barry Bonds',
//   'Duke Snider', 'George Sisler', 'Ed Walsh', 'Tom Seaver', 'Willie Stargell', 'Bob Gibson', 'Brooks Robinson',
//   'Steve Carlton', 'Joe Medwick', 'Nap Lajoie', 'Cal Ripken, Jr.', 'Mike Schmidt', 'Eddie Murray', 'Tris Speaker',
//   'Al Kaline', 'Sandy Koufax', 'Willie Keeler', 'Pete Rose', 'Robin Roberts', 'Eddie Collins', 'Lefty Gomez',
//   'Lefty Grove', 'Carl Yastrzemski', 'Frank Robinson', 'Juan Marichal', 'Warren Spahn', 'Pie Traynor',
//   'Roberto Clemente', 'Harmon Killebrew', 'Satchel Paige', 'Eddie Plank', 'Josh Gibson', 'Oscar Charleston',
//   'Mickey Mantle', 'Cool Papa Bell', 'Johnny Bench', 'Mickey Cochrane', 'Jimmie Foxx', 'Jim Palmer', 'Cy Young',
//   'Eddie Mathews', 'Honus Wagner', 'Paul Waner', 'Grover Alexander', 'Rod Carew', 'Joe DiMaggio', 'Joe Morgan',
//   'Stan Musial', 'Bill Terry', 'Rogers Hornsby', 'Lou Brock', 'Ted Williams', 'Bill Dickey', 'Christy Mathewson',
//   'Willie McCovey', 'Lou Gehrig', 'George Brett', 'Hank Aaron', 'Harry Heilmann', 'Walter Johnson', 'Roger Clemens',
//   'Ty Cobb', 'Whitey Ford', 'Willie Mays', 'Rickey Henderson', 'Babe Ruth'
// ];

// const MongoClient = require('mongodb').MongoClient;
// require('dotenv').config();  // .env 파일 로드
// const url = process.env.MONGODB_URI;

// const client = new MongoClient(url);
// client.connect();

// // app.post('/api/addcard', async (req, res, next) => {
// //   // incoming: userId, card
// //   // outgoing: error

// //   var error = '';

// //   const { userId, card } = req.body;

// //   // TEMP FOR LOCAL TESTING.
// //   cardList.push(card);

// //   var ret = { error: error };
// //   res.status(200).json(ret); // Fixed typo: used .json instead of .tsxon
// // });

// app.post('/api/addcard', async (req, res, next) =>
//   {
//     // incoming: userId, color
//     // outgoing: error
    
//     const { userId, card } = req.body;
  
//     const newCard = {Card:card,UserId:userId};
//     var error = '';
  
//     try
//     {
//       const db = client.db();
//       const result = db.collection('Cards').insertOne(newCard);
//     }
//     catch(e)
//     {
//       error = e.toString();
//     }
//     cardList.push( card );

//     var ret = { error: error };
//     res.status(200).json(ret);
//   });
    

// // app.post('/api/login', async (req, res, next) => {
// //   // incoming: login, password
// //   // outgoing: id, firstName, lastName, error

// //   var error = '';
// //   const { login, password } = req.body;

// //   // Check if login and password are provided
// //   if (!login || !password) {
// //     return res.status(400).json({ error: 'Login and password are required' });
// //   }

// //   var id = -1;
// //   var fn = '';
// //   var ln = '';

// //   if (login.toLowerCase() === 'rickl' && password === 'COP4331') {
// //     id = 1;
// //     fn = 'Rick';
// //     ln = 'Leinecker';
// //   } else {
// //     error = 'Invalid user name/password';
// //   }

// //   var ret = { id, firstName: fn, lastName: ln, error };
// //   res.status(200).json(ret);
// // });

// app.post('/api/login', async (req, res, next) => 
//   {
//     // incoming: login, password
//     // outgoing: id, firstName, lastName, error
    
//    var error = '';
  
//     const { login, password } = req.body;
  
//     const db = client.db();
//     const results = await db.collection('Users').find({Login:login,Password:password}).toArray();
  
//     var id = -1;
//     var fn = '';
//     var ln = '';
  
//     if( results.length > 0 )
//     {
//       id = results[0].UserId;
//       fn = results[0].FirstName;
//       ln = results[0].LastName;
//     }

//       if (login.toLowerCase() === 'rickl' && password === 'COP4331') {
//     id = 1;
//     fn = 'Rick';
//     ln = 'Leinecker';
//   } else {
//     error = 'Invalid user name/password';
//   }
  
//     var ret = { id:id, firstName:fn, lastName:ln, error:''};
//     res.status(200).json(ret); 
//   });

// // app.post('/api/searchcards', async (req, res, next) => {
// //   // incoming: userId, search
// //   // outgoing: results[], error

// //   var error = '';

// //   const { userId, search } = req.body;
// //   var _search = search.toLowerCase().trim();
// //   var _ret = [];

// //   for (var i = 0; i < cardList.length; i++) {
// //     var lowerFromList = cardList[i].toLocaleLowerCase();
// //     if (lowerFromList.indexOf(_search) >= 0) {
// //       _ret.push(cardList[i]);
// //     }
// //   }

// //   var ret = { results: _ret, error: '' };
// //   res.status(200).json(ret); // Fixed typo: used .json instead of .tsxon
// // });
// app.post('/api/searchcards', async (req, res, next) => {
//   // incoming: userId, search
//   // outgoing: results[], error

//   var error = '';

//   const { userId, search } = req.body;

//   var _search = search.trim();

//   try {
//       const db = client.db();
//       const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*', $options:'i'}}).toArray();

//       var _ret = [];
//       for (var i = 0; i < results.length; i++) {
//           _ret.push(results[i].Card);
//       }

//       var ret = { results: _ret, error: error };
//       res.status(200).json(ret);
//   } catch (e) {
//       error = e.toString();
//       res.status(500).json({ error });
//   }
// });

  
  

// app.listen(5000, () => {
//   console.log('Server is running on port 5000');
// });
