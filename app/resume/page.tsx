import Link from "next/link";
import "./styles.css";
import "./print.css";

export const metadata = {
  title: "Gnanesh's Résumé",
};

// ============================================
// RESUME CONTENT - Edit this section to update your resume
// ============================================

const PERSONAL_INFO = {
  name: "Gnanesh R",
  email: "gnaneshkunal@outlook.com",
  website: "gnane.sh",
  github: "github.com/gnaneshkunal",
  linkedin: "linkedin.com/in/gnanesh-kunal",
};

const SUMMARY = "Language-agnostic engineer with expertise in software development, demonstrating strong capabilities in understanding requirements, taking ownership of design, building, and maintaining solutions. Experienced in distributed systems, payment technologies, and open-source contributions.";

const EXPERIENCE = [
  {
    period: "Sept 2021-Present",
    company: "Setu",
    companyUrl: "https://setu.co",
    role: "Senior Software Engineer",
    highlights: [
      "Led and maintained mission-critical payment infrastructure serving India's largest credit card payment provider, ensuring 99.95% uptime while handling 150+ TPS consistently with peak loads of over 200 TPS, demonstrating system resilience at scale",
      "Re-architected payment infrastructure from monolithic to event-driven architecture, scaling system capacity from 100 RPS to 750+ RPS while maintaining strong consistency through Redis integration",
      "Achieved 100% system uptime through fault-tolerant design and proactive monitoring, implementing automated failover mechanisms and immediate incident response protocols",
      "Architected critical optimization of transaction table storage (2.39 TB/partition, 8TB+ total, $2K+ monthly costs) reducing partitions by 45%—analyzed TOAST overhead from encrypted JSONB payloads, designed and prototyped stateless message-driven architecture shifting payload storage from PostgreSQL to RabbitMQ in-memory processing, achieving $27K annual cost savings, faster query performance, reduced replication lag, and improved PII security across production environments",
      "Designed end-to-end NPCI settlement reconciliation system replacing Debezium+Kafka multi-service pipeline—implemented memory-efficient streaming parser (xml.Decoder), bulk CTE-based SQL updates with keyset pagination, and SQS-driven automation for refunds/notifications, eliminating manual processes and enabling instant reconciliation, automated NPCI alerts, missing file detection, and direct FinOps cost analysis",
      "Led redesign of biller reporting from batch to real-time system, evaluating and implementing PostgreSQL logical replication over CDC/trigger alternatives—deployed partitioned replica database with PL/pgSQL triggers for denormalized aggregations, reducing reporting latency from 30-60 minutes to <1 minute while meeting NPS Biller SLAs even during settlement processing/high load, isolating workload and enabling horizontal scaling",
      "Led comprehensive k6-based load testing initiative for high-volume client onboarding, scaling system from 917 to 3621 RPS—identified and resolved critical bottlenecks (21-30s p99 latencies, 9% error rates, infrastructure crashes), implemented multi-tier optimization strategy (RDS proxy, multi-shard ElastiCache, ECS auto-scaling), achieving <50ms p99 latency, zero crashes, and significant cost reduction strategies",
      "Resolved critical memory scalability issue in settlement file processing service—diagnosed buffering leaks in HTTP middleware and implemented zero-copy streaming architecture, reducing memory usage by 99.999% (500MB → 500 bytes per file) and preventing OOM crashes in production",
      "Diagnosed and resolved production deadlock in NPCI MIS reconciliation affecting payment processing—implemented file-specific filtering to eliminate cross-file scans and circular lock waits in concurrent consumers, restoring system reliability under high-volume loads",
      "Reduced AWS infrastructure costs by 60-70% through code-level optimizations and efficient auto-scaling implementations while handling high-traffic scenarios",
      "Managed critical BBPS integrations with multiple partners (Axis, Canara, CRED), implementing bank-specific security algorithms and compliance protocols while serving as primary stakeholder contact",
      "Built highly reusable system components and utility scripts, enabling rapid deployment of new payment services and reducing development time for team initiatives",
      "Developed bank integration middleware for payload transformation, enabling seamless vendor onboarding without core application changes",
      "Automated multi-version API documentation generation with spec file compatibility for internal documentation servers",
    ],
  },
  {
    period: "Oct 2021-Present",
    company: "Redis",
    companyUrl: "https://redis.io",
    role: "Software Engineer",
    highlights: [
      "Maintained RedisInsight V1 and provided technical expertise for V2 development",
      "Implemented visualizers for RedisGraph, RedisTimeseries, and module query explainer",
      "Developed RDB file parser in Rust for prototyping memory analysis features, with comprehensive support for Redis modules and custom data types",
      "Developed infrastructure automation using Terraform and enterprise reverse proxy setups",
    ],
  },
  {
    period: "Aug 2021-Sep 2021",
    company: "Vital",
    companyUrl: "https://www.tryvital.com",
    role: "Full Stack Engineer II",
    highlights: [
      "Reverse engineered 8sleep's complex API infrastructure and provided seamless integration pathways, enabling data extraction from proprietary endpoints while ensuring maintainable and robust implementations",
      "Designed and implemented provider-agnostic dashboard APIs that standardized data formats across multiple health device manufacturers, reducing integration complexity and maintenance overhead",
      "Built automated testing frameworks for API reliability verification, ensuring consistent data extraction and transformation across various provider platforms and API versions",
    ],
  },
  {
    period: "Feb 2019-Aug 2021",
    company: "HashedIn Technologies",
    companyUrl: "https://hashedin.com",
    role: "Senior Software Engineer - 1",
    highlights: [
      "Led integration of RedisGraph, RedisJSON, and RedisGears modules",
      "Optimized cypher query performance, reducing memory usage by 85%",
      "Implemented auto-discovery for Redis servers in Kubernetes environments",
      "Reduced CI resources cost by 50% through optimization",
    ],
  },
];

const TECHNICAL_SKILLS = {
  "Languages": "Golang, Python, Rust, TypeScript, C",
  "Technologies": "React, Docker, Redis, Git, PostgreSQL, RabbitMQ",
  "Cloud & Infrastructure": "AWS, Kubernetes, Terraform",
  "Specializations": "Distributed Systems, System Programming, Reverse Engineering",
};

const PROJECTS = [
  {
    name: "LazyKubernetes",
    description: "TUI for Kubernetes, winning project in FOSS 2020 hackathon",
  },
  {
    name: "RDBParser",
    description: "Parser for RDB file implemented in Rust",
  },
  {
    name: "Raft-rs & Swim-rs",
    description: "Implementation of Raft consensus and SWIM gossip protocol in Rust",
  },
];

const EDUCATION = {
  period: "2015-2019",
  institution: "VIT University",
  degree: "B.Tech. in Computer Science",
};

const LAST_UPDATED = "November 1, 2025";

// ============================================
// RESUME RENDERING - Markup/presentation layer
// ============================================

export default function Resume() {
  return (
    <div className="resume-container">
      <div>
        <Link href="/" className="no-print">
          ← Back
        </Link>
        <h1>{PERSONAL_INFO.name}</h1>
        <div className="contact-info">
          <a href={`mailto:${PERSONAL_INFO.email}`}>
            {PERSONAL_INFO.email}
          </a>
          <br />
          <a href={`https://${PERSONAL_INFO.website}`}>
            {PERSONAL_INFO.website}
          </a>
          <br />
          <a href={`https://${PERSONAL_INFO.github}`}>
            {PERSONAL_INFO.github}
          </a>
          <br />
          <a href={`https://${PERSONAL_INFO.linkedin}`}>
            {PERSONAL_INFO.linkedin}
          </a>
        </div>
      </div>

      <section>
        <h2>Summary</h2>
        <p>{SUMMARY}</p>
      </section>

      <section>
        <h2>Experience</h2>
        <div>
          {EXPERIENCE.map((job, index) => (
            <div key={index}>
              <div>
                <span>{job.period}</span> |{" "}
                <a href={job.companyUrl}>{job.company}</a> |{" "}
                <strong>{job.role}</strong>
              </div>
              <ul>
                {job.highlights.map((highlight, i) => (
                  <li key={i}>{highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Technical Skills</h2>
        <ul>
          {Object.entries(TECHNICAL_SKILLS).map(([category, skills]) => (
            <li key={category}>
              <strong>{category}:</strong> {skills}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Notable Projects</h2>
        <ul>
          {PROJECTS.map((project, index) => (
            <li key={index}>
              <strong>{project.name}:</strong> {project.description}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Education</h2>
        <div>
          <div>
            <span>{EDUCATION.period}</span> | {EDUCATION.institution}
          </div>
          <div>{EDUCATION.degree}</div>
        </div>
      </section>

      <p className="no-print">Last updated {LAST_UPDATED}</p>
    </div>
  );
}
