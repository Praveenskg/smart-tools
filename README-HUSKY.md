# 🔧 Husky & Pre-commit Setup

This document explains the enhanced Husky and pre-commit setup for the Smart Tools project.

## 📋 What's Included

### 1. **Enhanced Pre-commit Hook** (`.husky/pre-commit`)

- ✅ **Code Formatting**: Prettier auto-formatting
- ✅ **Linting**: ESLint with auto-fix
- ✅ **Type Checking**: TypeScript validation
- ✅ **Security Audit**: npm audit for vulnerabilities
- ✅ **Build Validation**: Ensures build works
- ✅ **Smart Error Messages**: Clear, actionable feedback

### 2. **Commit Message Validation** (`.husky/commit-msg`)

- ✅ **Conventional Commits**: Enforces standard commit format
- ✅ **Auto-installation**: Installs commitlint if missing
- ✅ **Clear Examples**: Shows proper commit message format

### 3. **Pre-push Hook** (`.husky/pre-push`)

- ✅ **Build Validation**: Ensures build works
- ✅ **Type Checking**: TypeScript validation
- ✅ **Linting**: Code quality checks
- ✅ **Security Audit**: Vulnerability scanning

### 4. **Lint-staged Configuration**

- ✅ **Performance**: Only processes staged files
- ✅ **File Type Support**: JS, TS, JSON, MD, CSS, HTML
- ✅ **Auto-fix**: Automatically fixes issues when possible

## 🚀 Available Commands

### Security

```bash
npm run audit             # Run security audit
npm run audit:fix         # Auto-fix security issues
npm run security          # Run security check
```

### Quality Assurance

```bash
npm run validate          # Run all quality checks
npm run pre-commit        # Run lint-staged
```

## 📝 Commit Message Format

Use conventional commits format:

```
type(scope): description

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes
- `build`: Build system changes
- `revert`: Reverting changes

### Examples

```bash
feat: add new calculator tool
fix: resolve currency conversion bug
docs: update README with new features
style: format code with prettier
test: add unit tests for utility functions
chore: update dependencies
```

## 🔧 Configuration Files

### `.husky/pre-commit`

Enhanced pre-commit hook with comprehensive checks.

### `.husky/commit-msg`

Validates commit messages using conventional commits.

### `.husky/pre-push`

Runs full validation before pushing to remote.

### `package.json`

- Added test scripts
- Added lint-staged configuration
- Added commitlint configuration

### `.commitlintrc.js`

Commitlint configuration for conventional commits.

## 🎯 Quality Gates

### Pre-commit Checks

1. **Code Formatting** (Prettier)
2. **Linting** (ESLint)
3. **Type Checking** (TypeScript)
4. **Security Audit** (npm audit)
5. **Build Validation**

### Pre-push Checks

2. **Build Validation**
3. **Type Checking**
4. **Linting**
5. **Security Audit**

## 🚨 Error Handling

The hooks provide clear, actionable error messages:

```bash
❌ ESLint errors found. Please fix them before committing.
💡 Run 'npm run lint:fix' to auto-fix issues

❌ TypeScript errors found. Please fix them before committing.
💡 Run 'npm run type-check' to see detailed errors

❌ Security vulnerabilities found. Please fix them before committing.
💡 Run 'npm audit fix' to auto-fix issues
```

## 🔄 Workflow

1. **Make Changes**: Edit your code
2. **Stage Files**: `git add .`
3. **Commit**: `git commit -m "feat: add new feature"`
   - Pre-commit hook runs automatically
   - Code is formatted and linted
   - Tests run (if available)
   - Build is validated
4. **Push**: `git push`
   - Pre-push hook runs automatically
   - Full validation suite runs

## 🛠️ Setup Testing

To set up testing in your project:

```bash
npm run test:setup
```

This will install:

- Jest
- React Testing Library
- Jest DOM matchers
- Jest environment for jsdom

## 📊 Benefits

- **Code Quality**: Consistent formatting and linting
- **Type Safety**: TypeScript validation
- **Security**: Vulnerability scanning
- **Build Safety**: Ensures builds work
- **Commit History**: Clean, conventional commits
- **Developer Experience**: Clear error messages and auto-fixes

## 🔧 Customization

You can customize the hooks by editing the files in `.husky/` directory:

- Modify `.husky/pre-commit` to add/remove checks
- Update `.husky/commit-msg` to change commit message rules
- Edit `.husky/pre-push` to modify push validation
- Adjust `package.json` scripts for different behaviors

## 🚀 Next Steps

1. **Customize rules**: Adjust linting and commit rules as needed
2. **Customize rules**: Adjust linting and commit rules as needed
3. **Add more hooks**: Consider adding `pre-rebase` or `post-commit` hooks

---

**Note**: The hooks are designed to be helpful but not overly restrictive. They can be bypassed with `--no-verify` flag if absolutely necessary, but this should be used sparingly.
