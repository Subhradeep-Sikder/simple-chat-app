# Contributing Guide

Welcome! Thank you for considering contributing to the Simple Chat App. This guide will help you get started.

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or 20.x
- npm or yarn
- Git

### Setup Development Environment

1. **Clone the repository**
   ```bash
   git clone https://github.com/Subhradeep-Sikder/simple-chat-app.git
   cd simple-chat-app
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

4. **Run in development mode**
   ```bash
   # Terminal 1: Backend
   cd backend
   npm run dev

   # Terminal 2: Frontend
   cd frontend
   npm run dev
   ```

## 🔄 Development Workflow

### Branches
- `main` - Production-ready code
- `develop` - Development branch for features
- `feature/feature-name` - Feature branches
- `bugfix/bug-name` - Bug fix branches

### Creating a Branch
```bash
git checkout develop
git pull origin develop
git checkout -b feature/my-feature
```

### Commit Guidelines
- Use clear, descriptive commit messages
- Reference issues when relevant: `Fix issue #123`
- Use conventional commits:
  - `feat:` - New feature
  - `fix:` - Bug fix
  - `docs:` - Documentation
  - `style:` - Formatting changes
  - `refactor:` - Code refactoring
  - `test:` - Test changes
  - `chore:` - Maintenance

**Example:**
```bash
git commit -m "feat: add user typing indicator"
git commit -m "fix: prevent message echo in rooms"
```

## 📝 Code Standards

### TypeScript
- Enable strict mode
- Use proper type annotations
- Avoid `any` types
- Use interfaces for object shapes

### Frontend (React)
- Use functional components with hooks
- Keep components small and focused
- Use TypeScript for all components
- Follow ESLint rules: `npm run lint`

### Backend (Node.js)
- Use async/await for asynchronous code
- Handle errors properly
- Log important events
- Use TypeScript strict mode

### Naming Conventions
- **Components:** PascalCase (`ChatRoom.tsx`)
- **Files:** kebab-case (`chat-room.tsx`)
- **Variables:** camelCase (`userId`)
- **Constants:** UPPER_SNAKE_CASE (`MAX_CONNECTIONS`)

## ✅ Pre-Commit Checklist

Before committing, ensure:

```bash
# Backend
cd backend
npx tsc --noEmit  # TypeScript check

# Frontend
cd frontend
npm run lint       # ESLint check
npm run build      # Build check
npx tsc -b         # TypeScript compilation
```

## 🧪 Testing

### Running Tests
```bash
# Frontend
cd frontend
npm test

# Backend
cd backend
npm test
```

### Writing Tests
- Write tests for new features
- Maintain or improve code coverage
- Use clear test descriptions

**Example (Frontend):**
```typescript
describe('ChatRoom', () => {
  it('should display messages', () => {
    // Test implementation
  });
});
```

## 🔄 Pull Request Process

1. **Update your branch**
   ```bash
   git pull origin develop
   git rebase develop
   ```

2. **Push to your fork**
   ```bash
   git push origin feature/my-feature
   ```

3. **Create a Pull Request**
   - Fill out the PR template completely
   - Link related issues
   - Provide screenshots for UI changes
   - Explain your changes clearly

4. **Address Review Comments**
   - Make requested changes
   - Push updates (they'll automatically update the PR)
   - Resolve conversations after changes

5. **Merge**
   - Once approved, maintainer will merge
   - Delete your branch after merge

## 🐛 Reporting Bugs

When reporting bugs, include:
- Description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment (OS, Node version, browser)

**Example:**
```markdown
## Bug: Messages not sending

### Steps to Reproduce
1. Open app in two browser tabs
2. Type message in first tab
3. Click send

### Expected
Message appears in both tabs

### Actual
Message doesn't appear

### Environment
- OS: macOS
- Node: 20.x
- Browser: Chrome 125
```

## 💡 Suggesting Features

When suggesting features:
- Describe the feature clearly
- Explain why it would be useful
- Provide examples or mockups
- Discuss implementation approach if you have ideas

**Example:**
```markdown
## Feature: User Typing Indicator

Show "User is typing..." when someone types in the room
- Uses WebSocket to broadcast typing state
- Disappears after 3 seconds of inactivity
```

## 📚 Documentation

- Update README.md if adding user-facing features
- Add comments for complex logic
- Keep CI/CD docs updated
- Document breaking changes

## 🔒 Security

- Don't commit secrets or API keys
- Report security issues privately
- Follow secure coding practices
- Validate all user input

## 📦 Dependencies

Before adding dependencies:
1. Check if it's really needed
2. Verify package is maintained
3. Check for vulnerabilities: `npm audit`
4. Update package-lock.json: `npm install`

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [GitHub Actions Guide](https://docs.github.com/en/actions)

## 💬 Questions?

- Open an issue on GitHub
- Check existing issues for answers
- Reach out to maintainers

## ⚖️ License

By contributing, you agree that your contributions will be licensed under the project's license.

---

**Thank you for contributing!** 🎉
