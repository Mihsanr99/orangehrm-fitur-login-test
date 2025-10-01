# OrangeHRM Login Test Automation

This repository contains Cypress automation tests for the **OrangeHRM login feature**.  
The tests are designed to ensure the login page functions correctly and all related features work as expected.

## Test Cases

1. **Func-001** -> Memastikan halaman login pada OrangeHRM
2. **Func-002** -> User dapat login ke web OrangeHRM dengan akun yang valid
3. **Func-003** -> Login dengan Username case-insensitive (admin)
4. **Func-004** -> Klik "Forgot your password?
5. **Func-005** -> Klik sosial media Linkedin pada halaman login OrangeHRM


---

### Cara Upload ke GitHub

```bash
git init
git add .
git commit -m "Add OrangeHRM login test automation"
git branch -M main
git remote add origin https://github.com/<username>/orangehrm-login-test.git
git push -u origin main

