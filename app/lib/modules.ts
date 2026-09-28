export type Field =
  | { id: string; type: "short" | "long"; label: string; help?: string; placeholder?: string }
  | {
      id: string;
      type: "radio" | "check";
      label: string;
      help?: string;
      options: string[];
      info?: Record<string, string>;
      allowOther?: boolean;
      followUp?: { id: string; label: string; help?: string; type?: "short" | "long" };
    };

export type Module = {
  slug: string;
  num: string;
  title: string;
  blurb: string;
  time?: string;
  note?: string;
  files: { label: string; href: string }[];
  fields?: Field[];
  promptFile?: string;
  pasteHint?: string;
  stuck?: { q: string; a: string }[];
  checklist?: string[];
  tools?: string[];
};

export const MODULES: Module[] = [
  {
    slug: "start-here",
    num: "00",
    title: "Start Here",
    blurb:
      "Five minutes of setup that saves you an hour later. Create one Claude Project, put your Master Brain inside it, and make a folder for today's work. Everything you build today lives in those two places.",
    files: [{ label: "The Q4 Moment Menu", href: "/files/Q4-2026_Moment-Menu.md" }],
    checklist: [
      "Laptop open, plugged in, on the Wi-Fi",
      "Logged into Claude",
      "Create a Claude Project and name it: My 90-Day Campaign",
      "Upload your Master Brain into that project's knowledge",
      "Logged into ElevenLabs",
      "Logged into Canva, or whatever you make images with",
      "On your desktop, make a folder called Q4-Campaign with four folders inside it: Flyers, Video, Copy, Calendar",
    ],
    stuck: [
      {
        q: "I cannot find my Master Brain file.",
        a: "Check your Downloads folder and search for 'Master Brain'. If it is truly gone, tell the facilitator. You can rebuild a short version in fifteen minutes and still do everything today.",
      },
      {
        q: "What is a Claude Project and why do I need one?",
        a: "It is a folder inside Claude that remembers things. Put your Master Brain in it once, and all four prompts today will know your business without you pasting it again.",
      },
      {
        q: "I do not have a Master Brain yet.",
        a: "Raise your hand. You will get the short questionnaire and you can build one now. Everything today works once you have it.",
      },
    ],
    tools: ["Claude", "ElevenLabs", "Canva"],
  },

  {
    slug: "who",
    num: "01",
    title: "Who Are You Selling To?",
    blurb:
      "Your customer in November is not the same person as your customer in April. They are in a hurry, buying for other people, and spending money they already set aside. Answer these, then run the prompt to build your Q4 Customer Report.",
    time: "About 20 minutes",
    note:
      "Most of these are open boxes on purpose. There is no list to pick from because the thinking you do here is what makes your campaign sound like your business instead of everybody else's. Rough and honest beats polished and vague.",
    files: [
      { label: "Questionnaire (print version)", href: "/files/Module1_Customer-Trends_Questionnaire.md" },
      { label: "The prompt", href: "/files/Module1_Customer-Trends_Prompt.md" },
    ],
    promptFile: "/files/Module1_Customer-Trends_Prompt.md",
    pasteHint: "Paste this into your My 90-Day Campaign project in Claude.",
    tools: ["Claude"],
    fields: [
      { id: "q1", type: "long", label: "1. What are your top two or three sellers, and roughly what do they cost?", help: "Just the ones that actually move.", placeholder: "Custom cakes, $180 to $400. Cupcake boxes, $45. Cookie trays, $60." },
      { id: "q2", type: "long", label: "2. Who bought from you last holiday season, and what did they buy?", help: "Even a rough memory helps.", placeholder: "Mostly moms ordering birthday cakes, plus a few office parties in December." },
      {
        id: "q3", type: "radio", label: "3. Compared to the rest of your year, last Q4 was:",
        options: ["Much busier", "A little busier", "About the same", "Slower", "I did not track it"],
        followUp: { id: "q3b", label: "Add detail: roughly how much, or which month was strongest.", type: "long" },
      },
      {
        id: "q4", type: "radio", label: "4. Do people buy your thing as a gift for someone else, for themselves, or both?",
        help: "Gift buyers worry whether someone else will like it. Self buyers worry whether they deserve it. Those need completely different words.",
        options: ["Almost always a gift for someone else", "Almost always for themselves", "Both, roughly evenly", "Depends on the product"],
        followUp: { id: "q4b", label: "Which products land on which side?", type: "long" },
      },
      { id: "q5", type: "long", label: "5. What is the most common reason someone hesitates or says no?", help: "The real one, not the polite one.", placeholder: "Price. They think a custom cake should cost $60." },
      { id: "q6", type: "long", label: "6. If someone does not buy from you, what do they do instead?", help: "Another business, a big box store, a DIY version, or nothing at all. Naming the real alternative tells you what you are competing against." },
      { id: "q7", type: "long", label: "7. What do you wish more customers understood about what you sell?", help: "This is usually where your best marketing message is hiding." },
      { id: "q8", type: "long", label: "8. Describe your single best customer. The one you would clone if you could.", help: "Not a category. An actual person you can picture." },
      { id: "q9", type: "long", label: "9. Who is NOT your customer?", help: "Just as important. Being clear here keeps you from writing marketing that attracts the wrong people." },
      { id: "q10", type: "long", label: "10. What does your customer's life look like in the two weeks before a holiday?", help: "Not their shopping. Their life. Stressed, traveling, hosting, kids off school? This tells you when to reach them and what tone to use." },
      { id: "q11", type: "long", label: "11. What has changed about your customers in the last year?", help: "What they ask for, what they will pay, how they find you, what they care about." },
      {
        id: "q12", type: "check", label: "12. Where do most of your customers come from right now?",
        help: "Tick all that apply, then rank your top three below.",
        options: ["Word of mouth and referrals", "Instagram", "Facebook", "TikTok", "Google search or Maps", "Walk-ins or foot traffic", "Repeat customers", "A community or church group", "Networking or BNI", "Email or text list"],
        allowOther: true,
        followUp: { id: "q12b", label: "Your top three, in order, and roughly what share each brings.", type: "long", help: "Example: 1. Word of mouth, more than half. 2. Instagram, maybe a third. 3. Walk-ins, the rest." },
      },
      { id: "q13", type: "long", label: "13. If you could ask your customers one question and get an honest answer, what would you ask?", help: "You are going to get a chance to actually ask it later today." },
    ],
    stuck: [
      { q: "I do not know the numbers.", a: "Guess. An honest estimate is worth more than a blank box, and you can correct it later. Write 'roughly' in front of it and move on." },
      { q: "My answers feel too short.", a: "Short is fine. The prompt is built to expand thin answers and flag what it inferred so you can correct it." },
      { q: "The copy button did not paste everything.", a: "Use 'Download my answers' instead, open the PDF, and copy from there. Both get you to the same place." },
    ],
  },

  {
    slug: "when",
    num: "02",
    title: "When Will You Sell?",
    blurb:
      "A dozen big moments sit between now and December 31. You are going to run three to five, plus a few easy trend-day posts in the gaps. Thanksgiving is already one of them. The point is not to pick the most dates. It is to pick the ones you can actually deliver on.",
    time: "About 20 minutes",
    files: [
      { label: "The Q4 Moment Menu", href: "/files/Q4-2026_Moment-Menu.md" },
      { label: "Questionnaire (print version)", href: "/files/Module2_Moment-Map_Questionnaire.md" },
      { label: "The prompt", href: "/files/Module2_Moment-Map_Prompt.md" },
    ],
    promptFile: "/files/Module2_Moment-Map_Prompt.md",
    pasteHint: "Paste this into your My 90-Day Campaign project in Claude.",
    tools: ["Claude"],
    fields: [
      {
        id: "q1", type: "check", label: "1. Which big moments are you considering?",
        help: "Pick freely. Claude will help you cut down to three to five. Thanksgiving is your anchor either way.",
        options: ["Halloween, Oct 31", "Veterans Day, Nov 11", "Thanksgiving, Nov 26 (anchor)", "Black Friday, Nov 27", "Small Business Saturday, Nov 28", "Cyber Monday, Nov 30", "Giving Tuesday, Dec 1", "Hanukkah, Dec 4 to 12", "Green Monday, Dec 14", "Super Saturday, Dec 19", "Christmas, Dec 25", "New Year's Eve, Dec 31"],
        info: {
          "Halloween, Oct 31": "Saturday. Your warm-up, not your money moment. Great for anything visual or family-facing. Use it to find out which posts your audience responds to, four weeks before the stakes get high.",
          "Veterans Day, Nov 11": "Wednesday. For any business that can offer something real to veterans and their families. Make it specific and generous, not ten percent off. Skip it if you cannot back it up.",
          "Thanksgiving, Nov 26 (anchor)": "Thursday. Everyone builds this one. Gratitude is the only message that works for every business, in every industry, without a discount. You are not selling, you are thanking people, and you are setting up the four days that follow.",
          "Black Friday, Nov 27": "Friday. For product businesses and anything you can bundle. Do not try to out-discount Amazon. Win on the thing they cannot do: you know your customer's name. Small, personal and limited beats big and impersonal.",
          "Small Business Saturday, Nov 28": "Saturday. This is your day. The whole national conversation is about choosing local. You do not have to create the reason to buy from you, it is already in the air. If you only run two moments, make them this and Thanksgiving.",
          "Cyber Monday, Nov 30": "Monday. The online twin of Black Friday. If anyone can buy from you without standing in front of you, this is your moment. Gift cards and anything booked through a link do well.",
          "Giving Tuesday, Dec 1": "Tuesday. For businesses with a cause or community roots. Tie a purchase to a contribution, or just contribute and say so plainly. Skip it if you have no genuine cause connection.",
          "Hanukkah, Dec 4 to 12": "Sundown Friday Dec 4 through Saturday Dec 12. Eight nights means eight days of gifting, a much longer window than one Christmas morning. Gifts are often smaller and given nightly. Start promoting before Dec 4, because people shop ahead.",
          "Green Monday, Dec 14": "Monday. The last big online buying day where shipping still comfortably works before Christmas. Most small businesses have never heard of it, which is exactly the opportunity: the inboxes are less crowded than Cyber Monday.",
          "Super Saturday, Dec 19": "Saturday. The last Saturday before Christmas and the biggest in-person shopping day of the season. These are panic buyers. They are not comparing and not negotiating, they want the problem solved today. Badly underused.",
          "Christmas, Dec 25": "Friday. The money is made in the three weeks before, not on the day. Two campaigns hide in here: gift buyers through Dec 20, then panic buyers Dec 21 to 24, who are a different person entirely. Gift cards win the panic window.",
          "New Year's Eve, Dec 31": "Thursday. This is where you sell January, in December. Fitness, coaching, organizing, beauty, education, financial services. Start around Dec 26 when every competitor has stopped selling and the field is empty.",
        },
        allowOther: true,
      },
      {
        id: "q2", type: "check", label: "2. Which trend days might fit you?",
        help: "Light, single-post days. Three or four at most.",
        options: ["Intl Coffee Day, Oct 1", "Dessert Day, Oct 14", "Boss's Day, Oct 16", "Sweetest Day, Oct 17", "Sandwich Day, Nov 3", "Kindness Day, Nov 13", "Entrepreneurs Day, Nov 17", "Espresso Day, Nov 23", "Cookie Day, Dec 4", "Ugly Sweater Day, Dec 18"],
        info: {
          "Intl Coffee Day, Oct 1": "Cafes, bakeries, anyone with a morning ritual. One photo, two sentences, done.",
          "Dessert Day, Oct 14": "Bakers, restaurants, caterers. An easy excuse to show your best-looking product.",
          "Boss's Day, Oct 16": "Gift shops, flowers, B2B services, restaurants. People genuinely shop for this one.",
          "Sweetest Day, Oct 17": "Third Saturday of October. Anything gifted: sweets, flowers, salons.",
          "Sandwich Day, Nov 3": "Delis, cafes, food trucks, caterers.",
          "Kindness Day, Nov 13": "Every business. Costs nothing and it always lands well.",
          "Entrepreneurs Day, Nov 17": "Third Tuesday of November. This one is about you. Tell your own story. These posts consistently outperform product posts.",
          "Espresso Day, Nov 23": "Cafes, and it lands three days before Thanksgiving, so it doubles as a warm-up.",
          "Cookie Day, Dec 4": "Bakers. Also the first night of Hanukkah, so check which fits your audience.",
          "Ugly Sweater Day, Dec 18": "Third Friday of December. Retail, salons, anywhere with a team and a camera. Pure personality, no offer needed.",
        },
        allowOther: true,
      },
      { id: "q3", type: "long", label: "3. What dates matter to your business that are on nobody else's calendar?", help: "Your anniversary, a local festival, a school calendar, a seasonal peak. Often worth more than a national holiday, because no one else is competing for that day." },
      { id: "q4", type: "long", label: "4. In a really good week, how much can you actually handle?", help: "Your ceiling before quality slips or you burn out.", placeholder: "15 cake orders, and that is pushing it." },
      { id: "q5", type: "long", label: "5. How much notice do you need before you can deliver?", help: "From order to in-hand. Say if it changes in December.", placeholder: "Five days minimum, two weeks in December." },
      { id: "q6", type: "long", label: "6. Any dates in October, November or December you are closed, traveling, or unavailable?", help: "Be honest. This is the question that keeps the plan real.", placeholder: "Closed Nov 22 to 25, out of town. Useless the week of Dec 15, kids are off school." },
      { id: "q7", type: "long", label: "7. Do you need to buy inventory, supplies, or materials ahead of time?", help: "If yes: how far ahead, and roughly what does it cost up front?" },
      { id: "q8", type: "long", label: "8. What did you do last Q4, and how did it go?", help: "'Nothing' is a genuinely useful answer." },
      { id: "q9", type: "long", label: "9. What went wrong last Q4 that you do not want to repeat?", help: "Ran out of stock, took too many orders, burned out, promoted too late." },
      { id: "q10", type: "long", label: "10. When is your slowest stretch between October and December, and do you know why?" },
      { id: "q11", type: "long", label: "11. When is your busiest stretch, and could you actually take more?", help: "Sometimes the honest answer is no. Worth knowing before you promote into it." },
      {
        id: "q12", type: "radio", label: "12. What is your goal for these 90 days? Pick what you measure.",
        options: ["Revenue", "Number of orders", "Number of bookings or appointments", "New customers"],
        allowOther: true,
        followUp: { id: "q12b", label: "Your number, and one line on why that number. What does hitting it change for you?", type: "long", help: "That 'why' is the thing that keeps you posting in week nine." },
      },
      { id: "q13", type: "long", label: "13. Realistically, how many hours a week can you spend on marketing?", help: "The real number, not the aspirational one. Your whole calendar gets built around this answer.", placeholder: "About three hours, usually Sunday night." },
    ],
    stuck: [
      { q: "I want to do all of them.", a: "That is the normal instinct and it is the one that sinks people in November. Tick them all anyway, the prompt's job is to talk you down to three to five." },
      { q: "I genuinely do not know my capacity.", a: "Think about your best week ever. That is roughly your ceiling. Write that number." },
      { q: "My goal feels made up.", a: "It probably is, and that is fine for now. Pick a number you would be proud of, and the prompt will tell you honestly whether it fits." },
    ],
  },

  {
    slug: "what",
    num: "03",
    title: "What's the Offer?",
    blurb:
      "The part most people skip. What exactly are you offering, and what is the one message that carries all 90 days? That second part is what makes this a campaign instead of a pile of posts. You write it once here, and every flyer, video and caption between now and December 31 gets built off it.",
    time: "About 25 minutes",
    note:
      "This is the thinking module. Your answers become your actual words on actual flyers, so the more real and specific you are, the less generic your campaign comes out.",
    files: [
      { label: "Questionnaire (print version)", href: "/files/Module3_Goal-Offer-Message_Questionnaire.md" },
      { label: "The prompt", href: "/files/Module3_Goal-Offer-Message_Prompt.md" },
    ],
    promptFile: "/files/Module3_Goal-Offer-Message_Prompt.md",
    pasteHint: "Paste this into your My 90-Day Campaign project in Claude.",
    tools: ["Claude"],
    fields: [
      { id: "q1", type: "long", label: "1. For Thanksgiving, your anchor, what are you thinking of offering?", help: "'Not sure yet' is a perfectly good answer. Claude will propose options built from your business." },
      { id: "q2", type: "long", label: "2. Which of your offerings would you most love to sell more of, and why that one?", help: "The one where the money and the joy line up." },
      { id: "q3", type: "long", label: "3. Which offering is most profitable, and which is most popular? Are they the same thing?", help: "If they are not, that gap is one of the most useful things you will learn today." },
      { id: "q4", type: "long", label: "4. What is the easiest yes for someone who has never bought from you?", help: "Your lowest-risk, easiest-to-say-yes-to thing. If you do not have one, say so." },
      { id: "q5", type: "long", label: "5. What do you have too much of, or need to move before the end of the year?", help: "Inventory, unsold stock, unbooked hours, a slow service." },
      { id: "q6", type: "long", label: "6. Is there anything you cannot discount, or a price you need to protect?", help: "Some businesses do lasting damage by discounting in Q4.", placeholder: "I will not go below $150 on a custom cake." },
      { id: "q7", type: "long", label: "7. What could you add that costs you very little but means a lot to the customer?", help: "A bonus, a small gift, faster turnaround, a handwritten note, first access. This is how you improve an offer without cutting price." },
      { id: "q8", type: "long", label: "8. What have you never bundled that you could bundle?", help: "Often the fastest way to raise your average sale without raising a single price." },
      { id: "q9", type: "long", label: "9. What is the honest reason someone should act now instead of in January?", help: "Not a fake deadline. A real one.", placeholder: "I only take 12 orders for Thanksgiving week and then I am full." },
      {
        id: "q10", type: "radio", label: "10. What one action do you want people to take?",
        options: ["Send me a message or DM", "Click a link and order", "Call or text me", "Book an appointment", "Walk into my shop", "Reply to my email"],
        allowOther: true,
        followUp: { id: "q10b", label: "In your words, exactly what you want them to do.", type: "long", help: "Example: DM me the word PIE and I will send you the order form." },
      },
      { id: "q11", type: "long", label: "11. By January, what do you want people to say about your business?", help: "One sentence. This is usually where your real message lives." },
      { id: "q12", type: "long", label: "12. What is the story behind your business that you do not tell often enough?", help: "Why you started, what you gave up for it, who taught you. This is where your proof comes from, and almost nobody uses theirs enough." },
      { id: "q13", type: "long", label: "13. If someone buys from you once this quarter, what do you want them to buy next?", help: "Thinking past the single sale is what turns a holiday bump into a real January." },
      { id: "q14", type: "long", label: "14. Anything that must be included, or must be avoided?", help: "Key dates, a phrase you love, a claim you cannot make, a word you hate." },
    ],
    stuck: [
      { q: "I cannot think of an offer.", a: "Leave question 1 blank or write 'not sure yet'. The prompt will propose three built from your own products and prices." },
      { q: "I do not want to discount anything.", a: "Good. Answer question 6 with your floor and question 7 with what you could add instead. You will get add-value offers, not discounts." },
      { q: "My promise comes back too long.", a: "Ask Claude: 'make it under fifteen words and say it like a person.' Then say it out loud. If you stumble, cut again." },
    ],
  },

  {
    slug: "build",
    num: "04",
    title: "Build It",
    blurb:
      "Everything you have answered feeds into this one. These last questions are about the practical stuff: where you post, how people pay you, and what has actually stopped you before. Run this and you get your complete Thanksgiving campaign plus your dated calendar through December 31.",
    time: "About 18 minutes",
    files: [
      { label: "Questionnaire (print version)", href: "/files/Module4_Campaign-Buildout_Questionnaire.md" },
      { label: "The prompt", href: "/files/Module4_Campaign-Buildout_Prompt.md" },
    ],
    promptFile: "/files/Module4_Campaign-Buildout_Prompt.md",
    pasteHint: "Paste this into your My 90-Day Campaign project in Claude.",
    tools: ["Claude", "ElevenLabs", "Canva"],
    fields: [
      {
        id: "q1", type: "check", label: "1. Which platforms will you actually post on?",
        help: "Not the ones you have accounts for. The ones you will really use. Two done well beats five done badly.",
        options: ["Instagram", "Facebook", "TikTok", "YouTube or Shorts", "LinkedIn", "Pinterest", "WhatsApp status or broadcast", "Nextdoor or a community group", "Google Business Profile"],
        allowOther: true,
        followUp: { id: "q1b", label: "Which one is your strongest, and which are you honestly just keeping alive?", type: "long" },
      },
      { id: "q2", type: "long", label: "2. Do you have an email or text list? Roughly how many people?", help: "'No' is common and completely fine. You will get a simple way to start." },
      { id: "q3", type: "long", label: "3. How do people buy from you, and what link do they use?", placeholder: "They DM me and I send a Square invoice. My link is linktr.ee/sweetlayers." },
      { id: "q4", type: "long", label: "4. Are you making the content yourself, or do you have help?", help: "Be specific about what the help can actually do." },
      {
        id: "q5", type: "check", label: "5. What do you have for making images?",
        options: ["Canva, free", "Canva Pro", "Just my phone camera", "Claude or another AI image tool", "Photoshop or similar", "Nothing yet"],
        allowOther: true,
      },
      { id: "q6", type: "short", label: "6. Do you have any budget for ads? Roughly how much?", help: "Zero is completely fine and your plan will work without it.", placeholder: "$100 total, or $0" },
      { id: "q7", type: "long", label: "7. What photos or videos do you already have that you could reuse?", help: "Old posts, customer photos, your camera roll, before-and-afters. Most owners are sitting on more usable material than they realize, and reusing beats creating." },
      { id: "q8", type: "long", label: "8. What is the best-performing thing you have ever posted? What was it?", help: "Often the most valuable answer on this page. The answer is usually 'the one where I was just being myself.'" },
      { id: "q9", type: "long", label: "9. What actually stops you from posting consistently?", help: "Time, not knowing what to say, feeling awkward on camera, perfectionism, forgetting. Name the real one. Your plan gets built around it." },
      { id: "q10", type: "short", label: "10. What day and time each week can you genuinely commit to making content?", help: "A specific slot, not 'when I get a chance'. This becomes a recurring appointment.", placeholder: "Sunday nights after 8" },
      { id: "q11", type: "long", label: "11. Who could help you, even a little?", help: "A family member who can film, a friend who writes well, another business owner you could trade with. You do not have to do this alone." },
      { id: "q12", type: "long", label: "12. Anything that must be in the campaign?", help: "A specific date, a phrase, a product you have to move, a partner you need to mention." },
    ],
    stuck: [
      { q: "Claude will not make me a PDF.", a: "Ask it for 'a single self-contained HTML page I can print'. Then open it and choose Print, then Save as PDF. Same result." },
      { q: "The calendar looks like too much work.", a: "Scroll to the Minimum Viable Week in your output. Run that instead. A smaller plan you keep beats a bigger one you quit." },
      { q: "My video script sounds robotic.", a: "Ask Claude: 'rewrite this the way I would actually say it out loud to a regular customer.' Then read it aloud before you record." },
    ],
  },

  {
    slug: "checklist",
    num: "05",
    title: "Your Next Steps",
    blurb:
      "You came in with your business and you are leaving with your campaign. Week one is already built. Here is what happens between now and Sunday, and then every week after.",
    files: [{ label: "The Q4 Moment Menu", href: "/files/Q4-2026_Moment-Menu.md" }],
    checklist: [
      "Save everything in your Q4-Campaign folder, properly named",
      "Post flyer one this week, on the date your calendar says",
      "Post your video this week",
      "Put your content hour in your phone calendar as a repeating appointment",
      "Text your accountability partner your one number and your first three due dates",
      "Ask three real customers the question you wrote in Module 1",
      "Next week: open your Claude Project and re-skin your Thanksgiving assets for the next moment",
    ],
    stuck: [
      { q: "I fell behind already.", a: "Drop to the Minimum Viable Week: one flyer, one video. Do not try to catch up on everything, just restart the rhythm." },
      { q: "Nothing is happening after two weeks.", a: "Open your campaign PDF and read the 'If This, Then That' section. It tells you exactly what to change and when." },
      { q: "I want to change my offer.", a: "Open your Claude Project and say what changed. Everything it built is still in there, so it can update the whole plan without starting over." },
    ],
  },
];

export const TOOLS = [
  { name: "Claude", blurb: "Your AI engine. Runs every prompt, builds every report.", href: "https://claude.ai", free: true },
  { name: "ElevenLabs", blurb: "Clones your voice for your campaign videos.", href: "https://elevenlabs.io", free: true },
  { name: "Canva", blurb: "Simple design for flyers, graphics and social posts.", href: "https://canva.com", free: true },
  { name: "HeyGen", blurb: "Creates your AI avatar video from a single photo.", href: "https://heygen.com", free: true },
  { name: "B1 (BE ONE)", blurb: "Course platform and class activity feed.", href: "https://community.branchesb1.org/", free: true },
];
