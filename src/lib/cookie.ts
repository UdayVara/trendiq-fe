export function getCookie(name: string): string | null {
    const cookies = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${name}=`))
      ?.split('=')[1];
  
    return cookies ? decodeURIComponent(cookies) : null;
  }
  