export interface ToolInput {
  id: string
  label: string
  type: 'text' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
  required?: boolean
  rows?: number
}

export interface Tool {
  id: string
  name: string
  description: string
  longDescription: string
  category: string
  gradient: string
  iconEmoji: string
  systemPrompt: string
  inputs: ToolInput[]
  buildPrompt: (inputs: Record<string, string>) => string
}

export const tools: Tool[] = [
  {
    id: 'blog-writer',
    name: 'Blog Writer',
    description: 'SEO-optimized blog posts that rank and convert',
    longDescription: 'Generate full-length, SEO-optimized blog posts on any topic. Perfect for content marketers, bloggers, and businesses looking to drive organic traffic.',
    category: 'Content',
    gradient: 'from-violet-500 to-purple-600',
    iconEmoji: '✍️',
    systemPrompt: `You are an expert blog writer and SEO specialist. You create engaging, well-structured, SEO-optimized blog posts that rank on Google and keep readers engaged.

Your blog posts always:
- Have a compelling, keyword-rich title (H1)
- Open with a hook that addresses reader pain points
- Include clear H2 and H3 subheadings for structure
- Use bullet points and numbered lists for scannability
- Include practical, actionable advice
- End with a strong conclusion and call-to-action
- Are written in proper Markdown format
- Include natural keyword placement throughout`,
    inputs: [
      { id: 'topic', label: 'Blog Topic', type: 'text', placeholder: 'e.g., 10 Ways to Increase Sales with Email Marketing', required: true },
      { id: 'keywords', label: 'Target Keywords (optional)', type: 'text', placeholder: 'e.g., email marketing, sales growth, email campaigns' },
      { id: 'tone', label: 'Tone of Voice', type: 'select', options: ['Professional', 'Casual & Friendly', 'Authoritative', 'Conversational', 'Inspirational'] },
      { id: 'length', label: 'Word Count', type: 'select', options: ['Short (500-700 words)', 'Medium (1000-1200 words)', 'Long (1800-2000 words)'] },
      { id: 'audience', label: 'Target Audience (optional)', type: 'text', placeholder: 'e.g., small business owners, marketing managers' },
    ],
    buildPrompt: (inputs) =>
      `Write a ${inputs.length || 'medium length'} blog post about: "${inputs.topic}"\n\nTone: ${inputs.tone || 'Professional'}\n${inputs.keywords ? `Target Keywords: ${inputs.keywords}\n` : ''}${inputs.audience ? `Target Audience: ${inputs.audience}\n` : ''}\n\nWrite a complete, well-structured blog post in Markdown format with proper headings, subheadings, and formatting. Make it engaging, informative, and ready to publish.`,
  },
  {
    id: 'social-media',
    name: 'Social Media Generator',
    description: 'Viral-worthy posts for any platform',
    longDescription: 'Create platform-optimized social media content for Instagram, Twitter/X, LinkedIn, Facebook, and TikTok that drives engagement and grows your following.',
    category: 'Social',
    gradient: 'from-pink-500 to-rose-600',
    iconEmoji: '📱',
    systemPrompt: `You are a social media expert who has grown brands to millions of followers. You write platform-native content that gets likes, shares, and comments.

For each platform you know:
- Instagram: Visual storytelling, emotion, hashtags (20-30), hook in first line
- LinkedIn: Professional insight, personal story, thought leadership, no more than 3 hashtags
- Twitter/X: Punchy, witty, max 280 chars, thread format when needed
- Facebook: Conversational, community-focused, share-worthy
- TikTok: Trending hooks, Gen-Z language, CTA to comment

Always write hooks that stop the scroll in the first 3 words.`,
    inputs: [
      { id: 'platform', label: 'Platform', type: 'select', options: ['Instagram', 'LinkedIn', 'Twitter/X', 'Facebook', 'TikTok', 'All Platforms'], required: true },
      { id: 'topic', label: 'Topic or Message', type: 'textarea', placeholder: 'What do you want to post about? e.g., launching our new product, sharing a business lesson, promoting a sale...', required: true, rows: 3 },
      { id: 'tone', label: 'Tone', type: 'select', options: ['Professional', 'Casual & Fun', 'Inspirational', 'Educational', 'Promotional', 'Storytelling'] },
      { id: 'cta', label: 'Call to Action (optional)', type: 'text', placeholder: 'e.g., Visit our website, Comment below, DM us for pricing' },
    ],
    buildPrompt: (inputs) =>
      `Create a ${inputs.platform} post about: "${inputs.topic}"\n\nTone: ${inputs.tone || 'Casual & Fun'}\n${inputs.cta ? `CTA: ${inputs.cta}\n` : ''}\n\nWrite an engaging ${inputs.platform} post optimized for that platform. Include relevant hashtags if appropriate. Make it scroll-stopping and shareable.`,
  },
  {
    id: 'email-writer',
    name: 'Email Writer',
    description: 'Professional emails that get opened and replied to',
    longDescription: 'Write any type of professional email with perfect tone and structure. From cold outreach to newsletters, customer support to business proposals.',
    category: 'Email',
    gradient: 'from-blue-500 to-cyan-600',
    iconEmoji: '📧',
    systemPrompt: `You are a world-class email copywriter with expertise in all types of business communication. Your emails get opened, read, and replied to.

You write emails that are:
- Clear and concise (no fluff)
- Professional yet human
- Have compelling subject lines
- Feature a strong opening hook
- Clear body with one main message
- Specific call-to-action
- Properly formatted with spacing

Always provide a subject line, preheader text, and the full email body.`,
    inputs: [
      { id: 'type', label: 'Email Type', type: 'select', options: ['Cold Outreach', 'Follow-up', 'Newsletter', 'Sales Pitch', 'Business Proposal', 'Customer Support Response', 'Partnership Request', 'Thank You'], required: true },
      { id: 'sender', label: 'Your Name/Company', type: 'text', placeholder: 'e.g., John from NexusAI', required: true },
      { id: 'recipient', label: 'Recipient / Target', type: 'text', placeholder: 'e.g., marketing managers at SaaS companies' },
      { id: 'goal', label: 'Email Goal / Key Message', type: 'textarea', placeholder: 'What do you want to achieve? e.g., book a 15-min demo call, announce our new feature, offer a 30% discount...', required: true, rows: 3 },
      { id: 'tone', label: 'Tone', type: 'select', options: ['Professional', 'Friendly', 'Formal', 'Urgent', 'Warm'] },
    ],
    buildPrompt: (inputs) =>
      `Write a ${inputs.type} email from "${inputs.sender}"${inputs.recipient ? ` to ${inputs.recipient}` : ''}.\n\nGoal: ${inputs.goal}\nTone: ${inputs.tone || 'Professional'}\n\nProvide:\n1. Subject line\n2. Preheader text\n3. Full email body\n\nMake it professional, compelling, and action-driving.`,
  },
  {
    id: 'ad-copy',
    name: 'Ad Copy Generator',
    description: 'High-converting ads for Facebook, Google & more',
    longDescription: 'Create compelling advertising copy that drives clicks and conversions. Optimized for Facebook, Instagram, Google, LinkedIn, and any digital advertising platform.',
    category: 'Marketing',
    gradient: 'from-orange-500 to-amber-600',
    iconEmoji: '🎯',
    systemPrompt: `You are a master copywriter who has generated millions in ad revenue for brands worldwide. You write ad copy that stops people in their tracks and drives them to take action.

Your ad copy follows proven frameworks:
- AIDA (Attention, Interest, Desire, Action)
- PAS (Problem, Agitate, Solution)
- The 4 U's (Urgent, Unique, Useful, Ultra-specific)

For each platform you know character limits and best practices:
- Facebook/Instagram: Attention-grabbing headline + emotional hook
- Google Ads: Keyword-rich headline, 30 char limit per headline, 90 char description
- LinkedIn: Professional, ROI-focused, B2B appropriate

Always provide multiple variations (headline, body copy, CTA) for testing.`,
    inputs: [
      { id: 'product', label: 'Product / Service Name', type: 'text', placeholder: 'e.g., NexusAI Content Generator', required: true },
      { id: 'benefits', label: 'Key Benefits / Value Proposition', type: 'textarea', placeholder: 'e.g., Saves 10 hours per week, generates content in seconds, increases conversions by 40%', required: true, rows: 3 },
      { id: 'audience', label: 'Target Audience', type: 'text', placeholder: 'e.g., small business owners, e-commerce store owners aged 25-45' },
      { id: 'platform', label: 'Ad Platform', type: 'select', options: ['Facebook/Instagram', 'Google Ads', 'LinkedIn', 'Twitter/X Ads', 'YouTube', 'TikTok Ads'] },
      { id: 'goal', label: 'Campaign Goal', type: 'select', options: ['Website Traffic', 'Lead Generation', 'Sales/Conversions', 'Brand Awareness', 'App Downloads'] },
      { id: 'offer', label: 'Special Offer (optional)', type: 'text', placeholder: 'e.g., 30% off, Free trial, Buy 1 Get 1' },
    ],
    buildPrompt: (inputs) =>
      `Create ${inputs.platform || 'Facebook/Instagram'} ad copy for: "${inputs.product}"\n\nKey Benefits: ${inputs.benefits}\n${inputs.audience ? `Target Audience: ${inputs.audience}\n` : ''}Campaign Goal: ${inputs.goal || 'Sales/Conversions'}\n${inputs.offer ? `Special Offer: ${inputs.offer}\n` : ''}\n\nProvide 3 variations of ad copy including:\n- Headline options\n- Body copy\n- Call-to-action\n\nMake each version test a different angle (emotional, logical, FOMO). Optimize for ${inputs.platform || 'Facebook/Instagram'} best practices.`,
  },
  {
    id: 'product-description',
    name: 'Product Description',
    description: 'E-commerce copy that sells products instantly',
    longDescription: 'Write compelling product descriptions that highlight benefits over features, overcome objections, and drive purchase decisions for any e-commerce platform.',
    category: 'E-commerce',
    gradient: 'from-emerald-500 to-teal-600',
    iconEmoji: '🛍️',
    systemPrompt: `You are an e-commerce copywriting expert who has written product descriptions for top brands on Amazon, Shopify, and major retail sites.

Your product descriptions:
- Lead with the biggest benefit, not features
- Paint a picture of the customer's life with the product
- Address common objections proactively
- Use sensory language that makes products tangible
- Include power words that trigger buying decisions
- Are optimized for SEO with natural keyword inclusion
- Have a clear format: Hook → Benefits → Features → Social Proof → CTA

Always write for the customer, not the product.`,
    inputs: [
      { id: 'product', label: 'Product Name', type: 'text', placeholder: 'e.g., Premium Bamboo Cutting Board Set', required: true },
      { id: 'features', label: 'Key Features & Benefits', type: 'textarea', placeholder: 'List the main features and what benefits they provide to the customer', required: true, rows: 4 },
      { id: 'audience', label: 'Target Customer', type: 'text', placeholder: 'e.g., home cooks who care about sustainability and kitchen aesthetics' },
      { id: 'platform', label: 'Platform', type: 'select', options: ['Amazon', 'Shopify', 'General E-commerce', 'Etsy', 'eBay', 'Woocommerce'] },
      { id: 'tone', label: 'Brand Tone', type: 'select', options: ['Premium/Luxury', 'Fun & Playful', 'Professional', 'Eco-friendly', 'Budget-friendly'] },
    ],
    buildPrompt: (inputs) =>
      `Write a product description for: "${inputs.product}" on ${inputs.platform || 'e-commerce'}\n\nFeatures/Benefits: ${inputs.features}\n${inputs.audience ? `Target Customer: ${inputs.audience}\n` : ''}Brand Tone: ${inputs.tone || 'Professional'}\n\nProvide:\n1. SEO Title\n2. Bullet points (5-7 key benefits)\n3. Full product description (200-300 words)\n4. Meta description (160 chars)\n\nFocus on benefits over features. Make it compelling and conversion-optimized.`,
  },
  {
    id: 'seo-optimizer',
    name: 'SEO Content Optimizer',
    description: 'Rank higher with AI-powered SEO content',
    longDescription: 'Create search engine optimized content that ranks on page 1. Get keyword-rich titles, meta descriptions, content outlines, and fully optimized articles.',
    category: 'SEO',
    gradient: 'from-green-500 to-emerald-600',
    iconEmoji: '🔍',
    systemPrompt: `You are an SEO expert with years of experience helping websites rank on page 1 of Google. You understand search intent, keyword strategy, and content optimization.

You create SEO content that:
- Matches search intent (informational, commercial, transactional, navigational)
- Has proper keyword density (1-2%) without stuffing
- Uses LSI (Latent Semantic Indexing) keywords naturally
- Follows E-E-A-T principles (Experience, Expertise, Authoritativeness, Trustworthiness)
- Has optimal meta tags (title: 55-60 chars, description: 155-160 chars)
- Includes FAQ section for featured snippet potential
- Has proper heading structure (H1, H2, H3)`,
    inputs: [
      { id: 'keyword', label: 'Primary Keyword / Topic', type: 'text', placeholder: 'e.g., best project management software for small teams', required: true },
      { id: 'secondary', label: 'Secondary Keywords (optional)', type: 'text', placeholder: 'e.g., task management, team collaboration, project tracking' },
      { id: 'intent', label: 'Search Intent', type: 'select', options: ['Informational (How-to, What is)', 'Commercial (Best, Top, Reviews)', 'Transactional (Buy, Pricing)', 'Local SEO'] },
      { id: 'contentType', label: 'Content Type', type: 'select', options: ['Full Article', 'SEO Outline', 'Title + Meta Tags Only', 'FAQ Section'] },
      { id: 'wordCount', label: 'Target Length', type: 'select', options: ['Short (500 words)', 'Medium (1000 words)', 'Long (2000+ words)'] },
    ],
    buildPrompt: (inputs) =>
      `Create ${inputs.contentType || 'Full Article'} optimized for: "${inputs.keyword}"\n\nSearch Intent: ${inputs.intent || 'Informational'}\n${inputs.secondary ? `Secondary Keywords: ${inputs.secondary}\n` : ''}Target Length: ${inputs.wordCount || 'Medium'}\n\nProvide:\n1. SEO-optimized title (55-60 chars)\n2. Meta description (155-160 chars)\n3. Content with proper H1, H2, H3 structure\n4. FAQ section (5 questions)\n5. Internal linking suggestions\n\nFollow Google's E-E-A-T guidelines. Write for both search engines and human readers.`,
  },
  {
    id: 'cold-outreach',
    name: 'Cold Outreach',
    description: 'Sales emails that get 30%+ reply rates',
    longDescription: 'Write hyper-personalized cold outreach emails and LinkedIn messages that get responses. Proven frameworks used by top sales teams and founders.',
    category: 'Sales',
    gradient: 'from-indigo-500 to-blue-600',
    iconEmoji: '🚀',
    systemPrompt: `You are a sales expert who has sent millions of cold outreach messages with proven 20-40% reply rates. You understand that cold outreach lives or dies on personalization and value.

Your cold outreach:
- Never starts with "I" or talks about yourself first
- Opens with something specific and genuine about the prospect
- Gets to the value prop in 2-3 sentences max
- Has ONE clear, low-friction ask
- Feels like a human wrote it, not a template
- Uses the proven AIDA framework subtly
- Has a P.S. line for extra engagement
- Total length: 80-120 words (sweet spot for replies)

Different frameworks you master:
- The Personalized First Line Method
- The Problem/Solution Method
- The Referral/Social Proof Method
- The Curiosity Gap Method`,
    inputs: [
      { id: 'product', label: 'Your Product/Service', type: 'text', placeholder: 'e.g., AI copywriting tool that saves marketing teams 10 hours/week', required: true },
      { id: 'prospect', label: 'Target Prospect Profile', type: 'text', placeholder: 'e.g., Head of Marketing at B2B SaaS companies with 50-500 employees', required: true },
      { id: 'value', label: 'Key Value Proposition', type: 'textarea', placeholder: 'What specific problem do you solve? What results do you deliver?', required: true, rows: 3 },
      { id: 'cta', label: 'Desired Action (CTA)', type: 'text', placeholder: 'e.g., book a 15-min call, reply to learn more, try it free' },
      { id: 'channel', label: 'Outreach Channel', type: 'select', options: ['Email', 'LinkedIn Message', 'LinkedIn InMail', 'Twitter DM'] },
    ],
    buildPrompt: (inputs) =>
      `Write a ${inputs.channel || 'Email'} cold outreach message for:\n\nProduct/Service: ${inputs.product}\nTarget Prospect: ${inputs.prospect}\nValue Proposition: ${inputs.value}\nDesired CTA: ${inputs.cta || 'book a short call'}\n\nWrite 3 different variations using different frameworks. Each should be under 120 words. Include subject lines for emails. Make them feel personal, not templated.`,
  },
  {
    id: 'youtube-script',
    name: 'YouTube Script Writer',
    description: 'Scripts that keep viewers watching to the end',
    longDescription: 'Write engaging YouTube scripts optimized for watch time, retention, and subscriber growth. Perfect for educational content, vlogs, tutorials, and business channels.',
    category: 'Video',
    gradient: 'from-red-500 to-orange-600',
    iconEmoji: '🎬',
    systemPrompt: `You are a YouTube content strategist and scriptwriter who has written scripts for channels with millions of subscribers. You understand the YouTube algorithm and what keeps viewers watching.

Your scripts follow the proven YouTube retention formula:
1. HOOK (first 30 seconds) - Why should they keep watching RIGHT NOW?
2. INTRO - Quick value promise and what they'll learn
3. BODY - Core content broken into clear sections
4. PATTERN INTERRUPTS - Reengagement every 2-3 minutes
5. CTA integration - Natural, non-pushy subscription asks
6. OUTRO - Summary + clear next video recommendation

You write in a conversational, energetic style that sounds natural when spoken aloud. You include [PAUSE], [B-ROLL SUGGESTION], [GRAPHIC], and [TRANSITION] cues.`,
    inputs: [
      { id: 'topic', label: 'Video Topic / Title', type: 'text', placeholder: 'e.g., How I Made $10,000 in My First Month with Dropshipping', required: true },
      { id: 'audience', label: 'Target Audience', type: 'text', placeholder: 'e.g., beginner entrepreneurs aged 18-35', required: true },
      { id: 'duration', label: 'Target Video Length', type: 'select', options: ['Short (3-5 minutes)', 'Medium (8-12 minutes)', 'Long (15-20 minutes)'] },
      { id: 'style', label: 'Video Style', type: 'select', options: ['Educational/Tutorial', 'Personal Story/Vlog', 'List/Roundup', 'Interview/Podcast', 'Motivational/Inspirational', 'Product Review'] },
      { id: 'channel', label: 'Channel Niche (optional)', type: 'text', placeholder: 'e.g., personal finance, fitness, tech, business' },
    ],
    buildPrompt: (inputs) =>
      `Write a YouTube script for a ${inputs.duration || 'medium'} ${inputs.style || 'educational'} video:\n\nTitle: "${inputs.topic}"\nTarget Audience: ${inputs.audience}\n${inputs.channel ? `Channel Niche: ${inputs.channel}\n` : ''}\n\nInclude:\n1. Attention-grabbing hook (first 30 seconds)\n2. Intro with value promise\n3. Full script with sections and timestamps\n4. Pattern interrupts and re-engagement moments\n5. Natural CTA integration\n6. Strong outro\n\nInclude [B-ROLL], [GRAPHIC], [PAUSE] cues. Make it conversational and retention-optimized.`,
  },
]

export const toolsById: Record<string, Tool> = Object.fromEntries(
  tools.map((t) => [t.id, t])
)

export const categories = [...new Set(tools.map((t) => t.category))]
