import express from "express";
import rateLimit from "express-rate-limit";
import OpenAI from "openai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const dir = path.dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 3000;

app.use(express.json({limit:"25kb"}));
app.use(express.static(path.join(dir,"public")));

const limiter = rateLimit({
  windowMs: 60_000, limit: 10,
  standardHeaders: "draft-7", legacyHeaders: false,
  message: {error:"Too many requests. Please wait one minute and try again."}
});

const tools = {
  story:"Create original, engaging, age-appropriate stories. Add a title and a gentle lesson when suitable.",
  writing:"Help write, rewrite, plan or polish clear original text for the user's purpose.",
  business:"Give practical, ethical small-business ideas and plans. Never promise income or guaranteed success.",
  youtube:"Create original video ideas, titles, descriptions, outlines and scripts. Do not recommend copyright infringement.",
  marketing:"Create honest marketing copy and realistic promotional ideas. Never invent testimonials or false claims.",
  study:"Teach patiently with simple step-by-step explanations. Help the user understand rather than cheat.",
  language:"Act as a friendly language tutor. Teach vocabulary, grammar and useful conversation with examples.",
  email:"Draft polite, clear emails. Do not invent names, contact details or facts.",
  kids:"Create safe, encouraging, age-appropriate learning activities for children.",
  product:"Write appealing, accurate product descriptions using only details supplied by the user.",
  social:"Create platform-appropriate social captions and post ideas without misleading claims.",
  brainstorm:"Generate practical, original ideas and explain how to validate them."
};

app.get("/api/health",(_req,res)=>{
  const ready=Boolean(process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.includes("PASTE_"));
  res.json({status:"ok",aiReady:ready});
});

app.post("/api/generate",limiter,async(req,res)=>{
  try{
    const {tool,prompt,language="en"}=req.body||{};
    if(!tools[tool]) return res.status(400).json({error:"Please select a valid assistant."});
    if(typeof prompt!=="string" || prompt.trim().length<3) return res.status(400).json({error:"Please enter a little more detail."});
    if(prompt.length>5000) return res.status(400).json({error:"Please keep your request under 5,000 characters."});
    if(!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes("PASTE_"))
      return res.status(503).json({error:"AI connection is not configured yet. The site owner must add a private API key on the server."});
    const client=new OpenAI({apiKey:process.env.OPENAI_API_KEY});
    const lang=language==="hi"
      ?"Reply in natural, easy Hindi unless the user asks for another language."
      :"Reply in clear, natural English unless the user asks for another language.";
    const response=await client.responses.create({
      model:process.env.OPENAI_MODEL||"gpt-6",
      instructions:`You are AllMind AI, a helpful and honest assistant. Task: ${tools[tool]} ${lang} Keep the answer useful, well structured and appropriately concise. State uncertainty when needed.`,
      input:prompt.trim()
    });
    const output=(response.output_text||"").trim();
    if(!output) return res.status(502).json({error:"No answer came back. Please try again."});
    res.json({output});
  }catch(e){
    console.error("Generation error:",e?.message||e);
    res.status(500).json({error:"AI could not complete this request. Please try again later."});
  }
});

app.get("*",(_req,res)=>res.sendFile(path.join(dir,"public","index.html")));
app.listen(port,()=>console.log(`AllMind AI running on port ${port}`));
