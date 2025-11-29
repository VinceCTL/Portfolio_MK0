---
title: 'Building Cross-Platform Mobile Apps with Capacitor and Angular'
description: 'Learn how to build native mobile applications using Capacitor with Angular, sharing code between web and mobile platforms while maintaining native performance.'
date: '2024-09-20'
banner:
    src: '../../images/mobile-phone.png'
    alt: 'Mobile Development with Capacitor'
    caption: 'Mobile app development illustration'
categories:
    - 'Mobile Development'
    - 'Angular'
    - 'Capacitor'
keywords:
    - 'Capacitor'
    - 'Angular'
    - 'Mobile Development'
    - 'PWA'
    - 'Cross-Platform'
    - 'Ionic'
---

Building mobile applications that work seamlessly across iOS, Android, and web platforms is a challenge many developers face. After developing a restaurant ordering app using Capacitor with Angular 17, I've learned valuable lessons about cross-platform mobile development that I'd like to share.

## Why Capacitor?

Capacitor is a modern alternative to Cordova that provides a native runtime for web apps. It offers:

-   **Native API access**: Direct access to device features
-   **Modern tooling**: Built for modern JavaScript frameworks
-   **Better performance**: Improved compared to older hybrid solutions
-   **Active development**: Maintained by the Ionic team
-   **Framework agnostic**: Works with Angular, React, Vue, or vanilla JS

## Setting Up Capacitor with Angular

### Initial Setup

```bash
# Install Capacitor CLI globally
npm install -g @capacitor/cli

# Add Capacitor to your Angular project
npm install @capacitor/core @capacitor/cli
npx cap init

# Add platform-specific packages
npm install @capacitor/ios @capacitor/android
```

### Configuration

```typescript
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.yourcompany.yourapp',
    appName: 'Your App Name',
    webDir: 'dist/your-app',
    server: {
        androidScheme: 'https',
        iosScheme: 'https',
    },
    plugins: {
        SplashScreen: {
            launchShowDuration: 2000,
            launchAutoHide: true,
        },
    },
};

export default config;
```

## Project Structure

Organize your Angular app for mobile:

```
src/
├── app/
│   ├── core/
│   │   ├── services/
│   │   │   ├── platform.service.ts    # Platform detection
│   │   │   └── native.service.ts      # Native API wrappers
│   │   └── guards/
│   │       └── mobile.guard.ts        # Route guards for mobile
│   ├── features/
│   │   └── orders/
│   │       ├── components/
│   │       ├── services/
│   │       └── models/
│   └── shared/
│       ├── components/
│       └── directives/
└── capacitor/
    ├── ios/
    └── android/
```

## Platform Detection Service

```typescript
// core/services/platform.service.ts
import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@angular/cdk/platform';

@Injectable({
    providedIn: 'root',
})
export class PlatformService {
    constructor(private platform: Platform) {}

    get isNative(): boolean {
        return Capacitor.isNativePlatform();
    }

    get isIOS(): boolean {
        return Capacitor.getPlatform() === 'ios';
    }

    get isAndroid(): boolean {
        return Capacitor.getPlatform() === 'android';
    }

    get isWeb(): boolean {
        return Capacitor.getPlatform() === 'web';
    }

    get isMobile(): boolean {
        return this.isIOS || this.isAndroid;
    }

    get isDesktop(): boolean {
        return this.platform.isBrowser && !this.isMobile;
    }
}
```

## Using Native APIs

### Camera Access

```typescript
// core/services/native.service.ts
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
    providedIn: 'root',
})
export class NativeService {
    async takePicture(): Promise<string> {
        try {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.Base64,
                source: CameraSource.Camera,
            });

            return `data:image/jpeg;base64,${image.base64String}`;
        } catch (error) {
            console.error('Error taking picture:', error);
            throw error;
        }
    }

    async pickFromGallery(): Promise<string> {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Base64,
            source: CameraSource.Photos,
        });

        return `data:image/jpeg;base64,${image.base64String}`;
    }
}
```

### File System Access

```typescript
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

async saveFile(content: string, filename: string): Promise<void> {
    await Filesystem.writeFile({
        path: filename,
        data: content,
        directory: Directory.Data,
        encoding: Encoding.UTF8,
    });
}

async readFile(filename: string): Promise<string> {
    const result = await Filesystem.readFile({
        path: filename,
        directory: Directory.Data,
        encoding: Encoding.UTF8,
    });

    return result.data as string;
}
```

### Network Status

```typescript
import { Network } from '@capacitor/network';

@Injectable({
    providedIn: 'root',
})
export class NetworkService {
    private networkStatus$ = new BehaviorSubject<boolean>(true);

    constructor() {
        this.initializeNetworkListener();
    }

    private async initializeNetworkListener(): Promise<void> {
        const status = await Network.getStatus();
        this.networkStatus$.next(status.connected);

        Network.addListener('networkStatusChange', (status) => {
            this.networkStatus$.next(status.connected);
        });
    }

    get isOnline$(): Observable<boolean> {
        return this.networkStatus$.asObservable();
    }
}
```

## Responsive Design for Mobile

### Mobile-First Components

```typescript
// shared/components/mobile-header/mobile-header.component.ts
import { Component, Input } from '@angular/core';
import { PlatformService } from '@core/services/platform.service';

@Component({
    selector: 'app-mobile-header',
    template: `
        <header [class.mobile]="platformService.isMobile">
            <button *ngIf="platformService.isMobile" (click)="toggleMenu()">
                <ion-icon name="menu"></ion-icon>
            </button>
            <h1>{{ title }}</h1>
        </header>
    `,
    styles: [
        `
            header.mobile {
                padding: 1rem;
                background: var(--ion-color-primary);
                color: white;
            }
        `,
    ],
})
export class MobileHeaderComponent {
    @Input() title: string = '';

    constructor(public platformService: PlatformService) {}

    toggleMenu(): void {
        // Menu toggle logic
    }
}
```

## State Management with GraphQL

For the restaurant ordering app, I used Hasura GraphQL for real-time data:

```typescript
// features/orders/services/order.service.ts
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';

const GET_ORDERS = gql`
    query GetOrders($restaurantId: ID!) {
        orders(where: { restaurant_id: { _eq: $restaurantId } }) {
            id
            items {
                id
                name
                quantity
                price
            }
            status
            created_at
        }
    }
`;

const CREATE_ORDER = gql`
    mutation CreateOrder($input: orders_insert_input!) {
        insert_orders_one(object: $input) {
            id
            status
        }
    }
`;

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    constructor(private apollo: Apollo) {}

    getOrders(restaurantId: string) {
        return this.apollo.watchQuery({
            query: GET_ORDERS,
            variables: { restaurantId },
            fetchPolicy: 'network-only',
        }).valueChanges;
    }

    createOrder(order: any) {
        return this.apollo.mutate({
            mutation: CREATE_ORDER,
            variables: { input: order },
        });
    }
}
```

## Offline Support

Implementing offline capabilities is crucial for mobile apps:

```typescript
// core/services/offline.service.ts
import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';
import { Storage } from '@capacitor/storage';

@Injectable({
    providedIn: 'root',
})
export class OfflineService {
    private pendingActions: any[] = [];

    constructor(private networkService: NetworkService) {
        this.networkService.isOnline$.subscribe((isOnline) => {
            if (isOnline) {
                this.syncPendingActions();
            }
        });
    }

    async queueAction(action: any): Promise<void> {
        this.pendingActions.push({
            ...action,
            timestamp: Date.now(),
        });
        await this.savePendingActions();
    }

    private async syncPendingActions(): Promise<void> {
        const actions = await this.getPendingActions();

        for (const action of actions) {
            try {
                await this.executeAction(action);
                await this.removeAction(action.id);
            } catch (error) {
                console.error('Failed to sync action:', error);
            }
        }
    }

    private async savePendingActions(): Promise<void> {
        await Storage.set({
            key: 'pendingActions',
            value: JSON.stringify(this.pendingActions),
        });
    }

    private async getPendingActions(): Promise<any[]> {
        const { value } = await Storage.get({ key: 'pendingActions' });
        return value ? JSON.parse(value) : [];
    }
}
```

## Performance Optimization

### Lazy Loading Routes

```typescript
// app-routing.module.ts
const routes: Routes = [
    {
        path: 'orders',
        loadChildren: () => import('./features/orders/orders.module').then((m) => m.OrdersModule),
    },
    {
        path: 'menu',
        loadChildren: () => import('./features/menu/menu.module').then((m) => m.MenuModule),
    },
];
```

### Image Optimization

```typescript
// shared/directives/lazy-image.directive.ts
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[appLazyImage]',
})
export class LazyImageDirective implements OnInit {
    @Input() appLazyImage: string = '';

    constructor(private el: ElementRef) {}

    ngOnInit(): void {
        const img = this.el.nativeElement;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    img.src = this.appLazyImage;
                    observer.unobserve(img);
                }
            });
        });

        observer.observe(img);
    }
}
```

## Building and Deploying

### Build for Production

```bash
# Build Angular app
ng build --configuration production

# Sync with Capacitor
npx cap sync

# Open in native IDE
npx cap open ios
npx cap open android
```

### CI/CD Pipeline

```yaml
# .github/workflows/mobile-build.yml
name: Mobile Build

on:
    push:
        branches: [main]

jobs:
    build:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2
            - uses: actions/setup-node@v2
            - run: npm install
            - run: npm run build
            - run: npx cap sync
            - run: npx cap copy
```

## Best Practices

✅ **Do:**

-   Test on real devices, not just emulators
-   Implement proper error handling for native APIs
-   Use platform-specific UI components when needed
-   Optimize images and assets for mobile
-   Implement offline-first architecture
-   Handle network connectivity changes gracefully

❌ **Don't:**

-   Assume web APIs work the same on mobile
-   Ignore performance on lower-end devices
-   Forget to handle permissions properly
-   Skip testing on both iOS and Android
-   Overlook app store guidelines

## Conclusion

Capacitor with Angular provides a powerful solution for building cross-platform mobile applications. By leveraging native APIs, implementing proper state management, and optimizing for performance, you can create mobile apps that feel native while sharing most of your codebase with the web version.

The key is to embrace the hybrid approach—use web technologies where they excel, and leverage native capabilities when needed. With proper architecture and testing, you can deliver excellent mobile experiences efficiently.

Have you built mobile apps with Capacitor? Share your experiences and challenges!
