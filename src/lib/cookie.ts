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
  