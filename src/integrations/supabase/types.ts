export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      agent_lead_assignments: {
        Row: {
          agent_id: string
          assigned_at: string
          assigned_by: string | null
          id: string
          lead_id: string
          notes: string | null
          status: string
        }
        Insert: {
          agent_id: string
          assigned_at?: string
          assigned_by?: string | null
          id?: string
          lead_id: string
          notes?: string | null
          status?: string
        }
        Update: {
          agent_id?: string
          assigned_at?: string
          assigned_by?: string | null
          id?: string
          lead_id?: string
          notes?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_assignments_agent_id"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_assignments_lead_id"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_workspaces: {
        Row: {
          agent_id: string
          assigned_at: string
          assigned_by: string
          created_at: string
          id: string
          workspace_id: string
        }
        Insert: {
          agent_id: string
          assigned_at?: string
          assigned_by: string
          created_at?: string
          id?: string
          workspace_id: string
        }
        Update: {
          agent_id?: string
          assigned_at?: string
          assigned_by?: string
          created_at?: string
          id?: string
          workspace_id?: string
        }
        Relationships: []
      }
      agents: {
        Row: {
          agent_code: string
          assigned_by: string | null
          assigned_leads_count: number
          created_at: string
          first_login_password_changed: boolean | null
          id: string
          performance_score: number | null
          permissions: Json
          status: string
          total_leads_handled: number
          updated_at: string
          user_id: string
          workspace_id: string | null
        }
        Insert: {
          agent_code: string
          assigned_by?: string | null
          assigned_leads_count?: number
          created_at?: string
          first_login_password_changed?: boolean | null
          id?: string
          performance_score?: number | null
          permissions?: Json
          status?: string
          total_leads_handled?: number
          updated_at?: string
          user_id: string
          workspace_id?: string | null
        }
        Update: {
          agent_code?: string
          assigned_by?: string | null
          assigned_leads_count?: number
          created_at?: string
          first_login_password_changed?: boolean | null
          id?: string
          performance_score?: number | null
          permissions?: Json
          status?: string
          total_leads_handled?: number
          updated_at?: string
          user_id?: string
          workspace_id?: string | null
        }
        Relationships: []
      }
      auto_assignment_rules: {
        Row: {
          agent_filters: Json
          assignment_method: string
          created_at: string
          created_by: string | null
          criteria: Json
          description: string | null
          enabled: boolean
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          agent_filters?: Json
          assignment_method: string
          created_at?: string
          created_by?: string | null
          criteria?: Json
          description?: string | null
          enabled?: boolean
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          agent_filters?: Json
          assignment_method?: string
          created_at?: string
          created_by?: string | null
          criteria?: Json
          description?: string | null
          enabled?: boolean
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      business_discovery_submissions: {
        Row: {
          advertising_platforms: string[]
          avg_revenue_per_customer: string
          company_name: string
          conversion_rate: string | null
          created_at: string
          crm_system_name: string | null
          current_challenges: string
          current_reach_methods: string[]
          desired_results: string
          email: string
          full_name: string
          has_crm: boolean
          has_seasonal_peaks: string | null
          has_website: boolean
          id: string
          ideal_customer: string
          industry: string
          is_gst_registered: boolean
          issues_invoices: boolean
          lead_score: number | null
          lead_tier: string | null
          location: string
          main_product_service: string
          monthly_ad_spend: string
          other_industry: string | null
          phone: string
          posting_frequency: string
          primary_goals: string[]
          social_platforms: string[]
          status: string
          top_priorities: string
          website_url: string | null
        }
        Insert: {
          advertising_platforms?: string[]
          avg_revenue_per_customer: string
          company_name: string
          conversion_rate?: string | null
          created_at?: string
          crm_system_name?: string | null
          current_challenges: string
          current_reach_methods?: string[]
          desired_results: string
          email: string
          full_name: string
          has_crm: boolean
          has_seasonal_peaks?: string | null
          has_website: boolean
          id?: string
          ideal_customer: string
          industry: string
          is_gst_registered: boolean
          issues_invoices: boolean
          lead_score?: number | null
          lead_tier?: string | null
          location: string
          main_product_service: string
          monthly_ad_spend: string
          other_industry?: string | null
          phone: string
          posting_frequency: string
          primary_goals?: string[]
          social_platforms?: string[]
          status?: string
          top_priorities: string
          website_url?: string | null
        }
        Update: {
          advertising_platforms?: string[]
          avg_revenue_per_customer?: string
          company_name?: string
          conversion_rate?: string | null
          created_at?: string
          crm_system_name?: string | null
          current_challenges?: string
          current_reach_methods?: string[]
          desired_results?: string
          email?: string
          full_name?: string
          has_crm?: boolean
          has_seasonal_peaks?: string | null
          has_website?: boolean
          id?: string
          ideal_customer?: string
          industry?: string
          is_gst_registered?: boolean
          issues_invoices?: boolean
          lead_score?: number | null
          lead_tier?: string | null
          location?: string
          main_product_service?: string
          monthly_ad_spend?: string
          other_industry?: string | null
          phone?: string
          posting_frequency?: string
          primary_goals?: string[]
          social_platforms?: string[]
          status?: string
          top_priorities?: string
          website_url?: string | null
        }
        Relationships: []
      }
      campaign_folders: {
        Row: {
          color: string
          created_at: string
          id: string
          name: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          color?: string
          created_at?: string
          id?: string
          name: string
          type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          color?: string
          created_at?: string
          id?: string
          name?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      campaign_recipients: {
        Row: {
          campaign_id: string
          clicked_at: string | null
          created_at: string | null
          delivered_at: string | null
          failed_reason: string | null
          id: string
          lead_id: string
          metadata: Json | null
          opened_at: string | null
          sent_at: string | null
          status: string
        }
        Insert: {
          campaign_id: string
          clicked_at?: string | null
          created_at?: string | null
          delivered_at?: string | null
          failed_reason?: string | null
          id?: string
          lead_id: string
          metadata?: Json | null
          opened_at?: string | null
          sent_at?: string | null
          status?: string
        }
        Update: {
          campaign_id?: string
          clicked_at?: string | null
          created_at?: string | null
          delivered_at?: string | null
          failed_reason?: string | null
          id?: string
          lead_id?: string
          metadata?: Json | null
          opened_at?: string | null
          sent_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaign_recipients_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_recipients_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_templates: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          subject: string | null
          type: string
          updated_at: string | null
          user_id: string
          variables: Json | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          subject?: string | null
          type: string
          updated_at?: string | null
          user_id: string
          variables?: Json | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          subject?: string | null
          type?: string
          updated_at?: string | null
          user_id?: string
          variables?: Json | null
        }
        Relationships: []
      }
      campaigns: {
        Row: {
          created_at: string | null
          created_by: string | null
          folder_id: string | null
          id: string
          message_content: string
          metadata: Json | null
          name: string
          scheduled_at: string | null
          segment_id: string | null
          sent_at: string | null
          status: string
          subject: string | null
          template_id: string | null
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          folder_id?: string | null
          id?: string
          message_content: string
          metadata?: Json | null
          name: string
          scheduled_at?: string | null
          segment_id?: string | null
          sent_at?: string | null
          status?: string
          subject?: string | null
          template_id?: string | null
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          folder_id?: string | null
          id?: string
          message_content?: string
          metadata?: Json | null
          name?: string
          scheduled_at?: string | null
          segment_id?: string | null
          sent_at?: string | null
          status?: string
          subject?: string | null
          template_id?: string | null
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "campaign_folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaigns_segment_id_fkey"
            columns: ["segment_id"]
            isOneToOne: false
            referencedRelation: "segments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_campaigns_template"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "campaign_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_domains: {
        Row: {
          created_at: string | null
          dkim_verified: boolean | null
          domain_name: string
          id: string
          spf_verified: boolean | null
          updated_at: string | null
          user_id: string
          verification_status: string | null
        }
        Insert: {
          created_at?: string | null
          dkim_verified?: boolean | null
          domain_name: string
          id?: string
          spf_verified?: boolean | null
          updated_at?: string | null
          user_id: string
          verification_status?: string | null
        }
        Update: {
          created_at?: string | null
          dkim_verified?: boolean | null
          domain_name?: string
          id?: string
          spf_verified?: boolean | null
          updated_at?: string | null
          user_id?: string
          verification_status?: string | null
        }
        Relationships: []
      }
      email_senders: {
        Row: {
          created_at: string | null
          domain_id: string | null
          from_email: string
          from_name: string
          id: string
          is_default: boolean | null
          is_verified: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          domain_id?: string | null
          from_email: string
          from_name: string
          id?: string
          is_default?: boolean | null
          is_verified?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          domain_id?: string | null
          from_email?: string
          from_name?: string
          id?: string
          is_default?: boolean | null
          is_verified?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_senders_domain_id_fkey"
            columns: ["domain_id"]
            isOneToOne: false
            referencedRelation: "email_domains"
            referencedColumns: ["id"]
          },
        ]
      }
      generated_post_ideas: {
        Row: {
          ai_recommendations: Json
          business_type: string
          created_at: string
          goals: string[]
          hashtags: string[]
          id: string
          platform: string
          post_caption: string
          status: string
          target_audience: string
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_recommendations?: Json
          business_type: string
          created_at?: string
          goals?: string[]
          hashtags?: string[]
          id?: string
          platform: string
          post_caption: string
          status?: string
          target_audience: string
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_recommendations?: Json
          business_type?: string
          created_at?: string
          goals?: string[]
          hashtags?: string[]
          id?: string
          platform?: string
          post_caption?: string
          status?: string
          target_audience?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          ai_next_action: string | null
          ai_score: number | null
          assigned_agent_id: string | null
          category: string | null
          created_at: string
          email: string | null
          id: string
          last_message: string | null
          list: string | null
          name: string
          notes: string | null
          phone: string
          reminder_date: string | null
          reminder_note: string | null
          source: string
          status: string
          timestamp: string
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_next_action?: string | null
          ai_score?: number | null
          assigned_agent_id?: string | null
          category?: string | null
          created_at?: string
          email?: string | null
          id?: string
          last_message?: string | null
          list?: string | null
          name: string
          notes?: string | null
          phone: string
          reminder_date?: string | null
          reminder_note?: string | null
          source?: string
          status?: string
          timestamp?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_next_action?: string | null
          ai_score?: number | null
          assigned_agent_id?: string | null
          category?: string | null
          created_at?: string
          email?: string | null
          id?: string
          last_message?: string | null
          list?: string | null
          name?: string
          notes?: string | null
          phone?: string
          reminder_date?: string | null
          reminder_note?: string | null
          source?: string
          status?: string
          timestamp?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_leads_assigned_agent"
            columns: ["assigned_agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      segments: {
        Row: {
          color: string | null
          created_at: string | null
          criteria: Json
          description: string | null
          id: string
          is_active: boolean | null
          lead_count: number | null
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          criteria?: Json
          description?: string | null
          id?: string
          is_active?: boolean | null
          lead_count?: number | null
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string | null
          criteria?: Json
          description?: string | null
          id?: string
          is_active?: boolean | null
          lead_count?: number | null
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      workspaces: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "agent" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "agent", "user"],
    },
  },
} as const
