# 🏔️ 마이킹 - 등산 정보 제공 및 등산 파티 모집 플랫폼

<br/>

## 🗂️ 목차

- [🔎 서비스 소개](#-서비스-소개)
- [👥 팀원 소개](#-팀원-소개)
- [🛠️ 기술 스택](#-기술-스택)
- [✨ 시연 영상](#-시연-영상)
- [💾 DB Schema](#-db-schema)
- [📁 프로젝트 구조](#-프로젝트-구조)

<br/>

## 🔎 서비스 소개

### 주제 선정 배경
1. 흩어진 산 코스 정보 통합 조회 필요  
2. 안전하고 신뢰할 수 있는 등산 메이트 모집 플랫폼 제공

### 서비스 핵심
- 산 정보 조회 및 코스별 상세 정보 제공
- 등산 파티 생성 및 참가 기능
- 사용자 맞춤 파티 필터링
- 관리자 페이지 제공

<br/>

## 👥 팀원 소개

| Name    | Role   | GitHub                                      |
|:-------:|:------:|:--------------------------------------------|
| 권영우   | Team Leader | [kwonup](https://github.com/kwonup)       |
| 고가연   | Team Member | [gayeongogo](https://github.com/gayeongogo) |
| 김민경   | Team Member | [m01310g](https://github.com/m01310g)     |
| 김종윤   | Team Member | [whddbsl](https://github.com/whddbsl)     |

<br/>

## 🛠 기술 스택

### Frontend
- React, Next.js, TypeScript
- Zustand, Styled-Components
- PWA 지원

### Backend
- Supabase (DB, Storage, Auth)
- SQL Trigger 활용
- Kakao Map API 활용

### 협업 도구
- Figma, Notion, GitHub, Discord

<br/>

## ✨ 시연 영상
[전체 시연 보러가기](https://www.canva.com/design/DAGkb-XsG-o/NozjwFtMg8WaX_Qwu6aaQA/view?utm_content=DAGkb-XsG-o&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=he86a4dea2d)

### 관리자시스템

<p align="center">
  <img src="https://github.com/user-attachments/assets/97d32c66-ee7d-45d9-8e6a-6e74c344aa17" width="80%" alt="유저관리" />
  <img src="https://github.com/user-attachments/assets/0df1b869-e4df-4467-b7eb-b22bae3cf923" width="80%" alt="산관리" />
  <img src="https://github.com/user-attachments/assets/715a98f6-6d0e-4837-a2e1-13a5026fc292" width="80%" alt="코스관리" />
  <img src="https://github.com/user-attachments/assets/c0f28682-ad80-45b0-976f-94a52ab19093" width="80%" alt="파티관리" />
</p>

<br/>

## 💾 DB Schema

<p align="center">
  <img src="https://github.com/user-attachments/assets/40ccd9d1-9204-474c-b7e6-c6f8b4de7dba" width="60%" alt="db schema" />
</p>

<br/>

## 📁 프로젝트 구조

### 클린 아키텍처

- UI(Page) [프레젠테이션 계층]: Next.js의 app 디렉터리 내부의 page.tsx 파일들
- API Routes [Adapter 계층]: /app/api 디렉터리 내부의 API 핸들러
- UseCase(Service) [비즈니스 로직 계층]: /application/usecases 디렉터리에서 애플리케이션의 핵심 로직을 처리
- Entity [도메인 계층]: /domain/entities 디렉터리에서 데이터 구조 및 도메인 모델 정의
