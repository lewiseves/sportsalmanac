import fs from 'fs';

export async function GET(req, res) {

  const events = await fs.promises.readFile('src/app/api/getEvents/events.json');
  const parsedEvents = JSON.parse(events);

  return new Response(JSON.stringify(parsedEvents), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}