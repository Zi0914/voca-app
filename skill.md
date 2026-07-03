# Skill: Recreate Lingi Mobile PWA Prototype
Use this skill when building or rebuilding the Lingi mobile-first PWA prototype in a Next.js + Tailwind CSS project.
## Goal
Create a polished mobile-first homepage and note capture flow for Lingi, a gentle vocabulary capture app for intermediate English learners. The result should look like a real launchable MVP, not a wireframe.
The prototype has one main task:
User opens Home.
User taps the daily note card.
A full-screen note writing page opens.
User types a word, phrase, sentence, or note.
Save becomes active.
User taps Save.
The note card shrinks and slides right.
The app returns Home and shows a saved confirmation popup.
The bottom nav can visually switch between Home and Library.
## Recommended Stack
Next.js App Router
TypeScript
Tailwind CSS
lucide-react for icons
Local state only
No backend is needed.
## File Structure
Use this structure:
app/
  globals.css
  layout.tsx
  page.tsx
components/
  bottom-nav.tsx
  empty-state-card.tsx
  home-header.tsx
public/
  lingi-parrot.png
## Required Global CSS
In app/globals.css, define the font variables, body background, and animations.
Use:
:root {
  color-scheme: light;
  --font-lingi-display: "Arial Rounded MT Bold", "Avenir Next", "SF Pro Rounded", ui-rounded, system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif;
  --font-lingi-body: "Avenir Next", "SF Pro Rounded", ui-rounded, system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", "Noto Sans CJK SC", "Microsoft YaHei", sans-serif;
}

body {
  min-height: 100%;
  margin: 0;
  background:
    radial-gradient(circle at 12% -6%, rgba(145, 197, 230, 0.46), transparent 19rem),
    radial-gradient(circle at 92% 8%, rgba(246, 207, 105, 0.32), transparent 18rem),
    radial-gradient(circle at 12% 76%, rgba(134, 199, 141, 0.22), transparent 18rem),
    linear-gradient(180deg, #fbf7ec 0%, #eef7f4 48%, #f8eedf 100%);
  color: #243238;
  font-family: var(--font-lingi-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
Add these animations:
@keyframes note-save-away {
  0% {
    opacity: 1;
    transform: translateX(0) scale(1);
    transform-origin: 88% 50%;
  }

  45% {
    opacity: 1;
    transform: translateX(14px) scale(0.94);
  }

  100% {
    opacity: 0;
    transform: translateX(58%) scale(0.42);
    transform-origin: 100% 50%;
  }
}

@keyframes saved-pop-in {
  0% {
    opacity: 0;
    transform: translateY(16px) scale(0.96);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
## Main Page
app/page.tsx should render:
centered mobile app shell
HomeHeader
HomeCaptureCard
BottomNav
Use:
export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-transparent px-5 pb-[calc(104px+env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))] min-[400px]:px-6">
      <HomeHeader />
      <HomeCaptureCard />
      <BottomNav />
    </main>
  );
}
Header Component
HomeHeader should only show centered text:
Lingi
24px
extra bold
no logo image
Home Capture Component
Create a client component.
State:
isOpen
isSaving
showSavedPopup
note
Date:
use new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "2-digit", year: "numeric" })
display exactly like Thursday, July 02, 2026
Home greeting:
Hi Liz,
let’s keep today’s words
Home card:
full-card button
card radius 30px
card background #FFFDF5 at about 78% opacity
inner mint note panel
top-right parrot image
prompt text:Type here to catch what you want to remember...

Open behavior:
tapping the card opens a full-screen editor page
focus the textarea automatically
Editor page:
full viewport fixed layer
max width 480px
outer padding 20px
inner card looks like an expanded version of home card
top row height 48px
3 columns: Back / date / Save
Back button is 32px circle with teal outline
Save button height 32px, radius 12px, font 13px regular
Save disabled if note is empty
textarea scrolls internally
Save behavior:
if empty, do nothing
set isSaving
animate editor card using note-save-away
after 560ms:close editor
clear note
show saved popup

hide popup after about 4200ms
Saved popup:
show above bottom nav
copy:Saved to Library
You can find it in Library anytime.

no CTA button
Bottom Navigation Component
Create a client component because the selected state changes visually.
Tabs:
Home
Library
Use icons:
House from lucide-react
BookOpen from lucide-react
Icon size:
28px x 28px
Label:
12px
regular
Behavior:
default active tab is Home
clicking Library moves the white selected indicator from left to right
Library icon and text become #008C95
Home icon and text become #61777B
clicking Home moves indicator back
Implementation notes:
Make the selected indicator a separate absolute <span>.
Do not put the selected white background directly on each button.
Nav grid is relative.
Indicator position:top: 8px
bottom: 8px
left: 8px
width: calc(50% - 0.75rem)
translate right by calc(100% + 0.5rem) when Library is active

transition: 300ms ease-out
Do Not Add
Do not add:
backend
sign in
actual Library page content
review cards
extra navigation tabs
onboarding
explanations inside the UI
large landing page sections
Keep the prototype focused.
Quality Checklist
Before finishing:
Home looks good at iPhone width.
No text overlaps on small screens.
Daily note card is tall enough for paragraph-like notes.
Opening editor feels like a page, not a modal box.
Save is disabled until text exists.
Save motion works.
Saved popup appears and has no extra button.
Bottom nav indicator slides left/right when Home or Library is tapped.
The UI keeps a warm, gentle, mature personality.
Build passes with npm run build.