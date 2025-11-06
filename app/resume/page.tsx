import Link from "next/link";
import "./styles.css";
import "./print.css";

export const metadata = {
  title: "Gnanesh's Résumé",
};

export default function Resume() {
  return (
    <div className="resume-container">
      <div>
        <Link href="/" className="no-print">
          ← Back
        </Link>
        <h1>Gnanesh R</h1>
        <div className="contact-info">
          <a href="mailto:gnaneshkunal@outlook.com">
            gnaneshkunal@outlook.com
          </a>
          <br />
          <a href="https://gnanesh.me">
            gnanesh.me
          </a>
          <br />
          <a href="https://github.com/gnaneshkunal">
            github.com/gnaneshkunal
          </a>
          <br />
          <a href="https://linkedin.com/in/gnanesh-kunal">
            linkedin.com/in/gnanesh-kunal
          </a>
        </div>
      </div>

      <section>
        <h2>Summary</h2>
        <p>
          Language-agnostic engineer with expertise in software development,
          demonstrating strong capabilities in understanding requirements, taking
          ownership of design, building, and maintaining solutions. Experienced in
          distributed systems, payment technologies, and open-source contributions.
        </p>
      </section>

      <section>
        <h2>Experience</h2>
        <div>
          <div>
            <div>
              <span>Sept 2021-Present</span> |{" "}
              <a href="https://setu.co">Setu</a> |{" "}
              <strong>Senior Software Engineer</strong>
            </div>
            <ul>
              <li>Led and maintained mission-critical payment infrastructure serving India&apos;s largest credit card payment provider, ensuring 99.95% uptime while handling 150+ TPS consistently with peak loads of over 200 TPS, demonstrating system resilience at scale</li>
              <li>Re-architected payment infrastructure from monolithic to event-driven architecture, scaling system capacity from 100 RPS to 750+ RPS while maintaining strong consistency through Redis integration</li>
              <li>Achieved 100% system uptime through fault-tolerant design and proactive monitoring, implementing automated failover mechanisms and immediate incident response protocols</li>
              <li>Architected critical optimization of transaction table storage (2.39 TB/partition, 8TB+ total, $2K+ monthly costs) reducing partitions by 45%—analyzed TOAST overhead from encrypted JSONB payloads, designed and prototyped stateless message-driven architecture shifting payload storage from PostgreSQL to RabbitMQ in-memory processing, achieving $27K annual cost savings, faster query performance, reduced replication lag, and improved PII security across production environments</li>
              <li>Designed end-to-end NPCI settlement reconciliation system replacing Debezium+Kafka multi-service pipeline—implemented memory-efficient streaming parser (xml.Decoder), bulk CTE-based SQL updates with keyset pagination, and SQS-driven automation for refunds/notifications, eliminating manual processes and enabling instant reconciliation, automated NPCI alerts, missing file detection, and direct FinOps cost analysis</li>
              <li>Led redesign of biller reporting from batch to real-time system, evaluating and implementing PostgreSQL logical replication over CDC/trigger alternatives—deployed partitioned replica database with PL/pgSQL triggers for denormalized aggregations, reducing reporting latency from 30-60 minutes to &lt;1 minute while meeting NPS Biller SLAs even during settlement processing/high load, isolating workload and enabling horizontal scaling</li>
              <li>Led comprehensive k6-based load testing initiative for high-volume client onboarding, scaling system from 917 to 3621 RPS—identified and resolved critical bottlenecks (21-30s p99 latencies, 9% error rates, infrastructure crashes), implemented multi-tier optimization strategy (RDS proxy, multi-shard ElastiCache, ECS auto-scaling), achieving &lt;50ms p99 latency, zero crashes, and significant cost reduction strategies</li>
              <li>Resolved critical memory scalability issue in settlement file processing service—diagnosed buffering leaks in HTTP middleware and implemented zero-copy streaming architecture, reducing memory usage by 99.999% (500MB → 500 bytes per file) and preventing OOM crashes in production</li>
              <li>Diagnosed and resolved production deadlock in NPCI MIS reconciliation affecting payment processing—implemented file-specific filtering to eliminate cross-file scans and circular lock waits in concurrent consumers, restoring system reliability under high-volume loads</li>
              <li>Reduced AWS infrastructure costs by 60-70% through code-level optimizations and efficient auto-scaling implementations while handling high-traffic scenarios</li>
              <li>Managed critical BBPS integrations with multiple partners (Axis, Canara, CRED), implementing bank-specific security algorithms and compliance protocols while serving as primary stakeholder contact</li>
              <li>Built highly reusable system components and utility scripts, enabling rapid deployment of new payment services and reducing development time for team initiatives</li>
              <li>Developed bank integration middleware for payload transformation, enabling seamless vendor onboarding without core application changes</li>
              <li>Automated multi-version API documentation generation with spec file compatibility for internal documentation servers</li>
            </ul>
          </div>

          <div>
            <div>
              <span>Oct 2021-Present</span> |{" "}
              <a href="https://redis.io">Redis</a> |{" "}
              <strong>Software Engineer</strong>
            </div>
            <ul>
              <li>Maintained RedisInsight V1 and provided technical expertise for V2 development</li>
              <li>Implemented visualizers for RedisGraph, RedisTimeseries, and module query explainer</li>
              <li>Developed RDB file parser in Rust for prototyping memory analysis features, with comprehensive support for Redis modules and custom data types</li>
              <li>Developed infrastructure automation using Terraform and enterprise reverse proxy setups</li>
            </ul>
          </div>

          <div>
            <div>
              <span>Aug 2021-Sep 2021</span> |{" "}
              <a href="https://www.tryvital.com">Vital</a> |{" "}
              <strong>Full Stack Engineer II</strong>
            </div>
            <ul>
              <li>Reverse engineered 8sleep&apos;s complex API infrastructure and provided seamless integration pathways, enabling data extraction from proprietary endpoints while ensuring maintainable and robust implementations</li>
              <li>Designed and implemented provider-agnostic dashboard APIs that standardized data formats across multiple health device manufacturers, reducing integration complexity and maintenance overhead</li>
              <li>Built automated testing frameworks for API reliability verification, ensuring consistent data extraction and transformation across various provider platforms and API versions</li>
            </ul>
          </div>

          <div>
            <div>
              <span>Feb 2019-Aug 2021</span> |{" "}
              <a href="https://hashedin.com">HashedIn Technologies</a> |{" "}
              <strong>Senior Software Engineer - 1</strong>
            </div>
            <ul>
              <li>Led integration of RedisGraph, RedisJSON, and RedisGears modules</li>
              <li>Optimized cypher query performance, reducing memory usage by 85%</li>
              <li>Implemented auto-discovery for Redis servers in Kubernetes environments</li>
              <li>Reduced CI resources cost by 50% through optimization</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2>Technical Skills</h2>
        <div>
          <div>
            <strong>Languages:</strong> Golang, Python, Rust, TypeScript, C
          </div>
          <div>
            <strong>Technologies:</strong> React, Docker, Redis, Git, PostgreSQL, RabbitMQ
          </div>
          <div>
            <strong>Cloud & Infrastructure:</strong> AWS, Kubernetes, Terraform
          </div>
          <div>
            <strong>Specializations:</strong> Distributed Systems, System Programming, Reverse Engineering
          </div>
        </div>
      </section>

      <section>
        <h2>Notable Projects</h2>
        <ul>
          <li><strong>LazyKubernetes:</strong> TUI for Kubernetes, winning project in FOSS 2020 hackathon</li>
          <li><strong>RDBParser:</strong> Parser for RDB file implemented in Rust</li>
          <li><strong>Raft-rs & Swim-rs:</strong> Implementation of Raft consensus and SWIM gossip protocol in Rust</li>
        </ul>
      </section>

      <section>
        <h2>Education</h2>
        <div>
          <div>
            <span>2015-2019</span> | VIT University
          </div>
          <div>B.Tech. in Computer Science</div>
        </div>
      </section>

      <p className="no-print">Last updated November 1, 2025</p>
    </div>
  );
}
