import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.52.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LeadData {
  user_id: string;
  name: string;
  phone: string;
  email: string;
  status: string;
  source: string;
  ai_score: number;
  created_at: string;
  assigned_agent_id: null;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get the authenticated user
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    // Check if user is admin
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    if (roleError || roleData?.role !== 'admin') {
      throw new Error('Only admins can seed dummy leads');
    }

    console.log('Starting to generate 100 dummy leads...');

    const firstNames = ['John', 'Sarah', 'Michael', 'Emily', 'David', 'Jessica', 'James', 'Emma', 'Robert', 'Olivia', 'William', 'Sophia', 'Daniel', 'Ava', 'Matthew', 'Isabella', 'Christopher', 'Mia', 'Andrew', 'Charlotte'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
    const statuses = ['New', 'New', 'New', 'New', 'Contacted', 'Contacted', 'Contacted', 'Qualified', 'Qualified', 'Unqualified'];
    const sources = ['Website', 'Facebook Ad', 'Google Ad', 'Referral', 'WhatsApp', 'Instagram', 'LinkedIn', 'Direct Call'];

    const leads: LeadData[] = [];
    const now = Date.now();
    const ninetyDaysAgo = now - (90 * 24 * 60 * 60 * 1000);

    for (let i = 0; i < 100; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const name = `${firstName} ${lastName}`;
      
      // Generate random timestamp within last 90 days
      const randomTimestamp = ninetyDaysAgo + Math.random() * (now - ninetyDaysAgo);
      const createdAt = new Date(randomTimestamp).toISOString();
      
      const lead: LeadData = {
        user_id: user.id,
        name,
        phone: `+1-555-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        source: sources[Math.floor(Math.random() * sources.length)],
        ai_score: Math.floor(Math.random() * 10) + 1,
        created_at: createdAt,
        assigned_agent_id: null
      };
      
      leads.push(lead);
    }

    // Insert leads in batch
    const { data: insertedLeads, error: insertError } = await supabase
      .from('leads')
      .insert(leads)
      .select('id, name, created_at, status, source');

    if (insertError) {
      console.error('Error inserting leads:', insertError);
      throw insertError;
    }

    console.log(`Successfully created ${insertedLeads.length} dummy leads`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully created ${insertedLeads.length} dummy leads`,
        leads: insertedLeads
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error: any) {
    console.error('Error in seed-dummy-leads function:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});
