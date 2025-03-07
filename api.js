const express = require("express");
const token = require("./createJWT.js");

function setApp(app, client) {
    app.use("/api", createRouter(client));
}

function createRouter(client) {
    const router = express.Router();

    /** 📌 회원가입 API */
    router.post("/register", async (req, res) => {
        try {
            const { firstName, lastName, username, email, password } = req.body;

            if (!firstName || !lastName || !username || !email || !password) {
                return res.status(400).json({ error: "All fields are required." });
            }

            const db = client.db();
            const usersCollection = db.collection("Users");

            const existingUser = await usersCollection.findOne({ $or: [{ email }, { username }] });
            if (existingUser) {
                return res.status(400).json({ error: "Email or Username already exists." });
            }

            const newUser = { firstName, lastName, username, email, password };
            await usersCollection.insertOne(newUser);

            res.status(201).json({ message: "User registered successfully!" });
        } catch (error) {
            console.error("❌ Registration Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    /** 📌 로그인 API */
    router.post("/login", async (req, res) => {
        try {
            const { username, password } = req.body;
            const db = client.db();
            const usersCollection = db.collection("Users");

            const user = await usersCollection.findOne({ username, password });
            if (!user) {
                return res.status(400).json({ error: "Invalid username or password" });
            }

            const jwtToken = token.createToken(user.firstName, user.lastName, user._id).accessToken;
            res.json({ message: "Login successful!", userId: user._id, jwtToken });
        } catch (error) {
            console.error("❌ Login Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    /** 📌 카드 추가 API */
    router.post("/addcard", async (req, res) => {
        console.log("📥 Add Card Request Body:", req.body);
        
        const { userId, card, jwtToken } = req.body;

        if (!userId || !card) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        try {
            if (token.isExpired(jwtToken)) {
                return res.status(401).json({ error: "JWT is expired", jwtToken: "" });
            }
        } catch (e) {
            console.error("❌ JWT Expiration Check Error:", e.message);
        }

        const newCard = { Card: card, UserId: userId };

        try {
            const db = client.db();
            await db.collection("Cards").insertOne(newCard);
            res.status(201).json({ message: "Card added successfully!" });
        } catch (error) {
            console.error("❌ MongoDB Error:", error);
            res.status(500).json({ error: "Database error" });
        }
    });

    /** 📌 카드 검색 API */
    router.post("/searchcards", async (req, res) => {
        console.log("📥 Search Cards Request Body:", req.body);

        const { userId, search, jwtToken } = req.body;

        if (!search || typeof search !== "string") {
            return res.status(400).json({ error: "'search' field is required and must be a string." });
        }

        try {
            if (token.isExpired(jwtToken)) {
                return res.status(401).json({ error: "JWT is expired", jwtToken: "" });
            }
        } catch (e) {
            console.error("❌ JWT Expiration Check Error:", e.message);
        }

        const _search = search.trim();

        try {
            const db = client.db();
            const results = await db
                .collection("Cards")
                .find({ "Card": { $regex: `^${_search}`, $options: "i" } })
                .toArray();

            const _ret = results.map(result => result.Card);

            let refreshedToken = null;
            try {
                refreshedToken = token.refresh(jwtToken);
            } catch (e) {
                console.error("❌ JWT Refresh Error:", e.message);
            }

            res.status(200).json({ results: _ret, error: "", jwtToken: refreshedToken });
        } catch (e) {
            console.error("❌ MongoDB Query Error:", e);
            res.status(500).json({ error: "Database error" });
        }
    });

    return router;
}

module.exports = { setApp };



// const express = require('express');
// const token = require('./createJWT.js'); 
// const router = express.Router();


// function setApp(app, client, cardList) {
//     app.use('/api', createRouter(client, cardList));
// }

// function createRouter(client, cardList) {
//     const router = express.Router();

//     router.post("/register", async (req, res) => {
//         try {
//             const { firstName, lastName, username, email, password } = req.body;

//             // 필수 입력값 체크
//             if (!firstName || !lastName || !username || !email || !password) {
//                 return res.status(400).json({ error: "All fields are required." });
//             }

//             const db = client.db();
//             const usersCollection = db.collection("Users");

//             // 🔹 중복 사용자 확인 (이메일 또는 유저네임이 이미 존재하는지)
//             const existingUser = await usersCollection.findOne({ 
//                 $or: [{ email }, { username }] 
//             });
//             if (existingUser) {
//                 return res.status(400).json({ error: "Email or Username already exists." });
//             }

//             // 🔹 새 사용자 저장 (비밀번호 암호화 X)
//             const newUser = {
//                 firstName, lastName, username, email, password // 📌 비밀번호 그대로 저장
//             };
//             await usersCollection.insertOne(newUser);

//             res.status(201).json({ message: "User registered successfully!" });
//         } catch (error) {
//             console.error("❌ Registration Error:", error);
//             res.status(500).json({ error: "Internal Server Error" });
//         }
//     });


//     // router.post('/addcard', async (req, res) => {
//     //     const { userId, card, jwtToken } = req.body;

//     //     try {
//     //         if (token.isExpired(jwtToken)) {
//     //             return res.status(200).json({ error: "The JWT is no longer valid", jwtToken: "" });
//     //         }
//     //     } catch (e) {
//     //         console.log(e.message);
//     //     }

//     //     const newCard = { Card: card, UserId: userId };
//     //     let error = "";

//     //     try {
//     //         const db = client.db();  // ❌ MongoClient 사용
//     //         await db.collection('Cards').insertOne(newCard);
//     //     } catch (e) {
//     //         error = e.toString();
//     //     }

//     //     let refreshedToken = null;
//     //     try {
//     //         refreshedToken = token.refresh(jwtToken);
//     //     } catch (e) {
//     //         console.log(e.message);
//     //     }

//     //     res.status(200).json({ error: error, jwtToken: refreshedToken.accessToken });
//     // });

//     router.post("/login", async (req, res) => {
//         try {
//             const { username, password } = req.body;
//             const db = client.db();
//             const usersCollection = db.collection("Users");

//             // 🔹 사용자 찾기
//             const user = await usersCollection.findOne({ username, password }); // 📌 비밀번호 비교 (암호화 없음)
//             if (!user) {
//                 return res.status(400).json({ error: "Invalid username or password" });
//             }

//             // 🔹 JWT 생성
//             const jwtToken = token.createToken(user.firstName, user.lastName, user._id).accessToken;

//             res.json({ message: "Login successful!", userId: user._id, jwtToken });
//         } catch (error) {
//             console.error("❌ Login Error:", error);
//             res.status(500).json({ error: "Internal Server Error" });
//         }
//     });

//     // router.post('/login', async (req, res) => {
//     //     let error = '';
//     //     const { login, password } = req.body;

//     //     const db = client.db();
//     //     const results = await db.collection('Users').find({ Login: login, Password: password }).toArray();

//     //     let id = -1, fn = '', ln = '', jwtToken = '';

//     //     if (results.length > 0) {
//     //         id = results[0].UserId;
//     //         fn = results[0].FirstName;
//     //         ln = results[0].LastName;
//     //         jwtToken = token.createToken(fn, ln, id).accessToken; 
//     //     } else {
//     //         error = 'Invalid user name/password';
//     //     }

//     //     res.status(200).json({ id, firstName: fn, lastName: ln, jwtToken, error });
//     // });

//     router.post('/login', async (req, res) => {
//         let error = '';
//         const { login, password } = req.body;
        
//         let id = -1, fn = '', ln = '', jwtToken = '';

//         if (login.toLowerCase() === 'rickl' && password === 'COP4331') {
//             id = 1;
//             fn = 'Rick';
//             ln = 'Leinecker';
//             jwtToken = token.createToken(fn, ln, id).accessToken; 
//         } else {
 
//             const db = client.db();
//             const results = await db.collection('Users').find({ Login: login, Password: password }).toArray();
    
//             if (results.length > 0) {
//                 id = results[0].UserId;
//                 fn = results[0].FirstName;
//                 ln = results[0].LastName;
//                 jwtToken = token.createToken(fn, ln, id).accessToken;
//             } else {
//                 error = 'Invalid user name/password';
//             }
//         }
    
//         res.status(200).json({ id, firstName: fn, lastName: ln, jwtToken, error });
//     });
    

//     // router.post('/searchcards', async (req, res) => {
//     //     let error = "";
//     //     const { userId, search, jwtToken } = req.body;

//     //     try {
//     //         if (token.isExpired(jwtToken)) {
//     //             return res.status(200).json({ error: "The JWT is no longer valid", jwtToken: "" });
//     //         }
//     //     } catch (e) {
//     //         console.log(e.message);
//     //     }

//     //     const _search = search.trim();

//     //     try {
//     //         const db = client.db();
//     //         const results = await db.collection("Cards").find({ "Card": { $regex: _search + ".*", $options: "i" } }).toArray();

//     //         let _ret = results.map(result => result.Card);

//     //         let refreshedToken = null;
//     //         try {
//     //             refreshedToken = token.refresh(jwtToken);
//     //         } catch (e) {
//     //             console.log(e.message);
//     //         }

//     //         res.status(200).json({ results: _ret, error: error, jwtToken: refreshedToken });
//     //     } catch (e) {
//     //         error = e.toString();
//     //         res.status(500).json({ error });
//     //     }
//     // });

//     router.post('/searchcards', async (req, res) => {
//         console.log("📥 Search Cards Request Body:", req.body); // 🔍 요청 데이터 확인
    
//         let error = "";
        
//         // ✅ `req.body`가 올바르게 들어오는지 확인
//         if (!req.body || typeof req.body !== "object") {
//             console.error("❌ Invalid request body:", req.body);
//             return res.status(400).json({ error: "Invalid JSON body received" });
//         }
    
//         const { userId, search, jwtToken } = req.body;
    
//         // ✅ `search`가 정의되지 않은 경우 기본값 설정
//         if (typeof search !== "string") {
//             console.warn("⚠️ 'search' field is missing or not a string. Received:", search);
//             return res.status(400).json({ error: "'search' field is required and must be a string." });
//         }
    
//         try {
//             if (token.isExpired(jwtToken)) {
//                 return res.status(200).json({ error: "The JWT is no longer valid", jwtToken: "" });
//             }
//         } catch (e) {
//             console.log("❌ JWT Expiration Check Error:", e.message);
//         }
    
//         const _search = search.trim(); // ✅ `search`가 undefined가 아니므로 안전하게 trim()
    
//         try {
//             const db = client.db();
//             const results = await db
//                 .collection("Cards")
//                 .find({ "Card": { $regex: `^${_search}`, $options: "i" } }) // ✅ 검색 패턴 수정
//                 .toArray();
    
//             let _ret = results.map(result => result.Card);
    
//             let refreshedToken = null;
//             try {
//                 refreshedToken = token.refresh(jwtToken);
//             } catch (e) {
//                 console.log("❌ JWT Refresh Error:", e.message);
//             }
    
//             console.log("📤 Sending Response:", { results: _ret, error, jwtToken: refreshedToken });
    
//             res.status(200).json({ results: _ret, error, jwtToken: refreshedToken });
//         } catch (e) {
//             error = e.toString();
//             console.error("❌ MongoDB Query Error:", error);
//             res.status(500).json({ error });
//         }
//     });
    

//     return router;
// }
// module.exports = { setApp };

// const express = require('express');
// const router = express.Router();

// function setApp(app, client, cardList) {
//     app.use('/api', createRouter(client, cardList));
// }

// function createRouter(client, cardList) {
//     const router = express.Router();

//     router.post('/addcard', async (req, res) => {
//         const { userId, card } = req.body;
//         const newCard = { Card: card, UserId: userId };
//         let error = '';

//         try {
//             const db = client.db();
//             await db.collection('Cards').insertOne(newCard);
//         } catch (e) {
//             error = e.toString();
//         }

//         cardList.push(card);
//         res.status(200).json({ error });
//     });

//     // router.post('/login', async (req, res) => {
//     //     let error = '';
//     //     const { login, password } = req.body;

//     //     const db = client.db();
//     //     const results = await db.collection('Users').find({ Login: login, Password: password }).toArray();

//     //     let id = -1, fn = '', ln = '';

//     //     if (results.length > 0) {
//     //         id = results[0].UserId;
//     //         fn = results[0].FirstName;
//     //         ln = results[0].LastName;
//     //     }

//     //     if (login.toLowerCase() === 'rickl' && password === 'COP4331') {
//     //         id = 1;
//     //         fn = 'Rick';
//     //         ln = 'Leinecker';
//     //     } else {
//     //         error = 'Invalid user name/password';
//     //     }

//     //     res.status(200).json({ id, firstName: fn, lastName: ln, error });
//     // });

//     router.post('/api/login', async (req, res, next) => 
//         {
//           // incoming: login, password
//           // outgoing: id, firstName, lastName, error
        
//           var error = '';
        
//           const { login, password } = req.body;
        
//           const db = client.db();
//           const results = await db.collection('Users').find({Login:login,Password:password}).toArray();
        
//           var id = -1;
//           var fn = '';
//           var ln = '';
//           var ret;
    
//           if( results.length > 0 )
//           {
//             id = results[0].UserId;
//             fn = results[0].FirstName;
//             ln = results[0].LastName;
    
//             try
//             {
//               const token = require("./createJWT.js");
//               ret = token.createToken( fn, ln, id );
//             }
//             catch(e)
//             {
//               ret = {error:e.message};
//             }
//           }
//           else
//           {
//               ret = {error:"Login/Password incorrect"};
//           }
        
//           res.status(200).json(ret);
//     });
    

//     router.post('/searchcards', async (req, res) => {
//         let error = '';
//         const { userId, search } = req.body;
//         const _search = search.trim();

//         try {
//             const db = client.db();
//             const results = await db.collection('Cards').find({ "Card": { $regex: _search + '.*', $options: 'i' } }).toArray();

//             let _ret = results.map(result => result.Card);
//             res.status(200).json({ results: _ret, error });
//         } catch (e) {
//             error = e.toString();
//             res.status(500).json({ error });
//         }
//     });

//     return router;
// }

// module.exports = { setApp };


// const express = require('express');
// const router = express.Router();

// module.exports = function(client, cardList) {

//     router.post('/api/addcard', async (req, res) => {
//         // 입력: userId, card
//         // 출력: error

//         const { userId, card } = req.body;
//         const newCard = { Card: card, UserId: userId };
//         let error = '';

//         try {
//             const db = client.db();
//             await db.collection('Cards').insertOne(newCard);
//         } catch (e) {
//             error = e.toString();
//         }

//         cardList.push(card);
//         res.status(200).json({ error });
//     });

//     router.post('/api/login', async (req, res) => {
//         // 입력: login, password
//         // 출력: id, firstName, lastName, error

//         let error = '';
//         const { login, password } = req.body;

//         const db = client.db();
//         const results = await db.collection('Users').find({ Login: login, Password: password }).toArray();

//         let id = -1, fn = '', ln = '';

//         if (results.length > 0) {
//             id = results[0].UserId;
//             fn = results[0].FirstName;
//             ln = results[0].LastName;
//         }

//         if (login.toLowerCase() === 'rickl' && password === 'COP4331') {
//             id = 1;
//             fn = 'Rick';
//             ln = 'Leinecker';
//         } else {
//             error = 'Invalid user name/password';
//         }

//         res.status(200).json({ id, firstName: fn, lastName: ln, error });
//     });

//     router.post('/api/searchcards', async (req, res) => {
//         // 입력: userId, search
//         // 출력: results[], error

//         let error = '';
//         const { userId, search } = req.body;
//         const _search = search.trim();

//         try {
//             const db = client.db();
//             const results = await db.collection('Cards').find({"Card": { $regex: _search + '.*', $options: 'i' }}).toArray();

//             let _ret = results.map(result => result.Card);
//             res.status(200).json({ results: _ret, error });
//         } catch (e) {
//             error = e.toString();
//             res.status(500).json({ error });
//         }
//     });

//     return router;
// };
