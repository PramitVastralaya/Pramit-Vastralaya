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

/**
 * Validates login attempt against the designated admin account
 */
export function validateAdminLogin(
  inputEmail: string,
  inputPass: string,
  adminAccount: AdminAccount
): { success: boolean; error?: string } {
  const cleanEmail = (inputEmail || '').trim().toLowerCase();
  const targetEmail = (adminAccount.email || '').trim().toLowerCase();

  if (!cleanEmail) {
    return { success: false, error: 'Please enter your Gmail address.' };
  }

  if (!inputPass) {
    return { success: false, error: 'Please enter your admin password.' };
  }

  // Strictly check that the email matches the authorized admin Gmail
  if (cleanEmail !== targetEmail) {
    return {
      success: false,
      error: 'Access Denied: This Gmail address is not an authorized administrator. Public users cannot access the store management portal.',
    };
  }

  // Check password
  if (inputPass !== adminAccount.password) {
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
