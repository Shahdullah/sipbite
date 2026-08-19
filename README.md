# Sip N Bite

Material 3-inspired Expo Android app for the Sip N Bite restaurant pilot.

## Current pilot flow

- Customer menu for Table 04 with searchable category-style browsing
- Cart with Cash / UPI choice and a clearly disclosed configurable 2% service fee
- Local order persistence and live order status timeline
- Manager preview for order progression and menu availability
- Chef preview with a touch-friendly kitchen queue
- Generated Android app icon and food photography

## Run

```bash
npm install
npx expo start
```

## Build an APK

Pushes to `main` and manual workflow runs build a release APK through GitHub Actions. The APK is available in the workflow run's `sip-n-bite-apk` artifact.

This first release intentionally keeps the demo data local. The backend contract, tenant isolation, verified payment webhooks, and production authentication should be added before real-money pilot use.