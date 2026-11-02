type ExperienceList = Experience[]
interface Experience {
  title: string;
  subtitle?: string;
  listItems: string[],
}
export const experienceList: ExperienceList = [
  {
    title: "Design System",
    subtitle:
      "Shipped 15+ reusable components built to Figma specs, each with Storybook stories, tests and Changesets",
    listItems: [
      "Skeleton and spinner loaders, switch/toggle, progress wizard and date range picker",
      "Multi-select combobox, text area, copy-to-clipboard, form controls (radio, checkbox, segmented toggle)",
      "Progress bar, chip, divider and file dropzone",
      "Built the progress wizard once, and it replaced one-off wizards in two other apps",
      "Built the progress bar, chip and divider in two days. They then unblocked the file dropzone, which went into two apps",
      "Rolled out an elevation and shadow system. It handled dark modecand multi-brand theming and had matching docs.",
      "Moved hardcoded colours to semantic design tokens and fixed dark-mode token leaks."
    ],
  },
  {
    title: "Quality and Testing",
    subtitle: "Setting up a testing suite",
    listItems: ["Set up MSW + React Testing Library integration testing for an app that had none.", "Added regression tests alongside bug fixes, and moved form validation to Zod schemas.", "Added storybook stories, unit tests and documentation for the component library"]
  },
  {
    title: "Docs, Process, Tooling",
    listItems: ["Started a living design-decision log and a page-parity audit, and wrote an AI agent skill that runs the parity checks.", "Ran audit passes of the component library against the design system, created a matrix of parity to compare systems.", "Audits led to standardising action buttons, detail pages, semantic tokens and design heuristics across the apps", "Wrote team conventions and recorded decisions from design meetings into shared documentation repository", "Built and automated weekly status reporting pipeline (cron, Claude, Github CLI) with failure alerting to track design implementation"]
  }, 
  {
    title: "Production Support and Debugging",
    subtitle: "Timely product support, first line triage",
    listItems: ["Fixed P1 production bugs, often within a day, including a missing wizard modal, missing advance-rate feature, a stale query silently falling back to stale data, an infinite loop export bug", "Found and fixed infinite loop re-render and refetch bug in React", "Debugged .NET to S3 bucket artifact retrieval with Serilog logging", "Fixed silent failures in user invite and account creation flows"]
  },
  {
    title: "Stack",
    listItems: ["React", 'Typescript', "Tailwind", "Tanstack Query", "Tanstack Tables", "Zod", "Zustand", "Radix", "Storybook", "MSW", "LaunchDarkly", ".NET", "Github CI/CD", "i18"]
  }
];
