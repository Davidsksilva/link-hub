import cookie from 'cookie';
import { IncomingMessage } from 'http';

interface ParsedCookie {
   [key: string]: string;
}
export default function parseCookies(req : IncomingMessage) : ParsedCookie {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie);
}
