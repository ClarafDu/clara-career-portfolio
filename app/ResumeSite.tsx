"use client";

import { useEffect, useMemo, useState, type PointerEvent } from "react";

type Mode = "hire" | "partner";
type CaseId = "mulebuy" | "fotor" | "piclumen" | "aliexpress";

const EMAIL = "dcao1255@gmail.com";

const modeCopy = {
  hire: {
    eyebrow: "运营负责人 · 产品运营经理",
    title: "把复杂业务，变成可持续增长的运营系统",
    intro:
      "8年互联网与出海运营管理经验，覆盖跨境电商、海外 SaaS 与 AIGC；能从业务目标出发，连接产品、数据、团队与商业化。",
    primary: "查看代表案例",
    download: "./clara-fulltime-resume.pdf",
    downloadLabel: "下载全职简历",
  },
  partner: {
    eyebrow: "Fractional COO · AI 产品合伙人",
    title: "不只提供建议，和你一起把 AI 产品做成生意",
    intro:
      "面向 AI 产品、出海 SaaS 与早期创业团队，提供从商业化路径、增长体系到组织协同的深度共创。",
    primary: "找到增长解法",
    download: "./clara-fractional-coo.pdf",
    downloadLabel: "下载合作介绍",
  },
} satisfies Record<Mode, Record<string, string>>;

const cases: Array<{
  id: CaseId;
  company: string;
  title: string;
  field: string;
  tags: string[];
  metric: string;
  summary: string;
  challenge: string;
  actions: string[];
  result: string;
  modes: Mode[];
}> = [
  {
    id: "mulebuy",
    company: "Mulebuy",
    title: "跨境平台 0-1 运营体系搭建",
    field: "跨境电商 · 运营负责人",
    tags: ["0-1体系", "商业化", "团队管理"],
    metric: "ROI +40%",
    summary: "9个月完成运营体系、团队、会员与经营分析机制的搭建和交付。",
    challenge: "初创平台从零起步，业务模块多、跨部门协作复杂，缺乏统一的经营目标和数据标准。",
    actions: [
      "组建并管理10+人跨职能团队，覆盖产品、营销、数据、选品和内容。",
      "建立 KPI/OKR、标准化 SOP、数据看板与每日决策播报机制。",
      "重构 EDM 漏斗、人群分层、会员积分体系与关键转化链路。",
    ],
    result: "ROI 从17.6提升至24.9，客诉率下降80%，并创造平台单日订单峰值。",
    modes: ["hire", "partner"],
  },
  {
    id: "fotor",
    company: "Fotor",
    title: "AIGC 产品商业化增长",
    field: "海外 SaaS · 产品运营",
    tags: ["产品运营", "PLG", "商业化"],
    metric: "营收近 2×",
    summary: "围绕 AIGC 功能重做入口与付费路径，让产品能力更快转化为业务结果。",
    challenge: "AIGC 功能快速增加，但用户对核心能力的发现、激活与付费路径仍不够清晰。",
    actions: [
      "主导 App 首页改版，将 AI 能力独立为核心业务入口。",
      "持续监测活跃、试用、付费、留存和续订，动态调整营销与定价策略。",
      "优化 Web 向 App 导流的文案、流程和微动效。",
    ],
    result: "2023年营收较上一年近2倍；AI功能激活率提升20%，点击率由1.5%提升至3.2%。",
    modes: ["hire", "partner"],
  },
  {
    id: "piclumen",
    company: "Piclumen",
    title: "AI 驱动的海外运营重构",
    field: "AIGC · 海外运营负责人",
    tags: ["AI自动化", "GEO", "组织重构"],
    metric: "预算 -40%",
    summary: "在行业流量承压期，重构团队、内容生产流程与社区增长闭环。",
    challenge: "行业流量普遍下滑，传统 SEO 与社媒投入效率下降，团队处于组织调整期。",
    actions: [
      "管理 SEO、内容和设计等10人团队，引入 AI 自动化工作流。",
      "从传统 SEO 探索 GEO，建立 Tutorial、FAQ 与 Landing Page 内容矩阵。",
      "构建‘产品功能—教程内容—Discord社区’反馈闭环。",
    ],
    result: "削减40%低效社媒预算，并在行业流量下滑背景下实现单月销售额环比增长10%。",
    modes: ["hire", "partner"],
  },
  {
    id: "aliexpress",
    company: "AliExpress",
    title: "全球市场与大促运营",
    field: "跨境电商 · 海外营销",
    tags: ["全球化", "用户增长", "营销"],
    metric: "50+ 大促",
    summary: "参与双11、黑五、周年庆等全球营销项目，提升国家站用户触达效率。",
    challenge: "国家站需要在全球大促节奏下兼顾本地营销节点、频道承接与用户触达。",
    actions: [
      "负责国家频道选品、素材与页面迭代，承接大促流量。",
      "协调设计、文案和站外推广资源，完成站点营销日历。",
      "根据实时数据持续调整 EDM 与 Push 的投放策略。",
    ],
    result: "EDM打开率提升至原有水平的220%，Push点击率提升至160%。",
    modes: ["hire"],
  },
];

const problems: Record<Mode, Array<{ label: string; answer: string; cases: CaseId[] }>> = {
  hire: [
    { label: "商业化增长", answer: "从用户生命周期、付费路径和定价促销中找到增长杠杆。", cases: ["fotor", "mulebuy"] },
    { label: "0-1体系搭建", answer: "把战略拆成团队目标、SOP、数据指标与经营节奏。", cases: ["mulebuy"] },
    { label: "团队协作低效", answer: "用目标体系和跨部门机制，让团队从‘忙’走向‘有效’。", cases: ["mulebuy", "piclumen"] },
    { label: "AI产品运营", answer: "连接功能价值、内容教育、用户反馈与付费转化。", cases: ["fotor", "piclumen"] },
    { label: "出海市场增长", answer: "结合全球化运营、本地化触达与低成本内容增长。", cases: ["aliexpress", "piclumen"] },
  ],
  partner: [
    { label: "创始人天天救火", answer: "搭建周度/月度经营机制，让问题回到系统而不是个人。", cases: ["mulebuy"] },
    { label: "用户多但不付费", answer: "重画用户生命周期和付费引导，验证最短商业化路径。", cases: ["fotor"] },
    { label: "获客成本持续上涨", answer: "重构内容、GEO、社区与用户触达，降低对买量的依赖。", cases: ["piclumen", "aliexpress"] },
    { label: "团队扩张后失控", answer: "建立目标、分工、SOP和数据责任人，提升跨部门协同。", cases: ["mulebuy", "piclumen"] },
    { label: "AI产品从0到1", answer: "从价值主张、核心场景到增长与商业化，陪跑验证闭环。", cases: ["fotor", "mulebuy"] },
  ],
};

const capabilities = [
  { key: "商业化", detail: "付费路径、定价促销、会员体系与生命周期价值", proof: "Fotor营收近2倍 · Mulebuy ROI +40%" },
  { key: "组织管理", detail: "目标拆解、跨职能团队、绩效节奏与标准化SOP", proof: "管理10+人团队 · 组织沟通成本降低30%" },
  { key: "产品运营", detail: "需求判断、关键链路、数据监测与跨部门落地", proof: "AI功能激活率 +20% · 点击率 1.5%→3.2%" },
  { key: "全球增长", detail: "GEO、EDM、社区增长与跨文化市场协同", proof: "50+全球大促 · 中英泰三语沟通" },
  { key: "AI效率", detail: "把运营经验转化为可复用的自动化工作流与数字资产", proof: "内容流程标准化 · 低效预算 -40%" },
];

const timeline = [
  { years: "2026—2028", company: "复旦大学管理学院", role: "Fudan-MIT IMBA", note: "全英文授课，连接管理实践与全球商业视野" },
  { years: "2025—2026", company: "Piclumen", role: "海外运营负责人", note: "AI运营重构 · GEO · 团队管理" },
  { years: "2024—2025", company: "Mulebuy", role: "跨境电商运营负责人", note: "平台0-1 · 商业化 · 经营体系" },
  { years: "2023—2024", company: "Fotor", role: "海外产品运营", note: "AIGC产品 · PLG · 营收增长" },
  { years: "2021—2022", company: "万达信息", role: "智慧城市产品运营", note: "政务产品 · 需求管理 · 20+城市培训" },
  { years: "2020—2021", company: "KIXMIX", role: "视频APP产品运营", note: "内容变现 · 单日新增3.5万" },
  { years: "2018—2020", company: "AliExpress", role: "海外市场运营", note: "跨境电商 · 全球大促 · 用户触达" },
];

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="metric-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

export default function ResumeSite() {
  const [mode, setMode] = useState<Mode | null>(null);
  const [problemIndex, setProblemIndex] = useState(0);
  const [caseFilter, setCaseFilter] = useState("全部");
  const [activeCase, setActiveCase] = useState<CaseId | null>(null);
  const [capability, setCapability] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("mode");
    if (query === "hire" || query === "partner") setMode(query);
  }, []);

  useEffect(() => {
    if (!activeCase) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setActiveCase(null);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [activeCase]);

  const selectMode = (nextMode: Mode) => {
    setMode(nextMode);
    setProblemIndex(0);
    setCaseFilter("全部");
    window.history.replaceState(null, "", `?mode=${nextMode}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const visibleCases = useMemo(() => {
    if (!mode) return [];
    return cases.filter(
      (item) => item.modes.includes(mode) && (caseFilter === "全部" || item.tags.includes(caseFilter)),
    );
  }, [mode, caseFilter]);

  const featured = mode ? problems[mode][problemIndex] : null;
  const openCase = cases.find((item) => item.id === activeCase);

  const handleSpotlight = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  if (!mode) {
    return (
      <main className="gateway" onPointerMove={handleSpotlight}>
        <div className="gateway-grid" aria-hidden="true" />
        <header className="gateway-header">
          <a className="monogram" href="#top" aria-label="Clara的个人网站">CL.</a>
          <span>Shanghai · Available for conversations</span>
        </header>

        <section className="gateway-content" id="top">
          <div className="portrait-wrap gateway-portrait">
            <img src="./avatar.png" alt="Clara的动漫职业头像" />
            <span className="status-dot" aria-label="可沟通机会" />
          </div>
          <div className="gateway-copy">
            <p className="kicker">你好，我是 Clara</p>
            <h1>8年出海运营，<br />下一段增长故事，想和谁一起写？</h1>
            <p className="gateway-lead">运营管理者 · Fractional COO · Fudan-MIT IMBA</p>
          </div>
        </section>

        <section className="path-picker" aria-labelledby="path-title">
          <div className="path-heading">
            <span>01 / CHOOSE A PATH</span>
            <h2 id="path-title">你希望和我聊什么？</h2>
          </div>
          <button className="path-card" onClick={() => selectMode("hire")}>
            <span className="path-number">A</span>
            <span className="path-text">
              <small>FOR HIRING TEAMS</small>
              <strong>我在招聘运营负责人</strong>
              <em>看管理经验、增长业绩与完整履历</em>
            </span>
            <span className="path-arrow" aria-hidden="true">↗</span>
          </button>
          <button className="path-card path-card-accent" onClick={() => selectMode("partner")}>
            <span className="path-number">B</span>
            <span className="path-text">
              <small>FOR FOUNDERS</small>
              <strong>我在寻找 AI 产品合伙人</strong>
              <em>看共创方式、解决方案与代表案例</em>
            </span>
            <span className="path-arrow" aria-hidden="true">↗</span>
          </button>
        </section>

        <footer className="gateway-footer">
          <span>Scroll less. Find the right story faster.</span>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </footer>
      </main>
    );
  }

  const copy = modeCopy[mode];
  const filters = mode === "hire"
    ? ["全部", "商业化", "产品运营", "团队管理", "全球化"]
    : ["全部", "0-1体系", "商业化", "组织重构", "AI自动化"];

  return (
    <main className={`site mode-${mode}`}>
      <header className="site-header">
        <a className="monogram" href="#top" aria-label="返回顶部">CL.</a>
        <nav aria-label="主要导航">
          <a href="#proof">实力</a>
          <a href="#cases">案例</a>
          <a href="#journey">经历</a>
          <a href="#library">资料</a>
          <a href="#contact">联系</a>
        </nav>
        <div className="mode-switch" aria-label="切换浏览模式">
          <button className={mode === "hire" ? "active" : ""} onClick={() => selectMode("hire")}>招聘方</button>
          <button className={mode === "partner" ? "active" : ""} onClick={() => selectMode("partner")}>AI合伙人</button>
        </div>
      </header>

      <section className="hero" id="top" onPointerMove={handleSpotlight}>
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="kicker">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p className="hero-intro">{copy.intro}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#cases">{copy.primary}<span>↓</span></a>
            <a className="button button-ghost" href={copy.download} download>{copy.downloadLabel}<span>↗</span></a>
          </div>
          <div className="hero-meta">
            <span>上海</span><span>中文 / English / ไทย</span><span>8年经验</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="portrait-wrap">
            <img src="./avatar.png" alt="Clara的动漫职业头像" />
          </div>
          <div className="identity-card">
            <span>CLARA</span>
            <strong>{mode === "hire" ? "Operations Lead" : "Fractional COO"}</strong>
            <small>Fudan-MIT IMBA Candidate</small>
          </div>
          <div className="orbit-note">OPEN TO<br />THE RIGHT<br />CONVERSATION</div>
        </div>
      </section>

      <section className="metrics" id="proof" aria-label="关键业绩">
        <Metric value="8年" label="互联网与出海运营" />
        <Metric value="10+" label="跨职能团队管理" />
        <Metric value="+40%" label="代表项目 ROI" />
        <Metric value="近2×" label="AIGC 产品营收" />
        <div className="metric-statement">
          <span>MY OPERATING PRINCIPLE</span>
          <p>目标不是“做了多少运营动作”，而是让每个动作都进入可衡量、可复用、可增长的系统。</p>
        </div>
      </section>

      <section className="section problem-section">
        <div className="section-heading">
          <span>02 / START WITH THE PROBLEM</span>
          <h2>{mode === "hire" ? "你需要我解决什么？" : "你的团队卡在哪里？"}</h2>
          <p>选择一个问题，我会把最相关的方法和案例先交给你。</p>
        </div>
        <div className="problem-layout">
          <div className="problem-tabs" role="tablist" aria-label="问题类型">
            {problems[mode].map((problem, index) => (
              <button
                key={problem.label}
                role="tab"
                aria-selected={problemIndex === index}
                className={problemIndex === index ? "active" : ""}
                onClick={() => setProblemIndex(index)}
              >
                <span>0{index + 1}</span>{problem.label}<i aria-hidden="true">→</i>
              </button>
            ))}
          </div>
          {featured && (
            <div className="problem-answer" role="tabpanel">
              <span className="answer-label">我的解法</span>
              <h3>{featured.answer}</h3>
              <div className="answer-cases">
                <span>相关案例</span>
                {featured.cases.map((id) => {
                  const item = cases.find((entry) => entry.id === id)!;
                  return <button key={id} onClick={() => setActiveCase(id)}>{item.company} ↗</button>;
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section case-section" id="cases">
        <div className="section-heading row-heading">
          <div>
            <span>03 / SELECTED IMPACT</span>
            <h2>代表案例，不只列职责</h2>
          </div>
          <p>点击案例，查看从业务问题到结果的完整推演。</p>
        </div>
        <div className="filter-row" aria-label="案例筛选">
          {filters.map((filter) => (
            <button key={filter} className={caseFilter === filter ? "active" : ""} onClick={() => setCaseFilter(filter)}>
              {filter}
            </button>
          ))}
        </div>
        <div className="case-grid">
          {visibleCases.map((item, index) => (
            <button className="case-card" key={item.id} onClick={() => setActiveCase(item.id)}>
              <span className="case-index">0{index + 1}</span>
              <span className="case-field">{item.field}</span>
              <strong>{item.company}</strong>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <span className="case-metric">{item.metric}</span>
              <span className="case-link">查看案例复盘 ↗</span>
            </button>
          ))}
        </div>
      </section>

      <section className="section capability-section">
        <div className="section-heading">
          <span>04 / OPERATING SYSTEM</span>
          <h2>不是技能列表，是证据地图</h2>
        </div>
        <div className="capability-panel">
          <div className="capability-tabs" role="tablist" aria-label="核心能力">
            {capabilities.map((item, index) => (
              <button key={item.key} className={capability === index ? "active" : ""} onClick={() => setCapability(index)}>
                <span>0{index + 1}</span>{item.key}
              </button>
            ))}
          </div>
          <div className="capability-proof" role="tabpanel">
            <span>CAPABILITY / 0{capability + 1}</span>
            <h3>{capabilities[capability].key}</h3>
            <p>{capabilities[capability].detail}</p>
            <strong>{capabilities[capability].proof}</strong>
          </div>
        </div>
      </section>

      <section className="section journey-section" id="journey">
        <div className="section-heading row-heading">
          <div>
            <span>05 / CAREER JOURNEY</span>
            <h2>从全球营销，到经营系统</h2>
          </div>
          <p>每一段经历，都在扩展我理解业务的边界。</p>
        </div>
        <div className="timeline">
          {timeline.map((item) => (
            <article className="timeline-item" key={`${item.years}-${item.company}`}>
              <span className="timeline-year">{item.years}</span>
              <div><strong>{item.company}</strong><h3>{item.role}</h3></div>
              <p>{item.note}</p>
              <span className="timeline-dot" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section className="section library-section" id="library">
        <div className="section-heading row-heading">
          <div>
            <span>06 / CAREER VAULT</span>
            <h2>持续更新的职业资料库</h2>
          </div>
          <p>简历、证书与作品会在这里持续沉淀，让一次浏览变成长期可验证的职业档案。</p>
        </div>
        <div className="library-grid">
          <article className="library-card library-card-live">
            <div className="library-card-head">
              <span>01 / RESUME</span>
              <i>AVAILABLE</i>
            </div>
            <h3>PDF 简历</h3>
            <p>根据浏览目的选择更相关的版本，后续更新时保持入口不变。</p>
            <div className="library-links">
              <a href="./clara-fulltime-resume.pdf" download>全职简历 <span>↓</span></a>
              <a href="./clara-fractional-coo.pdf" download>Fractional COO <span>↓</span></a>
            </div>
          </article>
          <article className="library-card">
            <div className="library-card-head">
              <span>02 / CREDENTIALS</span>
              <i>RESERVED</i>
            </div>
            <h3>证书与资质</h3>
            <p>预留给教育、语言、专业课程与行业认证，支持后续按类别查看和下载。</p>
            <div className="library-tags"><span>Education</span><span>Language</span><span>AI & Business</span></div>
          </article>
          <article className="library-card library-card-wide">
            <div className="library-card-head">
              <span>03 / PORTFOLIO</span>
              <i>RESERVED</i>
            </div>
            <h3>作品集与方法论</h3>
            <p>预留给产品增长方案、商业化复盘、运营体系、研究文章和可公开的项目成果。未来可按 AI 产品、增长、商业化与组织管理筛选。</p>
            <div className="library-placeholder" aria-label="未来作品集分类">
              <span>AI Product</span><span>Growth</span><span>Monetization</span><span>Operating System</span>
            </div>
          </article>
        </div>
      </section>

      {mode === "partner" && (
        <section className="section collaboration-section">
          <div className="collaboration-copy">
            <span>07 / HOW WE CAN WORK</span>
            <h2>从一次诊断开始，<br />再决定一起走多远。</h2>
          </div>
          <div className="collaboration-options">
            <article><span>01</span><h3>长期兼职</h3><p>按月合作，固定高频对齐，持续参与关键经营决策。</p></article>
            <article><span>02</span><h3>项目制</h3><p>围绕0-1冷启动、GEO增长或商业化转化进行阶段性交付。</p></article>
            <article><span>03</span><h3>深度共创</h3><p>面向优质早期AI产品，探索顾问费加业务激励的合伙模式。</p></article>
          </div>
        </section>
      )}

      <section className="contact-section" id="contact">
        <span>LET'S MAKE THE NEXT MOVE COUNT.</span>
        <h2>{mode === "hire" ? "如果你在寻找能对结果负责的运营负责人" : "如果你在寻找懂增长，也懂经营的 AI 产品合伙人"}</h2>
        <p>欢迎直接通过邮件介绍你的团队、产品或职位，我会认真阅读并回复。</p>
        <div className="contact-actions">
          <a className="button button-light" href={`mailto:${EMAIL}`}>写一封邮件 <span>↗</span></a>
          <button className="button button-outline" onClick={copyEmail}>{copied ? "已复制邮箱" : "复制邮箱"}</button>
        </div>
        <a className="contact-email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </section>

      <footer className="site-footer">
        <span>Clara · 2026</span>
        <button onClick={() => { setMode(null); window.history.replaceState(null, "", window.location.pathname); window.scrollTo({ top: 0, behavior: "smooth" }); }}>重新选择浏览路径</button>
        <a href="#top">回到顶部 ↑</a>
      </footer>

      {openCase && (
        <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setActiveCase(null)}>
          <section className="case-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
            <button className="dialog-close" onClick={() => setActiveCase(null)} aria-label="关闭案例详情">×</button>
            <span className="dialog-company">{openCase.company} / CASE STUDY</span>
            <h2 id="dialog-title">{openCase.title}</h2>
            <div className="dialog-metric"><strong>{openCase.metric}</strong><span>代表结果</span></div>
            <div className="dialog-block"><span>业务问题</span><p>{openCase.challenge}</p></div>
            <div className="dialog-block"><span>关键行动</span><ol>{openCase.actions.map((action) => <li key={action}>{action}</li>)}</ol></div>
            <div className="dialog-result"><span>RESULT</span><p>{openCase.result}</p></div>
          </section>
        </div>
      )}
    </main>
  );
}
