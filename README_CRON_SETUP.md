# Setting Up Scheduled Campaign Processing

This guide explains how to set up automated processing of scheduled campaigns using Supabase cron jobs.

## Overview

The system uses a Supabase edge function (`process-scheduled-campaigns`) that runs on a schedule to automatically send campaigns that have reached their scheduled time.

## Setup Steps

### 1. Enable pg_cron Extension

First, you need to enable the `pg_cron` and `pg_net` extensions in your Supabase project:

1. Go to your Supabase Dashboard
2. Navigate to **Database** → **Extensions**
3. Search for `pg_cron` and enable it
4. Search for `pg_net` and enable it

### 2. Create the Cron Job

Run the following SQL in your Supabase SQL Editor to create a cron job that runs every 15 minutes:

```sql
-- Create a cron job to process scheduled campaigns every 15 minutes
select cron.schedule(
  'process-scheduled-campaigns',
  '*/15 * * * *', -- every 15 minutes
  $$
  select
    net.http_post(
      url:='https://zfgtzkgptmerbrrnlppx.supabase.co/functions/v1/process-scheduled-campaigns',
      headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmZ3R6a2dwdG1lcmJycm5scHB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzY0ODIsImV4cCI6MjA2ODM1MjQ4Mn0.bWOwQzlbKWcDGR3q023cNDVKutSPSkaHqfl8Pbwc6qs"}'::jsonb
    ) as request_id;
  $$
);
```

### 3. Verify the Cron Job

Check if the cron job was created successfully:

```sql
SELECT * FROM cron.job;
```

You should see your `process-scheduled-campaigns` job listed.

### 4. Monitor Cron Job Execution

To check the execution history of your cron job:

```sql
SELECT * FROM cron.job_run_details 
WHERE jobid = (SELECT jobid FROM cron.job WHERE jobname = 'process-scheduled-campaigns')
ORDER BY start_time DESC 
LIMIT 10;
```

### 5. Manual Trigger (Optional)

You can manually trigger the cron job for testing:

```sql
SELECT cron.schedule('test-run', '* * * * *', 
  $$
  select net.http_post(
    url:='https://zfgtzkgptmerbrrnlppx.supabase.co/functions/v1/process-scheduled-campaigns',
    headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmZ3R6a2dwdG1lcmJycm5scHB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzY0ODIsImV4cCI6MjA2ODM1MjQ4Mn0.bWOwQzlbKWcDGR3q023cNDVKutSPSkaHqfl8Pbwc6qs"}'::jsonb
  ) as request_id;
  $$
);

-- Delete the test job after running
SELECT cron.unschedule('test-run');
```

## How It Works

1. **Cron Job**: Runs every 15 minutes
2. **Edge Function**: `process-scheduled-campaigns` is invoked
3. **Query**: Finds all campaigns with:
   - `status = 'scheduled'`
   - `scheduled_at <= NOW()`
   - `sent_at IS NULL`
4. **Processing**: For each campaign:
   - If type is "email", invokes `send-campaign-emails` function
   - If type is "whatsapp", marks as sent (to be implemented)
   - Updates campaign status to "sent"
5. **Error Handling**: If sending fails, campaign status reverts to "draft" with error details

## Troubleshooting

### Cron Job Not Running

Check if the extensions are enabled:
```sql
SELECT * FROM pg_extension WHERE extname IN ('pg_cron', 'pg_net');
```

### View Edge Function Logs

1. Go to Supabase Dashboard
2. Navigate to **Functions** → **process-scheduled-campaigns** → **Logs**

### Disable Cron Job

If you need to disable the cron job:
```sql
SELECT cron.unschedule('process-scheduled-campaigns');
```

### Re-enable Cron Job

Simply run the creation SQL again from Step 2.

## Adjusting the Schedule

The cron expression `*/15 * * * *` means every 15 minutes. You can adjust this:

- `* * * * *` - Every minute
- `*/5 * * * *` - Every 5 minutes
- `0 * * * *` - Every hour
- `0 9 * * *` - Daily at 9:00 AM
- `0 0 * * 0` - Weekly on Sunday at midnight

## Security Notes

- The cron job uses the anon key, which is public
- The edge function itself uses the service role key for database operations
- Row-level security policies ensure users can only access their own campaigns
