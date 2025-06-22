import { ADMIN_CONFIG } from "@/config/app";

// Types for JWT payload
export interface JWTPayload {
  userId: string;
  role: string;
  iat: number;
  exp: number;
  iss: string;
  aud: string;
}

// Simple JWT implementation for demo/development
// In production, this will be handled by the backend
export class JWTManager {
  private secret: string;

  constructor(secret?: string) {
    this.secret = secret || ADMIN_CONFIG.jwt.secret;
  }

  // Generate a mock JWT for development
  // In production, this comes from the backend
  generateToken(userId: string, role: string = "admin"): string {
    const header = {
      alg: "HS256",
      typ: "JWT",
    };

    const now = Math.floor(Date.now() / 1000);
    const payload: JWTPayload = {
      userId,
      role,
      iat: now,
      exp: now + 24 * 60 * 60, // 24 hours
      iss: ADMIN_CONFIG.jwt.issuer,
      aud: ADMIN_CONFIG.jwt.audience,
    };

    // Simple base64 encoding for demo
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));

    // In a real implementation, this would use proper HMAC signing
    const signature = btoa(`${this.secret}.${encodedHeader}.${encodedPayload}`);

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  // Validate and decode JWT
  validateToken(token: string): JWTPayload | null {
    try {
      const [header, payload, signature] = token.split(".");

      if (!header || !payload || !signature) {
        console.error("Invalid token format");
        return null;
      }

      // Verify signature (simplified for demo)
      const expectedSignature = btoa(`${this.secret}.${header}.${payload}`);
      if (signature !== expectedSignature) {
        console.error("Invalid token signature");
        return null;
      }

      // Decode payload
      const decodedPayload: JWTPayload = JSON.parse(atob(payload));

      // Check expiration
      const now = Math.floor(Date.now() / 1000);
      if (decodedPayload.exp < now) {
        console.error("Token expired");
        return null;
      }

      // Check issuer and audience
      if (
        decodedPayload.iss !== ADMIN_CONFIG.jwt.issuer ||
        decodedPayload.aud !== ADMIN_CONFIG.jwt.audience
      ) {
        console.error("Invalid token issuer or audience");
        return null;
      }

      return decodedPayload;
    } catch (error) {
      console.error("Token validation failed:", error);
      return null;
    }
  }

  // Check if token is expired
  isTokenExpired(token: string): boolean {
    try {
      const [, payload] = token.split(".");
      const decodedPayload: JWTPayload = JSON.parse(atob(payload));
      const now = Math.floor(Date.now() / 1000);
      return decodedPayload.exp < now;
    } catch {
      return true;
    }
  }

  // Get token expiration date
  getTokenExpiration(token: string): Date | null {
    try {
      const [, payload] = token.split(".");
      const decodedPayload: JWTPayload = JSON.parse(atob(payload));
      return new Date(decodedPayload.exp * 1000);
    } catch {
      return null;
    }
  }

  // Refresh token (generate new one with extended expiration)
  refreshToken(oldToken: string): string | null {
    const payload = this.validateToken(oldToken);
    if (!payload) {
      return null;
    }

    return this.generateToken(payload.userId, payload.role);
  }
}

// Export singleton instance
export const jwtManager = new JWTManager();

// Utility functions
export const isValidToken = (token: string): boolean => {
  return jwtManager.validateToken(token) !== null;
};

export const getTokenPayload = (token: string): JWTPayload | null => {
  return jwtManager.validateToken(token);
};

export const isTokenExpired = (token: string): boolean => {
  return jwtManager.isTokenExpired(token);
};
