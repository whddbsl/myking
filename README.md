# myking

my-hiking: 나만의 하이킹 메이트

```
myking
├─ app
│  ├─ (anon)
│  │  ├─ mountains
│  │  │  ├─ page.tsx
│  │  │  └─ [mountainId]
│  │  │     ├─ layout.tsx
│  │  │     ├─ page.styles.ts
│  │  │     └─ page.tsx
│  │  └─ search
│  │     └─ page.tsx
│  ├─ api
│  │  └─ search
│  │     └─ route.ts
│  ├─ layout.tsx
│  └─ page.tsx
├─ application
│  └─ usecases
│     ├─ mountainDetails
│     │  ├─ dto
│     │  │  ├─ GetMountainDetailsDto.ts
│     │  │  └─ GetMountainRequestDto.ts
│     │  └─ MountainDetailsUsecase.ts
│     └─ mountainSearch
│        ├─ dto
│        │  ├─ SearchMountainDto.ts
│        │  └─ SearchMountainRequestDto.ts
│        └─ MountainSearchUsecase.ts
├─ components
├─ domain
│  ├─ entities
│  │  ├─ Course.ts
│  │  └─ Mountain.ts
│  └─ repositories
│     ├─ CourseRepository.ts
│     └─ MountainRepository.ts
├─ eslint.config.mjs
├─ infrastructure
│  └─ repositories
│     └─ SbMountainRepository.ts
├─ next-env.d.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ public
│  ├─ icons
│  │  └─ app-icon-192x192.png
│  ├─ manifest.json
│  ├─ sw.js
│  └─ workbox-4754cb34.js
├─ README.md
├─ tsconfig.json
├─ tsconfig.tsbuildinfo
└─ utils
   └─ supabase
      └─ server.ts

```