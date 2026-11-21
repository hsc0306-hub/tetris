GitHub 저장소에 www, icons, package.json, capacitor.config.json, .github/workflows/build.yml 을 올리고
Actions > Build APK > Run workflow 후 Artifacts 의 tetris-apk 를 받아 설치하세요.


===== 구글 플레이 출시 (추가) =====
1) 업로드 키 만들기 (PC에서 1회, Java 필요):
   keytool -genkeypair -v -keystore upload.jks -alias upload -keyalg RSA -keysize 2048 -validity 10000
   base64 -w0 upload.jks   (출력값을 복사)
2) GitHub 저장소 Settings > Secrets and variables > Actions 에 등록:
   KEYSTORE_BASE64, KEYSTORE_PASSWORD, KEY_ALIAS(upload), KEY_PASSWORD
   * upload.jks 와 비밀번호는 절대 저장소에 올리지 마세요.
3) Actions > Release AAB > Run workflow -> tetris-aab 아티팩트(app-release.aab)를 Play Console에 업로드
   (versionCode는 실행 번호로 자동 증가)
4) Supabase SQL Editor에서 supabase_delete_account.sql 실행 (회원 탈퇴 기능)
5) www/privacy.html, delete-account.html 의 문의 이메일 수정 -> GitHub Pages 주소/privacy.html 을
   Play Console 개인정보처리방침 URL, /delete-account.html 을 계정 삭제 URL에 입력
* Capacitor 8(API 36)로 올렸으며, 이 환경에서는 실제 빌드를 못 해봤습니다. 첫 Actions 로그를 확인해 주세요.
6) Supabase SQL Editor에서 supabase_chat_reports.sql 도 실행 (채팅 신고 저장. 신고는 Table Editor > chat_reports 에서 확인하고 직접 조치)
7) 싱글 랭킹: Supabase SQL Editor에서 supabase_solo_ranking.sql 의 1번 조회만 먼저 실행해 result 제약이 있는지 확인 (없으면 끝)
