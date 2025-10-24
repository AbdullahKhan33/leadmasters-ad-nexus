# Workflow Execution Start - Cron Setup Guide

This guide explains how to automatically start workflow executions for leads that match workflow trigger conditions.

## Overview

The `start-workflow-executions` edge function:
- Checks all active automation workflows
- Finds leads matching each workflow's trigger conditions
- Creates workflow_execution records for eligible leads
- Updates lead status to track workflow assignment

## Setup Methods

### Method 1: Supabase Dashboard Cron (Recommended)

1. Go to [SQL Editor in Supabase Dashboard](https://supabase.com/dashboard/project/zfgtzkgptmerbrrnlppx/sql/new)

2. Run this SQL to enable required extensions:
```sql
-- Enable pg_cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Enable pg_net extension for HTTP requests
CREATE EXTENSION IF NOT EXISTS pg_net;
```

3. Create the cron job (runs every 15 minutes):
```sql
-- Schedule the workflow start function to run every 15 minutes
SELECT cron.schedule(
  'start-workflow-executions',
  '*/15 * * * *',
  $$
  SELECT
    net.http_post(
        url:='https://zfgtzkgptmerbrrnlppx.supabase.co/functions/v1/start-workflow-executions',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmZ3R6a2dwdG1lcmJycm5scHB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzY0ODIsImV4cCI6MjA2ODM1MjQ4Mn0.bWOwQzlbKWcDGR3q023cNDVKutSPSkaHqfl8Pbwc6qs"}'::jsonb,
        body:='{}'::jsonb
    ) as request_id;
  $$
);
```

4. Verify the cron job was created:
```sql
SELECT * FROM cron.job WHERE jobname = 'start-workflow-executions';
```

### Method 2: External Cron Service

Use any external cron service (cron-job.org, EasyCron, etc.) to call:

**URL:** `https://zfgtzkgptmerbrrnlppx.supabase.co/functions/v1/start-workflow-executions`

**Method:** POST

**Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmZ3R6a2dwdG1lcmJycm5scHB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzY0ODIsImV4cCI6MjA2ODM1MjQ4Mn0.bWOwQzlbKWcDGR3q023cNDVKutSPSkaHqfl8Pbwc6qs`

**Frequency:** Every 15 minutes

## How It Works

1. **Trigger Evaluation**: The function fetches all active workflows and checks their `trigger_config`
2. **Lead Matching**: For each workflow, it queries leads matching the trigger conditions (status, source, workflow_stage)
3. **Execution Creation**: Creates `workflow_execution` records for leads not currently in a workflow
4. **Lead Update**: Updates the lead's `current_workflow_id` and `workflow_stage`

### Trigger Config Example

Workflows have a `trigger_config` that defines when to start:
```json
{
  "status": "New",
  "source": "99acres",
  "workflow_stage": null,
  "allow_reentry": false
}
```

## Verification

### Check Cron Job Status
```sql
-- View all cron jobs
SELECT * FROM cron.job;

-- View cron job run history
SELECT * FROM cron.job_run_details 
WHERE jobid = (SELECT jobid FROM cron.job WHERE jobname = 'start-workflow-executions')
ORDER BY start_time DESC 
LIMIT 10;
```

### Check Workflow Executions
```sql
-- View recently created workflow executions
SELECT 
  we.id,
  we.workflow_id,
  we.lead_id,
  we.status,
  we.started_at,
  aw.name as workflow_name,
  l.name as lead_name
FROM workflow_executions we
JOIN automation_workflows aw ON aw.id = we.workflow_id
JOIN leads l ON l.id = we.lead_id
ORDER BY we.started_at DESC
LIMIT 20;
```

### Test Manually
You can manually trigger the function via curl:
```bash
curl -X POST \
  'https://zfgtzkgptmerbrrnlppx.supabase.co/functions/v1/start-workflow-executions' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmZ3R6a2dwdG1lcmJycm5scHB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzY0ODIsImV4cCI6MjA2ODM1MjQ4Mn0.bWOwQzlbKWcDGR3q023cNDVKutSPSkaHqfl8Pbwc6qs'
```

## Monitoring & Troubleshooting

### View Edge Function Logs
Check logs at: https://supabase.com/dashboard/project/zfgtzkgptmerbrrnlppx/functions/start-workflow-executions/logs

### Common Issues

1. **No executions created**: Check that workflows are marked as `is_active = true`
2. **Leads not matching**: Verify the workflow's `trigger_config` matches actual lead data
3. **Duplicate executions**: The function checks for existing active executions before creating new ones

### Disable Cron Job
```sql
SELECT cron.unschedule('start-workflow-executions');
```

## Integration with process-workflow-steps

Once workflow executions are created by this function:
1. The `process-workflow-steps` function (separate cron) processes them every 5 minutes
2. It sends messages, updates steps, and schedules next actions
3. Together, these two functions provide complete workflow automation

## Production Considerations

- **Frequency**: Start with 15-minute intervals, adjust based on lead volume
- **Performance**: The function uses database queries efficiently with proper indexing
- **Monitoring**: Set up alerts for failed executions
- **Scaling**: Function handles concurrent workflow processing automatically
