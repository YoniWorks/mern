// export const storeToken = (token: string): void => {
//     try {
//         localStorage.setItem("token_data", token);
//     } catch (e) {
//         console.error("Error storing token:", (e as Error).message);
//     }
// };

// // export const retrieveToken = (): string | null => {
// //     try {
// //         return localStorage.getItem("token_data");
// //     } catch (e) {
// //         console.error("Error retrieving token:", (e as Error).message);
// //         return null;
// //     }
// // };

// export const retrieveToken = (): string => {
//     try {
//         return localStorage.getItem("token_data") ?? "";
//     } catch (e) {
//         console.error("Error retrieving token:", (e as Error).message);
//         return "";
//     }
// };


// export const storeToken = (token: string): void => {
//     try {
//         localStorage.setItem("token_data", token);
//         sessionStorage.setItem("token_data", token); // ✅ 세션 스토리지에도 저장
//     } catch (e) {
//         console.error("Error storing token:", (e as Error).message);
//     }
// };

// export const retrieveToken = (): string => {
//     try {
//         return sessionStorage.getItem("token_data") ?? localStorage.getItem("token_data") ?? "";
//     } catch (e) {
//         console.error("Error retrieving token:", (e as Error).message);
//         return "";
//     }
// };

export const storeToken = (token: string): void => {
    try {
        if (typeof token === "string") {
            console.log("✅ Storing Token:", token);
            localStorage.setItem("token_data", token);
            sessionStorage.setItem("token_data", token);
        } else {
            console.error("❌ Invalid Token Type! Expected a string but got:", token);
        }
    } catch (e) {
        console.error("Error storing token:", (e as Error).message);
    }
};

export const retrieveToken = (): string => {
    try {
        let token = sessionStorage.getItem("token_data") ?? localStorage.getItem("token_data");
        if (token) {
            return token;
        } else {
            return "";
        }
    } catch (e) {
        console.error("Error retrieving token:", (e as Error).message);
        return "";
    }
};

