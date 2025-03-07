const appName = 'yoniworks.net';

export function buildPath(route: string): string {
    if (process.env.NODE_ENV === 'production') {
        return `https://${appName}/${route}`;  // 프로덕션에서는 HTTPS 사용
    } else {        
        return `http://localhost:5000/${route}`;  // 개발 환경에서는 localhost 사용
    }
}
