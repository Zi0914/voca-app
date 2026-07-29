## Mobile App Frame

Voca Mobile PWA Design Spec
## Product
Voca is a mobile-first vocabulary capture PWA for intermediate English learners. The product should feel like a gentle personal language journal with a small companion energy, not a classroom app and not a corporate SaaS product.
The current prototype only needs two features:
Home: quickly type and save something the user wants to remember.
Library: content-first saved-note browsing with search, lightweight filters, and optional date navigation.
## Visual Direction
Keywords:
gentle
calm
supportive
warm
slightly playful
mature
mobile app-like
Avoid:
Duolingo-style cartoon UI
corporate dashboard styling
too many square frames
heavy feature explanation
dark editor pages
strong visual clutter
## Palette
Use soft Monet-inspired colors with Voca's primary peacock teal.
Primary teal: #008C95
Text dark: #243238
Secondary text: #61777B
Cream surface: #FBF7EC
Card cream: #FFFDF5
Mint note fill: #DDEFE9
Disabled button: #B9C8C3
Soft yellow glow: rgba(246, 207, 105, 0.24-0.32)
Soft blue glow: rgba(145, 197, 230, 0.46)
Soft green glow: rgba(134, 199, 141, 0.22)
Body background:
near-white #FEFEFE
keep the page background quiet so the mint capture frame remains the focal surface
## Typography
Use rounded, friendly system fonts.
Font stack:
Display: "Arial Rounded MT Bold", "Avenir Next", "SF Pro Rounded", ui-rounded, system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif
Body: "Avenir Next", "SF Pro Rounded", ui-rounded, system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", "Noto Sans CJK SC", "Microsoft YaHei", sans-serif
Homepage greeting:
Hi Liz, welcome back!
28px
weight 500
color #243238
line-height 34px
Subheading:
keep what you notice, learn at your pace
16px
regular
color #61777B
line-height 23px
Date on home card:
full date format such as Thursday, July 02, 2026
12px
medium
color #0E6F74
Editor top date:
same full date
11px
medium
one line, ellipsis if needed
centered between Back and Save
Note prompt:
Type here to catch what you want to remember...
16px
regular
line-height 28px
color #61777B
Bottom navigation labels:
12px
regular
## Layout
Design for iPhone first, max app width 480px.
Main app container:
max-width 480px
horizontal padding 20px; increase to 24px at min-width: 400px
bottom padding should account for bottom nav: 104px + safe-area-inset-bottom
top padding: max(20px, safe-area-inset-top)
Top brand:
centered text Voca
no logo image in the header
24px, extra bold
letter spacing 0.04em
bottom spacing 30px
show the Voca wordmark on Home only; Library uses its own page title without the wordmark
Greeting block:
margin-bottom 20px
## Home Daily Note Card
Purpose:
Encourage the user to type anything they want to remember.
The whole card is tappable.
Card:
radius 30px
border 1px solid rgba(0,140,149,0.20)
background uses a soft mint gradient from rgba(226,243,237,0.96) to rgba(211,235,228,0.90)
add a diffused sky-blue glow behind the mascot
add a very subtle warm cream-yellow glow near the lower-left corner
keep the center readable and avoid visible color boundaries
padding 20px
no outer shadow; use the border and surface color to separate the frame from the page
backdrop blur
height fills the available space between the greeting and bottom navigation
use the dynamic viewport height so the card shortens on smaller phones
keep a 60px gap between the card bottom and the top of the bottom navigation
the home page itself must not scroll
the home page itself must not scroll
Parrot:
use transparent parrot PNG
position top-right
56px x 64px
right 16px, top 12px
subtle drop shadow
Inner note area:
do not add a second filled card inside the main frame
use an open, centered composition inside the outer frame
show the date as a centered Today · Month Day context label above the title
use a translucent cream surface for the date label
title: What caught your attention today?
title weight: 400
vertical spacing: 20px from date to title, title to mascot, and mascot to supporting copy; 24px from supporting copy to CTA
title weight: 600
place a larger mascot-scale parrot below the title
supporting copy: Keep a word, phrase, or sentence here and come back to it later.
include a compact teal Start a note CTA with a right arrow and no shadow
when a draft exists, change the CTA to Continue your note
Interaction:
only tapping the Start a note CTA opens the writing page
the frame, title, mascot, date, supporting copy, and empty space are non-interactive
## Writing Page
This is a dedicated full-screen mobile page, not a modal, overlay, or floating card.
Page:
min-height 100dvh
max-width 480px
note body uses a single quiet background color #F7FBFA
horizontal padding 20px, respecting safe areas
do not place the editor inside a rounded cream card
Top CTA row:
full-width app bar with a soft mint-to-sky-blue-to-warm-yellow gradient
gradient: linear-gradient(105deg, #DDEFE9 0%, #E4F1F4 58%, #F8EDCE 100%)
16px top and bottom spacing around controls
top spacing may expand to respect safe-area-inset-top
no shadow
3 columns: Back / Date / Save
columns: 72px 1fr 72px
items vertically centered
Back button:
40px x 40px
quiet circular hover/focus state
icon color #008C95
Save button:
height 36px
fully rounded
horizontal padding 16px
font size 13px
semibold
text white
enabled color #008C95
disabled color #B9C8C3
no shadow
disabled until text is entered
Textarea area:
fills remaining height
transparent background directly on the page
starts immediately below the header separator
14px text with 24px line height
textarea can scroll internally for long notes
placeholder: Type a word, phrase, or sentence you’d like to remember here...
placeholder uses secondary text color #61777B
entered text uses dark text color #243238
Save motion:
when user taps Save, the dedicated page gently fades and slides to the right
duration 560ms
easing cubic-bezier(0.22, 1, 0.36, 1)
final state: opacity 0, translateX about 18%, scale about 0.97
after motion, return to home and clear note text
Saved popup:
appears above bottom navigation
text only; no CTA button
rounded 22px
cream translucent background
border rgba(255,255,255,0.75)
shadow 0 18px 42px rgba(64,93,91,0.16)
copy:Saved to Library
You can find it in Library anytime.

pop-in animation: 220ms, translateY 16px to 0, opacity 0 to 1
auto-dismiss after about 4 seconds
## Library
Default view:
show all saved notes without requiring a date selection
title and total saved count at the top
search field placeholder: Search saved notes...
search field uses cool green-gray #F2F5F4 with a subtle peacock-teal border
on focus, transition to #FEFEFE with a primary #008C95 border and search icon
do not add a search-field shadow
filter chips for All, This week, and Date
all filter chips use inline-flex centering, 36px height, and line-height 1
Date keeps a 16px calendar icon with 6px spacing before the label
inactive filter chips use #FEFEFE with a primary #008C95 border so they remain distinct from mint content cards
Library title uses 22px at weight 500
place the current result count at the right side of the filter row and update it with filters and search
do not show a redundant "shown" count
use 24px between Library and search, 48px between search and filters, then 24px before the content list
use 32px between different date groups
when Library is scrolled to the end, keep 30px between the final sticky note and the top of the bottom navigation
Date opens a temporary mobile bottom-sheet month calendar so the Library list does not lose vertical space
selecting a date applies the Date filter and closes the sheet
allow dismissing with the close button or backdrop
show a visible Month Year heading inside the sheet
calendar chevrons move directly to the previous or next month
show a seven-column month grid, dim dates outside the active month, and use a small dot for dates with saved content
use a white calendar surface, subtle peacock-teal border, dark month heading, and primary-teal selected date
use primary-teal focus-visible rings instead of browser-default blue outlines
only dates with saved notes are interactive
render dates without saved notes, including future dates, in disabled gray #B8C3C1
disabled dates must not receive tap, focus, or selected styling
Content:
group notes by Today, Yesterday, or Month Day
prioritize note content over its timestamp
when text uses "term - definition", display the term as the card title and the definition as supporting text
use the date group heading instead of repeating date and time on every card
use a two-column grid of square sticky notes within each date group
cards use a 1:1 aspect ratio with a 12px grid gap
all sticky notes use #E7F3EF with a subtle peacock-teal border
all four corners use a consistent 12px radius
allow definitions to wrap inside the square and do not use rotation or shadows
card title uses 15px semibold in #243238; supporting text uses 14px in #61777B
Actions:
place Edit and Delete inside a More menu instead of showing persistent card actions
Edit opens the existing dedicated Note page with the saved text
Back from edit returns to Library without changing the saved note
Save from edit updates the existing note instead of creating a duplicate
show Editing · Month Day in the Note page header while editing
Empty states:
show the parrot mascot above supportive title and detail copy
adapt the message for empty Library, no results, This week, and selected Date
use warm, encouraging language
show Start a note with a right arrow, or Continue your note when a draft exists
for empty search results, show Clear search instead
hide Start a note when an empty state belongs to a past Date filter
Draft:
persist unfinished new-note text separately under voca_draft
show the draft before saved-note date groups in All and This week, and include it in matching search results
do not show the draft under a specific Date filter
show counts as notes · 1 draft when the draft is visible
use a neutral gray-green #F2F4F3 surface with a dashed peacock-teal border
show Not saved yet above the draft text, plus an outlined Keep editing CTA and Discard draft inside the More menu
Home always shows Start a note and starts the new-note flow
empty Library states always show Start a note; only the Library draft card opens the draft editor
## Bottom Navigation
Only two tabs:
Home
Library
Nav container:
fixed bottom
max-width 480px
horizontal padding 20px
bottom padding includes safe area
Nav pill:
grid with 2 columns
gap 8px
padding 8px
border-radius 32px
border 1px solid rgba(0,140,149,0.10)
background pale mint-gray rgba(234,243,240,0.94)
shadow 0 18px 46px rgba(64,93,91,0.15)
backdrop blur
Selected indicator:
a separate sliding background layer, not the button background
position absolute inside nav pill
top/bottom/left 8px
width calc(50% - 12px)
radius 24px
background #FEFEFE
border 1px solid rgba(0,140,149,0.10)
no shadow; use the white fill and border to show selection
transition transform 300ms ease-out
when Library is active, translate right by calc(100% + 8px)
Tab item:
min-height 64px
icon above label
gap 6px
radius 24px
font 12px regular
active color #008C95
inactive color #61777B
Icons:
28px x 28px
Home: rounded house icon
Library: book icon
active stroke width about 2.35
inactive stroke width about 2.2
Interaction:
clicking Library slides selected indicator to the right
Library icon/text turns green
Home icon/text turns gray
clicking Home slides back
## Assets
Required:
public/lingi-parrot.png
The parrot image must have a transparent background. It should not be contained inside a circular frame on the home card.
## Prototype Scope
This is still a visual prototype.
Do not add:
backend
authentication
real library persistence
review system
onboarding
extra tabs
Mock behavior is enough:
note text lives in local React state
save clears the current note
popup confirms saved state
bottom navigation only changes selected visual state
