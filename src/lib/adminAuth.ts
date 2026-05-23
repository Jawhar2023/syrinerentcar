const SESSION_KEY = "drivex-admin-auth";

/** Demo credentials — replace with a backend in production. */
export const ADMIN_LOGIN_EMAIL = "Dhokkar@admin.com";
export const ADMIN_LOGIN_PASSWORD = "admin";

export function isAdminAuthenticated(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function tryAdminLogin(email: string, password: string): boolean {
  const ok =
    email.trim().toLowerCase() === ADMIN_LOGIN_EMAIL.toLowerCase() && password === ADMIN_LOGIN_PASSWORD;
  if (ok) {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      return false;
    }
  }
  return ok;
}

export function logoutAdmin(): void {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}
