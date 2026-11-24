"""Separate frequently imported lightweight UI/data from full article and booking datasets."""
from pathlib import Path
import re, json

def extract(s,start,end):
    a=s.index(start);b=s.index(end,a)
    return s[a:b],s[:a]+s[b:]

registry=Path("src/data/registry.ts")
s=registry.read_text()
identity,s=extract(s,"export interface AuthorProfile {","export const AIRPORT_TRANSFER_CHECK_DATE")
fx,s=extract(s,"export const referenceFxSource:","export const travelGuidePaths")
paths,s=extract(s,"export const travelGuidePaths","const travelGuideSources")
Path("src/data/site-identity.ts").write_text(identity.rstrip()+"\n")
Path("src/data/reference-fx.ts").write_text('import type { ISODate, SourceReference } from "@/data/registry";\n'+fx.rstrip()+"\n")
Path("src/data/travel-guide-paths.ts").write_text(paths.rstrip()+"\n")
registry.write_text(
'import { mosheBarakAuthor, isPublisherUrl } from "@/data/site-identity";\n'
'import { referenceFxSource, referenceFxConfig, initialReferenceFx, type ExchangeRateSnapshot, type ForeignDisplayCurrency } from "@/data/reference-fx";\n'
'import { travelGuidePaths, type TravelGuideId } from "@/data/travel-guide-paths";\n'
'export { mosheBarakAuthor, isPublisherUrl, type AuthorProfile } from "@/data/site-identity";\n'
'export { referenceFxSource, referenceFxConfig, initialReferenceFx, type ExchangeRateSnapshot, type ForeignDisplayCurrency } from "@/data/reference-fx";\n'
'export { travelGuidePaths, type TravelGuideId } from "@/data/travel-guide-paths";\n'+s
)
guideData=Path("src/data/travelGuides.ts")
s=guideData.read_text()
topics,s=extract(s,"export const guideTopics =","export type GuidePhoto")
Path("src/data/guide-topics.ts").write_text(topics.rstrip()+"\n")
guideData.write_text('import { guideTopics, type GuideTopicId } from "@/data/guide-topics";\nexport { guideTopics, type GuideTopicId } from "@/data/guide-topics";\n'+s)
guide=Path("src/components/TravelGuide.tsx")
s=guide.read_text()
tags_and_credit,s=extract(s,"export function GuideTags(","/** Keep section images")
card,s=extract(s,"export function GuideCard(","function GuideDataTable(")
card_imports='''import { Link as RouterLink } from "@tanstack/react-router";
import { SiteLink as Link } from "@/components/SiteLink";
import { BookOpen } from "lucide-react";
import { guideTopics, type GuideTopicId } from "@/data/guide-topics";
import type { GuideDirectoryEntry, GuidePhoto } from "@/data/travelGuides";
import { isPublisherUrl } from "@/data/site-identity";
import { hasPublicPhotoCredit } from "@/lib/photo-credits";
'''
if "stage5PhotoSrcSet" in card:card_imports+='import { stage5PhotoSrcSet } from "@/lib/stage5-photo-variants";\n'
Path("src/components/GuideCard.tsx").write_text(card_imports+"\n"+tags_and_credit+card)
guide.write_text('import { GuideTags, GuidePhotoCredit, GuideCard } from "@/components/GuideCard";\nexport { GuideTags, GuidePhotoCredit, GuideCard } from "@/components/GuideCard";\n'+s)
# Move imports of ONLY lightweight names. Mixed imports remain compatible through re-exports.
sets={
 "@/data/site-identity":{"mosheBarakAuthor","isPublisherUrl","AuthorProfile"},
 "@/data/reference-fx":{"referenceFxSource","referenceFxConfig","initialReferenceFx","ExchangeRateSnapshot","ForeignDisplayCurrency"},
 "@/data/travel-guide-paths":{"travelGuidePaths","TravelGuideId"},
}
moved=[]
for p in Path("src").rglob("*"):
    if p.suffix not in (".tsx",".ts") or p.name.endswith(".test.ts") or p.name.endswith(".test.tsx") or "/test/" in p.as_posix():continue
    if p in (registry,guideData,guide):continue
    s=p.read_text();original=s
    def replace_import(m):
        names={x.strip().removeprefix("type ").split(" as ")[0] for x in m.group(1).split(",") if x.strip()}
        for dest,allowed in sets.items():
            if names and names<=allowed:return m.group(0).replace("@/data/registry",dest)
        return m.group(0)
    s=re.sub(r'import\s+(?:type\s+)?\{([^{}]+)\}\s+from\s+"@/data/registry";',replace_import,s)
    def replace_guide_import(m):
        names={x.strip() for x in m.group(1).split(",") if x.strip()}
        if names and names<={"GuideCard","GuidePhotoCredit","GuideTags"}:return m.group(0).replace("@/components/TravelGuide","@/components/GuideCard")
        return m.group(0)
    s=re.sub(r'import\s+\{([^{}]+)\}\s+from\s+"@/components/TravelGuide";',replace_guide_import,s)
    if s!=original:p.write_text(s);moved.append(str(p))
# Keep the previous source-level contracts available via registry and TravelGuide re-exports.
# Update only the explicit accessible-name expectations changed by the new wording.
name_replacements={
 "Read traveler reviews on Tripadvisor for Moshe Barak":"Read Reviews on TripAdvisor for Moshe Barak",
 "Israel Taxi & Travel home":"Israel Taxi & Travel Moshe Barak – home",
 "Toggle Haifa & the Mediterranean coast attractions":"Toggle Haifa & Coast attractions",
 "Toggle Sea of Galilee & the Jordan River attractions":"Toggle Sea of Galilee & Jordan River attractions",
 "Toggle Negev Desert & Eilat attractions":"Toggle Negev & Eilat attractions",
}
for p in Path("src").rglob("*"):
    if p.suffix not in (".ts",".tsx") or not (".test." in p.name or "/test/" in p.as_posix()):continue
    s=p.read_text();old=s
    for a,b in name_replacements.items():s=s.replace(a,b)
    if s!=old:p.write_text(s)
# Exact optional property typing: omit rather than pass undefined.
p=Path("src/components/MobileNavigationSheet.tsx")
s=p.read_text().replace('onCloseAutoFocus={onCloseAutoFocus} side="left"','{...(onCloseAutoFocus ? { onCloseAutoFocus } : {})} side="left"')
p.write_text(s)
print("LIGHTWEIGHT_IMPORTS",json.dumps({"updated":moved}))
