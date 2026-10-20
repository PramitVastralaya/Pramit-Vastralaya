import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_ADMIN_EMAIL,
  DEFAULT_ADMIN_PASSWORD,
  INITIAL_ADMIN_ACCOUNT,
  validateAdminLogin,
  validateNewPassword,
  createAdminSession,
} from './authLogic.ts';

test('admin authentication: grants access to authorized admin credentials', () => {
  const result = validateAdminLogin(
    DEFAULT_ADMIN_EMAIL,
    DEFAULT_ADMIN_PASSWORD,
    INITIAL_ADMIN_ACCOUNT
  );
  assert.equal(result.success, true);
  assert.equal(result.error, undefined);
});

test('admin authentication: blocks public user with different email', () => {
  const result = validateAdminLogin(
    'public_customer@gmail.com',
    DEFAULT_ADMIN_PASSWORD,
    INITIAL_ADMIN_ACCOUNT
  );
  assert.equal(result.success, false);
  assert.ok(result.error?.includes('Access Denied'));
  assert.ok(result.error?.includes('not an authorized administrator'));
});

test('admin authentication: rejects incorrect password for admin account', () => {
  const result = validateAdminLogin(
    DEFAULT_ADMIN_EMAIL,
    'WrongPassword123',
    INITIAL_ADMIN_ACCOUNT
  );
  assert.equal(result.success, false);
  assert.ok(result.error?.includes('Incorrect admin password'));
});

test('admin authentication: rejects empty email or password', () => {
  const emptyEmail = validateAdminLogin('', DEFAULT_ADMIN_PASSWORD, INITIAL_ADMIN_ACCOUNT);
  assert.equal(emptyEmail.success, false);

  const emptyPass = validateAdminLogin(DEFAULT_ADMIN_EMAIL, '', INITIAL_ADMIN_ACCOUNT);
  assert.equal(emptyPass.success, false);
});

test('admin password change: enforces minimum password length', () => {
  const tooShort = validateNewPassword('123');
  assert.equal(tooShort.valid, false);
  assert.ok(tooShort.error?.includes('at least 6 characters'));

  const validPass = validateNewPassword('StrongPramit@99');
  assert.equal(validPass.valid, true);
  assert.equal(validPass.error, undefined);
});

test('admin session: creates secure session token for authenticated owner', () => {
  const session = createAdminSession(INITIAL_ADMIN_ACCOUNT);
  assert.equal(session.email, DEFAULT_ADMIN_EMAIL);
  assert.ok(session.token.startsWith('pv_adm_'));
  assert.ok(session.loginTime);
});
