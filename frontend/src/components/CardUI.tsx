import React, { useState, useEffect } from "react";
import { useJwt } from "react-jwt";
import { buildPath } from "./Path";
import { storeToken, retrieveToken } from "../tokenStorage";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const CardUI: React.FC = () => {
    const navigate = useNavigate(); 
    const [message, setMessage] = useState("");
    const [searchResults, setResults] = useState("");
    const [cardList, setCardList] = useState("");
    const [search, setSearchValue] = useState("");
    const [card, setCardValue] = useState("");

    const [token, setToken] = useState(retrieveToken());
    const { isExpired } = useJwt(token);

    // ✅ 토큰 만료 시 로그인 페이지로 이동
    useEffect(() => {
        if (!token || isExpired) {
            console.warn("🔴 Token expired, redirecting to login...");
            navigate("/login");
        }
    }, [token, isExpired, navigate]);

    // ✅ 5초마다 새로운 토큰 가져오기
    useEffect(() => {
        const interval = setInterval(() => {
            const newToken = retrieveToken();
            if (newToken && newToken !== token) {
                console.log("🔄 Updating Token:", newToken);
                setToken(newToken);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [token]);

    // // ✅ JWT에서 userId 가져오기 (올바르게 수정)
    // function getUserIdFromToken() {
    //     try {
    //         const decoded = JSON.parse(atob(token.split(".")[1])); // JWT 디코딩
    //         return decoded.userId; // ✅ 기존 id → userId로 변경
    //     } catch (e) {
    //         console.warn("⚠️ Failed to decode JWT Token:", e);
    //         return null;
    //     }
    // }

    async function addCard(e: React.FormEvent): Promise<void> {
        e.preventDefault();
    
        try {
            const response = await axios.post(buildPath("api/addcard"), {
                userId: "1",
                card,
                jwtToken: retrieveToken()
            });
    
            console.log("🔄 API Response:", response.data);
            setMessage("Card has been added");
    
            // ✅ 반환된 JWT가 문자열인지 확인 후 저장
            if (typeof response.data.jwtToken === "string") {
                console.log("✅ Storing valid JWT Token:", response.data.jwtToken);
                storeToken(response.data.jwtToken); 
                setToken(response.data.jwtToken);
            } else {
                console.warn("⚠️ Invalid JWT format received:", response.data.jwtToken);
            }
        } catch (error) {
            console.error("❌ Error:", error);
            setMessage("Failed to add card.");
        }
    }
    
    
    async function searchCard(e: React.FormEvent): Promise<void> {
        e.preventDefault();
    
        try {
            const response = await axios.post(buildPath("api/searchcards"), {
                userId: "1",
                search,
                jwtToken: retrieveToken()
            });
    
            console.log("🔄 API Response:", response.data);
            const resultText = response.data.results?.join(", ") || "No cards found.";
            setResults("Card(s) have been retrieved");
            setCardList(resultText);
    
            // ✅ 새로운 토큰 저장 (accessToken만 저장)
            if (response.data.jwtToken && typeof response.data.jwtToken === "object" && "accessToken" in response.data.jwtToken) {
                console.log("✅ Storing valid JWT Token:", response.data.jwtToken.accessToken);
                storeToken(response.data.jwtToken.accessToken);
                setToken(response.data.jwtToken.accessToken);
            } else {
                console.warn("⚠️ Received an invalid JWT Token:", response.data.jwtToken);
            }
        } catch (error) {
            console.error("❌ Error:", error);
            setResults("Failed to search card.");
        }
    }

    return (
        <div>
            <h2>Card Management</h2>

            <label htmlFor="searchText">Search: </label>
            <input type="text" value={search} onChange={(e) => setSearchValue(e.target.value)} />
            <button type="button" onClick={searchCard}>Search Card</button>
            <br />
            <span>{searchResults}</span>
            <p>{cardList}</p>

            <label htmlFor="cardText">Add: </label>
            <input type="text" value={card} onChange={(e) => setCardValue(e.target.value)} />
            <button type="button" onClick={addCard}>Add Card</button>
            <br />
            <span>{message}</span>
        </div>
    );
};

export default CardUI;


// import React, { useState, useEffect } from "react";
// import { useJwt } from "react-jwt";
// import { buildPath } from "./Path";
// import { storeToken, retrieveToken } from "../tokenStorage";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';

// const CardUI: React.FC = () => {
//     const navigate = useNavigate(); 
//     const [message, setMessage] = useState("");
//     const [searchResults, setResults] = useState("");
//     const [cardList, setCardList] = useState("");
//     const [search, setSearchValue] = useState("");
//     const [card, setCardValue] = useState("");

//     const [token, setToken] = useState(retrieveToken());
//     const { isExpired } = useJwt(token);

//     // ✅ 토큰 만료 시 로그인 페이지로 이동
//     useEffect(() => {
//         if (!token || isExpired) {
//             console.warn("🔴 Token expired, redirecting to login...");
//             navigate("/login");
//         }
//     }, [token, isExpired, navigate]);

//     // ✅ 5초마다 새로운 토큰 가져오기
//     useEffect(() => {
//         const interval = setInterval(() => {
//             const newToken = retrieveToken();
//             if (newToken && newToken !== token) {
//                 console.log("🔄 Updating Token:", newToken);
//                 setToken(newToken);
//             }
//         }, 5000);

//         return () => clearInterval(interval);
//     }, [token]);

//     async function addCard(e: React.FormEvent): Promise<void> {
//         e.preventDefault();
    
//         try {
//             const response = await axios.post(buildPath("api/addcard"), {
//                 userId: "1",
//                 card,
//                 jwtToken: retrieveToken()
//             });
    
//             console.log("🔄 API Response:", response.data);
//             setMessage("Card has been added");
    
//             // ✅ 새로운 토큰 저장 (accessToken만 저장)
//             if (response.data.jwtToken && typeof response.data.jwtToken === "object" && "accessToken" in response.data.jwtToken) {
//                 console.log("✅ Storing valid JWT Token:", response.data.jwtToken.accessToken);
//                 storeToken(response.data.jwtToken.accessToken);
//                 setToken(response.data.jwtToken.accessToken);
//             } else {
//                 console.warn("⚠️ Received an invalid JWT Token:", response.data.jwtToken);
//             }
//         } catch (error) {
//             console.error("❌ Error:", error);
//             setMessage("Failed to add card.");
//         }
//     }
    
//     async function searchCard(e: React.FormEvent): Promise<void> {
//         e.preventDefault();
    
//         try {
//             const response = await axios.post(buildPath("api/searchcards"), {
//                 userId: "1",
//                 search,
//                 jwtToken: retrieveToken()
//             });
    
//             console.log("🔄 API Response:", response.data);
//             const resultText = response.data.results?.join(", ") || "No cards found.";
//             setResults("Card(s) have been retrieved");
//             setCardList(resultText);
    
//             // ✅ 새로운 토큰 저장 (accessToken만 저장)
//             if (response.data.jwtToken && typeof response.data.jwtToken === "object" && "accessToken" in response.data.jwtToken) {
//                 console.log("✅ Storing valid JWT Token:", response.data.jwtToken.accessToken);
//                 storeToken(response.data.jwtToken.accessToken);
//                 setToken(response.data.jwtToken.accessToken);
//             } else {
//                 console.warn("⚠️ Received an invalid JWT Token:", response.data.jwtToken);
//             }
//         } catch (error) {
//             console.error("❌ Error:", error);
//             setResults("Failed to search card.");
//         }
//     }
    

//     return (
//         <div>
//             <h2>Card Management</h2>

//             <label htmlFor="searchText">Search: </label>
//             <input type="text" value={search} onChange={(e) => setSearchValue(e.target.value)} />
//             <button type="button" onClick={searchCard}>Search Card</button>
//             <br />
//             <span>{searchResults}</span>
//             <p>{cardList}</p>

//             <label htmlFor="cardText">Add: </label>
//             <input type="text" value={card} onChange={(e) => setCardValue(e.target.value)} />
//             <button type="button" onClick={addCard}>Add Card</button>
//             <br />
//             <span>{message}</span>
//         </div>
//     );
// };

// export default CardUI;


// import React, { useState, useEffect } from "react";
// import { useJwt } from "react-jwt";
// import { buildPath } from "./Path";
// import { storeToken, retrieveToken } from "../tokenStorage";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios'

// const CardUI: React.FC = () => {
//     const navigate = useNavigate(); 
//     const [message, setMessage] = useState("");
//     const [searchResults, setResults] = useState("");
//     const [cardList, setCardList] = useState("");
//     const [search, setSearchValue] = useState("");
//     const [card, setCardValue] = useState("");

//     const [token, setToken] = useState(retrieveToken());
//     const { isExpired } = useJwt(token);

//     // ✅ 토큰이 만료되면 로그인 페이지로 이동
//     useEffect(() => {
//         console.log("🔍 Retrieved Token:", token);
//         console.log("🔍 Token Expired?", isExpired);

//         if (!token || isExpired) {
//             console.warn("🔴 Token expired, redirecting to login...");
//             navigate("/login");
//         }
//     }, [token, isExpired, navigate]);

//     // ✅ 5초마다 새로운 토큰을 가져옴
//     useEffect(() => {
//         const interval = setInterval(() => {
//             const newToken = retrieveToken();
//             if (newToken && newToken !== token) {
//                 console.log("🔄 Updating Token:", newToken);
//                 setToken(newToken);
//             }
//         }, 5000); // 5초마다 실행

//         return () => clearInterval(interval);
//     }, [token]);

//     // // ✅ 카드 추가 함수
//     // async function addCard(e: React.FormEvent): Promise<void> {
//     //     e.preventDefault();
//     //     let obj = { userId: "1", card, jwtToken: retrieveToken() };
//     //     let js = JSON.stringify(obj);

//     //     try {
//     //         const response = await fetch(buildPath("api/addcard"), {
//     //             method: "POST",
//     //             body: js,
//     //             headers: { "Content-Type": "application/json" },
//     //         });

//     //         const res = await response.json();
//     //         console.log("🔄 API Response:", res);

//     //         if (res.error && res.error.length > 0) {
//     //             setMessage("API Error: " + res.error);
//     //         } else {
//     //             setMessage("Card has been added");

//     //             // ✅ 새로운 토큰이 유효한 경우만 저장
//     //             if (typeof res.jwtToken === "string") {
//     //                 storeToken(res.jwtToken);
//     //                 setToken(res.jwtToken); // 상태 업데이트
//     //             } else {
//     //                 console.warn("⚠️ Received an invalid JWT Token:", res.jwtToken);
//     //             }
//     //         }
//     //     } catch (error: any) {
//     //         setMessage(error.toString());
//     //     }
//     // }

//     // // ✅ 카드 검색 함수
//     // async function searchCard(e: React.FormEvent): Promise<void> {
//     //     e.preventDefault();
//     //     let obj = { userId: "1", search, jwtToken: retrieveToken() };
//     //     let js = JSON.stringify(obj);

//     //     try {
//     //         const response = await fetch(buildPath("api/searchcards"), {
//     //             method: "POST",
//     //             body: js,
//     //             headers: { "Content-Type": "application/json" },
//     //         });

//     //         const res = await response.json();
//     //         console.log("🔄 API Response:", res);
            
//     //         const resultText = res.results?.join(", ") || "No cards found.";
//     //         setResults("Card(s) have been retrieved");
//     //         setCardList(resultText);

//     //         // ✅ 새로운 토큰이 유효한 경우만 저장
//     //         if (typeof res.jwtToken === "string") {
//     //             storeToken(res.jwtToken);
//     //             setToken(res.jwtToken);
//     //         } else {
//     //             console.warn("⚠️ Received an invalid JWT Token:", res.jwtToken);
//     //         }
//     //     } catch (error: any) {
//     //         setResults(error.toString());
//     //     }
//     // }

//     async function addCard(e: React.FormEvent): Promise<void> {
//         e.preventDefault();
//         let obj = { userId: "1", card, jwtToken: retrieveToken() };
//         let js = JSON.stringify(obj);

//         try {
//             const response = await fetch(buildPath("api/addcard"), {
//                 method: "POST",
//                 body: js,
//                 headers: { "Content-Type": "application/json" },
//             });

//             const res = await response.json();
//             console.log("🔄 API Response:", res);

//             if (res.error && res.error.length > 0) {
//                 setMessage("API Error: " + res.error);
//             } else {
//                 setMessage("Card has been added");

//                 // ✅ 새로운 토큰이 객체인 경우, accessToken을 저장
//                 if (res.jwtToken && typeof res.jwtToken === "object" && "accessToken" in res.jwtToken) {
//                     console.log("✅ Storing valid JWT Token:", res.jwtToken.accessToken);
//                     storeToken(res.jwtToken.accessToken);
//                     setToken(res.jwtToken.accessToken);
//                 } else {
//                     console.warn("⚠️ Received an invalid JWT Token:", res.jwtToken);
//                 }
//             }
//         } catch (error: any) {
//             setMessage(error.toString());
//         }
//     }

//     async function searchCard(e: React.FormEvent): Promise<void> {
//         e.preventDefault();
//         let obj = { userId: "1", search, jwtToken: retrieveToken() };
//         let js = JSON.stringify(obj);

//         try {
//             const response = await fetch(buildPath("api/searchcards"), {
//                 method: "POST",
//                 body: js,
//                 headers: { "Content-Type": "application/json" },
//             });

//             const res = await response.json();
//             console.log("🔄 API Response:", res);
            
//             const resultText = res.results?.join(", ") || "No cards found.";
//             setResults("Card(s) have been retrieved");
//             setCardList(resultText);

//             // ✅ 새로운 토큰이 객체인 경우, accessToken을 저장
//             if (res.jwtToken && typeof res.jwtToken === "object" && "accessToken" in res.jwtToken) {
//                 console.log("✅ Storing valid JWT Token:", res.jwtToken.accessToken);
//                 storeToken(res.jwtToken.accessToken);
//                 setToken(res.jwtToken.accessToken);
//             } else {
//                 console.warn("⚠️ Received an invalid JWT Token:", res.jwtToken);
//             }
//         } catch (error: any) {
//             setResults(error.toString());
//         }
//     }


//     return (
//         <div>
//             <h2>Card Management</h2>

//             <label htmlFor="searchText">Search: </label>
//             <input type="text" value={search} onChange={(e) => setSearchValue(e.target.value)} />
//             <button type="button" onClick={searchCard}>Search Card</button>
//             <br />
//             <span>{searchResults}</span>
//             <p>{cardList}</p>

//             <label htmlFor="cardText">Add: </label>
//             <input type="text" value={card} onChange={(e) => setCardValue(e.target.value)} />
//             <button type="button" onClick={addCard}>Add Card</button>
//             <br />
//             <span>{message}</span>
//         </div>
//     );
// };

// export default CardUI;

// import React, { useState, useEffect } from "react";
// import { useJwt } from "react-jwt";
// import { buildPath } from "./Path";
// import { storeToken, retrieveToken } from "../tokenStorage";
// import { useNavigate } from "react-router-dom";


// const CardUI: React.FC = () => {

//     const navigate = useNavigate(); 
//     const [message, setMessage] = useState("");
//     const [searchResults, setResults] = useState("");
//     const [cardList, setCardList] = useState("");
//     const [search, setSearchValue] = useState("");
//     const [card, setCardValue] = useState("");

//     const [token, setToken] = useState(retrieveToken());
//     const { isExpired } = useJwt(token);

//     useEffect(() => {
//         console.log("🔍 Retrieved Token:", token);
//         console.log("🔍 Token Expired?", isExpired);

//         // ✅ 토큰 만료 시 로그인 페이지로 이동
//         if (!token || isExpired) {
//             navigate("/login");
//         }
//     }, [token, isExpired, navigate]);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             const newToken = retrieveToken();
//             if (newToken !== token) {
//                 console.log("🔄 Updating Token:", newToken);
//                 setToken(newToken);
//             }
//         }, 5000); // 5초마다 실행

//         return () => clearInterval(interval);
//     }, [token]);

//     async function addCard(e: React.FormEvent): Promise<void> {
//         e.preventDefault();
//         let obj = { userId: "1", card, jwtToken: retrieveToken() };
//         let js = JSON.stringify(obj);

//         try {
//             const response = await fetch(buildPath("api/addcard"), {
//                 method: "POST",
//                 body: js,
//                 headers: { "Content-Type": "application/json" },
//             });

//             const res = await response.json();
//             if (res.error && res.error.length > 0) {
//                 setMessage("API Error: " + res.error);
//             } else {
//                 setMessage("Card has been added");
//                 if (res.jwtToken) {
//                     storeToken(res.jwtToken);
//                     setToken(res.jwtToken); // 상태 업데이트
//                 } else {
//                     console.warn("⚠️ Received an empty JWT Token!");
//                 }
//             }
//         } catch (error: any) {
//             setMessage(error.toString());
//         }
//     }

//     async function searchCard(e: React.FormEvent): Promise<void> {
//         e.preventDefault();
//         let obj = { userId: "1", search, jwtToken: retrieveToken() };
//         let js = JSON.stringify(obj);

//         try {
//             const response = await fetch(buildPath("api/searchcards"), {
//                 method: "POST",
//                 body: js,
//                 headers: { "Content-Type": "application/json" },
//             });

//             const res = await response.json();
//             const resultText = res.results?.join(", ") || "No cards found.";

//             setResults("Card(s) have been retrieved");
//             setCardList(resultText);
//             storeToken(res.jwtToken);
//         } catch (error: any) {
//             setResults(error.toString());
//         }
//     }

//     return (
//         <div>
//             <label htmlFor="searchText">Search: </label>
//             <input type="text" value={search} onChange={(e) => setSearchValue(e.target.value)} />
//             <button type="button" onClick={searchCard}>Search Card</button>
//             <br />
//             <span>{searchResults}</span>
//             <p>{cardList}</p>
//             <br />
//             <label htmlFor="cardText">Add: </label>
//             <input type="text" value={card} onChange={(e) => setCardValue(e.target.value)} />
//             <button type="button" onClick={addCard}>Add Card</button>
//             <br />
//             <span>{message}</span>
//         </div>
//     );
// };

// export default CardUI;


// import React, { useState, useEffect } from "react";
// import { useJwt } from "react-jwt";
// import { buildPath } from "./Path";
// import { storeToken, retrieveToken } from "../tokenStorage";

// const CardUI: React.FC = () => {
//     // ✅ JWT 검증
//     const token = retrieveToken() ?? "";
//     const { isExpired } = useJwt(token);
//     const [isTokenExpired, setIsTokenExpired] = useState(false);

//     useEffect(() => {
//         setIsTokenExpired(isExpired);
//     }, [isExpired]);

//     // ✅ 상태 관리
//     const [message, setMessage] = useState("");
//     const [searchResults, setResults] = useState("");
//     const [cardList, setCardList] = useState("");
//     const [search, setSearchValue] = useState("");
//     const [card, setCardValue] = useState("");

//     // ✅ 카드 추가
//     async function addCard(e: React.FormEvent): Promise<void> {
//         e.preventDefault();
//         if (isTokenExpired) {
//             setMessage("Session expired. Please log in again.");
//             return;
//         }

//         let obj = { userId: "1", card, jwtToken: token };
//         let js = JSON.stringify(obj);

//         try {
//             const response = await fetch(buildPath("api/addcard"), {
//                 method: "POST",
//                 body: js,
//                 headers: { "Content-Type": "application/json" },
//             });

//             const res = await response.json();
//             if (res.error && res.error.length > 0) {
//                 setMessage("API Error: " + res.error);
//             } else {
//                 setMessage("Card has been added");
//                 storeToken(res.jwtToken);
//                 console.log("Stored Token:", retrieveToken()); 
//             }
//         } catch (error: any) {
//             setMessage(error.toString());
//         }
//     }

//     // ✅ 카드 검색
//     async function searchCard(e: React.FormEvent): Promise<void> {
//         e.preventDefault();
//         if (isTokenExpired) {
//             setMessage("Session expired. Please log in again.");
//             return;
//         }

//         let obj = { userId: "1", search, jwtToken: token };
//         let js = JSON.stringify(obj);

//         try {
//             const response = await fetch(buildPath("api/searchcards"), {
//                 method: "POST",
//                 body: js,
//                 headers: { "Content-Type": "application/json" },
//             });

//             const res = await response.json();
//             const resultText = res.results?.join(", ") || "No cards found.";

//             setResults("Card(s) have been retrieved");
//             setCardList(resultText);
//             storeToken(res.jwtToken);
//         } catch (error: any) {
//             console.log(error.toString());
//             setResults(error.toString());
//         }
//     }

//     return (
//         <div>
//         {(!token || isTokenExpired) ? (
//             <p>Session expired. Please log in again.</p>
//         ) : (
//             <div>
//                 {/* ✅ 기존 UI 유지 */}
//                 <label htmlFor="searchText">Search: </label>
//                 <input type="text" value={search} onChange={(e) => setSearchValue(e.target.value)} />
//                 <button type="button" onClick={searchCard}>Search Card</button>
//                 <br />
//                 <span>{searchResults}</span>
//                 <p>{cardList}</p>
//                 <br />
//                 <label htmlFor="cardText">Add: </label>
//                 <input type="text" value={card} onChange={(e) => setCardValue(e.target.value)} />
//                 <button type="button" onClick={addCard}>Add Card</button>
//                 <br />
//                 <span>{message}</span>
//             </div>
//         )}
//     </div>
//     );
// };

// export default CardUI;




// import React, { useState, useEffect } from "react";
// import { useJwt } from "react-jwt";
// import { buildPath } from "./Path";
// import { storeToken, retrieveToken } from "../tokenStorage";

// function CardUI()
// {

//     var bp = require('./Path.js');

//     var card = '';
//     var search = '';

//     const [message,setMessage] = useState('');
//     const [searchResults,setResults] = useState('');
//     const [cardList,setCardList] = useState('');

//     var _ud = localStorage.getItem('user_data');
//     var ud = JSON.parse(_ud);
//     var userId = ud.id;
//     var firstName = ud.firstName;
//     var lastName = ud.lastName;
	
//     const addCard = async event => 
//     {
// 	    event.preventDefault();

//         var storage = require('../tokenStorage.js');            
//         var obj = {userId:userId,card:card.value,jwtToken:storage.retrieveToken()};
//         var js = JSON.stringify(obj);

//         try
//         {
//             const response = await fetch(bp.buildPath('api/addcard'),
//             {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

//             var txt = await response.text();
//             var res = JSON.parse(txt);

//             if( res.error && res.error.length > 0 )
//             {
//                 setMessage( "API Error:" + res.error );
//             }
//             else
//             {
//                 setMessage('Card has been added');
//                 storage.storeToken( res.jwtToken );
//             }
//         }
//         catch(e)
//         {
//             setMessage(e.toString());
//         }

// 	};

//     const searchCard = async event => 
//         {
//             event.preventDefault();
                    
//             var storage = require('../tokenStorage.js');            
//             var obj = {userId:userId,search:search.value,jwtToken:storage.retrieveToken()};
//             var js = JSON.stringify(obj);
    
//             try
//             {
//                 const response = await fetch(bp.buildPath('api/searchcards'),
//                 {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
    
//                 var txt = await response.text();
//                 var res = JSON.parse(txt);
//                 var _results = res.results;
//                 var resultText = '';
//                 for( var i=0; i<_results.length; i++ )
//                 {
//                     resultText += _results[i];
//                     if( i < _results.length - 1 )
//                     {
//                         resultText += ', ';
//                     }
//                 }
//                 setResults('Card(s) have been retrieved');
//                 setCardList(resultText);
//             }
//             catch(e)
//             {
//                 console.log(e.toString());
//                 setResults(e.toString());
//                 storage.storeToken( res.jwtToken );
//             }
//         };
    
//         return(
//     <div id="cardUIDiv">
//       <br />
//       <input type="text" id="searchText" placeholder="Card To Search For" 
//         ref={(c) => search = c} />
//       <button type="button" id="searchCardButton" class="buttons" 
//         onClick={searchCard}> Search Card</button><br />
//       <span id="cardSearchResult">{searchResults}</span>
//       <p id="cardList">{cardList}</p><br /><br />
//       <input type="text" id="cardText" placeholder="Card To Add" 
//     ref={(c) => card = c} />
//   <button type="button" id="addCardButton" class="buttons" 
//     onClick={addCard}> Add Card </button><br />
//   <span id="cardAddResult">{message}</span>
// </div>
//     );
// }

// export default CardUI;
    

// const CardUI: React.FC = () => {
//     // ✅ 사용자 정보 가져오기
//     const userData = localStorage.getItem("user_data");
//     const ud = userData ? JSON.parse(userData) : null;
//     const userId: string = ud?.id ?? "";
//     const firstName: string = ud?.firstName ?? "";
//     const lastName: string = ud?.lastName ?? "";

//     console.log(`User: ${firstName} ${lastName}`);

//     // ✅ 상태 관리
//     const [message, setMessage] = useState("");
//     const [searchResults, setResults] = useState("");
//     const [cardList, setCardList] = useState("");
//     const [search, setSearchValue] = useState("");
//     const [card, setCardNameValue] = useState("");
//     const [isTokenExpired, setIsTokenExpired] = useState(false);

//     // ✅ JWT 가져오기
//     const token = retrieveToken();

//     useEffect(() => {
//         if (token) {
//             const { isExpired } = useJwt(token);
//             setIsTokenExpired(isExpired);
//         }
//     }, [token]);

//     if (!token || isTokenExpired) {
//         return <p>Session expired. Please log in again.</p>;
//     }

//     // ✅ 검색 입력 핸들러
//     function handleSearchTextChange(e: React.ChangeEvent<HTMLInputElement>): void {
//         setSearchValue(e.target.value);
//     }

//     // ✅ 카드 입력 핸들러
//     function handleCardTextChange(e: React.ChangeEvent<HTMLInputElement>): void {
//         setCardNameValue(e.target.value);
//     }

//     // ✅ 카드 추가
//     async function addCard(e: React.FormEvent): Promise<void> {
//         e.preventDefault();
//         if (isTokenExpired) {
//             setMessage("Session expired. Please log in again.");
//             return;
//         }

//         let obj = { userId, card, jwtToken: token };
//         let js = JSON.stringify(obj);

//         try {
//             const response = await fetch(buildPath("api/addcard"), {
//                 method: "POST",
//                 body: js,
//                 headers: { "Content-Type": "application/json" },
//             });

//             const res = await response.json();
//             if (res.error && res.error.length > 0) {
//                 setMessage("API Error: " + res.error);
//             } else {
//                 setMessage("Card has been added");
//                 storeToken(res.jwtToken);
//             }
//         } catch (error: any) {
//             setMessage(error.toString());
//         }
//     }

//     // ✅ 카드 검색
//     async function searchCard(e: React.FormEvent): Promise<void> {
//         e.preventDefault();
//         if (isTokenExpired) {
//             setMessage("Session expired. Please log in again.");
//             return;
//         }

//         let obj = { userId, search, jwtToken: token };
//         let js = JSON.stringify(obj);

//         try {
//             const response = await fetch(buildPath("api/searchcards"), {
//                 method: "POST",
//                 body: js,
//                 headers: { "Content-Type": "application/json" },
//             });

//             const res = await response.json();
//             const resultText = res.results?.join(", ") || "No cards found.";

//             setResults("Card(s) have been retrieved");
//             setCardList(resultText);
//             storeToken(res.jwtToken);
//         } catch (error: any) {
//             console.log(error.toString());
//             setResults(error.toString());
//         }
//     }

//     return (
//         <div id="cardUIDiv">
//             <br />
//             <label htmlFor="searchText">Search: </label>
//             <input
//                 type="text"
//                 id="searchText"
//                 placeholder="Card To Search For"
//                 value={search}
//                 onChange={handleSearchTextChange}
//             />
//             <button type="button" id="searchCardButton" className="buttons" onClick={searchCard}>
//                 Search Card
//             </button>
//             <br />
//             <span id="cardSearchResult">{searchResults}</span>
//             <p id="cardList">{cardList}</p>
//             <br />
//             <br />
//             <label htmlFor="cardText">Add: </label>
//             <input
//                 type="text"
//                 id="cardText"
//                 placeholder="Card To Add"
//                 value={card}
//                 onChange={handleCardTextChange}
//             />
//             <button type="button" id="addCardButton" className="buttons" onClick={addCard}>
//                 Add Card
//             </button>
//             <br />
//             <span id="cardAddResult">{message}</span>
//         </div>
//     );
// };

// export default CardUI;


// import React, { useState } from 'react';
// import { buildPath } from './Path';  

// function CardUI() {
//     let _ud : any = localStorage.getItem('user_data');
//     let ud = JSON.parse( _ud );
//     let userId : string = ud.id;
//     let firstName : string = ud.firstName;
//     let lastName : string = ud.lastName;

//     console.log(`User: ${firstName} ${lastName}`);
    
//     const [message, setMessage] = useState('');
//     const [searchResults, setResults] = useState('');
//     const [cardList, setCardList] = useState('');
//     const [search, setSearchValue] = useState('');
//     const [card, setCardNameValue] = useState('');

//     // Function to handle search text change
//     function handleSearchTextChange(e: React.ChangeEvent<HTMLInputElement>): void {
//         setSearchValue(e.target.value);
//     }

//     // Function to handle card text change
//     function handleCardTextChange(e: React.ChangeEvent<HTMLInputElement>): void {
//         setCardNameValue(e.target.value);
//     }

//     // Function to add card
//     async function addCard(e: any): Promise<void> {
//         e.preventDefault();

//         let obj = { userId: userId, card: card };
//         let js = JSON.stringify(obj);

//         try {
//             const response = await fetch(buildPath('api/addcard'), {  // ✅ buildPath 사용
//                 method: 'POST',
//                 body: js,
//                 headers: { 'Content-Type': 'application/json' }
//             });

//             let txt = await response.text();
//             let res = JSON.parse(txt);

//             if (res.error.length > 0) {
//                 setMessage("API Error: " + res.error);
//             } else {
//                 setMessage('Card has been added');
//             }
//         } catch (error: any) {
//             setMessage(error.toString());
//         }
//     };

//     // Function to search card
//     async function searchCard(e: any): Promise<void> {
//         e.preventDefault();

//         let obj = { userId: userId, search: search };
//         let js = JSON.stringify(obj);

//         try {
//             const response = await fetch(buildPath('api/searchcards'), {  // ✅ buildPath 사용
//                 method: 'POST',
//                 body: js,
//                 headers: { 'Content-Type': 'application/json' }
//             });

//             let txt = await response.text();
//             let res = JSON.parse(txt);
//             let _results = res.results;
//             let resultText = _results.join(', ');

//             setResults('Card(s) have been retrieved');
//             setCardList(resultText);
//         } catch (error: any) {
//             alert(error.toString());
//             setResults(error.toString());
//         }
//     };

//     return (
//         <div id="cardUIDiv">
//             <br />
//             Search:{' '}
//             <input
//                 type="text"
//                 id="searchText"
//                 placeholder="Card To Search For"
//                 value={search}
//                 onChange={handleSearchTextChange}
//             />
//             <button
//                 type="button"
//                 id="searchCardButton"
//                 className="buttons"
//                 onClick={searchCard}
//             >
//                 Search Card
//             </button>
//             <br />
//             <span id="cardSearchResult">{searchResults}</span>
//             <p id="cardList">{cardList}</p>
//             <br /><br />
//             Add:{' '}
//             <input
//                 type="text"
//                 id="cardText"
//                 placeholder="Card To Add"
//                 value={card}
//                 onChange={handleCardTextChange}
//             />
//             <button
//                 type="button"
//                 id="addCardButton"
//                 className="buttons"
//                 onClick={addCard}
//             >
//                 Add Card
//             </button>
//             <br />
//             <span id="cardAddResult">{message}</span>
//         </div>
//     );
// }

// export default CardUI;



// import React, { useState } from 'react';

// function CardUI() {
//     let _ud : any = localStorage.getItem('user_data');
//     let ud = JSON.parse( _ud );
//     let userId : string = ud.id;
//     let firstName : string = ud.firstName;
//     let lastName : string = ud.lastName;

//     console.log(`User: ${firstName} ${lastName}`);
    
//   const [message, setMessage] = useState('');
//   const [searchResults, setResults] = useState('');
//   const [cardList, setCardList] = useState('');
//   const [search, setSearchValue] = useState('');
//   const [card, setCardNameValue] = useState('');

//   const app_name = 'yoniworks.net';
//   function buildPath(route: string): string {
//     if (process.env.NODE_ENV !== 'development') {
//         return 'http://' + app_name + ':5000/' + route;
//     } else {
//         return 'http://localhost:5000/' + route;
//     }
// }

//   // Function to handle search text change
//   function handleSearchTextChange(e: React.ChangeEvent<HTMLInputElement>): void {
//     setSearchValue(e.target.value);
//   }

//   // Function to handle card text change
//   function handleCardTextChange(e: React.ChangeEvent<HTMLInputElement>): void {
//     setCardNameValue(e.target.value);
//   }

//   // Function to add card (for now, just an alert)
//   async function addCard(e:any) : Promise<void>
//   {
//       e.preventDefault();

//       let obj = {userId:userId,card:card};
//       let js = JSON.stringify(obj);

//       try
//       {
//         const response = await fetch(buildPath('api/addCard'),
//         {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
        

//           let txt = await response.text();
//           let res = JSON.parse(txt);

//           if( res.error.length > 0 )
//           {
//               setMessage( "API Error:" + res.error );
//           }
//           else
//           {
//               setMessage('Card has been added');
//           }
//       }
//       catch(error:any)
//       {
//         setMessage(error.toString());
//     }
// };


//   // Function to search card (for now, just an alert)
//   async function searchCard(e:any) : Promise<void>
//   {
//       e.preventDefault();
      
//       let obj = {userId:userId,search:search};
//       let js = JSON.stringify(obj);

//       try
//       {
//         const response = await fetch(buildPath('api/searchCards'),
//         {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
        

//           let txt = await response.text();
//           let res = JSON.parse(txt);
//           let _results = res.results;
//           let resultText = '';
//           for( let i=0; i<_results.length; i++ )
//           {
//               resultText += _results[i];
//               if( i < _results.length - 1 )
//               {
//                   resultText += ', ';
//               }
//           }
//           setResults('Card(s) have been retrieved');
//           setCardList(resultText);
//       }
//       catch(error:any)
//       {
//           alert(error.toString());
//           setResults(error.toString());
//       }
//   };

//   return (
//     <div id="cardUIDiv">
//       <br />
//       Search:{' '}
//       <input
//         type="text"
//         id="searchText"
//         placeholder="Card To Search For"
//         value={search} // bind the input to search state
//         onChange={handleSearchTextChange}
//       />
//       <button
//         type="button"
//         id="searchCardButton"
//         className="buttons"
//         onClick={searchCard}
//       >
//         Search Card
//       </button>
//       <br />
//       <span id="cardSearchResult">{searchResults}</span>
//       <p id="cardList">{cardList}</p>
//       <br />
//       <br />
//       Add:{' '}
//       <input
//         type="text"
//         id="cardText"
//         placeholder="Card To Add"
//         value={card} // bind the input to card state
//         onChange={handleCardTextChange}
//       />
//       <button
//         type="button"
//         id="addCardButton"
//         className="buttons"
//         onClick={addCard}
//       >
//         Add Card
//       </button>
//       <br />
//       <span id="cardAddResult">{message}</span>
//     </div>
//   );
// }

// export default CardUI;
