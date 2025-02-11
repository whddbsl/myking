
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
│  │  │  ├─ layout.tsx
│  │  │  ├─ map
│  │  │  │  ├─ page.styles.ts
│  │  │  │  └─ page.tsx
│  │  │  └─ profile
│  │  │     ├─ edit
│  │  │     │  └─ page.tsx
│  │  │     ├─ myCreated
│  │  │     │  ├─ page.styles.ts
│  │  │     │  └─ page.tsx
│  │  │     ├─ myParticipated
│  │  │     │  └─ page.tsx
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
│  │  │  ├─ page.tsx
│  │  │  └─ [courseId]
│  │  │     └─ edit
│  │  │        ├─ page.styles.ts
│  │  │        └─ page.tsx
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
│  │  │        ├─ page.styles.ts
│  │  │        └─ page.tsx
│  │  ├─ party
│  │  │  ├─ page.styles.ts
│  │  │  └─ page.tsx
│  │  └─ user
│  │     ├─ page.styles.ts
│  │     └─ page.tsx
│  ├─ api
│  │  ├─ admin
│  │  │  ├─ course
│  │  │  │  ├─ create
│  │  │  │  │  └─ route.ts
│  │  │  │  ├─ route.ts
│  │  │  │  └─ [courseId]
│  │  │  │     └─ edit
│  │  │  │        └─ route.ts
│  │  │  ├─ mountain
│  │  │  │  ├─ create
│  │  │  │  │  └─ route.ts
│  │  │  │  ├─ route.ts
│  │  │  │  └─ [mountainId]
│  │  │  │     └─ edit
│  │  │  │        └─ route.ts
│  │  │  ├─ party
│  │  │  │  └─ route.ts
│  │  │  └─ user
│  │  │     └─ route.ts
│  │  ├─ auth
│  │  │  ├─ checkUser
│  │  │  │  └─ route.ts
│  │  │  └─ route.ts
│  │  ├─ mountains
│  │  │  └─ route.ts
│  │  ├─ parties
│  │  │  ├─ create
│  │  │  │  └─ route.ts
│  │  │  ├─ myCreated
│  │  │  │  └─ route.ts
│  │  │  ├─ participated
│  │  │  │  └─ route.ts
│  │  │  ├─ route.ts
│  │  │  └─ [partyId]
│  │  │     └─ route.ts
│  │  ├─ search
│  │  │  └─ route.ts
│  │  └─ user
│  │     ├─ edit
│  │     │  └─ route.ts
│  │     └─ route.ts
│  ├─ layout.tsx
│  ├─ page.styles.ts
│  └─ page.tsx
├─ application
│  ├─ states
│  │  └─ userStore.ts
│  └─ usecases
│     ├─ admin
│     │  ├─ course
│     │  │  ├─ CreateCourseUsecase.ts
│     │  │  ├─ DeleteCourseUsecase.ts
│     │  │  ├─ dto
│     │  │  │  ├─ CourseCreateDto.ts
│     │  │  │  ├─ CourseDetailDto.ts
│     │  │  │  ├─ CourseListDto.ts
│     │  │  │  ├─ CourseUpdateDto.ts
│     │  │  │  └─ MountainListDto.ts
│     │  │  ├─ FindCourseDetailUsecase.ts
│     │  │  ├─ FindCourseUsecase.ts
│     │  │  ├─ FindMountainaByIdUsecase.ts
│     │  │  ├─ FindMountainUsecase.ts
│     │  │  └─ UpdateCourseUsecase.ts
│     │  ├─ mountain
│     │  │  ├─ AdminFindMountainaByIdUsecase.ts
│     │  │  ├─ AdminFindMountainUsecase.ts
│     │  │  ├─ CreateMountainUsecase.ts
│     │  │  ├─ DeleteMountainUsecase.ts
│     │  │  ├─ dto
│     │  │  │  ├─ AdminMountainDto.ts
│     │  │  │  ├─ AdminMountainListDto.ts
│     │  │  │  ├─ MountainCreateDto.ts
│     │  │  │  ├─ MountainDetailDto.ts
│     │  │  │  ├─ MountainListDto.ts
│     │  │  │  └─ MountainUpdateDto.ts
│     │  │  ├─ FindMountainDetailUsecase.ts
│     │  │  ├─ FindMountainUsecase.ts
│     │  │  └─ UpdateMountainUsecase.ts
│     │  ├─ party
│     │  │  ├─ dto
│     │  │  │  └─ PartyListDto.ts
│     │  │  └─ FindPartyUsecase.ts
│     │  └─ user
│     │     ├─ AdminDeleteUserUscases.ts
│     │     ├─ AdminUserListDto.ts
│     │     └─ dto
│     │        └─ AdminFindUserUsecase.ts
│     ├─ mountainDetails
│     │  ├─ dto
│     │  │  ├─ GetMountainDetailsDto.ts
│     │  │  ├─ GetMountainRequestDto.ts
│     │  │  └─ MountainWithCoursesDto.ts
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
│     │  │  ├─ PartyListDto.ts
│     │  │  ├─ PartyMyCreatedDto.ts
│     │  │  └─ PartyParticipatedDto.ts
│     │  ├─ PartyDetailUsecase.ts
│     │  ├─ PartyListUsecase.ts
│     │  ├─ PartyMyCreatedUsecase.ts
│     │  └─ PartyParticipatedUsecase.ts
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
│  ├─ bottomNav
│  │  ├─ bottomNav.styles.ts
│  │  └─ bottomNav.tsx
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
│     ├─ partyButton
│     │  ├─ party.styles.ts
│     │  └─ party.tsx
│     ├─ profileImageUploader
│     │  ├─ ProfileImageUploader.styles.ts
│     │  └─ ProfileImageUploader.tsx
│     ├─ profileNavBar
│     │  ├─ profileNavBar.styles.ts
│     │  └─ profileNavBar.tsx
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
│  │  ├─ home.svg
│  │  ├─ map.png
│  │  ├─ member_default.svg
│  │  ├─ myPage.svg
│  │  ├─ parties.svg
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