DO $$ BEGIN
 CREATE TYPE "public"."actor_type" AS ENUM('user', 'system');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."subjectType" AS ENUM('contact');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."billing_plans_interval" AS ENUM('day', 'week', 'month', 'year');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."billing_subscription_status" AS ENUM('incomplete', 'incomplete_expired', 'trialing', 'active', 'past_due', 'canceled', 'unpaid', 'paused');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."contact_status" AS ENUM('new', 'active', 'inactive');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."contact_type" AS ENUM('lead', 'customer');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."subject_type" AS ENUM('contact');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."target_type" AS ENUM('user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."workspace_member_status" AS ENUM('active', 'suspended', 'invited');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "saasui_activity_logs" (
	"id" char(24) DEFAULT 'ix4r2qapizpokdo2x9xx1k4y' NOT NULL,
	"workspace_id" char(24) NOT NULL,
	"actor_id" char(24),
	"actor_type" "actor_type" DEFAULT 'system' NOT NULL,
	"subject_id" varchar(255) NOT NULL,
	"subject_type" "subjectType" NOT NULL,
	"type" varchar(255) NOT NULL,
	"meta_data" json,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "saasui_billing_accounts" (
	"id" char(24) PRIMARY KEY DEFAULT 'bc4ip38krrccvmqnb5orlen0' NOT NULL,
	"customer_id" varchar(255),
	"email" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "saasui_billing_accounts_customer_id_unique" UNIQUE("customer_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "saasui_billing_entitlements" (
	"id" char(24) PRIMARY KEY DEFAULT 'a58oezyxenz8b47gnzevlg6h' NOT NULL,
	"account_id" varchar(255) NOT NULL,
	"feature" text NOT NULL,
	"enabled" boolean DEFAULT true,
	"limit" real
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "saasui_billing_plans" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(64) NOT NULL,
	"description" varchar(255),
	"active" boolean DEFAULT true NOT NULL,
	"price" real,
	"currency" varchar(20) DEFAULT 'USD' NOT NULL,
	"interval" "billing_plans_interval" DEFAULT 'month' NOT NULL,
	"trial_period_days" real,
	"features" jsonb,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "saasui_billing_subscriptions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"account_id" varchar(255) NOT NULL,
	"plan_id" varchar(255) NOT NULL,
	"status" "billing_subscription_status" NOT NULL,
	"quantity" real NOT NULL,
	"started_at" timestamp NOT NULL,
	"cancel_at" timestamp with time zone,
	"cancel_at_period_end" boolean DEFAULT false NOT NULL,
	"canceled_at" timestamp with time zone,
	"current_period_start" timestamp with time zone NOT NULL,
	"current_period_end" timestamp with time zone NOT NULL,
	"ended_at" timestamp with time zone,
	"trial_ends_at" timestamp with time zone,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "saasui_contacts" (
	"id" char(24) DEFAULT 'np0m3kg7kog5jir9h6ukguuv' NOT NULL,
	"workspace_id" char(24) NOT NULL,
	"email" varchar(255) NOT NULL,
	"first_name" varchar(255),
	"last_name" varchar(255),
	"name" varchar(255),
	"avatar" varchar(255),
	"status" "contact_status" DEFAULT 'new' NOT NULL,
	"type" "contact_type" NOT NULL,
	"tags" jsonb,
	"sort_order" real,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "saasui_contacts_workspace_id_email_unique" UNIQUE("workspace_id","email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "saasui_notification" (
	"id" char(24) DEFAULT 'ebcylqnnfsvws38550jjuvyj' NOT NULL,
	"workspace_id" char(24) NOT NULL,
	"type" varchar(255),
	"target_id" char(24) NOT NULL,
	"target_type" "target_type" NOT NULL,
	"actor_id" char(24),
	"actor_type" "actor_type" DEFAULT 'system' NOT NULL,
	"subject_id" char(24) NOT NULL,
	"subject_type" "subject_type" NOT NULL,
	"data" json,
	"readAt" timestamp,
	"readBy" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "saasui_tags" (
	"id" varchar(40) NOT NULL,
	"workspace_id" char(24) NOT NULL,
	"name" varchar(255) NOT NULL,
	"color" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "saasui_tags_workspace_id_id_pk" PRIMARY KEY("workspace_id","id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "saasui_users" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"avatar" varchar(255),
	"email" varchar(255),
	"name" varchar(255),
	"first_name" varchar(255),
	"last_name" varchar(255),
	"locale" varchar(10),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE NULLS NOT DISTINCT("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "saasui_workspace_invitations" (
	"id" char(24) DEFAULT 'j8bi8yljzol1mqjk66r29u1r' NOT NULL,
	"workspace_id" char(24) NOT NULL,
	"user_id" varchar(36),
	"email" varchar(255) NOT NULL,
	"role" varchar(20) NOT NULL,
	"invited_by" varchar(36),
	"accepted" boolean DEFAULT false,
	"expires_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "saasui_workspace_member_settings" (
	"user_id" varchar(255) NOT NULL,
	"workspace_id" varchar(255) NOT NULL,
	"notification_channels" jsonb,
	"notification_topics" jsonb,
	"newsletters" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "workspace_member_settings_pk" PRIMARY KEY("user_id","workspace_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "saasui_workspace_members" (
	"user_id" varchar(255) NOT NULL,
	"workspace_id" varchar(255) NOT NULL,
	"role" varchar(20) NOT NULL,
	"status" "workspace_member_status" DEFAULT 'active' NOT NULL,
	"invited_at" timestamp,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "workspace_members_pk" PRIMARY KEY("user_id","workspace_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "saasui_workspaces" (
	"id" char(24) PRIMARY KEY DEFAULT 'hgh7zxkl6xkt1ae445xnyavj' NOT NULL,
	"owner_id" varchar(255),
	"slug" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"logo" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "saasui_billing_entitlements" ADD CONSTRAINT "saasui_billing_entitlements_account_id_saasui_billing_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."saasui_billing_accounts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "saasui_billing_subscriptions" ADD CONSTRAINT "saasui_billing_subscriptions_account_id_saasui_billing_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."saasui_billing_accounts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "saasui_tags" ADD CONSTRAINT "saasui_tags_workspace_id_saasui_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."saasui_workspaces"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "saasui_workspace_invitations" ADD CONSTRAINT "saasui_workspace_invitations_user_id_saasui_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."saasui_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "saasui_workspace_invitations" ADD CONSTRAINT "saasui_workspace_invitations_invited_by_saasui_users_id_fk" FOREIGN KEY ("invited_by") REFERENCES "public"."saasui_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "saasui_workspace_member_settings" ADD CONSTRAINT "saasui_workspace_member_settings_user_id_saasui_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."saasui_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "saasui_workspace_member_settings" ADD CONSTRAINT "saasui_workspace_member_settings_workspace_id_saasui_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."saasui_workspaces"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "saasui_workspace_members" ADD CONSTRAINT "saasui_workspace_members_user_id_saasui_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."saasui_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "saasui_workspace_members" ADD CONSTRAINT "saasui_workspace_members_workspace_id_saasui_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."saasui_workspaces"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "saasui_activity_logs_workspace_id_id_index" ON "saasui_activity_logs" USING btree ("workspace_id","id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "billing_entitlements_idx" ON "saasui_billing_entitlements" USING btree ("account_id","feature");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "saasui_contacts_workspace_id_id_index" ON "saasui_contacts" USING btree ("workspace_id","id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "saasui_notification_workspace_id_id_index" ON "saasui_notification" USING btree ("workspace_id","id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "saasui_workspace_invitations_workspace_id_email_index" ON "saasui_workspace_invitations" USING btree ("workspace_id","email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "slug_idx" ON "saasui_workspaces" USING btree ("slug");