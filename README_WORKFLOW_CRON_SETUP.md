# Workflow Sequences Cron Setup

## Overview
The `process-workflow-steps` edge function needs to run every 5 minutes to process pending workflow sequence steps and send scheduled messages to leads.

## Setup Instructions

### Option 1: Supabase Dashboard (Recommended)

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/zfgtzkgptmerbrrnlppx
2. Navigate to **Database** → **Extensions** → Enable **pg_cron** extension
3. Go to **SQL Editor** and run the following:

```sql
-- Create cron job to run every 5 minutes
SELECT cron.schedule(
  'process-workflow-steps',
  '*/5 * * * *',  -- Every 5 minutes
  $$
    SELECT
      net.http_post(
        url := 'https://zfgtzkgptmerbrrnlppx.supabase.co/functions/v1/process-workflow-steps',
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
        ),
        body := '{}'::jsonb
      );
  $$
);
```

### Option 2: External Cron Service

If you prefer to use an external service like GitHub Actions, Cron-Job.org, or EasyCron:

1. Set up a cron job to run every 5 minutes
2. Configure it to make a POST request to:
   - URL: `https://zfgtzkgptmerbrrnlppx.supabase.co/functions/v1/process-workflow-steps`
   - Method: `POST`
   - Headers:
     - `Content-Type: application/json`
     - `Authorization: Bearer [YOUR_SERVICE_ROLE_KEY]`
   - Body: `{}`

### Verification

To verify the cron job is working:

1. Check the edge function logs:
   ```
   https://supabase.com/dashboard/project/zfgtzkgptmerbrrnlppx/functions/process-workflow-steps/logs
   ```

2. Monitor the `workflow_message_log` table:
   ```sql
   SELECT * FROM workflow_message_log 
   ORDER BY sent_at DESC 
   LIMIT 10;
   ```

3. Check workflow execution statuses:
   ```sql
   SELECT id, lead_id, current_step, status, next_step_at
   FROM workflow_executions 
   WHERE status = 'active'
   ORDER BY next_step_at ASC;
   ```

## How It Works

1. **Workflow Assignment**: When a lead is assigned to a workflow that has a linked sequence, a `workflow_execution` record is created
2. **Step Scheduling**: The first step's `next_step_at` is calculated based on its `delay_hours`
3. **Cron Execution**: Every 5 minutes, the function checks for executions where `next_step_at <= now()`
4. **Message Sending**: For each pending execution:
   - Fetches the current step's template
   - Replaces variables with lead data
   - Logs the message in `workflow_message_log`
   - Schedules the next step (or marks as completed)
5. **Completion**: When all steps are processed, the execution is marked as `completed`

## Testing

To manually test the function without waiting for the cron:

```bash
curl -X POST \
  'https://zfgtzkgptmerbrrnlppx.supabase.co/functions/v1/process-workflow-steps' \
  -H 'Authorization: Bearer [YOUR_SERVICE_ROLE_KEY]' \
  -H 'Content-Type: application/json' \
  -d '{}'
```

## Troubleshooting

**No messages being sent?**
- Check if workflows have sequences linked: `SELECT id, name, workflow_sequence_id FROM automation_workflows;`
- Verify sequences have steps: `SELECT * FROM workflow_sequence_steps;`
- Check for active executions: `SELECT * FROM workflow_executions WHERE status = 'active';`

**Executions stuck in 'active' status?**
- Check edge function logs for errors
- Verify templates exist and are valid
- Ensure `next_step_at` is set correctly

**Want to reset an execution?**
```sql
UPDATE workflow_executions 
SET current_step = 0, 
    next_step_at = now(), 
    status = 'active'
WHERE id = '[execution-id]';
```
