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
  optional?: boolean;
  optionalLabel?: string;
  links?: { label: string; href: string }[];
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
    files: [
      { label: "Your one-page worksheet (print)", href: "/files/Participant-Sheet_Print.pdf" },
      { label: "The Q4 Moment Menu", href: "/files/Q4-2026_Moment-Menu.md" },
      { label: "The Complete Guide to Marketing Channels", href: "/files/Guide_Marketing-Channels.pdf" },
    ],
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
        a: "Search your Downloads folder for 'Master Brain'. If it is truly gone, the next section rebuilds it in about 25 minutes and you will still do everything today.",
      },
      {
        q: "What is a Claude Project and why do I need one?",
        a: "It is a folder inside Claude that remembers things. Put your Master Brain in it once, and all four prompts today will know your business without you pasting it again.",
      },
      {
        q: "I do not have a Master Brain yet.",
        a: "Go to the next section, No Master Brain Yet? Build one there in about 25 minutes, then come back. Everything today works once you have it.",
      },
    ],
    tools: ["Claude", "ElevenLabs", "Canva"],
  },

  {
    slug: "master-brain",
    num: "00b",
    title: "No Master Brain Yet?",
    optional: true,
    optionalLabel: "Optional, only if you need it",
    blurb:
      "Everything today assumes AI already knows your business. That knowledge lives in one document called your Master Brain. If you built one at the last workshop, skip this module entirely and go to Module 01. If you did not, or you cannot find your file, build it right here in about 25 minutes and then carry on with everyone else.",
    time: "About 25 minutes",
    note:
      "Answer in your own natural voice. Rough and honest is exactly right, the AI adds the polish. When it is done, save the PDF somewhere you will find it again, then upload it into your My 90-Day Campaign project and carry on with Module 01.",
    files: [
      { label: "Questionnaire (print version)", href: "/files/MasterBrain_Questionnaire.md" },
      { label: "The generator prompt", href: "/files/MasterBrain_Generator_Prompt.md" },
    ],
    links: [
      { label: "The full resource hub from the last workshop", href: "https://be-one-workshop-marketing-campaign.vercel.app/" },
    ],
    promptFile: "/files/MasterBrain_Generator_Prompt.md",
    pasteHint:
      "Paste this into your My 90-Day Campaign project in Claude. It gives you a finished Master Brain as a downloadable PDF. Upload that PDF back into the project before you start Module 01.",
    tools: ["Claude"],
    fields: [
      { id: "seed", type: "long", label: "Seed paragraph", help: "Fill this in first, it gives the AI a baseline before the deeper questions. My name is ___. My business is ___, based in ___. We help ___ with ___. What makes us different is ___.", placeholder: "My name is Maria Lopez. My business is Sweet Layers Bakery, based in Miami. We help families celebrate with custom cakes. What makes us different is that everything is made from scratch, by me." },
      { id: "q1", type: "long", label: "1. Your name, your role, your business name, and where you are based.", placeholder: "Maria Lopez, Founder, Sweet Layers Bakery, Miami, FL." },
      { id: "q2", type: "long", label: "2. In two or three sentences, what does your business do?", help: "Explain it as if to someone who knows nothing about your industry." },
      { id: "q3", type: "long", label: "3. What is your story? How did you get into this, and what is the deeper why behind it?", help: "Career pivots, defining moments, what drives you beyond money." },
      { id: "q4", type: "long", label: "4. Describe your personality and your brand in five to seven words.", placeholder: "Warm, detail-obsessed, joyful, dependable, family-first." },
      { id: "q5", type: "long", label: "5. What is your mission, and your top three values?", help: "Why your business exists, plus the three values that guide it." },
      { id: "q6", type: "long", label: "6. List your main products or services, one line each." },
      { id: "q7", type: "long", label: "7. Which offering brings in the most revenue, and which are you most passionate about delivering?" },
      { id: "q8", type: "long", label: "8. Do you sell to individuals, businesses, or both? And what is the journey from first contact to finished sale?" },
      { id: "q9", type: "long", label: "9. Describe your number one ideal customer in a few sentences.", help: "Who are they? What do they want most?" },
      { id: "q10", type: "long", label: "10. What problem do you solve for them, and how do they feel after working with you?" },
      { id: "q11", type: "long", label: "11. Where do your ideal customers spend their time?", help: "Platforms, communities, events, associations." },
      { id: "q12", type: "long", label: "12. What are your rough price ranges, and how do you decide what to charge?" },
      { id: "q13", type: "long", label: "13. What is your number one measurable goal for the next 12 months?", placeholder: "Reach $120,000 in revenue, or grow to 30 orders a month." },
      { id: "q14", type: "long", label: "14. Describe your communication style in three to five words, and list any signature phrases you use often.", placeholder: "Style: warm, direct, encouraging. Phrase: marketing is an investment, not an expense." },
      { id: "q15", type: "long", label: "15. What should AI NEVER say or do on your behalf?", help: "Words, tones, or claims that feel wrong for your brand. This becomes your guardrails, and it is the section you will reuse most." },
      { id: "q16", type: "long", label: "16. Who are your top two or three competitors or alternatives, and what makes you different from them?" },
      { id: "q17", type: "long", label: "17. Complete this sentence: we are the only ___ that ___.", help: "If 'only' feels too strong, rephrase it however feels true." },
      { id: "q18", type: "long", label: "18. Which marketing channels do you use now, and which work best for you?" },
      { id: "q19", type: "long", label: "19. What tools, software, or AI do you currently use to run your business?" },
      { id: "q20", type: "long", label: "20. Share one signature story, analogy, or saying that captures what you are about, plus anything essential we have not asked." },
    ],
    stuck: [
      { q: "This is a lot of questions and everyone else has started.", a: "You are fine. Answer them fast and roughly, one or two lines each. The generator is built to expand thin answers and flag what it inferred. You will catch up over lunch." },
      { q: "I built one last time but I cannot find the file.", a: "Search your Downloads folder for 'Master Brain'. Also check the resource hub from the last workshop, linked above. If it is truly gone, filling this in again is faster than hunting for it." },
      { q: "Claude gave me the document but not a PDF.", a: "Ask it for 'a single self-contained HTML page I can print', then open it and choose Print, then Save as PDF. Upload that into your project." },
    ],
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
      { label: "The Complete Guide to Marketing Channels", href: "/files/Guide_Marketing-Channels.pdf" },
      { label: "Questionnaire (print version)", href: "/files/Module4_Campaign-Buildout_Questionnaire.md" },
      { label: "The prompt", href: "/files/Module4_Campaign-Buildout_Prompt.md" },
    ],
    promptFile: "/files/Module4_Campaign-Buildout_Prompt.md",
    pasteHint: "Paste this into your My 90-Day Campaign project in Claude.",
    tools: ["Claude", "ElevenLabs", "Canva"],
    fields: [
      {
        id: "q1a", type: "radio", label: "1. Your FOUND channel: how do new people discover you?",
        help: "Pick the one you will genuinely work on this quarter. Tap the i next to any option for what it is. The full guide is downloadable above.",
        options: ["Google Business Profile", "Website and local SEO", "Review platforms, Yelp, Angi, TripAdvisor", "Product marketplaces, Etsy, Amazon, Faire", "Service platforms, Thumbtack, Booksy, StyleSeat", "Delivery apps, DoorDash, Uber Eats, Instacart", "Farmers markets, fairs and pop-ups", "Nextdoor and local Facebook groups", "Foot traffic and signage", "Local press and media", "Word of mouth and referrals"],
        allowOther: true,
        info: {
          "Google Business Profile": "The single most important free listing for any local business. It powers map results, reviews, photos, hours and near me searches. If you do only one thing from the guide, do this.",
          "Website and local SEO": "Your digital storefront, written so people searching for what you sell actually find you. City and neighbourhood keywords are the small business superpower here.",
          "Review platforms, Yelp, Angi, TripAdvisor": "Reviews are a channel, not a report card. Volume, recency and owner replies all drive new business.",
          "Product marketplaces, Etsy, Amazon, Faire": "Built-in traffic for physical products. You trade a fee for instant access to buyers who are already shopping.",
          "Service platforms, Thumbtack, Booksy, StyleSeat": "Booking and lead platforms for specific trades. Fees can be steep, so use them to fill gaps and convert those clients into direct repeats.",
          "Delivery apps, DoorDash, Uber Eats, Instacart": "Expensive per order but powerful for discovery. Many restaurants treat them as paid advertising that happens to deliver food.",
          "Farmers markets, fairs and pop-ups": "Low cost, high touch selling where people can taste, touch and meet the maker. Samples convert far better than ads.",
          "Nextdoor and local Facebook groups": "Hyperlocal word of mouth at scale. A neighbour asking anyone know a good... is the warmest lead there is.",
          "Foot traffic and signage": "A vehicle wrap or a good A-frame is a one-time cost that advertises everywhere you drive and park, for years.",
          "Local press and media": "Reporters need stories constantly. Openings, anniversaries, milestones and seasonal expert commentary are all pitchable, and one good story beats months of ads.",
          "Word of mouth and referrals": "The warmest channel there is. It feels passive, but you can actually build it with a referral programme and a reason to talk.",
        },
      },
      {
        id: "q1b", type: "radio", label: "2. Your BUILD channel: how do you stay in touch and earn trust?",
        help: "Where you show up again and again for people who already know you exist.",
        options: ["Email list", "SMS or WhatsApp", "Instagram", "Facebook", "TikTok", "YouTube", "LinkedIn", "Pinterest", "A loyalty programme", "In-store events and workshops", "A private community or group", "Chambers, networking groups, BNI"],
        allowOther: true,
        info: {
          "Email list": "The highest return channel in marketing, decade after decade. A list you own, delivered straight to the inbox, and nobody can take it away from you.",
          "SMS or WhatsApp": "Texts get read within minutes. Best for time-sensitive offers and VIP lists. WhatsApp Business adds catalogues and quick replies, which matters for Latin American communities.",
          "Instagram": "The default for visual, local and community businesses. Reels for reach, Stories for relationship, posts for proof.",
          "Facebook": "Still where many local customers actually live, especially over 35. Groups are the underused part.",
          "TikTok": "The discovery engine. Raw, personality-driven video where a brand new account can still reach a lot of people. Ideal for food, transformations and anything with a before and after.",
          "YouTube": "Part social network, part search engine. Long-form how-to builds deep trust and the videos keep ranking for years.",
          "LinkedIn": "The channel if you sell to other businesses. Personal profiles outperform company pages, so the owner should be the voice.",
          "Pinterest": "A visual search engine with a long content lifespan. Strong for weddings, home, food, fashion and anything people plan in advance.",
          "A loyalty programme": "For businesses with frequent repeat purchases, a simple punch card or scan-to-earn turns occasional customers into regulars.",
          "In-store events and workshops": "Turn your location into a destination. Classes, tastings and demos bring people in for a reason other than buying, and they buy anyway.",
          "A private community or group": "A space where your best customers gather and keep each other engaged with your brand. Slow to build, very hard for a competitor to copy.",
          "Chambers, networking groups, BNI": "Structured referral relationships. A room of people whose job is to send you business.",
        },
      },
      {
        id: "q1c", type: "radio", label: "3. Your ACCELERATE channel: how do you speed it up?",
        help: "Optional. Paid reach or somebody else's audience, borrowed with permission. 'Nothing yet' is a perfectly good answer.",
        options: ["Meta ads, Facebook and Instagram", "Google Search ads", "Retargeting ads", "YouTube or TikTok ads", "Cross-promotions with other businesses", "Influencer or creator partnerships", "A customer referral programme", "Affiliate or commission partners", "Sponsorships", "Direct mail", "Contests and giveaways", "Nothing yet, no budget"],
        allowOther: true,
        info: {
          "Meta ads, Facebook and Instagram": "Interruption advertising with surgical targeting: location, interests, behaviours, and lookalikes of your existing customers. Great for offers and events.",
          "Google Search ads": "You show up the moment somebody types what you sell. You pay per click and the intent is as high as it gets.",
          "Retargeting ads": "Ads shown only to people who already visited you or engaged. Warm audience, cheap clicks, the highest conversion rates in paid media.",
          "YouTube or TikTok ads": "Video ads with enormous reach and surprisingly low cost. Best when the ad feels like content, not a commercial.",
          "Cross-promotions with other businesses": "Two non-competing businesses who share a customer promote each other. Free, fast, and endlessly repeatable.",
          "Influencer or creator partnerships": "Micro creators, roughly 1,000 to 25,000 followers, beat celebrities for small business: cheaper, more local, far more trusted. Often a free product is payment enough.",
          "A customer referral programme": "Give happy customers a reason and an easy way to spread the word. The ask matters more than the reward.",
          "Affiliate or commission partners": "You pay only when a partner's link produces an actual sale. Zero risk, pure performance.",
          "Sponsorships": "Little league teams, 5K runs, school fundraisers. Your name attached to things your community already loves.",
          "Direct mail": "A mailbox has almost no competition any more, so response rates beat email. Every Door Direct Mail makes it affordable by route.",
          "Contests and giveaways": "Prizes in exchange for engagement, emails, or customer content. Partner with another business to grow the prize and split the new audience.",
          "Nothing yet, no budget": "Completely fine. Your plan will work without paid acceleration, it will just take a little longer.",
        },
        followUp: { id: "q1d", label: "Which channels are you currently keeping alive out of guilt, and could stop?", type: "long", help: "Naming these is how you free up the hours to do three things properly." },
      },
      { id: "q2", type: "long", label: "4. Do you have an email or text list? Roughly how many people?", help: "'No' is common and completely fine. You will get a simple way to start." },
      { id: "q3", type: "long", label: "5. How do people buy from you, and what link do they use?", placeholder: "They DM me and I send a Square invoice. My link is linktr.ee/sweetlayers." },
      { id: "q4", type: "long", label: "6. Are you making the content yourself, or do you have help?", help: "Be specific about what the help can actually do." },
      {
        id: "q5", type: "check", label: "7. What do you have for making images?",
        options: ["Canva, free", "Canva Pro", "Just my phone camera", "Claude or another AI image tool", "Photoshop or similar", "Nothing yet"],
        allowOther: true,
      },
      { id: "q6", type: "short", label: "8. Do you have any budget for ads? Roughly how much?", help: "Zero is completely fine and your plan will work without it.", placeholder: "$100 total, or $0" },
      { id: "q7", type: "long", label: "9. What photos or videos do you already have that you could reuse?", help: "Old posts, customer photos, your camera roll, before-and-afters. Most owners are sitting on more usable material than they realize, and reusing beats creating." },
      { id: "q8", type: "long", label: "10. What is the best-performing thing you have ever posted? What was it?", help: "Often the most valuable answer on this page. The answer is usually 'the one where I was just being myself.'" },
      { id: "q9", type: "long", label: "11. What actually stops you from posting consistently?", help: "Time, not knowing what to say, feeling awkward on camera, perfectionism, forgetting. Name the real one. Your plan gets built around it." },
      { id: "q10", type: "short", label: "12. What day and time each week can you genuinely commit to making content?", help: "A specific slot, not 'when I get a chance'. This becomes a recurring appointment.", placeholder: "Sunday nights after 8" },
      { id: "q11", type: "long", label: "13. Who could help you, even a little?", help: "A family member who can film, a friend who writes well, another business owner you could trade with. You do not have to do this alone." },
      { id: "q12", type: "long", label: "14. Anything that must be in the campaign?", help: "A specific date, a phrase, a product you have to move, a partner you need to mention." },
    ],
    stuck: [
      { q: "I do not know which channel to pick.", a: "Download the Marketing Channels guide above, or tap the i next to any option. The rule of thumb: one channel to be found, one to build relationships, one to accelerate. Three is a complete system." },
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
      "You came in with your business and you are leaving with a plan that has real dates on it. Here is what happens between now and Sunday, and then every week after.",
    files: [{ label: "The Q4 Moment Menu", href: "/files/Q4-2026_Moment-Menu.md" }],
    checklist: [
      "Save your campaign plan PDF in your Q4-Campaign folder, properly named",
      "Post the first thing on your calendar this week",
      "Read your re-skin guide so you know how the next moment gets built",
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
