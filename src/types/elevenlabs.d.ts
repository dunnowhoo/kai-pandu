declare namespace JSX {
  interface IntrinsicElements {
    'elevenlabs-convai': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        'agent-id': string;
        ref?: React.Ref<HTMLElement>;
      },
      HTMLElement
    >;
  }
}

// ElevenLabs Widget API
declare global {
  interface Window {
    ElevenLabsConvAI?: {
      widget?: {
        startCall?: () => void;
        endCall?: () => void;
        isCallActive?: () => boolean;
      };
    };
  }
}
