# Yulux Sign — Frontend Website

Next.js App Router site for Yulux Sign (custom LED neon signs & 3D channel letters), built from the Yulux website development documentation.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Site Structure (27 routes)

| Route | Description |
|-------|-------------|
| `/` | Homepage (9 modules) |
| `/about` | About Us |
| `/products/*` | 4 neon collection PDPs |
| `/custom-neon-signs` | Text customizer + mock pricing |
| `/custom-neon-logo` | Logo inquiry form |
| `/channel-letters-logos` | Channel letters hub |
| `/channel-letters/*` | 6 technique detail pages |
| `/custom-lightbox-signs` | B2B lightbox inquiry |
| `/signage-lab` | Knowledge hub |
| `/signage-lab/*` | 5 pillar articles |
| `/gallery` | Paginated project gallery |
| `/get-a-quote` | Universal quote form |

## Content

Copy lives in `content/*.ts`, sourced from `文案内容以及图片规划.xlsx` and Word implementation docs.

Images from the xlsx are in `public/images/`. Commerce is UI mock only (cart drawer → quote form).



bushu