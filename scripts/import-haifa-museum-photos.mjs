/**
 * One-off licensed Haifa museum photos importer. Fetches via Commons API and
 * verifies licenses, then patches the page, photo registry and tests.
 */
import {mkdir, readFile, writeFile} from "node:fs/promises";
import {join} from "node:path";
const assets=[
 {id:"hecht",file:"PikiWiki Israel 70469 hecht museum.jpg",expected:"CC BY 2.5",author:"Israel Zeller / PikiWiki Israel",label:"Hecht Museum",alt:"Archaeological exhibits inside the Hecht Museum at the University of Haifa",licenseUrl:"https://creativecommons.org/licenses/by/2.5/"},
 {id:"struck",file:"מוזיאון הרמן שטרוק.jpg",expected:"CC BY-SA 4.0",author:"Haifa Museums",label:"Hermann Struck Museum",alt:"Restored limestone exterior of Hermann Struck's historic house in Haifa",licenseUrl:"https://creativecommons.org/licenses/by-sa/4.0/"},
 {id:"mane-katz",file:"Mane Catz Museum (2).JPG",expected:"CC BY-SA 3.0",author:"Hanay",label:"Mané-Katz Museum",alt:"Historic wrought-iron gate and plaque at the entrance to the Mané-Katz Museum",licenseUrl:"https://creativecommons.org/licenses/by-sa/3.0/"}
];
const headers={"User-Agent":"IsraelTravelHub-Editorial/1.0 (Haifa museum credit + licensing)"};
const temp=join(process.env.RUNNER_TEMP||"/tmp","haifa-museum-image-source");
await mkdir(temp,{recursive:true});
const plain=v=>String(v||"").replace(/<[^>]*>/g,"").replace(/\s+/g," ").trim();
async function get(url,json=false){
 for(let i=1;i<=4;i++)try {
  const r=await fetch(url,{headers,signal:AbortSignal.timeout(55000)});
  if(!r.ok)throw Error("HTTP "+r.status);
  return json?await r.json():Buffer.from(await r.arrayBuffer());
 }catch(e){if(i===4)throw Error("Download failed: "+url+" "+String(e));await new Promise(resolve=>setTimeout(resolve,1200*i));}
}
for(const a of assets){
 const api=new URL("https://commons.wikimedia.org/w/api.php");
 for(const [k,v] of Object.entries({action:"query",format:"json",titles:"File:"+a.file,prop:"imageinfo",iiprop:"url|extmetadata",iiurlwidth:"1280"}))api.searchParams.set(k,v);
 const data=await get(api,true);
 const info=Object.values(data.query?.pages||{})[0]?.imageinfo?.[0];
 if(!info)throw Error("Commons file not found "+a.file);
 const license=plain(info.extmetadata?.LicenseShortName?.value);
 if(license!==a.expected)throw Error(a.id+" license unexpected: "+license);
 const url=info.thumburl||info.url;
 if(!/^https:\/\/(?:upload|thumb)\.wikimedia\.org\//.test(url||""))throw Error("Image host is not Wikimedia: "+a.id);
 const bytes=await get(url);
 if(bytes.length<10000||bytes.length>8000000)throw Error("Bad image size "+a.id+" "+bytes.length);
 await writeFile(join(temp,a.id+".jpg"),bytes);
 a.sourceUrl="https://commons.wikimedia.org/wiki/File:"+encodeURIComponent(a.file.replaceAll(" ","_"));
 console.log("Verified",a.id,license,"bytes:",bytes.length);
}
const photoPath="src/data/haifaMuseumPhotos.ts";
let photos=await readFile(photoPath,"utf8");
if(!photos.includes("New museums are deliberately left without a photo"))throw Error("Photo mapping has changed");
photos=photos.replace("New museums are deliberately left without a photo until the owner supplies one.\n * Do not substitute another institution's image or an invented museum exterior.","The other three museums use independently licensed Wikimedia Commons photos,\n * cropped and compressed locally with visible credit and license links.");
const newPhotos=assets.map(a=>'  "'+a.id+'": {src:"/images/haifa-museums/'+a.id+'.webp",alt:"'+a.alt+'",width:700,height:525},').join("\n");
const end=photos.lastIndexOf("};");
if(end<0)throw Error("No photo map end");
photos=photos.slice(0,end)+newPhotos+"\n"+photos.slice(end);
const credits=assets.map(a=>'  {id:"'+a.id+'",label:"'+a.label+'",author:"'+a.author+'",license:"'+a.expected+'",sourceUrl:"'+a.sourceUrl+'",licenseUrl:"'+a.licenseUrl+'"},').join("\n");
photos+='\n/** Visible credit and license details for the three Commons photographs. */\nexport const haifaMuseumPhotoCredits = [\n'+credits+'\n];\n';

const guidePath="src/components/HaifaMuseumsGuide.tsx";
let guide=await readFile(guidePath,"utf8");
const anchor='import { haifaMuseumPhotos } from "@/data/haifaMuseumPhotos";';
if(!guide.includes(anchor))throw Error("Guide photo import changed");
guide=guide.replace(anchor,'import { haifaMuseumPhotos, haifaMuseumPhotoCredits } from "@/data/haifaMuseumPhotos";');
const marker='      </ul>\n    </SourcesDisclosure>';
if(!guide.includes(marker))throw Error("Guide sources section changed");
const creditMarkup=[
 '      </ul>',
 '      <div className="mt-4 border-t pt-3 text-xs leading-relaxed text-muted-foreground">',
 '        <p>Photo credits (cropped, resized and converted to WebP):</p>',
 '        <ul className="mt-2 space-y-1">{haifaMuseumPhotoCredits.map(photo=><li key={photo.id}>',
 '          <a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{photo.label}</a> — {photo.author} · <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{photo.license}</a>',
 '        </li>)}</ul>',
 '      </div>',
 '    </SourcesDisclosure>'
].join("\n");
guide=guide.replace(marker,creditMarkup);

const testPath="src/data/haifaMuseums.test.ts";
let test=await readFile(testPath,"utf8");
const importAnchor='import {haifaMuseumPhotos} from "@/data/haifaMuseumPhotos";';
if(!test.includes(importAnchor))throw Error("Tests import changed");
test=test.replace(importAnchor,'import {haifaMuseumPhotos,haifaMuseumPhotoCredits} from "@/data/haifaMuseumPhotos";');
const from=test.indexOf('  it("assigns seven distinct, locally stored archive photographs');
const to=test.indexOf('  it("uses the same wide-card visual system',from);
if(from<0||to<0)throw Error("Tests baseline changed");
const newTest=[
 '  it("uses ten distinct local photos and credits the three licensed Wikimedia sources",()=>{',
 '    const unique=new Set<string>();',
 '    for(const museum of haifaMuseums){',
 '      const photo=haifaMuseumPhotos[museum.id]!;',
 '      expect(photo,museum.id).toBeDefined();',
 '      expect(photo.src,museum.id).toMatch(/^\\/images\\/haifa-museums\\/[a-z-]+\\.webp$/);',
 '      expect(existsSync("public"+photo.src),museum.id).toBe(true);',
 '      expect(photo.width,museum.id).toBeGreaterThan(0);',
 '      expect(photo.height,museum.id).toBeGreaterThan(0);',
 '      expect(photo.alt,museum.id).toBeTruthy();',
 '      expect(unique.has(photo.src),museum.id).toBe(false);',
 '      unique.add(photo.src);',
 '    }',
 '    expect(unique.size).toBe(10);',
 '    expect(haifaMuseumPhotoCredits.map(c=>c.id).sort()).toEqual(["hecht","mane-katz","struck"]);',
 '    for(const credit of haifaMuseumPhotoCredits){',
 '      expect(credit.author).toBeTruthy();',
 '      expect(credit.sourceUrl).toMatch(/^https:\\/\\/commons\\.wikimedia\\.org\\/wiki\\/File:/);',
 '      expect(credit.licenseUrl).toMatch(/^https:\\/\\/creativecommons\\.org\\/licenses\\//);',
 '    }',
 '    expect(readFileSync("src/components/HaifaMuseumsGuide.tsx","utf8")).toContain("haifaMuseumPhotoCredits.map");',
 '  });',
 ''
].join("\n");
test=test.slice(0,from)+newTest+test.slice(to);
await writeFile(photoPath,photos);
await writeFile(guidePath,guide);
await writeFile(testPath,test);
console.log("Prepared photo registry, visible CC attributions, and ten-photo regression test");
