/* global React, ReactDOM */
const { useState, useEffect, useMemo } = React;

const STORAGE_KEY = "baby1k.v3.progress";

const STEPS = [
  {
    id: "open",
    klass: "s1",
    n: 1,
    kicker: "First thing",
    title: "Set up a free custodial account.",
    est: "~10 min",
    lead: "You need a place for the Account money to land. The kind you want is called a custodial account — an investment account in your kid's name that you manage until they're grown. Vanguard, Fidelity, and Schwab all do them for free.",
    tasks: [
      { id: "pick",   t: "Pick a provider: Vanguard, Fidelity, or Schwab.",        h: "Any of the three works. They're all free, all have the funds you need, and you can switch later if you change your mind." },
      { id: "gather", t: "Grab the docs you'll need.",                              h: "Your kid's Social Security card, a photo of their birth certificate, your driver's license, and the routing/account number from your checking account." },
      { id: "open",   t: "On the site, choose \"Custodial\" or \"UTMA\".",         h: "You'll be listed as the custodian (the grown-up); your kid is the beneficiary (the one who gets the money). The signup is about 15 questions." },
      { id: "link",   t: "Link your bank account (optional).",                      h: "Skip this if you just want the $1,000. Add it if you might toss in extra cash later — even $20/month makes a big difference over 18 years." },
    ],
    heads: {
      label: "Heads up",
      text: "Once your kid hits 18 or 21 (depends on your state), the money is legally theirs. You can guide them, but you can't take it back. That's the deal.",
    },
  },
  {
    id: "claim",
    klass: "s2",
    n: 2,
    kicker: "Next up",
    title: "File Form 4547 with your tax return.",
    est: "~10 min",
    lead: "The $1,000 Account contribution doesn't just appear — you have to claim it. You'll file Form 4547 (Trump Account Election) with your 2025 tax return. Your kid must be born between Jan 1, 2025 and Dec 31, 2028, and be a U.S. citizen with a valid Social Security number.",
    tasks: [
      { id: "portal",  t: "Go to trumpaccounts.gov or irs.gov for Form 4547.",        h: "Type it in yourself — don't click links from texts, emails, or social posts. Scammers love this one. The official form is Form 4547, Trump Account Election(s)." },
      { id: "form",    t: "Fill out Form 4547: kid's SSN, account number from Step 1.", h: "The account number is from Step 1 — copy and paste it carefully. One wrong digit and the money goes nowhere. You'll submit this with your tax return." },
      { id: "submit",  t: "File Form 4547 with your 2025 tax return.",                 h: "You can include it when you file your taxes. Keep a copy of the confirmation — you may need it if anything goes sideways." },
      { id: "wait",    t: "Wait 2 to 6 weeks for the $1,000 to land.",                  h: "The Treasury will deposit $1,000 into your Account. It shows up as plain cash in your brokerage account. Don't panic if it takes the full six weeks — that's normal." },
    ],
    heads: {
      label: "Watch out",
      text: "Anyone — anyone — who emails, texts, or calls offering to \"help you claim your child's $1,000\" for a fee is a scammer. The real process is 100% free.",
    },
  },
  {
    id: "invest",
    klass: "s3",
    n: 3,
    kicker: "The important one",
    title: "Buy ONE thing and you're done.",
    est: "~5 min",
    lead: "Cash sitting in the account does nothing — it just slowly loses to inflation. To make the $1,000 actually grow, you're going to buy one thing: an index fund. It holds tiny slices of every big American company. Then you walk away for 18 years.",
    tasks: [
      { id: "login",   t: "Log in and find your cash balance.",            h: "It should say something like \"$1,000.00 settled cash\" near the top of your account screen." },
      { id: "search",  t: "Type \"VTI\" in the search bar and click it.",  h: "VTI is the ticker symbol — like a barcode for a fund. (Other safe picks below if you'd rather.)" },
      { id: "buy",     t: "Hit Buy, enter $1,000, and submit the order.",  h: "It'll let you choose between dollars and shares — pick dollars. The trade goes through within a business day or two." },
      { id: "reinv",   t: "Turn on automatic dividend reinvestment.",      h: "Usually a checkbox in account settings called \"DRIP\" or \"Reinvest Dividends.\" It rolls every payout back into the fund automatically." },
      { id: "calendar",t: "Set a yearly reminder. Then forget about it.",   h: "Seriously. Check it once a year, on a quiet weekend, and otherwise leave it alone. Touching it more often will only hurt." },
    ],
    recommend: { ticker: "VTI", name: "Vanguard Total Stock Market", fee: "0.03%", feeLabel: "yearly fee" },
    alt: [
      { ticker: "VT",  fee: "0.07%", note: "Adds world stocks" },
      { ticker: "VOO", fee: "0.03%", note: "S&P 500 only" },
    ],
    heads: {
      label: "Why this fund?",
      text: "VTI owns a piece of basically every big US company. If the American economy grows over the next 18 years, your kid's money grows. The fee is 3 cents per $100. That's it.",
    },
  },
];

function CheckIcon() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
      <path d="M2 7L8 13L18 1" stroke="#15140f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeroGrowthChart({ rate }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const years = [0, 3, 6, 9, 12, 15, 18];
  const calc = (y) => Math.round(1000 * Math.pow(1 + rate / 100, y));
  const max = calc(18);
  const MAX_BAR_PX = 160;
  const fmt = (n) => {
    if (n >= 1000) {
      const k = n / 1000;
      return "$" + (k >= 10 ? k.toFixed(0) : k.toFixed(1).replace(/\.0$/, "")) + "k";
    }
    return "$" + n;
  };
  return (
    <div className="growth-chart">
      <div className="gc-head">
        <div className="gc-eyebrow">
          <span className="pill">The deal</span>
          <span>just leave it alone</span>
        </div>
        <div className="gc-headline">
          $1,000 grows to <em>~{fmt(max)}</em> by age 18
        </div>
      </div>
      <div className="gc-bars">
        {years.map((yr, i) => {
          const amount = calc(yr);
          const barH = (amount / max) * MAX_BAR_PX;
          return (
            <div className="gc-col" key={yr}>
              <div className="gc-amt">{fmt(amount)}</div>
              <div
                className="gc-bar"
                style={{
                  height: (mounted ? barH : 0) + "px",
                  transitionDelay: i * 70 + "ms",
                }}
              ></div>
            </div>
          );
        })}
      </div>
      <div className="gc-labels">
        {years.map((yr) => (
          <div className="gc-label" key={yr}>{yr === 0 ? "Today" : "Age " + yr}</div>
        ))}
      </div>
      <div className="gc-footnote">
        At a <strong>{rate}% average annual return</strong>, dividends reinvested. Markets bounce — real years won't be this smooth.
      </div>
    </div>
  );
}

function Section({ step, checked, toggle }) {
  const allDone = step.tasks.every((t) => checked[t.id]);
  return (
    <section className={`section ${step.klass} ${allDone ? "done" : ""}`} id={step.id}>
      <div className="done-stamp">✓ DONE</div>
      <div className="section-head">
        <div className="step-badge">
          <div className="lbl">Step</div>
          <div className="n">{step.n}</div>
          <div className="of">of 3</div>
        </div>
        <div className="head-text">
          <div className="kicker">{step.kicker}</div>
          <h2>{step.title}</h2>
          <span className="est">{step.est}</span>
        </div>
      </div>
      <div className="section-body">
        <p className="lead">{step.lead}</p>

        {step.recommend && (
          <>
            <div className="recommend">
              <div>
                <div className="lbl">Buy this one</div>
                <div className="ticker">{step.recommend.ticker}</div>
                <div className="fname">{step.recommend.name}</div>
              </div>
              <div className="fee">
                <div className="v">{step.recommend.fee}</div>
                <div className="l">{step.recommend.feeLabel}</div>
              </div>
            </div>
            <div className="alt-funds">
              <span className="l">Or instead:</span>
              {step.alt.map((a) => (
                <span key={a.ticker} className="alt">{a.ticker}<span>{a.note} · {a.fee}</span></span>
              ))}
            </div>
          </>
        )}

        <ul className="tasks">
          {step.tasks.map((t) => (
            <li key={t.id} className={checked[t.id] ? "checked" : ""} onClick={() => toggle(t.id)}>
              <span className="check"><CheckIcon /></span>
              <div className="task-body">
                <div className="t">{t.t}</div>
                <div className="hint">{t.h}</div>
              </div>
            </li>
          ))}
        </ul>

        {step.heads && (
          <div className="heads">
            <span className="lbl">{step.heads.label}</span>
            <p>{step.heads.text}</p>
          </div>
        )}
      </div>
    </section>
  );
}

function Growth({ rate }) {
  const r = rate / 100;
  const calc = (y) => Math.round(1000 * Math.pow(1 + r, y));
  const at18 = calc(18);
  const at40 = calc(40);
  const at65 = calc(65);
  const fmt = (n) => n.toLocaleString("en-US");
  return (
    <div className="growth">
      <div className="kicker">If you just leave it alone</div>
      <h2>$1,000 turns into <em>real money.</em></h2>
      <p className="sub">
        Numbers assume {rate}% average annual growth, dividends reinvested, you adding nothing else.
        Markets bounce around — these are long-term ballparks, not promises.
      </p>
      <div className="ages">
        <div className="age">
          <div className="when">By age 18 — college</div>
          <div className="amt"><span className="cur">$</span>{fmt(at18)}</div>
          <div className="what">Roughly a year of in-state tuition.</div>
        </div>
        <div className="age">
          <div className="when">By age 40 — adulting</div>
          <div className="amt"><span className="cur">$</span>{fmt(at40)}</div>
          <div className="what">A serious head start on a down payment.</div>
        </div>
        <div className="age">
          <div className="when">By age 65 — retirement</div>
          <div className="amt"><span className="cur">$</span>{fmt(at65)}</div>
          <div className="what">A whole retirement nest egg, from one deposit.</div>
        </div>
      </div>
      <p className="note">
        Real US stock returns have averaged 6–7% per year over long stretches of history. Some decades are better, some worse.
        Adding even $20 a month yourself makes these numbers a lot bigger.
      </p>
    </div>
  );
}

function FAQ() {
  const items = [
    { q: "Does my kid have to be a US citizen?", a: "Yes. The Trump Account pilot program is for U.S. citizen children born between Jan 1, 2025 and Dec 31, 2028, with a valid Social Security number. Check trumpaccounts.gov or irs.gov for complete eligibility rules." },
    { q: "I already have a 529 plan for college. Do I still need this?", a: "Yes — they're different. A 529 is for college costs. The Trump Account $1,000 lives in a separate custodial brokerage account that your kid can use for anything once they're an adult. Both can coexist happily." },
    { q: "Will my kid owe taxes on this?", a: "Probably not for years. The $1,000 itself isn't taxable. Future gains and dividends fall under the \"kiddie tax\" rules, but the first ~$1,300 of investment income a year is tax-free. Most families won't bump into a tax bill until the account is much bigger." },
    { q: "Can I put more money in?", a: "Absolutely. Contributions to Trump Accounts can be made starting July 4, 2026. After the account is open, you can add cash anytime and buy more shares of the same fund. $25/month from grandparents at every birthday adds up to real money by the time your kid is 18." },
    { q: "What if I miss the deadline to claim?", a: "Form 4547 must be filed with your 2025 tax return to claim the $1,000. Check trumpaccounts.gov or irs.gov for the current deadline. Even if you miss the federal $1,000, opening the custodial account and contributing what you can is still a great move — you're giving your kid an 18-year head start." },
    { q: "Why not just stick it in a savings account?", a: "Over 18 years, a high-yield savings account at ~4% turns $1,000 into about $2,000. A stock index fund at ~7% turns it into about $3,400. The gap gets even bigger the longer you wait." },
    { q: "What if the stock market crashes?", a: "It will, multiple times, over the next 18 years. That's normal — markets recover and grow over long stretches. The worst move is selling during a crash. The best move is doing nothing." },
  ];
  return (
    <div className="faq">
      <div className="kicker">Common worries</div>
      <h2>Stuff parents ask.</h2>
      {items.map((it, i) => (
        <details key={i}>
          <summary>{it.q}</summary>
          <p>{it.a}</p>
        </details>
      ))}
    </div>
  );
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "returnRate": 7,
  "mood": "candy"
}/*EDITMODE-END*/;

const MOODS = {
  candy:  { label: "Candy shop",  mint: "#34c47a", coral: "#f06a3a", blue: "#3a6cff" },
  sorbet: { label: "Sorbet",      mint: "#7fcaa0", coral: "#f3a781", blue: "#8aa5f0" },
  bold:   { label: "Crayon bold", mint: "#1d9d4d", coral: "#dd4a1c", blue: "#2447d9" },
  retro:  { label: "Retro school", mint: "#e8c543", coral: "#d94b3c", blue: "#3672b9" },
};

function applyMood(name) {
  const m = MOODS[name] || MOODS.candy;
  const r = document.documentElement;
  r.style.setProperty("--mint", m.mint);
  r.style.setProperty("--coral", m.coral);
  r.style.setProperty("--blue", m.blue);
}

function App() {
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
    catch (_) { return {}; }
  });
  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULTS);

  useEffect(() => { applyMood(tweaks.mood); }, [tweaks.mood]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(checked)); }
    catch (_) {}
  }, [checked]);

  const toggle = (id) => setChecked((p) => ({ ...p, [id]: !p[id] }));

  const totals = useMemo(() => STEPS.map((s) => s.tasks.length), []);
  const dones = STEPS.map((s) => s.tasks.filter((t) => checked[t.id]).length);
  const totalChecked = dones.reduce((a, b) => a + b, 0);
  const totalTasks = totals.reduce((a, b) => a + b, 0);
  const allDone = totalChecked === totalTasks;

  const reset = () => {
    if (confirm("Uncheck everything?")) setChecked({});
  };

  const T = window.TweaksPanel;
  const TSlider = window.TweakSlider;
  const TSelect = window.TweakSelect;

  const pipColors = ["var(--mint)", "var(--coral)", "var(--blue)"];

  return (
    <>
      <div className="topbar">
        <span className="lbl">Your progress</span>
        <div className="pips">
          {STEPS.map((s, i) => (
            <div key={s.id} className="pip">
              <div
                className="fill"
                style={{
                  width: ((dones[i] / totals[i]) * 100) + "%",
                  "--c": pipColors[i],
                }}
              ></div>
            </div>
          ))}
        </div>
        <span className="count">{totalChecked} / {totalTasks}</span>
        <a
          href="StartThemEarlyCheatSheet.pdf"
          download
          className="pdf-btn"
          aria-label="Download PDF"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1V9M7 9L3.5 5.5M7 9L10.5 5.5M1.5 11.5V12.5C1.5 12.78 1.72 13 2 13H12C12.28 13 12.5 12.78 12.5 12.5V11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Download PDF
        </a>
      </div>

      <div className="wrap">
        <header className="hero">
          <div className="sticker sticker-1">From Uncle Sam</div>
          <div className="sticker sticker-2">No strings · No fees</div>
          <div className="eyebrow">A guide for new parents · 2026</div>
          <h1 className="display">
            Your kid gets <span className="amount">$1,000</span> from the government.<br />
            Here's how to claim it.
          </h1>
          <p className="lede">
            The federal government will deposit <strong>$1,000</strong> into a Trump Account for every eligible American child born 2025–2028 — but only if you set it up.
            This guide walks you through it in three steps. About thirty minutes total. Zero fees if you do it right.
          </p>
          <div className="quickfacts">
            <div className="qf">
              <div className="v">30 min</div>
              <div className="l">Total time, start to finish</div>
            </div>
            <div className="qf">
              <div className="v">$0</div>
              <div className="l">It costs you nothing</div>
            </div>
            <div className="qf">
              <div className="v">~$3,400</div>
              <div className="l">What $1,000 becomes by 18</div>
            </div>
          </div>

          <HeroGrowthChart rate={tweaks.returnRate} />
        </header>

        <div className="blurb">
          <h2>Wait — what is this, actually?</h2>
          <p>
            The Trump Account pilot program gives eligible kids a thousand-dollar head start. Real money, deposited into a tax-advantaged investment account (called a Trump Account) in your kid's name.
            Eligibility: your child must be born between Jan 1, 2025 and Dec 31, 2028, and be a U.S. citizen with a valid Social Security number.
            But <strong>it doesn't just appear</strong> — no check in the mail, no automatic transfer. You have to do three things to claim it.
          </p>
          <p>
            Skip any step and the money either doesn't show up, or it sits as cash earning nothing for 18 years. This guide is the no-jargon version: <strong>open the account, file Form 4547, invest it</strong>. That's it.
          </p>
        </div>

        {STEPS.map((step) => (
          <Section key={step.id} step={step} checked={checked} toggle={toggle} />
        ))}

        <div className={"celebrate " + (allDone ? "show" : "")}>
          <h3>That's it. You're done.</h3>
          <p>Seriously, that's the whole thing. Set a calendar reminder for the same day next year, and go enjoy your kid. The money will compound while you sleep.</p>
        </div>

        <Growth rate={tweaks.returnRate} />

        <FAQ />

        <button className="reset" onClick={reset}>Reset my progress</button>

        <footer>
          <p>This is an informational guide written for parents. It's not financial, tax, or legal advice — for the official rules, check irs.gov or treasury.gov. For big decisions, talking to a fee-only fiduciary advisor is cheap insurance.</p>
          <p>Last updated May 2026 · Made by a parent for other parents</p>
        </footer>

        {T && (
          <T title="Tweaks">
            <window.TweakSection label="Color mood" />
            <TSelect
              label="Palette"
              value={tweaks.mood}
              options={Object.keys(MOODS).map((k) => ({ value: k, label: MOODS[k].label }))}
              onChange={(v) => setTweak("mood", v)}
            />
            <window.TweakSection label="Growth math" />
            <TSlider
              label="Assumed return"
              value={tweaks.returnRate}
              min={3} max={10} step={0.5} unit="%"
              onChange={(v) => setTweak("returnRate", v)}
            />
          </T>
        )}
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
