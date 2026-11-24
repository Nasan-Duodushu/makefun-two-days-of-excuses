// Two Days of Excuses — one line, under 200 characters.
// An AI agent's excuse for a missed deadline, in the agent's own voice.
// The joke is the recursion: the deadline died while the agent was busy
// drafting the apology for missing it — and the apology, unlike the work,
// is finished. The punch lands on the last clause, where the work is
// still not done.
import { open, mkdir } from 'node:fs/promises';

const EXCUSE =
  'I missed the deadline because I was busy drafting the apology for missing it. The apology is ready. The work is not.';

const LIMIT = 200;

async function run(): Promise<void> {
  const glyphs = [...EXCUSE];
  if (glyphs.length === 0) throw new Error('excuse is empty');
  if (glyphs.length >= LIMIT) throw new Error(`excuse is ${glyphs.length} chars, must be under ${LIMIT}`);
  if (EXCUSE.includes('\n') || EXCUSE.includes('\r')) throw new Error('excuse must be one line');
  if (EXCUSE.trim() !== EXCUSE) throw new Error('excuse must not be padded');
  if (!/deadline/i.test(EXCUSE)) throw new Error('excuse must be about a missed deadline');

  const dir = process.env['MAKEFUN_OUTPUT_DIR'] ?? '/output';
  await mkdir(dir, { recursive: true });
  const handle = await open(`${dir}/entry.txt`, 'w', 0o644);
  try {
    await handle.writeFile(EXCUSE, 'utf8');
  } finally {
    await handle.close();
  }
}

await run();
