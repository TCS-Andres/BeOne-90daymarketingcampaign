# Build Your AI-Powered 90-Day Marketing Campaign for the Holidays

The participant resource hub for the Branches B1 workshop, facilitated by The Creative Strategist.

This page is the running order for the whole day. Participants work down it in order. Each module asks
them a set of questions, then hands them a prompt to paste into Claude.

## The five modules

| Module | What it produces |
|---|---|
| 00 Start Here | Claude Project created, Master Brain loaded, folders made |
| 00b No Master Brain Yet? | Optional. The 20-question Master Brain build, for anyone without one |
| 01 Who Are You Selling To? | Q4 Customer Report |
| 02 When Will You Sell? | Q4 Moment Map, three to five chosen dates |
| 03 What's the Offer? | Goal, offer and the one message for all 90 days |
| 04 Build It | Full Thanksgiving campaign plus the dated calendar to Dec 31 |
| 05 Your Next Steps | The checklist for the week |

## How the prompts work

Each module's answers are saved to `localStorage` on the participant's own device. "Copy my prompt"
fetches that module's prompt from `/public/files/`, injects the participant's answers into its `## INPUT`
section, and copies the whole thing. "Download my answers (PDF)" is the fallback for when clipboard
access is blocked.

All four prompts are designed to run inside one Claude Project so each module's output becomes context
for the next. Participants never paste their Master Brain more than once.

## Local development

```bash
npm install
npm run dev
```

Do not run `npm run build` while `npm run dev` is running. They share `.next` and will clobber each other.

## Editing content

All questions, options, holiday info text, "Stuck?" panels and tool links live in `app/lib/modules.ts`.
The downloadable prompts and questionnaires live in `public/files/`. Changing a question in
`modules.ts` does not change the matching `.md` file, so update both if the print version needs to match.

## Stack

Next.js 14 App Router, TypeScript, Tailwind. Client-side only, no backend and no API keys.
Deploys to Vercel as a static export.

---

The Creative Strategist · A Branches B1 Program
