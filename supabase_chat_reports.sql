-- Supabase > SQL Editor 에서 한 번 실행 (채팅 신고 저장)
create table if not exists public.chat_reports(
  id bigserial primary key,
  reporter_id uuid not null references auth.users(id) on delete cascade,
  reported_name text not null,
  message text,
  created_at timestamptz default now()
);
alter table public.chat_reports enable row level security;
create policy "insert own report" on public.chat_reports
  for insert to authenticated with check (reporter_id = auth.uid());
-- 조회는 Supabase 대시보드(Table Editor)에서만 가능 (일반 사용자 select 정책 없음)
