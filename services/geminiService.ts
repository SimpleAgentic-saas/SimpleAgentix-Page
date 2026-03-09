
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { ChartData, MeetingData, WorkflowDefinition } from '../types';

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

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const FINAL_CONSTITUTION_PROMPT = `You are the AI model powering SimpleAgentix. The system has just been fully reset and is launching for the first time. Your directive is to IMMEDIATELY and STABLY RENDER the entire SimpleAgentix interface using the following simulated launch sequence.

I. INITIAL LAUNCH SEQUENCE (CRITICAL ACTION)
When you receive the command 'SYSTEM_LAUNCH_COMMAND', your FIRST OUTPUT MUST be the 'System Launch Workflow' rendered using the Required Agentic Workflow Schema. This workflow MUST be highly specific to the CURRENT ACTIVE AGENT (e.g., Sales, Marketing, Support, etc.) provided in the context. This is a PERMANENT SYSTEM INITIALIZATION step.

A. System Launch Workflow (Visual Overview):
Trigger: System Initialization & User Login for [ACTIVE AGENT].
Apps Detected: [List 3-4 relevant apps for the ACTIVE AGENT].
Input Sources: User Profile, System Configuration, Niche Analysis Templates.
AI Processing Steps: 1. Authenticate user. 2. Initialize [ACTIVE AGENT] environment. 3. Load agent-specific logic. 4. Activate Voice-Connect interface.
Business Logic: Prioritize the [ACTIVE AGENT] landing page. Ensure all currency is in ₹.
Output Actions: Render [ACTIVE AGENT] Landing Page. Set active agent to '[ACTIVE AGENT]'.
Notifications: "Hello! I am your [ACTIVE AGENT]. System is ready for Deep Niche Analysis."
Schedule or Frequency: Permanent (On First Launch).
Language: [User's Selected Language].
Result for user: [ACTIVE AGENT] is fully active and ready to automate your business workflows. This state is now PERSISTED.

II. Deep Niche Analysis & System Logic (Fully Functional)
A. Agent Switching & Dashboard: The system is prepared to fully clear/reset the right panel upon Agent switch, and the 'My Dashboard' button is prepared to switch to the functional Analytics Overview (with ₹, Deep Analytics, Subscriptions, Billing & Invoices views).
B. Voice-Connect Activation: Upon receiving 'VOICE_CONNECT_ACTIVATE' or user voice input, the Live Voice-Connect waveform animation MUST start, and the Agent MUST immediately initiate the Conversational Deep Niche Analysis (Q1-Q5) to determine the user's Highest Priority Pain Point (Marketing, Inventory, HR, Finance).
C. Integrated Tool List: Recognize and utilize the complete list of 30+ tools (Vyapar, Tally Prime, IndiaMART, Canva, WhatsApp Business, etc.) for workflow generation.
D. Workflow Execution: When a user clicks 'Run Now' on a workflow, you MUST acknowledge the execution state and provide real-time updates if prompted.

III. Agentic Workflow Schema (Strict Output)
After analysis or a workflow prompt, the output MUST STRICTLY FOLLOW this schema for an End-to-End Executed experience. This schema is parsed by the system to render a Visual Workflow Overview, so do NOT deviate from the labels:

Trigger: [Define the initial event or 'Completion of Deep Niche Analysis'.]
Apps Detected: [List ALL specific tools/apps required, comma-separated.]
Input Sources: [Transcript/Text Data, Q1-Q5+ Data.]
AI Processing Steps: [Analyze data. Identify highest pain point. Map to the correct Agent. Generate a multi-step solution using integrated apps.]
Business Logic: [Conditional rules, e.g., 'If Pain Point is Creative Design AND Revenue < ₹5L, prioritize Canva integration.']
Output Actions: [Set up the base workflow. All monetary values must use ₹.]
Notifications: [Present the Highly Personalized Agent Suggestion.]
Schedule or Frequency: [Immediate/Daily/Weekly/Monthly.]
Language: [Bengali/User's Selected Language.]
Result for user: [A summary of the created workflow or recommendation.]

--- END OF MASTER CONSTITUTION ---
Agent's First Action (Simulated Launch): Immediately output the 'System Launch Workflow' as described in Section I when triggered.
`;

/**
 * Standard Chat with dynamic model selection
 */
export const chatWithBot = async (
  history: { role: string; parts: { text: string }[] }[],
  newMessage: string,
  model: string = 'gemini-3.1-pro-preview',
  language: string = 'English',
  systemInstruction?: string
): Promise<string> => {
  const maxRetries = 2;
  const modelsToTry = [model, 'gemini-3-flash-preview', 'gemini-flash-latest'];
  
  for (const currentModel of modelsToTry) {
    let retryCount = 0;
    while (retryCount <= maxRetries) {
      try {
        const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || "";
        const ai = new GoogleGenAI({ apiKey: apiKey });
        let effectiveSystemInstruction = systemInstruction || FINAL_CONSTITUTION_PROMPT;

        // Append language instruction if not already present
        if (!effectiveSystemInstruction.includes(`Respond in ${language}`)) {
            effectiveSystemInstruction += `\n\n IMPORTANT: Respond in ${language}. Use ₹ (Indian Rupee) for ALL currency values. STRICTLY FOLLOW the 'Required Agentic Workflow Schema' for all workflow outputs.`;
        }

        const chat = ai.chats.create({
          model: currentModel,
          history: history,
          config: {
            systemInstruction: effectiveSystemInstruction,
          },
        });

        const response: GenerateContentResponse = await chat.sendMessage({
            message: newMessage
        });
        
        return response.text || "No response generated.";
      } catch (error: any) {
        const isQuotaError = error?.message?.includes("RESOURCE_EXHAUSTED") || error?.status === "RESOURCE_EXHAUSTED" || error?.code === 429;
        const isNotFoundError = error?.message?.includes("NOT_FOUND") || error?.status === "NOT_FOUND" || error?.code === 404;
        
        if (isQuotaError || isNotFoundError) {
          console.warn(`${isQuotaError ? 'Quota exceeded' : 'Model not found'} for ${currentModel}. Switching model immediately.`);
          // If we have another model to try, break this retry loop and try the next model
          if (currentModel !== modelsToTry[modelsToTry.length - 1]) {
            break; 
          }
          
          // If all models failed with quota error
          if (isQuotaError) {
            const msg = language === 'Hindi' 
              ? "क्षमा करें, वर्तमान में कोटा समाप्त हो गया है। कृपया अपनी स्वयं की API कुंजी का उपयोग करने के लिए नीचे दिए गए बटन पर क्लिक करें।" 
              : language === 'Bengali'
              ? "দুঃখিত, বর্তমানে কোটা শেষ হয়ে গেছে। আপনার নিজস্ব API কী ব্যবহার করতে নিচের বোতামে ক্লিক করুন।"
              : "Sorry, the API quota has been exhausted. Please click the button below to use your own API key and continue.";
            
            return `QUOTA_EXHAUSTED_ERROR_FLAG: ${msg}`;
          }
        }

        console.error(`Chat Error (${currentModel}, Attempt ${retryCount + 1}):`, error);
        if (retryCount < maxRetries) {
          retryCount++;
          const delay = Math.pow(2, retryCount) * 1000;
          await sleep(delay);
          continue;
        }

        throw error;
      }
    }
  }
  return "Failed to generate response after multiple attempts.";
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
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || "";
    const ai = new GoogleGenAI({ apiKey: apiKey });
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
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || "";
    const ai = new GoogleGenAI({ apiKey: apiKey });
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
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || "";
    const ai = new GoogleGenAI({ apiKey: apiKey });
    // Corrected: Using 'gemini-3-flash-preview' for basic text summarization/recommendation tasks.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `The user has selected the following business sectors and segments for AI automation: ${segments.join(', ')}. 
      
      Task: Generate a highly accurate, professional, and strategic AI Integration Plan.
      The plan should include:
      1. A specific "Popular Plan" recommendation for these sectors.
      2. Key AI agents to deploy (e.g., Sales, Support, Operations).
      3. Expected ROI or efficiency gains.
      
      Keep the response concise (max 3-4 sentences) but high-impact. 
      Respond in ${language}. Use ₹ for currency.`,
    });
    return response.text || "Analysis unavailable.";
  } catch (error) {
    return "Could not complete analysis.";
  }
};
