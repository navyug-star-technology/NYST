import { useEffect, useRef, useState } from "react";
import { Bot, MessageCircle, Send, Sparkles, X } from "lucide-react";

const whatsappMessage =
  "Hi NavYug Star Technology! I'm looking for a custom, responsive, and scalable digital solution for my business. Could you help me choose between a website, mobile app, or business software and share the next steps?";
const whatsappUrl = `https://wa.me/918302248272?text=${encodeURIComponent(whatsappMessage)}`;
const topics = [
  {
    label: "Services",
    keywords: ["services", "what do you do", "what do you offer", "service list"],
    answer:
      "NavYug Star Technology lists website development, mobile app development, custom software, user interface and user experience design, and digital marketing.",
    followUp: "Which of these are you exploring for your business?",
  },
  {
    label: "Website",
    keywords: ["website", "web development", "ecommerce", "e commerce", "online store"],
    answer:
      "We build business, school and college, e-commerce, restaurant and hotel, portfolio, and custom websites.",
    followUp: "Who is the website for, and what should it help them do?",
  },
  {
    label: "Mobile app",
    keywords: ["mobile app", "mobile application", "app development", " app "],
    answer:
      "Our mobile app services include business, customer, educational, and custom applications, along with app interface and user experience design.",
    followUp: "What should the app help your customers or team do?",
  },
  {
    label: "Software",
    keywords: ["software", "crm", "inventory", "billing", "automation", "management system"],
    answer:
      "We develop custom business software, school management systems, CRM solutions, billing and inventory systems, and workflow automation.",
    followUp: "Which process would you like the software to simplify?",
  },
  {
    label: "Interface and user experience design",
    keywords: ["ui/ux", "ui ux", "design", "wireframe", "prototype", "user experience"],
    answer:
      "Design services include website and app interfaces, dashboards, user experience design, wireframes, prototypes, and design systems.",
    followUp: "Which screen or workflow would you like to make easier to use?",
  },
  {
    label: "Digital marketing",
    keywords: ["marketing", "social media", "instagram", "meta ads", "advertising", "reels"],
    answer:
      "Digital marketing services include social media management, content creation, reels, Meta advertising campaigns, and marketing strategy.",
    followUp: "Which audience or channel are you hoping to focus on?",
  },
  {
    label: "Project process",
    keywords: ["process", "steps", "how do you work", "project stages", "workflow"],
    answer:
      "The published process is to discover your goals, plan the scope, design, develop, test, and launch—with any support agreed for the project.",
    followUp: "Which stage would you like to know more about?",
  },
  {
    label: "Cost and timing",
    keywords: ["cost", "price", "pricing", "budget", "how much", "how long", "timeline"],
    answer:
      "There are no fixed prices or timelines published. Cost and timing depend on the project scope and requirements, so they need to be discussed before they can be confirmed.",
    followUp: "What kind of solution are you considering?",
  },
  {
    label: "Products",
    keywords: ["product", "demo", "license", "licensing"],
    answer:
      "Product features, availability, demos, and licensing are confirmed directly by the team. Product details are not currently published on this site.",
    followUp: "What product information are you looking for?",
  },
  {
    label: "Portfolio",
    keywords: ["portfolio", "case study", "case studies", "project examples", "work examples"],
    answer:
      "There are no public case studies listed on the site right now. Concepts are not presented as completed client work.",
    followUp: "Would you like to know about a particular service instead?",
  },
  {
    label: "Contact",
    keywords: ["contact", "form", "send enquiry", "send inquiry", "get in touch"],
    answer:
      "The contact form is not accepting submissions yet. It will be enabled once a verified email or CRM delivery endpoint is connected.",
    followUp: "I can still answer questions about the services and project process here.",
  },
];

const quickQuestions = [
  "Services",
  "Website",
  "Mobile app",
  "Software",
  "Cost and timing",
  "Project process",
  "Contact",
];

const followUpSuggestions = {
  Services: ["Website", "Mobile app", "Software"],
  Website: ["E-commerce website", "Cost and timing", "Project process"],
  "Mobile app": ["Mobile app", "Cost and timing", "Project process"],
  Software: ["Inventory software", "Cost and timing", "Project process"],
  "Interface and user experience design": ["Interface design", "Website", "Mobile app"],
  "Digital marketing": ["Digital marketing", "Project process", "Contact"],
  "Project process": ["Project process", "Cost and timing", "Services"],
  "Cost and timing": ["Website", "Mobile app", "Software"],
  Products: ["Products", "Services", "Contact"],
  Portfolio: ["Portfolio", "Services", "Contact"],
  Contact: ["Services", "Project process", "Cost and timing"],
};

function normalizeText(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9/]+/g, " ")
    .trim();
}

function findTopic(question) {
  const normalized = ` ${normalizeText(question)} `;
  const costTopic = topics.find((topic) => topic.label === "Cost and timing");
  const asksAboutCostOrTiming = [
    "cost",
    "price",
    "prices",
    "pricing",
    "budget",
    "how much",
    "how long",
    "timeline",
    "estimate",
  ].some((keyword) => normalized.includes(` ${normalizeText(keyword)} `));

  if (asksAboutCostOrTiming) return costTopic;

  const match = topics
    .map((topic) => ({
      topic,
      score: Math.max(
        0,
        ...topic.keywords
          .map((keyword) => ` ${normalizeText(keyword)} `)
          .filter((keyword) => normalized.includes(keyword))
          .map((keyword) => keyword.length),
      ),
    }))
    .sort((left, right) => right.score - left.score)[0];

  return match && match.score > 0 ? match.topic : null;
}

function getContextualReply(topic, turn) {
  if (turn > 0) {
    return "Thanks, that gives me more context. I can also explain services, project steps, or what is currently published about pricing and availability. What would be most useful next?";
  }

  const followUps = {
    Services:
      "Got it. Which service feels closest to the problem you want to solve: a website, app, custom software, design, or marketing?",
    Website:
      "Thanks, that helps. What matters most for the website: sharing information, receiving enquiries, or selling online?",
    "Mobile app": "Understood. Who will use the app most: your customers, your team, or students?",
    Software:
      "Got it. Which process is the main priority: managing records, billing or inventory, or automating a workflow?",
    "Interface and user experience design":
      "Thanks. Which screen or workflow should feel easier to use, and is it mainly used on mobile or desktop?",
    "Digital marketing":
      "Understood. What is the main goal right now: more awareness, enquiries, or sales?",
    "Project process":
      "Sure. Our published stages are discover, plan, design, develop, test, and launch. Which stage would you like me to explain?",
    "Cost and timing":
      "Thanks for sharing that. The site does not publish fixed estimates; scope and requirements need to be discussed before cost or timing can be confirmed. Which solution are you considering?",
    Products:
      "I can’t confirm product availability or demos from the published details. Which product information are you looking for?",
    Portfolio:
      "There are no public case studies listed right now. Would you like to explore one of the services instead?",
    Contact:
      "I can keep answering questions here, but the contact form is not accepting submissions yet. What would you like to know about your project?",
  };

  return followUps[topic] || "What else would help you decide on the right next step?";
}

function getReply(question, pendingTopic, followUpTurn) {
  const normalized = normalizeText(question);
  const isGreeting =
    /^(hi|hello|hey|namaste)( there)?$/.test(normalized) ||
    /^good (morning|afternoon|evening)$/.test(normalized);
  const isThankYou = /^(thanks|thank you|thx|that helps|helpful)( a lot| so much)?$/.test(
    normalized,
  );
  const isQuestion =
    question.includes("?") ||
    /^(what|who|when|where|why|how|can|could|does|do|is|are|will|would|which|tell me|explain)\b/.test(
      normalized,
    );

  if (isGreeting) {
    return {
      text: "Hi! I can help you explore NavYug’s services and common project questions. What are you thinking of building?",
      topic: null,
      followUpTurn: 0,
    };
  }

  if (/\b(who are you|what are you|are you a bot)\b/.test(normalized)) {
    return {
      text: "I’m NavYug’s website assistant. I use information published on this site to answer questions and help you think through your project.",
      topic: null,
      followUpTurn: 0,
    };
  }

  if (isThankYou) {
    return {
      text: "You’re welcome! What else would help with your project?",
      topic: pendingTopic,
      followUpTurn,
    };
  }

  const topic = findTopic(question);
  if (pendingTopic && !isQuestion && (!topic || topic.label === pendingTopic)) {
    return {
      text: getContextualReply(pendingTopic, followUpTurn),
      topic: pendingTopic,
      followUpTurn: followUpTurn + 1,
    };
  }

  if (topic) {
    return {
      text: `${topic.answer} ${topic.followUp}`,
      topic: topic.label,
      followUpTurn: 0,
    };
  }

  return {
    text: "I’m not sure I understood that. I can help with services, websites, apps, software, project steps, pricing, products, and the contact form. Could you tell me a little more?",
    topic: null,
    followUpTurn: 0,
  };
}

export function SiteChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const [pendingTopic, setPendingTopic] = useState(null);
  const [followUpTurn, setFollowUpTurn] = useState(0);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      text: "Hi! I’m NavYug’s site assistant. What are you looking to build?",
    },
  ]);
  const messagesRef = useRef(null);
  const nextMessageId = useRef(2);
  const replyTimer = useRef(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(
    () => () => {
      window.clearTimeout(replyTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  function sendMessage(value) {
    const question = value.trim();
    if (!question || isTyping) return;

    setMessages((current) => [
      ...current,
      { id: nextMessageId.current++, role: "user", text: question },
    ]);
    setInput("");
    setIsTyping(true);
    replyTimer.current = window.setTimeout(() => {
      const reply = getReply(question, pendingTopic, followUpTurn);
      setMessages((current) => [
        ...current,
        { id: nextMessageId.current++, role: "assistant", text: reply.text },
      ]);
      setPendingTopic(reply.topic);
      setFollowUpTurn(reply.followUpTurn);
      setIsTyping(false);
    }, 420);
  }

  return (
    <div className="site-chatbot">
      {!isOpen && (
        <a
          className="whatsapp-launcher"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          title="WhatsApp"
        >
          <span className="whatsapp-launcher-icon">
            <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
              <path
                fill="currentColor"
                d="M16 3.1a12.8 12.8 0 0 0-11 19.4L3.2 29l6.7-1.8A12.8 12.8 0 1 0 16 3.1Zm0 23.3a10.5 10.5 0 0 1-5.3-1.4l-.4-.2-3.9 1 1-3.8-.3-.4A10.5 10.5 0 1 1 16 26.4Z"
              />
              <path
                fill="currentColor"
                d="M21.8 18.2c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-1.7-.8-3-2.2-3.8-3.8-.2-.3 0-.5.2-.7l.5-.6.3-.6c.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.8.8-1.1 1.9-.8 3 .7 2.1 2 3.9 3.8 5.2 1 .8 2.2 1.4 3.4 1.8.6.2 1.3.3 1.9.2.9-.1 1.7-.6 2.1-1.4.1-.3.1-.6 0-.7Z"
              />
            </svg>
          </span>
        </a>
      )}
      {isOpen && (
        <section
          className="chatbot-panel"
          id="chatbot-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="chatbot-title"
        >
          <div className="chatbot-header">
            <span className="chatbot-avatar">
              <Bot aria-hidden="true" />
            </span>
            <div>
              <h2 id="chatbot-title">NavYug Assistant</h2>
              <p>Ask about services or your project</p>
            </div>
            <button
              className="chatbot-close"
              type="button"
              aria-label="Close chat"
              onClick={() => setIsOpen(false)}
            >
              <X aria-hidden="true" />
            </button>
          </div>

          <div className="chatbot-messages" ref={messagesRef} role="log" aria-live="polite">
            {messages.map(({ id, role, text }) => (
              <p className={`chatbot-message is-${role}`} key={id}>
                {text}
              </p>
            ))}
            {!isTyping && messages[messages.length - 1]?.role === "assistant" && (
              <div
                className="chatbot-quick-questions"
                role="group"
                aria-label="Suggested questions"
              >
                {(followUpSuggestions[pendingTopic] || quickQuestions).map((question) => (
                  <button
                    key={question}
                    type="button"
                    disabled={isTyping}
                    onClick={() => sendMessage(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
            {isTyping && (
              <p
                className="chatbot-message is-assistant chatbot-typing"
                role="status"
                aria-label="Assistant is typing"
              >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </p>
            )}
          </div>

          <form
            className="chatbot-form"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(input);
            }}
          >
            <input
              aria-label="Ask the NavYug assistant"
              autoComplete="off"
              placeholder="Type your question..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
              disabled={isTyping}
            />
            <button type="submit" aria-label="Send message" disabled={isTyping || !input.trim()}>
              <Send aria-hidden="true" />
            </button>
          </form>
          <p className="chatbot-disclaimer">Answers use information published on this site.</p>
        </section>
      )}

      <button
        className="chatbot-launcher"
        type="button"
        aria-expanded={isOpen}
        aria-controls="chatbot-panel"
        aria-label={isOpen ? "Close chat" : "Ask us: Chat with NavYug"}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <X aria-hidden="true" /> : <MessageCircle aria-hidden="true" />}
        {!isOpen && <span>Ask us</span>}
        {!isOpen && <Sparkles className="chatbot-launcher-sparkle" aria-hidden="true" />}
      </button>
    </div>
  );
}
