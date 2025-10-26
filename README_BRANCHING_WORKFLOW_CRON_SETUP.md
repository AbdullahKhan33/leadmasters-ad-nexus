# Branching Workflow Cron Job Setup

This guide explains how to set up the cron job for processing branching (flowchart-based) workflows.

## Overview

The `process-branching-workflows` edge function processes **ai_automation** type workflows that use visual flowcharts with branching logic. This runs separately from the linear workflow processor.

## Edge Function

**Function Name:** `process-branching-workflows`

**Purpose:** 
- Processes workflow executions for flowchart-based campaigns
- Handles message nodes, delay nodes, and branch nodes with conditions
- Executes conditional logic based on lead data
- Manages workflow state transitions through the flowchart

## Setting Up the Cron Job

### Step 1: Navigate to Cron Jobs in Supabase Dashboard

1. Go to your Supabase project dashboard
2. Click on **Database** in the left sidebar
3. Click on **Cron Jobs**

### Step 2: Create New Cron Job

Click **+ New Cron Job** button

### Step 3: Configure the Cron Job

Use these settings:

- **Name:** `process-branching-workflows`
- **Schedule:** `*/5 * * * *` (Every 5 minutes)
  - Or use `*/15 * * * *` for every 15 minutes if you want less frequent processing
- **Command:**
  ```sql
  SELECT
    net.http_post(
      url := 'https://zfgtzkgptmerbrrnlppx.supabase.co/functions/v1/process-branching-workflows',
      headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key'))
    ) AS request_id;
  ```

### Step 4: Set Service Role Key

In the Supabase SQL Editor, run:

```sql
ALTER DATABASE postgres SET app.settings.service_role_key = 'YOUR_SERVICE_ROLE_KEY';
```

Replace `YOUR_SERVICE_ROLE_KEY` with your actual Supabase service role key from Project Settings > API.

### Step 5: Verify Setup

After saving the cron job:

1. Wait for the next scheduled run (check the schedule)
2. Go to **Edge Functions** > **process-branching-workflows** > **Logs**
3. You should see execution logs every 5 minutes
4. Check for messages like "Found X branching workflow executions to process"

## How It Works

### Node Processing

1. **Start Node**: Entry point, immediately moves to next node
2. **Message Node**: Sends message via email/WhatsApp, logs it, moves to next
3. **Delay Node**: Calculates wait time, schedules next execution
4. **Branch Node**: Evaluates condition, chooses yes/no path
5. **End Node**: Marks execution as completed

### Condition Evaluation

The branch node evaluates conditions like:
- `"Has lead replied?"` - Checks if lead has messages
- `"Is lead qualified?"` - Checks if status = 'Qualified'
- `"Is lead interested?"` - Checks if status includes 'Interested'

### Execution Flow

```
Start → Message → Delay → Branch → Message (Yes) → End
                             ↓
                         Message (No) → End
```

## Monitoring

### Check Execution Status

```sql
SELECT 
  we.id,
  we.status,
  we.next_step_at,
  we.step_data->>'current_node_id' as current_node,
  aw.name as workflow_name,
  l.name as lead_name
FROM workflow_executions we
JOIN automation_workflows aw ON we.workflow_id = aw.id
JOIN leads l ON we.lead_id = l.id
WHERE aw.type = 'ai_automation'
ORDER BY we.next_step_at DESC
LIMIT 20;
```

### Check Message Logs

```sql
SELECT 
  wml.*,
  l.name as lead_name,
  aw.name as workflow_name
FROM workflow_message_log wml
JOIN workflow_executions we ON wml.workflow_execution_id = we.id
JOIN automation_workflows aw ON we.workflow_id = aw.id
JOIN leads l ON wml.lead_id = l.id
WHERE aw.type = 'ai_automation'
ORDER BY wml.sent_at DESC
LIMIT 20;
```

## Troubleshooting

### Cron Job Not Running

1. Check the cron job is **enabled** in the dashboard
2. Verify the schedule syntax is correct
3. Check that `app.settings.service_role_key` is set correctly

### No Executions Being Processed

1. Verify workflows have `type = 'ai_automation'`
2. Check workflows have `is_active = true`
3. Ensure flowchart data exists in `actions->flowchart`
4. Verify workflow_executions exist with `status = 'active'`

### Executions Stuck

```sql
-- Reset stuck executions (use carefully)
UPDATE workflow_executions
SET next_step_at = NOW()
WHERE status = 'active' 
  AND next_step_at < NOW() - INTERVAL '1 day';
```

## Recommended Schedule

- **Development/Testing**: `*/5 * * * *` (every 5 minutes)
- **Production**: `*/15 * * * *` (every 15 minutes)
- **High Volume**: `*/5 * * * *` with function timeout optimization

## Related Documentation

- [Linear Workflow Cron Setup](./README_WORKFLOW_CRON_SETUP.md)
- [Starting Workflows Cron Setup](./README_START_WORKFLOW_SETUP.md)
- [Scheduled Campaigns Cron Setup](./README_CRON_SETUP.md)
