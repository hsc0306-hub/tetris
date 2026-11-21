import os, re
p = 'android/app/build.gradle'
s = open(p).read()
s = re.sub(r'versionCode\s+\d+', 'versionCode ' + os.environ.get('GITHUB_RUN_NUMBER', '1'), s, 1)
sc = """signingConfigs {
        release {
            storeFile file(System.getenv("KS_PATH"))
            storePassword System.getenv("KS_PASS")
            keyAlias System.getenv("KS_ALIAS")
            keyPassword System.getenv("KS_KEYPASS")
        }
    }
    buildTypes {"""
assert 'buildTypes {' in s
s = s.replace('buildTypes {', sc, 1)
s2 = re.sub(r'(release\s*\{)(\s*)(minifyEnabled)', r'\1\2signingConfig signingConfigs.release\2\3', s, 1)
assert s2 != s, 'release block not found'
open(p, 'w').write(s2)
print('patched')
