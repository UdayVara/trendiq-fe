export function getCookie(name: string): string | null {
  if(typeof(window) !== 'undefined' && document && document.cookie){
    
    const cookies = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1];
    
    return cookies ? decodeURIComponent(cookies) : null;
  }else{
    return "male"
  }
}


export function setCookie(name: string, value: string, days = 7): void {
  if (typeof window !== 'undefined' && document) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
  }
}
