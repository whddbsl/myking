
```
myking
├─ @types
│  └─ next-auth.d.ts
├─ app
│  ├─ (anon)
│  │  ├─ auth
│  │  │  ├─ callback
│  │  │  │  └─ page.tsx
│  │  │  ├─ layout.tsx
│  │  │  ├─ page.styles.ts
│  │  │  ├─ page.tsx
│  │  │  └─ setNickname
│  │  │     ├─ layout.tsx
│  │  │     ├─ page.styles.ts
│  │  │     └─ page.tsx
│  │  ├─ mountains
│  │  │  ├─ page.tsx
│  │  │  └─ [mountainId]
│  │  │     └─ page.tsx
│  │  ├─ myPage
│  │  │  └─ profile
│  │  │     ├─ edit
│  │  │     │  └─ page.tsx
│  │  │     ├─ layout.tsx
│  │  │     ├─ page.styles.ts
│  │  │     └─ page.tsx
│  │  ├─ parties
│  │  │  ├─ create
│  │  │  │  ├─ layout.tsx
│  │  │  │  ├─ page.styles.ts
│  │  │  │  └─ page.tsx
│  │  │  ├─ layout.tsx
│  │  │  ├─ page.styles.ts
│  │  │  ├─ page.tsx
│  │  │  └─ [partyId]
│  │  │     ├─ layout.tsx
│  │  │     ├─ page.styles.ts
│  │  │     └─ page.tsx
│  │  └─ search
│  │     └─ page.tsx
│  ├─ admin
│  │  ├─ course
│  │  │  ├─ create
│  │  │  │  ├─ page.styles.ts
│  │  │  │  └─ page.tsx
│  │  │  ├─ page.styles.ts
│  │  │  └─ page.tsx
│  │  ├─ layout.styles.ts
│  │  ├─ layout.tsx
│  │  ├─ mountain
│  │  │  ├─ create
│  │  │  │  ├─ page.styles.ts
│  │  │  │  └─ page.tsx
│  │  │  ├─ page.styles.ts
│  │  │  ├─ page.tsx
│  │  │  └─ [mountainId]
│  │  │     └─ edit
│  │  │        └─ page.tsx
│  │  └─ user
│  │     ├─ page.styles.ts
│  │     └─ page.tsx
│  ├─ api
│  │  ├─ admin
│  │  │  ├─ course
│  │  │  │  ├─ create
│  │  │  │  │  └─ route.ts
│  │  │  │  └─ route.ts
│  │  │  ├─ mountain
│  │  │  │  ├─ route.ts
│  │  │  │  └─ [mountainId]
│  │  │  │     └─ edit
│  │  │  │        └─ route.ts
│  │  │  └─ user
│  │  │     └─ route.ts
│  │  ├─ auth
│  │  │  ├─ checkUser
│  │  │  │  └─ route.ts
│  │  │  └─ route.ts
│  │  ├─ parties
│  │  │  ├─ create
│  │  │  │  └─ route.ts
│  │  │  ├─ route.ts
│  │  │  └─ [partyId]
│  │  │     └─ route.ts
│  │  ├─ search
│  │  │  └─ route.ts
│  │  └─ user
│  │     └─ nickname
│  │        ├─ change
│  │        │  └─ route.ts
│  │        └─ route.ts
│  ├─ layout.tsx
│  └─ page.tsx
├─ application
│  ├─ states
│  │  └─ userStore.ts
│  └─ usecases
│     ├─ admin
│     │  ├─ course
│     │  │  ├─ AdminFindCourseUsecase.ts
│     │  │  ├─ CreateCourseUsecase.ts
│     │  │  └─ dto
│     │  │     ├─ AdminCourseListDto.ts
│     │  │     └─ CourseCreateDto.ts
│     │  ├─ mountain
│     │  │  ├─ AdminFindMountainaByIdUsecase.ts
│     │  │  ├─ AdminFindMountainNameUsecase.ts
│     │  │  ├─ AdminFindMountainUsecase.ts
│     │  │  ├─ CreateMountainUsecase.ts
│     │  │  ├─ DeleteMountainUsecase.ts
│     │  │  ├─ dto
│     │  │  │  ├─ AdminMountainDto.ts
│     │  │  │  ├─ AdminMountainListDto.ts
│     │  │  │  ├─ AdminMountainNameDto.ts
│     │  │  │  ├─ MountainCreateDto.ts
│     │  │  │  └─ MountainUpdateDto.ts
│     │  │  └─ UpdateMountainUsecase.ts
│     │  └─ user
│     │     ├─ AdminDeleteUserUscases.ts
│     │     ├─ AdminUserListDto.ts
│     │     └─ dto
│     │        └─ AdminFindUserUsecase.ts
│     ├─ mountainDetails
│     │  ├─ dto
│     │  │  ├─ GetMountainDetailsDto.ts
│     │  │  └─ GetMountainRequestDto.ts
│     │  └─ MountainDetailsUsecase.ts
│     ├─ mountainSearch
│     │  ├─ dto
│     │  │  ├─ SearchMountainDto.ts
│     │  │  └─ SearchMountainRequestDto.ts
│     │  └─ MountainSearchUsecase.ts
│     ├─ party
│     │  ├─ DfPartyCreateUsecase.ts
│     │  └─ dto
│     │     └─ PartyCreateDto.ts
│     ├─ partyLookup
│     │  ├─ dto
│     │  │  ├─ PartyDetailDto.ts
│     │  │  └─ PartyListDto.ts
│     │  ├─ PartyDetailUsecase.ts
│     │  └─ PartyListUsecase.ts
│     ├─ PartyMember
│     │  ├─ DfPartyMemberCreateUsecase.ts
│     │  └─ dto
│     │     └─ PartyMemberCreateDto.ts
│     ├─ user
│     │  ├─ CreateUserUsecase.ts
│     │  ├─ dto
│     │  │  ├─ UserCreateDto.ts
│     │  │  ├─ UserDto.ts
│     │  │  └─ UserUpdateDto.ts
│     │  └─ UpdateUserUsecase.ts
│     └─ userLookup
│        ├─ dto
│        │  └─ UserFindDto.ts
│        └─ FindUserUsecase.ts
├─ components
│  ├─ admin
│  │  ├─ sidebar.styles.ts
│  │  └─ Sidebar.tsx
│  ├─ button
│  │  ├─ submitButton.styles.ts
│  │  └─ submitButton.tsx
│  ├─ header
│  │  ├─ header.style.ts
│  │  └─ header.tsx
│  ├─ party
│  │  └─ filter
│  │     ├─ Filter.styles.ts
│  │     └─ Filter.tsx
│  └─ user
│     ├─ AuthUtils.ts
│     ├─ partyButton
│     │  ├─ party.styles.ts
│     │  └─ party.tsx
│     ├─ ProtectedRoutes.tsx
│     └─ userLevel
│        ├─ level.styles.ts
│        └─ level.tsx
├─ context
│  └─ AuthProvider.tsx
├─ domain
│  ├─ entities
│  │  ├─ Course.ts
│  │  ├─ Mountain.ts
│  │  ├─ Party.ts
│  │  ├─ PartyMember.ts
│  │  └─ User.ts
│  └─ repositories
│     ├─ CourseRepository.ts
│     ├─ MountainRepository.ts
│     ├─ PartyMemberRepository.ts
│     ├─ PartyRepository.ts
│     └─ UserRepository.ts
├─ eslint.config.mjs
├─ infrastructure
│  ├─ repositories
│  │  ├─ SbCourseRepository.ts
│  │  ├─ SbMountainRepository.ts
│  │  ├─ SbPartyMemberRepository.ts
│  │  ├─ SbPartyRepository.ts
│  │  └─ SbUserRepository.ts
│  └─ services
│     └─ SupabaseStorageService.ts
├─ next-env.d.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ public
│  ├─ icons
│  │  └─ app-icon-192x192.png
│  ├─ images
│  │  ├─ back_button.svg
│  │  ├─ member_default.svg
│  │  └─ right_arrow.svg
│  ├─ logos
│  │  └─ logo.png
│  ├─ manifest.json
│  ├─ sw.js
│  └─ workbox-4754cb34.js
├─ README.md
├─ tsconfig.json
├─ tsconfig.tsbuildinfo
└─ utils
   ├─ getToken.ts
   └─ supabase
      └─ server.ts

```