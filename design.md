## Mobile App Frame

Lingi Mobile PWA Design Spec
## Product
Lingi is a mobile-first vocabulary capture PWA for intermediate English learners. The product should feel like a gentle personal language journal with a small companion energy, not a classroom app and not a corporate SaaS product.
The current prototype only needs two features:
Home: quickly type and save something the user wants to remember.
Library: represented in bottom navigation only for now.
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
Use soft Monet-inspired colors with Lingi's primary peacock teal.
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
radial blue glow at top-left
radial yellow glow at top-right
radial green glow near lower-left
cream-to-mint-to-warm gradient
## Typography
Use rounded, friendly system fonts.
Font stack:
Display: "Arial Rounded MT Bold", "Avenir Next", "SF Pro Rounded", ui-rounded, system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif
Body: "Avenir Next", "SF Pro Rounded", ui-rounded, system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", "Noto Sans CJK SC", "Microsoft YaHei", sans-serif
Homepage greeting:
Hi Liz,
30px
extra bold
color #243238
line-height 1
Subheading:
let’s keep today’s words
18px
regular
color #61777B
line-height 24px
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
centered text Lingi
no logo image in the header
24px, extra bold
bottom spacing 30px
Greeting block:
margin-bottom 20px
## Home Daily Note Card
Purpose:
Encourage the user to type anything they want to remember.
The whole card is tappable.
Card:
radius 30px
border 1px solid rgba(255,255,255,0.72)
background rgba(255,253,245,0.78)
padding 20px
shadow 0 26px 58px rgba(64,93,91,0.14)
backdrop blur
height clamp(24rem, calc(100vh - 19.75rem), 34rem)
Parrot:
use transparent parrot PNG
position top-right
56px x 64px
right 16px, top 12px
subtle drop shadow
Inner note area:
margin-top 16px
flex 1
radius 18px
background rgba(221,239,233,0.82)
padding 16px 20px
Interaction:
tapping card opens the writing page
card active state may scale to 0.99
## Writing Page
This is a full-screen mobile page, not a modal overlay.
Outer editor page:
fixed full viewport
max-width 480px
background uses the same soft cream/mint gradient as the product
padding 20px on all sides, respecting safe area
Editor card:
fills available height
rounded 30px
cream translucent background rgba(255,253,245,0.78)
border 1px solid rgba(255,255,255,0.72)
padding 20px
same soft card shadow as home
Top CTA row:
height 48px
3 columns: Back / Date / Save
columns: 72px 1fr 72px
items vertically centered
Back button:
32px x 32px
circular
outline #008C95
background rgba(255,255,255,0.28)
no shadow
icon color #008C95
Save button:
height 32px
radius 12px
horizontal padding 20px
font size 13px
regular
text white
enabled color #008C95
disabled color #B9C8C3
no shadow
disabled until text is entered
Textarea area:
fills remaining height
radius 18px
background rgba(221,239,233,0.82)
padding 20px
textarea has transparent background
textarea can scroll internally for long notes
surrounding cream frame stays fixed
Save motion:
when user taps Save, editor card shrinks and slides to the right
duration 560ms
easing cubic-bezier(0.22, 1, 0.36, 1)
final state: opacity 0, translateX about 58%, scale about 0.42
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
## Bottom Navigation
Only two tabs:
Home
Library
Nav container:
fixed bottom
max-width 480px
horizontal padding 20px
bottom padding includes safe area
Nav glass pill:
grid with 2 columns
gap 8px
padding 8px
border-radius 32px
border 1px solid rgba(255,255,255,0.70)
background gradient: rgba(255,255,255,0.60) to rgba(244,247,238,0.58) to rgba(233,245,248,0.64)
shadow 0 18px 46px rgba(64,93,91,0.15)
backdrop blur
Selected indicator:
a separate sliding background layer, not the button background
position absolute inside nav pill
top/bottom/left 8px
width calc(50% - 12px)
radius 24px
background rgba(255,255,255,0.72)
subtle inset and teal shadow
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

