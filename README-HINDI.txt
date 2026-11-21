ALLMIND AI — WEBSITE PACKAGE
============================

आपकी वेबसाइट का नाम: AllMind AI
टैगलाइन: One platform. More possibilities.

इस पैकेज में:
- एक ही पेज पर 12 AI टूल
- हिंदी/अंग्रेजी इंटरफेस
- हर टूल के लिए input box और AI output
- जवाब कॉपी करने का बटन
- मोबाइल-फ्रेंडली डिजाइन
- AI API के लिए server-side connection
- basic request rate limiting
- विज्ञापन के लिए placeholder जगह

महत्वपूर्ण सच्चाई:
यह पूरा वेबसाइट प्रोजेक्ट है, लेकिन यह अपने-आप इंटरनेट पर प्रकाशित नहीं हुआ है।
इसे चलाने के लिए Node.js hosting/server और निजी AI API key चाहिए।
API उपयोग पर शुल्क लग सकता है। मॉडल का नाम .env में अपने API खाते में उपलब्ध मॉडल के अनुसार सेट करें।
API key को कभी index.html, public folder, screenshot या सार्वजनिक Git repository में न रखें।

लोकल टेस्ट:
1. ZIP extract करें।
2. कंप्यूटर पर Node.js LTS install करें।
3. इस folder में terminal खोलें।
4. npm install चलाएँ।
5. .env.example की copy बनाकर उसका नाम .env रखें।
6. .env में OPENAI_API_KEY भरें और OPENAI_MODEL को अपने API खाते में उपलब्ध मॉडल पर सेट करें।
7. npm start चलाएँ।
8. ब्राउज़र में http://localhost:3000 खोलें।

होस्टिंग:
ऐसी Node.js hosting चुनें जो server.js चला सके और environment variables सुरक्षित रखने दे।
Hosting dashboard में OPENAI_API_KEY और OPENAI_MODEL को Environment Variables के रूप में सेट करें।
फिर deploy करें और अपने domain provider के DNS निर्देशों से allmindai.com जोड़ें।
Domain खरीदना/जोड़ना, hosting, API key और billing इस ZIP के अंदर अपने-आप नहीं होते।

लाइव करने से पहले:
- Privacy Policy, Terms, Contact और support details पूरे करें।
- API खर्च सीमा और usage monitoring सेट करें।
- AI output, mobile layout और abuse controls टेस्ट करें।
- Google AdSense approval की गारंटी नहीं है; नीतियाँ और पात्रता अलग से पूरी करनी होंगी।
- अभी दिख रही Ad space केवल placeholder है, live विज्ञापन नहीं।
- इस version में login, database, subscription/payment और admin dashboard शामिल नहीं हैं।

यदि आप नाबालिग हैं, तो API account, domain, hosting और billing setup में माता-पिता/अभिभावक की मदद लें।
