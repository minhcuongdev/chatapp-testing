import { jwtDecode } from 'jwt-decode';

export const Cookies = {
  getCookie(name: string): string | null {
    const cookies = `; ${document.cookie}`;
    const parts = cookies.split(`; ${name}=`);
    console.log(cookies);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  },
  parseJwtFromCookie(cookieName: string) {
    // Get the JWT from the cookie
    const token = Cookies.getCookie(cookieName);

    if (!token) {
      console.error('JWT not found in cookies');
      return null;
    }

    try {
      // Decode the token
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error('Failed to decode JWT:', error);
      return null;
    }
  },
};
