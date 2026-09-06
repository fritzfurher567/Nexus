"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Check, Shield, Link2, Lock, MessagesSquare, PartyPopper } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type StepId =
  | "welcome"
  | "verification"
  | "roblox"
  | "restrictions"
  | "channels"
  | "complete";

type ChannelKey =
  | "auditLog"
  | "awardLog"
  | "dischargeLog"
  | "transferLog"
  | "rankLog";

type WizardState = {
  verifyCaptcha: boolean;
  verifyRoblox: boolean;
  channels: Record<ChannelKey, string | null>;
};

const BASE_STEPS: { id: StepId; title: string; subtitle: string; icon: LucideIcon }[] = [
  { id: "welcome", title: "Welcome to Nexus!", subtitle: "Let's get started with the setup.", icon: PartyPopper },
  { id: "verification", title: "Verification System", subtitle: "Configure user verification.", icon: Shield },
  { id: "roblox", title: "Roblox Integration", subtitle: "Connect groups and sync roles.", icon: Link2 },
  { id: "restrictions", title: "Role Restrictions", subtitle: "Configure role management permissions.", icon: Lock },
  { id: "channels", title: "Logging & Channels", subtitle: "Configure logging channels.", icon: MessagesSquare },
  { id: "complete", title: "Setup Complete", subtitle: "Onboarding finished successfully.", icon: Check },
];

const CHANNEL_FIELDS: {
  key: ChannelKey;
  label: string;
  description: string;
  requiresRoblox: boolean;
}[] = [
  { key: "auditLog", label: "Audit Log Channel", description: "Logs every action users take with the bot.", requiresRoblox: false },
  { key: "awardLog", label: "Award Log Channel", description: "Logs awards given to members.", requiresRoblox: true },
  { key: "dischargeLog", label: "Discharge Log Channel", description: "Logs discharges and desertions.", requiresRoblox: true },
  { key: "transferLog", label: "Transfer Log Channel", description: "Logs division/company transfers.", requiresRoblox: true },
  { key: "rankLog", label: "Rank Change Log Channel", description: "Logs promotions and demotions.", requiresRoblox: true },
];

export function OnboardingWizard() {
  const router = useRouter();
  const completeOnboarding = useMutation(api.users.completeOnboarding);
  const { isAuthenticated } = useConvexAuth();
  const [completionError, setCompletionError] = useState("");
  const [state, setState] = useState<WizardState>({
    verifyCaptcha: false,
    verifyRoblox: false,
    channels: {
      auditLog: null,
      awardLog: null,
      dischargeLog: null,
      transferLog: null,
      rankLog: null,
    },
  });

  // The Roblox Integration step only makes sense once Roblox verification
  // is turned on — skip it in the flow otherwise.
  const visibleSteps = BASE_STEPS.filter(
    (s) => s.id !== "roblox" || state.verifyRoblox
  );

  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = visibleSteps[stepIndex];
  const progress = Math.round(((stepIndex + 1) / visibleSteps.length) * 100);

  function goNext() {
    setStepIndex((i) => Math.min(i + 1, visibleSteps.length - 1));
  }
  function goPrev() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }
  function setChannel(key: ChannelKey, value: string | null) {
    setState((s) => ({ ...s, channels: { ...s.channels, [key]: value } }));
  }

  const activeChannelFields = CHANNEL_FIELDS.filter(
    (f) => !f.requiresRoblox || state.verifyRoblox
  );

  return (
    <div className="grid min-h-[600px] grid-cols-1 overflow-hidden rounded-2xl border border-border md:grid-cols-[300px_1fr]">
      {/* Sidebar */}
      <div className="flex flex-col border-b border-border bg-card p-6 md:border-b-0 md:border-r">
        <div className="mb-1 flex items-center gap-2.5 font-bold">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-sm font-extrabold text-primary-foreground">
            N
          </span>
          Nexus
        </div>
        <p className="mb-5 text-sm text-muted-foreground">
          Setting up your server.
        </p>

        <div className="mb-6">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold text-foreground">{progress}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full bg-foreground transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-1">
          {visibleSteps.map((step, i) => {
            const isActive = i === stepIndex;
            const isDone = i < stepIndex;
            return (
              <button
                key={step.id}
                onClick={() => setStepIndex(i)}
                className={`flex items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                  isActive ? "bg-foreground/10" : "hover:bg-foreground/5"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                    isDone
                      ? "bg-foreground text-background"
                      : isActive
                      ? "border border-foreground text-foreground"
                      : "border border-border text-muted-foreground"
                  }`}
                >
                  {isDone ? <Check className="h-3 w-3" /> : i + 1}
                </span>
                <span>
                  <span
                    className={`block text-sm font-semibold ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </span>
                  <span className="block text-xs text-muted-foreground/70">
                    {step.subtitle}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col p-8">
        <div className="flex-1">
          {currentStep.id === "welcome" && <WelcomeStep />}
          {currentStep.id === "verification" && (
            <VerificationStep
              verifyCaptcha={state.verifyCaptcha}
              verifyRoblox={state.verifyRoblox}
              onToggleCaptcha={() =>
                setState((s) => ({ ...s, verifyCaptcha: !s.verifyCaptcha }))
              }
              onToggleRoblox={() =>
                setState((s) => ({ ...s, verifyRoblox: !s.verifyRoblox }))
              }
            />
          )}
          {currentStep.id === "roblox" && <RobloxIntegrationStep />}
          {currentStep.id === "restrictions" && <RoleRestrictionsStep />}
          {currentStep.id === "channels" && (
            <ChannelsStep
              fields={activeChannelFields}
              values={state.channels}
              onChange={setChannel}
            />
          )}
          {currentStep.id === "complete" && <CompleteStep />}
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          <Button variant="ghost" onClick={goPrev} disabled={stepIndex === 0}>
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Step {stepIndex + 1} of {visibleSteps.length}
          </span>
          {currentStep.id === "complete" ? (
            <Button
              onClick={async () => {
                if (!isAuthenticated) {
                  setCompletionError("Your account is still connecting to Nexus. Please wait a moment, then try again.");
                  return;
                }
                setCompletionError("");
                try {
                  await completeOnboarding();
                  router.push("/dashboard");
                } catch (error) {
                  setCompletionError(error instanceof Error ? error.message : "Setup could not be completed. Please try again.");
                }
              }}
            >
              Complete Setup
            </Button>
          ) : (
            <Button onClick={goNext}>Continue</Button>
          )}
        </div>
        {completionError && <p className="mt-3 text-right text-sm text-red-500">{completionError}</p>}
      </div>
    </div>
  );
}

function WelcomeStep() {
  return (
    <div className="text-center">
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-2xl font-extrabold text-primary-foreground">
        N
      </div>
      <h2 className="text-2xl font-bold">Welcome to Nexus!</h2>
      <p className="mx-auto mt-2 max-w-md text-muted-foreground">
        Let&apos;s set up moderation, verification, and logging for your
        server in just a few steps.
      </p>
    </div>
  );
}

function VerificationStep({
  verifyCaptcha,
  verifyRoblox,
  onToggleCaptcha,
  onToggleRoblox,
}: {
  verifyCaptcha: boolean;
  verifyRoblox: boolean;
  onToggleCaptcha: () => void;
  onToggleRoblox: () => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold">Verification System</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Choose which verification methods to enable. You can select either,
        both, or neither.
      </p>

      <div className="mt-6 space-y-3">
        <CheckOption
          title="CAPTCHA Verification"
          description="Simple human-check before members can access the server."
          checked={verifyCaptcha}
          onToggle={onToggleCaptcha}
        />
        <CheckOption
          title="Roblox Verification"
          description="Members verify by linking their Roblox account. Unlocks rank sync and extra logging channels."
          checked={verifyRoblox}
          onToggle={onToggleRoblox}
        />
      </div>
    </div>
  );
}

function CheckOption({
  title,
  description,
  checked,
  onToggle,
}: {
  title: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
        checked ? "border-foreground bg-foreground/5" : "border-border"
      }`}
    >
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
          checked
            ? "border-foreground bg-foreground text-background"
            : "border-border"
        }`}
      >
        {checked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
      </span>
      <span>
        <span className="block text-sm font-semibold">{title}</span>
        <span className="block text-sm text-muted-foreground">
          {description}
        </span>
      </span>
    </button>
  );
}

function RobloxIntegrationStep() {
  return (
    <div>
      <h2 className="text-xl font-bold">Roblox Integration</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Connect your Roblox group to enable rank sync and verification.
      </p>
      <div className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
        <p className="font-semibold">No Groups Connected</p>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Connect your first Roblox group to enable rank syncing and
          verification.
        </p>
        <Button className="mt-5">Connect Roblox Group</Button>
      </div>
    </div>
  );
}

function RoleRestrictionsStep() {
  return (
    <div>
      <h2 className="text-xl font-bold">Role Restrictions</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Configure which roles staff cannot manage.
      </p>
      <div className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
        <p className="font-semibold">No Role Restrictions</p>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          All roles can currently be managed by staff. Add a restriction to
          protect sensitive roles.
        </p>
        <Button className="mt-5">Add First Restriction</Button>
      </div>
    </div>
  );
}

function ChannelsStep({
  fields,
  values,
  onChange,
}: {
  fields: typeof CHANNEL_FIELDS;
  values: Record<ChannelKey, string | null>;
  onChange: (key: ChannelKey, value: string | null) => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold">Logging & Channels</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Set the channels Nexus should send logs to.
        {values ? "" : ""}
      </p>

      <div className="mt-6 space-y-4">
        {fields.map((field) => (
          <div key={field.key} className="rounded-xl border border-border p-4">
            <p className="font-semibold">{field.label}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {field.description}
            </p>
            <select
              className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              value={values[field.key] ?? ""}
              onChange={(e) => onChange(field.key, e.target.value || null)}
            >
              <option value="">None</option>
              <option value="mod-logs">#mod-logs</option>
              <option value="audit-logs">#audit-logs</option>
              <option value="hr-logs">#hr-logs</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompleteStep() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold">Setup Complete!</h2>
      <p className="mx-auto mt-2 max-w-md text-muted-foreground">
        Nexus is now configured for your server.
      </p>

      <div className="mx-auto mt-8 max-w-sm rounded-xl border border-border p-5 text-left">
        <p className="text-sm font-semibold">Premium Features</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Still under development — check back soon.
        </p>
      </div>
    </div>
  );
}
