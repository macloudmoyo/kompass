// Kompass Demo Data — hardcoded for all views

function daysAgo(n) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().split('T')[0]
}

let _signalId = 1
function sid() {
  return `sig-${_signalId++}`
}

export const accounts = [
  {
    id: 'acc-1',
    name: 'Revolut',
    industry: 'Fintech',
    segment: 'Payments',
    penetrationScore: 71,
    momentum: 'up',
    committee: {
      champion: {
        name: 'Sarah Chen',
        title: 'VP Marketing',
        source: 'crm',
        warmth: 'warm',
        lastSeen: { channel: 'LinkedIn', daysAgo: 1 },
      },
      budgetHolder: {
        name: 'James Thornton',
        title: 'CFO',
        source: 'detected',
        warmth: 'warm',
        lastSeen: { channel: 'Website', daysAgo: 2 },
        detectedActivity: 'Visited pricing page 4 times, engaged with 3 LinkedIn ads',
      },
      blocker: null,
      technical: {
        name: 'David Kim',
        title: 'Head of Engineering',
        source: 'crm',
        warmth: 'cold',
        lastSeen: { channel: 'Email', daysAgo: 34 },
      },
    },
    signals: [
      { id: sid(), date: daysAgo(1), channel: 'linkedin', role: 'champion', personName: 'Sarah Chen', action: 'Engaged with LinkedIn Ad: Scale Your Pipeline Campaign', isDetected: false },
      { id: sid(), date: daysAgo(2), channel: 'website', role: 'budget-holder', personName: 'James Thornton', action: 'Viewed pricing page', isDetected: true },
      { id: sid(), date: daysAgo(3), channel: 'linkedin', role: 'budget-holder', personName: 'James Thornton', action: 'Engaged with LinkedIn Ad: CFO Guide to Revenue Efficiency', isDetected: true },
      { id: sid(), date: daysAgo(5), channel: 'website', role: 'budget-holder', personName: 'James Thornton', action: 'Viewed pricing page', isDetected: true },
      { id: sid(), date: daysAgo(7), channel: 'linkedin', role: 'budget-holder', personName: 'James Thornton', action: 'Engaged with LinkedIn Ad: B2B Pipeline Intelligence', isDetected: true },
      { id: sid(), date: daysAgo(8), channel: 'website', role: 'budget-holder', personName: 'James Thornton', action: 'Viewed pricing page', isDetected: true },
      { id: sid(), date: daysAgo(10), channel: 'google', role: 'champion', personName: 'Sarah Chen', action: 'Clicked Google Ad: B2B Marketing Attribution', isDetected: false },
      { id: sid(), date: daysAgo(14), channel: 'email', role: 'technical', personName: 'David Kim', action: 'Opened email: Engineering-Led Growth Playbook', isDetected: false },
      { id: sid(), date: daysAgo(18), channel: 'website', role: 'champion', personName: 'Sarah Chen', action: 'Viewed case studies page', isDetected: false },
      { id: sid(), date: daysAgo(22), channel: 'website', role: 'budget-holder', personName: 'James Thornton', action: 'Viewed pricing page', isDetected: true },
      { id: sid(), date: daysAgo(30), channel: 'linkedin', role: 'budget-holder', personName: 'James Thornton', action: 'Engaged with LinkedIn Ad: Scale Your Pipeline Campaign', isDetected: true },
    ],
  },
  {
    id: 'acc-2',
    name: 'Wise',
    industry: 'Fintech',
    segment: 'Payments',
    penetrationScore: 48,
    momentum: 'up',
    committee: {
      champion: {
        name: 'Emma Rodriguez',
        title: 'Head of Growth',
        source: 'crm',
        warmth: 'warm',
        lastSeen: { channel: 'Email', daysAgo: 3 },
      },
      budgetHolder: null,
      blocker: null,
      technical: {
        name: 'Alex Patel',
        title: 'CTO',
        source: 'crm',
        warmth: 'cold',
        lastSeen: { channel: 'LinkedIn', daysAgo: 45 },
      },
    },
    signals: [
      { id: sid(), date: daysAgo(3), channel: 'email', role: 'champion', personName: 'Emma Rodriguez', action: 'Opened email: How Wise Can Scale ABM Programs', isDetected: false },
      { id: sid(), date: daysAgo(5), channel: 'linkedin', role: 'champion', personName: 'Emma Rodriguez', action: 'Engaged with LinkedIn Ad: Growth Team Playbook', isDetected: false },
      { id: sid(), date: daysAgo(8), channel: 'website', role: 'champion', personName: 'Emma Rodriguez', action: 'Viewed product features page', isDetected: false },
      { id: sid(), date: daysAgo(12), channel: 'google', role: 'unknown', personName: 'Unknown Visitor', action: 'Clicked Google Ad: B2B Payment Solutions', isDetected: false },
      { id: sid(), date: daysAgo(20), channel: 'linkedin', role: 'technical', personName: 'Alex Patel', action: 'Viewed LinkedIn company page', isDetected: false },
      { id: sid(), date: daysAgo(28), channel: 'email', role: 'champion', personName: 'Emma Rodriguez', action: 'Clicked email: Pipeline Acceleration Tactics', isDetected: false },
      { id: sid(), date: daysAgo(35), channel: 'website', role: 'unknown', personName: 'Unknown Visitor', action: 'Viewed blog: Scaling Payments Infrastructure', isDetected: false },
      { id: sid(), date: daysAgo(42), channel: 'linkedin', role: 'champion', personName: 'Emma Rodriguez', action: 'Engaged with LinkedIn Ad: Scale Your Pipeline Campaign', isDetected: false },
      { id: sid(), date: daysAgo(55), channel: 'google', role: 'unknown', personName: 'Unknown Visitor', action: 'Clicked Google Ad: Fintech Growth Strategies', isDetected: false },
    ],
  },
  {
    id: 'acc-3',
    name: 'GoCardless',
    industry: 'Fintech',
    segment: 'Payments',
    penetrationScore: 83,
    momentum: 'flat',
    committee: {
      champion: {
        name: 'Marcus Webb',
        title: 'CMO',
        source: 'crm',
        warmth: 'warm',
        lastSeen: { channel: 'Email', daysAgo: 2 },
      },
      budgetHolder: {
        name: 'Rachel Foster',
        title: 'CFO',
        source: 'crm',
        warmth: 'warm',
        lastSeen: { channel: 'Website', daysAgo: 5 },
      },
      blocker: {
        name: 'Laura Simmons',
        title: 'Head of Legal',
        source: 'crm',
        warmth: 'cold',
        lastSeen: { channel: 'Email', daysAgo: 60 },
      },
      technical: {
        name: 'Tom Bradley',
        title: 'VP Engineering',
        source: 'crm',
        warmth: 'warm',
        lastSeen: { channel: 'LinkedIn', daysAgo: 7 },
      },
    },
    signals: [
      { id: sid(), date: daysAgo(2), channel: 'email', role: 'champion', personName: 'Marcus Webb', action: 'Opened email: How GoCardless reduced CAC by 40%', isDetected: false },
      { id: sid(), date: daysAgo(5), channel: 'website', role: 'budget-holder', personName: 'Rachel Foster', action: 'Viewed pricing page', isDetected: false },
      { id: sid(), date: daysAgo(7), channel: 'linkedin', role: 'technical', personName: 'Tom Bradley', action: 'Engaged with LinkedIn Ad: Engineering-Led Growth', isDetected: false },
      { id: sid(), date: daysAgo(10), channel: 'email', role: 'champion', personName: 'Marcus Webb', action: 'Clicked email: CMO Benchmarking Report', isDetected: false },
      { id: sid(), date: daysAgo(14), channel: 'website', role: 'champion', personName: 'Marcus Webb', action: 'Viewed case studies page', isDetected: false },
      { id: sid(), date: daysAgo(18), channel: 'google', role: 'budget-holder', personName: 'Rachel Foster', action: 'Clicked Google Ad: B2B Revenue Intelligence', isDetected: false },
      { id: sid(), date: daysAgo(25), channel: 'linkedin', role: 'champion', personName: 'Marcus Webb', action: 'Engaged with LinkedIn Ad: Scale Your Pipeline Campaign', isDetected: false },
      { id: sid(), date: daysAgo(30), channel: 'website', role: 'technical', personName: 'Tom Bradley', action: 'Viewed integrations page', isDetected: false },
      { id: sid(), date: daysAgo(40), channel: 'email', role: 'blocker', personName: 'Laura Simmons', action: 'Opened email: Compliance & Data Security Overview', isDetected: false },
      { id: sid(), date: daysAgo(50), channel: 'linkedin', role: 'budget-holder', personName: 'Rachel Foster', action: 'Viewed LinkedIn company page', isDetected: false },
      { id: sid(), date: daysAgo(60), channel: 'email', role: 'blocker', personName: 'Laura Simmons', action: 'Opened email: GDPR Compliance for B2B Platforms', isDetected: false },
      { id: sid(), date: daysAgo(70), channel: 'google', role: 'technical', personName: 'Tom Bradley', action: 'Clicked Google Ad: API-First Revenue Tools', isDetected: false },
    ],
  },
  {
    id: 'acc-4',
    name: 'Checkout.com',
    industry: 'Fintech',
    segment: 'Payments',
    penetrationScore: 29,
    momentum: 'down',
    committee: {
      champion: null,
      budgetHolder: null,
      blocker: null,
      technical: {
        name: 'Chris Morgan',
        title: 'Solutions Architect',
        source: 'crm',
        warmth: 'cold',
        lastSeen: { channel: 'Email', daysAgo: 52 },
      },
    },
    signals: [
      { id: sid(), date: daysAgo(10), channel: 'google', role: 'unknown', personName: 'Unknown Visitor', action: 'Clicked Google Ad: B2B Payment Solutions', isDetected: false },
      { id: sid(), date: daysAgo(15), channel: 'website', role: 'unknown', personName: 'Unknown Visitor', action: 'Viewed blog: Checkout Flow Optimization', isDetected: false },
      { id: sid(), date: daysAgo(25), channel: 'linkedin', role: 'unknown', personName: 'Unknown Visitor', action: 'Viewed LinkedIn company page', isDetected: false },
      { id: sid(), date: daysAgo(35), channel: 'email', role: 'technical', personName: 'Chris Morgan', action: 'Opened email: Technical Integration Guide', isDetected: false },
      { id: sid(), date: daysAgo(42), channel: 'website', role: 'unknown', personName: 'Unknown Visitor', action: 'Viewed product features page', isDetected: false },
      { id: sid(), date: daysAgo(52), channel: 'email', role: 'technical', personName: 'Chris Morgan', action: 'Opened email: API Documentation Overview', isDetected: false },
      { id: sid(), date: daysAgo(60), channel: 'google', role: 'unknown', personName: 'Unknown Visitor', action: 'Clicked Google Ad: Payment Infrastructure Tools', isDetected: false },
      { id: sid(), date: daysAgo(75), channel: 'linkedin', role: 'unknown', personName: 'Unknown Visitor', action: 'Engaged with LinkedIn Ad: Scale Your Pipeline Campaign', isDetected: false },
    ],
  },
  {
    id: 'acc-5',
    name: 'Primer',
    industry: 'Fintech',
    segment: 'Payments',
    penetrationScore: 55,
    momentum: 'up',
    committee: {
      champion: {
        name: 'Sophie Turner',
        title: 'Head of Marketing',
        source: 'crm',
        warmth: 'warm',
        lastSeen: { channel: 'Website', daysAgo: 2 },
      },
      budgetHolder: {
        name: 'Neil Shah',
        title: 'CFO',
        source: 'detected',
        warmth: 'warm',
        lastSeen: { channel: 'Website', daysAgo: 4 },
        detectedActivity: 'Visited pricing page twice, opened 2 emails',
      },
      blocker: null,
      technical: {
        name: 'Raj Kumar',
        title: 'CTO',
        source: 'crm',
        warmth: 'warm',
        lastSeen: { channel: 'LinkedIn', daysAgo: 6 },
      },
    },
    signals: [
      { id: sid(), date: daysAgo(2), channel: 'website', role: 'champion', personName: 'Sophie Turner', action: 'Viewed case studies page', isDetected: false },
      { id: sid(), date: daysAgo(4), channel: 'website', role: 'budget-holder', personName: 'Neil Shah', action: 'Viewed pricing page', isDetected: true },
      { id: sid(), date: daysAgo(6), channel: 'linkedin', role: 'technical', personName: 'Raj Kumar', action: 'Engaged with LinkedIn Ad: CTO Guide to Revenue Tech', isDetected: false },
      { id: sid(), date: daysAgo(8), channel: 'email', role: 'budget-holder', personName: 'Neil Shah', action: 'Opened email: ROI Calculator for Revenue Teams', isDetected: true },
      { id: sid(), date: daysAgo(12), channel: 'website', role: 'budget-holder', personName: 'Neil Shah', action: 'Viewed pricing page', isDetected: true },
      { id: sid(), date: daysAgo(15), channel: 'email', role: 'budget-holder', personName: 'Neil Shah', action: 'Opened email: How Primer Can Reduce Pipeline Leakage', isDetected: true },
      { id: sid(), date: daysAgo(18), channel: 'linkedin', role: 'champion', personName: 'Sophie Turner', action: 'Engaged with LinkedIn Ad: Marketing Attribution Playbook', isDetected: false },
      { id: sid(), date: daysAgo(25), channel: 'google', role: 'champion', personName: 'Sophie Turner', action: 'Clicked Google Ad: B2B Marketing Attribution', isDetected: false },
      { id: sid(), date: daysAgo(32), channel: 'website', role: 'technical', personName: 'Raj Kumar', action: 'Viewed integrations page', isDetected: false },
      { id: sid(), date: daysAgo(45), channel: 'linkedin', role: 'technical', personName: 'Raj Kumar', action: 'Engaged with LinkedIn Ad: Engineering-Led Growth', isDetected: false },
    ],
  },
  {
    id: 'acc-6',
    name: 'Paysafe',
    industry: 'Fintech',
    segment: 'Payments',
    penetrationScore: 34,
    momentum: 'flat',
    committee: {
      champion: null,
      budgetHolder: {
        name: 'Michael Chang',
        title: 'VP Finance',
        source: 'crm',
        warmth: 'cold',
        lastSeen: { channel: 'Email', daysAgo: 40 },
      },
      blocker: null,
      technical: null,
    },
    signals: [
      { id: sid(), date: daysAgo(8), channel: 'google', role: 'unknown', personName: 'Unknown Visitor', action: 'Clicked Google Ad: B2B Payment Solutions', isDetected: false },
      { id: sid(), date: daysAgo(15), channel: 'website', role: 'unknown', personName: 'Unknown Visitor', action: 'Viewed blog: Payment Processing Trends 2026', isDetected: false },
      { id: sid(), date: daysAgo(22), channel: 'linkedin', role: 'unknown', personName: 'Unknown Visitor', action: 'Viewed LinkedIn company page', isDetected: false },
      { id: sid(), date: daysAgo(30), channel: 'website', role: 'unknown', personName: 'Unknown Visitor', action: 'Viewed product features page', isDetected: false },
      { id: sid(), date: daysAgo(40), channel: 'email', role: 'budget-holder', personName: 'Michael Chang', action: 'Opened email: Finance Leaders Guide to Pipeline ROI', isDetected: false },
      { id: sid(), date: daysAgo(55), channel: 'google', role: 'unknown', personName: 'Unknown Visitor', action: 'Clicked Google Ad: Revenue Intelligence Platform', isDetected: false },
      { id: sid(), date: daysAgo(65), channel: 'linkedin', role: 'unknown', personName: 'Unknown Visitor', action: 'Engaged with LinkedIn Ad: Scale Your Pipeline Campaign', isDetected: false },
      { id: sid(), date: daysAgo(78), channel: 'website', role: 'unknown', personName: 'Unknown Visitor', action: 'Viewed homepage', isDetected: false },
    ],
  },
  {
    id: 'acc-7',
    name: 'Starling Bank',
    industry: 'Fintech',
    segment: 'Banking',
    penetrationScore: 62,
    momentum: 'up',
    committee: {
      champion: {
        name: 'Hannah Price',
        title: 'Growth Director',
        source: 'crm',
        warmth: 'warm',
        lastSeen: { channel: 'Website', daysAgo: 3 },
      },
      budgetHolder: {
        name: 'Oliver Nash',
        title: 'CFO',
        source: 'crm',
        warmth: 'cold',
        lastSeen: { channel: 'Email', daysAgo: 30 },
      },
      blocker: {
        name: 'Priya Sharma',
        title: 'Compliance Director',
        source: 'detected',
        warmth: 'cold',
        lastSeen: { channel: 'LinkedIn', daysAgo: 5 },
        detectedActivity: 'Engaged with compliance-focused LinkedIn ads',
      },
      technical: {
        name: 'Ben Foster',
        title: 'CTO',
        source: 'crm',
        warmth: 'warm',
        lastSeen: { channel: 'LinkedIn', daysAgo: 4 },
      },
    },
    signals: [
      { id: sid(), date: daysAgo(3), channel: 'website', role: 'champion', personName: 'Hannah Price', action: 'Viewed case studies page', isDetected: false },
      { id: sid(), date: daysAgo(4), channel: 'linkedin', role: 'technical', personName: 'Ben Foster', action: 'Engaged with LinkedIn Ad: CTO Guide to Revenue Tech', isDetected: false },
      { id: sid(), date: daysAgo(5), channel: 'linkedin', role: 'blocker', personName: 'Priya Sharma', action: 'Engaged with LinkedIn Ad: Compliance in B2B Platforms', isDetected: true },
      { id: sid(), date: daysAgo(8), channel: 'email', role: 'champion', personName: 'Hannah Price', action: 'Clicked email: Growth Director Benchmarking Report', isDetected: false },
      { id: sid(), date: daysAgo(12), channel: 'linkedin', role: 'blocker', personName: 'Priya Sharma', action: 'Engaged with LinkedIn Ad: Data Security for Fintechs', isDetected: true },
      { id: sid(), date: daysAgo(15), channel: 'website', role: 'champion', personName: 'Hannah Price', action: 'Viewed product features page', isDetected: false },
      { id: sid(), date: daysAgo(20), channel: 'google', role: 'technical', personName: 'Ben Foster', action: 'Clicked Google Ad: API-First Revenue Tools', isDetected: false },
      { id: sid(), date: daysAgo(25), channel: 'linkedin', role: 'champion', personName: 'Hannah Price', action: 'Engaged with LinkedIn Ad: Scale Your Pipeline Campaign', isDetected: false },
      { id: sid(), date: daysAgo(30), channel: 'email', role: 'budget-holder', personName: 'Oliver Nash', action: 'Opened email: CFO Guide to Marketing ROI', isDetected: false },
      { id: sid(), date: daysAgo(40), channel: 'website', role: 'technical', personName: 'Ben Foster', action: 'Viewed integrations page', isDetected: false },
    ],
  },
  {
    id: 'acc-8',
    name: 'Monzo',
    industry: 'Fintech',
    segment: 'Banking',
    penetrationScore: 19,
    momentum: 'down',
    committee: {
      champion: null,
      budgetHolder: null,
      blocker: null,
      technical: null,
    },
    signals: [
      { id: sid(), date: daysAgo(20), channel: 'google', role: 'unknown', personName: 'Unknown Visitor', action: 'Clicked Google Ad: B2B Banking Solutions', isDetected: false },
      { id: sid(), date: daysAgo(30), channel: 'website', role: 'unknown', personName: 'Unknown Visitor', action: 'Viewed homepage', isDetected: false },
      { id: sid(), date: daysAgo(45), channel: 'linkedin', role: 'unknown', personName: 'Unknown Visitor', action: 'Viewed LinkedIn company page', isDetected: false },
      { id: sid(), date: daysAgo(55), channel: 'website', role: 'unknown', personName: 'Unknown Visitor', action: 'Viewed blog: Digital Banking Trends', isDetected: false },
      { id: sid(), date: daysAgo(62), channel: 'google', role: 'unknown', personName: 'Unknown Visitor', action: 'Clicked Google Ad: Fintech Growth Strategies', isDetected: false },
      { id: sid(), date: daysAgo(70), channel: 'linkedin', role: 'unknown', personName: 'Unknown Visitor', action: 'Engaged with LinkedIn Ad: Scale Your Pipeline Campaign', isDetected: false },
      { id: sid(), date: daysAgo(80), channel: 'website', role: 'unknown', personName: 'Unknown Visitor', action: 'Viewed product features page', isDetected: false },
      { id: sid(), date: daysAgo(85), channel: 'google', role: 'unknown', personName: 'Unknown Visitor', action: 'Clicked Google Ad: Revenue Intelligence Platform', isDetected: false },
    ],
  },
  {
    id: 'acc-9',
    name: 'Zilch',
    industry: 'Fintech',
    segment: 'Buy Now Pay Later',
    penetrationScore: 44,
    momentum: 'flat',
    committee: {
      champion: {
        name: 'Chloe Davies',
        title: 'Marketing Manager',
        source: 'crm',
        warmth: 'warm',
        lastSeen: { channel: 'Email', daysAgo: 5 },
      },
      budgetHolder: null,
      blocker: null,
      technical: {
        name: 'Sam Wilson',
        title: 'Head of Product',
        source: 'crm',
        warmth: 'cold',
        lastSeen: { channel: 'LinkedIn', daysAgo: 28 },
      },
    },
    signals: [
      { id: sid(), date: daysAgo(5), channel: 'email', role: 'champion', personName: 'Chloe Davies', action: 'Opened email: Marketing Manager Guide to ABM', isDetected: false },
      { id: sid(), date: daysAgo(10), channel: 'linkedin', role: 'champion', personName: 'Chloe Davies', action: 'Engaged with LinkedIn Ad: ABM Campaign Playbook', isDetected: false },
      { id: sid(), date: daysAgo(15), channel: 'website', role: 'champion', personName: 'Chloe Davies', action: 'Viewed case studies page', isDetected: false },
      { id: sid(), date: daysAgo(20), channel: 'google', role: 'unknown', personName: 'Unknown Visitor', action: 'Clicked Google Ad: BNPL Marketing Solutions', isDetected: false },
      { id: sid(), date: daysAgo(28), channel: 'linkedin', role: 'technical', personName: 'Sam Wilson', action: 'Viewed LinkedIn company page', isDetected: false },
      { id: sid(), date: daysAgo(35), channel: 'website', role: 'unknown', personName: 'Unknown Visitor', action: 'Viewed blog: BNPL Market Insights', isDetected: false },
      { id: sid(), date: daysAgo(45), channel: 'email', role: 'champion', personName: 'Chloe Davies', action: 'Clicked email: Pipeline Acceleration Tactics', isDetected: false },
      { id: sid(), date: daysAgo(55), channel: 'linkedin', role: 'unknown', personName: 'Unknown Visitor', action: 'Engaged with LinkedIn Ad: Scale Your Pipeline Campaign', isDetected: false },
      { id: sid(), date: daysAgo(65), channel: 'google', role: 'unknown', personName: 'Unknown Visitor', action: 'Clicked Google Ad: B2B Payment Solutions', isDetected: false },
    ],
  },
  {
    id: 'acc-10',
    name: 'Curve',
    industry: 'Fintech',
    segment: 'Payments',
    penetrationScore: 67,
    momentum: 'up',
    committee: {
      champion: {
        name: 'Aisha Johnson',
        title: 'VP Marketing',
        source: 'crm',
        warmth: 'warm',
        lastSeen: { channel: 'LinkedIn', daysAgo: 2 },
      },
      budgetHolder: {
        name: 'Patrick Lee',
        title: 'CFO',
        source: 'crm',
        warmth: 'warm',
        lastSeen: { channel: 'Website', daysAgo: 6 },
      },
      blocker: null,
      technical: {
        name: 'Maria Santos',
        title: 'Head of Engineering',
        source: 'crm',
        warmth: 'cold',
        lastSeen: { channel: 'Email', daysAgo: 22 },
      },
    },
    signals: [
      { id: sid(), date: daysAgo(2), channel: 'linkedin', role: 'champion', personName: 'Aisha Johnson', action: 'Engaged with LinkedIn Ad: VP Marketing Revenue Playbook', isDetected: false },
      { id: sid(), date: daysAgo(4), channel: 'email', role: 'champion', personName: 'Aisha Johnson', action: 'Opened email: How Curve Can Scale Pipeline 3x', isDetected: false },
      { id: sid(), date: daysAgo(6), channel: 'website', role: 'budget-holder', personName: 'Patrick Lee', action: 'Viewed pricing page', isDetected: false },
      { id: sid(), date: daysAgo(9), channel: 'linkedin', role: 'budget-holder', personName: 'Patrick Lee', action: 'Engaged with LinkedIn Ad: CFO Guide to Revenue Efficiency', isDetected: false },
      { id: sid(), date: daysAgo(12), channel: 'website', role: 'champion', personName: 'Aisha Johnson', action: 'Viewed case studies page', isDetected: false },
      { id: sid(), date: daysAgo(18), channel: 'google', role: 'champion', personName: 'Aisha Johnson', action: 'Clicked Google Ad: B2B Marketing Attribution', isDetected: false },
      { id: sid(), date: daysAgo(22), channel: 'email', role: 'technical', personName: 'Maria Santos', action: 'Opened email: Technical Integration Overview', isDetected: false },
      { id: sid(), date: daysAgo(30), channel: 'linkedin', role: 'champion', personName: 'Aisha Johnson', action: 'Engaged with LinkedIn Ad: Scale Your Pipeline Campaign', isDetected: false },
      { id: sid(), date: daysAgo(40), channel: 'website', role: 'budget-holder', personName: 'Patrick Lee', action: 'Viewed ROI calculator page', isDetected: false },
      { id: sid(), date: daysAgo(50), channel: 'google', role: 'technical', personName: 'Maria Santos', action: 'Clicked Google Ad: API-First Revenue Tools', isDetected: false },
    ],
  },
]

// Aggregate helpers
export function getAllContacts() {
  const contacts = []
  for (const account of accounts) {
    const { committee } = account
    for (const [role, member] of Object.entries(committee)) {
      if (member) {
        contacts.push({
          ...member,
          role,
          accountId: account.id,
          accountName: account.name,
        })
      }
    }
  }
  return contacts
}

export function getAllSignals() {
  return accounts.flatMap((account) =>
    account.signals.map((signal) => ({
      ...signal,
      accountId: account.id,
      accountName: account.name,
    }))
  )
}

export function getDetectedContacts() {
  return getAllContacts().filter((c) => c.source === 'detected')
}

export function getAccountById(id) {
  return accounts.find((a) => a.id === id)
}
