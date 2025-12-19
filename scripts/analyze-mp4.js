/* eslint-disable no-console */
import fs from "node:fs";
import path from "node:path";

function scanFourCC(buf, fourcc) {
  const needle = Buffer.from(fourcc, "ascii");
  return buf.indexOf(needle) !== -1;
}

function parseTopLevelBoxes(filePath) {
  const fd = fs.openSync(filePath, "r");
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const header = Buffer.alloc(16);
  let offset = 0;
  const boxes = [];

  while (offset + 8 <= fileSize) {
    fs.readSync(fd, header, 0, 16, offset);
    let size = header.readUInt32BE(0);
    const type = header.subarray(4, 8).toString("ascii");
    let headerSize = 8;
    if (size === 1) {
      size = Number(header.readBigUInt64BE(8));
      headerSize = 16;
    } else if (size === 0) {
      size = fileSize - offset;
    }
    boxes.push({ type, offset, size, headerSize });
    if (size <= 0) break;
    offset += size;
    if (boxes.length > 50) break;
  }

  fs.closeSync(fd);
  return { fileSize, boxes };
}

function analyzeMp4(filePath) {
  const stat = fs.statSync(filePath);
  const headSize = Math.min(2 * 1024 * 1024, stat.size);
  const tailSize = Math.min(2 * 1024 * 1024, stat.size);
  const fd = fs.openSync(filePath, "r");
  const head = Buffer.alloc(headSize);
  const tail = Buffer.alloc(tailSize);
  fs.readSync(fd, head, 0, headSize, 0);
  fs.readSync(fd, tail, 0, tailSize, stat.size - tailSize);
  fs.closeSync(fd);

  const hints = {
    avc1: scanFourCC(head, "avc1") || scanFourCC(tail, "avc1"),
    hvc1: scanFourCC(head, "hvc1") || scanFourCC(tail, "hvc1"),
    hev1: scanFourCC(head, "hev1") || scanFourCC(tail, "hev1"),
    vp09: scanFourCC(head, "vp09") || scanFourCC(tail, "vp09"),
    mp4a: scanFourCC(head, "mp4a") || scanFourCC(tail, "mp4a"),
  };

  const { boxes, fileSize } = parseTopLevelBoxes(filePath);
  const moov = boxes.find((b) => b.type === "moov");
  const mdat = boxes.find((b) => b.type === "mdat");
  const fastStart = moov && mdat ? moov.offset < mdat.offset : null;

  return {
    name: path.basename(filePath),
    sizeMB: (fileSize / (1024 * 1024)).toFixed(2),
    codecHints: Object.entries(hints)
      .filter(([, v]) => v)
      .map(([k]) => k)
      .join(", ") || "(nenhum hint encontrado)",
    moovOffset: moov?.offset ?? null,
    mdatOffset: mdat?.offset ?? null,
    fastStart,
    topLevel: boxes.map((b) => `${b.type}@${b.offset}`).join(" "),
  };
}

const base = process.argv[2] || "public/videos";
const dir = path.resolve(process.cwd(), base);
if (!fs.existsSync(dir)) {
  console.error(`Diretório não encontrado: ${dir}`);
  process.exit(1);
}

const files = fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith(".mp4"));
if (!files.length) {
  console.log("Nenhum .mp4 encontrado em", dir);
  process.exit(0);
}

for (const f of files) {
  const info = analyzeMp4(path.join(dir, f));
  console.log("\n===", info.name, "===");
  console.log("sizeMB:", info.sizeMB);
  console.log("codecHints:", info.codecHints);
  console.log("moovOffset:", info.moovOffset, "mdatOffset:", info.mdatOffset, "fastStart:", info.fastStart);
  console.log("topLevel:", info.topLevel);
}


