# Ocus Focus

A focused work-and-break timer built with HTML, CSS and vanilla JavaScript.

## Project structure

- `web/` — application interface and browser favicon
- `src-tauri/` — Tauri 2 desktop configuration and icon assets
- `capacitor.config.json` — Capacitor configuration for Android
- `.github/workflows/` — desktop and Android build workflows

## Desktop builds

Install the prerequisites for [Tauri 2](https://v2.tauri.app/start/prerequisites/), then:

```bash
npm install
npm run desktop:build
```

The configured desktop bundle targets are Windows NSIS installer, Linux AppImage and DEB, and macOS DMG.

## Android

Install Android Studio and the Android SDK, then:

```bash
npm install
npx cap add android
npm run mobile:sync
npx cap open android
```

Build an APK from Android Studio or with Gradle. The GitHub Actions workflow is intended to build an Android debug APK.

## App icons

The supplied Ocus Focus artwork is used for the desktop bundle icons and browser favicon. The original artwork is retained in `web/focus.jpg`; generated icon sizes are in `src-tauri/icons/`.

Android launcher resources still need to be generated/applied when the native Android project is created. iOS packaging is intentionally postponed.

## Notes

- The application uses vanilla JavaScript; no React is used.
- Timer behavior has not intentionally been changed as part of packaging.
- Build outputs have not yet been validated on each target operating system.
