	-- inserts a row into public.userInfo
	create function public.add_new_user()
	returns trigger
	language plpgsql
	security definer set search_path = ''
	as $$
	begin
	  insert into public.userInfo(id, email, app_metadata, email_confirmed_at,user_metadata)
	  values (
	    new.id,
	    new.email,
	    new.raw_app_meta_data,
	    new.email_confirmed_at,
	    new.raw_user_meta_data
	  );
	  return new;
	end;
	$$;

	-- trigger the function every time a user is created
	create trigger on_auth_user_created
	  after insert on auth.users
      for each row execute procedure public.add_new_user();



      --------------------------------------------------------------
update 반영

CREATE OR REPLACE FUNCTION public.add_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  -- 기존 데이터가 존재하면 UPDATE, 없으면 INSERT
  INSERT INTO public.userInfo(id, email, app_metadata, email_confirmed_at, user_metadata)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_app_meta_data,
    NEW.email_confirmed_at,
    NEW.raw_user_meta_data
  )
  ON CONFLICT (id) -- id가 PRIMARY KEY 또는 UNIQUE 제약 조건으로 설정되어야 함
  DO UPDATE SET
    email = EXCLUDED.email,
    app_metadata = EXCLUDED.app_metadata,
    email_confirmed_at = EXCLUDED.email_confirmed_at,
    user_metadata = EXCLUDED.user_metadata;

  RETURN NEW;
END;
$$;


-- 업데이트 시에도 트리거가 작동하도록 트리거 수정
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.add_new_user();




