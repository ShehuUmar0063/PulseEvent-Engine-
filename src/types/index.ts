export type EventContext =
  | 'Hacktoberfest / Tech Meetup'
  | 'Academic Conference'
  | 'Corporate Summit'
  | 'Workshop';

export type ActiveView = 'feed' | 'vault' | 'bulletin' | 'settings';

export interface UserSession {
  username: string;
  role: string;
  name: string;
  token: string;
  loginTime: string;
}

export interface ExtractedMetadata {
  sessionTitle: string;
  presenterName: string;
  keyQuotes: string[];
  altText: string;
  sentimentScore: number; // 0 to 1
  sentimentLabel: 'Very Positive' | 'Positive' | 'Engaging' | 'Neutral' | 'Critical';
  category: 'Keynote Presentation' | 'Technical Architecture' | 'Panel Discussion' | 'Interactive Workshop' | 'Press & Announcement';
  tags: string[];
  thinkReasoning: string[];
}

export interface BulletinPackage {
  pressRelease: string;
  socialPosts: {
    x: string;
    linkedin: string;
    mastodon: string;
  };
  generatedAt: string;
}

export interface VaultAsset {
  id: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  previewUrl: string;
  capturedAt: string;
  eventContext: EventContext;
  metadata: ExtractedMetadata;
  bulletin?: BulletinPackage;
  rawThinkTrace?: string;
}
