---
title: 'Full-Stack TypeScript with React, Next.js, and Server-Side Rendering'
description: 'Learn how to build performant full-stack applications using React, Next.js with SSR, and TypeScript, with insights from building production applications.'
date: '2024-06-15'
banner:
    src: '../../images/react.png'
    alt: 'React and Next.js Development'
    caption: 'React and Next.js illustration'
categories:
    - 'React'
    - 'Next.js'
    - 'TypeScript'
    - 'Full Stack'
keywords:
    - 'React'
    - 'Next.js'
    - 'SSR'
    - 'TypeScript'
    - 'Full Stack'
    - 'Server-Side Rendering'
---

After spending over three years building and maintaining a full-stack TypeScript platform with React, Next.js, and Loopback, I've learned valuable lessons about building scalable, performant applications. In this article, I'll share practical patterns and strategies for full-stack TypeScript development.

## Why Full-Stack TypeScript?

Using TypeScript across your entire stack provides:

-   **Type safety**: Catch errors before they reach production
-   **Code sharing**: Share types and utilities between frontend and backend
-   **Better DX**: Improved autocomplete and refactoring
-   **Consistency**: Same language and patterns throughout
-   **Maintainability**: Easier to understand and modify code

## Next.js with Server-Side Rendering

### Understanding Rendering Strategies

Next.js offers multiple rendering strategies:

```typescript
// pages/products/[id].tsx - SSR for dynamic content
export async function getServerSideProps({ params }: { params: { id: string } }) {
    const product = await fetchProduct(params.id);

    if (!product) {
        return { notFound: true };
    }

    return {
        props: {
            product,
        },
    };
}

interface ProductPageProps {
    product: Product;
}

export default function ProductPage({ product }: ProductPageProps) {
    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
        </div>
    );
}
```

### Static Site Generation with Revalidation

```typescript
// pages/blog/[slug].tsx - SSG with ISR
export async function getStaticPaths() {
    const posts = await getAllPosts();

    return {
        paths: posts.map((post) => ({
            params: { slug: post.slug },
        })),
        fallback: 'blocking',
    };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug);

    return {
        props: {
            post,
        },
        revalidate: 3600, // Revalidate every hour
    };
}
```

## Type-Safe API Integration

### Shared Types

Create a shared types package:

```typescript
// shared/types/api.ts
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

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
}
```

### API Client with TypeScript

```typescript
// lib/api-client.ts
class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async get<T>(endpoint: string): Promise<ApiResponse<T>> {
        const response = await fetch(`${this.baseUrl}${endpoint}`);

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return response.json();
    }

    async post<T, D>(endpoint: string, data: D): Promise<ApiResponse<T>> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return response.json();
    }
}

export const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || '');
```

## Backend with Loopback

### Type-Safe Controllers

```typescript
// src/controllers/user.controller.ts
import { repository } from '@loopback/repository';
import { UserRepository } from '../repositories';
import { User } from '../models';

export class UserController {
    constructor(
        @repository(UserRepository)
        private userRepository: UserRepository,
    ) {}

    async find(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findById(id: number): Promise<User> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    async create(userData: Omit<User, 'id'>): Promise<User> {
        return this.userRepository.create(userData);
    }
}
```

### Database with TypeORM

```typescript
// src/models/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @CreateDateColumn()
    createdAt: Date;
}
```

## State Management

### React Context for Global State

```typescript
// contexts/AppContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface AppState {
    user: User | null;
    loading: boolean;
}

type AppAction = { type: 'SET_USER'; payload: User } | { type: 'SET_LOADING'; payload: boolean } | { type: 'LOGOUT' };

const initialState: AppState = {
    user: null,
    loading: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'LOGOUT':
            return { ...state, user: null };
        default:
            return state;
    }
}

const AppContext = createContext<{
    state: AppState;
    dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
}
```

## Testing with Jest

### Component Testing

```typescript
// __tests__/components/UserCard.test.tsx
import { render, screen } from '@testing-library/react';
import { UserCard } from '@/components/UserCard';

describe('UserCard', () => {
    const mockUser: User = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
    };

    it('renders user information', () => {
        render(<UserCard user={mockUser} />);

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });
});
```

### API Testing

```typescript
// __tests__/api/user.test.ts
import { apiClient } from '@/lib/api-client';

describe('User API', () => {
    it('fetches users', async () => {
        const response = await apiClient.get<User[]>('/users');

        expect(response.data).toBeInstanceOf(Array);
        expect(response.status).toBe(200);
    });
});
```

## Performance Optimization

### Code Splitting

```typescript
// pages/dashboard.tsx
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('@/components/Chart'), {
    loading: () => <div>Loading chart...</div>,
    ssr: false,
});

export default function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <Chart />
        </div>
    );
}
```

### Image Optimization

```typescript
import Image from 'next/image';

export function ProductImage({ src, alt }: { src: string; alt: string }) {
    return (
        <Image
            src={src}
            alt={alt}
            width={800}
            height={600}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,..."
        />
    );
}
```

## Database Best Practices

### TypeORM Query Optimization

```typescript
// repositories/user.repository.ts
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

export class UserRepository extends Repository<User> {
    async findWithRelations(id: number): Promise<User | null> {
        return this.findOne({
            where: { id },
            relations: ['profile', 'orders'],
        });
    }

    async findPaginated(page: number, pageSize: number) {
        const [items, total] = await this.findAndCount({
            skip: (page - 1) * pageSize,
            take: pageSize,
            order: { createdAt: 'DESC' },
        });

        return {
            items,
            total,
            page,
            pageSize,
        };
    }
}
```

## Error Handling

### Global Error Boundary

```typescript
// components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h1>Something went wrong.</h1>
                    <p>{this.state.error?.message}</p>
                </div>
            );
        }

        return this.props.children;
    }
}
```

## Best Practices Summary

✅ **Do:**

-   Use TypeScript strictly across the entire stack
-   Implement proper error handling and boundaries
-   Write tests for critical business logic
-   Optimize images and use Next.js Image component
-   Use SSR/SSG appropriately based on content type
-   Share types between frontend and backend
-   Implement proper loading states

❌ **Don't:**

-   Ignore TypeScript errors
-   Skip testing
-   Use `any` type unnecessarily
-   Block rendering with heavy computations
-   Forget to handle edge cases
-   Neglect performance optimization

## Conclusion

Building full-stack TypeScript applications with React and Next.js requires careful planning and attention to detail. From my experience building and maintaining large-scale applications, the key is consistency—using TypeScript everywhere, sharing types, and following established patterns.

The combination of Next.js SSR, React, and a TypeScript backend provides a powerful foundation for building scalable applications. With proper architecture, testing, and optimization, you can create applications that are both performant and maintainable.

What patterns have you found most effective in your full-stack TypeScript projects? Share your experiences!
