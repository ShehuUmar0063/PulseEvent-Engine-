export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { asset, eventContext = 'Tech Meetup' } = req.body || {};
    if (!asset || !asset.sessionTitle) {
      return res.status(400).json({ error: 'Asset information required' });
    }

    const { sessionTitle, presenterName, keyQuotes, altText, sentimentScore, category, tags } = asset;

    const pressRelease = `FOR IMMEDIATE RELEASE

${sessionTitle.toUpperCase()} HIGHLIGHTS ${eventContext.toUpperCase()} PROGRAM

[PULSEWIRE PRESS DESK] — At the ongoing ${eventContext}, keynote speaker ${presenterName} delivered a defining address on "${sessionTitle}". The session anchored critical discourse around open-source technological sovereignty and scalable intelligent systems.

During the presentation, ${presenterName} noted:
${(keyQuotes || []).map((q: string) => `  ${q}`).join('\n')}

The presentation drew notable acclaim, registering an audience engagement sentiment score of ${(sentimentScore * 100).toFixed(0)}%. Media documentation teams cataloged the session as an exemplary ${category.toLowerCase()}, emphasizing the urgent need for verifiable open-weight architectures.

Full archival assets, visual transcripts, and accessibility documentation have been logged into the PulseEvent Engine open vault for international press distribution.

### Media Contact
PulseEvent Engine Press Operations
press@pulseevent-vault.org | Open Press Kit ID: PE-${Date.now().toString().slice(-6)}`;

    const socialX = `LIVE at ${eventContext}: ${presenterName} takes the stage on "${sessionTitle}"! 

Key takeaway: ${keyQuotes && keyQuotes[0] ? keyQuotes[0] : 'Groundbreaking advancements in multimodal workflows.'}

Full Gemma 4 visual transcript & asset vault logged via #PulseEventEngine.
${(tags || []).slice(0, 4).join(' ')}`;

    const socialLinkedIn = `Insightful session underway at ${eventContext}!

Speaker: ${presenterName}
Topic: ${sessionTitle}
Focus Track: ${category}

Key insights shared from the stage:
${(keyQuotes || []).map((q: string) => `• ${q.replace(/^“|”$/g, '')}`).join('\n')}

Recorded audience engagement sentiment: ${(sentimentScore * 100).toFixed(0)}% (High Engagement).

Explore the verified open-source asset vault and press kits:
${(tags || []).join(' ')} #PulseEvent #OpenSource #TechLeadership`;

    res.status(200).json({
      success: true,
      pressRelease,
      socialPosts: {
        x: socialX,
        linkedin: socialLinkedIn,
        mastodon: '',
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
