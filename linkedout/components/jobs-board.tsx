'use client';

import { useMemo, useState } from 'react';
import { Building2, MapPin, Search, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  workplace: 'Remote' | 'Hybrid' | 'On-site';
  pay: string;
  posted: string;
  applicants: string;
  initials: string;
  color: string;
  about: string;
  requirements: string[];
};

const RICKROLL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
const TIKTOK = 'https://www.tiktok.com/';

const jobs: Job[] = [
  { id: 1, title: 'Chief Horizontal Officer', company: 'Bedside Consulting', location: 'Remote', workplace: 'Remote', pay: '$0 + pillow equity', posted: '2h ago', applicants: '1,204 applicants', initials: 'BC', color: 'blue', about: 'Lead the organization from a fully horizontal position. You will own rest-based workflows, decline morning standups, and deliver nothing ahead of schedule.', requirements: ['3+ years negotiating with a duvet', 'Comfortable operating below sea level (the mattress)', 'Able to snooze with executive presence'] },
  { id: 2, title: 'Unpaid Vibes Intern', company: "My Parents' House", location: 'Chicago, IL', workplace: 'On-site', pay: 'Leftovers + exposure', posted: '4h ago', applicants: '86 applicants', initials: 'PH', color: 'green', about: 'A highly competitive internship inside a familiar four-bedroom campus. Responsibilities include existing, occasionally loading the dishwasher, and telling relatives you are "figuring it out."', requirements: ['Available after noon', 'Willing to be introduced as "the smart one"', 'Own transportation (the hallway)'] },
  { id: 3, title: 'Senior Group Chat Lurker', company: 'Pivot & Co.', location: 'Anywhere', workplace: 'Remote', pay: 'Equity in unread messages', posted: '6h ago', applicants: '412 applicants', initials: 'PC', color: 'violet', about: 'Our startup has pivoted into a group chat. We need someone who can read everything, reply "lol" at strategic intervals, and never be the one who starts the plan.', requirements: ['Seen-but-not-replied mastery', 'Voice-note literacy', 'Will not ask "what are we doing tho"'] },
  { id: 4, title: 'Referral-Track Dishwasher', company: 'Apartment 4B Hospitality', location: 'On-site', workplace: 'On-site', pay: 'One slice of pizza', posted: '8h ago', applicants: '19 applicants', initials: '4B', color: 'orange', about: 'We referred our roommate and the role is somehow still open. You will operate in a high-temperature environment and ask no questions whatsoever.', requirements: ['Plate-loading intuition', 'Availability after dinner', 'Unbothered by a sponge of unknown age'] },
  { id: 5, title: 'Canvas Tab Closer', company: 'Strategic Academic Awareness', location: 'Hybrid', workplace: 'Hybrid', pay: 'Course credit, pending', posted: '1d ago', applicants: '640 applicants', initials: 'SA', color: 'coral', about: 'Open the learning portal, acknowledge the missing assignments with eye contact, and close the tab. This is not avoidance. This is governance.', requirements: ['Can look at a red notification badge', 'Strong closing reflex', 'Growth mindset, specifically about deadlines'] },
  { id: 6, title: 'Professional Snooze Operator', company: 'Alarm Clock Industries', location: 'Remote', workplace: 'Remote', pay: '$15/hr in regret', posted: '1d ago', applicants: '2,011 applicants', initials: 'AC', color: 'yellow', about: 'Three alarms. Two snoozes. One intense negotiation. You will be the human interface between a phone and a person who is not ready.', requirements: ['9-minute interval expertise', 'Calm under the third alarm', 'Will not judge the user (it is you)'] },
  { id: 7, title: 'Rejection Email Copywriter', company: 'Automated Hope Inc.', location: 'Remote', workplace: 'Remote', pay: 'Competitive silence', posted: '2d ago', applicants: '333 applicants', initials: 'AH', color: 'red', about: 'Write the "unfortunately" that keeps candidates grateful. Templates should feel personal while being sent to everyone at 4:02 a.m.', requirements: ['Fluent in "we were impressed"', 'Never uses an exclamation point by accident', 'Comfortable being the plot twist'] },
  { id: 8, title: 'Reel Ethnographer', company: 'Short Form Institute', location: 'Remote', workplace: 'Remote', pay: 'Unlimited scroll', posted: '2d ago', applicants: '900 applicants', initials: 'SF', color: 'pink', about: 'Eight focused hours of short video. You will develop a nuanced understanding of which dog has the best morning routine and call it market research.', requirements: ['Thumb endurance', 'Can distinguish a hack from a recipe', 'Will cite the algorithm in your acknowledgements'] },
  { id: 9, title: 'Open-to-Work Mascot', company: 'LinkedOut', location: 'Chicago, IL', workplace: 'Hybrid', pay: 'Profile views', posted: '3d ago', applicants: '7 applicants', initials: 'LO', color: 'navy', about: 'Wear the green banner. Wave at recruiters who almost viewed you. Represent optional ambition with a straight face.', requirements: ['Banner-ready headshot', 'Can say "open to work, but not before noon"', 'Two connections, preferably family'] },
  { id: 10, title: '5 AM Club Overnight Associate', company: 'Sleep Optional LLC', location: 'Night shift', workplace: 'On-site', pay: 'Passion', posted: '3d ago', applicants: '128 applicants', initials: 'SO', color: 'purple', about: 'Join the club the honest way: do not sleep until 5 a.m. Reorganize playlists. Reply "lol" to a message from 2019. Discipline looks different for everyone.', requirements: ['Awake at an unhelpful hour', 'Spotify admin privileges', 'No plans before lunch'] },
  { id: 11, title: 'Bowl Partnership Lead', company: 'Fast Casual Strategy', location: 'Hybrid', workplace: 'Hybrid', pay: 'Guac, sometimes', posted: '4d ago', applicants: '275 applicants', initials: 'FC', color: 'teal', about: 'Enter a high-stakes partnership with a bowl provider. You will choose rice, decline the upcharge, and brief leadership on the emotional ROI of extra cheese.', requirements: ['Decision speed under a line', 'Can eat and call it a sync', 'Unfazed by "mild, medium, or hot"'] },
  { id: 12, title: 'Vision Board Compliance Officer', company: 'Manifest & Co.', location: 'Remote', workplace: 'Remote', pay: 'Good vibes', posted: '5d ago', applicants: '51 applicants', initials: 'MC', color: 'coral', about: 'Audit vision boards for unrealistic internships. When the board fails, you will help the owner say they "withdrew to focus on other things."', requirements: ['Magazine-cutout literacy', 'Gentle with delusion', 'Keeps a folder named Plot Twist'] },
];

const workplaces = ['All', 'Remote', 'Hybrid', 'On-site'] as const;

function surpriseLink() {
  if (Math.random() >= 0.5) return null;
  return Math.random() < 0.5 ? RICKROLL : TIKTOK;
}

export function JobsBoard({ notify }: { notify: (message: string) => void }) {
  const [query, setQuery] = useState('');
  const [workplace, setWorkplace] = useState<(typeof workplaces)[number]>('All');
  const [selectedId, setSelectedId] = useState(jobs[0].id);
  const [applied, setApplied] = useState<number[]>([]);
  const [applying, setApplying] = useState<Job | null>(null);
  const [note, setNote] = useState("I am humbled to apply. My core competency is optional ambition, and I can start after a brief restoration sprint.");

  const visible = useMemo(() => jobs.filter(job => {
    const haystack = `${job.title} ${job.company} ${job.location}`.toLowerCase();
    const matchesQuery = haystack.includes(query.trim().toLowerCase());
    const matchesPlace = workplace === 'All' || job.workplace === workplace;
    return matchesQuery && matchesPlace;
  }), [query, workplace]);

  const selected = visible.find(job => job.id === selectedId) ?? visible[0] ?? null;

  const openLink = (job: Job, kind: 'posting' | 'apply') => {
    const url = surpriseLink();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
      notify(url === RICKROLL
        ? `${job.company} redirected you. The hiring manager will never give you up.`
        : `${job.company} sent your application to a short-form content ecosystem.`);
      return;
    }
    if (kind === 'posting') {
      notify(`${job.company} has no website. The posting is the website.`);
      return;
    }
    setNote("I am humbled to apply. My core competency is optional ambition, and I can start after a brief restoration sprint.");
    setApplying(job);
  };

  const submit = () => {
    if (!applying) return;
    setApplied(current => current.includes(applying.id) ? current : [...current, applying.id]);
    setApplying(null);
    notify('Application sent. A human will not read this, but the vibe was received.');
  };

  return <section className="jobs-shell" aria-label="Jobs">
    <div className="jobs-toolbar card">
      <label className="jobs-search"><Search size={16} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search dummy jobs" aria-label="Search jobs" /></label>
      <div className="jobs-filters" role="tablist" aria-label="Workplace">
        {workplaces.map(place => <button key={place} className={workplace === place ? 'active' : ''} onClick={() => setWorkplace(place)}>{place}</button>)}
      </div>
      <span className="jobs-count">{visible.length} suspiciously easy roles</span>
    </div>
    <div className="jobs-layout">
      <div className="jobs-list card">
        {visible.length === 0 && <p className="jobs-empty">No roles match that. Even the fake ones have standards.</p>}
        {visible.map(job => <button key={job.id} className={`job-row ${selected?.id === job.id ? 'active' : ''}`} onClick={() => setSelectedId(job.id)} aria-label={job.title}>
          <span className={`avatar avatar-${job.color} avatar-md`} aria-hidden="true">{job.initials}</span>
          <span>
            <b>{job.title}</b>
            <small>{job.company}</small>
            <small>{job.location} · {job.workplace} · {job.posted}</small>
            {applied.includes(job.id) && <em>Applied</em>}
          </span>
        </button>)}
      </div>
      {selected && <article className="jobs-detail card">
        <header>
          <span className={`avatar avatar-${selected.color} avatar-lg`} aria-hidden="true">{selected.initials}</span>
          <div>
            <h2>{selected.title}</h2>
            <p><Building2 size={14} /> {selected.company}</p>
            <p><MapPin size={14} /> {selected.location} · {selected.workplace} · {selected.pay}</p>
            <p className="jobs-meta">{selected.posted} · {selected.applicants}</p>
          </div>
        </header>
        <div className="jobs-actions">
          <Button className="publish-button" onClick={() => openLink(selected, 'apply')} disabled={applied.includes(selected.id)}>
            {applied.includes(selected.id) ? 'Applied' : 'Easy Apply'} <Send size={15} />
          </Button>
          <button className="jobs-link" onClick={() => openLink(selected, 'posting')}>View posting</button>
        </div>
        <h3>About the job</h3>
        <p>{selected.about}</p>
        <h3>You might be a fit if</h3>
        <ul>{selected.requirements.map(item => <li key={item}>{item}</li>)}</ul>
      </article>}
    </div>
    {applying && <div className="apply-backdrop" role="presentation" onClick={() => setApplying(null)}>
      <form className="apply-modal card" role="dialog" aria-labelledby="apply-title" onClick={event => event.stopPropagation()} onSubmit={event => { event.preventDefault(); submit(); }}>
        <div className="apply-head"><h2 id="apply-title">Apply to {applying.title}</h2><button type="button" aria-label="Close application" onClick={() => setApplying(null)}><X size={18} /></button></div>
        <p>{applying.company} would like a few details they will not open.</p>
        <label>Name<input defaultValue="Keshav Partha" /></label>
        <label>Email<input defaultValue="keshav@doingnothing.dev" /></label>
        <label>Why you<textarea value={note} onChange={event => setNote(event.target.value)} /></label>
        <Button className="publish-button" type="submit">Submit application <Send size={15} /></Button>
      </form>
    </div>}
  </section>;
}
