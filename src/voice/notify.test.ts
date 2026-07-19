import { describe, expect, it, vi } from 'vitest';
import { createVoiceNotifyHandler, type VoiceNotifier } from './notify.ts';

type MemberStub = {
  nickname: string | null;
  user: { globalName: string | null; username: string };
};

type ChannelStub = {
  id: string;
  name: string;
  members: Map<string, MemberStub>;
};

type VoiceStateStub = {
  channelId: string | null;
  member?: MemberStub | null;
  channel?: ChannelStub | null;
};

const member = (overrides: {
  nickname?: string | null;
  globalName?: string | null;
  username?: string;
} = {}): MemberStub => ({
  nickname: overrides.nickname ?? null,
  user: {
    globalName: overrides.globalName ?? null,
    username: overrides.username ?? 'user'
  }
});

const channel = (
  id: string,
  name: string,
  members: MemberStub[] = []
): ChannelStub => ({
  id,
  name,
  members: new Map(members.map((m, index) => [String(index + 1), m]))
});

const createNotifier = (): VoiceNotifier => ({
  send: vi.fn().mockResolvedValue(101),
  delete: vi.fn().mockResolvedValue(undefined)
});

const joinFrom = (
  voiceChannel: ChannelStub,
  joiner: MemberStub
): [VoiceStateStub, VoiceStateStub] => [
  { channelId: null },
  {
    channelId: voiceChannel.id,
    member: joiner,
    channel: voiceChannel
  }
];

const leaveFrom = (voiceChannel: ChannelStub): [VoiceStateStub, VoiceStateStub] => [
  {
    channelId: voiceChannel.id,
    channel: voiceChannel
  },
  { channelId: null }
];

describe('createVoiceNotifyHandler', () => {
  it('notifies Telegram when a member joins a voice channel', async () => {
    const notifier = createNotifier();
    const handle = createVoiceNotifyHandler(notifier);
    const joiner = member({ nickname: 'TestUser' });
    const voiceChannel = channel('channel-1', 'General', [joiner]);

    await handle(...(joinFrom(voiceChannel, joiner) as [any, any]));

    expect(notifier.send).toHaveBeenCalledOnce();
    const text = vi.mocked(notifier.send).mock.calls[0]![0];
    expect(text).toContain('<b>General</b>');
    expect(text).toContain('<b>TestUser</b>');
    expect(text).toContain('Сейчас в канале:');
  });

  it('uses display name fallbacks nickname → globalName → username', async () => {
    const notifier = createNotifier();
    const handle = createVoiceNotifyHandler(notifier);

    const byNickname = member({ nickname: 'Nick', username: 'login' });
    await handle(
      ...(joinFrom(channel('c1', 'A', [byNickname]), byNickname) as [any, any])
    );

    const byGlobalName = member({ globalName: 'Global', username: 'login' });
    await handle(
      ...(joinFrom(channel('c2', 'B', [byGlobalName]), byGlobalName) as [
        any,
        any
      ])
    );

    const byUsername = member({ username: 'login-only' });
    await handle(
      ...(joinFrom(channel('c3', 'C', [byUsername]), byUsername) as [any, any])
    );

    const texts = vi.mocked(notifier.send).mock.calls.map(([text]) => text);
    expect(texts[0]).toContain('<b>Nick</b>');
    expect(texts[1]).toContain('<b>Global</b>');
    expect(texts[2]).toContain('<b>login-only</b>');
  });

  it('notifies and deletes tracked join messages when the channel becomes empty', async () => {
    const notifier = createNotifier();
    vi.mocked(notifier.send)
      .mockResolvedValueOnce(101)
      .mockResolvedValueOnce(102)
      .mockResolvedValueOnce(999);

    const handle = createVoiceNotifyHandler(notifier);
    const first = member({ nickname: 'Alice' });
    const second = member({ nickname: 'Bob' });

    await handle(
      ...(joinFrom(channel('channel-1', 'General', [first]), first) as [
        any,
        any
      ])
    );
    await handle(
      ...(joinFrom(channel('channel-1', 'General', [first, second]), second) as [
        any,
        any
      ])
    );
    await handle(
      ...(leaveFrom(channel('channel-1', 'General', [])) as [any, any])
    );

    expect(notifier.send).toHaveBeenCalledTimes(3);
    const emptyText = vi.mocked(notifier.send).mock.calls[2]![0];
    expect(emptyText).toContain('<b>General</b>');
    expect(emptyText).toContain('опустел');

    expect(notifier.delete).toHaveBeenCalledTimes(2);
    expect(notifier.delete).toHaveBeenNthCalledWith(1, 101);
    expect(notifier.delete).toHaveBeenNthCalledWith(2, 102);
  });

  it('does not notify on leave when other members remain', async () => {
    const notifier = createNotifier();
    const handle = createVoiceNotifyHandler(notifier);
    const remaining = member({ nickname: 'StillHere' });

    await handle(
      ...(leaveFrom(channel('channel-1', 'General', [remaining])) as [any, any])
    );

    expect(notifier.send).not.toHaveBeenCalled();
    expect(notifier.delete).not.toHaveBeenCalled();
  });

  it('ignores join without member or channel', async () => {
    const notifier = createNotifier();
    const handle = createVoiceNotifyHandler(notifier);

    await handle(
      { channelId: null } as any,
      { channelId: 'channel-1', member: null, channel: null } as any
    );

    expect(notifier.send).not.toHaveBeenCalled();
  });

  it('ignores channel switches that are not pure join/leave', async () => {
    const notifier = createNotifier();
    const handle = createVoiceNotifyHandler(notifier);

    await handle({ channelId: 'a' } as any, { channelId: 'b' } as any);

    expect(notifier.send).not.toHaveBeenCalled();
  });
});
