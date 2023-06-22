import jwt_decode from "jwt-decode";

export const JWTdecoder = (token) => {
   if (token) {
      return jwt_decode(token);
   }
   return {};
}

