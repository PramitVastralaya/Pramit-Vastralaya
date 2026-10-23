import type { AdminAccount, AdminSession } from '../types/store.ts';

export const DEFAULT_ADMIN_EMAIL = 'pramitvastralaya@gmail.com';
export const DEFAULT_ADMIN_PASSWORD = 'Pramit@2026';

export const INITIAL_ADMIN_ACCOUNT: AdminAccount = {
  email: DEFAULT_ADMIN_EMAIL,
  password: DEFAULT_ADMIN_PASSWORD,
  role: 'admin',
  name: 'Pramit Vastralay Owner',
  updatedAt: new Date().toISOString(),
};

export const AUTHORIZED_ADMIN_EMAILS = [
  'pramitvastralaya@gmail.com',
  'pramitvastralay@gmail.com',
];

export function normalizeAdminEmail(email: string): string {
  if (!email) return '';
  const trimmed = email.trim().toLowerCase();
  if (trimmed.endsWith('@gmail.com')) {
    const [user] = trimmed.split('@');
    const cleanUser = user.replace(/\./g, '');
    return `${cleanUser}@gmail.com`;
  }
  return trimmed;
}

export function isAuthorizedAdminEmail(
  inputEmail: string,
  configuredEmail?: string
): boolean {
  const normInput = normalizeAdminEmail(inputEmail);
  if (!normInput) return false;

  if (configuredEmail && normalizeAdminEmail(configuredEmail) === normInput) {
    return true;
  }

  return AUTHORIZED_ADMIN_EMAILS.some(
    (authorized) => normalizeAdminEmail(authorized) === normInput
  );
}

/**
 * Validates login attempt against the designated admin account
 */
export function validateAdminLogin(
  inputEmail: string,
  inputPass: string,
  adminAccount: AdminAccount
): { success: boolean; error?: string } {
  const cleanEmail = (inputEmail || '').trim();

  if (!cleanEmail) {
    return { success: false, error: 'Please enter your Gmail address.' };
  }

  if (!inputPass) {
    return { success: false, error: 'Please enter your admin password.' };
  }

  // Check that the email matches the authorized admin Gmail or alias
  if (!isAuthorizedAdminEmail(cleanEmail, adminAccount.email)) {
    return {
      success: false,
      error: 'Access Denied: This Gmail address is not an authorized administrator. Public users cannot access the store management portal.',
    };
  }

  // Check password (matches current account password or default factory password)
  const isCorrectPassword =
    inputPass === adminAccount.password || inputPass === DEFAULT_ADMIN_PASSWORD;

  if (!isCorrectPassword) {
    return {
      success: false,
      error: 'Incorrect admin password. Please verify and try again.',
    };
  }

  return { success: true };
}

/**
 * Validates requirements for new password
 */
export function validateNewPassword(newPassword: string): {
  valid: boolean;
  error?: string;
} {
  if (!newPassword || newPassword.trim().length < 6) {
    return {
      valid: false,
      error: 'New password must be at least 6 characters long.',
    };
  }
  return { valid: true };
}

/**
 * Generates an authenticated admin session object
 */
export function createAdminSession(adminAccount: AdminAccount): AdminSession {
  const randomSuffix = Math.random().toString(36).substring(2, 10);
  return {
    email: adminAccount.email,
    name: adminAccount.name,
    token: `pv_adm_${Date.now()}_${randomSuffix}`,
    loginTime: new Date().toISOString(),
  };
}
