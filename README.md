# NourishLink

A platform that helps streamline the donation process by providing an efficient way for businesses to post about surplus food and for recipients to request and schedule pickups. On the recipient side, community organizations and individuals have a user-friendly interface to explore available food donations in their vicinity and will even have the ability to communicate their specific needs so that donors can prioritize and address them. The platform provides a kind of messaging system that coalesces all types of communication during the donation process. From announcing a donation to coordinating pickup times, we aim to encourage collaboration and understanding between donors and recipients, ensuring a more personalized and responsive approach to surplus food redistribution.

This project was developed as a response to the challenge statement provided to us in our CEN 3031 Software Engineering course at the University of Florida.

## Run Locally

This software is supported by a backend infrastructure provided by Supabase, which is only accessible to administrators and developers involved in this project. If you wish to both use and modify the codebase, you must create your own Supabase account and database. Unfortunately, we cannot share private access information with anyone beyond the project team.

For your convenience, we've provided the database schema below. This will enable you to replicate it seamlessly and develop your own version of NourishLink. Please refer to the [supabase documentation](https://supabase.com/docs) for detailed guidance on setting up a Supabase project. Once your project is created, copy the database schema provided below into the SQL editor to initialize the database.

This approach ensures a smooth transition for your project setup and allows you to start working on NourishLink promptly.

If you simply want to use NourishLink without diving into the code, you can access a live instance of the application hosted on Vercel. The link is provided [here](https://cen-3031-group-project.vercel.app/welcome).

### Database Schema

```sql
create table
  public.donation_post(
    post_id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default (now() at time zone 'utc'::text),
    posted_by text not null,
    claimed_by text null,
    title text not null,
    description text not null,
    claimed_at timestamp with time zone null,
    constraint donation_post_pkey primary key (post_id),
    constraint public_donation_post_claimed_by_fkey foreign key (claimed_by) references profiles (user_name) on update cascade on delete set null,
    constraint public_donation_post_posted_by_fkey foreign key (posted_by) references profiles (user_name) on update cascade on delete cascade,
    constraint donation_post_description_check check ((length(description) < 240))
  ) tablespace pg_default;

create table
  public.profiles (
    role text not null default ''::text,
    organization_name text not null,
    profile_id uuid not null,
    user_name text not null,
    constraint profiles_pkey primary key (profile_id),
    constraint profiles_organization_name_key unique (organization_name),
    constraint profiles_user_name_key unique (user_name),
    constraint public_profiles_user_id_fkey foreign key (profile_id) references auth.users (id) on update restrict on delete restrict,
    constraint profiles_user_name_check check ((length(user_name) < 12))
  ) tablespace pg_default;

create table
  public.text_messages (
    thread_id uuid not null,
    sent_at timestamp with time zone not null default (now() at time zone 'utc'::text),
    sender text not null,
    message text not null,
    constraint text_messages_pkey primary key (thread_id, sent_at),
    constraint public_text_messages_sender_fkey foreign key (sender) references profiles (user_name) on update cascade on delete cascade,
    constraint public_text_messages_thread_id_fkey foreign key (thread_id) references threads (thread_id) on update cascade on delete cascade
  ) tablespace pg_default;

create table
  public.threads (
    thread_id uuid not null default gen_random_uuid (),
    post_id uuid not null,
    constraint threads_pkey primary key (thread_id),
    constraint threads_post_id_key unique (post_id),
    constraint public_threads_post_id_fkey foreign key (post_id) references donation_post (post_id) on update cascade on delete cascade
  ) tablespace pg_default;
```

To run this project on your machine, we recommend that you fork this
repository so that you may make any adjustments if you so wish. We provide below a simple list of instructions to get started
Prerequisites: Make sure you have the following installed on your machine.

- Node.js
- npm

1. Fork the repository and copy the command below to clone your forked repository into your machine.

```bash
  git clone https://github.com/andrewb2011/NourishLink.git
```

2. Go to the project directory

```bash
  cd NourishLink
```

3. Install dependencies

```bash
  npm install
```

4. Start the server

```bash
  npm run dev
```

## Authors

- [@williamGarcia99x](https://www.github.com/williamGarcia99x)
- [@andrewb2011](https://www.github.com/andrewb2011)
- [@RaySoftware](https://www.github.com/RaySoftware)
- [@caldoconpapa](https://www.github.com/caldoconpapa)
