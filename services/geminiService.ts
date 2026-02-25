
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { ChartData, MeetingData, WorkflowDefinition } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const INTEGRATED_TOOLS_LIST = `
A. Marketplaces (B2C & B2B):
Flipkart, Amazon India, Snapdeal, Myntra, Shopsy, IndiaMART/Justdial, TradeIndia, Moglix, Ekansh Global.

B. Communication & Messaging:
WhatsApp Business, Gmail, SMS Gateways, Slack, Microsoft Teams.

C. Indian Accounting/Billing:
Vyapar, Tally Prime, Khatabook, myBillBook, Zoho Books, Busy Accounting, Marg ERP.

D. E-Commerce/Marketing:
Shopify, WooCommerce, Mailchimp, SendGrid, LinkedIn Business, Instagram Business, Facebook Business, Google My Business.

E. Workflow/Productivity:
Trello, Asana, Miro, MindMeister, Zapier, n8n, IFTTT, Microsoft Power Automate, Google Sheets/Docs/Drive, Microsoft Excel/Outlook, Calendly.

F. Designing/Payment:
Canva, Freepik, Adobe Express, Paytm Business, PhonePe for Business, BharatPe, Google Pay for Business, Razorpay.
`;

export const FINAL_CONSTITUTION_PROMPT = `You are the AI model powering SimpleAgentix. The system has just been fully reset and is launching for the first time. Your directive is to IMMEDIATELY and STABLY RENDER the entire SimpleAgentix interface using the following simulated launch sequence.

I. INITIAL LAUNCH SEQUENCE (CRITICAL ACTION)
The Agent's FIRST OUTPUT MUST be the Simulated Landing Page for the active 'Sales Agent'. Do NOT output any welcome text or explanation before this section.

A. Simulated Sales Agent Landing Page:
Layout: Strictly maintain the permanent Two-Column Layout (Left Sidebar + Dynamic Right Panel).
Sidebar (Left): Prominently display the Agent list (Sales Agent (Active), Support, HR, Operations, Tax/GST, Data Analyst, Meeting, Marketing, Help Agent). Include '+ Create New Agent' and the functional 'My Dashboard' button.
Right Panel Header: Must show 'Sales Agent' active, with the underlying Model, 'Video Tutorials' icon, Language Switching (EN/HI/BN), and Delete Workflow icon.
Welcome View (Center): Display the text: "Hello! I am your Sales Agent." (Dynamically translated to user's language).
Workflow Templates: Display the 3 QUICK RUN templates (e.g., Qualify New Leads, Auto Invoice Gen, Follow-up Sequence) and the AUTO-SUGGESTED WORKFLOWS section below them, all with a One-Click Trigger function.
Input Bar: MUST feature the prominent Microphone Icon (Voice First), and the functional Apps Library Icon and Template Library Icon beside the text input.

II. Deep Niche Analysis & System Logic (Fully Functional)
A. Agent Switching & Dashboard: The system is prepared to fully clear/reset the right panel upon Agent switch, and the 'My Dashboard' button is prepared to switch to the functional Analytics Overview (with ₹, Deep Analytics, Subscriptions, Billing & Invoices views).
B. Voice-Connect Activation: Upon user input (Voice or Text), the Live Voice-Connect waveform animation MUST start, and the Agent MUST immediately initiate the Conversational Deep Niche Analysis (Q2 onward) to determine the user's Highest Priority Pain Point (Marketing, Inventory, HR, Finance).
C. Integrated Tool List: Recognize and utilize the complete list of 30+ tools (Vyapar, Tally Prime, IndiaMART, Canva, WhatsApp Business, etc.) for workflow generation.

III. Agentic Workflow Schema (Strict Output)
After analysis or a workflow prompt, the output MUST STRICTLY FOLLOW this schema:

Trigger: [Define the initial event or 'Completion of Deep Niche Analysis'.]
Apps Detected: [List ALL specific tools/apps required.]
Input Sources: [Transcript/Text Data, Q1-Q5+ Data.]
AI Processing Steps: [Analyze data, identify highest pain point (e.g., Content Marketing), map to Marketing Agent, and generate a multi-step solution using integrated apps.]
Business Logic: [Conditional rules, e.g., 'If Pain Point is Creative Design AND Revenue < ₹5L, prioritize Canva integration.']
Output Actions: [Set up the base workflow. All monetary values must use ₹.]
Notifications: [Present the Highly Personalized Agent Suggestion.]
Schedule or Frequency: [Immediate/Daily/Weekly/Monthly.]
Language: [Bengali/User's Selected Language.]
Result for user: [A summary of the created workflow or recommendation.]

--- END OF MASTER CONSTITUTION ---
Agent's First Action (Simulated Launch): Immediately output the Sales Agent Landing Page visual structure and welcome message as described in Section I-A.
`;

/**
 * Standard Chat with dynamic model selection
 */
export const chatWithBot = async (
  history: { role: string; parts: { text: string }[] }[],
  newMessage: string,
  model: string = 'gemini-3-pro-preview',
  language: string = 'English',
  systemInstruction?: string
): Promise<string> => {
  try {
    let effectiveSystemInstruction = systemInstruction || FINAL_CONSTITUTION_PROMPT;

    // Append language instruction if not already present
    if (!effectiveSystemInstruction.includes(`Respond in ${language}`)) {
        effectiveSystemInstruction += `\n\n IMPORTANT: Respond in ${language}. Use ₹ (Indian Rupee) for ALL currency values. STRICTLY FOLLOW the 'Required Agentic Workflow Schema' for all workflow outputs.`;
    }

    const chat = ai.chats.create({
      model: model,
      history: history,
      config: {
        systemInstruction: effectiveSystemInstruction,
      },
    });

    const response: GenerateContentResponse = await chat.sendMessage({
        message: newMessage
    });
    
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Chat Error:", error);
    throw error;
  }
};

/**
 * Generate Agentic Workflow JSON (Single Shot) - Deprecated for Chat but kept for API compatibility if needed
 */
export const generateAgenticWorkflow = async (userPrompt: string, language: string = 'English'): Promise<WorkflowDefinition> => {
  return {
       workflow_name: "Legacy Call",
       user_intent_summary: "Use chat interface",
       language_detected: "English",
       trigger: { type: "Error", frequency: "None", example_data: null },
       actions: [],
       final_output: { delivery_method: "chat", message_format: "text", output_example: "Error" },
       one_click_execution: false,
       optional_upgrades: []
  };
};

export const notifyWorkflowExecution = async (workflowName: string, recipient: string): Promise<string> => {
  try {
    // Corrected: Using 'gemini-3-flash-preview' for basic text tasks and tool calling as per guidelines.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `System Alert: The workflow "${workflowName}" has successfully completed execution.
      Task: Call the sendEmail tool to notify the user (${recipient}).`,
      config: {
        tools: [{
          functionDeclarations: [{
            name: "sendEmail",
            description: "Sends an email notification.",
            parameters: {
              type: Type.OBJECT,
              properties: {
                recipient: { type: Type.STRING },
                subject: { type: Type.STRING },
                body: { type: Type.STRING },
              },
              required: ["recipient", "subject", "body"],
            },
          }]
        }],
      },
    });

    const calls = response.functionCalls;
    if (calls && calls.length > 0) {
      const args = calls[0].args as any;
      return `Email sent to ${args.recipient}`;
    }
    return "Notification skipped.";
  } catch (error) {
    console.error("Notification Error:", error);
    return "Notification failed.";
  }
};

export const parseBookingRequest = async (userInput: string): Promise<{ name?: string; date?: string; time?: string; topic?: string }> => {
  try {
    // Corrected: Using 'gemini-3-flash-preview' for basic text tasks and JSON extraction.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userInput,
      config: {
        systemInstruction: `Extract booking details (Name, Date YYYY-MM-DD, Time HH:MM, Topic) to JSON.`,
        responseMimeType: 'application/json',
      }
    });
    const text = response.text;
    if (!text) return {};
    return JSON.parse(text);
  } catch (error) {
    return {};
  }
};

export const analyzeSelectedAssets = async (segments: string[], language: string): Promise<string> => {
  try {
    // Corrected: Using 'gemini-3-flash-preview' for basic text summarization/recommendation tasks.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `The user selected these segments: ${segments.join(', ')}. Provide a short strategic recommendation. Respond in ${language}.`,
    });
    return response.text || "Analysis unavailable.";
  } catch (error) {
    return "Could not complete analysis.";
  }
};
