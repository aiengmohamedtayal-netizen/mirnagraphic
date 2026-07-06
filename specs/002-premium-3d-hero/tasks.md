# Tasks: Premium Interactive 3D Hero Experience

**Input**: Design documents from `/specs/002-premium-3d-hero/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/hero-props.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 [P] Install WebGL dependencies: `three`, `@react-three/fiber`, `@react-three/drei`, `framer-motion-3d` in package.json
- [x] T002 [P] Create placeholder 3D asset in `public/models/hero-box.glb`
- [x] T003 [P] Create placeholder fallback video in `public/videos/hero-fallback.mp4`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Create `src/components/hero` directory and base `index.tsx` structure
- [x] T005 Implement device capabilities detection (WebGL support, mobile viewport) in `src/components/hero/index.tsx`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Desktop Immersive Experience (Priority: P1) 🎯 MVP

**Goal**: As a prospective B2B client on a desktop device, I want to experience a photorealistic, interactive 3D cardboard box in the hero section so that I can immediately perceive Mirna Graphic's premium quality and manufacturing expertise.

**Independent Test**: Can be fully tested by loading the desktop landing page without interacting, observing the idle animations, and then moving the mouse to observe parallax/tilt.

### Implementation for User Story 1

- [x] T006 [P] [US1] Create Box model component in `src/components/hero/BoxModel.tsx` with materials and basic mesh
- [x] T007 [P] [US1] Create the WebGL canvas wrapper in `src/components/hero/Scene3D.tsx` with environment lighting
- [x] T008 [US1] Implement idle rotation and mouse parallax tracking inside `src/components/hero/BoxModel.tsx`
- [x] T009 [US1] Integrate `Scene3D` into the main `index.tsx` when desktop device is detected

**Checkpoint**: At this point, the basic interactive 3D box should be visible on desktop devices

---

## Phase 4: User Story 2 - Scroll-Triggered Product Showcase (Priority: P1)

**Goal**: As a user exploring the landing page, I want the 3D box to smoothly open and reveal different packaging products as I scroll, so that I can dynamically discover the factory's diverse capabilities.

**Independent Test**: Can be fully tested by scrolling down the landing page and verifying the scroll position dictates the animation timeline of the box.

### Implementation for User Story 2

- [x] T010 [US2] Integrate `ScrollControls` from `@react-three/drei` into `src/components/hero/Scene3D.tsx`
- [x] T011 [US2] Map scroll offset to animate lid opening in `src/components/hero/BoxModel.tsx`
- [x] T012 [US2] Add placeholder inner products and bind them to the scroll timeline inside `src/components/hero/BoxModel.tsx`

**Checkpoint**: Box correctly opens and reveals products dynamically on scroll

---

## Phase 5: User Story 3 - Mobile and Low-End Fallback (Priority: P2)

**Goal**: As a user on a mobile or low-end device, I want to receive a graceful fallback or simplified experience so that I can still appreciate the premium aesthetic without performance degradation or battery drain.

**Independent Test**: Can be fully tested by throttling CPU/GPU performance or using a mobile viewport/device to verify the simplified experience.

### Implementation for User Story 3

- [x] T013 [P] [US3] Create `VideoFallback.tsx` component in `src/components/hero/VideoFallback.tsx` with standard `<video>` tag
- [x] T014 [US3] Integrate `VideoFallback` into `src/components/hero/index.tsx` to render when fallback is triggered

**Checkpoint**: Mobile devices gracefully display the looping video instead of the WebGL canvas

---

## Phase 6: User Story 4 - Accessibility and SEO Maintenance (Priority: P1)

**Goal**: As a search engine bot or a user relying on assistive technologies, I want to access the structural content of the hero section without interference from the 3D canvas so that the site can be correctly indexed and navigated.

**Independent Test**: Can be fully tested by running Lighthouse audits and navigating the hero section using a screen reader.

### Implementation for User Story 4

- [x] T015 [P] [US4] Ensure semantic HTML overlay (h1, p, a) exists above the 3D canvas in `src/components/hero/index.tsx`
- [x] T016 [US4] Add `aria-hidden="true"` to WebGL canvas and ensure video pauses on `prefers-reduced-motion` in `src/components/hero/index.tsx`

**Checkpoint**: The hero section passes Lighthouse accessibility and SEO checks

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T017 Replace existing static hero component in `src/app/page.tsx` with the new `<Hero />`
- [x] T018 Code cleanup, linting, and verify standard formatting across `src/components/hero/`
- [x] T019 Verify 60 FPS performance goals are met using `@react-three/drei` `PerformanceMonitor`
- [x] T020 Run quickstart.md validation locally

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - Can proceed sequentially or in parallel
- **Polish (Final Phase)**: Depends on all user stories being complete

### User Story Dependencies

- **US1**: Can start after Foundational
- **US2**: Depends heavily on US1 (BoxModel and Scene3D must exist)
- **US3**: Can be developed in parallel to US1 and US2
- **US4**: Can be developed in parallel to US1, US2, and US3

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- `VideoFallback.tsx` (US3) can be developed simultaneously with `Scene3D.tsx` (US1)
- Accessibility integration (US4) can be developed in parallel with WebGL components (US1, US2)

---

## Implementation Strategy

### MVP First

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1 (Basic 3D Box)
4. Complete Phase 6: User Story 4 (SEO overlay)
5. **STOP and VALIDATE**: Verify the basic 3D model loads and SEO content is visible.

### Incremental Delivery

1. Integrate US2 (Scroll animations) to complete the desktop experience.
2. Integrate US3 (Video fallback) to complete the mobile experience.
3. Final Polish and replacement in `src/app/page.tsx`.
