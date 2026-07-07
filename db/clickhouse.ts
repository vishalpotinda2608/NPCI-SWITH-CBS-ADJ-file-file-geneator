import { createClient, type ClickHouseClient } from "@clickhouse/client";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

function readClickhouseConfig() {
  const host = process.env.CLICKHOUSE_HOST ?? "localhost";
  const port = process.env.CLICKHOUSE_HTTP_PORT ?? "8123";
  const protocol = process.env.CLICKHOUSE_PROTOCOL ?? "http";

  return {
    url: process.env.CLICKHOUSE_URL ?? `${protocol}://${host}:${port}`,
    database: process.env.CLICKHOUSE_DATABASE ?? "mms",
    username: process.env.CLICKHOUSE_USER ?? "mms",
    password: process.env.CLICKHOUSE_PASSWORD ?? "",
  };
}

let client: ClickHouseClient | null = null;

export function getClickhouseClient(): ClickHouseClient {
  if (!client) {
    const cfg = readClickhouseConfig();
    client = createClient({
      url: cfg.url,
      username: cfg.username,
      password: cfg.password,
      database: cfg.database,
      request_timeout: 30_000,
    });
  }
  return client;
}

export async function closeClickhouseClient(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
  }
}

export interface MerchantCredential {
  vpa: string;
  mcc: string;
}

export async function fetchMerchantCredentials(): Promise<MerchantCredential[]> {
  const ch = getClickhouseClient();
  const database = process.env.CLICKHOUSE_DATABASE ?? "mms";
  const table = process.env.CLICKHOUSE_ENTITY_CREDENTIALS_TABLE ?? "entity_credentials_uat";

  const result = await ch.query({
    query: `
      SELECT
        trim(vpa) AS vpa,
        trim(mcc) AS mcc
      FROM ${database}.${table}
      WHERE vpa IS NOT NULL
        AND trim(vpa) != ''
        AND onboarding_id IS NOT NULL
        AND status IN ('ACTIVE', 'ACTIVATED')
      ORDER BY vpa
    `,
    format: "JSONEachRow",
  });

  const rows = (await result.json()) as Array<{ vpa: string; mcc: string | null }>;
  return rows
    .filter((row) => row.vpa)
    .map((row) => ({
      vpa: row.vpa,
      mcc: row.mcc || "6012",
    }));
}

/** @deprecated Use fetchMerchantCredentials */
export async function fetchMerchantVPAs(): Promise<string[]> {
  const credentials = await fetchMerchantCredentials();
  return credentials.map((row) => row.vpa);
}
