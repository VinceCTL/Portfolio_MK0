---
title: 'TypeScript Best Practices for Full Stack Development'
description: 'Discover essential TypeScript patterns and best practices that will help you write more maintainable, type-safe, and robust full stack applications.'
date: '2024-02-10'
banner:
    src: '../../images/kelly-sikkema-Hl3LUdyKRic-unsplash.jpg'
    alt: 'TypeScript Development'
    caption: 'Photo by <u><a href="https://unsplash.com/@kellysikkema">Kelly Sikkema</a></u> on Unsplash'
categories:
    - 'TypeScript'
    - 'Best Practices'
    - 'Full Stack'
keywords:
    - 'TypeScript'
    - 'JavaScript'
    - 'Type Safety'
    - 'Best Practices'
    - 'Full Stack'
---

TypeScript has become the de facto standard for building modern web applications. As a full stack developer, leveraging TypeScript effectively across both frontend and backend can significantly improve code quality and developer experience.

## Why TypeScript Matters

TypeScript provides:

-   **Type safety**: Catch errors at compile time
-   **Better IDE support**: Autocomplete, refactoring, and navigation
-   **Self-documenting code**: Types serve as inline documentation
-   **Improved maintainability**: Easier to understand and modify code

## Essential TypeScript Patterns

### Strict Mode Configuration

Always enable strict mode in your `tsconfig.json`:

```json
{
    "compilerOptions": {
        "strict": true,
        "noImplicitAny": true,
        "strictNullChecks": true,
        "strictFunctionTypes": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true
    }
}
```

### Type Definitions Over Interfaces (When Appropriate)

Use `type` for unions, intersections, and computed types:

```typescript
// Union types
type Status = 'pending' | 'approved' | 'rejected';

// Intersection types
type UserWithPermissions = User & Permissions;

// Mapped types
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```

Use `interface` for object shapes that might be extended:

```typescript
interface User {
    id: number;
    name: string;
    email: string;
}

interface AdminUser extends User {
    permissions: string[];
}
```

### Utility Types

Leverage TypeScript's built-in utility types:

```typescript
// Partial - makes all properties optional
type PartialUser = Partial<User>;

// Pick - select specific properties
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit - exclude specific properties
type UserWithoutId = Omit<User, 'id'>;

// Record - create object type with specific keys
type UserRoles = Record<string, boolean>;
```

### Generic Functions

Write reusable, type-safe functions:

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const user: User = { id: 1, name: 'John', email: 'john@example.com' };
const name = getProperty(user, 'name'); // Type: string
```

## Full Stack TypeScript

### Shared Types

Create a shared types package for frontend and backend:

```typescript
// shared/types/user.ts
export interface User {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
}

export type CreateUserDto = Omit<User, 'id' | 'createdAt'>;
export type UpdateUserDto = Partial<CreateUserDto>;
```

### API Type Safety

Use types for API responses:

```typescript
// api/types.ts
export interface ApiResponse<T> {
    data: T;
    message: string;
    status: number;
}

export interface ApiError {
    error: string;
    statusCode: number;
    timestamp: string;
}

// Usage
async function fetchUser(id: number): Promise<ApiResponse<User>> {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
}
```

### Backend Type Safety

Type your Express routes:

```typescript
import { Request, Response } from 'express';

interface TypedRequest<T> extends Request {
    body: T;
}

app.post('/api/users', (req: TypedRequest<CreateUserDto>, res: Response<ApiResponse<User>>) => {
    // Type-safe request body and response
    const user = createUser(req.body);
    res.json({ data: user, message: 'User created', status: 201 });
});
```

## Common Pitfalls to Avoid

1. **Using `any`**: Defeats the purpose of TypeScript
2. **Ignoring compiler errors**: Fix type errors, don't suppress them
3. **Overusing type assertions**: Prefer type guards and proper typing
4. **Not leveraging inference**: Let TypeScript infer types when possible
5. **Mixing `null` and `undefined`**: Be consistent with your null handling

## Best Practices Summary

-   ✅ Enable strict mode
-   ✅ Use meaningful type names
-   ✅ Leverage utility types
-   ✅ Create shared types for full stack projects
-   ✅ Write type guards for runtime checks
-   ✅ Document complex types
-   ✅ Keep types close to their usage
-   ✅ Use const assertions for literal types

## Conclusion

TypeScript is a powerful tool that, when used correctly, can dramatically improve your development workflow and code quality. Start with strict mode, learn the utility types, and gradually adopt more advanced patterns as your projects grow.

Remember: TypeScript is JavaScript with types. Don't fight the type system—embrace it and let it guide you toward better code.

What TypeScript patterns have you found most valuable in your projects?
