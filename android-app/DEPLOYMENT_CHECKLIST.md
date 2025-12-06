# Google Play Deployment Checklist

## Pre-Deployment

### Code & Build
- [x] Version code incremented in `app/build.gradle`
- [x] Version name updated (semantic versioning)
- [x] ProGuard rules configured
- [x] Network security config added
- [x] Release build type configured with minification
- [ ] Generate release keystore (one-time)
- [ ] Configure signing in `build.gradle`
- [ ] Test release build locally
- [ ] Verify ProGuard doesn't break functionality

### Assets & Resources
- [x] App icon (`ic_launcher`) properly configured
- [x] App name finalized ("lambda")
- [ ] Create phone screenshots (minimum 2, up to 8)
- [ ] Create 7-inch tablet screenshots (optional)
- [ ] Create 10-inch tablet screenshots (optional)
- [ ] Create feature graphic (1024x500px)
- [ ] Create promo graphic (180x120px, optional)
- [ ] Prepare app icon for Play Store (512x512px PNG)

### Legal & Compliance
- [x] Privacy policy created
- [ ] Host privacy policy on public URL
- [ ] Prepare short description (80 chars max)
- [ ] Prepare full description (4000 chars max)
- [ ] Complete content rating questionnaire
- [ ] Review Google Play policies compliance

## Build Commands

### Generate Keystore (First Time Only)
```bash
keytool -genkey -v -keystore lambda-release.jks -keyalg RSA -keysize 2048 -validity 10000 -alias lambda-key
```

### Build Release Bundle (for Google Play)
```bash
cd android-app
./gradlew bundleRelease
```
Output: `app/build/outputs/bundle/release/app-release.aab`

### Build Release APK (for direct distribution)
```bash
./gradlew assembleRelease
```
Output: `app/build/outputs/apk/release/app-release.apk`

## Google Play Console Setup

### Store Listing
- [ ] App name: "lambda"
- [ ] Short description (80 chars)
- [ ] Full description
- [ ] Screenshots uploaded
- [ ] Feature graphic uploaded
- [ ] Application type: App
- [ ] Category: News & Magazines (or appropriate)
- [ ] Tags (up to 5)
- [ ] Contact details (email, website, phone optional)
- [ ] Privacy policy URL

### Content Rating
- [ ] Complete IARC questionnaire
- [ ] Verify ratings for all regions
- [ ] Update if content changes significantly

### App Content
- [ ] Privacy policy declaration
- [ ] Ads declaration (none)
- [ ] Target audience (appropriate age range)
- [ ] App access (no special access needed)
- [ ] News app declaration (if applicable)

### Pricing & Distribution
- [ ] Free or Paid
- [ ] Countries for distribution
- [ ] Content guidelines acceptance
- [ ] US export laws compliance

### Release
- [ ] Production track (or Internal/Beta for testing)
- [ ] Upload AAB file
- [ ] Release name and notes
- [ ] Staged rollout percentage (optional)
- [ ] Review and publish

## Testing Checklist

### Functionality
- [ ] App launches successfully
- [ ] Articles load from network
- [ ] Offline cache works
- [ ] Search filters work (tags:, category:)
- [ ] Article detail pages render
- [ ] Pull-to-refresh updates articles
- [ ] About page displays correctly
- [ ] Changelog page displays correctly
- [ ] Navigation works (back buttons)

### Performance
- [ ] No ANR (Application Not Responding) errors
- [ ] Smooth scrolling
- [ ] Fast article loading
- [ ] No memory leaks

### Compatibility
- [ ] Test on Android 7.0 (API 24) minimum
- [ ] Test on latest Android version
- [ ] Test on different screen sizes
- [ ] Test on different device manufacturers

## Post-Deployment

- [ ] Monitor crash reports in Play Console
- [ ] Respond to user reviews
- [ ] Track installation metrics
- [ ] Plan updates based on feedback

## Version History

| Version | Version Code | Release Date | Notes |
|---------|--------------|--------------|-------|
| 1.0.0   | 1            | TBD          | Initial release |

## Notes

- Keystore password: [KEEP SECURE - DO NOT COMMIT]
- Key alias: lambda-key
- Store keystore in secure location (not in Git!)
- Enable Google Play App Signing for additional security
- Consider beta testing with small group first
