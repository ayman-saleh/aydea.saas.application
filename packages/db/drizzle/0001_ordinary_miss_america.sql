CREATE TABLE IF NOT EXISTS "saasui_auth_account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "saasui_auth_account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "saasui_auth_authenticator" (
	"credentialID" text NOT NULL,
	"userId" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"credentialPublicKey" text NOT NULL,
	"counter" integer NOT NULL,
	"credentialDeviceType" text NOT NULL,
	"credentialBackedUp" boolean NOT NULL,
	"transports" text,
	CONSTRAINT "saasui_auth_authenticator_userId_credentialID_pk" PRIMARY KEY("userId","credentialID"),
	CONSTRAINT "saasui_auth_authenticator_credentialID_unique" UNIQUE("credentialID")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "saasui_auth_session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "saasui_auth_user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"emailVerified" timestamp,
	"image" text,
	CONSTRAINT "saasui_auth_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "saasui_auth_verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "saasui_auth_verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
ALTER TABLE "saasui_activity_logs" ALTER COLUMN "id" SET DEFAULT 'h3vkhw0vn7ayf48yb7tk9i77';--> statement-breakpoint
ALTER TABLE "saasui_billing_accounts" ALTER COLUMN "id" SET DEFAULT 'h1kaw8bt97icv59ze7dth8ey';--> statement-breakpoint
ALTER TABLE "saasui_billing_entitlements" ALTER COLUMN "id" SET DEFAULT 'l2ddeoeo800n04qehtjyksno';--> statement-breakpoint
ALTER TABLE "saasui_contacts" ALTER COLUMN "id" SET DEFAULT 'rwn5vpl3qytg31usrnd2vqze';--> statement-breakpoint
ALTER TABLE "saasui_notification" ALTER COLUMN "id" SET DEFAULT 'a3iqktr93ege1w1ccs2xomfa';--> statement-breakpoint
ALTER TABLE "saasui_workspace_invitations" ALTER COLUMN "id" SET DEFAULT 'f34226htcebjtw883lyh3pcv';--> statement-breakpoint
ALTER TABLE "saasui_workspaces" ALTER COLUMN "id" SET DEFAULT 'trebo89ytmk5ly9ieoj833g9';--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "saasui_auth_account" ADD CONSTRAINT "saasui_auth_account_userId_saasui_auth_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."saasui_auth_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "saasui_auth_authenticator" ADD CONSTRAINT "saasui_auth_authenticator_userId_saasui_auth_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."saasui_auth_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "saasui_auth_session" ADD CONSTRAINT "saasui_auth_session_userId_saasui_auth_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."saasui_auth_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
