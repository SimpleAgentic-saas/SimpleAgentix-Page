

export interface ChartData {
  type: 'bar' | 'pie' | 'line' | 'area';
  title: string;
  data: Array<{ name: string; value: number }>;
  xAxisLabel?: string;
  yAxisLabel?: string;
  description?: string;
}

export interface MeetingData {
  title: string;
  date: string;
  time: string;
  duration: string;
  attendees: string[];
  summary: string;
  meetLink: string;
}

// New Interface for Agentic Workflow JSON
export interface WorkflowDefinition {
  workflow_name: string;
  user_intent_summary: string;
  language_detected: string;
  trigger: {
    type: string;
    frequency: string;
    example_data: string | null;
  };
  actions: Array<{
    app: string;
    action_type: string;
    instructions: string;
    auto_integration: boolean;
  }>;
  final_output: {
    delivery_method: string;
    message_format: string;
    output_example: string;
  };
  one_click_execution: boolean;
  optional_upgrades: string[];
  // Editor support
  steps?: Array<{
    id: string;
    type: string;
    app: string;
    label: string;
  }>;
}

export interface WorkflowLog {
  id: string;
  workflowName: string;
  agentId: string;
  timestamp: number;
  status: 'Success' | 'Failed' | 'Pending';
  timeSavedMinutes: number;
  appsUsed: string[];
  // New fields for detailed view
  executionTimeMs?: number;
  errorDetails?: string;
  inputDataPreview?: string;
  roi?: number;
  costPerRun?: number;
  valuePerRun?: number;
}

export interface WorkflowPerformanceMetrics {
  successRate: number;
  totalExecutions: number;
  avgExecutionTime: string;
  errorRate: number;
  totalOrdersSynced?: number; // Example specific metric
  dailyTrend: { date: string; success: number; failed: number }[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
  chartData?: ChartData;
  meetingData?: MeetingData;
  workflowData?: WorkflowDefinition; // Added workflow support
  timestamp?: number;
}

export enum DemoTab {
  CHAT = 'CHAT',
  FAST = 'FAST',
  VOICE = 'VOICE',
}

export interface AudioState {
  isRecording: boolean;
  audioBlob: Blob | null;
  transcription: string;
  isTranscribing: boolean;
}

export interface TTSState {
  text: string;
  isPlaying: boolean;
  isLoading: boolean;
}

export interface BookingDetails {
  name?: string;
  date?: string;
  time?: string;
  topic?: string;
}

export type UserRole = 'Admin' | 'User' | 'Viewer';

export interface UserLocation {
  state: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface UserProfile {
  name: string;
  email?: string;
  role: UserRole;
  language: string;
  isNewUser?: boolean;
  location?: UserLocation;
  connectedApps?: string[];
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Due' | 'Overdue';
  downloadUrl: string;
}