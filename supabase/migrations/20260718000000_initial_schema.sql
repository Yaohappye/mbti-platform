-- Initial PostgreSQL schema for the MBTI platform.
-- Designed for Supabase PostgreSQL, but uses standard PostgreSQL features
-- except for the optional service_role grants at the end.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.app_users (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  phone varchar(32) unique,
  display_name varchar(100),
  password_hash text,
  status varchar(20) not null default 'active'
    check (status in ('active', 'disabled', 'deleted')),
  profile jsonb not null default '{}'::jsonb,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.platform_admins (
  id uuid primary key default gen_random_uuid(),
  username varchar(80) not null unique,
  password_hash text not null,
  display_name varchar(100),
  email text,
  status varchar(20) not null default 'active'
    check (status in ('active', 'disabled')),
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.enterprise_applications (
  id uuid primary key default gen_random_uuid(),
  enterprise_name varchar(160) not null,
  enterprise_short_name varchar(80),
  contact_name varchar(100),
  contact_phone varchar(32) not null,
  requested_admin_account varchar(80) not null,
  requested_password_hash text not null,
  status varchar(24) not null default 'approved'
    check (status in ('pending_review', 'approved', 'rejected', 'cancelled')),
  review_note text,
  reviewed_by uuid references public.platform_admins(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.enterprises (
  id uuid primary key default gen_random_uuid(),
  code varchar(8) not null unique
    check (code ~ '^(?=.*[A-Z])(?=.*[0-9])[A-Z0-9]{8}$'),
  name varchar(160) not null,
  short_name varchar(80),
  contact_name varchar(100),
  contact_phone varchar(32),
  avatar_url text,
  status varchar(20) not null default 'active'
    check (status in ('active', 'disabled', 'expired')),
  credits bigint not null default 0 check (credits >= 0),
  expiry_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  application_id uuid references public.enterprise_applications(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.enterprise_admins (
  id uuid primary key default gen_random_uuid(),
  enterprise_id uuid not null references public.enterprises(id) on delete cascade,
  username varchar(80) not null unique,
  password_hash text not null,
  display_name varchar(100),
  phone varchar(32),
  role varchar(24) not null default 'owner'
    check (role in ('owner', 'admin', 'analyst')),
  status varchar(20) not null default 'active'
    check (status in ('active', 'disabled')),
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (enterprise_id, id)
);

create table if not exists public.admin_sessions (
  id uuid primary key default gen_random_uuid(),
  token_hash char(64) not null unique,
  admin_type varchar(20) not null check (admin_type in ('platform', 'enterprise')),
  admin_id uuid not null,
  enterprise_id uuid references public.enterprises(id) on delete cascade,
  ip_address inet,
  user_agent text,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.enterprise_employees (
  id uuid primary key default gen_random_uuid(),
  enterprise_id uuid not null references public.enterprises(id) on delete cascade,
  external_key varchar(160),
  employee_no varchar(80),
  name varchar(100) not null,
  department varchar(120) not null,
  phone varchar(32),
  email text,
  gender varchar(20) default 'unspecified'
    check (gender in ('male', 'female', 'unspecified')),
  status varchar(20) not null default 'active'
    check (status in ('active', 'disabled', 'left')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index if not exists enterprise_employees_external_key_idx
on public.enterprise_employees(enterprise_id, external_key)
where external_key is not null;

create table if not exists public.enterprise_test_groups (
  id uuid primary key default gen_random_uuid(),
  enterprise_id uuid not null references public.enterprises(id) on delete cascade,
  group_code varchar(8) not null,
  name varchar(160) not null,
  note text,
  test_type_id varchar(40) not null default 'MBTI',
  bank_id varchar(40) not null,
  result_visibility varchar(20) not null default 'summary'
    check (result_visibility in ('hidden', 'summary', 'full')),
  status varchar(20) not null default 'active'
    check (status in ('active', 'archived')),
  created_by uuid references public.enterprise_admins(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (enterprise_id, group_code)
);

create table if not exists public.activation_codes (
  id uuid primary key default gen_random_uuid(),
  code varchar(8) not null unique,
  scope varchar(20) not null check (scope in ('personal', 'enterprise')),
  kind varchar(24) not null default 'single'
    check (kind in ('single', 'ten', 'enterprise')),
  label varchar(120),
  enterprise_id uuid references public.enterprises(id) on delete cascade,
  group_id uuid references public.enterprise_test_groups(id) on delete cascade,
  status varchar(20) not null default 'active'
    check (status in ('active', 'claimed', 'completed', 'used', 'voided', 'expired')),
  total_uses integer not null default 1 check (total_uses > 0),
  remaining_uses integer not null default 1 check (remaining_uses >= 0),
  points_cost integer not null default 0 check (points_cost >= 0),
  claimed_by_employee_id uuid references public.enterprise_employees(id) on delete set null,
  claimed_session_id uuid,
  claimed_at timestamptz,
  completed_at timestamptz,
  expires_at timestamptz,
  created_by_type varchar(20) check (created_by_type in ('platform', 'enterprise', 'system')),
  created_by_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    (scope = 'personal' and enterprise_id is null and group_id is null)
    or
    (scope = 'enterprise' and enterprise_id is not null and group_id is not null)
  )
);

create table if not exists public.test_sessions (
  id uuid primary key default gen_random_uuid(),
  access_key varchar(96) not null unique,
  user_id uuid references public.app_users(id) on delete set null,
  enterprise_id uuid references public.enterprises(id) on delete set null,
  employee_id uuid references public.enterprise_employees(id) on delete set null,
  group_id uuid references public.enterprise_test_groups(id) on delete set null,
  activation_code_id uuid references public.activation_codes(id) on delete set null,
  test_type_id varchar(40) not null default 'MBTI',
  bank_id varchar(40) not null,
  mode varchar(20) not null default 'personal'
    check (mode in ('personal', 'enterprise')),
  gender varchar(20) default 'unspecified'
    check (gender in ('male', 'female', 'unspecified')),
  status varchar(24) not null default 'created'
    check (status in ('created', 'verified', 'claimed', 'in_progress', 'completed', 'abandoned')),
  result_visibility varchar(20) not null default 'full'
    check (result_visibility in ('hidden', 'summary', 'full')),
  started_at timestamptz,
  completed_at timestamptz,
  duration_seconds integer check (duration_seconds is null or duration_seconds >= 0),
  ip_address inet,
  user_agent text,
  client_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.activation_codes
  drop constraint if exists activation_codes_claimed_session_id_fkey;
alter table public.activation_codes
  add constraint activation_codes_claimed_session_id_fkey
  foreign key (claimed_session_id) references public.test_sessions(id) on delete set null;

create table if not exists public.activation_code_events (
  id uuid primary key default gen_random_uuid(),
  source_key varchar(200) unique,
  activation_code_id uuid not null references public.activation_codes(id) on delete cascade,
  session_id uuid references public.test_sessions(id) on delete set null,
  enterprise_id uuid references public.enterprises(id) on delete set null,
  employee_id uuid references public.enterprise_employees(id) on delete set null,
  event_type varchar(24) not null
    check (event_type in ('created', 'verified', 'consumed', 'claimed', 'completed', 'voided', 'expired', 'recharged')),
  before_remaining_uses integer,
  after_remaining_uses integer,
  ip_address inet,
  user_agent text,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.test_answers (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.test_sessions(id) on delete cascade,
  question_id integer not null,
  answer_value smallint not null check (answer_value between 1 and 5),
  dimension varchar(2) check (dimension in ('EI', 'SN', 'TF', 'JP')),
  reverse_scored boolean,
  normalized_score smallint check (normalized_score between 1 and 5),
  answered_at timestamptz not null default now(),
  unique (session_id, question_id)
);

create table if not exists public.mbti_results (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null unique references public.test_sessions(id) on delete cascade,
  mbti_type varchar(4) not null check (mbti_type ~ '^[EI][SN][TF][JP]$'),
  ei_score smallint not null check (ei_score between 0 and 100),
  sn_score smallint not null check (sn_score between 0 and 100),
  tf_score smallint not null check (tf_score between 0 and 100),
  jp_score smallint not null check (jp_score between 0 and 100),
  dimension_scores jsonb not null default '{}'::jsonb,
  report jsonb not null default '{}'::jsonb,
  report_version varchar(40) not null default '1',
  calculation_version varchar(40) not null default 'likert-v1',
  created_at timestamptz not null default now()
);

create table if not exists public.enterprise_recharge_codes (
  id uuid primary key default gen_random_uuid(),
  code varchar(12) not null unique,
  points bigint not null check (points > 0),
  status varchar(20) not null default 'unused'
    check (status in ('unused', 'used', 'voided', 'expired')),
  bound_enterprise_id uuid references public.enterprises(id) on delete set null,
  redeemed_by_admin_id uuid references public.enterprise_admins(id) on delete set null,
  created_by uuid references public.platform_admins(id) on delete set null,
  expires_at timestamptz,
  used_at timestamptz,
  voided_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.enterprise_recharge_code_events (
  id uuid primary key default gen_random_uuid(),
  recharge_code_id uuid not null references public.enterprise_recharge_codes(id) on delete cascade,
  enterprise_id uuid references public.enterprises(id) on delete set null,
  admin_type varchar(20) check (admin_type in ('platform', 'enterprise', 'system')),
  admin_id uuid,
  event_type varchar(24) not null
    check (event_type in ('created', 'redeemed', 'voided', 'expired')),
  balance_before bigint,
  balance_after bigint,
  ip_address inet,
  user_agent text,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.enterprise_credit_ledger (
  id uuid primary key default gen_random_uuid(),
  enterprise_id uuid not null references public.enterprises(id) on delete cascade,
  amount bigint not null check (amount <> 0),
  balance_after bigint not null check (balance_after >= 0),
  entry_type varchar(24) not null
    check (entry_type in ('recharge', 'activation_code', 'refund', 'adjustment', 'migration')),
  reference_type varchar(40),
  reference_id uuid,
  note text,
  operated_by_type varchar(20) check (operated_by_type in ('platform', 'enterprise', 'system')),
  operated_by_id uuid,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_operation_logs (
  id uuid primary key default gen_random_uuid(),
  admin_type varchar(20) not null check (admin_type in ('platform', 'enterprise', 'system')),
  admin_id uuid,
  enterprise_id uuid references public.enterprises(id) on delete set null,
  operation varchar(80) not null,
  target_type varchar(80),
  target_id text,
  details jsonb not null default '{}'::jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists app_users_status_idx on public.app_users(status);
create index if not exists enterprises_status_idx on public.enterprises(status);
create index if not exists enterprise_admins_enterprise_idx on public.enterprise_admins(enterprise_id);
create index if not exists admin_sessions_lookup_idx on public.admin_sessions(token_hash, expires_at) where revoked_at is null;
create index if not exists enterprise_employees_enterprise_idx on public.enterprise_employees(enterprise_id);
create index if not exists enterprise_employees_department_idx on public.enterprise_employees(enterprise_id, department);
create index if not exists enterprise_groups_enterprise_idx on public.enterprise_test_groups(enterprise_id, created_at desc);
create index if not exists activation_codes_enterprise_idx on public.activation_codes(enterprise_id, group_id, created_at desc);
create index if not exists activation_codes_status_idx on public.activation_codes(status, expires_at);
create index if not exists activation_events_code_idx on public.activation_code_events(activation_code_id, created_at desc);
create index if not exists test_sessions_enterprise_idx on public.test_sessions(enterprise_id, created_at desc);
create index if not exists test_sessions_employee_idx on public.test_sessions(employee_id, created_at desc);
create index if not exists test_sessions_status_idx on public.test_sessions(status, created_at desc);
create index if not exists test_answers_session_idx on public.test_answers(session_id, question_id);
create index if not exists mbti_results_type_idx on public.mbti_results(mbti_type, created_at desc);
create index if not exists recharge_codes_status_idx on public.enterprise_recharge_codes(status, created_at desc);
create index if not exists recharge_codes_enterprise_idx on public.enterprise_recharge_codes(bound_enterprise_id, used_at desc);
create index if not exists recharge_code_events_idx on public.enterprise_recharge_code_events(recharge_code_id, created_at desc);
create index if not exists credit_ledger_enterprise_idx on public.enterprise_credit_ledger(enterprise_id, created_at desc);
create index if not exists admin_logs_actor_idx on public.admin_operation_logs(admin_type, admin_id, created_at desc);

create trigger app_users_set_updated_at before update on public.app_users
for each row execute function public.set_updated_at();
create trigger platform_admins_set_updated_at before update on public.platform_admins
for each row execute function public.set_updated_at();
create trigger enterprise_applications_set_updated_at before update on public.enterprise_applications
for each row execute function public.set_updated_at();
create trigger enterprises_set_updated_at before update on public.enterprises
for each row execute function public.set_updated_at();
create trigger enterprise_admins_set_updated_at before update on public.enterprise_admins
for each row execute function public.set_updated_at();
create trigger enterprise_employees_set_updated_at before update on public.enterprise_employees
for each row execute function public.set_updated_at();
create trigger enterprise_groups_set_updated_at before update on public.enterprise_test_groups
for each row execute function public.set_updated_at();
create trigger activation_codes_set_updated_at before update on public.activation_codes
for each row execute function public.set_updated_at();
create trigger enterprise_recharge_codes_set_updated_at before update on public.enterprise_recharge_codes
for each row execute function public.set_updated_at();
create trigger test_sessions_set_updated_at before update on public.test_sessions
for each row execute function public.set_updated_at();

-- Atomically verifies/consumes a personal activation code or describes an
-- enterprise code. The API calls this before starting a test session.
create or replace function public.consume_activation_code(
  p_code text,
  p_access_key text,
  p_ip inet default null,
  p_user_agent text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_code activation_codes%rowtype;
  v_session test_sessions%rowtype;
  v_group enterprise_test_groups%rowtype;
  v_enterprise enterprises%rowtype;
  v_before integer;
begin
  select * into v_code
  from activation_codes
  where code = upper(trim(p_code))
  for update;

  if not found then
    raise exception 'ACTIVATION_CODE_NOT_FOUND';
  end if;

  if v_code.expires_at is not null and v_code.expires_at <= now() then
    update activation_codes set status = 'expired' where id = v_code.id;
    raise exception 'ACTIVATION_CODE_EXPIRED';
  end if;

  if v_code.scope = 'personal' then
    if v_code.status not in ('active') or v_code.remaining_uses <= 0 then
      raise exception 'ACTIVATION_CODE_UNAVAILABLE';
    end if;

    v_before := v_code.remaining_uses;

    insert into test_sessions (
      access_key, activation_code_id, bank_id, mode, status,
      result_visibility, started_at, ip_address, user_agent
    ) values (
      p_access_key, v_code.id,
      coalesce(v_code.metadata->>'bank_id', 'MBTI60'),
      'personal', 'verified', 'full', now(), p_ip, p_user_agent
    )
    on conflict (access_key) do update set
      activation_code_id = excluded.activation_code_id,
      status = 'verified',
      started_at = coalesce(test_sessions.started_at, excluded.started_at),
      ip_address = coalesce(test_sessions.ip_address, excluded.ip_address),
      user_agent = coalesce(test_sessions.user_agent, excluded.user_agent)
    returning * into v_session;

    update activation_codes set
      remaining_uses = remaining_uses - 1,
      status = case when remaining_uses - 1 <= 0 then 'used' else 'active' end
    where id = v_code.id
    returning * into v_code;

    insert into activation_code_events (
      activation_code_id, session_id, event_type,
      before_remaining_uses, after_remaining_uses, ip_address, user_agent
    ) values (
      v_code.id, v_session.id, 'consumed',
      v_before, v_code.remaining_uses, p_ip, p_user_agent
    );

    return jsonb_build_object(
      'scope', v_code.scope,
      'kind', v_code.kind,
      'accessKey', v_session.access_key,
      'remainingUses', v_code.remaining_uses,
      'bankId', v_session.bank_id
    );
  end if;

  if v_code.status <> 'active' then
    raise exception 'ACTIVATION_CODE_UNAVAILABLE';
  end if;

  select * into v_group from enterprise_test_groups where id = v_code.group_id;
  select * into v_enterprise from enterprises where id = v_code.enterprise_id;

  if v_group.status <> 'active' or v_enterprise.status <> 'active' then
    raise exception 'ENTERPRISE_OR_GROUP_UNAVAILABLE';
  end if;

  insert into test_sessions (
    access_key, enterprise_id, group_id, activation_code_id,
    test_type_id, bank_id, mode, status, result_visibility,
    ip_address, user_agent
  ) values (
    p_access_key, v_enterprise.id, v_group.id, v_code.id,
    v_group.test_type_id, v_group.bank_id, 'enterprise', 'verified',
    v_group.result_visibility, p_ip, p_user_agent
  )
  on conflict (access_key) do update set
    enterprise_id = excluded.enterprise_id,
    group_id = excluded.group_id,
    activation_code_id = excluded.activation_code_id,
    test_type_id = excluded.test_type_id,
    bank_id = excluded.bank_id,
    mode = 'enterprise',
    status = 'verified',
    result_visibility = excluded.result_visibility
  returning * into v_session;

  insert into activation_code_events (
    activation_code_id, session_id, enterprise_id, event_type, ip_address, user_agent
  ) values (v_code.id, v_session.id, v_enterprise.id, 'verified', p_ip, p_user_agent);

  return jsonb_build_object(
    'scope', 'enterprise',
    'accessKey', v_session.access_key,
    'enterpriseId', v_enterprise.id,
    'enterpriseCode', v_enterprise.code,
    'enterpriseName', v_enterprise.name,
    'groupId', v_group.id,
    'groupCode', v_group.group_code,
    'groupName', v_group.name,
    'groupNote', coalesce(v_group.note, ''),
    'testTypeId', v_group.test_type_id,
    'bankId', v_group.bank_id,
    'resultVisibility', v_group.result_visibility
  );
end;
$$;

-- Atomically binds an enterprise activation code to an employee and session.
create or replace function public.claim_enterprise_activation_code(
  p_code text,
  p_access_key text,
  p_enterprise_id uuid,
  p_group_id uuid,
  p_employee_name text,
  p_department text,
  p_phone text default null,
  p_gender text default 'unspecified',
  p_ip inet default null,
  p_user_agent text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_code activation_codes%rowtype;
  v_session test_sessions%rowtype;
  v_employee enterprise_employees%rowtype;
begin
  select * into v_code from activation_codes
  where code = upper(trim(p_code))
    and scope = 'enterprise'
    and enterprise_id = p_enterprise_id
    and group_id = p_group_id
  for update;

  if not found then raise exception 'ACTIVATION_CODE_NOT_FOUND'; end if;
  if v_code.status <> 'active' then raise exception 'ACTIVATION_CODE_UNAVAILABLE'; end if;

  select * into v_session from test_sessions
  where access_key = p_access_key and activation_code_id = v_code.id
  for update;
  if not found then raise exception 'TEST_SESSION_NOT_FOUND'; end if;

  insert into enterprise_employees (enterprise_id, name, department, phone, gender)
  values (
    p_enterprise_id, trim(p_employee_name), trim(p_department),
    nullif(trim(coalesce(p_phone, '')), ''),
    case when p_gender in ('male', 'female') then p_gender else 'unspecified' end
  ) returning * into v_employee;

  update test_sessions set
    employee_id = v_employee.id,
    status = 'in_progress',
    gender = v_employee.gender,
    started_at = coalesce(started_at, now()),
    ip_address = coalesce(ip_address, p_ip),
    user_agent = coalesce(user_agent, p_user_agent)
  where id = v_session.id
  returning * into v_session;

  update activation_codes set
    status = 'claimed',
    claimed_by_employee_id = v_employee.id,
    claimed_session_id = v_session.id,
    claimed_at = now()
  where id = v_code.id;

  insert into activation_code_events (
    activation_code_id, session_id, enterprise_id, employee_id,
    event_type, ip_address, user_agent
  ) values (
    v_code.id, v_session.id, p_enterprise_id, v_employee.id,
    'claimed', p_ip, p_user_agent
  );

  return jsonb_build_object(
    'sessionId', v_session.id,
    'accessKey', v_session.access_key,
    'employeeId', v_employee.id,
    'startedAt', v_session.started_at,
    'claimedAt', now()
  );
end;
$$;

-- Generates one enterprise activation code and deducts credits atomically.
create or replace function public.create_enterprise_activation_code(
  p_enterprise_id uuid,
  p_group_id uuid,
  p_code text,
  p_points_cost integer,
  p_admin_id uuid default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_enterprise enterprises%rowtype;
  v_code activation_codes%rowtype;
begin
  select * into v_enterprise from enterprises where id = p_enterprise_id for update;
  if not found or v_enterprise.status <> 'active' then
    raise exception 'ENTERPRISE_UNAVAILABLE';
  end if;
  if v_enterprise.credits < p_points_cost then
    raise exception 'INSUFFICIENT_CREDITS';
  end if;
  if not exists (
    select 1 from enterprise_test_groups
    where id = p_group_id and enterprise_id = p_enterprise_id and status = 'active'
  ) then
    raise exception 'GROUP_NOT_FOUND';
  end if;

  insert into activation_codes (
    code, scope, kind, enterprise_id, group_id, points_cost,
    total_uses, remaining_uses, created_by_type, created_by_id
  ) values (
    upper(trim(p_code)), 'enterprise', 'enterprise', p_enterprise_id,
    p_group_id, p_points_cost, 1, 1, 'enterprise', p_admin_id
  ) returning * into v_code;

  update enterprises set credits = credits - p_points_cost
  where id = p_enterprise_id returning * into v_enterprise;

  insert into enterprise_credit_ledger (
    enterprise_id, amount, balance_after, entry_type,
    reference_type, reference_id, note, operated_by_type, operated_by_id
  ) values (
    p_enterprise_id, -p_points_cost, v_enterprise.credits, 'activation_code',
    'activation_code', v_code.id, '生成企业测评激活码', 'enterprise', p_admin_id
  );

  insert into activation_code_events (
    activation_code_id, enterprise_id, event_type,
    before_remaining_uses, after_remaining_uses
  ) values (v_code.id, p_enterprise_id, 'created', 1, 1);

  return jsonb_build_object(
    'id', v_code.id,
    'code', v_code.code,
    'status', v_code.status,
    'createdAt', v_code.created_at,
    'pointsCost', v_code.points_cost,
    'credits', v_enterprise.credits
  );
end;
$$;

-- Registers an enterprise, its application record and owner account in one
-- PostgreSQL transaction.
create or replace function public.register_enterprise(
  p_code text,
  p_enterprise_name text,
  p_short_name text,
  p_phone text,
  p_admin_username text,
  p_password_hash text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_application enterprise_applications%rowtype;
  v_enterprise enterprises%rowtype;
  v_admin enterprise_admins%rowtype;
begin
  if exists (
    select 1 from enterprise_admins where lower(username) = lower(trim(p_admin_username))
  ) then
    raise exception 'ENTERPRISE_USERNAME_EXISTS';
  end if;

  insert into enterprise_applications (
    enterprise_name, enterprise_short_name, contact_phone,
    requested_admin_account, requested_password_hash,
    status, reviewed_at
  ) values (
    trim(p_enterprise_name), nullif(trim(coalesce(p_short_name, '')), ''),
    trim(p_phone), trim(p_admin_username), p_password_hash,
    'approved', now()
  ) returning * into v_application;

  insert into enterprises (
    code, name, short_name, contact_phone, application_id
  ) values (
    upper(trim(p_code)), trim(p_enterprise_name),
    nullif(trim(coalesce(p_short_name, '')), ''), trim(p_phone), v_application.id
  ) returning * into v_enterprise;

  insert into enterprise_admins (
    enterprise_id, username, password_hash, display_name, phone, role
  ) values (
    v_enterprise.id, trim(p_admin_username), p_password_hash,
    trim(p_enterprise_name), trim(p_phone), 'owner'
  ) returning * into v_admin;

  insert into admin_operation_logs (
    admin_type, admin_id, enterprise_id, operation,
    target_type, target_id, details
  ) values (
    'enterprise', v_admin.id, v_enterprise.id, 'register_enterprise',
    'enterprise', v_enterprise.id::text,
    jsonb_build_object('applicationId', v_application.id)
  );

  return jsonb_build_object(
    'enterpriseId', v_enterprise.id,
    'enterpriseCode', v_enterprise.code,
    'enterpriseName', v_enterprise.name,
    'enterpriseShortName', v_enterprise.short_name,
    'adminId', v_admin.id,
    'adminAccount', v_admin.username,
    'credits', v_enterprise.credits,
    'status', v_enterprise.status,
    'createdAt', v_enterprise.created_at
  );
end;
$$;

create or replace function public.adjust_enterprise_credits(
  p_enterprise_id uuid,
  p_amount bigint,
  p_note text,
  p_admin_id uuid
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_enterprise enterprises%rowtype;
  v_entry enterprise_credit_ledger%rowtype;
begin
  if p_amount = 0 then raise exception 'INVALID_CREDIT_AMOUNT'; end if;
  select * into v_enterprise from enterprises where id = p_enterprise_id for update;
  if not found then raise exception 'ENTERPRISE_NOT_FOUND'; end if;
  if v_enterprise.credits + p_amount < 0 then raise exception 'INSUFFICIENT_CREDITS'; end if;

  update enterprises set credits = credits + p_amount
  where id = p_enterprise_id returning * into v_enterprise;

  insert into enterprise_credit_ledger (
    enterprise_id, amount, balance_after, entry_type,
    reference_type, note, operated_by_type, operated_by_id
  ) values (
    p_enterprise_id, p_amount, v_enterprise.credits,
    case when p_amount > 0 then 'recharge' else 'adjustment' end,
    'platform_adjustment', nullif(trim(coalesce(p_note, '')), ''),
    'platform', p_admin_id
  ) returning * into v_entry;

  return jsonb_build_object(
    'enterpriseId', v_enterprise.id,
    'credits', v_enterprise.credits,
    'ledgerId', v_entry.id,
    'amount', v_entry.amount,
    'createdAt', v_entry.created_at
  );
end;
$$;

create or replace function public.redeem_enterprise_recharge_code(
  p_enterprise_id uuid,
  p_admin_id uuid,
  p_code text,
  p_ip inet default null,
  p_user_agent text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_code enterprise_recharge_codes%rowtype;
  v_enterprise enterprises%rowtype;
  v_before bigint;
  v_entry enterprise_credit_ledger%rowtype;
begin
  select * into v_code
  from enterprise_recharge_codes
  where code = upper(trim(p_code))
  for update;

  if not found then raise exception 'RECHARGE_CODE_NOT_FOUND'; end if;
  if v_code.status <> 'unused' then raise exception 'RECHARGE_CODE_NOT_AVAILABLE'; end if;
  if v_code.expires_at is not null and v_code.expires_at <= now() then
    update enterprise_recharge_codes
    set status = 'expired'
    where id = v_code.id;
    insert into enterprise_recharge_code_events (
      recharge_code_id, enterprise_id, admin_type, admin_id, event_type,
      ip_address, user_agent
    ) values (
      v_code.id, p_enterprise_id, 'enterprise', p_admin_id, 'expired',
      p_ip, p_user_agent
    );
    return jsonb_build_object('error', 'RECHARGE_CODE_EXPIRED');
  end if;

  select * into v_enterprise
  from enterprises
  where id = p_enterprise_id and status = 'active'
  for update;
  if not found then raise exception 'ENTERPRISE_NOT_ACTIVE'; end if;
  v_before := v_enterprise.credits;

  update enterprises
  set credits = credits + v_code.points
  where id = p_enterprise_id
  returning * into v_enterprise;

  update enterprise_recharge_codes
  set status = 'used', bound_enterprise_id = p_enterprise_id,
      redeemed_by_admin_id = p_admin_id, used_at = now()
  where id = v_code.id;

  insert into enterprise_credit_ledger (
    enterprise_id, amount, balance_after, entry_type,
    reference_type, reference_id, note, operated_by_type, operated_by_id
  ) values (
    p_enterprise_id, v_code.points, v_enterprise.credits, 'recharge',
    'enterprise_recharge_code', v_code.id, '企业充值码兑换',
    'enterprise', p_admin_id
  ) returning * into v_entry;

  insert into enterprise_recharge_code_events (
    recharge_code_id, enterprise_id, admin_type, admin_id, event_type,
    balance_before, balance_after, ip_address, user_agent
  ) values (
    v_code.id, p_enterprise_id, 'enterprise', p_admin_id, 'redeemed',
    v_before, v_enterprise.credits, p_ip, p_user_agent
  );

  return jsonb_build_object(
    'enterpriseId', p_enterprise_id,
    'rechargeCodeId', v_code.id,
    'points', v_code.points,
    'credits', v_enterprise.credits,
    'ledgerId', v_entry.id,
    'redeemedAt', now()
  );
end;
$$;

-- All application tables are server-only. The service-role key is used by
-- Next.js route handlers; no browser receives direct table access.
do $$
declare
  v_table text;
begin
  foreach v_table in array array[
    'app_users', 'platform_admins', 'enterprise_applications', 'enterprises',
    'enterprise_admins', 'admin_sessions', 'enterprise_employees',
    'enterprise_test_groups', 'activation_codes', 'activation_code_events',
    'test_sessions', 'test_answers', 'mbti_results',
    'enterprise_recharge_codes', 'enterprise_recharge_code_events',
    'enterprise_credit_ledger', 'admin_operation_logs'
  ] loop
    execute format('alter table public.%I enable row level security', v_table);
  end loop;
end;
$$;

revoke all on function public.consume_activation_code(text, text, inet, text) from public;
revoke all on function public.claim_enterprise_activation_code(text, text, uuid, uuid, text, text, text, text, inet, text) from public;
revoke all on function public.create_enterprise_activation_code(uuid, uuid, text, integer, uuid) from public;
revoke all on function public.register_enterprise(text, text, text, text, text, text) from public;
revoke all on function public.adjust_enterprise_credits(uuid, bigint, text, uuid) from public;
revoke all on function public.redeem_enterprise_recharge_code(uuid, uuid, text, inet, text) from public;

do $$
begin
  if exists (select 1 from pg_roles where rolname = 'service_role') then
    grant usage on schema public to service_role;
    grant all privileges on all tables in schema public to service_role;
    grant usage, select, update on all sequences in schema public to service_role;
    grant execute on function public.consume_activation_code(text, text, inet, text) to service_role;
    grant execute on function public.claim_enterprise_activation_code(text, text, uuid, uuid, text, text, text, text, inet, text) to service_role;
    grant execute on function public.create_enterprise_activation_code(uuid, uuid, text, integer, uuid) to service_role;
    grant execute on function public.register_enterprise(text, text, text, text, text, text) to service_role;
    grant execute on function public.adjust_enterprise_credits(uuid, bigint, text, uuid) to service_role;
    grant execute on function public.redeem_enterprise_recharge_code(uuid, uuid, text, inet, text) to service_role;

    alter default privileges in schema public
      grant all privileges on tables to service_role;
    alter default privileges in schema public
      grant usage, select, update on sequences to service_role;
    alter default privileges in schema public
      grant execute on functions to service_role;
  end if;
end;
$$;
