# Android Keystore Generation Guide

## What is a Keystore?

A keystore is a binary file that contains your private key for signing Android apps. Google Play requires all apps to be signed, and you must use the same keystore for all updates to your app.

**CRITICAL**: Keep your keystore file and passwords safe! If you lose them, you cannot update your app on Google Play.

---

## Step 1: Generate Your Keystore

Open PowerShell or Command Prompt and run:

```powershell
keytool -genkey -v -keystore lambda-release.jks -keyalg RSA -keysize 2048 -validity 10000 -alias lambda-key
```

### What the command does:
- `-genkey`: Creates a new key pair
- `-keystore lambda-release.jks`: Names your keystore file
- `-keyalg RSA`: Uses RSA encryption algorithm
- `-keysize 2048`: 2048-bit key size (secure)
- `-validity 10000`: Key valid for 10,000 days (~27 years)
- `-alias lambda-key`: Alias name to reference this key

### You'll be prompted for:
1. **Keystore password**: Choose a strong password (you'll need this for every release build)
2. **Key password**: Can be the same as keystore password or different
3. **Personal information**: Name, organization, city, state, country (can use realistic values)

**SAVE THESE PASSWORDS SECURELY!** Write them down or use a password manager.

---

## Step 2: Store Keystore Safely

1. **Move the keystore file** to a secure location:
   - Option 1: Keep it in the `android-app/` folder (already in .gitignore)
   - Option 2: Store it outside the project folder entirely (safer)

2. **Back up your keystore** to multiple locations:
   - External hard drive
   - Encrypted cloud storage
   - Password manager vault

---

## Step 3: Configure Gradle Signing

Create a file `android-app/keystore.properties` with this content:

```properties
storeFile=lambda-release.jks
storePassword=YOUR_KEYSTORE_PASSWORD
keyAlias=lambda-key
keyPassword=YOUR_KEY_PASSWORD
```

Replace `YOUR_KEYSTORE_PASSWORD` and `YOUR_KEY_PASSWORD` with your actual passwords.

**This file is already in .gitignore** - it will not be committed to Git.

---

## Step 4: Update build.gradle

The signing configuration is already set up in `app/build.gradle`. It reads from `keystore.properties`:

```gradle
android {
    signingConfigs {
        release {
            // Signing config will be loaded from keystore.properties
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            shrinkResources true
        }
    }
}
```

---

## Step 5: Build Signed Release

Once keystore.properties is configured, run:

```powershell
cd android-app
.\gradlew bundleRelease
```

Your signed AAB will be at:
```
app/build/outputs/bundle/release/app-release.aab
```

---

## Quick Start (Copy-Paste Commands)

```powershell
# 1. Navigate to android-app folder
cd "c:\Users\admin\AppData\Roaming\PrismLauncher\instances\NotPack - Performance\minecraft\iris-articles\android-app"

# 2. Generate keystore (you'll be prompted for passwords)
keytool -genkey -v -keystore lambda-release.jks -keyalg RSA -keysize 2048 -validity 10000 -alias lambda-key

# 3. Create keystore.properties file (edit with your actual passwords)
@"
storeFile=lambda-release.jks
storePassword=YOUR_PASSWORD_HERE
keyAlias=lambda-key
keyPassword=YOUR_PASSWORD_HERE
"@ | Out-File -Encoding UTF8 keystore.properties

# 4. Build signed release
.\gradlew bundleRelease
```

---

## Security Checklist

- [ ] Keystore file backed up to 2+ locations
- [ ] Passwords stored in password manager
- [ ] `keystore.properties` never committed to Git
- [ ] `.gitignore` includes `*.jks`, `*.keystore`, `keystore.properties`
- [ ] Keystore validity is 25+ years

---

## Troubleshooting

**Q: "keytool: command not found"**  
A: keytool comes with Java. Make sure Java JDK is installed and in your PATH.

**Q: Can I use the same keystore for multiple apps?**  
A: No, use a different keystore (or at least different alias) for each app.

**Q: I lost my keystore!**  
A: You cannot update your app on Google Play. You'll need to publish a new app with a different package name.

**Q: Where is keytool located?**  
A: Usually in `C:\Program Files\Java\jdk-XX\bin\keytool.exe` or `C:\Program Files\Android\Android Studio\jre\bin\keytool.exe`
