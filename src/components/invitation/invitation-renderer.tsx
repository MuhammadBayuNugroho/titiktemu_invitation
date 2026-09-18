"use client";

import React, { useState } from "react";
import type { InvitationData, TemplateConfig } from "@/types/invitation";
import { getTemplateConfig } from "@/lib/templates/registry";
import { InvitationCover } from "./sections/invitation-cover";
import { InvitationOpening } from "./sections/invitation-opening";
import { CoupleProfile } from "./sections/couple-profile";
import { EventSection } from "./sections/event-section";
import { CountdownSection } from "./sections/countdown-section";
import { StoryTimeline } from "./sections/story-timeline";
import { GallerySection } from "./sections/gallery-section";
import { WeddingGiftSection } from "./sections/wedding-gift-section";
import { RSVPSection } from "./sections/rsvp-section";
import { GuestbookSection } from "./sections/guestbook-section";
import { MusicPlayer } from "./sections/music-player";
import { ClosingSection } from "./sections/closing-section";

interface InvitationRendererProps {
  data: InvitationData;
  templateSlug?: string;
  guestName?: string;
  isPreview?: boolean;
}

export function InvitationRenderer({
  data,
  templateSlug,
  guestName,
}: InvitationRendererProps) {
  const activeSlug = templateSlug || data.templateSlug || "elegant";
  const config: TemplateConfig = getTemplateConfig(activeSlug);

  const [isOpen, setIsOpen] = useState(false);
  const [playMusic, setPlayMusic] = useState(false);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setPlayMusic(true);
  };

  return (
    <div
      className="relative min-h-screen w-full transition-colors duration-300"
      style={{
        backgroundColor: config.colors.background,
        color: config.colors.foreground,
      }}
    >
      {/* Cover Overlay Screen */}
      <InvitationCover
        data={data}
        config={config}
        guestName={guestName}
        isOpen={isOpen}
        onOpen={handleOpenInvitation}
      />

      {/* Main Invitation Sections */}
      <main className="mx-auto max-w-xl shadow-sm min-h-screen">
        <InvitationOpening data={data} config={config} />
        <CoupleProfile data={data} config={config} />
        <CountdownSection targetDate={data.event.eventDate} config={config} />
        <EventSection data={data} config={config} />
        <StoryTimeline stories={data.stories} config={config} />
        <GallerySection media={data.media} config={config} />
        <WeddingGiftSection gifts={data.gifts} config={config} />
        <RSVPSection
          invitationId={data.id}
          config={config}
          defaultGuestName={guestName}
        />
        <GuestbookSection
          invitationId={data.id}
          config={config}
          defaultGuestName={guestName}
        />
        <ClosingSection data={data} config={config} />
      </main>

      {/* Background Music Player */}
      <MusicPlayer
        musicUrl={data.media.musicUrl}
        config={config}
        autoPlayTrigger={playMusic}
      />
    </div>
  );
}
