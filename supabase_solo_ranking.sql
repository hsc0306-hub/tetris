-- 싱글 랭킹용: game_scores.result 에 'solo' 값을 저장할 수 있어야 합니다.
-- result 컬럼에 값 제한(check constraint)이 있다면 아래 중 해당되는 것만 실행하세요.

-- 1) 제약 이름 확인
select conname, pg_get_constraintdef(oid)
from pg_constraint
where conrelid = 'public.game_scores'::regclass and contype = 'c';

-- 2) 위 결과에 result 관련 제약이 있으면 (이름을 바꿔서) 삭제 후 재생성
-- alter table public.game_scores drop constraint 제약이름;
-- alter table public.game_scores add constraint game_scores_result_check
--   check (result in ('win','loss','draw','solo'));
-- (아무 제약도 안 나오면 아무것도 하지 않아도 됩니다)
